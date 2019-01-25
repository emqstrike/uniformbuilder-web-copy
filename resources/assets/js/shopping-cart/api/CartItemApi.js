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
        _token: $('meta[name="csrf-token"]').attr('content')
    };
}

CartItemApi.prototype = {
    /**
     * @param {function} callback
     * @return {void}
     */
    getCartItems: function(callback) {
        $.get("/api/shopping-cart/cart-items", this.cartPermit, callback);
    },
    /*
    name // ub.current_material.material.name
    thumbnail // ub.current_material.material.thumbnail_path
    brand // ub.current_material.material.brand
    item_id // parseInt(ub.current_material.material.item_id)
    block pattern id // parseInt(ub.current_material.material.block_pattern_id)
    neck option // ub.neckOption
    description // ub.current_material.material.description
    type // ub.current_material.material.type
    builder_customization // JSON.stringify(ub.current_material.settings)
    design_sheet // ub.current_material.material.design_sheet_path

     */


    /**
     * Add item to cart
     *
     * @param {json}   data {
     *     name [string],
     *     thumbnail [string],
     *     brand [string],
     *     item_id [int]
     *     block_pattern_id [int],
     *     neck option [string],
     *     description [string],
     *     type [string],
     *     builder_customization [string],
     *     design_sheet [string]
     * }
     * @param {function} callback
     * @return {void}
     */
    addToCart: function(data, callback) {
        $.post("/api/shopping-cart/add-to-cart", $.extend(data, this.cartPermit), callback);
    },

    /**
     * Update item to cart
     *
     * @param {integer} cart_item_id
     * @param {json}   data {
     *     builder_customization [string]
     * }
     * @param {function} callback
     * @return {void}
     */
    updateItem: function(cart_item_id, data, callback) {
        $.post("/api/shopping-cart/update-item/" + cart_item_id, $.extend(data, this.cartPermit), callback);
    }
};