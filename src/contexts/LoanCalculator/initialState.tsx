import { LoanCalculatorContextStateType } from ".";

export const initialState: LoanCalculatorContextStateType = {
  formData: {
    loanAmount: '',
    months: '',
    birthDate: '',
  },
  result: {
    monthlyPayment: 0,
    totalLoanAmount: 0,
    totalInterest: 0,
    interestRate: 0,
    available: false,
  },
  errors: {},
};