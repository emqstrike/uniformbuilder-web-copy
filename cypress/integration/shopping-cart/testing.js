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
            cy.get('#my-shopping-cart')
                .find('.cart-item-number')
                .should('have.contain', 0);
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

            cy.get('#my-shopping-cart')
                .find('.cart-item-number')
                .should('have.contain', 1);
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
            cy.pause(); // to give time to load completely the page
        });

        // it('Images must be correct', function () {
        //     cy.get('#cart-items-el .cart-item[data-material-id="404"] .image-container .front-image')
        //         .should('have.attr', "src", img_front_temp);
        // });

        it('Default players must be empty', function () {
            cy.get('#cart-items-el .cart-item[data-material-id="404"] .player-list tbody tr td:first-child')
                .should('have.contain', "No players added");
        });

        it('Number of cart must be 1', function () {
            cy.get('#cart-item-number')
                .should('have.contain', 1);
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

            cy.get('#my-shopping-cart')
                .find('.cart-item-number')
                .should('have.contain', 1);
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
            cy.pause(); // to give time to load completely the page
        });

        // it('Images must be correct', function () {
        //     //
        // });

        it('Default players must still empty', function () {
            cy.get('#cart-items-el .cart-item[data-material-id="404"] .player-list tbody tr td:first-child')
                .should('have.contain', "No players added");
        });

        it('Number of cart must still 1', function () {
            cy.get('#cart-item-number')
                .should('have.contain', 1);
        });
    });
});

// describe("Add player testing", function() {
//     it("Clicking Add Player button must show Add Player Modal.", function() {
//         cy.visit("http://dev.customizer.com/shopping-cart");

//         cy.get('#cart-items-el .player-list .add-player').click();

//         cy.get().should('exist');
//     });

//     // it("Invalid input must not save.", function() {
//     //     cy.visit("http://dev.customizer.com/shopping-cart");

//     //     cy.get('#cart-items-el')
//     // });

//     // it("Valid input must save.", function() {

//     // });
// });