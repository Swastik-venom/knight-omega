

import { createContext, useCallback, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const ActualThemeContext = createContext(null);
export const useActualTheme = () => useContext(ActualThemeContext);

const SetThemeContext = createContext(null);
export const useSetTheme = () => useContext(SetThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme] = useState('light');
  const actualTheme = 'light';

  useEffect(() => {
    document.body.removeAttribute('theme-mode');
    document.documentElement.classList.remove('dark');
    try {
      localStorage.setItem('theme-mode', 'light');
    } catch {
      /* noop */
    }
  }, []);

  const setTheme = useCallback(() => {
    try {
      localStorage.setItem('theme-mode', 'light');
    } catch {
      /* noop */
    }
  }, []);

  return (
    <SetThemeContext.Provider value={setTheme}>
      <ActualThemeContext.Provider value={actualTheme}>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </ActualThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};
