
@include('partials.layout.teamcolor')
<hr>

<div class="container-fluid">

	<h3>Jersey</h3>
	<h4>Base Color</h4>
	<span>@include('partials.colors',['data_target' =>'jersey', 'event_class' => 'change-color',])</span>	
		<hr>  
	<h3>Pipings</h3>
	<h4>PIPING 1</h4>
	<span>@include('partials.colors', ['data_target' =>'pipings', 'event_class' => 'path-change-color','layer' => 'pipings'])</span>
	<hr>
	<h4>PIPING 2</h4>
	  	@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])
	<hr>
	<h3>Sleeves</h3>
	<h4>COLOR</h4>		     
		@include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

</div>
          
     
    
			
			
   
   

   
	   