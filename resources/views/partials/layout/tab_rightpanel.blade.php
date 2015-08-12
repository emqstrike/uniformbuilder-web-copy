<div class='scroll' style="border: 1px solid gray; width:80%; height:60%;">
	<br>
	

	<div class="collapse" id="materials_tab">
	  <div class="container-fluid">
	  @include('partials.layout.material')   
	  </div>
	</div>


	<div class="collapse" id="color_tab"><!-- Color tab-->
	  <div class="container-fluid">

		@include('partials.layout.teamcolor')
		
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
			    <!-- test -->			
					<h2>Jersey</h2>
					<h4>Base Color</h4><br />
					@include('partials.colors',['data_target' =>'jersey', 'event_class' => 'change-color',])				
				<!-- test -->
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
		      	<h2>Pipings</h2>
				@include('partials.colors', ['data_target' =>'pipings', 'event_class' => 'path-change-color','layer' => 'pipings'])
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
	  </div>
	</div><!-- Color tabs -->	

	<div class="collapse" id="gradient_tab"> <!-- gradient -->
	  <div class="container-fluid">
	  	Gradient
	  </div>
	</div> <!-- gradient -->

	<div class="collapse" id="pattern_tab"> <!-- pattern tab -->
	  <div class="container-fluid">
	  Pattern
	  </div>
	</div> <!-- pattern tab -->

	<div class="collapse" id="text_tab"> <!-- text tab -->
	  <div class="container-fluid">
	  <h3>Text</h3>
	  <hr>
	  <center>
	  <h3 id="liveh1"><input type="text" placeholder="Type some text"></h3>
	  <h3><select id="selecth1FontFamily" name="selectFontFamily" onchange="updateh1family();"></h3>
	    <option> Serif </option>
	    <option> Arial </option>
	    <option> Sans-Serif </option>                                  
	    <option> Tahoma </option>
	    <option> Verdana </option>
	    <option> Lucida Sans Unicode </option>  
	    <option> Comic Sans </option>                             
	  </select>
   	  </center>	
  

	  </div>
	</div> <!-- text tab -->

	<div class="collapse" id="number_tab"> <!-- number -->
	  <div class="container-fluid">
	  Number
	  </div>
	</div> <!-- number -->

	<div class="collapse" id="mascot_tab"> <!-- graphics -->
	  <div class="container-fluid">
	  Graphics
	  </div>
	</div> <!-- graphics -->

	<div class="collapse" id="size_tab"> <!-- size -->
	  <div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				
			</div>
			<div class="col-md-12">
				<h3>Style:</h3>
				<h3>Estimate:</h3>
				<h3>Lead Time:</h3>
			</div>
			<div class="col-md-12">
				<hr>
				<center>
				<img src="images/icons/YXS.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/YS.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/YM.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/YL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/YXL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/Y2XL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/Y3XL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<br><br>
				<img src="images/icons/XS.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/S.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/M.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/L.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/XL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/2XL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				<img src="images/icons/3XL.png" height="50" style="border-bottom-style: solid; border-width: 1px;">
				</center>				
			</div>

			<div class="col-md-12">
				<hr>
				<h3>TEAM INFO</h3>
				<hr>					

				<table class="table table-hover">
  					<div class="row">
						<div class="col-md-3 col-md-offset-2">
							<label for="sel11">Name/Number</label>
							<a data-toggle="modal" data-target="#myModal"><img src="images/icons/form.png" height="30"></a>
								
						</div>
						<div class="col-md-3">
							<div class="form-group">
							  <label for="sel11">Size:</label>
							  <select class="form-control" id="sel1">
							    <option>Small</option>
							    <option>Medium</option>
							    <option>Large</option>
							  </select>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
							  <label for="sel12">QTY:</label>
							  <select class="form-control" id="sel12">
							    <option>1</option>
							    <option>2</option>
							    <option>3</option>
							  </select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3 col-md-offset-2">
							<label for="sel11">Name/Number</label>
							<a data-toggle="modal" data-target="#myModal"><img src="images/icons/form.png" height="30"></a>								
						</div>
						<div class="col-md-3">
							<div class="form-group">
							  <label for="sel11">Size:</label>
							  <select class="form-control" id="sel1">
							    <option>Small</option>
							    <option>Medium</option>
							    <option>Large</option>
							  </select>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
							  <label for="sel12">QTY:</label>
							  <select class="form-control" id="sel12">
							    <option>1</option>
							    <option>2</option>
							    <option>3</option>
							  </select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3 col-md-offset-2">
							<label for="sel11">Name/Number</label>
							<a data-toggle="modal" data-target="#myModal"><img src="images/icons/form.png" height="30"></a>
								
						</div>
						<div class="col-md-3">
							<div class="form-group">
							  <label for="sel11">Size:</label>
							  <select class="form-control" id="sel1">
							    <option>Small</option>
							    <option>Medium</option>
							    <option>Large</option>
							  </select>
							</div>
						</div>
						<div class="col-md-3">
							<input type="text" class="form-control bfh-number" data-zeros="true" data-min="5" data-max="25">
						</div>
					</div>

				</table>

				

			</div>
		</div>
	  	
	  	

		

		<!-- modal test -->
		<!-- Button trigger modal -->
		
		  

		<!-- Modal -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">Jersey Information</h4>
		      </div>
		      <div class="modal-body">
		        ...
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Save changes</button>
		      </div>
		    </div>
		  </div>
		</div>
		<!-- modal test -->
	  </div>
	</div> <!-- size -->

</div>
