/**
 * File dependencies
 * - public/js/shopping-cart/shopping-cart.js
 */
var ConfirmOrder = {
    cart_items: [],

    init: function() {
        ConfirmOrder.loadOrders(function() {
            var order_list = $('#order-list');
            var tmpl = _.template($('#order-list-tmpl').html());

            order_list.append(tmpl({
                orders: ConfirmOrder.cart_items
            }));

            $('.view-all-items', order_list).click(ConfirmOrder.onViewAllSelectedSizes);
        });
    },

    loadOrders: function(callback) {
        ShoppingCart.cipa.getPlayersPerCartItem(function(response, textStatus, xhr) {
            if (response.success) {
                if (response.data.length > 0) {
                    ConfirmOrder.cart_items = response.data;

                    callback();
                } else {
                    $('#order-list').html('<div class="col-md-12">Cart is empty</div>');
                }
            } else {
                $('#order-list').html('<div class="col-md-12">Failed to fetch your orders.</div>');
            }
        });
    },

    onViewAllSelectedSizes: function() {
        var cart_item_id = $(this).data('cart-item-id');
        var tmpl = _.template($('#all-items-tmpl').html());

        var cart_item = _.find(ConfirmOrder.cart_items, {cart_item_id: cart_item_id});

        var selected_sizes = _.sortBy(_.uniq(_.pluck(cart_item.players, 'size')));

        bootbox.dialog({
            title: "All Items",
            message: tmpl({
                players: cart_item.players,
                selected_sizes: selected_sizes
            }),
            size: "large"
        });
    }
};

$(document).ready(ConfirmOrder.init);