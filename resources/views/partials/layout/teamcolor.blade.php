


<div class="row">
	<div class="col-md-3"><h4>Team Color</h4></div>
	<div class="col-md-2">
		<ul class="list-unstyled">
			<li><a data-placement="bottom" data-toggle="popover" data-container="body" data-placement="left" type="button" data-html="true" href="#"><button class="btn btn-default" type="submit">Color 1</button></a></li>
			<div id="popover-content" class="hide">
			  <form class="form-inline" role="form">
			    <div class="form-group"> 
			     @include('partials.colors', ['data_target' =>'c_1', 'event_class' => 'path-change-color','layer' => 'c_1'])
			    </div>
			  </form>
			</div>
		</ul>		
	</div>
	<div class="col-md-2">
		<ul class="list-unstyled">
			<li><a data-placement="bottom" data-toggle="popover" data-container="body" data-placement="left" type="button" data-html="true" href="#"><button class="btn btn-default" type="submit">Color 2</button></a></li>
			<div id="popover-content" class="hide">
			  <form class="form-inline" role="form">
			    <div class="form-group"> 
			     @include('partials.colors', ['data_target' =>'c_2', 'event_class' => 'path-change-color','layer' => 'c_2'])
			    </div>
			  </form>
			</div>
		</ul>
	</div>
	<div class="col-md-2">
		<ul class="list-unstyled">
			<li><a data-placement="bottom" data-toggle="popover" data-container="body" data-placement="left" type="button" data-html="true" href="#"><button class="btn btn-default" type="submit">Color 3</button></a></li>
			<div id="popover-content" class="hide">
			  <form class="form-inline" role="form">
			    <div class="form-group"> 
			    @include('partials.colors', ['data_target' =>'c_2', 'event_class' => 'path-change-color','layer' => 'c_3'])
			    </div>
			  </form>
			</div>
		</ul>
	</div>
	<div class="col-md-2">
		<ul class="list-unstyled">
			<li><a data-placement="bottom" data-toggle="popover" data-container="body" data-placement="left" type="button" data-html="true" href="#"><button class="btn btn-default" type="submit">Color 4</button></a></li>
			<div id="popover-content" class="hide">
			  <form class="form-inline" role="form">
			    <div class="form-group"> 
			     @include('partials.colors', ['data_target' =>'c_2', 'event_class' => 'path-change-color','layer' => 'c_4'])
			    </div>
			  </form>
			</div>
		</ul>
	</div>
</div>
