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
<link rel="stylesheet" href="{{$asset_storage}}/js/libs/smoke/smoke.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/colorpicker/css/bootstrap-colorpicker.css{{$asset_version}}">

<script type="text/javascript" src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>

@include('partials.navbar')

<div id="main_container" class="container">
    <div class="alert alert-info alert-dismissable flash-alert" style="display: none">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
            ×
        </button>
        <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
    </div>

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

<div class="container-fluid uniform-suggestions">
    <div class="col-md-12 you-might-like">
        You might also like:
    </div>
    <div class="suggestions"></div>
</div>

@if (Session::get('isLoggedIn'))
    @include('partials.open-design-modal')
    @include('partials.share-design-modal')
    @include('partials.save-design-modal')
@else
    @include('partials.signup-modal')
@endif
@include('partials.team-roster-modal')

@include('partials.controls.ui-controls')

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
<script src="{{$asset_storage}}/pixi/pixi.draggable.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/opentype/js/opentype.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/scrollTo/jquery.scrollTo.js{{$asset_version}}"></script>

<script src="{{$asset_storage}}/slider/jquery.limitslider.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/round-slider/roundslider.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/creditly/creditly.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/mustache/mustache.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/smoke/smoke.js{{$asset_version}}"></script>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js"></script>

<script src="{{$asset_storage}}/colorpicker/js/bootstrap-colorpicker.js{{$asset_version}}"></script>

<!-- End Third Party Scripts -->


<!-- Uniform Builder Scripts -->
<script type="text/javascript">
$(document).ready(function () {
    window.ub = {}; window.ub.objects = {}; window.ub.config = { app_env: "{{ env('APP_ENV') }}", api_host: "http://{{ env('API_HOST') }}", material_id: {{ $material_id }}, category_id: {{ $category_id }}, host: 'http://{{ Request::server ("HTTP_HOST") }}', thumbnails_path: "{{ env('S3_PATH') }}" + 'thumbnails/' };
@if (Session::get('isLoggedIn'))
    window.ub.user = {id: {{ Session::get('userId') }}, fullname: "{{ Session::get('fullname') }}", email: "{{ Session::get('email') }}", headerValue: "{{ base64_encode(Session::get('accessToken')) }}"};
@else
    window.ub.user = false;
    $('#signup-modal .register').on('click', function(){
        var captcha_response = $('.g-recaptcha-response').val();
        if (captcha_response.length == 0) {
            $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '90px'});
            return false;
        }
        return true;
    });
@endif
@if (Session::has('message'))
    $.smkAlert({text: "{{ Session::get('message') }}", type:'info', permanent: false, time: 5, marginTop: '90px'});
@endif

var s = "{{ $builder_customizations }}";

if(s.length > 0){
    window.ub.temp = JSON.parse(s.replace(/&quot;/g,'"'));
}
else {
    window.ub.temp = undefined;
}    


});



</script>
<script src="{{$asset_storage}}/uniform-builder/js/utilities.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-configuration.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-data.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-applications.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-plugins.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder.js{{$asset_version}}"></script>
<!-- End Uniform Builder Scripts -->

</body>
</html>