// add player testing
// Accessing client info page, billing info page, shipping info page, confirm order page, submit order must redirect to my cart if some cart item has no player.
// Redirect to my cart if some cart item has no player and accessing
//  - client info page
//  - billing info page
//  - shipping info page
//  - confirm order page
//  - submit order

describe("End to end testing in customizer page", function() {
    var base_url = Cypress.config().baseUrl;
    var url = "/builder/0/404";

    Cypress.Cookies.debug(true);

    beforeEach(function() {
        Cypress.Cookies.preserveOnce("XSRF-TOKEN", "laravel_session");
    });

    it("Open 404 material id", function() {
        cy.visit(url);
        cy.pause(); // to give time to load completely the page
    });

    it('Default cart item number must be 0', function() {
        cy.get('#my-shopping-cart')
            .find('.cart-item-number')
            .should('have.contain', 0);
    });

    it('Empty cart item must display "Empty Cart"', function () {
        cy.get('#my-shopping-cart').click(); // open dropdown
        cy.get('#dropdown-cart-item-list h4')
            .should('have.contain', "Empty Cart");
        cy.get('#my-shopping-cart').click(); // close dropdown
    });
    it('Empty cart item must not show the text "See All in My Cart"', function () {
        cy.get('#my-shopping-cart').click(); // open dropdown
        cy.get('#my-carts-link').should('not.visible');
        cy.get('#my-shopping-cart').click(); // close dropdown
    });

    it('Cart item number must be now 1', function() {
        cy.get('#left-side-toolbar .cart-btn').click(); // click add to cart button
        cy.pause(); // to give time to generate image of all perspective

        cy.get('#my-shopping-cart')
            .find('.cart-item-number')
            .should('have.contain', 1);
    });

    it('Text "Empty Cart" must not show when the cart is not empty', function () {
        cy.get('#my-shopping-cart').click(); // open dropdown
        cy.get('#dropdown-cart-item-list h4')
            .contains("Empty Cart")
            .should('not.exist');
        cy.get('#my-shopping-cart').click(); // close dropdown
    });

    it('Item added must be display in dropdown', function () {
        cy.get('#my-shopping-cart').click(); // open dropdown
        cy.get('#dropdown-cart-item-list .shopping-cart-item').should('have.attr', "href", url + "?customizer-uniform");
        cy.get('#dropdown-cart-item-list .shopping-cart-item > div > div > img').should('be.visible');
        cy.get('#my-shopping-cart').click(); // close dropdown
    });

    it('Text "See All in My Cart" must show when the cart has item', function () {
        cy.get('#my-shopping-cart').click(); // open dropdown
        cy.get('#my-carts-link')
            .should('have.attr', "href", base_url + "/shopping-cart")
            .and('have.contain', "See All in My Cart");
        cy.get('#my-shopping-cart').click(); // close dropdown
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