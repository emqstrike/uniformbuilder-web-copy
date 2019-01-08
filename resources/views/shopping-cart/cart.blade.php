@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">My Cart</h1>

            <div class="row">
                {{-- <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div> --}}

                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Gator 11</h1>
                        </div>
                        <div class="panel-body">
                            {{-- <img src="https://via.placeholder.com/150" class="img-responsive" alt="" />
                            <hr> --}}

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label for="size">Select Size</label>

                                        <select name="size" class="form-control">
                                            {{-- js initialize the options --}}
                                        </select>
                                    </div>

                                    <div class="pull-right">
                                        <button class="btn btn-link" id="view-selected-sizes">View all selected sizes</button>
                                    </div>
                                </div>
                            </div>

                            <table class="table table-hover table-bordered" id="player-list">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Last Name</th>
                                        <th>Number</th>
                                        <th>Quantity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
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
            </div>

            <div class="row">
                <div class="col-md-12">
                    <a href="{{ route('shopping-cart.billing') }}" class="btn btn-primary">Checkout <span class="glyphicon glyphicon-arrow-right"></span></a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/bootbox/bootbox.min.js"></script>

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
                    <li role="presentation" class="<%= Object.keys(data)[0] == size ? 'active' : '' %>">
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
var sizes = {
    24: "24",
    26: "26 (YS)",
    28: "28 (YM)",
    30: "30 (YS)",
    32: "32 (YL)",
    34: "34 (YXL)",
    36: "36 (S)",
    38: "38 (M)",
    40: "40",
    42: "42 (L)",
    44: "44",
    46: "46 (XL)",
    48: "48",
    50: "50 (2XL)",
    52: "52",
    54: "54 (3XL)",
};

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

    init: function() {
        Cart.initSizeField();

        var default_selected_size = $(':input[name="size"]').val();
        Cart.loadPlayers(default_selected_size);

        $(':input[name="size"]').change(Cart.onSizeChange);
        $('#player-list .add-player').click(Cart.onAddPlayer);
        $('#view-selected-sizes').click(Cart.onViewAllSelectedSizes);

        $('#player-list tbody').on('click', 'tr td .edit-player', Cart.onEditPlayer);
        $('#player-list tbody').on('click', 'tr td .delete-player', Cart.onDeletePlayer);
    },

    initSizeField: function() {
        var options = "";

        for (var i in sizes) {
            options += '<option value="'+i+'">'+sizes[i]+'</option>';
        }

        $(':input[name="size"]').html(options);
    },

    loadPlayers: function(size) {
        var player_rows_tmpl = _.template($('#player-rows-tmpl').html());

        $('#player-list tbody').html(player_rows_tmpl({
            players: Cart.dummy_data[size]
        }));
    },

    onSizeChange: function() {
        var size = $(this).val();
        Cart.loadPlayers(size);
    },

    onViewAllSelectedSizes: function() {
        var tmpl = _.template($('#selected-sizes-tmpl').html());

        bootbox.dialog({
            title: "Selected Sizes",
            message: tmpl({
                data: Cart.dummy_data,
                sizes: sizes
            }),
            size: "large"
        });
    },

    onAddPlayer: function() {
        var form_tmpl = _.template($('#form-tmpl').html());
        var player_row_tmpl = _.template($('#player-row-tmpl').html());
        var selected_size = $(':input[name="size"]').val();
        var player_list = $('#player-list tbody');

        bootbox.dialog({
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

                            if (_.isUndefined(Cart.dummy_data[selected_size])) {
                                Cart.dummy_data[selected_size] = [];
                                player_list.html("");
                            }

                            var data_num = Cart.dummy_data[selected_size].length;

                            var data = {
                                id: Cart.id_auto_increment++,
                                last_name: last_name,
                                number: number,
                                quantity: quantity
                            };

                            Cart.dummy_data[selected_size].push(data);

                            if (Cart.dummy_data[selected_size].length > data_num) {
                                console.log("saved!");
                                var tr_num = $('tr', player_list).length;

                                player_list.append(player_row_tmpl(_.extend({index: tr_num + 1}, data)));
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
        var _this = $(this);
        var id = $(this).data('id');
        var form_tmpl = _.template($('#form-tmpl').html());
        var selected_size = $(':input[name="size"]').val();

        var player = _.find(Cart.dummy_data[selected_size], {id: parseInt(id)});

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

                            player_data = _.find(Cart.dummy_data[selected_size], {id: parseInt(id)});

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
        var id = $(this).data('id');
        var selected_size = $(':input[name="size"]').val();

        var players = Cart.dummy_data[selected_size];

        Cart.dummy_data[selected_size] = _.reject(players, {id: parseInt(id)});

        if (Cart.dummy_data[selected_size].length < players.length) {
            console.log("removed!");

            $(this).closest('tr').fadeOut();
        } else {
            console.log("not remove!");
        }
    }
};

$(document).ready(Cart.init);
</script>
@endsection