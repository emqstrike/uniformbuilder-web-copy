$(document).ready(function(){

    ub.ui = {};
    ub.ui.drops = {};
    ub.modifiers = {};
    ub.tethers = {}; 
    ub.dimensions = {};
    ub.dimensions.width = 496;
    ub.dimensions.height = 550;
    ub.active = null;

    ub.container_div = 'main_view';
    ub.views = ['front', 'back', 'left', 'right'];
    ub.stage = new PIXI.Container();
    ub.left_view = new PIXI.Container();
    ub.front_view = new PIXI.Container();
    ub.back_view = new PIXI.Container();
    ub.right_view = new PIXI.Container();
    ub.pattern_view = new PIXI.Container();
    ub.gradient_preview = new PIXI.Container();

    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;

    ub.stage.interactive = true;
    ub.pCanvas = document.getElementById(ub.container_div);
    ub.renderer = PIXI.autoDetectRenderer(ub.dimensions.width, ub.dimensions.height, {transparent: false}, false);
    ub.renderer.backgroundColor = 0xeeeeee;

    ub.stage.addChild(ub.left_view);
    ub.stage.addChild(ub.front_view);
    ub.stage.addChild(ub.back_view);
    ub.stage.addChild(ub.right_view);
    ub.stage.addChild(ub.pattern_view);
    ub.stage.addChild(ub.gradient_preview);
    ub.pCanvas.appendChild(ub.renderer.view);

    ub.interactionManager = new PIXI.interaction.InteractionManager(ub.renderer, {});
    ub.dragAndDropManager = new PIXI.DragAndDropManager(ub.interactionManager);
     
    /// Hide other views except for the left view, by bringing them offscreen, 
    /// But still visible so we can still get the thumbnails by using renderTexture

    ub.front_view.position.x = 0;
    
    ub.right_view.position.x = ub.dimensions.width;
    ub.back_view.position.x = ub.dimensions.width;
    ub.left_view.position.x = ub.dimensions.width;
    ub.pattern_view.position.x = ub.dimensions.width;

    ub.current_material = {};
    ub.current_material.settings = {};

    ub.states = {};
    ub.states.active_application = 'undefined';

    ub.data = {};
    ub.data.views = ['front', 'back', 'left', 'right'];

    ub.data.design_sets = {};
    ub.data.materials = {};
    ub.data.colors = {};
    ub.data.fonts = {};
    
    
    // This will contain default uniform settings when loading a uniform style, 
    // when loading a uniform that is not from a customized order
    ub.data.defaultUniformStyle = {};

    ub.data.applications_transformed = {};
    ub.data.applications_transformed_temp = {
        
        body: {

            applications: [
                {
                    id: 1,
                    application_views: [

                        {
                            perspective: 'front',
                        },
                        {
                            perspective: 'back',
                        },
                        {
                            perspective: 'left',
                        },
                        {
                            perspective: 'right',
                        },
                    ] 
                },       
            ]

        } 


    };


    // Layer Assignment for Applications 
    // 30 - 50

    ub.data.applications = {

        items: [

            /// One
            {

                id: 1,
                layer: 'Body',
                perspective: 'front',
                name: 'Front / Top',
                code: '1',
                layer_order: 30,
                rotation: 0,
                position: {
                    x: 0.5,
                    y: 0.25,
                },

            },

            /// Two
            {

                id: 2,
                layer: 'Body',
                perspective: 'front',
                name: 'Front / Center',
                code: '2',
                layer_order: 31,
                rotation: 0,
                position: {
                    x: 0.5,
                    y: 0.36,
                },

            },

            /// Three
            {

                id: 3,
                layer: 'Body',
                perspective: 'front',
                name: 'Front / Center (2nd)',
                code: '3',
                layer_order: 32,
                rotation: 0,
                position: {
                    x: 0.5,
                    y: 0.36,
                },

            },

            /// Four
            {

                id: 4,
                layer: 'Body',
                perspective: 'front',
                name: 'Front / Bottom Right',
                code: '4',
                layer_order: 33,
                rotation: 0,
                position: {
                    x: 0.35,
                    y: 0.7,
                },

            },


            /// Five
            {

                id: 5,
                layer: 'Body',
                perspective: 'front',
                name: 'Front / Bottom Left',
                code: '5',
                layer_order: 34,
                rotation: 0,
                position: {
                    x: 0.65,
                    y: 0.7,
                },

            },

            /// Six
            {

                id: 6,
                layer: 'Body',
                perspective: 'back',
                name: 'Back Top',
                code: '6',
                layer_order: 35,
                rotation: 0,
                position: {
                    x: 0.5,
                    y: 0.2,
                },

            },
            /// Seven
            {

                id: 7,
                layer: 'Body',
                perspective: 'back',
                name: 'Back Center',
                code: '7',
                layer_order: 36,
                rotation: 0,
                position: {
                    x: 0.5,
                    y: 0.32,
                },

            },
            /// Eight
            {

                id: 8,
                layer: 'Left Sleeve',
                perspective: 'left',
                name: 'Left Shoulder - Top',
                code: '8',
                layer_order: 37,
                rotation: 0,
                position: {
                    x: 0.47,
                    y: 0.15,
                },

            },
            /// Nine
            {

                id: 9,
                layer: 'Left Sleeve',
                perspective: 'left',
                name: 'Left Shoulder - Bottom',
                code: '9',
                layer_order: 38,
                rotation: 0,
                position: {
                    x: 0.47,
                    y: 0.23,
                },

            },
            /// Ten
            {

                id: 10,
                layer: 'Right Sleeve',
                perspective: 'right',
                name: 'Right Shoulder - Top',
                code: '10',
                layer_order: 39,
                rotation: 0,
                position: {
                    x: 0.47,
                    y: 0.15,
                },

            },

            /// Eleven
            {

                id: 11,
                layer: 'Right Sleeve',
                perspective: 'right',
                name: 'Right Shoulder - Bottom',
                code: '11',
                layer_order: 40,
                rotation: 0,
                position: {
                    x: 0.47,
                    y: 0.27,
                },

            },
            /// Tweleve
            {

                id: 12,
                layer: 'Right Sleeve',
                perspective: 'front',
                name: 'Right Sleeves',
                code: '12',
                layer_order: 41,
                rotation: 0.96,
                position: {
                    x: 0.14,
                    y: 0.25,
                },

            },

            /// Thirteen
            {

                id: 13,
                layer: 'Left Sleeve',
                perspective: 'front',
                name: 'Left Sleeve',
                code: '13',
                layer_order: 42,
                rotation: 5.31,
                position: {
                    x: 0.86,
                    y: 0.25,
                },

            },
            {

                id: 14,
                layer: 'Body',
                perspective: 'left',
                name: 'Left Center',
                code: '14',
                layer_order: 43,
                rotation: 0,
                position: {
                    x: 0.384,
                    y: 0.46,
                },

            },
            {

                id: 15,
                layer: 'Body',
                perspective: 'right',
                name: 'Right Center',
                code: '15',
                layer_order: 43,
                rotation: 0,
                position: {
                    x: 0.63,
                    y: 0.45,
                },

            }


        ]

    };

    ub.data.mascots = {

        items: [
            /// Knights 
            {
                id: 0,
                name: 'Knights',
                code: 'knights',
                icon: '/images/sidebar/mascots/knights.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/knights/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/mascots/knights/2.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 3,
                        filename: '/images/mascots/knights/3.png',
                    },
                    {
                        default_color: '3d3d3d',
                        layer_number: 4,
                        filename: '/images/mascots/knights/4.png',
                    },

                ],
            },
            /// Lancers
            {
                id: 1,
                name: 'Lancers',
                code: 'lancers',
                icon: '/images/sidebar/mascots/lancers.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/lancers/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/mascots/lancers/2.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 3,
                        filename: '/images/mascots/lancers/3.png',
                    },
                ],
            },
            /// Kennessaw
            {
                id: 2,
                name: 'Kennesaw',
                code: 'kennesaw',
                icon: '/images/sidebar/mascots/kennesaw.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/kennesaw/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/mascots/kennesaw/2.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 3,
                        filename: '/images/mascots/kennesaw/3.png',
                    },
                    {
                        default_color: '543018',
                        layer_number: 4,
                        filename: '/images/mascots/kennesaw/4.png',
                    },
                ],
            },

            /// Badger
            {
                id: 3,
                name: 'Badger',
                code: 'badger',
                icon: '/images/sidebar/mascots/badger.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/badger/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/mascots/badger/2.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 3,
                        filename: '/images/mascots/badger/3.png',
                    },
                ],
            },
            /// Bobcats
            {
                id: 4,
                name: 'Bobcat',
                code: 'bobcat',
                icon: '/images/sidebar/mascots/bobcat.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/bobcat/1.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 2,
                        filename: '/images/mascots/bobcat/2.png',
                    },
                   
                ],
            },
            /// Tiger
            {
                id: 5,
                name: 'Tiger E',
                code: 'tiger_e',
                icon: '/images/sidebar/mascots/tiger_e.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/tiger_e/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/mascots/tiger_e/2.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 3,
                        filename: '/images/mascots/tiger_e/3.png',
                    },
                   
                ],
            },
            /// Tiger
            {
                id: 6,
                name: 'Tiger F',
                code: 'tiger_f',
                icon: '/images/sidebar/mascots/tiger_f.png',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/mascots/tiger_f/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/mascots/tiger_f/2.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 3,
                        filename: '/images/mascots/tiger_f/3.png',
                    },
                   
                ],
            },
        ],    
    }

    ub.data.patterns = {
      
        items: [

        ////// Patterns Start

            /// None
            {
                name: 'None',
                code: 'none',
                icon: '/images/sidebar/none.png',
                category: 'jersey',
                layers: [
                  
                ],
            },

            /// Armour 
            {
                name: 'Armour',
                code: 'armour',
                icon: '/images/sidebar/armour.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'd31145',
                        layer_number: 1,
                        filename: '/images/patterns/armour/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/armour/2.png',
                    },
                    {
                        default_color: '543018',
                        layer_number: 3,
                        filename: '/images/patterns/armour/3.png',
                    },

                ],
            },

            /// Arrow 
            {
                name: 'Arrow',
                code: 'arrow',
                icon: '/images/sidebar/arrow.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/arrow/1.png',
                    },
                ],
            },

            /// Camo 
            {
                
                name: 'Camouflage',
                code: 'camouflage',
                icon: '/images/sidebar/camouflage.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/camouflage/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/camouflage/2.png',
                    },
                    {
                        default_color: '543018',
                        layer_number: 3,
                        filename: '/images/patterns/camouflage/3.png',
                    },
                    {
                        default_color: '000000',
                        layer_number: 4,
                        filename: '/images/patterns/camouflage/4.png',
                    },
                ],
            },

            /// Carbon Fiber 
            {
                name: 'Carbon Fiber',
                code: 'carbon_fiber',
                icon: '/images/sidebar/carbon_fiber.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/carbon_fiber/1.png',
                    },
                ],
            },

            /// Checkered
            {
                name: 'Checkered',
                code: 'checkered',
                icon: '/images/sidebar/checkered.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/checkered/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/checkered/2.png',
                    },
                ],
            },

            /// Digital Camo
            {
                
                name: 'Digital Camouflage',
                code: 'digital_camouflage',
                icon: '/images/sidebar/digital_camouflage.png',
                category: 'jersey',

                layers: [
                    {
                        default_color: '000000',
                        layer_number: 1,
                        filename: '/images/patterns/digital_camouflage/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/digital_camouflage/2.png',
                    },
                    {
                        default_color: 'acacac',
                        layer_number: 3,
                        filename: '/images/patterns/digital_camouflage/3.png',
                    },
                ],
            },

            /// Grunge
            {
                name: 'Grunge',
                code: 'grunge',
                icon: '/images/sidebar/grunge.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/grunge/1.png',
                    },
                ],
            },

           /// Halftone Chest
            {
                name: 'Halftone Chest',
                code: 'halftone_chest',
                icon: '/images/sidebar/halftone_chest.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/halftone_chest/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/halftone_chest/2.png',
                    },
                ],
            },

           /// Hexastar
            {
                name: 'Hexastar',
                code: 'hexastar',
                icon: '/images/sidebar/hexastar.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/hexastar/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/hexastar/2.png',
                    },
                ],
            },

            /// Interlock
            {
                name: 'Interlock',
                code: 'interlock',
                icon: '/images/sidebar/interlock.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/interlock/1.png',
                    },
                ],
            },

            /// Line Fade Body
            {
                name: 'Line Fade Body',
                code: 'line_fade_body',
                icon: '/images/sidebar/line_fade_body.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: '362f2d',
                        layer_number: 1,
                        filename: '/images/patterns/line_fade_body/1.png',
                    },
                    {
                        default_color: 'c92124',
                        layer_number: 2,
                        filename: '/images/patterns/line_fade_body/2.png',
                    },
                ],
            },

            /// Multicam Camo
            {
                name: 'Multicam Camo',
                code: 'multicam_camo',
                icon: '/images/sidebar/multicam_camo.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'd31145',
                        layer_number: 1,
                        filename: '/images/patterns/multicam_camo/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/multicam_camo/2.png',
                    },
                    {
                        default_color: '543018',
                        layer_number: 3,
                        filename: '/images/patterns/multicam_camo/3.png',
                    },
                    {
                        default_color: '000000',
                        layer_number: 4,
                        filename: '/images/patterns/multicam_camo/4.png',
                    },
                    {
                        default_color: '000000',
                        layer_number: 5,
                        filename: '/images/patterns/multicam_camo/5.png',
                    },
                ]
            },

            /// NK Stripe
            {
                name: 'NK Stripe',
                code: 'nk_stripe',
                icon: '/images/sidebar/nk_stripe.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/nk_stripe/1.png',
                    },
                ],
            },

            /// Paw
            {
                name: 'Paw',
                code: 'paw',
                icon: '/images/sidebar/paw.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/paw/1.png',
                    },
                ],
            },

            /// Pinstripes
            {
                name: 'Pinstripes',
                code: 'pinstripes',
                icon: '/images/sidebar/pinstripes.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/pinstripes/1.png',
                    },
                ],
            },

            /// Referee Stripes
            {
                name: 'Referee Stripes',
                code: 'referee_stripes',
                icon: '/images/sidebar/referee_stripes.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/referee_stripes/1.png',
                    },
                ],
            },

            /// Square
            {
                name: 'Square',
                code: 'square',
                icon: '/images/sidebar/square.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/square/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/square/2.png',
                    },
                    {
                        default_color: '543018',
                        layer_number: 3,
                        filename: '/images/patterns/square/3.png',
                    },
                    {
                        default_color: '000000',
                        layer_number: 4,
                        filename: '/images/patterns/square/4.png',
                    },
                    {
                        default_color: '000000',
                        layer_number: 5,
                        filename: '/images/patterns/square/5.png',
                    },
                ]
            },

            /// Stairs
            {
                name: 'Stairs',
                code: 'stairs',
                icon: '/images/sidebar/stairs.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/stairs/1.png',
                    },
                ],
            },

            /// Stripes Thin and Thick
            {
                name: 'Stripes Thin and Thick',
                code: 'stripes_thin_and_thick',
                icon: '/images/sidebar/stripes_thin_and_thick.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/stripes_thin_and_thick/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/stripes_thin_and_thick/2.png',
                    },
                    {
                        default_color: '543018',
                        layer_number: 3,
                        filename: '/images/patterns/stripes_thin_and_thick/3.png',
                    },
                ]
            },

            /// Stripes Thinner
            {
                name: 'Stripes Thinner',
                code: 'stripes_thinner',
                icon: '/images/sidebar/stripes_thinner.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/stripes_thinner/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/stripes_thinner/2.png',
                    },
                ]
            },

            /// Thatch
            {
                name: 'Thatch',
                code: 'thatch',
                icon: '/images/sidebar/thatch.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/thatch/1.png',
                    },
                    {
                        default_color: 'ffffff',
                        layer_number: 2,
                        filename: '/images/patterns/thatch/2.png',
                    },
                ]
            },

            /// Tiger
            {
                name: 'Tiger',
                code: 'tiger',
                icon: '/images/sidebar/tiger.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/tiger/1.png',
                    },
                ]
            },

            /// Upper Stripes
            {
                name: 'Upper Stripes',
                code: 'upper_stripes',
                icon: '/images/sidebar/upper_stripes.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/upper_stripes/1.png',
                    },
                ]
            },

            /// Waves
            {
                name: 'Wave',
                code: 'wave',
                icon: '/images/sidebar/wave.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/wave/1.png',
                    },
                ]
            },

            /// Web
            {
                name: 'Web',
                code: 'web',
                icon: '/images/sidebar/web.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/web/1.png',
                    },
                ]
            },

            /// Wire
            {
                name: 'Wire',
                code: 'wire',
                icon: '/images/sidebar/wire.png',
                category: 'jersey',
                layers: [
                    {
                        default_color: 'c92124',
                        layer_number: 1,
                        filename: '/images/patterns/wire/1.png',
                    },
                ]
            },

        ]
    };

    ////// Patterns End

    ub.data.sports = [
        {
            gender: 'Men',
            sports: [
                {
                    name: 'Baseball',
                    active: "1",
                },
                {
                    name: 'Basketball',
                    active: "1",
                },
                {
                    name: 'Football',
                    active: "1",
                },
                {
                    name: 'Hockey',
                    active: "1",
                },
                {
                    name: 'Lacrosse',
                    active: "1",
                },
                {
                    name: 'Soccer',
                    active: "1",
                }, 
                {
                    name: 'Wrestling',
                    active: "1",
                }, 
            ],
        },
        {
            gender: 'Women',
            sports: [
                {
                    name: 'Baseball',
                    active: "1",
                },
                {
                    name: 'Softball',
                    active: "1",
                },
                {
                    name: 'Hockey',
                    active: "1",
                },
                {
                    name: 'Lacrosse',
                    active: "1",
                },
                {
                    name: 'Volleyball',
                    active: "1",
                },
                {
                    name: 'Soccer',
                    active: "1",
                }, 
            ],
        },
        {
            gender: 'Youth',
            sports: [
                {
                    name: 'Baseball',
                    active: "1",
                },
                {
                    name: 'Basketball',
                    active: "1",
                },
                {
                    name: 'Football',
                    active: "1",
                },
                {
                    name: 'Soccer',
                    active: "1",
                },
            ],
        },

    ];
    
    /// End SPORTS

    /// GRADIENTS

    ub.data.gradients = {

        items: [

            {
                name: "None",
                code: "none",
                angle: 0,

                color_stops: [

                ],
            },
            {
                
                name: "Bottom To Top",
                code: "bottom_to_top",
                angle: 0,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#005dab',     
                    },
                    {
                       id: 2,
                       value: 0.9,
                       color: '#1a1a1a',     
                    },

                ],
            },
            {
                name: "Top To Bottom",
                code: "top_to_bottom",
                angle: 0,

                color_stops: [

                    {
                       id: 1,
                       value: 0,
                       color: '#535353',     
                    },
                    {
                       id: 2,
                       value: 0.9,
                       color: '#005dab',     
                    },

                ],

            },
            {
                
                name: "Sharp Edge",
                code: "sharp_edge",
                angle: 0,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 2,
                       value: 0.9,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 3,
                       value: 1,
                       color: '#005dab',     
                    },

                ],
            },  
            {
                
                name: "Radial",
                code: "radial",
                angle: 180,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#005dab',     
                    },
                    {
                       id: 2,
                       value: 1,
                       color: '#1a1a1a',     
                    },

                ],
            },
            {
                name: "Diagonal 1",
                code: "diagonal_1",
                angle: 45,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#005dab',     
                    },
                    {
                       id: 2,
                       value: 0.2,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 3,
                       value: 0.3,
                       color: '#1a1a1a',     
                    },
                    {
                        id: 4,
                       value: 0.4,
                       color: '#005dab',     
                    },
                    {
                       id: 5,
                       value: 0.8,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 6,
                       value: 0.9,
                       color: '#1a1a1a',     
                    },
                    {
                        id: 7,
                       value: 1,
                       color: '#005dab',     
                    },
                  
                ],
            },    
          {
                name: "Diagonal 2",
                code: "diagonal_2",
                angle: 315,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#005dab',     
                    },
                    {
                       id: 2,
                       value: 0.2,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 3,
                       value: 0.3,
                       color: '#1a1a1a',     
                    },
                    {
                        id: 4,
                       value: 0.4,
                       color: '#005dab',     
                    },
                    {
                       id: 5,
                       value: 0.8,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 6,
                       value: 0.9,
                       color: '#1a1a1a',     
                    },
                    {
                        id: 7,
                       value: 1,
                       color: '#005dab',     
                    },
                  
                ],
            },    
            {
                name: "Diagonal 3",
                code: "diagonal_3",
                angle: 45,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#005dab',     
                    },
                    {
                       id: 2,
                       value: 0.4,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 3,
                       value: 0.6,
                       color: '#1a1a1a',     
                    },
                    {
                       id: 4,
                       value: 1,
                       color: '#005dab',     
                    },

                ],
            },
                 {
                name: "Custom",
                code: "custom",
                angle: 0,

                color_stops: [
                    {
                       id: 1,
                       value: 0,
                       color: '#008da9',     
                    },
                    {
                       id: 2,
                       value: 1,
                       color: '#ffde00',
                    },
                ],
            },              

        ]

    }

    /// END GRADIENTS

    /// START PATTERNS

    // ub.data.patterns = {

    // };

    /// END PATTERNS

    ub.data.accents = {
        items: [
            {   // Default
                id: 0,
                name: 'Default',
                code: 'default',
                thumbnail: 'no-accent.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Drop Shadow
            {   // Outlined
                id: 1,
                name: 'Outlined',
                code: 'outlined',
                thumbnail: 'outlined.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        type: 'fill',
                        zIndex: -3,
                    },
                    {
                        name: 'Outline 1',
                        default_color: '000000',
                        layer_no: 2,
                        increment_x: 0,
                        increment_y: 0,
                        outline: 1,
                        type: 'outer_stroke',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined
            {   // Outlined with Shadow
                id: 2,
                name: 'Single Outline with Shadow',
                code: 'single outline shadow',
                thumbnail: 'single_outline_with_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        type: 'fill',
                        zIndex: -4,
                    },
                    {
                        name: 'Outline 1',
                        default_color: 'acacac',
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1,
                        type: 'outer_stroke',
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow',
                        default_color: '000000',
                        layer_no: 3,
                        increment_x: 0.06, 
                        increment_y: 0.06,
                        outline: 1,
                        type: 'shadow',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined
            {   // Outlined
                id: 3,
                name: 'Double Outline',
                code: 'double_outline',
                thumbnail: 'double_outline.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        type: 'fill',
                        zIndex: -4,
                    },
                    {
                        name: 'Outline 1',
                        default_color: '#ffffff',
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1,
                        type: 'middle_stroke',
                        zIndex: -3,
                    },
                    {
                        name: 'Outline 2',
                        default_color: '000000',
                        layer_no: 3,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 2,
                        type: 'outer_stroke',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined with Drop Shadow
            {   // Drop Shadow
                id: 4,
                name: 'Drop Shadow',
                code: 'drop_shadow',
                thumbnail: 'drop_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow',
                        default_color: '000000',
                        layer_no: 2,
                        increment_x: 0.06, 
                        increment_y: 0.06,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Drop Shadow
            {   // Double Shadow
                id: 5,
                name: 'Double Shadow',
                code: 'double_shadow',
                thumbnail: 'double_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -4, 
                    },
                    {
                        name: 'Shadow 1',
                        default_color: 'acacac',
                        layer_no: 2,
                        increment_x: 0.06, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow 2',
                        default_color: '000000',
                        layer_no: 3,
                        increment_x: 0.12, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Double Shadow
            {   // Shadow
                id: 6,
                name: 'Shadow',
                code: 'shadow',
                thumbnail: 'shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -3, 
                    },
                    {
                        name: 'Shadow',
                        default_color: '000000',
                        layer_no: 2,
                        increment_x: 0.12, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Double Shadow
            {   // Double Drop Shadow
                id: 7,
                name: 'Double Drop Shadow',
                code: 'double_drop_shadow',
                thumbnail: 'double_drop_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -4, 
                    },
                    {
                        name: 'Shadow 1',
                        default_color: 'acacac',
                        layer_no: 2,
                        increment_x: 0.06, 
                        increment_y: 0.06,
                        outline: 0,
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow 2',
                        default_color: '000000',
                        layer_no: 3,
                        increment_x: 0.10, 
                        increment_y: 0.10,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Double Drop Shadow
            {   // Outlined with Drop Shadow
                id: 8,
                name: 'Outlined with Drop Shadow',
                code: 'outlined_with_drop_shadow',
                thumbnail: 'outlined_with_drop_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        type: 'fill',
                        zIndex: -5,
                    },
                    {
                        name: 'Outline 1',
                        default_color: 'ffffff',
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1,
                        type: 'middle_stroke',
                        zIndex: -4,
                    },
                    {
                        name: 'Outline 2',
                        default_color: '000000',
                        layer_no: 3,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 2,
                        type: 'outer_stroke',
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow',
                        default_color: '000000',
                        layer_no: 4,
                        increment_x: 0.06, 
                        increment_y: 0.06,
                        outline: 2,
                        zIndex: -2,
                        type: 'outer_stroke',
                        type: 'shadow',
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined with Drop Shadow
            {   // Center Shadow
                id: 9,
                name: 'Center Shadow',
                code: 'center_shadow',
                thumbnail: 'center_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -3, 
                    },
                    {
                        name: 'Shadow',
                        default_color: '000000',
                        layer_no: 2,
                        increment_x: -0.03, 
                        increment_y: -0.03,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Center Shadow
            {   // Outlined with Drop Shadow
                id: 10,
                name: 'Collegiate Drop Shadow',
                code: 'collegiate_drop_shadow',
                thumbnail: 'collegiate_drop_shadow.png',
                layers: [
                    {
                        name: 'Base Color',
                        default_color: '98012e',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -4, 
                    },
                    {
                        name: 'Shadow',
                        default_color: 'acacac',
                        layer_no: 2,
                        increment_x: 0.12, 
                        increment_y: 0.06,
                        outline: 0,
                        type: 'shadow',
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow Outline',
                        default_color: '000000',
                        layer_no: 3,
                        increment_x: 0.12, 
                        increment_y: 0.06,
                        outline: 1,
                        type: 'outer_stroke',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'acacac',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined with Drop Shadow

        ],
    }

    ub.funcs.load_fonts = function () {

        var font_builder = '';

        _.each( ub.data.fonts, function (item) {

            font_builder +=  "@font-face {\n" +
                             "\tfont-family: \"" +  item.name + "\";\n" + 
                             "\tsrc: url('" + item.font_path + "');\n" + 
                             "}\n";

        });

        font_builder = "<style type=\"text/css\">" + font_builder + "</style>";
        $("head").prepend(font_builder);


        // Preload first font
        if ( ub.data.fonts.length > 0 ) {

            WebFont.load({
                
                custom: {
                  families: [ub.data.fonts[0].name],
                },

            });

        }
        
    };

    /// End Fonts 


});