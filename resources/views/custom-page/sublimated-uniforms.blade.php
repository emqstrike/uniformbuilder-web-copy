<!DOCTYPE html>
<html>
<head>
	<title>Prolook - Sublimated Uniforms</title>
</head>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<body>
	<table id="example" class="display" style="width:100%">

    </table>
</body>
<script type="text/javascript">
	$(document).ready(function() {
		$.get('https://api.prolook.com/api/materials/styleSheets/brand/prolook', function(response){
			console.log(response);
			var sublimatedItems = _.sortBy(_.filter(response.materials, {uniform_application_type: "sublimated"}), 'uniform_category');
			console.log(sublimatedItems);
			var newObj = [];
			_.each(sublimatedItems, function(item) {
				newObj.push([
					'customizer_id' => item.id,
					'gender' => item.gender,
					'sport' => item.uniform_category,
					'block_pattern' => item.block_pattern,
					'neck_option' => item.neck_option,
					'style_name' => item.name,
					'item_id'  => item.item_id,
				])
			});

			console.log(newObj)
			$('#example').DataTable( {
		        data: newObj,
		        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" },
            { title: "Salary" }
        ]
		    } );

		})

	});
</script>
</html>