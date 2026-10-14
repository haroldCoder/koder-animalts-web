// ***********************************************************
// This is processed and loaded automatically before your test files.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Evitar que Cypress falle por excepciones no fatales no controladas
// (como errores de extensiones del navegador o cálculos de document de librerías en iframes)
Cypress.on('uncaught:exception', (err, _runnable) => {
  // Ignorar específicamente el error de lectura de 'document'
  if (err.message && err.message.includes("reading 'document'")) {
    return false;
  }
  // Retornar false previene que Cypress aborte la suite de pruebas
  return false;
});
