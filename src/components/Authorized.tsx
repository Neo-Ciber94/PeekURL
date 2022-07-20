import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "src/contexts/AuthContext";
import Loading from "./Loading";

const Authorized: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
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

    init();
  }, [isLoading, router, user]);

  if (isLoading) {
    return <Loading />;
  }

  if (user == null && router.pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
};

export default Authorized;
