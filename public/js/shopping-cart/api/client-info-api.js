/**
 * Dependency
 * - jquery
 * - X-CSRF-TOKEN - to avoid token mismatch
 */

function ClientInfoApi(logged_in_token, cart_token) {
    this.logged_in_token = logged_in_token;
    this.cart_token = cart_token;

    this.cartPermit = {
        logged_in_token: this.logged_in_token,
        cart_token: this.cart_token,

        // laravel token
        _token: $('meta[name="csrf-token"]').attr('content')
    };
}

ClientInfoApi.prototype = {
    /**
     * @param {function} callback
     * @return {void}
     */
    getInfo: function(callback) {
        $.get("/api/shopping-cart/client-info", this.cartPermit, callback);
    }
};
//# sourceMappingURL=client-info-api.js.map
