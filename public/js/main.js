
	$( document ).ready(function() {

		render_scene();

	});

	function change_color(color){

		window.cube.material.color.setHex(color);

	}

	function change_piping_color(color){

		window.piping.material.color.setHex(color);

	}

	function change_material(material) {
		
		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + material + ".png" );
	
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(7,7);
	
		window.cube.material.color.setHex('0xead8c7');
		window.material.map = texture;
        window.material.needsUpdate = true;

        window.cube.geometry.computeTangents();

	}

	function render_scene(){

		container = document.getElementById('mycanvas');
		
		var width = $(container).width();
		var height = $(container).height();

		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(width, height);

		container.appendChild( renderer.domElement );

	    var loader = new THREE.JSONLoader();
	   
	    loader.load( "/models/shirt_v3.json", function(geometry){
        
	   	    var material = new THREE.MeshBasicMaterial( { color: 0x8c2332 } );
	   	   	
	   	   	mesh = new THREE.Mesh(geometry, material);
	        scene.add(mesh);

			window.material = material;
			window.cube = mesh;
			window.camera = camera;
			window.renderer = renderer;

			camera.position.z = 8;

			var render = function () {

				requestAnimationFrame( render );
				//window.cube.rotation.y += 0.02;
				renderer.render(scene, camera);

			};

			render();

	    });

	    loader.load( "/models/piping.json", function(geometry){
        
	   	    var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	   	   	
	   	   	mesh = new THREE.Mesh(geometry, material);
	        scene.add(mesh);

			window.material_piping = material;
			window.piping = mesh;
			window.camera = camera;

			camera.position.z = 8;

			var render = function () {

				requestAnimationFrame( render );
				// window.cube.rotation.y += 0.02;
				renderer.render(scene, camera);

			};

			render();

			controls = new THREE.OrbitControls( camera, renderer.domElement );


	    });

		/////
		// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		// var material = new THREE.MeshBasicMaterial( { color: 0x8c2332 } );
		// var cube = new THREE.Mesh( geometry, material );
		// scene.add( cube );
		// ////

		// window.material = material;
		// window.cube = cube;

		// Create an event listener that resizes the renderer with the browser window.
		
		window.addEventListener('resize', function() {

			container = document.getElementById('mycanvas');

			var width = $(container).width();
			var height = $(container).height();

			window.renderer.setSize(width, height);
			window.camera.aspect = width / height;
			camera.updateProjectionMatrix();

		});





	}

