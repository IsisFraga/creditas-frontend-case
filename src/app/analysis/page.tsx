"use client"

import { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, BarChart, Bar, ResponsiveContainer
} from 'recharts';
import { PageGrid } from '@/components/layout/PageGrid';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { PageContainer } from '@/components/ui/PageContainter';
import { Card } from '@/components/ui';

const PaymentAnalysis = ({ simulationData = mockData }) => {
  const [data] = useState(simulationData);

  const BalanceChart = (
    <Card>
        <Typography variant="h6" gutterBottom>Evolução do Saldo Devedor</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="principal" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Principal" />
          <Area type="monotone" dataKey="interest" stackId="1" stroke="#8884d8" fill="#8884d8" name="Juros" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );

  const PaymentChart = (
    <Card sx={{display: 'flex', justifyContent: 'end'}}>
      <Typography variant="h6" gutterBottom>Pagamentos Mensais</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="payment" fill="#8884d8" name="Valor da Parcela" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );

  return (
    <PageContainer>
      <PageGrid>
        {BalanceChart}
        <SplitLayout 
          left={CompositionChart}
          right={PaymentChart}
        />
      </PageGrid>
    </PageContainer>
  );
};

const mockData = [
  {
    month: 1,
    payment: 1000,
    principal: 800,
    interest: 200,
    remainingBalance: 9200
  },
  {
    month: 2,
    payment: 2000,
    principal: 800,
    interest: 200,
    remainingBalance: 8200
  },
  {
    month:3,
    payment: 3000,
    principal: 800,
    interest: 200,
    remainingBalance: 7200
  },
  
];

export default PaymentAnalysis;