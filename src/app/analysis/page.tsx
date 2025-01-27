import { PaymentAnalysis } from "@/components/analysis";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dinheiro já - análise',
  description: 'Crédito sem dor de cabeça'
}

export default function AnalysisPage() {

  return (
    <PaymentAnalysis />
  );
}
