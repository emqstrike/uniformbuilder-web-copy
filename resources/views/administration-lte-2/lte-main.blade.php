@inject('sampleMenu', 'App\Menus\V1Menu')

<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Administration | {{ env('APP_TITLE') }}</title>

<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet" href="/admin-lte-2/bootstrap/dist/css/bootstrap.min.css">
<!-- Datatables -->
<link rel="stylesheet" href="/admin-lte-2/datatables/css/dataTables.bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="/admin-lte-2/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="/admin-lte-2/Ionicons/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="/admin-lte-2/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="/admin-lte-2/dist/css/skins/_all-skins.min.css">
<!-- PNotify -->
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/pnotify/pnotify.custom.min.css">
<!-- Spectrum -->
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/spectrum/spectrum.css">
<!-- Select2 -->
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/select2/select2.min.css">

<link rel="stylesheet" href="/plugins/datepicker/datepicker3.css">
<link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker-bs3.css">

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

<!-- <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" href="/dist/css/AdminLTE.min.css">
<link rel="stylesheet" href="/dist/css/skins/_all-skins.min.css">
<link rel="stylesheet" href="/plugins/iCheck/flat/blue.css">
<link rel="stylesheet" href="/plugins/morris/morris.css">
<link rel="stylesheet" href="/plugins/jvectormap/jquery-jvectormap-1.2.2.css">
<link rel="stylesheet" href="/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
<link rel="stylesheet" type="text/css" href="/js/libs/pnotify/pnotify.css">
<link rel="stylesheet" type="text/css" href="/css/jquery-confirm.css">
<link rel="stylesheet" type="text/css" href="/css/introjs.css"> -->

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- fabric js -->
<!-- <script type="text/javascript" src="/fabricjs/fabric.min.js"></script> -->

<!-- mustache -->
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.js"></script> -->

<!-- webFontLoader -->
<!-- <script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script> -->

<!-- <style type="text/css">
.introTrigger{
    font-size: 31px;
    padding: 10px;

}
.introStart{
    display: none;
}
</style> -->

<style>
    #breadcrumbs {
        margin: 0 15px;
    }

    .breadcrumb {
        background: #ffffff;
    }

    .sidebar li.header {
        text-transform: uppercase;
    }
</style>

@yield('styles')
<style type="text/css">
    @yield('custom-styles')
</style>

</head>
<!-- <body class="hold-transition skin-black-light sidebar-mini sidebar-collapse"> -->
<body class="skin-black sidebar-mini sidebar-collapse">
<div class="wrapper">

    @include('administration-lte-2.lte-main-topbar')

    @include('administration-lte-2.lte-side-menu')
    <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Main content -->
    <section class="content">
        @include('administration-lte-2.partials.breadcrumb')
        @yield('content')
    </section>
    <!-- /.content -->
  </div>
</div>

<!-- Scripts -->
@if (Session::get('accessToken'))
<script type="text/javascript">

    window.headerValue = "{{ base64_encode(Session::get('accessToken')) }}";
    window.api_host = "{{ env('API_HOST') }}";
    window.customizer_host = "{{ env('CUSTOMIZER_HOST') }}";
    window.endpoint_version = "{{ env('ENDPOINT_VERSION') }}";
    @if (Session::get('isLoggedIn'))
    window.loggedInUser = {{ Session::get('userId') }};
    @endif

</script>
@endif

<!-- <script src="/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="/plugins/morris/morris.min.js"></script>
<script src="/plugins/sparkline/jquery.sparkline.min.js"></script>
<script src="/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<script src="/plugins/knob/jquery.knob.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
<script src="/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<script src="/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="/plugins/fastclick/fastclick.min.js"></script>
<script type="text/javascript" src="/js/libs/pnotify/pnotify.js"></script>
<script src="/dist/js/app.min.js"></script> -->

<!-- <script src="/dist/js/app.js"></script>
<script src="/js/administration/jquery-confirm.js"></script>
<script src="/intro-js/intro.min.js"></script> -->
<!-- jQuery 3 -->

<!-- <div class="control-sidebar-bg"></div>
</div> -->

<script type="text/javascript" src="/admin-lte-2/jquery/dist/jquery-3.3.1.min.js"></script>

<script type="text/javascript" src="/admin-lte-2/jquery-ui/dist/jquery-ui.min.js"></script>

<script type="text/javascript" src="/admin-lte-2/datatables/js/jquery.dataTables.min.js"></script>

<script type="text/javascript" src="/admin-lte-2/datatables/js/dataTables.bootstrap.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="/admin-lte-2/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="/admin-lte-2/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="/admin-lte-2/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="/admin-lte-2/dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<!-- <script src="/admin-lte-2/dist/js/demo.js"></script> -->
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<!-- PNotify -->
<script type="text/javascript" src="/admin-lte-2/js/libs/pnotify/pnotify.custom.min.js"></script>
<!-- Spectrum -->
<script type="text/javascript" src="/admin-lte-2/js/libs/spectrum/spectrum.js"></script>
<!-- Underscore -->
<script type="text/javascript" src="/admin-lte-2/js/libs/underscore/underscore-min.js"></script>
<!-- Select2 -->
<script type="text/javascript" src="/admin-lte-2/js/libs/select2/select2.min.js"></script>
<!-- Common -->
<script type="text/javascript" src="/js/administration/common.js"></script>
<!-- <script>
  // $(document).ready(function () {
  //   $('.sidebar-menu').tree()
  // })
</script> -->

<!-- <script src="/bootstrap/js/bootstrap.min.js"></script> -->
<script src="/plugins/daterangepicker/daterangepicker.js"></script>
<script src="/plugins/datepicker/bootstrap-datepicker.js"></script>

@yield('scripts')
@yield('custom-scripts')
     <!-- <script>
      $(function(){
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
    -->
  </body>
</html>
