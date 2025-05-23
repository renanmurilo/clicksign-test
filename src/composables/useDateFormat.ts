export function useDateFormat() {
  function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("pt-BR", options);
  }

  return {
    formatDate,
  };
}
