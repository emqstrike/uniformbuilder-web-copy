$(document).ready(function() {

    /// Mascot Utilities

    ub.funcs.update_mascot_list = function () {

        var $mascot_container = $('div.mascot-container');
        var mascots = ub.data.mascots.items;

        _.each($mascot_container, function (el) {

            var $element = $(el);
            var mascot_list = "";
            var template = $('#mascot-list').html();

            var data = {
                element_id: $element.data('id'),
                mascot_set: mascots,
            }
            
            var markup = Mustache.render(template, data);

            $element.html(markup);

            $('a.mascot_picker').on('click', function (e) {

                $link = $(e.target);

                var application_id = $link.data('application-id');
                var mascot_id = $link.data('id');

                ub.ui.drops[application_id].close();

                var mascot = _.find(mascots, {
                    id: mascot_id
                });

                var application = _.find(ub.data.applications_transformed_one_dimensional, {
                    id: application_id.toString(),
                });

                ub.funcs.removeUIHandles();
                ub.funcs.update_mascots_picker(application.id, mascot); 
                ub.funcs.update_application_mascot(application, mascot);

            }); /// End $('a.mascot_picker').on('click'...

        });

    };

    ub.funcs.update_mascots_picker = function(application_id, mascot) {

        var $container = $('div.mascot-controls[data-id="' + application_id + '"]');
      
        var template = $('#mascot-controls').html();
        var data = {
            application_id: application_id,
        }

        var markup = Mustache.render(template, data);
        
        $container.html(markup);

        var application = _.find(ub.data.applications_transformed_one_dimensional, {
            id: application_id
        });

        // var view_str = application.perspective + '_view';
        // $('a#view_' + application.perspective).click();

        // $('input#flip_mascot_' + application_id).click( function () {

        //     var obj = ub.objects[view_str]['objects_' + application_id];

        //     var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
        //     var value = parseInt($rotation_slider.find('span.edit').html());
        //     var rotation = ( value / 620 ) * 360;

        //     if( $(this).is(':checked') ) {

        //         obj.flipped = true;
        //         obj.scale.x = Math.abs(obj.scale.x) * -1;

        //         $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');
        //         $angle_slider_mascot.find('div.rs-bg-color').css({
        //             '-moz-transform': 'scaleX(-1)',
        //             '-o-transform': 'scaleX(-1)',
        //             'transform': 'scaleX(-1)',
        //             'filter': 'FlipH',
        //             '-ms-filter': "FlipH",
        //             '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
        //         });

        //     }
        //     else {
            
        //         obj.flipped = false;
        //         obj.scale.x = Math.abs(obj.scale.x);

        //         $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');
        //         $angle_slider_mascot.find('div.rs-bg-color').css({
        //             '-moz-transform': 'scaleX(1)',
        //             '-o-transform': 'scaleX(1)',
        //             'transform': 'scaleX(1)',
        //             'filter': 'none',
        //             '-ms-filter': "none",
        //             '-webkit-transform': 'scaleX(1) ' + ' rotate(' + rotation + 'deg)',
        //         });

        //     }

        // });

        // $('div.y_slider[data-id="' + application_id + '"]').limitslider({

        //     values: [application.position.y  * ub.dimensions.height],
        //     min: 0,
        //     max: ub.dimensions.height,
        //     gap: 0,

        //     change: function(event, ui) {

        //         var application = _.find(ub.data.applications.items, {
        //             id: application_id
        //         });

        //         var value = $(this).limitslider("values")[0];
        //         var object = ub.objects[view_str]['objects_' + application_id];
        //         object.y = value;

        //     }

        // });

        // $('div.x_slider[data-id="' + application_id + '"]').limitslider({

        //     values: [application.position.x * ub.dimensions.width],
        //     min: 0,
        //     max: ub.dimensions.width,
        //     gap: 0,

        //     change: function(event, ui) {

        //         var application = _.find(ub.data.applications.items, {
        //             id: application_id
        //         });
        //         var value = $(this).limitslider("values")[0];
        //         var object = ub.objects[view_str]['objects_' + application_id];
        //         object.x = value;

        //     }

        // });

        // var max_scale = 100;
        // $('div.scale_slider[data-id="' + application_id + '"]').limitslider({

        //     values: [100],
        //     min: 0,
        //     max: max_scale,
        //     gap: 0,

        //     change: function(event, ui) {

        //         var application = _.find(ub.data.applications.items, { id: application_id });
        //         var value = $(this).limitslider("values")[0];
        //         var object =  ub.objects[view_str]['objects_' + application_id];
        //         var flipped = $('input#flip_mascot_' + application_id).is(':checked');
        //         var scale = new PIXI.Point(value / 100, value / 100);
                
        //         if (flipped) {
        //             scale.x = scale.x * -1;
        //         }
        //         else {
        //             scale.x = scale.x * 1;   
        //         }

        //         object.scale = scale;

        //         $('span[data-target="mascot"][data-label="scale"][data-id="' + application_id + '"]').text(value);

        //     }

        // });

        // var max_opacity = 100;
        // $('div.opacity_slider[data-id="' + application_id + '"]').limitslider({

        //     values: [100],
        //     min: 0,
        //     max: max_opacity,
        //     gap: 0,

        //     change: function(event, ui) {

        //         var application = _.find(ub.data.applications.items, {
        //             id: application_id
        //         });
        //         var value = $(this).limitslider("values")[0];
        //         var object =  ub.objects[view_str]['objects_' + application_id];
        //         object.alpha = value / max_opacity;

        //         $('span[data-target="mascot"][data-label="opacity"][data-id="' + application_id + '"]').text(value);

        //         $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');

        //         var opacity =  value / max_opacity;
        //         $angle_slider_mascot.find('div.rs-bg-color').css({
        //             "opacity": opacity,
        //         });

        //         ub.current_material.settings.applications[application_id].alpha = object.alpha;

        //         ub.save_property({
        //             application_id: application_id,
        //             property: 'alpha',
        //             value: object.alpha,
        //         })

        //     }

        // });

        // var max_rotation = 620;
        // var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
        // $rotation_slider.roundSlider({

        //     values: [0],
        //     min: 0,
        //     max: max_rotation,
        //     gap: 0,
        //     width: 5,
        //     handleSize: "+14",
        //     startAngle: 90,

        //     change: function(event, ui) {

        //         var application = _.find(ub.data.applications.items, {
        //             id: application_id
        //         });

        //         var value = parseInt($rotation_slider.find('span.edit').html());
        //         var object =  ub.objects[view_str]['objects_' + application_id];

        //         object.rotation = value / 100;
        //         var rotation = ( value / max_rotation ) * 360;

        //         $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');

        //         var flipped = $('input#flip_mascot_' + application_id).is(':checked');

        //         if (flipped) {

        //             $angle_slider_mascot.find('div.rs-bg-color').css({
        //                 '-moz-transform': 'scaleX(-1)',
        //                 '-o-transform': 'scaleX(-1)', 
        //                 'transform': 'scaleX(-1)',
        //                 'filter': 'FlipH',
        //                 '-ms-filter': "FlipH",
        //                 '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
        //             });

        //         } else {

        //             $angle_slider_mascot.find('div.rs-bg-color').css({
        //                 '-moz-transform': 'scaleX(1)',
        //                 '-o-transform': 'scaleX(1)',
        //                 'transform': 'scaleX(1)',
        //                 'filter': 'none',
        //                 '-ms-filter': "none",
        //                 '-webkit-transform': 'scaleX(1) ' + ' rotate(' + rotation + 'deg)',
        //             });

        //         }

        //     }

        // });

        $('input[type=radio][name=mascot_sizes][data-id="' + application_id + '"]').change(function() {
            
            // Todo: Scale Mascot based on value of this.value

            var scale_obj = _.find(ub.data.mascotSizes.items, {size: this.value});
  
            _.each (application.views, function (view) {

                var obj = ub.objects[view.perspective + '_view']['objects_' + application_id];
                obj.scale = {x: scale_obj.scale, y: scale_obj.scale};
                ub.current_material.settings.applications[application_id].scale = obj.scale;

            });

        });

        // $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');

        // $rotation_slider.find('div.rs-bg-color').css({
        //     'background-image': 'url(' + mascot.dataUrl + ')',
        //     'background-size': '80%',
        //     'background-position': 'center center',
        //     'background-repeat': 'no-repeat',
        // });

    };

    /// End Mascot Utilities

    ub.funcs.update_logo_list = function () {

        var $logo_container = $('div.logo-container');
        var logos = ub.current_material.containers.files.logos;

        _.each($logo_container, function (el) {

            var $element = $(el);
            var logo_list = "";
            var template = $('#logo-list').html();

            var data = {
                element_id: $element.data('id'),
                logo_set: logos,
            }
            
            var markup = Mustache.render(template, data);
            $element.html(markup);

            /// Handler for clicking a logo on the list of uploaded logos
            $('a.logo_picker').on('click', function (e) {

                ub.funcs.removeUIHandles();

                $link = $(e.target);

                var application_id = $link.data('application-id');
                var logo_id = $link.data('id');

                ub.ui.drops[application_id].close();

                var logo = _.find(logos, {
                    id: logo_id,
                });

                var application = _.find(ub.data.applications.items, {
                    id: application_id
                });

                ub.funcs.update_application(application, logo);
                ub.funcs.update_logos_picker(application.id, logo); 

            }); /// End $('a.logo_picker').on('click'...

            
        });

    }

    ub.funcs.update_logos_picker = function(application_id, logo) {

        var $container = $('div.logo-controls[data-id="' + application_id + '"]');
        var template = $('#logo-controls').html();
        var data = {
            application_id: application_id,
        }

        var markup = Mustache.render(template, data);
        
        $container.html(markup);

        var application = _.find(ub.data.applications.items, {
            id: application_id
        });

        var view_str = application.perspective + '_view';
        $('a#view_' + application.perspective).click();

        $('input#flip_logo_' + application_id).click( function () {

            var obj = ub.objects[view_str]['objects_' + application_id];
            var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
            var value = parseInt($rotation_slider.find('span.edit').html());
            var rotation = ( value / 620 ) * 360;

            if( $(this).is(':checked') ) {

                obj.flipped = true;
                obj.scale.x = Math.abs(obj.scale.x) * -1;

                $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');
                $angle_slider_logo.find('div.rs-bg-color').css({
                    '-moz-transform': 'scaleX(-1)',
                    '-o-transform': 'scaleX(-1)',
                    'transform': 'scaleX(-1)',
                    'filter': 'FlipH',
                    '-ms-filter': "FlipH",
                    '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
                });

            }
            else {
            
                obj.flipped = false;
                obj.scale.x = Math.abs(obj.scale.x);

                $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');
                $angle_slider_logo.find('div.rs-bg-color').css({
                    '-moz-transform': 'scaleX(1)',
                    '-o-transform': 'scaleX(1)',
                    'transform': 'scaleX(1)',
                    'filter': 'none',
                    '-ms-filter': "none",
                    '-webkit-transform': 'scaleX(1) ' + ' rotate(' + rotation + 'deg)',
                });

            }

        });

        $('div.y_slider[data-id="' + application_id + '"]').limitslider({

            values: [application.position.y  * ub.dimensions.height],
            min: 0,
            max: ub.dimensions.height,
            gap: 0,

            change: function(event, ui) {

                var application = _.find(ub.data.applications.items, {
                    id: application_id
                });
                var value = $(this).limitslider("values")[0];
                var object = ub.objects[view_str]['objects_' + application_id];
                object.y = value;

            }

        });

        $('div.x_slider[data-id="' + application_id + '"]').limitslider({

            values: [application.position.x * ub.dimensions.width],
            min: 0,
            max: ub.dimensions.width,
            gap: 0,

            change: function(event, ui) {

                var application = _.find(ub.data.applications.items, {
                    id: application_id
                });
                var value = $(this).limitslider("values")[0];
                var object = ub.objects[view_str]['objects_' + application_id];
                object.x = value;

            }

        });

        var max_scale = 100;
        $('div.scale_slider[data-id="' + application_id + '"]').limitslider({

            values: [100],
            min: 0,
            max: max_scale,
            gap: 0,

            change: function(event, ui) {

                var application = _.find(ub.data.applications.items, { id: application_id });
                var value = $(this).limitslider("values")[0];
                var object =  ub.objects[view_str]['objects_' + application_id];
                var flipped = $('input#flip_logo_' + application_id).is(':checked');
                var scale = new PIXI.Point(value / 100, value / 100);
                
                if (flipped) {
                    scale.x = scale.x * -1;
                }
                else {
                    scale.x = scale.x * 1;   
                }

                object.scale = scale;

                $('span[data-target="logo"][data-label="scale"][data-id="' + application_id + '"]').text(value);

            }

        });

        var max_opacity = 100;
        $('div.opacity_slider[data-id="' + application_id + '"]').limitslider({

            values: [100],
            min: 0,
            max: max_opacity,
            gap: 0,

            change: function(event, ui) {

                var application = _.find(ub.data.applications.items, {
                    id: application_id
                });
                var value = $(this).limitslider("values")[0];
                var object =  ub.objects[view_str]['objects_' + application_id];
                object.alpha = value / max_opacity;

                $('span[data-target="logo"][data-label="opacity"][data-id="' + application_id + '"]').text(value);

                $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

                var opacity =  value / max_opacity;
                $angle_slider_logo.find('div.rs-bg-color').css({
                    "opacity": opacity,
                });

            }

        });

        var max_rotation = 620;
        var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
        $rotation_slider.roundSlider({

            values: [0],
            min: 0,
            max: max_rotation,
            gap: 0,
            width: 5,
            handleSize: "+14",
            startAngle: 90,

            change: function(event, ui) {

                var application = _.find(ub.data.applications.items, {
                    id: application_id
                });

                var value = parseInt($rotation_slider.find('span.edit').html());
                var object =  ub.objects[view_str]['objects_' + application_id];

                object.rotation = value / 100;
                var rotation = ( value / max_rotation ) * 360;

                $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

                var flipped = $('input#flip_logo_' + application_id).is(':checked');

                if (flipped) {

                    $angle_slider_logo.find('div.rs-bg-color').css({
                        '-moz-transform': 'scaleX(-1)',
                        '-o-transform': 'scaleX(-1)', 
                        'transform': 'scaleX(-1)',
                        'filter': 'FlipH',
                        '-ms-filter': "FlipH",
                        '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
                    });

                } else {

                    $angle_slider_logo.find('div.rs-bg-color').css({
                        '-moz-transform': 'scaleX(1)',
                        '-o-transform': 'scaleX(1)',
                        'transform': 'scaleX(1)',
                        'filter': 'none',
                        '-ms-filter': "none",
                        '-webkit-transform': 'scaleX(1) ' + ' rotate(' + rotation + 'deg)',
                    });

                }

            }

        });

        $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');

        $rotation_slider.find('div.rs-bg-color').css({
            'background-image': 'url(' + logo.dataUrl + ')',
            'background-size': '80%',
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
        });

    };

    ub.funcs.lineDistance = function(point1, point2) {
        
        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        xs = xs * xs;

        ys = point2.y - point1.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);

    };

    ub.funcs.angleRadians = function(point1, point2) {
        
        return Math.atan2(point2.y - point1.y, point2.x - point1.x);

    };

    ub.funcs.removeUIHandles = function () {

        _.each(ub.data.views, function (view) {

             var view_objects = ub.objects[view + '_view'];
             var view = ub[view + '_view'];

            if (typeof view_objects['ui_handles'] === "object") {

                var applicationID = view_objects['ui_handles'].applicationID;
                
                $('button[data-action="identify"][data-id=' + applicationID + ']').click();

                view.removeChild(view_objects['ui_handles']);
                delete view_objects['ui_handles'];

            }

        });

    };


    ub.funcs.update_application_mascot = function(application, mascot) {

        var settings = ub.current_material.settings;
        var application_mascot_code = application.id + '_' + mascot.id;

        if(typeof settings.applications[application.id] !== 'undefined'){
            var scale_settings = settings.applications[application.id].scale;            
        }

        settings.applications[application.id] = {
            application: application,
            mascot: mascot,
            type: 'mascot',
            scale: scale_settings,
            color_array: {},
        };

        var settings_obj = settings.applications[application.id];
        var mascot_obj = settings_obj.mascot;
        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var input_object = {

            application: application,
            mascot: mascot,

        };

        var sprite_collection = ub.funcs.renderApplication($.ub.create_mascot, input_object, application.id);
        var uniform_type = ub.current_material.material.type;
        var app_containers = ub.current_material.containers[uniform_type].application_containers;
        var sprite = sprite_collection;                
        app_containers[application.id] = {};
        app_containers[application.id].object = {

            sprite: sprite_collection, 

        };

        window.sprite = sprite;
        
      
    };

    ub.funcs.update_application = function(application, logo) {

        var x = ub.dimensions.width * application.position.x;
        var y = ub.dimensions.height * application.position.y;
        var settings = ub.current_material.settings;
        var application_logo_code = application.id + '_' + logo.id;

        settings.applications[application.id] = {
            application: application,
            type: 'logo',
            color_array: {},
        };

        var settings_obj = settings.applications[application.id];
        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var sprite = PIXI.Sprite.fromImage(logo.dataUrl);

        ub.saveLogo(logo.dataUrl, application.id);
        
        var mask = _.find(ub.current_material.material.options, {
            perspective: application.perspective,
            name: application.layer
        });

        var mask = ub.pixi.new_sprite(mask.material_option_path);

        sprite.mask = mask;

        var s = view_objects['objects_' + application.id];

        var position = '';
        var scale = '';
        var rotation = '';
        var alpha = '';
        
        if (typeof(s) === 'object') {

            var obj = view_objects['objects_' + application.id];

            position = obj.position;
            scale = obj.scale;
            rotation = obj.rotation;
            alpha = obj.alpha;
            tint = obj.tint;
            var color_array = settings_obj.color_array;

            view.removeChild(view_objects['objects_' + application.id]);
            delete view_objects['objects_' + application.id];

        }

        view_objects['objects_' + application.id] = sprite;
        view.addChild(sprite);

        sprite.position = new PIXI.Point(x,y);
        sprite.rotation = application.rotation;

        if(sprite.width === 1) {
        
            sprite.position.x -= (sprite.width / 2);
            sprite.position.y -= (sprite.height / 2);

        }
  
        sprite.anchor.set(0.5, 0.5);

        var layer_order = ( 10 + application.layer_order ) 

        sprite.originalZIndex = layer_order * (-1);
        sprite.zIndex = layer_order * (-1);
        settings_obj.layer_order = layer_order;
    
        ub.updateLayersOrder(view);

        if(position !== ''){

            sprite.position = position;
            sprite.scale = scale;
            sprite.rotation = rotation;
            sprite.alpha = alpha;

        }

        settings_obj.position = sprite.position;
        settings_obj.scale = sprite.scale;
        settings_obj.rotation = sprite.rotation;
        settings_obj.alpha = sprite.alpha;

        $('div.x_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.x]);
        $('div.y_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.y]);

        ub.funcs.createDraggable(sprite, application, view);
        ub.funcs.createClickable(sprite, application, view, 'application');
        ub.funcs.identify(application.id);

    };

    ub.funcs.createDraggable = function (sprite, application, view) {

        // Check for Feature Flag
        if(!ub.config.isFeatureOn('ui','draggable_applications')) 
        {
            return;
        }
        
        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseup = sprite.touchend = function(data) {

            if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                sprite.position = new PIXI.Point(sprite.oldX, sprite.oldY);

            }

            this.data = data;
            this.dragging = true;

        };

        sprite.mousedown = sprite.touchstart = function(data) {

            this.data = data;

            sprite.oldX = sprite.x;
            sprite.oldY = sprite.y;

            sprite.snapped = false;
            this.dragging = true;

        };

        sprite.mousemove = sprite.mousemove = function(interactionData) {

            this.interactionData = interactionData;

            if (this.dragging) {

                _.each(ub.data.applications.items, function(application) {

                    var x = application.position.x * ub.dimensions.width;
                    var y = application.position.y * ub.dimensions.height;
                    var p_app = new PIXI.Point(x, y);
                    var p_sprite = new PIXI.Point(sprite.x, sprite.y);
                    var distance = ub.funcs.lineDistance(p_app, p_sprite);

                    if ($('#chkSnap').is(":checked")) {

                        var minimum_distance_to_snap = 50;

                        if (distance < minimum_distance_to_snap) {

                            sprite.position = new PIXI.Point(x,y);

                            sprite.oldX = x;
                            sprite.oldY = y;

                            sprite.snapped = true;
                            this.dragging = false;

                            return false; // Exit loop if the logo snapped to an application point

                        } else {

                            sprite.snapped = false;

                        }

                    }

                });

            }

            var this_data = this.interactionData.data;
            window.sprite = sprite;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

            /// Hotspot

            // Check for Feature Flag
            if(!ub.config.isFeatureOn('ui','hotspot_applications')) 
            {
                return;
            }

            var sprite_obj; 

            if(sprite.children.length === 0) {

                sprite_obj = sprite

            } else {

                sprite_obj = _.last(sprite.children);

            }

            if (typeof sprite_obj.containsPoint === "function") {

                if (sprite_obj.containsPoint(point)) {

                    sprite.zIndex = -500;
                    ub.updateLayersOrder(view);

                } else {

                    sprite.zIndex = sprite.originalZIndex;
                    ub.updateLayersOrder(view);

                }
                
            }

            /// End Hot Spot

        };

    }


    /// MV Functions 

        ub.funcs.getViewsOfID = function (app_id) {

            var views = ub.data.applications_transformed["Body"][app_id].views;
            return views;

        };

        ub.funcs.getSpritesOfID = function (app_id) {

            var views = ub.funcs.getViewsOfID(app_id);
            var sprites = [];

            _.each (views, function (view) {

                var _view_name = view.perspective + '_view';

                if (typeof ub.objects[_view_name]['objects_' + app_id] !== 'undefined'){

                    sprites.push(ub.objects[_view_name]['objects_' + app_id]);

                }
                else{

                    /// Not Found

                }

            });

            return sprites;

        };

    /// End MV Functions


    /// End Create Interactive UI

    ub.funcs.createInteractiveUI = function (sprite, application, type, ui_handles) {
        
        var rotation_point = _.find(ui_handles.children, { ubName: 'rotation_point'});
        var move_point = _.find(ui_handles.children, { ubName: 'move_point'});
        
        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseover = function(data) {

            var icon = '';

            if (type === 'move') {
                icon = 'url(' + ub.config.host + '/images/sidebar/move.png) 8 8,move';
                move_point.tint = 0xff0000;
            }

            if (type === 'rotate') {
                icon = 'url(' + ub.config.host + '/images/sidebar/rotate.png) 8 8,auto';
                rotation_point.tint = 0xff0000;
            }
            
            $('body').css('cursor', icon);

        }

        sprite.mouseout = function(data) {

            if (type === 'move') {
                move_point.tint = 0xffffff;
            }

            if (type === 'rotate') {
                rotation_point.tint = 0xffffff;
            }

            $('body').css('cursor','auto');

        } 

        sprite.mouseup = sprite.touchend = function(data) {

            if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                sprite.position = new PIXI.Point(sprite.oldX, sprite.oldY);

            }

            this.data = data;
            this.dragging = true;

        };

        sprite.mousedown = sprite.touchstart = function(data) {

            this.data = data;

            sprite.oldX = sprite.x;
            sprite.oldY = sprite.y;

            sprite.snapped = false;
            this.dragging = true;

        };

        sprite.mousemove = sprite.mousemove = function(interactionData) {

            this.interactionData = interactionData;

            if (this.dragging) {

                var x = application.position.x * ub.dimensions.width;
                var y = application.position.y * ub.dimensions.height;
                var p_app = new PIXI.Point(x, y);
                var p_sprite = new PIXI.Point(sprite.x, sprite.y);
                var distance = ub.funcs.lineDistance(p_app, p_sprite);
                var application_obj = ub.objects[application.perspective + '_view']['objects_' + application.id];

                if(typeof application_obj === 'undefined') {
                    return;
                }

                var settings_obj = ub.current_material.settings.applications[application.id];

                if (type === 'move') {

                    original_x = ub.dimensions.width * application.position.x;
                    original_y = ub.dimensions.height * application.position.y;

                    var original_location = new PIXI.Point(original_x, original_y);
                    var dist = Math.abs( ub.funcs.lineDistance(original_location, sprite.position) );
                    var limits = 500;

                    if(ub.config.isFeatureOn('ui','drag_limits')) {
                        limits = 30;
                    }

                    if (dist >= limits) {
                        move_point.position = sprite.position;
                        return;
                    }

                    /// Get Sprites and Update
                    
                    var _sprites = ub.funcs.getSpritesOfID(application.id);

                    _.each(_sprites, function (_sprite) {

                    });

                    application_obj.position = sprite.position;
                    settings_obj.position = sprite.position;

                    var r_x = rotation_point.x + (sprite.x - sprite.oldX);
                    var r_y = rotation_point.y + (sprite.y - sprite.oldY);
                    rotation_point.position = new PIXI.Point(r_x, r_y);

                    sprite.oldX = sprite.x;
                    sprite.oldY = sprite.y;

                }

                if (type === 'rotate') {

                    var angleRadians = ub.funcs.angleRadians(move_point.position, rotation_point.position);
                    application_obj.rotation = angleRadians;

                    settings_obj.rotation = application_obj.rotation;

                    var distance = ub.funcs.lineDistance(move_point.position, rotation_point.position);
                    percentage = distance / 100;

                    var application_type = settings_obj.type;

                    if (application_type === 'logo' || application_type === 'mascot' || application_type === 'image' || ub.

                        config.isFeatureOn('ui','scale_text')) {
                        application_obj.scale.set(percentage, percentage);
                        settings_obj.scale = application_obj.scale;

                    }

                }

                if ($('#chkSnap').is(":checked")) {

                    var minimum_distance_to_snap = 50;

                    if (distance < minimum_distance_to_snap) {

                        sprite.position = new PIXI.Point(x,y);

                        sprite.oldX = x;
                        sprite.oldY = y;

                        sprite.snapped = true;
                        this.dragging = false;

                        return false; // Exit loop if the logo snapped to an application point

                    } else {

                        sprite.snapped = false;

                    }

                }

            }
            
        };

    }

    /// End Create Create Interactive UI

    /// Create Clickable Applications

    ub.funcs.createClickable = function (sprite, application, view, spriteType) {

        // Check for Feature Flag
        if(!ub.config.isFeatureOn('ui','hotspots'))
        {
            return;
        }

        sprite.spriteType = spriteType;

        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseup = sprite.touchend = function(data) {


        };

        $('body').mouseup(function() {
            
            if (sprite.ubHover) {

                if(!$('a.sidebar-buttons.applications').hasClass('active_button')) {

                    $('a.sidebar-buttons[data-filename="applications"]').click();

                }

                $element = $('select.application_type_dropdown[data-id=' + application.id + ']');

                var difference = $('div#right-main-window').offset().top - $element.offset().top;

                if ( Math.abs(difference) > 100 || ub.states.active_application !== sprite) {

                    ub.states.active_application = sprite;

                }

            }

        });

        sprite.mousedown = sprite.touchstart = function(data) {

            var this_data = this.interactionData.data;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

        };

        sprite.mousemove = sprite.mousemove = function(interactionData) {

            var this_data = interactionData.data;
            window.sprite = sprite;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

            /// Hotspot

            var sprite_obj; 

            if(sprite.children.length === 0) {

                sprite_obj = sprite

            } else {

                sprite_obj = _.last(sprite.children);

            }

            if (typeof sprite_obj.containsPoint === "function") {

                if (sprite_obj.containsPoint(point)) {

                    //start
                    sprite.ubHover = true;
                    
                } else {

                    // restore
                    sprite.ubHover = false;
                    
                }
                
            }

            /// End Hot Spot
            
        };

    }

    /// End Create Clickable Application

    /// Rearrange Application Layers 

    ub.funcs.rearrangeApplications = function (application, movement) {

        var code = application.id;
        var current_layer_order = ub.current_material.settings.applications[application.id].layer_order;
        var settings_obj = ub.current_material.settings.applications[application.id];
        var current_obj = ub.objects[ application.perspective + '_view']['objects_' + application.id];

        if (movement === 'UP') {

            var next_element = _.find(ub.current_material.settings.applications, {'layer_order': current_layer_order + 1});
            
            if(typeof next_element !== 'undefined') {
                var next_obj = ub.objects[ application.perspective + '_view']['objects_' + next_element.application.id];
                next_element.layer_order = (current_layer_order);
                next_obj.zIndex = (current_layer_order) * -1;
            }

            settings_obj.layer_order = (current_layer_order + 1);
            current_obj.zIndex = (current_layer_order + 1) * -1;

            ub.updateLayersOrder(ub[application.perspective + '_view']);

        }

        if (movement === 'DOWN') {

            var next_element = _.find(ub.current_material.settings.applications, {'layer_order': current_layer_order - 1});
            
            if(typeof next_element !== 'undefined') {

                var next_obj = ub.objects[ application.perspective + '_view']['objects_' + next_element.application.id];
                next_element.layer_order = (current_layer_order);
                next_obj.zIndex = (current_layer_order) * -1;

            }

            settings_obj.layer_order = (current_layer_order - 1);
            current_obj.zIndex = (current_layer_order - 1) * -1;

            ub.updateLayersOrder(ub[application.perspective + '_view']);

        }

    };

    /// End Rearrange Layers


    /// Transformed Applications

        // Render Actual Application

        ub.funcs.create_sprite = function (config) {

            return ub.pixi.new_sprite('/images/misc/swoosh.png');

        }


        /// TODO: This should be memoize this function
        ub.funcs.getApplicationMatOption = function (app_id) {

            var material_option = undefined;

            _.each (ub.data.applications_transformed, function ( shape ) {

                _.each(shape, function (application) {

                    if (app_id === application.id) {

                        material_option = shape.name;

                    }

                });

            });    

            if (typeof material_option === 'undefined') {

                util.error('Material Option for Application ID ' + app_id + ' Not Found!');    

            }
            
            return material_option;

        };

        ub.funcs.renderApplication = function (sprite_function, args, app_id) {

            var sprite_collection = [];
            var mat_option = ub.funcs.getApplicationMatOption(app_id);
            var marker_name = "objects_" + app_id;
            var views = ub.data.applications_transformed[mat_option][app_id].views;

            _.each(ub.views, function(_view){

                var _view_name = _view + '_view';

                if(typeof ub.objects[_view_name][marker_name] !== "undefined"){
                    ub[_view_name].removeChild(ub.objects[_view_name][marker_name]);
                }

            });

            var adjustablePositions = ['1','2','6','5'];

            _.each(views, function(view){

                var point = sprite_function(args);
                point.position = new PIXI.Point(view.application.pivot.x, view.application.pivot.y);

                if(_.indexOf(adjustablePositions, app_id) !== -1) {

                    //var line = new PIXI.Graphics();
                    //line.lineStyle(1, 0xffffff);

                    if(app_id === '1' || app_id === '6'){

                        //line.moveTo(0, view.application.bottomRight.y);
                        //line.lineTo(550, view.application.bottomRight.y);

                        var point = sprite_function(args);
                        point.position = new PIXI.Point(view.application.pivot.x, view.application.pivot.y);

                    }
                    
                    if(app_id === '2' || app_id === '5'){

                        var topRightY = view.application.topRight.y;

                        // line.moveTo(0, topRightY);
                        // line.lineTo(550, topRightY);

                        var point = sprite_function(args);
                        var y = (point.height / 4 ) + topRightY;

                        point.position = new PIXI.Point(view.application.pivot.x, y);

                    }

                    // var view_name = view.perspective + '_view';
                    // ub[view_name].addChild(line);

                }

                point.rotation = (view.application.rotation * Math.PI) / 180;
                point.zIndex = -30;

                /// Todo: Put in Overrides to Opacity, Rotation, Scale and Position Here....

                var mask = _.find(ub.current_material.material.options, {
                    perspective: view.perspective,
                    name: mat_option,
                });

                var mask = ub.pixi.new_sprite(mask.material_option_path);
                point.mask = mask;
                point.name = marker_name;

                var view_name = view.perspective + '_view';
                ub.objects[view_name][marker_name] = point;
                
                ub[view_name].addChild(point);
                sprite_collection.push(point);

                //ub.funcs.createClickable(point, view.application, view, 'application');

                ub.updateLayersOrder(ub[view_name]);

            });

            ub.funcs.identify(app_id);

            return sprite_collection;

        };

        // End Render Application
        // Init Click

        $('#init_applications').on("click", function(e){
            
            ub.funcs.transformedApplications();

        });

        // End Init Click
        // Application Transformer

        ub.funcs.transformedApplications = function () {

            ub.data.applications_transformed = {};

            var material_options = ub.current_material.materials_options;
            var shapes = _.filter(material_options, {setting_type: 'shape'});
            var apps_transformed = ub.data.applications_transformed;
            var apps_one_dimensional = ub.data.applications_transformed_one_dimensional;

            _.each(shapes, function(shape){

                var app_properties = JSON.parse(shape.applications_properties.slice(1, -1));
                
                if(app_properties !== null){

                    _.each(app_properties, function (obj) {

                        if (typeof apps_transformed[shape.name] === "undefined") {
                
                            apps_transformed[shape.name] = {
                                name: shape.name,
                            };    
                
                        }  

                        if (typeof apps_transformed[shape.name][obj.id] === 'undefined'){

                            apps_transformed[shape.name][obj.id] = { id: obj.id, name: obj.name, views: [], layer: shape.name, type: obj.name.toCodeCase()};

                        }
                        
                        apps_transformed[shape.name][obj.id].views.push({ 
                            perspective: shape.perspective,
                            application: obj
                        });

                        apps_one_dimensional.push(apps_transformed[shape.name][obj.id]);

                    });

                }

            });

        }


    /// End Transformed Applications

    /// Transformed Boundary Properties

    ub.funcs.pointIsInPoly = function (p, polygon) {



        var isInside = false;
        var minX = polygon[0].x, maxX = polygon[0].x;
        var minY = polygon[0].y, maxY = polygon[0].y;

        for (var n = 1; n < polygon.length; n++) {

            var q = polygon[n];
            minX = Math.min(q.x, minX);
            maxX = Math.max(q.x, maxX);
            minY = Math.min(q.y, minY);
            maxY = Math.max(q.y, maxY);

        }

        if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {

            return false;

        }

        var i = 0, j = polygon.length - 1;

        for (i, j; i < polygon.length; j = i++) {
          
            if ( (polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                    p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x ) {
                isInside = !isInside;
            }

        }

        return isInside;

    }
    
    ub.funcs.isWithin = function (point, boundaries) {

        var _transformed_boundaries = [];

        if(ub[ub.active_view + '_view'].scale.x === 0.5) {

            _.each (boundaries, function(point) {
                
                var p = new PIXI.Point((point.x * 0.5) + ub.offset.x, (point.y * 0.5) + ub.offset.y);
                _transformed_boundaries.push(p); 

            });      
    
        }
        else {

            _.each (boundaries, function(point) {
                
                var p = new PIXI.Point((point.x * 0.7) + ub.offset.x, (point.y * 0.7) + ub.offset.y );
                _transformed_boundaries.push(p); 

            });   

        }

        return ub.funcs.pointIsInPoly(point, _transformed_boundaries);

    }
    ub.funcs.withinMaterialOption = function (point) {

        var _results = [];

        var _materialOptions = ub.data.boundaries_transformed_one_dimensional[ub.active_view];

        _.each(_materialOptions, function (_materialOption){

            var result = ub.funcs.isWithin(point, _materialOption.polygon, ub.active_view);

            if (result) {
                _results.push(_materialOption);
            }

        });

        return _results;

    }

    ub.funcs.resetInteracted = function () {

        ub.interacted  = {

            previous: {
                name: undefined,
            },
            
            current: {
                name: undefined,
            },
            
        }

    }

    ub.funcs.dim = function (_match) {

        var _materialOptions = ub.data.boundaries_transformed_one_dimensional[ub.active_view];

        _.each(_materialOptions, function (_materialOption) {

            var _name = _materialOption.name.toCodeCase();
            var _object = ub.objects[ub.active_view + '_view'][_name];

            _object.alpha = 0.3;
            ub.funcs.setAlphaOff(_object);


        });

        _.each (ub.objects[ub.active_view + "_view"], function (object) {

            if (object.name !== null) {

                if (object.name.indexOf('pattern_') !== -1 || object.name.indexOf('objects_') !== -1) {

                    if (object.name.indexOf(_match) !== -1) {
                        ub.funcs.setAlphaOn(object);

                        return;
                    }

                    if(object.name.indexOf('objects_') !== -1 && _.size(ub.current_material.settings.applications) !== 0 ) {

                        var _app_id = object.name.replace('objects_','');
                        var _application_obj = ub.current_material.settings.applications[_app_id];
                        var _app_layer = _application_obj.application.layer.toCodeCase();

                        if (_app_layer.indexOf(_match) !== -1) {
                            ub.funcs.setAlphaOn(object);

                            return;

                        }

                    }
                    
                    ub.funcs.setAlphaOff(object);

                }   

            }

        });

    };

    ub.funcs.resetHighlights = function () {

        ub.funcs.resetInteracted();

        $("#primary_options_header").html('');
        var _materialOptions = ub.data.boundaries_transformed_one_dimensional[ub.active_view];

        _.each(_materialOptions, function ( _materialOption ) {

            var _name = _materialOption.name.toCodeCase();
            var _object = ub.objects[ub.active_view + '_view'][_name];

            ub.funcs.setAlphaOn(_object, _object.name);
            ub.active_part = undefined;

        });    

        _.each (ub.objects[ub.active_view + "_view"], function (object) {

            if (object.name === null) { return; }

            if (object.name.indexOf('pattern_') !== -1 || object.name.indexOf('objects_') !== -1 && object.name.indexOf(ub.active_part) === -1) {

                ub.funcs.setAlphaOn(object);

            }
            
        });

    };

    ub.funcs.create_plugins = function (match, mode, matchingSide) {

        $('#primary_options_colors').html("<input type='text' id='primary_text' style='float: left; margin-top: -2px;'></input>");
        $('a.btn_tabs[data-type="smiley"]').click();
    
        if (mode === 'single') {

            var _str    = '';
            _str        = '<div class="primary_header">Color </div>';
            _str        += "<input type='text' id='primary_text' style='float: left; margin-top: -2px;'></input>";

            $('#primary_options_colors').html(_str);
            $('#primary_options_colors_advanced').html('<div></div>');

            $('#primary_text').ubColorPickerBasic({
        
                target: match.toCodeCase(),
                type: 'single',

            });

        }

        if (mode === 'withMatch') {

            $('#primary_options_colors').html("<input type='text' id='primary_text' style='float: left; margin-top: -2px;'></input>");
            $('#primary_options_colors_advanced').html('<div><input type="text" id="primary_text_left" style="float: left; margin-top: -2px;"></input></div><div><input type="text" id="primary_text_right" style="float: left; margin-top: -2px;"></input></div>');

            $('#primary_text').ubColorPickerBasic({
        
                target: match.toCodeCase(),
                type: 'withMatch',
                matchingSide: matchingSide,

            });

            var simple_mode = $('input#simple_toggle').is(":checked");

            if (simple_mode !== true) {

                $('#primary_text_left').ubColorPickerBasic({
            
                    target: match.toCodeCase(),
                    type: 'single',
                    
                });

                $('#primary_text_right').ubColorPickerBasic({
            
                    target: matchingSide.toCodeCase(),
                    type: 'single',
                    
                });

            }

        }

    };

    ub.funcs.setAlphaOn = function (_object) {

        if (typeof _object === 'undefined') { return; }

        _object.alpha = ub.ALPHA_ON;

        var _other_views = _.without(ub.views, ub.active_view);

        _.each (_other_views, function (_view) {

            if (typeof ub.objects[_view + "_view"][_object.name] !== "undefined") {

                _complementary_object = ub.objects[_view + "_view"][_object.name];
                _complementary_object.alpha = ub.ALPHA_ON;

            }

        });

    }

    ub.funcs.setAlphaOff = function (_object) {

        _object.alpha = ub.ALPHA_OFF;

        var _other_views = _.without(ub.views, ub.active_view);

        _.each (_other_views, function (_view) {

            if (typeof ub.objects[_view + "_view"][_object.name] !== "undefined") {

                _complementary_object = ub.objects[_view + "_view"][_object.name];
                _complementary_object.alpha = ub.ALPHA_OFF;

            }

        });

    }

    ub.funcs.match = function (_match) {

        ub.funcs.dim(_match);

        // var simple_mode = $('input#simple_toggle').is(":checked");
        var simple_mode = true; // Force Simple Mode By Default for now

        if (simple_mode === true) {

            /// Matching Side
            var _matching_side = '';
            /// 

            ub.interacted = {

                previous: { 

                    name: ub.interacted.current.name,

                },

                current: {

                    name: _match,

                },

            };

            if (_match.indexOf('left_') !== -1 || _match.indexOf('right_') !== -1) {

                if(typeof ub.interacted.previous.name !== "undefined" && typeof ub.interacted.previous.name !== undefined) {
    
                    var previous_name = ub.interacted.previous.name.replace('right_','').replace('left_','');
                    var actual = _match.replace('right_','').replace('left_','');

                    if (previous_name === actual) {

                        if (!ub.same_here_once) {

                            ub.funcs.create_plugins(_match, 'single');
                            _header_text = ub.active_part.toTitleCase();

                            var _object = ub.objects[ub.active_view + '_view'][_match];
                            ub.funcs.setAlphaOn(_object);

                            ub.same_here_once = true;

                            return _header_text;
                        }    

                    }
                    else {

                        ub.same_here_once = false;

                    }
    
                }
                
            }

            ///

            if (_match.indexOf('left_') !== -1){

                _matching_side = _match.replace('left_','right_');
                var _matching_object = ub.objects[ub.active_view + '_view'][_matching_side];
                ub.funcs.setAlphaOn(_matching_object);
                ub.funcs.create_plugins(_match, 'withMatch', _matching_side);

            } else if (_match.indexOf('right_') !== -1){

                _matching_side = _match.replace('right_','left_');

                var _matching_object = ub.objects[ub.active_view + '_view'][_matching_side];
                ub.funcs.setAlphaOn(_matching_object);
                ub.funcs.create_plugins(_match, 'withMatch', _matching_side);

            }
            else {

                ub.funcs.create_plugins(_match, 'single');

            }
            /// End Matching Side 

            _header_text = ub.active_part.toTitleCase().replace('Left ', '').replace('Right ','');

        }
        else {

            ub.funcs.create_plugins(_match, 'single');
            _header_text = ub.active_part.toTitleCase();

        }    

        var _object = ub.objects[ub.active_view + '_view'][_match];

        ub.funcs.setAlphaOn(_object);

        ub.same_here_once = false;

        return _header_text;

    }

    ub.funcs.makeActive = function (name) {

        var _ht = name;
        var _label = name.prepareModifierLabel();
        _group_id = ub.data.modifierLabels[_label].group_id;

        ub.funcs.match(name);

        $("span.part_label").html(_ht.toUpperCase());
        $("span.nOf").html(_group_id + ' of ' + _.size(ub.data.modifierLabels));

    }
    
    ub.funcs.transformedBoundaries = function () {

        ub.data.boundaries_transformed = {};

        var material_options = ub.current_material.materials_options;
        var shapes = _.filter(material_options, { setting_type: 'shape' });
        var boundaries_transformed = ub.data.boundaries_transformed;
        var boundaries_one_dimensional = ub.data.boundaries_transformed_one_dimensional;

        _.each(shapes, function(shape){

            var boundary_properties = JSON.parse(shape.boundary_properties.slice(1, -1));
            
            if(boundary_properties !== null){

                if (typeof boundaries_transformed[shape.name] === "undefined") {
        
                    boundaries_transformed[shape.name] = {
                        name: shape.name,
                        views: [],
                    };    
        
                }  

                var cObj = { 
                    perspective: shape.perspective,
                    bounding_box: {
                       topLeft:  boundary_properties['topLeft'],
                       topRight: boundary_properties['topRight'],
                       bottomLeft: boundary_properties['bottomLeft'],
                       bottomRight: boundary_properties['bottomRight'],
                    }
                };

                boundaries_transformed[shape.name].views.push(cObj);
                boundaries_one_dimensional[shape.perspective].push({
                    
                    name: shape.name,
                    alias: shape.name.replace('Left ', '').replace('Right ',''),
                    boundaries: cObj,
                    layer_no: shape.layer_level,
                    group_id: shape.group_id,
                    polygon: boundary_properties,

                });

            }

        });

        ub.stage.on('mousedown', function (mousedata) {

            if (ub.zoom) {

                ub.zoom_off();
                return;

            }

            var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);
            var _sizeOfColorsUsed = _.size(ub.data.colorsUsed);
     
            if (_sizeOfTeamColors < _sizeOfColorsUsed) { 
                ub.startModal();
                return; 
            }

            var current_coodinates = mousedata.data.global;
            var results = ub.funcs.withinMaterialOption(current_coodinates);

            if (results.length > 0) {

                var _match  = _.first(results).name.toCodeCase();
                var _result = _match.replace('right_','left_');
                var _obj    = _.find(ub.data.modifierLabels, {fullname: _result});
                var _index  = ub.funcs.getIndexByName(_result);
                
                ub.funcs.activatePartByIndex(_index);   

            }
            else {

                ub.funcs.resetHighlights();

            }

            return; 

            if ( typeof ub.active_part === 'undefined' || results.length === 0 ) {

                ub.funcs.resetHighlights();
                ub.active_lock = false;

            }
            else {

                if (results.length > 0 ) {

                    var _match = _.first(results).name.toCodeCase();
                    var _result = _match.replace('right_','left_');
                    var _obj = _.find(ub.data.modifierLabels, {fullname: _result});
                    var _index = ub.funcs.getIndexByName(_result);
                    
                    ub.funcs.activatePartByIndex(_index);   
             
                }
                else {

                    ub.funcs.resetHighlights();

                }

            }

        });

        ub.stage.on('mousemove', function (mousedata) {

            ub.funcs.stageMouseMove(mousedata);

        });

    }

    ub.funcs.stageMouseMove = function (mousedata) {

        var current_coodinates = mousedata.data.global;

        if (ub.zoom) {

            ub[ub.active_view + '_view'].position.set(-current_coodinates.x + ub.offset.x, -current_coodinates.y + ub.offset.y);

            return;

        }

        if (ub.active_lock === true) { return; }


        var results = ub.funcs.withinMaterialOption(current_coodinates);

        if (results.length > 0 ) {

            var _match = _.first(results).name.toCodeCase();
            
            if (ub.active_part === _match) {

                return;

            }

            var _active_view = ub.active_view + '_view';
            ub.active_part = _match;

            ub.funcs.dim(_match);

            var _object = ub.objects[_active_view][_match];
            ub.funcs.setAlphaOn(_object);

            //var simple_mode = $('input#simple_toggle').is(":checked");
            var simple_mode = true; // Turn this on by default

            if (simple_mode === true) {

                /// Matching Side 
                var _matching_side = '';

                if (_match.indexOf('left_') !== -1){

                    _matching_side = _match.replace('left_','right_');
                    var _matching_object = ub.objects[_active_view][_matching_side];
                    ub.funcs.setAlphaOn(_matching_object);

                } else if (_match.indexOf('right_') !== -1){

                    _matching_side = _match.replace('right_','left_');

                    var _matching_object = ub.objects[_active_view][_matching_side];
                    ub.funcs.setAlphaOn(_matching_object);

                }
                /// End Matching Side 

            }

            var _object = ub.objects[_active_view][_match];
            ub.funcs.setAlphaOn(_object);

        }
        else {

            ub.funcs.resetHighlights();

        }

    }

    ub.funcs.getModifierByIndex = function (index) {

        var _modifier = _.find(ub.data.modifierLabels, {index: index});
        return _modifier;

    };

    ub.funcs.getIndexByName = function (name) {

        var _obj = _.find(ub.data.modifierLabels, {fullname: name});
        var _index = '';

        if (typeof _obj !== 'undefined') {

            _index = _obj.index;

        }
        else {

            var tempName = '';
            if (name.indexOf('Left') !== -5) {

                tempName = name.replace('left_','right_');

            }
            else {

                tempName = name.replace('right_','left_');

            }

            var _obj = _.find(ub.data.modifierLabels, {fullname: tempName});

            _index = _obj.index;

        }

        return _index;

    };

    /// End Transformed Boundary Properties

    /// Get Primary View of Application, TODO: Set this on the backend primary_view, boolean

    ub.funcs.getPrimaryView = function (application) {

        var view = undefined;

        view = _.find(application.views, {perspective: "front"});
        
        if (typeof view === 'undefined') {
            view = _.find(application.views, {perspective: "back"});
        }

        if (typeof view === 'undefined') {
            view = _.find(application.views, {perspective: "left"});
        }

        if (typeof view === 'undefined') {
            view = _.find(application.views, {perspective: "right"});
        }

        return view;

    }

    /// End Get Primary View

    /// Get Modifier Labels

    ub.funcs.get_modifier_labels = function () {

        var _modifierLabels = ub.data.modifierLabels;

        _.each(ub.current_material.options_distinct_names, function (_distinct_name) {

            var _result     = _distinct_name.modifier_label;
            var _obj        = _.find(ub.current_material.materials_options, {name: _result.toTitleCase()});
            
            if (typeof _obj === 'undefined') { return; }

            if (_obj.setting_type === 'static_layer') { return; }
            
            var _group_id       = _obj.group_id;
            var _team_color_id  = _obj.team_color_id;            

            _result = _result.prepareModifierLabel();
            
            _modifierLabels[_result] = {
                name: _result,
                group_id: _group_id,
                team_color_id: _team_color_id,
                fullname: _distinct_name.modifier_label,
            };

        });

        ub.funcs.drawPartsDrop();

    };

    /// End Get Modifier Labels

    ub.funcs.drawPartsDrop = function () {

        var strBuilder              = '';
        var _moCount                = _.size(ub.data.modifierLabels);
        var _sortedModifierLabels   = _.sortBy(ub.data.modifierLabels, 'group_id');
    
        $pd = $('div#parts_dropdown');

        var _ctr = 1;

        /// For Team Colors  

        strBuilder += '<div class="pd-dropdown-links" data-ctr="0" data-group-id="0" data-fullname="team-colors" data-name="team-colors">' + '<i>Initialize</i> Team Colors</div>';

        _.each(_sortedModifierLabels, function (label){

            label.index = _ctr;

            strBuilder += '<div class="pd-dropdown-links" data-ctr="' + _ctr + '" data-group-id="' + label.group_id + '" data-fullname="' +  label.fullname + '" data-name="' + label.name + '">' + '<i>' + _ctr + ' of ' + _moCount + '</i> ' + label.name + '</div>';
            _ctr++;

        });

        ub.current_part = 1;

        var _next_part = _.find(_sortedModifierLabels, {index: 2});

        if (typeof _next_part !== 'undefined') {
            
            var _button_label = "<div class='left_side'>" + '<span class="next_label">Next Part:</span><br /><span class="part_label">' + _next_part.name + '</span></div> <div class="right_side"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>';

        }

        $('button#next_mo').html(_button_label);

        $pd.html(strBuilder);

        var _calledCtr = 0;

        $('div.pd-dropdown-links').on('click', function () {

            var _group_id   = $(this).data('group-id');
            var _fullname   = $(this).data('fullname');
            var _name       = $(this).data('name');
            var _ctr        = $(this).data('ctr');
            var _ht         = _name;
            var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);

            ub.current_part = _ctr;

            ub.funcs.activateColorPickers();

            // while ($('#color-wheel-container').css('margin-top') !== "0px") { true; }

            ub.funcs.moveToColorPickerByIndex(_ctr - 1);

            if (_fullname === 'team-colors' || _sizeOfTeamColors <= 1) {

                // // if (_calledCtr > 0) {
                // //     return;
                // // }

                // _calledCtr += 1;

                ub.funcs.initTeamColors();
                $pd.hide();

                return;

            }

            ub.active_part = _fullname;

            if (typeof _.find(ub.data.modifierLabels, {'name': _ht}) !== 'undefined') {
                
                _group_id = _group_id;

                $("span.part_label").html(_ht.toUpperCase());
                $("span.nOf").html(_ctr + ' of ' + _moCount);
                ub.current_group_id = _group_id;   

            }

            var _next_part = _.find(_sortedModifierLabels, {index: _ctr + 1});

            if (typeof _next_part !== 'undefined') {

                var _button_label = "<div class='left_side'>" + '<span class="next_label">Next Part:</span><br /><span class="part_label">' + _next_part.name + '</span></div> <div class="right_side"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>';

            }

            $('button#next_mo').html(_button_label);

            $pd.hide();
            ub.funcs.match(_fullname);

            $('div.mTab[data-type="color"]').click();

        });

        $("div.pd-dropdown-links").hover(
    
          function() {
            $( this ).addClass("pdHover");
          }, function() {
            $( this ).removeClass( "pdHover" );
          }

        );

    };

    ub.funcs.activatePartByIndex = function (index) {

        $('div.pd-dropdown-links[data-ctr="' + index + '"]').click();

    }

    ub.funcs.moveToNextMaterialOption = function () {

        var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);
        var _sizeOfColorsUsed = _.size(ub.data.colorsUsed);
 
        if (_sizeOfTeamColors < _sizeOfColorsUsed) { 
            ub.startModal();
            return; 
        }

        var _currentPart    = ub.current_part;
        var _moCount        = _.size(ub.data.modifierLabels);
        var _next_label     =   $('span.next_label').html();

        if (_next_label === 'Done') {

            $('div#main-row').fadeOut();
            return;

        }

        if (_currentPart < _moCount) {

            ub.current_part += 1;

            $('div.pd-dropdown-links[data-ctr=' + ub.current_part + ']').click();
            $('button#next_mo').css('background-color', '#3d3d3d');

        }
        else {

            $('span.next_label').html('Done');
            $('span.part_label').html('Enter Roster Info');
            $('button#next_mo').css('background-color', '#000000');

        }

    };

    ub.funcs.moveToPrevMaterialOption = function () {

        var _currentPart    = ub.current_part;
        var _moCount        = _.size(ub.data.modifierLabels);

        if (_currentPart >= 1) {

            ub.current_part -= 1;
            $('div.pd-dropdown-links[data-ctr=' + ub.current_part + ']').click();
            $('button#next_mo').css('background-color', '#3d3d3d');

        }

        if (ub.current_part < 0 ) { ub.current_part = 0} ;
        
    };

    $('button#prev_mo').on('click', function () {

        ub.funcs.moveToPrevMaterialOption();

    });

    $('button#next_mo').on('click', function () {

        ub.funcs.moveToNextMaterialOption();

    });

    $('div#topPrev').on('click', function () {

        ub.funcs.moveToPrevMaterialOption();

    });

    $('div#topNext').on('click', function () {

        ub.funcs.moveToNextMaterialOption();

    });

    ub.funcs.setGroupColor = function (groupID, hexCode, colorObj) {

        var _group_items  = _.filter(ub.data.modifierLabels, {team_color_id: groupID});

        _.each(_group_items, function (group_item) {

            ub.funcs.ui.setMaterialOptionColor(group_item.name, colorObj);
          
        })

    };

    ub.data.getPatternByID = function (id) {

      var _patternObject = _.find(ub.data.patterns.items, {id: id.toString()});
      return _patternObject;

    }

    ub.funcs.activatePatterns = function () {

        var _modifier               = ub.funcs.getModifierByIndex(ub.current_part);
        var _names                  = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial  = _names[0].toTitleCase();
        var _settingsObject         = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var _materialOptions        = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

        if (_settingsObject.has_pattern === 1) {

            $('#color-wheel-container').css('margin-top', '570px');

            console.log("Modifier: ");
            console.log(_modifier);

            console.log('Names: ');
            console.log(_names);

            console.log('Settings Object: ');
            console.log(_settingsObject);

            console.log('Material Options: ');
            console.log(_materialOptions);

            var firstMaterialOption     = _materialOptions[0];
            var patternObject           = ub.funcs.getPatternObjectFromMaterialOption(firstMaterialOption);

            console.log('----- Output ------');
            console.log(patternObject);

        }
        else {

            ub.showModal("Patterns can't be applied on [" + _modifier.name + "]");

        }

    };

    ub.funcs.activateColorPickers = function () {

        $('#color-wheel-container').css('margin-top', '0px');

    }


    ub.funcs.cleanPatternProperties = function (patternProperties) {

        var _patternProperties = patternProperties;

        if (_patternProperties.substring(0,1) === '"') {

            _patternProperties = _patternProperties.substring(1, _patternProperties.length);

        }

        if (_patternProperties.substring(_patternProperties.length - 1, _patternProperties.length) === '"') {

            _patternProperties = _patternProperties.substring(0, _patternProperties.length - 1);

        }


        return _patternProperties;

    }

    ub.funcs.getPatternObjectFromMaterialOption = function (materialOption) {

        console.log(materialOption.name);

        var patternProperties           = '';
        var _patternProperties          = ub.funcs.cleanPatternProperties(materialOption.pattern_properties);
        var patternPropertiesParsed     = JSON.parse(_patternProperties);
        var _patternObject              = ub.data.getPatternByID(materialOption.pattern_id);

        console.log('First Material Option: ');
        console.log(materialOption);

        // console.log("Pattern Properties: ");
        // console.log(patternPropertiesParsed);

        // console.log('Pattern Object: ');
        // console.log(_patternObject);

        var _materialOption = materialOption;
        var _patternObject = {
                pattern_id: _patternObject.id,
                scale: 0,
                rotation: 0,
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                pattern_obj : {
                    pattern_id: _patternObject.id,
                    active: _patternObject.active,
                    name: _patternObject.name,
                    code: _patternObject.code,
                    icon: _patternObject.icon,
                    layers: [],
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                }    
        };

        _.each (patternPropertiesParsed, function (_property) {

            var _defaultColor = ub.funcs.getColorByColorCode(_property.default_color);

            var _layer = { 
                default_color: _defaultColor.hex_code,
                layer_no:_property.layer, 
                filename: _property.file_path,
                color: parseInt(_defaultColor.hex_code, 16),
                container_position: {
                    x: 248 + ub.offset.x * 0.9,
                    y: 308 + ub.offset.y * 3.3,
                },
                container_opacity: 1,
                container_rotation: 0,
                container_scale: { x:1,y:1 },
            }

            _patternObject.pattern_obj.layers.push(_layer);

        });

        console.log(_patternObject);

        return _patternObject;

    }

});