import { Box, BoxProps } from "@mui/material";

export interface WrapProps extends React.PropsWithChildren<BoxProps> {}

export function Wrap({ children, ...rest }: WrapProps) {
  return (
    <Box
      width={"100%"}
      display="flex"
      flexDirection={"row"}
      py={"8px"}
      alignItems="center"
      {...rest}
    >
      {children}
    </Box>
  );
}
