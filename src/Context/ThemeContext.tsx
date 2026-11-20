import {
    createContext,useMemo, useState, useEffect, type ReactNode, 
    useContext} from "react";
}

type Theme = "light" | "dark";

type themectx = {
    theme: Theme;
    toggle: () => void;
};

const ThemeContext = createContext<themectx>({
    theme: "light",
    toggle: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

    const value = useMemo<themectx>(
        
        () => ({
            theme,
        toggle: () => setTheme((t: Theme) => (t === "light" ? "dark" : "light")),
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return ctx;
}