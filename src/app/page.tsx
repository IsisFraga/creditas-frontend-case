'use client';

import { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { calculateLoan } from '../utils/calculations';
import { ptBR } from 'date-fns/locale';
import { formatCurrency } from '@/utils/formatters';

interface FormData {
  loanAmount: string;
  months: string;
  birthDate: Date | null;
}

interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  interestRate: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    loanAmount: '',
    months: '',
    birthDate: null,
  });
  const [result, setResult] = useState<LoanResult | null>(null);

  const handleSimulate = () => {
    if (!formData.loanAmount || !formData.months || !formData.birthDate) return;

    const calculatedResult = calculateLoan({
      amount: Number(formData.loanAmount),
      months: Number(formData.months),
      birthDate: formData.birthDate,
    });

    setResult(calculatedResult);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Simulador de Crédito
          </Typography>
          
          <Box 
            sx={{ 
              mt: 4,
              p: 3, 
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <Typography variant="h5" gutterBottom>
              Simule seu empréstimo
            </Typography>
            
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Valor do empréstimo"
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Prazo (em meses)"
                type="number"
                value={formData.months}
                onChange={(e) => setFormData({ ...formData, months: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />
              
              <DatePicker
                label="Data de Nascimento"
                value={formData.birthDate}
                onChange={(newValue) => setFormData({ ...formData, birthDate: newValue })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 3 }
                  }
                }}
              />
              
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                onClick={handleSimulate}
                disabled={!formData.loanAmount || !formData.months || !formData.birthDate}
              >
                Simular
              </Button>
            </Box>
          </Box>

          {result && (
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resultado da Simulação
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mt: 2, }}>
                  <Box>
                    <Typography color="text.secondary">Valor da Parcela</Typography>
                    <Typography variant="h5">{formatCurrency(result.monthlyPayment)}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">Valor Total</Typography>
                    <Typography variant="h5">{formatCurrency(result.totalAmount)}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">Total de Juros</Typography>
                    <Typography variant="h5">{formatCurrency(result.totalInterest)}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">Taxa de Juros</Typography>
                    <Typography variant="h5">{(result.interestRate * 100).toFixed(1)}% ao ano</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </LocalizationProvider>
  );
}