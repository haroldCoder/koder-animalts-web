// Ignorar excepciones no críticas (ej. extensiones del navegador o cálculos de document en iframe)
Cypress.on('uncaught:exception', () => false);

describe('Flujo de Inicio de Sesión (Login) con Mocks y Navegación al Home Principal', () => {
  beforeEach(() => {
    // 1. Limpiar almacenamiento antes de cada prueba para garantizar estado limpio
    cy.clearLocalStorage();

    // 2. Interceptar endpoints de autenticación y refresco
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      fixture: 'login-owner-response.json',
    }).as('loginRequest');

    cy.intercept('POST', '**/auth/refresh', {
      statusCode: 200,
      body: {
        statusCode: 200,
        message: 'Token renovado',
        data: {
          accessToken: 'mock-access-token-refreshed',
          refreshToken: 'mock-refresh-token-refreshed',
          user: {
            id: 'mock-user-id-001',
            email: 'carlos.gomez@example.com',
            name: 'Carlos Gomez',
            role: 'OWNER',
          },
        },
      },
    }).as('refreshTokenRequest');

    // 3. Interceptar llamadas que realiza el Home y el Layout para el usuario Dueño (Owner)
    cy.intercept('GET', '**/users/*/role', {
      statusCode: 200,
      fixture: 'login-owner-user-role.json',
    }).as('getUserRoleRequest');

    cy.intercept('GET', '**/pet/owner/userId/*', {
      statusCode: 200,
      fixture: 'login-pets-owner.json',
    }).as('getOwnerPetsRequest');

    cy.intercept('GET', '**/appointment/user/*', {
      statusCode: 200,
      body: {
        statusCode: 200,
        data: [],
      },
    }).as('getAppointmentsRequest');

    cy.intercept('GET', '**/vaccination/user/*', {
      statusCode: 200,
      body: {
        statusCode: 200,
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      },
    }).as('getVaccinationsRequest');

    // 4. Interceptar llamadas para veterinario por si se evalúa dicha vista
    cy.intercept('GET', '**/pet/veterinarian/userId/*', {
      statusCode: 200,
      body: {
        statusCode: 200,
        data: [],
      },
    }).as('getVetPetsRequest');

    cy.intercept('GET', '**/veterinary-clinics/summary/veterinarian/userId/*', {
      statusCode: 200,
      body: {
        statusCode: 200,
        data: {
          totalPets: 0,
          totalAppointments: 0,
        },
      },
    }).as('getVetClinicSummaryRequest');

    // 5. Visitar la pantalla de login
    cy.visit('/Auth');
  });

  it('Debe validar campos requeridos al enviar el formulario vacío', () => {
    // Al dar clic en el botón de submit (type="submit") sin llenar datos
    cy.get('button[type="submit"]').click();

    // Validar mensajes de validación
    cy.contains('El correo electrónico es requerido').should('be.visible');
    cy.contains('La contraseña es requerida').should('be.visible');
  });

  it('Debe validar formato de correo inválido y longitud mínima de contraseña', () => {
    cy.get('input[placeholder="Correo electrónico"]').type('correo@invalido');
    cy.get('input[placeholder="Contraseña"]').type('123');

    cy.get('button[type="submit"]').click();

    cy.contains('Dirección de correo electrónico inválida').should('be.visible');
    cy.contains('La contraseña debe tener al menos 6 caracteres').should('be.visible');
  });

  it('Debe mostrar error si el backend devuelve credenciales inválidas (Mock 401)', () => {
    // Sobrescribir interceptor para simular fallo de credenciales
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: {
        statusCode: 401,
        message: 'Correo electrónico o contraseña incorrectos',
      },
    }).as('loginErrorRequest');

    cy.get('input[placeholder="Correo electrónico"]').type('usuario_erroneo@example.com');
    cy.get('input[placeholder="Contraseña"]').type('passwordIncorrecta');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginErrorRequest');

    // Verificar que el mensaje devuelto por el mock se muestra en pantalla
    cy.contains('Correo electrónico o contraseña incorrectos').should('be.visible');

    // Verificar que permanece en la pantalla de autenticación
    cy.url().should('include', '/Auth');
  });

  it('Debe iniciar sesión exitosamente con datos mockeados y permanecer en el Home principal', () => {
    // 1. Verificar presencia de campos
    cy.contains('h1', 'Bienvenido').should('be.visible');
    cy.get('input[placeholder="Correo electrónico"]').should('be.visible');
    cy.get('input[placeholder="Contraseña"]').should('be.visible');

    // 2. Ingresar credenciales válidas
    cy.get('input[placeholder="Correo electrónico"]').type('carlos.gomez@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');

    // 3. Enviar el formulario
    cy.get('button[type="submit"]').click();

    // 4. Esperar que se procese el login mockeado
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    // 5. Verificar que los datos de sesión se guardaron en localStorage correctamente
    cy.window().should((win) => {
      expect(win.localStorage.getItem('koder_access_token')).to.eq('mock-access-token-owner-123');
      expect(win.localStorage.getItem('koder_refresh_token')).to.eq('mock-refresh-token-owner-123');
      const user = JSON.parse(win.localStorage.getItem('koder_user') || '{}');
      expect(user.role).to.eq('OWNER');
      expect(user.name).to.eq('Carlos Gomez');
    });

    // 6. Verificar que la URL cambió al Home principal
    cy.url().should('include', '/home');

    // 7. Esperar que cargue el rol y los datos de mascotas mockeados
    cy.wait('@getUserRoleRequest');
    cy.wait('@getOwnerPetsRequest');

    // 8. Confirmar que permanece en el Home principal y NO se sale de nuevo al /Auth
    cy.url().should('include', '/home');

    // 9. Validar elementos visibles del Home principal (Header y Contenido)
    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('Bienvenido, Carlos Gomez').should('be.visible');
    cy.contains('button', 'Cerrar sesión').should('be.visible');

    // 10. Validar la sección de mascotas y la mascota devuelta por el mock
    cy.contains('h2', 'Tus mascotas').should('be.visible');
    cy.contains('Firulais').should('be.visible');
  });

  it('Debe redirigir a /select-user si el usuario que inicia sesión tiene rol UNKNOWN', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        statusCode: 200,
        message: 'Login exitoso',
        data: {
          accessToken: 'mock-token-unknown-role',
          refreshToken: 'mock-refresh-unknown-role',
          user: {
            id: 'mock-user-unknown-001',
            email: 'nuevo@example.com',
            name: 'Usuario Nuevo',
            role: 'UNKNOWN',
          },
        },
      },
    }).as('loginUnknownRequest');

    cy.get('input[placeholder="Correo electrónico"]').type('nuevo@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginUnknownRequest');
    cy.url().should('include', '/select-user');
  });

  it('Debe iniciar sesión exitosamente como Veterinario y mostrar el panel de veterinario en el Home', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      fixture: 'login-vet-response.json',
    }).as('loginVetRequest');

    cy.intercept('GET', '**/users/*/role', {
      statusCode: 200,
      fixture: 'login-vet-user-role.json',
    }).as('getVetRoleRequest');

    cy.get('input[placeholder="Correo electrónico"]').type('dra.maria@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginVetRequest');
    cy.url().should('include', '/home');
    cy.wait('@getVetRoleRequest');

    // Comprobar que permanece en /home
    cy.url().should('include', '/home');

    // Comprobar elementos en el Home para veterinario
    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('Bienvenido, Dr. Maria Lopez').should('be.visible');
  });
});
