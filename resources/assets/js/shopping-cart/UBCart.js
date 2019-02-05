var UBCart = {
    cartItemApi: null,

    init: function() {
        UBCart.cartItemApi = new CartItemApi(shopping_cart.logged_in_token, shopping_cart.cart_token);

        // initialize shopping cart first before the start the logic
        UBCart.initShoppingCart(function() {
            // unbind first to avoid duplicate event
            $('#left-side-toolbar').off('click', '.cart-btn[data-action="add"]');
            $('#left-side-toolbar').off('click', '.cart-btn[data-action="update"]');

            $('#left-side-toolbar').on('click', '.cart-btn[data-action="add"]', UBCart.addToCart);
            $('#left-side-toolbar').on('click', '.cart-btn[data-action="update"]', UBCart.updateItem);
        });
    },

    initShoppingCart: function(callback) {
        UBCart.fetchCartItems(function(response) {
            if (response.success) {
                var cart_items = response.data;

                // load cart items
                UBCart.updateShoppingCartDetails(cart_items);

                // add to cart button and update to cart
                if (! _.contains(_.pluck(cart_items, "material_id"), ub.config.material_id)) {
                    // add to cart
                    $('#left-side-toolbar .cart-btn').attr('data-action', "add");
                    $('#left-side-toolbar .cart-btn .toolbar-item-label').text("ADD TO CART");

                    // load the default settings
                    ub.loadDefaulUniformStyle(ub.data.defaultUniformStyle);
                    ub.funcs.removeLocations();
                } else {
                    // update cart
                    var cart_item = _.find(cart_items, {material_id: ub.config.material_id});

                    $('#left-side-toolbar .cart-btn').attr('data-action', "update");
                    $('#left-side-toolbar .cart-btn').data('cart-item-id', cart_item.id);
                    $('#left-side-toolbar .cart-btn .toolbar-item-label').text("UPDATE ITEM");

                    // load the uniform settings of cart item
                    ub.loadSettings(JSON.parse(cart_item.builder_customization));
                    ub.funcs.removeLocations();
                }

                $('#my-shopping-cart').removeAttr('cloak');

                callback();
            } else {
                console.log("Something went wrong on fetching cart items!");
            }
        });
    },

    fetchCartItems: function(callback) {
        UBCart.cartItemApi.getCartItems(function(response) {
            callback(response);
        });
    },

    updateShoppingCartDetails: function(cart_items) {
        var tmpl = _.template($('#dropdown-cart-item-tmpl').html());

        // change cart number
        $('#my-shopping-cart .cart-item-number').text(cart_items.length);

        // hide see all in my carts link if cart items empty
        $('#my-carts-link')[cart_items.length === 0 ? "hide" : "show"]();

        $('#dropdown-cart-item-list').html(tmpl({
            cart_items: cart_items
        }));
    },

    addToCart: function(e) {
        e.preventDefault();
        /* Act on the event */
        console.log("Add to cart button madafaka jones");

        var material = ub.current_material.material;

        console.log("Adding item to cart ...");

        UBCart.cartItemApi.addToCart({
            material_id: material.id,
            name: material.name,
            thumbnail: material.thumbnail_path,
            brand: material.brand,
            item_id: parseInt(material.id),
            block_pattern_id: parseInt(material.block_pattern_id),
            neck_option: ub.neckOption,
            description: material.description,
            type: material.type,
            builder_customization: JSON.stringify(ub.current_material.settings),
            design_sheet: material.design_sheet_path,
        }, function(response) {
            // add to cart response
            var atc_response = response;

            if (atc_response.success) {
                console.log("Adding item to cart ok");

                bootbox.alert("Add to cart " + material.name);

                console.log("Updating cart items in dropdown ...");
                UBCart.fetchCartItems(function(response) {
                    console.log("Updating cart items in dropdown ok");

                    var cart_items = response.data;

                    // update cart items
                    UBCart.updateShoppingCartDetails(cart_items);

                    // change the action and text
                    $('#left-side-toolbar .cart-btn').attr('data-action', "update");
                    $('#left-side-toolbar .cart-btn').data('cart-item-id', atc_response.cart_item_id);
                    $('#left-side-toolbar .cart-btn .toolbar-item-label').text("UPDATE ITEM");
                });
            }
        });
    },

    updateItem: function(e) {
        e.preventDefault();
        /* Act on the event */
        console.log("Update cart button madafaka jones");

        var cart_item_id = parseInt($(this).data('cart-item-id'));

        UBCart.cartItemApi.updateItem(cart_item_id, {
            builder_customization: JSON.stringify(ub.current_material.settings)
        }, function(response) {
            if (response.success) {
                console.log("Updating builder customization in database ok");
                bootbox.alert("Successfully update");
            }
        });
    }
};