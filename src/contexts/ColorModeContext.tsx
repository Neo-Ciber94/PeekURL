import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import React, { createContext, FC, useContext, useEffect } from "react";
import { usePrefersDarkMode } from "src/hooks/usePrefersDarkMode";

export type ColorMode = "light" | "dark";

export const darkModeTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

export interface ColorModeContextProps {
  mode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: "light",
  setColorMode: () => {},
  toggleColorMode: () => {},
});

export const ColorModeProvider: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { prefersDarkMode, setPrefersDarkMode } = usePrefersDarkMode();
  const [mode, setColorMode] = React.useState<ColorMode>(() =>
    prefersDarkMode ? "dark" : "light"
  );

  useEffect(() => {
    handleSetColorMode(prefersDarkMode ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetColorMode = (mode: ColorMode) => {
    setColorMode(mode);
    setPrefersDarkMode(mode === "dark");
  };

  const handleToggleColorMode = () => {
    handleSetColorMode(mode === "dark" ? "light" : "dark");
  };

  const theme = React.useMemo(() => {
    const theme = mode === "dark" ? darkModeTheme : {};
    return createTheme({
      palette: { mode, ...theme },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider
      value={{
        setColorMode: handleSetColorMode,
        toggleColorMode: handleToggleColorMode,
        mode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);

export const useIsDarkMode = () => useColorMode().mode === "dark";
