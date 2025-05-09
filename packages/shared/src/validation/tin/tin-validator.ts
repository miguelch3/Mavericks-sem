export function isValidTIN(rawInput: string): boolean {
  const input = rawInput.replaceAll('-', '');
  const invalidPatterns = new Set<string>();

  // Patterns with repeated digits
  for (let i = 0; i <= 9; i += 1) {
    invalidPatterns.add(i.toString().repeat(9)); // e.g., "000000000", "111111111", ...
  }

  // Additional invalid patterns
  invalidPatterns.add('123456789');
  invalidPatterns.add('012345678');
  invalidPatterns.add('987654321');

  return !invalidPatterns.has(input);
}
