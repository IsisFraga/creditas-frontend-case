import Home from "@/components/home";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dinheiro já - calcule aqui',
  description: 'Crédito sem dor de cabeça'
}

export default function HomePage() {

  return (
    <Home />
  );
}
