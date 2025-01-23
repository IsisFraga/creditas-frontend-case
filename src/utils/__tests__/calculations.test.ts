import { calculateLoan, getInterestRate } from '../calculations';

describe('Loan Calculations', () => {
  describe('getInterestRate', () => {
    it('should return 5% for age <= 25', () => {
      const youngDate = new Date();
      youngDate.setFullYear(youngDate.getFullYear() - 25);
      expect(getInterestRate(youngDate)).toBe(0.05);
    });

    it('should return 3% for age between 26 and 40', () => {
      const middleDate = new Date();
      middleDate.setFullYear(middleDate.getFullYear() - 35);
      expect(getInterestRate(middleDate)).toBe(0.03);
    });

    it('should return 2% for age between 41 and 60', () => {
      const seniorDate = new Date();
      seniorDate.setFullYear(seniorDate.getFullYear() - 50);
      expect(getInterestRate(seniorDate)).toBe(0.02);
    });

    it('should return 4% for age > 60', () => {
      const elderlyDate = new Date();
      elderlyDate.setFullYear(elderlyDate.getFullYear() - 65);
      expect(getInterestRate(elderlyDate)).toBe(0.04);
    });
  });

  describe('calculateLoan', () => {
    const testLoanParams = {
      amount: 10000,
      months: 12,
      birthDate: new Date(1990, 0, 1), // Pessoa com ~33 anos
    };

    it('should calculate loan correctly', () => {
      const result = calculateLoan(testLoanParams);
      
      // Verifica se todos os campos necessários estão presentes
      expect(result).toHaveProperty('monthlyPayment');
      expect(result).toHaveProperty('totalAmount');
      expect(result).toHaveProperty('totalInterest');
      expect(result).toHaveProperty('interestRate');

      // Verifica se os valores fazem sentido matematicamente
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalAmount).toBeGreaterThan(testLoanParams.amount);
      expect(result.totalInterest).toBe(result.totalAmount - testLoanParams.amount);
      expect(result.monthlyPayment * testLoanParams.months).toBeCloseTo(result.totalAmount, 2);
    });

    it('should use correct interest rate', () => {
      const result = calculateLoan(testLoanParams);
      expect(result.interestRate).toBe(0.03); // 3% para idade entre 26-40
    });
  });
});