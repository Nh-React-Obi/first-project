import {
  createContext,
  useMemo,
  useState,
  useContext,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeCtx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

interface ThemeProviderProp {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProp) {
  const [theme, setTheme] = useState<Theme>("light");
  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      toggle: () => setTheme((t: Theme) => (t == "light" ? "dark" : "light")),
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
