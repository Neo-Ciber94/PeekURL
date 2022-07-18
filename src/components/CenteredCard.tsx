import { Box, BoxProps } from "@mui/material";
import React from "react";

export default function CenteredCard({ children, ...rest }: React.PropsWithChildren<BoxProps>) {
    return <Box
        boxShadow={"rgba(149, 157, 165, 0.4) 0px 8px 24px"}
        borderRadius={"20px"}
        {...rest}
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        my={10}
        mx={[0, 0, 10]}
    >
        {children}
    </Box>
}