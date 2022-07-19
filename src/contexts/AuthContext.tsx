import { createContext, FC } from "react";

export interface AuthContextProps {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  user: {
    uid: string;
  };
}

const AuthContext = createContext<AuthContextProps>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  user: { uid: "" },
});

export const AuthContextProvider: FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <AuthContext.Provider value={{} as any}>{children}</AuthContext.Provider>
  );
};
