"use client"

import { Typography, useTheme } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, BarChart, Bar, ResponsiveContainer,
} from 'recharts';
import { PageContainer } from '@/components/ui/PageContainter';
import { Card } from '@/components/ui';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { generatePaymentAnalysisData } from '@/utils/analysis';
import { CustomTooltip } from './CustomTooltip';



export const PaymentAnalysis = () => {
  const { result, formData } = useLoanCalculator();
  const data = generatePaymentAnalysisData(formData, result);
  const theme = useTheme();

  if (!data.length) {
    return (
      <PageContainer>
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <Typography variant="h5">Faça sua simulação</Typography>
        </Card>
      </PageContainer>
    );
  }

  const BalanceChart = (
    <Card>
      <Typography variant="h6" gutterBottom>Evolução do Saldo Devedor</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.primary} />
          <YAxis stroke={theme.palette.text.primary} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="remainingBalance" stroke="#8884d8" name="Saldo Devedor" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );

  const CompositionChart = (
    <Card>
      <Typography variant="h6" gutterBottom>Composição das Parcelas</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.primary} />
          <YAxis stroke={theme.palette.text.primary} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="principal" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Principal" />
          <Area type="monotone" dataKey="interest" stackId="1" stroke="#8884d8" fill="#8884d8" name="Juros" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );

  const PaymentChart = (
    <Card>
      <Typography variant="h6" gutterBottom>Pagamentos Mensais</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.primary} />
          <YAxis stroke={theme.palette.text.primary} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="payment" fill="#8884d8" name="Valor da Parcela" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );

  return (
    <PageContainer sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      {BalanceChart}
      {CompositionChart}
      {PaymentChart}
    </PageContainer>
  );
};