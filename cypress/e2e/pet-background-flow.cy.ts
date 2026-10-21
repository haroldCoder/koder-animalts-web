// Ignorar excepciones no críticas
Cypress.on('uncaught:exception', () => false);

describe('Flujo de Antecedentes de Mascota (Pet Background) con Mocks', () => {
  const veterinarianProfile = {
    id: '11111111-1111-4111-8111-111111111111',
    email: 'dra.maria@example.com',
    name: 'Maria Lopez',
    role: 'VETERINARIAN' as const,
  };

  const ownerProfile = {
    id: '22222222-2222-4222-8222-222222222222',
    email: 'carlos.gomez@example.com',
    name: 'Carlos Gomez',
    role: 'OWNER' as const,
  };

  beforeEach(() => {
    // 1. Limpiar almacenamiento antes de cada prueba
    cy.clearLocalStorage();

    // 2. Interceptar autenticación y refresh para evitar deslogueo
    cy.intercept('POST', '**/auth/refresh', {
      statusCode: 200,
      body: {
        statusCode: 200,
        data: {
          accessToken: 'mock-access-token-refreshed',
          refreshToken: 'mock-refresh-token-refreshed',
          user: veterinarianProfile,
        },
      },
    }).as('refreshTokenRequest');

    // 3. Interceptar rol de usuario para el Layout
    cy.intercept('GET', '**/users/*/role', {
      statusCode: 200,
      fixture: 'login-vet-user-role.json',
    }).as('getVetRoleRequest');

    // 4. Interceptar listado de mascotas del veterinario
    cy.intercept('GET', '**/pet/veterinarian/userId/*', {
      statusCode: 200,
      fixture: 'vet-pets-response.json',
    }).as('getVetPetsRequest');

    // 5. Interceptar expedientes médicos de la mascota
    cy.intercept('GET', '**/medical-record/pet/userId/*', {
      statusCode: 200,
      body: {
        statusCode: 200,
        data: [],
      },
    }).as('getMedicalRecordsRequest');

    // 6. Interceptar consultas de antecedentes (pet background)
    cy.intercept('GET', '**/pet/*/background*', {
      statusCode: 200,
      fixture: 'pet-background-response.json',
    }).as('getPetBackgroundRequest');

    // 7. Interceptar actualización de antecedentes (PUT)
    cy.intercept('PUT', '**/pet/*/background*', {
      statusCode: 200,
      fixture: 'pet-background-update-response.json',
    }).as('updatePetBackgroundRequest');

    // 8. Interceptores preventivos para evitar cualquier 401 en background
    cy.intercept('GET', '**/appointment-requests/**', {
      statusCode: 200,
      body: [],
    });
    cy.intercept('GET', '**/appointment-requests*', {
      statusCode: 200,
      body: [],
    });
    cy.intercept('GET', '**/appointment/user/*', {
      statusCode: 200,
      body: { statusCode: 200, data: [] },
    });
    cy.intercept('GET', '**/vaccination/user/*', {
      statusCode: 200,
      body: { statusCode: 200, data: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } },
    });
    cy.intercept('GET', '**/veterinary-clinics/*', {
      statusCode: 200,
      fixture: 'clinics-response.json',
    });
  });

  it('Debe mostrar aviso para seleccionar paciente si no hay mascota seleccionada', () => {
    // Inyectar sesión en localStorage antes de que cargue la app (onBeforeLoad)
    cy.visitWithSession('/home/medical-record', veterinarianProfile);

    // Validar que se mantiene dentro de /home/medical-record y no rebota al login
    cy.url().should('include', '/home/medical-record');

    // Cambiar a la pestaña de Antecedentes y Reseña
    cy.contains('button', 'Antecedentes y Reseña').click();

    // Validar mensaje informativo cuando aún no se elige paciente
    cy.contains('h3', 'Selecciona una mascota').should('be.visible');
    cy.contains('Para ver o actualizar la reseña de antecedentes y el plan de vacunación basal, primero selecciona un paciente en el filtro superior.').should('be.visible');
  });

  it('Debe cargar y visualizar los antecedentes médicos y plan de vacunación mockeados', () => {
    cy.visitWithSession('/home/medical-record', veterinarianProfile);
    cy.url().should('include', '/home/medical-record');

    // Cambiar a la pestaña de Antecedentes y Reseña
    cy.contains('button', 'Antecedentes y Reseña').click();

    // Esperar a que la lista de mascotas esté disponible
    cy.wait('@getVetPetsRequest');

    // Abrir el selector de pacientes y elegir a "Firulais"
    cy.contains('Selecciona una mascota').click();
    cy.contains('[data-slot="select-item"]', 'Firulais').click();

    // Esperar la petición que trae los antecedentes mockeados
    cy.wait('@getPetBackgroundRequest');

    // Comprobar que se muestra el encabezado de antecedentes para la mascota seleccionada
    cy.contains('Ficha de Antecedentes de Firulais').should('be.visible');

    // Comprobar que los campos contienen la información mockeada
    cy.get('input[placeholder="Ej. Criadero, Rescate, Adopción, Hogar de paso..."]')
      .should('have.value', 'Criadero San Bernardo');

    cy.get('textarea[placeholder="Ej. Concentrado Premium (marca y cantidad), Dieta BARF, comida casera, horarios..."]')
      .should('have.value', 'Concentrado Premium 350g al día');

    // Comprobar detalle de alergias
    cy.get('textarea[placeholder="Ej. Alergia a penicilinas, intolerancia al pollo, dermatitis por picadura de pulga..."]')
      .should('have.value', 'Alergia a proteína de pollo y pulgas');

    // Comprobar enfermedades anteriores
    cy.get('textarea[placeholder="Registra antecedentes patológicos relevantes, cirugías, traumatismos o tratamientos crónicos previos..."]')
      .should('have.value', 'Cirugía profiláctica dental en 2023');

    // Comprobar botón de guardado visible para el veterinario
    cy.contains('button', 'Guardar Antecedentes').should('be.visible').and('not.be.disabled');
  });

  it('Debe permitir editar antecedentes y guardar los cambios con PUT mockeado', () => {
    cy.visitWithSession('/home/medical-record', veterinarianProfile);
    cy.url().should('include', '/home/medical-record');

    cy.contains('button', 'Antecedentes y Reseña').click();

    // Seleccionar paciente
    cy.wait('@getVetPetsRequest');
    cy.contains('Selecciona una mascota').click();
    cy.contains('[data-slot="select-item"]', 'Firulais').click();
    cy.wait('@getPetBackgroundRequest');

    // Modificar Procedencia
    cy.get('input[placeholder="Ej. Criadero, Rescate, Adopción, Hogar de paso..."]')
      .clear()
      .type('Adopción de Rescate');

    // Modificar Alimentación
    cy.get('textarea[placeholder="Ej. Concentrado Premium (marca y cantidad), Dieta BARF, comida casera, horarios..."]')
      .clear()
      .type('Dieta especial hipoalergénica');

    // Modificar Alergias
    cy.get('textarea[placeholder="Ej. Alergia a penicilinas, intolerancia al pollo, dermatitis por picadura de pulga..."]')
      .clear()
      .type('Alergia confirmada al pollo');

    // Guardar cambios
    cy.contains('button', 'Guardar Antecedentes').click();

    // Esperar petición de guardado
    cy.wait('@updatePetBackgroundRequest').then((interception) => {
      expect(interception.request.method).to.eq('PUT');
      expect(interception.request.body).to.have.property('provenance', 'Adopción de Rescate');
      expect(interception.request.body).to.have.property('diet', 'Dieta especial hipoalergénica');
    });

    // Validar mensaje de confirmación toast
    cy.contains('Antecedentes y plan de vacunación actualizados').should('be.visible');
  });

  it('Debe mostrar la ficha en modo solo lectura cuando el usuario autenticado es Dueño (Owner)', () => {
    // Interceptar rol y mascotas para Dueño
    cy.intercept('GET', '**/users/*/role', {
      statusCode: 200,
      fixture: 'login-owner-user-role.json',
    }).as('getOwnerRoleRequest');

    cy.intercept('GET', '**/pet/owner/userId/*', {
      statusCode: 200,
      fixture: 'login-pets-owner.json',
    }).as('getOwnerPetsRequest');

    // Iniciar con sesión inyectada de Dueño
    cy.visitWithSession('/home/medical-record', ownerProfile);
    cy.url().should('include', '/home/medical-record');

    cy.wait('@getOwnerRoleRequest');
    cy.wait('@getOwnerPetsRequest');

    // Cambiar a la pestaña de Antecedentes y Reseña
    cy.contains('button', 'Antecedentes y Reseña').click();

    // Seleccionar paciente
    cy.contains('Selecciona una mascota').click();
    cy.contains('[data-slot="select-item"]', 'Firulais').click();
    cy.wait('@getPetBackgroundRequest');

    // Validar descripción de solo lectura
    cy.contains('Ficha clínica base con antecedentes y esquema preventivo.').should('be.visible');

    // El botón Guardar Antecedentes NO debe existir para el Dueño
    cy.contains('button', 'Guardar Antecedentes').should('not.exist');

    // Los campos deben estar deshabilitados (readOnly)
    cy.get('input[placeholder="Ej. Criadero, Rescate, Adopción, Hogar de paso..."]')
      .should('be.disabled');

    cy.get('textarea[placeholder="Ej. Concentrado Premium (marca y cantidad), Dieta BARF, comida casera, horarios..."]')
      .should('be.disabled');
  });
});
