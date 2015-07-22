
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

	}	

	function load_model(file_name, name_of_obj){


	    var loader = new THREE.JSONLoader();
	    var filename = window.UniformBuilder.config.model_folder + file_name + ".json";

	    loader.load(filename, function(geometry){
        
			var material = new THREE.MeshPhongMaterial({ 
			    color: 0xf36c24, 
			    specular: 0x050505,
			    shininess: 100
			}); 

			mesh = new THREE.Mesh(geometry, material);

			var pointLight = new THREE.PointLight( 0xffffff, 1.1, 100 );
			pointLight.position.set(1,1,2);
			window.UniformBuilder.camera.add(pointLight);
			
			window.UniformBuilder.scene.add(mesh);
			window.UniformBuilder.scene.add(window.UniformBuilder.camera);

			window.UniformBuilder.models[name_of_obj] = mesh;

			window.UniformBuilder.camera.position.z = 8;

			var render = function () {

				requestAnimationFrame( render );
				window.UniformBuilder.renderer.render(window.UniformBuilder.scene, window.UniformBuilder.camera);

			};

			render();

	    });

	}
	

	function change_texture(name_of_obj, texture){

		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + texture + ".png" );
	
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(7,7);
	
		obj = window.UniformBuilder.models[name_of_obj];

		obj.material.color.setHex('0xead8c7');
		obj.material.map = texture;
        obj.material.needsUpdate = true;

        obj.geometry.computeTangents();

	}

	function change_material(name_of_obj, file_name){

		var material = new THREE.MeshPhongMaterial({ 
			    color: 0x8c2332, 
			    specular: 0x050505,
			    shininess: 100
			});

		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + file_name + ".png" );
	
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(7,7);
	
		obj = window.UniformBuilder.models[name_of_obj];

		//obj.material.color.setHex('0xead8c7');
		obj.material.map = texture;
        obj.material.needsUpdate = true;

        obj.geometry.computeTangents();

	}
	
	function change_color(name_of_obj, color){

		obj = window.UniformBuilder.models[name_of_obj];
		obj.material.color.setHex(color);

	}

