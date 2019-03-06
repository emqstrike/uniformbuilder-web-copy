/**
 * Required global object
 * - cart
 *     - api_host
 *
 * File dependencies
 * - public/js/shopping-cart/shopping-cart.js
 */
var Cart = {
    cart_items: [],
    ma: null,

    init: function() {
        Cart.ma = new MaterialApi(cart.api_host);

        Cart.initCartItems(function() {
            var duplicate_material = Cart.getDuplicateMaterial(Cart.cart_items);

            if (duplicate_material.length > 0) {
                var duplicate_items_tmpl = _.template($('#duplicate-items-tmpl').html());
                bootbox.dialog({
                    title: "You have duplicate items. Please choose do you want to retain.",
                    message: duplicate_items_tmpl({duplicate_cart_items: duplicate_material}),
                    closeButton: false
                });

                $('body').on('click', '#duplicate-items-container .cart-item-btn', Cart.onSelectItemToBeRetain);
            } else {
                var el = $('#cart-items-el');
                var cart_items_tmpl = _.template($('#cart-items-tmpl').html());

                el.append(cart_items_tmpl({
                    cart_items: Cart.cart_items
                }));

                el.on('change', ':input[name="size"]', Cart.onSizeChange);
                $('.player-list .add-player', el).click(Cart.onAddPlayer);
                $('.view-all-players', el).click(Cart.onViewAllPlayers);

                $('.player-list tbody', el).on('click', 'tr td .edit-player', Cart.onEditPlayer);
                $('.player-list tbody', el).on('click', 'tr td .delete-player', Cart.onDeletePlayer);

                $('.cart-item', el).on('click', '.delete-cart-item', Cart.onDeleteItemToCart);

                Cart.setDynamicMaterialSize(Cart.cart_items);
            }
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

    getDuplicateMaterial: function (cart_items) {
        var duplicate_material = [];
        var material_ids = _.uniq(_.pluck(cart_items, "material_id"));

        for (var i in material_ids) {
            var material_id = material_ids[i];
            var result = _.where(cart_items, {material_id: material_id});

            if (result.length > 1) {
                duplicate_material.push(result);
            }
        }

        return duplicate_material;
    },

    setDynamicMaterialSize: function(cart_items) {
        Cart.getAllMaterials(cart_items, function(response) {
            if (response.success) {
                var material = response.material;

                var pricing = JSON.parse(material.pricing);

                var cart_item_el = $('#cart-items-el .cart-item[data-material-id="'+material.id+'"]');
                var cart_item_id = cart_item_el.data('cart-item-id');

                var input_parent = $(':input[name="size"]', cart_item_el).parent();
                $(':input[name="size"]', cart_item_el).remove();

                var tmpl = _.template($('#sizes-tmpl').html());
                input_parent.append(tmpl({
                    sizes: pricing.properties,
                    currency: "$"
                }));

                var size_price = JSON.parse($(':input[name="size"]', cart_item_el).val());
                return Cart.loadPlayers(cart_item_id, size_price.size);
            } else {
                console.log(response.message);
            }
        });
    },

    getAllMaterials: function(cart_items, callback) {
        var cart_item;

        for (var i in cart_items) {
            cart_item = cart_items[i];
            Cart.ma.getMaterial(cart_item.material_id, callback);
        }
    },

    onSelectItemToBeRetain: function() {
        var _this = this;

        $(this).parent().find('button').removeClass("active");
        $(this).addClass("active");

        bootbox.confirm("Are you sure do you want to retain the selected item?", function(yes) {
            if (yes) {
                var cart_item_id = $(_this).data('cart-item-id');

                ShoppingCart.cia.retainItem(cart_item_id, function(response) {
                    if (response.success) {
                        $(_this).removeClass("btn-default").addClass("btn-success").prop('disabled', true);
                        $(_this).parent().find("button:not('.active')").fadeOut(function() {
                            $(this).remove();

                            var done = true;
                            $.each($('#duplicate-items-container .panel'), function(index, el) {
                                if ($('.cart-item-btn', el).length > 1) {
                                    done = false;
                                    return;
                                }
                            });

                            if (done) {
                                location.reload();
                            }
                        });

                        console.log(response.message);
                    } else {
                        bootbox.alert(response.message);
                    }
                });
            } else {
                $(_this).removeClass('active');
            }
        });
    },

    onSizeChange: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var size = $(this).val();

        Cart.loadPlayers(cart_item_id, size);
    },

    onViewAllPlayers: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var tmpl = _.template($('#all-players-tmpl').html());

        var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});
        var all_items = _.sortBy(_.uniq(_.pluck(cart_item.players, 'size')));

        bootbox.dialog({
            title: "All Players",
            message: tmpl({
                players: cart_item.players,
                all_items: all_items,
                currency: "$"
            }),
            size: "large"
        });
    },

    onAddPlayer: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var form_tmpl = _.template($('#form-tmpl').html());
        var player_row_tmpl = _.template($('#player-row-tmpl').html());

        var size_price = JSON.parse($(':input[name="size"]', cart_item_el).val());
        var player_list_el = $('.player-list tbody', cart_item_el);

        var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});

        var addPlayerBootbox = bootbox.dialog({
            title: "Add Player",
            message: form_tmpl(),
            closeButton: false,
            className: "add-player-modal",

            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default"
                },

                ok: {
                    label: '<span class="glyphicon glyphicon-saved"></span> Add Player',
                    className: "btn-primary",
                    callback: function() {
                        var form = $(this).find('.bootbox-body form');
                        var jvBs3 = new JvBs3(form);

                        var last_name = $(':input[name="last_name"]', form).val(),
                            number = $(':input[name="number"]', form).val(),
                            quantity = $(':input[name="quantity"]', form).val();

                        ShoppingCart.cipa.addPlayer(cart_item_id, {
                            size: size_price.size,
                            last_name: last_name,
                            number: number,
                            price: parseFloat(size_price.price),
                            quantity: parseInt(quantity)
                        }, null, {
                            beforeSend: function() {
                                $(':input', form.closest('.modal-content')).prop('disabled', true);
                            },

                            success: function(response) {
                                if (response.success) {

                                    if (_.filter(cart_item.players, {size: size_price.size}).length == 0) {
                                        player_list_el.html("");
                                    }

                                    cart_item.players.push(response.data);
                                    var tr_num = $('tr', player_list_el).length;
                                    player_list_el.append(player_row_tmpl(_.extend({index: tr_num + 1}, response.data)));

                                    form.before('<div class="alert alert-success"><p>'+response.message+'</p></div>');

                                    _.delay(function() {
                                        addPlayerBootbox.modal('hide');
                                        $(':input', form.closest('.modal-content')).prop('disabled', false);
                                    }, 1000);
                                }
                            },

                            error: function(xhr) {
                                $(':input', form.closest('.modal-content')).prop('disabled', false);

                                if (xhr.status === 422) {
                                    var errors = xhr.responseJSON;
                                    var error_keys = Object.keys(errors);

                                    $.each($(':input', form), function(index, el) {
                                        var field = $(el).attr('name');

                                        // error found
                                        if (error_keys.indexOf(field) !== -1) {
                                            jvBs3.highlight($(':input[name="'+field+'"]', form), errors[field][0]);
                                        } else {
                                            jvBs3.unhighlight($(':input[name="'+field+'"]', form));
                                        }
                                    });
                                }
                            }
                        });

                        return false;
                    }
                }
            }
        });

        addPlayerBootbox.on("shown.bs.modal", function() {
            $('.add-player-modal form :input[name="last_name"]').focus();
        })
    },

    onEditPlayer: function() {
        var cart_item_id = $(this).closest('.cart-item').data('cart-item-id');
        var cart_item_el = $('#cart-items-el .cart-item[data-cart-item-id="'+cart_item_id+'"]');

        var _this = $(this);
        var player_id = $(this).data('id');
        var form_tmpl = _.template($('#form-tmpl').html());

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
                var size_price = JSON.parse($(':input[name="size"]', cart_item_el).val());

                var cart_item = _.find(Cart.cart_items, {cart_item_id: cart_item_id});
                var players = cart_item.players;

                ShoppingCart.cipa.deletePlayer(cart_item_id, player_id, function(response, textStatus, xhr) {
                    cart_item.players = _.reject(players, {id: parseInt(player_id)});

                    if (cart_item.players.length < players.length) {
                        console.log("removed!");

                        _this.closest('tr').fadeOut();

                        if (_.filter(cart_item.players, {size: size_price.size}).length == 0) {
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