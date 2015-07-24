
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

		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true });
		window.UniformBuilder.renderer.setSize(width, height);

		container.appendChild( window.UniformBuilder.renderer.domElement );

		load_model('pants','pants','0x8a8c8c', false);
		load_model('shirt','shirt','0x8c2332', true);
		load_model('buttons','buttons','0x8a8c8c', false);
		load_model('belt','belt','0x000000', false);
		load_model('pants_piping','pants_piping','0x1a468d', false);
		load_model('panels_side','panels_side','0x1a468d', false);
		load_model('panels_top','panels_top','0x1a468d', false);

		load_model('shirt_textured','shirt_textured','0x8c2332', true);

		// load_model('cube','cube','0x1a468d', false);


		var pointLight = new THREE.PointLight( 0x8e8e8e, 2.3, 100 );
		pointLight.position.set(1,1,2);
		window.UniformBuilder.camera.add(pointLight);
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

		// change_color('shirt', '0x8c2332');

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
			
			'model_folder': '/models/florida/',

		};

		window.UniformBuilder.scene.add(window.UniformBuilder.camera);
		
	}	



	function load_model(file_name, name_of_obj, color, active){

	    var loader = new THREE.JSONLoader();
	    var filename = window.UniformBuilder.config.model_folder + file_name + ".json";

	    loader.load(filename, function(geometry){
        
			var material = new THREE.MeshPhongMaterial({ 

			    color: 0xffffff, 
			    specular: 0x050505,
			    shininess: 100

			});

			mesh = new THREE.Mesh(geometry, material);

			window.UniformBuilder.scene.add(mesh);

			window.UniformBuilder.models[name_of_obj] = mesh;
			change_color(name_of_obj, color);

			if(active){

				set_active_part(name_of_obj);

			}	

			if(name_of_obj === 'shirt'){ // HACK: Last to beloaded because of size

				reset_camera();

				var render = function () {

					move_camera_to();
					rotate_camera_to();
					
					// UniformBuilder.camera.lookAt(UniformBuilder.active_part.position);

					requestAnimationFrame( render );
					window.UniformBuilder.renderer.render(window.UniformBuilder.scene, window.UniformBuilder.camera);

				};

				render();

			}

			if(name_of_obj == 'shirt_textured'){

				mesh.position.y = -0.5;
				mesh.position.x =  0;
				mesh.position.z =  1;


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


	function change_material(name_of_obj, file_name){

		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + file_name + ".png" );
	
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1,1);

		var texture_color = '0x8c2332';

		if(name_of_obj = 'shirt_textured'){

			color = '0xf4dfcb';

		}

		var material = new THREE.MeshPhongMaterial({ 
			    texture_color: 0x8c2332, 
			    specular: 0x050505,
			    shininess: 100,
			    map: texture,
			});
	
		obj = window.UniformBuilder.models[name_of_obj];

		//obj.material.color.setHex('0xead8c7');
	
		obj.material = material;
        obj.material.needsUpdate = true;
        obj.geometry.computeTangents();

        //move_camera(name_of_obj);

	}
	
	function change_color(name_of_obj, color){

		obj = window.UniformBuilder.models[name_of_obj];
		obj.material.color.setHex(color);

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

			x: -1.3008674774636555,
			y: -2.0833214929138437,
			z: 3.7500968261751804,

		};

		window.camera_rotation_to = {

			x: -0.08483824052434566,
			y: -0.2711062762370936,
			z: -0.02277019296841999,

		};

	}

	function set_positions_and_rotations(){

		window.positions = {};
		window.rotations = {};

		window.positions.shirt = {
			x:  -0.19976456030689105,
			y: 0.1324062887268571,
			z: 2.2922348711520897,
		};

		window.rotations.shirt = {
			x: -0.27600869062030725,
			y: -0.03377405743696692,
			z: -0.009563983486980124,
		};


		window.positions.pants = {
			x: 0.52,
			y: -3.19,
			z: 2.71,
		};


		window.rotations.pants = {
			x: -0.205,
			y: 0.186,
			z: 0.038,
		};

	
		window.positions.pants_piping = {
			x: -2.6781975301699212,
			y: -3.8581404307616722,
			z: 1.7699339971580332,
		};

		window.rotations.pants_piping = {
			x: -0.07110669014362422,
			y: -0.9581410287121326,
			z: -0.058206511204333414,
		};


		window.positions.belt = {
			x: -0.36,
			y: -2.08,
			z: 1.43,
		};

		window.rotations.belt = {
			x: 0.010,
			y: -0.14,
			z: 0.001,
		};


		window.positions.panels_side = {
			x: -1.8810692560580533,
			y: -0.6364223075279003,
			z: 1.6756919591980666,
		};

		window.rotations.panels_side = {
			x: -0.050627832542014854,
			y: -0.6312177576830472,
			z: -0.02989356185828975,
		};


		window.positions.panels_top = {
			x:  -1.0909956098221447,
			y: 1.078217060622181,
			z: 1.6947644637862527,
		};

		window.rotations.panels_top = {
			x:  -0.6235809578529675,
			y: -0.29637395286224966,
			z: -0.2070716989645836,
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




