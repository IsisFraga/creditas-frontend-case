import { CardContent, Typography, Box, Fade } from '@mui/material';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { Card } from '@/components/ui';
import type { LoanResult } from '@/types/loan.types';

interface LoanResultProps extends LoanResult {}

export const LoanResultCard = ({
  monthlyPayment,
  totalLoanAmount,
  totalInterest,
  interestRate,
}: LoanResultProps) => (
  <Fade in timeout={500}>
    <div>
      <Card noPadding>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Resultado da Simulação
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
              mt: 2,
            }}
          >
            <ResultItem
              label="Valor da Parcela"
              value={formatCurrency(monthlyPayment)}
              highlighted
            />
            <ResultItem
              label="Valor Total"
              value={formatCurrency(totalLoanAmount)}
            />
            <ResultItem
              label="Total de Juros"
              value={formatCurrency(totalInterest)}
            />
            <ResultItem
              label="Taxa de Juros"
              value={`${formatPercentage(interestRate)} ao ano`}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  </Fade>
);

const ResultItem = ({ 
  label, 
  value, 
  highlighted = false 
}: { 
  label: string; 
  value: string; 
  highlighted?: boolean;
}) => (
  <Box>
    <Typography color="text.secondary" variant="body2">
      {label}
    </Typography>
    <Typography variant="h5" color={highlighted ? 'primary' : 'textPrimary'}>
      {value}
    </Typography>
  </Box>
);