@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">My Cart</h1>

            <p>
                Cart Session: {{ \Session::get('cart_session') }}
            </p>

            <div class="row" id="cart-items-el">
                
            </div>

            <div class="row">
                <div class="col-md-12">
                    <a href="{{ route('shopping-cart.client-info') }}" class="btn btn-primary">Checkout <span class="glyphicon glyphicon-arrow-right"></span></a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/bootbox/bootbox.min.js"></script>

<script type="text/template" id="cart-items-tmpl">
<% _.each(cart_items, function(item) { %>
    <div class="col-md-6 cart-item" data-cart-item-id="<%= item.id %>">
        <div class="panel panel-default">
            <div class="panel-heading">
                <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                <h1 class="panel-title">Gator 11</h1>
            </div>
            <div class="panel-body">
                <img src="https://via.placeholder.com/150" class="img-responsive" alt="" />
                <hr>

                <div class="form-group">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="size">Select Size</label>

                            <select name="size" class="form-control">
                                <% _.each(sizes, function(size_text, size){ %>
                                    <option value="<%= size %>"><%= size_text %></option>
                                <% }); %>
                            </select>
                        </div>

                        <div class="pull-right">
                            <button class="btn btn-link view-selected-sizes">View all selected sizes</button>
                        </div>
                    </div>
                </div>

                <table class="table table-hover table-bordered player-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <% if (!_.isEmpty(item.players)) { %>
                            <% _.each(item.players, function(player, index) { %>
                                <tr>
                                    <td><%= index+1 %></td>
                                    <td>
                                        <p class="last_name"><%= player.last_name %></p>
                                    </td>
                                    <td>
                                        <p class="number"><%= player.number %></p>
                                    </td>
                                    <td>
                                        <p class="quantity"><%= player.quantity %></p>
                                    </td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button class="btn btn-success btn-xs edit-player" data-id="<%= player.id %>"><span class="glyphicon glyphicon-pencil"></span></button>
                                            <button class="btn btn-danger btn-xs delete-player" data-id="<%= player.id %>"><span class="glyphicon glyphicon-remove-sign"></span></button>
                                        </div>
                                    </td>
                                </tr>
                            <% }); %>
                        <% } else { %>
                            <tr>
                                <td colspan="5">No players added</td>
                            </tr>
                        <% } %>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5">
                                <button class="btn btn-primary btn-sm add-player"><span class="glyphicon glyphicon-plus-sign add-player"></span> Add Player</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
<% }); %>
</script>

<script type="text/template" id="player-rows-tmpl">
    <% if (!_.isEmpty(players)) { %>
        <% _.each(players, function(player, index) { %>
            <tr>
                <td><%= index+1 %></td>
                <td>
                    <p class="last_name"><%= player.last_name %></p>
                </td>
                <td>
                    <p class="number"><%= player.number %></p>
                </td>
                <td>
                    <p class="quantity"><%= player.quantity %></p>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-success btn-xs edit-player" data-id="<%= player.id %>"><span class="glyphicon glyphicon-pencil"></span></button>
                        <button class="btn btn-danger btn-xs delete-player" data-id="<%= player.id %>"><span class="glyphicon glyphicon-remove-sign"></span></button>
                    </div>
                </td>
            </tr>
        <% }); %>
    <% } else { %>
        <tr>
            <td colspan="5">No players added</td>
        </tr>
    <% } %>
</script>

<script type="text/template" id="player-row-tmpl">
    <tr>
        <td><%= index %></td>
        <td>
            <p class="last_name"><%= last_name %></p>
        </td>
        <td>
            <p class="number"><%= number %></p>
        </td>
        <td>
            <p class="quantity"><%= quantity %></p>
        </td>
        <td>
            <div class="btn-group" role="group">
                <button class="btn btn-success btn-xs edit-player" data-id="<%= id %>"><span class="glyphicon glyphicon-pencil"></span></button>
                <button class="btn btn-danger btn-xs delete-player" data-id="<%= id %>"><span class="glyphicon glyphicon-remove-sign"></span></button>
            </div>
        </td>
    </tr>
</script>

<script type="text/template" id="selected-sizes-tmpl">
    <% if (!_.isEmpty(data)) { %>
        <div role="tabpanel">
            <ul class="nav nav-tabs" role="tablist">
                <% _.each(data, function(players, size) { %>
                    <li role="presentation" class="<%= Object.keys(data)[0].id == size ? 'active' : '' %>">
                        <a href="#size-<%= size %>" aria-controls="tab" role="tab" data-toggle="tab"><%= sizes[size] %></a>
                    </li>
                <% }); %>
            </ul>

            <br />

            <div class="tab-content">
                <% _.each(data, function(players, size) { %>
                    <div role="tabpanel" class="tab-pane fade <%= Object.keys(data)[0] == size ? 'in active' : '' %>" id="size-<%= size %>">
                        <table class="table table-hover table-bordered player-list">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Last Name</th>
                                    <th>Number</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <% _.each(players, function(player, n) { %>
                                    <tr>
                                        <td><%= n+1 %></td>
                                        <td><%= player.last_name %></td>
                                        <td><%= player.number %></td>
                                        <td><%= player.quantity %></td>
                                    </tr>
                                <% }); %>
                            </tbody>
                        </table>
                    </div>
                <% }); %>
            </div>
        </div>
    <% } else { %>
        <p>No selected size</p>
    <% } %>
</script>

<script type="text/template" id="form-tmpl">
    <form role="form">
        <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" value="<%= typeof(last_name) !== "undefined" ? last_name : '' %>" class="form-control" />
        </div>

        <div class="form-group">
            <label for="number">Number</label>
            <input type="text" name="number" value="<%= typeof(number) !== "undefined" ? number : '' %>" class="form-control" />
        </div>

        <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="text" name="quantity" value="<%= typeof(quantity) !== "undefined" ? quantity : '' %>" class="form-control" />
        </div>
    </form>
</script>

<script type="text/javascript">
var sizes = <?php echo json_encode($sizes) ?>;

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
            sizes: sizes,
            cart_items: Cart.cart_items
        }));

        var cart_item_ids = _.pluck(Cart.cart_items, 'id');
        _.map(cart_item_ids, function(cart_item_id) {
            var default_size = $(':input[name="size"]', el).val();
            return Cart.loadPlayers(cart_item_id, parseInt(default_size));
        });

        $(':input[name="size"]', el).change(Cart.onSizeChange);
        $('.player-list .add-player', el).click(Cart.onAddPlayer);
        // $('.view-selected-sizes', el).click(Cart.onViewAllSelectedSizes);

        // $('.player-list tbody', el).on('click', 'tr td .edit-player', Cart.onEditPlayer);
        // $('.player-list tbody', el).on('click', 'tr td .delete-player', Cart.onDeletePlayer);
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

        console.log(cart_item.players);

        bootbox.dialog({
            title: "Selected Sizes",
            message: tmpl({
                data: cart_item.players,
                sizes: sizes
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

        bootbox.dialog({
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

                        if (!_.isEmpty(last_name) && !_.isEmpty(number) && !_.isEmpty(quantity)) {
                            if (_.filter(cart_item.players, {size: selected_size}).length == 0) {
                                player_list_el.html("");
                            }

                            var data_num = cart_item.players.length;

                            var data = {
                                id: Cart.id_auto_increment++,
                                size: selected_size,
                                last_name: last_name,
                                number: number,
                                quantity: quantity
                            };

                            cart_item.players.push(data);

                            if (cart_item.players.length > data_num) {
                                console.log("saved!");
                                var tr_num = $('tr', player_list_el).length;

                                player_list_el.append(player_row_tmpl(_.extend({index: tr_num + 1}, data)));
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
                            quantity = $(':input[name="quantity"]', el).val();

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

        var id = $(this).data('id');
        var selected_size = $(':input[name="size"]').val();

        var cart_item = _.find(Cart.cart_items, {id: cart_item_id});
        var players = cart_item.players;

        cart_item.players = _.reject(players, {id: parseInt(id)});

        if (cart_item.players.length < players.length) {
            console.log("removed!");

            $(this).closest('tr').fadeOut();

            if (cart_item.players.length == 0) {
                $('#player-list tbody').html('<tr><td colspan="5">No players added</td></tr>');
            }
        } else {
            console.log("not remove!");
        }
    }
};

$(document).ready(Cart.init);
</script>
@endsection