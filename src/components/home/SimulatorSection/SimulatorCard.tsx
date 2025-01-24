import { Typography } from '@mui/material';
import { Card } from '@/components/ui';
import { LoanForm } from '@/components/loan/LoanForm';
import { LoanFormData, FormErrors } from '@/types/loan.types';

interface SimulatorCardProps {
  formData: LoanFormData;
  errors: FormErrors;
  onFormChange: (field: keyof LoanFormData, value: any) => void;
  onSubmit: () => void;
  clearError: (field: keyof FormErrors) => void;
}

export const SimulatorCard = ({
  formData,
  errors,
  onFormChange,
  onSubmit,
  clearError
}: SimulatorCardProps) => (
  <Card sx={{height:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
      Simule seu empréstimo
    </Typography>
    
    <LoanForm
      formData={formData}
      errors={errors}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      clearError={clearError}
    />
  </Card>
);