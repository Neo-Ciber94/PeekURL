import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useCallback, useState } from "react";
import { Box, IconButton } from "@mui/material";

export interface HiddenProps extends React.PropsWithChildren {
  replaceText?: string | (() => string);
}

export function ToggleHidden({
  children,
  replaceText = "**********",
}: HiddenProps) {
  const [visible, setVisible] = useState(false);

  const getChildren = useCallback(() => {
    if (visible) {
      return children;
    }

    if (typeof replaceText === "function") {
      return replaceText();
    }

    return replaceText;
  }, [visible, children, replaceText]);

  const toggleVisibility = () => setVisible((value) => !value);

  return (
    <Box
      width={"100%"}
      display="flex"
      flexDirection={"row"}
      alignItems="center"
      sx={{
        cursor: visible ? "inherit" : "pointer",
      }}
    >
      {getChildren()}
      <IconButton
        className="toggle-icon"
        sx={{
          marginLeft: "auto",
          opacity: 0.1,
          transition: "opacity 600ms",
          "&:hover": {
            opacity: 0.9,
          },
        }}
        onClick={toggleVisibility}
      >
        {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </Box>
  );
}
