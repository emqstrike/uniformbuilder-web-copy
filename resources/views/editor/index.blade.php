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
			
			Materials

		</h3>	

					
		<button onclick="change_material('shirt', '1')">Material 1</button>

		<button onclick="change_material('shirt', '2')">Material 2</button>
			
		<button onclick="change_material('shirt','4')">Material 3</button>

	</div>


		<div class="sidebar-panel">

		<h3>
			
			Piping Color

		</h3>	
					
		<button onclick="change_color('piping','s0x8c2332')">Cardinal</button>

		<button onclick="change_color('piping','0xf36c24')">Orange</button>
			
		<button onclick="change_color('piping','0x1d5732')">Forest Green</button>

		</div>

		<div class="sidebar-panel">

			<h3>
				
				Pants Color

			</h3>	
						
			<button onclick="change_color('pants','0x4f4f4f')">Charcoal Gray</button>

			<button onclick="change_color('pants','0x8a8c8c')">Gray</button>
				
			<button onclick="change_color('pants','0x000000')">Black</button>

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
				
				Buckle Color

			</h3>	
						
			<button onclick="change_color('buckle','0x4f4f4f')">Charcoal Gray</button>

			<button onclick="change_color('buckle','0x8a8c8c')">Gray</button>
				
			<button onclick="change_color('buckle','0x000000')">Black</button>

		</div>



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