// Utility to replace 'A' with '/'
export const applySlashRule = (text) => {
  if (!text) return text;
  // Replaces the first 'A' with '/' if we want just the leading, or all 'A's. 
  // "replace the leading uppercase character 'A' with a forward-slash"
  // E.g. "ABOUT ME" -> "/BOUT ME"
  return text.replace(/^A/, '/');
};

// Utility to replace 'N' with 'И'
export const applyGlyphInversion = (text) => {
  if (!text) return text;
  return text.replace(/N/g, 'И');
};
