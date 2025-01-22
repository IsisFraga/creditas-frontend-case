import { useState } from 'react';
import { validateLoanAmount, validateMonths, validateBirthDate } from '../utils/validators';
import { FormErrors, LoanFormData } from '@/types/loan.types';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: LoanFormData): boolean => {
    const newErrors: FormErrors = {
      loanAmount: validateLoanAmount(formData.loanAmount),
      months: validateMonths(formData.months),
      birthDate: validateBirthDate(formData.birthDate)
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== undefined)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  return { errors, validateForm, clearError };
};