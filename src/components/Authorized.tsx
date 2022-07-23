import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useAuth } from "src/contexts/AuthContext";
import Loading from "./Loading";

export interface AuthorizedProps extends React.PropsWithChildren {
  ignoreRoutes?: string[];
  onLoading?: React.ReactNode;
  onRedirecting?: React.ReactNode;
}

const Authorized: React.FC<AuthorizedProps> = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const {
    ignoreRoutes = [],
    onLoading = <Loading />,
    onRedirecting = null,
  } = rest;
  const router = useRouter();

  const requiresAuth = useCallback(
    (route: string) => !ignoreRoutes.includes(route),
    [ignoreRoutes]
  );

  useEffect(() => {
    if (!requiresAuth(router.pathname)) {
      return;
    }

    const redirect = async () => {
      if (user) {
        if (router.pathname === "/login") {
          await router.push("/");
        }
      } else {
        if (router.pathname !== "/login" && !isLoading) {
          await router.push("/login");
        }
      }
    };

    redirect();
  }, [requiresAuth, isLoading, router, user]);

  if (isLoading) {
    return <>{onLoading}</>;
  }

  // prettier-ignore
  if (requiresAuth(router.pathname) && user == null && router.pathname !== "/login") {
    return <>{onRedirecting}</>;
  }

  return <>{children}</>;
};

export default Authorized;
