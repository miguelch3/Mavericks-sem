import { isValidITIN } from '@mavericks/shared';

jest.mock('@/config/client', () => ({
  clientConfig: {
    demo: {
      active: false,
    },
  },
}));

describe('isValidITIN', () => {
  it('should return true for valid ITINs', () => {
    expect(isValidITIN('900-72-3456')).toBe(true);
    expect(isValidITIN('901-73-4567')).toBe(true);
    expect(isValidITIN('912-84-5678')).toBe(true);
    expect(isValidITIN('917-84-5678')).toBe(true);
    expect(isValidITIN('987-85-6789')).toBe(true);
  });

  it('should return false for invalid ITINs (incorrect fourth digit)', () => {
    expect(isValidITIN('923-12-3456')).toBe(false); // Fourth digit is not 7 or 8
    expect(isValidITIN('934-12-3456')).toBe(false); // Fourth digit is not 7 or 8
    expect(isValidITIN('956-12-3456')).toBe(false); // Fourth digit is not 7 or 8
  });

  it('should return false for invalid ITINs (other invalid patterns)', () => {
    expect(isValidITIN('834-52-4335')).toBe(false); // Invalid ITIN
    expect(isValidITIN('123-00-2345')).toBe(false); // Group number is 00
    expect(isValidITIN('123-45-0000')).toBe(false); // Serial number is 0000
    expect(isValidITIN('123-00-0000')).toBe(false); // Both group and serial numbers are invalid
    expect(isValidITIN('000-82-3456')).toBe(false); // Does not start with 9
    expect(isValidITIN('910-00-1234')).toBe(false); // Group number is 00
    expect(isValidITIN('918-72-0000')).toBe(false); // Serial number is 0000 but rest is valid
    expect(isValidITIN('900-12-34567')).toBe(false); // Incorrect length
  });
});
