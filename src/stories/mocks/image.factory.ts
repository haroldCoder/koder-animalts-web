/**
 * Genera una imagen embebida (data URI) para las stories.
 * Evita depender de la red: las stories siempre muestran una imagen real
 * y no aparece el fallback por una carga fallida.
 */
export const makeImage = (text: string, background = '#ff6a2b'): string => {
  const initial = text.trim().charAt(0).toUpperCase() || '?'

  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">',
    `<rect width="200" height="200" fill="${background}"/>`,
    '<text x="100" y="132" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="bold" fill="#ffffff" text-anchor="middle">',
    initial,
    '</text>',
    '</svg>',
  ].join('')

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
