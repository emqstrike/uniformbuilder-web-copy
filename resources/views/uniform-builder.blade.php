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
<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/jquery-ui/jquery-ui.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/drop/css/drop-theme-basic.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/js/libs/smoke/smoke.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/colorpicker/css/bootstrap-colorpicker.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/dropdown/jquery.dropdown.css?v={{$asset_version}}">

<link rel="stylesheet" href="{{$asset_storage}}/round-slider/roundslider.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/noUiSlider/nouislider.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/noUiSlider/nouislider.pips.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/noUiSlider/nouislider.tooltips.css?v={{$asset_version}}">

<link rel="stylesheet" href="{{$asset_storage}}/intro-js/introjs.min.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/rangeSlider/css/rangeSlider.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/rangeSlider/css/normalize.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/rangeSlider/css/skinModern.css?v={{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder.css?v={{$asset_version}}">


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

    <div class="row">

    </div>

    <div class="row" id="special_modifiers">

        <div class="col-md-6">

        </div>

    </div>

    <!-- MAIN ROW -->
    <div class="row main_viewport" class=''>
    
        <div id="left-pane-column" class="left-pane-column-full">
            
            <!-- Main Preview Window -->
            @yield('left-pane')

        </div>    

    </div>

    <div id="main-row" class="row">
        <div id="left-pane-column"  class="col-md-6">
            <!-- Main Preview Window -->
        </div>
        <div id="right-pane-column" class="col-md-6">
            <!-- Customizer -->

            @yield('right-pane')

        </div>
    </div>

    <!-- END MAIN ROW -->

    <!-- Scrolling Pickers --> 

    @include('partials.panels.texts')

    <div class='header-container forceHide'>
            
        <div class='back-link' data-destination="gender"></div>
        <h2 class='picker-header'>CHOOSE A GENDER</h2>

    </div>

    <div id="main-picker-container">
        
        <div id="topbar">

            <span class="slink main-picker-items my-favorites" data-picker-type="gender" data-item="My-Favorites"><i class="fa fa-star" aria-hidden="true"></i> My Favorites (<span class="count">0</span>)</span>

            <span class="slink main-picker-items back-link" data-picker-type="gender" data-item="Home"><i class="fa fa-home" aria-hidden="true"></i></span>
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Men">Men</span>
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Women">Women</span>
            <!-- <span class="slink main-picker-items" data-picker-type="gender" data-item="Youth">Youth</span> -->
            
            <span class="slink main-picker-items loading" data-picker-type="gender" data-item="Loading">
               <img src="/images/loading.gif" width="50" height="50" />
            </span>

            <span class="slink-search">
                
                <i class="fa fa-search fa-search-icon" aria-hidden="true"></i>
                <input id="search_field" type='text' class="typeahead" placeholder="Preparing search, please wait..." disabled></input>

            </span>

        </div>

        <div class="secondary-bar">

            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="All">All</span>
            <span class="slink main-picker-items primary-filters" data-picker-type="gender" data-item="Jersey">Jersey</span>
            <span class="slink main-picker-items primary-filters" data-picker-type="gender" data-item="Pant">Pant</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="separator"> | </span>
            <span class="slink main-picker-items secondary-filters active" data-picker-type="gender" data-item="All">All</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="Sublimated">Sublimated</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="Twill">Tackle Twill</span>

        </div>

        <div class="tertiary-bar">

            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="All">All</span>
            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="Infused 14">INFUSED 14</span>

        </div>

        <div class="quarternary-bar">

            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="All">All</span>
            
        </div>

        <div id="main-picker-scroller">
            
        </div>
        
        <div class="uniform_details"><span class="uniform_name">Test:</span><span class="uniform_description"></span></div>

    </div>

    <!-- End Scrolling Pickers -->

    @include('partials.panels.item-groups-toolbar')
    @include('partials.panels.left-side-toolbar')

    @include('partials.panels.roster-input')
    @include('partials.panels.order-form')
    @include('partials.panels.validate-order-form')
    @include('partials.panels.team-store-toolbox')

</div>

@yield('my-saved-designs')
@yield('my-orders')
@yield('my-custom-artwork-requests')
@yield('view-order-info')
@yield('my-messages')
@yield('my-profile')
@yield('signup')
@yield('forgot-password')
@yield('reset-password')
@yield('change-password')
@yield('preview-embellishment')

<!--

    <div class="container-fluid uniform-suggestions">
        <div class="col-md-12 you-might-like">
            You might also like:
        </div>
        <div class="suggestions"></div>
    </div>

-->

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
<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/jquery-ui/jquery-ui.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/underscore/underscore.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/bootstrap/js/bootstrap.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/fabricjs/fabric.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/dropzone/dropzone.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/tether/js/tether.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/drop/js/drop.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/opentype/js/opentype.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/scrollTo/jquery.scrollTo.js?v={{$asset_version}}"></script>

<script src="{{$asset_storage}}/js/libs/creditly/creditly.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/mustache/mustache.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/js/libs/smoke/smoke.js?v={{$asset_version}}"></script>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>

<script src="{{$asset_storage}}/qrcode/jquery.qrcode-0.12.0.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/jspdf.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/addimage.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/png.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/zlib.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/png_support.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/dropdown/jquery.dropdown.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/outside-events/jquery.ba-outside-events.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/colorpicker/js/bootstrap-colorpicker.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/typeahead/typeahead.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/isotope/isotope.pkgd.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/sortable/Sortable.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/sortable/jquery.binding.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/sortable/jquery.fn.sortable.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/moment/moment.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/moment/moment-timezone-with-data-2010-2020.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/gl-matrix/gl-matrix.js?v={{$asset_version}}"></script>

<script src="{{$asset_storage}}/slider/jquery.limitslider.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/round-slider/roundslider.min.js?v={{$asset_version}}"></script> 
<script src="{{$asset_storage}}/noUiSlider/nouislider.js?v={{$asset_version}}"></script> 

<script src="{{$asset_storage}}/bootbox/bootbox.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/intro-js/intro.min.js?v={{$asset_version}}"></script>
<script src="{{$asset_storage}}/svgjs/svg.min.js"></script>

<script src="{{$asset_storage}}/rangeSlider/js/rangeSlider.js"></script>

<!-- End Third Party Scripts -->

<!-- Initial Setup Script -->

    @include('partials.setup-script') <!-- Initial Setup Script -->

<!-- End Initial Setup Script -->

<!-- Uniform Builder Scripts -->
    <script src="{{$asset_storage}}/uniform-builder/js/ub.js?v={{$asset_version}}"></script>
<!-- End Uniform Builder Scripts -->

<!-- Drop Down Test-->

    <div class="team_color_picker_options" data-team-color-id = '-1'>

        <div class="color_items_container">
            
        </div>

    </div>

<!-- End Drop Down Test-->

<!-- QA Tools -->

    @include('partials.panels.qatools')

<!-- End QA Tools -->

<!-- Preview Panel -->

    @include('partials.panels.preview-panel')

<!-- End Preview Panel -->

<!-- Preview Panel -->

    @include('partials.panels.debug-panel')

<!-- End Preview Panel -->

<!-- Messages Panel -->

    @include('partials.panels.messages-panel')

<!-- End Messages Panel -->

<!-- Modal -->

<button id="modalButton" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">Small modal</button>

<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
     <div id="messageModal">
     </div>

    </div>
  </div>
</div>

<!-- End Modal -->

@include('partials.inksoft')


</body>

@include('partials.detect-mobile')

</html>