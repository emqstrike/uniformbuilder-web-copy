@extends('main-container')
 

@section('contentarea')
	
		<div class="camera_buttons" style="position: absolute; top: 25px; left: 25px;">
			
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm" onclick="reset_camera();toggle_free_rotate()">Free Form</button>	
			<button class="btn-white btn btn-default btn-sm" onclick="reset_camera()">Reset Camera</button>	

		</div>

		<style type="text/css">



		</style>
	

	<div id="mycanvas" class="mycanvas">


		
	</div>
	
@endsection('contentarea')



@section('properties')

	<div class="sidebar-panel">

		<h3>
			
			Shirt Color

		</h3>
		@forelse ($colors as $color)
			<button class='btn change-color' data-target='shirt' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
		@empty

		@endforelse

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Panels - Top Color

		</h3>
		@forelse ($colors as $color)
			<button class='btn change-color' data-target='panels_top' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
		@empty

		@endforelse

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Panels - Side Color

		</h3>
		@forelse ($colors as $color)
			<button class='btn change-color' data-target='panels_side' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
		@empty

		@endforelse

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Belt Color

		</h3>
		@forelse ($colors as $color)
			<button class='btn change-color' data-target='belt' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
		@empty

		@endforelse

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Pants Color

		</h3>
		@forelse ($colors as $color)
			<button class='btn change-color' data-target='pants' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
		@empty

		@endforelse
		
	</div>

	<div class="sidebar-panel">

		<h3>
			
			Pants Piping Color

		</h3>
		@forelse ($colors as $color)
			<button class='btn change-color' data-target='pants_piping' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
		@empty

		@endforelse

	</div>

	<hr />

	<div class="sidebar-panel">

		<h3>
			
			Cloth Material

		</h3>
		<!-- Sample Loading of Textures -->
		@forelse ($textures as $texture)
			<p>
				{{ $texture->name }}
				<li>{{ $texture->texture_path }}</li>
				<li>{{ $texture->bump_map_path }}</li>
			</p>
		@empty

		@endforelse	

		<button onclick="change_material('shirt','7')">Plain</button>
		<button onclick="change_material('shirt','3')">Camo</button>
		<button onclick="change_material('shirt','8')">Stripes</button>
		

	</div>


	<div class="sidebar-panel">

		<h3>
			
			Pants Material

		</h3>	
					
		<!-- 

		<button onclick="change_material('shirt_textured', '6')">Material 1</button>

		<button onclick="change_material('shirt_textured', '5')">Material 2</button>

		-->
		
		<button onclick="change_material('pants','7')">Plain</button>
		<button onclick="change_material('pants','3')">Camo</button>
		

	</div>

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
	</span>

@endsection('properties')

@section('custom-styles')
	.mycanvas {  height: 100%; width: 100%; }
	canvas {
		width: 100%;
		height: 100%;
	}
	.change-color {
		padding-right: 20px;
		margin-right: 20px;
	}
@endsection('custom-styles')

@section('additional-scripts')
	<script src="{{$asset_storage}}/threejs/three.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/main.js{{$asset_version}}"></script>
	<script src="{{$asset_storage}}/js/orbitcontrols.js{{$asset_version}}"></script>
@endsection

@section('custom-scripts')
	$(document).ready(function(){
		// Enable Objects tooltips
		$('[data-toggle="tooltip"]').tooltip();

		// Do stuff here
		$('.change-color').on('mouseover', function(){
			var target = $(this).data('target');
			var color = $(this).data('color');
			change_color(target, color);
		});
	});
@endsection('custom-scripts')