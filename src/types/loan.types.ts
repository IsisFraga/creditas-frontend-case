export interface LoanFormData {
  loanAmount: string;
  months: string;
  birthDate: Date | null;
}

export interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  interestRate: number;
}

export interface LoanCalculationParams {
  amount: number;
  months: number;
  birthDate: Date;
}

export interface FormErrors {
  loanAmount?: string;
  months?: string;
  birthDate?: string;
}