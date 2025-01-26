import { Typography } from '@mui/material';
import { Card } from '@/components/ui';
import { LoanForm } from '@/components/loan/LoanForm';

export const SimulatorCard = () => (
  <Card sx={{height:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
      Simule seu empréstimo
    </Typography>
    <LoanForm />
  </Card>
);