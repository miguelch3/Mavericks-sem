export const formatSSNOrITIN = (input: string): string => {
  // Remove non-numeric characters
  const numericValue = input.replace(/\D/g, '');

  let formattedValue = '';
  if (numericValue.length > 5) {
    formattedValue = `${numericValue.substring(0, 3)}-${numericValue.substring(3, 5)}-${numericValue.substring(5)}`;
  } else if (numericValue.length > 3) {
    formattedValue = `${numericValue.substring(0, 3)}-${numericValue.substring(3)}`;
  } else {
    formattedValue = numericValue;
  }
  return formattedValue;
};
