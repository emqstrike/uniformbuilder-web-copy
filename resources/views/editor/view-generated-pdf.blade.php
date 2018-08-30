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
    <!-- Stylesheets -->
    @include('partials.code.stylesheets')
    <!-- End Stylesheets -->
    <script type="text/javascript" src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>

@include('partials.navbar')

<iframe style="width: 100%; height: 768px; border: 0;" src="{{$filename}}"></iframe>


<!-- Modals -->

@if (Session::get('isLoggedIn'))
    @include('partials.open-design-modal')
    @include('partials.share-design-modal')
    @include('partials.save-design-modal')
@else
    @include('partials.signup-modal')
@endif

{{--@include('partials.team-roster-modal')--}}

{{--@include('partials.panels.small-modal')--}}

<!-- End Modals -->


<!-- UI Controls -->

<!-- Prolook / Base -->
@include('partials.controls.ui-controls')

<!-- Richardson UI Controls -->
{{--@include('partials.controls.ui-controls-richardson')--}}

<!-- End UI Controls -->


<!-- Code -->

<!-- Third Party Scripts -->
@include('partials.code.includes')

<!-- Init Code -->
@include('partials.code.init-code')

<!-- End Code -->


<script src="{{$asset_storage}}/uniform-builder/js/ub.js?v={{$asset_version}}"></script>


{{--<!-- QA Tools -->--}}
{{--@include('partials.panels.qatools')--}}
{{--<!-- End QA Tools -->--}}


{{--<!-- Preview Panel -->--}}
{{--@include('partials.panels.preview-panel')--}}
{{--<!-- End Preview Panel -->--}}


{{--<!-- Preview Panel -->--}}
{{--@include('partials.panels.debug-panel')--}}
{{--<!-- End Preview Panel -->--}}


{{--<!-- Messages Panel -->--}}
{{--@include('partials.panels.messages-panel')--}}
{{--<!-- End Messages Panel -->--}}


{{--<!-- Inksoft -->--}}
{{--@include('partials.inksoft')--}}
{{--<!-- End Inksoft -->--}}


{{--@include('partials.detect-mobile')--}}


</body>
</html>
