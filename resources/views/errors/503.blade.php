<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Access-Control-Allow-Origin" content="*"/>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Engineering">
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta name="team-store-api" content="{{ env('TEAM_STORE_API_BASE_URL') }}">

<title>Prolook Sports | Uniform Customizer</title>
<meta name="description" content="Design your own custom uniforms using the Prolook Uniform Customizer. We offer tons of designs for all sports. Create your custom uniform today.">
<meta name="keywords" content="custom uniform, custom football uniform, custom basketball uniform, custom baseball uniform, custom volleyball uniform, uniform builder, prolook unifom builder, team uniforms">

<link rel="icon" type="image/png" href="/images/branding/favicon.ico" />
<link href='//fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="{{ env('asset_storage') }}/bootstrap/css/bootstrap.min.css?v={{ env('asset_version') }}">
<link rel="stylesheet" href="{{ env('asset_storage') }}/bootstrap/css/bootstrap-theme.min.css?v={{ env('asset_version') }}">
<link rel="stylesheet" href="{{ env('asset_storage') }}/font-awesome/css/font-awesome.min.css?v={{ env('asset_version') }}">
<link rel="stylesheet" href="{{ env('asset_storage') }}/uniform-builder/css/uniform-builder.css?v={{ env('asset_version') }}">

<script type="text/javascript" src='https://www.google.com/recaptcha/api.js'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<style type="text/css">
    body {
        background: url('/images/main-ui/down/down-bg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    #right-col-md-6-content {
        display:table-cell;
        vertical-align:middle;
        text-align:center;
    }

    #clock {
        font-size: 5em;
        border-radius: 10px;
        padding: 10px;
    }

    #margin-top-20 {
        margin-top: 20px;
    }
</style>

</head>

<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header btn-group" id="navbar-header">
            <a class="navbar-brand btn dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
                <img src="/images/branding/pl-logo-black-1e1e1e.png" class="uk-width-small pl-brand">
            </a>
        </div>
        <div>
            <h1 class="text-center" id="header_text">PROLOOK CUSTOMIZER</h1>
        </div>
    </div>
</nav>

<div id="main_container" class="container-fluid">
    <div class="row" style="margin-top: 150px">
        <div class="col-sm-5 col-md-6"></div>
        <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
            
            <div class="row">
                <div class="col-md-7 col-md-offset-1" id="right-col-md-6-content">
                    <img src="/images/main-ui/down/football-icon.gif">
                </div>
            </div>

            <div class="row">
                <div class="col-md-7 col-md-offset-1" id="right-col-md-6-content">
                    <h1 style="font-size: 2.5em;"><b>Site under Maintenance!</b></h1>
                </div>
            </div>

            <div class="row">
                <div class="col-md-7 col-md-offset-1" id="right-col-md-6-content">
                    <p>
                        The website is currently under maintenance. We will be back shortly.
                        <br/>
                        Thank you for your patience.
                    </p>
                </div>
            </div>

            <div class="row" id="margin-top-20">
                <div class="col-md-7 col-md-offset-1" id="right-col-md-6-content">
                    <p>
                        Worst-case scenario..we most likely will be live sooner than this!
                    </p>
                </div>
            </div>

            <!-- Timer -->
            <div class="row" id="margin-top-20">
                <div class="col-md-7 col-md-offset-1" id="right-col-md-6-content">
                <span id="clock"></span>
            </div>

        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        
        var countDownDate = new Date("Aug 06, 2018 17:00:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("clock").innerHTML =  hours + "h "
            + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("clock").innerHTML = "";
            }
        }, 1000);
    });
    
</script>

</body>
</html>
