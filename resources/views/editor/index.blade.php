@extends('main-container')
		
@include('partials.layout.navbar')
<link rel="stylesheet" href="css/builder.css">
		<br><br><br>
		<hr style="marign-top: 100px;">
<div class="row"><!-- start table -->

	<div class="col-md-5 col-md-offset-1"><!-- right panel body -->
		<div class="row"><!-- left panel table -->
			<div class="col-md-1">top</div>
			<div class="col-md-11">@include('partials.layout.topleftpanel')</div>			
			
		</div>
		<div class="row">
			<div class="col-md-1">@include('partials.layout.settings_sidepanel')</div>
			<div class="col-md-11">@include('partials.layout.uniformbuilder')</div>
		</div>	
	</div><!-- left panel body -->
	
	<div class="col-md-5">				 
		<div class="row">
			<div class="col-md-1">toap</div>
			<div class="col-md-11">@include('partials.layout.toprightpanel')</div>
			
			<div class="col-md-1">@include('partials.layout.rightpaneltab')</div>
			<div class="col-md-11">@include('partials.layout.tab_rightpanel')</div>	
		</div>							
	</div><!-- right panel body -->	

			<button id="btn_free_form" class="btn-white btn btn-default btn-sm" onclick="reset_camera();toggle_free_rotate()">Camera Free Rotate Mode </button>	
			
			<button class="btn-white btn btn-default btn-sm" onclick="reset_camera()">Reset Camera</i>
			</button>	

</div>

	<div class="col-md-12">
		bottom
	</div><!-- bottom panel body -->

		<div id="model_view" style="position: absolute; top: 25px; left: 25px;">
			
			</br ></br >
	
		</div>

@section('contentarea')


		<!-- <div id="mycanvas" class="mycanvas"></div> -->
		

	
@endsection('contentarea')

@section('properties')

	<div class="row">

		<div class="col-md-3">


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

				<div class="option_panel" id="pants_panel">
		
					<h2>Pants</h2>
					<h4>Base Color</h4><br />
					@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

					<br /><br /><h4>Piping Color</h4><br />
					@include('partials.colors',['data_target' =>'pants_piping', 'event_class' => 'change-color'])

					<br /><br /><h4>Belt Color</h4><br />
					@include('partials.colors',['data_target' =>'belt', 'event_class' => 'change-color'])
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
@section('custom-styles')

	body, h1, h2, h3, h4, h5, h6, button, a, p {

		font-family: raleway;

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


<!-- for popover -->
	<script type="text/javascript">
	$(function () {
	  $('[data-toggle="popover"]').popover()
	})	

	$("[data-toggle=popover]").popover({
    html: true, 
	content: function() {
          return $('#popover-content').html();
        }
});
	
</script>

<!-- font selector -->
  <script>
      function updateh1family() {
        var selector = document.getElementById('selecth1FontFamily');
        var family = selector.options[selector.selectedIndex].value;
        var h1 = document.getElementById('liveh1')
        h1.style.fontFamily = family;        
      }

    </script>

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
