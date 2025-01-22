import { LoanCalculationParams, LoanResult } from '@/types/loan.types';
import { differenceInYears } from 'date-fns';

export const getInterestRate = (birthDate: Date): number => {
  const age = differenceInYears(new Date(), birthDate);
  if (age <= 25) return 0.05; // 5% ao ano
  if (age <= 40) return 0.03; // 3% ao ano
  if (age <= 60) return 0.02; // 2% ao ano
  return 0.04;                // 4% ao ano
};

export const calculateLoan = ({ amount, months, birthDate }: LoanCalculationParams): LoanResult => {
  const annualRate = getInterestRate(birthDate);
  const monthlyRate = annualRate / 12;
  
  const monthlyPayment = 
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  
  const totalAmount = monthlyPayment * months;
  const totalInterest = totalAmount - amount;

  return {
    monthlyPayment,
    totalAmount,
    totalInterest,
    interestRate: annualRate
  };
};