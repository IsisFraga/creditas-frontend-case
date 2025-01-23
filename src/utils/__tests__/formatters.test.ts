import { formatCurrency, formatPercentage } from '../formatters';

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
  });
});