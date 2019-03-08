describe('Shopping Cart End To End Testing', function () {
    const MATERIAL_ID = 404;
    const BASE_URL = Cypress.config().baseUrl;
    const URL = "/builder/0/" + MATERIAL_ID;
    const SHOPPING_CART_URL = "/shopping-cart";

    Cypress.Cookies.debug(true);

    beforeEach(function() {
        Cypress.Cookies.preserveOnce("XSRF-TOKEN", "laravel_session");
    });

    describe('Checking default cart content', function () {
        it("Open material id "+ MATERIAL_ID, function() {
            cy.visit(URL);
            cy.pause(); // to give time to load completely the page
        });

        it('Default cart item number must be 0', function() {
            cy.get('#my-shopping-cart').find('.cart-item-number').should('have.contain', 0);
        });

        it('Default cart item list must be empty', function () {
            cy.get('#my-shopping-cart').click(); // open dropdown
            cy.get('#dropdown-cart-item-list h4')
                .should('have.contain', "Empty Cart");
            cy.get('#my-shopping-cart').click(); // close dropdown
        });

        it('See all in My cart link must not available', function () {
            cy.get('#my-shopping-cart').click(); // open dropdown
            cy.get('#my-carts-link').should('not.visible');
            cy.get('#my-shopping-cart').click(); // close dropdown
        });
    });

    describe('Adding current material to cart', function () {
        it('Cart item number must be 1 after the process of add to cart', function() {
            cy.get('#left-side-toolbar .cart-btn').click(); // click add to cart button
            cy.pause(); // to give time to generate image of all perspective

            cy.get('#my-shopping-cart').find('.cart-item-number').should('have.contain', 1);
        });

        it('Added material must be in cart item dropdown', function () {
            cy.get('#my-shopping-cart').click(); // open dropdown
            cy.get('#dropdown-cart-item-list .shopping-cart-item').should('have.attr', "href", URL + "?customizer-uniform");
            cy.get('#dropdown-cart-item-list .shopping-cart-item > div > div > img').should('be.visible');
            cy.get('#my-shopping-cart').click(); // close dropdown
        });

        it('See all in My cart link must be available', function () {
            cy.get('#my-shopping-cart').click(); // open dropdown
            cy.get('#my-carts-link')
                .should('have.attr', "href", BASE_URL + "/shopping-cart")
                .and('have.contain', "See All in My Cart");
            cy.get('#my-shopping-cart').click(); // close dropdown
        });
    });

    describe('Checking shopping cart page', function () {
        // var img_front_temp;

        it('Open shopping cart page', function () {
            // img_front_temp = cy.document().querySelector('#dropdown-cart-item-list .shopping-cart-item > div > div > img').getAttribute('src');
            // console.log("img FRONT: " + img_front_temp);

            cy.visit(SHOPPING_CART_URL);
        });

        // it('Images must be correct', function () {
        //     cy.get('#cart-items-el .cart-item[data-material-id="'+MATERIAL_ID+'"] .image-container .front-image')
        //         .should('have.attr', "src", img_front_temp);
        // });

        it('Default players must be empty', function () {
            cy.get('#cart-items-el .cart-item[data-material-id="'+MATERIAL_ID+'"] .player-list tbody tr td:first-child')
                .should('have.contain', "No players added");
        });

        it('Number of cart must be 1', function () {
            cy.get('#cart-item-number').should('have.contain', 1);
        });
    });

    describe('Updating item to cart', function () {
        it("Open material id "+ MATERIAL_ID + " again", function() {
            cy.visit(URL);
            cy.pause(); // to give time to load completely the page
        });

        it('Cart item number must still 1 after the updating item process.', function () {
            // change colors of front and back
            cy.get('#property-modifiers-menu a[data-item="parts"]').click();

            // change colors of front
            cy.get('.parts-container .color-main-container-front_body .color_element button[data-color-name="Cardinal"]').click();

            // change colors of back
            cy.get('#right-main-window .change-view[data-view="back"]').click()
            cy.get('.parts-container .color-main-container-back_body .color_element button[data-color-name="Cardinal"]').click();

            cy.get('#right-main-window .change-view[data-view="front"]').click()

            cy.get('#left-side-toolbar .cart-btn').click(); // click update item button

            cy.pause(); // to give time to generate image of all perspective

            cy.get('#my-shopping-cart').find('.cart-item-number').should('have.contain', 1);
        });

        it('Updated material must still in dropdown', function () {
            cy.get('#my-shopping-cart').click(); // open dropdown
            cy.get('#dropdown-cart-item-list .shopping-cart-item').should('have.attr', "href", URL + "?customizer-uniform");
            cy.get('#dropdown-cart-item-list .shopping-cart-item > div > div > img').should('be.visible');
            cy.get('#my-shopping-cart').click(); // close dropdown
        });

        it('See all in My cart link must still available', function () {
            cy.get('#my-shopping-cart').click(); // open dropdown
            cy.get('#my-carts-link')
                .should('have.attr', "href", BASE_URL + "/shopping-cart")
                .and('have.contain', "See All in My Cart");
            cy.get('#my-shopping-cart').click(); // close dropdown
        });

        // it('Image of item in dropdown must change.', function () {
        //     //
        // });
    });

    describe('Checking shopping cart page again', function () {
        // var img_front_temp;

        it('Open shopping cart page', function () {
            cy.visit(SHOPPING_CART_URL);
        });

        // it('Images must be correct', function () {
        //     //
        // });

        it('Default players must still empty', function () {
            cy.get('#cart-items-el .cart-item[data-material-id="'+MATERIAL_ID+'"] .player-list tbody tr td:first-child')
                .should('have.contain', "No players added");
        });

        it('Number of cart must still 1', function () {
            cy.get('#cart-item-number')
                .should('have.contain', 1);
        });
    });

    describe('Cart item players testing', function () {
        it('Default players in the modal must be empty', function () {
            // show players modal
            cy.get('#cart-items-el .cart-item[data-material-id="'+MATERIAL_ID+'"] .view-all-players').click();

            cy.get('.bootbox.all-players-modal .bootbox-body p')
                .should('have.contain', "No players available");

            cy.get('.bootbox.all-players-modal .modal-header .bootbox-close-button').click(); // close modal
        });

        it('Open add player modal', function () {
            cy.get('#cart-items-el .cart-item[data-material-id="'+MATERIAL_ID+'"] .player-list button.add-player').click();
        });

        describe('Add player testing', function () {
            beforeEach(function() {
                cy.get('.bootbox.add-player-modal form').as("add_player_form_el");
            });

            describe('Input value in last name field testing', function () {
                it('Empty input for last name field must show error message indicate empty input is invalid.', function () {
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="last_name"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="last_name"]').next().next().should('have.contain', "The last name field is required.")
                    });
                });

                it('Input value less than 2 characters for last_name field must show error indicate the minimum characters is 2.', function () {
                    cy.get('@add_player_form_el').find(':input[name="last_name"]').type('a'); // type 1 character
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="last_name"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="last_name"]').next().next().should('have.contain', "The last name must be at least 2 characters.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="last_name"]').clear();
                });

                it('Input value greater than 50 characters for last_name field must show error indicate the maximum characters is 50.', function () {
                    cy.get('@add_player_form_el').find(':input[name="last_name"]').type('a'.repeat(51)); // type greater than 50 characters
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="last_name"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="last_name"]').next().next().should('have.contain', "The last name may not be greater than 50 characters.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="last_name"]').clear();
                });

                it('Input numeric value for last_name field must show error indicate the numeric is invalid.', function () {
                    cy.get('@add_player_form_el').find(':input[name="last_name"]').type('11111'); // type numeric value
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="last_name"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="last_name"]').next().next().should('have.contain', "The last name may only contain letters and spaces.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="last_name"]').clear();
                });

                it('Input special characters value for last_name field must show error indicate the special characters are invalid.', function () {
                    cy.get('@add_player_form_el').find(':input[name="last_name"]').type("!@#$%^&*()"); // type numeric value
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="last_name"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="last_name"]').next().next().should('have.contain', "The last name may only contain letters and spaces.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="last_name"]').clear();
                });

                it('Valid input for last name field must remove error message.', function () {
                    cy.get('@add_player_form_el').find(':input[name="last_name"]').type("Bar"); // type valid value
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="last_name"]').next().should('have.class', "glyphicon-ok");
                        cy.get(':input[name="last_name"]').next().next().should('not.exist');
                    });

                    cy.get('@add_player_form_el').find(':input[name="last_name"]').clear();
                });
            });

            describe('Input value in number field testing', function () {
                it('Empty input for number field must show error message indicate empty input is invalid.', function () {
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="number"]').next().next().should('have.contain', "The number field is required.")
                    });
                });

                it('Input string value for number field must show error indicate the string is invalid.', function () {
                    // change the type of number field
                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').invoke('attr', "type", "text");
                        cy.get(':input[name="number"]').type('a'); // type string character
                    });

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="number"]').next().next().should('have.contain', "The number must be a number.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="number"]').clear();
                });

                it('Input special characters value for number field must show error indicate the special characters are invalid.', function () {
                    cy.get('@add_player_form_el').find(':input[name="number"]').type("!@#$%^&*()_"); // type special characters

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="number"]').next().next().should('have.contain', "The number must be a number.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="number"]').clear();
                });

                it('Input value less than 0 characters for number field must show error indicate the minimum characters is 0.', function () {
                    cy.get('@add_player_form_el').find(':input[name="number"]').type("-1"); // type less than 0

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="number"]').next().next().should('have.contain', "The number must be at least 0.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="number"]').clear();
                });

                it('Input value greater than 99 characters for number field must show error indicate the maximum characters is 99.', function () {
                    cy.get('@add_player_form_el').find(':input[name="number"]').type(100); // type greater than 99

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="number"]').next().next().should('have.contain', "The number may not be greater than 99.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="number"]').clear();
                });

                it('Input value that digit is greater than 2 characters for number field must show error indicate the digit must only 1 or 2.', function () {
                    cy.get('@add_player_form_el').find(':input[name="number"]').type("000"); // type 3 digit

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="number"]').next().next().should('have.contain', "The number must be between 1 and 2 digits.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="number"]').clear();
                });

                it('Valid input for number field must remove error message.', function () {
                    cy.get('@add_player_form_el').find(':input[name="number"]').type(10); // type valid value
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="number"]').next().should('have.class', "glyphicon-ok");
                        cy.get(':input[name="number"]').next().next().should('not.exist');
                    });

                    cy.get('@add_player_form_el').find(':input[name="number"]').clear();
                });
            });

            describe('Input value in quantity field testing', function () {
                it('Empty input for quantity field must show error message indicate empty input is invalid.', function () {
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="quantity"]').next().next().should('have.contain', "The quantity field is required.")
                    });
                });

                it('Input string value for quantity field must show error indicate the string is invalid.', function () {
                    // change the type of quantity field
                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').invoke('attr', "type", "text");
                        cy.get(':input[name="quantity"]').type('a'); // type string character
                    });

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="quantity"]').next().next().should('have.contain', "The quantity must be a number.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="quantity"]').clear();
                });

                it('Input special characters value for quantity field must show error indicate the special characters are invalid.', function () {
                    cy.get('@add_player_form_el').find(':input[name="quantity"]').type("!@#$%^&*()_"); // type special characters

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="quantity"]').next().next().should('have.contain', "The quantity must be a number.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="quantity"]').clear();
                });

                it('Input value less than 1 characters for quantity field must show error indicate the minimum characters is 1.', function () {
                    cy.get('@add_player_form_el').find(':input[name="quantity"]').type("0"); // type less than 1

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="quantity"]').next().next().should('have.contain', "The quantity must be at least 1.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="quantity"]').clear();
                });

                it('Input value greater than 100 characters for quantity field must show error indicate the maximum characters is 100.', function () {
                    cy.get('@add_player_form_el').find(':input[name="quantity"]').type(101); // type greater than 100

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').next().should('have.class', "glyphicon-remove");
                        cy.get(':input[name="quantity"]').next().next().should('have.contain', "The quantity may not be greater than 100.")
                    });

                    cy.get('@add_player_form_el').find(':input[name="quantity"]').clear();
                });

                it('Valid input for quantity field must remove error message.', function () {
                    cy.get('@add_player_form_el').find(':input[name="quantity"]').type(1); // type valid value
                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').within(function() {
                        cy.get(':input[name="quantity"]').next().should('have.class', "glyphicon-ok");
                        cy.get(':input[name="quantity"]').next().next().should('not.exist');
                    });

                    cy.get('@add_player_form_el').find(':input[name="quantity"]').clear();
                });
            });

            describe('All fields are valid testing', function () {
                it('Valid inputs must show message indicate player is added in current cart item.', function () {
                    cy.get('@add_player_form_el').find(':input[name="last_name"]').type("Bar"); // type valid value
                    cy.get('@add_player_form_el').find(':input[name="number"]').type(10); // type valid value
                    cy.get('@add_player_form_el').find(':input[name="quantity"]').type(1); // type valid value

                    cy.get('.bootbox.add-player-modal .modal-footer button[data-bb-handler="ok"]').click();

                    cy.get('@add_player_form_el').prev().should('have.class', "alert")
                    cy.get('@add_player_form_el').prev().should('have.contain', "Successfully add player in cart item")
                });
            });
        });
    });
});