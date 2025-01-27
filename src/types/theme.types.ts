import { ReactNode } from "react";

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface ProviderProps {
  children: ReactNode;
}