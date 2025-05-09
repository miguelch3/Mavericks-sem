export const formatEIN = (input: string): string => {
  // Remove non-numeric characters
  const numericValue = input.replace(/\D/g, '');

  let formattedValue = '';
  if (numericValue.length > 2) {
    formattedValue = `${numericValue.substring(0, 2)}-${numericValue.substring(2)}`;
  } else {
    formattedValue = numericValue;
  }
  return formattedValue;
};
