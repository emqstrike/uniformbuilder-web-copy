
	$(document).ready(function() {


		/// Properties and Vars

		window.initialized = false;

		window.path_groups = {};

		window.texture_canvas = {};
		window.texture_canvas.texture_style_folder = '/images/materials/style_1/';
		window.texture_canvas['objects'] = {};
		window.texture_canvas['canvas'] = new fabric.Canvas('texture_canvas');

		window.texture_canvas['width'] = 1600;
		window.texture_canvas['height'] = 1598;
		
		var canvas = window.texture_canvas['canvas'];

		// reset_camera();

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

			// reset_camera();

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
				bumpScale: 0.030,
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

				
		}

		window.path_groups = {};


		texture_canvas.change_texture_svg = function (object_name, base_image)	{

			fabric.util.loadImage(window.texture_canvas.texture_style_folder + base_image, function (img) {
			    	
		    	object = new fabric.Image(img);

				object.set({
					top: 0,
			        left: 0,
			        width: window.texture_canvas.width,
			        height: window.texture_canvas.height,
			        angle: 0,
			        opacity: 1,	
				})


				window.texture_canvas.objects[object_name] = object;

				canvas = window.texture_canvas.canvas;
				canvas.add(object);	
				canvas.renderAll.bind(canvas);
								    
			});



		}

		texture_canvas.change_texture = function (object_name, base_image)	{

			fabric.Image.fromURL(window.texture_canvas.texture_style_folder + base_image, function(oImg) {

				oImg.left = 0;
				oImg.top = 0;
				oImg.lockMovementX = true;
				oImg.lockMovementY = true;

				window.texture_canvas.objects[object_name] = oImg;
	  		
				if(object_name === "shadows"){
					window.texture_canvas.objects.shadows.opacity = 0.5;
				}

				if(object_name === "pipings"){
					oImg.fill = "#ffffff";
				}

				texture_canvas.canvas.add(oImg);

			});

		}

		texture_canvas.change_color = function (obj,color_value){

			selectedObject = window.texture_canvas.objects[obj];

			if(obj === 'jersey'){

				texture_canvas.objects.jersey_rect.opacity = 0.7;

				texture_canvas.objects.jersey_rect.fill = color_value;


				if(typeof(texture_canvas.objects.base) !== 'undefined'){

					texture_canvas.objects.base.opacity = 0.0;

				}

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

		texture_canvas.exists = function(obj){

			return typeof(texture_canvas.objects[obj]) !== 'undefined';

		}

		texture_canvas.path_change_color = function (obj,color_value,layer){


			texture_canvas.objects.jersey_rect.opacity = 0.0;

			if(typeof(texture_canvas.objects.base) !== 'undefined'){

				texture_canvas.objects.base.opacity = 0.0;

			}

			//texture_canvas.objects.jersey_rect.fill = color_value;

			if( obj === 'c_1' || obj === 'c_2' ||  obj === 'c_3' || obj === 'c_4' ){

				texture_canvas.objects.c_1.opacity = 1;
				texture_canvas.objects.c_2.opacity = 1;
				texture_canvas.objects.c_3.opacity = 1;
				texture_canvas.objects.c_4.opacity = 1;

			}

			if( obj === 'pipings'){

				if(texture_canvas.exists('number')){
					texture_canvas.objects.number.fill = color_value;	
				}

				if(texture_canvas.exists('numberback')){
					texture_canvas.objects.numberback.stroke = color_value;	
				}

				if(texture_canvas.exists('name')){
					texture_canvas.objects.name.fill = color_value;	
				}

				if(texture_canvas.exists('teamname')){
					texture_canvas.objects.teamname.stroke = color_value;	
				}

				texture_canvas.objects.pipings.fill = color_value;

			}

			var filter = new fabric.Image.filters.Tint({

			  color: color_value,
			  opacity: 1

			});

			texture_canvas.objects[obj].filters.push(filter);

			canvas = window.texture_canvas.canvas;
			texture_canvas.objects[obj].applyFilters(canvas.renderAll.bind(canvas));

			setTimeout(function(){

					texture_canvas.refresh_model();

			}, 50);


		}

		texture_canvas.load_logo = function (){

			var img = new Image();
			img.src = $('div.dz-image > img').attr('src');

			img.onload = function () {
			    
                var imgbase64 = new fabric.Image(img, {
	                scaleX: 0.5,
	                scaleY: 0.5,
	                top: 857,
	                left: 628,
	                angle: 82,
	        	})

				window.texture_canvas.objects['logo'] = imgbase64;

				canvas = window.texture_canvas.canvas;
	        	canvas.add(imgbase64);
				canvas.renderAll.bind(canvas);

   			}

   			setTimeout(function(){
   				
   				texture_canvas.objects.logo.moveTo(20);
				texture_canvas.refresh_model();

			}, 50);

		}

		texture_canvas.load_number = function (){

			var txt = $('#txtNumber').val();
			var piping_fill = texture_canvas.objects.pipings.fill;

			var number = new fabric.Text(txt, { 
			  fontFamily: 'arial black',
			  fontSize: 70,
			  left: 882, 
			  top: 1097,
			  angle: 2,
			  fill: piping_fill,
			})

			var numberback = new fabric.Text(txt, { 
			  fontFamily: 'arial black',
			  fontSize: 140,
			  left: 949, 
			  top: 759,
			  angle: 180,
			  stroke: piping_fill,
			  fill: "#ffffff",
			  strokeWidth: 2,
			})

			if(typeof(texture_canvas.objects.number) === "object"){
				texture_canvas.canvas.remove(texture_canvas.objects.number);
			}

			if(typeof(texture_canvas.objects.numberback) === "object"){
				texture_canvas.canvas.remove(texture_canvas.objects.numberback);
			}

			window.texture_canvas.objects['number'] = number;
			window.texture_canvas.objects['numberback'] = numberback;

			canvas = window.texture_canvas.canvas;

			setTimeout(function(){
   				
   				canvas.add(number);	

			}, 50);

			setTimeout(function(){
   				
   				canvas.add(numberback);

			}, 50);        	
        	
   			setTimeout(function(){
   				
   				canvas.renderAll.bind(canvas);
				texture_canvas.refresh_model();

			}, 50);

		}

		texture_canvas.load_name = function (){

			var txt = $('#txtName').val();
			var txtteam = $('#txtTeamName').val();

			var piping_fill = texture_canvas.objects.pipings.fill;

			var adjustment = (10 - txt.length) * 20;
			var adjustment_team = (9 - txtteam.length) * 38;

			var name = new fabric.Text(txt, { 
			  fontFamily: 'arial black',
			  fontSize: 30,
			  left: 950 - (adjustment / 2), 
			  top: 779,
			  angle: 180,
			  textAlign: 'center',
			  fill: piping_fill,
			})

			var teamname = new fabric.Text(txtteam, {
			  fontFamily: 'arial black',
			  fontSize: 50,
			  left: 690 + (adjustment_team / 2),
			  top: 1012,
			  angle: 3,
			  textAlign: 'center',
			  fontStyle: 'italic',
			  fill: "#ffffff",
			  strokeWidth: 2,
			  stroke: piping_fill,
			})

			if(typeof(texture_canvas.objects.name) === "object"){
				texture_canvas.canvas.remove(texture_canvas.objects.name);
			}

			if(typeof(texture_canvas.objects.teamname) === "object"){
				texture_canvas.canvas.remove(texture_canvas.objects.teamname);
			}

			window.texture_canvas.objects['name'] = name;
			window.texture_canvas.objects['teamname'] = teamname;

			canvas = window.texture_canvas.canvas;


			setTimeout(function(){
   				
   				canvas.add(name);

			}, 50);


			setTimeout(function(){
   				
   				canvas.add(teamname);

			}, 50);    
        	
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
		        width: window.texture_canvas.width,
		        height: window.texture_canvas.height,
		        angle: 0,
		        fill: '#ffffff',
		        opacity: 0,

		});

		window.texture_canvas.canvas.add($rect);

		texture_canvas.objects['jersey_rect'] = $rect;

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_1', 'c_1.png');
		}, 50);

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_2', 'c_2.png');
		}, 150);

		setTimeout(function(){
			texture_canvas.change_texture_svg('c_3', 'c_3.png');
		}, 200);

		setTimeout(function(){		
			texture_canvas.change_texture_svg('c_4', 'c_4.png');
		}, 250);

		setTimeout(function(){
			texture_canvas.change_texture('shadows', 'shadows_white.png');
		}, 50);

		setTimeout(function(){
			texture_canvas.change_texture('mesh', 'mesh.png');
		}, 50);

		setTimeout(function(){
			texture_canvas.change_texture('pipings', 'pipings.png');
		}, 50);
		

		texture_canvas.canvas.setBackgroundColor('rgba(183,176,159,255)', texture_canvas.canvas.renderAll.bind(canvas));

		/// Events

		canvas.on('object:added', function(options) {
			// 2

			var base_loaded = typeof(texture_canvas.objects.base) !== 'undefined';

			var c_1_loaded = typeof(texture_canvas.objects.c_1) !== 'undefined';
			var c_2_loaded = typeof(texture_canvas.objects.c_2) !== 'undefined';
			var c_3_loaded = typeof(texture_canvas.objects.c_3) !== 'undefined';
			var c_4_loaded = typeof(texture_canvas.objects.c_4) !== 'undefined';
			var shadows_loaded = typeof(texture_canvas.objects.shadows) !== 'undefined';
			var mesh_loaded = typeof(texture_canvas.objects.mesh) !== 'undefined';

			var number_loaded = typeof(texture_canvas.objects.number) !== 'undefined';
			var numberback_loaded = typeof(texture_canvas.objects.numberback) !== 'undefined';
			var name_loaded = typeof(texture_canvas.objects.name) !== 'undefined';
			var teamname_loaded = typeof(texture_canvas.objects.teamname) !== 'undefined';


			var pipings_loaded = typeof(texture_canvas.objects.pipings) !== 'undefined';

			var jersey_rect_loaded = typeof(texture_canvas.objects.jersey_rect) !== 'undefined';
		
			if(c_1_loaded && c_2_loaded && c_3_loaded && c_4_loaded && shadows_loaded && jersey_rect_loaded && mesh_loaded && pipings_loaded){

				texture_canvas.objects.c_1.moveTo('5');
				texture_canvas.objects.c_2.moveTo('4');
				texture_canvas.objects.c_3.moveTo('3');
				texture_canvas.objects.c_4.moveTo('2');

				texture_canvas.objects.jersey_rect.moveTo('6');
				texture_canvas.objects.shadows.moveTo('7');
				texture_canvas.objects.mesh.moveTo('15');
				texture_canvas.objects.pipings.moveTo('13');

				texture_canvas.refresh_model();

			}

			if(name_loaded){

				texture_canvas.objects.name.moveTo('11');
				texture_canvas.objects.mesh.moveTo('15');

			}

			if(teamname_loaded){

				texture_canvas.objects.teamname.moveTo('14');
				texture_canvas.objects.mesh.moveTo('15');

			}

			if(number_loaded){

				texture_canvas.objects.number.moveTo('10');
				texture_canvas.objects.mesh.moveTo('15');
				
			}

			if(numberback_loaded){

				texture_canvas.objects.numberback.moveTo('9');
				texture_canvas.objects.mesh.moveTo('15');

			}

		});

		canvas.on('mouse:up', function(options) {
		
			setTimeout(function(){

				texture_canvas.refresh_model();

			}, 50);

		});

		/// End Events

		

	});
