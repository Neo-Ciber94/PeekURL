import { Box, Typography } from "@mui/material";
import { Link as MaterialLink } from '@mui/material'
import Link from 'next/link';

export default function Logo() {
  return <Box display='flex' flexDirection='column' justifyContent={'center'}>
    <Typography variant="h6" color="black" component="div">
      <Link href="/" passHref >
        <MaterialLink underline="none">
          <Typography component='span' fontFamily='monospace' fontSize={28} color='black'>Peek</Typography>
          <Typography component='span' fontFamily='monospace' fontSize={28} color='primary' fontWeight='bold'>URL</Typography>
        </MaterialLink>
      </Link>
    </Typography>
  </Box>
}
