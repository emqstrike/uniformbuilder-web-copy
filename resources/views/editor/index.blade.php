@extends('main-container')
 

@section('contentarea')

	<div id="mycanvas" class="mycanvas">
		
	</div>
	
@endsection('contentarea')



@section('properties')

	<div class="sidebar-panel">

		<h3>
			
			Base Color

		</h3>	

					
		<button onclick="change_color('shirt','0x8c2332')">Cardinal</button>

		<button onclick="change_color('shirt','0xf36c24')">Orange</button>
			
		<button onclick="change_color('shirt','0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Materials

		</h3>	

					
		<button onclick="change_material('shirt', '1')">Material 1</button>

		<button onclick="change_material('shirt', '2')">Material 2</button>
			
		<button onclick="change_material('shirt','3')">Material 3</button>

	</div>


		<div class="sidebar-panel">

		<h3>
			
			Piping Color

		</h3>	
					
		<button onclick="change_color('piping','s0x8c2332')">Cardinal</button>

		<button onclick="change_color('piping','0xf36c24')">Orange</button>
			
		<button onclick="change_color('piping','0x1d5732')">Forest Green</button>

	</div>

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