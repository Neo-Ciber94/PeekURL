import { trpc } from "@utils/trpc";
import PageCard from "src/components/PageCard";
import Loading from "src/components/Loading";
import { useRouter } from "next/router";
import {
  ShortUrlDetails,
  ShortUrlLogDetails,
} from "src/components/ShortUrlDetails";
import AppHead from "src/components/AppHead";
import { PageTitle } from "src/components/PageTitle";

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
      <AppHead name="View URL" />
      <PageTitle startText={"URL :: "} endText={id} />
      <PageCard p={4}>
        {(!data || isLoading) && <Loading />}
        {data && <ShortUrlDetails data={data} />}
      </PageCard>

      {data && data.logs && data.logs.length > 0 && (
        <>
          <PageTitle startText={"Logs"} />
          <PageCard p={4}>
            <ShortUrlLogDetails logs={data.logs || []} />
          </PageCard>
        </>
      )}
    </>
  );
}
