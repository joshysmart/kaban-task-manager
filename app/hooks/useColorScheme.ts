import React from "react";

/**
 * Initializes a color scheme listener using the `useEffect` hook.
 *
 * @return {string} The color scheme ('dark' or 'light').
 */
export const useColorScheme = (): 'light'|'dark' => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const initialColorScheme = mediaQuery.matches ? 'dark' : 'light';
  const [mode, setMode] = React.useState<'light'|'dark'>(initialColorScheme);

  const changeHandler = (event: MediaQueryListEvent) => {
    const colorScheme = event.matches ? 'dark' : 'light';
    setMode(colorScheme);
  };

  React.useEffect(() => {

    const addEventListener = () => {
      mediaQuery.addEventListener('change', changeHandler);
    };

    const removeEventListener = () => {
      mediaQuery.removeEventListener('change', changeHandler);
    };

    addEventListener();
    setMode(initialColorScheme);

    return removeEventListener;
  }, [initialColorScheme, mediaQuery]);

  return mode;
};
