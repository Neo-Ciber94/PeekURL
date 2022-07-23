import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePrefersDarkMode } from "src/hooks/usePrefersDarkMode";

export type ColorMode = "light" | "dark";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8700c6",
      light: "#9d00cd",
      dark: "#9d00cd",
      contrastText: "rgba(255,255,255,0.87)",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#180021",
      paper: "#240535",
    },
  },
});

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
  const [mode, setColorMode] = useState<ColorMode>(() =>
    prefersDarkMode ? "dark" : "light"
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    handleSetColorMode(prefersDarkMode ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const handleSetColorMode = (mode: ColorMode) => {
    setColorMode(mode);
    setPrefersDarkMode(mode === "dark");
    setBodyTheme(mode, theme);
  };

  const handleToggleColorMode = () => {
    handleSetColorMode(mode === "dark" ? "light" : "dark");
  };

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

function getTheme(mode: ColorMode) {
  return mode === "dark" ? darkTheme : createTheme({ palette: { mode } });
}

function setBodyTheme(mode: ColorMode, theme: Theme) {
  if (mode === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  const bgColor =
    mode === "dark" ? theme.palette?.background?.default : "white";
  document.body.style.backgroundColor = bgColor;
}
