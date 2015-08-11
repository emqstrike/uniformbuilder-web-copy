<div class='scroll' style="border: 1px solid gray; width:80%; height:60%;">
	<br>
	

	<div class="collapse" id="materials_tab">
	  <div class="container-fluid">
	  Under Constructions     
	  </div>
	</div>


	<div class="collapse" id="color_tab">
	  <div class="container-fluid">

		@include('partials.layout.teamcolor')


		<!-- Partitions -->
		<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
		  <div class="panel panel-default">
		    <div class="panel-heading" role="tab" id="headingOne">
		      <h4 class="panel-title">
		        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
		          BODY
		        </a>
		      </h4>
		    </div>
		    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
		      <div class="panel-body">
			    COLOR NAME
				<br>
	  			@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',]) 
		      </div>
		    </div>
		  </div>
		  <div class="panel panel-default">
		    <div class="panel-heading" role="tab" id="headingTwo">
		      <h4 class="panel-title">
		        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
		          PIPING 1
		        </a>
		      </h4>
		    </div>
		    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
		      <div class="panel-body">
		      	COLOR NAME
				<br>
	  			@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',]) 
		      </div>
		    </div>
		  </div>
		  <div class="panel panel-default">
		    <div class="panel-heading" role="tab" id="headingThree">
		      <h4 class="panel-title">
		        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
		          PIPING 2
		        </a>
		      </h4>
		    </div>
		    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
		      <div class="panel-body">
	        	COLOR NAME
				<br>
			  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
		       </div>
		    </div>
		  </div>
		  <div class="panel panel-default">
		    <div class="panel-heading" role="tab" id="headingFour">
		      <h4 class="panel-title">
		        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
		          SLEEVES
		        </a>
		      </h4>
		    </div>
		    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
		      <div class="panel-body">
		      	COLOR NAME
				<br>
			  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
		      </div>
		    </div>
		  </div>
		</div>

		<!-- Partitions -->	 
	  
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
