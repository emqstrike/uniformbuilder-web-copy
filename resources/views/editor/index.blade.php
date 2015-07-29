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
		
		<button onclick="change_color('shirt','0xffffff')">White</button>

		<button onclick="change_color('shirt','0x8c2332')">Cardinal</button>

		<button onclick="change_color('shirt','0xf36c24')">Orange</button>
			
		<button onclick="change_color('shirt','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Mid Piping - Color

		</h3>	

		<button onclick="change_color('shirt_mid_piping','0xffffff')">White</button>

		<button onclick="change_color('shirt_mid_piping','0x000000')">Black</button>
					
		<button onclick="change_color('shirt_mid_piping','0x8c2332')">Cardinal</button>

		<button onclick="change_color('shirt_mid_piping','0xf36c24')">Orange</button>
			
		<button onclick="change_color('shirt_mid_piping','0x1d5732')">Forest Green</button>

	</div>

	<hr />

	<div class="sidebar-panel">

		<h3>
			
			Sleeve - Color

		</h3>	

		<button onclick="change_color('sleeve','0xffffff')">White</button>

		<button onclick="change_color('sleeve','0x000000')">Black</button>
					
		<button onclick="change_color('sleeve','0x8c2332')">Cardinal</button>

		<button onclick="change_color('sleeve','0xf36c24')">Orange</button>
			
		<button onclick="change_color('sleeve','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Piping - Color

		</h3>	
		
		<button onclick="change_color('sleeve_piping','0xffffff')">White</button>

		<button onclick="change_color('sleeve_piping','0x000000')">Black</button>

		<button onclick="change_color('sleeve_piping','0x8c2332')">Cardinal</button>

		<button onclick="change_color('sleeve_piping','0xf36c24')">Orange</button>
			
		<button onclick="change_color('sleeve_piping','0x1d5732')">Forest Green</button>

	</div>

	<hr />
	<div class="sidebar-panel">

		<h3>
			
			Pants Color

		</h3>	

		<button onclick="change_color('pants','0xffffff')">White</button>

		<button onclick="change_color('pants','0x000000')">Black</button>
				
		<button onclick="change_color('pants','0x4f4f4f')">Charcoal Gray</button>

		<button onclick="change_color('pants','0x8a8c8c')">Gray</button>
		
	</div>

	<div class="sidebar-panel">

		<h3>
			
			Piping Color

		</h3>	

		<button onclick="change_color('pants_piping','0xffffff')">White</button>

		<button onclick="change_color('pants_piping','0x000000')">Black</button>
					
		<button onclick="change_color('pants_piping','0x8c2332')">Cardinal</button>

		<button onclick="change_color('pants_piping','0xf36c24')">Orange</button>
			
		<button onclick="change_color('pants_piping','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Belt Color

		</h3>	
					
		<button onclick="change_color('belt','0x4f4f4f')">Charcoal Gray</button>

		<button onclick="change_color('belt','0x8a8c8c')">Gray</button>
			
		<button onclick="change_color('belt','0x000000')">Black</button>

	</div>

	<hr />

	<div class="sidebar-panel">

		<h3>
			
			Cloth Material

		</h3>	
					
		<!-- 

		<button onclick="change_material('shirt_textured', '6')">Material 1</button>

		<button onclick="change_material('shirt_textured', '5')">Material 2</button>

		-->
		
		<button onclick="change_material('shirt','7')">Plain</button>
		<button onclick="change_material('shirt','3')">Camo</button>
		<button onclick="change_material('shirt','8')">Stripes</button>
		<button onclick="change_material('shirt_textured','9')">Test Wrinkle</button>
		

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
	</span>



@endsection('properties')


@section('custom-scripts')



@endsection('custom-scripts')



@section('custom-styles')

	
	.mycanvas {  height: 100%; width: 100%; }

	canvas {
		width: 100%;
		height: 100%;
	}


@endsection('custom-styles')