export const formatCurrency = (input: string): string => {
  // Remove non-numeric characters
  const numericValue = input?.replace(/\D/g, '') ?? '';
  const formattedValue =
    numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';

  return formattedValue;
};
