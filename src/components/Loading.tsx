import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      p={10}
      display="flex"
      justifyContent="center"
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}
