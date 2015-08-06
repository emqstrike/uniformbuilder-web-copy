
	$( document ).ready(function() {

		render_scene();

		$("#myModal").draggable({
			handle: ".modal-header"
		});


	});

	function render_scene(){

		window.UniformBuilder = {};
		window.UniformBuilder.active_part = "";
		window.UniformBuilder.models = {};
		window.UniformBuilder.config = {
			
			'model_folder': '/models/baseball_2/',

		};

		window.free_rotate = false;
		window.UniformBuilder.materials_loaded = false;

		set_positions_and_rotations();

		container = document.getElementById('mycanvas');
		
		var width = $(container).width();
		var height = $(container).height();

		window.UniformBuilder.scene = new THREE.Scene();

		window.UniformBuilder.rotateY = 0;
		
		window.UniformBuilder.camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );
		var v = 128;
		//window.UniformBuilder.camera = new THREE.OrthographicCamera( width / - v, width / v, height / v, height / - v, 1, 500 );

		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true, precision: 'highp', antialias: true, });
		
		window.UniformBuilder.renderer.setSize(width, height);

		container.appendChild( window.UniformBuilder.renderer.domElement );

		var pointLight = new THREE.PointLight( 0x8e8e8e, 2.1, 100 );
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

		controls = new THREE.OrbitControls( window.UniformBuilder.camera, UniformBuilder.renderer.domElement );

		var render = function () {

			if(!window.free_rotate){

				move_camera_to();
				rotate_camera_to();

				rotate_direction();

			}

			requestAnimationFrame(render);
			window.UniformBuilder.renderer.render(window.UniformBuilder.scene, window.UniformBuilder.camera);

		};

		render();

	}

	//// Refactored Utils start here ... ////

	function load_model(file_name, name_of_obj, material, active){

	    var loader = new THREE.JSONLoader();
	    var filename = window.UniformBuilder.config.model_folder + file_name + ".json";

	    loader.load(filename, function(geometry){

			mesh = new THREE.Mesh(geometry, material);

			window.UniformBuilder.scene.add(mesh);

			window.UniformBuilder.models[name_of_obj] = mesh;

			if(active){

				set_active_part(name_of_obj);

			}

	    });

	}

	window.camera_position_to = {};
	window.camera_rotation_to = {};

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
			_increment = 0.3;
		}
		else if(delta < 4 && delta > 2){
			_increment = 0.2;
		}
		else {
			_increment = 0.1;	
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

		// var _model = model;

		// set_active_part(model);

		// window.camera_position_to = positions[_model];
		// window.camera_rotation_to = rotations[_model];
		reset_camera();

	}

	function reset_camera(){

		if(window.free_rotate){

			toggle_free_rotate();

		}

		window.camera_position_to = {

			x: -0.4048810230299358,
			y: 2.196751850044594,
			z: 3.3721770602088754,

		};

		window.camera_rotation_to = {

			x: -0.12255567653446389,
			y: 0.021384855805949884,
			z: 0.0026338294655909133,

		};


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

	function set_positions_and_rotations(){

		window.positions = {};
		window.rotations = {};

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

		window.positions.jersey = {
			x:  -0.4366205684461612,
			y: 1.9384160512919781,
			z: 2.3340333701070572,
		};

		window.rotations.jersey = {
			x: -0.09518675326179131,
			y: -0.0277641656671205,
			z: -0.0026504447817013417,
		};


		window.positions.pants = {
			x: -1.0784808740311191,
			y: -1.9630470142566372,
			z: 2.3445335728414123,
		};


		window.rotations.pants = {
			x: -0.27837498206610445,
			y: -0.38845994767522,
			z: -0.10782914562637556,
		};

	
		window.positions.pants_piping = {
			x: -1.9476911080490493,
			y: -2.0712394448113005,
			z: 1.7894626068969837,
		};

		window.rotations.pants_piping = {
			x: -0.3241990092875424,
			y: -0.752888555571492,
			z: -0.22585765366064456,
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


		window.positions.sleeve = {
			x: -0.019886818094479564,
			y: 1.5876441529922463,
			z: 1.4709376664252658,
		};

		window.rotations.sleeve = {
			x: -0.2103529208875758,
			y: -0.008403948711036814,
			z: -0.0017943157731050569,
		};


		window.positions.sleeve_piping = {
			x: -0.7354262735028584,
			y: 1.5890866805637862,
			z: 1.2934493322382592,
		};

		window.rotations.sleeve_piping = {
			x: -0.22126663472710814,
			y: -0.1367994577002023,
			z: -0.030667498294651083,
		};


		window.positions.shirt_mid_piping = {
			x:  -0.6753447124994271,
			y: 2.1349975547370033,
			z: 0.9239430716975422,
		};

		window.rotations.shirt_mid_piping = {
			x: -0.5939690872423217,
			y: -0.2398772407528139,
			z: -0.1590888170236442,
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

		window.positions.emirates = {
			x: 0,
			y: 0,
			z: 0,
		};

		window.rotations.emirates = {
			x: 0,
			y: 0,
			z: 0,
		};

	}
		





