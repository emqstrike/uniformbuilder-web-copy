$(document).ready(function(){

    ub.funcs = {};
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
    ub.renderer = PIXI.autoDetectRenderer(ub.dimensions.width, ub.dimensions.height, {transparent: true}, false);
    ub.renderer.backgroundColor = 0xffffff;

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

    ub.data = {};

    ub.data.design_sets = {};
    ub.data.materials = {};
    ub.data.colors = {};
    ub.data.applications = {

        items: [

            /// One
            {

                id: 1,
                layer: 'body',
                perspective: 'front',
                name: 'Front / Center',
                code: '01',
                position: {
                    x: 0.5,
                    y: 0.5,
                },

            },

            /// Two
            {

                id: 2,
                layer: 'body',
                perspective: 'front',
                name: 'Front / Bottom Right',
                code: '02',
                position: {
                    x: 0.30,
                    y: 0.75,
                },

            },


            /// Three
            {

                id: 3,
                layer: 'body',
                perspective: 'front',
                name: 'Front / Bottom Left',
                code: '03',
                position: {
                    x: 0.60,
                    y: 0.7,
                },

            },

            /// Four
            {

                id: 4,
                layer: 'body',
                perspective: 'front',
                name: 'Front / Top',
                code: '04',
                position: {
                    x: 0.5,
                    y: 0.35,
                },

            },

        ]

    };

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
                        filename: '1.png',
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 2,
                        filename: '2.png',
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 3,
                        filename: '3.png',
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 4,
                        filename: '4.png',
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
                        filename: '1.png',
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 2,
                        filename: '2.png',
                    },
                    {
                        default_color: '#ffffff',
                        layer_number: 3,
                        filename: '3.png',
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
                       id: 2,
                       value: 0.9,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 3,
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
                       id: 3,
                       value: 0.3,
                       color: '#5e5e5e',     
                    },
                    {
                        id: 4,
                       value: 0.4,
                       color: '#ffffff',     
                    },
                    {
                       id: 5,
                       value: 0.8,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 6,
                       value: 0.9,
                       color: '#5e5e5e',     
                    },
                    {
                        id: 7,
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
                       id: 3,
                       value: 0.3,
                       color: '#5e5e5e',     
                    },
                    {
                        id: 4,
                       value: 0.4,
                       color: '#ffffff',     
                    },
                    {
                       id: 5,
                       value: 0.8,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 6,
                       value: 0.9,
                       color: '#5e5e5e',     
                    },
                    {
                        id: 7,
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
                       id: 3,
                       value: 0.6,
                       color: '#5e5e5e',     
                    },
                    {
                       id: 4,
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

    ub.data.accents = {
        items: [
            {   // Default
                id: 0,
                name: 'Default',
                code: 'default',
                thumbnail: 'no-accent.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Drop Shadow
            {   // Drop Shadow
                id: 1,
                name: 'Drop Shadow',
                code: 'drop_shadow',
                thumbnail: 'drop_shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -2,
                    },
                    {
                        layer_no: 2,
                        increment_x: 0.05, 
                        increment_y: 0.05,
                        outline: 0,
                        zIndex: -1,
                    },
                ], 
            },  // End Drop Shadow
            {   // Double Shadow
                id: 2,
                name: 'Double Shadow',
                code: 'double_shadow',
                thumbnail: 'double_shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -3, 
                    },
                    {
                        layer_no: 2,
                        increment_x: 0.05, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        layer_no: 3,
                        increment_x: 0.10, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -1,
                    },
                ], 
            },  // End Double Shadow
            {   // Shadow
                id: 3,
                name: 'Shadow',
                code: 'shadow',
                thumbnail: 'shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -2, 
                    },
                    {
                        layer_no: 2,
                        increment_x: 0.05, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -1,
                    },
                ], 
            },  // End Double Shadow
            {   // Double Drop Shadow
                id: 4,
                name: 'Double Drop Shadow',
                code: 'double_drop_shadow',
                thumbnail: 'double_drop_shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -3, 
                    },
                    {
                        layer_no: 2,
                        increment_x: 0.05, 
                        increment_y: 0.05,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        layer_no: 3,
                        increment_x: 0.12, 
                        increment_y: 0.12,
                        outline: 0,
                        zIndex: -1,
                    },
                ], 
            },  // End Double Drop Shadow
            {   // Outlined with Drop Shadow
                id: 5,
                name: 'Outlined with Drop Shadow',
                code: 'outlined_with_drop_shadow',
                thumbnail: 'outlined_with_drop_shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1, 
                        zIndex: -3,
                    },
                    {
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 2, 
                        zIndex: -2,
                    },
                    {
                        layer_no: 3,
                        increment_x: 0.05, 
                        increment_y: 0.05,
                        outline: 2,
                        zIndex: -1,
                        type: 'shadow',
                    },
                ], 
            },  // End Outlined with Drop Shadow
            {   // Center Shadow
                id: 6,
                name: 'Center Shadow',
                code: 'center_shadow',
                thumbnail: 'center_shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -2, 
                    },
                    {
                        layer_no: 2,
                        increment_x: -0.05, 
                        increment_y: -0.05,
                        outline: 0,
                        zIndex: -1,
                    },
                ], 
            },  // End Center Shadow
            {   // Outlined with Drop Shadow
                id: 7,
                name: 'Collegiate Drop Shadow',
                code: 'collegiate_drop_shadow',
                thumbnail: 'collegiate_drop_shadow.png',
                layers: [
                    {
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0,
                        zIndex: -2, 
                    },
                    {
                        layer_no: 2,
                        increment_x: 0.05, 
                        increment_y: 0.05,
                        outline: 1,
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined with Drop Shadow

        ],
    }

    /// Fonts 

    ub.data.fonts = {

        items: [

            {
                id: 1,
                name: 'Aachen Bold',
                type: 'default',
                font_path: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/fonts/staging/prolook/aachen-bold/font.ttf',
                active: '1',
            },
            {
                id: 2,
                name: 'Algerian',
                type: 'default',
                font_path: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/fonts/staging/prolook/algerian/font.ttf',
                active: '1',
            },
            {
                id: 3,
                name: 'Arabian Nights',
                type: 'default',
                font_path: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/fonts/staging/prolook/arabian-nights/font.ttf',
                active: '1',
            },

        ]

    }

    ub.funcs.load_fonts = function () {

        var font_builder = '';

        _.each( ub.data.fonts.items, function (item) {

            font_builder +=  "@font-face {\n" +
                             "\tfont-family: \"" +  item.name + "\";\n" + 
                             "\tsrc: url('" + item.font_path + "');\n" + 
                             "}\n";

        });

        font_builder = "<style type=\"text/css\">" + font_builder + "</style>";
        $("head").prepend(font_builder);

    };

    ub.funcs.load_fonts();
    

    /// End Fonts 

});