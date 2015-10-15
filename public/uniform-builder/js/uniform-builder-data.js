$(document).ready(function(){

    ub.ui = {};
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

    ub.stage.interactive = true;
    ub.pCanvas = document.getElementById(ub.container_div);
    ub.renderer = PIXI.autoDetectRenderer(ub.dimensions.width, ub.dimensions.height);
    ub.renderer.backgroundColor = 0xffffff;
    
    ub.stage.addChild(ub.left_view);
    ub.stage.addChild(ub.front_view);
    ub.stage.addChild(ub.back_view);
    ub.stage.addChild(ub.right_view);
    ub.stage.addChild(ub.pattern_view);
    ub.stage.addChild(ub.gradient_preview);
    ub.pCanvas.appendChild(ub.renderer.view);
     
    /// Hide other views except for the left view, by bringing them offscreen, 
    /// But still visible so we can still get the thumbnails by using renderTexture

    ub.front_view.position.x = 0;
    
    ub.right_view.position.x = ub.dimensions.width;
    ub.back_view.position.x = ub.dimensions.width;
    ub.left_view.position.x = ub.dimensions.width;
    ub.pattern_view.position.x = ub.dimensions.width;

    ub.current_material = {};
    ub.current_material.settings = {};

    ub.data = {};

    ub.data.design_sets = {}
    ub.data.materials = {};
    ub.data.colors = {};
    ub.data.applications = {};

    ub.data.patterns = {
      
        items: [

            /// Camo 
            {
                
                name: 'Camouflage',
                code: 'camouflage',
                icon: '/images/sidebar/camo.png',

                layers: [
                    {
                        default_color: '#ffffff',
                        layer_number: 1,
                        filename: '1.png'
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 2,
                        filename: '2.png'
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 3,
                        filename: '3.png'
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 4,
                        filename: '4.png'
                    },
                ],
            },
         
            /// Digital Camo
            {
                
                name: 'Digital Camouflage',
                code: 'digital_camouflage',
                icon: '/images/sidebar/digital_camo.png',

                layers: [
                    {
                        default_color: '#ffffff',
                        layer_number: 1,
                        filename: '1.png'
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 2,
                        filename: '2.png'
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 3,
                        filename: '3.png'
                    },
                ],
            },

            /// Halftone
            {
                
                name: 'Halftone',
                code: 'halftone',
                icon: '/images/sidebar/halftone.png',

                layers: [
                    {
                        default_color: '#ffffff',
                        layer_number: 1,
                        filename: '1.png'
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 2,
                        filename: '2.png'
                    },
                ],
            },

            /// Tiger
            {
                
                name: 'Tiger',
                code: 'tiger',
                icon: '/images/sidebar/tiger.png',

                layers: [
                    {
                        default_color: '#ffffff',
                        layer_number: 1,
                        filename: '1.png'
                    },
                ],

            },


      ],

    };

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
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 0.9,
                       color: '#5e5e5e',     
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
                       color: '#ffffff',     
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
                       color: '#5e5e5e',     
                    },
                    {
                       id: 1,
                       value: 0.9,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 2,
                       value: 1,
                       color: '#ffffff',     
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
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 1,
                       color: '#5e5e5e',     
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
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 0.2,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 2,
                       value: 0.3,
                       color: '#5e5e5e',     
                    },
                    {
                    id: 2,
                       value: 0.4,
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 0.8,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 2,
                       value: 0.9,
                       color: '#5e5e5e',     
                    },
                    {
                    id: 2,
                       value: 1,
                       color: '#ffffff',     
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
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 0.2,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 2,
                       value: 0.3,
                       color: '#5e5e5e',     
                    },
                    {
                    id: 2,
                       value: 0.4,
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 0.8,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 2,
                       value: 0.9,
                       color: '#5e5e5e',     
                    },
                    {
                    id: 2,
                       value: 1,
                       color: '#ffffff',     
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
                       color: '#ffffff',     
                    },
                    {
                       id: 2,
                       value: 0.4,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 2,
                       value: 0.6,
                       color: '#5e5e5e',     
                    },

                    {
                       id: 2,
                       value: 1,
                       color: '#ffffff',     
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

});