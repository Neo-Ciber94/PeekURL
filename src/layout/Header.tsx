import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledButton = styled(Button)({
  "&": {
    color: "black",
    fontSize: "16px",
    width: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});

export default function Header() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        p={2}
      >
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Logo />
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            gap: 1,
            px: 3,
          }}
        >
          <Link href="/urls" passHref>
            <StyledButton>URLS</StyledButton>
          </Link>
          <Link href="/login" passHref>
            <StyledButton>Login</StyledButton>
          </Link>
        </Box>
      </Box>
      <Divider />
    </AppBar>
  );
}
