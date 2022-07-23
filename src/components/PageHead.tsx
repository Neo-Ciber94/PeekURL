import Head from "next/head";

const PAGE_NAME = "PeekURL";

export interface PageTitleProps {
  name?: string;
}

export default function PageTitle({ name }: PageTitleProps) {
  const title = name ? `${PAGE_NAME} :: ${name}` : PAGE_NAME;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
