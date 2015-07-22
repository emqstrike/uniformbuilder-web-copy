
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

		load_model('shirt','shirt');
		load_model('piping','piping');

		load_model('pants','pants');
		load_model('buckle','buckle');
		load_model('belt','belt');

		window.addEventListener('resize', function() {

			container = document.getElementById('mycanvas');

			var width = $(container).width();
			var height = $(container).height();

			window.UniformBuilder.renderer.setSize(width, height);
			window.UniformBuilder.camera.aspect = width / height;
			window.UniformBuilder.camera.updateProjectionMatrix();

		});

		controls = new THREE.OrbitControls( window.UniformBuilder.camera, UniformBuilder.renderer.domElement );

	}


	//// Refactored Utils start here ... ////

	function init(){

		container = document.getElementById('mycanvas');
		
		var width = $(container).width();
		var height = $(container).height();

		window.UniformBuilder = {};

		window.UniformBuilder.camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );
		window.UniformBuilder.scene = new THREE.Scene();
		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true });;

		window.UniformBuilder.models = {};
		window.UniformBuilder.config = {
			
			'model_folder': '/models/',

		};

		window.UniformBuilder.scene.add(window.UniformBuilder.camera);
		window.camera_to = window.UniformBuilder.camera.position;

	}	

	function load_model(file_name, name_of_obj){


	    var loader = new THREE.JSONLoader();
	    var filename = window.UniformBuilder.config.model_folder + file_name + ".json";

	    loader.load(filename, function(geometry){
        
			var material = new THREE.MeshPhongMaterial({ 
			    color: 0xffffff, 
			    specular: 0x050505,
			    shininess: 100
			}); 

			mesh = new THREE.Mesh(geometry, material);

			var pointLight = new THREE.PointLight( 0x8e8e8e, 0.6, 100 );
			pointLight.position.set(1,1,2);
			window.UniformBuilder.camera.add(pointLight);
			
			window.UniformBuilder.scene.add(mesh);
			window.UniformBuilder.scene.add(window.UniformBuilder.camera);

			window.UniformBuilder.models[name_of_obj] = mesh;

			window.UniformBuilder.camera.position.z = 8;

			var render = function () {

				move_camera_to();

				requestAnimationFrame( render );
				window.UniformBuilder.renderer.render(window.UniformBuilder.scene, window.UniformBuilder.camera);

			};

			render();

	    });

	}

	

	// function change_texture(name_of_obj, texture){

	// 	var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + texture + ".png" );
	
	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.repeat.set(7,7);
	
	// 	obj = window.UniformBuilder.models[name_of_obj];

	// 	obj.material.color.setHex('0xead8c7');
	// 	obj.material.map = texture;
 //        obj.material.needsUpdate = true;

 //        obj.geometry.computeTangents();

	// }

	function change_material(name_of_obj, file_name){

		var material = new THREE.MeshPhongMaterial({ 
			    color: 0x8c2332, 
			    specular: 0x050505,
			    shininess: 100
			});

		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + file_name + ".png" );
	
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(3,7);
	
		obj = window.UniformBuilder.models[name_of_obj];

		//obj.material.color.setHex('0xead8c7');
		obj.material.map = texture;
        obj.material.needsUpdate = true;

        obj.geometry.computeTangents();

	}
	
	function change_color(name_of_obj, color){

		obj = window.UniformBuilder.models[name_of_obj];
		obj.material.color.setHex(color);

		move_camera(name_of_obj);

	}


	window.camera_to = {};

	function move_camera_to(){

		camera_to = window.camera_to;
		current_camera = window.UniformBuilder.camera.position;

		if(current_camera.y > camera_to.y){

			current_camera.y -= 0.1;

			if((current_camera.y - camera_to.y) < 1){
				current_camera.y = camera_to.y;
			}

		}

		if(current_camera.y < camera_to.y){

			current_camera.y += 0.1;

			if((camera_to.y - current_camera.y) < 1){
				current_camera.y = camera_to.y;
			}

		}

	
	}


	function move_camera(model){

		window.positions = {};

		window.positions.shirt = {
			x: 0.23340042927427215,
			y: 0.3450545022417699,
			z: 6.196171492444972,
		};

		window.positions.pants = {
			x: -0.15687211805926746,
			y: -10.13688031614105,
			z: 6.859,
		};

		window.positions.belt = {
			x: -0.30754931421786025,
			y: -5.993257421779742,
			z: 6.859,
		};

		pos = positions[model];

		window.camera_to = pos;

		// camera = window.UniformBuilder.camera;

		// camera.position.x = pos.x;
		// camera.position.y = pos.y;
		// camera.position.z = pos.z; 

	}

