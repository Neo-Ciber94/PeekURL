import URLList from "../../components/URLList";
import { trpc } from "@utils/trpc";
import CenteredCard from "src/components/CenteredCard";
import Loading from "src/components/Loading";
import { Typography } from "@mui/material";
import URLTable from "src/components/URLTable";
import { ShortUrl } from "@prisma/client";

export default function UrlsPage() {
  const { data, isLoading, isError } = trpc.useQuery([
    "shorturl.get_all",
    { includeLogs: true },
  ]);

  const handleUrlClick = (url: ShortUrl) => {
    console.log(url);
  };

  return (
    <CenteredCard p={4}>
      <Typography variant="h5" mb={1}>
        My URLS
      </Typography>
      {isLoading && <Loading />}
      {!isLoading && data && <URLTable urls={data} onClick={handleUrlClick} />}
    </CenteredCard>
  );
}
