import { ReactNode, createContext, useState } from 'react';
import { LoanFormData, LoanResult } from '@/types/loan.types';
import { calculateLoan } from '@/utils/calculations';
import { FormErrors, FormMasking, FormMethods, FormValidations } from '@/types/form.types';
import { initialState } from './initialState';
import { isUserAtLeast18YearsOld } from '@/utils/dateValidations';

export type LoanCalculatorContextStateType = {
  formData: LoanFormData;
  result: LoanResult;
  errors: FormErrors<LoanFormData>;
};

export type LoanCalculatorContextMethodsType = FormMethods<LoanFormData> & {
  calculate: () => void;
};

export type LoanCalculatorContextType = LoanCalculatorContextStateType &
  LoanCalculatorContextMethodsType;

export const LoanCalculatorContext = createContext<LoanCalculatorContextType | undefined>(undefined);

interface LoanCalculatorProviderProps {
  children: ReactNode;
}

export const LoanCalculatorProvider: React.FC<LoanCalculatorProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<LoanFormData>(initialState.formData);
  const [result, setResult] = useState<LoanResult>(initialState.result);
  const [errors, setErrors] = useState<FormErrors<LoanFormData>>(initialState.errors);

  const validations: FormValidations<LoanFormData> = {
    loanAmount: (value: LoanFormData['loanAmount']) => (Number(value) < 1000 ? 'Valor do empréstimo deve ser no mínimo R$1.000,00' : undefined),
    months: (value: LoanFormData['months']) => (Number(value) < 12 ? 'Prazo deve ser no mínimo 12 meses' : undefined),
    birthDate: (value: LoanFormData['birthDate']) => {
      if (!value) {
        return 'Data de nascimento é obrigatória';
      }
      if (!isUserAtLeast18YearsOld(value)) {
        return 'Você deve ter pelo menos 18 anos para solicitar um empréstimo';
      }
      return undefined;
    },
  };

  const maskValue: FormMasking<LoanFormData> = {
    birthDate: (value: string) => value.toString(),
    loanAmount: (value: string) => value,
    months: (value: string) => value.toString()
  }

  const handleFormChange: LoanCalculatorContextMethodsType['handleFormChange'] = (key, value) => {
    setFormData((prev) => {
      const maskFn = maskValue[key as keyof LoanFormData];
      let maskedValue = ''
      if (maskFn) {
        maskedValue = maskFn(value)
      }
      return ({
      ...prev,
      [key]: maskedValue ? maskedValue : prev[key],
    })});

    const validationFn = validations[key];
    if (validationFn) {
      const error = validationFn(value, formData);
      setErrors((prev) => ({
        ...prev,
        [key]: error,
      }));
    }
  };

  const handleSubmit: LoanCalculatorContextMethodsType['handleSubmit'] = async () => {
    const newErrors: FormErrors<LoanFormData> = {};
    for (const key in formData) {    
      const validationFn = validations[key as keyof LoanFormData];
      if (validationFn) {
        const error = validationFn((formData as never)[key], formData);
        if (error) {
          newErrors[key as keyof LoanFormData] = error;
        }
      }
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      calculate();
    }
  };

  const calculate: LoanCalculatorContextMethodsType['calculate'] = () => {
    const calculatedResult = calculateLoan({
      loanAmount: formData.loanAmount,
      months: formData.months,
      birthDate: formData.birthDate!,
    });
    setResult(calculatedResult);
  };

  const handleReset:LoanCalculatorContextMethodsType['handleReset']  = () => {
    setFormData(initialState.formData);
    setResult(initialState.result);
    setErrors(initialState.errors);
  };

  const handleClearError: LoanCalculatorContextMethodsType['handleClearError'] = (test) => {
    setErrors(prev => ({
      ...prev,
      [test]: undefined
    }));
  }

  const value: LoanCalculatorContextType = {
    formData,
    result,
    errors,
    handleFormChange,
    handleSubmit,
    handleReset,
    calculate,
    handleClearError,
  };

  return (
    <LoanCalculatorContext.Provider value={value}>
      {children}
    </LoanCalculatorContext.Provider>
  );
};