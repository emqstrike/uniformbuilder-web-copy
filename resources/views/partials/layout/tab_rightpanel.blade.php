<div class='scroll' style="border: 1px solid gray; width:80%; height:60%;">
	<br>
	
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
	    	<div class="panel-body">
	    		  @include('partials.layout.color')
	    	</div>	   
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

	  <div class="panel">    
	    <div id="text_tab" class="panel-collapse collapse" role="tabpanel">	      
	     @include('partials.layout.text')     
	    </div>
	  </div>

	  <div class="panel">    
	    <div id="number_tab" class="panel-collapse collapse" role="tabpanel">	      
	      @include('partials.layout.number')  	      
	    </div>
	  </div>

	  <div class="panel">    
	    <div id="graphics_tab" class="panel-collapse collapse" role="tabpanel">	      
	      @include('partials.layout.graphics')
	    </div>
	  </div>

	  <div class="panel">    
	    <div id="size_tab" class="panel-collapse collapse" role="tabpanel">	      
	      @include('partials.layout.size')  
	    </div>
	  </div>

	</div>

</div>
