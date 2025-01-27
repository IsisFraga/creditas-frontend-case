import { LoanFormData } from "@/types/loan.types";
import { calculateLoan } from "@/utils/calculations";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  try {
    const body = await request.json() as LoanFormData;

    const missingFields = [] as string[]
    const error = NextResponse.json({error: "Formato da requisição inválido.", details: JSON.stringify(missingFields), status: 400})

    if (!body.loanAmount) missingFields.push('loanAmount') 
    if (!body.months) missingFields.push('months') 
    if (!body.birthDate) missingFields.push('birthDate') 

    if (missingFields.length) {
      return error;
    }

    const calculatedResult = calculateLoan(body)

    return NextResponse.json({
      status: 200,
      ...calculatedResult
    })
  } catch (e) {
    return NextResponse.json({error: "Formato da requisição inválido.", details: JSON.stringify(e), status: 500})

  }
}
