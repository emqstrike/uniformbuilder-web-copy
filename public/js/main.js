
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
		
		//window.UniformBuilder.camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );
		var v = 128;
		window.UniformBuilder.camera = new THREE.OrthographicCamera( width / - v, width / v, height / v, height / - v, 1, 500 );

		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true, precision: 'highp', antialias: true, });
		
		window.UniformBuilder.renderer.setSize(width, height);

		container.appendChild( window.UniformBuilder.renderer.domElement );

		var pointLight = new THREE.PointLight( 0x8e8e8e, 2.0, 100 );
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

			}

			requestAnimationFrame( render );
			window.UniformBuilder.renderer.render(window.UniformBuilder.scene, window.UniformBuilder.camera);

		};

		render();

		load_model('jersey','jersey','0xffffff', true);

	}

	//// Refactored Utils start here ... ////

	function load_model(file_name, name_of_obj, color, active){

	    var loader = new THREE.JSONLoader();
	    var filename = window.UniformBuilder.config.model_folder + file_name + ".json";

	    loader.load(filename, function(geometry){

			mesh = new THREE.Mesh(geometry);

			window.UniformBuilder.scene.add(mesh);

			window.UniformBuilder.models[name_of_obj] = mesh;

			if(active){

				set_active_part(name_of_obj);

			}

			if(name_of_obj === 'jersey'){ // HACK: Last to be loaded because of size

				reset_camera();

				// change_material('pants','7');
				// change_material('shirt','7');

				// change_material('emirates','9');

				//change_color('shirt','0xffffff')

				var render = function () {

					if(!window.free_rotate){

						move_camera_to();
						rotate_camera_to();

						window.UniformBuilder.models.jersey.rotation.y += window.UniformBuilder.rotateY;
												
						rotate_direction();

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

			// x: 0.3278637925403716,
			// y: 0.08435212366005695,
			// z: 4.289716248324682 ,

			x: -0.4028275089907045,
			y: 0.9640847194476025,
			z: 4.264606528028274,


		};

		window.camera_rotation_to = {

			// x: 0.048319539389081956,
			// y: 0.10349508215725498,
			// z: -0.004995758915489389,

			x: 0.141559000153777,
			y: -0.08080416368600245,
			z: -0.011502544678799109,

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


	}
		





