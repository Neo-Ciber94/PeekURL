import { Box, Typography } from "@mui/material";
import { Link as MaterialLink } from "@mui/material";
import Link from "next/link";
import { useIsDarkMode } from "src/client/contexts/ColorModeContext";

export default function Logo() {
  const isDarkMode = useIsDarkMode();

  return (
    <Box display="flex" flexDirection="column" justifyContent={"center"}>
      <Typography variant="h6" component="div">
        <Link href="/" passHref>
          <MaterialLink underline="none">
            <Typography
              component="span"
              fontFamily="monospace"
              fontSize={28}
              color={isDarkMode ? "white" : "black"}
            >
              Peek
            </Typography>
            <Typography
              component="span"
              fontFamily="monospace"
              fontSize={28}
              color="primary"
              fontWeight="bold"
            >
              URL
            </Typography>
          </MaterialLink>
        </Link>
      </Typography>
    </Box>
  );
}
