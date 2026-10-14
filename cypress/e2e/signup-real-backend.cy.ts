// Ignorar excepciones no críticas (ej. extensiones del navegador o cálculos de document en iframe)
Cypress.on('uncaught:exception', () => false);

describe('Flujo de Registro (SignUp) con Backend Real (Sin Mocks)', () => {
  beforeEach(() => {
    // Espiar las peticiones de red reales (passthrough) sin simular la respuesta
    // Esto permite que las peticiones lleguen directamente al backend local
    cy.intercept('POST', '**/auth/signup').as('realSignupRequest');
    cy.intercept('GET', '**/users/*/role').as('realGetUserRoleRequest');
    cy.intercept('POST', '**/owner/create').as('realCreateOwnerRequest');
    cy.intercept('GET', '**/veterinary-clinics/all').as('realGetClinicsRequest');
    cy.intercept('POST', '**/veterinarian/create').as('realCreateVeterinarianRequest');

    // Visitar la página de autenticación
    cy.visit('/Auth');
  });

  it('Debe registrar un usuario nuevo en el backend como Dueño, guardar y continuar', () => {
    const timestamp = Date.now();
    const uniqueEmail = `dueno_${timestamp}@example.com`;

    // 1. Cambiar a la pestaña de Registro
    cy.contains('button', 'Registro').click();

    // 2. Llenar el formulario con datos únicos
    cy.get('input[placeholder="Nombre completo"]').type(`Dueño Test ${timestamp}`);
    cy.get('input[placeholder="Correo electrónico"]').type(uniqueEmail);
    cy.get('input[placeholder="Contraseña"]').type('Password123!');
    cy.get('input[placeholder="Confirmar"]').type('Password123!');

    // 3. Cargar la imagen de perfil
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });
    cy.contains('avatar.png').should('be.visible');

    // 4. Enviar formulario al backend real
    cy.contains('button', 'Crear Cuenta').click();

    // 5. Esperar la respuesta real del backend
    cy.wait('@realSignupRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
      expect(interception.response?.body?.data?.accessToken).to.exist;
    });

    // 6. Verificar redirección automática a /select-user y consulta real de rol
    cy.url().should('include', '/select-user');
    cy.wait('@realGetUserRoleRequest');

    cy.contains('h2', 'Selecciona un usuario').should('be.visible');
    cy.contains('button', 'Dueño').should('be.visible');

    // 7. Completar formulario de Dueño
    cy.get('input[placeholder="Teléfono"]').type('3001234567');
    cy.get('input[placeholder="Dirección"]').type('Carrera 7 # 12-34');

    // El botón 'Continuar' debe estar deshabilitado antes de guardar
    cy.contains('button', 'Continuar').should('be.disabled');

    // 8. Guardar en el backend real
    cy.contains('button', 'Guardar').click();
    cy.wait('@realCreateOwnerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
    });

    // 9. El botón 'Continuar' se habilita y navega a /home
    cy.contains('button', 'Continuar').should('not.be.disabled').click();
    cy.url().should('include', '/home');
  });

  it('Debe registrar un usuario nuevo en el backend como Veterinario, guardar y continuar', () => {
    const timestamp = Date.now();
    const uniqueEmail = `vet_${timestamp}@example.com`;

    // 1. Cambiar a la pestaña de Registro
    cy.contains('button', 'Registro').click();

    // 2. Llenar el formulario con datos únicos
    cy.get('input[placeholder="Nombre completo"]').type(`Dr. Test ${timestamp}`);
    cy.get('input[placeholder="Correo electrónico"]').type(uniqueEmail);
    cy.get('input[placeholder="Contraseña"]').type('Password123!');
    cy.get('input[placeholder="Confirmar"]').type('Password123!');

    // 3. Cargar la imagen de perfil
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });
    cy.contains('avatar.png').should('be.visible');

    // 4. Enviar formulario al backend real
    cy.contains('button', 'Crear Cuenta').click();

    // 5. Esperar la respuesta real del backend
    cy.wait('@realSignupRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
      expect(interception.response?.body?.data?.accessToken).to.exist;
    });

    // 6. Verificar redirección automática a /select-user
    cy.url().should('include', '/select-user');
    cy.wait('@realGetUserRoleRequest');

    // 7. Cambiar a la pestaña "Veterinario"
    cy.contains('button', 'Veterinario').click();
    cy.wait('@realGetClinicsRequest');

    // 8. Llenar campos de Veterinario
    cy.get('input[placeholder="Especialidad"]').type('Medicina General');
    cy.get('input[placeholder="Teléfono"]').type('3109876543');

    // Seleccionar el primer consultorio disponible de la lista que devolvió el backend
    cy.get('[data-slot="select-trigger"]').click();
    cy.get('[data-slot="select-item"]').first().click();

    // El botón 'Continuar' debe estar deshabilitado antes de guardar
    cy.contains('button', 'Continuar').should('be.disabled');

    // 9. Guardar en el backend real
    cy.contains('button', 'Guardar').click();
    cy.wait('@realCreateVeterinarianRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
    });

    // 10. El botón 'Continuar' se habilita y navega a /home
    cy.contains('button', 'Continuar').should('not.be.disabled').click();
    cy.url().should('include', '/home');
  });
});
