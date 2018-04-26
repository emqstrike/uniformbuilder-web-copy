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
<!-- Font Awesome -->
<link rel="stylesheet" href="/admin-lte-2/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="/admin-lte-2/Ionicons/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="/admin-lte-2/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="/admin-lte-2/dist/css/skins/_all-skins.min.css">





<!-- <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
@yield('styles')
</head>
<!-- <body class="hold-transition skin-black-light sidebar-mini sidebar-collapse"> -->
<body class="hold-transition skin-black sidebar-mini">
<div class="wrapper">

    @include('administration-lte-2.lte-main-topbar')

    @include('administration-lte-2.lte-side-menu')

    <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <!-- <h1>
        Blank page
        <small>it all starts here</small>
      </h1> -->
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li class="active">Blank page</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

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
<script src="/dist/js/app.min.js"></script> -->

<!-- <script src="/dist/js/app.js"></script>
<script src="/js/administration/jquery-confirm.js"></script>
<script src="/intro-js/intro.min.js"></script> -->
<!-- jQuery 3 -->

<!-- <div class="control-sidebar-bg"></div>
</div> -->

<script src="/admin-lte-2/jquery/dist/jquery.min.js"></script>
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

<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>

<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script>
  // $(document).ready(function () {
  //   $('.sidebar-menu').tree()
  // })
</script>

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
    <script type="text/javascript">
    var adult_sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
    var youth_sizes = ['YS','YM','YL','YXL','Y2XL','Y3XL'];
    sizesLoop(adult_sizes,".adultSizes");
    sizesLoop(youth_sizes,".youthSizes");
    updateObjectSizes();

    function sizesLoop(sizes,cl){
      for (var item of sizes) {
       $(cl).append("<input type='checkbox' value="+ item +"> : "+item + "<br>");
      }
    }

    var sizes = {};
    var adult_sizes = [];
    var youth_sizes = [];
    if($("input[name='sizes']").val()){
      sizes = $("input[name='sizes']").val();
      sizes = JSON.parse(sizes);
      adult_sizes = sizes.adult;
      youth_sizes = sizes.youth;
    }
    $('.adultSizes input').on('click', function(){

      createObjectAdultYouthSizes(this,adult_sizes);

    });
    $('.youthSizes input').on('click', function(){
      createObjectAdultYouthSizes(this,youth_sizes);
    });
    function createObjectAdultYouthSizes(th,size){
      var value = $(th).val();
      if($(th).is(':checked')){
          size.push(value);
          console.log(value);
      }else{
          size.splice( $.inArray(value,size) ,1 );

      }
      sizes = {"adult": adult_sizes,"youth": youth_sizes};
      sizes = JSON.stringify(sizes);
      $("input[name='sizes']").val(sizes);

    }
    function updateObjectSizes(){

      if($("input[name='sizes']").val()){
         var sizes = $("input[name='sizes']").val();
          sizes = JSON.parse(sizes);

            $.each( sizes, function( key, value ) {
              for (var item of value) {

                $('.'+key+'Sizes :input[value='+ item +']').attr( "checked", true );
              }
            });
      }
    }

    </script> -->
  </body>
</html>
