import { useState } from 'react';
import { calculateLoan } from '../utils/calculations';
import { LoanFormData, LoanResult } from '@/types/loan.types';

export const useLoanCalculator = () => {
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculate = (formData: LoanFormData) => {
    if (!formData.birthDate) return;

    const calculatedResult = calculateLoan({
      amount: Number(formData.loanAmount),
      months: Number(formData.months),
      birthDate: formData.birthDate
    });

    setResult(calculatedResult);
  };

  return { result, calculate };
};