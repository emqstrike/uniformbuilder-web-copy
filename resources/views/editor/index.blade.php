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

					
		<button onclick="change_color('0x8c2332')">Cardinal</button>

		<button onclick="change_color('0xf36c24')">Orange</button>
			
		<button onclick="change_color('0x1d5732')">Forest Green</button>

	</div>

	<div class="sidebar-panel">

		<h3>
			
			Materials

		</h3>	

					
		<button onclick="change_material('1')">Material 1</button>

		<button onclick="change_material('2')">Material 2</button>
			
		<button onclick="change_material('3')">Material 3</button>

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