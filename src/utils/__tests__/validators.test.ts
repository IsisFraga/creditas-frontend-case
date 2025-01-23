import { validateLoanAmount, validateMonths, validateBirthDate } from '../validators';

describe('Validators', () => {
  describe('validateLoanAmount', () => {
    it('should validate empty amount', () => {
      expect(validateLoanAmount('')).toBe('Informe o valor do empréstimo');
    });

    it('should validate minimum amount', () => {
      expect(validateLoanAmount('999')).toBe('O valor mínimo é R$ 1.000');
      expect(validateLoanAmount('1000')).toBeUndefined();
    });

    it('should validate maximum amount', () => {
      expect(validateLoanAmount('1000001')).toBe('O valor máximo é R$ 1.000.000');
      expect(validateLoanAmount('1000000')).toBeUndefined();
    });
  });

  describe('validateMonths', () => {
    it('should validate empty months', () => {
      expect(validateMonths('')).toBe('Informe o prazo');
    });

    it('should validate minimum months', () => {
      expect(validateMonths('0')).toBe('O prazo mínimo é 1 mês');
      expect(validateMonths('1')).toBeUndefined();
    });

    it('should validate maximum months', () => {
      expect(validateMonths('361')).toBe('O prazo máximo é 360 meses');
      expect(validateMonths('360')).toBeUndefined();
    });
  });

  describe('validateBirthDate', () => {
    it('should validate null date', () => {
      expect(validateBirthDate(null)).toBe('Informe a data de nascimento');
    });

    it('should validate minimum age', () => {
      const minorDate = new Date();
      minorDate.setFullYear(minorDate.getFullYear() - 17);
      expect(validateBirthDate(minorDate)).toBe('É necessário ter mais de 18 anos');

      const adultDate = new Date();
      adultDate.setFullYear(adultDate.getFullYear() - 18);
      expect(validateBirthDate(adultDate)).toBeUndefined();
    });

    it('should validate maximum age', () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 101);
      expect(validateBirthDate(oldDate)).toBe('Data de nascimento inválida');
    });
  });
});