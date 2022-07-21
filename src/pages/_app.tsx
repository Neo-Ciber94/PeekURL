import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import Authorized from "src/components/Authorized";
import { AuthContextProvider } from "src/contexts/AuthContext";
import { appStore } from "src/redux/store";
import superjson from "superjson";
import { API_URL } from "../config";
import MainLayout from "../layout/MainLayout";
import { AppRouter } from "../server/routers/app.router";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainLayout>
          <Authorized>
            <Component {...pageProps} />
          </Authorized>
        </MainLayout>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const idToken = appStore.idToken;

    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        url: "/api/trpc",
        headers: {
          authorization: idToken,
        },
      };
    }

    const url = `${API_URL}/trpc`;

    return {
      url,
      transformer: superjson,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: {
        "x-ssr": "1",
        authorization: idToken,
      },
    };
  },
  ssr: true,
})(MyApp);
