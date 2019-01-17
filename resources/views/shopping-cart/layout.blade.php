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
                    <li><a href="javascript:void(0)" style="cursor: default;">{{ \Auth::check() ? "user" : "guest" }}</a></li>
                    <li><a href="{{ route('shopping-cart') }}"><span class="glyphicon glyphicon-shopping-cart"></span> <span class="badge" id="cart-item-number">3</span></a></li>
                </ul>
            </div>
        </div>
    </nav>

    @yield('content')
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="/bootstrap/js/bootstrap.js"></script>
    @yield('scripts')
</body>
</html>