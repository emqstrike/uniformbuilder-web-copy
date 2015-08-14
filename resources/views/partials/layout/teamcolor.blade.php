
<div class="row">
	<div class="col-md-3">
		<div class="dropdown">
		  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    Color 1
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
		     @include('partials.colors', ['data_target' =>'c_1', 'event_class' => 'path-change-color','layer' => 'c_1'])
		  </ul>
		</div>
	</div>
	
	<div class="col-md-3">
		<div class="dropdown">
		  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    Color 2
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
		    @include('partials.colors', ['data_target' =>'c_2', 'event_class' => 'path-change-color','layer' => 'c_2'])
		  </ul>
		</div>
	</div>
	
	<div class="col-md-3">
		<div class="dropdown">
		  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    Color 3
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
		    @include('partials.colors', ['data_target' =>'c_3', 'event_class' => 'path-change-color','layer' => 'c_3'])
		  </ul>
		</div>
	</div>
	
	<div class="col-md-3">
		<div class="dropdown">
		  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    Color 4
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
		     @include('partials.colors', ['data_target' =>'c_4', 'event_class' => 'path-change-color','layer' => 'c_4'])
		  </ul>
		</div>
	</div>
</div>