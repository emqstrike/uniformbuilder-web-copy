<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Administration | {{ env('APP_TITLE') }}</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" href="/dist/css/AdminLTE.min.css">
<link rel="stylesheet" href="/dist/css/skins/_all-skins.min.css">
<link rel="stylesheet" href="/plugins/iCheck/flat/blue.css">
<link rel="stylesheet" href="/plugins/morris/morris.css">
<link rel="stylesheet" href="/plugins/jvectormap/jquery-jvectormap-1.2.2.css">
<link rel="stylesheet" href="/plugins/datepicker/datepicker3.css">
<link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker-bs3.css">
<link rel="stylesheet" href="/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
<link rel="stylesheet" type="text/css" href="/js/libs/pnotify/pnotify.css">
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/pnotify/pnotify.custom.min.css">
<link rel="stylesheet" type="text/css" href="/css/jquery-confirm.css">
<link rel="stylesheet" type="text/css" href="/css/introjs.css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- fabric js -->
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>

<!-- mustache -->
<script src="//cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.js"></script>

<!-- webFontLoader -->
<script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>

<link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">

<style type="text/css">
/*intro css*/
.introTrigger{
    font-size: 31px;
    padding: 10px;
}
.introStart{
    display: none;
}
</style>


@yield('styles')
</head>
<body class="hold-transition skin-black-light sidebar-mini sidebar-collapse">
<div id="application-container"> <!-- test -->
<div class="wrapper">

    <header class="main-header">
        <a href="#" class="logo">
            <span class="logo-mini">
                <img src="{{ env('LOGO_URL') }}" height='20em'>
            </span>
            <span class="logo-lg">
                <img src="{{ env('LOGO_URL') }}" height='35em'>
            </span>
        </a>

        <nav class="navbar navbar-static-top" role="navigation">
            <a href="#" data-step="1" class="sidebar-toggle"   data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>

            </a>
            <!-- <i class="glyphicon glyphicon-question-sign introTrigger" aria-hidden="true"></i> -->

        <!-- <a class="btn btn-large btn-success introStart"   >Show me how</a> -->

            <div class="navbar-custom-menu" >
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="https://s3-us-west-2.amazonaws.com/prolook/images/user-c.png" class="user-image" alt="User Image">
                            <span class="hidden-xs">
                                @if (Session::get('fullname'))
                                {{ Session::get('fullname') }}
                                @endif
                            </span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-header">
                                <img src="https://s3-us-west-2.amazonaws.com/prolook/images/user-c.png" class="img-circle" alt="User Image">
                                <p>
                                    @if (Session::get('fullname'))
                                    {{ Session::get('fullname') }}
                                    @endif
                                </p>
                            </li>

                            <li class="user-body">
                                <a href="/administration/messages"><i class="fa fa-envelope"></i>Messages</a>
                            </li>

                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="/administration/account_settings/{{ Session::get('userId') }}" class="btn btn-default btn-flat">Profile</a>
                                </div>
                                <div class="pull-right">
                                    <a href="/administration/logout" class="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <aside class="main-sidebar">
        <section class="sidebar">
          @if (Session::get('adminFullAccess'))
            @include('administration.lte-side-menu')
          @endif
        </section>
    </aside>

    <div class="content-wrapper">
        <section class="content-header">
            @yield('header-content')
        </section>

        <section class="content">
            @yield('content')
        </section>
    </div>

    <footer class="main-footer">
        <strong>Copyright &copy; {{ date('Y') }} {{ env('WEBSITE_NAME') }}.</strong> All rights reserved.
    </footer>

</div>
</div> <!-- test -->

<style type="text/css">
    @yield('custom-styles')
</style>

<!-- Scripts -->
@if (Session::get('accessToken'))
<script type="text/javascript">

    window.headerValue = "{{ base64_encode(Session::get('accessToken')) }}";
    window.api_host = "{{ env('API_HOST') }}";
    window.endpoint_version = "{{ env('ENDPOINT_VERSION') }}";
    window.brand = "{{ env('brand') }}";
    window.qx7_host = "{{ env('QX7_HOST') }}";
    @if (Session::get('isLoggedIn'))
    window.loggedInUser = {{ Session::get('userId') }};
    @endif

</script>
@endif

<script src="/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="/plugins/morris/morris.min.js"></script>
<script src="/plugins/sparkline/jquery.sparkline.min.js"></script>
<script src="/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<script src="/plugins/knob/jquery.knob.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
<script src="/plugins/daterangepicker/daterangepicker.js"></script>
<script src="/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<script src="/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="/plugins/fastclick/fastclick.min.js"></script>
<script type="text/javascript" src="/js/libs/pnotify/pnotify.js"></script>
<!-- <script src="/dist/js/app.min.js"></script> -->
<script src="/dist/js/app.js"></script>
<script src="/js/administration/jquery-confirm.js"></script>
<script src="/intro-js/intro.min.js"></script>

<script src="https://unpkg.com/vue-multiselect@2.1.0"></script>
<script src="/js/libs/axios.js"></script>
<script src="/js/libs/axios-global-config.js"></script>
<script src="https://unpkg.com/vue@2.5.18/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@1.5.14/dist/vuetify.min.js"></script>

@yield('scripts')
@yield('custom-scripts')

     <script>

      $(function(){
        setTimeout(function() {
            $('.alert').alert('close');
        }, 2000);

        $(".introTrigger").click(function() {

            $(".sidebar-toggle").trigger("click");

        });
        $(".sidebar-toggle").click(function(){
            setTimeout(function () {
                jQuery(".introStart").trigger("click");
            }, 1000);

        });

    $(".introStart").click(function() {



            introJs().oncomplete(function(targetElement) {

              console.log('complete');
            }).onexit(function(targetElement) {
              console.log('exit');
            }).onchange(function(targetElement) {
              console.log('change');
            }).onbeforechange(function(targetElement) {


          switch($(targetElement).attr("data-step")) {
            case "2":

              break;
            case "3":
                $(".treeview a").trigger("click");
            //     setTimeout(function () {
            //     jQuery(".introStart").trigger("click");
            // }, 1000);
              break;
            case "4":

              break;
            case "5":

              break;
          }
        }).start();
          });
 });
    </script>
    <script>
      $("#flexi_form_start").click(function() {

        introJs().onbeforechange(function(targetElement) {


          switch($(targetElement).attr("data-step")) {
            case "2":
          $( ".sidebar-toggle" ).trigger('click');


              break;
            case "3":
              $("input").addClass("error");
              $(targetElement).show();
              break;
            case "4":
              $(".left").css("float", "none");
              $(targetElement).show();
              break;
            case "5":
              $(".right").show();
              $(targetElement).show();
              break;
          }
        }).start();
      });
    </script>
    <script type="text/javascript">
    // var adult_sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
    // var youth_sizes = ['YS','YM','YL','YXL','Y2XL','Y3XL'];
    // sizesLoop(adult_sizes,".adultSizes");
    // sizesLoop(youth_sizes,".youthSizes");
    // updateObjectSizes();

    // function sizesLoop(sizes,cl){
    //   for (var item of sizes) {
    //    $(cl).append("<input type='checkbox' value="+ item +"> : "+item + "<br>");
    //   }
    // }

    // var sizes = {};
    // var adult_sizes = [];
    // var youth_sizes = [];
    // if($("input[name='sizes']").val()){
    //   sizes = $("input[name='sizes']").val();
    //   sizes = JSON.parse(sizes);
    //   adult_sizes = sizes.adult;
    //   youth_sizes = sizes.youth;
    // }
    // $('.adultSizes input').on('click', function(){

    //   createObjectAdultYouthSizes(this,adult_sizes);

    // });
    // $('.youthSizes input').on('click', function(){
    //   createObjectAdultYouthSizes(this,youth_sizes);
    // });
    // function createObjectAdultYouthSizes(th,size){
    //   var value = $(th).val();
    //   if($(th).is(':checked')){
    //       size.push(value);
    //       console.log(value);
    //   }else{
    //       size.splice( $.inArray(value,size) ,1 );

    //   }
    //   sizes = {"adult": adult_sizes,"youth": youth_sizes};
    //   sizes = JSON.stringify(sizes);
    //   $("input[name='sizes']").val(sizes);

    // }
    // function updateObjectSizes(){

    //   if($("input[name='sizes']").val()){
    //      var sizes = $("input[name='sizes']").val();
    //       sizes = JSON.parse(sizes);

    //         $.each( sizes, function( key, value ) {
    //           for (var item of value) {

    //             $('.'+key+'Sizes :input[value='+ item +']').attr( "checked", true );
    //           }
    //         });
    //   }
    // }



    </script>
  </body>
</html>
