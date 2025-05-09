export const formatUSPhoneNumber = (input: string): string => {
  // Remove non-numeric characters
  const numericValue = input.replace(/\D/g, '');

  let formattedValue = '';
  if (numericValue.length > 3) {
    formattedValue = `(${numericValue.substring(0, 3)}) ${numericValue.substring(3)}`;
  } else {
    formattedValue = numericValue;
  }
  if (numericValue.length > 6) {
    formattedValue = `${formattedValue.substring(0, 9)} - ${formattedValue.substring(9)}`;
  }
  return formattedValue;
};
