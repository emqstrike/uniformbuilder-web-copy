		
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

	        fabric.loadSVGFromURL(window.texture_canvas.texture_style_folder + base_image,function(objects,options) {

	            var loadedObjects = fabric.util.groupSVGElements(objects, options);

	            window.temp = loadedObjects;

	            loadedObjects.set({

	                left: 0,
	                top: 0,
					lockMovementX: true,
					lockMovementY: true,

	            });

	            loadedObjects.scaleToWidth(1600);
				loadedObjects.scaleToHeight(1598);

			 	texture_canvas.canvas.remove(texture_canvas.objects[object_name]);
	            texture_canvas.canvas.add(loadedObjects);
	            window.texture_canvas.objects[object_name] = loadedObjects;

	            texture_canvas.canvas.renderAll();

	            setTimeout(function(){
					
					console.log('loaded');

					texture_canvas.canvas.renderAll();
					texture_canvas.refresh_model();

				}, 250);


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

			selectedObject.filters.push(
				new fabric.Image.filters.Tint({color:color_value, opacity:1})
			);

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

		// texture_canvas.change_texture_svg('c_1', 'c_1.svg');
		// texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		// texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		// texture_canvas.change_texture_svg('c_4', 'c_4.svg');
		// texture_canvas.change_texture('shadows', 'shadows.png');

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_1', 'c_1.svg');
		}, 250);

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		}, 250);

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		}, 250);

		setTimeout(function(){		
			texture_canvas.change_texture_svg('c_4', 'c_4.svg');
		}, 250);

		setTimeout(function(){
			texture_canvas.change_texture('shadows', 'shadows.png');
		}, 250);

		// texture_canvas.change_texture_svg('c_1', 'c_1.svg');
		// texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		// texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		// texture_canvas.change_texture_svg('c_4', 'c_4.svg');
		// texture_canvas.change_texture('shadows', 'shadows.png');


		//texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		//texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		//texture_canvas.change_texture_svg('c_4', 'c_4.svg');

		/// End Initial Textures



		/// Events

		canvas.on('object:added', function(options) {
		
			var c_1_loaded = typeof(texture_canvas.objects.c_1) !== 'undefined';
			var c_2_loaded = typeof(texture_canvas.objects.c_2) !== 'undefined';
			var c_3_loaded = typeof(texture_canvas.objects.c_3) !== 'undefined';
			var c_4_loaded = typeof(texture_canvas.objects.c_3) !== 'undefined';
			var shadows_loaded = typeof(texture_canvas.objects.shadows) !== 'undefined';
		
			if(c_1_loaded && c_2_loaded && c_3_loaded && c_4_loaded && shadows_loaded){

				texture_canvas.objects.c_1.moveTo('1');
				texture_canvas.objects.c_2.moveTo('2');
				texture_canvas.objects.c_3.moveTo('3');
				texture_canvas.objects.c_4.moveTo('4');
				texture_canvas.objects.shadows.moveTo('5');
			
			}

			texture_canvas.refresh_model();

		});

		canvas.on('mouse:up', function(options) {
		
			setTimeout(function(){


			}, 50);

		});

		/// End Events

		

	});
