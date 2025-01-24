import { Box } from '@mui/material';
import { SimulatorCard } from './SimulatorCard';
import { LoanResultCard } from '@/components/loan/LoanResult';
import type { FormErrors, LoanFormData, LoanResult } from '@/types/loan.types';

interface SimulatorSectionProps {
  formData: LoanFormData;
  errors: FormErrors;
  result: LoanResult | null;
  onFormChange: (field: keyof LoanFormData, value: any) => void;
  onSubmit: () => void;
  clearError: (field: keyof FormErrors) => void;
}
export const SimulatorSection = ({
  formData,
  errors,
  result,
  onFormChange,
  onSubmit,
  clearError
 }: SimulatorSectionProps) => (
  <Box 
    component="section"
    sx={{
      height: 480,
      width: '100%',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px'
      }
    }}
  >
    <SimulatorCard
      formData={formData}
      errors={errors}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      clearError={clearError}
    /> 
  </Box>
 );