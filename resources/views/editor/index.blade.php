@extends('main-container')
		

		<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <h1 class="text-center">PRO LOOK UNIFORM BUILDER</h1>
		    <div class="navbar-header">
		      <a class="navbar-brand" href="#"><img src="/images/branding//brand.jpg"></a>
		    </div>
		</nav>

		<div class="row"></div>

		<!-- <div class="row" style="border: 1px solid black"> -->
		<div style="display: block;">
			<button class="btn-block"><i class="fa fa-plus"></i></button>
			<button class="btn-block"><i class="fa fa-folder"></i></button>
			<button class="btn-block"><i class="fa fa-copy"></i></button>
			<button class="btn-block"><i class="fa fa-save"></i></button>
		</div>
		
		<div class="row" style="height: 600px;">

			<div class="panel panel-default col-md-5 col-md-offset-1" style="width: 480px; box-shadow: none;"> </br >
				<button class="btn btn-default">Jersey</button>
				<button class="btn btn-default">Pants</button>
				<button class="btn btn-default">All</button>
				<div id="mycanvas" class="mycanvas" style="padding-top: -20px;"></div>
		        <div class="camera_buttons" style="position: absolute; bottom: 20px; left: 135px;">
		
					<button id="btn_free_form" class="btn-white btn btn-default btn-sm" onclick="reset_camera();toggle_free_rotate()"><i class="fa fa-refresh"></i></button>	
					<button class="btn-white btn btn-default btn-sm" onclick="reset_camera()"><i class="fa fa-history"></i>
					</button>	

					<button class="btn btn-default btn-sm" id="play_left"><i class="fa fa-chevron-left"></i><i class="fa fa-chevron-left"></i></button>
					<button class="btn btn-default btn-sm" id="rotate_left"><i class="fa fa-chevron-left"></i></button>
					<button class="btn btn-default btn-sm" id="rotate_right"><i class="fa fa-chevron-right"></i></button>
					<button class="btn btn-default btn-sm" id="play_right"><i class="fa fa-chevron-right"></i><i class="fa fa-chevron-right"></i></button>

				</div>

			</div>

			<div class="panel panel-default col-md-5 col-md-offset-1">
				<div class="panel-body">
			        <div class="btn-group btn-breadcrumb">
			            <a href="#" class="btn btn-default">Materials</a>
			            <a href="#" class="btn btn-default">Colors</a>
			            <a href="#" class="btn btn-default">Gradient</a>
			            <a href="#" class="btn btn-default">Pattern</a>
			            <a href="#" class="btn btn-default">Text</a>
			            <a href="#" class="btn btn-default">Number</a>
			        </div>
				</div>
			</div>


		</div>

		<div class="row">

			<div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
			<div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>

		</div>

		<div class="row">

		  	<div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>

		</div>

@section('contentarea')


		<!-- <div id="mycanvas" class="mycanvas"></div> -->
		

	
@endsection('contentarea')

@section('properties')



@endsection('properties')

@section('custom-styles')

	body, h1, h2, h3, h4, h5, h6, button, a, p {

		font-family: raleway;

	}



	.navbar img {

		width: 90px;
		height: 50px;
		margin-top: -70px;

	}



	.navbar {

		height: 90px;

	}



	a {

		color: #000;
		outline: 0;

	}



	a:hover {  color: #000;  }

	a:active {  outline: 0;  }

	.mycanvas {  height: 75%; width: 100%;  }
	


	a {
		-webkit-transition: all 0.2s ease-out;
	  	-moz-transition: all 0.2s ease-out;
	  	-o-transition: all 0.2s ease-out;
	  	transition: all 0.2s ease-out;
	}



	.btn .change-color {

		height: 10px;
		width: 10px;
		padding: 40px;
		margin: 10px;

	}



	.btn-tab {  width: 100%;  }

	.btn {  border-radius: 0;  }

	.btn:hover {

		/*-webkit-transform: scale(1.2);
	  	-moz-transform: scale(1.2);
	  	-o-transform: scale(1.2);
	  	transform: scale(1.2);*/

	}

	/** The Magic **/
		.btn-breadcrumb{
			font-size: 11px !important;
		}

		.btn-breadcrumb .btn:not(:last-child):after {
		  content: " ";
		  display: block;
		  width: 0;
		  height: 0;
		  border-top: 17px solid transparent;
		  border-bottom: 17px solid transparent;
		  border-left: 10px solid white;
		  position: absolute;
		  top: 50%;
		  margin-top: -17px;
		  left: 100%;
		  z-index: 3;
		}
		.btn-breadcrumb .btn:not(:last-child):before {
		  content: " ";
		  display: block;
		  width: 0;
		  height: 0;
		  border-top: 17px solid transparent;
		  border-bottom: 17px solid transparent;
		  border-left: 10px solid rgb(173, 173, 173);
		  position: absolute;
		  top: 50%;
		  margin-top: -17px;
		  margin-left: 1px;
		  left: 100%;
		  z-index: 3;
		}


}

@endsection('custom-styles')

@section('additional-scripts')

	<script src="{{$asset_storage}}/threejs/three.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/main.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/texture_canvas.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/orbitcontrols.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/camera.js{{$asset_version}}"></script>

@endsection

@section('custom-scripts')

	function switch_panel(panel){

		$('.option_panel').hide();
		$(panel).fadeIn();

	}

	$(document).ready(function(){

		switch_panel('#shirt_panel');

		var default_color = "0x000";
		var selected_item;
		var color;
		// Enable Objects tooltips
		$('[data-toggle="tooltip"]').tooltip();

		// Change Color
		$('.change-color').on('click', function(){
			var target = $(this).data('target');
			color = $(this).data('color');
			// change_color(target, color);
			texture_canvas.change_color(target,color)
		});

		// Change Material
		$('.change-material').on('mouseover', function(){
			var target = $(this).data('target');
			var material = $(this).data('material');
			var bumpMap = $(this).data('bump-map');
			change_material(target, material, bumpMap);
			selected_item=target;
		});

		// Show tabs
		$('.preventDefault').click(function(e) {
		    e.preventDefault();
		    $(this).tab('show')
		});

		// Hover on tabs
		$('.nav a').on('mouseover', function(){
			var target = $(this).data('target');
			change_color(target, color);
		});

	});

@endsection('custom-scripts')
