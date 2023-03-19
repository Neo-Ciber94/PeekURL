import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, SxProps, Theme, useTheme } from "@mui/material";

export interface BackButtonProps {
  path: string;
  sx?: SxProps<Theme>;
}

export function BackButton({ path, sx }: BackButtonProps) {
  const theme = useTheme();

  return (
    <Link href={path} passHref style={{ textDecoration: "none" }}>
      <Box
        display="flex"
        flexDirection="row"
        color={theme.palette.primary.light}
        sx={{
          cursor: "pointer",
          ...sx,
        }}
      >
        <ArrowBackIcon sx={{ marginRight: 1 }} />
        <span>Back</span>
      </Box>
    </Link>
  );
}
