import Head from "next/head";

const PAGE_NAME = "PeekURL";

export interface AppHeadProps {
  name?: string;
}

export default function AppHead({ name }: AppHeadProps) {
  const title = name ? `${PAGE_NAME} :: ${name}` : PAGE_NAME;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
