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
import { Box, Divider, Grid, LinearProgress, alpha } from "@mui/material";
import { AccessLogDetailMode } from "src/components/UrlAccessLogDetail";
import { LogModeToggle } from "src/components/LogModeToggle";
import { useLocalStorageState } from "src/client/hooks/useLocalStorageState";
import DeleteShortUrlButton from "src/components/DeleteShortUrlButton";
import { red } from "@mui/material/colors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function UrlPage() {
  const router = useRouter();
  const { query } = router;
  const [logMode, setLogMode] = useLocalStorageState({
    key: "LOG_MODE",
    defaultValue: AccessLogDetailMode.Simple,
  });

  const id = query?.id as string;
  const { data, isLoading } = trpc.useQuery([
    "shorturl.get_by_id",
    {
      id,
      includeLogs: true,
    },
  ]);

  const deleteShortUrlMutation = trpc.useMutation("shorturl.delete");

  const handleToggleLogMode = () => {
    setLogMode((value) =>
      value === AccessLogDetailMode.Simple
        ? AccessLogDetailMode.Detailed
        : AccessLogDetailMode.Simple
    );
  };

  const handleDeleteShortUrl = async () => {
    await deleteShortUrlMutation.mutateAsync(id, {
      onSuccess() {
        router.push("/urls");
      },
    });
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

      <Divider
        sx={{
          opacity: 0.5,
          px: [0, 0, 10],
          mt: 10,
          mb: 5,
        }}
      />

      {!isLoading && (
        <Grid
          item
          xs={12}
          px={[0, 0, 10]}
          mt={5}
          mb={2}
          display="flex"
          flexDirection={"row"}
          justifyContent={"end"}
        >
          <DeleteShortUrlButton
            disabled={deleteShortUrlMutation.isLoading}
            onDelete={handleDeleteShortUrl}
          />
        </Grid>
      )}

      {deleteShortUrlMutation.isLoading && (
        <LinearProgress sx={{ mt: 3 }} color="secondary" />
      )}

      {deleteShortUrlMutation.isError && (
        <Grid item xs={12} px={[0, 0, 10]} mt={5} mb={2}>
          <Box
            my={4}
            px={[0, 0, 10]}
            sx={{
              borderRadius: 4,
              px: 2,
              py: 2,
              backgroundColor: alpha(red[900], 0.3),
              border: `2px solid ${alpha(red[500], 0.6)}`,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 40, color: red[400] }} />
            {deleteShortUrlMutation.error?.message}
          </Box>
        </Grid>
      )}
    </>
  );
}
