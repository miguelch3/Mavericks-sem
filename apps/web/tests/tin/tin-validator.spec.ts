import { isValidTIN } from '@mavericks/shared';

jest.mock('@/config/client', () => ({
  clientConfig: {
    demo: {
      active: false,
    },
  },
}));

describe('isValidSharedNumber', () => {
  it('should return true for valid shared numbers', () => {
    expect(isValidTIN('123456780')).toBe(true);
    expect(isValidTIN('098765432')).toBe(true);
    expect(isValidTIN('999999998')).toBe(true);
    expect(isValidTIN('111111112')).toBe(true);
    expect(isValidTIN('222222221')).toBe(true);
  });

  it('should return false for invalid shared numbers', () => {
    expect(isValidTIN('000000000')).toBe(false);
    expect(isValidTIN('111111111')).toBe(false);
    expect(isValidTIN('222222222')).toBe(false);
    expect(isValidTIN('333333333')).toBe(false);
    expect(isValidTIN('444444444')).toBe(false);
    expect(isValidTIN('555555555')).toBe(false);
    expect(isValidTIN('666666666')).toBe(false);
    expect(isValidTIN('777777777')).toBe(false);
    expect(isValidTIN('888888888')).toBe(false);
    expect(isValidTIN('999999999')).toBe(false);
    expect(isValidTIN('123456789')).toBe(false);
    expect(isValidTIN('012345678')).toBe(false);
    expect(isValidTIN('987654321')).toBe(false);
  });
});
