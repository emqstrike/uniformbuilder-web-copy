@extends('shopping-cart.layout')

@inject('Auth', 'App\Auth\Auth')

@section('meta')
<meta name="csrf-token" content="{{ csrf_token() }}" />
@endsection

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">My Cart</h1>

            @include('templates.flash')

            <div class="row" id="cart-items-el">
                {{-- content would be loaded here --}}
            </div>

            <div class="row">
                <div class="col-md-12">
                    <a href="{{ $Auth::check() ? route('shopping-cart.client-info') : route('shopping-cart.create-user-via-cart') }}" class="btn btn-primary">Checkout <span class="glyphicon glyphicon-arrow-right"></span></a>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/bootbox/bootbox.min.js"></script>
<script type="text/javascript" src="/node_modules/jquery-validation/dist/jquery.validate.js"></script>
<script type="text/javascript" src="/jquery-validation/add-methods.js"></script>
<script type="text/javascript" src="/jquery-validation/JvBs3.js"></script>

<script type="text/javascript" src="/js/shopping-cart/api/material-api.js"></script>

<script type="text/template" id="duplicate-items-tmpl">
    <div id="duplicate-items-container">
        <% _.each(duplicate_cart_items, function(cart_items) { %>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h1 class="panel-title"><%= cart_items[0].name %></h1>
                </div>
                <div class="panel-body">
                    <div class="btn-group-vertical btn-block">
                        <% _.each(cart_items, function (item) { %>
                            <button type="button" class="btn btn-default cart-item-btn" data-cart-item-id="<%= item.cart_item_id %>">
                                <% if (item.images.left_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.images.left_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Left</b>
                                        </p>
                                    </div>
                                <% } %>

                                <% if (item.images.front_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.images.front_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Front</b>
                                        </p>
                                    </div>
                                <% } %>

                                <% if (item.images.back_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.images.back_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Back</b>
                                        </p>
                                    </div>
                                <% } %>

                                <% if (item.images.right_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.images.right_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Right</b>
                                        </p>
                                    </div>
                                <% } %>
                            </button>
                        <% }); %>
                    </div>
                </div>
            </div>
        <% }); %>
    </div>
</script>

<script type="text/template" id="cart-items-tmpl">
    <% _.each(cart_items, function(item) { %>
        <div class="col-md-6 cart-item" data-cart-item-id="<%= item.cart_item_id %>" data-material-id="<%= item.material_id %>">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="btn-group pull-right">
                        <a href="/builder/0/<%= item.material_id %>?customize-uniform" class="btn btn-success btn-xs" target="_blank">
                            <span class="glyphicon glyphicon-pencil"></span> Edit In Customizer
                        </a>
                        <button class="btn btn-danger btn-xs delete-cart-item"
                            data-cart-item-id="<%= item.cart_item_id %>"
                            data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">

                            <span class="glyphicon glyphicon-remove"></span> Delete to Cart
                        </button>
                    </div>
                    <h1 class="panel-title"><%= item.name %></h1>
                </div>
                <div class="panel-body">
                    <div class="image-container">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="<%= item.images.left_image %>" class="img-responsive left-image" alt="" width="100" />
                                <p class="text-center">
                                    <b>Left</b>
                                </p>
                            </div>
                            <div class="col-md-3">
                                <img src="<%= item.images.front_image %>" class="img-responsive front-image" alt="" width="100" />
                                <p class="text-center">
                                    <b>Front</b>
                                </p>
                            </div>
                            <div class="col-md-3">
                                <img src="<%= item.images.back_image %>" class="img-responsive back-image" alt="" width="100" />
                                <p class="text-center">
                                    <b>Back</b>
                                </p>
                            </div>
                            <div class="col-md-3">
                                <img src="<%= item.images.right_image %>" class="img-responsive right-image" alt="" width="100" />
                                <p class="text-center">
                                    <b>Right</b>
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="size">Select Size</label>

                                <select name="size" class="form-control" disabled>
                                    <option value="null">Loading...</option>
                                </select>
                            </div>

                            <div class="pull-right">
                                <button class="btn btn-link view-all-players">View All Players</button>
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
                        <button class="btn btn-success btn-xs edit-player" data-id="<%= player.id %>" data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button class="btn btn-danger btn-xs delete-player" data-id="<%= player.id %>" data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">
                            <span class="glyphicon glyphicon-remove-sign"></span>
                        </button>
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
                <button class="btn btn-success btn-xs edit-player" data-id="<%= id %>" data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button class="btn btn-danger btn-xs delete-player" data-id="<%= id %>" data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">
                    <span class="glyphicon glyphicon-remove-sign"></span>
                </button>
            </div>
        </td>
    </tr>
</script>

<script type="text/template" id="all-players-tmpl">
    <% if (!_.isEmpty(all_player_sizes)) { %>
        <div role="tabpanel">
            <ul class="nav nav-tabs" role="tablist">
                <% _.each(all_player_sizes, function(size) { %>
                    <% var selected_players = _.filter(players, {size: size}) %>
                    <li role="presentation" class="<%= all_player_sizes[0] == size ? 'active' : '' %>">
                        <a href="#size-<%= size.replace(/(\s)/g, "-").replace(/(\(|\))/g, "") %>" aria-controls="tab" role="tab" data-toggle="tab"><%= size %> - <%= currency_symbol + selected_players[0].price %></a>
                    </li>
                <% }); %>
            </ul>

            <br />

            <div class="tab-content">
                <% _.each(all_player_sizes, function(size) { %>
                    <div role="tabpanel" class="tab-pane fade <%= all_player_sizes[0] == size ? 'in active' : '' %>" id="size-<%= size.replace(/(\s)/g, "-").replace(/(\(|\))/g, "") %>">
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
                                <% selected_players = _.filter(players, {size: size}) %>
                                <% _.each(selected_players, function(player, n) { %>
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
        <p>No players available</p>
    <% } %>
</script>

<script type="text/template" id="sizes-tmpl">
    <select name="size" class="form-control">
        <% if (!_.isEmpty(sizes)) { %>
            <% if (typeof sizes.adult !== "undefined") { %>
                <optgroup label="Adult">
                    <% _.each(sizes.adult, function(size) { %>
                        <option value='<%= JSON.stringify({size: size.size, price: (size.msrp * currency.rate).toFixed(2)}) %>'><%= size.size %> - <%= currency.symbol + (size.msrp * currency.rate).toFixed(2) %></option>
                    <% }); %>
                </optgroup>
            <% } %>

            <% if (typeof sizes.youth !== "undefined") { %>
                <optgroup label="Youth">
                    <% _.each(sizes.youth, function(size) { %>
                        <option value='<%= JSON.stringify({size: size.size, price: (size.msrp * currency.rate).toFixed(2)}) %>'><%= size.size %> - <%= currency.symbol + (size.msrp * currency.rate).toFixed(2) %></option>
                    <% }); %>
                </optgroup>
            <% } %>

        <% } else { %>
            <option value="null">Empty</option>
        <% } %>
    </select>
</script>

<script type="text/template" id="form-tmpl">
    <form role="form">
        <div class="form-group has-feedback">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" value="<%= typeof(last_name) !== "undefined" ? last_name : '' %>" class="form-control" style="padding: 6px 12px;" />
        </div>

        <div class="form-group has-feedback">
            <label for="number">Number</label>
            <input type="number" name="number" value="<%= typeof(number) !== "undefined" ? number : '' %>" class="form-control" min="1" max="99" style="padding: 6px 12px;" />
        </div>

        <div class="form-group has-feedback">
            <label for="quantity">Quantity</label>
            <input type="number" name="quantity" value="<%= typeof(quantity) !== "undefined" ? quantity : '' %>" class="form-control" min="1" max="100" style="padding: 6px 12px;" />
        </div>
    </form>
</script>

<script type="text/javascript">
window.cart = {
    api_host: "{{ config('customizer.api_host') }}",
    current_rate: "{{ $current_rate }}",
    current_currency: {
        rate: "{{ $current_rate }}",
        symbol: "{{ $currentCurrency->symbol_native }}"
    }
};
</script>
<script type="text/javascript" src="/js/shopping-cart/cart.js"></script>
@endsection