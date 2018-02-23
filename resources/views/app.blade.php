<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="copyright" content="QuickStrike Uniform Builder">
    <meta name="description" content="QuickStrike Uniform Builder">
    <meta name="keywords" content="uniform builder, uniform, builder, quickstrike">
    <meta name="robots" content="index,follow">
    <title>{{ $page_title }}</title>
 
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
     
    <!-- Fonts -->
    <!--<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>-->
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="/css/libs/normalize/normalize.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/acc-wizard/acc-wizard.min.css">
    <link rel="stylesheet" type="text/css" href="/css/master-editor.css">
</head>
<body>

    @yield('content')
 
    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="/js/libs/prototype/prototype.js"></script>
    <script src="/js/libs/acc-wizard/acc-wizard.min.js"></script>
    <script type="text/javascript">

    jQuery.noConflict();
    jQuery.ready(function(){
        jQuery(window).load(function() {
            $(".acc-wizard").accwizard();
        });
    });
    // use Prototype with $(...), etc.
    
    </script>
    <!-- Latest compiled and minified JavaScript -->
</body>
</html>