export function isValidITIN(rawInput: string): boolean {
  const input = rawInput.replaceAll('-', ''); // Remove any dashes for easier processing

  // Ensure the ITIN starts with 9, the fourth digit is 7 or 8, and it's 9 digits long
  const regex = /^9\d{2}[78]\d{5}$/;

  if (!regex.test(input)) {
    return false;
  }

  // Split into parts: XXX-XX-XXXX (this matches the ITIN format)
  const parts = input.match(/^(\d{3})(\d{2})(\d{4})$/);

  if (parts) {
    const groupNumber = parts[2]; // Second segment (XX)
    const serialNumber = parts[3]; // Third segment (XXXX)

    // Group number cannot be "00", and serial number cannot be "0000"
    if (groupNumber === '00' || serialNumber === '0000') {
      return false;
    }
  }

  return true;
}
