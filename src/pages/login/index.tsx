import { Box } from "@mui/material";
import { GoogleLoginButton } from "react-social-login-buttons";

export default function LoginPage() {
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
      <GoogleLoginButton onClick={() => alert("Hello")} />
    </Box>
  );
}
