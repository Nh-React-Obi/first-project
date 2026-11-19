import React, { ReactNode, useMemo, createContext, useContext } from 'react'

type Theme = "light" | "dark"

type ThemeCtx = {theme: Theme, toggle: ()=> void}

const ThemeContext = createContext<ThemeCtx | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>("light")

  const value  = useMemo<ThemeCtx>(
    () => ({ 
        theme, 
        toggle: () => setTheme((prev: Theme) => (prev === "light" ? "dark" : "light"))
     }),
    [theme]
  )

//   const toggle = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider


export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}