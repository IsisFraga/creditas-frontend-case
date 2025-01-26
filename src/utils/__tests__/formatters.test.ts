import { formatCurrency, formatPercentage, formatToBRL } from '../formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format currency values correctly', () => {
      const formattedValue = formatCurrency(1000);
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toContain('1.000');
      expect(formattedValue).toContain(',00');
    });

    it('should format decimal values correctly', () => {
      const formattedValue = formatCurrency(1500.50);
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toContain('1.500');
      expect(formattedValue).toContain(',50');
    });

    it('should format zero correctly', () => {
      const formattedValue = formatCurrency(0);
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toContain('0,00');
    });

    it('should handle large numbers correctly', () => {
      const formattedValue = formatCurrency(1000000);
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toContain('1.000.000');
      expect(formattedValue).toContain(',00');
    });

    it('should handle negative values correctly', () => {
      const formattedValue = formatCurrency(-1500.75);
      expect(formattedValue).toContain('-');
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toContain('1.500');
      expect(formattedValue).toContain(',75');
    });

    it('should handle small decimal values correctly', () => {
      const formattedValue = formatCurrency(0.01);
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toContain('0,01');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage values correctly', () => {
      expect(formatPercentage(0.05)).toBe('5.0%');
      expect(formatPercentage(0.035)).toBe('3.5%');
      expect(formatPercentage(0)).toBe('0.0%');
    });

    it('should handle decimal precision correctly', () => {
      expect(formatPercentage(0.0333)).toBe('3.3%');
      expect(formatPercentage(0.0666)).toBe('6.7%');
    });

    it('should handle values greater than 100%', () => {
      expect(formatPercentage(1.5)).toBe('150.0%');
      expect(formatPercentage(2)).toBe('200.0%');
    });

    it('should handle negative percentages', () => {
      expect(formatPercentage(-0.25)).toBe('-25.0%');
      expect(formatPercentage(-0.075)).toBe('-7.5%');
    });
  });

  describe('formatToBRL', () => {
    it('should format basic numeric strings', () => {
      expect(formatToBRL('1000')).toBe('1.000,00');
      expect(formatToBRL('1234567')).toBe('1.234.567,00');
      expect(formatToBRL('0')).toBe('0,00');
    });

    it('should handle decimal values', () => {
      expect(formatToBRL('1500,50')).toBe('1.500,50');
      expect(formatToBRL('1500.50')).toBe('1.500,50');
      expect(formatToBRL('0,50')).toBe('0,50');
    });

    it('should handle formatted input strings', () => {
      expect(formatToBRL('R$ 1.000,00')).toBe('1.000,00');
      expect(formatToBRL('R$1.234,56')).toBe('1.234,56');
      expect(formatToBRL('1.234,56')).toBe('1.234,56');
    });

    it('should throw error for invalid values', () => {
      expect(() => formatToBRL('abc')).toThrow('Valor inválido para formatação');
      expect(() => formatToBRL('')).toThrow('Valor inválido para formatação');
      expect(() => formatToBRL('R$')).toThrow('Valor inválido para formatação');
    });
  });
});