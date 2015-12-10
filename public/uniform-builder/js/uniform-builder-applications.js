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

            /// Handler for clicking a mascot on the list of uploaded mascots
            $('a.mascot_picker').on('click', function (e) {

                $link = $(e.target);

                var application_id = $link.data('application-id');
                var mascot_id = $link.data('id');

                ub.ui.drops[application_id].close();

                var mascot = _.find(mascots, {
                    id: mascot_id
                });

                var application = _.find(ub.data.applications.items, {
                    id: application_id
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

        var application = _.find(ub.data.applications.items, {
            id: application_id
        });

        var view_str = application.perspective + '_view';
        $('a#view_' + application.perspective).click();

        $('input#flip_mascot_' + application_id).click( function () {

            var obj = ub.objects[view_str]['objects_' + application_id];

            var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
            var value = parseInt($rotation_slider.find('span.edit').html());
            var rotation = ( value / 620 ) * 360;

            if( $(this).is(':checked') ) {

                obj.flipped = true;
                obj.scale.x = Math.abs(obj.scale.x) * -1;

                $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');
                $angle_slider_mascot.find('div.rs-bg-color').css({
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

                $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');
                $angle_slider_mascot.find('div.rs-bg-color').css({
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
                var object = ub.objects.front_view['objects_' + application_id];
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
                var flipped = $('input#flip_mascot_' + application_id).is(':checked');
                var scale = new PIXI.Point(value / 100, value / 100);
                
                if (flipped) {
                    scale.x = scale.x * -1;
                }
                else {
                    scale.x = scale.x * 1;   
                }

                object.scale = scale;

                $('span[data-target="mascot"][data-label="scale"][data-id="' + application_id + '"]').text(value);

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

                $('span[data-target="mascot"][data-label="opacity"][data-id="' + application_id + '"]').text(value);

                $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');

                var opacity =  value / max_opacity;
                $angle_slider_mascot.find('div.rs-bg-color').css({
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

                $angle_slider_mascot = $('div.rotation_slider[data-id="' + application_id + '"]');

                var flipped = $('input#flip_mascot_' + application_id).is(':checked');

                if (flipped) {

                    $angle_slider_mascot.find('div.rs-bg-color').css({
                        '-moz-transform': 'scaleX(-1)',
                        '-o-transform': 'scaleX(-1)', 
                        'transform': 'scaleX(-1)',
                        'filter': 'FlipH',
                        '-ms-filter': "FlipH",
                        '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
                    });

                } else {

                    $angle_slider_mascot.find('div.rs-bg-color').css({
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
            'background-image': 'url(' + mascot.dataUrl + ')',
            'background-size': '80%',
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
        });

    };

    /// End Mascot Utilities

    ub.funcs.update_logo_list = function() {

        var $logo_container = $('div.logo-container');
        var logos = ub.current_material.settings.files.logos;

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
                    id: logo_id
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
                var object = ub.objects.front_view['objects_' + application_id];
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

        var x = ub.dimensions.width * application.position.x;
        var y = ub.dimensions.height * application.position.y;
        var settings = ub.current_material.settings;
        var application_mascot_code = application.code + '_' + mascot.id;

        settings.applications[application.code] = {
            application: application,
            mascot: mascot,
            type: 'mascot',
            color_array: {},
        };

        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var container = new PIXI.Container();

        var elements = "";

        _.each(mascot.layers, function(layer, index){

            var mascot_layer = PIXI.Sprite.fromImage(layer.filename);
            mascot_layer.tint = parseInt(layer.default_color,16);
            mascot_layer.anchor.set(0.5, 0.5);
            container.addChild(mascot_layer);

            var val = layer.default_color;
            var col = layer.default_color;
            var filename = layer.filename;
            
            elements += ub.create_mascot_color_picker(index, val, col, application.id, mascot.code); 

        });

        $('div.mascot_color_picker_container[data-id="' + application.code + '"]').html(elements);

        $('input.mascot_' + application.code).ubColorPicker({
                target: String(application.code),
                type: 'mascot',
                application: application,
                target_name: application.layer,
        });
        
        container.scale = new PIXI.Point(0.5, 0.5);
        var sprite = container;

        settings.applications[application.code].mascot = sprite;

        var mask = _.find(ub.current_material.material.options, {
            
            perspective: application.perspective,
            name: application.layer

        });

        var mask = ub.pixi.new_sprite(mask.material_option_path);
        var temp = {}

        sprite.mask = mask;

        var s = view_objects['objects_' + application.code];

        var position = '';
        var scale = '';
        var rotation = '';
        var alpha = '';
        
        if (typeof(s) === 'object') {

            var obj = view_objects['objects_' + application.code];

            position = obj.position;
            scale = obj.scale;
            rotation = obj.rotation;
            alpha = obj.alpha;
            tint = obj.tint;
            var color_array = settings.applications[application.code].color_array;

            view.removeChild(view_objects['objects_' + application.code]);
            delete view_objects['objects_' + application.code];

        }

        view_objects['objects_' + application.code] = sprite;
        view.addChild(sprite);

        sprite.position = new PIXI.Point(x,y);
        sprite.rotation = application.rotation;

        if(sprite.width === 1) {
        
            sprite.position.x -= (sprite.width / 2);
            sprite.position.y -= (sprite.height / 2);

        }
  
        sprite.originalZIndex = -10;
        sprite.zIndex = -10;
        ub.updateLayersOrder(view);

        if(position !== ''){

            sprite.position = position;
            sprite.scale = scale;
            sprite.rotation = rotation;
            sprite.alpha = alpha;

        }

        window.sprite = sprite;

        $('div.x_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.x]);
        $('div.y_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.y]);

        // ub.funcs.createDraggable(sprite, application, view);
        ub.funcs.createClickable(sprite, application, view, 'application');

    };

    ub.funcs.update_application = function(application, logo) {

        var x = ub.dimensions.width * application.position.x;
        var y = ub.dimensions.height * application.position.y;
        var settings = ub.current_material.settings;
        var application_logo_code = application.code + '_' + logo.id;

        settings.applications[application.code] = {
            application: application,
            logo: logo,
            type: 'logo',
            color_array: {},
        };

        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        
        var sprite = PIXI.Sprite.fromImage(logo.dataUrl);
        
        var mask = _.find(ub.current_material.material.options, {
            perspective: application.perspective,
            name: application.layer

        });

        var mask = ub.pixi.new_sprite(mask.material_option_path);

        sprite.mask = mask;

        var s = view_objects['objects_' + application.code];

        var position = '';
        var scale = '';
        var rotation = '';
        var alpha = '';
        
        if (typeof(s) === 'object') {

            var obj = view_objects['objects_' + application.code];

            position = obj.position;
            scale = obj.scale;
            rotation = obj.rotation;
            alpha = obj.alpha;
            tint = obj.tint;
            var color_array = settings.applications[application.code].color_array;

            view.removeChild(view_objects['objects_' + application.code]);
            delete view_objects['objects_' + application.code];

        }

        view_objects['objects_' + application.code] = sprite;
        view.addChild(sprite);

        sprite.position = new PIXI.Point(x,y);
        sprite.rotation = application.rotation;

        if(sprite.width === 1) {
        
            sprite.position.x -= (sprite.width / 2);
            sprite.position.y -= (sprite.height / 2);

        }
  
        sprite.anchor.set(0.5, 0.5);

        var zIndex = -10 + -(parseInt(application.code));

        sprite.originalZIndex = zIndex;
        sprite.zIndex = zIndex;
        ub.updateLayersOrder(view);

        if(position !== ''){

            sprite.position = position;
            sprite.scale = scale;
            sprite.rotation = rotation;
            sprite.alpha = alpha;

        }

        $('div.x_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.x]);
        $('div.y_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.y]);

        ub.funcs.createDraggable(sprite, application, view);

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

                var application_obj = ub.objects[application.perspective + '_view']['objects_' + application.code];

                if(typeof application_obj === 'undefined') {
                    return;
                }

                if (type === 'move') {

                    original_x = ub.dimensions.width * application.position.x;
                    original_y = ub.dimensions.height * application.position.y;

                    var original_location = new PIXI.Point(original_x, original_y);

                    var dist = Math.abs( ub.funcs.lineDistance(original_location, sprite.position) );
                    
                    if (dist >= 30) {
                        move_point.position = sprite.position;
                        return;
                    }

                    application_obj.position = new PIXI.Point(sprite.x, sprite.y);

                    var r_x = rotation_point.x + (sprite.x - sprite.oldX);
                    var r_y = rotation_point.y + (sprite.y - sprite.oldY);
                    rotation_point.position = new PIXI.Point(r_x, r_y);

                    sprite.oldX = sprite.x;
                    sprite.oldY = sprite.y;
           
                }

                if (type === 'rotate') {

                    //var angleRadians = Math.atan2(rotation_point.y - move_point.y, rotation_point.x - move_point.x);

                    var angleRadians = ub.funcs.angleRadians(move_point.position, rotation_point.position);
                    application_obj.rotation = angleRadians;

                    var distance = ub.funcs.lineDistance(move_point.position, rotation_point.position);
                    percentage = distance / 100;

                    if (typeof ub.current_material.settings.applications[application.code].text === 'undefined') {

                        application_obj.scale.set(percentage, percentage);

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

            var btn = $('button[data-action="identify"][data-id=' + application.code + ']');
            
            if (sprite.ubHover) {

                btn.click();

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

});