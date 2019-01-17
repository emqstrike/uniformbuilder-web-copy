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
     * @param {int} cart_item_id
     * @param {json} data {
     *     size: [int],
     *     last_name: [string],
     *     number: [string],
     *     quantity: [int],
     * }
     * @param {function} callback
     * @return {void}
     */
    addPlayer: function(cart_item_id, data, callback) {
        var params = $.extend(
            this.cartPermit,
            {cart_item_id: cart_item_id},
            data
        );

        $.post("/api/shopping-cart/cart-item-players/add", params, callback);
    },

    /**
     * @param {int} cart_item_id
     * @param {int} player_id
     * @param {json} data {
     *     size: [int],
     *     last_name: [string],
     *     number: [string],
     *     quantity: [int],
     * }
     * @param {function} callback
     * @return {void}
     */
    updatePlayer: function(cart_item_id, player_id, data, callback) {
        var params = $.extend(
            this.cartPermit,
            {cart_item_id: cart_item_id},
            data
        );

        $.post("/api/shopping-cart/cart-item-players/"+player_id+"/update", params, callback);
    },

    /**
     * @param  {int}   cart_item_id
     * @param  {int}   player_id
     * @param  {function} callback
     * @return void
     */
    deletePlayer: function(cart_item_id, player_id, callback) {
        var params = $.extend(
            this.cartPermit,
            {cart_item_id: cart_item_id}
        );

        $.post("/api/shopping-cart/cart-item-players/"+player_id+"/delete", params, callback);
    },

    /**
     * @param {function} callback
     * @return {void}
     */
    getPlayersPerCartItem: function(callback) {
        $.get("/api/shopping-cart/cart-item-players", this.cartPermit, callback);
    }
};