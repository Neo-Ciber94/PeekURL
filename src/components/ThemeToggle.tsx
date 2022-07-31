import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode, useIsDarkMode } from "src/contexts/ColorModeContext";
import { useSpring, animated } from "react-spring";

export function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const isDarkMode = useIsDarkMode();
  const styles = useSpring({
    transform: isDarkMode ? "rotate(0deg)" : "rotate(360deg)",
    display: "flex",
  });

  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{
        color: "palette.text.primary",
      }}
    >
      <animated.div style={styles}>
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </animated.div>
    </IconButton>
  );
}
