import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MaterialLink,
  Typography,
  Grid,
} from "@mui/material";
import { AccessLog, ShortUrl } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PageCard from "src/components/PageCard";
import LinkIcon from "@mui/icons-material/Link";
import Loading from "src/components/Loading";
import { BASE_URL } from "src/config";
import { trpcSSG } from "@utils/trpcSSG";

type ShortUrlWithLogs = ShortUrl & {
  logs: AccessLog[];
};

type Data = {
  url: ShortUrlWithLogs;
  id: number;
};

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  const ssg = trpcSSG();

  const id = ctx.params?.id as string;

  if (id == null) {
    return {
      notFound: true,
    };
  }

  const shortUrl = await ssg.fetchQuery("shorturl.get_by_id", {
    id: Number(id),
    includeLogs: true,
  });

  if (shortUrl == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      url: shortUrl,
      id: Number(id),
    },
  };
};

export default function UrlPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;

  // This query will be immediately available as it's prefetched.
  const shortUrlQuery = trpc.useQuery(["shorturl.get_by_id", { id }]);
  const { data } = shortUrlQuery;

  if (data == null) {
    // This is never called
    return <Loading />;
  }

  return (
    <PageCard p={4}>
      <Typography variant="h5" mb={1}>
        URL {`${id}`}
      </Typography>
      <Grid container spacing={1}>
        {/* Short URL */}
        <Grid item xs={2}>
          <LinkIcon />
        </Grid>
        <Grid item xs={10}>
          <MaterialLink
            href={getUrl(data.shortUrl)}
            target="_blank"
            rel="noopener"
          >
            {getUrl(data.shortUrl)}
          </MaterialLink>
        </Grid>

        {/* Original URL */}
        <Grid item xs={2}>
          <LinkIcon />
        </Grid>
        <Grid item xs={10}>
          <MaterialLink href={data.originalUrl} target="_blank" rel="noopener">
            {data.originalUrl}
          </MaterialLink>
        </Grid>
      </Grid>
    </PageCard>
  );
}

// TODO: Move to utils
function getUrl(url: string): string {
  return `${BASE_URL}/q${url}`;
}
