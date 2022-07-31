import { Container } from "@mui/material";
import React from "react";
import AppHead from "src/components/AppHead";
import Header from "./Header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <AppHead />
      <Container>{children}</Container>
    </>
  );
}
