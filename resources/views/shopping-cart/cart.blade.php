@extends('shopping-cart.layout')

@section('meta')
<meta name="X-CSRF-TOKEN" content="{{ csrf_token() }}" />
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
                <button class="btn btn-success btn-xs edit-player" data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button class="btn btn-danger btn-xs delete-player" data-loading-text="<span class='glyphicon glyphicon-repeat gly-spin'></span>">
                    <span class="glyphicon glyphicon-remove-sign"></span>
                </button>
            </div>
        </td>
    </tr>
</script>

<script type="text/template" id="selected-sizes-tmpl">
    <% if (!_.isEmpty(selected_sizes)) { %>
        <div role="tabpanel">
            <ul class="nav nav-tabs" role="tablist">
                <% _.each(selected_sizes, function(size) { %>
                    <li role="presentation" class="<%= selected_sizes[0] == size ? 'active' : '' %>">
                        <a href="#size-<%= size %>" aria-controls="tab" role="tab" data-toggle="tab"><%= sizes[size] %></a>
                    </li>
                <% }); %>
            </ul>

            <br />

            <div class="tab-content">
                <% _.each(selected_sizes, function(size) { %>
                    <div role="tabpanel" class="tab-pane fade <%= selected_sizes[0] == size ? 'in active' : '' %>" id="size-<%= size %>">
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
                                <% var selected_players = _.filter(players, {size: size}) %>
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
window.shopping_cart = {
    logged_in_token: "{{ \Auth::check() ? \Auth::user()->logged_in_token : '' }}",
    cart_token: "{{ \Session::get('cart_token') }}",
    sizes: <?php echo json_encode($sizes) ?>
}
</script>

<script type="text/javascript" src="/js/shopping-cart/api/cart-item-player-api.js"></script>
<script type="text/javascript" src="/js/shopping-cart/cart.js"></script>
@endsection