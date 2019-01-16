/**
 * Dependency
 * - jquery
 * - X-CSRF-TOKEN - to avoid token mismatch
 */

function CartItemPlayerApi(logged_in_token, cart_session) {
    this.logged_in_token = logged_in_token;
    this.cart_session = cart_session;

    this.cartItemPlayerPermit = {
        logged_in_token: this.logged_in_token,
        cart_session: this.cart_session,

        // laravel token
        _token: $('meta[name="X-CSRF-TOKEN"]').attr('content')
    };
}

CartItemPlayerApi.prototype = {
    /**
     * @param int cart_item_id
     * @param json data {
     *     size: [int],
     *     last_name: [string],
     *     number: [string],
     *     quantity: [int],
     * }
     */
    addPlayerToCartItem: function(cart_item_id, data, cb) {
        var params = $.extend(
            {cart_item_id: cart_item_id},
            this.cartItemPlayerPermit,
            data
        );

        $.post("/api/shopping-cart/add-player-to-cart-item", params, cb);
    }
};