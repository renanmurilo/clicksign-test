export function useImageUtils() {
  function extrairIdDaImagem(imagem: string): string {
    const match = imagem.match(/files\/([^/]+)\//);
    return match ? match[1] : "";
  }

  return {
    extrairIdDaImagem,
  };
}
