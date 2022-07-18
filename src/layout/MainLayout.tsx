import { Container } from "@mui/material";
import React from "react";
import Header from "./Header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  );
}
