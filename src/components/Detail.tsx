import { Typography, Grid, Box } from "@mui/material";

export interface DetailProps extends React.PropsWithChildren {
  icon: React.ReactNode;
  title: string;
}

export function Detail({ icon, title, children }: DetailProps) {
  return (
    <>
      <Grid item xs={3}>
        <Box display="flex" flexDirection="row" alignContent="center" gap={2}>
          {icon}
          <Typography component="span" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={9}
        whiteSpace={"nowrap"}
        overflow="hidden"
        textOverflow="ellipsis"
        width={[100, 300, 400]}
      >
        {children}
      </Grid>
    </>
  );
}
