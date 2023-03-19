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
      justifyContent={"space-between"}
      alignItems="center"
      gap={3}
    >
      <Box
        display="flex"
        whiteSpace={"nowrap"}
        flexDirection={"row"}
        alignItems="center"
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

        <Box display="flex" flexDirection={"row"}>
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
      </Box>

      {backTo && <BackButton path={backTo} sx={{ marginLeft: "auto" }} />}
    </Box>
  );
}
