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
<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/jquery-ui/jquery-ui.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder-plugins.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-3-vert-offset-shim.css?v={{$asset_version}}">
</head>
<body>

@include('partials.navbar')

@yield('main-content')

@include('partials.signup-modal')

<!-- Third Party Scripts -->
<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/bootstrap/js/bootstrap.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/users.js?v={{$asset_version}}"></script>
<!-- End Third Party Scripts -->

<script type="text/javascript">
$(document).ready(function () {
    window.ub = {};
@if (Session::get('isLoggedIn'))
    window.ub.user = {id: {{ Session::get('userId') }}, fullname: "{{ Session::get('fullname') }}", email: "{{ Session::get('email') }}", headerValue: "{{ base64_encode(Session::get('accessToken')) }}"};
@else
    window.ub.user = false;
@endif
@if (Session::has('message'))
    $('.flash-alert').fadeIn();
    setTimeout(function(){$('.flash-alert').fadeOut();}, 5000);
@endif
});
</script>

</body>
</html>