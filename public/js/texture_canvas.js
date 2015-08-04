		
	$(document).ready(function() {


		/// Properties and Vars

		window.texture_canvas = {};
		window.texture_canvas.texture_style_folder = '/images/materials/baseball_1/';
		window.texture_canvas['objects'] = {};
		window.texture_canvas['canvas'] = new fabric.Canvas('texture_canvas');
		
		var canvas = window.texture_canvas['canvas'];

		/// End Properties and Vars



		/// Methods

		texture_canvas.refresh_model = function refresh_model() {

			// THREE.ImageUtils.crossOrigin = '';

			target = 'jersey';
			
			var imag = texture_canvas.canvas.toDataURL('image/png');
			window.texture = THREE.ImageUtils.loadTexture(imag);
			
			texture = window.texture;
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.wrapS = THREE.ClampToEdgeWrapping;
			texture.wrapT = THREE.ClampToEdgeWrapping;
			texture.minFilter = THREE.LinearFilter;
			texture.maxFilter = THREE.LinearFilter;
			texture.repeat.set(1,1);
			texture.needsUpdate = true;

			reset_camera();

			// var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + textureImage + ".png" );
			// var bmap =  THREE.ImageUtils.loadTexture("/images/materials/material_" + bumpMapImage + "_bump.png", {}, function(){});
			// bmap.wrapS = THREE.RepeatWrapping;
			// bmap.wrapT = THREE.RepeatWrapping;
			// bmap.wrapS = THREE.ClampToEdgeWrapping;
			// bmap.wrapT = THREE.ClampToEdgeWrapping;
			// bmap.minFilter = THREE.LinearFilter;
			// bmap.repeat.set(1,1);
			//bmap.needsUpdate = true;

			window.material = new THREE.MeshPhongMaterial({ 
				texture_color: 0x8c2332, 
				specular: 0x050505,
				shininess: 0,
				map: texture,
				bumpMap: texture,
				bumpScale: 0.010,
				side: THREE.DoubleSide,
			});

			obj = window.UniformBuilder.models[target];

			obj.material = window.material;
	        obj.material.needsUpdate = true;
	        obj.geometry.computeTangents();

	        // move_camera(target);
				
		}

		texture_canvas.change_texture = function (object_name, base_image)	{

			fabric.Image.fromURL(window.texture_canvas.texture_style_folder + base_image, function(oImg) {

				oImg.left = 0;
				oImg.top = 0;
				oImg.lockMovementX = true;
				oImg.lockMovementY = true;

				if(typeof(texture_canvas.objects[object_name]) !== 'undefined'){
				 	texture_canvas.canvas.remove(texture_canvas.objects.base);
				}

				window.texture_canvas.objects[object_name] = oImg;
	  			texture_canvas.canvas.add(oImg);

	  			setTimeout(function() {

					texture_canvas.refresh_model();

	  			}, 50);

			});

		}

		texture_canvas.change_color = function (obj,color_value){

			selectedObject = window.texture_canvas.objects[obj];

			selectedObject.filters.push(
				new fabric.Image.filters.Tint({color:color_value, opacity:1})
			);

			canvas = window.texture_canvas.canvas;
			selectedObject.applyFilters(canvas.renderAll.bind(canvas));

			setTimeout(function() {

				texture_canvas.refresh_model();

			}, 100);
			
		}

		/// End Methods



		/// Initial Textures
		
		texture_canvas.change_texture('base', 'base.jpg');
		texture_canvas.change_texture('sleeves', 'sleeves.png');
		texture_canvas.change_texture('pipings', 'pipings.png');

		/// End Initial Textures



		/// Events

		canvas.on('object:added', function(options) {

			var base_loaded = typeof(texture_canvas.objects.base) !== 'undefined';
			var sleeves_loaded = typeof(texture_canvas.objects.sleeves) !== 'undefined';
			var pipings_loaded = typeof(texture_canvas.objects.pipings) !== 'undefined';

			if(base_loaded && sleeves_loaded && pipings_loaded){

				texture_canvas.objects.base.moveTo('1');
				texture_canvas.objects.sleeves.moveTo('4');
				texture_canvas.objects.pipings.moveTo('5');

			}

		});

		canvas.on('mouse:up', function(options) {
		
			update_fabric_material();

		});

		/// End Events

		

	});
