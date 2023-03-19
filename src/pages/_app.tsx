import { CssBaseline } from "@mui/material";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { Provider } from "react-redux";
import Authorized from "src/components/Authorized";
import ClientOnly from "src/components/ClientOnly";
import ErrorBoundary from "src/components/ErrorBoundary";
import { localConfig } from "src/config/local.config";
import { AuthContextProvider } from "src/client/contexts/AuthContext";
import { ColorModeProvider } from "src/client/contexts/ColorModeContext";
import { store } from "src/redux/store";
import { getUserIdToken } from "src/stores/user.store";
import superjson from "superjson";
import MainLayout from "../client/layout/MainLayout";
import { AppRouter } from "../server/routers/app.router";
import "../styles/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClientOnly>
      <ErrorBoundary>
        <Provider store={store}>
          <ColorModeProvider>
            <AuthContextProvider>
              <CssBaseline />
              <MainLayout>
                <Authorized>
                  <Component {...pageProps} />
                </Authorized>
              </MainLayout>
            </AuthContextProvider>
          </ColorModeProvider>
        </Provider>
      </ErrorBoundary>
    </ClientOnly>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        url: "/api/trpc",
        async headers() {
          const idToken = await getUserIdToken();
          return {
            authorization: idToken,
          };
        },
      };
    }

    const url = `${localConfig.API_URL}/trpc`;

    return {
      url,
      transformer: superjson,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      async headers() {
        const idToken = await getUserIdToken();

        return {
          authorization: idToken,
          "x-ssr": "1",
        };
      },
    };
  },
  ssr: true,
})(MyApp);
