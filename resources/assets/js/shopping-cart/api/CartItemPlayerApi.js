/**
 * Dependency
 * - jquery
 * - X-CSRF-TOKEN - to avoid token mismatch
 */

function CartItemPlayerApi(logged_in_token, cart_token) {
    this.logged_in_token = logged_in_token;
    this.cart_token = cart_token;

    this.cartPermit = {
        logged_in_token: this.logged_in_token,
        cart_token: this.cart_token,

        // laravel token
        _token: $('meta[name="csrf-token"]').attr('content')
    };
}

CartItemPlayerApi.prototype = {
    /**
     * @param {int} cart_item_id
     * @param {json} data {
     *     size: string,
     *     last_name: [string],
     *     number: [string],
     *     price: [double],
     *     quantity: [int],
     * }
     * @param {function} callback
     * @return {void}
     */
    addPlayer: function(cart_item_id, data, callback, ajaxObject) {
        var params = $.extend({},
            this.cartPermit,
            {cart_item_id: cart_item_id},
            data
        );

        var url = "/api/shopping-cart/cart-item-players/add";

        if (typeof ajaxObject === "undefined") {
            $.post(url, params, callback);
        } else {
            $.ajax($.extend({}, {
                url: url,
                type: "POST",
                dataType: 'JSON',
                data: params
            }, ajaxObject));
        }
    },

    /**
     * @param {int} cart_item_id
     * @param {int} player_id
     * @param {json} data {
     *     last_name: [string],
     *     number: [string],
     *     quantity: [int],
     * }
     * @param {function} callback
     * @return {void}
     */
    updatePlayer: function(cart_item_id, player_id, data, callback, ajaxObject) {
        var params = $.extend({},
            this.cartPermit,
            {cart_item_id: cart_item_id},
            data,
            {_method: "PUT"}
        );

        var url = "/api/shopping-cart/cart-item-players/"+player_id+"/update";

        if (typeof ajaxObject === "undefined") {
            $.post(url, params, callback);
        } else {
            $.ajax($.extend({}, {
                url: url,
                type: "POST",
                dataType: 'JSON',
                data: params
            }, ajaxObject));
        }
    },

    /**
     * @param  {int}   cart_item_id
     * @param  {int}   player_id
     * @param  {function} callback
     * @return void
     */
    deletePlayer: function(cart_item_id, player_id, callback) {
        var params = $.extend({},
            this.cartPermit,
            {cart_item_id: cart_item_id},
            {_method: "DELETE"}
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