
import { LoanFormData, LoanResult } from '@/types/loan.types';

export interface PaymentAnalysisData {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export const generatePaymentAnalysisData = (formData: LoanFormData, result: LoanResult): PaymentAnalysisData[] => {
  if (!result.monthlyPayment || !result.interestRate) {
    return [];
  }

  const numberOfPayments = Number(formData.months);
  const principal = Number(formData.loanAmount);

  const payment = result.monthlyPayment;
  const interest = payment - (principal / numberOfPayments);
  let remainingBalance = principal;

  return Array.from({ length: numberOfPayments }, (_, i) => {
    const month = i + 1;
    remainingBalance = Math.max(0, remainingBalance - (payment - interest));

    return {
      month,
      payment: Number(payment.toFixed(2)),
      principal: Number((payment - interest).toFixed(2)),
      interest: Number(interest.toFixed(2)),
      remainingBalance: Number(remainingBalance.toFixed(2))
    };
  });
};