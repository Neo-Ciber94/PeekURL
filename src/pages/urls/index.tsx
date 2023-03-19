import { trpc } from "@utils/trpc";
import PageCard from "src/components/PageCard";
import Loading from "src/components/Loading";
import URLTable from "src/components/URLTable";
import { ShortUrl } from "@prisma/client";
import { useRouter } from "next/router";
import AppHead from "src/components/AppHead";
import { PageTitle } from "src/components/PageTitle";

export default function UrlListPage() {
  const router = useRouter();

  const { data, isLoading } = trpc.useQuery([
    "shorturl.get_all",
    { includeCount: true },
  ]);

  const handleUrlClick = (url: ShortUrl) => {
    router.push(`/urls/${url.id}`);
  };

  return (
    <>
      <AppHead name="My URLs" />
      <PageTitle startText="My " endText="URLS" backTo="/" />
      <PageCard p={4}>
        {isLoading && <Loading />}
        {!isLoading && data && (
          <URLTable urls={data} onClick={handleUrlClick} />
        )}
      </PageCard>
    </>
  );
}
