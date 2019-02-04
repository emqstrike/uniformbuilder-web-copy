/**
 * Required global object
 * - customizer_sizes
 *
 * File dependencies
 * - public/js/shopping-cart/shopping-cart.js
 */
var Cart = {
    cart_items: [],

    init: function() {
        Cart.initCartItems(function() {
            var el = $('#cart-items-el');
            var tmpl = _.template($('#cart-items-tmpl').html());

            el.append(tmpl({
                sizes: customizer_sizes,
                cart_items: Cart.cart_items
            }));

            var cart_item_ids = _.pluck(Cart.cart_items, 'cart_item_id');
            _.map(cart_item_ids, function(cart_item_id) {
                var default_size = $(':input[name="size"]', el).val();
                return Cart.loadPlayers(cart_item_id, parseInt(default_size));
            });

            $(':input[name="size"]', el).change(Cart.onSizeChange);
            $('.player-list .add-player', el).click(Cart.onAddPlayer);
            $('.view-selected-sizes', el).click(Cart.onViewAllSelectedSizes);

            $('.player-list tbody', el).on('click', 'tr td .edit-player', Cart.onEditPlayer);
            $('.player-list tbody', el).on('click', 'tr td .delete-player', Cart.onDeletePlayer);

            $('.cart-item', el).on('click', '.delete-cart-item', Cart.onDeleteItemToCart);
        });
    },

    /**
     * Initialize the cart items first before the application start
     *
     * @param  function callback
     * @return void
     */
    initCartItems: function(callback) {
        $('#cart-items-el').html('<div class="col-md-12">Loading cart items ...</div>');

        ShoppingCart.cipa.getPlayersPerCartItem(function(response, textStatus, xhr) {
            if (response.success) {
                if (response.data.length > 0) {
                    Cart.cart_items = response.data;

                    $('#cart-items-el').html("");

                    callback();
                } else {
                    $('#cart-items-el').html('<div class="col-md-12">Cart is empty</div>');
                }
            } else {
                $('#cart-items-el').html('<div class="col-md-12">Failed to fetch cart items.</div>');
            }
        });
    },

    loadPlayers: function(cart_item_id, size) {
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var player_rows_tmpl = _.template($('#player-rows-tmpl').html());

        var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});
        var players = _.filter(cart_item.players, {size: size});

        $('.player-list tbody', cart_item_el).html(player_rows_tmpl({
            players: players
        }));
    },

    onSizeChange: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var size = $(this).val();

        Cart.loadPlayers(cart_item_id, parseInt(size));
    },

    onViewAllSelectedSizes: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var tmpl = _.template($('#selected-sizes-tmpl').html());

        var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});

        var selected_sizes = _.sortBy(_.uniq(_.pluck(cart_item.players, 'size')));

        bootbox.dialog({
            title: "Selected Sizes",
            message: tmpl({
                players: cart_item.players,
                selected_sizes: selected_sizes,
                sizes: customizer_sizes
            }),
            size: "large"
        });
    },

    onAddPlayer: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var form_tmpl = _.template($('#form-tmpl').html());
        var player_row_tmpl = _.template($('#player-row-tmpl').html());
        var selected_size = parseInt($(':input[name="size"]', cart_item_el).val());
        var player_list_el = $('.player-list tbody', cart_item_el);

        var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});

        var addPlayerBootbox = bootbox.dialog({
            title: "Add Player",
            message: form_tmpl(),
            closeButton: false,

            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default"
                },

                ok: {
                    label: '<span class="glyphicon glyphicon-saved"></span> Add Player',
                    className: "btn-primary",
                    callback: function() {
                        var el = $(this);

                        var last_name = $(':input[name="last_name"]', el).val(),
                            number = $(':input[name="number"]', el).val(),
                            quantity = $(':input[name="quantity"]', el).val();

                        if (!_.isEmpty(last_name) && !_.isEmpty(number) && !_.isEmpty(quantity)) {
                            addPlayerBootbox.modal('hide');

                            bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });

                            ShoppingCart.cipa.addPlayer(cart_item_id, {
                                size: selected_size,
                                last_name: last_name,
                                number: number,
                                quantity: parseInt(quantity)
                            }, function(response, textStatus, xhr) {
                                if (response.success) {
                                    if (_.filter(cart_item.players, {size: selected_size}).length == 0) {
                                        player_list_el.html("");
                                    }

                                    var data_num = cart_item.players.length;

                                    cart_item.players.push(response.data);

                                    if (cart_item.players.length > data_num) {
                                        console.log("saved!");
                                        var tr_num = $('tr', player_list_el).length;

                                        player_list_el.append(player_row_tmpl(_.extend({index: tr_num + 1}, response.data)));
                                    } else {
                                        console.log("not save!");
                                    }
                                }

                                bootbox.hideAll();
                            });
                        } else {
                            console.log("invalid input");
                        }

                        return false;
                    }
                }
            }
        });
    },

    onEditPlayer: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var _this = $(this);
        var player_id = $(this).data('id');
        var form_tmpl = _.template($('#form-tmpl').html());
        var selected_size = $(':input[name="size"]', cart_item_el).val();

        var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});

        var player = _.find(cart_item.players, {id: parseInt(player_id)});

        var editPlayerBootbox = bootbox.dialog({
            title: "Edit Player",
            message: form_tmpl({
                last_name: player.last_name,
                number: player.number,
                quantity: player.quantity
            }),
            closeButton: false,

            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default"
                },

                ok: {
                    label: '<span class="glyphicon glyphicon-saved"></span> Update Player',
                    className: "btn-success",
                    callback: function() {
                        var el = $(this);

                        var last_name = $(':input[name="last_name"]', el).val(),
                            number = $(':input[name="number"]', el).val(),
                            quantity = $(':input[name="quantity"]', el).val();

                        if (!_.isEmpty(last_name) && !_.isEmpty(number) && !_.isEmpty(quantity)) {
                            editPlayerBootbox.modal('hide');

                            bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });

                            ShoppingCart.cipa.updatePlayer(cart_item_id, player_id, {
                                size: selected_size,
                                last_name: last_name,
                                number: number,
                                quantity: parseInt(quantity)
                            }, function(response, textStatus, xhr) {
                                if (response.success) {
                                    player.last_name = last_name;
                                    player.number = number;
                                    player.quantity = parseInt(quantity);

                                    player_data = _.find(cart_item.players, {id: parseInt(player_id)});

                                    if (player === player_data) {
                                        console.log("saved!");

                                        var tr = _this.closest('tr');
                                        $('.last_name', tr).text(last_name);
                                        $('.number', tr).text(number);
                                        $('.quantity', tr).text(quantity);
                                    } else {
                                        console.log("not save!");
                                    }
                                }

                                bootbox.hideAll();
                            });
                        } else {
                            console.log("invalid input");
                            return false;
                        }
                    }
                }
            }
        });
    },

    onDeletePlayer: function() {
        var _this = $(this);

        bootbox.confirm("Delete the player?", function(yes) {
            if (yes) {
                _this.button('loading');

                var cart_item_id = _this.closest('.cart-item').data('cart-item-id');
                var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

                var player_id = _this.data('id');
                var selected_size = $(':input[name="size"]').val();

                var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});
                var players = cart_item.players;

                ShoppingCart.cipa.deletePlayer(cart_item_id, player_id, function(response, textStatus, xhr) {
                    cart_item.players = _.reject(players, {id: parseInt(player_id)});

                    if (cart_item.players.length < players.length) {
                        console.log("removed!");

                        _this.closest('tr').fadeOut();

                        if (_.filter(cart_item.players, {size: parseInt(selected_size)}).length == 0) {
                            $('.player-list tbody', cart_item_el).html('<tr><td colspan="5">No players added</td></tr>');
                        }
                    } else {
                        console.log("not remove!");
                    }
                });
            }
        });
    },

    onDeleteItemToCart: function(e) {
        var _this = $(this);
        var cart_item_id = parseInt($(this).data('cart-item-id'));

        bootbox.confirm("Remove Item to Cart?", function(yes) {
            if (yes) {
                _this.button('loading');

                ShoppingCart.cia.deleteToCart(cart_item_id, function(response) {
                    if (response.success) {
                        _this.closest('.cart-item').fadeOut();
                        bootbox.alert("Successfully deleted");

                        ShoppingCart.loadCartNumber();
                    } else {
                        bootbox.alert(response.message);
                        _this.button('reset');
                    }
                });
            }
        });
    }
};

$(document).ready(Cart.init);