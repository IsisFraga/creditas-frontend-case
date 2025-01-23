import { useState } from 'react';
import { LoanFormData, LoanResult } from '@/types/loan.types';
import { calculateLoan } from '@/utils/calculations';
import { useFormValidation } from './useFormValidation';

export const useLoanCalculator = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loanAmount: '',
    months: '',
    birthDate: null,
  });
  const [result, setResult] = useState<LoanResult | null>(null);
  const { validateForm, errors, clearError } = useFormValidation();

  const handleFormChange = (field: keyof LoanFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!validateForm(formData)) return;

    const result = calculateLoan({
      amount: Number(formData.loanAmount),
      months: Number(formData.months),
      birthDate: formData.birthDate!
    });

    setResult(result);
  };

  return { formData, result, handleFormChange, handleSubmit, errors, clearError };
};