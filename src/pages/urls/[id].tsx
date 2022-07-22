import { Typography } from "@mui/material";
import { trpc } from "@utils/trpc";
import PageCard from "src/components/PageCard";
import Loading from "src/components/Loading";
import { useRouter } from "next/router";
import {
  ShortUrlDetails,
  ShortUrlLogDetails,
} from "src/components/ShortUrlDetails";

export default function UrlPage() {
  const { query } = useRouter();
  const id = query?.id as string;
  const { data, isLoading } = trpc.useQuery([
    "shorturl.get_by_id",
    {
      id,
      includeLogs: true,
    },
  ]);

  return (
    <>
      <PageCard p={4}>
        <Typography variant="h5" mb={1}>
          URL - {`${id}`}
        </Typography>
        {(!data || isLoading) && <Loading />}
        {data && <ShortUrlDetails data={data} />}
      </PageCard>

      {data && (
        <PageCard p={4}>
          <ShortUrlLogDetails logs={data.logs || []} />
        </PageCard>
      )}
    </>
  );
}
