import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { Provider } from "react-redux";
import Authorized from "src/components/Authorized";
import { AuthContextProvider } from "src/contexts/AuthContext";
import { store } from "src/redux/store";
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
    <Provider store={store}>
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
    </Provider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        url: "/api/trpc",
        headers() {
          const idToken = store.getState().idTokenReducer.idToken || undefined;

          return {
            authorization: idToken,
          };
        },
      };
    }

    const url = `${API_URL}/trpc`;

    return {
      url,
      transformer: superjson,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers() {
        const idToken = store.getState().idTokenReducer.idToken || undefined;

        return {
          authorization: idToken,
          "x-ssr": "1",
        };
      },
    };
  },
  ssr: true,
})(MyApp);
