import { FormErrors, LoanFormData } from '@/types/loan.types';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface LoanFormProps {
  formData: LoanFormData;
  errors: FormErrors;
  onFormChange: (field: keyof LoanFormData, value: any) => void;
  onSubmit: () => void;
  clearError: (field: keyof FormErrors) => void;
}

export const LoanForm = ({ 
  formData, 
  errors, 
  onFormChange, 
  onSubmit,
  clearError 
}: LoanFormProps) => {
  return (
    <Box component="form" noValidate>
      <TextField
        fullWidth
        label="Valor do empréstimo"
        value={formData.loanAmount}
        onChange={(e) => {
          onFormChange('loanAmount', e.target.value);
          clearError('loanAmount');
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
        error={!!errors.loanAmount}
        helperText={errors.loanAmount}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Prazo"
        value={formData.months}
        onChange={(e) => {
          onFormChange('months', e.target.value);
          clearError('months');
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">meses</InputAdornment>,
        }}
        error={!!errors.months}
        helperText={errors.months}
        sx={{ mb: 3 }}
      />

      <DatePicker
        label="Data de Nascimento"
        value={formData.birthDate}
        onChange={(newValue) => {
          onFormChange('birthDate', newValue);
          clearError('birthDate');
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.birthDate,
            helperText: errors.birthDate,
            sx: { mb: 3 }
          }
        }}
      />

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={onSubmit}
        sx={{ mt: 2 }}
      >
        Calcular
      </Button>
    </Box>
  );
};