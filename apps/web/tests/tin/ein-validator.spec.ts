import { isValidEIN } from '@mavericks/shared';

jest.mock('@/config/client', () => ({
  clientConfig: {
    demo: {
      active: false,
    },
  },
}));

describe('isValidEIN', () => {
  it('should return true for valid EINs', () => {
    expect(isValidEIN('11-1234567')).toBe(true);
    expect(isValidEIN('12-3456789')).toBe(true);
    expect(isValidEIN('99-9876543')).toBe(true);
  });

  it('should return false for invalid EINs', () => {
    expect(isValidEIN('00-1234567')).toBe(false);
    expect(isValidEIN('12-0000000')).toBe(false);
    expect(isValidEIN('11-0000000')).toBe(false);
    expect(isValidEIN('12-34567')).toBe(false);
    expect(isValidEIN('11-12345678')).toBe(false);
  });
});
