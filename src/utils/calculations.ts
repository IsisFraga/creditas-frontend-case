import type { LoanFormData, LoanResult } from '@/types/loan.types';
import { differenceInYears, parse } from 'date-fns';

export const getInterestRate = (birthDate: string): number => {
  const parsedBirthDate = parse(birthDate, 'dd/MM/yyyy', new Date());
  const today = new Date();
  const age = differenceInYears(today, parsedBirthDate);
  if (age <= 25) return 0.05; // 5% ao ano
  if (age <= 40) return 0.03; // 3% ao ano
  if (age <= 60) return 0.02; // 2% ao ano
  return 0.04;                // 4% ao ano
};

export const calculateLoan = ({ loanAmount, months, birthDate }: LoanFormData): LoanResult => {
  const annualRate = getInterestRate(birthDate);
  const monthlyRate = annualRate / 12;
  
  const monthlyPayment = 
    (Number(loanAmount) * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  
  const totalLoanAmount = monthlyPayment * Number(months);
  const totalInterest = totalLoanAmount - Number(loanAmount);


  return {
    monthlyPayment,
    totalLoanAmount,
    totalInterest,
    interestRate: annualRate,
    available: true
  };
};
