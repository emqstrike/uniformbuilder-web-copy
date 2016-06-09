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

    ub.funcs.createLocationSprite = function (code) {

        var _filename                     = '/images/main-ui/outer-circle.png';
        var _sprite                       = ub.pixi.new_sprite(_filename);

        var _filenameCircleSprite         = '/images/main-ui/inner-circle.png';
        var _circleSprite                 = ub.pixi.new_sprite(_filenameCircleSprite);

        var _container                    = new PIXI.Container();
        var _teamColorOne                 = ub.current_material.settings.team_colors[0];
        var _codeSprite;

        _sprite.anchor.set(0.5, 0.5);
        _sprite.ubName                    = 'Marker';
        _sprite.alpha                     = 0.5;
        _container.addChild(_sprite);

        _circleSprite.anchor.set(0.5, 0.5);
        _circleSprite.ubName              = 'Circle';
        _container.addChild(_circleSprite);

        //_circleSprite.tint = parseInt(_teamColorOne.hex_code, 16);

        _codeSprite = new PIXI.Text(code.toString(),{font: 'bold 30px Arial', fill : parseInt('ffffff', 16), align : 'center'});
        _codeSprite.ubName = 'Code Sprite';
        _codeSprite.anchor.set(0.5, 0.5);
        _container.addChild(_codeSprite);

        return _container;

    }

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

        /// window.sprite = sprite;

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

    /// Create Interactive UI

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

    /// End  Create Interactive UI 

    /// Create Interactive UI

    ub.funcs.createInteractable = function (sprite, application, type) {
        
        // var rotation_point = _.find(ui_handles.children, { ubName: 'rotation_point'});
        // var move_point = _.find(ui_handles.children, { ubName: 'move_point'});

        // sprite.draggable({
        //     manager: ub.dragAndDropManager
        // });

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

    ub.data.applicationAccumulator = 0;

    ub.funcs.setPointer = function () {

        if (ub.data.applicationAccumulator > 0) {
            
             icon = 'pointer';
             $('body').css('cursor', icon);

        } else {
            
             icon = 'auto';
             $('body').css('cursor', icon);

        }

    };

    ub.funcs.getBaseSprite = function (sprite) {

        var baseSprite = _.find(sprite.children, {ubName: "Base Color"});
        return baseSprite;

    }

    ub.funcs.createClickable = function (sprite, application, view, spriteType) {

        // Check for Feature Flag
        if(!ub.config.isFeatureOn('ui','hotspots'))
        {
            return;
        }

        var basesprite;
        if (application.type !== "mascot" && application.type !== "logo") {

            baseSprite          = ub.funcs.getBaseSprite(sprite);
            baseSprite.oldTint  = baseSprite.tint;
            
        } else {

            baseSprite          = sprite.children[0];
            baseSprite.oldTint  = baseSprite.tint;

        }

        sprite.spriteType       = spriteType;

        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseup = sprite.touchend = function(data) {


        };

        $('body').mouseup(function() {

            /// If locations is turned on exit
            if (ub.showLocation) { return; }
            
            if (sprite.ubHover) {

                var _id = sprite.name.replace('objects_','');

                sprite.ubHover = false;

                if (application.type !== "mascot" && application.type !== "logo") {
                    ub.funcs.activateApplications(_id);
                } else {
                    ub.funcs.activateMascots(_id);
                }

            }

        });

        sprite.mousedown = sprite.touchstart = function(data) {

            if (ub.showLocation) { return; }
            if (typeof this.interactionData === 'undefined') { return; }

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

                var _sizeOfApplications = _.size(ub.current_material.settings.applications);

                if (sprite_obj.containsPoint(point)) {

                    if(ub.zoom) { return; }

                    // start
                    sprite.ubHover  = true;
                    baseSprite.tint = parseInt("3d3d3d",16);
                    ub.data.applicationAccumulator = _sizeOfApplications;
                    ub.funcs.setPointer();
                   
                } else {

                    // restore
                    sprite.ubHover  = false;
                    baseSprite.tint = baseSprite.oldTint;
                    ub.data.applicationAccumulator -= 1;
                    ub.funcs.setPointer();
                    
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

                    if(app_id === '1' || app_id === '6'){

                        point.position = new PIXI.Point(view.application.pivot.x, view.application.pivot.y);

                    }
                    
                    if(app_id === '2' || app_id === '5'){

                        var topRightY   = view.application.topRight.y;
                        var y           = (point.height / 4 ) + topRightY;

                        point.position  = new PIXI.Point(view.application.pivot.x, y);

                    }

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
                ub[view_name].addChild(mask);
                sprite_collection.push(point);

                if (typeof point.ubFontSizeData === "object") {

                    var _fontSizeData = point.ubFontSizeData;

                    // Scale

                    var _xScale = 1;
                    var _yScale = 1; 

                    if (_fontSizeData.xScale !== "0" && _fontSizeData.xScale !== undefined) { _xScale = parseFloat(_fontSizeData.xScale); }
                    if (_fontSizeData.yScale !== "0"  && _fontSizeData.yScale !== undefined) { _yScale = parseFloat(_fontSizeData.yScale); }

                    point.scale.set(_xScale, _yScale);

                    // Offset

                    var _xOffset = 0;
                    var _yOffset = 0;

                    if (_fontSizeData._xOffset !== "0") { _xOffset = parseFloat(_fontSizeData.xOffset); }
                    if (_fontSizeData._yOffset !== "0") { _yOffset = parseFloat(_fontSizeData.yOffset); }
                    point.position.x += _xOffset;
                    point.position.y += _yOffset;

                }

                if (typeof args.overrideOffsetX !== 'undefined') {

                    point.position.x += parseFloat(args.overrideOffsetX);

                }

                if (typeof args.overrideOffsetY !== 'undefined') {

                    point.position.y += parseFloat(args.overrideOffsetY);

                }

                //// Process Scale X and Y from the font size field, in the application font size

                if (typeof args.applicationObj !== "undefined") {


                    var _scaleXOverride = args.applicationObj.scaleXOverride;
                    var _scaleYOverride = args.applicationObj.scaleYOverride;

                    if (!isNaN(_scaleXOverride)) {

                        _scaleXOverride = parseFloat(_scaleXOverride);

                    }
                    else {
                    
                        _scaleXOverride = point.scale.x;
                    
                    }

                    if (!isNaN(_scaleYOverride)) {

                         _scaleYOverride = parseFloat(_scaleYOverride);

                    }
                    else {

                        _scaleYOverride = point.scale.y;

                    }

                    point.scale.set(_scaleXOverride, _scaleYOverride);


                //// End Process Scale X and Y from the font size field

                //// Process Override ScaleX and ScaleY from GA Font Tool

                    var _scaleX = point.scale.x;
                    var _scaleY = point.scale.y;

                    if (typeof args.overrideScaleX !== 'undefined') {
                        _scaleX = parseFloat(args.overrideScaleX);
                    }

                    if (typeof args.overrideScaleY !== 'undefined') {
                        _scaleY = parseFloat(args.overrideScaleY);
                    }

                    point.scale.set(_scaleX, _scaleY);

                //// Process End Override ScaleX and ScaleY from GA Font Tool   

                }
           
                ub.funcs.createClickable(point, view.application, view, 'application');
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

            _.each (boundaries, function (point) {
                
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

            var _name       = _materialOption.name.toCodeCase();
            var _object     = ub.objects[ub.active_view + '_view'][_name];

            _object.alpha   = 0.3;
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

            shape.angle = boundary_properties[0].angle;
            shape.patternOffsetX = boundary_properties[0].px;
            shape.patternOffsetY = boundary_properties[0].py;

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
     
            if (_sizeOfTeamColors < _sizeOfColorsUsed || _sizeOfTeamColors > 7) { 
                
                if(_sizeOfTeamColors < _sizeOfColorsUsed){
                    ub.startModal(1);
                    return;     
                }

                if(_sizeOfTeamColors > 7){
                    ub.startModal(2);
                    return;     
                }
                
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

                if (_match.indexOf('left_') !== -1) {

                    _matching_side = _match.replace('left_','right_');
                    var _matching_object = ub.objects[_active_view][_matching_side];
                    ub.funcs.setAlphaOn(_matching_object);

                    if (typeof ub.objects[_active_view]['pattern_' + _matching_side] !== 'undefined') {

                        ub.funcs.setAlphaOn(ub.objects[_active_view]['pattern_' + _matching_side]);

                    }

                } else if (_match.indexOf('right_') !== -1){

                    _matching_side = _match.replace('right_','left_');

                    var _matching_object = ub.objects[_active_view][_matching_side];
                    ub.funcs.setAlphaOn(_matching_object);

                    if (typeof ub.objects[_active_view]['pattern_' + _matching_side] !== 'undefined') {

                        ub.funcs.setAlphaOn(ub.objects[_active_view]['pattern_' + _matching_side]);

                    }

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

            var _group_id         = $(this).data('group-id');
            var _fullname         = $(this).data('fullname');
            var _name             = $(this).data('name');
            var _ctr              = $(this).data('ctr');
            var _ht               = _name;
            var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);

            ub.current_part = _ctr;

            ub.funcs.clearPatternUI();

            if (!ub.funcs.activatePatterns()) {
                ub.funcs.activateColorPickers();    
            }

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

    ub.funcs.changeApplicationLayerColor = function (applicationObj, layerNo, colorObj) {

    };

    ub.funcs.setGroupColor = function (groupID, hexCode, colorObj) {

        var _group_items  = _.filter(ub.data.modifierLabels, {team_color_id: groupID});

        _.each(_group_items, function (group_item) {

            ub.funcs.ui.setMaterialOptionColor(group_item.name, colorObj);
          
        });

        var _applications = ub.current_material.settings.applications;

        if (groupID === '2') {

            _.each(_applications, function (application) {

                if(application.application_type !== "mascot" && application.application_type !== "logo" && application.application_type !== "free" ) {

                    if (application.color_array.length >= 2) {

                        application.color_array[0] = colorObj;
                        _base_color = _.find(application.accent_obj.layers, {name: 'Base Color'});

                        if (typeof _base_color != 'undefined') {

                            _base_color.default_color = colorObj.hex_code;

                        }

                        ub.funcs.changeApplicationLayerColor(application, 1, colorObj);

                    } 

                }

            });

        }

    };

    ub.data.getPatternByID = function (id) {

      var _patternObject = _.find(ub.data.patterns.items, {id: id.toString()});
      return _patternObject;

    }

    ub.funcs.activateColorPickers = function () {

        ub.funcs.clearPatternUI();
        ub.funcs.deActivateApplications();

        ub.funcs.deActivateLocations();

        $('#color-wheel-container').fadeIn();

    }

    ub.funcs.deActivateColorPickers = function () {

        $('#color-wheel-container').hide();

    }

    ub.funcs.deActivatePatterns = function () {

        ub.funcs.clearPatternUI();

    }

    ub.funcs.updateColorLabel = function (label) {

        $('div.patternColorNavigator > div.label').html(label);

    }

    ub.funcs.moveToNextPatternColor = function (patternObj) {

        var _layerCount = _.size(patternObj.layers);
        ub.data.currentPatternLayer += 1;

        if (ub.data.currentPatternLayer > _layerCount) { ub.data.currentPatternLayer = _layerCount; }

        if (ub.data.currentPatternLayer > 0) {

            var _widthOfCW  = $('div.pattern-color-wheel').first().width();
            var _leftMargin = (ub.data.currentPatternLayer - 1) * _widthOfCW;

            $('div.pattern-color-wheel-container').css('margin-left', "-" + _leftMargin + 'px');
            $('div.patternPreviewContainer').hide();
            $('div.pattern-color-wheel-container').fadeIn();

        }

        var _colorSet       = ub.funcs.getBaseColors();
        var _activeLayer    = _.find(patternObj.layers, {layer_no: ub.data.currentPatternLayer.toString() });
        var _convertedColor = util.padHex((_activeLayer.color).toString(16), 6);
        var _colorOBJ       = _.find(_colorSet, {hex_code: _convertedColor});

        ub.funcs.updateColorLabel('COLOR ' + ub.data.currentPatternLayer + ' of ' + patternObj.layers.length);

        var $svgPath = $('svg#svg_pcw' + (ub.data.currentPatternLayer) + ' > path[data-color-id="' + _colorOBJ.id +'"]');
        $svgPath.trigger('click');


    };

    ub.funcs.moveToPreviousPatternColor = function (patternObj) {

        var _layerCount = _.size(patternObj.layers);
        ub.data.currentPatternLayer -= 1;

        var _widthOfCW  = $('div.pattern-color-wheel').first().width();
        var _leftMargin = (ub.data.currentPatternLayer - 1) * _widthOfCW;

        $('div.pattern-color-wheel-container').css('margin-left', "-" + _leftMargin + 'px');
        ub.funcs.updateColorLabel('COLOR ' + ub.data.currentPatternLayer  + ' of ' + patternObj.layers.length);

        if (ub.data.currentPatternLayer < 1) {

            ub.data.currentPatternLayer = 0;

            $('div.pattern-color-wheel-container').hide();
            $('div.patternPreviewContainer').fadeIn();

            ub.funcs.updateColorLabel('EDIT COLORS');

        }

    };

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
          
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };

    }

    function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;       

    }


    // Set Color in the Settings Object
    ub.funcs.setMaterialOptionSettingsPatternColor = function (materialOptionCode, colorObj, layer_no) {

        //// **** name is set to active part when in patterns

        // var _type                       = ub.current_material.material.type;
        // var _uniformObject              = ub.current_material.settings[_type];
        // var _materialOptionObject       = _.find(_uniformObject, {code: materialOptionCode});

        // if (typeof _materialOptionObject !== 'undefined') {

        //     _materialOptionObject.color     = parseInt(colorObj.hex_code, 16);
        //     _materialOptionObject.colorObj  = colorObj;
        
        // }
        
    };

    // Set Color of the Actual Sprite in the stage
    //ub.funcs.ui.setMaterialOptionPatternColor = function (ub.active_part, _colorOBJ, layerID, _patternObj) {
    ub.funcs.setMaterialOptionPatternColor = function (materialOption, colorOBJ, layerID, patternObj) {

        var _materialOption     = materialOption;
        var _colorOBJ           = colorOBJ;
        var _layerID            = layerID;
        var _patternObj         = patternObj;      
        var _layerObj           = _.find(_patternObj.layers, {layer_no: layerID.toString()});
        var _tintColor      = ub.funcs.hexCodeToTintColor(_colorOBJ.hex_code);
        _layerObj.color     = _tintColor;

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);
        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);

        var canvas                      = ub.data.previewCanvas;
        var oImg                        = ub.data.previewContainer[_layerID];
        delete oImg.filters[0];

        oImg.filters.push(new fabric.Image.filters.Tint({
            color: "#" + _colorOBJ.hex_code,
            opacity: 1,
        }));

        oImg.applyFilters(canvas.renderAll.bind(canvas));
        canvas.renderAll();

        setTimeout(function(){ 
                var _dUrl = canvas.toDataURL();
            _.each(_patternObj.layers, function (l) {
                
                $('svg#svg_pcw' + l.layer_no + ' > defs > pattern > image').attr('xlink:href', _dUrl);

            });    

        }, 50);
        
        _.each(_names, function (_name) {

            var titleNameFirstMaterial      = _name.toTitleCase();
            var _settingsObject             = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
            var layer = _.find(_settingsObject.pattern.pattern_obj.layers, {layer_no: layerID.toString()});

            layer.color = _tintColor;
            
            var _materialOptions            = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

            _.each(_materialOptions, function (_materialOption) {

                var _materialOptionName     = _materialOption.name;
                var _uniformType            = ub.current_material.material.type;
                var _containers             = ub.current_material.containers[_uniformType][_materialOptionName].containers;
                var views                   = ['front', 'back', 'left', 'right'];        
                var c                       = ub.current_material.containers[_uniformType][_materialOptionName].containers;

                _.each(views, function (v) {
                    c[v].container.children[layerID - 1].tint = _tintColor;
                });

            });

        })
        
    };

    ub.funcs.hexCodeToTintColor = function (hexCode) {

        var _hexCode    = hexCode;
        var _tintColor  = parseInt(hexCode, 16);

        return _tintColor;

    }

    ub.funcs.centerPatternPopup = function () {

        $popup = $('div#primaryPatternPopup');
        $popup.fadeIn();

        if ($popup.length === 0) {

            return;

        } 

        var _wWidth     = window.innerWidth;
        var _wHeight    = window.innerHeight;
        var _pWidth     = $popup.width();
        var _pHeight    = $popup.height();

        var _left       = (_wWidth - _pWidth) / 2;
        var _top        = (_wHeight - _pHeight) /2;

        $popup.css({
            
            top: _top,
            left: _left,

        }) 

    }

    ub.funcs.changePatternFromPopup = function (currentPart, patternID) {

        var _patternID                  = patternID.toString();
        var _currentPart                = currentPart;
        var _patternObject              = _.find(ub.data.patterns.items, {id: _patternID.toString()});

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);

        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();

        _.each(_names, function (name) {

            var _settingsObject             = ub.funcs.getMaterialOptionSettingsObject(name.toTitleCase());
            var _materialOptions            = ub.funcs.getMaterialOptions(name.toTitleCase());

            materialOption = _materialOptions[0];
            outputPatternObject         = ub.funcs.convertPatternObjectForMaterialOption(_patternObject, materialOption);
            _settingsObject.pattern     = outputPatternObject;
            e = _settingsObject;

            ub.generate_pattern(e.code, e.pattern.pattern_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);

        });

        ub.funcs.clearPatternUI();
        ub.funcs.activatePatterns();

    }

    ub.funcs.createPatternPopup = function () {

        if ($('div#primaryPatternPopup').length === 0) {

            var data = {
                label: 'Choose Patterns: ',
                patterns: _.sortBy(ub.data.patterns.items, 'sortID'),
            };

            var template = $('#m-pattern-popup').html();
            var markup = Mustache.render(template, data);

            $('body').append(markup);

        }

        $popup = $('div#primaryPatternPopup');
        $popup.fadeIn();

        $('div.patternPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('pattern-id');

            ub.funcs.changePatternFromPopup(ub.current_part, _id);
            $popup.remove();

        });

        ub.funcs.centerPatternPopup();

        $('div.close-popup').on('click', function (){

            $popup.remove();

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

        });

    };

    ub.data.currentPatternLayer = 0;
    ub.funcs.createPatternUI = function (inputPattern, materialOption) {

        var _inputPattern   = inputPattern;
        var _patternObj     = inputPattern.pattern_obj;
        var _materialOption = materialOption;

        var _htmlBuilder    = "<div id='patternUI'>";
        var _patternName    = _patternObj.name;
        var _thumbnail      = _patternObj.icon;

        var _teamColorObj   = ub.current_material.settings.team_colors;
        var _colorSet       = ub.funcs.getBaseColors();
        var _tempIndex      = 1;

        _htmlBuilder        += "<div class='patternName'><glabel>Pattern Name: </label> <span class='value'>" + _patternName + "</span></div>";
        _htmlBuilder        += '<div class="allPartsContainer"><input type="checkbox" name="applyToAllParts" value="apply" > APPLY TO ALL PARTS</div>';
        _htmlBuilder        += '<div class="patternPreviewContainer"><canvas id="patternPreview" class="patternPreview"></canvas></div>';
        _htmlBuilder        += '<div class="pattern-color-wheel-container">';

        _.each(_patternObj.layers, function (layer) {

            var fill        = 'white';
            var layerID     = layer.layer_no;

            _htmlBuilder    += '<div class="color-wheel pattern-color-wheel" id="pcw_' + layerID + '">';        
            _htmlBuilder    += '<svg id="svg_pcw' + layerID + '" class="svg-color-wheel">';
            _tempIndex      += 1;

            _htmlBuilder    += '<defs><pattern id="image" x="50" y="-50" patternUnits="userSpaceOnUse" height="300" width="300"><image x="0" y="0" width="300" height="300" xlink:href=""></image></pattern></defs>';
            _htmlBuilder    += '<circle class="preview" cx="250" cy="170" r="80"  fill="url(#image)" />';

            _.each(_teamColorObj, function (colorObj, index) {

                _htmlBuilder  +=  '<path class="growStroke arc-' + layerID + '" id="arc' + index + '-' + layerID + '" data-color-id="' + colorObj.id + '" fill="none" stroke="#' + colorObj.hex_code + '" stroke-width="50" />'; 

            });

            _htmlBuilder     += '</svg>';
            _htmlBuilder     += '</div>';

        });

        _htmlBuilder     += '</div>';

        if(_inputPattern.pattern_id !== "none" || _inputPattern.pattern_id !== "blank") {

            _htmlBuilder     += "<div class='patternColorNavigator'><div class='left'><i class='fa fa-chevron-left' aria-hidden='true'></i></div><div class='label'>EDIT COLORS</div><div class='right'><i class='fa fa-chevron-right' aria-hidden='true'></i></div></div>";

        }
        
        _htmlBuilder     += "</div>";

        $('.modifier_main_container').append(_htmlBuilder);

        _.each(_patternObj.layers, function (layer) {

            var layerID     = layer.layer_no;

            var _elements   = _teamColorObj.length;
            var _length     = 360 / _elements;
            var _start      = 0;

            _.each(_teamColorObj, function (colorObj, index) {

                var _nth    = index;
                var _start  = _nth * _length;
                var _end    = _start + _length;
                var _id     = "arc" + index + '-' + layerID;

                document.getElementById(_id).setAttribute("d", describeArc(250, 170, 125, _start, _end));

                $("path#arc" + index + '-' + layerID).on("click", function () {

                    $("path.arc-" + layerID).attr("class", "growStroke arc-" + layerID);
                    $(this).attr("class", "selectedStroke growStroke arc-" + layerID);

                   var _colorID           = $(this).data('color-id');
                   var _colorOBJ          = _.find(_colorSet, {id: _colorID.toString()});
                   
                   ub.funcs.setMaterialOptionPatternColor(materialOption, _colorOBJ, layerID, _patternObj);

                });

            });

        });    

        var _sizeOf     = _.size(_patternObj.layers);
        var _widthOfCW  = $('div.pattern-color-wheel').first().width();

        $('div.pattern-color-wheel-container').css('width', (_sizeOf * _widthOfCW) + 'px');

        $('#patternUI').fadeIn();

        ub.funcs.createPatternPreview(_inputPattern);

    };

    ub.data.previewContainer    = {};
    ub.data.previewCanvas       = {};
    ub.data.patternToolTip      = {};

    ub.funcs.createPatternPreview = function (inputPattern) {

        var _inputPattern       = inputPattern;
        var _patternObj         = inputPattern.pattern_obj;
        var _patternName        = _patternObj.name;
        var $patternContainer   = $('canvas#patternPreview');
        var canvas              = new fabric.Canvas('patternPreview');
        var context             = canvas.getContext("2d");
        ub.data.previewCanvas   = canvas;
        
        canvas.setHeight(300);
        canvas.setWidth(300);

        _.each(_patternObj.layers, function (layer) {

            var _layer_no       = layer.layer_no;
            var _filename       = layer.filename;
            var _defaultColor   = layer.color;
            var _color          = "#" + util.padHex((_defaultColor).toString(16),6);
            var _localName      = "/images/patterns/" + _patternName + "/" + _layer_no + ".png";

            fabric.Image.fromURL(_localName, function (oImg) {
                
                ub.data.previewContainer[_layer_no] = oImg;

                oImg.selectable     = true;
                oImg.lockMovementX  = true;
                oImg.lockMovementY  = true;
                oImg.hasControls    = false;

                canvas.add(oImg);

                if(_inputPattern.pattern_id !== "none" && _inputPattern.pattern_id !== "blank") {

                    oImg.filters.push(new fabric.Image.filters.Tint({
                        color: _color,
                        opacity: 1,
                    }));
                    oImg.applyFilters(canvas.renderAll.bind(canvas));

                }

                oImg.hoverCursor = 'pointer';

                canvas.renderAll();

                oImg.on('mousedown', function (){
                    
                    ub.funcs.createPatternPopup();

                });

                oImg.on('mousemove', function (e){
                    
                    ub.data.patternToolTip.opacity = 1;
                    ub.data.patternToolTip.bringToFront();

                });

           });

        });

        var bg = new fabric.Rect({
          fill: '#333333',
          scaleY: 0.5,
          originX: 'center',
          originY: 'center',
          rx: 5,
          ry: 5,
          width: 250,
          height:60,
          opacity: 0.5,
        });

        var text    = new fabric.Text('Click to Change Pattern', { originX: 'center', originY: 'center', fontFamily: 'Roboto', left: 0, top: 0, fontSize: 16, fill: '#ffffff', padding: 10 });
        var group   = new fabric.Group([ text, bg ], {
          left: 28,
          top: 254,
        });

        group.selectable    = true;
        group.hasControls   = false;
        group.lockMovementX = true;
        group.lockMovementY = true;
        group.hasBorders    = false;
        group.hoverCursor   = 'pointer';

        group.on('mousedown', function (){
                    
            ub.funcs.createPatternPopup();

        });

        text.bringToFront();
        ub.data.patternToolTip = group;
        canvas.add(ub.data.patternToolTip);
        //ub.data.patternToolTip.selectable = false;
        ub.data.patternToolTip.bringToFront();

        ub.data.currentPatternLayer = 0; // 0 is Pattern Preview

        $('div.patternColorNavigator > div.left').on('click', function () {

            ub.funcs.moveToPreviousPatternColor(_patternObj);

        });

        $('div.patternColorNavigator > div.right').on('click', function () {

            ub.funcs.moveToNextPatternColor(_patternObj);

        });

        $( "canvas.upper-canvas" ).hover(
          function() {

          }, function() {

               ub.data.patternToolTip.opacity = 0;
               ub.data.patternToolTip.sendToBack();

          }
        );

    };

    ub.funcs.clearPatternUI = function () {

        $('div#patternUI').remove();

    };

    ub.funcs.activatePatterns = function () {

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);

        if (typeof _modifier === 'undefined') { return false; }

        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();
        var _settingsObject             = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var _materialOptions            = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

        var _returnValue                = false;

        if (_settingsObject.has_pattern === 1) {

            ub.funcs.deActivateColorPickers ();
            ub.funcs.deActivateApplications();

            var firstMaterialOption     = _materialOptions[0];
            var patternObject           = _settingsObject.pattern;

            if (typeof patternObject === 'undefined') {

                _returnValue = false;
                return _returnValue;

            }
            else {


                ub.funcs.createPatternUI(patternObject, firstMaterialOption); 

                if (patternObject.pattern_id === "blank" || patternObject.pattern_id === "none") { return false; }

                return true;

            }

        }
        else {

            _returnValue = false;
            return _returnValue;

            // ub.showModal("Patterns can't be applied on [" + _modifier.name + "]");

        }

    };

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

    ub.funcs.translateAngle = function (inputAngle) {

        var _outputAngle = inputAngle / 360;
        _outputAngle = _outputAngle * 619;
        _outputAngle = _outputAngle / 100;

        return _outputAngle;

    };

    ub.funcs.getPatternObjectFromMaterialOption = function (materialOption) {

        var patternProperties           = '';
        var _patternProperties          = ub.funcs.cleanPatternProperties(materialOption.pattern_properties);
        var patternPropertiesParsed     = JSON.parse(_patternProperties);
        var _rotationAngle              = ub.funcs.translateAngle(materialOption.angle);

        if (materialOption.pattern_id === null ) {

            return undefined;

        }

        var _patternObject  = ub.data.getPatternByID(materialOption.pattern_id);

        if (typeof _patternObject === 'undefined') {

            return undefined;
        }


        var _materialOption = materialOption;
        var _patternObject  = {
                pattern_id: _patternObject.code,
                scale: 0,
                rotation: ub.funcs.translateAngle(_materialOption.angle),
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
                container_rotation: ub.funcs.translateAngle(_materialOption.angle),
                container_scale: { x:1,y:1 },
            }

            _patternObject.pattern_obj.layers.push(_layer);

        });

        return _patternObject;

    }

    ub.funcs.convertPatternObjectForMaterialOption = function (patternObject, materialOption) {

        var patternPropertiesParsed     = patternObject;
        var _rotationAngle              = ub.funcs.translateAngle(materialOption.angle);

        if (materialOption.pattern_id === null ) {

            return undefined;

        }

        var _materialOption = materialOption;
        var _patternObject  = {
                pattern_id: patternObject.code,
                scale: 0,
                rotation: ub.funcs.translateAngle(_materialOption.angle),
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                pattern_obj : {
                    pattern_id: patternObject.id,
                    active: patternObject.active,
                    name: patternObject.name,
                    code: patternObject.code,
                    icon: patternObject.icon,
                    layers: [],
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                }    
        };

        _.each (patternObject.layers, function (_property) {

            var _defaultColor = _property.default_color;
            
            var _layer = { 
                default_color: _defaultColor,
                layer_no:_property.layer_no.toString(), 
                filename: _property.filename,
                color: parseInt(_defaultColor, 16),
                container_position: {
                    x: 248 + ub.offset.x * 0.9,
                    y: 308 + ub.offset.y * 3.3,
                },
                container_opacity: 1,
                container_rotation: ub.funcs.translateAngle(_materialOption.angle),
                container_scale: { x:1,y:1 },
            }

            _patternObject.pattern_obj.layers.push(_layer);

        });

        return _patternObject;

    }

    /// Interactive Applications 

    ub.funcs.deActivateApplications = function () {

        $('div#applicationUI').remove();

    }

    ub.funcs.centerFontPopup = function () {

        $popup = $('div#primaryFontPopup');
        $popup.fadeIn();

        if ($popup.length === 0) {

            return;

        } 

        var _wWidth     = window.innerWidth;
        var _wHeight    = window.innerHeight;
        var _pWidth     = $popup.width();
        var _pHeight    = $popup.height();

        var _left       = (_wWidth - _pWidth) / 2;
        var _top        = (_wHeight - _pHeight) /2;

        $popup.css({
            
            top: _top,
            left: _left,

        }) 

    };

    //
    ub.funcs.centerAccentPopup = function () {

        $popup = $('div#primaryAccentPopup');
        $popup.fadeIn();

        if ($popup.length === 0) {

            return;

        } 

        var _wWidth     = window.innerWidth;
        var _wHeight    = window.innerHeight;
        var _pWidth     = $popup.width();
        var _pHeight    = $popup.height();

        var _left       = (_wWidth - _pWidth) / 2;
        var _top        = (_wHeight - _pHeight) /2;

        $popup.css({
            
            top: _top,
            left: _left,

        }) 

    };

    ub.funcs.removeApplicationByID = function (id) {

        _.each(ub.data.views, function (view) {

            var _viewName = view + '_view';

            var _object = ub.objects[_viewName]['objects_' + id];

            if (typeof _object === "object") {
                _object.ubHover = false;
                _object.destroy();
                ub.front_view.removeChild(_object);
            }

        });

    }

    ub.funcs.changeFontFromPopup = function (fontId, settingsObj) {

        var _fontObj    = _.find(ub.data.fonts, {id: fontId.toString()});
        var _id         = settingsObj.id;

        ub.funcs.removeApplicationByID(_id);

        settingsObj.font_obj = _fontObj;

        ub.create_application(settingsObj, undefined);

        $popup = $('div#primaryFontPopup');
        $popup.remove();

    }

    ub.funcs.changeAccentFromPopup = function (accentID, settingsObj) {

        var _accentObj  = _.find(ub.data.accents.items, {id: parseInt(accentID)});
        var _id         = settingsObj.id;

        ub.funcs.removeApplicationByID(_id);

        /// Set Default Colors 

        var _firstLayer = _.find(_accentObj.layers, {layer_no: 1});
        _firstLayer.default_color = ub.current_material.settings.team_colors[1].hex_code;

        if (_accentObj.layers.length >= 4) {

            var _secondLayer = _.find(_accentObj.layers, {layer_no: 1});
            var _color = _color = ub.funcs.getColorByColorCode('B').hex_code;

            if (ub.current_material.settings.team_colors.length >= 3) {
                _color = ub.current_material.settings.team_colors[2].hex_code;
            } 

            _secondLayer.default_color = _color;

        }

        /// End Set Default Colors 

        settingsObj.accent_obj = _accentObj

        ub.create_application(settingsObj, undefined);

        $popup = $('div#primaryAccentPopup');
        $popup.remove();

    }

    ub.funcs.changeSize = function (size, settingsObj) {

        var _id         = settingsObj.id;
        ub.funcs.removeApplicationByID(_id);

        /// Set Default Colors 

        settingsObj.font_size = parseInt(size);
        ub.create_application(settingsObj, undefined);

    }

    ub.funcs.createFontPopup = function (applicationType, sampleText, settingsObj) {

        var sampleSize = '1.9em';
        var paddingTop = '40px';

        if (applicationType === 'Player Number') {

            sampleSize = '3.3em';
            paddingTop = '30px';

        }

        var data = {
            label: 'Choose Font: ',
            fonts: ub.data.fonts,
            sampleText: sampleText,
            applicationType: applicationType,
            sampleSize: sampleSize,
            paddingTop: paddingTop,
        };

        var template = $('#m-font-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryFontPopup');
        $popup.fadeIn();

          $('div.fontPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        $('div.fontPopupResults > div.item').on('click', function () {

            var _id = $(this).data('font-id');

            ub.funcs.changeFontFromPopup(_id, settingsObj);
            $popup.remove();
            ub.funcs.activateApplications(settingsObj.code)

            if (settingsObj.type === "front_number" || settingsObj.type === "back_number") {

                var _newFont = _.find(ub.data.fonts, {id: _id}); 

                _.each (ub.current_material.settings.applications, function (_application) {

                    if (_application.type !== settingsObj.application_type && _application.type !== "logo" && _application.type !== "mascot") {

                        if (settingsObj.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                            ub.funcs.changeFontFromPopup(_id, _application);

                        }

                    }
                    
                });

            }

           if (settingsObj.code === "32") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                ub.funcs.changeFontFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "33") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                ub.funcs.changeFontFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "9") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                ub.funcs.changeFontFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "10") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                ub.funcs.changeFontFromPopup(_id, _matchingSettingsObject);

            }

        });

        ub.funcs.centerFontPopup();

        $('div.close-popup').on('click', function (){

            $popup.remove();

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

        });


    }

     ub.funcs.createAccentPopup = function (settingsObj) {

        var data = {
           accents: ub.data.accents.items,
       }

        var template = $('#m-accent-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryAccentPopup');
        $popup.fadeIn();

          $('div.accentPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        $('div.accentPopupResults > div.item').on('click', function () {

            var _id = $(this).data('accent-id');

            ub.funcs.changeAccentFromPopup(_id, settingsObj);
            $popup.remove();
            ub.funcs.activateApplications(settingsObj.code)

            if (settingsObj.code === "32") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                ub.funcs.changeAccentFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "33") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                ub.funcs.changeAccentFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "9") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                ub.funcs.changeAccentFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "10") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                ub.funcs.changeAccentFromPopup(_id, _matchingSettingsObject);

            }
            


        });

        ub.funcs.centerAccentPopup();

        $('div.close-popup').on('click', function () {

            $popup.remove();

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

        });

    }

    ub.funcs.createAssistants = function (applicationObj, modifier) {


    }

    ub.funcs.activateColorPickerForApplication = function (settingsObj, layerNo, selectedColorCode) {

        $('#applicationUI').css('margin-left', '-500px');
        $('.colorItem').hide();

    }

    ub.funcs.getFontAtIndex = function (index) {

        /// Todo: put index in initial load

        var _fontList  = _.filter(ub.data.fonts, {active: "1"});
        var _fontMatch = undefined;

        _.each(_fontList, function (font, fontIndex){ 

            if (fontIndex === index) {

                _fontMatch = font;

            }

        });

        return _fontMatch;

    } 

    ub.funcs.getFontObj = function (direction, activeFontObject) {

        var _fontList   = _.filter(ub.data.fonts, {active: "1"});
        var _index      = _.findIndex(_fontList, {name: activeFontObject.name});
        var _newFontObj;

        if (typeof _index === "undefined") {

            _newFontObj = _.first(ub.data.fonts);

        } else {

            if (direction === 'next') {
                _newFontObj = ub.funcs.getFontAtIndex(_index + 1);
            } else {
                _newFontObj = ub.funcs.getFontAtIndex(_index - 1);
            }
            
        }

        return _newFontObj;

    } 

    ub.funcs.createSmallColorPickers = function (activeColorCode, layer_no, layer_name, active_color) {

        var _html       = "";
        var _cObj       = ub.funcs.getColorByColorCode(activeColorCode);

        _html = '<div class="smallPickerContainer" data-layer-no="' + layer_no + '">';

        _html += '<label class="smallColorPickerLabel" style="color: #' + _cObj.hex_code + '">' + layer_name + ' (' + activeColorCode + '): ' + ' </label>';

        _.each(ub.current_material.settings.team_colors, function (_color) {

            var _checkMark  = '&nbsp;';
            var _style      = "30px";
            var _class      = '';

            if (activeColorCode === _color.color_code) {
                _checkMark  = '<i class="fa fa-check" aria-hidden="true"></i>';
                _style      = "40px";
                _class      = 'activeColorItem';
            }

            var _colorObj = ub.funcs.getColorByColorCode(_color.color_code);
            _html += '<span style="width: ' + _style + ';background-color: #' + _colorObj.hex_code + '; color: #' + _colorObj.forecolor + ';" class="colorItem ' + _class + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '">' + _checkMark + '</span>';

        });

        _html += '</div>';

        return _html;

    }

    ub.funcs.changeMascotSize = function (size, settingsObj) {

        var _id         = settingsObj.id;
        ub.funcs.removeApplicationByID(_id);

        settingsObj.size = parseInt(size);
        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot);

    }

    ub.funcs.changeMascotColor = function (colorObj, layer_no, settingsObj) {

        var _id         = settingsObj.id;
        ub.funcs.removeApplicationByID(_id);

        var _layer = _.find(settingsObj.mascot.layers_properties, {layer_number: layer_no.toString()});
        _layer.default_color = colorObj.color_code;

        settingsObj.color_array[layer_no - 1] = colorObj;

        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot);

    }


    ub.funcs.createMascotPopup = function (applicationType, mascot, settingsObj) {

        var sampleSize = '1.9em';
        var paddingTop = '40px';

        var data = {
            label: 'Choose Mascot: ',
            mascots: _.filter(ub.data.mascots, {active: "1"}),
            paddingTop: paddingTop,
        };

        var template = $('#m-mascot-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryPatternPopup');
        $popup.fadeIn();

          $('div.patternPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('mascot-id');

            ub.funcs.changeMascotFromPopup(_id, settingsObj);
            $popup.remove();
            ub.funcs.activateMascots(settingsObj.code)

            if (settingsObj.code === "9") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                ub.funcs.changeMascotFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "10") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                ub.funcs.changeMascotFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "32") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                ub.funcs.changeMascotFromPopup(_id, _matchingSettingsObject);

            }

            if (settingsObj.code === "33") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                ub.funcs.changeMascotFromPopup(_id, _matchingSettingsObject);
                
            }

        });

        ub.funcs.centerPatternPopup();

        $('div.close-popup').on('click', function (){

            $popup.remove();

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

        });

    }

    ub.funcs.changeMascotFromPopup = function (mascotId, settingsObj) {

        var _mascotObj    = _.find(ub.data.mascots, {id: mascotId.toString()});
        var _id         = settingsObj.id;

        ub.funcs.removeApplicationByID(_id);

        settingsObj.mascot = _mascotObj;
        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot);

        $popup = $('div#primaryPatternPopup');
        $popup.remove();

    }

    ub.funcs.getApplicationSettings = function (id) {

        var _id = parseInt(id);

        return ub.current_material.settings.applications[_id];

    }

    ub.funcs.getThumbnailImageMascot = function (ref, id) {

        var texture         = new PIXI.RenderTexture(ub.renderer, 512, 512);
        texture.render(ref, null, true);         

        return texture.getImage().src;

    };

    ub.funcs.activateMascots = function (application_id) {

        var _id                 = application_id.toString();
        var _settingsObject     = _.find(ub.current_material.settings.applications, {code: _id});
        var _applicationType    = _settingsObject.application_type;
        var _sizes              = ub.funcs.getApplicationSizes(_applicationType);
        var _mascotObj          = _settingsObject.mascot;
        var _currentSize        = _settingsObject.size;
        var _colorArray         = _settingsObject.color_array;
        var _mascotName         = _mascotObj.name;
        var _mascotIcon         = _mascotObj.icon;
        var _title              = _applicationType.toTitleCase();
        var _htmlBuilder        = "";
        var _appActive          = 'checked';
        var _maxLength          = 12;

        ub.funcs.deActivateApplications();
        ub.funcs.deActivateColorPickers();
        ub.funcs.deActivatePatterns();
        ub.funcs.deActivateLocations();
        
        if (_settingsObject.type.indexOf('number') !== -1) { _maxLength = 2; }

        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') { var _status = _settingsObject.status; } 

        _htmlBuilder        =  '<div id="applicationUI" data-application-id="' + _id + '">';
        _htmlBuilder        +=      '<div class="header">';
        _htmlBuilder        +=      '<div class="toggle" data-status="' + _status + '"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>';
        _htmlBuilder        +=      '<div class="applicationType">' + _title + '</div><span class="cog"><i class="fa fa-cog" aria-hidden="true"></i></span></div>';
        _htmlBuilder        +=      '<div class="body">';
        _htmlBuilder        +=          '<div class="cover"></div>';

        _htmlBuilder        +=          '<div class="ui-row">';

        _htmlBuilder        +=              '<label class="applicationLabels font_name">Mascot</label>';
        _htmlBuilder        +=              '<span class="fontLeft" data-direction="previous"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';                       
        _htmlBuilder        +=              '<span class="font_name" style="font-size: 1.2em; font-family: ' + _mascotName + ';">' + _mascotName + '</span>';                       
        _htmlBuilder        +=              '<span class="fontRight" data-direction="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';

        _htmlBuilder        +=          '</div>';

        _htmlBuilder        +=          '<div class="ui-row">';

        _htmlBuilder        +=              '<label class="applicationLabels font_size">Size</label>'; 

        _.each(_sizes.sizes, function (size) {

            var _additionalClass = '';

            if (size.size === _settingsObject.size) {

                _additionalClass = 'active';

            }

            _htmlBuilder    +=              '<span class="applicationLabels font_size ' + _additionalClass + '" style="font-size: 1.2em;" data-size="' + size.size + '">' + size.size + '"'  + '</span>';

        });                    

        _htmlBuilder        +=          '</div>';
        _htmlBuilder        +=          '<div class="clearfix"></div>';

        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<div class="column1">'

        _htmlBuilder        +=              '<div class="sub1">';
        _htmlBuilder        +=                  '<br />';        
        _htmlBuilder        +=                  '<span class="accentThumb"><img src="' + _mascotIcon + '"/></span><br />';                                                             
        _htmlBuilder        +=                  '<span class="accent">' + _mascotName + '</span>';        
        _htmlBuilder        +=              '</div>';

        _htmlBuilder        +=                  '<div class="colorContainer"><br />';

        _.each(_settingsObject.mascot.layers_properties, function (layer) {

            var _hexCode = layer.default_color;
            var _color   = ub.funcs.getColorByColorCode(_hexCode);
            if (typeof _color !== 'undefined') {

                _htmlBuilder += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color);
 
            }
            else {

                util.error('Hex Code: ' + _hexCode + ' not found!');

            }

        });

        _htmlBuilder        +=                  '</div>';
        _htmlBuilder        +=              '</div>';
        _htmlBuilder        +=          '</div>';
        _htmlBuilder        +=      '</div>';
        _htmlBuilder        +=  '</div>';
        
        $('.modifier_main_container').append(_htmlBuilder);

            // Generate Thumbnails

            // var _appView = _settingsObject.application.views[0].perspective;
            // var _src = ub.funcs.getThumbnailImageMascot(ub.objects[_appView + "_view"]['objects_' + _id], _id);
            // console.log(_src);
            // $('span.accentThumb > img').attr('src',_src);


        // Events

            $("div.toggleOption").on("click", function () {

                var _currentStatus = $('div.toggle').data('status');
                var s;

                if(_currentStatus === "on") {
                    s = 'off';
                }
                else {
                    s = 'on';
                }

                ub.funcs.toggleApplication(_id,s);    

                if(_id === "9") { ub.funcs.toggleApplication('10', s); }
                if(_id === "10") { ub.funcs.toggleApplication('9', s); }

                if(_id === "32") { ub.funcs.toggleApplication('33', s); }
                if(_id === "33") { ub.funcs.toggleApplication('32', s); }

            });

            ub.funcs.toggleApplication(_id, _status);
            
            if(_id === "9") { ub.funcs.toggleApplication('10', _status); }
            if(_id === "10") { ub.funcs.toggleApplication('9', _status); }

            if(_id === "32") { ub.funcs.toggleApplication('33', _status); }
            if(_id === "33") { ub.funcs.toggleApplication('32', _status); }

            $('span.font_size').on('click', function () {

                var _selectedSize = $(this).data('size');
                $('.font_size').removeClass('active');
                $(this).addClass('active');
                ub.funcs.changeMascotSize(_selectedSize, _settingsObject);

                if (_id === "9") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                    ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);

                }

                if (_id === "10") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                    ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);

                }

                if (_id === "32") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                    ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);

                }

                if (_id === "33") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                    ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);

                }

            });

            $('span.font_name').on('click', function () {

                ub.funcs.createMascotPopup(_title, _mascotObj, _settingsObject);

            });


            $('span.accentThumb, span.accent').on('click', function () {

                ub.funcs.createMascotPopup(_title, _mascotObj, _settingsObject);

            });


            $('span.colorItem').on('click', function () {

                var _layer_no   = $(this).data('layer-no');
                var _color_code = $(this).data('color-code');
                var _layer_name = $(this).data('layer-name');
                var _colorObj = ub.funcs.getColorByColorCode(_color_code);

                ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject); 
                ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

                if (_id === "9") {

                    var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: "10"});
                    ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject); 

                }

                if (_id === "10") {

                    var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: "9"});
                    ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);                 
                }

                if (_id === "32") {

                    var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: "33"});
                    ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);                 

                }

                if (_id === "33") {

                    var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: "32"});
                    ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);                 

                }
                
            });

        // End Small Color Pickers

        // End Events

        $('div#applicationUI').fadeIn();

    }

    ub.funcs.changeActiveColorSmallColorPicker = function (_layer_no, _color_code, _colorObj) {

        var $smallPickerContainer   = $('div.smallPickerContainer[data-layer-no="' + _layer_no + '"]');
        var _checkMark              = '<i class="fa fa-check" aria-hidden="true"></i>';

        $smallPickerContainer.find('span.colorItem').html('&nbsp;');
        $smallPickerContainer.find('span.colorItem').css('width','30px');
        $smallPickerContainer.find('span.colorItem').removeClass('activeColorItem');

        $smallPickerContainer.find('span.colorItem[data-color-code="' + _color_code + '"]').addClass('activeColorItem');
        $smallPickerContainer.find('span.colorItem[data-color-code="' + _color_code + '"]').css('width','40px');
        $smallPickerContainer.find('span.colorItem[data-color-code="' + _color_code + '"]').html(_checkMark);
        $smallPickerContainer.find('label').css('color', '#' + _colorObj.hex_code);

    },

    ub.data.markerBitField = {};
    ub.funcs.highlightMarker = function (code, view) {

        if (view !== ub.active_view) { return; }
   
        if (typeof ub.objects[view + '_view']['locations_' + code] !== 'undefined') {

            var s = _.find(ub.objects[view + '_view']['locations_' + code].children, {ubName: 'Marker'});
            s.alpha = 1;

            ub.data.markerBitField[code] = { value: true, code: code }
            $('body').css('cursor', 'pointer');

            if (!ub.showLocation) {

                var _obj = ub.objects[view + '_view']['locations_' + code];
                _obj.alpha = 1;
        
            }

        }
        
    }

    ub.funcs.unHighlightMarker = function (code, view) {

        if (typeof ub.objects[view + '_view']['locations_' + code] !== 'undefined') {

            ub.objects[view + '_view']['locations_' + code].children[0].alpha = 0.5;
            
            ub.data.markerBitField[code] = { value: false, code: code }

            if (!ub.funcs.isBitFieldOn()) {
                $('body').css('cursor', 'auto');
            }
            
            if (!ub.showLocation) {
            
                var _obj = ub.objects[view + '_view']['locations_' + code];
                _obj.alpha = 0;

            }

        }

    }

    ub.funcs.isBitFieldOn = function () {

        var _returnValue = false;

        _.each(ub.data.markerBitField, function (bitField) {

            if (bitField.value) {

                _returnValue = true;

            }

        });

        return _returnValue;

    }

    ub.funcs.toggleApplication = function (id, state) {

        var _settingsObj = ub.funcs.getApplicationSettings(parseInt(id));
        var _views       = _settingsObj.application.views;

        ////

        var _state = state;

        if (_state === "off") {

            $('div.toggle').data('status', "off");

            $('div.valueContainer').css('margin-left', '-100px');
            $('div.cover').fadeIn('fast');
            $('div.toggle').removeClass('defaultShadow');
            $('div.applicationType').css({ 'color': '#acacac', 'text-decoration': 'line-through', 'opacity': '0.2'});
            $('span.cog').hide();

        } else {

            $('div.toggle').data('status', "on");

            $('div.valueContainer').css('margin-left', '0px');
            $('div.cover').hide();
            $('div.toggle').addClass('defaultShadow');
            $('div.applicationType').css({ 'color': '#3d3d3d', 'text-decoration': 'initial', 'opacity': '1'});
            $('span.cog').fadeIn();

        }

        ////

        _.each (_views, function (view){

            var _view = view.perspective + '_view';
            var _obj  = ub.objects[_view]['objects_' + id];

            if (_state === "on") {

                _obj.zIndex = -30;
                ub.updateLayersOrder(ub[_view]);
                _settingsObj.status = "on";
                
            } else {

                _obj.oldZIndex = _obj.zIndex;
                _obj.zIndex = 0;
                ub.updateLayersOrder(ub[_view]);
                _settingsObj.status = "off";

            }

        });

    }

    ub.funcs.deActivateLocations = function () {

        if(ub.showLocation) {

            ub.funcs.removeLocations();
            $('.change-view[data-view="locations"]').removeClass('zoom_on');

        }

    }

    ub.funcs.deActivateZoom = function () {

        if (ub.zoom) {

            ub.zoom_off();
            $('.change-view[data-view="zoom"]').removeClass('zoom_on');

        }

    }

    ub.funcs.activateApplications = function (application_id) {

        var _id               = application_id.toString();
        var _settingsObject   = _.find(ub.current_material.settings.applications, {code: _id});

        ub.funcs.deActivateApplications();
        ub.funcs.deActivateColorPickers();
        ub.funcs.deActivatePatterns();
        ub.funcs.deActivateLocations();

        console.log('Inside Activate Application: ');
        console.log('ID: ' + _id);
        console.log('Settings Object: ');
        console.log(_settingsObject);

        var _sampleText       = _settingsObject.text;
        var _applicationType  = _settingsObject.application_type;
        var _title            = _applicationType.toTitleCase();
        var _sampleText       = _settingsObject.text;
        var _sizes            = ub.funcs.getApplicationSizes(_applicationType);
        var _fontObj          = _settingsObject.font_obj;
        var _fontName         = _fontObj.name;
        var _accentObj        = _settingsObject.accent_obj;
        var _accentName       = _accentObj.name;
        var _accentFilename   = _accentObj.thumbnail;
        var _patternName      = 'None';
        var _patternFilename  = 'none.png';
        var _colorArray       = _settingsObject.color_array;
        var _colorArrayString = '';

        _.each(_colorArray, function (_color) {

            if(typeof _color !== "undefined") {

                _colorArrayString += '<span style="color: #' + _color.hex_code + '" class="color-string">' + _color.color_code + "</span>, "; 
                
            }
            
        });

        var n                   = _colorArrayString.lastIndexOf(",");
        var _colorArrayString   = _colorArrayString.substring(0,n)

        ////

        var _htmlBuilder        = "";
        var _appActive          = 'checked';
        var _maxLength          = 12;

        if (_settingsObject.type.indexOf('number') !== -1) { _maxLength = 2; }

        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') { var _status = _settingsObject.status; } 

        _htmlBuilder        =  '<div id="applicationUI" data-application-id="' + _id + '">';
        _htmlBuilder        +=      '<div class="header">';
        _htmlBuilder        +=      '<div class="toggle" data-status="' + _status + '"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>';
        _htmlBuilder        +=      '<div class="applicationType">' + _title.replace('Number', '# ') + '</div><span class="cog"><i class="fa fa-cog" aria-hidden="true"></i></span></div>';
        _htmlBuilder        +=      '<div class="body">';
        _htmlBuilder        +=          '<div class="cover"></div>';
        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<label class="applicationLabels font_name">' + "Sample Text: " + '</label>';                       
        _htmlBuilder        +=              '<input type="text" name="sampleText" class="sampleText" value="' + _sampleText + '" maxlength="' + _maxLength + '">';                       
        _htmlBuilder        +=          '</div>';        
        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<label class="applicationLabels font_name">Font</label>';
        _htmlBuilder        +=              '<span class="fontLeft" data-direction="previous"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';                       
        _htmlBuilder        +=              '<span class="font_name" style="font-size: 1.2em; font-family: ' + _fontName + ';">' + _fontName + '</span>';                       
        _htmlBuilder        +=              '<span class="fontRight" data-direction="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
        _htmlBuilder        +=          '</div>';
        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<label class="applicationLabels font_size">Size</label>'; 

        _.each(_sizes.sizes, function (size) {

            var _additionalClass = '';

            if (size.size === _settingsObject.font_size) {

                _additionalClass = 'active';

            }

            _htmlBuilder    +=              '<span class="applicationLabels font_size ' + _additionalClass + '" style="font-size: 1.2em;" data-size="' + size.size + '">' + size.size + '"'  + '</span>';

        });                    

        _htmlBuilder        +=          '</div>';
        _htmlBuilder        +=          '<div class="clearfix"></div>';
        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<div class="column1">'
        _htmlBuilder        +=                 '<div class="sub1">';
        _htmlBuilder        +=                    '<br />';        
        _htmlBuilder        +=                    '<span class="accentThumb"><img src="/images/sidebar/' + _accentFilename + '"/></span><br />';                                                             
        _htmlBuilder        +=                    '<span class="accent">' + _accentName + '</span>';
        _htmlBuilder        +=                 '</div>';
        _htmlBuilder        +=                 '<div class="colorContainer"><br />';

        _.each(_settingsObject.accent_obj.layers, function (layer) {

            var _hexCode = layer.default_color;
            var _color   = ub.funcs.getColorObjByHexCode(_hexCode);

            if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') { return; }

            if (typeof _color !== 'undefined') {

                _htmlBuilder += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_no, layer.name, layer.default_color);

            }
            else {

                util.error('Hex Code: ' + _hexCode + ' not found!');

            }

        });

        _htmlBuilder        +=                  '</div>';
        _htmlBuilder        +=              '</div>';
        _htmlBuilder        +=          '</div>';
        _htmlBuilder        +=      '</div>';
        _htmlBuilder        += "</div>";

        $('.modifier_main_container').append(_htmlBuilder);

        //// Events  

            $("div.toggleOption").on("click", function () {

                var _currentStatus = $('div.toggle').data('status');
                var s;
                if(_currentStatus === "on") {
                    s = 'off';
                }
                else {
                    s = 'on';
                }

                ub.funcs.toggleApplication(_id,s);    

                if(_id === "9") { ub.funcs.toggleApplication('10', s); }
                if(_id === "10") { ub.funcs.toggleApplication('9', s); }

                if(_id === "32") { ub.funcs.toggleApplication('33', s); }
                if(_id === "33") { ub.funcs.toggleApplication('32', s); }

            });

            ub.funcs.toggleApplication(_id, _status);

            if(_id === "9") { ub.funcs.toggleApplication('10', _status); }
            if(_id === "10") { ub.funcs.toggleApplication('9', _status); }

            if(_id === "32") { ub.funcs.toggleApplication('33', _status); }
            if(_id === "33") { ub.funcs.toggleApplication('32', _status); }

            // Font Left and Right

                $('span.fontLeft, span.fontRight').on('click', function (e) {

                    var _direction  = $(this).data('direction');
                    var _newFont    =  ub.funcs.getFontObj(_direction, _settingsObject.font_obj);

                    if (typeof _newFont !== 'undefined'){

                        ub.funcs.changeFontFromPopup(_newFont.id, _settingsObject);
                        ub.funcs.activateApplications(_settingsObject.code)

                    }

                    if (_settingsObject.type === "front_number" || _settingsObject.type === "back_number") {

                        _.each (ub.current_material.settings.applications, function (_application) {

                            if (_application.type !== _settingsObject.application_type && _application.type !== "logo" && _application.type !== "mascot") {

                                if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                                    ub.funcs.changeFontFromPopup(_newFont.id, _application);

                                }

                            }
                            
                        });

                    }

                    if (_settingsObject.code === "32") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                        ub.funcs.changeFontFromPopup(_newFont.id, _matchingSettingsObject);

                    }

                    if (_settingsObject.code === "33") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                        ub.funcs.changeFontFromPopup(_newFont.id, _matchingSettingsObject);

                    }

                    if (_settingsObject.code === "9") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                        ub.funcs.changeFontFromPopup(_newFont.id, _matchingSettingsObject);

                    }

                    if (_settingsObject.code === "10") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                        ub.funcs.changeFontFromPopup(_newFont.id, _matchingSettingsObject);

                    }
                    
                });


            // End Font Left and Right 

            // Small Color Pickers 

                $('span.colorItem').on('click', function () {

                    var _layer_no   = $(this).data('layer-no');
                    var _color_code = $(this).data('color-code');
                    var _layer_name = $(this).data('layer-name');
                    var _colorObj = ub.funcs.getColorByColorCode(_color_code);
                    var _layer = _.find(_settingsObject.accent_obj.layers, {name: _layer_name});
                    
                    _layer.default_color = _colorObj.hex_code;
                    _settingsObject.color_array[_layer_no - 1] = _colorObj;
    
                    ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);
                    ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

                    if (_settingsObject.code === "32") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                        var _layer = _.find(_matchingSettingsObject.accent_obj.layers, {name: _layer_name});
                    
                        _layer.default_color = _colorObj.hex_code;
                        _matchingSettingsObject.color_array[_layer_no - 1] = _colorObj;
    
                        ub.funcs.changeFontFromPopup(_matchingSettingsObject.font_obj.id, _matchingSettingsObject);

                    }

                    if (_settingsObject.code === "33") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                        var _layer = _.find(_matchingSettingsObject.accent_obj.layers, {name: _layer_name});
                    
                        _layer.default_color = _colorObj.hex_code;
                        _matchingSettingsObject.color_array[_layer_no - 1] = _colorObj;
    
                        ub.funcs.changeFontFromPopup(_matchingSettingsObject.font_obj.id, _matchingSettingsObject);

                    }

                    if (_settingsObject.code === "9") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                        var _layer = _.find(_matchingSettingsObject.accent_obj.layers, {name: _layer_name});
                    
                        _layer.default_color = _colorObj.hex_code;
                        _matchingSettingsObject.color_array[_layer_no - 1] = _colorObj;
    
                        ub.funcs.changeFontFromPopup(_matchingSettingsObject.font_obj.id, _matchingSettingsObject);

                    }

                    if (_settingsObject.code === "10") {

                        var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                        var _layer = _.find(_matchingSettingsObject.accent_obj.layers, {name: _layer_name});
                    
                        _layer.default_color = _colorObj.hex_code;
                        _matchingSettingsObject.color_array[_layer_no - 1] = _colorObj;
    
                        ub.funcs.changeFontFromPopup(_matchingSettingsObject.font_obj.id, _matchingSettingsObject);

                    }
                    
                });

            // End Small Color Pickers

            $('span.font_size').on('click', function () {

                var _selectedSize = $(this).data('size');
                $('.font_size').removeClass('active');
                $(this).addClass('active');
                ub.funcs.changeSize(_selectedSize, _settingsObject);

                if (_settingsObject.code === "32") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "33"});
                    ub.funcs.changeSize(_selectedSize, _matchingSettingsObject);                    

                }

                if (_settingsObject.code === "33") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "32"});
                    ub.funcs.changeSize(_selectedSize, _matchingSettingsObject);                    

                }

                if (_settingsObject.code === "9") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "10"});
                    ub.funcs.changeSize(_selectedSize, _matchingSettingsObject);                    

                }

                if (_settingsObject.code === "10") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: "9"});
                    ub.funcs.changeSize(_selectedSize, _matchingSettingsObject);                    

                }
                
            });

            $('span.font_name').on('click', function () {

                ub.funcs.createFontPopup(_title, _sampleText, _settingsObject);

            });

            $('span.accentThumb, span.accent').on('click', function () {

                ub.funcs.createAccentPopup(_settingsObject);

            });

            $('input.sampleText').on('blur', function () {

                var _val = $(this).val();

                _settingsObject.text = _val;
                ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

            });

            $('input.sampleText').on('keypress', function (e) {

                var _val = $(this).val();

                if (e.keyCode === 13){

                    _settingsObject.text = _val;
                    
                    _.each (ub.current_material.settings.applications, function (_application) {

                        if (_application.type !== "logo" && _application.type !== "mascot") {

                            if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                                _application.text = _val;
                                ub.funcs.changeFontFromPopup(_application.font_obj.id, _application);

                            }

                        }
                        
                    });

                }

            });

            $('span.cog').on('click', function () {

                console.log('GA Font Tool:');
                console.log(_settingsObject);

                var _size           = _settingsObject.font_size;
                var _fontSizeData   = ub.data.getPixelFontSize(_settingsObject.font_obj.id, _size);
                var _pixelFontSize  = _fontSizeData.pixelFontSize;

                var _origSizes       = {

                    pixelFontSize: _pixelFontSize,
                    offSetX: _fontSizeData.xOffset,
                    offSetY: _fontSizeData.yOffset,
                    scaleX: _fontSizeData.xScale,
                    scaleY: _fontSizeData.yScale,

                }

                var _cogBuilder = '';

                $('#cogPopupContainer').remove();

                _cogBuilder += '<div id="cogPopupContainer">';
                _cogBuilder +=       '<div id="cogPopup">';

                _cogBuilder +=           '<div class="popupHeader">GA Font Tool</div>';
                
                _cogBuilder +=           '<div class="popup-row-top">';
                _cogBuilder +=               '<label>Inch: </label>';
                _cogBuilder +=               '<span class="popupValue"> ' + _size + '</span>' + '"';
                _cogBuilder +=           '</div>';

                _cogBuilder +=           '<div class="popup-row">';
                _cogBuilder +=               '<div class="inputContainer">'
                _cogBuilder +=                   '<div class="inputX">';
                _cogBuilder +=                       '<span class="inputLabel">Font Size: </span><input class="pixelFontSize gaFontInput" name="font-size" value="' +  _pixelFontSize + '" /> px';
                _cogBuilder +=                   '</div>';
                _cogBuilder +=                   '<div class="inputY">';
                _cogBuilder +=                      '<div class="notes" style="margin-left: 140px;">Keyboard Shortcuts:<br /><br />Increase Value: <strong>ctrl + > </strong><br />Decrease Value: <strong>ctrl + < </strong><br /><br /></div>';
                _cogBuilder +=                   '</div>';                
                _cogBuilder +=               '</div>';
                _cogBuilder +=           '</div>';

                _cogBuilder +=           '<div class="popup-row">';
                _cogBuilder +=               '<div class="inputContainer">'
                _cogBuilder +=                   '<div class="inputX">';
                _cogBuilder +=                       '<span class="inputLabel">Offset X: </span><input class="offsetX gaFontInput" name="offsetX" value="' + _fontSizeData.xOffset + '" />';
                _cogBuilder +=                   '</div>';
                _cogBuilder +=                   '<div class="inputY">';
                _cogBuilder +=                       '<span class="inputLabel">Offset Y: </span><input class="offsetY gaFontInput" name="offsetY" value="' + _fontSizeData.yOffset + '" />';
                _cogBuilder +=                   '</div>';
                _cogBuilder +=               '</div>';
                _cogBuilder +=           '</div>';

                _cogBuilder +=           '<div class="popup-row">';
                _cogBuilder +=               '<div class="inputContainer">'
                _cogBuilder +=                   '<div class="inputX">';
                _cogBuilder +=                       '<span class="inputLabel">Scale X: </span><input class="scaleX gaFontInput" name="scaleX" value="' + _fontSizeData.xScale + '" />';
                _cogBuilder +=                   '</div>';
                _cogBuilder +=                   '<div class="inputY">';
                _cogBuilder +=                       '<span class="inputLabel">Scale Y: </span><input class="scaleY gaFontInput" name="scaleY" value="' + _fontSizeData.yScale + '" />';
                _cogBuilder +=                   '</div>';
                _cogBuilder +=               '</div>';
                _cogBuilder +=           '</div>';
                _cogBuilder +=           '<div class="notes">* It is important to start with the font size closest to the size you will end up using. Starting with a small font and scaling it too far will affect the quality of the font. (e.g. jagged / pixelated edges)</div>';

                _cogBuilder +=           '<div class="button-row">';
                _cogBuilder +=              '<span class="resetButton">';
                _cogBuilder +=                  'Reset';
                _cogBuilder +=              '</span>';
                _cogBuilder +=              '<span class="cancelButton">';
                _cogBuilder +=                  'Close';
                _cogBuilder +=              '</span>';
                _cogBuilder +=              '<span class="applyButton">';
                _cogBuilder +=                  'Apply';
                _cogBuilder +=              '</span>';
                _cogBuilder +=           '</div>';

                _cogBuilder +=       '</div>';
                _cogBuilder += '</div">';

                $('body').append(_cogBuilder);

                /// Events

                    $('span.cancelButton').on('click', function () {

                        $('#cogPopupContainer').remove();

                    });

                    $('span.resetButton').on('click', function () {

                        $('input.pixelFontSize').val(_origSizes.pixelFontSize);
                        $('input.offsetX').val(_origSizes.offsetX);
                        $('input.offsetY').val(_origSizes.offsetY)
                        $('input.scaleX').val(_origSizes.scaleX);
                        $('input.scaleY').val(_origSizes.scaleY);;

                    });

                    $('span.applyButton').on('click', function () {

                        var _pixelFontSizeApply = $('input.pixelFontSize').val();
                        var _offsetX = $('input.offsetX').val();
                        var _offsetY = $('input.offsetY').val();
                        var _scaleX = $('input.scaleX').val();
                        var _scaleY = $('input.scaleY').val();

                        ub.create_application(_settingsObject, _pixelFontSizeApply, _offsetX, _offsetY, _scaleX, _scaleY);


                    });

                    $('input.gaFontInput').on('keypress', function (e) {

                        if (e.ctrlKey && (e.which === 46 || e.which === 44)) {

                            var $textBox = $(this);
                            var _name = $textBox.attr('name');
                            var _currentVal = $textBox.val();

                            if (_name === 'font-size' || _name === 'offsetX' || _name === 'offsetY') {

                                var _value = parseInt(_currentVal);

                                if(e.which === 44) {
                                    _value -= 5;    
                                }

                                if(e.which === 46) {
                                    _value += 5;    
                                }

                                $textBox.val(_value);

                                $('span.applyButton').trigger('click');
                                $(this).focus();

                            }

                            if (_name === 'scaleX' || _name === 'scaleY') {

                                var _value = parseFloat(_currentVal);

                                if(e.keyCode === 44) {
                                    _value -= 0.05;    
                                }

                                if(e.keyCode === 46) {
                                    _value += 0.05;    
                                }

                                $textBox.val(parseFloat(_value).toFixed(2));

                                $('span.applyButton').trigger('click');
                                $(this).focus();

                            }
                            
                        }

                        if (e.keyCode === 13) {

                            $('span.applyButton').trigger('click');
                            $(this).focus();

                        }

                    });

                /// End Events 

                $('#cogPopupContainer').fadeIn();

                ub.funcs.positionGaFontTool();
                $('input.pixelFontSize').focus();

                $('input.gaFontInput').focus(function (){

                    var _modifier = $(this).attr('name');
                    ub.funcs.createAssistants(_settingsObject, _modifier);

                });

            });

        //// End Events 

        $('div#applicationUI').fadeIn();

    }

    ub.funcs.positionGaFontTool = function () {

        var _windowWidth = window.innerWidth;
        var _popupContainer = $('#cogPopupContainer').width();
        var _left = _windowWidth - ( _popupContainer + 110 );

        $('#cogPopupContainer').css('left',_left + 'px');

    };

    ub.funcs.getApplicationSizes = function (applicationType, gender) {

        var _factory = ub.current_material.material.factory_code;
        var _sizes;
        var _gender;

        if (typeof gender === 'undefined') {
            _gender = 'adult';
        }

        if (applicationType === 'team_name') {
            _sizes = _.find(ub.data.applicationSizes.items, {factory: _factory, name: 'team_name'});
        } else {
            _sizes = _.find(ub.data.applicationSizes.items, {name: applicationType});            
        }

        if (typeof _sizes === 'undefined') {
            util.error('Application Sizes for ' + applicationType + ' is not found!');
        }
        
        return _sizes;

    }

    /// End Interactive Applications

    /// Locations and Free Application Types


    ub.data.locationSprites = []; 

    ub.funcs.createClickableMarkers = function (sprite, view, locationCode, viewPerspective) {

        if(!ub.config.isFeatureOn('ui','hotspots')) { return; }

        var basesprite;
        baseSprite = _.first(sprite.children);
        baseSprite.oldTint = baseSprite.tint;

        sprite.spriteType = 'Marker';
        sprite.draggable({ manager: ub.dragAndDropManager });
        sprite.mouseup = sprite.touchend = function(data) { };

        $('body').mouseup(function() {

            if (viewPerspective !== ub.active_view) { return; }

            if (sprite.ubHover) {

                console.log('');

                console.log('Hover Detected on: ' + locationCode);
                console.log('Show Location:  ' + ub.showLocation);
                
                console.log('');

              // - if (!ub.showLocation) {
    
               // -     return;
        
               // - } else {

                    var _id               = locationCode;
                    var _settingsObject   = _.find(ub.current_material.settings.applications, {code: _id});

                    ub.funcs.deActivateLocations();
                    ub.showLocation = false;
                    
                    if (_settingsObject.application_type === "free") {

                        console.log('Activating Free Application: ');

                        ub.funcs.activateFreeApplication(locationCode);

                    }
                    else if (_settingsObject.application_type === "mascot") {

                        ub.funcs.activateMascots(locationCode);

                    } else {

                        ub.funcs.activateApplications(locationCode);

                    }

                    sprite.ubHover = false;

               // -  }

            } 

        });

        sprite.mousedown = sprite.touchstart = function(data) {

            if (viewPerspective !== ub.active_view) { return; }
            if (typeof this.interactionData === 'undefined') { return; }

            var this_data = this.interactionData.data;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

        };

        sprite.mousemove = sprite.mousemove = function(interactionData) {

            if (viewPerspective !== ub.active_view) { return; }

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

                sprite_obj = _.first(sprite.children);

            }

            if (typeof sprite_obj.containsPoint === "function") {

                var _sizeOfApplications = _.size(ub.current_material.settings.applications);

                if (sprite_obj.containsPoint(point)) {

                    if(ub.zoom) { return; }

                    // start

                    sprite.ubHover      = true;
                    ub.funcs.highlightMarker(locationCode, viewPerspective);
                    ub.data.applicationAccumulator = _sizeOfApplications;
                   
                } else {

                    // restore
                    
                    ub.funcs.unHighlightMarker(locationCode, viewPerspective);    
                    sprite.ubHover  = false;
                    ub.data.applicationAccumulator -= 1;

                }
                
            }

            /// End Hot Spot
            
        };

    }

    /// End Create Clickable Application

    ub.funcs.removeLocations = function () {

        var _locations = ub.current_material.settings.applications;  

        _.each (_locations, function (location) {

            _.each(location.application.views, function (view, index){

                var _perspective = view.perspective + '_view';

                var locationObject = ub.objects[_perspective]['locations_' + location.code];

                //locationObject.zIndex = 1;
                locationObject.alpha = 0;

                //ub.updateLayersOrder(ub[_perspective]);

            })

        });

        ub.showLocation = false;

    }

    ub.funcs.showLocations = function (alphaOff) {

        var _locations = ub.current_material.settings.applications;  

        ub.showLocation = true;

        if (typeof ub.objects['front_view']['locations_' + _locations[1].code] === "object") {

            _.each (_locations, function (location) {

                _.each(location.application.views, function (view, index){

                    var _perspective = view.perspective + '_view';
                    var _locationObj = ub.objects[_perspective]['locations_' + location.code];

                   // _locationObj.zIndex =  -200 + (index * -1);
                   if (typeof alphaOff !== 'undefined') {

                       _locationObj.alpha = 0;

                   } else {

                        _locationObj.alpha = 1;

                   }


                  //  ub.updateLayersOrder(ub[_perspective]);

                })

            });

            return;

        }

        _.each (_locations, function (location) {

            if (location.type === "free") { 

                /// Todo: Handle Here ....

            }

            _.each(location.application.views, function (view, index) {

                var _perspective    = view.perspective + '_view';
                var _viewObject     = ub.objects[_perspective];
                var _x              = view.application.pivot.x;
                var _y              = view.application.pivot.y;
                var _sprite         = ub.funcs.createLocationSprite(location.code);

                _viewObject['locations_' + location.code] = _sprite;

                _sprite.position.x  = _x;
                _sprite.position.y  = _y;

                _sprite.zIndex = -200 + (index * -1);

                ub[_perspective].addChild(_sprite);
                ub.updateLayersOrder(ub[_perspective]);

                ub.funcs.createClickableMarkers(_sprite, _viewObject, location.code, view.perspective);

            });

        });

    }

    ub.funcs.activateFreeApplication = function (application_id) {

        var _id               = application_id.toString();
        var _settingsObject   = _.find(ub.current_material.settings.applications, {code: _id});

        ub.funcs.deActivateApplications();
        ub.funcs.deActivateColorPickers();
        ub.funcs.deActivatePatterns();
        ub.funcs.deActivateLocations();

        _htmlBuilder        =  '<div id="applicationUI" data-application-id="' + _id + '">';
        _htmlBuilder        +=      '<div class="header">';
        _htmlBuilder        +=      '<div class="applicationType">Select Application Type for Location (# ' + _id + ')</div>';
        _htmlBuilder        +=      '<div class="body">';

        _htmlBuilder        +=           '<div class="optionButton">';
        _htmlBuilder        +=                 '<div class="icon">' + "#" + '</div>';
        _htmlBuilder        +=                 '<div class="caption">Player Number</div>';
        _htmlBuilder        +=           '</div>';

        _htmlBuilder        +=           '<div class="optionButton">';
        _htmlBuilder        +=                 '<div class="icon">' + "T" + '</div>';
        _htmlBuilder        +=                 '<div class="caption">Team Name</div>';
        _htmlBuilder        +=           '</div>';

        _htmlBuilder        +=           '<br />';

        _htmlBuilder        +=           '<div class="optionButton">';
        _htmlBuilder        +=                 '<div class="icon">' + "P" + '</div>';
        _htmlBuilder        +=                 '<div class="caption">Player Name</div>';
        _htmlBuilder        +=           '</div>';

        _htmlBuilder        +=           '<div class="optionButton">';
        _htmlBuilder        +=                 '<div class="icon">' + "M" + '</div>';
        _htmlBuilder        +=                 '<div class="caption">Mascot</div>';
        _htmlBuilder        +=           '</div>';

        _htmlBuilder        +=      '</div>';
        _htmlBuilder        += "</div>";

        $('.modifier_main_container').append(_htmlBuilder);
        $('div#applicationUI').fadeIn();

    };

    ub.funcs.gotoFirstMaterialOption = function () {

        $('div.pd-dropdown-links[data-fullname="body"]').trigger('click');

    }

    /// End Locations and Free Application Types

});