
	$( document ).ready(function() {

		render_scene();

	});

	function render_scene(){

		init();

		container = document.getElementById('mycanvas');
		
		var width = $(container).width();
		var height = $(container).height();

		window.UniformBuilder.scene = new THREE.Scene();
		window.UniformBuilder.camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );

		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true, precision: 'highp', antialias: true, });
		window.UniformBuilder.renderer.setSize(width, height);

		container.appendChild( window.UniformBuilder.renderer.domElement );

		load_model('pants','pants','0xffffff', false);
		load_model('shirt','shirt','0xffffff', true);
		load_model('buttons','buttons','0x000000', false);
		load_model('belt','belt','0x000000', false);
		load_model('pants_piping','pants_piping','0x8c2332', false);
		load_model('panels_side','panels_side','0x8c2332', false);
		load_model('panels_top','panels_top','0x8c2332', false);

	//	load_model('shirt_textured','shirt_textured','0x8c2332', true);

		// load_model('cube','cube','0x1a468d', false);


		var pointLight = new THREE.PointLight( 0x8e8e8e, 2.3, 100 );
		pointLight.position.set(1,1,2);
		window.UniformBuilder.camera.add(pointLight);

		// var ambientLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.2 );
		// //ambientLight.position.set(1,1,2);
		// window.UniformBuilder.camera.add(ambientLight);

		window.UniformBuilder.scene.add(window.UniformBuilder.camera);

		window.addEventListener('resize', function() {

			container = document.getElementById('mycanvas');

			var width = $(container).width();
			var height = $(container).height();

			window.UniformBuilder.renderer.setSize(width, height);
			window.UniformBuilder.camera.aspect = width / height;
			window.UniformBuilder.camera.updateProjectionMatrix();

		});

		window.camera_position_to = {

			x: -1.4642782522135471,
			y: -2.1041140685793325,
			z: 4.9646831419254545,

		};

		window.camera_rotation_to = {

			x: -0.08385543601649652,
			y: -0.2756406415063345,
			z: -0.022872038615562237,

		};

		//schange_color('shirt', '0x8c2332');

		controls = new THREE.OrbitControls( window.UniformBuilder.camera, UniformBuilder.renderer.domElement );

	}


	//// Refactored Utils start here ... ////

	function init(){

		set_positions_and_rotations();

		container = document.getElementById('mycanvas');
		
		var width = $(container).width();
		var height = $(container).height();

		window.UniformBuilder = {};

		window.UniformBuilder.active_part = "";

		window.UniformBuilder.camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );
		window.UniformBuilder.scene = new THREE.Scene();
		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true });;

		window.UniformBuilder.models = {};
		window.UniformBuilder.config = {
			
			'model_folder': '/models/florida_2/',

		};

		window.UniformBuilder.scene.add(window.UniformBuilder.camera);

		window.free_rotate = false;
		
	}	

	function toggle_free_rotate(){

		window.free_rotate = !window.free_rotate;

			if(window.free_rotate){

				$('#btn_free_form').addClass('btn-danger');

			}
			else{

				$('#btn_free_form').removeClass('btn-danger');
			}

	}

	function load_model(file_name, name_of_obj, color, active){

	    var loader = new THREE.JSONLoader();
	    var filename = window.UniformBuilder.config.model_folder + file_name + ".json";

	    loader.load(filename, function(geometry){
        
			var material = new THREE.MeshPhongMaterial({ 

			    color: 0xffffff, 
			    specular: 0x000000,
			    shininess: 30,
			    side: THREE.DoubleSide,

			});

			mesh = new THREE.Mesh(geometry, material);

			window.UniformBuilder.scene.add(mesh);

			window.UniformBuilder.models[name_of_obj] = mesh;
			change_color(name_of_obj, color);

			if(active){

				set_active_part(name_of_obj);

			}	

			if(name_of_obj === 'pants'){ // HACK: Last to beloaded because of size

				reset_camera();

				// change_material('pants','7');
				// change_material('shirt','7');

				var render = function () {

					if(!window.free_rotate){

						move_camera_to();
						rotate_camera_to();

					}
					
					// UniformBuilder.camera.lookAt(UniformBuilder.active_part.position);

					requestAnimationFrame( render );
					window.UniformBuilder.renderer.render(window.UniformBuilder.scene, window.UniformBuilder.camera);

				};

				render();

			}
			console.log(name_of_obj);

	    });

	}

	window.camera_position_to = {};
	window.camera_rotation_to = {};


	function apply_second_layer(name_of_obj, file_name){

		//////////

		var vertShader = document.getElementById('vertex_shh').innerHTML;
		var fragShader = document.getElementById('fragment_shh').innerHTML;

		var attributes = {}; // custom attributes

		var uniforms = {    // custom uniforms (your textures)

		  tOne: { type: "t", value: THREE.ImageUtils.loadTexture( "/images/materials/test_number.png" ) },
		  tSec: { type: "t", value: THREE.ImageUtils.loadTexture( "/images/materials/material_4.png" ) }

		};

		var material_shh = new THREE.ShaderMaterial({

		  uniforms: uniforms,
		  attributes: attributes,
		  vertexShader: vertShader,
		  fragmentShader: fragShader

		});


		obj = window.UniformBuilder.models[name_of_obj];

		//obj.material.color.setHex('0xead8c7');
	
		obj.material = material_shh;
        obj.material.needsUpdate = true;
        obj.geometry.computeTangents();

        //move_camera(name_of_obj);

		// //////////

		// var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + file_name + ".png" );
	
		// texture.wrapS = THREE.RepeatWrapping;
		// texture.wrapT = THREE.RepeatWrapping;
		// texture.repeat.set(1,1);

		// var texture_color = '0x8c2332';

		// if(name_of_obj = 'shirt_textured'){

		// 	color = '0xf4dfcb';

		// }

		// var material = new THREE.MeshPhongMaterial({ 
		// 	    texture_color: 0x8c2332, 
		// 	    specular: 0x050505,
		// 	    shininess: 100,
		// 	    map: texture,
		// 	});
	
		// obj = window.UniformBuilder.models[name_of_obj];

		// //obj.material.color.setHex('0xead8c7');
	
		// obj.material = material;
  //       obj.material.needsUpdate = true;
  //       obj.geometry.computeTangents();

  //       //move_camera(name_of_obj);

	}


	function change_material(target, textureImage, bumpMapImage){

		THREE.ImageUtils.crossOrigin = '';
		var texture = THREE.ImageUtils.loadTexture(textureImage);
		var bmap =  THREE.ImageUtils.loadTexture(bumpMapImage, {}, function(){});

		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		texture.minFilter = THREE.LinearFilter;
		texture.repeat.set(1,1);


		// bmap.wrapS = THREE.RepeatWrapping;
		// bmap.wrapT = THREE.RepeatWrapping;
		// bmap.wrapS = THREE.ClampToEdgeWrapping;
		// bmap.wrapT = THREE.ClampToEdgeWrapping;
		bmap.minFilter = THREE.LinearFilter;
		// bmap.repeat.set(1,1);


		var texture_color = '0x8c2332';

		if(target === 'shirt_textured'){

			color = '0xf4dfcb';

		}


		var material = new THREE.MeshPhongMaterial({ 
			    texture_color: 0x8c2332, 
			    specular: 0x050505,
			    shininess: 100,
			    map: texture,
			    bumpMap: bmap,
			    bumpScale: 0.020,
			    side: THREE.DoubleSide,
			});
	
		obj = window.UniformBuilder.models[target];

		//obj.material.color.setHex('0xead8c7');
	
		obj.material = material;
        obj.material.needsUpdate = true;
        obj.geometry.computeTangents();

        move_camera(target);

	}
	
	function change_color(name_of_obj, color){

		obj = window.UniformBuilder.models[name_of_obj];
		obj.material.color.setHex(color);

		if(name_of_obj === "panels_side"){

			change_color('buttons',color);
		}

		move_camera(name_of_obj);

	}

	function rotate_camera_to(){

		rotate_camera_axis('x');
		rotate_camera_axis('y');
		rotate_camera_axis('z');

	}

	function rotate_camera_axis(axis){

		camera_to = window.camera_rotation_to;
		current_camera = window.UniformBuilder.camera.rotation;

		var _increment = 0;

		var delta = Math.abs(current_camera[axis] - camera_to['axis']);
		
		// Basic Easing
	
		if(delta > 4){
			_increment = 0.03;
		}
		else if(delta < 4 && delta > 2){
			_increment = 0.02;
		}
		else {
			_increment = 0.01;	
		}

		if(current_camera[axis] > camera_to[axis]){

			current_camera[axis] -= _increment;

			if((current_camera[axis] - camera_to[axis]) < 1){
				current_camera[axis] = camera_to[axis];
			}

		}

		if(current_camera[axis] < camera_to[axis]){

			current_camera[axis] += _increment;

			if((camera_to[axis] - current_camera[axis]) < 1){
				current_camera[axis] = camera_to[axis];
			}

		}

	}

	function move_camera_to(){

		move_camera_axis('x');
		move_camera_axis('y');
		move_camera_axis('z');

	}

	function move_camera_axis(axis){

		camera_to = window.camera_position_to;

		current_camera = window.UniformBuilder.camera.position;

		var _increment = 0;

		var delta = Math.abs(current_camera[axis] - camera_to['axis']);
		
		// Basic Easing
	
		if(delta > 4){
			_increment = 0.5;
		}
		else if(delta < 4 && delta > 2){
			_increment = 0.4;
		}
		else {
			_increment = 0.3;	
		}

		if(current_camera[axis] > camera_to[axis]){

			current_camera[axis] -= _increment;

			if((current_camera[axis] - camera_to[axis]) < 1){
				current_camera[axis] = camera_to[axis];
			}

		}

		if(current_camera[axis] < camera_to[axis]){

			current_camera[axis] += _increment;

			if((camera_to[axis] - current_camera[axis]) < 1){
				current_camera[axis] = camera_to[axis];
			}

		}

	}


	function set_active_part(model){

		window.UniformBuilder.active_part = window.UniformBuilder.models[model];

	}

	function move_camera(model){

		var _model = model;

		set_active_part(model);

		window.camera_position_to = positions[_model];
		window.camera_rotation_to = rotations[_model];

	}

	function reset_camera(){

		window.camera_position_to = {

			x: -0.7428245379145085,
			y: 1.6595636550994113,
			z: 2.291040906395211,

		};

		window.camera_rotation_to = {

			x: -0.28979214996541103,
			y: -0.21640415332749163,
			z: -0.06393903248650991,

		};

	}

	function set_positions_and_rotations(){

		window.positions = {};
		window.rotations = {};

		window.positions.shirt = {
			x:  -0.01921775697642224,
			y: 1.3326683797695802,
			z: 2.3131022224243365,
		};

		window.rotations.shirt = {
			x: -0.21213326177654301,
			y: -7.146840492458159e-15,
			z: -1.5392410831238418e-15,
		};


		window.positions.pants = {
			x: -0.05344707952736038,
			y: -3.142688276208788,
			z: 2.789509817516254,
		};


		window.rotations.pants = {
			x: 0,
			y: 0,
			z: 0,
		};

	
		window.positions.pants_piping = {
			x: -1.6937581521805667,
			y: -1.2923868443648558,
			z: 1.8739121482908139,
		};

		window.rotations.pants_piping = {
			x: -0.5339865098805464,
			y: -0.5973254606793372,
			z: -0.3210526002448725,
		};


		window.positions.belt = {
			x: -0.03179201981709706,
			y: -1.1554708238701281,
			z: 1.6699244085908918,
		};

		window.rotations.belt = {
			x: -0.070719615541104,
			y: -0.015513570194327487,
			z: -0.001098901824182265,
		};


		window.positions.panels_side = {
			x: -1.6891620626184387,
			y: 1.4725625731680165,
			z: 2.039780418307582,
		};

		window.rotations.panels_side = {
			x: -0.23946047245251106,
			y: -0.5623024998700163,
			z: -0.12943465550489144,
		};


		window.positions.panels_top = {
			x:  -0.5719156773987263,
			y: 3.5792693270092064,
			z: 0.5059831012518798,
		};

		window.rotations.panels_top = {
			x: -1.118396683806076,
			y: -0.22078297948124712,
			z: -0.42334240666926354,
		};

		window.positions.buttons = {
			x: 0,
			y: 0,
			z: 0,
		};

		window.rotations.buttons = {
			x: 0,
			y: 0,
			z: 0,
		};

	}




