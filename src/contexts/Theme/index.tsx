import { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { getTheme } from "@/styles/theme";
import { THEME_STORAGE_KEY } from '@/constants/theme';
import { ThemeContextValue, ThemeMode, ProviderProps } from '@/types/theme.types';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: ProviderProps) => {
  const prefersDarkMode = usePrefersDarkMode();
  const [mode, setMode] = useState<ThemeMode>(() => prefersDarkMode ? 'dark' : 'light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (!savedTheme) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
    setMounted(true);
  }, [prefersDarkMode]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  }, [mode, mounted]);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleTheme = () => setMode((prev: string) => prev === 'light' ? 'dark' : 'light');

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};