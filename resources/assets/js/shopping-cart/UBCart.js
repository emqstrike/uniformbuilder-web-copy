var UBCart = {
    init: function() {
        var CartItemApi = new CartItemApi(shopping_cart.logged_in_token, shopping_cart.cart_token);

        CartItemApi.getCartItems(function(response) {
            if (response.success) {
                var tmpl = _.template($('#dropdown-cart-item-tmpl').html());
                var cart_items = response.data;

                // change cart number
                $('#my-shopping-cart .cart-item-number').text(response.data.length);

                // display cart items
                $('#dropdown-cart-item-list').html(tmpl({
                    cart_items: cart_items,
                    shopping_cart_route: shopping_cart.route
                }));

                console.log(ub.config);

                // add to cart button and update to cart
                // if (_.contains(_.pluck(cart_items, "item-id"), ub.config.material_id)) {
                //     // add to cart
                //     $('#left-side-toolbar .cart-btn').data('action', "add");
                //     $('#left-side-toolbar .cart-btn .toolbar-item-label').text("ADD TO CART");

                //     console.log("add to cart");
                // } else {
                //     // update cart
                //     $('#left-side-toolbar .cart-btn').data('action', "update");
                //     $('#left-side-toolbar .cart-btn .toolbar-item-label').text("UPDATE CART");

                //     console.log("update cart");
                // }
            }
        });
    }
};