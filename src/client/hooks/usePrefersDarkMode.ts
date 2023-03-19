import { useMediaQuery } from "@mui/material";
import { isBrowser } from "@utils/isBrowser";
import { useState } from "react";

const COLOR_SCHEMA_MODE = "PREFERRED_COLOR_SCHEME";

export interface UsePrefersDarkModeResult {
    prefersDarkMode: boolean;
    setPrefersDarkMode: (value: boolean) => void;
}

export function usePrefersDarkMode() {
    const prefersDarkColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
    const savedColorSchema = isBrowser() ? localStorage.getItem(COLOR_SCHEMA_MODE) : null;
    const [prefersDarkMode, setPrefersDarkMode] = useState(() => {
        if (savedColorSchema == null) {
            return prefersDarkColorScheme;
        }

        return savedColorSchema.toLowerCase() === "dark";
    });

    const handleSetPrefersDarkMode = (value: boolean) => {
        setPrefersDarkMode(value);

        if (value) {
            localStorage.setItem(COLOR_SCHEMA_MODE, "dark");
        } else {
            localStorage.setItem(COLOR_SCHEMA_MODE, "light");
        }
    };

    return {
        setPrefersDarkMode: handleSetPrefersDarkMode,
        prefersDarkMode,
    };
}