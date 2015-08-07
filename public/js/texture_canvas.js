		
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

	            window.texture_canvas.objects[object_name] = loadedObjects;


	            window.temp = loadedObjects;

	            loadedObjects.set({

	                left: 0,
	                top: 0,
					lockMovementX: true,
					lockMovementY: true,
					opacity: 0.7,

	            });

	            loadedObjects.scaleX = 3;
				loadedObjects.scaleY = 3;

			 	// texture_canvas.canvas.remove(texture_canvas.objects[object_name]);
	            texture_canvas.canvas.add(loadedObjects);

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

			texture_canvas.objects.base.opacity = 1;


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


				texture_canvas.objects.jersey_rect.opacity = 0.0;
				texture_canvas.objects.base.opacity = 0.0;

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
			canvas.renderAll.bind(canvas);

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


		$rect = new fabric.Rect({
			  
			        top: 0,
			        left: 0,
			        width: 1600,
			        height: 1598,
			        angle: 0,
			        fill: '#ffffff',
			        opacity: 0,

		});

		window.texture_canvas.canvas.add($rect);

		texture_canvas.objects['jersey_rect'] = $rect;



		setTimeout(function(){
			texture_canvas.change_texture_svg('c_1', 'c_1.svg');
		}, 50);

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_2', 'c_2.svg');
		}, 150);

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_3', 'c_3.svg');
		}, 200);

		setTimeout(function(){		
			texture_canvas.change_texture_svg('c_4', 'c_4.svg');
		}, 250);

		setTimeout(function(){
			texture_canvas.change_texture('shadows', 'shadows_white.png');
		}, 50);

		setTimeout(function(){
			texture_canvas.change_texture('mesh', 'mesh.png');
		}, 50);
		


		texture_canvas.canvas.setBackgroundColor('rgba(183,176,159,255)', texture_canvas.canvas.renderAll.bind(canvas));

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
			var c_4_loaded = typeof(texture_canvas.objects.c_4) !== 'undefined';
			var shadows_loaded = typeof(texture_canvas.objects.shadows) !== 'undefined';
			var mesh_loaded = typeof(texture_canvas.objects.mesh) !== 'undefined';


			var jersey_rect_loaded = typeof(texture_canvas.objects.jersey_rect) !== 'undefined';

		
			if(c_1_loaded && c_2_loaded && c_3_loaded && c_4_loaded && shadows_loaded && jersey_rect_loaded && mesh_loaded){

				texture_canvas.objects.shadows.moveTo('1');

				texture_canvas.objects.c_1.moveTo('2');
				texture_canvas.objects.c_2.moveTo('3');
				texture_canvas.objects.c_3.moveTo('4');
				texture_canvas.objects.c_4.moveTo('5');
				texture_canvas.objects.jersey_rect.moveTo(6);
				texture_canvas.objects.mesh.moveTo(7);

				console.log('Loaded!!!!');
			
			}

			texture_canvas.refresh_model();

		});

		canvas.on('mouse:up', function(options) {
		
			setTimeout(function(){

				texture_canvas.refresh_model();


			}, 50);

		});

		/// End Events

		

	});
