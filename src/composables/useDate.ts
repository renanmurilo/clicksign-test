export function formatDateForInput(dateString?: string): string {
  if (!dateString) return "";
  return dateString.substring(0, 10);
}
