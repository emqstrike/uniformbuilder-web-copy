$(document).ready(function() {

    ub.errors = [];

    ub.uiVersion = "v2";
    ub.offsetValue = 70;

    ub.funcs.ui = {};
    ub.is = {};
    ub.ui = {};
    
    ub.ui.drops = {};
    ub.modifiers = {};
    ub.tethers = {}; 
    ub.dimensions = {};
    ub.dimensions.width = 1000;
    ub.dimensions.height = 1100;
    ub.offset = {x: 70, y: 70};
    ub.active = null;
    ub.vars = {};

    // The sport of the current uniform that is being edited will be stored here, an alias for ub.current_material.material.uniform_category
    ub.sport = ''; 

    // Max number of material option for the the uniform in every perspective, is used to generate zIndex values
    ub.maxLayers = 0;
    ub.zIndexMultiplier = 4;

    ub.uiTools = {};

    ub.nlp = {};

    ub.totalWidth = 1000;

    /// Search

    ub.searchResults = {};

    /// For Interactive Viewport

    ub.ALPHA_ON = 1;
    ub.ALPHA_OFF = 0.1;

    ub.activeApplication = undefined;

    // Manipulator Tools 

    ub.tools = {};

    ub.tools.activeTool = {

        moveTool: false,
        scaleTool: false,
        rotateTool: false,
        resetTool: false,
        deleteTool: false,
        deactivate: function () {

            this.moveTool   = false;
            this.scaleTool  = false;
            this.rotateTool = false;
            this.resetTool  = false;
            this.deleteTool = false;
            
        }, 
        active: function () {

            return (this.moveTool || this.scaleTool || this.rotateTool || this.resetTool || this.deleteTool) 

        },

    }

    ub.tools.manipulator = {};
    ub.tools.manipulator.tools = undefined;

    ub.status = {};
    ub.status.manipulatorDown = false;

    // End Manipulator Tools 

    // Filters

    ub.filterStructure = {};

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
    ub.renderer.backgroundColor     = 0x61605e;

    // var _bg                         = window.ub.pixi.new_sprite('/images/uiV1/bg.jpg');
    
    // ub.stage.addChild(_bg); 
    // ub.bg = _bg;

    ub.stage.addChild(ub.left_view);
    ub.stage.addChild(ub.front_view);
    ub.stage.addChild(ub.back_view);
    ub.stage.addChild(ub.right_view);
    ub.stage.addChild(ub.pattern_view);
    ub.stage.addChild(ub.gradient_preview);

    if (typeof ub.renderer !== "undefined" && ub.pCanvas !== null) {
        ub.pCanvas.appendChild(ub.renderer.view);
    }

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
    ub.current_material.settings.pipings        = {};
    ub.current_material.settings.randomFeeds    = {};

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
    ub.data.sorting                 = false; // Use as flag when an element in the layers tool is being dragged see ub.funcs.updateLayerTool
    ub.data.justSorted              = false; // Use as flag so that mouseup from layer drag can cancel mouseup from draggable window

    ub.data.design_sets             = undefined;
    ub.data.materials               = undefined;
    ub.data.colors                  = {};
    ub.data.fonts                   = undefined;
    ub.data.pipings                 = undefined;
    ub.data.tagged_styles           = {};

    ub.data.backTabLayer            = -100 * 3;
    ub.data.prolookLayer            = -101 * 3; 

    ub.data.maxLength               = 12;
    ub.data.maxLengthNumbers        = 2;
    ub.data.maxLengthSublimated     = 32;

    ub.data.hasProcessedArtworks    = false;

    // URLS
    ub.data.inkSoftBaseURL          = 'https://stores.inksoft.com';
    ub.data.inkSoftProlookStore     = '/Prolook_Sports';
    ub.data.inksoftFontsFolder      = 'https://s3-us-west-2.amazonaws.com/uniformbuilder/inksoft-fonts/';

    ub.config.switchToFrontBody     = new Date('Fri Aug 14 2017 17:08:32 GMT+0800 (+08)');

    // Mock Object for Pipings 

    ub.folders                      = { piping: '/images/pipings' } ;
 
    ub.data.pipings                 = [
            
        /// Neck Piping
            {
            
            name: 'Neck Piping 1/8',
            size: '1/8',
            set: 'Neck Piping',
            color1: true,
            color2: true,
            color3: false,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        {
            
            name: 'Neck Piping 1/4',
            size: '1/4',
            set: 'Neck Piping',
            color1: true,
            color2: false,
            color3: false,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Neck Piping/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 

        /// End Neck Piping 
        
        /// Yoke Piping
                {
            
            name: 'Yoke Piping 1/8',
            size: '1/8',
            set: 'Yoke Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        {
            
            name: 'Yoke Piping 1/4',
            size: '1/4',
            set: 'Yoke Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Yoke Piping/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 

        /// End Yoke Piping 

        /// Center Piping
        {
            
            name: 'Center Piping 1/8',
            size: '1/8',
            set: 'Center Piping',
            color1: true,
            color2: false,
            color3: false,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/eighth/Front/1.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/eighth/Back/1.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/eighth/Left/1.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/eighth/Right/1.png',
                        },
                    ]
                },
            ]

        },
        {
            
            name: 'Center Piping 1/4',
            size: '1/4',
            set: 'Center Piping',
            color1: true,
            color2: false,
            color3: false,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/fourth/Front/1.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/fourth/Back/1.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/fourth/Left/1.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Center Piping/fourth/Right/1.png',
                        }
                    ]
                },
            ]

        }, 

        /// End Center Piping

        /// Left End of Sleeve Piping
        {
            
            name: 'Left End of Sleeve Piping 1/8',
            size: '1/8',
            set: 'Left End of Sleeve Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        
        {
            
            name: 'Left End of Sleeve Piping 1/4',
            size: '1/4',
            set: 'Left End of Sleeve Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
        {
            
            name: 'Left End of Sleeve Piping 1/2',
            size: '1/2',
            set: 'Left End of Sleeve Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left End of Sleeve Piping/half/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
        
        /// End Left End of Sleeve Piping

        /// Right End of Sleeve Piping
        {
            
            name: 'Right End of Sleeve Piping 1/8',
            size: '1/8',
            set: 'Right End of Sleeve Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        
        {
            
            name: 'Right End of Sleeve Piping 1/4',
            size: '1/4',
            set: 'Right End of Sleeve Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
        {
            
            name: 'Right End of Sleeve Piping 1/2',
            size: '1/2',
            set: 'Right End of Sleeve Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right End of Sleeve Piping/half/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
        
        /// End Right End of Sleeve Piping

        /// Left Sleeve Piping
          {
            
            name: 'Left Sleeve Piping 1-inch Up 1/8',
            size: '1/8',
            set: 'Left Sleeve Piping 1-inch Up',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        {
            
            name: 'Left Sleeve Piping 1-inch Up 1/4',
            size: '1/4',
            set: 'Left Sleeve Piping 1-inch Up',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
        {
            
            name: 'Left Sleeve Piping 1-inch Up 1/2',
            size: '1/2',
            set: 'Left Sleeve Piping 1-inch Up',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Sleeve Piping 1-inch Up/half/Right/3.png',
                        }
                    ]
                },
            ]

        }, 

        /// End Left Sleeve Piping 1-inch Up

        /// Right Sleeve Piping
        {   
            name: 'Right Sleeve Piping 1-inch Up 1/8',
            size: '1/8',
            set: 'Right Sleeve Piping 1-inch Up',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        {
            
            name: 'Right Sleeve Piping 1-inch Up 1/4',
            size: '1/4',
            set: 'Right Sleeve Piping 1-inch Up',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
        {
            
            name: 'Right Sleeve Piping 1-inch Up 1/2',
            size: '1/2',
            set: 'Right Sleeve Piping 1-inch Up',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Sleeve Piping 1-inch Up/half/Right/3.png',
                        }
                    ]
                },
            ]

        },
        /// End Left End of Sleeve Piping

        //////////////

        /// Left Set-in Piping
        {
            
            name: 'Left Set-in Piping 1/8',
            size: '1/8',
            set: 'Left Set-in Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        {
            
            name: 'Left Set-in Piping 1/4',
            size: '1/4',
            set: 'Left Set-in Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Left Set-in Piping/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
    
        /// End Left Set-in Piping

        /// Right Set-in Piping
        {   
            name: 'Right Set-in Piping 1/8',
            size: '1/8',
            set: 'Right Set-in Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/eighth/Right/3.png',
                        }
                    ]
                },
            ]

        },
        {
            
            name: 'Right Set-in Piping 1/4',
            size: '1/4',
            set: 'Right Set-in Piping',
            color1: true,
            color2: true,
            color3: true,
            perspectives: [
                {
                    perspective: 'front',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Front/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Front/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Front/3.png',
                        }
                    ]
                },
                {
                    perspective: 'back',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Back/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Back/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Back/3.png',
                        }
                    ]
                },
                {
                    perspective: 'left',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Left/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Left/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Left/3.png',
                        }
                    ]
                },
                {
                    perspective: 'right',
                    layers: [
                        {
                            position: 1,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Right/1.png',
                        },
                        {
                            position: 2,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Right/2.png',
                        },
                        {
                            position: 3,
                            filename: ub.folders.piping + '/Right Set-in Piping/fourth/Right/3.png',
                        }
                    ]
                },
            ]

        }, 
       
        /// End Left End of Sleeve Piping
        
    ];

    ub.data.pipings                 = [];

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


        /// Football
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

    ub.data.sportAliases = {

        items: [
            {
                name: "Football",
                alias: "football",
            },
            {
                name: "Football 2017",
                alias: "football 2017",
            },
            {
                name: "Wrestling",
                alias: "text_wrestling",
            },
            {
                name: "Baseball",
                alias: "baseball",
            },
            {
                name: "Fastpitch",
                alias: "fastpitch",
            },
            {
                name: "Compression (Apparel)",
                alias: "compression",
            },
            { 
                name: "Tech-Tee (Apparel)",
                alias: "tech-tee",
            },
            { 
                name: "Crew Socks (Apparel)",
                alias: "crew-socks",
            },
            { 
                name: "Hockey",
                alias: "hockey",
            },
            { 
                name: "Cinch Sack (Apparel)",
                alias: "cinch-sack",
            },
            { 
                name: "Volleyball",
                alias: "volleyball",
            },
            { 
                name: "Fan Replica Jersey (Apparel)",
                alias: "fan-replica-jersey",
            },
            { 
                name: "2017 Team Short with Pockets (Apparel)",
                alias: "team-short",
            },
            { 
                name: "Signature Coaches Short (Apparel)",
                alias: "signature-coaches-short",
            },
            { 
                name: "Soccer",
                alias: "soccer",
            },
            { 
                name: "Basketball",
                alias: "basketball",
            },
            { 
                name: "Lacrosse",
                alias: "lacrosse",
            },
            { 
                name: "Game Day Jackets (Apparel)",
                alias: "game-day-jackets",
            },
            { 
                name: "Hoodie (Apparel)",
                alias: "hoodie",
            },
            { 
                name: "Field Hockey",
                alias: "field-hockey",
            },
            { 
                name: "Compression Pant (Apparel)",
                alias: "compression-pant",
            },
            { 
                name: "Wrestling Compression Shorts (Apparel)",
                alias: "wrestling-compression-shorts",
            },
            {
                name: "Cage Jacket (Apparel)",
                alias: "cage-jacket",
            },
            {
                name: "Compression Pant (Apparel)",
                alias: "compression-pant-apparel",
            },
            {
                name: "Polo (Apparel)",
                alias: "polo-apparel",
            },
            {
                name: "Wrestling 2018",
                alias: "wrestling-2018",
            },
            { 
                name: "Socks (Apparel)",
                alias: "socks",
            },
            { 
                name: "Tennis",
                alias: "tennis",
            },
            { 
                name: "SFN Jogger (Apparel)",
                alias: "sfn-jogger",
            },
            { 
                name: "Yoga Pant (Apparel)",
                alias: "yoga-pant",
            },
            { 
                name: "Tech Tee (eSports)",
                alias: "gamer-jersey",
            },

        ],

        getAlias: function (sportName) {

            var _result = _.find(this.items, {name: sportName});

            if (typeof _result === "undefined") {

                ub.utilities.warn(sportName + ' not found.');
                ub.utilities.warn('Forcing lowercase instead. Using (' + sportName.toLowerCase() + ')');

                var _result = {
                    name: sportName,
                    alias: sportName.toLowerCase(),
                }

            }

            return _result;

        }

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
                    code: 'wrestling',
                    name: 'Wrestling',
                    active: "1",
                    tooltip: '',
                    disabledClass: '',
                }, 
                {
                    code: 'basketball',
                    name: 'Basketball',
                    active: "1",
                },
                {
                    code: 'baseball',
                    name: 'Baseball',
                    active: "1",
                },
                {
                    code: 'lacrosse',
                    name: 'Lacrosse',
                    active: "1",
                },
                {
                    code: 'hockey',
                    name: 'Hockey',
                    active: "1",
                },
                {
                    code: 'soccer',
                    name: 'Soccer',
                    active: "1",
                }, 
            ],
        },
        {
            gender: 'Women',
            sports: [
                {
                    code: 'volleyball',
                    name: 'Volleyball',
                    active: "1",
                },
                {
                    code: 'fastpitch',
                    name: 'Fastpitch',
                    active: "1",
                },
                {
                    code: 'soccer',
                    name: 'Soccer',
                }, 
                {
                    code: 'basketball',
                    name: 'Basketball',
                    active: "1",
                },
                {
                    code: 'hockey',
                    name: 'Hockey',
                    active: "1",
                },
                {
                    code: 'field-hockey',
                    name: 'Field Hockey',
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

    ub.data.apparel = [
        {
            gender: 'Men',
            sports: [
                {
                    code: 'polo',
                    name: 'Polo (Apparel)',
                    active: "1",
                },
                {
                    code: 'hoodie',
                    name: 'Hoodie (Apparel)',
                    active: "1",
                },
                {
                    code: 'compression',
                    name: 'Compression (Apparel)',
                    active: "1",
                },
                {
                    code: 'tech_tee',
                    name: 'Tech-Tee (Apparel)',
                    active: "1",
                },
                {
                    code: 'game-day-jackets',
                    name: 'Game Day Jackets (Apparel)',
                    active: "1",
                },
                {
                    code: '1-4 zip',
                    name: 'Quarter Zip Jacket (Apparel)',
                    active: "1",
                },
                {
                    code: 'cage-jacket',
                    name: 'Cage Jacket (Apparel)',
                    active: "1",
                },
                {
                    code: 'fan-replica-jersey',
                    name: 'Fan Replica Jersey (Apparel)',
                    active: "1",
                },
                {
                    code: 'compression-pant',
                    name: 'Compression Pant (Apparel)',
                    active: "1",
                },
                {
                    code: 'team-short',
                    name: '2017 Team Short with Pockets (Apparel)',
                    active: "1",
                },
                {
                    code: 'signature-coaches-short',
                    name: 'Signature Coaches Short (Apparel)',
                    active: "1",
                },
                {
                    code: 'wrestling-compression-shorts',
                    name: 'Wrestling Compression Shorts (Apparel)',
                    active: "1",
                },
                {
                    code: 'cinch_sack',
                    name: 'Cinch Sack (Apparel)',
                    active: "1",
                },
                {
                    code: 'sock',
                    name: 'Socks (Apparel)',
                    active: "1",
                },
                
            ],
        },
        {
            gender: 'Women',
            sports: [
                {
                    code: 'tech_tee',
                    name: 'Tech-Tee (Apparel)',
                    active: "1",
                },
                {
                    code: 'polo',
                    name: 'Polo (Apparel)',
                    active: "1",
                },
                {
                    code: 'fan-replica-jersey',
                    name: 'Fan Replica Jersey (Apparel)',
                    active: "1",
                },
                {
                    code: '1-4 zip',
                    name: 'Quarter Zip Jacket (Apparel)',
                    active: "1",
                },
                {
                    code: 'game-day-jackets',
                    name: 'Game Day Jackets (Apparel)',
                    active: "1",
                },
                {
                    code: 'hoodie',
                    name: 'Hoodie (Apparel)',
                    active: "1",
                },
                {
                    code: 'cage-jacket',
                    name: 'Cage Jacket (Apparel)',
                    active: "1",
                },
                {
                    code: 'cinch_sack',
                    name: 'Cinch Sack (Apparel)',
                    active: "1",
                },
                {
                    code: 'sock',
                    name: 'Socks (Apparel)',
                    active: "1",
                },
            ],
        },
        {
            gender: 'Youth',
            sports: [],
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
                title: 'Single Color',
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
                title: 'Two Color',
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
                title: 'Two Color with Drop Shadow',
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
                        increment_x: 0.03, 
                        increment_y: 0.02,
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
                title: 'Three Color',
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
                title: 'Single Color with Drop Shadow',
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
                        default_color: '1e1e1e',
                        layer_no: 2,
                        increment_x: 0.03, 
                        increment_y: 0.02,
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
                title: 'Three Color with Drop Shadow',
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
                        increment_x: 0.04, 
                        increment_y: 0.03,
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

    ub.data.tailSweeps = [];

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

ub.data.leftSideOverrides = ['Carbon Block', 'CHARGERS', 'Beaver Block', 'Badgers', 'Bears', 'HAWKS', 'Horned Frogs', 'Jaguars', 'MARYLAND', 'Sky Line', 'Spartans', 'Syracuse', 'Yard Line'];

ub.funcs.fontOffSets = [

       /// Start Badgers 33 and 
       {
            location: '33',
            fontName: 'Badgers',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 77,
            adjustmentX: 486.466,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Badgers',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 74,
            adjustmentX: 486.466,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Badgers',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 76,
            adjustmentX: 258.466,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Badgers',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 70,
            adjustmentX: 258.466,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Badgers',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 37,
            adjustmentX: 760.466,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Badgers',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 39,
            adjustmentX: 760.466,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Badgers',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 478.486,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Badgers',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 478.486,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Badgers',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 168,
            adjustmentX: 111,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Badgers',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 168,
            adjustmentX: 117,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Badgers',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 174,
            adjustmentX: 892,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Badgers',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 174,
            adjustmentX: 889,
            scaleY: 1,
            scaleX: 1,
        },
        /// End Badgers 33 and 9

        /// Start CHARGERS
       {
            location: '33',
            fontName: 'CHARGERS',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 86,
            adjustmentX: 474.012,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'CHARGERS',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 81,
            adjustmentX: 472.012,
            scaleY: 0.63,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 79,
            adjustmentX: 244,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 76,
            adjustmentX: 246,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 47,
            adjustmentX: 779,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 53,
            adjustmentX: 775,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'CHARGERS',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 193,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'CHARGERS',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 190,
            adjustmentX: 474.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 188,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'CHARGERS',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 183,
            adjustmentX: 122,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 187,
            adjustmentX: 892,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'CHARGERS',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 180,
            adjustmentX: 884,
            scaleY: 1,
            scaleX: 1,
        },
      /// End CHARGERS 33 ad 9

        /// Start Bears
        {
            location: '33',
            fontName: 'Bears',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 78,
            adjustmentX: 474.012,
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Bears',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 76,
            adjustmentX: 474.012,
            scaleY: 0.7,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Bears',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 79,
            adjustmentX: 260.5,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Bears',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 73,
            adjustmentX: 260.5,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Bears',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 39,
            adjustmentX: 765,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Bears',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 43,
            adjustmentX: 760,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Bears',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 178,
            adjustmentX: 475.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Bears',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Bears',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 173,
            adjustmentX: 117,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Bears',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 172,
            adjustmentX: 121,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Bears',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 174,
            adjustmentX: 887,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Bears',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 172,
            adjustmentX: 885,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Bears 33 and 9
      // Start Beavers Block
       {
            location: '33',
            fontName: 'Beaver Block',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 80,
            adjustmentX: 474.012,
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Beaver Block',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 77,
            adjustmentX: 472.012,
            scaleY: 0.65,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 75,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 72,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 38,
            adjustmentX: 770,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 44,
            adjustmentX: 763,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Beaver Block',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 183,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Beaver Block',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 182,
            adjustmentX: 475.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 116,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Beaver Block',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 119,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 176,
            adjustmentX: 892,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Beaver Block',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 176,
            adjustmentX: 883,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Beaver Block 33 and 9
      /// Start Carbon Block
       {
            location: '33',
            fontName: 'Carbon Block',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 74,
            adjustmentX: 474.012,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Carbon Block',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 75,
            adjustmentX: 474.012,
            scaleY: 0.65,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 79,
            adjustmentX: 254,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 74,
            adjustmentX: 253,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 37,
            adjustmentX: 767,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 37,
            adjustmentX: 765,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Carbon Block',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 182,
            adjustmentX: 475.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Carbon Block',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 474.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Carbon Block',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 117,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 890,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Carbon Block',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 890,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Carbon Block 33 9
      /// Start HAWKS
        {
            location: '33',
            fontName: 'HAWKS',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 85,
            adjustmentX: 474.012,
            scaleY: 0.57,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'HAWKS',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 83,
            adjustmentX: 472.012,
            scaleY: 0.68,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 78,
            adjustmentX: 243,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 80,
            adjustmentX: 248,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 49,
            adjustmentX: 780,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 48,
            adjustmentX: 770,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'HAWKS',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 193,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'HAWKS',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 190,
            adjustmentX: 474.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 185,
            adjustmentX: 112,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'HAWKS',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 182,
            adjustmentX: 118,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 189,
            adjustmentX: 890,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'HAWKS',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 182,
            adjustmentX: 884,
            scaleY: 1,
            scaleX: 1,
        },
      /// End HAWKS 33 and 9
      /// Start Horned Frogs
       {
            location: '33',
            fontName: 'Horned Frogs',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 79,
            adjustmentX: 474.012,
            scaleY: 0.56,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Horned Frogs',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 79,
            adjustmentX: 472.012,
            scaleY: 0.68,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 78,
            adjustmentX: 252,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 73,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 40,
            adjustmentX: 770,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 46,
            adjustmentX: 765,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Horned Frogs',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 183,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Horned Frogs',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 183,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 178,
            adjustmentX: 114,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Horned Frogs',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 176,
            adjustmentX: 117,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 888,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Horned Frogs',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 883,
            scaleY: 1,
            scaleX: 1,
        },
        /// End Horned Frogs 33 and 9
        // Start Jaguars
       {
            location: '33',
            fontName: 'Jaguars',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 85,
            adjustmentX: 474.012,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Jaguars',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 82,
            adjustmentX: 472.012,
            scaleY: 0.7,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 79,
            adjustmentX: 243,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 75,
            adjustmentX: 249,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 52,
            adjustmentX: 775,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 57,
            adjustmentX: 770,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Jaguars',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 190,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Jaguars',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 188,
            adjustmentX: 474.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 185,
            adjustmentX: 116,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Jaguars',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 178,
            adjustmentX: 123,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 185,
            adjustmentX: 887,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Jaguars',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 883,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Jaguars
      /// Start Maryland
        {
            location: '33',
            fontName: 'MARYLAND',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 77,
            adjustmentX: 474.012,
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'MARYLAND',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 77,
            adjustmentX: 472.012,
            scaleY: 0.68,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 79,
            adjustmentX: 258,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 75,
            adjustmentX: 258,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 37,
            adjustmentX: 767,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 45,
            adjustmentX: 760,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'MARYLAND',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'MARYLAND',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 474.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 172,
            adjustmentX: 115,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'MARYLAND',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 124,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 172,
            adjustmentX: 892,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'MARYLAND',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 170,
            adjustmentX: 879,
            scaleY: 1,
            scaleX: 1,
        },
        /// End MARYLAND
        /// Start Sky Line
       {
            location: '33',
            fontName: 'Sky Line',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 80,
            adjustmentX: 474.012,
            scaleY: 0.6,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Sky Line',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 77,
            adjustmentX: 474.012,
            scaleY: 0.68,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Sky Line',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 72,
            adjustmentX: 252,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Sky Line',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 72,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Sky Line',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 43,
            adjustmentX: 765,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Sky Line',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 50,
            adjustmentX: 760,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Sky Line',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 477.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Sky Line',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 477.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Sky Line',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 177,
            adjustmentX: 109,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Sky Line',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 119,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Sky Line',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 887,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Sky Line',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 173,
            adjustmentX: 877,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Sky Line
      /// Start Spartans
       {
            location: '33',
            fontName: 'Spartans',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 79,
            adjustmentX: 474.012,
            scaleY: 0.57,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Spartans',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 77,
            adjustmentX: 474.012,
            scaleY: 0.7,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Spartans',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 73,
            adjustmentX: 254,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Spartans',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 72,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Spartans',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 40,
            adjustmentX: 763,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Spartans',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 45,
            adjustmentX: 763,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Spartans',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 477.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Spartans',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 477.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Spartans',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 110,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Spartans',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 174,
            adjustmentX: 120,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Spartans',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 889,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Spartans',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 173,
            adjustmentX: 880,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Spartans
      /// Start Syracuse
       {
            location: '33',
            fontName: 'Syracuse',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 79,
            adjustmentX: 474.012,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Syracuse',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 78,
            adjustmentX: 474.012,
            scaleY: 0.7,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Syracuse',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 77,
            adjustmentX: 253,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Syracuse',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 73,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Syracuse',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 37,
            adjustmentX: 770,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Syracuse',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 48,
            adjustmentX: 758,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Syracuse',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 183,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Syracuse',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 180,
            adjustmentX: 475.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Syracuse',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 116,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Syracuse',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 124,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Syracuse',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 178,
            adjustmentX: 892,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Syracuse',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 172,
            adjustmentX: 878,
            scaleY: 1,
            scaleX: 1,
        },
        /// End Syracuse
        /// Start Yard Line
       {
            location: '33',
            fontName: 'Yard Line',
            perspective: 'right',
            size: '4',
            origY: 74,
            origX: 486.466,
            adjustmentY: 80,
            adjustmentX: 474.012,
            scaleY: 0.58,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Yard Line',
            perspective: 'right',
            size: '3',
            origY: 74,
            origX: 486.466,
            adjustmentY: 76,
            adjustmentX: 474.012,
            scaleY: 0.68,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Yard Line',
            perspective: 'front',
            size: '4',
            origY: 72,
            origX: 258.466,
            adjustmentY: 72,
            adjustmentX: 254,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Yard Line',
            perspective: 'front',
            size: '3',
            origY: 72,
            origX: 258.466,
            adjustmentY: 72,
            adjustmentX: 255,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Yard Line',
            perspective: 'back',
            size: '4',
            origY: 44,
            origX: 760.466,
            adjustmentY: 42,
            adjustmentX: 764,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '33',
            fontName: 'Yard Line',
            perspective: 'back',
            size: '3',
            origY: 44,
            origX: 760.466,
            adjustmentY: 48,
            adjustmentX: 760,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Yard Line',
            perspective: 'right',
            size: '4',
            origY: 180,
            origX: 478.486,
            adjustmentY: 182,
            adjustmentX: 475.012,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Yard Line',
            perspective: 'right',
            size: '3',
            origY: 180,
            origX: 478.486,
            adjustmentY: 182,
            adjustmentX: 472.512,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Yard Line',
            perspective: 'front',
            size: '4',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 113,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Yard Line',
            perspective: 'front',
            size: '3',
            origY: 168,
            origX: 118.466,
            adjustmentY: 175,
            adjustmentX: 117,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Yard Line',
            perspective: 'back',
            size: '4',
            origY: 174,
            origX: 884.466,
            adjustmentY: 175,
            adjustmentX: 888,
            scaleY: 1,
            scaleX: 1,
        },{
            location: '9',
            fontName: 'Yard Line',
            perspective: 'back',
            size: '3',
            origY: 174,
            origX: 884.466,
            adjustmentY: 17,
            adjustmentX: 885,
            scaleY: 1,
            scaleX: 1,
        },
      /// End Yard Line

        /// END 33 and 9

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

        var _tfFileName = ub.config.host + '/Fonts/tailsweeptrial_2.otf';

        font_builder += "@font-face { \n\tfont-family: 'Tail Sweep Trial 2'; \n\tsrc: url('" + _tfFileName + "'); \n\tformat('opentype');\n}\n";
        font_builder = "<style type=\"text/css\">" + font_builder + "</style>";
        
        $("head").prepend(font_builder);
        
    };

    /// End Fonts 

    // ub.funcs.load_fonts();

    ub.data.undoHistory = undefined;

    ///

    /// Placeholder Application 

    ub.data.placeHolderApplications = [
        {
            id: 100,
            perspective: 'front',
        },
        {
            id: 101,
            perspective: 'back',
        },
        {
            id: 102,
            perspective: 'left',
        },
        {
            id: 103,
            perspective: 'right',
        }
    ];

    /// End Placeholder Application

    /// Block Pattern Lengths 

    ub.data.blockPatternLengths = {

        items: [

            {

                blockPattern: 'ARIZONA',
                widthFront: 1000,
                widthBack: 993,

            },
            {

                blockPattern: 'DELUXE 1',
                widthFront: ub.totalWidth,
                widthBack: ub.totalWidth,

            },
            {

                blockPattern: 'DELUXE 2',
                widthFront: 998,
                widthBack: 1007,

            },
            {

                blockPattern: 'PRO COMBAT',
                widthFront: 998,
                widthBack: 993,

            },
            {

                blockPattern: 'TEXAS TECH 14',
                widthFront: 1003,
                widthBack: 1004,

            },
            {

                blockPattern: 'UA',
                widthFront: ub.totalWidth,
                widthBack: ub.totalWidth,
                
            },
            {

                blockPattern: 'USC',
                widthFront: ub.totalWidth,
                widthBack: 1002,

            },
            {
             
                blockPattern: 'UTAH',
                widthFront: 999,
                widthBack: 1001,

            },


        ],
        getSettings: function (blockPattern) {

            return _.find(this.items, {blockPattern: blockPattern});

        }

    };

    ub.data.blockPatternLength = undefined;

    ub.data.buffsBoldAdjustments = {

        items: [

            {
                blockPattern: "ARIZONA",
                x: 118,
            },
            {
                blockPattern: "DELUXE 1",
                x: 115,
            },
            {
                blockPattern: "DELUXE 2",
                x: 110,
            },
            {
                blockPattern: "PRO COMBAT",
                x: 120,
            },
            {
                blockPattern: "TEXAS TECH 14",
                x: 115,
            },
            {
                blockPattern: "UA",
                x: 115,
            },
            {
                blockPattern: "USC",
                x: 115,
            },
            {
                blockPattern: "UTAH",
                x: 115,
            },
            {
                blockPattern: "INFUSED 14",
                x: 115,
            },

        ],

        getSettings: function (blockPattern) {

            return _.find(this.items, { blockPattern: blockPattern });

        }

    }

    ub.data.buffsBoldAdjustment = undefined;

    ub.data.macFonts = {
        
        items: [
            {
                fontName: 'Yard Line',
                size: 8,
                yOffset: -39,
                scale: { x: 0.92, y: 1.02 }
            },
            {
                fontName: 'Yard Line',
                size: 10,
                yOffset: -40,
                scale: {x: 0.92, y: 1.04}
            },
            {
                fontName: 'Yard Line',
                size: 12,
                yOffset: -45,
                scale: {x: 0.84, y: 1.02}
            },
            {
                fontName: 'HAWKS',
                size: 8,
                yOffset: -33,
                scale: {x: 0.75, y: 1.04},
            },
            {
                fontName: 'HAWKS',
                size: 10,
                yOffset: -35,
                scale: {x: 0.75, y: 1.03},
            },
            {
                fontName: 'HAWKS',
                size: 12,
                yOffset: -38,
                scale: {x: 0.69, y: 1.03},
            },    

            {
                fontName: 'Spartans',
                size: 8,
                yOffset: -30,
                scale: {x: 0.8, y: 1.04},
            },
            {
                fontName: 'Spartans',
                size: 10,
                yOffset: -34,
                scale: {x: 0.8, y: 1.03},
            },
            {
                fontName: 'Spartans',
                size: 12,
                yOffset: -33,
                scale: {x: 0.76, y: 1.04},
            },        
        ],

        getSettings: function (fontName, size) {

            return _.find(this.items, {fontName: fontName, size: size});

        },

    };

    ub.data.pantLocations = {
        items : [40, 39, 38, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12],
        isValidLocation: function (location) {

            return _.includes(this.items, location);

        }
    }

    ub.data.uploading = false;
    ub.data.orderAttachment = "";

    ub.data.validDocumentTypesForUpload = {
        items : ['gif', 'jpg', 'bmp', 'docx', 'doc', 'png', 'jpeg', 'tga', 'pdf', 'ppt', 'pptx'],
        isValidDocument: function (extension) {

            return _.includes(this.items, extension);

        }
    }

    ub.data.sampleFonts = {

        items: [

            {
                sport: 'Football',
                fontName: 'Badgers',
            },
            {
                sport: 'Wrestling',
                fontName: 'Badgers',
            },
            {
                sport: 'Baseball',
                fontName: 'Impact Baseball',
            },
            {
                sport: 'Fastpitch',
                fontName: 'Impact',
            },
            {
                sport: 'Tech-Tee (Apparel)',
                fontName: 'TCT Impact',
            },
            {
                sport: 'Compression (Apparel)',
                fontName: 'TCT Impact',
            },
            {
                sport: 'Hockey',
                fontName: 'HCKY_impact',
            }

        ],
        getSampleFont: function (sport) {

            var _result = _.find(this.items, {sport: sport})

            if (typeof _result === "undefined") { 

                if(ub.data.fonts.length >= 1) {

                    _result = _.first(ub.data.fonts);

                } else {

                    console.warn('Sample Font for ' + sport + ' not found.')

                }

            };

            return _result;

        }

    }

    // This will be used to keep the 1-inch separation between team name / player name and the Front and Back Number
    ub.data.applicationPullUps = {

        items: [

            // Football 2017 
            {
                sport: 'Football 2017',
                applicationNumber: '26',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '26',
                size: 3,
                pullUpHeight: -20,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '26',
                size: 2,
                pullUpHeight: -35,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '27',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '27',
                size: 3,
                pullUpHeight: -20,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '27',
                size: 2,
                pullUpHeight: -35,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '5',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Football 2017',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -35,
            },

            // End Football 2017 

            // Baseball 
            {
                sport: 'Baseball',
                applicationNumber: '26',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Baseball',
                applicationNumber: '26',
                size: 3,
                pullUpHeight: -20,
            },
            {
                sport: 'Baseball',
                applicationNumber: '26',
                size: 2,
                pullUpHeight: -35,
            },
            {
                sport: 'Baseball',
                applicationNumber: '27',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Baseball',
                applicationNumber: '27',
                size: 3,
                pullUpHeight: -20,
            },
            {
                sport: 'Baseball',
                applicationNumber: '27',
                size: 2,
                pullUpHeight: -35,
            },
            {
                sport: 'Baseball',
                applicationNumber: '5',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Baseball',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Baseball',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -35,
            },

            // End Baseball 

            // Fastpitch 

            {
                sport: 'Fastpitch',
                applicationNumber: '26',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '26',
                size: 3,
                pullUpHeight: -20,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '26',
                size: 2,
                pullUpHeight: -35,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '27',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '27',
                size: 3,
                pullUpHeight: -20,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '27',
                size: 2,
                pullUpHeight: -35,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Fastpitch',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -35,
            },


            // End Fastpitch 

            // Compression
             {
                sport: 'Compression (Apparel)',
                applicationNumber: '2',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Compression (Apparel)',
                applicationNumber: '2',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Compression (Apparel)',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Compression (Apparel)',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -21,
            },

            //"Tech-Tee (Apparel)"
            {
                sport: 'Tech-Tee (Apparel)',
                applicationNumber: '2',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Tech-Tee (Apparel)',
                applicationNumber: '2',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Tech-Tee (Apparel)',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Tech-Tee (Apparel)',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },

            // "Hockey"
            {
                sport: 'Hockey',
                applicationNumber: '2',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Hockey',
                applicationNumber: '2',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Hockey',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Hockey',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },

            // "Basketball"
            {
                sport: 'Basketball',
                applicationNumber: '2',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Basketball',
                applicationNumber: '2',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Basketball',
                applicationNumber: '5',
                size: 2,
                pullUpHeight: -21,
            },
            {
                sport: 'Basketball',
                applicationNumber: '5',
                size: 3,
                pullUpHeight: 0,
            },
            {
                sport: 'Basketball',
                applicationNumber: '5',
                size: 4,
                pullUpHeight: 0,
            },
            {
                sport: 'Basketball',
                applicationNumber: '5',
                size: 1,
                pullUpHeight: 0,
            },

        ], 

        getPullUp: function (sport, parentSize, applicationNumber) {
            
            var _parentSize = parentSize; 

            // Handle unset teamnames
            if(isNaN(_parentSize)) {

                _parentSize = 2;

            } 

            var _result = _.find(this.items, {sport: sport, size: _parentSize, applicationNumber: applicationNumber});
            
            if (typeof _result === "undefined") { console.warn('pullUp height for ' + sport + ', size ' + parentSize + ' on ' + applicationNumber + ' not found.')};

            return _result;

        },

    }

    ub.data.mascotOffsetsPant = {

        items: [
            {
                sport: 'baseball',
                option: ['Trad_Elastic_Knicker'],
                applicationNumbers: [37,38,39,40],
                size: 1,
                yAdjustment: -15,
            },
            {
                sport: 'baseball',
                option: ['Trad_Elastic_Knicker'],
                applicationNumbers: [37,38,39,40],
                size: 2,
                yAdjustment: 2,
            },
            {
                sport: 'baseball',
                option: ['Trad_Elastic_Knicker'],
                applicationNumbers: [37,38,39,40],
                size: 3,
                yAdjustment: 28,
            },
            {
                sport: 'baseball',
                option: ['Trad_Elastic_Knicker'],
                applicationNumbers: [37,38,39,40],
                size: 4,
                yAdjustment: 48,
            },
            {
                sport: 'baseball',
                option: ['FullCut_Open_Full', 'Trad_Elastic_Full', 'Trad_Elastic_Mid', 'Trad_Open_Full'],
                applicationNumbers: [37,38,39,40],
                size: 1,
                yAdjustment: -8,
            },
            {
                sport: 'baseball',
                option: ['FullCut_Open_Full', 'Trad_Elastic_Full', 'Trad_Elastic_Mid', 'Trad_Open_Full'],
                applicationNumbers: [37,38,39,40],
                size: 2,
                yAdjustment: 0,
            },
            {
                sport: 'baseball',
                option: ['FullCut_Open_Full', 'Trad_Elastic_Full', 'Trad_Elastic_Mid', 'Trad_Open_Full'],
                applicationNumbers: [37,38,39,40],
                size: 3,
                yAdjustment: 21,
            },
            {
                sport: 'baseball',
                option: ['FullCut_Open_Full', 'Trad_Elastic_Full', 'Trad_Elastic_Mid', 'Trad_Open_Full'],
                applicationNumbers: [37,38,39,40],
                size: 4,
                yAdjustment: 36,
            },
        ],

        getSize: function (sport, option, applicationNumber, size) {

            var _result = _.filter(this.items, {sport: sport});

            if (typeof _result === "undefined" ) { ub.utilities.warn('Pant Mascot offsets for ' + sport + ' not found'); }

            var _object = _.filter(_result, function (item) {

                return _.contains(item.option, option);

            });

            if (typeof _object === "undefined") { ub.utilities.warn('Pant Mascot offsets for ' + sport + ' option ' + option + ' not found'); }

            _object = _.find(_object, {size: size});

            if (typeof _object !== "undefined" && !_.contains(_object.applicationNumbers, applicationNumber)) {

                ub.utilities.warn('Pant Mascot offsets for ' + sport + ' option ' + option + ' # ' + applicationNumber + ' not found');
                _object = undefined;

            }


            return _object;

        }

    }

    ub.data.mascotOffsets = {

        items: [
            {
                sport: 'tech-tee',
                applicationNumber: 1,
                size: 2,
                yAdjustment: -12,
            },
            {
                sport: 'tech-tee',
                applicationNumber: 1,
                size: 3,
                yAdjustment: 4,
            },
            {
                sport: 'tech-tee',
                applicationNumber: 5,
                size: 8,
                yAdjustment: -14,
            },
            {
                sport: 'tech-tee',
                applicationNumber: 5,
                size: 10,
                yAdjustment: 11,
            },
            {
                sport: 'tech-tee',
                applicationNumber: 6,
                size: 6,
                yAdjustment: -15,
            },
            {
                sport: 'tech-tee',
                applicationNumber: 6,
                size: 3,
                yAdjustment: 1,
            },
            {
                sport: 'compression',
                applicationNumber: 1,
                size: 2,
                yAdjustment: -12,
            },
            {
                sport: 'compression',
                applicationNumber: 1,
                size: 3,
                yAdjustment: 4,
            },
            {
                sport: 'compression',
                applicationNumber: 5,
                size: 8,
                yAdjustment: -14,
            },
            {
                sport: 'compression',
                applicationNumber: 5,
                size: 10,
                yAdjustment: 11,
            },
            {
                sport: 'compression',
                applicationNumber: 6,
                size: 2,
                yAdjustment: -15,
            },
            {
                sport: 'compression',
                applicationNumber: 6,
                size: 3,
                yAdjustment: 1,
            },

        ],

        getSize: function (sport, applicationNumber, size) {

            var _result = _.find(this.items, {sport: sport, applicationNumber: applicationNumber, size: size});

            if (typeof _result === "undefined") {

                ub.utilities.warn('Not Found mascot offset for Sport:  ' + sport + ', Location #: ' + applicationNumber + ' size: ' + size);

            }

            return _result;

        }

    }

    // tapos ung adjustment ng font +35 px ( application #'s 37,38,39,40)

    ub.data.mascotSizesPant = {

        items: [

        ],

        getSize: function (sport, size, option) {

            var _result = undefined;
            var _object = undefined;

            _result = _.filter(this.items, {sport: sport, size: size});

            if (typeof _result === "undefined") { ub.utilities.warn('mascotSize for ' + sport + ' not found.')};

            _object = _.find(_result, function (item) { return _.contains(item.option, option) });

            if (typeof _object === "undefined") { ub.utilities.warn('Option ' + option + ' in ' +  sport + ' for size: '  + size + ' not found.')};

            return _object;

        }

    }

    ub.data.mascotSizes = {

        items: [

            {
                sport: 'Default',
                size: 2,
                scale: {x: 0.18, y: 0.18 },
            },
            {
                sport: 'Default',
                size: 3,
                scale: {x: 0.27, y: 0.27 },
            },
            {
                sport: 'Default',
                size: 4,
                scale: {x: 0.36, y: 0.36 },
            },
            {
                sport: 'Default',
                size: 5,
                scale: {x: 0.44, y: 0.44 },
            },
            {
                sport: 'Default',
                size: 8,
                scale: {x: 0.72, y: 0.72 },
            },
            {
                sport: 'Default',
                size: 10,
                scale: {x: 0.90, y: 0.90 },
            },

        ],

        getSize: function (sport, size) {

            var _result = _.find(this.items, {sport: sport, size: size});
            
            var _blockPattern = ub.current_material.material.block_pattern;
            var _blockPatternOptions = ['Cage Jacket'];

            if (sport === 'Baseball' && _.contains(_blockPatternOptions, _blockPattern)) {

                _result = _.find(this.items, {sport: sport, size: size, blockPattern: _blockPattern});

            }
            
            if (typeof _result === "undefined") { 

                ub.utilities.warn('mascotSize for ' + sport + ' not found. Using default'); 

                _result = _.find(this.items, {sport: 'Default', size: size });

                if (typeof _result === "undefined") {

                    ub.utilities.warn('Default size for mascot on ' + sport + ' not found. Using 0.5 x 0.5'); 

                    _result = {
                        sport: sport,
                        size: size,
                        scale: { x: 0.5, y: 0.5 }
                    }

                }

            };

            return _result;

        }

    }

    /// End Block Pattern Lengths

    /// Messages

        ub.data.messageTypes = ['unread', 'orders', 'prolook', 'feedback', 'pm'];
        ub.data.unreadMessages = undefined;

    /// End Messages 

    /// All data loaded before scripts are processed is in window.ub.config

    ub.data.notificationMessage = [

        {
            type: 'unread',
            description: 'If you have new messages it will be listed here.',
        },
        {
            type: 'prolook',
            description: 'This is a place for PROLOOK announcements such as promos, new features released for the customizer and other similar things.',
        },
        {
            type: 'orders',
            description: 'Notifications regarding the order you submitted goes here, such as custom artwork status and overall progress, where your order is now, etc.',
        },
        {
            type: 'pm',
            description: "Direct messages sent to you by other users goes here.",
        },
        {
            type: 'feedback',
            description: 'Your feedback is important to us, our replies to the feedback you send us goes here.',
        },
        {
            type: 'sent',
            description: 'Messages that you sent goes here, if its not yet read by the recipient it is still marked as [New!].',
        }

    ];

    ub.data.tailsweepCharacters = {

        items: [
            {
               code: 'astros', // u+00C0 - u+00C9
               lengths: [
                    {
                        length: 1,
                        character: 'À'// U+00C0
                    },
                    {
                        length: 2,
                        character: 'À'// U+00C0
                    },
                    {
                        length: 3,
                        character: 'À'// U+00C0
                    },
                    {
                        length: 4,
                        character: 'Á'// U+00C1
                    },
                    {
                        length: 5,
                        character: 'Â'// U+00C2
                    },
                    {
                        length: 6,
                        character: 'Ã'// U+00C3
                    },
                    {
                        length: 7,
                        character: 'Ä'// U+00C4
                    },
                    {
                        length: 8,
                        character: 'Å'// U+00C5
                    },
                    {
                        length: 9,
                        character: 'Æ'// U+00C6
                    },
                    {
                        length: 10,
                        character: 'Ç'// U+00C7
                    },
                    {
                        length: 11,
                        character: 'È'// U+00C8
                    },
                    {
                        length: 12,
                        character: 'É'// U+00C9
                    }

               ]
            },
            {
               code: 'brewers', // U+00CA - U+00D3
               lengths: [
                    {
                        length: 1,
                        character: 'Ê'// U+00CA
                    },
                    {
                        length: 2,
                        character: 'Ê'// U+00CA
                    },
                    {
                        length: 3,
                        character: 'Ê'// U+00CA
                    },
                    {
                        length: 4,
                        character: 'Ë'// U+00CB
                    },
                    {
                        length: 5,
                        character: 'Ì'// U+00CC
                    },
                    {
                        length: 6,
                        character: 'Í'// U+00CD
                    },
                    {
                        length: 7,
                        character: 'Î'// U+00CE
                    },
                    {
                        length: 8,
                        character: 'Ï'// U+00CF
                    },
                    {
                        length: 9,
                        character: 'Ð'// U+00D0
                    },
                    {
                        length: 10,
                        character: 'Ñ'// U+00D1
                    },
                    {
                        length: 11,
                        character: 'Ò'// U+00D2
                    },
                    {
                        length: 12,
                        character: 'Ó'// U+00D3
                    }

               ]
            },
            {
               code: 'dodgers', // U+00D4 - U+00DE
               lengths: [
                    {
                        length: 1,
                        character: 'Ô'// U+00D4
                    },
                    {
                        length: 2,
                        character: 'Ô'// U+00D4
                    },
                    {
                        length: 3,
                        character: 'Ô'// U+00D4
                    },
                    {
                        length: 4,
                        character: 'Õ'// U+00D5
                    },
                    {
                        length: 5,
                        character: 'Ö'// U+00D6
                    },
                    {
                        length: 6,
                        character: '×'// U+00D7
                    },
                    {
                        length: 7,
                        character: 'Ø'// U+00D8
                    },
                    {
                        length: 8,
                        character: 'Ù'// U+00D9
                    },
                    {
                        length: 9,
                        character: 'Ú'// U+00DA
                    },
                    {
                        length: 10,
                        character: 'Û'// U+00DB
                    },
                    {
                        length: 11,
                        character: 'Ü'// U+00DC
                    },
                    {
                        length: 12,
                        character: 'Ý'// U+00DD
                    }
               ]
            },
            {
               code: 'orioles', // U+00DE - U+00E7
               lengths: [
                    {
                        length: 1,
                        character: 'Þ'// U+00DE
                    },
                    {
                        length: 2,
                        character: 'Þ'// U+00DE
                    },
                    {
                        length: 3,
                        character: 'Þ'// U+00DE
                    },
                    {
                        length: 4,
                        character: 'ß'// U+00DF
                    },
                    {
                        length: 5,
                        character: 'à'// U+00E0
                    },
                    {
                        length: 6,
                        character: 'á'// U+00E1
                    },
                    {
                        length: 7,
                        character: 'â'// U+00E2
                    },
                    {
                        length: 8,
                        character: 'ã'// U+00E3
                    },
                    {
                        length: 9,
                        character: 'ä'// U+00E4
                    },
                    {
                        length: 10,
                        character: 'å'// U+00E5
                    },
                    {
                        length: 11,
                        character: 'æ'// U+00E6
                    },
                    {
                        length: 12,
                        character: 'ç'// U+00E7
                    }
               ]
            },
            {
               code: 'yankees', // U+00E8 - U+00F1
               lengths: [
                    {
                        length: 1,
                        character: 'è'// U+00E8
                    },
                    {
                        length: 2,
                        character: 'è'// U+00E8
                    },
                    {
                        length: 3,
                        character: 'è'// U+00E8
                    },
                    {
                        length: 4,
                        character: 'é'// U+00E9
                    },
                    {
                        length: 5,
                        character: 'ê'// U+00EA
                    },
                    {
                        length: 6,
                        character: 'ë'// U+00EB
                    },
                    {
                        length: 7,
                        character: 'ì'// U+00EC
                    },
                    {
                        length: 8,
                        character: 'í'// U+00ED
                    },
                    {
                        length: 9,
                        character: 'î'// U+00EE
                    },
                    {
                        length: 10,
                        character: 'ï'// U+00EF
                    },
                    {
                        length: 11,
                        character: 'ð'// U+00F0
                    },
                    {
                        length: 12,
                        character: 'ñ'// U+00F1
                    }
               ]
            },
            {
               code: 'sanfranciscogia', // U+00F2 - U+00FB
               lengths: [
                    {
                        length: 1,
                        character: 'ò'// U+00F2
                    },
                    {
                        length: 2,
                        character: 'ò'// U+00F2
                    },
                    {
                        length: 3,
                        character: 'ò'// U+00F2
                    },
                    {
                        length: 4,
                        character: 'ó'// U+00F3
                    },
                    {
                        length: 5,
                        character: 'ô'// U+00F4
                    },
                    {
                        length: 6,
                        character: 'õ'// U+00F5
                    },
                    {
                        length: 7,
                        character: 'ö'// U+00F6
                    },
                    {
                        length: 8,
                        character: '÷'// U+00F7
                    },
                    {
                        length: 9,
                        character: 'ø'// U+00F8
                    },
                    {
                        length: 10,
                        character: 'ù'// U+00F9
                    },
                    {
                        length: 11,
                        character: 'ú'// U+00FA
                    },
                    {
                        length: 12,
                        character: 'û'// U+00FB
                    }
               ]
            },
            {
               code: 'expos', // U+00FC - U+002D9
               lengths: [
                    {
                        length: 1,
                        character: 'ü'// U+00FC
                    },
                    {
                        length: 2,
                        character: 'ü'// U+00FC
                    },
                    {
                        length: 3,
                        character: 'ü'// U+00FC
                    },
                    {
                        length: 4,
                        character: 'ý'// U+00FD
                    },
                    {
                        length: 5,
                        character: 'þ'// U+00FE
                    },
                    {
                        length: 6,
                        character: 'ÿ'// U+00FF
                    },
                    {
                        length: 7,
                        character: 'ı'// U+0131
                    },
                    {
                        length: 8,
                        character: 'ˆ'// U+02C6
                    },
                    {
                        length: 9,
                        character: 'ˇ'// U+02C7
                    },
                    {
                        length: 10,
                        character: 'ˉ'// U+02C9
                    },
                    {
                        length: 11,
                        character: '˘'// U+02D8
                    },
                    {
                        length: 12,
                        character: '˙'// U+02D9
                    }
               ]
            },
            {
               code: 'oaklands', // U+02DA - U+0202C
               lengths: [
                    {
                        length: 1,
                        character: '˚'// U+02DA
                    },
                    {
                        length: 2,
                        character: '˚'// U+02DA
                    },
                    {
                        length: 3,
                        character: '˚'// U+02DA
                    },
                    {
                        length: 4,
                        character: '˛'// U+02DB
                    },
                    {
                        length: 5,
                        character: '˜'// U+02DC
                    },
                    {
                        length: 6,
                        character: '˝'// U+02DD
                    },
                    {
                        length: 7,
                        character: '–'// U+2013
                    },
                    {
                        length: 8,
                        character: '—'// U+2014
                    },
                    {
                        length: 9,
                        character: '‘'// U+2018
                    },
                    {
                        length: 10,
                        character: '’'// U+2019
                    },
                    {
                        length: 11,
                        character: '‚'// U+201A
                    },
                    {
                        length: 12,
                        character: '“'// U+201C
                    }
               ]
            }, 
            {  
                code: 'indians', // $201D - $20A3
                lengths: [
                    {
                        length: 1,
                        character: '”'// u+201D
                    },
                    {
                        length: 2,
                        character: '”'// U+201D
                    },
                    {
                        length: 3,
                        character: '”'// U+201D
                    },
                    {
                        length: 4,
                        character: '„'// U+201E
                    },
                    {
                        length: 5,
                        character: '†'// U+2020
                    },
                    {
                        length: 6,
                        character: '‡'// U+2021
                    },
                    {
                        length: 7,
                        character: '•'// U+2022
                    },
                    {
                        length: 8,
                        character: '…'// U+2026
                    },
                    {
                        length: 9,
                        character: '‹'// U+2039
                    },
                    {
                        length: 10,
                        character: '›'// U+203A
                    },
                    {
                        length: 11,
                        character: '⁄'// U+2044
                    },
                    {
                        length: 12,
                        character: '‬₣'//  U+20A3
                    }
               ]
            },
            {
               code: 'royals', // U+20A4 - U+2212
               lengths: [
                    {
                        length: 1,
                        character: '₤'  // u+20A4
                    },
                    {
                        length: 2,
                        character: '₤'  // U+20A4
                    },
                    {
                        length: 3,
                        character: '₤'  // U+20A4
                    },
                    {
                        length: 4,
                        character: '₧'  // U+20A7
                    },
                    {
                        length: 5,
                        character: '€'  // U+20AC
                    },
                    {
                        length: 6,
                        character: '№'  // U+2116
                    },
                    {
                        length: 7,
                        character: '™'  // U+2122
                    },
                    {
                        length: 8,
                        character: '∂'  // U+2202
                    },
                    {
                        length: 9,
                        character: '∆'  // U+2206
                    },
                    {
                        length: 10,
                        character: '∏'  // U+220F
                    },
                    {
                        length: 11,
                        character: '∑'  // U+2211
                    },
                    {
                        length: 12,
                        character: '‬−' // U+2212
                    }
               ]
            },
            {
               code: 'twins', // U+221A - U+FB02
               lengths: [
                    {
                        length: 1,
                        character: '√'  // U+221A
                    },
                    {
                        length: 2,
                        character: '√'  // U+221A
                    },
                    {
                        length: 3,
                        character: '√'  // U+221A
                    },
                    {
                        length: 4,
                        character: '√'  // U+221A
                    },
                    {
                        length: 5,
                        character: '√'  // U+221A
                    },
                    {
                        length: 6,
                        character: '∞'  // U+221E
                    },
                    {
                        length: 7,
                        character: '∫'  // U+222B
                    },
                    {
                        length: 8,
                        character: '≈'  // U+2248
                    },
                    {
                        length: 9,
                        character: '≤'  // U+2264
                    },
                    {
                        length: 10,
                        character: '≥'  // U+2265
                    },
                    {
                        length: 11,
                        character: 'ﬁ'  // $F001, $FB01
                    },
                    {
                        length: 12,
                        character: 'ﬂ' // $F002, $FB02
                    }
               ] 
            },
        ],

        getCharacter: function (code, length) {

            var _match = _.find(this.items, {code: code});

            if(typeof _match !== "undefined") {

                var _result = _.find(_match.lengths, {length: length});

                if (typeof _result === "undefined") {

                    ub.utilities.warn('tailsweep length not found for ' + code);

                    return undefined;

                } else {

                    return _result.character;
                    
                }

                

            } else {

                return _match;

            }

        },
    }

    ub.data.sizes = {
        
        items: [

            // Reset to empty, values will be provided from ub.current_material.material.parsedPricingTable

        ],

        getSizes: function (sport, gender, type) {
            var _result = _.find(this.items, {sport: sport, gender: gender, type: type });

            if (typeof _result === "undefined") {

                ub.utilities.warn('Sport Not Found')
                
            }

            return _result;

        },

    };

    ub.data.originalSports = ['Football', 'Wrestling'];

    // To be used when changing application types (uba@changeApplicationType)
    ub.data.initialSizes = {

        items: [
            {
                type: 'player_number',
                types: [
                    {
                        applicationNumbers: [2],
                        resultApplicationType: 'front_number',
                        size: 8,
                        font_size: 8,
                        sport: ['Football'],
                    },
                    {
                        applicationNumbers: [2],
                        resultApplicationType: 'front_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Default','Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [32,33],
                        resultApplicationType: 'shoulder_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Hockey',],
                    },
                    {
                        applicationNumbers: [9,10],
                        resultApplicationType: 'sleeve_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Hockey',],
                    },
                    {
                        applicationNumbers: [2,6],
                        resultApplicationType: 'front_number',
                        size: 6,
                        font_size: 6,
                        sport: ['Hockey',],
                    },
                    {
                        applicationNumbers: [2],
                        resultApplicationType: 'front_number',
                        size: 6,
                        font_size: 6,
                        sport: ['Lacrosse',],
                    },
                    {
                        applicationNumbers: [6],
                        resultApplicationType: 'back_number',
                        size: 8,
                        font_size: 8,
                        sport: ['Lacrosse',],
                    },
                    {
                        applicationNumbers: [26, 27, 28, 29, 30, 31, 25, 3, 24],
                        resultApplicationType: 'front_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [7,51,8],
                        resultApplicationType: 'back_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [5],
                        resultApplicationType: 'back_number',
                        size: 8,
                        font_size: 8,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [9, 10],
                        resultApplicationType: 'sleeve_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [9, 10],
                        resultApplicationType: 'sleeve_number',
                        size: 3,
                        font_size: 3,
                        sport: ['Football 2017'],
                    },
                    {
                        applicationNumbers: [32, 33],
                        resultApplicationType: 'shoulder_number',
                        size: 3,
                        font_size: 3,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [41, 42, 43, 44],
                        resultApplicationType: 'sleeve_number',
                        size: 3,
                        font_size: 3,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },
                    {
                        applicationNumbers: [-1],
                        resultApplicationType: 'shoulder_number',
                        size: 4,
                        font_size: 4,
                        sport: ['Default', 'Baseball', 'Fastpitch'],
                    },

                    // TODO: get this from application number defaults @dhevs
                    { 
                        applicationNumbers: [2],
                        resultApplicationType: 'front_number',
                        size: 8,
                        font_size: 8,
                        sport: ['Test'], // Richardson Test
                    },
                    { 
                        applicationNumbers: [5],
                        resultApplicationType: 'back_number',
                        size: 10,
                        font_size: 10,
                        sport: ['Test'], // Richardson Test
                    },

                ] 

            }
            
        ], 
        getSize: function (type, applicationNumber, sport) {

            var _result = undefined;
            var _items = _.find(this.items, {type: type});

            console.log('Start output here...')


            if (typeof _items === "undefined") { ub.utilities.warn('Initial Size not found for ' + type + ' on location #' + applicationNumber); }

            _result = _.find(_items.types, function (type) {

                return _.contains(type.applicationNumbers, applicationNumber) && _.contains(type.sport, sport);

            });

            if (typeof _result === "undefined") {

                _result = _.find(_items.types, function (type) { return _.contains(type.applicationNumbers, applicationNumber) && _.contains(type.sport, 'Default'); });

            }

            if (typeof _result === "undefined" && applicationNumber < 70) {

                ub.utilities.warn('Using catch all initial size (-1)');
                _result = _.find(_items.types, function (type) { return _.contains(type.applicationNumbers, -1) && _.contains(type.sport, 'Default'); });

            } 

            // For Free Form Tool
            if (applicationNumber > 70) {

                _result =  {
                    applicationNumbers: [-1],
                    resultApplicationType: 'front_number',
                    size: 4,
                    font_size: 4,
                    sport: ['Default', 'Free Form Tool'],
                };

            }

            return _result;

        }

    }

    // Sports using the new Font Metrics (one_inch_in_px)
    ub.data.sportsMain = {

        items: [
            'Hockey',
            'Tech-Tee (Apparel)',
            'Compression (Apparel)',
            'Cinch Sack (Apparel)',
            'Polo (Apparel)',
            'Hoodie (Apparel)',
            'Crew Socks (Apparel)',
            'Volleyball',
            'Hoodie (Apparel)',
            'Polo (Apparel)',
            'Hockey',
            'Quarter Zip Jacket (Apparel)',
            'Fan Replica Jersey (Apparel)',
            'Basketball (Apparel)',
            'Lacrosse',
            'Soccer',
            '2017 Team Short with Pockets (Apparel)',
            'Signature Coaches Short (Apparel)',
            'Basketball',
            'Cage Jacket (Apparel)',
            'Football 2017',
            'Game Day Jackets (Apparel)',
            'Field Hockey',
            'Compression Pant (Apparel)',
            'Socks (Apparel)',
            'Cage Jacket (Apparel)',
            'Wrestling 2018',
            'Tennis'
        ],
        options: [
            'Fight Short',
        ],
        blockPatterns: [
            'Cage Jacket',
            'Cage Jacket (Apparel)',
        ],

        currentOk: function () {

            return (_.contains(this.items, ub.current_material.material.uniform_category) || _.contains(this.options, ub.current_material.material.neck_option) || _.contains(this.blockPatterns, ub.current_material.material.block_pattern)) && (ub.current_material.material.uniform_application_type === "sublimated" || ub.current_material.material.uniform_application_type === "knitted");

        }

    }

    ub.data.anchors = {

        items: [
            {
                applicationNumbers: [1, 2, 5, 6],
                anchor: {x: 0.5, y: 1.0},   
            }
        ],

        getAnchor: function (applicationNumber) {

            var _result = _.find(this.items, function (item) {

                return _.contains(item.applicationNumbers, applicationNumber);

            });

            if (typeof _result === "undefined") {

                _result = {
                    applicationNumbers: [-1],
                    anchor:    {x: 0.5, y: 0.5},
                }

            }

            return _result;

        }

    };

    ub.data.matchingApplications = [33, 32, 9, 10, 42, 41, 44, 43, 52, 53, 54, 55];
    ub.data.matchingIDs = {

        items: [
            { id: 9,  matchingID: 10  },
            { id: 10, matchingID: 9   },
            { id: 32, matchingID: 33  },
            { id: 33, matchingID: 32  },

            { id: 52, matchingID: 53  },
            { id: 53, matchingID: 52  },
            { id: 54, matchingID: 55  },
            { id: 55, matchingID: 54  },
            { id: 43, matchingID: 44  },
            { id: 44, matchingID: 43  },
            { id: 41, matchingID: 42  },
            { id: 42, matchingID: 41  },
        ],
        sportsExemption: [
            'Baseball'
        ],
        getMatchingID: function (id) {

            var _result = undefined;
            var sport   = ub.config.sport;

            // Igore matching id on Baseball
            // see FEED-24 for details
            if (!_.contains(this.sportsExemption, sport)) {

                _result = _.find(this.items, {id: parseInt(id)});

                if (typeof _result === "undefined") {

                    return undefined;

                }

                return _result.matchingID;
            }

            return _result;

        }

    }

    ub.data.freeFormToolEnabledSports = {

        items: [
            {
                sport: 'Wrestling',
                sublimatedPart: 'Body',
            },
            {
                sport: 'Crew Socks (Apparel)',
                sublimatedPart: 'Sublimated',
            }, 
            {
                sport: 'Compression (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: "Cinch Sack (Apparel)",
                sublimatedPart: 'Body',
            }, 
            {
                sport: 'Tech-Tee (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Football',
                sublimatedPart: 'Body',
            },
            {
                sport: 'Baseball',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Volleyball',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Hoodie (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Polo (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Hockey',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Quarter Zip Jacket (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Fan Replica Jersey (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Basketball (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Lacrosse',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Fastpitch',
                sublimatedPart: 'Body',
            }, 
            {
                sport: 'Soccer',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: '2017 Team Short with Pockets (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Signature Coaches Short (Apparel)',
                sublimatedPart: 'Extra',
            }, 
            {
                sport: 'Football 2017',
                sublimatedPart: 'Body',
            },
            {
                sport: 'Game Day Jackets (Apparel)',
                sublimatedPart: 'Body',
            },
            {
                sport: 'Field Hockey',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Compression Pant (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Socks (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Wrestling Compression Shorts (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Basketball',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Cage Jacket (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Wrestling Compression Short Sleeve (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Field Hockey',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Wrestling Compression Shorts (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Wrestling 2018',
                sublimatedPart: 'Extra',
            },   
            {
                sport: 'Tennis',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'PTS Cage Jacket (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'PTS Hoodie (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'PTS Cage Jacket (Apparel)',
                sublimatedPart: 'Body',
            },
            {
                sport: 'Yoga Pant (Apparel)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'Yoga Pant (Apparel)',
                sublimatedPart: 'Body',
            },
            {
                sport: 'Tech Tee (eSports)',
                sublimatedPart: 'Extra',
            },
            {
                sport: 'SFN Jogger (Apparel)',
                sublimatedPart: 'Extra',
            }
        ],

        get: function (sport) {

            var _result = _.find(this.items, {sport: sport});

            if (sport === "Football") {

                // Disable free-form tool on football if block pattern is not infused 14
                if (ub.current_material.material.block_pattern !== "INFUSED 14" && ub.current_material.material.uniform_application_type !== "sublimated") {

                    _result = undefined;

                }

            }

            if (sport === "Baseball" || sport === "Fastpitch") {

                // Disable free-form tool on football if block pattern is not infused 14
                if (ub.current_material.material.uniform_application_type !== "sublimated") {

                    _result = undefined;

                }

            }

            if (sport === "Hockey") {

                // Disable free-form tool on football if block pattern is not infused 14
                if (ub.current_material.material.uniform_application_type !== "sublimated") {

                    _result = undefined;

                }

            }

            if (sport === "Lacrosse") {
                if (ub.current_material.material.uniform_application_type !== "sublimated") { _result = undefined; }
            }

            if (sport === "Wrestling Compression Shorts (Apparel)") {
                if (ub.current_material.material.uniform_application_type !== "sublimated") { _result = undefined; }
            }

            return _result;

        },
        isValid: function (sport) {

            var _result = _.find(this.items, {sport: sport});

            if (sport === "Football") {

                // Disable free-form tool on football if block pattern is not infused 14
                if (ub.current_material.material.block_pattern !== "INFUSED 14" && ub.current_material.material.uniform_application_type !== "sublimated") {

                    _result = undefined;

                }

            }

            if (sport === "Baseball" || sport === "Fastpitch") {

                // Disable free-form tool on football if block pattern is not infused 14
                if (ub.current_material.material.uniform_application_type !== "sublimated") {

                    _result = undefined;

                }

            }

            if (sport === "Hockey") {

                if (ub.current_material.material.uniform_application_type !== "sublimated") {

                    _result = undefined;

                }

            }

            if (sport === "Lacrosse") {
                if (ub.current_material.material.uniform_application_type !== "sublimated") { _result = undefined; }
            }

            if (sport === "Wrestling Compression Shorts (Apparel)") {
                if (ub.current_material.material.uniform_application_type !== "sublimated") { _result = undefined; }
            }
          
            return _.size(_result) > 0;

        }

    };

    // ub.data.hiddenBody = {

    //     sports: [
    //         "Hoodie (Apparel)", 
    //         "Cinch Sack (Apparel)", 
    //         "Polo (Apparel)", 
    //         "Quarter Zip Jacket (Apparel)", 
    //         "Fan Replica Jersey (Apparel)",
    //         "Soccer", 
    //         "2017 Team Short with Pockets (Apparel)", 
    //         "Signature Coaches Short (Apparel)", 
    //         "Baseball", 
    //         "Fastpitch", 
    //         "Compression (Apparel)", 
    //         "Tech-Tee (Apparel)", 
    //         "Game Day Jackets (Apparel)",
    //         'Tennis',
    //         "Compression Pant (Apparel)",
    //         "Cage Jacket (Apparel)",
    //         ],
    //     options: [
    //             {
    //                 sport: 'Wrestling',
    //                 option: "Fight Short",
    //             },
    //             {
    //                 sport: 'Baseball',
    //                 option: "Long Sleeve",
    //             },
    //             {
    //                 sport: 'Baseball',
    //                 option: "Short Sleeve",
    //             },
              
    //             // Volleyball
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Cap Sleeve",
    //             },
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Long Sleeve",
    //             },
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Compression Shorts",
    //             },
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Short Sleeve",
    //             },
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Men Volleyball Jersey",
    //             },
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Crew Neck Sleeveless Shirt",
    //             },
    //             {
    //                 sport: 'Volleyball',
    //                 option: "Sublimated Short",
    //             },
    //             // End Volleyball

    //             // Hockey 
    //             {
    //                 sport: 'Hockey',
    //                 option: "Game Jersey",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Sublimated Jersey",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Game Scooped V-Neck with Buckle",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Scooped-V",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Scooped-V with Buckle",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Grinder V-Neck",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Grinder V-Neck with Buckle",
    //             },
    //             {
    //                 sport: 'Hockey',
    //                 option: "Game V-Neck",
    //             },
    //             // End Hockey

    //             {
    //                 sport: 'Fan Replica Jersey (Apparel)',
    //                 option: "Men's",
    //             },
    //             {
    //                 sport: 'Fan Replica Jersey (Apparel)',
    //                 option: "Women's",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "4ARW6R~6 Jersey",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "4-inch panel Jersey",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "Side Seam Jersey",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "4MH8Z5~G Short",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "4-inch panel Short",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "Side seam Short",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "2 Panel Short",
    //             },
    //             {
    //                 sport: 'Lacrosse',
    //                 option: "4ARW6R~6 Jersey",
    //             },
    //             // 
    //             {
    //                 sport: 'Basketball',
    //                 option: "USA Jersey (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "USA Jersey (W)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "USA Short (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "USA Short (W)",
    //             },
    //             {
    //                 sport: 'Soccer',
    //                 option: "Short (W)",
    //             },
    //             {
    //                 sport: 'Soccer',
    //                 option: "Goalie (W)",
    //             },
    //             {
    //                 sport: 'Field Hockey',
    //                 option: "Jersey (W)",
    //             },
    //             {
    //                 sport: 'Wrestling Compression Shorts (Apparel)',
    //                 option: "Compression Shorts",  
    //             },
    //             {
    //                 sport: 'Football 2017',
    //                 option: "Jersey",  
    //             },
    //             {
    //                 sport: 'Football 2017',
    //                 option: "Full Length",  
    //             },
    //             {
    //                 sport: 'Football 2017',
    //                 option: "Waist",  
    //             },
    //             {
    //                 sport: 'Football 2017',
    //                 option: "Waist 2017 Reversible",  
    //             },

    //             // SFN 
    //             {
    //                 sport: 'Basketball',
    //                 option: "SFN 2018 Short (M)",  
    //             },
    //             // 2018 Basketball 
    //             {
    //                 sport: 'Basketball',
    //                 option: "Cavaliers Neck",  
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "V-Neck",  
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Lakers Neck",  
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Round Neck",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Side Seam Jersey",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Kentucky Jersey (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Kentucky Jersey (W)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Laker Neck Jersey (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Laker Neck Jersey (W)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Wildcat Neck Jersey (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Wildcat Neck Jersey (W)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Wildcat Neck Jersey (W)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "4 Inch Side Panel Short (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "4 Inch Side Panel Short (M)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "4 Inch Side Panel Short (W)",
    //             },
    //             {
    //                 sport: 'Basketball',
    //                 option: "Kentucky Jersey(M)",
    //             },

    //     ],
    //     currentUniformOk: function () {

    //         return  (
    //                     _.contains(this.sports, ub.current_material.material.uniform_category) || 
    //                     (typeof _.find(this.options, {sport: ub.current_material.material.uniform_category, option: ub.current_material.material.neck_option}) !== "undefined")
    //                 ) &&

    //                 // Hidden Body for baseball and fastpitch except when its a lower uniform
    //                 (
    //                     !((ub.config.sport === "Baseball" || ub.config.sport === "Fastpitch") && ub.config.type === "lower")
    //                 ) && !(
    //                     ub.config.sport === "Tennis" && ub.current_material.material.neck_option === "Skort"
    //                 );

    //     } 

    // }

    ub.data.randomFeedArrangement = {

        items: [ 
            {
                set: 'Top Welt',
                order: 0,
            }, 
            {
                set: 'Body',
                order: 1,
            }, 
            {
                set: 'Heel',
                order: 2,
            }, 
            {
                set: 'Padding',
                order: 3,
            }, 
            {
                set: 'Arch',
                order: 4,
            },
            {
                set: 'Toe',
                order: 5,
            },
            {
                set: 'Ankle Padding',
                order: 6,
            }, 
        ],

        getSortID: function (set) { 

            _result = _.find(this.items, {set: set});

            if (typeof _result === "undefined") { 
                ub.utilities.warn ('Set [' + set + '] not found. Using 0'); 
                _result = { order: 0 };
            }

            return _result;

        }

    };

    ub.data.minimumOrder = {

        items: [ 
            {
                sport: 'Crew Socks (Apparel)',
                qty: 30,
            },
            {
                sport: 'Default',
                qty: 1,
            },
        ],

        getQty: function (sport) { 

            _result = _.find(this.items, {sport: sport});

            if (typeof _result === "undefined") { 
                
                ub.utilities.warn ('Min. Order QTY for [' + sport + '] not found. Using Default'); 
                _result = _.find(this.items, {sport: 'Default'});
                
            }

            return _result;

        }

    };

    ub.data.sublimatedColorArrangement = {

        items: [
            {
                colorName: 'White',
                order: 1,
            },
            {
                colorName: 'Black',
                order: 2,
            },
            {
                colorName: 'Red',
                order: 3,
            },
            {
                colorName: 'Brick Red',
                order: 4,
            },
            {
                colorName: 'Cardinal',
                order: 5,
            },
            {
                colorName: 'Seminole',
                order: 6,
            },
            {
                colorName: 'Maroon',
                order: 7,
            },
            {
                colorName: 'Pink',
                order: 8,
            },
            {
                colorName: 'Neon Pink',
                order: 9,
            },
            {
                colorName: 'Orange',
                order: 10,
            },
            {
                colorName: 'Texas Orange',
                order: 11,
            },
            {
                colorName: 'Tennessee Orange',
                order: 12,
            },
            {
                colorName: 'Gold',
                order: 13,
            },
            {
                colorName: 'Old Gold',
                order: 14,
            },
            {
                colorName: 'Vegas Gold',
                order: 15,
            },
            {
                colorName: 'Yellow',
                order: 16,
            },
            {
                colorName: 'Optic Yellow',
                order: 17,
            },
            {
                colorName: 'Safety Green',
                order: 18,
            },
            {
                colorName: 'Lime Green',
                order: 19,
            },  
            {
                colorName: 'Kelly Green',
                order: 20,
            },
            {
                colorName: 'Forest Green',
                order: 21,
            }, 
            {
                colorName: 'Dark Green',
                order: 22,
            },
            {
                colorName: 'Royal Blue',
                order: 23,
            },
            {
                colorName: 'Dark Royal Blue',
                order: 24,
            },
            {
                colorName: 'Navy Blue',
                order: 25,
            },
            {
                colorName: 'Dark Navy Blue',
                order: 26,
            },
            {
                colorName: 'Purple',
                order: 27,
            },
            {
                colorName: 'Dark Purple',
                order: 28,
            },
            {
                colorName: 'Marlin Blue',
                order: 29,
            },
            {
                colorName: 'Turquoise',
                order: 30,
            },
            {
                colorName: 'Aqua',
                order: 31,
            },
            {
                colorName: 'Carolina Blue',
                order: 32,
            },
            {
                colorName: 'Columbia Blue',
                order: 33,
            },
            {
                colorName: 'Charcoal Grey',
                order: 34,
            },
            {
                colorName: 'Gray',
                order: 35,
            },
            {
                colorName: 'Silver Gray',
                order: 36,
            },
            {
                colorName: 'Cream',
                order: 37,
            },
            {
                colorName: 'Brown',
                order: 38,
            },
        ], 
        getOrderID: function (colorName) {

            var _result = _.find(this.items, {colorName: colorName});

            if (typeof _result === "undefined") {

                // return last index + 1
                _result = { colorName: colorName, order: this.items.length + 1 };
                ub.utilities.warn('Sort order not found for ' + colorName + ' using ' + (this.items.length + 1));

            }

            return _result;

        },
    };
    ub.data.activeSports = {

        items: [

            { sport: 'Football' },
            { sport: 'Wrestling' },
            { sport: 'Crew Socks (Apparel)' },
            { sport: 'Polo (Apparel)' },
            { sport: 'Cinch Sack (Apparel)' },
            { sport: 'Baseball' },
            { sport: 'Compression (Apparel)' },
            { sport: 'Tech-Tee (Apparel)' },
            { sport: 'Hoodie (Apparel)' },
            { sport: 'Quarter Zip Jacket (Apparel)' },
            { sport: 'Volleyball' },
            { sport: 'Fan Replica Jersey (Apparel)' },
            { sport: 'Lacrosse' },
            { sport: 'Signature Coaches Short (Apparel)' },
            { sport: '2017 Team Short with Pockets (Apparel)' },
            { sport: 'Game Day Jackets (Apparel)' },

            { sport: 'Fastpitch' },
            { sport: 'Soccer' },            
            { sport: 'Basketball' },
            { sport: 'Hockey' },

            { sport: 'Socks (Apparel)' },
            { sport: 'Cage Jacket (Apparel)' },
            { sport: 'Compression Pant (Apparel)' },

            { sport: 'Field Hockey' },
            { sport: 'Wrestling Compression Shorts (Apparel)' },

        ],

        isSportOK: function (sport) {

            var _result = _.find(this.items, {name: sport});
            return (typeof _result !== "undefined") ? true: false;

        } 

    };

    ub.data.tempSports = {

        items: [

        ],

        isSportOK: function (sport) {

            var _result = _.find(this.items, {name: sport});
            return (typeof _result !== "undefined") ? true: false;

        } 

    };

    ub.data.secondaryBarLabels = {

        items: [
            {
                sport: 'Wrestling',
                type: 'both',
                upperLabel: 'Singlet',
                lowerLabel: 'Fight Shorts',
            //  tackleTwillHidden: true,        // Use this in the future
            },
            {
                sport: 'Wrestling 2018',
                type: 'both',
                upperLabel: 'Singlets & Tops',
                lowerLabel: 'Shorts',
            //  tackleTwillHidden: true,        // Use this in the future
            },
            {
                sport: 'Volleyball',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Compression Shorts',
            //  tackleTwillHidden: true,        // Use this in the future
            },
            {
                sport: 'Crew Socks (Apparel)',
                type: 'lower',
                lowerLabel: 'Crew Sock',
            },
            {
                sport: 'Compression (Apparel)',
                type: 'upper',
                upperLabel: 'Compression',
            },
            {
                sport: 'Tech-Tee (Apparel)',
                type: 'upper',
                upperLabel: 'Tech-Tee',
            },
            {
                sport: 'Cinch Sack (Apparel)',
                type: 'upper',
                upperLabel: 'Cinch Sack',
            },
            {
                sport: 'Hoodie (Apparel)',
                type: 'upper',
                upperLabel: 'Hoodie',
            },
            {
                sport: 'Quarter Zip Jacket (Apparel)',
                type: 'upper',
                upperLabel: 'Quarter Zip Jacket',
            },
            {
                sport: 'Polo (Apparel)',
                type: 'upper',
                upperLabel: 'Polo',
            },
            {
                sport: 'Soccer',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Lacrosse',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Shorts',
            },
            {
                sport: '2017 Team Short with Pockets (Apparel)',
                type: 'lower',
                lowerLabel: ' Team Short',
            },
            {
                sport: 'Signature Coaches Short (Apparel)',
                type: 'lower',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Socks (Apparel)',
                type: 'lower',
                lowerLabel: 'Socks',
            },
            {
                sport: 'Wrestling Compression Shorts (Apparel)',
                type: 'lower',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Game Day Jackets (Apparel)',
                type: 'upper',
                upperLabel: 'Jacket',
            },
            {
                sport: 'Cage Jacket (Apparel)',
                type: 'upper',
                upperLabel: 'Jackets',
            },
            {
                sport: 'Fan Replica Jersey (Apparel)',
                type: 'upper',
                upperLabel: 'Jersey',
            },
            {
                sport: 'Compression Pant (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Default', // Football
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Pant',
            },
            {
                sport: 'Yoga Pant (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'SFN Jogger (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            // eSports Uniform
            {
                sport: 'Tech Tee (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
        ],
        getLabel: function (sport) {

            var _result = _.find(this.items, {sport: sport});

            if (typeof _result === "undefined") { ub.utilities.info('Secondary Bar Labels not found for ' + sport); }

            return _result;

        }

    }

     ub.data.sportFilters = [
        {
            sport: 'Football',
            filters: ['All', 'Jersey', 'Pant'],
        },
        {
            sport: 'Football 2017',
            filters: ['All', 'Jersey', 'Pant'],
        },
        {
            sport: 'Basketball',
            filters: ['All', 'Jersey', 'Shorts'],
        },
        {
            sport: 'Baseball',
            filters: ['All', 'Jersey', 'Pant'],
        }, 
        {
            sport: 'Fastpitch',
            filters: ['All', 'Jersey', 'Pant'],
        }, 
        {
            sport: 'Wrestling',
            filters: ['All', 'Singlet', 'Fight Shorts'],
        },
        {
            sport: 'Wrestling 2018',
            filters: ['All', 'Singlets & Tops', 'Shorts'],
        },
        {
            sport: 'Crew Socks (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Compression (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Tech-Tee (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Volleyball',
            filters: ['All', 'Jersey', 'Compression Shorts'],
        },
        {
            sport: 'Hoodie (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Quarter Zip Jacket (Apparel)',
            filters: ['All', 'Jackets'],
        },
        {
            sport: 'Polo (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Fan Replica Jersey (Apparel)',
            filters: ['All'],
        }, 
        {
            sport: 'Soccer',
            filters: ['All', 'Jersey', 'Shorts'],
        },
        {
            sport: 'Lacrosse',
            filters: ['All', 'Jersey', 'Shorts'],
        },
        {
            sport: 'Hockey',
            filters: ['All', 'Jersey', 'Pants'],
        },
        {
            sport: '2017 Team Short with Pockets (Apparel)',
            filters: ['All', 'Jersey', 'Team Shorts'],
        },
        {
            sport: 'Signature Coaches Short (Apparel)',
            filters: ['All', 'Jersey', 'Shorts'],
        },
        {
            sport: 'Game Day Jackets (Apparel)',
            filters: ['All', 'Jackets'],
        },
        {
            sport: 'Socks (Apparel)',
            filters: ['All', 'Jersey', 'Socks'],
        },
        {
            sport: 'Polo (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Cage Jacket (Apparel)',
            filters: ['All', 'Jackets'],
        },
        {
            sport: 'Compression Pant (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'Field Hockey',
            filters: ['All', 'Jersey', 'Skorts'],
        },
        {
            sport: 'Fan Replica Jersey (Apparel)',
            filters: ['All', 'Jersey'],
        },
        {
            sport: 'Wrestling Compression Shorts (Apparel)',
            filters: ['All', 'Jersey', 'Shorts'],
        },
        {
            sport: 'Compression Short (Apparel)',
            filters: ['All', 'Pants'],
        },
        {
            sport: 'Cinch Sack (Apparel)',
            filters: ['All', 'Cinch Sack'],
        },
        {
            sport: 'Tennis',
            filters: ['All', 'Jersey', 'Shorts'],
        },
        {
            sport: 'Yoga Pant (Apparel)',
            filters: ['All'],
        },
        {
            sport: 'SFN Jogger (Apparel)',
            filters: ['All'],
        },
        // eSports Uniform
        {
            sport: 'Tech Tee (eSports)',
            filters: ['All'],
        }
          
    ];

    // Todo: Detect this at runtime instead
    ub.data.sportsWithExtraLayer = {

        // items: [
        //     {
        //         sport: 'Compression (Apparel)',
        //     },
        //     {
        //         sport: 'Tech-Tee (Apparel)',
        //     },
        //     {
        //         sport: 'Baseball',
        //     },
        //     {
        //         sport: 'Wrestling',
        //     }
        // ],

        isValid: function (materialsOptions) {

            var _result = _.find(materialsOptions, {name: 'Extra'});

            if (typeof _result !== "undefined") { console.log('Extra Layer detected for ' + ub.sport); }

            return typeof _result !== "undefined";

        }

    }

    ub.data.sportsWithHiddenYouthPrices = {

        items: [
            {
                sport: 'Crew Socks (Apparel)',
            },
            {
               sport: 'Cinch Sack (Apparel)',    
            },
            {
               sport: 'Volleyball',    
            },
            {
                sport: 'Baseball',    
            },
            {
                sport: '2017 Team Short with Pockets (Apparel)',
            },
            {
                sport: 'Signature Coaches Short (Apparel)',
            },
            {
                sport: 'Lacrosse',    
            },
            {
                sport: 'Polo (Apparel)',    
            },
            {
                sport: 'Fastpitch',    
            },
            {
                sport: "Game Day Jackets (Apparel)",    
            },
        ],

        isHidden: function (sport, option) {

            var _result = undefined;

            _result = _.find(this.items, {sport: sport});

            return (typeof _result !== "undefined");

        }

    }

    ub.data.skipTeamColorProcessing = {

        items: [
            {
                sport: 'Cinch Sack (Apparel)',
                code: 'body',
            },
            {
                sport: 'Polo (Apparel)',
                code: 'body',
            },
            {
                sport: 'Hockey',
                code: 'body',
            },
            {
                sport: 'Hockey',
                code: 'extra_left_cowl',
            },
            {
                sport: 'Hockey',
                code: 'extra_right_cowl',
            },
            {
                sport: 'Quarter Zip Jacket (Apparel)',
                code: 'body',
            },
            {
                sport: 'Hoodie (Apparel)',
                code: 'body',
            },
            {
                sport: 'Volleyball',
                code: 'body',
            },
        ],

        shouldSkip: function (sport, code) {

            var _result = _.find(this.items, {sport: sport, code: code});

            if (typeof _result === "undefined") {

                var material = ub.current_material.material;

                var sportOk         = (sport === "Wrestling" || sport === "Baseball");
                var neckOptionOk    = (material.neck_option === "Fight Short");
                var blockPatternOk  = (material.block_pattern === "Cage Jacket");
                var codeOk          = (code === "body");

                if (sportOk && (neckOptionOk || blockPatternOk) && codeOk) {

                    _result = { sport: sport, code: code }

                }

            }

            if (code === "body" || code === "extra") { console.log(code); }
            
            return (typeof _result !== "undefined") || 
                ((ub.config.hiddenBody && code === "body") || 
                    (ub.config.hiddenBody && code === "extra"));

        }

    }

    ub.data.smallerPatterns = {

        items: [
            {
                sport: 'Wrestling', 
                blockPatternOption: 'Fight Short',            
            },
            {
                sport: 'Volleyball', 
                blockPatternOption: 'Compression Shorts',            
            },
            {
                sport: 'Soccer', 
                blockPatternOption: 'Short (M)',            
            },
            {
                sport: 'Soccer', 
                blockPatternOption: 'Short (W)',            
            },
        ],
        usesSmallerPattern: function (sport, blockPatternOption) {

            var _result = _.find(this.items, { sport: sport, blockPatternOption: blockPatternOption });

            return (typeof _result !== "undefined") ? true: false;

        },

    };

    ub.data.featureFlagCodes = {

        items: [
            { name: 'Beta Sport Uniforms', code: 'betaSportUniforms', section: 'uniforms' },
            { name: 'Show price items of uniforms', code: 'priceItemName', section: 'uniforms' },
            { name: 'Test Orders', code: 'testOrders', section: 'uniforms' },
        ],
        
        getCode: function (featureFlag) {
            
            var _result = undefined;

            _result = _.find(this.items, { name: featureFlag });

            if (typeof _result === "udefined") {

                ub.utilities.error('Code for feature flag [' + featureFlag + '] is not found.');

            }

            return _result;

        }

    }

    ub.data.locations = {

        items: [
            {
                name: 'feature', 
                url:  '/api/feature/check',
            },
        ],

        getUrl: function (name) {

            var _result = undefined;
            _result = _.find(this.items, {name: name});

            if (typeof _result === "undefined") { ub.utilities.error('Location [' + name + '] not found.'); }

            return _result;

        },

    };

    ub.data.withBodyLeftRight = {

        items: [
            { sport: 'Volleyball', neckOption: 'Compression Shorts', },
        ],
        isOk: function (sport, neckOption) {
            
            var _result = _.find(this.items, { sport: sport, neckOption: neckOption });
            return typeof _result !== "undefined";

        }

    }

    ub.data.withBodyLeftRight = {

        items: [
            { sport: 'Volleyball', neckOption: 'Compression Shorts', },
        ],
        isOk: function (sport, neckOption) {
            
            var _result = _.find(this.items, { sport: sport, neckOption: neckOption });
            return typeof _result !== "undefined";

        }

    }

    ub.data.blockPatternsAlias = {

        items: [
            {
                sport: 'Basketball',
                name: '2018 Basketball Jersey',
                alias: 'SFN Jersey',
            },
        ],

        getAlias: function (name) {

            var _result = _.find(this.items, {name: name});
            var _value = name;

            if (typeof _result !== "undefined") { _value = _result.alias }

            return _value;

        }

    }

    ub.data.neckOptionsAlias = {

        items: [
            {
                sport: 'Baseball',
                name: 'Fullcut Open Full',
                alias: 'Full Cut, Open Cuff, Full Length',
            },
            {
                sport: 'Baseball',
                name: 'Trad Open Full',
                alias: 'Traditional Cut, Open Cuff, Full Length',
            },
            {
                sport: 'Baseball',
                name: 'Trad Elastic Full',
                alias: 'Traditional Cut, Elastic Cuff, Full Length',
            },
            {
                sport: 'Baseball',
                name: 'Trad Elastic Knicker',
                alias: 'Traditional Cut, Elastic Cuff, Knicker Length',
            },
            {
                sport: 'Baseball',
                name: 'Trad Elastic Mid',
                alias: 'Traditional Cut, Elastic Cuff, Mid-Calf Length',
            },
        ],

        getAlias: function (name) {

            var _result = _.find(this.items, {name: name});
            var _value = name;

            if (typeof _result !== "undefined") { _value = _result.alias }

            return _value;

        }

    }

    ub.data.loadingOptionsAlias = {

        items: [

            {
                name: 'block_options',
                alias: 'Block Options',
            },
            {
                name: 'block_patterns',
                alias: 'Block Patterns',
            },
            {
                name: 'material',
                alias: 'Style details',
            },
            {
                name: 'materials_options',
                alias: 'Style parts',
            },
            {
                name: 'mascots_categories',
                alias: 'Mascot categories',
            },
            {
                name: 'mascots_groups_categories',
                alias: 'Mascot groups',
            },
            {
                name: 'mascots',
                alias: 'Mascots',
            },
            {
                name: 'patterns',
                alias: 'Patterns',
            },
            {
                name: 'fonts',
                alias: 'Fonts',
            },
            {
                name: 'colors',
                alias: 'Colors',
            },
            {
                name: 'tagged_styles',
                alias: 'Tags',
            },
            {
                name: 'cuts_links',
                alias: 'Cuts Links',
            },
            {
                name: 'logo_request',
                alias: 'Logo Requests',
            },
            {
                name: 'application_size',
                alias: 'Application Sizes',
            },
    
        ],

        getAlias: function (name) {

            var _result = _.find(this.items, {name: name});
            var _value = name;

            if (typeof _result !== "undefined") { _value = _result.alias }

            return _value;

        }

    }

    ub.data.specialCodes = {

        items: [
            {

                name: 'Pro-dry',
                alias: 'Pro-Dry',

            },
        ],

        getCode: function (code) {

            var _result = _.find(this.items, {name: code});
            var _returnValue = code;

            if (typeof _result !== "undefined") {

                _returnValue = _result.alias;
                
            }

            return _returnValue;

        }

    };

    ub.data.flippedMascots = {

        items: [
            {
                code: '356',
            },
        ],

        getCode: function (code) {

            var _result = _.find(this.items, {code: code});
            return (typeof _result !== "undefined");

        }

    }

    ub.data.urlAlias = {

        items: [
            {
                shortCode: 'tech-tee',
                urlAlias: 'Tech-Tee (Apparel)',
                thumbFilename: 'tech_tee.png',
                gender: ['men', 'women'],
            },
            {
                shortCode: 'compression',
                urlAlias: 'Compression (Apparel)',
                thumbFilename: 'compression.png',
                gender: ['men', 'women'],
            },
            {
                shortCode: 'polo',
                urlAlias: 'Polo (Apparel)',
                thumbFilename: 'polo.png',
                gender: ['men', 'women'],
            },
            {
                shortCode: 'volleyball',
                urlAlias: 'Volleyball',
                thumbFilename: 'volleyball.png',
                gender: ['women'],
            },
            {
                shortCode: 'fastpitch',
                urlAlias: 'Fastpitch',
                thumbFilename: 'fastpitch.png',
                gender: ['women'],
            },
            {
                shortCode: 'crew-socks',
                urlAlias: 'Crew Socks (Apparel)',
                thumbFilename: 'crew_sock.png',
                gender: ['men',],
            },
            {
                shortCode: 'hoodie',
                urlAlias: 'Hoodie (Apparel)',    
                thumbFilename: 'hoodie.png',
                gender: ['men',],
            },
            {
                shortCode: 'football',
                urlAlias: 'Football',    
                thumbFilename: 'football.png',
                gender: ['men',],
            },
            {
                shortCode: 'baseball',
                urlAlias: 'Baseball',  
                thumbFilename: 'baseball.png',  
                gender: ['men',],
            },
            {
                shortCode: 'wrestling',
                urlAlias: 'Wrestling',  
                thumbFilename: 'wrestling.png',  
                gender: ['men',],
            },
            {
                shortCode: 'hockey',
                urlAlias: 'Hockey',  
                thumbFilename: 'hockey.png',  
                gender: ['men','women'],
            },
            {
                shortCode: 'cinch-sack',
                urlAlias: 'Cinch Sack (Apparel)',
                thumbFilename: 'cinch_sack.png',
                gender: ['men',],
            },
            {
                shortCode: 'one-fourth-zip-jacket',
                urlAlias: 'Quarter Zip Jacket (Apparel)',
                thumbFilename: '1-4 zip.png',
                gender: ['men','women'],
            },
            {
                shortCode: 'fan-replica-jersey',
                urlAlias: 'Fan Replica Jersey (Apparel)',
                thumbFilename: 'fan_replica.png',
                gender: ['men',],
            },
            {
                shortCode: 'team-shorts',
                urlAlias: '2017 Team Short with Pockets (Apparel)',
                thumbFilename: 'team-short.png',
                gender: ['men',],
            },
            {
                shortCode: 'signature-coaches-short',
                urlAlias: 'Signature Coaches Short (Apparel)',
                thumbFilename: 'signature-coaches-short.png',
                gender: ['men',],
            },
            {
                shortCode: 'game-day-coaches-jackets',
                urlAlias: 'Game Day Jackets (Apparel)',
                thumbFilename: 'game-day-coaches-jackets.png',
                gender: ['men',],
            },
            {
                shortCode: 'socks',
                urlAlias: 'Socks (Apparel)',
                thumbFilename: 'socks.png',
                gender: ['men', 'women'],
            },
            {
                shortCode: 'cage-jacket',
                urlAlias: 'Cage Jacket (Apparel)',
                thumbFilename: 'cage-jacket.png',
                gender: ['men', 'women'],
            },
            {
                shortCode: 'compression-pant',
                urlAlias: 'Compression Pant (Apparel)',
                thumbFilename: 'compression-pant.png',
                gender: ['men',],
            },
            {
                shortCode: 'field-hockey',
                urlAlias: 'Field Hockey',
                thumbFilename: 'field-hockey.png',
                gender: ['women',],
            },
            {
                shortCode: 'wrestling-compression-shorts',
                urlAlias: 'Wrestling Compression Shorts (Apparel)',
                thumbFilename: 'wrestling-compression-shorts.png',
                gender: ['men',],
            },
            {
                shortCode: 'sfn-jogger',
                urlAlias: 'SFN Jogger (Apparel)',
                // thumbFilename: '',
                gender: ['men',],
            },
            {
                shortCode: 'yoga-pant',
                urlAlias: 'Yoga Pant (Apparel)',
                // thumbFilename: '',
                gender: ['women',],
            },
            // eSports
            {
                shortCode: 'gamer-jersey',
                urlAlias: 'Tech Tee (eSports)',
                // thumbFilename: '',
                gender: ['men',],
            },
        ],

        getAlias: function (shortCode)  {

            var _result = undefined;

            _result = _.find(this.items, {shortCode: shortCode});

            if (typeof _result === "undefined") {

                _result =  {
                    shortCode: shortCode,
                    urlAlias: shortCode.toTitleCase(),
                }

            }

            return _result;

        }, 
        getArray: function () {

            return _.pluck(this.items, 'shortCode');

        }

    }

    ub.data.apparelList = {

        items: [
            // Fill this in
        ],

        isApparel: function (type) {

            return _.contains(this.items, type);

        }

    }

    // New Application Exemptions - Parts that wont follow the normal Perspective Projections

    ub.data.applicationProjectionExemptions = {
        
        items: [
            {
                perspective: ["left", "right"],
                part: ["Cowl"],
                sport: ["Football 2017", "Fan Replica Jersey (Apparel)"],
                primary: "front",
            },
        ], 

        isExempted: function (perspective, part, sport) {
            
            var _result = _.find(this.items, function (item) {

                if (
                    _.contains(item.perspective, perspective) && 
                    _.contains(item.part, part) && 
                    _.contains(item.sport, sport)
                ) {
                    return item;
                }

            });

            return {
                isExempted: _.size(_result) > 0,
                result: _result,
            }

        },

    }

    // End New Application Exemptions - Parts that wont follow the normal Perspective Projections

    // US States 

    ub.data.usStates = {

        items: [
            {"name":"Alabama","code":"AL"},
            {"name":"Alaska","code":"AK"},
            {"name":"Arizona","code":"AZ"},
            {"name":"Arkansas","code":"AR"},
            {"name":"California","code":"CA"},
            {"name":"Colorado","code":"CO"},
            {"name":"Connecticut","code":"CT"},
            {"name":"Delaware","code":"DE"},
            {"name":"District of Columbia","code":"DC"},
            {"name":"Florida","code":"FL"},
            {"name":"Georgia","code":"GA"},
            {"name":"Hawaii","code":"HI"},
            {"name":"Idaho","code":"ID"},
            {"name":"Illinois","code":"IL"},
            {"name":"Indiana","code":"IN"},
            {"name":"Iowa","code":"IA"},
            {"name":"Kansa","code":"KS"},
            {"name":"Kentucky","code":"KY"},
            {"name":"Lousiana","code":"LA"},
            {"name":"Maine","code":"ME"},
            {"name":"Maryland","code":"MD"},
            {"name":"Massachusetts","code":"MA"},
            {"name":"Michigan","code":"MI"},
            {"name":"Minnesota","code":"MN"},
            {"name":"Mississippi","code":"MS"},
            {"name":"Missouri","code":"MO"},
            {"name":"Montana","code":"MT"},
            {"name":"Nebraska","code":"NE"},
            {"name":"Nevada","code":"NV"},
            {"name":"New Hampshire","code":"NH"},
            {"name":"New Jersey","code":"NJ"},
            {"name":"New Mexico","code":"NM"},
            {"name":"New York","code":"NY"},
            {"name":"North Carolina","code":"NC"},
            {"name":"North Dakota","code":"ND"},
            {"name":"Ohio","code":"OH"},
            {"name":"Oklahoma","code":"OK"},
            {"name":"Oregon","code":"OR"},
            {"name":"Pennsylvania","code":"PA"},
            {"name":"Rhode Island","code":"RI"},
            {"name":"South Carolina","code":"SC"},
            {"name":"South Dakota","code":"SD"},
            {"name":"Tennessee","code":"TN"},
            {"name":"Texas","code":"TX"},
            {"name":"Utah","code":"UT"},
            {"name":"Vermont","code":"VT"},
            {"name":"Virginia","code":"VA"},
            {"name":"Washington","code":"WA"},
            {"name":"West Virginia","code":"WV"},
            {"name":"Wisconsin","code":"WI"},
            {"name":"Wyoming","code":"WY"}
        ],

        getStateByCode: function (code) {
            
            var _result = _.find(this.items, {'code': code});

            if (typeof _result === "undefined") {
                ub.utilities.error ('State not found for code [' + code + ']');
            }

            return _result;

        },

        getStateByName: function (name) {
            
            var _result = _.find(this.items, {name: name});

            if (typeof _result === "undefined") {
                ub.utilities.error ('State [' + name + '] not found!');
            }

            return _result;

        }

    }

    // End US States 

    // Tackle Twill Free Form Exemptions
    ub.data.tackleTwillSportsFreeFormExemptions = {
        
        items: [
            'Football',
            'Basketball',
            'Baseball',
            'Fastpitch',
            'Hockey',
        ], 
        
        isValid: function (sport) {
            return _.contains(this.items, sport);
        },
        
    }

    // Category Specific Colors 

    ub.data.excludedColors = {

        items: [
            {
                sport: ['Football', 'Football 2017'],
                uniformApplicationType: 'tackle_twill',
                excludedColors: [
                    'PK',
                    'NP',
                    'Y',
                    'LG',
                    'DG',
                    'CR',
                ]
            }
        ],
        
        isExcluded: function (sport, uniformApplicationType, colorCode) {

            var _result = _.filter(this.items, function (item) {
                return _.contains(item.sport, sport) && uniformApplicationType === item.uniformApplicationType;
            });

            if (_.size(_result) > 0) {

                var _result = _.filter(_result, function (item) {
                    return _.contains(item.excludedColors, colorCode)
                });

                if (_.size(_result) > 0) {
                    return true;
                } else {
                    return false;    
                }

            } else {

                return false;

            }

        }

    }

    // Shortcuts

    // Turn off Random Feed on these block patterns 

    ub.data.randomFeedExemptions = {

        items: [
            "3 inch Stir Up Sock", 
            "7 inch Stir Up Sock",
            "9 inch Stir Up Sock",
        ],

        isExempted: function (option) {

            var _result = _.contains(this.items, option);
            return _result;

        }

    }

    // Unisex Sports 

    ub.data.uniSexSports = {

        items: [
            
            { sport: 'Socks (Apparel)', },
            { sport: 'Cinch Sack (Apparel)', },
            { sport: 'Hoodie (Apparel)', },
            { sport: 'Cage Jacket (Apparel)', },
            { sport: 'Quarter Zip Jacket (Apparel)', },

            { sport: 'Hockey', },

        ],

        isUniSex: function (sport) {
            
            var _result = undefined;

            _result = _.find(this.items, {sport: sport});

            return _.size(_result) > 0;

        }

    }

    // EXCLUDE in quarternary filters

    ub.data.filterExclusions = {

        items: [
            "Crew",
            "Men's",
            "Goal",
            "Default", // Hoodie
            "Cinch Sack",
            "Men's ",
            // Wrestling
            "Singlet",
            "Fight Shorts",
            "Compression Tops",
            "Compression Shorts",
        ], 

        isExcluded: function (alias) {

            return _.contains(this.items, alias);

        }

    }

    // Non Tackle Twill Categories 
    ub.data.nonTackleTwillItems = {

        items: [
            'Socks (Apparel)',
            'Fan Replica Jersey (Apparel)',
            'Cage Jacket (Apparel)',
            'Game Day Jackets (Apparel)',
            'Compression Pant (Apparel)',
            'Tech Tee (eSports)',
        ],
        isNonTackleTwill: function (uniformCategory) {

            var _result = undefined;
            _result = _.contains(this.items, uniformCategory);
            return _result;

        }

    }

    // Sublimated Categories 
    ub.data.tackleTwillOnly = {

        items: [
            'Lacrosse',
        ],
        isTackleTwillOnly: function (uniformCategory) {

            var _result = undefined;
            _result = _.contains(this.items, uniformCategory);
            return _result;

        }

    }


    // Blacklist of uniforms that don't need the number popup appear
    ub.data.numberPopupExcemptions = {

        items: [
            'Baseball', 
            'Football 2017',
        ],
        isValid: function (uniformCategory, uniformType) {

            var _result = undefined;
            _result = _.contains(this.items, uniformCategory);

            return typeof _result !== "undefined" && uniformType === "lower"

        }

    }
 
    ub.data.freeFormToolFirstPartSelection = {
        
        items: [
            'Yoga Pant (Apparel)',
            'Basketball'
        ],
        activateOnLowerUniform: function (uniformCategory) {

            var _result = undefined;

            _result = (_.contains(this.items, uniformCategory) && _.isEqual(ub.config.type, 'lower'));

            return _result;

        }

    }

    // Add active / inactive to application sizes in the backend to remove this datastructure @dhevs
    ub.data.consumeApplicationSizes = {

        items: [
            'Test', // Richardson Test Block
            'Football 2017',
            'Wrestling 2018',
            'Tennis',
            'Baseball',
            'Socks (Apparel)',
            'Yoga Pant (Apparel)',
            'Basketball',
            'SFN Jogger (Apparel)'
        ],
        isValid: function (uniformCategory) {

            var _result = undefined;
            _result = _.contains(this.items, uniformCategory);

            return _result;

        }

    }

    ub.dialog = bootbox;

    ub.data.sortIDs = {

        items: [
            {
                sortID: 1,
                blockPatternName: "Singlet",
            },
            {
                sortID: 2,
                blockPatternName: "Compression Tops",
            },
            {
                sortID: 3,
                blockPatternName: "Compression Shorts",
            },
            {
                sortID: 4,
                blockPatternName: "Fight Shorts",
            },
            {
                sortID: 5,
                blockPatternName: "Blank Styles",
            },
            {
                sortID: 6,
                blockPatternName: "Favorites",
            },

        ],
        getSortID: function (blockPatternName) {

            var _result = undefined;
            var _sortID = 0;
     
            _result = _.find(this.items, {blockPatternName: blockPatternName});

            if (typeof _result === "undefined") {
                _sortID = ub.data.sortIDs.items.length + 1;
                console.warn("Sort ID for " + blockPatternName + " not found using ")
            } else { 
                _sortID = _result.sortID;
            }

            return _sortID;

        }

    }

    // do not apply oneInchPullUp funcs for the the following sports
    ub.data.oneInchPullUpExemptions = {
        items: [
            {
                sport: 'Socks (Apparel)',
                blockPattern: 'Hockey Sock',
            }
        ],
        isExempted: function (sport, blockPattern) {
            
            var _result = undefined;
            
            _result = _.find(this.items, {sport: sport, blockPattern: blockPattern});
            
            return _.size(_result) > 0;
            
        }
    }

    // omit material option `e.g. Neck Tape 1` on ub.data.modifierLabels
    ub.data.hideMaterialOptionOnSportModifierLabels = {
        items: [
            'PTS Cage Jacket (Apparel)',
            'PTS Hoodie (Apparel)'
        ],
        isValid: function (uniformCategory, modifierLabels, materialOption) {

            if (_.contains(this.items, uniformCategory)) {

                return _.omit(modifierLabels, function(value, key, object) {

                    return _.contains(materialOption, value.fullname);

                });

            } else {

                return modifierLabels;

            }

        }
    }

});