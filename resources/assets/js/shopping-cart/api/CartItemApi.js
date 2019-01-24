/**
 * Dependency
 * - jquery
 * - X-CSRF-TOKEN - to avoid token mismatch
 */

function CartItemApi(logged_in_token, cart_token) {
    this.logged_in_token = logged_in_token;
    this.cart_token = cart_token;

    this.cartPermit = {
        logged_in_token: this.logged_in_token,
        cart_token: this.cart_token,

        // laravel token
        _token: $('meta[name="X-CSRF-TOKEN"]').attr('content')
    };
}

CartItemApi.prototype = {
    /**
     * @param {function} callback
     * @return {void}
     */
    getCartItems: function(callback) {
        $.get("/api/shopping-cart/cart-items", this.cartPermit, callback);
    }
};