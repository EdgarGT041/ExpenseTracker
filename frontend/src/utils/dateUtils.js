/**
 * Get current date as YYYY-MM-DD string using local timezone
 * Avoids timezone issues where toISOString() converts to UTC
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getLocalDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
