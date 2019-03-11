describe('Test menu items', function () {
    const MATERIAL_ID = 4407;

    it('Open '+MATERIAL_ID+' uniform', function () {
        cy.visit("/builder/0/" + MATERIAL_ID);
        cy.pause();
    });

    // fabrics menu
    it('Fabrics menu must be visible', function () {
        cy.get('#property-modifiers-menu a.menu-item-fabrics').should('have.exist');
    });
    it('Fabrics tab should display message indicate that this is not available', function () {
        cy.get('#m-fabric-selection h6').should('have.contain', "Fabric is not available for this uniform.");
    });
    // end fabrics

    // base color menu
    it('Base color menu must be visible', function () {
        cy.get('#property-modifiers-menu a.menu-item-parts').should('have.exist');
    });

    const BASE_COLOR_COLORS = [
        "Black", "White", "Red", "Cardinal", "Maroon",
        "Purple", "Navy Blue", "Royal Blue", "Gray", "Charcoal Grey", "Dark Green"
    ]

    const BASE_COLOR_PATTERNS = [
        "Blank", "Trips Arrow", "Check", "Digital Camo", "Lockdown", "Upper Stripes Body", "Camo", "Thin Stripes", "Shift Stripes", "Fiber", "Thick Stripes",
        "Upper Stripes Sleeve", "Diamond", "Distressed", "Pixel Fade Body", "Pixel Fade Sleeve", "Score", "Quake", "Thick-Thin Stripes", "Pinstripes"
    ];

    it('Click base color tab', function () {
        cy.get('#property-modifiers-menu .menu-item-parts').click();
    });

    describe('All colors below must be available in the front body', function () {
        BASE_COLOR_COLORS.forEach(function(color) {
            it("Find " + color, function () {
                cy.get('#primary_options_colors .panel-index-1 .color-main-container-front_body').within(function() {
                    cy.get('.color-container-button button[data-color-name="'+color+'"]')
                        .should('have.exist');
                });
            });
        });
    });

    describe('All colors below must be available in the back body', function () {
        BASE_COLOR_COLORS.forEach(function(color) {
            it("Find " + color, function () {
                cy.get('#primary_options_colors .panel-index-2 .color-main-container-back_body').within(function() {
                    cy.get('.color-container-button button[data-color-name="'+color+'"]')
                        .should('have.exist');
                });
            });
        });

        describe('All patterns below must be available', function () {
            BASE_COLOR_PATTERNS.forEach(function(pattern) {
                it("Find " + pattern, function () {
                    cy.get('#primary_options_colors .panel-index-2 .pattern-main-container-back_body').within(function() {
                        cy.get('.pattern-container-button button[data-pattern-name="'+pattern+'"]')
                            .should('have.exist');
                    });
                });
            });
        });
    });

    describe('All colors below must be available in the sleeve body', function () {
        BASE_COLOR_COLORS.forEach(function(color) {
            it("Find " + color, function () {
                cy.get('#primary_options_colors .panel-index-4 .color-main-container-right_sleeve').within(function() {
                    cy.get('.color-container-button button[data-color-name="'+color+'"]')
                        .should('have.exist');
                });
            });
        });
    });
    // end base color
});