import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import Logo from "../../components/Logo";
import Link from "next/link";
import { useAuth } from "src/client/contexts/AuthContext";
import { useState } from "react";
import { useIsDarkMode } from "src/client/contexts/ColorModeContext";
import { useRouter } from "next/router";
import { ThemeToggle } from "src/components/ThemeToggle";

const StyledButton = styled(Button)({
  "&": {
    color: "palette.text.light",
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
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { pathname } = useRouter();
  const isDarkMode = useIsDarkMode();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: isDarkMode ? "palette.background.default" : "white",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        p={2}
      >
        <Logo />
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            px: 3,
          }}
        >
          <Box>
            <ThemeToggle />
          </Box>

          {!user && pathname !== "/login" && (
            <Link href="/login" passHref>
              <StyledButton>Login</StyledButton>
            </Link>
          )}

          {user && (
            <>
              <Link href="/urls" passHref>
                <StyledButton>URLS</StyledButton>
              </Link>
              <Avatar
                alt={user.displayName || "user"}
                src={user.photoURL || ""}
                sx={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e)}
                imgProps={{
                  referrerPolicy: "no-referrer",
                }}
              />
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleLogout} sx={{ width: 120 }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
      <Divider />
    </AppBar>
  );
}
