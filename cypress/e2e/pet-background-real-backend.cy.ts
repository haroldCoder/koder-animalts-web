// Ignorar excepciones no críticas (ej. extensiones del navegador o cálculos de document en iframe)
Cypress.on('uncaught:exception', () => false);

describe('Flujo de Antecedentes de Mascota (Pet Background) con Backend Real (Sin Mocks)', () => {
  beforeEach(() => {
    // Espiar las peticiones de red reales (passthrough) sin simular la respuesta
    cy.intercept('POST', '**/auth/signup').as('realSignupRequest');
    cy.intercept('GET', '**/users/*/role').as('realGetUserRoleRequest');
    cy.intercept('GET', '**/veterinary-clinics/all').as('realGetClinicsRequest');
    cy.intercept('POST', '**/veterinarian/create').as('realCreateVeterinarianRequest');
    cy.intercept('POST', '**/owner/create').as('realCreateOwnerRequest');
    cy.intercept('POST', '**/pet/register').as('realRegisterPetRequest');
    cy.intercept('GET', '**/pet/veterinarian/userId/*').as('realGetVetPetsRequest');
    cy.intercept('GET', '**/pet/*/background*').as('realGetBackgroundRequest');
    cy.intercept('PUT', '**/pet/*/background*').as('realUpdateBackgroundRequest');

    cy.clearLocalStorage();
    cy.visit('/Auth');
  });

  it('Debe registrar un Veterinario real, dar de alta un Paciente y guardar antecedentes en el backend real', () => {
    const timestamp = Date.now();
    const vetEmail = `vet_bg_${timestamp}@example.com`;
    const petName = `Rocky_${timestamp}`;
    const ownerEmail = `tutor_bg_${timestamp}@example.com`;

    // 1. Registro inicial de usuario como Veterinario
    cy.contains('button', 'Registro').click();
    cy.get('input[placeholder="Nombre completo"]').type(`Dra. Perez ${timestamp}`);
    cy.get('input[placeholder="Correo electrónico"]').type(vetEmail);
    cy.get('input[placeholder="Contraseña"]').type('Password123!');
    cy.get('input[placeholder="Confirmar"]').type('Password123!');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });
    cy.screenshot('pet-bg-real-01-registro-veterinario');

    cy.contains('button', 'Crear Cuenta').click();
    cy.wait('@realSignupRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
      expect(interception.response?.body?.data?.accessToken).to.exist;
    });

    // 2. Selección de Rol Veterinario y asignación de clínica real
    cy.url().should('include', '/select-user');
    cy.wait('@realGetUserRoleRequest');

    cy.contains('button', 'Veterinario').click();
    cy.wait('@realGetClinicsRequest').then((interception) => {
      cy.log('Clínicas reales:', JSON.stringify(interception.response?.body));
    });

    cy.get('input[placeholder="Ej: Medicina General, Cirugía, Dermatología"]').type('Medicina General y Preventiva');
    cy.get('input[placeholder="Ej: 3001234567"]').type('3109876543');

    // Seleccionar específicamente la clínica con UUID válido: "Hospital Veterinario Animal Care"
    cy.get('[data-slot="select-trigger"]').click();
    cy.contains('[data-slot="select-item"]', 'Hospital Veterinario Animal Care').click();
    cy.get('[data-slot="select-trigger"]').should('contain', 'Hospital Veterinario Animal Care');
    cy.screenshot('pet-bg-real-02-formulario-veterinario');

    cy.contains('button', 'Guardar datos').click();
    cy.wait('@realCreateVeterinarianRequest').then((interception) => {
      cy.log('Request body enviado:', JSON.stringify(interception.request.body));
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
    });

    cy.contains('button', 'Continuar al inicio').should('not.be.disabled').click();
    cy.url().should('include', '/home');
    cy.screenshot('pet-bg-real-03-home');

    // 3. Navegar a Expediente Clínico (/home/medical-record)
    cy.visit('/home/medical-record');
    cy.wait('@realGetVetPetsRequest').then((interception) => {
      cy.log('Pets Response Status:', interception.response?.statusCode?.toString() || '');
      cy.log('Pets Response Body:', JSON.stringify(interception.response?.body));
    });
    cy.contains('h1', 'Expediente Clínico').should('be.visible');

    // 4. Cambiar a la pestaña "Antecedentes y Reseña"
    cy.contains('button', 'Antecedentes y Reseña').click();
    cy.contains('h3', 'Selecciona una mascota').should('be.visible');
    cy.screenshot('pet-bg-real-04-pestana-antecedentes-vacia');

    // 5. Abrir el selector de pacientes y hacer clic en "Registrar mascota"
    cy.contains('Selecciona una mascota').click();
    cy.contains('Registrar mascota').should('be.visible').click();

    // 6. Completar Paso 1 del Modal: Tutor / Titular
    cy.contains('Paso 1: Datos del Tutor / Titular').should('be.visible');
    cy.get('input[placeholder="Ej. Juan Pérez"]').type(`Carlos Tutor ${timestamp}`);
    cy.get('input[placeholder="ejemplo@correo.com"]').type(ownerEmail);
    cy.get('input[placeholder="Ej. 3001234567"]').type('3001234567');
    cy.get('input[placeholder="Ej. 1020304050"]').type('1020304050');
    cy.screenshot('pet-bg-real-05-modal-paso1-tutor');

    cy.contains('button', 'Continuar a Mascota').click();
    cy.wait('@realSignupRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
    });

    // 7. Completar Paso 2 del Modal: Datos de la Mascota
    cy.contains('Paso 2: Datos de la Mascota').should('be.visible');
    cy.get('input[placeholder="Ej. Lucas"]').type(petName);
    cy.get('input[placeholder="Ej. Labrador, Mestizo..."]').type('Pastor Alemán');

    // Cargar fotografía principal de la mascota
    cy.get('input[type="file"]').selectFile('cypress/fixtures/avatar.png', { force: true });
    cy.screenshot('pet-bg-real-06-modal-paso2-mascota');

    // Enviar registro de mascota al backend real
    cy.contains('button', 'Finalizar y Registrar Mascota').click();
    cy.wait('@realRegisterPetRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
    });

    // 8. El modal se cierra y el paciente queda seleccionado automáticamente
    cy.contains(`Ficha de Antecedentes de ${petName}`, { timeout: 15000 }).should('be.visible');
    cy.screenshot('pet-bg-real-07-ficha-antecedentes-cargada');

    // 9. Llenar los campos de Antecedentes en el backend real
    cy.get('input[placeholder="Ej. Criadero, Rescate, Adopción, Hogar de paso..."]')
      .clear()
      .type('Criadero La Esperanza');

    cy.get('textarea[placeholder="Ej. Concentrado Premium (marca y cantidad), Dieta BARF, comida casera, horarios..."]')
      .clear()
      .type('Concentrado Adulto 400g diarios');

    // Activar switch de alergias y describir
    cy.contains('Alergias Conocidas')
      .closest('div.flex.items-center.justify-between')
      .find('[data-slot="switch"]')
      .click();

    cy.get('textarea[placeholder="Ej. Alergia a penicilinas, intolerancia al pollo, dermatitis por picadura de pulga..."]')
      .clear()
      .type('Sensibilidad a pulgas y garrapatas');

    cy.get('textarea[placeholder="Registra antecedentes patológicos relevantes, cirugías, traumatismos o tratamientos crónicos previos..."]')
      .clear()
      .type('Control de vacunas y desparasitación inicial');
    cy.screenshot('pet-bg-real-08-formulario-antecedentes-diligenciado');

    // 10. Guardar los antecedentes en el backend real (PUT)
    cy.contains('button', 'Guardar Antecedentes').click();

    cy.wait('@realUpdateBackgroundRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
      expect(interception.response?.body?.data).to.exist;
    });

    // Validar toast de éxito
    cy.contains('Antecedentes y plan de vacunación actualizados').should('be.visible');
    cy.screenshot('pet-bg-real-09-antecedentes-guardados-exito');

    // 11. Verificar que los datos persisten en el backend real tras recargar
    cy.reload();
    cy.wait('@realGetVetPetsRequest');
    cy.contains('h1', 'Expediente Clínico').should('be.visible');
    cy.contains('button', 'Antecedentes y Reseña').click();

    // Seleccionar de nuevo la mascota creada en el backend
    cy.contains('Selecciona una mascota').click();
    cy.contains('[data-slot="select-item"]', petName).click();
    cy.contains(`Ficha de Antecedentes de ${petName}`, { timeout: 15000 }).should('be.visible');

    // Comprobar que los valores guardados en el backend real se recuperaron
    cy.get('input[placeholder="Ej. Criadero, Rescate, Adopción, Hogar de paso..."]')
      .should('have.value', 'Criadero La Esperanza');

    cy.get('textarea[placeholder="Ej. Concentrado Premium (marca y cantidad), Dieta BARF, comida casera, horarios..."]')
      .should('have.value', 'Concentrado Adulto 400g diarios');

    cy.get('textarea[placeholder="Ej. Alergia a penicilinas, intolerancia al pollo, dermatitis por picadura de pulga..."]')
      .should('have.value', 'Sensibilidad a pulgas y garrapatas');
    cy.screenshot('pet-bg-real-10-datos-persistidos-verificados');
  });
});
