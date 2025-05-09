export function isValidEIN(ein: string): boolean {
  const einRegex = /^\d{2}-\d{7}$/;
  if (!einRegex.test(ein)) return false;

  const [firstPart, secondPart] = ein.split('-');
  const firstTwoDigits = parseInt(firstPart || '', 10);
  const lastSevenDigits = secondPart;

  return firstTwoDigits !== 0 && lastSevenDigits !== '0000000';
}
