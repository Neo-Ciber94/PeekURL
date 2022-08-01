import { trpc } from "@utils/trpc";
import PageCard from "src/components/PageCard";
import Loading from "src/components/Loading";
import { useRouter } from "next/router";
import {
  ShortUrlDetails,
  ShortUrlAccessLogDetails,
} from "src/components/ShortUrlDetails";
import AppHead from "src/components/AppHead";
import { PageTitle } from "src/components/PageTitle";
import { Grid } from "@mui/material";
import { useState } from "react";
import { AccessLogDetailMode } from "src/components/UrlAccessLogDetail";
import { LogModeToggle } from "src/components/LogModeToggle";

export default function UrlPage() {
  const { query } = useRouter();
  const [logMode, setLogMode] = useState(AccessLogDetailMode.Simple);
  const id = query?.id as string;
  const { data, isLoading } = trpc.useQuery([
    "shorturl.get_by_id",
    {
      id,
      includeLogs: true,
    },
  ]);

  const handleToggleLogMode = () => {
    setLogMode((value) =>
      value === AccessLogDetailMode.Simple
        ? AccessLogDetailMode.Detailed
        : AccessLogDetailMode.Simple
    );
  };

  return (
    <>
      <AppHead name="View URL" />
      <PageTitle startText={"URL :: "} endText={id} backTo="/urls" />
      <PageCard p={4}>
        {(!data || isLoading) && <Loading />}
        {data && <ShortUrlDetails data={data} />}
      </PageCard>

      {data && data.logs && data.logs.length > 0 && (
        <>
          <PageTitle startText={"Logs"} />
          <Grid item xs={12} px={[0, 0, 10]} pt={3}>
            <LogModeToggle mode={logMode} onChange={handleToggleLogMode} />
          </Grid>

          <PageCard p={4}>
            <ShortUrlAccessLogDetails mode={logMode} logs={data.logs || []} />
          </PageCard>
        </>
      )}
    </>
  );
}
