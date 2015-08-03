		
		window.texture_canvas.current_image = '';

		function update_fabric_material() {

			change_material_from_canvas('jersey');
			
		}

		function change_color_fabric(obj,color_value){

			selectedObject = window.texture_canvas.objects[obj];

			selectedObject.filters.push(
    			new fabric.Image.filters.Tint({color:color_value, opacity:1})
    		);

    		canvas = window.texture_canvas.canvas;
			selectedObject.applyFilters(canvas.renderAll.bind(canvas));

			setTimeout(function() {

				update_fabric_material();

  			}, 100);
			
		}

		function add_blending(obj){

			selectedObject = window.texture_canvas.objects[obj];

			
			selectedObject.filters.push(
    			new fabric.Image.filters.Multiply({opacity:0.5})
    		);

    		canvas = window.texture_canvas.canvas;
			selectedObject.applyFilters(canvas.renderAll.bind(canvas));

			update_fabric_material();

		}

	function change_base(base_image){

		fabric.Image.fromURL(window.texture_style_folder + base_image, function(oImg) {

			oImg.left = 0;
			oImg.top = 0;
			oImg.lockMovementX = true;
			oImg.lockMovementY = true;

			if(typeof(texture_canvas.objects.base) !== 'undefined'){
			 	texture_canvas.canvas.remove(texture_canvas.objects.base);
			}

			window.texture_canvas.objects['base'] = oImg;
  			texture_canvas.canvas.add(oImg);

  			setTimeout(function() {

				update_fabric_material();

  			}, 100);

		});

	}


	$( document ).ready(function() {



		window.texture_style_folder = '/images/materials/baseball_1/';
		window.texture_canvas = {};
		window.texture_canvas['objects'] = {};

		var canvas = new fabric.Canvas('texture_canvas');

		change_base('base.jpg');

		fabric.Image.fromURL('/images/materials/baseball_1/sleeve.png', function(oImg) {

			oImg.left = 0;
			oImg.top = 0;
			oImg.lockMovementX = true;
			oImg.lockMovementY = true;

			window.texture_canvas.objects['sleeves'] = oImg;
  			canvas.add(oImg);

		});

		fabric.Image.fromURL('/images/materials/baseball_1/pipings.png', function(oImg) {

			oImg.left = 0;
			oImg.top = 0;
			oImg.lockMovementX = true;
			oImg.lockMovementY = true;

			window.texture_canvas.objects['pipings'] = oImg;
  			canvas.add(oImg);

		});

		window.texture_canvas['canvas'] = canvas;

		canvas.on('mouse:up', function(options) {
		
			update_fabric_material();

		});

		canvas.on('object:added', function(options) {

			
			console.log(texture_canvas.objects);

			var base_loaded = typeof(texture_canvas.objects.base) !== 'undefined';
			var sleeves_loaded = typeof(texture_canvas.objects.sleeves) !== 'undefined';
			var pipings_loaded = typeof(texture_canvas.objects.pipings) !== 'undefined';

			if(base_loaded && sleeves_loaded && pipings_loaded){

				texture_canvas.objects.base.moveTo('1');
				texture_canvas.objects.sleeves.moveTo('4');
				texture_canvas.objects.pipings.moveTo('5');


				console.log('All Objects Added!');

			}

		});





	});
