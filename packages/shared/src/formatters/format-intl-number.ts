export const formatIntlNumber = (input: number): string => {
  return Intl.NumberFormat('en-US').format(input);
};
