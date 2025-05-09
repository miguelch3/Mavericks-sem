import { formatZipCode } from '@mavericks/shared';

describe('formatZipCode', () => {
  it('should format a 5-digit ZIP code correctly', () => {
    expect(formatZipCode('12345')).toBe('12345');
  });

  it('should format a 9-digit ZIP code with a hyphen', () => {
    expect(formatZipCode('123456789')).toBe('12345-6789');
  });

  it('should handle a ZIP code with non-numeric characters and format it correctly', () => {
    expect(formatZipCode('12a34b5678c')).toBe('12345-678');
  });

  it('should truncate any characters beyond the 9th digit', () => {
    expect(formatZipCode('1234567890')).toBe('12345-6789');
  });

  it('should return the first 5 digits even if less than 5 are provided', () => {
    expect(formatZipCode('12')).toBe('12');
  });

  it('should return an empty string for an input with no digits', () => {
    expect(formatZipCode('')).toBe('');
  });

  it('should ignore non-numeric characters but still return the correct formatted output', () => {
    expect(formatZipCode('12-34-56')).toBe('12345-6');
    expect(formatZipCode('abc')).toBe('');
  });

  it('should handle already formatted input and return the same output', () => {
    expect(formatZipCode('12345-6789')).toBe('12345-6789');
  });
});
