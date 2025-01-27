"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { Header } from "@/components/ui/header";
import { LoanCalculatorProvider } from "@/contexts/LoanCalculator";
import { useRegisterSW } from '@/hooks/useRegisterSW';
import { ProviderProps } from "@/types/theme.types";
import { ThemeProvider } from "@/contexts/Theme";

export const LayoutProvider = ({ children }: ProviderProps) => {
  useRegisterSW();

  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <LoanCalculatorProvider>
                <CssBaseline />
                <Header />
                <main>{children}</main>
              </LoanCalculatorProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};