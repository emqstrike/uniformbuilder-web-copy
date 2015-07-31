		function update_fabric_material() {

			texture_canvas.canvas.renderAll();
			var s = document.getElementById("texture_canvas").toDataURL({format: 'jpeg'});
			change_material_from_image('jersey', s);

		}

		function change_color_fabric(obj,color_value){

			selectedObject = window.texture_canvas.objects[obj];

			selectedObject.filters.push(
    			new fabric.Image.filters.Tint({color:color_value, opacity:1})
    		);
    		canvas = window.texture_canvas.canvas;
			selectedObject.applyFilters(canvas.renderAll.bind(canvas));

			update_fabric_material();

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


	$( document ).ready(function() {


		window.texture_canvas = {};
		window.texture_canvas['objects'] = {};

		var canvas = new fabric.Canvas('texture_canvas');

		fabric.Image.fromURL('/images/materials/baseball_1/base.png', function(oImg) {

			oImg.left = 0;
			oImg.top = 0;
			oImg.lockMovementX = true;
			oImg.lockMovementY = true;

			window.texture_canvas.objects['base'] = oImg;
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

		// fabric.Image.fromURL('/images/materials/baseball_1/sleeves.png', function(oImg) {

		// 	oImg.left = 0;
		// 	oImg.top = 0;
		// 	oImg.lockMovementX = true;
		// 	oImg.lockMovementY = true;

		// 	window.texture_canvas.objects['sleeves'] = oImg;
  // 			canvas.add(oImg);

		// });



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

			if(typeof(texture_canvas.objects.base) !== 'undefined'){
				texture_canvas.objects.base.moveTo(1);
			}

			if(typeof(texture_canvas.objects.sleeves) !== 'undefined'){
				texture_canvas.objects.sleeves.moveTo(2);
			}

			if(typeof(texture_canvas.objects.pipings) !== 'undefined'){
				texture_canvas.objects.pipings.moveTo(3);
			}

			if(typeof(texture_canvas.objects.shadows) !== 'undefined'){
				texture_canvas.objects.shadows.moveTo(4);
			}

			if(typeof(texture_canvas.objects.highlights) !== 'undefined'){
				texture_canvas.objects.highlights.moveTo(5);
			}


		});


	});
