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
<link rel="stylesheet" href="{{$asset_storage}}/frontend-bootstrap/css/bootstrap.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/jquery-ui/jquery-ui.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder.css{{$asset_version}}">
</head>

<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header" id="navbar-header">
            <a class="navbar-brand" href="#"><img src="/images/branding/brand.png" height="50"></a>
        </div>
        <h1 class="text-center" id="header_text">{{ $app_title }}</h1>
    </div>
</nav>

<div id="main_container" class="container">
    <div id="main-row" class="row">
        <div id="left-pane-column" class="col-md-12">
            <!-- Main Preview Window -->
            @yield('left-pane')
        </div>
        <div id="right-pane-column" class="col-md-12">
            <!-- Customizer -->
            @yield('right-pane')
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            You might also like:
        </div>
        <div class="suggestions"></div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <br /><br /><br />
            <button id="btnDebugPanel">Debug Panel: Mixing Canvas</button>
        </div>
    </div>

    <div class="row">


                <!-- Material Mixing Canvas -->
                    
                    <hr />

                    <div class="col-md-6 col-md-offset-3">
              
                    <div id="mixing-canvas">

                            <div class="canvas-container">

                                <em>Top Layer</em><br />
                                <canvas class="canvas-views" id="top_layer" width="447" height="496">
                                
                                </canvas>

                            </div>
                            
                            <div class="canvas-container">

                                <em>Bottom Layer</em><br />
                                <canvas class="canvas-views" id="bottom_layer" width="447" height="496">

                                </canvas>

                            </div>

                            <div class="canvas-container">
                                <em>Pattern Layer</em><br />
                                <canvas class="canvas-views" id="pattern_layer" width="447" height="496">

                                </canvas>

                            </div>

                            <div class="center-block canvas-container">

                                <em>Destination Layer</em><br />
                                <canvas class="canvas-views" id="destination_layer" width="447" height="496">

                                </canvas>

                            </div>

                    </div>    

                </div>


                <!-- End Material Mixing Canvas -->
    </div>
</div>


<!-- Third Party Scripts -->
<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/jquery-ui/jquery-ui.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/underscore/underscore-min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/frontend-bootstrap/js/bootstrap.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/fabricjs/fabric.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/dropzone/dropzone.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/pixi/pixi.js{{$asset_version}}"></script>
<!-- End Third Party Scripts -->

<!-- Uniform Builder Scripts -->
<script type="text/javascript">
$( document ).ready( function () {
    window.ub = {};
    window.ub.objects = {};
    window.ub.config = {
        api_host: "http://{{ env('API_HOST') }}",
        material_id: {{ $material_id }},
        category_id: {{ $category_id }}
    }
});
</script>
<script src="{{$asset_storage}}/uniform-builder/js/utilities.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/uniform-builder.js{{$asset_version}}"></script>
<!-- End Uniform Builder Scripts -->
</body>
</html>