import { useContext } from "react";
import { LoanCalculatorContext, LoanCalculatorContextType } from "@/contexts/LoanCalculator";


export const useLoanCalculator = (): LoanCalculatorContextType => {
  const context = useContext(LoanCalculatorContext);
  if (!context) {
    throw new Error('useLoanCalculator must be used within a LoanCalculatorProvider');
  }
  return context;
};