<div class='scroll' style="border: 1px solid gray; width:80%; height:60%;">
	<br>
	

<!-- Test Code-->
	<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	  
	  <div class="panel">  
	    <div id="material_tab" class="panel-collapse collapse in" role="tabpanel">
	        <div class="container-fluid">
	 		 @include('partials.layout.material')   
	  		</div>
	    </div>
	  </div>
	  
	  <div class="panel">   
	    <div id="color_tab" class="panel-collapse collapse" role="tabpanel">
	     @include('partials.layout.color')
	    </div>
	  </div>
	  
	  <div class="panel">    
	    <div id="gradient_tab" class="panel-collapse collapse" role="tabpanel">	      
	      Gradient    
	    </div>
	  </div>
	  
	  <div class="panel">    
	    <div id="pattern_tab" class="panel-collapse collapse" role="tabpanel">	      
	      Pattern	      
	    </div>
	  </div>

	</div>
<!-- Test Code-->


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
	</div> <!-- text tab -->

	<div class="collapse" id="number_tab"> <!-- number -->
	  <div class="container-fluid">
	 	<h2>Numbers</h2>
		<input type="text" name="txtNumber" id="txtNumber" class="txtNumber" maxlength="2" /> <button onclick="texture_canvas.load_number()">Apply</button>		
		<br>
	  </div>
	</div> <!-- number -->

	<div class="collapse" id="mascot_tab"> <!-- graphics -->
	  <div class="container-fluid">
		<h2>Logo</h2>
		  <div id="miaDropzone" class="panel-body text-center">					 
		  	Drop logo here ...					 
		  </div>				
		<br />
		<em>Please upload a transparent PNG
		<br /> (300px x 300px)</em>
		<br />
		<hr />	
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
