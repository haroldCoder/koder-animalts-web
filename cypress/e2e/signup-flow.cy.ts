// Ignorar excepciones no críticas (ej. extensiones del navegador o cálculos de document en iframe)
Cypress.on('uncaught:exception', () => false);

describe('Flujo de Registro (SignUp) y Selección de Tipo de Usuario', () => {
  beforeEach(() => {
    // Interceptar llamadas al API antes de cada test
    cy.intercept('POST', '**/auth/signup', {
      statusCode: 201,
      fixture: 'signup-response.json',
    }).as('signupRequest');

    cy.intercept('GET', '**/users/*/role', {
      statusCode: 200,
      fixture: 'user-role-response.json',
    }).as('getUserRoleRequest');

    cy.intercept('POST', '**/owner/create', {
      statusCode: 201,
      body: {
        statusCode: 201,
        message: 'Owner created successfully',
      },
    }).as('createOwnerRequest');

    cy.intercept('GET', '**/veterinary-clinics/all', {
      statusCode: 200,
      fixture: 'clinics-response.json',
    }).as('getClinicsRequest');

    cy.intercept('POST', '**/veterinarian/create', {
      statusCode: 201,
      body: {
        statusCode: 201,
        message: 'Veterinarian created successfully',
      },
    }).as('createVeterinarianRequest');

    // Visitar la página de autenticación
    cy.visit('/Auth');
  });

  it('Debe mostrar la pestaña de Registro y validar campos requeridos', () => {
    // Cambiar a la pestaña de Registro
    cy.contains('button', 'Registro').click();

    // Intentar enviar el formulario vacío
    cy.contains('button', 'Crear Cuenta').click();

    // Validar mensajes de error esperados
    cy.contains('El nombre es requerido').should('be.visible');
    cy.contains('El correo electrónico es requerido').should('be.visible');
    cy.contains('La contraseña es requerida').should('be.visible');
    cy.contains('La imagen de perfil es requerida').should('be.visible');
  });

  it('Debe validar que las contraseñas coincidan', () => {
    cy.contains('button', 'Registro').click();

    cy.get('input[placeholder="Nombre completo"]').type('Carlos Gomez');
    cy.get('input[placeholder="Correo electrónico"]').type('carlos@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');
    cy.get('input[placeholder="Confirmar"]').type('passwordDiferente');

    // Adjuntar imagen
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });

    cy.contains('button', 'Crear Cuenta').click();
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });

  it('Debe completar el registro exitosamente como Dueño, guardar y continuar', () => {
    // 1. Cambiar a la pestaña de registro
    cy.contains('button', 'Registro').click();

    // 2. Llenar los datos del formulario
    cy.get('input[placeholder="Nombre completo"]').type('Carlos Gomez');
    cy.get('input[placeholder="Correo electrónico"]').type('testuser@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');
    cy.get('input[placeholder="Confirmar"]').type('password123');

    // 3. Cargar la imagen de perfil
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });
    cy.contains('avatar.png').should('be.visible');

    // 4. Enviar el formulario de registro
    cy.contains('button', 'Crear Cuenta').click();

    // 5. Esperar la petición interceptada con el mock
    cy.wait('@signupRequest').its('response.statusCode').should('eq', 201);

    // 6. Verificar redirección automática a /select-user
    cy.url().should('include', '/select-user');
    cy.wait('@getUserRoleRequest');

    // 7. Verificar que la pantalla de selección de usuario cargó correctamente
    cy.contains('h2', 'Selecciona un usuario').should('be.visible');
    cy.contains('button', 'Dueño').should('be.visible');
    cy.contains('button', 'Veterinario').should('be.visible');

    // 8. Completar el formulario de Dueño (por defecto seleccionado)
    cy.get('input[placeholder="Teléfono"]').type('3001234567');
    cy.get('input[placeholder="Dirección"]').type('Calle 123 # 45-67');

    // El botón 'Continuar' debe estar deshabilitado antes de guardar
    cy.contains('button', 'Continuar').should('be.disabled');

    // Guardar selección de Dueño
    cy.contains('button', 'Guardar').click();
    cy.wait('@createOwnerRequest').its('response.statusCode').should('eq', 201);

    // El botón 'Continuar' ahora debe habilitarse
    cy.contains('button', 'Continuar').should('not.be.disabled').click();

    // 9. Verificar navegación hacia /home
    cy.url().should('include', '/home');
  });

  it('Debe completar el registro exitosamente como Veterinario, guardar y continuar', () => {
    // 1. Registro inicial con mock
    cy.contains('button', 'Registro').click();
    cy.get('input[placeholder="Nombre completo"]').type('Dra. Maria Lopez');
    cy.get('input[placeholder="Correo electrónico"]').type('maria.vet@example.com');
    cy.get('input[placeholder="Contraseña"]').type('password123');
    cy.get('input[placeholder="Confirmar"]').type('password123');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });
    cy.contains('button', 'Crear Cuenta').click();

    cy.wait('@signupRequest');
    cy.url().should('include', '/select-user');
    cy.wait('@getUserRoleRequest');

    // 2. Cambiar a la pestaña "Veterinario"
    cy.contains('button', 'Veterinario').click();
    cy.wait('@getClinicsRequest');

    // 3. Completar campos del formulario de Veterinario
    cy.get('input[placeholder="Especialidad"]').type('Cirugía y Traumatología');
    cy.get('input[placeholder="Teléfono"]').type('3109876543');

    // Abrir el selector y elegir consultorio
    cy.get('[data-slot="select-trigger"]').click();
    cy.contains('[data-slot="select-item"]', 'Clínica Veterinaria San Roque').click();

    // El botón 'Continuar' debe estar deshabilitado antes de guardar
    cy.contains('button', 'Continuar').should('be.disabled');

    // 4. Guardar selección de Veterinario
    cy.contains('button', 'Guardar').click();
    cy.wait('@createVeterinarianRequest').its('response.statusCode').should('eq', 201);

    // 5. El botón 'Continuar' ahora debe habilitarse y permitir avanzar a /home
    cy.contains('button', 'Continuar').should('not.be.disabled').click();
    cy.url().should('include', '/home');
  });
});
