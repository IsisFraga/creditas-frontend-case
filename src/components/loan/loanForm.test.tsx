import { render, screen, waitFor } from '@testing-library/react';
import { LoanForm } from './LoanForm';
import { LoanCalculatorProvider } from '@/contexts/LoanCalculator';
import userEvent from '@testing-library/user-event';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { FC, ReactNode } from 'react';
import { format } from 'date-fns';


const TestWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <LoanCalculatorProvider>
      {children}
    </LoanCalculatorProvider>
  </LocalizationProvider>
);

const renderLoanForm = () => {
  return render(<LoanForm />, { wrapper: TestWrapper });
};

describe('LoanForm', () => {
  const user = userEvent.setup();

  it('validates minimum loan amount', async () => {
    renderLoanForm();
  
    await userEvent.type(screen.getByLabelText(/valor do empréstimo/i), '500');
    await userEvent.click(screen.getByText('Calcular'));
  
    await waitFor(() => {
      expect(
        screen.getByText(/valor do empréstimo deve ser no mínimo r\$1\.000,00/i)
      ).toBeInTheDocument();
    });
  });
  it('validates minimum months', async () => {
    renderLoanForm();
    
    await user.type(screen.getByLabelText(/prazo/i), '6');
    const button = screen.getByText('Calcular');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/prazo deve ser no mínimo 12 meses/i)).toBeInTheDocument();
    });
  });

  it('formats loan amount with currency mask', async () => {
    renderLoanForm();
    
    await user.type(screen.getByLabelText(/valor do empréstimo/i), '1000000');

    await waitFor(() => {
      expect(screen.getByLabelText(/valor do empréstimo/i)).toHaveValue('R$ 1.000.000');
    });
  });

  it('clears errors when input is corrected', async () => {
    renderLoanForm();
    
    const loanInput = screen.getByLabelText(/valor do empréstimo/i);
    await user.type(loanInput, '500');
    const button = screen.getByText('Calcular');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/valor do empréstimo deve ser no mínimo/i)).toBeInTheDocument();
    });

    await user.clear(loanInput);
    await user.type(loanInput, '1500000');

    await waitFor(() => {
      expect(screen.queryByText(/valor do empréstimo deve ser no mínimo/i)).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    renderLoanForm();
    
    const dateInput = screen.getByLabelText(/data de nascimento/i);
    const formattedDate = format(new Date(1990, 0, 1), 'dd/MM/yyyy');
    const button = screen.getByText('Calcular');

    await user.type(screen.getByLabelText(/valor do empréstimo/i), '150000');
    await user.type(screen.getByLabelText(/prazo/i), '24');
    await user.type(dateInput, formattedDate);
    
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryByText(/valor do empréstimo deve ser no mínimo/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/prazo deve ser no mínimo/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/você deve ter pelo menos 18 anos/i)).not.toBeInTheDocument();
    });
  });
});