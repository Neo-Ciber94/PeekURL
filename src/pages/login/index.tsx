import { Box } from "@mui/material";
import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import AppHead from "src/components/AppHead";
import { useAuth } from "src/client/contexts/AuthContext";
import { useIsDarkMode } from "src/client/contexts/ColorModeContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const isDarkMode = useIsDarkMode();

  const handleLogin = async () => {
    if (user) {
      return;
    }

    await login();
  };

  if (user) {
    return null;
  }

  return (
    <>
      <AppHead name="Login" />
      <Box
        height="50%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={25}
        px={[0, 0, 20, 30]}
      >
        <GoogleLoginButton
          className={isDarkMode ? "social-login-dark-button" : undefined}
          onClick={handleLogin}
        />
      </Box>
    </>
  );
}
