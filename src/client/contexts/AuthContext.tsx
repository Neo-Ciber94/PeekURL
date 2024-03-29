import { createContext, FC, useContext, useEffect, useState } from "react";
import { getFirebaseApp } from "../../firebase/firebaseClient";
import {
  User,
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useValue } from "src/client/hooks/useValue";
import { userStore } from "src/client/stores/user.store";

export interface AuthContextProps {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isLoading: false,
  user: null,
});

export const AuthContextProvider: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const auth = useValue(() => {
    const app = getFirebaseApp();
    return getAuth(app);
  });

  useEffect(() => {
    setIsLoading(true);

    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        await userStore.save(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();

    try {
      await signInWithRedirect(auth, googleProvider);
      const redirect = await getRedirectResult(auth);

      if (redirect) {
        setUser(redirect.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await signOut(auth);
      setUser(null);
      await userStore.save(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
