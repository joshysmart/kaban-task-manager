'use client'
import React from 'react';

export const ThemeContext = React.createContext({})

/**
 * Creates a theme provider component that wraps its child components with a theme context.
 *
 * @param {Object} props - The properties for the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the theme context.
 * @return {React.ReactNode} The wrapped child components with the theme context.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}