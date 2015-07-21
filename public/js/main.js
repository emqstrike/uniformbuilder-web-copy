
	$( document ).ready(function() {

		render_scene();

	});

	function change_color(color){


		window.cube.material.color.setHex(color);


	}

	function change_material(material) {
		
		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + material + ".png" );
		
		window.material.map = texture;
        window.material.needsUpdate = true;

        window.cube.geometry.computeTangents();


	}


	function render_scene(){

		container = document.getElementById('mycanvas');
		//document.body.appendChild(container);

		var width = $(container).width();
		var height = $(container).height();

		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(width, height);

		container.appendChild( renderer.domElement );

	    var loader = new THREE.JSONLoader();
	   
	    loader.load( "/models/shirt_v2.json", function(geometry){
        
       	    var material = new THREE.MeshLambertMaterial({color: 0x55B663});



	        mesh = new THREE.Mesh(geometry, material);
	        scene.add(mesh);

			window.material = material;
			window.cube = mesh;

			camera.position.z = 8;

			var render = function () {

				requestAnimationFrame( render );

				//cube.rotation.x += 0.1;
				window.cube.rotation.y += 0.05;

				renderer.render(scene, camera);

			};

		render();

	    });


  //       /////
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

		      renderer.setSize(width, height);
		      camera.aspect = width / height;
		      camera.updateProjectionMatrix();

  		  });



	}