/**
 * Required global object
 * - confirmOrder
 *     - current_currency_symbol
 *
 * File dependencies
 * - public/js/shopping-cart/shopping-cart.js
 */
var ConfirmOrder = {
    cart_items: [],

    shipping_fee: 10, // assume

    init: function() {
        ConfirmOrder.loadOrders(function() {
            var order_list = $('#order-list');
            var tmpl = _.template($('#order-list-tmpl').html());

            order_list.append(tmpl({
                orders: ConfirmOrder.cart_items,
                currency: confirmOrder.current_currency_symbol
            }));

            var total_items_fee = _.pluck(ConfirmOrder.cart_items, "total_price").reduce(function(n1, n2) { return n1 + n2; });

            $('#order-summary .total-items-fee').text("$" + total_items_fee.toFixed(2));
            $('#order-summary .shipping-fee').text("$" + ConfirmOrder.shipping_fee.toFixed(2));
            $('#order-summary .total-amount').text("$" + (total_items_fee + ConfirmOrder.shipping_fee).toFixed(2));

            $('.view-all-players', order_list).click(ConfirmOrder.onViewAllPlayers);
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

    onViewAllPlayers: function() {
        var cart_item_id = $(this).data('cart-item-id');
        var tmpl = _.template($('#all-players-tmpl').html());

        var cart_item = _.find(ConfirmOrder.cart_items, {cart_item_id: cart_item_id});
        var all_player_sizes = _.sortBy(_.uniq(_.pluck(cart_item.players, 'size')));

        bootbox.dialog({
            title: "All Players",
            message: tmpl({
                players: cart_item.players,
                all_player_sizes: all_player_sizes,
                currency: confirmOrder.current_currency_symbol
            }),
            size: "large"
        });
    },
};

$(document).ready(ConfirmOrder.init);