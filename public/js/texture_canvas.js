
	$(document).ready(function() {


		/// Properties and Vars

		window.initialized = false;

		window.path_groups = {};

		window.texture_canvas = {};
		window.texture_canvas.texture_style_folder = '/images/materials/style_1/';
		window.texture_canvas['objects'] = {};
		window.texture_canvas['canvas'] = new fabric.Canvas('texture_canvas');
		
		var canvas = window.texture_canvas['canvas'];

		/// End Properties and Vars



		/// Methods

		texture_canvas.refresh_model = function refresh_model() {

			// THREE.ImageUtils.crossOrigin = '';

			target = 'jersey';
			
			window.mat = texture_canvas.canvas.toDataURL('image/png');
			window.texture = THREE.ImageUtils.loadTexture(window.mat);
			
			window.texture.wrapS = THREE.RepeatWrapping;
			window.texture.wrapT = THREE.RepeatWrapping;
			window.texture.wrapS = THREE.ClampToEdgeWrapping;
			window.texture.wrapT = THREE.ClampToEdgeWrapping;
			window.texture.minFilter = THREE.LinearFilter;
			window.texture.maxFilter = THREE.LinearFilter;
			window.texture.repeat.set(1,1);
			window.texture.needsUpdate = true;

			reset_camera();

			// var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + textureImage + ".png" );
			// var bmap =  THREE.ImageUtils.loadTexture("/images/materials/material_" + bumpMapImage + "_bump.png", {}, function(){});
			// bmap.wrapS = THREE.RepeatWrapping;
			// bmap.wrapT = THREE.RepeatWrapping;
			// bmap.wrapS = THREE.ClampToEdgeWrapping;
			// bmap.wrapT = THREE.ClampToEdgeWrapping;
			// bmap.minFilter = THREE.LinearFilter;
			// bmap.repeat.set(1,1);
			// bmap.needsUpdate = true;

			window.material = new THREE.MeshPhongMaterial({ 

				texture_color: 0x8c2332, 
				specular: 0x050505,
				shininess: 0,
				map: texture,
				bumpMap: window.texture,
				bumpScale: 0.010,
				side: THREE.DoubleSide,

			});

			window.obj = window.UniformBuilder.models[target];

			if(!window.initialized)
			{
				
				load_model('jersey', 'jersey', window.material, true);
				window.initialized = true;
				
			}
			else{

				window.obj.material = window.material;
		        window.obj.material.needsUpdate = true;
		        window.obj.geometry.computeTangents();

	   		}

	        // move_camera(target);
				
		}

		 window.path_groups = {};


		texture_canvas.change_texture_svg = function (object_name, base_image)	{


			/// New With Path Group

			var canvas = texture_canvas.canvas;
			group = [];	       

			console.log(base_image);


	        fabric.loadSVGFromURL(window.texture_canvas.texture_style_folder + base_image,function(objects,options) {

	            var loadedObjects = fabric.util.groupSVGElements(objects, options);

	            console.log("Loaded Objects: ");
	            console.log(loadedObjects);
	            
	            window.temp = loadedObjects;

	            loadedObjects.set({

	                left: 0,
	                top: 0,
					lockMovementX: true,
					lockMovementY: true,
					scaleX: 3,
					scaleY: 3,

	            });

				texture_canvas.refresh_model();

			 	texture_canvas.canvas.remove(texture_canvas.objects[object_name]);
	            texture_canvas.canvas.add(loadedObjects);
	            texture_canvas.canvas.renderAll();

	            window.texture_canvas.objects[object_name] = loadedObjects;

	        }, function(item, object) {
	
	                object.set('id',item.getAttribute('id'));

	                group.push(object);
	              //  window.path_groups[object_name].push(object);

	                // console.log('Object');
	                // console.log(object);
	                // console.log('Item');
	                // console.log(item);
	                // console.log('ID: ' + item.getAttribute('id'));

	        });

	  //       /// Old Without Groups

			// fabric.Image.fromURL(window.texture_canvas.texture_style_folder + base_image, function(oImg)  {

		 //        oImg.left = 0;
			// 	oImg.top = 0;
			// 	oImg.lockMovementX = true;
			// 	oImg.lockMovementY = true;

			// 	oImg.scaleToWidth(1600)
			// 	oImg.scaleToHeight(1598)

			// 	if(typeof(texture_canvas.objects[object_name]) !== 'undefined'){
			// 	 	texture_canvas.canvas.remove(texture_canvas.objects[object_name]);
			// 	}

			// 	window.texture_canvas.objects[object_name] = oImg;
	  // 			texture_canvas.canvas.add(oImg);

	  // 			setTimeout(function(){

			// 		texture_canvas.refresh_model();

			// 	}, 50);

	  //       });

	  //       /// End Old With Groups

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

			});

		}

		texture_canvas.change_color = function (obj,color_value){

			selectedObject = window.texture_canvas.objects[obj];

			if(obj === 'jersey'){

				texture_canvas.objects.jersey_rect.opacity = 0.7;

				texture_canvas.objects.jersey_rect.fill = color_value;

				texture_canvas.objects.base.opacity = 0.0;
				texture_canvas.objects.c_1.opacity = 0;
				texture_canvas.objects.c_2.opacity = 0;
				texture_canvas.objects.c_3.opacity = 0;
				texture_canvas.objects.c_4.opacity = 0;

			}

			canvas = window.texture_canvas.canvas;

			setTimeout(function(){

					texture_canvas.refresh_model();

			}, 50);

		}

		texture_canvas.path_change_color = function (obj,color_value,layer){


				texture_canvas.objects.jersey_rect.opacity = 0.0

				 if(typeof(texture_canvas.objects.base) !== 'undefined'){
					texture_canvas.objects.base.opacity = 0.0; 	
				 }
				

				texture_canvas.objects.jersey_rect.fill = color_value;


				texture_canvas.objects.c_1.opacity = 0.7;
				texture_canvas.objects.c_2.opacity = 0.7;
				texture_canvas.objects.c_3.opacity = 0.7;
				texture_canvas.objects.c_4.opacity = 0.7;

			selectedObject = window.texture_canvas.objects[layer];

			for(i = 0; i <= selectedObject.paths.length -1; i++){


				path = selectedObject.paths[i];
				console.log(path);

				path.setFill(color_value);

			}

			canvas = window.texture_canvas.canvas;
			selectedObject.applyFilters(canvas.renderAll.bind(canvas));

			setTimeout(function(){

					texture_canvas.refresh_model();

			}, 50);

		}

		/// End Methods



		/// Initial Textures
		
		// 1
		// texture_canvas.change_texture('base', 'base.jpg');
		// texture_canvas.change_texture('sleeves', 'sleeves.png');
		// texture_canvas.change_texture('pipings', 'pipings.png');

		// 2
		//texture_canvas.change_texture_svg('base_svg', 'base.svg');
		// texture_canvas.change_texture_svg('c_1', 'camouflage.svg');


		texture_canvas.change_texture_svg('c_1', 'c_1.svg');
		texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		texture_canvas.change_texture_svg('c_4', 'c_4.svg');

		//texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		//texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		//texture_canvas.change_texture_svg('c_4', 'c_4.svg');

		/// End Initial Textures



		/// Events

		canvas.on('object:added', function(options) {

			// 1
			// var base_loaded = typeof(texture_canvas.objects.base) !== 'undefined';
			// var sleeves_loaded = typeof(texture_canvas.objects.sleeves) !== 'undefined';
			// var pipings_loaded = typeof(texture_canvas.objects.pipings) !== 'undefined';

			// if(base_loaded && sleeves_loaded && pipings_loaded){

			// 	texture_canvas.objects.base.moveTo('1');
			// 	texture_canvas.objects.sleeves.moveTo('4');
			// 	texture_canvas.objects.pipings.moveTo('5');

			// 	setTimeout(function(){

			// 		texture_canvas.refresh_model();

			// 	}, 50);
				

			// }

			// 2
			var base_loaded = typeof(texture_canvas.objects.base) !== 'undefined';
		
			if(base_loaded){

				// texture_canvas.objects.base.moveTo('1');
				
				setTimeout(function(){

					texture_canvas.refresh_model();

				}, 50);
				

			}


		});

		canvas.on('mouse:up', function(options) {
		
				setTimeout(function(){

					texture_canvas.refresh_model();

				}, 50);

		});

		/// End Events

		

	});
