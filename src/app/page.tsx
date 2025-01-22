"use client";

import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { LoanForm } from "../components/loan/LoanForm";
import { LoanResultCard } from "../components/loan/LoanResult";
import { useLoanCalculator } from "../hooks/useLoanCalculator";
import { useFormValidation } from "../hooks/useFormValidation";
import { Card, PageContainer, PageHeader } from "@/components/ui";
import { LoanFormData } from "@/types/loan.types";

export default function Home() {
  const [formData, setFormData] = useState<LoanFormData>({
    loanAmount: "",
    months: "",
    birthDate: null,
  });

  const { result, calculate } = useLoanCalculator();
  const { errors, validateForm, clearError } = useFormValidation();

  const handleFormChange = (field: keyof LoanFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (validateForm(formData)) {
      calculate(formData);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <PageContainer>
        <PageHeader
          title="Simulador de Crédito"
          subtitle="Simule seu empréstimo de forma rápida e fácil"
        />
        <Card sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Insira os dados solicitados
          </Typography>
          <LoanForm
            formData={formData}
            errors={errors}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            clearError={clearError}
          />
        </Card>

        {result && <LoanResultCard result={result} />}
      </PageContainer>
    </LocalizationProvider>
  );
}
