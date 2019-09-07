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

	div.dt-buttons {
	    /* margin-bottom: -7px; */
	    position: relative;
		top: 0px;
		left: 10px;
	}

	table.dataTable tbody td {
		vertical-align: top;
	}

</style>
<body class="bg-light">
	<div class="container-fluid" id="main-container">
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
		<tbody>
		@{{#items}}
			<tr>
				<td class="item-id">@{{id}}</td>
				<td><a href="{{env('CUSTOMIZER_HOST')}}/builder/0/@{{id}}" target="_blank">@{{name}}</a></td>
				<td>@{{ uniform_application_type }}</td>
				<td>@{{gender}}</td>
				<td>@{{uniform_category}}</td>
				<td>@{{block_pattern}}</td>
				<td>@{{neck_option}}</td>
				<td>@{{{price_item_codes}}}</td>
				<td><img data-id="@{{id}}" src="@{{thumbnail_path}}"></td>
			</tr>
		@{{/items}}
		</tbody>
		<tfoot>
	        <tr>
	            <td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>Sport</td>
				<td>Block Pattern</td>
				<td>Neck Option</td>
				<td></td>
				<td></td>
	        </tr>
	    </tfoot>
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
		init(function() {
			$('#main-container').css('margin-top', '50px');

			var table = $('#example').DataTable( {
				dom: 'lBfrtip',
		        buttons: [
		            'csv', 'excel'
		        ],
		        "aLengthMenu": [[30, 50, 100, -1], [30, 50, 100, "All"]],
		        "pageLength": 30,
		        ordering: false
		    } );

		    $("#example tfoot td").each(function(i) {

		    	// filter for ['Sport', 'Block Pattern', 'Neck Option']
		    	if (i >= 4 && i <= 6) {
			        var select = $('<select><option value=""></option></select>')
			            .appendTo( $(this).empty() )
			            .on( 'change', function () {
			                table.column( i )
			                    .search( $(this).val() )
			                    .draw();
			            } );
			 
			        table.column( i ).data().unique().sort().each( function ( d, j ) {
			            select.append('<option value="'+d+'">'+d+'</option>')
			        });
			    }
		    });
		});

		$('#main-container').on('click', 'img', function(){
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
						item.price_item_codes = '<strong>' + item.item_id + '</strong>: ALL SIZES';
					} else {
						var sizing_config = JSON.parse(item.sizing_config_prop);
						var item_ids = _.uniq(_.pluck(sizing_config, 'qx_item_id'));

						if (_.size(item_ids) > 1) {
							var group_by_sizes = _.groupBy(sizing_config, 'qx_item_id');

							var newData=[];
							_.each(group_by_sizes, function(gsize) {
								var sizes_con = _.uniq(_.pluck(gsize, 'size'));
								var sizes_id = _.uniq(_.pluck(gsize, 'qx_item_id'));

								var text_data_con = '<br /> <br /> <strong>' + sizes_id + '</strong>: ' + sizes_con.join(', ');
								newData.push({
									id: sizes_id,
									sizes: sizes_con,
									text: text_data_con
								});
							});
							var text_item_id_info = _.pluck(newData, 'text').join(', ');
								text_item_id_info = text_item_id_info.split('<br />');
								text_item_id_info = text_item_id_info.slice(2, _.size(text_item_id_info)).join('<br>');

							item.price_item_codes = text_item_id_info
						} else {
							item.price_item_codes = '<strong>' + item.item_id + '</strong>: ALL SIZES';
						}
					}
				});
				_.delay( function() {
					var template = document.getElementById('m-items');
					var html = Mustache.render(template.innerHTML, {items: sublimatedItems});
					$('#main-container').html(html);
					callback();
				}, 500);
			});
		}
	});
</script>
</html>