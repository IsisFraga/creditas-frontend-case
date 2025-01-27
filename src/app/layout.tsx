import { Metadata } from 'next'
import { LayoutProvider } from './providers/LayoutProvider';

export const metadata: Metadata = {
  title: 'Simulador de Crédito',
  description: 'Simulador de empréstimo offline',
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Simulador de Crédito'
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}