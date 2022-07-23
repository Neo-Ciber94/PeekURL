import { trpc } from "@utils/trpc";
import PageCard from "src/components/PageCard";
import Loading from "src/components/Loading";
import { Typography } from "@mui/material";
import URLTable from "src/components/URLTable";
import { ShortUrl } from "@prisma/client";
import { useRouter } from "next/router";
import PageTitle from "src/components/PageHead";

export default function UrlListPage() {
  const router = useRouter();

  const { data, isLoading, isError } = trpc.useQuery([
    "shorturl.get_all",
    { includeCount: true },
  ]);

  const handleUrlClick = (url: ShortUrl) => {
    router.push(`/urls/${url.id}`);
  };

  return (
    <>
      <PageTitle name="My URLs" />
      <PageCard p={4}>
        <Typography variant="h5" mb={1}>
          My URLS
        </Typography>
        {isLoading && <Loading />}
        {!isLoading && data && (
          <URLTable urls={data} onClick={handleUrlClick} />
        )}
      </PageCard>
    </>
  );
}
