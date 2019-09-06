<!DOCTYPE html>
<html>
<head>
	<title>Prolook - Sublimated Uniforms</title>
</head>
{{--  --}}
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">

{{--  --}}
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.flash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.print.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.3/mustache.js"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<style type="text/css">
	#example img {
		height: 50px;
    	width: auto;
    	cursor: pointer;
	}
</style>
<body>
	<div class="container">
			<p>Loading ....</p>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="thumbnail-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  
	</div>
</body>

<script type="text/mustache" id="m-items">
	<table id="example" class="display" style="width:100%">
		<thead>
			<td>ID</td>
			<td>Name</td>
			<td>Application Type</td>
			<td>Gender</td>
			<td>Sport</td>
			<td>Block Pattern</td>
			<td>Neck Option</td>
			<td>Item ID</td>
			<td>Thumbnail</td>
		</thead>
		@{{#items}}
		<tr>
			<td class="item-id">@{{id}}</td>
			<td><a href="{{env('CUSTOMIZER_HOST')}}/builder/0/@{{id}}" target="_blank">@{{name}}</a></td>
			<td>@{{ uniform_application_type }}</td>
			<td>@{{gender}}</td>
			<td>@{{uniform_category}}</td>
			<td>@{{block_pattern}}</td>
			<td>@{{neck_option}}</td>
			<td>@{{price_item_codes}}</td>
			<td><img data-id="@{{id}}" src="@{{thumbnail_path}}"></td>
		</tr>
		@{{/items}}
	</table>
</script>

<script type="text/mustache" id="m-modal">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
       <img src="@{{ thumbnail_path }}">
      </div>
    </div>
  </div>
</script>

<script type="text/javascript">
	$(document).ready(function() {
		init(function(){
			$('#example').DataTable( {
				dom: 'Bfrtip',
		        buttons: [
		            'copy', 'csv', 'excel', 'pdf', 'print'
		        ],
		        ordering: false
		    } );
		})

		$('.container').on('click', 'img', function(){
			var id = $(this).data('id');
			var data = _.find(sublimatedItems, { id: id});

			var template = document.getElementById('m-modal');
			var html = Mustache.render(template.innerHTML, {thumbnail_path: data.thumbnail_path});
			$('#thumbnail-modal').html(html);
			$('#thumbnail-modal').modal('show');
		})

		function init(callback) {
			$.get('https://api.prolook.com/api/materials/styleSheets/brand/prolook', function(response){
				window.sublimatedItems = _.sortBy(_.filter(response.materials, {uniform_application_type: "sublimated"}), 'uniform_category');
				_.each(sublimatedItems, function(item){
					if(_.isEmpty(item.sizing_config_prop)){
						item.price_item_codes = item.item_id;
					} else {
						var sizing_config = JSON.parse(item.sizing_config_prop);
							sizing_config = _.uniq(_.pluck(sizing_config, 'qx_item_id')).join(', ');
							item.price_item_codes = sizing_config;
					}
				});
				_.delay( function() {
					var template = document.getElementById('m-items');
					var html = Mustache.render(template.innerHTML, {items: sublimatedItems});
					$('.container').html(html);
					callback();
				}, 500);
			});
		}
	});
</script>
</html>