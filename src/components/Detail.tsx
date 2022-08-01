import { Typography, Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useIsDarkMode } from "src/contexts/ColorModeContext";

export interface DetailProps extends React.PropsWithChildren {
  icon: React.ReactNode;
  title: string;
}

export function Detail({ icon, title, children }: DetailProps) {
  const matches = useMediaQuery("(min-width:600px)");
  const isDarkMode = useIsDarkMode();
  const theme = useTheme();

  const titleColor = useMemo(() => {
    if (isDarkMode) {
      return theme.palette.secondary.main;
    }

    return theme.palette.primary.main;
  }, [theme, isDarkMode]);

  return (
    <Grid
      container
      item
      xs={12}
      className="detail-card"
      sx={{
        pt: "0 !important",
        "&:hover": {
          backgroundColor: isDarkMode
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(0, 0, 0, 0.08)",
          borderRadius: 5,
        },
      }}
    >
      <Grid
        item
        xs={matches ? 4 : 12}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignContent="center"
          gap={2}
          color={titleColor}
          sx={{
            cursor: "pointer",
          }}
        >
          {icon}
          <Typography component="span" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={matches ? 8 : 12} width={[100, 300, 400]}>
        {children}
      </Grid>
    </Grid>
  );
}
