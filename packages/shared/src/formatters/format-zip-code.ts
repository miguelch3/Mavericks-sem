export const formatZipCode = (value: string): string => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // Format the string as XXXXX-XXXX if 9 digits are entered
  if (digitsOnly.length > 5) {
    return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 9)}`;
  }

  // Otherwise, return the first 5 digits or less
  return digitsOnly.slice(0, 5);
};
