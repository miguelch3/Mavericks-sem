import { isValidUrl } from '@mavericks/shared';

jest.mock('@/config/client', () => ({
  clientConfig: {
    demo: {
      active: false,
    },
  },
}));

describe('isValidUrl', () => {
  it('should return true for a valid URL', () => {
    expect(isValidUrl('example.com')).toBe(true);
    expect(isValidUrl('subdomain.example.com')).toBe(true);
    expect(isValidUrl('http://www.example.com')).toBe(true);
    expect(isValidUrl('https://www.example.com')).toBe(true);
    expect(isValidUrl('https://www.example1.com')).toBe(true);
    expect(isValidUrl('https://www.exa1mple.com')).toBe(true);
    expect(isValidUrl('https://www.exa123mple.com')).toBe(true);
    expect(isValidUrl('https://www.example123.com')).toBe(true);
  });

  it('should return false for malformed URLs', () => {
    // Missing domain extension
    expect(isValidUrl('example')).toBe(false);

    // Domain starting with a hyphen
    expect(isValidUrl('-example.com')).toBe(false);

    // Consecutive hyphens in domain
    expect(isValidUrl('exa--mple.com')).toBe(false);

    // Special characters in domain
    expect(isValidUrl('exa$mple.com')).toBe(false);

    // Invalid domain extension
    expect(isValidUrl('example.c')).toBe(false);

    // URL with spaces
    expect(isValidUrl('exa mple.com')).toBe(false);

    // Invalid subdomain structure (underscore)
    expect(isValidUrl('sub_domain.example.com')).toBe(false);

    // Invalid URL structure (malformed protocol)
    expect(isValidUrl('http:/www.example.com')).toBe(false);
    expect(isValidUrl('h://www.example.com')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isValidUrl('')).toBe(false);
  });

  it('should return true for valid URLs with paths', () => {
    expect(isValidUrl('example.com/path')).toBe(true);
    expect(isValidUrl('subdomain.example.com/path/to/resource')).toBe(true);
  });
});
