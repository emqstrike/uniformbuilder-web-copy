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

    ub.current_material             = {};
    ub.current_material.settings    = {};

    ub.states                       = {};
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
                                    size: 2,
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
                },
                {
                    code: 'baseball',
                    name: 'Baseball',
                    active: "1",
                },
                {
                    code: 'basketball',
                    name: 'Basketball',
                    active: "1",
                },
                {
                    code: 'lacrosse',
                    name: 'Lacrosse',
                    active: "1",
                },
                {
                    code: 'soccer',
                    name: 'Soccer',
                    active: "1",
                }, 
                {
                    code: 'wrestling',
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