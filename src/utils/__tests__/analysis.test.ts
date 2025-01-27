import { LoanFormData, LoanResult } from '@/types/loan.types';
import { generatePaymentAnalysisData } from '../analysis';

describe('generatePaymentAnalysisData', () => {
  const mockFormData: LoanFormData = {
    loanAmount: '10000',
    months: '12',
    birthDate: '1990-01-01'
  };

  const mockResult: LoanResult = {
    monthlyPayment: 1000,
    interestRate: 0.1,
    totalInterest: 2000,
    available: true,
    totalLoanAmount: 12000
  };

  it('should return empty array when result has no monthly payment', () => {
    const invalidResult: LoanResult = {
      ...mockResult,
      monthlyPayment: 0,
      available: false
    };
    const result = generatePaymentAnalysisData(mockFormData, invalidResult);
    expect(result).toEqual([]);
  });

  it('should return empty array when result has no interest rate', () => {
    const invalidResult: LoanResult = {
      ...mockResult,
      interestRate: 0,
      available: false
    };
    const result = generatePaymentAnalysisData(mockFormData, invalidResult);
    expect(result).toEqual([]);
  });

  it('should generate correct payment analysis data', () => {
    const result = generatePaymentAnalysisData(mockFormData, mockResult);
    
    expect(result.length).toBe(12);
    expect(result[0]).toMatchObject({
      month: 1,
      payment: 1000,
      remainingBalance: expect.any(Number),
      principal: expect.any(Number),
      interest: expect.any(Number)
    });
    
    result.forEach((item: { payment: number; principal: number; interest: number; remainingBalance: number; }) => {
      expect(Number.isInteger(item.payment * 100)).toBeTruthy();
      expect(Number.isInteger(item.principal * 100)).toBeTruthy();
      expect(Number.isInteger(item.interest * 100)).toBeTruthy();
      expect(Number.isInteger(item.remainingBalance * 100)).toBeTruthy();
    });
  });

  it('should calculate declining balance correctly', () => {
    const result = generatePaymentAnalysisData(mockFormData, mockResult);
    
    for (let i = 1; i < result.length; i++) {
      expect(result[i].remainingBalance).toBeLessThan(result[i-1].remainingBalance);
    }
    
    expect(result[result.length - 1].remainingBalance).toBeLessThan(0.01);
  });
});