export function useHighlight() {
  function highlight(text: string, termo: string = ""): string {
    if (!termo) return text;

    const escapedTermo = termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedTermo})`, "gi");

    return text.replace(regex, `<mark>$1</mark>`);
  }

  return { highlight };
}
