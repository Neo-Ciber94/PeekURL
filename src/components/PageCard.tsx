import { Box, BoxProps } from "@mui/material";
import React from "react";

export default function PageCard({
  children,
  ...rest
}: React.PropsWithChildren<BoxProps>) {
  return (
    <Box
      {...rest}
      boxShadow={"rgba(149, 157, 165, 0.1) 0px 8px 24px"}
      borderRadius={"20px"}
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      my={3}
      mx={[0, 0, 10]}
    >
      {children}
    </Box>
  );
}
