export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const formatToBRL = (value: string) => {
  let numericValue = value.replace(/R\$\s?/g, '');
  if (numericValue.includes(',')) {
    numericValue = numericValue.replace(/\./g, '').replace(',', '.');
  }
  
  const number = parseFloat(numericValue);
  
  if (isNaN(number)) {
    throw new Error('Valor inválido para formatação');
  }
  
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}