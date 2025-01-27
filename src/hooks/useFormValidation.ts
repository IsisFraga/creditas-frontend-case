import { useState } from 'react';
import { LoanFormData } from '@/types/loan.types';
import { FormErrors } from '@/types/form.types';
import { validateLoanAmount, validateMonths, validateBirthDate } from '@/utils/validators';

export const useFormValidation = () => {
 const [errors, setErrors] = useState<FormErrors<LoanFormData>>({});

 const validateForm = (formData: LoanFormData): boolean => {
   const newErrors: FormErrors<LoanFormData> = {
     loanAmount: validateLoanAmount(formData.loanAmount),
     months: validateMonths(formData.months),
     birthDate: validateBirthDate(formData.birthDate ? new Date(formData.birthDate) : null)
   };

   const filteredErrors = Object.fromEntries(
     Object.entries(newErrors).filter(([_, value]) => value !== undefined)
   );

   setErrors(filteredErrors);
   return Object.keys(filteredErrors).length === 0;
 };

 const clearError = (field: keyof FormErrors<LoanFormData>) => {
   setErrors(prev => {
     const { [field]: _, ...rest } = prev;
     return rest;
   });
 };

 return { errors, validateForm, clearError };
};