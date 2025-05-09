export function isValidUrl(userInput: string): boolean {
  // Regular expression pattern for valid protocol (either http or https with double slashes)
  const protocolPattern = /^(https?:\/\/)/;

  // Regular expression pattern for a valid domain name (no underscores, no consecutive hyphens)
  const domainPattern =
    /^(?!-)(?!.*--)[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/;

  // If input starts with a protocol, validate it strictly
  if (protocolPattern.test(userInput)) {
    try {
      const url = new URL(userInput);

      // Ensure the protocol is either 'http:' or 'https:'
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return false;
      }

      // Ensure the domain matches the domain pattern
      return domainPattern.test(url.hostname);
    } catch {
      return false;
    }
  }

  // If there's no protocol, prepend "https://" and validate the domain
  try {
    const url = new URL(`https://${userInput}`);
    return domainPattern.test(url.hostname);
  } catch {
    return false;
  }
}
