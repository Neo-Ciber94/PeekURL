import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function Header() {
  return (
    <Box display="flex" flexDirection="row">
      <Button
        sx={{
          marginLeft: "auto",
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
        variant="contained"
      >
        <LoginIcon />
        Login
      </Button>
    </Box>
  );
}
