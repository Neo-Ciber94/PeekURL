import { Container } from "@mui/material";
import React from "react";
import PageTitle from "src/components/PageHead";
import Header from "./Header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <PageTitle />
      <Container>{children}</Container>
    </>
  );
}
