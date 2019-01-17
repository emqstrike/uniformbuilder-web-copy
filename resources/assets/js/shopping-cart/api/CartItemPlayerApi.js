/**
 * Dependency
 * - jquery
 * - X-CSRF-TOKEN - to avoid token mismatch
 */

function CartItemPlayerApi(logged_in_token, cart_session) {
    this.logged_in_token = logged_in_token;
    this.cart_session = cart_session;

    this.cartPermit = {
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
     * @param function callback
     * @return void
     */
    addPlayer: function(cart_item_id, data, callback) {
        var params = $.extend(
            this.cartPermit,
            {cart_item_id: cart_item_id},
            data
        );

        $.post("/api/shopping-cart/cart-item/"+cart_item_id+"/add-player", params, callback);
    },

    deletePlayer: function(cart_item_id, player_id, callback) {
        var params = $.extend(
            this.cartPermit,
            {cart_item_id: cart_item_id}
        );

        $.post("/api/shopping-cart/cart-item/"+cart_item_id+"/delete-player/"+player_id, params, callback);
    },

    /**
     * @param function callback
     * @return void
     */
    getPlayersPerCartItem: function(callback) {
        $.get("/api/shopping-cart/get-players-per-cart-item", this.cartPermit, callback);
    }
};