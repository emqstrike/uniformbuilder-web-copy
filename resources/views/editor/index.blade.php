@extends('main-container')
 
@section('contentarea')
	
		<div class="camera_buttons" style="position: absolute; top: 25px; left: 25px;">
			
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm" onclick="reset_camera();toggle_free_rotate()">Camera Free Rotate Mode </button>	
			
			<button class="btn-white btn btn-default btn-sm" onclick="reset_camera()">Reset Camera</i>
			</button>	

		</div>

		<div id="model_view" style="position: absolute; top: 25px; left: 25px;">
			
			</br ></br >
	
		</div>

		<div id="mycanvas" class="mycanvas"></div>
		

	
@endsection('contentarea')

@section('properties')

	<div class="row">

		<div class="col-md-3">

		<hr />

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#shirt_panel')">
				Jersey
			</button>
		</div>

		<br />

		<!-- 

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab"  onclick="switch_panel('#sleeve_panel')">Sl</button>	
		</div>

		<br />

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#pants_panel')">Pn</button>
		</div>

		-->

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#pattern_panel')">Pattern</button>
		</div>

		<br />

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#pipings_panel')">Pipings</button>
		</div>

		<br />

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#logo_panel')">Logo</button>
		</div>

		<br />

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#numbers_panel')">#</button>
		</div>

		<br />

		<div class="tab_button">
			<button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#name_panel')">Name</button>
		</div>

		<br />


		<hr />	

		<div class="tab_button">
			<a href="#myModal" data-backdrop="false" data-toggle="modal">!!!</a>
		</div>

		<hr />

		</div>

		<div class="col-md-9">

			<div class="panels">

				<hr />

				<div class="option_panel" id="shirt_panel">

					<h2>Jersey</h2>
					<h4>Base Color</h4><br />
					@include('partials.colors',['data_target' =>'jersey', 'event_class' => 'change-color',])
					<br />

					<!--

					<br /><h4>Piping Color</h4><br />
					@include('partials.colors',['data_target' =>'pipings', 'event_class' => 'change-color',])

					-->

					<br />

					<br /><h4>Material Test (Base)</h4><br />
					<button onclick="texture_canvas.change_texture('base','base.jpg')">Plain</button>
					<button onclick="texture_canvas.change_texture('base','camouflage.jpg')">Camo</button>
					
					<!-- 

					<br /><h4>Material Test (Sleeve)</h4><br />
					<button onclick="change_base('base.jpg')">Plain</button>
					<button onclick="change_base('camouflage.jpg')">Camo</button>

					-->


					<br />

					<hr />

				</div>



				<div class="option_panel" id="sleeve_panel">

					<h2>Sleeves</h2>
					<h4>Base Color</h4><br />
					@include('partials.colors',['data_target' =>'sleeves', 'event_class' => 'change-color',])

					<hr />

				</div>



				<div class="option_panel" id="pants_panel">
		
					<h2>Pants</h2>
					<h4>Base Color</h4><br />
					@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

					<br /><br /><h4>Piping Color</h4><br />
					@include('partials.colors',['data_target' =>'pants_piping', 'event_class' => 'change-color'])

					<br /><br /><h4>Belt Color</h4><br />
					@include('partials.colors',['data_target' =>'belt', 'event_class' => 'change-color'])

					<br /><br /><h4>Pants Material Test</h4><br />
					<button onclick="change_material('pants','7','7')">Plain</button>
					<button onclick="change_material('pants','3','7')">Camo</button>

					<hr />

				</div>

				<div class="option_panel" id="pattern_panel">

					<h2>Pattern</h2>
					<h4>Layer 1</h4><br />
					@include('partials.colors', ['data_target' =>'c_1', 'event_class' => 'path-change-color','layer' => 'c_1'])
					<br />

					<h4>Layer 2</h4><br />
					@include('partials.colors', ['data_target' =>'c_2', 'event_class' => 'path-change-color','layer' => 'c_2'])
					<br />

					<h4>Layer 3</h4><br />
					@include('partials.colors', ['data_target' =>'c_3', 'event_class' => 'path-change-color', 'layer' => 'c_3'])
					<br />

					<h4>Layer 4</h4><br />
					@include('partials.colors', ['data_target' =>'c_4', 'event_class' => 'path-change-color','layer' => 'c_4'])
					<br />

					<hr />

				</div>

				<div class="option_panel" id="pipings_panel">

					<h2>Pipings</h2>
					
					@include('partials.colors', ['data_target' =>'pipings', 'event_class' => 'path-change-color','layer' => 'pipings'])
					
					<br /><br />

					<em>
						
						This also updates the colors of Numbers and Names for now just for testing purposes.

					</em>


					<hr />

				</div>

				<div class="option_panel" id="logo_panel">

					<h2>Logo</h2>

					<div class="panel panel-default">
					 
					  <div id="miaDropzone" class="panel-body text-center">
					 
					  	Drop logo here ...
					 
					  </div>

					</div>

					
					<br />
					<em>Please upload a transparent PNG
					<br /> (300px x 300px)</em>
	
					<br />
					<hr />

				</div>

				<div class="option_panel" id="numbers_panel">

					<h2>Numbers</h2>

				 	<input type="text" name="txtNumber" id="txtNumber" class="txtNumber" maxlength="2" /> <button onclick="texture_canvas.load_number()">Apply</button>
					
					<br />
				
				</div>

				<div class="option_panel" id="name_panel">

					<h2>Name</h2>

					Team Name:<br />
				 	<input type="text" name="txtTeamName" id="txtTeamName" class="txtTeamName" maxlength="9" />
				 	<br /><br />

					Last Name:<br />
				 	<input type="text" name="txtName" id="txtName" class="txtName" maxlength="10" />

				 	<br /><br />
				 	<button onclick="texture_canvas.load_name()">Apply</button>
					
					<br />
				
				</div>


				
			</div>

		</div>
		
	</div>

	



	<!--

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



		-->

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

	.panels {
		padding-left: 10px;
		padding-right: 10px;
		margin-right: 10px;
		border-right: 1px solid lightgrey;

	}

	.btn-tab {

		width: 100%;

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

		// Path Change Color
		$('.path-change-color').on('click', function(){
			var target = $(this).data('target');
			color = $(this).data('color');
			layer = $(this).data('layer');
			// change_color(target, color);
			texture_canvas.path_change_color(target,color,layer);
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
