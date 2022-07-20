import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useAuth } from "src/contexts/AuthContext";

export default function LoginPage() {
  const { login, user } = useAuth();

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
    <Box
      height="50%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={25}
      px={[0, 0, 20, 30]}
    >
      <GoogleLoginButton onClick={handleLogin} />
    </Box>
  );
}
