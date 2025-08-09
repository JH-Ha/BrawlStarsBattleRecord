// Utility function to safely convert translation results to string
export const safeTranslation = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object' && value !== null) {
    return String(value);
  }
  return String(value || '');
};