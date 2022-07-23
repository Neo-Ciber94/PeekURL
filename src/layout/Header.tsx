import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import Link from "next/link";
import { useAuth } from "src/contexts/AuthContext";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode, useIsDarkMode } from "src/contexts/ColorModeContext";

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
  const { toggleColorMode, mode: colorMode } = useColorMode();
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
        backgroundColor: isDarkMode ? "palette.background.paper" : "white",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        p={2}
      >
        {/* <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton> */}
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
            <IconButton
              onClick={toggleColorMode}
              sx={{
                color: isDarkMode ? "white" : "black",
              }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

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
