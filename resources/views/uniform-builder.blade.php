<!DOCTYPE html>
<html>

<head>

<meta http-equiv="Access-Control-Allow-Origin" content="*"/>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Uniform Builder">
<meta name="author" content="Engineering">
<title>{{ $page_title }}</title>
<link rel="icon" type="image/png" href="/images/branding/brand.png" />
<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/jquery-ui/jquery-ui.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/round-slider/roundslider.min.css{{$asset_version}}">

<link rel="stylesheet" href="{{$asset_storage}}/drop/css/drop-theme-basic.css{{$asset_version}}">

<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder-plugins.css{{$asset_version}}">


</head>

<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header" id="navbar-header">
            <a class="navbar-brand" href="#"><img src="/images/branding/brand.png" height="50"></a>
        </div>
        <div>
            <h1 class="text-center" id="header_text">{{ $app_title }}</h1>
        </div>
        <div class='user-profile pull-right'>
            @if (!Session::get('isLoggedIn'))
            <form class="form-inline" role="form" method="POST" action="/login">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="form-group form-group-sm">
                    <input type="email" name="email" class="form-control col-sm-2" id="login-email" placeholder="Email Address">
                </div>
                <div class="form-group form-group-sm">
                    <input type="password" name="password" class="form-control col-sm-3" id="login-password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary btn-xs">
                    Login
                    <span class="glyphicon glyphicon-lock"></span>
                </button>
                <a class="btn btn-success btn-xs user-signup" href="#">
                    Signup
                </a>
            </form>
            @else
            Welcome <strong>{{ Session::get('fullname') }} &lt;{{ Session::get('email') }}&gt;</strong>
            <a href="/logout" class='btn btn-xs btn-primary'><span class="glyphicon glyphicon-log-out"></span> Sign out</a>
            @endif
        </div>
    </div>
</nav>

<div id="main_container" class="container">
    
    @if (Session::has('message'))
        
        <div class="alert alert-info alert-dismissable flash-alert">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                ×
            </button>
            <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
        </div>

    @endif

    <div id="main-row" class="row">
       
        <div id="left-pane-column"  class="col-md-6">
            <!-- Main Preview Window -->
            @yield('left-pane')
        </div>

        <div id="right-pane-column" class="col-md-6">
            <!-- Customizer -->
            @yield('right-pane')
        </div>

    </div>

</div> 


<div class="row">
    <div class="col-md-12">
        You might also like:
    </div>
    <div class="suggestions"></div>
</div>

    

@if (Session::get('isLoggedIn'))
    @include('partials.open-design-modal')
    @include('partials.save-design-modal')
@else
    @include('partials.signup-modal')
@endif

@include('partials.team-roster-modal')

<!-- Third Party Scripts -->

<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jquery-ui/jquery-ui.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/underscore/underscore-min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/bootstrap/js/bootstrap.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/fabricjs/fabric.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/dropzone/dropzone.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/tether/js/tether.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/drop/js/drop.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/pixi/pixi.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/slider/jquery.limitslider.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/round-slider/roundslider.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/creditly/creditly.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/handlebars/handlebars.min.js{{$asset_version}}"></script>

<!-- End Third Party Scripts -->

<!-- Uniform Builder Scripts -->

<script type="text/javascript">

$(document).ready(function () {
    window.ub = {}; window.ub.objects = {}; window.ub.config = {api_host: "http://{{ env('API_HOST') }}", material_id: {{ $material_id }}, category_id: {{ $category_id }}, host: 'http://{{ Request::server ("HTTP_HOST") }}', thumbnails_path: "{{ env('S3_PATH') }}" + 'thumbnails/' };
@if (Session::get('isLoggedIn'))
    window.ub.user = {id: {{ Session::get('userId') }}, fullname: "{{ Session::get('fullname') }}", email: "{{ Session::get('email') }}", headerValue: "{{ base64_encode(Session::get('accessToken')) }}"};
@else
    window.ub.user = false;
@endif
@if (Session::has('message'))
    setTimeout(function(){$('.flash-alert').fadeOut();}, 3000);
@endif
    var roster_source = $('#roster-record').html();
    var roster_template = Handlebars.compile(roster_source);
    $('#team-roster-form .table-roster-list').append(roster_template);
    $('.remove-roster-record').on('click', function(){
        $(this).parents('tr').fadeOut();
    });
});



</script>

<script src="{{$asset_storage}}/uniform-builder/js/utilities.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-data.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-plugins.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder.js{{$asset_version}}"></script>

<!-- End Uniform Builder Scripts -->

</body>
</html>