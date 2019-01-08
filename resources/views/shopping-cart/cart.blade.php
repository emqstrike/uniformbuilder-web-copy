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
                                            <option value="24">24</option>
                                            <option value="26">26 (YS)</option>
                                            <option value="28">28 (YM)</option>
                                            <option value="30">30</option>
                                            <option value="32">32 (YL)</option>
                                            <option value="34">34 (YXL)</option>
                                            <option value="36">36 (S)</option>
                                            <option value="38">38 (M)</option>
                                            <option value="40">40</option>
                                            <option value="42">42 (L)</option>
                                            <option value="44">44</option>
                                            <option value="46">46 (XL)</option>
                                            <option value="48">48</option>
                                            <option value="50">50 (2XL)</option>
                                            <option value="52">52</option>
                                            <option value="54">54 (3XL)</option>
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
                                        <th>Ok/Delete</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5">
                                            <button class="btn btn-primary btn-sm add-player"><span class="glyphicon glyphicon-plus-sign"></span> Add Player</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            {{-- <div role="tabpanel">
                                <ul class="nav hidden" role="tablist" id="tab-sizes">
                                    <li role="presentation" class="active">
                                        <a href="#size-24" aria-controls="tab" role="tab" data-toggle="tab">24</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-26" aria-controls="tab" role="tab" data-toggle="tab">26 (YS)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-28" aria-controls="tab" role="tab" data-toggle="tab">28 (YM)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">30</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-32" aria-controls="tab" role="tab" data-toggle="tab">32 (YL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-34" aria-controls="tab" role="tab" data-toggle="tab">34 (YXL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-36" aria-controls="tab" role="tab" data-toggle="tab">36 (S)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-38" aria-controls="tab" role="tab" data-toggle="tab">38 (M)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-40" aria-controls="tab" role="tab" data-toggle="tab">40</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-42" aria-controls="tab" role="tab" data-toggle="tab">42 (L)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-44" aria-controls="tab" role="tab" data-toggle="tab">44</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-46" aria-controls="tab" role="tab" data-toggle="tab">46 (XL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-48" aria-controls="tab" role="tab" data-toggle="tab">48</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">50 (2XL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">52</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">54 (3XL)</a>
                                    </li>
                                </ul>

                                <div class="tab-content" id="tab-sizes-content">
                                    <div role="tabpanel" class="tab-pane fade in active" id="size-24" data-size="24">
                                        <table class="table table-hover table-bordered player-list">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Last Name</th>
                                                    <th>Number</th>
                                                    <th>Quantity</th>
                                                    <th>Ok/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="5">
                                                        <button class="btn btn-primary btn-sm add-player"><span class="glyphicon glyphicon-plus-sign"></span> Add Player</button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="size-26">world</div>
                                </div>
                            </div> --}}
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

<script type="text/template" id="player-row-tmpl">
    <% if (!_.isEmpty(players)) { %>
        <% _.each(players, function(player, index) { %>
            <tr>
                <td><%= index+1 %></td>
                <td>
                    <input type="text" name="last_name" value="<%= player.last_name %>" class="form-control" />
                </td>
                <td>
                    <input type="text" name="number" value="<%= player.number %>" class="form-control" />
                </td>
                <td>
                    <input type="text" name="quantity" value="<%= player.quantity %>" class="form-control" />
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok-sign"></span></button>
                        <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove-sign"></span></button>
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

<script type="text/template" id="selected-sizes-tmpl">
    <div role="tabpanel">
        <!-- Nav pills -->
        <ul class="nav" role="tablist" id="tab-sizes-with-players">
            <li role="presentation" class="active">
                <a href="#size-24" aria-controls="tab" role="tab" data-toggle="tab">24</a>
            </li>
            <li role="presentation">
                <a href="#size-26" aria-controls="tab" role="tab" data-toggle="tab">26 (YS)</a>
            </li>
            <li role="presentation">
                <a href="#size-28" aria-controls="tab" role="tab" data-toggle="tab">28 (YM)</a>
            </li>
            <li role="presentation">
                <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">30</a>
            </li>
            <li role="presentation">
                <a href="#size-32" aria-controls="tab" role="tab" data-toggle="tab">32 (YL)</a>
            </li>
            <li role="presentation">
                <a href="#size-34" aria-controls="tab" role="tab" data-toggle="tab">34 (YXL)</a>
            </li>
            <li role="presentation">
                <a href="#size-36" aria-controls="tab" role="tab" data-toggle="tab">36 (S)</a>
            </li>
            <li role="presentation">
                <a href="#size-38" aria-controls="tab" role="tab" data-toggle="tab">38 (M)</a>
            </li>
            <li role="presentation">
                <a href="#size-40" aria-controls="tab" role="tab" data-toggle="tab">40</a>
            </li>
            <li role="presentation">
                <a href="#size-42" aria-controls="tab" role="tab" data-toggle="tab">42 (L)</a>
            </li>
            <li role="presentation">
                <a href="#size-44" aria-controls="tab" role="tab" data-toggle="tab">44</a>
            </li>
            <li role="presentation">
                <a href="#size-46" aria-controls="tab" role="tab" data-toggle="tab">46 (XL)</a>
            </li>
            <li role="presentation">
                <a href="#size-48" aria-controls="tab" role="tab" data-toggle="tab">48</a>
            </li>
            <li role="presentation">
                <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">50 (2XL)</a>
            </li>
            <li role="presentation">
                <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">52</a>
            </li>
            <li role="presentation">
                <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">54 (3XL)</a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content" id="tab-sizes-with-players-content">
            <div role="tabpanel" class="tab-pane fade in active" id="size-24">
                <table class="table table-hover table-bordered player-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                        <tr>
                            <td>1</td>
                            <td>
                                <p>Doe</p>
                            </td>
                            <td>
                                <p>10</p>
                            </td>
                            <td>
                                <p>1</p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="size-26">world</div>
        </div>
    </div>
</script>

<script type="text/javascript">
var Cart = {
    dummy_data: {
        24: [{
            last_name: "a",
            number: 1,
            quantity: 1,
        },
        {
            last_name: "b",
            number: 1,
            quantity: 1,
        }]
    },

    init: function() {
        $(':input[name="size"]').change(Cart.onSelectSize);
        $('#tab-sizes-content .tab-pane .add-player').click(Cart.onAddPlayer);
        $('#view-selected-sizes').click(Cart.onViewAllSelectedSizes);
    },

    onSelectSize: function() {
        var size = $(this).val();

        var player_row_tmpl = _.template($('#player-row-tmpl').html());

        $('#player-list tbody').html(player_row_tmpl({
            players: Cart.dummy_data[size]
        }));
    },

    onViewAllSelectedSizes: function() {
        bootbox.dialog({
            title: "Selected Sizes",
            message: "fdsa",
            size: "large"
        });
    },

    onAddPlayer: function() {
        var size = $(this).closest('.tab-pane').data('size');
        console.log(size);

        var player_list_container = $(this).closest('.tab-pane').find('table tbody');
        var player_row_tmpl = _.template($('#player-row-tmpl').html());

        player_list_container.append(player_row_tmpl({index: 1}));
    }
};

$(document).ready(Cart.init);
</script>
@endsection