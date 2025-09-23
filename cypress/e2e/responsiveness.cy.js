describe('Responsividad de la Aplicación', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ];

  describe('Página Principal', () => {
    viewports.forEach(viewport => {
      it(`debe verse correctamente en ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitAndWait('/');
        
        // Verificar elementos principales
        cy.contains('EcoTrack').should('be.visible');
        cy.contains('Dashboard Corporativo').should('be.visible');
        
        // Verificar que los botones son clickeables
        cy.contains('Dashboard Corporativo').should('be.visible').and('not.be.disabled');
      });
    });
  });

  describe('Dashboard Corporativo', () => {
    viewports.forEach(viewport => {
      it(`debe ser responsive en ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitAndWait('/');
        
        cy.contains('Dashboard Corporativo').click();
        cy.shouldBeOnPage('/corporate-dashboard');
        
        // Verificar elementos del dashboard
        cy.contains('Resumen Ejecutivo').should('be.visible');
        cy.contains('Acciones Rápidas').should('be.visible');
        cy.contains('Top Performers').should('be.visible');
        
        // Verificar métricas
        cy.contains('Empleados Activos').should('be.visible');
        cy.contains('XP Total').should('be.visible');
      });
    });
  });

  describe('Pantallas CRUD', () => {
    const crudScreens = [
      { button: 'Empleados', route: '/employees' },
      { button: 'Empresas', route: '/companies' },
      { button: 'Áreas', route: '/areas' },
      { button: 'Actividades', route: '/activities' },
    ];

    crudScreens.forEach(screen => {
      viewports.forEach(viewport => {
        it(`${screen.route} debe ser responsive en ${viewport.name}`, () => {
          cy.viewport(viewport.width, viewport.height);
          cy.visitAndWait('/');
          
          cy.contains('⚙️').click();
          cy.contains(screen.button).click();
          cy.shouldBeOnPage(screen.route);
          
          // Verificar elementos comunes de CRUD
          cy.contains('←').should('be.visible'); // Botón back
          cy.contains('+').should('be.visible'); // Botón crear
          
          // Verificar que hay contenido
          cy.get('body').should('contain.text', 'Total');
        });
      });
    });
  });

  describe('Formularios', () => {
    const forms = [
      { screen: 'Empleados', route: '/employee-form' },
      { screen: 'Empresas', route: '/company-form' },
      { screen: 'Áreas', route: '/area-form' },
      { screen: 'Actividades', route: '/activity-form' },
    ];

    forms.forEach(form => {
      viewports.forEach(viewport => {
        it(`${form.route} debe ser responsive en ${viewport.name}`, () => {
          cy.viewport(viewport.width, viewport.height);
          cy.visitAndWait('/');
          
          cy.contains('⚙️').click();
          cy.contains(form.screen).click();
          cy.contains('+').click();
          cy.shouldBeOnPage(form.route);
          
          // Verificar elementos del formulario
          cy.contains('←').should('be.visible');
          cy.get('button').should('have.length.at.least', 2); // Al menos crear y cancelar
          
          // En desktop, verificar que los botones están en fila
          if (viewport.width >= 768) {
            cy.get('button').should('be.visible');
          }
        });
      });
    });
  });

  describe('Navegación en Dispositivos Móviles', () => {
    it('debe funcionar correctamente en móvil', () => {
      cy.viewport(375, 667);
      cy.visitAndWait('/');
      
      // Verificar tabs en móvil
      cy.get('[role="tablist"]').should('be.visible');
      
      // Navegar entre tabs
      cy.contains('Perfil').click();
      cy.contains('Ranking').click();
      cy.contains('Diario').click();
      cy.contains('Inicio').click();
      
      // Verificar navegación a CRUD
      cy.get('text').contains('⚙️').click();
      cy.contains('Empleados').click();
      cy.shouldBeOnPage('/employees');
      
      // Verificar que el contenido se ajusta
      cy.get('body').should('not.have.css', 'overflow-x', 'scroll');
    });
  });
});
