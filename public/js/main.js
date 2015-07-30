
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
		//window.UniformBuilder.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

		window.UniformBuilder.renderer = new THREE.WebGLRenderer({ alpha: true, precision: 'highp', antialias: true, });
		window.UniformBuilder.renderer.setSize(width, height);

		container.appendChild( window.UniformBuilder.renderer.domElement );

		load_model('jersey','jersey','0xffffff', true);
		// load_model('shirt_textured','shirt_textured','0xffffff', true);
		// load_model('sleeve','sleeve','0x8c2332', true);
		// load_model('shirt_mid_piping','shirt_mid_piping','0x8c2332', true);
		// load_model('sleeve_piping','sleeve_piping','0xffffff', false);
		// load_model('pants','pants','0xffffff', false);
		// load_model('pants_piping','pants_piping','0x8c2332', false);
		// load_model('belt','belt','0x000000', false);
		// load_model('buttons','buttons','0x000000', false);
		
		// load_model('emirates','emirates','0x8c2332', false);
		// load_model('shirt_textured','shirt_textured','0x8c2332', true);
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
			
			'model_folder': '/models/baseball_2/',

		};

		window.UniformBuilder.scene.add(window.UniformBuilder.camera);

		window.free_rotate = false;
		
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

			if(name_of_obj === 'jersey'){ // HACK: Last to beloaded because of size

				reset_camera();

				// change_material('pants','7');
				// change_material('shirt','7');

				// change_material('emirates','9');

				//change_color('shirt','0xffffff')

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


	function change_material_from_image(target, dataUrl){


		// THREE.ImageUtils.crossOrigin = '';
		// var texture = THREE.ImageUtils.loadTexture(textureImage);
		// var bmap =  THREE.ImageUtils.loadTexture(bumpMapImage, {}, function(){});

		var texture_image = new Image();
		texture_image.src = dataUrl;
		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + textureImage + ".png" );







		reset_camera();

		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + textureImage + ".png" );
		var bmap =  THREE.ImageUtils.loadTexture("/images/materials/material_" + bumpMapImage + "_bump.png", {}, function(){});

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


	function change_material(target, textureImage, bumpMapImage){


		// THREE.ImageUtils.crossOrigin = '';
		// var texture = THREE.ImageUtils.loadTexture(textureImage);
		// var bmap =  THREE.ImageUtils.loadTexture(bumpMapImage, {}, function(){});

		reset_camera();

		var texture = THREE.ImageUtils.loadTexture( "/images/materials/material_" + textureImage + ".png" );
		var bmap =  THREE.ImageUtils.loadTexture("/images/materials/material_" + bumpMapImage + "_bump.png", {}, function(){});

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

		if(name_of_obj === 'shirt'){

			UniformBuilder.models['shirt'].visible = true;
			UniformBuilder.models['shirt_textured'].visible = false;
			UniformBuilder.models['shirt_mid_piping'].visible = true;

		}

		reset_camera();

		obj = window.UniformBuilder.models[name_of_obj];
		obj.material.color.setHex(color);

		if(name_of_obj === "shirt_mid_piping"){

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

		var _model = model;

		set_active_part(model);

		window.camera_position_to = positions[_model];
		window.camera_rotation_to = rotations[_model];

	}

	function reset_camera(){

		if(window.free_rotate){

			toggle_free_rotate();

		}

		window.camera_position_to = {

			x: -0.2884069715599567,
			y: 2.4678456274583342,
			z: 2.2391787352108334,

		};

		window.camera_rotation_to = {

			x: -0.19840521524628751,
			y: 0.0013470901758039742,
			z: 0.00027083272717196076,

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

		window.positions.jersey = {
			x:  -0.14530375000038792,
			y: 3.418446903080106,
			z: 1.4233432943044306,
		};

		window.rotations.jersey = {
			x: -0.41083495274445686,
			y: 0.036908597761710606,
			z: 0.01607324623784986,
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




