$(document).ready(function() {

    ub.errors = [];

    ub.uiVersion = "v2";
    ub.offsetValue = 70;

    ub.funcs.ui = {};
    ub.ui = {};
    ub.ui.drops = {};
    ub.modifiers = {};
    ub.tethers = {}; 
    ub.dimensions = {};
    ub.dimensions.width = 563;
    ub.dimensions.height = 616;
    ub.offset = {x: 70, y: 70};
    ub.active = null;
    ub.vars = {};
    ub.status = {};

    /// Search

    ub.searchResults = {};

    /// For Interactive Viewport

    ub.ALPHA_ON = 1;
    ub.ALPHA_OFF = 0.1;

    ub.zoom = false;
    ub.showLocation = false;

    ub.current_group_id = '1';

    ub.current_part = 1;

    ub.active_view = 'front';
    ub.active_part = undefined;
    ub.active_lock = undefined;
    ub.same_here_once = false;

    ub.interacted  = {

        previous: {
            name: undefined,
        },
        
        current: {
            name: undefined,
        },

    }

    /// End Interactive Viewport

    ub.container_div                = 'main_view';
    ub.views                        = ['front', 'back', 'left', 'right'];
    ub.stage                        = new PIXI.Container();
    ub.left_view                    = new PIXI.Container();
    ub.front_view                   = new PIXI.Container();
    ub.back_view                    = new PIXI.Container();
    ub.right_view                   = new PIXI.Container();
    ub.pattern_view                 = new PIXI.Container();
    ub.gradient_preview             = new PIXI.Container();

    window.ub.pixi = {};  // PIXI wrapper methods
    window.ub.pixi.new_sprite       = function (filename) {
        return new PIXI.Sprite(PIXI.Texture.fromImage(filename + '?v=' + (new Date() / 1000)));
    };

    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;

    $('#main_view').hide();

    ub.stage.interactive            = true;
    ub.pCanvas                      = document.getElementById(ub.container_div);
    ub.renderer                     = PIXI.autoDetectRenderer(ub.dimensions.width, ub.dimensions.height, {transparent: false}, false);
    ub.renderer.backgroundColor     = 0xeeeeee;


    var _bg                         = window.ub.pixi.new_sprite('/images/uiV1/bg.jpg');
    ub.stage.addChild(_bg); 

    ub.stage.addChild(ub.left_view);
    ub.stage.addChild(ub.front_view);
    ub.stage.addChild(ub.back_view);
    ub.stage.addChild(ub.right_view);
    ub.stage.addChild(ub.pattern_view);
    ub.stage.addChild(ub.gradient_preview);
    ub.pCanvas.appendChild(ub.renderer.view);

    ub.interactionManager           = ub.renderer.plugins.interaction;
    ub.dragAndDropManager           = new PIXI.DragAndDropManager(ub.interactionManager);
     
    /// Hide other views except for the left view, by bringing them offscreen, 
    /// But still visible so we can still get the thumbnails by using renderTexture

    ub.right_view.position.x        = ub.dimensions.width;
    ub.back_view.position.x         = ub.dimensions.width;
    ub.left_view.position.x         = ub.dimensions.width;
    ub.pattern_view.position.x      = ub.dimensions.width;

    ub.current_material                         = {};
    ub.current_material.settings                = {};
    ub.current_material.settings.pdfOrderForm   = '';
    ub.current_material.settings.roster         = [];
    ub.current_material.settings.order_info     = {};
    ub.current_material.settings.size_breakdown = {};

    ub.current_material.settings.thumbnails     = {
        front_view: "",
        back_view: "",
        left_view: "",
        right_view: "",
    }

    ub.current_material.settings.pdfOrderForm = "";

    ub.states                       = {};
    ub.states.canDoubleClick        = false;
    ub.states.active_application    = 'undefined';

    ub.data                         = {};
    ub.data.views                   = ['front', 'back', 'left', 'right'];

    ub.data.design_sets             = undefined;
    ub.data.materials               = undefined;
    ub.data.colors                  = {};
    ub.data.fonts                   = undefined;

    ub.data.searchSource            = {};
    
    ub.data.colorsUsed              = {};
    // This will contain default uniform settings when loading a uniform style, 
    // when loading a uniform that is not from a customized order

    ub.data.defaultUniformStyle     = {};
    ub.data.modifierLabels          = {};
    ub.data.boundaries_transformed_one_dimensional = {

        front: [],
        back:  [],
        right: [],
        left:  [],
        
    };

    ub.data.boundaries_transformed  = {};

    ub.data.applications_transformed_one_dimensional = [];
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

    ub.data.uniformSizes = [

        {
            sport: 'football',
            category: 'adult',
            sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL','3XL', '4XL', '5XL','YXS','YS', 'YM', 'YL', 'YXL', 'Y2XL', 'Y3XL']
        }, 
        {
            sport: 'football',
            category: 'youth',
            sizes: ['YS', 'YM', 'YL', 'YXL', 'Y2XL', 'Y3XL',]
        }, 

    ];

    ub.data.defaultFontSizes = [

        {
            size: 1,
            outputSize: 60,
        },
        {
            size: 2,
            outputSize: 80,
        },
        {
            size: 3,
            outputSize: 100,
        },
        {
            size: 4,
            outputSize: 120,
        },
        {
            size: 5,
            outputSize: 140,
        },
        {
            size: 6,
            outputSize: 140,
        },
        {
            size: 7,
            outputSize: 160,
        },
        {
            size: 8,
            outputSize: 320,
        },
        {
            size: 9,
            outputSize: 340,
        },
        {
            size: 10,
            outputSize: 360,
        },
        {
            size: 11,
            outputSize: 380,
        },
        {
            size: 12,
            outputSize: 400,
        },

    ]

    ub.data.mascotSizes = {
        
        items: [
            {
                size: '1',
                scale: 0.07,
            },
            {
                size: '2',
                scale: 0.3,
            },
            {
                size: '3',
                scale: 0.4,
            },
            {
                size: '4',
                scale: 0.5,
            },
        ],

    };

    ub.data.applicationSizes = {

        items: [
                {
                    name: 'team_name',
                    sizes:  [
                                {
                                    type: 'embroidery',
                                    size: 1,
                                },
                                {
                                    type: 'tackle twill',
                                    size: 2,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'team_name',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sizes:  [
                                {
                                    type: 'tackle twill',
                                    size: 2.5,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'player_name',
                    sizes:  [
                                {
                                    size: 2.5,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sizes:  [
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'front_number',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                            ],
                    type: 'youth',
                },
                {
                    name: 'back_number',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                { 
                                    size: 10,
                                },
                            ],
                    type: 'youth',
                },
                {
                    name: 'shoulder_number',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'sleeve_number',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'numbers_extra',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },                    
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },                
                {
                    name: 'logo',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                }
                            ],
                },
                {
                    name: 'mascot',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                }
                            ],
                },
                {
                    name: 'mascot_2',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                },
                {
                    name: 'mascot_5',
                    sizes:  [
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                },

            ],
    }

    /// Todo: Read This from API for a complete font listing

    ub.data.fontSizes = {

        items: [
            {
                fontID: 1,
                fontName: 'Aachen Bold',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 2,
                fontName: 'Algerian',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 3,
                fontName: 'Angels',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 4,
                fontName: 'Arabian Nights',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 5,
                fontName: 'Athletic',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 6,
                fontName: 'Baccus Expanded',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 7,
                fontName: 'Bean Town',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 8,
                fontName: 'Bomber',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 9,
                fontName: 'Bosox',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 10,
                fontName: 'Brush Script',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 11,
                fontName: 'Carbon Block',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 12,
                fontName: 'Celtic',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 13,
                fontName: 'Cobalt',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 14,
                fontName: 'Cobra',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 15,
                fontName: 'Cracker jack',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 16,
                fontName: 'Demonized',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 17,
                fontName: 'Dodger Script',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },
            {
                fontID: 18,
                fontName: 'Duck Face',
                startSize: 20,
                increment: 10,
                fontSizeTable: [
                    { inputSize: '1', outputSize: 20, }, { inputSize: '2', outputSize: 30, }, { inputSize: '3', outputSize: 40, }, { inputSize: '4', outputSize: 50, },  { inputSize: '5', outputSize: 60, }, { inputSize: '6', outputSize: 70, }, { inputSize: '7', outputSize: 80, }, { inputSize: '8', outputSize: 90, }, { inputSize: '9', outputSize: 100, },  { inputSize: '10', outputSize: 110, },  { inputSize: '11', outputSize: 120, },  { inputSize: '12', outputSize: 130, }, 
                ],
            },



        ],
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

    ub.data.mascots = undefined;

    ub.data.patterns = {};

    ub.data.genders = [
        {
            code: 'men',
            name: 'Men', 
        },
        {
            code: 'women',
            name: 'Women', 
        },
        {
            code: 'youth',
            name: 'Youth', 
        },
    ];

    ub.data.sports = [
        {
            gender: 'Men',
            sports: [
                {
                    code: 'football',
                    name: 'Football',
                    active: "1",
                    tooltip: '',
                    disabledClass: '',
                },
                {
                    code: 'baseball',
                    name: 'Baseball',
                    active: "1",
                    tooltip: 'Coming Soon!',
                    disabledClass: 'disabledClass',

                },
                {
                    code: 'basketball',
                    name: 'Basketball',
                    active: "1",
                    tooltip: 'Coming Soon!',
                    disabledClass: 'disabledClass',
                },
                {
                    code: 'lacrosse',
                    name: 'Lacrosse',
                    active: "1",
                    tooltip: 'Coming Soon!',
                    disabledClass: 'disabledClass',
                },
                {
                    code: 'soccer',
                    name: 'Soccer',
                    active: "1",
                    tooltip: 'Coming Soon!',
                    disabledClass: 'disabledClass',
                }, 
                {
                    code: 'wrestling',
                    name: 'Wrestling',
                    active: "1",
                    tooltip: 'Coming Soon!',
                    disabledClass: 'disabledClass',
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

    // Pseudo Shadow Settings 
    // {
    //     name: 'Pseudo Shadow',
    //     default_color: '1e1e1e',
    //     layer_no: 2,
    //     increment_x: 0.005, 
    //     increment_y: 0.0,
    //     outline: 0,
    //     type: 'fill',
    //     zIndex: -3,
    // },

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
                        default_color: 'bdc4c7',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'bdc4c7',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Default
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
                        default_color: '1e1e1e',
                        layer_no: 2,
                        increment_x: 0,
                        increment_y: 0,
                        outline: 1,
                        type: 'outer_stroke',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'bdc4c7',
                        layer_no: 3,
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
                        default_color: 'bdc4c7',
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1,
                        type: 'outer_stroke',
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow',
                        default_color: '1e1e1e',
                        layer_no: 3,
                        increment_x: 0.06, 
                        increment_y: 0.06,
                        outline: 1,
                        type: 'shadow',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'bdc4c7',
                        layer_no: 4,
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
                        default_color: 'e6e6e6',
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1,
                        type: 'middle_stroke',
                        zIndex: -3,
                    },
                    {
                        name: 'Outline 2',
                        default_color: '1e1e1e',
                        layer_no: 3,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 2,
                        type: 'outer_stroke',
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: 'bdc4c7',
                        layer_no: 4,
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
                        default_color: 'e6e6e6',
                        layer_no: 1,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow',
                        default_color: 'bdc4c7',
                        layer_no: 2,
                        increment_x: 0.06, 
                        increment_y: 0.06,
                        outline: 0,
                        zIndex: -2,
                    },
                    {
                        name: 'Mask',
                        default_color: '1e1e1e',
                        layer_no: 3,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Drop Shadow
            // {   // Double Shadow
            //     id: 5,
            //     name: 'Double Shadow',
            //     code: 'double_shadow',
            //     thumbnail: 'double_shadow.png',
            //     layers: [
            //         {
            //             name: 'Base Color',
            //             default_color: '98012e',
            //             layer_no: 1,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -4, 
            //         },
            //         {
            //             name: 'Shadow 1',
            //             default_color: 'bdc4c7',
            //             layer_no: 2,
            //             increment_x: 0.06, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -3,
            //         },
            //         {
            //             name: 'Shadow 2',
            //             default_color: '1e1e1e',
            //             layer_no: 3,
            //             increment_x: 0.12, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -2,
            //         },
            //         {
            //             name: 'Mask',
            //             default_color: 'bdc4c7',
            //             layer_no: 4,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0, 
            //             zIndex: -1,
            //         },
            //     ], 
            // },  // End Double Shadow
            // {   // Shadow
            //     id: 6,
            //     name: 'Shadow',
            //     code: 'shadow',
            //     thumbnail: 'shadow.png',
            //     layers: [
            //         {
            //             name: 'Base Color',
            //             default_color: 'bdc4c7',
            //             layer_no: 1,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -3, 
            //         },
            //         {
            //             name: 'Shadow',
            //             default_color: '1e1e1e',
            //             layer_no: 2,
            //             increment_x: 0.12, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -2,
            //         },
            //         {
            //             name: 'Mask',
            //             default_color: 'bdc4c7',
            //             layer_no: 3,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0, 
            //             zIndex: -1,
            //         },
            //     ], 
            // },  // End Double Shadow
            // // {   // Double Drop Shadow
            // //     id: 7,
            // //     name: 'Double Drop Shadow',
            // //     code: 'double_drop_shadow',
            // //     thumbnail: 'double_drop_shadow.png',
            // //     layers: [
            // //         {
            // //             name: 'Base Color',
            // //             default_color: '98012e',
            // //             layer_no: 1,
            // //             increment_x: 0, 
            // //             increment_y: 0,
            // //             outline: 0,
            // //             zIndex: -4, 
            // //         },
            // //         {
            // //             name: 'Shadow 1',
            // //             default_color: 'bdc4c7',
            // //             layer_no: 2,
            // //             increment_x: 0.06, 
            // //             increment_y: 0.06,
            // //             outline: 0,
            // //             zIndex: -3,
            // //         },
            // //         {
            // //             name: 'Shadow 2',
            // //             default_color: '1e1e1e',
            // //             layer_no: 3,
            // //             increment_x: 0.10, 
            // //             increment_y: 0.10,
            // //             outline: 0,
            // //             zIndex: -2,
            // //         },
            // //         {
            // //             name: 'Mask',
            // //             default_color: 'bdc4c7',
            // //             layer_no: 4,
            // //             increment_x: 0, 
            // //             increment_y: 0,
            // //             outline: 0, 
            // //             zIndex: -1,
            // //         },
            // //     ], 
            // // },  // End Double Drop Shadow
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
                        default_color: 'e6e6e6',
                        layer_no: 2,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 1,
                        type: 'middle_stroke',
                        zIndex: -4,
                    },
                    {
                        name: 'Outline 2',
                        default_color: '1e1e1e',
                        layer_no: 3,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 2,
                        type: 'outer_stroke',
                        zIndex: -3,
                    },
                    {
                        name: 'Shadow',
                        default_color: '1e1e1e',
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
                        default_color: 'bdc4c7',
                        layer_no: 5,
                        increment_x: 0, 
                        increment_y: 0,
                        outline: 0, 
                        zIndex: -1,
                    },
                ], 
            },  // End Outlined with Drop Shadow
            // {   // Center Shadow
            //     id: 9,
            //     name: 'Center Shadow',
            //     code: 'center_shadow',
            //     thumbnail: 'center_shadow.png',
            //     layers: [
            //         {
            //             name: 'Base Color',
            //             default_color: 'bdc4c7',
            //             layer_no: 1,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -3, 
            //         },
            //         {
            //             name: 'Shadow',
            //             default_color: '1e1e1e',
            //             layer_no: 2,
            //             increment_x: -0.03, 
            //             increment_y: -0.03,
            //             outline: 0,
            //             zIndex: -2,
            //         },
            //         {
            //             name: 'Mask',
            //             default_color: 'bdc4c7',
            //             layer_no: 3,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0, 
            //             zIndex: -1,
            //         },
            //     ], 
            // },  // End Center Shadow
            // {   // Outlined with Drop Shadow
            //     id: 10,
            //     name: 'Collegiate Drop Shadow',
            //     code: 'collegiate_drop_shadow',
            //     thumbnail: 'collegiate_drop_shadow.png',
            //     layers: [
            //         {
            //             name: 'Base Color',
            //             default_color: '98012e',
            //             layer_no: 1,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0,
            //             zIndex: -4, 
            //         },
            //         {
            //             name: 'Shadow',
            //             default_color: 'bdc4c7',
            //             layer_no: 2,
            //             increment_x: 0.12, 
            //             increment_y: 0.06,
            //             outline: 0,
            //             type: 'shadow',
            //             zIndex: -3,
            //         },
            //         {
            //             name: 'Shadow Outline',
            //             default_color: '1e1e1e',
            //             layer_no: 3,
            //             increment_x: 0.12, 
            //             increment_y: 0.06,
            //             outline: 1,
            //             type: 'outer_stroke',
            //             zIndex: -2,
            //         },
            //         {
            //             name: 'Mask',
            //             default_color: 'bdc4c7',
            //             layer_no: 4,
            //             increment_x: 0, 
            //             increment_y: 0,
            //             outline: 0, 
            //             zIndex: -1,
            //         },
            //     ], 
            // },  // End Outlined with Drop Shadow

        ],
    }

    ub.uniformSizes = {
        'YXS': {
            name: 'Youth Extra Small',
            active: false
        },
        'YS': {
            name: 'Youth Small',
            active: false
        },
        'YM': {
            name: 'Youth Medium',
            active: false
        },
        'YL': {
            name: 'Youth Large',
            active: false
        },
        'YXL': {
            name: 'Youth Extra Large',
            active: false
        },
        'Y2XL': {
            name: 'Youth Double Extra Large',
            active: false
        },
        'Y3XL': {
            name: 'Youth Triple Extra Large',
            active: false
        },
        'XS': {
            name: 'Extra Small',
            active: false
        },
        'S': {
            name: 'Small',
            active: false
        },
        'M': {
            name: 'Medium',
            active: false
        },
        'L': {
            name: 'Large',
            active: false
        },
        'XL': {
            name: 'Extra Large',
            active: false
        },
        '2XL': {
            name: 'Double Extra Large',
            active: false
        },
        '3XL': {
            name: 'Triple Extra Large',
            active: false
        }
    };

    ub.data.playerNumbers = [

        {
             number: "1",
             status: "free",
         },
         {
             number: "2",
             status: "free",
         },
         {
             number: "3",
             status: "free",
         },
         {
             number: "4",
             status: "free",
         },
         {
             number: "5",
             status: "free",
         },
         {
             number: "6",
             status: "free",
         },
         {
             number: "7",
             status: "free",
         },
         {
             number: "8",
             status: "free",
         },
         {
             number: "9",
             status: "free",
         },
         {
             number: "10",
             status: "free",
         },
         {
             number: "11",
             status: "free",
         },
         {
             number: "12",
             status: "free",
         },
         {
             number: "13",
             status: "free",
         },
         {
             number: "14",
             status: "free",
         },
         {
             number: "15",
             status: "free",
         },
         {
             number: "16",
             status: "free",
         },
         {
             number: "17",
             status: "free",
         },
         {
             number: "18",
             status: "free",
         },
         {
             number: "19",
             status: "free",
         },
         {
             number: "20",
             status: "free",
         },
         {
             number: "21",
             status: "free",
         },
         {
             number: "22",
             status: "free",
         },
         {
             number: "23",
             status: "free",
         },
         {
             number: "24",
             status: "free",
         },
         {
             number: "25",
             status: "free",
         },
         {
             number: "26",
             status: "free",
         },
         {
             number: "27",
             status: "free",
         },
         {
             number: "28",
             status: "free",
         },
         {
             number: "29",
             status: "free",
         },
         {
             number: "30",
             status: "free",
         },
         {
             number: "31",
             status: "free",
         },
         {
             number: "32",
             status: "free",
         },
         {
             number: "33",
             status: "free",
         },
         {
             number: "34",
             status: "free",
         },
         {
             number: "35",
             status: "free",
         },
         {
             number: "36",
             status: "free",
         },
         {
             number: "37",
             status: "free",
         },
         {
             number: "38",
             status: "free",
         },
         {
             number: "39",
             status: "free",
         },
         {
             number: "40",
             status: "free",
         },
         {
             number: "41",
             status: "free",
         },
         {
             number: "42",
             status: "free",
         },
         {
             number: "43",
             status: "free",
         },
         {
             number: "44",
             status: "free",
         },
         {
             number: "45",
             status: "free",
         },
         {
             number: "46",
             status: "free",
         },
         {
             number: "47",
             status: "free",
         },
         {
             number: "48",
             status: "free",
         },
         {
             number: "49",
             status: "free",
         },
         {
             number: "50",
             status: "free",
         },
         {
             number: "51",
             status: "free",
         },
         {
             number: "52",
             status: "free",
         },
         {
             number: "53",
             status: "free",
         },
         {
             number: "54",
             status: "free",
         },
         {
             number: "55",
             status: "free",
         },
         {
             number: "56",
             status: "free",
         },
         {
             number: "57",
             status: "free",
         },
         {
             number: "58",
             status: "free",
         },
         {
             number: "59",
             status: "free",
         },
         {
             number: "60",
             status: "free",
         },
         {
             number: "61",
             status: "free",
         },
         {
             number: "62",
             status: "free",
         },
         {
             number: "63",
             status: "free",
         },
         {
             number: "64",
             status: "free",
         },
         {
             number: "65",
             status: "free",
         },
         {
             number: "66",
             status: "free",
         },
         {
             number: "67",
             status: "free",
         },
         {
             number: "68",
             status: "free",
         },
         {
             number: "69",
             status: "free",
         },
         {
             number: "70",
             status: "free",
         },
         {
             number: "71",
             status: "free",
         },
         {
             number: "72",
             status: "free",
         },
         {
             number: "73",
             status: "free",
         },
         {
             number: "74",
             status: "free",
         },
         {
             number: "75",
             status: "free",
         },
         {
             number: "76",
             status: "free",
         },
         {
             number: "77",
             status: "free",
         },
         {
             number: "78",
             status: "free",
         },
         {
             number: "79",
             status: "free",
         },
         {
             number: "80",
             status: "free",
         },
         {
             number: "81",
             status: "free",
         },
         {
             number: "82",
             status: "free",
         },
         {
             number: "83",
             status: "free",
         },
         {
             number: "84",
             status: "free",
         },
         {
             number: "85",
             status: "free",
         },
         {
             number: "86",
             status: "free",
         },
         {
             number: "87",
             status: "free",
         },
         {
             number: "88",
             status: "free",
         },
         {
             number: "89",
             status: "free",
         },
         {
             number: "90",
             status: "free",
         },
         {
             number: "91",
             status: "free",
         },
         {
             number: "92",
             status: "free",
         },
         {
             number: "93",
             status: "free",
         },
         {
             number: "94",
             status: "free",
         },
         {
             number: "95",
             status: "free",
         },
         {
             number: "96",
             status: "free",
         },
         {
             number: "97",
             status: "free",
         },
         {
             number: "98",
             status: "free",
         },
         {
             number: "99",
             status: "free",
         },        
         {
             number: "00",
             status: "free",
         },        

    ];

ub.funcs.fontOffSets = [

/// Start Badgers
       {   
           location: '32',
           fontName: 'Badgers',
           perspective: 'left',
           size: '4',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 77, 
           adjustmentX: 518,
           scaleY: 1,
           scaleX: 1,
       },{
           location: '32',
           fontName: 'Badgers',
           perspective: 'left',
           size: '3',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 72,
           adjustmentX: 518,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '32',
           fontName: 'Badgers',
           perspective: 'front',
           size: '4',
           origY: 72,
           origX: 733.546,
           adjustmentY: 70,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Badgers',
           perspective: 'front',
           size: '3',
           origY: 72,
           origX: 733.546,
           adjustmentY: 65,
           adjustmentX: 743,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Badgers',
           perspective: 'back',
           size: '4',
           origY: 44,
           origX: 231.546,
           adjustmentY: 44,
           adjustmentX: 233,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Badgers',
           perspective: 'back',
           size: '3',
           origY: 44,
           origX: 231.546,
           adjustmentY: 45,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Badgers',
           perspective: 'left',
           size: '4',
           origY: 180,
           origX: 513.526,
           adjustmentY: 185,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Badgers',
           perspective: 'left',
           size: '3',
           origY: 180,
           origX: 513.526,
           adjustmentY: 185,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '10',
           fontName: 'Badgers',
           perspective: 'front',
           size: '4',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 889,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'Badgers',
           perspective: 'front',
           size: '3',
           origY: 168,
           origX: 873.546,
           adjustmentY: 173,
           adjustmentX: 885,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'Badgers',
           perspective: 'back',
           size: '4',
           origY: 174,
           origX: 107.546,
           adjustmentY: 177,
           adjustmentX: 112,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'Badgers',
           perspective: 'back',
           size: '3',
           origY: 174,
           origX: 107.546,
           adjustmentY: 176,
           adjustmentX: 115,
           scaleY: 1,
           scaleX: 1,                        
       },  
       /// End Badgers

       /// Start Bears
        {   
            location: '32',
            fontName: 'Bears',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentX: 518,
            adjustmentY: 78, 
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Bears',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 76,
            adjustmentX: 518,
            scaleY: 0.7,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Bears',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 739.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Bears',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 69,
            adjustmentX: 739.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Bears',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 237,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Bears',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 48,
            adjustmentX: 245,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Bears',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 178,
            adjustmentX: 517,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Bears',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Bears',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 170,
            adjustmentX: 883,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Bears',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 172,
            adjustmentX: 879,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Bears',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 175,
            adjustmentX: 117,
            scaleY: 1,
            scaleX: 1,                            
        },{
            location: '10',
            fontName: 'Bears',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 174,
            adjustmentX: 119,
            scaleY: 1,
            scaleX: 1,                   
        },  
        /// End Bears

 /// Start Beaver Block
        {   
            location: '32',
            fontName: 'Beaver Block',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentX: 518,
            adjustmentY: 80, 
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Beaver Block',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 77,
            adjustmentX: 520,
            scaleY: 0.65,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 70,
            adjustmentX: 745,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 69,
            adjustmentX: 742,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 237,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 50,
            adjustmentX: 240,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Beaver Block',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Beaver Block',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 182,
            adjustmentX: 517,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 175,
            adjustmentX: 885,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 175,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 176,
            adjustmentX: 112,
            scaleY: 1,
            scaleX: 1,                                
        },{
            location: '10',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 176,
            adjustmentX: 119,
            scaleY: 1,
            scaleX: 1,
        },
        /// End Beaver Block

       /// Start Buffs Bold
        {   
            location: '32',
            fontName: 'Buffs Bold',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 74, 
            adjustmentX: 518,
            scaleY: 0.65,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Buffs Bold',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 75,
            adjustmentX: 518,
            scaleY: 0.60,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Buffs Bold',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 743,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Buffs Bold',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 71,
            adjustmentX: 740,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Buffs Bold',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 240,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Buffs Bold',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 48,
            adjustmentX: 245,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Buffs Bold',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 517,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Buffs Bold',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 178,
            adjustmentX: 517,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Buffs Bold',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 171,
            adjustmentX: 887,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Buffs Bold',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 172,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Buffs Bold',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 171,
            adjustmentX: 113,
            scaleY: 1,
            scaleX: 1,                                       
        },{
            location: '10',
            fontName: 'Buffs Bold',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 172,
            adjustmentX: 113,
            scaleY: 1,
            scaleX: 1, 
        },
        /// End Buffs Bold

        /// Start CHARGERS
        {   
            location: '32',
            fontName: 'CHARGERS',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 86, 
            adjustmentX: 518,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'CHARGERS',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 81,
            adjustmentX: 520,
            scaleY: 0.63,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 755,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 70,
            adjustmentX: 751,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 55,
            adjustmentX: 225,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 59,
            adjustmentX: 228,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'CHARGERS',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 193,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'CHARGERS',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 190,
            adjustmentX: 518,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 187,
            adjustmentX: 889,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 182,
            adjustmentX: 877,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 187,
            adjustmentX: 113,
            scaleY: 1,
            scaleX: 1,                                        
        },{
            location: '10',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 182,
            adjustmentX: 121,
            scaleY: 1,
            scaleX: 1,
        },
        /// End CHARGERS     


        /// Start Carbon Block
        {   
            location: '32',
            fontName: 'Carbon Block',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 74, 
            adjustmentX: 518,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Carbon Block',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 75,
            adjustmentX: 518,
            scaleY: 0.65,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 745,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 67,
            adjustmentX: 746,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 237,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 45,
            adjustmentX: 236,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Carbon Block',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 182,
            adjustmentX: 517,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Carbon Block',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 518,
            scaleY: 1.10,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 175,
            adjustmentX: 887,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 175,
            adjustmentX: 885,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 175,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 175,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,                                     
        },
        /// End Carbon Block


       /// Start Full Block
        {   
            location: '32',
            fontName: 'Full Block',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 82, 
            adjustmentX: 518,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Full Block',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 79,
            adjustmentX: 520,
            scaleY: 0.65,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Full Block',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 750,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Full Block',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 745,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Full Block',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 45,
            adjustmentX: 230,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Full Block',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 49,
            adjustmentX: 236,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Full Block',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 185,
            adjustmentX: 515,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Full Block',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 185,
            adjustmentX: 515,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Full Block',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 177,
            adjustmentX: 885,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Full Block',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 176,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Full Block',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 180,
            adjustmentX: 107,
            scaleY: 1,
            scaleX: 1,                                            
        },{
            location: '10',
            fontName: 'Full Block',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 176,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,    
        },
        /// End Full Block


        /// Start HAWKS
        {   
            location: '32',
            fontName: 'HAWKS',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 85, 
            adjustmentX: 518,
            scaleY: 0.57,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'HAWKS',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 83,
            adjustmentX: 520,
            scaleY: 0.68,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 758,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 750,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 55,
            adjustmentX: 223,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 53,
            adjustmentX: 230,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'HAWKS',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 193,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'HAWKS',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 190,
            adjustmentX: 518,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 185,
            adjustmentX: 888,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 182,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 187,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,                                           
        },{
            location: '10',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 182,
            adjustmentX: 119,
            scaleY: 1,
            scaleX: 1,       
        },
        /// End HAWKS

        /// Start Horned Frogs
        {   
            location: '32',
            fontName: 'Horned Frogs',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 79, 
            adjustmentX: 518,
            scaleY: 0.56,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Horned Frogs',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 79,
            adjustmentX: 520,
            scaleY: 0.68,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 745,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 70,
            adjustmentX: 743,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 235,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 50,
            adjustmentX: 240,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Horned Frogs',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 183,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Horned Frogs',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 183,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 172,
            adjustmentX: 885,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 175,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 177,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,                              
        },{
            location: '10',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 175,
            adjustmentX: 119,
            scaleY: 1,
            scaleX: 1,       
        },
        /// End Horned Frogs

        /// Start Jaguars
        {   
            location: '32',
            fontName: 'Jaguars',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 85, 
            adjustmentX: 518,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Jaguars',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 82,
            adjustmentX: 520,
            scaleY: 0.7,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 75,
            adjustmentX: 755,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 748,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 55,
            adjustmentX: 230,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 60,
            adjustmentX: 240,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Jaguars',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 190,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Jaguars',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 188,
            adjustmentX: 518,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 185,
            adjustmentX: 882,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 178,
            adjustmentX: 873,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 185,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,                               
        },{
            location: '10',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 183,
            adjustmentX: 125,
            scaleY: 1,
            scaleX: 1,       
        },
        /// End Jaguars


        /// Start MARYLAND
        {   
            location: '32',
            fontName: 'MARYLAND',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 77, 
            adjustmentX: 518,
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'MARYLAND',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 77,
            adjustmentX: 520,
            scaleY: 0.68,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 739.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 70,
            adjustmentX: 740,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 237,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 50,
            adjustmentX: 245,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'MARYLAND',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'MARYLAND',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 518,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 172,
            adjustmentX: 887,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 172,
            adjustmentX: 874,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 170,
            adjustmentX: 114,
            scaleY: 1,
            scaleX: 1,                               
        },{
            location: '10',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 172,
            adjustmentX: 125,
            scaleY: 1,
            scaleX: 1,         
        },
        /// End MARYLAND

 // Start Pistons
       {   
           location: '32',
           fontName: 'PISTONS',
           perspective: 'left',
           size: '4',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 80, 
           adjustmentX: 518,
           scaleY: 0.6,
           scaleX: 1,
       },{
           location: '32',
           fontName: 'PISTONS',
           perspective: 'left',
           size: '3',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 78,
           adjustmentX: 520,
           scaleY: 0.7,
           scaleX: 1,            
       },{
           location: '32',
           fontName: 'PISTONS',
           perspective: 'front',
           size: '4',
           origY: 72,
           origX: 733.546,
           adjustmentY: 72,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'PISTONS',
           perspective: 'front',
           size: '3',
           origY: 72,
           origX: 733.546,
           adjustmentY: 70,
           adjustmentX: 742,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'PISTONS',
           perspective: 'back',
           size: '4',
           origY: 44,
           origX: 231.546,
           adjustmentY: 44,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'PISTONS',
           perspective: 'back',
           size: '3',
           origY: 44,
           origX: 231.546,
           adjustmentY: 45,
           adjustmentX: 240,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'PISTONS',
           perspective: 'left',
           size: '4',
           origY: 180,
           origX: 513.526,
           adjustmentY: 182,
           adjustmentX: 516,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'PISTONS',
           perspective: 'left',
           size: '3',
           origY: 180,
           origX: 513.526,
           adjustmentY: 182,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '10',
           fontName: 'PISTONS',
           perspective: 'front',
           size: '4',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 885,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'PISTONS',
           perspective: 'front',
           size: '3',
           origY: 168,
           origX: 873.546,
           adjustmentY: 173,
           adjustmentX: 878,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'PISTONS',
           perspective: 'back',
           size: '4',
           origY: 174,
           origX: 107.546,
           adjustmentY: 176,
           adjustmentX: 113,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'PISTONS',
           perspective: 'back',
           size: '3',
           origY: 174,
           origX: 107.546,
           adjustmentY: 173,
           adjustmentX: 115,
           scaleY: 1,
           scaleX: 1,         
       },
       /// End Pistons

       /// Start Sky Line
       {   
           location: '32',
           fontName: 'Sky Line',
           perspective: 'left',
           size: '4',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 80, 
           adjustmentX: 518,
           scaleY: 0.6,
           scaleX: 1,
       },{
           location: '32',
           fontName: 'Sky Line',
           perspective: 'left',
           size: '3',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 77,
           adjustmentX: 518,
           scaleY: 0.68,
           scaleX: 1,            
       },{
           location: '32',
           fontName: 'Sky Line',
           perspective: 'front',
           size: '4',
           origY: 72,
           origX: 733.546,
           adjustmentY: 72,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Sky Line',
           perspective: 'front',
           size: '3',
           origY: 72,
           origX: 733.546,
           adjustmentY: 70,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Sky Line',
           perspective: 'back',
           size: '4',
           origY: 44,
           origX: 231.546,
           adjustmentY: 44,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Sky Line',
           perspective: 'back',
           size: '3',
           origY: 44,
           origX: 231.546,
           adjustmentY: 52,
           adjustmentX: 240,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Sky Line',
           perspective: 'left',
           size: '4',
           origY: 180,
           origX: 513.526,
           adjustmentY: 180,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Sky Line',
           perspective: 'left',
           size: '3',
           origY: 180,
           origX: 513.526,
           adjustmentY: 180,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '10',
           fontName: 'Sky Line',
           perspective: 'front',
           size: '4',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 883,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'Sky Line',
           perspective: 'front',
           size: '3',
           origY: 168,
           origX: 873.546,
           adjustmentY: 173,
           adjustmentX: 872,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'Sky Line',
           perspective: 'back',
           size: '4',
           origY: 174,
           origX: 107.546,
           adjustmentY: 175,
           adjustmentX: 110,
           scaleY: 1,
           scaleX: 1,                                       
       },{
           location: '10',
           fontName: 'Sky Line',
           perspective: 'back',
           size: '3',
           origY: 174,
           origX: 107.546,
           adjustmentY: 173,
           adjustmentX: 120,
           scaleY: 1,
           scaleX: 1,           
       },
       /// End Sky Line

      /// Start Spartans
       {   
           location: '32',
           fontName: 'Spartans',
           perspective: 'left',
           size: '4',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 79, 
           adjustmentX: 518,
           scaleY: 0.57,
           scaleX: 1,
       },{
           location: '32',
           fontName: 'Spartans',
           perspective: 'left',
           size: '3',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 77,
           adjustmentX: 518,
           scaleY: 0.7,
           scaleX: 1,            
       },{
           location: '32',
           fontName: 'Spartans',
           perspective: 'front',
           size: '4',
           origY: 72,
           origX: 733.546,
           adjustmentY: 72,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Spartans',
           perspective: 'front',
           size: '3',
           origY: 72,
           origX: 733.546,
           adjustmentY: 73,
           adjustmentX: 743,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Spartans',
           perspective: 'back',
           size: '4',
           origY: 44,
           origX: 231.546,
           adjustmentY: 39,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Spartans',
           perspective: 'back',
           size: '3',
           origY: 44,
           origX: 231.546,
           adjustmentY: 45,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Spartans',
           perspective: 'left',
           size: '4',
           origY: 180,
           origX: 513.526,
           adjustmentY: 180,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Spartans',
           perspective: 'left',
           size: '3',
           origY: 180,
           origX: 513.526,
           adjustmentY: 180,
           adjustmentX: 515,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '10',
           fontName: 'Spartans',
           perspective: 'front',
           size: '4',
           origY: 168,
           origX: 873.546,
           adjustmentY: 177,
           adjustmentX: 885,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'Spartans',
           perspective: 'front',
           size: '3',
           origY: 168,
           origX: 873.546,
           adjustmentY: 173,
           adjustmentX: 873,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'Spartans',
           perspective: 'back',
           size: '4',
           origY: 174,
           origX: 107.546,
           adjustmentY: 173,
           adjustmentX: 108,
           scaleY: 1,
           scaleX: 1,                                        
       },{
           location: '10',
           fontName: 'Spartans',
           perspective: 'back',
           size: '3',
           origY: 174,
           origX: 107.546,
           adjustmentY: 173,
           adjustmentX: 117,
           scaleY: 1,
           scaleX: 1,       
       },
       /// End Spartans

/// Start Syracuse
       {   
           location: '32',
           fontName: 'Syracuse',
           perspective: 'left',
           size: '4',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 79, 
           adjustmentX: 518,
           scaleY: 0.58,
           scaleX: 1,
       },{
           location: '32',
           fontName: 'Syracuse',
           perspective: 'left',
           size: '3',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 78,
           adjustmentX: 518,
           scaleY: 0.7,
           scaleX: 1,            
       },{
           location: '32',
           fontName: 'Syracuse',
           perspective: 'front',
           size: '4',
           origY: 72,
           origX: 733.546,
           adjustmentY: 72,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Syracuse',
           perspective: 'front',
           size: '3',
           origY: 72,
           origX: 733.546,
           adjustmentY: 70,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Syracuse',
           perspective: 'back',
           size: '4',
           origY: 44,
           origX: 231.546,
           adjustmentY: 44,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Syracuse',
           perspective: 'back',
           size: '3',
           origY: 44,
           origX: 231.546,
           adjustmentY: 53,
           adjustmentX: 245,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Syracuse',
           perspective: 'left',
           size: '4',
           origY: 180,
           origX: 513.526,
           adjustmentY: 183,
           adjustmentX: 519.5,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Syracuse',
           perspective: 'left',
           size: '3',
           origY: 180,
           origX: 513.526,
           adjustmentY: 180,
           adjustmentX: 517,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '10',
           fontName: 'Syracuse',
           perspective: 'front',
           size: '4',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 885,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'Syracuse',
           perspective: 'front',
           size: '3',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 875,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'Syracuse',
           perspective: 'back',
           size: '4',
            origY: 174,
           origX: 107.546,
           adjustmentY: 175,
           adjustmentX: 112,
           scaleY: 1,
           scaleX: 1,                                        
       },{
           location: '10',
           fontName: 'Syracuse',
           perspective: 'back',
           size: '3',
           origY: 174,
           origX: 107.546,
           adjustmentY: 175,
           adjustmentX: 125,
           scaleY: 1,
           scaleX: 1,
       },
       /// End Syracuse

        /// Start Upright
        {   
            location: '32',
            fontName: 'Upright',
            perspective: 'left',
            size: '4',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 78, 
            adjustmentX: 518,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '32',
            fontName: 'Upright',
            perspective: 'left',
            size: '3',
            origY: 74,            
            origX: 505.546,
            adjustmentY: 76,
            adjustmentX: 518,
            scaleY: 0.69,
            scaleX: 1,            
        },{
            location: '32',
            fontName: 'Upright',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 739.5,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Upright',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 733.546,
            adjustmentY: 72,
            adjustmentX: 743,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Upright',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 231.546,
            adjustmentY: 44,
            adjustmentX: 237,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '32',
            fontName: 'Upright',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 231.546,
            adjustmentY: 45,
            adjustmentX: 245,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Upright',
            perspective: 'left',
            size: '4',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 517,
            scaleY: 1,
            scaleX: 1,                         
        },{
            location: '10',
            fontName: 'Upright',
            perspective: 'left',
            size: '3',
            origY: 180,
            origX: 513.526,
            adjustmentY: 180,
            adjustmentX: 519.5,
            scaleY: 1,
            scaleX: 1,            
        },{
            location: '10',
            fontName: 'Upright',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 873.546,
            adjustmentY: 175,
            adjustmentX: 883,
            scaleY: 1,
            scaleX: 1,                        
        },{
            location: '10',
            fontName: 'Upright',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 873.546,
            adjustmentY: 173,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,                                     
        },{
            location: '10',
            fontName: 'Upright',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 107.546,
            adjustmentY: 175,
            adjustmentX: 883,
            scaleY: 1,
            scaleX: 1,                                                 
        },{
            location: '10',
            fontName: 'Upright',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 107.546,
            adjustmentY: 173,
            adjustmentX: 879.5,
            scaleY: 1,
            scaleX: 1,   
        },
        /// End Upright      

        // Start Yard Line
       {   
           location: '32',
           fontName: 'Yard Line',
           perspective: 'left',
           size: '4',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 80, 
           adjustmentX: 518,
           scaleY: 0.58,
           scaleX: 1,
       },{
           location: '32',
           fontName: 'Yard Line',
           perspective: 'left',
           size: '3',
           origY: 74,            
           origX: 505.546,
           adjustmentY: 76,
           adjustmentX: 518,
           scaleY: 0.68,
           scaleX: 1,            
       },{
           location: '32',
           fontName: 'Yard Line',
           perspective: 'front',
           size: '4',
           origY: 72,
           origX: 733.546,
           adjustmentY: 72,
           adjustmentX: 745,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Yard Line',
           perspective: 'front',
           size: '3',
           origY: 72,
           origX: 733.546,
           adjustmentY: 72,
           adjustmentX: 743,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Yard Line',
           perspective: 'back',
           size: '4',
           origY: 44,
           origX: 231.546,
           adjustmentY: 44,
           adjustmentX: 237,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '32',
           fontName: 'Yard Line',
           perspective: 'back',
           size: '3',
           origY: 44,
           origX: 231.546,
           adjustmentY: 48,
           adjustmentX: 240,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Yard Line',
           perspective: 'left',
           size: '4',
           origY: 180,
           origX: 513.526,
           adjustmentY: 182,
           adjustmentX: 517,
           scaleY: 1,
           scaleX: 1,                         
       },{
           location: '10',
           fontName: 'Yard Line',
           perspective: 'left',
           size: '3',
           origY: 180,
           origX: 513.526,
           adjustmentY: 182,
           adjustmentX: 519.5,
           scaleY: 1,
           scaleX: 1,            
       },{
           location: '10',
           fontName: 'Yard Line',
           perspective: 'front',
           size: '4',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 883,
           scaleY: 1,
           scaleX: 1,                        
       },{
           location: '10',
           fontName: 'Yard Line',
           perspective: 'front',
           size: '3',
           origY: 168,
           origX: 873.546,
           adjustmentY: 175,
           adjustmentX: 879.5,
           scaleY: 1,
           scaleX: 1,                                     
       },{
           location: '10',
           fontName: 'Yard Line',
           perspective: 'back',
           size: '4',
           origY: 174,
           origX: 107.546,
           adjustmentY: 175,
           adjustmentX: 112,
           scaleY: 1,
           scaleX: 1,                                                                         
       },{
           location: '10',
           fontName: 'Yard Line',
           perspective: 'back',
           size: '3',
           origY: 174,
           origX:107.546,
           adjustmentY: 175,
           adjustmentX: 115,
           scaleY: 1,
           scaleX: 1,
       },
       /// End Yard Line         

    ];

    ub.funcs.load_fonts = function () {

        var font_builder = '';

        _.each( ub.data.fonts, function (item) {

            font_builder +=  "@font-face {\n" +
                             "\tfont-family: \"" +  item.name + "\";\n" + 
                             "\tsrc: url('" + item.font_path + "');\n" + 
                             "\tformat('truetype');\n" + 
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

//    ub.funcs.load_fonts();


});