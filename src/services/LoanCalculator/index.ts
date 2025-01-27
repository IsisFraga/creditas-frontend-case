import { LoanFormData } from "@/types/loan.types";


export async function simulateCalculation (body: LoanFormData) {
  const response = await fetch("/api/loan_calculator", {
    method: 'POST',
    body: JSON.stringify(body)
  })

  const data = await response.json();

  return data;
}