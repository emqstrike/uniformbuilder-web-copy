/**
 * Required global object
 * - shopping_cart
 *     - sizes
 *     - logged_in_token
 *     - cart_session
 *
 * File dependencies
 * - public/js/shopping-cart/cart-item-player-api.js
 */
var CartItemPlayerApi = new CartItemPlayerApi(shopping_cart.logged_in_token, shopping_cart.cart_session);

var Cart = {
    id_auto_increment: 5,

    dummy_data: {
        24: [
            {
                id: 1,
                last_name: "Galura",
                number: 10,
                quantity: 1,
            },
            {
                id: 2,
                last_name: "Doe",
                number: 1,
                quantity: 2,
            }
        ],

        26: [
            {
                id: 3,
                last_name: "Sakuragi",
                number: 10,
                quantity: 1,
            },
            {
                id: 4,
                last_name: "Bar",
                number: 3,
                quantity: 3,
            }
        ]
    },

    cart_items: [
        {
            id: 1,
            players: [
                {
                    id: 24,
                    size: 24,
                    last_name: "Foo",
                    number: "01",
                    quantity: 1
                },
                {
                    id: 25,
                    size: 26,
                    last_name: "Bar",
                    number: "02",
                    quantity: 1
                }
            ]
        },
        {
            id: 2,
            players: [
                {
                    id: 24,
                    size: 28,
                    last_name: "Baz",
                    number: "03",
                    quantity: 1
                },
                {
                    id: 25,
                    size: 26,
                    last_name: "Doe",
                    number: "04",
                    quantity: 1
                }
            ]
        }
    ],

    init: function() {
        var el = $('#cart-items-el');
        var tmpl = _.template($('#cart-items-tmpl').html());

        el.append(tmpl({
            sizes: shopping_cart.sizes,
            cart_items: Cart.cart_items
        }));

        var cart_item_ids = _.pluck(Cart.cart_items, 'id');
        _.map(cart_item_ids, function(cart_item_id) {
            var default_size = $(':input[name="size"]', el).val();
            return Cart.loadPlayers(cart_item_id, parseInt(default_size));
        });

        $(':input[name="size"]', el).change(Cart.onSizeChange);
        $('.player-list .add-player', el).click(Cart.onAddPlayer);
        $('.view-selected-sizes', el).click(Cart.onViewAllSelectedSizes);

        $('.player-list tbody', el).on('click', 'tr td .edit-player', Cart.onEditPlayer);
        $('.player-list tbody', el).on('click', 'tr td .delete-player', Cart.onDeletePlayer);
    },

    resetCart: function() {

    },

    loadPlayers: function(cart_item_id, size) {
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var player_rows_tmpl = _.template($('#player-rows-tmpl').html());

        var cart_item = _.find(Cart.cart_items, {id: cart_item_id});
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

        var cart_item = _.find(Cart.cart_items, {id: cart_item_id});

        var selected_sizes = _.sortBy(_.pluck(cart_item.players, 'size'));

        bootbox.dialog({
            title: "Selected Sizes",
            message: tmpl({
                players: cart_item.players,
                selected_sizes: selected_sizes,
                sizes: shopping_cart.sizes
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

        var cart_item = _.find(Cart.cart_items, {id: cart_item_id});

        var addPlayerBootbox = bootbox.dialog({
            title: "Add Player",
            message: form_tmpl({
                last_name: "Rod",
                number: "10",
                quantity: 1,
            }),
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

                        console.log(last_name, number, quantity);
                        console.log(!_.isEmpty(last_name));
                        console.log(!_.isEmpty(number));
                        console.log(!_.isEmpty(quantity));

                        if (!_.isEmpty(last_name) && !_.isEmpty(number) && !_.isEmpty(quantity)) {
                            addPlayerBootbox.modal('hide');

                            bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });

                            CartItemPlayerApi.addPlayerToCartItem(1, {
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

                                    var data = {
                                        id: Cart.id_auto_increment++,
                                        size: selected_size,
                                        last_name: last_name,
                                        number: number,
                                        quantity: parseInt(quantity)
                                    };

                                    cart_item.players.push(data);

                                    if (cart_item.players.length > data_num) {
                                        console.log("saved!");
                                        var tr_num = $('tr', player_list_el).length;

                                        player_list_el.append(player_row_tmpl(_.extend({index: tr_num + 1}, data)));
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
        var id = $(this).data('id');
        var form_tmpl = _.template($('#form-tmpl').html());
        var selected_size = $(':input[name="size"]', cart_item_el).val();

        var cart_item = _.find(Cart.cart_items, {id: cart_item_id});

        var player = _.find(cart_item.players, {id: parseInt(id)});

        bootbox.dialog({
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
                            quantity = parseInt($(':input[name="quantity"]', el).val());

                        if (!_.isEmpty(last_name) && !_.isEmpty(number) && !_.isEmpty(quantity)) {
                            player.last_name = last_name;
                            player.number = number;
                            player.quantity = quantity;

                            player_data = _.find(cart_item.players, {id: parseInt(id)});

                            if (player === player_data) {
                                console.log("saved!");

                                var tr = _this.closest('tr');
                                $('.last_name', tr).text(last_name);
                                $('.number', tr).text(number);
                                $('.quantity', tr).text(quantity);
                            } else {
                                console.log("not save!");
                            }
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
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var id = $(this).data('id');
        var selected_size = $(':input[name="size"]').val();

        var cart_item = _.find(Cart.cart_items, {id: cart_item_id});
        var players = cart_item.players;

        cart_item.players = _.reject(players, {id: parseInt(id)});

        if (cart_item.players.length < players.length) {
            console.log("removed!");

            $(this).closest('tr').fadeOut();

            if (_.filter(cart_item.players, {size: selected_size}).length == 0) {
                $('.player-list tbody', cart_item_el).html('<tr><td colspan="5">No players added</td></tr>');
            }
        } else {
            console.log("not remove!");
        }
    }
};

$(document).ready(Cart.init);