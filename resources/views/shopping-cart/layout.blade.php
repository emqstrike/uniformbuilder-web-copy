<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shopping Cart | Customizer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @yield('meta')

    <link rel="stylesheet" type="text/css" href="/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/css/shopping-cart.css" />

    @yield('styles')
</head>
<body>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="javascript:void(0)">Customizer Shopping Cart</a>
            </div>
    
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0)" style="cursor: default;">{{ \Auth::check() ? \Auth::user()->getFullName() : "guest" }}</a></li>
                    <li><a href="{{ route('shopping-cart') }}"><span class="glyphicon glyphicon-shopping-cart"></span> <span class="badge" cloak id="cart-item-number">3</span></a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                Cart Token: <span class="label label-info">{{ \Session::get('cart_token') }}</span> <br>
                Cart Lifespan: <span class="label label-info">{{ App\ShoppingCart\Cart::LIFE_SPAN }} seconds</span> <br>
                Cart Timer: <span class="glyphicon glyphicon-time"></span> <span id="cart-timer">0</span> <br>
                <hr>
            </div>
        </div>
    </div>

    <div class="m-b-30">
        @yield('content')
    </div>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="/js/shopping-cart/api/cart-item-player-api.js"></script>

    <script type="text/javascript">
    window.shopping_cart = {
        logged_in_token: "{{ \Auth::check() ? \Auth::user()->logged_in_token : '' }}",
        cart_token: "{{ \Session::get('cart_token') }}",
        sizes: <?php echo json_encode(config('customizer.sizes')) ?>
    }
    </script>

    <script type="text/javascript">
        {{-- cipa - cart item player api --}}
        var cipa = new CartItemPlayerApi(shopping_cart.logged_in_token, shopping_cart.cart_token);

        var ShoppingCart = {
            init: function() {
                ShoppingCart.cartTimer();
                ShoppingCart.loadCartNumber();
            },

            cartTimer: function() {
                var time_counter = 0;
                var cart_lifespan = parseInt("{{ App\ShoppingCart\Cart::LIFE_SPAN }}");

                var timer = setInterval(function() {
                    $('#cart-timer').text(++time_counter);

                    if (time_counter >= cart_lifespan) {
                        clearInterval(timer);

                        $('#cart-timer').text("Timeout!");

                        alert("The cart is now expired!");
                        location.reload();
                    }

                }, 1000); // 1 sec
            },

            loadCartNumber: function() {
                cipa.getPlayersPerCartItem(function(response, textStatus, xhr) {
                    if (response.success) {
                        $('#cart-item-number').text(response.data.length).show();
                    }
                });
            }
        };

        $(document).ready(ShoppingCart.init);
    </script>

    @yield('scripts')
</body>
</html>