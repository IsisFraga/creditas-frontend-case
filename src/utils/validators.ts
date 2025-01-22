export const validateLoanAmount = (amount: string): string | undefined => {
  if (!amount) return 'Informe o valor do empréstimo';
  const value = Number(amount);
  if (value < 1000) return 'O valor mínimo é R$ 1.000';
  if (value > 1000000) return 'O valor máximo é R$ 1.000.000';
};

export const validateMonths = (months: string): string | undefined => {
  if (!months) return 'Informe o prazo';
  const value = Number(months);
  if (value < 1) return 'O prazo mínimo é 1 mês';
  if (value > 360) return 'O prazo máximo é 360 meses';
};

export const validateBirthDate = (date: Date | null): string | undefined => {
  if (!date) return 'Informe a data de nascimento';
  const age = new Date().getFullYear() - date.getFullYear();
  if (age < 18) return 'É necessário ter mais de 18 anos';
  if (age > 100) return 'Data de nascimento inválida';
};