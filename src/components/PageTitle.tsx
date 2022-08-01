import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BackButton } from "./BackButton";

export interface PageTitleProps {
  startText: string;
  endText?: string;
  backTo?: string;
}

export function PageTitle({ startText, endText, backTo }: PageTitleProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      px={[0, 0, 10]}
      pt={5}
      display="flex"
      flexDirection={matches ? "row" : "column"}
    >
      <Box
        display="flex"
        flexDirection={"row"}
        alignItems="center"
        whiteSpace={"nowrap"}
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Box
          width="5px"
          height={40}
          mr={1}
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        ></Box>

        <Typography variant="h5" fontWeight="bold" whiteSpace={"pre"}>
          {startText}
        </Typography>
        {endText && (
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            whiteSpace={"pre"}
          >
            {endText}
          </Typography>
        )}
      </Box>

      {backTo && <BackButton path={backTo} sx={{ marginLeft: "auto" }} />}
    </Box>
  );
}
