<div class='scroll'>
	<div class="collapse" id="teamcolor_tab">
	  <div class="well">
	  <header><h4>Team color</h4></header>
	  <br>

	  	<!-- Team color -->
	  			<div>
				  <ul class="nav nav-tabs" role="tablist">
				    <li role="presentation" class="active"><a href="#color1" aria-controls="color1" role="tab" data-toggle="tab">Color 1</a></li>
				    <li role="presentation"><a href="#color2" aria-controls="color2" role="tab" data-toggle="tab">Color 2</a></li>
				    <li role="presentation"><a href="#color3" aria-controls="color3" role="tab" data-toggle="tab">Color 3</a></li>
				    <li role="presentation"><a href="#color4" aria-controls="color1" role="tab" data-toggle="tab">Color 4</a></li>
				  </ul>

				  <!-- Tab panes -->
				  <div class="tab-content">
				    <div role="tabpanel" class="tab-pane active" id="color1">COLOR NAME<br> @include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])</div>
				    <div role="tabpanel" class="tab-pane" id="color2">COLOR NAME<br> @include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])</div>
				    <div role="tabpanel" class="tab-pane" id="color3">COLOR NAME<br> @include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])</div>
				    <div role="tabpanel" class="tab-pane" id="color1">COLOR NAME<br> @include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])</div>
				  </div>

				</div>
	  	<!-- Team color -->


	  </div>
	</div>

	<div class="collapse" id="materials_tab">
	  <div class="well">
	  Under Constructions     

	  </div>
	</div>


	<div class="collapse" id="color_tab">
	  <div class="well">

		<header><h4>BODY</h4></header>COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

	  	<header><h4>PIPING</h4></header>COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

	  	<header><h4>SLEEVES</h4></header>COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
	  
	  </div>
	</div>

	<div class="collapse" id="gradient_tab">
	  <div class="well">
	  C
	  </div>
	</div>

	<div class="collapse" id="pattern_tab">
	  <div class="well">
	  D
	  </div>
	</div>

	<div class="collapse" id="text_tab">
	  <div class="well">
	  E
	  </div>
	</div>

	<div class="collapse" id="number_tab">
	  <div class="well">
	  F
	  </div>
	</div>

	<div class="collapse" id="mascot_tab">
	  <div class="well">
	  G
	  </div>
	</div>

	<div class="collapse" id="size_tab">
	  <div class="well">
		
	  	<div class="form-group">
		  <label for="sel1">Select size:</label>
		  <select class="form-control" id="sel1">
		    <option>Small</option>
		    <option>Medium</option>
		    <option>Large</option>
		  </select>
		</div>

	  </div>
	</div>

</div>
