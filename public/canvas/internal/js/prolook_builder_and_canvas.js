
    $( document ).ready(function() {


        var PROLOOK_BUILDER = { VERSION: 'Prolook Builder for Canvas-0.001' };
        var PROLOOK_CANVAS  = { VERSION: 'Prolook Canvas for Canvas-0.001' };

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


        /// PROLOOK BUILDER
        ///
        /// Handles the 3d Rendering of Models
        /// v.0.001


        /// Definitions 

            
            // Properties


                PROLOOK_BUILDER.active_part = "";
                PROLOOK_BUILDER.models = {};
                PROLOOK_BUILDER.config = { 'model_folder': '/models/arkansas/', };
                
                PROLOOK_BUILDER.freeRotate = false;
                PROLOOK_BUILDER.rotateY = 0;
                PROLOOK_BUILDER.cameraPositionTo = {};
                PROLOOK_BUILDER.cameraRotationTo = {};


            // End Properties


            // Methods

                PROLOOK_BUILDER.moveCameraTo = function () {

                    PROLOOK_BUILDER.moveCameraAxis('x');
                    PROLOOK_BUILDER.moveCameraAxis('y');
                    PROLOOK_BUILDER.moveCameraAxis('z');

                };

                PROLOOK_BUILDER.moveCameraAxis = function (axis) {

                    camera_to = PROLOOK_BUILDER.cameraPositionTo;
                    current_camera = PROLOOK_BUILDER.camera.position;
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

                };

                PROLOOK_BUILDER.rotateCameraTo = function () {

                    PROLOOK_BUILDER.rotateCameraAxis('x');
                    PROLOOK_BUILDER.rotateCameraAxis('y');
                    PROLOOK_BUILDER.rotateCameraAxis('z');

                };

                PROLOOK_BUILDER.rotateCameraAxis = function (axis) {

                    camera_to = PROLOOK_BUILDER.cameraRotationTo;
                    current_camera = PROLOOK_BUILDER.camera.rotation;

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
                };


                PROLOOK_BUILDER.toggleFreeRotate = function (){

                    PROLOOK_BUILDER.freeRotate = !PROLOOK_BUILDER.freeRotate;

                    if(PROLOOK_BUILDER.freeRotate){

                        $('#btn_free_form').addClass('btn-danger');

                    }
                    else{

                        $('#btn_free_form').removeClass('btn-danger');

                    }

                };

                PROLOOK_BUILDER.resetCamera = function (){

                    if(PROLOOK_BUILDER.freeRotate){

                        PROLOOK_BUILDER.toggleFreeRotate();

                    }

                    PROLOOK_BUILDER.cameraPositionTo = {

                        x: 0.06213688326908633,
                        y: 0.6688464525575273,
                        z: 3.1477446569250085,

                    };

                    PROLOOK_BUILDER.cameraRotationTo = {

                        x: -0.20937041216934998,
                        y: 0.019306642782627805,
                        z: 0.004102081766231679,

                    };


                }

                PROLOOK_BUILDER.initPositionsAndRotations = function() {

                    PROLOOK_BUILDER.positions = {};
                    PROLOOK_BUILDER.rotations = {};

                    PROLOOK_BUILDER.cameraPositionTo = {

                        x: 0,
                        y: 9.042352971331009e-17,
                        z: 1.4767283069088406,

                    };

                    PROLOOK_BUILDER.cameraRotationTo = {

                        x: -6.123234262925839e-17,
                        y: 0,
                        z: 0,

                    };

                };

                PROLOOK_BUILDER.loadModel = function (file_name, name_of_obj, material){

                    var loader = new THREE.JSONLoader();
                    var filename = PROLOOK_BUILDER.config.model_folder + file_name + ".json";

                    loader.load(filename, function(geometry){

                        mesh = new THREE.Mesh(geometry, material);
                        PROLOOK_BUILDER.scene.add(mesh);
                        PROLOOK_BUILDER.models[name_of_obj] = mesh;

                    });

                };


                PROLOOK_BUILDER.renderScene = function (){


                    PROLOOK_BUILDER.initPositionsAndRotations();

                    container = document.getElementById('prolook_canvas');
            
                    var width = $(container).width();
                    var height = $(container).height();

                    PROLOOK_BUILDER.scene = new THREE.Scene();
                    PROLOOK_BUILDER.camera = new THREE.PerspectiveCamera( 100, width/height, 0.1, 1000 );
                    
                    var v = 128;
                    //PROLOOK_BUILDER.camera = new THREE.OrthographicCamera( width / - v, width / v, height / v, height / - v, 1, 500 );
                    PROLOOK_BUILDER.camera.zoom = 2.7049675370029926;
                    PROLOOK_BUILDER.camera.updateProjectionMatrix();

                    PROLOOK_BUILDER.renderer = new THREE.WebGLRenderer({ alpha: false, precision: 'highp', antialias: true, });
                    PROLOOK_BUILDER.renderer.setSize(width, height);

                    container.appendChild( PROLOOK_BUILDER.renderer.domElement );

                    var pointLight = new THREE.PointLight( 0xadaead, 1.9, 100 );
                    pointLight.position.set(1,1,2);
                    PROLOOK_BUILDER.camera.add(pointLight);

                    PROLOOK_BUILDER.scene.add(PROLOOK_BUILDER.camera);

                    var light = new THREE.AmbientLight( 0x303030 );
                    PROLOOK_BUILDER.scene.add(light);
                    
                    window.addEventListener('resize', function() {

                        container = document.getElementById('prolook_canvas');

                        var width = $(container).width();
                        var height = $(container).height();

                        PROLOOK_BUILDER.renderer.setSize(width, height);
                        PROLOOK_BUILDER.camera.aspect = width / height;
                        PROLOOK_BUILDER.camera.updateProjectionMatrix();

                    });

                    controls = new THREE.OrbitControls( PROLOOK_BUILDER.camera, PROLOOK_BUILDER.renderer.domElement );

                    controls.rotateSpeed = 0.15;
                    controls.zoomSpeed = 0.2;
                    controls.panSpeed = 0.05;

                    var render = function () {

                        if(!PROLOOK_BUILDER.freeRotate){

                            PROLOOK_BUILDER.moveCameraTo();
                            PROLOOK_BUILDER.rotateCameraTo();

                        }

                        requestAnimationFrame(render);
                        PROLOOK_BUILDER.renderer.render(PROLOOK_BUILDER.scene, PROLOOK_BUILDER.camera);

                    };

                    render();

                    PROLOOK_BUILDER.resetCamera();


                };

            // End Methods

      

        /// End Definitions


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

        
        /// PROLOOK CANVAS
        ///
        /// Handles the Material Assembly
        /// v.0.001


        /// Definitions


            // Properties

                PROLOOK_CANVAS.texture_style_folder = '/images/materials/arkansas/';
                PROLOOK_CANVAS.objects = {};
                PROLOOK_CANVAS.canvas = new fabric.Canvas('texture_canvas');

                PROLOOK_CANVAS.width = 1600;
                PROLOOK_CANVAS.height = 1598;

                PROLOOK_CANVAS.target = 'jersey';       // TODO: Get this value from init and modify to be dynamic                
                var canvas = PROLOOK_CANVAS.canvas;     // TODO: Check if this accessible from method definitions

            // End Properties


            // Methods


                PROLOOK_CANVAS.createMaterial = function (material) {
                 
                    var texture = THREE.ImageUtils.loadTexture(material);

                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.wrapS = THREE.ClampToEdgeWrapping;
                    texture.wrapT = THREE.ClampToEdgeWrapping;
                    texture.minFilter = THREE.LinearFilter;
                    texture.maxFilter = THREE.LinearFilter;
                    texture.repeat.set(1,1);
                    texture.needsUpdate = true;

                    material = new THREE.MeshPhongMaterial({ 

                        texture_color: 0x8c2332, 
                        specular: 0x050505,
                        shininess: 0,
                        map: texture,
                        bumpMap: texture,
                        bumpScale: 0.0050,
                        side: THREE.DoubleSide,

                    });

                    return material;

                };


                PROLOOK_CANVAS.refreshModel = function() {

                    
                    canvas.renderAll.bind(canvas);

                    setTimeout(function(){

                        var material = PROLOOK_CANVAS.createMaterial( canvas.toDataURL('image/png') );   // TODO: Add another level of indirection for this
                        var obj = PROLOOK_BUILDER.models[PROLOOK_CANVAS.target];

                        if(!PROLOOK_CANVAS.initialized)
                        {
                            
                            PROLOOK_BUILDER.loadModel(PROLOOK_CANVAS.target, PROLOOK_CANVAS.target, material);
                            PROLOOK_CANVAS.initialized = true;
                            
                        }
                        else{

                            obj.material = material;
                            obj.material.needsUpdate = true;
                            obj.geometry.computeTangents();

                        }

                    }, 50);

                };

                PROLOOK_CANVAS.loadBase = function (img) {

                    var img_new = new Image();
                    img_new.src = img;

                    utils.p(img,'to load!!!');

                    img_new.onload = function () {
                        
                        var imgbase64 = new fabric.Image(img_new, {
                            top: 0,
                            left: 0,
                            width: PROLOOK_CANVAS.width,
                            height: PROLOOK_CANVAS.height,
                            angle: 0,
                            opacity: 1, 
                        })

                        canvas.remove(PROLOOK_CANVAS.objects.base);
                        PROLOOK_CANVAS.objects['base'] = imgbase64;
                        canvas.add(imgbase64).renderAll();

                    }
                    
                };


                PROLOOK_CANVAS.loadMaterialOptions = function (name, baseImage) {

                    fabric.util.loadImage(PROLOOK_CANVAS.texture_style_folder + baseImage, function (image) {
                    
                        materialOption = new fabric.Image(image);

                        materialOption.set({

                            top: 0,
                            left: 0,
                            width: PROLOOK_CANVAS.width,
                            height: PROLOOK_CANVAS.height,
                            angle: 0,
                            opacity: 1, 

                        })

                        window.PROLOOK_CANVAS.objects[name] = materialOption;

                        canvas.add(materialOption).renderAll(); 
                                            
                    });

                };


                PROLOOK_CANVAS.loadMaterial = function(name, baseImage) {

                    utils.p(PROLOOK_CANVAS.texture_style_folder + baseImage);

                    fabric.Image.fromURL(PROLOOK_CANVAS.texture_style_folder + baseImage, function (image) {

                        image.left = 0;
                        image.top = 0;
                        image.lockMovementX = true;
                        image.lockMovementY = true;

                        PROLOOK_CANVAS.objects[name] = image;
                        canvas.add(image).renderAll();


                    });

                };


                PROLOOK_CANVAS.changeColor = function (name, colorValue){

                    selectedObject = window.PROLOOK_CANVAS.objects[name];
                    selectedObject.fill = color_value;

                    PROLOOK_CANVAS.refreshModel();

                }


                PROLOOK_CANVAS.exists = function(name){

                    return typeof(PROLOOK_CANVAS.objects[name]) !== 'undefined';

                }


                // Events

                    canvas.on('object:added', function(options) {
                    
                        var base_loaded = typeof(PROLOOK_CANVAS.objects.base) !== 'undefined';
                        var mesh_loaded = typeof(PROLOOK_CANVAS.objects.mesh) !== 'undefined';

                        if(base_loaded && mesh_loaded){

                            PROLOOK_CANVAS.objects.mesh.moveTo('2');
                            PROLOOK_CANVAS.refreshModel();

                        }


                    });


                    canvas.on('mouse:up', function(options) {
                    
                        PROLOOK_CANVAS.refreshModel();

                    });

                // End Events


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


        /// Set global objects and load initial materials

            window.pb = PROLOOK_BUILDER;
            window.pc = PROLOOK_CANVAS;

            pc.loadMaterial('base', 'base.jpg');
            pc.loadMaterial('mesh', 'mesh.png');

        /// End Set 


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //



    });

 