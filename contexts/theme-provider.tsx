'use client'
import React from 'react';
import { useColorScheme } from '../app/hooks/useColorScheme';

type TThemeContext = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeContext = React.createContext<TThemeContext | null>(null)

/**
 * Creates a theme provider component that wraps its child components with a theme context.
 *
 * @param {Object} props - The properties for the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the theme context.
 * @return {React.ReactNode} The wrapped child components with the theme context.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = React.useState(colorScheme);

  React.useEffect(() => {
    setTheme(colorScheme)
  }, [colorScheme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  const themeContext = React.useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return themeContext
}