"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { PageContainer } from "@/components/ui";
import { PageGrid } from "@/components/layout/PageGrid";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { SimulatorSection } from "@/components/home/SimulatorSection";
import { IllustrationSection } from "@/components/home/IllustrationSection";
import { useLoanCalculator } from "@/hooks/useLoanCalculator";
import { PageTitle } from "@/components/home/PageTitle";
import { LoanResultCard } from "@/components/loan";
import { Box } from "@mui/material";

export default function Home() {
  const {
    formData,
    result,
    handleFormChange,
    handleSubmit,
    errors,
    clearError,
  } = useLoanCalculator();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <PageContainer>
        <PageTitle />
        <PageGrid>
          <SplitLayout
            left={<IllustrationSection />}
            right={
              <SimulatorSection
                formData={formData}
                errors={errors}
                result={result}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                clearError={clearError}
              />
            }
          />
          {result && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <LoanResultCard result={result} />
            </Box>
          )}
        </PageGrid>
      </PageContainer>
    </LocalizationProvider>
  );
}
