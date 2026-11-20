import {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeCtx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

interface ThemeProviderProp {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProp) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      toggle: () => setTheme((t: Theme) => (t == "light" ? "dark" : "light")),
    }),
    [theme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

type Theme2Ctx = {
  theme: Theme;
  removeTotalCars: () => void;
  toggle: () => void;
};

const Theme2Context = createContext<Theme2Ctx | null>(null);

export function Theme2Provider({ children }: ThemeProviderProp) {
  const [theme, setTheme] = useState<Theme>("light");

  const removeTotalCars = () => {
    return setTheme("system");
  };

  const toggle = () => {
    return setTheme((t) => (t === "dark" ? "light" : t === "system" ? "light" : "dark"));
  };

  const value = {
    theme,
    removeTotalCars,
    toggle,
  };

  return <Theme2Context.Provider value={value}>{children}</Theme2Context.Provider>;
}

export function use2Theme() {
  const ctx = useContext(Theme2Context);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
