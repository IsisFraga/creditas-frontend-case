export interface LoanParams {
  amount: number;
  months: number;
  birthDate: Date;
}

export interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  interestRate: number;
  months: number;
}

export interface FormData {
  loanAmount: string;
  months: string;
  birthDate: Date | null;
}