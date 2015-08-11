

<div class='scroll' style="border: 1px solid gray; width:80%; height:60%;">
	<br>
	<div class="container-fluid">
		@include('partials.layout.teamcolor')
	</div>

	<div class="collapse" id="materials_tab">
	  <div class="container-fluid">
	  Under Constructions     
	  </div>
	</div>


	<div class="collapse" id="color_tab">
	  <div class="container-fluid">

		<header style="border-top-style: solid; border-width: 1px;"><h4>BODY</h4></header>COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
	  	<br><br>
	  	<header style="border-top-style: solid; border-width: 1px;"><h4>PIPING</h4></header>COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
	  	<br><br>
	  	<header style="border-top-style: solid; border-width: 1px;"><h4>SLEEVES</h4></header>COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
	  
	  </div>
	</div>

	<div class="collapse" id="gradient_tab">
	  <div class="container-fluid">
	  	
	  	<ul class="list-unstyled">
		    <li><a data-placement="bottom" data-toggle="popover" data-container="body" data-placement="left" type="button" data-html="true" href="#" id="login"><span class="glyphicon glyphicon-search" style="margin:3px 0 0 0"></span></a></li>
		    <div id="popover-content" class="hide">
		      <form class="form-inline" role="form">
		        <div class="form-group"> 
		         @include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
		        </div>
		      </form>
		    </div>
		  </ul>

	  </div>
	</div>

	<div class="collapse" id="pattern_tab">
	  <div class="container-fluid">
	  D
	  </div>
	</div>

	<div class="collapse" id="text_tab">
	  <div class="wcontainer-fluid">
	  E
	  </div>
	</div>

	<div class="collapse" id="number_tab">
	  <div class="container-fluid">
	  F
	  </div>
	</div>

	<div class="collapse" id="mascot_tab">
	  <div class="container-fluid">
	  G
	  </div>
	</div>

	<div class="collapse" id="size_tab">
	  <div class="container-fluid">
		
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
