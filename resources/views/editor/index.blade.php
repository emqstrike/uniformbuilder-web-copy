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

</div>

	<div class="col-md-12">
		bottom
	</div><!-- bottom panel body -->


@section('contentarea')


		<!-- <div id="mycanvas" class="mycanvas"></div> -->
		

	
@endsection('contentarea')

@section('properties')



@endsection('properties')

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
