import { calculateLoan, getInterestRate } from '../calculations';
import { format } from 'date-fns';
import type { LoanFormData } from '@/types/loan.types';

describe('Loan Calculations', () => {
  describe('getInterestRate', () => {
    it('should return 5% for age <= 25', () => {
      const youngDate = format(new Date(2000, 0, 1), 'dd/MM/yyyy');
      expect(getInterestRate(youngDate)).toBe(0.05);
    });

    it('should return 3% for age between 26 and 40', () => {
      const middleDate = format(new Date(1990, 0, 1), 'dd/MM/yyyy');
      expect(getInterestRate(middleDate)).toBe(0.03);
    });

    it('should return 2% for age between 41 and 60', () => {
      const seniorDate = format(new Date(1970, 0, 1), 'dd/MM/yyyy');
      expect(getInterestRate(seniorDate)).toBe(0.02);
    });

    it('should return 4% for age > 60', () => {
      const elderlyDate = format(new Date(1950, 0, 1), 'dd/MM/yyyy');
      expect(getInterestRate(elderlyDate)).toBe(0.04);
    });
  });

  describe('calculateLoan', () => {
    const testLoanParams: LoanFormData = {
      loanAmount: "10000",
      months: "12",
      birthDate: "01/01/1990"
    };

    it('should calculate loan correctly', () => {
      const result = calculateLoan(testLoanParams);
      
      // Verifica se todos os campos necessários estão presentes
      expect(result).toHaveProperty('monthlyPayment');
      expect(result).toHaveProperty('totalLoanAmount');
      expect(result).toHaveProperty('totalInterest');
      expect(result).toHaveProperty('interestRate');
      expect(result).toHaveProperty('available');

      // Verifica se os valores fazem sentido matematicamente
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalLoanAmount).toBeGreaterThan(Number(testLoanParams.loanAmount));
      expect(result.totalInterest).toBeCloseTo(result.totalLoanAmount - Number(testLoanParams.loanAmount), 2);
      expect(result.monthlyPayment * Number(testLoanParams.months)).toBeCloseTo(result.totalLoanAmount, 2);
    });

    it('should use correct interest rate', () => {
      const result = calculateLoan(testLoanParams);
      expect(result.interestRate).toBe(0.03); // 3% para idade entre 26-40
    });
  });
});