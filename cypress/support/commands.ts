// ***********************************************
// Custom Cypress commands can be declared here.
// ***********************************************

export interface MockSessionOptions {
  id?: string;
  email?: string;
  name?: string;
  role?: 'OWNER' | 'VETERINARIAN';
  image?: string;
  accessToken?: string;
  refreshToken?: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Inicia sesión desde el formulario UI completando email, contraseña y enviando el formulario
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Inicia sesión por UI con mock preconfigurado para OWNER o VETERINARIAN
       */
      loginAs(role: 'OWNER' | 'VETERINARIAN'): Chainable<void>;

      /**
       * Visita una URL inyectando los datos de sesión en localStorage antes de que React cargue
       * Evita que ProtectedRoute redirija a /Auth
       */
      visitWithSession(url: string, options?: MockSessionOptions): Chainable<void>;

      /**
       * Simula la sesión directamente en localStorage sin pasar por el formulario UI
       */
      setSession(options?: MockSessionOptions): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('input[placeholder="Correo electrónico"]').clear().type(email);
  cy.get('input[placeholder="Contraseña"]').clear().type(password);
  // Usar button[type="submit"] para no confundir con el TabsTrigger "Iniciar Sesión"
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('loginAs', (role: 'OWNER' | 'VETERINARIAN') => {
  const isVet = role === 'VETERINARIAN';
  const fixture = isVet ? 'login-vet-response.json' : 'login-owner-response.json';
  const email = isVet ? 'dra.maria@example.com' : 'carlos.gomez@example.com';

  cy.intercept('POST', '**/auth/login', {
    statusCode: 200,
    fixture,
  }).as('quickLoginRequest');

  cy.visit('/Auth');
  cy.login(email, 'password123');
  cy.wait('@quickLoginRequest');
  cy.url().should('include', '/home');
});

Cypress.Commands.add('visitWithSession', (url: string, options: MockSessionOptions = {}) => {
  const role = options.role || 'OWNER';
  const userId = options.id || 'mock-user-id-001';
  const name = options.name || (role === 'VETERINARIAN' ? 'Maria Lopez' : 'Carlos Gomez');
  const email = options.email || (role === 'VETERINARIAN' ? 'dra.maria@example.com' : 'carlos.gomez@example.com');
  const accessToken = options.accessToken || 'mock-access-token-123';
  const refreshToken = options.refreshToken || 'mock-refresh-token-123';
  const image = options.image || 'https://example.com/avatar.png';

  const userProfile = {
    id: userId,
    email,
    name,
    image,
    role,
    ...(role === 'OWNER' ? { ownerId: 'mock-owner-001' } : { veterinarianId: userId }),
  };

  cy.visit(url, {
    onBeforeLoad(win) {
      win.localStorage.setItem('koder_access_token', accessToken);
      win.localStorage.setItem('koder_refresh_token', refreshToken);
      win.localStorage.setItem('koder_user', JSON.stringify(userProfile));
      win.localStorage.setItem('user', JSON.stringify(userId));
    },
  });
});

Cypress.Commands.add('setSession', (options: MockSessionOptions = {}) => {
  const role = options.role || 'OWNER';
  const userId = options.id || 'mock-user-id-001';
  const name = options.name || (role === 'VETERINARIAN' ? 'Maria Lopez' : 'Carlos Gomez');
  const email = options.email || (role === 'VETERINARIAN' ? 'dra.maria@example.com' : 'carlos.gomez@example.com');
  const accessToken = options.accessToken || 'mock-access-token-123';
  const refreshToken = options.refreshToken || 'mock-refresh-token-123';
  const image = options.image || 'https://example.com/avatar.png';

  const userProfile = {
    id: userId,
    email,
    name,
    image,
    role,
    ...(role === 'OWNER' ? { ownerId: 'mock-owner-001' } : { veterinarianId: userId }),
  };

  cy.window().then((win) => {
    win.localStorage.setItem('koder_access_token', accessToken);
    win.localStorage.setItem('koder_refresh_token', refreshToken);
    win.localStorage.setItem('koder_user', JSON.stringify(userProfile));
    win.localStorage.setItem('user', JSON.stringify(userId));
    win.dispatchEvent(new CustomEvent('koder:auth-changed'));
  });
});

export {};
