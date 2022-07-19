import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MaterialLink,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { AccessLog, ShortUrl } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PageCard from "src/components/PageCard";
import LinkIcon from "@mui/icons-material/Link";
import Loading from "src/components/Loading";
import { BASE_URL } from "src/config";
import { trpcSSG } from "@utils/trpcSSG";
import { useRouter } from "next/router";
import { getTimePassed } from "@utils/getPassedTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import InfoIcon from "@mui/icons-material/Info";

type ShortUrlWithLogs = ShortUrl & {
  logs: AccessLog[];
};

// type Data = {
//   url: ShortUrlWithLogs;
//   id: number;
// };

// export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
//   const ssg = trpcSSG();

//   const id = ctx.params?.id as string;

//   if (id == null) {
//     return {
//       notFound: true,
//     };
//   }

//   const shortUrl = await ssg.fetchQuery("shorturl.get_by_id", {
//     id: Number(id),
//     includeLogs: true,
//   });

//   if (shortUrl == null) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       url: shortUrl,
//       id: Number(id),
//     },
//   };
// };

export default function UrlPage() {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = trpc.useQuery([
    "shorturl.get_by_id",
    { id: Number(id), includeLogs: true },
  ]);

  return (
    <PageCard p={4}>
      <Typography variant="h5" mb={1}>
        URL - {`${id}`}
      </Typography>
      {(!data || isLoading) && <Loading />}
      {data && <ShortUrlDetails data={data} />}
    </PageCard>
  );
}

interface ShortUrlProps {
  data: ShortUrlWithLogs;
}

function ShortUrlDetails({ data }: ShortUrlProps) {
  return (
    <>
      <Grid container spacing={1} paddingTop={2}>
        {/* Short URL */}
        <Detail icon={<LinkIcon />} title="Short URL">
          <MaterialLink
            href={getUrl(data.shortUrl)}
            target="_blank"
            rel="noopener"
          >
            {getUrl(data.shortUrl)}
          </MaterialLink>
        </Detail>

        {/* Original URL */}
        <Detail icon={<LinkIcon />} title="Original URL">
          <MaterialLink href={data.originalUrl} target="_blank" rel="noopener">
            {data.originalUrl}
          </MaterialLink>
        </Detail>

        {/* Last Access */}
        <Detail icon={<AccessTimeIcon />} title="Last Access">
          <Typography>{getTimePassed(data.creationDate).toString()}</Typography>
        </Detail>

        {/* Access */}
        <Detail icon={<VisibilityIcon />} title="Access">
          <Typography>{data.logs?.length || 0}</Typography>
        </Detail>

        {/* Active */}
        <Detail icon={<ToggleOffIcon />} title="Active">
          <Typography>{data.active ? "Yes" : "No"}</Typography>
        </Detail>
      </Grid>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" marginBottom={2}>
        Logs
      </Typography>

      <Grid container spacing={1}>
        {data.logs.map((log) => (
          <UrlAccessLogDetail key={log.id} log={log} />
        ))}
      </Grid>
    </>
  );
}

interface DetailProps extends React.PropsWithChildren {
  icon: React.ReactNode;
  title: string;
}

function Detail({ icon, title, children }: DetailProps) {
  return (
    <>
      <Grid item xs={3}>
        <Box display="flex" flexDirection="row" alignContent="center" gap={2}>
          {icon}
          <Typography component="span" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
    </>
  );
}

interface UrlAccessLogDetailProps {
  log: AccessLog;
}

function UrlAccessLogDetail({ log }: UrlAccessLogDetailProps) {
  return (
    <>
      <Detail icon={<InfoIcon />} title="IP">
        <Typography>{log.ipAddress || "N/A"}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="Since">
        <Typography>{getTimePassed(log.creationDate).toString()}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="Date & time">
        <Typography>{log.creationDate.toString()}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="Country">
        <Typography>{log.country || "N/A"}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="City">
        <Typography>{log.city || "N/A"}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="Region">
        <Typography>{log.region || "N/A"}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="Latitude">
        <Typography>{log.latitude || "N/A"}</Typography>
      </Detail>

      <Detail icon={<InfoIcon />} title="Longitude">
        <Typography>{log.longitude || "N/A"}</Typography>
      </Detail>

      <Grid item xs={12} marginY={1}>
        <Divider />
      </Grid>
    </>
  );
}

// TODO: Move to utils
function getUrl(url: string): string {
  return `${BASE_URL}/q${url}`;
}
