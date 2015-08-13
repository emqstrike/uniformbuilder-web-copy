@include('partials.layout.teamcolor')
<hr>

<div class="container-fluid">

	<h3>Jersey</h3>
	<h4>Base Color</h4><br />
	@include('partials.colors',['data_target' =>'jersey', 'event_class' => 'change-color',])

	PIPING 1   
	<h2>Pipings</h2>
	@include('partials.colors', ['data_target' =>'pipings', 'event_class' => 'path-change-color','layer' => 'pipings'])			


<hr>
     PIPING 2
				     
     COLOR NAME
		<br>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
				    
	    SLEEVES

	   	COLOR NAME
			<br>
		  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

		  	<br>
		  	 @include('partials.colors', ['data_target' =>'c_1', 'event_class' => 'path-change-color','layer' => 'c_1'])
</div>
          
     
    
			
			
   
   

   
	   