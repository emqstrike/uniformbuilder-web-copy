<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Access-Control-Allow-Origin" content="*"/>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Uniform Builder">
<meta name="author" content="Engineering">
<meta name="csrf-token" content="{{ csrf_token() }}" />

<title>{{ $page_title }}</title>

<link rel="icon" type="image/png" href="/images/branding/favicon.ico" />
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
<link rel="stylesheet" href="{{$asset_storage}}/dropdown/jquery.dropdown.css{{$asset_version}}">

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

            <span class="slink main-picker-items back-link" data-picker-type="gender" data-item="Home"><i class="fa fa-home" aria-hidden="true"></i></span>
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Men">Men</span>
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Women">Women</span>
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Youth">Youth</span>

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


        <div id="main-picker-scroller">
            
        </div>
        
        <div class="uniform_details"><span class="uniform_name">Test:</span><span class="uniform_description"></span></div>

    </div>

    <!-- End Scrolling Pickers -->

    @include('partials.panels.roster-input')
    @include('partials.panels.order-form')
    @include('partials.panels.validate-order-form')    

</div>

@yield('my-saved-designs')
@yield('my-orders')
@yield('my-profile')
@yield('signup')
@yield('forgot-password')
@yield('reset-password')
@yield('change-password')

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
<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jquery-ui/jquery-ui.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/underscore/underscore.js{{$asset_version}}"></script>
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
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>

<script src="{{$asset_storage}}/qrcode/jquery.qrcode-0.12.0.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/jspdf.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/addimage.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/png.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/zlib.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jspdf/png_support.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/dropdown/jquery.dropdown.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/outside-events/jquery.ba-outside-events.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/colorpicker/js/bootstrap-colorpicker.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/typeahead/typeahead.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/isotope/isotope.pkgd.min.js{{$asset_version}}"></script>

<!-- End Third Party Scripts -->

<!-- Uniform Builder Scripts -->
<script type="text/javascript">

    $(document).ready( function () {

        window.ub           = {};
        window.ub.objects   = {};
        window.ub.funcs     = {};

        window.ub.config = {
            app_env: "{{ env('APP_ENV') }}", 
            api_host: "http://{{ env('API_HOST') }}", 
            material_id: {{ $material_id }},
            category_id: {{ $category_id }}, 
            host: 'http://{{ Request::server ("HTTP_HOST") }}',
            thumbnails_path: "{{ env('S3_PATH') }}" + 'thumbnails/'
        };

        @if (Session::get('isLoggedIn'))

            window.ub.user = {
                id: {{ Session::get('userId') }}, 
                fullname: "{{ Session::get('fullname') }}", 
                email: "{{ Session::get('email') }}", 
                headerValue: "{{ base64_encode(Session::get('accessToken')) }}"
            };

              $('button#change-password-submit').on('click', function() {

                if($('input#old-password').val() === ""){

                   $.smkAlert({text: 'Password cant be blank', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                if($('input#new-password').val() !== $('input#confirm-password').val()){

                   $.smkAlert({text: 'Passwords do not match', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                ub.funcs.submitChangePasswordPOST();
                return false;

            });

        @else

            window.ub.user = false;
            $('.register').on('click', function(){

                var captcha_response = $('.g-recaptcha-response').val();

                if (captcha_response.length == 0) {
                    $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                    return false;
                }

                if($('input#password').val() !== $('input#retype-password').val()){

                   $.smkAlert({text: 'Passwords do not match', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                return true;

            });

            $('button#forgot-password-submit').on('click', function() {

                var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                if(!email_regex.test($('input#forgot-password-email').val())) {

                   $.smkAlert({text: 'Enter a valid email', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                if($('input#forgot-password-email').val() === ""){
                   //alert('Password do not match');
                   $.smkAlert({text: 'Enter a valid email', type:'warning', permanent: false, time: 5, marginTop: '90px'});

                   return false;
                }

                var captcha_response = $('.g-recaptcha-response').val();
                if (captcha_response.length == 0) {
                    $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                    return false;
                }

                ub.funcs.forgotPasswordPOST();
                return false;

            });

            $('button#reset-password-submit').on('click', function() {

                if($('input#rpassword').val() === ""){

                   $.smkAlert({text: 'Password cant be blank', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                if($('input#rpassword').val() !== $('input#rconfirmpassword').val()){

                   $.smkAlert({text: 'Passwords do not match', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                ub.funcs.submitForgotPasswordPOST();
                return false;

            });

          

        @endif

        @if (Session::has('message'))

            $.smkAlert({text: "{{ Session::get('message') }}", type: 'info', permanent: false, time: 5, marginTop: '90px'});

        @endif

        window.ub.page = "{{ isset($page) ? $page : 'builder' }}";

        // #load_order
        var s = "{{ $builder_customizations }}";

        if(s.length > 0) {

            window.ub.temp = s;

            $('#genPDF').on('click', function () {
             
                var doc = new jsPDF();
                var image = $('div.ub_qrcode > canvas').get(0).toDataURL("image/png", 1.0);
                var front_view = ub.getThumbnailImage('front_view');

                doc.setFontSize(40);
                doc.addImage(image, 'png', 20, 40, 40, 40);
                doc.text(20, 20, "Prolook UB");
                doc.save('qrcode.pdf');

            });
            
            $('div.ub_qrcode').qrcode({
                "size": 100,
                "color": "#3a3",
                "text": window.location.href,
            });

        }
        else {

            window.ub.temp = undefined;
            
        }    

        // end #load_order

    });

</script>

<script src="{{$asset_storage}}/uniform-builder/js/utilities.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-configuration.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-data.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-process.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-applications.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-plugins.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-transformers.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-settings.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-ui.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-team-colors.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-history.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-debug-tools.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder-qa-tools.js{{$asset_version}}"></script>

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

</body>

<!-- /// Old Analytics --- Remove This -->
<script>

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75629672-2', 'auto');
  ga('send', 'pageview');

</script>

<!-- /// New Analytics -->
<script>

     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

     ga('create', 'UA-3860127-1', 'auto');
     ga('send', 'pageview');

</script>

<script type="text/javascript">
window.__lc = window.__lc || {};
window.__lc.license = 7737151;
(function() {
 var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
 lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
</script>


</html>