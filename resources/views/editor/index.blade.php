@extends('main-container')
 

@section('contentarea')

	<div id="mycanvas" class="mycanvas">
		
	</div>
	
@endsection('contentarea')



@section('properties')

	<div class="sidebar-panel">

		<h3>
			
			Shirt Color

		</h3>	
					
		<button onclick="change_color('shirt','0x8c2332')">Cardinal</button>

		<button onclick="change_color('shirt','0xf36c24')">Orange</button>
			
		<button onclick="change_color('shirt','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Panels - Top Color

		</h3>	
					
		<button onclick="change_color('panels_top','0x8c2332')">Cardinal</button>

		<button onclick="change_color('panels_top','0xf36c24')">Orange</button>
			
		<button onclick="change_color('panels_top','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Panels - Side Color

		</h3>	
					
		<button onclick="change_color('panels_side','0x8c2332')">Cardinal</button>

		<button onclick="change_color('panels_side','0xf36c24')">Orange</button>
			
		<button onclick="change_color('panels_side','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Belt Color

		</h3>	
					
		<button onclick="change_color('belt','0x4f4f4f')">Charcoal Gray</button>

		<button onclick="change_color('belt','0x8a8c8c')">Gray</button>
			
		<button onclick="change_color('belt','0x000000')">Black</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Pants Color

		</h3>	
					
		<button onclick="change_color('pants','0x8c2332')">Cardinal</button>

		<button onclick="change_color('pants','0x4f4f4f')">Charcoal Gray</button>

		<button onclick="change_color('pants','0x8a8c8c')">Gray</button>
		
	</div>

	<div class="sidebar-panel">

		<h3>
			
			Pants Piping Color

		</h3>	
					
		<button onclick="change_color('pants_piping','0x8c2332')">Cardinal</button>

		<button onclick="change_color('pants_piping','0xf36c24')">Orange</button>
			
		<button onclick="change_color('pants_piping','0x1d5732')">Forest Green</button>

	</div>

	<hr />


	<!-- 
	<div class="sidebar-panel">

		<h3>
			
			Shirt Material

		</h3>	
					
		<button onclick="change_material('shirt', '1')">Material 1</button>

		<button onclick="change_material('shirt', '2')">Material 2</button>
			
		<button onclick="change_material('shirt','4')">Material 3</button>

	</div>

	-->

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