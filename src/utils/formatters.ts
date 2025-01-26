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
  let numericValue = value.replace(/[^\d.,]/g, '');
  numericValue = numericValue.replace(',', '.');
  const number = parseFloat(numericValue);

  if (isNaN(number)) {
    throw new Error('Valor inválido para formatação');
  }

  return number
    .toFixed(2) 
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .replace('.', ',');
}