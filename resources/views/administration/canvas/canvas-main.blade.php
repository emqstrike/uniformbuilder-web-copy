<!DOCTYPE html>
<html>

<head>

    <title>{{ $page_title }}</title>

    <meta http-equiv="Access-Control-Allow-Origin" content="*"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="{{$asset_storage}}/canvas/internal/images/fav-ico.png" />
    <link href='https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <!-- Third Party Stylesheets -->

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

    <!-- End Third Party Stylesheets -->
    
    <!-- Builder Main Stylesheets -->
        
        <link rel="stylesheet" href="{{$asset_storage}}/canvas/internal/css/canvas.css?v={{$asset_version}}">

    <!-- End Builder Main Stylesheets -->    

</head>

<body>

    <div class="container-fluid">

        @include('administration.canvas.partials.nav')

    </div>

    <div id="prolook_canvas_container" class="container">

        <div class="row">
            
            <div class="col-md-8">

                @yield('contentarea')

            </div>

            <div class="col-md-4">

                @yield('modifiers')

            </div>

        </div>

        <!-- Material Preview / Editor -->

        @include('administration.canvas.partials.material_editor')

        <!-- End Material Preview / Editor -->
        
    </div>


    <!-- Third Party Scripts -->

        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="{{$asset_storage}}/canvas/third-party/threejs/three.js?v={{$asset_version}}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.min.js"></script>
        <script src="{{$asset_storage}}/canvas/third-party/dropzone/dropzone.js?v={{$asset_version}}"></script>
        <script src="{{$asset_storage}}/canvas/third-party/fabric-orbitcontrols/orbitcontrols.js?v={{$asset_version}}"></script>

    <!-- End Third Party Scripts -->


    <!-- Builder Main Scripts -->
    
        <script src="{{$asset_storage}}/canvas/internal/js/utilities.js?v={{$asset_version}}"></script>
        <script src="{{$asset_storage}}/canvas/internal/js/prolook_builder_and_canvas.js?v={{$asset_version}}"></script>
        <script src="{{$asset_storage}}/canvas/internal/js/canvas.js?v={{$asset_version}}"></script>

    <!-- End Builder Main Scripts -->

</body>

</html>