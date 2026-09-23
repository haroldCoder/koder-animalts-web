/**
 * Crea un objeto `File` válido con contenido de imagen en memoria
 * para simular la selección o arrastre de fotos en formularios.
 */
export const makeMockImageFile = (name = 'avatar-perfil.png', type = 'image/png'): File => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#f97316"/><circle cx="50" cy="40" r="18" fill="#ffffff"/><path d="M25 82 C25 65 36 58 50 58 C64 58 75 65 75 82 Z" fill="#ffffff"/></svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  return new File([blob], name, { type: type || 'image/png' })
}
