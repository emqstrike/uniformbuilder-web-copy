@extends('main-container')
 
@section('contentarea')
	
		<div class="camera_buttons" style="position: absolute; top: 25px; left: 25px;">
			
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm" onclick="reset_camera();toggle_free_rotate()"><i class="fa fa-arrows"></i></button>	
			<button class="btn-white btn btn-default btn-sm" onclick="reset_camera()"><i class="fa fa-camera"></i>
</button>	
		</div>

		<div id="mycanvas" class="mycanvas"></div>
	
@endsection('contentarea')

@section('properties')
	<div class="col-xs-3" style="height: 100%;">

        <ul class="nav nav-tabs tabs-left">

        <li role="presentation" class="active"><a href="#shirt" aria-controls="shirt" role="tab" data-toggle="tab">Shirt</a></li>
        <li role="presentation"><a href="#pants" aria-controls="pants" role="tab" data-toggle="tab">Pants</a></li>
        <li role="presentation"><a href="#pipings" aria-controls="pants" role="tab" data-toggle="tab">Pipings</a></li>

        </ul>

    </div>

    <div class="col-xs-9">

        <div class="tab-content">

		    <div role="tabpanel" class="tab-pane active" id="shirt">
		    	<div class="panel-group">
				    <div class="panel panel-default" id="panel1">
				        <div class="panel-heading">
				            <h4 class="panel-title">
						        <a data-toggle="collapse" data-target="#shirtColor" href="#shirtColor">
						          	base color
						        </a>
						    </h4>

				        </div>
				        <div id="shirtColor" class="panel-collapse collapse in">
				            <div class="panel-body">
									@forelse ($colors as $color)
										<button class='btn change-color' data-target='shirt' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
									@empty

									@endforelse
				            </div>
				        </div>
				    </div>
				</div>

		    </div>

		    <div role="tabpanel" class="tab-pane fade" id="pants">
		    	<div class="panel panel-default" id="panel1">
			    	<div class="panel-heading">
			            <h4 class="panel-title">
					        <a data-toggle="collapse" data-target="#pantsColor" href="#pantsColor">
					          	base color
					        </a>
					    </h4>

			        </div>
			        <div id="pantsColor" class="panel-collapse collapse in">
			            <div class="panel-body">
								@forelse ($colors as $color)
									<button class='btn change-color' data-target='pants' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
								@empty

								@endforelse
			            </div>
			        </div>
			    </div>
		    </div>

		    <div role="tabpanel" class="tab-pane fade" id="pipings">
		    	<div class="panel panel-default" id="panel1">
			    	<div class="panel-heading">
			            <h4 class="panel-title">
					        <a data-toggle="collapse" data-target="#shirtMidPipeColor" href="#shirtMidPipeColor">
					          	Middle piping
					        </a>
					    </h4>

			        </div>
			        <div id="shirtMidPipeColor" class="panel-collapse collapse in">
			            <div class="panel-body">
								@forelse ($colors as $color)
									<button class='btn change-color' data-target='panels_top' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
								@empty

								@endforelse
			            </div>
			        </div>
			    </div>
		    </div>
  		</div>

    </div>
	<div class="sidebar-panel">

		<h3>Pants Material</h3>
		@forelse ($materials as $material)
			<img src="{{ $material->material_path }}" width="70px" height="70px" class="change-material" data-target='pants' data-material="{{ $material->material_path }}" data-bump-map="{{ $material->bump_map_path }}" data-toggle="tooltip" data-placement="bottom" title="{{ $material->name }}">
		@empty

		@endforelse

		<h3>shirt Material</h3>
		@forelse ($materials as $material)
			<img src="{{ $material->material_path }}" width="70px" height="70px" class="change-material" data-target='shirt' data-material="{{ $material->material_path }}" data-bump-map="{{ $material->bump_map_path }}" data-toggle="tooltip" data-placement="bottom" title="{{ $material->name }}">
		@empty

		@endforelse

		<h3>shirt Material</h3>
		@forelse ($materials as $material)
			<img src="{{ $material->material_path }}" width="70px" height="70px" class="change-material" data-target='shirt_textured' data-material="{{ $material->material_path }}" data-bump-map="{{ $material->bump_map_path }}" data-toggle="tooltip" data-placement="bottom" title="{{ $material->name }}">
		@empty

		@endforelse
		<!-- 
		<button onclick="change_material('shirt','7')">Plain</button>
		<button onclick="change_material('shirt','3')">Camo</button>
		<button onclick="change_material('shirt','8')">Stripes</button>
		<button onclick="change_material('shirt_textured','9')">Test Wrinkle</button>
	

	</div>


	<div class="sidebar-panel">

		<h3>
			
			Pants Material

		</h3>	
					


		<button onclick="change_material('shirt_textured', '6')">Material 1</button>

		<button onclick="change_material('shirt_textured', '5')">Material 2</button>

		
		
		<button onclick="change_material('pants','7')">Plain</button>
		<button onclick="change_material('pants','3')">Camo</button>
		

	</div>

	<hr />

	<span id="vertex_shh" style="color: white;">
		varying vec2 vUv;

		void main()
		{
		    vUv = uv;
		    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		    gl_Position = projectionMatrix * mvPosition;
		}
	</span>
	<span id="fragment_shh" style="color: white;">
		#ifdef GL_ES
		precision highp float;
		#endif

		uniform sampler2D tOne;
		uniform sampler2D tSec;

		varying vec2 vUv;

		void main(void)
		{
		    vec3 c;
		    vec4 Ca = texture2D(tOne, vUv);
		    vec4 Cb = texture2D(tSec, vUv);
		    c = Ca.rgb * Ca.a + Cb.rgb * Cb.a * (1.0 - Ca.a);  // blending equation
		    gl_FragColor= vec4(c, 1.0);
		}
	</span>-->
	</div> 


@endsection('properties')

@section('custom-styles')
	body, h1, h2, h3, h4, h5, h6, button, a, p {
		font-family: raleway;
		font-weight: bold;
	}
	a{
		color: #000;
		outline: 0;
	}
	a:hover{
		color: #000;
		-webkit-transform: scale(1.2);
	  	-moz-transform: scale(1.2);
	  	-o-transform: scale(1.2);
	  	transform: scale(1.2);
	}
	a:active{
		outline: 0;
	}
	.mycanvas {  height: 100%; width: 100%; }
	canvas {
		width: 100%;
		height: 100%;
	}
	.btn .change-color{
		height: 10px;
		width: 10px;
		padding: 40px;
		margin: 10px;
	}
	a{
		-webkit-transition: all 0.2s ease-out;
	  	-moz-transition: all 0.2s ease-out;
	  	-o-transition: all 0.2s ease-out;
	  	transition: all 0.2s ease-out;
	}
	.tab-pane{
		margin-left: -30px;
		right: 0;
	}
@endsection('custom-styles'
)
@section('additional-scripts')
	<script src="{{$asset_storage}}/threejs/three.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/main.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/orbitcontrols.js{{$asset_version}}"></script>
@endsection

@section('custom-scripts')
	$(document).ready(function(){
	var default_color = "0x000";
	var selected_item;
	var color;
		// Enable Objects tooltips
		$('[data-toggle="tooltip"]').tooltip();

		// Change Color
		$('.change-color').on('mouseover', function(){
			var target = $(this).data('target');
			color = $(this).data('color');
			change_color(target, color);
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
