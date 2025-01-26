export interface LoanFormData {
  loanAmount: string;
  months: string;
  birthDate: string;
}

export interface LoanResult {
  available: boolean;
  monthlyPayment: number;
  totalLoanAmount: number;
  totalInterest: number;
  interestRate: number;
}