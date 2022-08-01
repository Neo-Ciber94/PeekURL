import { Box, Typography, useTheme } from "@mui/material";

export interface PageTitleProps {
  startText: string;
  endText?: string;
}

export function PageTitle({ startText, endText }: PageTitleProps) {
  const theme = useTheme();

  return (
    <Box px={10} pt={5} display="flex" flexDirection="row" alignItems="center">
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
  );
}
