/**
 * Required global object
 * - shopping_cart
 *     - logged_in_token
 *     - cart_token
 *     - cart_lifespan
 *
 * File dependencies
 * - public/js/shopping-cart/api/cart-item-api.js
 * - public/js/shopping-cart/api/cart-item-player-api.js
 * - public/js/shopping-cart/api/client-info-api.js
 */

var ShoppingCart = {
    cia: null, // Cart Item Api
    cipa: null, // Cart Item Player Api
    clia: null, // Client Info Api

    init: function() {
        ShoppingCart.cia = new CartItemApi(shopping_cart.logged_in_token, shopping_cart.cart_token);
        ShoppingCart.cipa = new CartItemPlayerApi(shopping_cart.logged_in_token, shopping_cart.cart_token);
        ShoppingCart.clia = new ClientInfoApi(shopping_cart.logged_in_token, shopping_cart.cart_token);

        ShoppingCart.cartTimer();
        ShoppingCart.loadCartNumber();
    },

    cartTimer: function() {
        var time_counter = 0;
        var cart_lifespan = shopping_cart.cart_lifespan;

        var timer = setInterval(function() {
            $('#cart-timer').text(++time_counter);

            if (time_counter >= cart_lifespan) {
                clearInterval(timer);

                $('#cart-timer').text("Timeout!");

                alert("The cart is now expired!");
                location.reload();
            }

        }, 1000); // 1 sec
    },

    loadCartNumber: function() {
        ShoppingCart.cipa.getPlayersPerCartItem(function(response, textStatus, xhr) {
            if (response.success) {
                $('#cart-item-number').text(response.data.length).show();
            }
        });
    }
};

$(document).ready(ShoppingCart.init);
//# sourceMappingURL=shopping-cart.js.map
