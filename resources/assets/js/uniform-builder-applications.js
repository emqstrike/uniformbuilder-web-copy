$(document).ready(function () {

    ub.funcs.isSocks = function () {

        if (typeof ub.current_material.material === "undefined") {
            return false;
        }

        return ub.funcs.isCurrentSport("Crew Socks (Apparel)") || ub.funcs.isCurrentSport("Socks (Apparel)");
    }

    ub.funcs.isCurrentOption = function (option) {

        return ub.current_material.material.neck_option === option;

    };

    ub.funcs.isCurrentSport = function (sport) {

        return ub.current_material.material.uniform_category === sport;

    };

    // Check if current uniform is upper or lower
    ub.funcs.isCurrentType = function (type) {

        return ub.current_material.material.type === type;

    };

    // Only Sublimated or Knitted styles uses custom scale
    ub.funcs.usesCustomScaleValid = function () {

        return ub.config.uniform_application_type === "sublimated" || ub.config.uniform_application_type === "knitted";

    }

    ub.funcs.setupHiddenBody = function (obj) {

        return ub.config.hiddenBody = obj;

    }

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

        var _filename = '/images/main-ui/outer-circle.png';
        var _sprite = ub.pixi.new_sprite(_filename);

        var _filenameCircleSprite = '/images/main-ui/inner-circle.png';
        var _circleSprite = ub.pixi.new_sprite(_filenameCircleSprite);

        var _container = new PIXI.Container();
        var _teamColorOne = ub.current_material.settings.team_colors[0];
        var _codeSprite;

        _sprite.anchor.set(0.5, 0.5);
        _sprite.ubName = 'Marker';
        _sprite.alpha = 0.5;
        _container.addChild(_sprite);

        _circleSprite.anchor.set(0.5, 0.5);
        _circleSprite.ubName = 'Circle';
        _container.addChild(_circleSprite);

        //_circleSprite.tint = parseInt(_teamColorOne.hex_code, 16);

        _codeSprite = new PIXI.Text(code.toString(), {
            font: 'bold 30px Arial',
            fill: parseInt('ffffff', 16),
            align: 'center'
        });
        _codeSprite.ubName = 'Code Sprite';
        _codeSprite.anchor.set(0.5, 0.5);
        _container.addChild(_codeSprite);

        return _container;

    };

    ub.funcs.update_mascots_picker = function (application_id, mascot) {

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

        $('input[type=radio][name=mascot_sizes][data-id="' + application_id + '"]').change(function () {

            // Todo: Scale Mascot based on value of this.value

            var scale_obj = _.find(ub.data.mascotSizes.items, {size: this.value});

            _.each(application.views, function (view) {

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

    // ub.funcs.update_logo_list = function () {

    //     var $logo_container = $('div.logo-container');
    //     var logos = ub.current_material.containers.files.logos;

    //     _.each($logo_container, function (el) {

    //         var $element = $(el);
    //         var logo_list = "";
    //         var template = $('#logo-list').html();

    //         var data = {
    //             element_id: $element.data('id'),
    //             logo_set: logos,
    //         }

    //         var markup = Mustache.render(template, data);
    //         $element.html(markup);

    //         /// Handler for clicking a logo on the list of uploaded logos
    //         $('a.logo_picker').on('click', function (e) {

    //             ub.funcs.removeUIHandles();

    //             $link = $(e.target);

    //             var application_id = $link.data('application-id');
    //             var logo_id = $link.data('id');

    //             ub.ui.drops[application_id].close();

    //             var logo = _.find(logos, {
    //                 id: logo_id,
    //             });

    //             var application = _.find(ub.data.applications.items, {
    //                 id: application_id
    //             });

    //             ub.funcs.update_application(application, logo);
    //             ub.funcs.update_logos_picker(application.id, logo);

    //         }); /// End $('a.logo_picker').on('click'...


    //     });

    // }

    // ub.funcs.update_logos_picker = function(application_id, logo) {

    //     var $container = $('div.logo-controls[data-id="' + application_id + '"]');
    //     var template = $('#logo-controls').html();
    //     var data = {
    //         application_id: application_id,
    //     }

    //     var markup = Mustache.render(template, data);

    //     $container.html(markup);

    //     var application = _.find(ub.data.applications.items, {
    //         id: application_id
    //     });

    //     var view_str = application.perspective + '_view';
    //     $('a#view_' + application.perspective).click();

    //     $('input#flip_logo_' + application_id).click( function () {

    //         var obj = ub.objects[view_str]['objects_' + application_id];
    //         var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
    //         var value = parseInt($rotation_slider.find('span.edit').html());
    //         var rotation = ( value / 620 ) * 360;

    //         if( $(this).is(':checked') ) {

    //             obj.flipped = true;
    //             obj.scale.x = Math.abs(obj.scale.x) * -1;

    //             $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');
    //             $angle_slider_logo.find('div.rs-bg-color').css({
    //                 '-moz-transform': 'scaleX(-1)',
    //                 '-o-transform': 'scaleX(-1)',
    //                 'transform': 'scaleX(-1)',
    //                 'filter': 'FlipH',
    //                 '-ms-filter': "FlipH",
    //                 '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
    //             });

    //         }
    //         else {

    //             obj.flipped = false;
    //             obj.scale.x = Math.abs(obj.scale.x);

    //             $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');
    //             $angle_slider_logo.find('div.rs-bg-color').css({
    //                 '-moz-transform': 'scaleX(1)',
    //                 '-o-transform': 'scaleX(1)',
    //                 'transform': 'scaleX(1)',
    //                 'filter': 'none',
    //                 '-ms-filter': "none",
    //                 '-webkit-transform': 'scaleX(1) ' + ' rotate(' + rotation + 'deg)',
    //             });

    //         }

    //     });

    //     $('div.y_slider[data-id="' + application_id + '"]').limitslider({

    //         values: [application.position.y  * ub.dimensions.height],
    //         min: 0,
    //         max: ub.dimensions.height,
    //         gap: 0,

    //         change: function(event, ui) {

    //             var application = _.find(ub.data.applications.items, {
    //                 id: application_id
    //             });
    //             var value = $(this).limitslider("values")[0];
    //             var object = ub.objects[view_str]['objects_' + application_id];
    //             object.y = value;

    //         }

    //     });

    //     $('div.x_slider[data-id="' + application_id + '"]').limitslider({

    //         values: [application.position.x * ub.dimensions.width],
    //         min: 0,
    //         max: ub.dimensions.width,
    //         gap: 0,

    //         change: function(event, ui) {

    //             var application = _.find(ub.data.applications.items, {
    //                 id: application_id
    //             });
    //             var value = $(this).limitslider("values")[0];
    //             var object = ub.objects[view_str]['objects_' + application_id];
    //             object.x = value;

    //         }

    //     });

    //     var max_scale = 100;
    //     $('div.scale_slider[data-id="' + application_id + '"]').limitslider({

    //         values: [100],
    //         min: 0,
    //         max: max_scale,
    //         gap: 0,

    //         change: function(event, ui) {

    //             var application = _.find(ub.data.applications.items, { id: application_id });
    //             var value = $(this).limitslider("values")[0];
    //             var object =  ub.objects[view_str]['objects_' + application_id];
    //             var flipped = $('input#flip_logo_' + application_id).is(':checked');
    //             var scale = new PIXI.Point(value / 100, value / 100);

    //             if (flipped) {
    //                 scale.x = scale.x * -1;
    //             }
    //             else {
    //                 scale.x = scale.x * 1;
    //             }

    //             object.scale = scale;

    //             $('span[data-target="logo"][data-label="scale"][data-id="' + application_id + '"]').text(value);

    //         }

    //     });

    //     var max_opacity = 100;
    //     $('div.opacity_slider[data-id="' + application_id + '"]').limitslider({

    //         values: [100],
    //         min: 0,
    //         max: max_opacity,
    //         gap: 0,

    //         change: function(event, ui) {

    //             var application = _.find(ub.data.applications.items, {
    //                 id: application_id
    //             });

    //             var value = $(this).limitslider("values")[0];
    //             var object =  ub.objects[view_str]['objects_' + application_id];

    //             object.alpha = value / max_opacity;

    //             $('span[data-target="logo"][data-label="opacity"][data-id="' + application_id + '"]').text(value);

    //             $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

    //             var opacity =  value / max_opacity;
    //             $angle_slider_logo.find('div.rs-bg-color').css({
    //                 "opacity": opacity,
    //             });

    //         }

    //     });

    //     var max_rotation = 620;
    //     var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
    //     $rotation_slider.roundSlider({

    //         values: [0],
    //         min: 0,
    //         max: max_rotation,
    //         gap: 0,
    //         width: 5,
    //         handleSize: "+14",
    //         startAngle: 90,

    //         change: function(event, ui) {

    //             var application = _.find(ub.data.applications.items, {
    //                 id: application_id
    //             });

    //             var value = parseInt($rotation_slider.find('span.edit').html());
    //             var object =  ub.objects[view_str]['objects_' + application_id];

    //             object.rotation = value / 100;
    //             var rotation = ( value / max_rotation ) * 360;

    //             $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

    //             var flipped = $('input#flip_logo_' + application_id).is(':checked');

    //             if (flipped) {

    //                 $angle_slider_logo.find('div.rs-bg-color').css({
    //                     '-moz-transform': 'scaleX(-1)',
    //                     '-o-transform': 'scaleX(-1)',
    //                     'transform': 'scaleX(-1)',
    //                     'filter': 'FlipH',
    //                     '-ms-filter': "FlipH",
    //                     '-webkit-transform': 'scaleX(-1) ' + ' rotate(-' + rotation + 'deg)',
    //                 });

    //             } else {

    //                 $angle_slider_logo.find('div.rs-bg-color').css({
    //                     '-moz-transform': 'scaleX(1)',
    //                     '-o-transform': 'scaleX(1)',
    //                     'transform': 'scaleX(1)',
    //                     'filter': 'none',
    //                     '-ms-filter': "none",
    //                     '-webkit-transform': 'scaleX(1) ' + ' rotate(' + rotation + 'deg)',
    //                 });

    //             }

    //         }

    //     });

    //     $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');

    //     $rotation_slider.find('div.rs-bg-color').css({
    //         'background-image': 'url(' + logo.dataUrl + ')',
    //         'background-size': '80%',
    //         'background-position': 'center center',
    //         'background-repeat': 'no-repeat',
    //     });

    // };

    ub.funcs.lineDistance = function (point1, point2) {

        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        if (xs > 0) {
            xs = xs * xs;
        } else {
            xs = 1;
        }

        ys = point2.y - point1.y;
        if (ys > 0) {
            ys = ys * ys;
        } else {
            ys = 1;
        }


        return Math.sqrt(xs + ys);


    };

    ub.funcs.angleRadians = function (point1, point2) {

        return Math.atan2(point2.y - point1.y, point2.x - point1.x);

    };

    ub.funcs.objectFocusRotation = function (application_obj) {

        var obj_x = application_obj.worldTransform.tx - ub[ub.active_view + '_view'].x;
        var point_x = ub.mouse.x - ub[ub.active_view + '_view'].x;

        var obj_y = application_obj.worldTransform.ty - ub[ub.active_view + '_view'].y;
        var point_y = ub.mouse.y - ub[ub.active_view + '_view'].y;

        var deltaX = point_x - obj_x;
        var deltaY = point_y - obj_y;

        var rad = Math.atan2(deltaY, deltaX);

        var _origVector = vec2.create();
        _origVector[0] = obj_x;
        _origVector[1] = obj_y;

        var _moveVector = vec2.create();
        _moveVector[0] = deltaX;
        _moveVector[1] = deltaY;

        v1 = vec2.normalize(vec2.create(), _origVector);
        v2 = vec2.normalize(vec2.create(), _moveVector);
        vAngle = Math.atan2(v2[1], v2[0]) - Math.atan2(v1[1], v1[0]);

        // return rad;
        return vAngle;

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

    ub.funcs.update_application_mascot = function (application, mascot, options) {

        var settings = ub.current_material.settings;
        var application_mascot_code = application.id + '_' + mascot.id;

        if (typeof settings.applications[application.id] !== 'undefined') {
            var scale_settings = settings.applications[application.id].scale;
        }

        var settings_obj = settings.applications[application.id];
        var mascot_obj = settings_obj.mascot;
        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var input_object = {

            application: application,
            mascot: mascot,
            fromChangeColor: (typeof options !== "undefined"),

        };

        var sprite_collection = ub.funcs.renderApplication($.ub.create_mascot, input_object, application.id);
        var uniform_type = ub.current_material.material.type;
        var app_containers = ub.current_material.containers[uniform_type].application_containers;
        var sprite = sprite_collection;
        app_containers[application.id] = {};
        app_containers[application.id].object = {

            sprite: sprite_collection,

        };

        var _status = settings_obj.status;

        if (typeof settings_obj.status === "undefined") {

            // For Default Applications
            _status = "on";

        }

        ub.funcs.toggleApplication(application.id, _status);

        /// window.sprite = sprite;

    };

    // ub.funcs.update_application = function(application, logo) {

    //     var x = ub.dimensions.width * application.position.x;
    //     var y = ub.dimensions.height * application.position.y;

    //     var settings = ub.current_material.settings;
    //     var application_logo_code = application.id + '_' + logo.id;

    //     settings.applications[application.id] = {
    //         application: application,
    //         type: 'logo',
    //         color_array: {},
    //     };

    //     var settings_obj = settings.applications[application.id];
    //     var view         = ub[application.perspective + '_view'];
    //     var view_objects = ub.objects[application.perspective + '_view'];
    //     var sprite       = PIXI.Sprite.fromImage(logo.dataUrl);

    //     ub.saveLogo(logo.dataUrl, application.id);

    //     var mask = _.find(ub.current_material.material.options, {
    //         perspective: application.perspective,
    //         name: application.layer
    //     });

    //     var mask = ub.pixi.new_sprite(mask.material_option_path);

    //     sprite.mask = mask;

    //     var s = view_objects['objects_' + application.id];

    //     var position = '';
    //     var scale = '';
    //     var rotation = '';
    //     var alpha = '';

    //     if (typeof(s) === 'object') {

    //         var obj = view_objects['objects_' + application.id];

    //         position = obj.position;
    //         scale = obj.scale;
    //         rotation = obj.rotation;
    //         alpha = obj.alpha;
    //         tint = obj.tint;
    //         var color_array = settings_obj.color_array;

    //         view.removeChild(view_objects['objects_' + application.id]);
    //         delete view_objects['objects_' + application.id];

    //     }

    //     view_objects['objects_' + application.id] = sprite;
    //     view.addChild(sprite);

    //     sprite.position = new PIXI.Point(x,y);
    //     sprite.rotation = application.rotation;

    //     if (sprite.width === 1) {

    //         sprite.position.x -= (sprite.width / 2);
    //         sprite.position.y -= (sprite.height / 2);

    //     }

    //     sprite.anchor.set(0.5, 0.5);

    //     var layer_order = ( 10 + application.layer_order )

    //     sprite.originalZIndex = layer_order * (-1);
    //     sprite.zIndex = layer_order * (-1);

    //     settings_obj.layer_order = layer_order;

    //     ub.updateLayersOrder(view);

    //     if(position !== ''){

    //         sprite.position = position;
    //         sprite.scale = scale;
    //         sprite.rotation = rotation;
    //         sprite.alpha = alpha;

    //     }

    //     settings_obj.position = sprite.position;
    //     settings_obj.scale = sprite.scale;
    //     settings_obj.rotation = sprite.rotation;
    //     settings_obj.alpha = sprite.alpha;

    //     $('div.x_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.x]);
    //     $('div.y_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.y]);

    //     ub.funcs.createDraggable(sprite, application, view);
    //     ub.funcs.createClickable(sprite, application, view, 'application');
    //     ub.funcs.identify(application.id);

    //     console.clear();
    //     console.log('Is this getting called!!');

    // };

    ub.funcs.updateScaleViaSlider = function (_application, value) {

        var _divisor = 100;
        if (_application.application_type !== "mascot") {

            _divisor = 10;

        }

        scaleSetting = {x: value * 3 / _divisor, y: value * 3 / _divisor};

        var _valStr = (value / 100).toString().substr(0, 4);
        if (_valStr === '1' || _valStr === '0') {
            _valStr += '.00';
        }

        $('span.custom_text.scale').html(_valStr);

        var application = _application;

        _.each(_application.application.views, function (view) {

            var application_obj = ub.objects[view.perspective + '_view']['objects_' + application.code];
            var flip = 1;

            if (typeof view.application.flip !== 'undefined') {

                if (view.application.flip === 1) {

                    flip = -1;

                } else {

                    flip = 1;

                }

            }

            application_obj.scale = {x: scaleSetting.x * flip, y: scaleSetting.y};
            view.application.scale = {x: scaleSetting.x * flip, y: scaleSetting.y};

            if (_application.application_type !== "mascot") {

                application.actualPixelSize = application_obj.children[0].height * scaleSetting.x;
                application.estimatedMeasure = ((application.actualPixelSize - 49) / 16);
                application.estimatedMeasure = application.estimatedMeasure / 2 + 1;

            }

        });

        ub.funcs.activateMoveTool(application.code);

    };

    ub.funcs.updatePositionViaSlider = function (_application, value, axis) {

        var _max = ub.dimensions.width;

        if (axis === 'y') {
            _max = ub.dimensions.height;
        }

        var _val = (value / 100 * _max);
        var _valStr = (value / 100 * _max);

        var application = _application;
        var _primaryViewObj = ub.funcs.getPrimaryViewObject(_application.application);
        var _center = _primaryViewObj.application.center[axis] - _val;
        var _pivot = _primaryViewObj.application.pivot[axis] - _val;

        _.each(_application.application.views, function (view) {

            var application_obj = ub.objects[view.perspective + '_view']['objects_' + application.code];
            var angleRadians = _valStr;

            application_obj.position[axis] -= _center;
            view.application.center[axis] -= _center;
            view.application.pivot[axis] -= _pivot;

            var _locationMarker = ub.objects[view.perspective + '_view']['locations_' + application.code];
            _locationMarker.position = application_obj.position;

        });

        ub.funcs.updateCoordinates(_application);
        ub.funcs.activateMoveTool(application.code);

    };


    ub.dragNonce = {applicationID: '', state: false};

    ub.funcs.createDraggable = function (sprite, application, view, viewName) {

        var _application = application;

        // Check for Feature Flag
        if (!ub.config.isFeatureOn('ui', 'draggable_applications')) {
            return;
        }

        if (typeof sprite === "undefined") {
            return;
        }

        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseup = sprite.touchend = function (interactionData) {

            ub.dragNonce = {applicationID: application.code, state: true};

            if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                /// sprite.position = new PIXI.Point(sprite.oldX, sprite.oldY);

            }

            ub.status.manipulatorDown = false;

            this.data = interactionData;
            sprite.dragging = undefined;

            _.each(_application.application.views, function (view) {

                if (view.application.isPrimary === 1) {
                    return;
                }

                if (sprite.ubName === "Move Tool") {

                    var _offsetX = 0;
                    var _offsetY = 0;

                    var _changeX = sprite.downX - sprite.x;
                    var _changeY = sprite.downY - sprite.y;

                    view.application.center.x -= parseFloat(_changeX) - parseFloat(_offsetX);
                    view.application.center.y -= parseFloat(_changeY) - parseFloat(_offsetY);

                    var _object = ub.objects[view.perspective + '_view']['objects_' + _application.code];

                    _object.position.x -= _changeX;
                    _object.position.y -= _changeY;

                    var _locationMarker = ub.objects[view.perspective + '_view']['locations_' + _application.code];
                    _locationMarker.position = _object.position;

                }

                if (sprite.ubName === "Rotate Tool") {

                    var move_point = ub.objects[view.perspective + '_view']['move_tool'];
                    var rotation_point = ub.objects[view.perspective + '_view']['rotate_tool'];
                    var application_obj = ub.objects[view.perspective + '_view']['objects_' + application.code];

                    application_obj.rotation = sprite.angleRadians;
                    view.application.rotation = (sprite.angleRadians / Math.PI) * 180;

                }

                if (sprite.ubName === "Scale Tool") {

                    var application_obj = ub.objects[view.perspective + '_view']['objects_' + application.code];

                    var flip = 1;

                    if (typeof view.application.flip !== 'undefined') {
                        if (view.application.flip === 1) {
                            flip = -1;
                        }
                        else {
                            flip = 1;
                        }
                    }

                    application_obj.scale = {x: sprite.scaleSetting.x * flip, y: sprite.scaleSetting.y};
                    view.application.scale = {x: sprite.scaleSetting.x * flip, y: sprite.scaleSetting.y};

                }

            });

            ub.funcs.activateMoveTool(application.code);

            setTimeout(function () {
                ub.dragNonce = {applicationID: '', state: false};
            }, 500);

        };

        sprite.mousedown = sprite.touchstart = function (interactionData) {

            sprite.oldX = sprite.x;
            sprite.oldY = sprite.y;

            sprite.downX = sprite.x;
            sprite.downY = sprite.y;

            sprite.snapped = false;
            sprite.dragging = true;

            ub.status.manipulatorDown = true;

            if (sprite.ubName === "Delete Tool") {

                ub.funcs.deleteLocation(_application.code);
                if(ub.data.useScrollingUI) {
                    ModifierController.deleteApplicationContainer(_application.code)
                }
                return;

            }

            if (sprite.ubName !== "Reset Tool") {

                var oldSettings = [];

                _.each(_application.application.views, function (v) {

                    var application_obj = ub.objects[v.perspective + "_view"]['objects_' + _application.code];

                    application_obj.oldScaleX = application_obj.scale.x;
                    application_obj.oldScaleY = application_obj.scale.y;

                    application_obj.oldPositionX = application_obj.position.x;
                    application_obj.oldPositionY = application_obj.position.y;

                    application_obj.oldRotation = application_obj.rotation;

                    oldSettings.push({

                        perspective: v.perspective,
                        applicationCode: _application.code,
                        scale: {x: application_obj.oldScaleX, y: application_obj.oldScaleY},
                        position: {x: application_obj.oldPositionX, y: application_obj.oldPositionY},
                        rotation: application_obj.oldRotation,

                    })

                });

                ub.funcs.pushOldState('position, scale, rotation change', 'application', _application, oldSettings);

            } else {

                if (sprite.ubName === "Reset Tool") {

                    _.each(_application.application.views, function (view) {

                        var application_obj = ub.objects[view.perspective + "_view"]['objects_' + _application.code];

                        if (typeof application_obj.oldPositionX !== "undefined") {

                            if (typeof view.application.scale === "undefined") {

                                view.application.scale = {x: 1, y: 1};

                            }

                            view.application.scale.x = application_obj.scale.x = application_obj.oldScaleX;
                            view.application.scale.y = application_obj.scale.y = application_obj.oldScaleY;

                            view.application.center.x = application_obj.position.x = application_obj.oldPositionX;
                            view.application.center.y = application_obj.position.y = application_obj.oldPositionY;

                            view.application.rotation = application_obj.rotation = application_obj.oldRotation;

                        }
                    });
                }
                ub.funcs.activateMoveTool(application.code);
            }
        };

        sprite.mousemove = sprite.mousemove = function (interactionData) {

            this.interactionData = interactionData;
            var this_data = this.interactionData.data;
            var _x = this_data.global.x;
            var _y = this_data.global.y;

            if (sprite.dragging) {

                sprite.oldX = sprite.x;
                sprite.oldY = sprite.y;

                _.each(_application.application.views, function (view) {

                    if (view.application.isPrimary === 0) {
                        return;
                    }

                    var _offsetX = 0;
                    var _offsetY = 0;

                    var move_point = ub.objects[view.perspective + '_view']['move_tool'];
                    var rotation_point = ub.objects[view.perspective + '_view']['rotate_tool'];
                    var scale_point = ub.objects[view.perspective + '_view']['scale_tool'];
                    var reset_point = ub.objects[view.perspective + '_view']['reset_tool'];
                    var center_point = ub.objects[view.perspective + '_view']['center_tool'];
                    var delete_point = ub.objects[view.perspective + '_view']['delete_tool'];

                    if (sprite.ubName === "Move Tool") {

                        rotation_point.alpha = 0;

                        if (ub.config.uniform_application_type === "sublimated" || ub.config.uniform_application_type === "knitted") {
                            scale_point.alpha = 0;
                            delete_point.alpha = 0;
                        }

                        reset_point.alpha = 0;

                        // Dirty Flag is set when application is moved using the free form tool (for runAfterUpdate)
                        _application.dirty = true;

                        // view.application.center.x = parseFloat(sprite.x) - parseFloat(_offsetX);
                        // view.application.center.y = parseFloat(sprite.y) - parseFloat(_offsetY);

                        var _obj = ub.objects[view.perspective + '_view']['objects_' + _application.code]

                        _obj.position.x = sprite.x;
                        _obj.position.y = sprite.y;

                        view.application.center.x = parseFloat(_obj.position.x) - (parseFloat(_offsetX));
                        view.application.center.y = parseFloat(_obj.position.y) - (parseFloat(_offsetY)); // + parseFloat(ub.current_material.material.one_inch_in_px);

                        ub.objects[view.perspective + '_view']['rotate_tool'].position.x = sprite.x;
                        ub.objects[view.perspective + '_view']['rotate_tool'].position.y = sprite.y;

                        if (ub.config.uniform_application_type === "sublimated") {
                            ub.objects[view.perspective + '_view']['scale_tool'].position.x = sprite.x;
                            ub.objects[view.perspective + '_view']['scale_tool'].position.y = sprite.y;
                        }

                        var _mTool = ub.objects[view.perspective + '_view']['manipulatorTool'];

                        if (typeof _mTool !== "undefined") {
                            _mTool.position.x = sprite.x;
                            _mTool.position.y = sprite.y;
                        }

                        var _locationMarker = ub.objects[view.perspective + '_view']['locations_' + _application.code];
                        _locationMarker.position = _obj.position;

                        ub.funcs.updateCoordinates(_application);

                        if (ub.config.uniform_application_type === "tackle_twill") {
                            ub.updateDebugPanelInfo('The Move Tool / Rotate Tool for Tackle Twill uniforms is enabled so that you can make minute adjustments and corrections to the uniforms application, if you want a full customized design please use a sublimated style.');
                        }

                        ub.updateApplicationSpecsPanel(_application.code);

                        if (ub.data.useScrollingUI) {
                            var val_x = Math.abs(Math.round(_obj.position.x / ub.dimensions.width * 99));
                            var val_y = Math.abs(Math.round(_obj.position.y / ub.dimensions.width * 99));

                            if(val_x < 1) {
                                val_x = 1;
                            }
                            if (val_x > 100) {
                                val_x = 100;
                            }
                            if(val_y < 1) {
                                val_y = 1;
                            }
                            if (val_y > 100) {
                                val_y = 100;
                            }
                            $('div.slider-control-move-x[data-id=' + _application.code + '] .noUi-origin').css('left', val_x + '%')
                            $('div.slider-control-move-y[data-id=' + _application.code + '] .noUi-origin').css('left', val_y + '%')
                            $('div.slider-control-move-x[data-id=' + _application.code + '] .noUi-tooltip').html(val_x)
                            $('div.slider-control-move-y[data-id=' + _application.code + '] .noUi-tooltip').html(val_y)
                        }

                    }
                    if (sprite.ubName === "Rotate Tool") {

                        move_point.alpha = 0;

                        if (ub.config.uniform_application_type === "sublimated" || ub.config.uniform_application_type === "knitted") {
                            scale_point.alpha = 0;
                            delete_point.alpha = 0;
                        }

                        reset_point.alpha = 0;

                        var application_obj = ub.objects[view.perspective + '_view']['objects_' + _application.code];
                        var angleRadians = ub.funcs.objectFocusRotation(application_obj);

                        application_obj.rotation = angleRadians;
                        sprite.angleRadians = angleRadians;

                        // view.application.rotation = angleRadians;
                        view.application.rotation = (angleRadians / Math.PI) * 180.00;

                        console.log("view.application.rotation", view.application.rotation);
                        console.log("angleRadians", angleRadians);

                        console.log("bum: ", (view.application.rotation * 5) / 18);

                        var a = (view.application.rotation * 5) / 18;
                        if (a < 0 && a > -60) {
                            a += 60 + 40;
                        }

                        console.log(a);

                        move_point.rotation = angleRadians;

                        if (ub.config.uniform_application_type === "sublimated") {
                            scale_point.rotation = angleRadians;
                        }

                        ub.objects[view.perspective + '_view'].manipulatorTool.rotation = angleRadians;

                        if (ub.config.uniform_application_type === "tackle_twill") {
                            ub.updateDebugPanelInfo('The Move Tool / Rotate Tool for Tackle Twill uniforms is enabled so that you can make minute adjustments and corrections to the uniforms application, if you want a full customized design please use a sublimated style.');
                        }

                        if (ub.data.useScrollingUI) {
                            var rotation = (view.application.rotation * 5) / 18;
                            if (rotation < 0 && rotation > -60) {
                                rotation += 60 + 40;
                            }
                            $('div.slider-control-rotate[data-id=' + _application.code + ']').roundSlider({ value: rotation });
                        }
                        ub.updateApplicationSpecsPanel(_application.code);

                    }

                    if (sprite.ubName === "Scale Tool") {

                        rotation_point.alpha = 0;
                        move_point.alpha = 0;
                        reset_point.alpha = 0;
                        delete_point.alpha = 0;

                        var application_obj = ub.objects[view.perspective + '_view']['objects_' + _application.code];
                        var angleRadians = ub.funcs.angleRadians(move_point.position, rotation_point.position);
                        var application_type = _application.application_type;

                        var distance = ub.funcs.lineDistance(center_point.position, scale_point.position);
                        percentage = distance / 100;
                        ub.mascotPreviousSize = percentage;

                        var flip = 1;

                        if (typeof view.application.flip !== 'undefined') {
                            if (view.application.flip === 1) {
                                flip = -1;
                            }
                            else {
                                flip = 1;
                            }
                        }

                        application_obj.scale = {x: percentage * flip, y: percentage};

                        view.application.scale = {x: application_obj.scale.x * flip, y: application_obj.scale.y};
                        sprite.scaleSetting = {x: application_obj.scale.x * flip, y: application_obj.scale.y};

                        ub.appObj = application_obj;
                        ub.appObjSettings = view.application;

                        ub.updateApplicationSpecsPanel(_application.code);

                        var _start;
                        var _multiplier = 100;
                        if (application_type !== "mascot") {

                            _start = (10 * application_obj.scale.x) / 3;
                            _start = _start / 100;
                            _multiplier = 10;

                        } else {

                            _start = (10 * application_obj.scale.x) / 3;
                            _start = _start / 10;

                        }

                        if (ub.data.useScrollingUI) {
                            var val = Math.abs(Math.round((application_obj.scale.x * _multiplier)/ 3));

                            if(val < 1) {
                                val = 1;
                            }
                            if (val > 100) {
                                val = 100;
                            }
                                $('div.slider-control-scale[data-id=' + _application.code + '] .noUi-origin').css('left', val + '%')
                                $('div.slider-control-scale[data-id=' + _application.code + '] .noUi-tooltip').html(val)
                        }

                        _start = _start.toString().substr(0, 4);

                        if (_start === '1' || _start === '0') {
                            _start += '.00';
                        }

                        $('span.custom_text.scale').html(_start);

                        ub.updateApplicationSpecsPanel(_application.code);
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
            if (!ub.config.isFeatureOn('ui', 'hotspot_applications')) {
                return;
            }

            if (sprite.ubName !== "Move Tool" && sprite.ubName !== "Rotate Tool" && sprite.ubName !== "Scale Tool" && sprite.ubName !== "Reset Tool" && sprite.ubName !== "Delete Tool") {

                return;

            }

            var sprite_obj;

            if (sprite.children.length === 0) {

                sprite_obj = sprite;

            } else {

                sprite_obj = _.last(sprite.children);

            }

            if (typeof sprite_obj.containsPoint === "function") {

                if (sprite_obj.containsPoint(point)) {

                    sprite.zIndex = -500;
                    ub.updateLayersOrder(view);
                    sprite.tint = parseInt('ffffff', 16);

                    ub.activeApplication = application.code;

                    if (sprite.ubName === "Move Tool") {
                        ub.tools.activeTool.moveTool = true;
                    }
                    if (sprite.ubName === "Rotate Tool") {
                        ub.tools.activeTool.rotateTool = true;
                    }
                    if (sprite.ubName === "Scale Tool") {
                        ub.tools.activeTool.scaleTool = true;
                    }
                    if (sprite.ubName === "Reset Tool") {
                        ub.tools.activeTool.resetTool = true;
                    }
                    if (sprite.ubName === "Delete Tool") {
                        ub.tools.activeTool.deleteTool = true;
                    }

                } else {

                    ub.updateLayersOrder(view);
                    sprite.tint = parseInt('888888', 16);

                    ub.activeApplication = undefined;

                    if (sprite.ubName === "Move Tool") {
                        ub.tools.activeTool.moveTool = false;
                    }
                    if (sprite.ubName === "Rotate Tool") {
                        ub.tools.activeTool.rotateTool = false;
                    }
                    if (sprite.ubName === "Scale Tool") {
                        ub.tools.activeTool.scaleTool = false;
                    }
                    if (sprite.ubName === "Reset Tool") {
                        ub.tools.activeTool.resetTool = false;
                    }
                    if (sprite.ubName === "Delete Tool") {
                        ub.tools.activeTool.deleteTool = false;
                    }

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

        _.each(views, function (view) {

            var _view_name = view.perspective + '_view';

            if (typeof ub.objects[_view_name]['objects_' + app_id] !== 'undefined') {

                sprites.push(ub.objects[_view_name]['objects_' + app_id]);

            }
            else {

                /// Not Found

            }

        });

        return sprites;

    };

    /// End MV Functions

    /// Create Interactive UI

    ub.funcs.createInteractiveUI = function (sprite, application, type, ui_handles) {

        var rotation_point = _.find(ui_handles.children, {ubName: 'rotation_point'});
        var move_point = _.find(ui_handles.children, {ubName: 'move_point'});

        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseover = function (data) {

            var icon = '';

            if (type === 'move') {
                icon = 'url(' + ub.config.host + '/images/sidebar/move.png) 8 8, move';
                move_point.tint = 0xff0000;
            }

            if (type === 'rotate') {
                icon = 'url(' + ub.config.host + '/images/sidebar/rotate.png) 8 8,auto';
                rotation_point.tint = 0xff0000;
            }

            $('body').css('cursor', icon);

        }

        sprite.mouseout = function (data) {

            if (type === 'move') {
                move_point.tint = 0xffffff;
            }

            if (type === 'rotate') {
                rotation_point.tint = 0xffffff;
            }

            $('body').css('cursor', 'auto');

        }

        sprite.mouseup = sprite.touchend = function (data) {

            if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                sprite.position = new PIXI.Point(sprite.oldX, sprite.oldY);

            }

            this.data = data;
            this.dragging = true;

        };

        sprite.mousedown = sprite.touchstart = function (data) {

            this.data = data;

            sprite.oldX = sprite.x;
            sprite.oldY = sprite.y;

            sprite.snapped = false;
            this.dragging = true;

        };

        sprite.mousemove = sprite.mousemove = function (interactionData) {

            this.interactionData = interactionData;

            if (this.dragging) {

                var x = application.position.x * ub.dimensions.width;
                var y = application.position.y * ub.dimensions.height;
                var p_app = new PIXI.Point(x, y);
                var p_sprite = new PIXI.Point(sprite.x, sprite.y);
                var distance = ub.funcs.lineDistance(p_app, p_sprite);
                var application_obj = ub.objects[application.perspective + '_view']['objects_' + application.id];

                if (typeof application_obj === 'undefined') {
                    return;
                }

                var settings_obj = ub.current_material.settings.applications[application.id];

                if (type === 'move') {

                    original_x = ub.dimensions.width * application.position.x;
                    original_y = ub.dimensions.height * application.position.y;

                    var original_location = new PIXI.Point(original_x, original_y);
                    var dist = Math.abs(ub.funcs.lineDistance(original_location, sprite.position));
                    var limits = 500;

                    if (ub.config.isFeatureOn('ui', 'drag_limits')) {
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

                    if (application_type === 'logo' || application_type === 'mascot' || application_type === 'image' || ub.config.isFeatureOn('ui', 'scale_text')) {
                        application_obj.scale.set(percentage, percentage);
                        settings_obj.scale = application_obj.scale;

                    }

                }

                if ($('#chkSnap').is(":checked")) {

                    var minimum_distance_to_snap = 50;

                    if (distance < minimum_distance_to_snap) {

                        sprite.position = new PIXI.Point(x, y);

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

        sprite.mouseover = function (data) {

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

        sprite.mouseout = function (data) {

            if (type === 'move') {
                move_point.tint = 0xffffff;
            }

            if (type === 'rotate') {
                rotation_point.tint = 0xffffff;
            }

            $('body').css('cursor', 'auto');

        }

        sprite.mouseup = sprite.touchend = function (data) {

            if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                sprite.position = new PIXI.Point(sprite.oldX, sprite.oldY);

            }

            this.data = data;
            this.dragging = true;

        };

        sprite.mousedown = sprite.touchstart = function (data) {

            this.data = data;

            sprite.oldX = sprite.x;
            sprite.oldY = sprite.y;

            sprite.snapped = false;
            this.dragging = true;

        };

        sprite.mousemove = sprite.mousemove = function (interactionData) {

            this.interactionData = interactionData;

            if (this.dragging) {

                var x = application.position.x * ub.dimensions.width;
                var y = application.position.y * ub.dimensions.height;
                var p_app = new PIXI.Point(x, y);
                var p_sprite = new PIXI.Point(sprite.x, sprite.y);
                var distance = ub.funcs.lineDistance(p_app, p_sprite);
                var application_obj = ub.objects[application.perspective + '_view']['objects_' + application.id];

                if (typeof application_obj === 'undefined') {
                    return;
                }

                var settings_obj = ub.current_material.settings.applications[application.id];

                if (type === 'move') {

                    original_x = ub.dimensions.width * application.position.x;
                    original_y = ub.dimensions.height * application.position.y;

                    var original_location = new PIXI.Point(original_x, original_y);
                    var dist = Math.abs(ub.funcs.lineDistance(original_location, sprite.position));
                    var limits = 500;

                    if (ub.config.isFeatureOn('ui', 'drag_limits')) {
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

                    if (application_type === 'logo' || application_type === 'mascot' || application_type === 'image' || ub.config.isFeatureOn('ui', 'scale_text')) {
                        application_obj.scale.set(percentage, percentage);
                        settings_obj.scale = application_obj.scale;

                    }

                }

                if ($('#chkSnap').is(":checked")) {

                    var minimum_distance_to_snap = 50;

                    if (distance < minimum_distance_to_snap) {

                        sprite.position = new PIXI.Point(x, y);

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
        if (!ub.config.isFeatureOn('ui', 'hotspots')) {
            return;
        }

        var basesprite;
        if (application.type !== "mascot" && application.type !== "logo") {

            baseSprite = ub.funcs.getBaseSprite(sprite);

            if (typeof basesprite === 'object') {

                baseSprite.oldTint = baseSprite.tint;

            }

        } else {

            baseSprite = sprite.children[0];
            baseSprite.oldTint = baseSprite.tint;

        }

        sprite.spriteType = spriteType;

        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseup = sprite.touchend = function (data) {
        };

        $('body').mouseup(function () {

            if (ub.funcs.popupTest()) {
                return;
            }
            if (ub.status.fullView.getStatus()) {
                return;
            }
            if (ub.showLocation) {
                return;
            }
            if (ub.dragNonce.state && ub.dragNonce.applicationID !== _id) {
                return;
            }

            if (sprite.ubHover) {

                var _id = sprite.name.replace('objects_', '');

                sprite.ubHover = false;

                if (application.type !== "mascot" && application.type !== "logo") {

                    if (ub.data.useScrollingUI) {
                        ModifierController.scrollToOptions(application.type, _id, application.code);
                    } else {
                        ub.funcs.activateApplications(_settingsObject.code);
                    }

                } else {
                    // Check if scrolling UI is active
                    if (ub.data.useScrollingUI) {
                        ModifierController.scrollToOptions(application.type, _id, application.code);
                    } else {
                        ub.funcs.activateMascots(_id);
                    }
                }

            }

            sprite.ubHover = false;

        });

        sprite.mousedown = sprite.touchstart = function (data) {

            if (ub.funcs.popupTest()) {
                return;
            }
            if (ub.status.fullView.getStatus()) {
                return;
            }
            if (ub.showLocation) {
                return;
            }

            if (typeof this.interactionData === 'undefined') {
                return;
            }

            var this_data = this.interactionData.data;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

        };

        sprite.mousemove = sprite.mousemove = function (interactionData) {

            if (ub.funcs.popupTest()) {
                return;
            }
            if (ub.status.fullView.getStatus()) {
                return;
            }
            if (ub.zoom) {
                return;
            }

            var this_data = interactionData.data;
            window.sprite = sprite;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

            /// Hotspot

            var sprite_obj;

            if (sprite.children.length === 0) {

                sprite_obj = sprite

            } else {

                sprite_obj = _.last(sprite.children);

            }

            if (typeof sprite_obj.containsPoint === "function") {

                var _sizeOfApplications = _.size(ub.current_material.settings.applications);

                if (sprite_obj.containsPoint(point)) {

                    if (typeof baseSprite !== 'object') {
                        return;
                    }

                    if (ub.zoom) {
                        return;
                    }

                    // start
                    sprite.ubHover = true;
                    ub.data.applicationAccumulator = _sizeOfApplications;
                    ub.funcs.setPointer();

                } else {

                    if (typeof baseSprite !== 'object') {
                        return;
                    }

                    // restore
                    sprite.ubHover = false;
                    ub.data.applicationAccumulator -= 1;
                    ub.funcs.setPointer();

                }

            }

            /// End Hot Spot

        };

    }

    /// End Create Clickable Application

    /// Rearrange Application Layers

    // ub.funcs.rearrangeApplications = function (application, movement) {

    //     var code = application.id;
    //     var current_layer_order = ub.current_material.settings.applications[application.id].layer_order;
    //     var settings_obj = ub.current_material.settings.applications[application.id];
    //     var current_obj = ub.objects[ application.perspective + '_view']['objects_' + application.id];

    //     if (movement === 'UP') {

    //         var next_element = _.find(ub.current_material.settings.applications, {'layer_order': current_layer_order + 1});

    //         if(typeof next_element !== 'undefined') {

    //             var next_obj = ub.objects[ application.perspective + '_view']['objects_' + next_element.application.id];
    //             next_element.layer_order = (current_layer_order);
    //             next_obj.zIndex = (current_layer_order) * -1;

    //         }

    //         settings_obj.layer_order = (current_layer_order + 1);
    //         current_obj.zIndex = (current_layer_order + 1) * -1;

    //         ub.updateLayersOrder(ub[application.perspective + '_view']);

    //     }

    //     if (movement === 'DOWN') {

    //         var next_element = _.find(ub.current_material.settings.applications, {'layer_order': current_layer_order - 1});

    //         if(typeof next_element !== 'undefined') {

    //             var next_obj = ub.objects[ application.perspective + '_view']['objects_' + next_element.application.id];
    //             next_element.layer_order = (current_layer_order);
    //             next_obj.zIndex = (current_layer_order) * -1;

    //         }

    //         settings_obj.layer_order = (current_layer_order - 1);
    //         current_obj.zIndex = (current_layer_order - 1) * -1;

    //         ub.updateLayersOrder(ub[application.perspective + '_view']);

    //     }

    // };

    /// End Rearrange Layers


    /// Transformed Applications

    // Render Actual Application

    ub.funcs.create_sprite = function (config) {

        return ub.pixi.new_sprite('/images/misc/swoosh.png');

    }


    /// TODO: This should be memoize this function
    ub.funcs.getApplicationMatOption = function (app_id) {

        var material_option = undefined;

        _.each(ub.data.applications_transformed, function (shape) {

            _.each(shape, function (application) {

                if (app_id === application.id) {

                    material_option = shape.name;

                }

            });

        });

        var _settingsObject = ub.funcs.getSettingsObject(app_id);
        var material_option = _settingsObject.application.layer;

        if (typeof material_option === 'undefined') {

            if (parseInt(app_id) > 70) {

                material_option = "Body";

            } else {

                util.error('Material Option for Application ID ' + app_id + ' Not Found!');

            }

        }

        return material_option;

    };

    ub.funcs.getApplicationSettingsByView = function (location, view) {

        var _applicationObj = ub.funcs.getApplicationSettings(location);
        var _view = _.find(_applicationObj.application.views, {perspective: view});

        return _view;

    }

    ub.funcs.setProperties = function (location, perspective, scaleX, scaleY, positionX, positionY) {

        if (typeof ub.objects[perspective + '_view']['objects_' + location] !== "undefined") {

            var _obj = ub.objects[perspective + '_view']['objects_' + location];

            _obj.position.x = positionX;
            _obj.position.y = positionY;
            _obj.scale.x = scaleX;
            _obj.scale.y = scaleY;

            if (location === '32' || location === '10') {

                var _matchingObj = ub.objects[perspective + '_view']['objects_33'];

                _matchingObj.position.x = positionX;
                _matchingObj.position.y = positionY;

                var _appSettings = ub.funcs.getApplicationSettingsByView(location, perspective);

                if (typeof _appSettings !== 'undefined') {

                    var _center = _appSettings.application.center;
                    var _newX = parseFloat(positionX) - _appSettings.application.center.x;
                    var _newY = parseFloat(positionY) - _appSettings.application.center.y;

                    var _prID;
                    var _prPerspective;

                    if (location === "32") {
                        _prID = '33';
                    } else if (location === "9") {
                        _prID = '10';
                    }

                    if (perspective === 'left') {
                        _prPerspective = 'right'
                    } else {
                        _prPerspective = perspective;
                    }

                    var _matchingAppSettings = ub.funcs.getApplicationSettingsByView(_prID, _prPerspective);
                    var _matchingCenter = _matchingAppSettings.application.center;

                    _matchingObj.position.x = _matchingCenter.x;
                    _matchingObj.position.y = _matchingCenter.y;

                    if (_newX > 0) {

                        _matchingObj.position.x += (_newX * -1);

                    } else if (positionX < 0) {

                        _matchingObj.position.x += (_newX * _newX);

                    }

                    _matchingObj.position.y += _newY;


                }

                _matchingObj.scale.x = scaleX;
                _matchingObj.scale.y = scaleY;

            }

        }

    }

    ub.funcs.getProperties = function (location, perspective) {

        var _obj = undefined;

        if (typeof ub.objects[perspective + '_view']['objects_' + location] !== "undefined") {

            _obj = ub.objects[perspective + '_view']['objects_' + location];

        }

        if (typeof _obj === "undefined") {
            console.warn('Location ' + location + " in perspective " + perspective + " not found.");
        }

        return _obj;

    }

    ub.funcs.getSettingsObject = function (applicationID) {

        return ub.current_material.settings.applications[applicationID];

    }

    ub.funcs.pullUp = function (_object, originalPosition, pullUpValue) {

        if (typeof originalPosition !== "undefined") {

            _object.position.y = originalPosition.y + pullUpValue;

        }

    }

    ub.funcs.oneInchPushDownMascotsPant = function (code) {

        var _uniformCategory = ub.current_material.material.uniform_category;
        var _uniformType = ub.current_material.material.pant;
        var _option = ub.current_material.material.neck_option;

        var _code = parseInt(code);
        var _mascotOffset = undefined;
        var _app = undefined;
        var _offsetY = undefined;

        _app = ub.current_material.settings.applications[_code];

        if (_uniformCategory === "Football" || _uniformCategory === "Wrestling") {
            return;
        }
        if (_app.type !== 'mascot') {
            return;
        }

        _mascotOffset = ub.data.mascotOffsetsPant.getSize('baseball', _option, _code, parseInt(_app.size));

        if (typeof _mascotOffset !== 'undefined') {

            _offsetY = _mascotOffset.yAdjustment;

            _.each(ub.views, function (view) {

                var _object = ub.objects[view + '_view']['objects_' + code];
                var _descStr = '';

                if (typeof _object !== "undefined") {

                    _descStr = 'objects_' + code + ' ' + view;
                    _object.position.y += _offsetY;

                }

            });

        }

    }

    // For Mascots
    ub.funcs.oneInchPullUpMascots = function (code) {

        var _uniformCategory = ub.current_material.material.uniform_category;
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _mascotOffset = undefined;
        var _code = parseInt(code);
        var _validCodesForPullUps = [1, 5, 6];
        var _app = undefined;

        if (!(_alias.alias === "tech-tee" || _alias.alias === "compression")) {
            return;
        }
        if (!_.contains(_validCodesForPullUps, _code)) {
            return;
        }

        _app = ub.current_material.settings.applications[_code];

        if (_app.application_type !== "mascot") {
            return;
        }
        if (typeof _app === "undefined") {
            return;
        }

        _mascotOffset = ub.data.mascotOffsets.getSize(_alias.alias, _code, _app.size);

        if (typeof _mascotOffset === "undefined") {
            return;
        }

        _.each(ub.views, function (view) {

            var _object = ub.objects[view + '_view']['objects_' + code];
            var _descStr = '';

            if (typeof _object !== "undefined") {

                _descStr = 'objects_' + code + ' ' + view;
                _object.position.y += _mascotOffset.yAdjustment;

            }

        });

    }

    ub.funcs.isDirty = function (appObj) {

        var _result = false;

        if (typeof appObj !== "undefined" && appObj.dirty) {
            _result = true;
        }

        return _result;

    }

    // For Text Applications
    ub.funcs.oneInchPullUp = function (code) {

        var _currentSport = ub.current_material.material.uniform_category;
        var _codes = ["1", "2", "6", "5", "26", "27"];

        if (_currentSport === "Football" || _currentSport === "Wrestling") {
            return;
        }
        if (!_.includes(_codes, code)) {
            return;
        }

        // Pull up 26 and 27

        // Front
        var _app1 = ub.current_material.settings.applications[1];
        var _app26 = ub.current_material.settings.applications[26];
        var _app27 = ub.current_material.settings.applications[27];
        var _app2 = ub.current_material.settings.applications[2];

        // Back
        var _app6 = ub.current_material.settings.applications[6];
        var _app5 = ub.current_material.settings.applications[5];

        _.each(ub.views, function (_view) {

            var _object1 = ub.objects[_view + '_view']['objects_1'];
            var _object2 = ub.objects[_view + '_view']['objects_2'];
            var _object5 = ub.objects[_view + '_view']['objects_5'];

            var _object27 = ub.objects[_view + '_view']['objects_27'];
            var _object26 = ub.objects[_view + '_view']['objects_26'];

            if (code === '1' || code === '2' || code === '26' || code === "27") {

                if (ub.funcs.isDirty(_app1) ||
                    ub.funcs.isDirty(_app2) ||
                    ub.funcs.isDirty(_app26) ||
                    ub.funcs.isDirty(_app27)) {
                    return;
                }

                if (typeof _object26 !== "undefined" || typeof _object2 !== "undefined") {

                    if (typeof _app1 !== "undefined") {

                        var _parentSize = parseInt(_app1.font_size);
                        var _applicationNumber = '26'
                        var _originalPosition

                        if (typeof _app26 !== "undefined") {
                            _originalPosition = _app26['originalPosition_' + _view];
                        }

                        if (_currentSport === "Baseball" || _currentSport === "Fastpitch") {

                            var _pullUpHeightObj = ub.data.applicationPullUps.getPullUp(_currentSport, _parentSize, _applicationNumber);
                            var _calculatedPullUpHeight = _pullUpHeightObj.pullUpHeight;

                        } else {

                            _originalPosition = _app2['originalPosition_' + _view];
                            _calculatedPullUpHeight = 0;

                            if (_app1.application_type === "free") {
                                _parentSize = 2;
                            }

                            if (_parentSize === 1) {

                                if (ub.current_material.material.one_inch_in_px === null) {
                                    ub.utilities.warn('one_inch_in_px not set.');
                                }
                                _calculatedPullUpHeight = parseInt(ub.current_material.material.one_inch_in_px) * -2;

                            }

                            if (_parentSize === 2) {

                                if (ub.current_material.material.one_inch_in_px === null) {
                                    ub.utilities.warn('one_inch_in_px not set.');
                                }
                                _calculatedPullUpHeight = parseInt(ub.current_material.material.one_inch_in_px) * -1;

                            }

                            if (_parentSize === 4) {

                                if (ub.current_material.material.one_inch_in_px === null) {
                                    ub.utilities.warn('one_inch_in_px not set.');
                                }
                                _calculatedPullUpHeight = parseInt(ub.current_material.material.one_inch_in_px);

                            }

                        }

                        if (typeof _object26 !== "undefined") {
                            ub.funcs.pullUp(_object26, _originalPosition, _calculatedPullUpHeight);
                        }
                        if (typeof _object27 !== "undefined") {
                            ub.funcs.pullUp(_object27, _originalPosition, _calculatedPullUpHeight);
                        }
                        if (typeof _object2 !== "undefined") {
                            ub.funcs.pullUp(_object2, _originalPosition, _calculatedPullUpHeight);
                        }

                    }

                }

            }

            // Pull up 5

            if (code === '5' || code === '6') {

                if (ub.funcs.isDirty(_app5) || ub.funcs.isDirty(_app6)) {
                    return;
                }

                if (typeof _object5 !== "undefined") {

                    if (typeof _app6 !== "undefined") {

                        // No Pull up's on 2.5 because its fixed and free applications
                        if (_app6.font_size === 2.5) {
                            return;
                        }
                        if (_app6.application_type === "free") {
                            return;
                        }

                        var _parentSize = parseInt(_app6.font_size);
                        var _applicationNumber = '5'
                        var _pullUpHeightObj = ub.data.applicationPullUps.getPullUp(_currentSport, _parentSize, _applicationNumber);

                        var _calculatedPullUpHeight;

                        if (typeof _pullUpHeightObj !== "undefined") {

                            _calculatedPullUpHeight = _pullUpHeightObj.pullUpHeight;

                        }

                        var _originalPosition = _app5['originalPosition_' + _view];

                        if (ub.data.sportsMain.currentOk()) {

                            _calculatedPullUpHeight = 0;

                            if (_parentSize === 2) {
                                if (ub.current_material.material.one_inch_in_px === null) {
                                    ub.utilities.warn('one_inch_in_px not set.');
                                }
                                _calculatedPullUpHeight = parseInt(ub.current_material.material.one_inch_in_px) * -1;
                            }

                        }

                        ub.funcs.pullUp(_object5, _originalPosition, _calculatedPullUpHeight);

                    }

                }

            }

        });

    }

    ub.funcs.convertDegreesToRadians = function (degrees) {

        var _result = (degrees * Math.PI) / 180;
        return _result;

    }

    ub.funcs.renderApplication = function (sprite_function, args, app_id) {

        var sprite_collection = [];
        var mat_option = ub.funcs.getApplicationMatOption(app_id);
        var marker_name = "objects_" + app_id;
        var views;
        var _applicationObj;

        views = ub.current_material.settings.applications[app_id].application.views;
        _applicationObj = ub.current_material.settings.applications[app_id].application;

        var _settingsObject = ub.funcs.getSettingsObject(app_id);

        _.each(ub.views, function (_view) {

            var _view_name = _view + '_view';

            if (typeof ub.objects[_view_name][marker_name] !== "undefined") {

                ub[_view_name].removeChild(ub.objects[_view_name][marker_name]);

            }

        });

        var adjustablePositions = ['1', '2', '6', '5'];

        _.each(views, function (view) {

            var _withBodyLeftRight = ub.data.withBodyLeftRight.isOk(ub.sport, ub.neckOption);

            if (_withBodyLeftRight) {

                if (mat_option === "Body Left" && view.perspective === "right") {
                    return;
                }
                if (mat_option === "Body Right" && view.perspective === "left") {
                    return;
                }

            }

            args.perspective = view.perspective;

            var point = sprite_function(args);
            point.position = new PIXI.Point(view.application.center.x, view.application.center.y);

            if (_.indexOf(adjustablePositions, app_id) !== -1) {

                if (app_id === '1' || app_id === '6') {

                    point.position = new PIXI.Point(view.application.center.x, view.application.center.y);

                }

                if (app_id === '2' || app_id === '5') {

                    var topRightY = view.application.topRight.y;
                    var y = (point.height / 4) + topRightY;

                    // point.position  = new PIXI.Point(view.application.center.x, y);
                    point.position = new PIXI.Point(view.application.center.x, view.application.center.y);

                }

            }

            point.rotation = ub.funcs.convertDegreesToRadians(view.application.rotation);

            var _zIndex = ub.funcs.generateZindex('applications');

            point.zIndex = -(_zIndex + _settingsObject.zIndex);

            if (ub.funcs.getCurrentUniformCategory() === "Wrestling") {

                // point.zIndex = -(_zIndex + _settingsObject.zIndex);

            } else {

                // point.zIndex = -(_zIndex);

                if (typeof args.applicationObj !== "undefined") {

                    if ((args.applicationObj.application_type === "team_name" || parseInt(args.applicationObj.code) === 1) && ub.funcs.isCurrentSport('Baseball')) {

                        // point.zIndex = -80; // So it will be rendered above the piping

                    }

                }

            }

            point.ubType = "object";
            point.ubAppID = app_id;
            point.ubApplicationType = _applicationObj.type;

            /// Todo: Put in Overrides to Opacity, Rotation, Scale and Position Here....

            var mask = _.find(ub.current_material.material.options, {
                perspective: view.perspective,
                name: mat_option,
            });

            /// Message is mask layer is undefined
            if (typeof mask === "undefined") {
                errorCode = ub.errorCodes.getCode('maskLayerNotFound');
                ub.utilities.errorWithCode(errorCode, mat_option + ' / ' + view.perspective);
                return;
                // TODO: PartialApplications
            }

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

                if (_fontSizeData.xScale !== "0" && _fontSizeData.xScale !== undefined) {
                    _xScale = parseFloat(_fontSizeData.xScale);
                }
                if (_fontSizeData.yScale !== "0" && _fontSizeData.yScale !== undefined) {
                    _yScale = parseFloat(_fontSizeData.yScale);
                }

                point.scale.set(_xScale, _yScale);

                // Offset
                var _xOffset = 0;
                var _yOffset = 0;

                if (_fontSizeData._xOffset !== "0") {
                    _xOffset = parseFloat(_fontSizeData.xOffset);
                }
                if (_fontSizeData._yOffset !== "0") {
                    _yOffset = parseFloat(_fontSizeData.yOffset);
                }

                if (!_settingsObject.dirty) {
                    point.position.x += _xOffset;
                    point.position.y += _yOffset;
                }

            }

            if (typeof args.overrideOffsetX !== 'undefined') {

                point.position.x -= _xOffset;
                point.position.x += parseFloat(args.overrideOffsetX);

            }

            if (typeof args.overrideOffsetY !== 'undefined') {

                point.position.y -= _yOffset;
                point.position.y += parseFloat(args.overrideOffsetY);

            }

            //// Process Scale X and Y from the font size field, in the application font size

            if (typeof args.applicationObj !== "undefined" || _applicationObj.type === 'mascot') {

                var _scaleXOverride = view.application.fontSizes.split(',')[1];
                var _scaleYOverride = view.application.fontSizes.split(',')[2];

                if (!isNaN(_scaleXOverride)) {

                    _scaleXOverride = parseFloat(_scaleXOverride);

                }
                else {

                    _scaleXOverride = point.scale.x;

                    if (_applicationObj.type === "mascot") {
                        _scaleXOverride = 1;
                    }

                }

                if (!isNaN(_scaleYOverride)) {

                    _scaleYOverride = parseFloat(_scaleYOverride);

                }
                else {

                    _scaleYOverride = point.scale.y;
                    if (_applicationObj.type === "mascot") {
                        _scaleYOverride = 1;
                    }

                }

                if (_applicationObj.type === "mascot") {

                    point.scale.x = point.scale.x * (_scaleXOverride);
                    point.scale.y = point.scale.y * (_scaleYOverride);

                } else {

                    if (_scaleXOverride === 1) {
                        _scaleXOverride = point.scale.x;
                    }

                    if (_scaleYOverride === 1) {
                        _scaleYOverride = point.scale.y;
                    }

                    point.scale.set(_scaleXOverride, _scaleYOverride);

                }

                //// End Process Scale X and Y from the font size field

                //// Process Override ScaleX and ScaleY from Custom Font Scale Field from the backend

                if (typeof ub.config.savedDesignInfo !== "object") { // Process Custom Scale Field only if this is not a saved design, because that one already have an override scale

                    var _customScaleUndefined = typeof view.application.appCustomScale === "undefined";
                    var _customScaleBlank = false;

                    if (!_customScaleUndefined) {
                        _customScaleBlank = view.application.appCustomScale.x === "0" && view.application.appCustomScale.y === "0";
                    }

                    if (
                        (!_customScaleUndefined && !_customScaleBlank) &&
                        ub.funcs.usesCustomScaleValid()
                    ) {

                        var _scaleX = point.scale.x;
                        var _scaleY = point.scale.y;

                        _scaleX = parseFloat(view.application.appCustomScale.x);
                        _scaleY = parseFloat(view.application.appCustomScale.y);

                        // TODO: (Refactor) Mutation of property should be extracted from here to outside in load settings
                        view.application.scale = {x: _scaleX, y: _scaleY};

                        if (_scaleX !== 0 && _scaleY !== 0) {
                            point.scale = {x: _scaleX, y: _scaleY};
                        }

                    }

                }

                if (typeof view.application.scale !== "undefined") {
                    if (view.application.scale.x === 0 && view.application.scale.y === 0) {
                        view.application.scale = {x: 1, y: 1};
                    }
                }

                //// Process End Override ScaleX and ScaleY from Custom Font Scale Field from the backend

                //// Process Override ScaleX and ScaleY from GA Font Tool

                var _scaleX = point.scale.x;
                var _scaleY = point.scale.y;

                if (typeof args.overrideScaleX !== 'undefined') {
                    _scaleX = parseFloat(args.overrideScaleX);
                }

                if (typeof args.overrideScaleY !== 'undefined') {
                    _scaleY = parseFloat(args.overrideScaleY);
                }

                if (_applicationObj.type !== "mascot") {
                    point.scale = {x: _scaleX, y: _scaleY};
                }

                // block pattern lists that ignore the increment or decrement in point.position
                var blockPatternBlackLists = ['Hockey Socks'];

                var _size = ub.current_material.settings.applications[parseInt(app_id)].size;
                
                if (app_id === '2' && _applicationObj.type === 'mascot' && _size === 8)   { point.position.y  -= 5;  }
                if (app_id === '2' && _applicationObj.type === 'mascot' && _size === 10)  { point.position.y  -= 5;  }
            }

            ub.funcs.createClickable(point, view.application, view, 'application');
            ub.updateLayersOrder(ub[view_name]);

            var _size = ub.current_material.settings.applications[parseInt(app_id)].size;

                // if (_applicationObj.type === 'mascot' && _size === 4)    { point.position.y   += 13;   }
                if ((app_id === '5' || app_id === '2') && _applicationObj.type === 'mascot' && _size === 3 && !_.contains(blockPatternBlackLists, ub.config.blockPattern)) { point.position.y   += 11; }
                if ((app_id === '5' || app_id === '2') && _applicationObj.type === 'mascot' && _size === 2) { point.position.y   += 13; }
                if ((app_id === '5' || app_id === '2') && _applicationObj.type === 'mascot' && _size === 1) { point.position.y   += 13; }
                if (_applicationObj.type === 'mascot' && _size === 8)    { point.position.y   -= 5;    }

            if (app_id === '5' && _applicationObj.type === 'mascot' && _size === 10) {
                point.position.y -= 30;
            }
            if (app_id === '5' && _applicationObj.type === 'mascot' && _size === 12) {
                point.position.y -= 30;
            }

            /// New Overrrides (After Mascots are resized)

            if (app_id === '4' && _applicationObj.type === 'mascot' && _size === 0.5) {
                point.position.y += 3;
            }
            if (app_id === '5' && _applicationObj.type === 'mascot' && _size === 12) {
                point.position.y += 40;
            }
            if (app_id === '5' && _applicationObj.type === 'mascot' && _size === 10) {
                point.position.y += 30;
            }

            // if (_applicationObj.type === 'mascot' && _size === 4)    { point.position.y   += 13;   }
            if ((app_id === '5' || app_id === '2') && _applicationObj.type === 'mascot' && _size === 3) {
                point.position.y += 11;
            }
            if ((app_id === '5' || app_id === '2') && _applicationObj.type === 'mascot' && _size === 2) {
                point.position.y += 13;
            }
            if ((app_id === '5' || app_id === '2') && _applicationObj.type === 'mascot' && _size === 1) {
                point.position.y += 13;
            }
            if (_applicationObj.type === 'mascot' && _size === 8) {
                point.position.y -= 5;
            }

            // Lower Uniform Application Scales

            var _isValidPantLocation = ub.data.pantLocations.isValidLocation(parseInt(app_id));
            var _isFootballUniform = ub.current_material.material.uniform_category === 'Football';
            var _isPant = ub.current_material.material.type === 'lower';
            var _isMascot = _applicationObj.type === 'mascot';

            if (_isFootballUniform && _isPant && _isMascot) {

                var _scale = point.scale;

                if (_size === 4) {
                    _scale = 0.4
                }
                if (_size === 3) {
                    _scale = 0.33
                }
                if (_size === 2) {
                    _scale = 0.29
                }
                if (_size === 1) {
                    _scale = 0.20
                }

                point.scale = {x: _scale, y: _scale}

            }

            // End Lower Uniform Application Scales

            // Legacy One Dimensional Font Overrides, Extract this
            if (ub.funcs.isCurrentSport('Football') || ub.funcs.isCurrentSport('Wrestling')) {

                /// Font Overrides

                if ((app_id === "10" || app_id === "32") && (_applicationObj.type !== "mascot" && _applicationObj.type !== "logo")) {

                    var _fontOffsets = ub.funcs.getFontOffsets(args.font_name, args.fontSize, view.perspective, app_id);

                    _xOffset = parseFloat(_fontSizeData.xOffset);
                    _yOffset = parseFloat(_fontSizeData.yOffset);

                    point.position.x += _fontOffsets.offsetX;
                    point.position.y += _fontOffsets.offsetY;

                    point.position.x -= _xOffset;
                    point.position.y -= _yOffset;

                    if (_fontOffsets.scaleX !== 1) {
                        point.scale.x = _fontOffsets.scaleX;
                    }

                    if (_fontOffsets.scaleY !== 1) {
                        point.scale.y = _fontOffsets.scaleY;
                    }

                }

                if (_.includes(ub.data.leftSideOverrides, args.font_name) && (app_id === "9" || app_id === "33") && (_applicationObj.type !== "mascot" && _applicationObj.type !== "logo")) {

                    var _fontOffsets = ub.funcs.getFontOffsets(args.font_name, args.fontSize, view.perspective, app_id);

                    _xOffset = parseFloat(_fontSizeData.xOffset);
                    _yOffset = parseFloat(_fontSizeData.yOffset);

                    point.position.x += _fontOffsets.offsetX;
                    point.position.y += _fontOffsets.offsetY;

                    point.position.x -= _xOffset;
                    point.position.y -= _yOffset;

                    if (_fontOffsets.scaleX !== 1) {
                        point.scale.x = _fontOffsets.scaleX;
                    }

                    if (_fontOffsets.scaleY !== 1) {
                        point.scale.y = _fontOffsets.scaleY;
                    }

                } else {

                    /// Proxy for 9 and 33, Invert given values (if positive convert to negative and vice versa)
                    if ((app_id === "9" || app_id === "33") && (_applicationObj.type !== "mascot" && _applicationObj.type !== "logo")) {

                        _xOffset = parseFloat(_fontSizeData.xOffset);
                        _yOffset = parseFloat(_fontSizeData.yOffset);

                        var _proxyId;
                        var _proxyPerspective;

                        if (app_id === "9") {
                            _proxyId = 10;
                            if (view.perspective === "right") {
                                _proxyPerspective = "left";
                            } else {
                                _proxyPerspective = view.perspective;
                            }
                        }

                        if (app_id === "33") {
                            _proxyId = 32;
                            if (view.perspective === "right") {
                                _proxyPerspective = "left";
                            }
                            else {
                                _proxyPerspective = view.perspective;
                            }
                        }

                        var _fontOffsets = ub.funcs.getFontOffsets(args.font_name, args.fontSize, _proxyPerspective, _proxyId);

                        if (_fontOffsets.offsetX > 0) {

                            point.position.x += (_fontOffsets.offsetX * -1);

                        } else if (_fontOffsets.offsetX < 0) {

                            point.position.x += (_fontOffsets.offsetX * _fontOffsets.offsetX);

                        }

                        point.position.y += _fontOffsets.offsetY;

                        if (_fontOffsets.scaleX !== 1) {
                            point.scale.x = _fontOffsets.scaleX;
                        }

                        if (_fontOffsets.scaleY !== 1) {
                            point.scale.y = _fontOffsets.scaleY;
                        }

                        point.position.x -= _xOffset;
                        point.position.y -= _yOffset;

                        /// Calculated Mirror and Override

                    }

                }

            }

            /// Rotation Overrides

            // Angle Rotation for Team Name

            if (typeof args.applicationObj !== "undefined" && args.applicationObj.angle === "rotated") {

                point.rotation = -0.25;

            }

            // End Angle Rotation for Team Name

            if ((app_id === '9' || app_id === '33') && _applicationObj.type === 'mascot') {

                if (args.mascot.typographic === "0") {

                    point.scale.x = Math.abs(point.scale.x) * -1;

                }

            }

            /// Sublimation Override - Wrestling ///

            //  if (ub.data.freeFormToolEnabledSports.isValid(ub.current_material.material.uniform_category))  {

            if (typeof view.application.scale !== "undefined") {

                point.scale = view.application.scale;

            }

            // Mascot Facing Override

            var _mov = false;

            if (typeof args.mascot !== "undefined" && ub.config.sport === "Football") {
                _mov = ub.data.flippedMascots.getCode(args.mascot.id) && (app_id === '10' || app_id === '9');
            }
            if (typeof args.mascot !== "undefined" && ub.config.sport === "Fastpitch") {
                _mov = ub.data.flippedMascots.getCode(args.mascot.id) && (app_id === '9');
            }
            if (typeof args.mascot !== "undefined" && ub.config.sport === "Basketball" && ub.data.flippedMascots.getCode(args.mascot.id)) {
                _mov = ub.data.flippedMascots.getCode(args.mascot.id) && (app_id === '16');
            }
            if (typeof args.mascot !== "undefined" && ub.config.sport === "Basketball" && args.mascot.id === '1096') {
                _mov = args.mascot.id === '1096' && (app_id === '17');
            }
            if (typeof args.mascot !== "undefined" && ub.config.sport === "Basketball" && args.mascot.id === '584') {
                _mov = (app_id === '16');
            }

            if (typeof args.mascot !== "undefined" && ub.config.sport === "Baseball") {
                _mov = ub.data.flippedMascots.getCode(args.mascot.id) && (app_id === '9');
            }

            if (typeof args.mascot !== "undefined" && ub.funcs.isSocks() && args.mascot.id === '1096') {
                _mov = (app_id === '72');
            }
            if (typeof args.mascot !== "undefined" && ub.funcs.isSocks() && ub.data.flippedMascots.getCode(args.mascot.id)) {
                _mov = (app_id === '71');
            } // 71 should always be in left perspective

            if (_mov) {

                view.application.flip = 1;

            }

            if (view.application.flip === 1) {

                //point.scale.x *= -1;
                _.each(point.children, function (child) {
                    child.scale.x = Math.abs(child.scale.x) * -1;
                });

            } else {

                view.application.flip = 0;
                //point.scale.x = Math.abs(point.scale.x);
                _.each(point.children, function (child) {
                    child.scale.x = Math.abs(child.scale.x);
                });

            }

            //   }

            /// End Sublimation Override - Wrestling ///

            if (ub.funcs.isCurrentSport('Football') && _applicationObj.type === 'mascot') {

                ub.funcs.adjustMascotPerBlockPattern(app_id, point, view.perspective);

            }

            if (ub.funcs.isCurrentSport('Football') && _applicationObj.type !== 'mascot') {

                ub.funcs.adjustFontPerBlockPattern(app_id, point, view.perspective);

            }

            if (ub.funcs.isMacintosh()) {

                if (ub.funcs.getCurrentUniformCategory() === 'Football') {

                    if (app_id === '2' || app_id === '5') {

                        if (_applicationObj.type !== 'mascot' && _applicationObj.type !== 'free') {

                            var _fontArrayToBeAdjusted = ['Yard Line', 'HAWKS', 'Spartans'];

                            if (_.includes(_fontArrayToBeAdjusted, args.font_name)) {

                                var _macFontSettings = ub.data.macFonts.getSettings(args.font_name, args.fontSize);

                                if (typeof _macFontSettings !== 'undefined') {

                                    if (args.font_name === args.font_name) {

                                        point.position.y += _macFontSettings.yOffset;
                                        point.scale = _macFontSettings.scale;

                                    }

                                }

                            }

                        }

                    }

                }

            }

            // This will be used for the 1-inch Pull-up
            _settingsObject['originalPosition_' + view.perspective] = {x: point.position.x, y: point.position.y};

        });

        ub.funcs.identify(app_id);

        // Do not run mascot pull ups if just coming from mascot change color, only on initial render

        var _fromChangeColor = undefined;
        if (args.fromChangeColor) {
            _fromChangeColor = true;
        }

        // End do not run from change color

        ub.funcs.runAfterUpdate(app_id, _fromChangeColor);

        ub.funcs.fixAlignments();
        ub.funcs.mirrorRotation();

        return sprite_collection;

    };

    ub.funcs.adjustFontPerBlockPattern = function (id, sprite, perspective) {

        if (ub.current_material.material.block_pattern === "ARIZONA") {

            if ((id === '9' || id === '10') && (perspective === "back")) {

                if (id === '9') {
                }
                if (id === '10') {
                }

            }

        }

    };

    ub.funcs.adjustMascotPerBlockPattern = function (id, sprite, perspective) {

        // if (ub.current_material.material.block_pattern === "INFUSED 14") {

        //     if ((id === '9' || id === '10') && (perspective === "front" || perspective === "back")) {

        //         if (perspective === 'front') {

        //             if (id === '9') {

        //                 sprite.position.x += 3;

        //             }

        //             if (id === '10') {

        //                 sprite.position.x -= 2;

        //             }

        //         }

        //         if (perspective === 'back') {

        //             if (id === '10') {

        //                 sprite.position.x += 18;

        //             }

        //             if (id === '9') {

        //                 sprite.position.x -= 13;

        //             }

        //         }

        //     }

        // }

    };

    // End Render Application
    // Init Click

    $('#init_applications').on("click", function (e) {

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

        _.each(shapes, function (shape) {

            if (shape.applications_properties === null) {
                return
            }
            ;
            if (shape.applications_properties === "") {
                return
            }
            ;

            var app_properties = JSON.parse(shape.applications_properties.slice(1, -1));

            if (app_properties !== null) {

                _.each(app_properties, function (obj) {

                    if (typeof apps_transformed[shape.name] === "undefined") {

                        apps_transformed[shape.name] = {
                            name: shape.name,
                        };

                    }

                    if (typeof apps_transformed[shape.name][obj.id] === 'undefined') {

                        apps_transformed[shape.name][obj.id] = {
                            id: obj.id.toString(),
                            name: obj.name,
                            views: [],
                            layer: shape.name,
                            type: obj.name.toCodeCase()
                        };

                    }

                    apps_transformed[shape.name][obj.id].views.push({
                        perspective: shape.perspective,
                        application: obj,
                    });

                    apps_one_dimensional.push(apps_transformed[shape.name][obj.id]);

                });

            }

        });

        ub.data.applications_transformed_one_dimensional = _.uniq(ub.data.applications_transformed_one_dimensional);

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

            if ((polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                isInside = !isInside;
            }

        }

        return isInside;

    }

    ub.funcs.isWithin = function (point, boundaries) {

        var _transformed_boundaries = [];

        if (ub[ub.active_view + '_view'].scale.x === 0.5) {

            _.each(boundaries, function (point) {

                var p = new PIXI.Point((point.x * 0.5) + ub.offset.x, (point.y * 0.5) + ub.offset.y);
                _transformed_boundaries.push(p);

            });

        }
        else {

            _.each(boundaries, function (point) {

                var p = new PIXI.Point((point.x * 0.7) + ub.offset.x, (point.y * 0.7) + ub.offset.y);
                _transformed_boundaries.push(p);

            });

        }

        return ub.funcs.pointIsInPoly(point, _transformed_boundaries);

    }
    ub.funcs.withinMaterialOption = function (point) {

        var _results = [];

        var _materialOptions = ub.data.boundaries_transformed_one_dimensional[ub.active_view];

        _.each(_materialOptions, function (_materialOption) {

            var result = ub.funcs.isWithin(point, _materialOption.polygon, ub.active_view);

            if (result) {
                _results.push(_materialOption);
            }

        });

        return _results;

    }

    ub.funcs.resetInteracted = function () {

        ub.interacted = {

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

        _.each(ub.objects[ub.active_view + "_view"], function (object) {

            if (typeof object.name === "undefined") {
                return;
            }

            if (object.name !== null) {

                if (object.name.indexOf('pattern_') !== -1 || object.name.indexOf('objects_') !== -1) {

                    if (object.name.indexOf(_match) !== -1) {

                        if (_match === 'body' && object.name === 'pattern_back_body') {
                            ub.funcs.setAlphaOff(object);
                            return;
                        }

                        ub.funcs.setAlphaOn(object);

                        return;

                    }

                    if (object.name.indexOf('objects_') !== -1 && _.size(ub.current_material.settings.applications) !== 0) {

                        var _app_id = object.name.replace('objects_', '');
                        var _application_obj = ub.current_material.settings.applications[_app_id];
                        var _app_layer = _application_obj.application.layer.toCodeCase();

                        if (_app_layer.indexOf(_match) !== -1) {
                            ub.funcs.setAlphaOn(object);

                            return;

                        }

                    }

                    /// Do not turn off application when its being moved by the move tool

                    var _app_id = object.name.replace('objects_', '');

                    if (_app_id === ub.activeApplication) {

                        ub.funcs.setAlphaOn(object);
                        return;

                    }

                    if (typeof object.ubName !== "undefined") {

                        console.log(object.ubName);

                    }

                    ub.funcs.setAlphaOff(object);

                }

            }

        });

    };

    // This is used before uploading the thumbnails
    ub.funcs.fullResetHighlights = function () {

        _.each(ub.current_material.materials_options, function (mo) {

            var _moName = mo.name.toCodeCase();

            if (_moName === "guide") {
                return;
            }

            var _obj = ub.objects[mo.perspective + '_view'][_moName];
            _obj.alpha = ub.ALPHA_ON;

        });

        _.each(ub.views, function (_view) {

            _.each(ub.objects[_view + "_view"], function (object) {

                if (typeof object !== "undefined") {

                    if (object.name === null) {
                        return;
                    }
                    if (object.name === "guide") {
                        return;
                    }

                    if (object.name.indexOf('pattern_') !== -1 || object.name.indexOf('objects_') !== -1 && object.name.indexOf(ub.active_part) === -1) {

                        object.alpha = ub.ALPHA_ON;

                    }

                }

            });

        });

    };

    ub.funcs.resetHighlights = function () {

        ub.funcs.resetInteracted();

        $("#primary_options_header").html('');
        var _materialOptions = ub.data.boundaries_transformed_one_dimensional[ub.active_view];

        _.each(_materialOptions, function (_materialOption) {

            var _name = _materialOption.name.toCodeCase();
            var _object = ub.objects[ub.active_view + '_view'][_name];

            // do not include Guide layers on reset
            if (_name === "guide") {
                return;
            }

            ub.funcs.setAlphaOn(_object, _object.name);
            ub.active_part = undefined;

        });

        _.each(ub.objects[ub.active_view + "_view"], function (object) {

            if (object.name === null) {
                return;
            }

            // do not include Guide layers on reset
            if (object.name === "guide") {
                return;
            }

            if (typeof object.name === "undefined") {
                return;
            }

            if (object.name.indexOf('pattern_') !== -1 || object.name.indexOf('objects_') !== -1 && object.name.indexOf(ub.active_part) === -1) {

                ub.funcs.setAlphaOn(object);

            }

        });

    };

    ub.funcs.create_plugins = function (match, mode, matchingSide) {

        $('#primary_options_colors').html("<input type='text' id='primary_text' style='float: left; margin-top: -2px;'></input>");
        $('a.btn_tabs[data-type="smiley"]').click();

        if (mode === 'single') {

            var _str = '';
            _str = '<div class="primary_header">Color </div>';
            _str += "<input type='text' id='primary_text' style='float: left; margin-top: -2px;'></input>";

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

        if (typeof _object === 'undefined') {
            return;
        }

        _object.alpha = ub.ALPHA_ON;

        var _other_views = _.without(ub.views, ub.active_view);

        _.each(_other_views, function (_view) {

            if (typeof ub.objects[_view + "_view"][_object.name] !== "undefined") {

                _complementary_object = ub.objects[_view + "_view"][_object.name];
                _complementary_object.alpha = ub.ALPHA_ON;

            }

        });

    }

    ub.funcs.setAlphaOff = function (_object) {

        _object.alpha = ub.ALPHA_OFF;

        var _other_views = _.without(ub.views, ub.active_view);

        _.each(_other_views, function (_view) {

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

                if (typeof ub.interacted.previous.name !== "undefined" && typeof ub.interacted.previous.name !== undefined) {

                    var previous_name = ub.interacted.previous.name.replace('right_', '').replace('left_', '');
                    var actual = _match.replace('right_', '').replace('left_', '');

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

            if (_match.indexOf('left_') !== -1) {

                _matching_side = _match.replace('left_', 'right_');
                var _matching_object = ub.objects[ub.active_view + '_view'][_matching_side];
                ub.funcs.setAlphaOn(_matching_object);
                ub.funcs.create_plugins(_match, 'withMatch', _matching_side);

            } else if (_match.indexOf('right_') !== -1) {

                _matching_side = _match.replace('right_', 'left_');

                var _matching_object = ub.objects[ub.active_view + '_view'][_matching_side];
                ub.funcs.setAlphaOn(_matching_object);
                ub.funcs.create_plugins(_match, 'withMatch', _matching_side);

            }
            else {

                ub.funcs.create_plugins(_match, 'single');

            }
            /// End Matching Side

            _header_text = ub.active_part.toTitleCase().replace('Left ', '').replace('Right ', '');

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

    ub.funcs.clickOutside = function () {

        ub.states.canDoubleClick = false;
        ub.funcs.resetHighlights();
        ub.funcs.deactivateMoveTool();

    }

    ub.funcs.hideVisiblePopups = function () {

        if ($('div.slider-container').is(':visible')) {
            $('div.slider-container').hide();
        }

    }

    ub.funcs.transformedBoundaries = function () {

        ub.data.boundaries_transformed = {};

        var material_options = ub.current_material.materials_options;
        var shapes = _.filter(material_options, {setting_type: 'shape'});
        var boundaries_transformed = ub.data.boundaries_transformed;
        var boundaries_one_dimensional = ub.data.boundaries_transformed_one_dimensional;

        _.each(shapes, function (shape) {

            var boundary_properties = JSON.parse(shape.boundary_properties.slice(1, -1));

            shape.angle = boundary_properties[0].angle;
            shape.patternOffsetX = boundary_properties[0].px;
            shape.patternOffsetY = boundary_properties[0].py;

            if (boundary_properties !== null) {

                if (typeof boundaries_transformed[shape.name] === "undefined") {

                    boundaries_transformed[shape.name] = {
                        name: shape.name,
                        views: [],
                    };

                }

                var cObj = {
                    perspective: shape.perspective,
                    bounding_box: {
                        topLeft: boundary_properties['topLeft'],
                        topRight: boundary_properties['topRight'],
                        bottomLeft: boundary_properties['bottomLeft'],
                        bottomRight: boundary_properties['bottomRight'],
                    }
                };

                boundaries_transformed[shape.name].views.push(cObj);
                boundaries_one_dimensional[shape.perspective].push({

                    name: shape.name,
                    alias: shape.name.replace('Left ', '').replace('Right ', ''),
                    boundaries: cObj,
                    layer_no: shape.layer_level,
                    group_id: shape.group_id,
                    polygon: boundary_properties,

                });

            }

        });

        ub.stage.on('mousedown', function (mousedata) {

            if (!ub.data.useScrollingUI) {
                if (ub.tools.activeTool.active()) {
                    return;
                }

                if (ub.status.fullView.getStatus()) {

                    if (ub.status.fullViewZoom.getStatus()) {

                        // Turn Off Full View Zoom
                        ub.funcs.resetZoom();
                        ub.status.fullViewZoom.setStatus(false, undefined);

                    } else {

                        // Zoom View Depending on the area that was clicked
                        ub.funcs.resetZoom();

                        var _view = ub.funcs.getZoomView(mousedata.data.global)

                        if (typeof _view !== "undefined") {

                            ub.funcs.hideViews();
                            ub.funcs.zoomView(_view);

                        }

                        ub.status.fullViewZoom.setStatus(true, _view);

                    }

                    return;

                }

                if (ub.zoom) {

                    ub.zoom_off();
                    return;

                }

                ub.funcs.hideVisiblePopups();

                if (typeof ub.activeApplication !== "undefined") {
                    return;
                }

                var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);
                var _sizeOfColorsUsed = _.size(ub.data.colorsUsed);

                if (_sizeOfTeamColors < _sizeOfColorsUsed || _sizeOfTeamColors > 8) {

                    //if(_sizeOfTeamColors < _sizeOfColorsUsed){
                    if (_sizeOfTeamColors < 2) {
                        ub.startModal(1);
                        return;
                    }

                    if (!ub.branding.useAllColors) {
                        if (_sizeOfTeamColors > 8) {
                            ub.startModal(2);
                            return;
                        }
                    }
                }

                /// Check if CW if empty, draw Pickers if it is
                if ($('div#cw').length) {
                    if ($('div#cw').html().length === 0) {

                        ub.funcs.drawColorPickers();

                    }
                }

                var current_coodinates = mousedata.data.global;
                var results = ub.funcs.withinMaterialOption(current_coodinates);

                if (results.length > 0) {

                    ub.states.canDoubleClick = true;

                    var _originalName = _.first(results).name;

                    // if(_originalName.indexOf('Front') > -1) { $('a.change-view[data-view="front"]').trigger('click'); }
                    // if(_originalName.indexOf('Back') > -1) { $('a.change-view[data-view="back"]').trigger('click'); }
                    // if(_originalName.indexOf('Left') > -1) { $('a.change-view[data-view="left"]').trigger('click'); }
                    // if(_originalName.indexOf('Right') > -1) { $('a.change-view[data-view="right"]').trigger('click'); }

                    var _match = _.first(results).name.toCodeCase();
                    var _result = _match.replace('right_', 'left_');
                    var _obj = _.find(ub.data.modifierLabels, {fullname: _result});
                    var _index = ub.funcs.getIndexByName(_result);

                    ub.funcs.activatePartByIndex(_index);

                }
                else {

                    ub.funcs.clickOutside();

                }
            }

        });

        ub.stage.on('mousemove', function (mousedata) {

            ub.funcs.stageMouseMove(mousedata);

        });

    }

    ub.funcs.stageMouseMove = function (mousedata) {

        var current_coodinates = mousedata.data.global;

        ub.mouse = {

            x: mousedata.data.global.x,
            y: mousedata.data.global.y,

        };

        if (ub.zoom) {

            if (current_coodinates.x < (ub.front_view.width / 2)) {

                ub[ub.active_view + '_view'].position.set(-current_coodinates.x + ub.offset.x, -current_coodinates.y + ub.offset.y);

            } else {

                ub[ub.active_view + '_view'].position.set(-(ub.front_view.width / 2) + ub.offset.x, -current_coodinates.y + ub.offset.y);

            }

            return;

        }

        if (ub.tools.activeTool.active()) {
            ub.funcs.resetHighlights();
            $('body').css('cursor', 'pointer');
            return;
        } else {

            $('body').css('cursor', 'auto');

        }

        if (!ub.status.render.getRenderStatus()) {
            return;
        }
        if (ub.funcs.popupTest()) {
            return;
        }

        if (ub.status.fullView.getStatus()) {

            if (!ub.status.fullViewZoom.getStatus()) {

                // Zoom View Depending on the area that was clicked

                ub.funcs.resetZoom();
                ub.funcs.getZoomView(mousedata.data.global);

                var _view = ub.funcs.getZoomView(mousedata.data.global)

                if (typeof _view !== "undefined") {

                    ub.funcs.partialZoomOut();
                    ub.funcs.partialZoomView(_view);

                }

            } else {

                // Pan
                var _view = ub.status.fullViewZoom.getView();
                ub.funcs.setZoomOutPointer();

                if (typeof _view !== "undefined") {

                    if (mousedata.data.global.x < (_view.width / 2)) {

                        _view.position.set(_view.position.x, -mousedata.data.global.y + 300);

                    } else {

                        _view.position.set(_view.position.x, -mousedata.data.global.y + 300);

                    }

                }

            }

            return;

        }

        if (ub.data.rosterInitialized) {

            ub.funcs.resetHighlights();
            return;

        }


        if (typeof ub.activeApplication !== "undefined") {

            $('body').css('cursor', 'pointer');

        }

        if ($('div#primaryMascotPopup').is(":visible")) {
            return;
        }

        if (ub.status.manipulatorDown) {
            return;
        }
        if (ub.active_lock) {
            return;
        }
        if (ub.zoom) {
            return;
        }

        var results = ub.funcs.withinMaterialOption(current_coodinates);

        if (results.length > 0) {

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

                    _matching_side = _match.replace('left_', 'right_');
                    var _matching_object = ub.objects[_active_view][_matching_side];
                    ub.funcs.setAlphaOn(_matching_object);

                    if (typeof ub.objects[_active_view]['pattern_' + _matching_side] !== 'undefined') {

                        ub.funcs.setAlphaOn(ub.objects[_active_view]['pattern_' + _matching_side]);

                    }

                } else if (_match.indexOf('right_') !== -1) {

                    _matching_side = _match.replace('right_', 'left_');

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

                tempName = name.replace('left_', 'right_');

            }
            else {

                tempName = name.replace('right_', 'left_');

            }

            var _obj = _.find(ub.data.modifierLabels, {fullname: tempName});

            _index = _obj.index;

        }

        return _index;

    };

    /// End Transformed Boundary Properties

    /// Get Primary View of Application, TODO: Set this on the backend primary_view, boolean

    ub.funcs.getPrimaryViewObject = function (application) {

        var view = undefined;

        _.each(application.views, function (v) {

            if (v.application.isPrimary === 1) {

                view = v;

            }

        });

        if (typeof view === "undefined") {

            console.warn('No Primary View Set for application: ');
            console.warn(application);

        }

        return view;

    }


    ub.funcs.getPrimaryView = function (application) {

        var view = undefined;

        _.each(application.views, function (v) {

            if (v.application.isPrimary === 1) {

                view = v.perspective;

            }

        });

        if (typeof view === "undefined") {

            console.warn('No Primary View Set for application: ');
            console.warn(application);

        }

        return view;

    }

    /// End Get Primary View

    /// Get Modifier Labels

    ub.funcs.get_modifier_labels = function () {

        var _modifierLabels = ub.data.modifierLabels;
        var _hideBody = ub.config.hiddenBody;

        _.each(ub.current_material.options_distinct_names, function (_distinct_name) {

            var _result = _distinct_name.modifier_label;
            var _obj = _.find(ub.current_material.materials_options, {name: _result.toTitleCase()});

            if (typeof _obj === 'undefined') {
                return;
            }

            if (_obj.setting_type === 'static_layer') {
                return;
            }
            if (_obj.setting_type === 'mesh_highlights') {
                return;
            }
            if (_obj.setting_type === 'mesh_shadows') {
                return;
            }

            if (_obj.name === "Extra") { return; }
            if (_obj.name === "Extra Left Cowl") { return; }
            if (_obj.name === "Extra Right Cowl") { return; }

            if (_hideBody) {

                if (_obj.name === "Body") {
                    return;
                }

            }

            var _group_id = _obj.group_id;
            var _team_color_id = _obj.team_color_id;

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

        // omit `neck_tape_1` on ub.data.modifierLabels
        var labelsToHide = ['neck_tape_2'];
        ub.data.modifierLabels = ub.data.hideMaterialOptionOnSportModifierLabels.isValid(ub.config.sport, ub.data.modifierLabels, labelsToHide);

        var strBuilder              = '';
        var _moCount                = _.size(ub.data.modifierLabels);

        _.each(ub.data.modifierLabels, function (ml) {

            ml.intGroupID = parseInt(ml.group_id);

        });

        var _sortedModifierLabels = _.sortBy(ub.data.modifierLabels, 'intGroupID');

        $pd = $('div#parts_dropdown');

        var _ctr = 1;

        /// For Team Colors

        strBuilder += '<div class="pd-dropdown-links" data-ctr="0" data-group-id="0" data-fullname="team-colors" data-name="team-colors">' + '<i>Initialize</i> Team Colors</div>';

        _.each(_sortedModifierLabels, function (label) {

            label.index = _ctr;

            var _groupTemp = '';

            if (_.contains(ub.fontGuideIDs, window.ub.valid)) {

                _groupTemp = ' (' + label.group_id + ') ';

            }

            var _tempLabel = label.name;

            if (_tempLabel === "Body Left")     { _tempLabel = "Left Body"; }
            if (_tempLabel === "Body Right")    { _tempLabel = "Right Body"; }
            if (_tempLabel === "Neck Tape 1")   { _tempLabel = "Neck Tape"; }

            strBuilder += '<div class="pd-dropdown-links" data-ctr="' + _ctr + '" data-group-id="' + label.group_id + '" data-fullname="' + label.fullname + '" data-name="' + _tempLabel + '">' + '<i>' + _ctr + ' of ' + _moCount + '</i> ' + _tempLabel + _groupTemp + '</div>';
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

            if (!ub.data.useScrollingUI) {
                var _group_id = $(this).data('group-id');
                var _fullname = $(this).data('fullname');
                var _name = $(this).data('name');
                var _ctr = $(this).data('ctr');
                var _ht = _name;
                var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);
                var _patternActivated = false;

                ub.current_part = _ctr;
                ub.funcs.clearPatternUI();

                _patternActivated = ub.funcs.activatePatterns();

                if (!_patternActivated) {
                    ub.funcs.activateColorPickers();
                }

                if (_fullname === 'team-colors' || _sizeOfTeamColors <= 1) {

                    // Add `thread_colors` flag in ub.current_material.settings
                    // if the category of uniform is `Socks (Apparel)`
                    // and base on the truthiness of the flag, thread colors will be used
                    if (_.isEqual(ub.current_material.material.uniform_category, 'Socks (Apparel)')
                        && ub.funcs.isKnitted()) {

                        if (_.isEqual(ub.page, 'builder')
                            || ub.current_material.settings.threadColors === 'undefined') {

                            ub.current_material.settings.threadColors = true;

                        }

                    }

                    ub.funcs.initTeamColors();
                    $pd.hide();
                    $('div#right-main-window').css('overflow', 'hidden');

                    return;

                }

                ub.funcs.deactivateMoveTool();

                if ($('div#cw').length) {
                    if ($('div#cw').html().length === 0) {
                        ub.funcs.drawColorPickers();
                    }
                }

                ub.funcs.moveToColorPickerByIndex(_ctr - 1);

                if (_patternActivated) {
                    $('#color-wheel-container').hide();
                }

                ub.active_part = _fullname;

                var _htTemp = _ht;

                if (_ht === "Left Body")    { _htTemp = 'Body Left'; }
                if (_ht === "Right Body")   { _htTemp = 'Body Right'; }
                if (_ht === "Neck Tape")    { _htTemp = "Neck Tape 1"; }

                if (typeof _.find(ub.data.modifierLabels, {'name': _htTemp}) !== 'undefined') {

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

                if (ub.funcs.isSocks() && ub.data.afterLoadCalled === 1) {

                    var _set = _fullname.toString().toTitleCase();

                    if (typeof ub.current_material.settings.randomFeeds[_set] !== "undefined") {

                        var _enabled = ub.current_material.settings.randomFeeds[_set].enabled;

                        if (parseInt(_enabled) === 1) {

                            ub.funcs.activateRandomFeeds(_set);

                            return;

                        }

                    }

                }
            }

        });

        $("div.pd-dropdown-links").hover(
            function () {
                $(this).addClass("pdHover");
            }, function () {
                $(this).removeClass("pdHover");
            }
        );

    };

    ub.funcs.activatePartByIndex = function (index) {

        $('div.pd-dropdown-links[data-ctr="' + index + '"]').click();

    }

    ub.funcs.moveToNextMaterialOption = function () {

        var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);

        if (!ub.branding.useAllColors) {
            if (_sizeOfTeamColors > 8) {
                ub.startModal();
                return;
            }
        }

        // if ($('div#cw').html().length === 0) {
        //         ub.funcs.drawColorPickers();
        // }

        var _currentPart = ub.current_part;
        var _moCount = _.size(ub.data.modifierLabels);
        var _next_label = $('span.next_label').html();

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

            ub.funcs.initOrderProcess();

        }

    };

    ub.funcs.getCurrentUniformCategory = function () {


        return ub.current_material.material.uniform_category;

    }

    ub.funcs.moveToPrevMaterialOption = function () {

        if ($('div#primaryQuickRegistrationPopup').is(':visible')) {
            return;
        }

        var _currentPart = ub.current_part;
        var _moCount = _.size(ub.data.modifierLabels);

        // if ($('div#cw').html().length === 0) {
        //     ub.funcs.drawColorPickers();
        // }

        if (_currentPart >= 1) {

            ub.current_part -= 1;
            $('div.pd-dropdown-links[data-ctr=' + ub.current_part + ']').click();
            $('button#next_mo').css('background-color', '#3d3d3d');

        }

        if (ub.current_part < 0) {
            ub.current_part = 0
        }
        ;

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

        var _group_items = _.filter(ub.data.modifierLabels, {team_color_id: groupID});

        _.each(_group_items, function (group_item) {

            if (typeof ub.data.materialOptionWithLimitedColors.getLimitedColorSet(group_item.name) === "undefined") {

                ub.funcs.ui.setMaterialOptionColor(group_item.name, colorObj);

            }

        });

        var _applications = ub.current_material.settings.applications;

        if (groupID === '2') {

            _.each(_applications, function (application) {

                if (application.application_type !== "embellishments" && application.application_type !== "mascot" && application.application_type !== "logo" && application.application_type !== "free") {

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

    ub.funcs.getPatternByID = function (id) {

        var _patternObject = _.find(ub.data.patterns.items, {id: id.toString()});
        return _patternObject;

    }

    ub.funcs.activateColorPickers = function () {

        ub.funcs.clearPatternUI();
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();
        ub.funcs.activeStyle('colors');

        $('#color-wheel-container').fadeIn();

    }

    ub.funcs.deActivateColorPickers = function () {

        $('#color-wheel-container').hide();

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


    ub.funcs.hexCodeToTintColor = function (hexCode) {

        var _hexCode = hexCode;
        var _tintColor = parseInt(hexCode, 16);

        return _tintColor;

    }


    ub.funcs.getColorUsedByIndex = function (index) {

        var _index = parseInt(index);
        var _colorObj = _.find(ub.data.colorsUsed, {teamColorID: _index});

        if (typeof _colorObj === "undefined") {

            _colorObj = undefined;

        }

        return _colorObj;

    };

    ub.funcs.getTeamColorObjByIndex = function (index) {

        var _index = parseInt(index);
        var _colorObj = ub.current_material.settings.team_colors[_index - 1];

        if (typeof _colorObj === "undefined") {

            _colorObj = undefined;

        }

        return _colorObj;

    };

    ub.funcs.hideOtherPanels = function () {

        ub.funcs.hidePipingFunctions();
        ub.funcs.hiderandomFeedsTool();

    }

    ub.funcs.activeStyle = function (tab) {

        $('a.change-view[data-view="colors"]').removeClass('active-change-view');
        $('a.change-view[data-view="layers"]').removeClass('active-change-view');
        $('a.change-view[data-view="randomFeed"]').removeClass('active-change-view');
        $('a.change-view[data-view="patterns"]').removeClass('active-change-view');
        // Aron Joshua
        $('a.change-view[data-view="inserts"]').removeClass('active-change-view');

        $('a.change-view[data-view="' + tab + '"]').addClass('active-change-view');

    }

    ub.funcs.translateAngle = function (inputAngle) {

        var _outputAngle = inputAngle / 360;
        _outputAngle = _outputAngle * 619;
        _outputAngle = _outputAngle / 100;

        return _outputAngle;

    };

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

        var _wWidth = window.innerWidth;
        var _wHeight = window.innerHeight;
        var _pWidth = $popup.width();
        var _pHeight = $popup.height();

        var _left = (_wWidth - _pWidth) / 2;
        var _top = (_wHeight - _pHeight) / 2;

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

        ub.funcs.centerPatternPopup();

        var _wWidth = window.innerWidth;
        var _wHeight = window.innerHeight;
        var _pWidth = $popup.width();
        var _pHeight = $popup.height();

        var _left = (_wWidth - _pWidth) / 2;
        var _top = (_wHeight - _pHeight) / 2;

        $popup.css({

            top: _top,
            left: _left,

        })

    };

    ub.funcs.removeApplicationByID = function (id) {

        _.each(ub.data.views, function (view) {

            var _viewName = view + '_view';

            var _object = ub.objects[_viewName]['objects_' + id];

            if (typeof _object !== "undefined") {
                _object.ubHover = false;
                _object.destroy();
                ub[_viewName].removeChild(_object);
            }

        });

    }

    ub.funcs.changeFontFromPopup = function (fontId, settingsObj) {

        if (settingsObj.status === "off") { return; }
        var _fontObj = _.find(ub.data.fonts, {id: fontId.toString()});
        var _id = settingsObj.code;
        var _length = 'short';

        ub.funcs.removeApplicationByID(_id);
        settingsObj.font_obj = _fontObj;
        ub.create_application(settingsObj, undefined);

        $popup = $('div#primaryFontPopup');
        $popup.remove();
        ub.status.fontPopupVisible = false;

    }

    ub.funcs.changeAccentFromPopup = function (accentID, settingsObj) {

        var _accentObj = _.find(ub.data.accents.items, {id: parseInt(accentID)});
        var _id = settingsObj.id;

        ub.funcs.removeApplicationByID(_id);

        /// Set Default Colors

        var _firstLayer = _.find(_accentObj.layers, {layer_no: 1});
        _firstLayer.default_color = ub.current_material.settings.team_colors[1].hex_code;

        if (_accentObj.layers.length >= 4) {

            var _secondLayer = _.find(_accentObj.layers, {layer_no: 1});
            var _color = ub.funcs.getColorByColorCode('B').hex_code;

            if (ub.current_material.settings.team_colors.length >= 3) {
                _color = ub.current_material.settings.team_colors[2].hex_code;
            }

            _secondLayer.default_color = _color;

        }

        /// End Set Default Colors


        /// Process new Colors

        var _toggle = false;

        var colorArray = [];
        var colorArrayText = [];

        _.each(_accentObj.layers, function (layer) {

            var _hexCode = layer.default_color;
            var _color = ub.funcs.getColorObjByHexCode(_hexCode);
            var _layerNo = layer.layer_no - 1;

            if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') {
                return;
            }

            if (typeof _color === 'undefined') {

                _color = settingsObj.color_array[_layerNo];

            }

            if (typeof _color === "undefined" || !ub.funcs.isInTeamColor(_color.color_code)) {

                var _index = _toggle ? 1 : 0;
                _toggle = !_toggle;

                _color = ub.current_material.settings.team_colors[_index];
                settingsObj.color_array[_layerNo] = _color;

                layer.default_color = _color.hex_code;

                if (typeof settingsObj.colorArrayText === 'undefined') {

                    settingsObj.colorArrayText = [_color.color_code];

                } else {

                    settingsObj.colorArrayText[_layerNo] = _color.color_code;

                }

            }

            colorArray.push(_color);
            colorArrayText.push(_color.color_code);

        });

        /// End Process new Colors

        settingsObj.color_array = colorArray;
        settingsObj.colorArrayText = colorArrayText;

        /// trim new colors

        var _accentObjLength = (_accentObj.layers.length - 1);

        ub.accentObj = _accentObj;

        /// end trim new colors

        /// Matching Colors

        _matchingCode = ub.data.matchingIDs.getMatchingID(settingsObj.code);

        if (typeof _matchingCode !== "undefined") {

            _matchingSettingsObject = ub.funcs.getApplicationSettings(_matchingCode.toString());

            if (typeof _matchingSettingsObject !== 'undefined') {

                _matchingSettingsObject.color_array = settingsObj.color_array;
                _matchingSettingsObject.colorArrayText = settingsObj.colorArrayText;

            }

        }

        /// End Matching Colors

        settingsObj.accent_obj = _accentObj

        ub.create_application(settingsObj, undefined);

        $popup = $('div#primaryAccentPopup');
        $popup.remove();
        ub.status.accentPopupVisible = false;

    }

    ub.funcs.changeSize = function (size, settingsObj) {

        var _id = settingsObj.id;
        ub.funcs.removeApplicationByID(_id);

        settingsObj.font_size = parseFloat(size);
        settingsObj.size = parseFloat(size);

        ub.create_application(settingsObj, undefined);

    }

    ub.status.fontPopupVisible = false;

    ub.funcs.createFontPopup = function (applicationType, sampleText, settingsObj) {

        ub.status.fontPopupVisible = true;

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

        ub.funcs.centerPatternPopup();

        $('div.fontPopupResults > div.item').hover(
            function () {
                $(this).find('div.name').addClass('pullUp');
            }, function () {
                $(this).find('div.name').removeClass('pullUp');
            }
        );

        $('div.fontPopupResults > div.item').on('click', function () {

            var _id = $(this).data('font-id');

            ub.funcs.changeFontFromPopup(_id, settingsObj);
            $popup.remove();
            ub.funcs.activateApplications(settingsObj.code)

            if (settingsObj.type === "front_number" || settingsObj.type === "back_number") {

                var _newFont = _.find(ub.data.fonts, {id: _id});

                _.each(ub.current_material.settings.applications, function (_application) {

                    if (_application.type !== settingsObj.application_type && _application.type !== "logo" && _application.type !== "mascot") {

                        if (settingsObj.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                            ub.funcs.changeFontFromPopup(_id, _application);

                        }

                    }

                });

            }

            var _matchingID = undefined;
            _matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                ub.funcs.changeFontFromPopup(_id, _matchingSettingsObject);

            }

        });

        ub.funcs.centerFontPopup();

        $('div.close-popup').on('click', function () {

            $popup.remove();
            ub.status.fontPopupVisible = false;

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
            ub.status.fontPopupVisible = false;

        });


    }


    ub.status.accentPopupVisible = false;
    ub.funcs.createAccentPopup = function (settingsObj) {

        var data = {
            accents: ub.data.accents.items,
        }

        if (ub.current_material.material.price_item_code === "FBBJ" || ub.current_material.material.price_item_code === "FBDJ") {

            data.accents = _.filter(data.accents, function (accent) {

                return accent.title !== 'Three Color with Drop Shadow' && accent.title !== 'Three Color';

            });

        }

        if (ub.current_material.material.price_item_code === "") {
        }

        ub.status.accentPopupVisible = true;

        var template = $('#m-accent-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryAccentPopup');
        $popup.fadeIn();

        $('div.accentPopupResults > div.item').hover(
            function () {
                $(this).find('div.name').addClass('pullUp');
            }, function () {
                $(this).find('div.name').removeClass('pullUp');
            }
        );

        $('div.accentPopupResults > div.item').on('click', function () {

            var _id = $(this).data('accent-id');

            ub.funcs.changeAccentFromPopup(_id, settingsObj);
            $popup.remove();
            ub.funcs.activateApplications(settingsObj.code);

            var _matchingID = undefined;
            _matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                ub.funcs.changeAccentFromPopup(_id, _matchingSettingsObject);

            }

        });

        ub.funcs.centerAccentPopup();

        $('div.close-popup').on('click', function () {

            $popup.remove();
            ub.status.accentPopupVisible = false;

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
            ub.status.accentPopupVisible = false;

        });

    }

    ub.funcs.changeTailSweepFromPopup = function (id, settingsObj, length) {

        settingsObj.tailsweep.length = length;

        ub.funcs.removeApplicationByID(settingsObj.code);
        ub.create_application(settingsObj, undefined);

        $popup = $('div#primaryTailSweepPopup');
        $popup.remove();
        ub.status.tailSweepPopupVisible = false;

    }

    ub.funcs.changeAngleFromPopup = function (id, settingsObj, angle) {

        settingsObj.angle = angle;

        ub.funcs.removeApplicationByID(id);
        ub.create_application(settingsObj, undefined);

        $popup = $('div#primaryTailSweepPopup');
        $popup.remove();
        ub.status.tailSweepPopupVisible = false;

    }

    ub.status.tailsweepPopupVisible = false;
    ub.funcs.createTailSweepPopup = function (settingsObj) {

        var _sampleText = $('input[name="sampleText"]').val();
        var _length = "short";
        var _items = _.filter(ub.data.tailSweeps, function (tailsweep) {
            return tailsweep.code === "twins" || tailsweep.code === "blank";
        });

        _length = (_sampleText.length <= 12) ? _sampleText.length : 12;

        var _isScriptFont = settingsObj.font_obj.script === "1";

        if (_isScriptFont) {

            // var _blacklist = ['twins', 'royals', 'indians', 'orioles', 'expos', 'none'];

            var _blacklist = ['twins', 'none'];

            _items = _.reject(ub.data.tailSweeps, function (ts) {
                return _.contains(_blacklist, ts.code);
            });

        }

        var data = {

            tailsweeps: _items,
            sampleText: _sampleText,

        }

        ub.status.tailsweepPopupVisible = true;

        // var template = $('#m-tailsweep-popup').html();

        var template = $('#m-tailsweep-popup-with-preview').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryTailSweepPopup');
        $popup.fadeIn();

        var _fontFamily = $('span.font_name').text();
        $('div.text-preview').css('font-family', _fontFamily);

        var $sizeButton = $('span.sizeButton');

        $sizeButton.unbind('click');
        $sizeButton.on('click', function () {

            var _size = $(this).data('size');

            $sizeButton.removeClass('active defaultShadow');
            $(this).addClass('active defaultShadow');

            var $textPreview = $('div.text-preview');

            $.each($textPreview, function (index, value) {

                var $element = $(value)
                var _tailsweepCharacter = $element.data(_size);
                var _sampleText = $element.data('sampleText');
                var _code = $element.data('tailsweep-code');

                var _char = ub.data.tailsweepCharacters.getCharacter(_code, parseInt(_size));

                if (typeof _char !== "undefined") {

                    $element.html(_sampleText + _char);

                } else {

                    $element.html(_sampleText);

                }


            });

        });

        $('div.tailSweepPopupResults > div.item').hover(
            function () {
                $(this).find('div.name').addClass('pullUp');
            }, function () {
                $(this).find('div.name').removeClass('pullUp');
            }
        );

        $('div.tailSweepPopupResults > div.item').on('click', function () {

            var _id = $(this).data('tailsweep-id');
            var _code = $(this).data('tailsweep-code');
            var _length = "short";

            _length = $('span.sizeButton.active').data('size');

            settingsObj.tailsweep = {

                id: _id,
                code: _code,
                thumbnail: _code + '.png',
                length: _length,

            };

            ub.funcs.changeTailSweepFromPopup(_id, settingsObj, _length);
            $popup.remove();
            ub.funcs.activateApplications(settingsObj.code);

            $('span.tab[data-item="tailsweeps"]').click(); // Activate Tailsweep Tab
            $('span.sizeItem').removeClass('active defaultShadow');
            $('span.sizeItem[data-size="' + settingsObj.tailsweep.length + '"]').addClass('active defaultShadow');

        });

        ub.funcs.centerPatternPopup();

        $('div.close-popup').on('click', function () {

            $popup.remove();
            ub.status.tailsweepPopupVisible = false;

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
            ub.status.tailSweepPopupVisible = false;

        });

        /// Initialize

        $('span.sizeButton[data-size="' + _length + '"]').click();

        /// End Initialize

    }

    ub.funcs.createAssistants = function (applicationObj, modifier) {


    }

    ub.funcs.activateColorPickerForApplication = function (settingsObj, layerNo, selectedColorCode) {

        $('#applicationUI').css('margin-left', '-500px');
        $('.colorItem').hide();

    }

    ub.funcs.getFontAtIndex = function (index) {

        /// Todo: put index in initial load
        var _fontList = _.filter(_.sortBy(ub.data.fonts, 'name'), {active: "1"});
        var _fontMatch = undefined;

        _.each(_fontList, function (font, fontIndex) {

            if (fontIndex === index) {

                _fontMatch = font;
                return _fontMatch;

            }

        });

        return _fontMatch;

    }

    ub.funcs.getFontObj = function (direction, activeFontObject) {

        var _fontList = _.filter(ub.data.fonts, {active: "1"});
        var _index = _.findIndex(_.sortBy(_fontList, 'name'), {name: activeFontObject.name});
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

    ub.funcs.createSmallColorPickers = function (activeColorCode, layer_no, layer_name, active_color, objectType) {

        var _html = "";
        var _cObj = ub.funcs.getColorByColorCode(activeColorCode);
        var _teamColors = ub.current_material.settings.team_colors;

        var _objectType = objectType;

        if (typeof objectType === "undefined") {
            _objectType = 'not-set';
        }

        _html = '<div class="smallPickerContainer" data-layer-no="' + layer_no + '">';
        _html += '<label class="smallColorPickerLabel" >' + layer_name + ' </label>';

        _teamColors = _.sortBy(_teamColors, "order");

        _.each(_teamColors, function (_color) {

            var _checkMark = '&nbsp;';
            var _style = "25px";
            var _class = '';
            var _colorObj = '';

            if (activeColorCode === _color.color_code) {
                _checkMark = '<i class="fa fa-check" aria-hidden="true"></i>';
                _style = "40px";
                _class = 'activeColorItem';
            }

            _colorObj = ub.funcs.getColorByColorCode(_color.color_code);
            _html += '<span style="width: ' + _style + ';background-color: #' + _colorObj.hex_code + '; color: #' + _colorObj.forecolor + ';" class="colorItem ' + _class + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type=' + _objectType + '>' + _checkMark + '</span>';

        });

        _html += '</div>';

        return _html;

    }

    ub.funcs.changeMascotSize = function (size, settingsObj, source) {

        var _id = settingsObj.id;
        ub.funcs.removeApplicationByID(_id);

        if (typeof source === "undefined") {

            var oldScale = undefined;

            if (typeof settingsObj.oldScale !== "undefined") {
                oldScale = settingsObj.oldScale;
            }

            ub.funcs.pushOldState('change mascot size', 'application', settingsObj, {
                size: settingsObj.size,
                oldScale: oldScale
            });

        }

        settingsObj.size = parseFloat(size);
        settingsObj.font_size = parseFloat(size);

        settingsObj.dirty = true;

        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot);

    }

    ub.funcs.changeMascotColor = function (colorObj, layer_no, settingsObj) {

        var _id = settingsObj.id;
        ub.funcs.removeApplicationByID(_id);

        var _layer = _.find(settingsObj.mascot.layers_properties, {layer_number: layer_no.toString()});

        if (typeof _laye !== "undefined") {

            _layer.default_color = colorObj.color_code;


        }

        settingsObj.color_array[layer_no - 1] = colorObj;

        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot, {fromChangeColor: true});

    }

    ub.funcs.substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    ub.funcs.changeMascotByID = function (mascotID, settingsObj, customFilename, additionalNotes) {

        var _id = mascotID;

        ub.funcs.changeMascotFromPopup(_id, settingsObj);
        $popup.remove();
        ub.funcs.activateMascots(settingsObj.code);

        /// Uploaded Artwork
        var _customLogo = false;
        var _customFilename = '';
        var _additionalNotes = '';

        if (typeof customFilename !== 'undefined') {

            _customLogo = true;
            _customFilename = customFilename;
            _additionalNotes = additionalNotes;

        }

        settingsObj.customLogo = _customLogo;
        settingsObj.customFilename = _customFilename;
        settingsObj.additionalNotes = _additionalNotes;

        /// Uploaded Artwork

        var _matchingID = undefined;
        var _processMatchingSide = true;

        _matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

        if (typeof _matchingID !== "undefined") {

            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});

            // On Crew Socks, only duplicate application on matching side is the matching side is blank, otherwise skip this and allow different mascots
            if (_matchingSettingsObject.type !== "free" && ub.funcs.isSocks()) {
                _processMatchingSide = false;
            }

            if (typeof settingsObj.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

                // Restore Colors if the same mascot id
                if (settingsObj.mascot.id === _matchingSettingsObject.mascot.id) {
                    _processMatchingSide = true;
                }

            }

            if (_processMatchingSide) {

                ub.funcs.changeMascotFromPopup(_id, _matchingSettingsObject);

                _matchingSettingsObject.customLogo = _customLogo;
                _matchingSettingsObject.customFilename = _customFilename;
                _matchingSettingsObject.additionalNotes = _additionalNotes;

            }

        }

        ub.funcs.activateMascots(settingsObj.code);

    }

    ub.status.mascotPopupVisible = false;
    ub.funcs.createMascotPopup = function (applicationType, mascot, settingsObj) {

        var mascot_category = undefined;
        var mascots_group_category = undefined;

        mascot_category = _.find(ub.data.mascots_categories, {name: mascot.category});
        mascots_group_category = _.find(ub.data.mascots_groups_categories, {name: mascot_category.group_name});

        ub.status.mascotPopupVisible = true;

        var sampleSize = '1.9em';
        var paddingTop = '40px';

        var data = {
            label: 'Choose Mascot: ',
            mascots: _.filter(ub.data.mascots, {active: "1", category: 'Bulldogs'}),
            categories: _.sortBy(ub.data.mascots_categories, 'name'),
            groups_categories: _.sortBy(ub.data.mascots_groups_categories, 'name'),
            paddingTop: paddingTop,
        };

        var template = $('#m-new-mascot-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryMascotPopup');
        $popup.fadeIn();

        $('div.patternPopupResults > div.item').hover(
            function () {
                $(this).find('div.name').addClass('pullUp');
            }, function () {
                $(this).find('div.name').removeClass('pullUp');
            }
        );

        var $myMascotItem = $('span.groups_category_item[data-category-name="My Mascots"]');
        if (typeof ub.user.id !== "number") {

            $myMascotItem.hide();

        } else {

            var _appendage = "<br /><em>Mascots that went through custom artwork requests will appear on the [My Mascots] category after we have processed it, so that you can use it on your other designs.</em>";
            $myMascotItem.append(_appendage);

        }

        /// Type Ahead

        var _mascotNames = _.pluck(ub.data.mascots, "name");

        $('input.mascot_search').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'Mascots',
                source: ub.funcs.substringMatcher(_mascotNames),
            });

        $('.patternPopupResults').isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });

        $('.patternPopupResults').isotope({filter: '.all'});

        $('input.mascot_search').on('change', function () {

            var _term = $(this).val().toLowerCase();
            var _mascots = _.filter(ub.data.mascots, function (mascot) {
                return mascot.name.toLowerCase().indexOf(_term.toLowerCase()) !== -1;
            });

            var data = {
                category: '',
                mascot_category_id: '',
                mascots: _mascots,
            };

            var template = $('#m-new-mascot-items').html();
            var markup = Mustache.render(template, data);

            $('div.main-content').scrollTo(0);
            $('div.patternPopupResults').html(markup);

            $('div.patternPopupResults > div.item').on('click', function () {

                var _id = $(this).data('mascot-id');

                ub.funcs.changeMascotByID(_id, settingsObj);

            });

        });

        $('span.category_item').on('click', function () {

            var _dataCategory = $(this).data('category');

            $('.patternPopupResults').isotope({filter: "." + _dataCategory});

            $('span.category_item').removeClass('active_category');
            $(this).addClass('active_category');

            $('div.patternPopupResults > div.item').hover(
                function () {
                    $(this).find('div.name').addClass('pullUp');
                }, function () {
                    $(this).find('div.name').removeClass('pullUp');
                }
            );

        });

        /// End Type Ahead

        $('div.patternPopupResults > div.item').hover(
            function () {
                $(this).find('div.name').addClass('pullUp');
            }, function () {
                $(this).find('div.name').removeClass('pullUp');
            }
        );

        $('span.groups_category_item').on('click', function () {

            var _groups_category_id = parseInt($(this).data('category'));
            var _groups_category_name = $(this).data('category-name');

            if (ub.config.toString) {
                _groups_category_id = _groups_category_id.toString();
            }

            console.log('Category ID: ' + _groups_category_id);
            console.log(typeof _groups_category_id);

            var _categories = _.filter(ub.data.mascots_categories, {mascots_group_category_id: _groups_category_id});

            console.log('Categories: ');
            console.log(_categories);

            if (_groups_category_id === "all") {

                $('div.popup_header').html("Mascots: All");
                return;

            }

            var data = {
                categories: _.sortBy(_categories, 'name'),
            };

            var template = $('#m-new-mascot-popup-categories').html();
            var markup = Mustache.render(template, data);

            $('div.popup_header').html("Mascots: " + _groups_category_name);
            $('div.categories').html(markup);

            $('div.groups_categories').hide();
            $('div.categories').fadeIn();

            $('div.patternPopupResults > div.item').hover(
                function () {
                    $(this).find('div.name').addClass('pullUp');
                }, function () {
                    $(this).find('div.name').removeClass('pullUp');
                }
            );

            $('span.category_item').unbind('click');
            $('span.category_item').on('click', function () {

                var _category_id = $(this).data('category');
                var _category_name = $(this).data('category-name');
                var _current = $('div.popup_header').html();

                $('span.category_item').removeClass('active');
                $(this).addClass('active');

                $('div.popup_header').html('MASCOTS: ' + _groups_category_name + ', ' + _category_name);

                if (_category_id === "back") {

                    $('div.categories').hide();
                    $('div.groups_categories').fadeIn();

                    $('div.popup_header').html('MASCOTS');

                    return;

                }

                var _mascots = _.filter(ub.data.mascots, {category: _category_name});

                if (_category_name === "My Mascots") {

                    var _id = ub.user.id;

                    if (typeof ub.user.id === "number") {
                        _mascots = _.filter(_mascots, function (mascot) {
                            return mascot.user_id.toString() === _id.toString() || _.contains(ub.fontGuideIDs, _id);
                        });

                    } else {

                        _mascots = _.filter(_mascots, function (mascot) {
                            return typeof mascot.user_id !== 'string';
                        });

                    }

                }

                var data = {
                    category: _category_name,
                    mascot_category_id: _category_id,
                    mascots: _.sortBy(_mascots, 'name'),
                };

                var template = $('#m-new-mascot-items').html();
                var markup = Mustache.render(template, data);

                $('div.patternPopupResults').html(markup)
                $('div.main-content').scrollTo(0);

                $('div.patternPopupResults > div.item').hover(
                    function () {
                        $(this).find('div.name').addClass('pullUp');
                    }, function () {
                        $(this).find('div.name').removeClass('pullUp');
                    }
                );

                $('div.patternPopupResults > div.item').on('click', function () {

                    var _id = $(this).data('mascot-id');

                    ub.funcs.changeMascotByID(_id, settingsObj);

                });

            });

            if (_groups_category_name === "My Mascots") {

                $('span.category_item[data-category-name="My Mascots"]').trigger('click');

            }

        });

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('mascot-id');

            ub.funcs.changeMascotByID(_id, settingsObj);
            $('div#primaryMascotPopup').remove();
            ub.status.mascotPopupVisible = false;

        });

        $('span.mascot-tab').on('click', function () {

            var _btn = $(this).data('button');

            $('span.mascot-tab').removeClass('active');
            $(this).addClass('active');

        });

        ub.funcs.centerPatternPopup();

        $('div.close-popup, span.close-popup').on('click', function () {

            $popup.remove();
            ub.status.mascotPopupVisible = false;

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
            ub.status.mascotPopupVisible = false;

        });


        /// Custom Artwork Request

        $('span[data-button="browse"]').on('click', function () {

            $('div.upload').fadeOut();

        });

        $('span[data-button="upload"]').on('click', function () {

            $('div.upload').fadeIn();

        });

        $("input#custom-artwork").change(function () {

            // if (this.files && this.files[0]) {

            //     var reader = new FileReader();

            //     console.log('This Files: ');
            //     console.log(this.files);

            //     reader.onload = function (e) {

            //         console.log('Uploaded (e): ');
            //         console.log(e);

            //         $('img#preview').attr('src', e.target.result);
            //         ub.uploadLogo(e.target.result);

            //     }

            //     reader.readAsDataURL(this.files[0]);

            // }

            if (this.files && this.files[0]) {

                var _filename = ub.funcs.fileUpload(this.files[0], settingsObj, function (filename) {

                    // TODO: Implement Assignment here to remove global variable [window.uploaded_filename]

                });

            }

        });

        $('span.ok_btn').on('click', function () {

            if ($(this).attr('data-status') === "ok") {

                ub.current_material.settings.custom_artwork = window.uploaded_filename;

                var _additionalNotes = $('textarea[name="custom-artwork-additional-notes"]').val();

                settingsObj.customLogo = true;
                settingsObj.customFilename = window.uploaded_filename;
                settingsObj.additionalNotes = _additionalNotes;

                $popup = $('div#primaryMascotPopup');
                $popup.remove();
                ub.funcs.changeMascotByID('1038', settingsObj, window.uploaded_filename, _additionalNotes);

            }

        });

        /// End Custom Artwork Request

        /// Select current mascot

        $('span.groups_category_item[data-category-name="' + mascots_group_category.name + '"]').click();
        $('span.category_item[data-category-name="' + mascot_category.name + '"]').click();
        $('div.item[data-mascot-id="' + mascot.id + '"]').addClass('active');

        if (typeof settingsObj.customFilename !== "undefined" && settingsObj.customFilename.length > 0) {

            // display uploaded file if preview is not set
            // Preview is true if theres a custom artwork but was replaced with a temp from the prepared mascot
            // see ubj@ub.funcs.customArtworkRequestCheck
            if (typeof settingsObj.preview === "undefined") {

                $('textarea[name="custom-artwork-additional-notes"]').val(settingsObj.additionalNotes);
                $('img#preview').attr('src', settingsObj.customFilename);
                $('span[data-button="upload"]').trigger('click');

            }

        }

        /// End After load Events

    }

    ub.funcs.changeMascotFromPopup = function (mascotId, settingsObj, source) {

        if (typeof source === "undefined") {

            ub.funcs.pushOldState('change mascot', 'application', settingsObj, {mascotID: settingsObj.mascot.id});

        }

        var _mascotID = mascotId.toString();
        var _mascotObj = _.find(ub.data.mascots, {id: _mascotID});
        var _id = settingsObj.id;
        var _layerCount = _.size(_mascotObj.layers_properties);

        ub.funcs.removeApplicationByID(_id);

        settingsObj.mascot = _mascotObj;

        if (_mascotID !== '1039') {

            settingsObj.color_array = ub.funcs.getDefaultColors();

            // Single Layer Mascot default
            if (_layerCount === 1) {
                settingsObj.color_array = [settingsObj.color_array[0]];
            }

        } else {

            settingsObj.color_array = [];
            settingsObj.color_array.push(ub.funcs.getColorByColorCode('W'));
            settingsObj.color_array.push(ub.funcs.getColorByColorCode('RB'));
            settingsObj.color_array.push(ub.funcs.getColorByColorCode('R'));

        }

        // Reset flip when changing new mascot
        _.each(settingsObj.application.views, function (v) {

            v.application.flip = 0;

        });

        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot);

        $popup = $('div#primaryPatternPopup, div#primaryMascotPopup');
        $popup.remove();
        ub.status.mascotPopupVisible = false;

    }

    ub.funcs.getApplicationSettings = function (id) {

        var _id = parseInt(id);

        return ub.current_material.settings.applications[_id];

    }

    ub.funcs.getThumbnailImageMascot = function (ref, id) {

        var texture = new PIXI.RenderTexture(ub.renderer, 512, 512);
        texture.render(ref, null, true);

        return texture.getImage().src;

    };

    ub.funcs.getDefaultColors = function () {

        var _colors = [];
        var _color;

        _colors.push(ub.current_material.settings.team_colors[1]);

        if (ub.current_material.settings.team_colors.length > 2) {

            _color = ub.current_material.settings.team_colors[2]

        }
        else {

            _color = ub.current_material.settings.team_colors[0]

        }

        _colors.push(_color);

        return _colors;

    };

    ub.funcs.flipMascot = function (_settingsObject) {

        var _flipped;

        _.each(_settingsObject.application.views, function (view) {

            if (typeof view.application.flip === "undefined") {

                _flipped = view.application.flip = 1;

            }
            else {

                if (view.application.flip === 0) {

                    _flipped = view.application.flip = 1;


                } else {

                    _flipped = view.application.flip = 0;

                }

            }

            var _obj = ub.objects[view.perspective + "_view"]['objects_' + _settingsObject.code];

            if (typeof _obj !== "undefined") {

                if (view.application.flip === 1) {

                    $('span.flipButton').addClass('active');

                    // _obj.scale.x *= -1;
                    _.each(_obj.children, function (child) {
                        child.scale.x *= -1;
                    });


                } else {

                    $('span.flipButton').removeClass('active');
                    // _obj.scale.x = Math.abs(_obj.scale.x);

                    _.each(_obj.children, function (child) {
                        child.scale.x = Math.abs(child.scale.x);
                    });

                }

            }

        });

        ub.funcs.pushOldState('flip', 'application', _settingsObject, {flip: _flipped === 1 ? 0 : 1});

    }

    ub.funcs.verticalText = function (_settingsObject) {

        var _vertical;

        _.each(_settingsObject.application.views, function (view) {

            if (typeof _settingsObject.verticalText === "undefined" || _settingsObject.verticalText === 0) {

                _vertical = _settingsObject.verticalText = 1;

            }
            else {

                _vertical = _settingsObject.verticalText = undefined;

            }

            var _obj = ub.objects[view.perspective + "_view"]['objects_' + _settingsObject.code];

            if (typeof _obj !== "undefined") {

                if (_settingsObject.verticalText === 1) {

                    $('span.flipButton').addClass('active');
                    ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);


                } else {

                    $('span.flipButton').removeClass('active');
                    ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

                }

            }

        });

    }

    ub.funcs.clearScale = function (settingsObj) {

        var _oldScale;

        _.each(settingsObj.application.views, function (view) {

            _oldScale = view.application.scale;

            view.application.scale = undefined;

        });

        return _oldScale;

    }

    ub.funcs.hidePanelHandler = function () {

        // $('div.options_panel_section, div.body, div.header').unbind('mousedown');
        // $('div.options_panel_section, div.body, div.header').on('mousedown', function (e) {

        //    ub.funcs.hideVisiblePopups();

        // }).on('mousedown','div.slider-container',function(e) {

        //     e.stopPropagation();

        // });

    }

    ub.funcs.initializeScalePanel = function (_settingsObject, applicationType) {

        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10
        }
        ;

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _start = (_multiplier * ub.objects[_v + '_view']['objects_' + _settingsObject.code].scale.x) / 3;

        // $('div.slider-container').hide();
        // $('div.slider-container.scale').show();

        var softSlider = document.getElementById('scale-slider');
        if (typeof softSlider.noUiSlider === "object") {

            softSlider.noUiSlider.set(_start);
            return;

        }

        noUiSlider.create(softSlider, {
            start: _start,
            range: {
                min: 1,
                max: 100,
            },
            pips: {
                mode: 'values',
                values: [0, 25, 50, 75, 100],
                density: 4,
            }
        });

        softSlider.noUiSlider.on('update', function (values, handle) {

            var _value = values[0];
            ub.funcs.updateScaleViaSlider(_settingsObject, _value);

        });

//        ub.funcs.hidePanelHandler();

    };

    ub.funcs.initializeMovePanel = function (_settingsObject, applicationType) {

        if (applicationType !== "mascot") {
            _multiplier = 10
        }
        ;

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _startX = ub.objects[_v + '_view']['objects_' + _settingsObject.code].position.x;

        _startX = _startX / ub.dimensions.width * 100;

        // $('div.slider-container').hide();
        // $('div.slider-container.move').show();

        var softSliderX = document.getElementById('move-slider-x');

        if (typeof softSliderX.noUiSlider === "object") {

            softSliderX.noUiSlider.set(_startX);
            return;

        }

        noUiSlider.create(softSliderX, {
            start: _startX,
            range: {
                min: 0,
                max: 100,
            },
            pips: {
                mode: 'values',
                values: [0, 25, 50, 75, 100],
                density: 4,
            }
        });

        softSliderX.noUiSlider.on('update', function (values, handle) {

            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'x');

        });

        var _startY = ub.objects[_v + '_view']['objects_' + _settingsObject.code].position.y;

        _startY = _startY / ub.dimensions.height * 100;

        var softSliderY = document.getElementById('move-slider-y');
        if (typeof softSliderY.noUiSlider === "object") {

            softSliderY.noUiSlider.set(_startY);
            return;

        }

        noUiSlider.create(softSliderY, {
            start: _startY,
            range: {
                min: 0,
                max: 100,
            },
            pips: {
                mode: 'values',
                values: [0, 25, 50, 75, 100],
                density: 4,
            }
        });

        softSliderY.noUiSlider.on('update', function (values, handle) {

            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'y');

        });

        //ub.funcs.hidePanelHandler();

    }

    ub.funcs.initializeRotatePanel = function (_settingsObject, applicationType) {

        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10
        }
        ;

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _start = ub.objects[_v + '_view']['objects_' + _settingsObject.code].rotation;

        // $('div.slider-container').hide();
        // $('div.slider-container.rotate').show();

        // var softSlider = document.getElementById('rotate-slider');
        // if (typeof softSlider.noUiSlider === "object") {

        //     softSlider.noUiSlider.set(_start);
        //     return;

        // }

        // noUiSlider.create(softSlider, {
        //     start: _start,
        //     range: {
        //         min: 0,
        //         max: 100,
        //     },
        //     pips: {
        //         mode: 'values',
        //         values: [0, 25, 50, 75, 100],
        //         density: 4,
        //     }
        // });

        // softSlider.noUiSlider.on('update', function ( values, handle ) {

        //     var _value = values[0];

        // });

        $("#rotate-slider").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            width: 15,
            radius: 85,
            value: _start,
            startAngle: 90,

            drag: function (args) {

                ub.funcs.updateRotationViaSlider(_settingsObject, args.value);

            }

        });

        //ub.funcs.hidePanelHandler();

    }

    ub.funcs.updateRotationViaSlider = function (_application, value) {

        var _val = (value / 100 * 360);
        var _valStr = (value / 100 * 6.28);

        $('span.custom_text.rotate').html(_val.toString().substring(0, 5));

        var application = _application;

        _.each(_application.application.views, function (view) {

            var application_obj = ub.objects[view.perspective + '_view']['objects_' + application.code];
            var angleRadians = _valStr;

            application_obj.rotation = angleRadians;
            view.application.rotation = (angleRadians / Math.PI) * 180;

        });

        ub.funcs.activateMoveTool(application.code);

    };

    ub.funcs.generateSizes = function (applicationType, sizes, settingsObject, _id) {

        var _htmlBuilder = '';
        var _additionalClass = '';

        var blockPatternExceptions = ['Hockey Socks'];

        _.each(sizes, function (size) {

            if (size.size.toString() === settingsObject.font_size.toString() || (_id === '4' && ub.config.sport !== "Football 2017" && !_.contains(blockPatternExceptions, ub.config.blockPattern))) { 
                _additionalClass = 'active';

                if (typeof settingsObject.custom_obj !== 'undefined' && ub.funcs.isTackleTwill()) {
                    (_.isEqual(settingsObject.custom_obj.active, true)) ? _additionalClass='' : _additionalClass='active';
                }

            } else {
                _additionalClass = '';
            }

            if (ub.funcs.isFreeFormToolEnabled(_id)) {
                if (_additionalClass === "active") {
                    _htmlBuilder += '<span class="applicationLabels font_size ' + _additionalClass + '" data-size="' + size.size + '" style="display: none">' + size.size + '"' + '</span>';
                }
            } else {
                _htmlBuilder += '<span class="applicationLabels font_size ' + _additionalClass + '" data-size="' + size.size + '">' + size.size + '"' + '</span>';
            }

        });

        // show BESTFIT option on embellishment's application sizes
        if (typeof settingsObject.custom_obj !== 'undefined' && ub.funcs.isTackleTwill()) {

            (_.isEqual(settingsObject.custom_obj.active, true)) ? _additionalClass='active' : _additionalClass='';

            var customSize  = settingsObject.custom_obj.fontSize;
            var customScale = settingsObject.custom_obj.scale.x;
            var type        = 'custom';

            // if scale is set to 0, e.g. {x: 0, y: 0} then hide BESTFIT option
            if (customScale.toString() !== '0') _htmlBuilder += '<span style="width:auto" class="applicationLabels font_size ' + _additionalClass + '" data-size="' + customSize + '" data-type="'+  type +'" data-scale="'+ customScale +'">BESTFIT</span>';

        }

        var _divisor = 10; // For Mascots
        var _v = ub.funcs.getPrimaryView(settingsObject.application);
        var _obj = ub.objects[_v + '_view']['objects_' + settingsObject.code];

        if (applicationType !== "mascot") {
            _divisor = 100;
        } // For Text Applications

        // Custom Size

        if (ub.funcs.isFreeFormToolEnabled(_id) && typeof _obj !== "undefined") {

            /// Rotate

            var _start = _obj.rotation;

            _start = _start;
            _start = _start.toString().substr(0, 5);

            if (_start === '1' || _start === '0') {
                _start += '.00';
            }

            _additionalClass = '';
            _htmlBuilder += '<span class="applicationLabels font_size custom rotate ' + _additionalClass + '" data-size="' + '5' + '">' + "<img class='scale-caption' src='/images/builder-ui/rotate-caption.png'>" + '<span class="custom_text rotate">' + _start + '</span>°' + '</span>';
            _htmlBuilder += '<div class="slider-container rotate"><div id="rotate-slider-old"></div></div>';

            /// Move

            var _start = (10 * ub.objects[_v + '_view']['objects_' + settingsObject.code].scale.x) / 3;
            var _start = '';

            // _start = _start / _divisor;
            // _start = _start.toString().substr(0,4);

            if (_start === '1' || _start === '0') {
                _start += '.00';
            }

            var _position = ub.objects[_v + '_view']['objects_' + settingsObject.code].position;
            _start = parseInt(_position.x) + ', ' + parseInt(_position.y);

            _additionalClass = '';
            _htmlBuilder += '<span class="applicationLabels font_size custom move' + _additionalClass + '" data-size="' + '5' + '">' + "<img class='scale-caption' src='/images/builder-ui/move-caption.png'>" + '<span class="custom_text move">' + _start + '</span>' + '</span>';
            _htmlBuilder += '<div class="slider-container move"><div id="move-slider-x-old" class="move x"></div><div id="move-slider-y-old" class="move y"></div></div>';

            /// Scale

            var _start = (10 * ub.objects[_v + '_view']['objects_' + settingsObject.code].scale.x) / 3;

            _start = _start / _divisor;
            _start = _start.toString().substr(0, 4);

            if (_start === '1' || _start === '0') {
                _start += '.00';
            }

            _additionalClass = '';
            _htmlBuilder += '<span class="applicationLabels font_size custom scale ' + _additionalClass + '" data-size="' + '5' + '">' + "<img class='scale-caption' src='/images/builder-ui/scale-caption.png'>" + '+<span class="custom_text scale">' + _start + '</span>%' + '</span>';
            _htmlBuilder += '<div class="slider-container scale"><div id="scale-slider-old"></div></div>';

        }

        return _htmlBuilder;

    }

    ub.funcs.getRotatedValue = function (length, index) {

        var rows = Math.ceil(index / length);
        var subt = rows - 1;
        var result = index - (subt * length);

        return result;

    }

    ub.funcs.activateColors = function (application_id) {

        var _appSettings = ub.current_material.settings.applications[application_id];
        var _noOfLayers = _.size(_appSettings.mascot.layers_properties); // -1 becuase one of the layers is just a duplicate for the mask
        var _noOfColors = ub.current_material.settings.applications[application_id].color_array.length;

        _.each(_appSettings.color_array, function (color, index) {

            if (typeof color === "undefined") {
                return;
            }

            var _layerNo = index + 1;

            if (_layerNo > _noOfLayers) {
                return;
            }

            $layer = $('span.colorItem[data-layer-no="' + _layerNo + '"][data-color-code="' + color.color_code + '"]');

            $layer.click();

        });

        // Handle Non-Existent colors

        if (_noOfLayers > _noOfColors) {

            var _diff = _noOfLayers - _noOfColors;

            for (i = _noOfColors + 1; i <= _noOfColors + _diff; i++) {

                var _mascotSettingsLayer = _.find(_appSettings.mascot.layers_properties, {layer_number: i.toString()});
                var _teamColorID = _mascotSettingsLayer.team_color_id;
                var _color = ub.funcs.getTeamColorObjByIndex(parseInt(_teamColorID));

                if (typeof _color !== "undefined") {

                    $layer = $('span.colorItem[data-layer-no="' + i + '"][data-color-code="' + _color.color_code + '"]');
                    $layer.click();

                } else {

                    ub.utilities.warn('Team Color ' + _teamColorID + " not found, using first team color for mascot");
                    _color = ub.funcs.getTeamColorObjByIndex(1);

                    $layer = $('span.colorItem[data-layer-no="' + i + '"][data-color-code="' + _color.color_code + '"]');
                    $layer.click();

                }

            }

        }

    }

    ub.funcs.beforeActivateMascots = function (application_id) {

        // Todo: Prepocessing Here

    };

    ub.funcs.afterActivateMascots = function (application_id) {

        // Restore current mascot colors from settings object
        var _appInfo = ub.funcs.getApplicationSettings(application_id);

        if (typeof ub.current_material.settings.applications[application_id] !== "undefined" && _appInfo.status === "on") {
            
            if (ub.data.useScrollingUI) {
                ub.funcs.activateMascotColors(application_id);
            } else {
                ub.funcs.activateColors(application_id);
            }
        }

    };

    ub.funcs.isTackleTwill = function () {
        return ub.config.uniform_application_type === "tackle_twill";
    }


    ub.funcs.isSublimated = function () {
        return ub.config.uniform_application_type === "sublimated";
    }

    ub.funcs.isKnitted = function () {
        return ub.config.uniform_application_type === "knitted";
    }

    ub.funcs.changeMascotOpacity = function (id, position) {

        var _value = parseInt(position);
        var _perspectiveStr = '';
        var _viewObjects = ub.funcs.getApplicationViewObjects(id);
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: id.toString()});
        var _calibration = 0;
        var _position = 0;

        _.each(_viewObjects, function (viewObject) {

            _perspectiveStr = viewObject.perspective + '_view';
            _position = (parseInt(position));
            viewObject.alpha = parseInt(_position) / 100;

            var _viewObjectCanvas = ub.objects[_perspectiveStr]['objects_' + id];
            _viewObjectCanvas.alpha = parseInt(_position) / 100;
            _viewObjectCanvas.opacity = parseInt(_position) / 100;

            _.each(_viewObjectCanvas.children, function (child) {
                child.alpha = parseInt(_position) / 100;
            });

            _settingsObject.alpha = parseInt(_position) / 100;

        });

        var _matchingID;
        var _matchingSide;
        var _matchingSettingsObject;

        _matchingID = ub.data.matchingIDs.getMatchingID(id);

        if (typeof _matchingID !== "undefined") {

            _applicationSettings = ub.current_material.settings.applications[_matchingID];
            _applicationViewObjects = ub.funcs.getApplicationViewObjects(_matchingID);
            _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});

            _.each(_applicationViewObjects, function (viewObject) {

                var _patternObject = ub.objects[_perspectiveStr][_patternStr];
                _perspectiveStr = viewObject.perspective + '_view';
                var _viewObjectCanvas = ub.objects[_perspectiveStr]['objects_' + _matchingID];

                _.each(_viewObjectCanvas.children, function (child) {
                    child.alpha = parseInt(_position) / 100;
                });

                _patternObject.alpha = parseInt(position) / 100;

            });

        }

    }

    ub.funcs.prepareBackendOpacitySettings = function (applicationObj) {

        if (applicationObj.application_type === "mascot" && ub.config.uniform_application_type === "sublimated") {

            _.each(applicationObj.application.views, function (view) {

                if (view.application.appOpacity !== "" && typeof view.application.appOpacity !== "undefined") {

                    applicationObj.withOpacity = true;
                    applicationObj.opacityConfig = view.application.appOpacity;

                } else {

                    applicationObj.withOpacity = false;

                }

            });

        }

        return applicationObj;

    }

    ub.funcs.changeMascotOpacityFromBackend = function (applicationObj, opacity) {

        var _value = parseInt(opacity);
        applicationObj.alpha = parseInt(_value) / 100;

    }

    // Old activateMascots function
    // ub.funcs.activateMascots = function (application_id) {

    //     if (ub.funcs.popupsVisible()) { return; }
    //     if (!ub.funcs.okToStart())    { return; }

    //     ub.funcs.activatePanelGuard();

    //     var _appInfo = ub.funcs.getApplicationSettings(application_id);

    //     ub.funcs.activateMoveTool(application_id);

    //     if (_appInfo.application_type !== "mascot") {

    //         ub.funcs.activateApplications(application_id);
    //         return;

    //     }

    //     if (ub.funcs.isBitFieldOn()) {

    //         var _marker = _.find(ub.data.markerBitField, {value: true});

    //         if (_marker.code.toString() !== application_id.toString()) {
    //             return;
    //         }

    //     }

    //     $('div#changeApplicationUI').remove();

    //     var _id                 = application_id.toString();
    //     var _settingsObject     = _.find(ub.current_material.settings.applications, {code: _id});
    //     var _applicationType    = _settingsObject.application_type;
    //     var _uniformCategory    = ub.current_material.material.uniform_category;
    //     var _alias              = ub.data.sportAliases.getAlias(_uniformCategory);
    //     var _sizes              = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);
    //     var _isFreeFormEnabled  = ub.funcs.isFreeFormToolEnabled(_id);


    //     if (ub.funcs.isCurrentSport('Football')) {

    //         if (_id === '2' && _applicationType === 'mascot') {
    //             _sizes            = ub.funcs.getApplicationSizes('mascot_2');
    //         }

    //         if (_id === '5' && _applicationType === 'mascot') {
    //             _sizes            = ub.funcs.getApplicationSizes('mascot_5');
    //         }

    //     } else if (ub.current_material.material.uniform_category === "Wrestling") {

    //         _sizes = ub.funcs.getApplicationSizes('mascot_wrestling');

    //     } else if (!ub.funcs.isCurrentSport('Football') && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {

    //         if (ub.funcs.isCurrentType('upper')) {

    //             _sizes = ub.data.applicationSizes.getSizes(_alias.alias, 'mascot', parseInt(application_id));

    //         } else if (ub.funcs.isCurrentType('lower') && ub.funcs.isSocks()) {

    //             _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias, _id);

    //         } else {

    //             _sizes = ub.funcs.getApplicationSizesPant(_applicationType, _alias.alias, _id);

    //         }

    //     } else {

    //         console.warn('no sizes setting defaulting to generic');
    //         _sizes        = ub.funcs.getApplicationSizes(_applicationType);

    //     }

    //     // New application sizes values from backend
    //     var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _id);

    //     if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

    //         ub.utilities.info('===>Using sizes from backend: ');

    //         console.log('Default Sizes: ');
    //         console.log(_sizes);
    //         console.log('Application #: ');
    //         console.log(_id);

    //         if (ub.data.mascotSizesFromBackend.isValid(ub.config.sport) && typeof _sizesFromConfig !== "undefined") {

    //             console.log("SIZE FROM CONFIG===>", _sizesFromConfig);
    //             console.log(_sizesFromConfig.sizes);
    //             console.log(_.pluck(_sizesFromConfig.sizes, "size"));

    //             _sizes = _sizesFromConfig;

    //         }

    //     } else {

    //         if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

    //             ub.utilities.info('Application Type: ' + _applicationType);
    //             ub.utilities.info('alias: ' + _alias.alias);

    //             ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _id + " don't have application sizes settings on the backend.");

    //         }

    //     }


    //     var _mascotObj          = _settingsObject.mascot;
    //     var _currentSize        = _settingsObject.size;
    //     var _colorArray         = _settingsObject.color_array;
    //     var _mascotName         = _mascotObj.name;
    //     var _mascotIcon         = _mascotObj.icon;
    //     var _title              = _applicationType.toTitleCase();
    //     var _htmlBuilder        = "";
    //     var _appActive          = 'checked';
    //     var _maxLength          = 12;

    //     ub.funcs.deactivatePanels();
    //     ub.funcs.preProcessApplication(application_id);

    //     if (_settingsObject.type.indexOf('number') !== -1) { _maxLength = 2; }

    //     var _status = 'on';
    //     if (typeof _settingsObject.status !== 'undefined') { var _status = _settingsObject.status; }

    //     _htmlBuilder        =  '<div id="applicationUI" data-application-id="' + _id + '">';
    //     _htmlBuilder        +=      '<div class="header">';
    //     _htmlBuilder        +=      '<div class="toggle" data-status="' + _status + '"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>';
    //     _htmlBuilder        +=      '<div class="applicationType">' + " [" +  _id + "] " + "Stock Mascot" + '<span class="changeApplicationType"><i class="fa fa-caret-down" aria-hidden="true"></i></span></div><span class="cog"><i class="fa fa-cog" aria-hidden="true"></i></span></div>';
    //     _htmlBuilder        +=      '<div class="body">';
    //     _htmlBuilder        +=          '<div class="cover"></div>';

    //     _htmlBuilder        +=          '<div class="ui-row">';

    //     _htmlBuilder        +=              '<label class="applicationLabels font_name">Stock Mascot</label>';
    //     _htmlBuilder        +=              '<span class="fontLeft" data-direction="previous" style="opacity: 0;"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';
    //     _htmlBuilder        +=              '<span class="font_name" style="font-size: 1.2em; font-family: ' + _mascotName + ';">' + _mascotName + '</span>';
    //     _htmlBuilder        +=              '<span class="fontRight" data-direction="next"  style="opacity: 0;"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';

    //     _htmlBuilder        +=          '</div>';

    //     _htmlBuilder        +=          '<div class="ui-row">';

    //     var _label = 'Size';
    //     var _class = '';
    //     if (_isFreeFormEnabled) {
    //         _label = 'Measurements'; _class = "custom";
    //     }
    //     _htmlBuilder        +=              '<label class="applicationLabels font_size ' + _class + '">' + _label + '</label>';

    //     var _inputSizes;

    //     if (_id === '4' && ub.config.sport !== "Football 2017") {

    //         _inputSizes = [{size: '0.5', }];

    //     } else {

    //         // _inputSizes = _sizes.sizes;

    //         // add sort for sizes
    //         _inputSizes = _.sortBy(_sizes.sizes, function(obj) { return parseFloat(obj.size) });

    //     }

    //     if (typeof _settingsObject.size === 'undefined') {

    //         if (application_id !== 2 || application_id !== 5) {

    //             _settingsObject.size = 4;

    //         } else {

    //             _settingsObject.size = 10;

    //         }

    //         if (application_id === 4) {

    //             _settingsObject.size = 0.5;

    //         }

    //     }

    //     _htmlBuilder += ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);

    //     _htmlBuilder        +=          '</div>';

    //     _htmlBuilder        +=          '<div class="clearfix"></div>';

    //     _htmlBuilder        +=          '<div class="color-pattern-tabs">';
    //     _htmlBuilder        +=              '<span class="tab active" data-item="colors">Colors</span>';
    //     _htmlBuilder        +=              '<span class="tab" data-item="manipulators"></span>';
    //     _htmlBuilder        +=          '</div>';

    //     _htmlBuilder        +=          '<div class="ui-row">';

    //     _htmlBuilder        +=              '<div class="column1 applications colors">'

    //     _htmlBuilder        +=              '<div class="sub1">';
    //     _htmlBuilder        +=                  '<br />';
    //     _htmlBuilder        +=                  '<span class="accentThumb"><img src="' + _mascotIcon + '"/></span><br />';
    //     _htmlBuilder        +=                  '<span class="accent">Change Mascot</span>';
    //     _htmlBuilder        +=                  '<br />';

    //     if (_settingsObject.mascot.name === 'Custom Logo') {
    //         _htmlBuilder        +=                  '<a class="view-file" data-file="' + _settingsObject.customFilename + '" target="_new">View File</a>';
    //         _htmlBuilder        +=                  '<br /><br />';
    //     }

    //     _htmlBuilder        +=                  '<span class="flipButton">Flip</span>';

    //     // In-place editing, Hide this for now
    //     // if (_settingsObject.mascot.name === 'Custom Logo') {
    //     //     _htmlBuilder    +=                  '<span class="inPlacePreviewButton">In Place Preview</span>';
    //     // }

    //     _htmlBuilder        +=              '</div>';

    //     _htmlBuilder        +=                  '<div class="colorContainer">';

    //     if (ub.current_material.settings.applications[application_id].mascot.id !== "1039") {

    //         _.each(_settingsObject.mascot.layers_properties, function (layer) {

    //             var _hexCode = layer.default_color;
    //             var _color   = ub.funcs.getColorByColorCode(_hexCode);
    //             var exists = _.find(ub.current_material.settings.team_colors, {color_code: _color.color_code});

    //             // if (typeof exists === 'undefined') {

    //             //     var _teamColorID = parseInt(layer.team_color_id);
    //             //     _color = ub.funcs.getTeamColorObjByIndex(_teamColorID);

    //             //     if (typeof _color !== "undefined") {

    //             //         ub.data.forRotating.push({colorOBJ: _color, layerNumber: layer.layer_number});

    //             //     }

    //             // } else {

    //             //     ub.data.forRotating.push({colorOBJ: _color, layerNumber: layer.layer_number});

    //             // }

    //             // if (typeof _color === 'undefined') {

    //             //     var _teamColorLength = ub.current_material.settings.team_colors.length;
    //             //     var _rotatedTeamColorID = ub.funcs.getRotatedValue(_teamColorLength, _teamColorID);

    //             //     _color = ub.funcs.getTeamColorObjByIndex(_rotatedTeamColorID);
    //             //     ub.data.forRotating.push({colorOBJ: _color, layerNumber: layer.layer_number});

    //             // }

    //             if (typeof _color !== 'undefined') {

    //                 _htmlBuilder += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color, 'mascots');

    //             }
    //             else {

    //                 util.error('Hex Code: ' + _hexCode + ' not found!');

    //             }

    //         });

    //     }

    //     // Enable Watermark Sliders only on Tackle Twill Applications
    //     if (ub.config.uniform_application_type === "sublimated") {
    //         _htmlBuilder        +=    '<br/><span class="watermark-intensity">Watermark Intensity:</span>';
    //         _htmlBuilder        +=    '<input type="text" id="opacity-slider" value="" />';
    //     }

    //     _htmlBuilder        +=                  '</div>';
    //     _htmlBuilder        +=              '</div>';

    //     _templateStrManipulators = ub.funcs.updateManipulatorsPanel(_settingsObject);

    //     _htmlBuilder        +=              '<div class="column1 applications manipulators">';
    //     _htmlBuilder        +=                  _templateStrManipulators;
    //     _htmlBuilder        +=              '</div>';

    //     _htmlBuilder        +=          '</div>';
    //     _htmlBuilder        +=      '</div>';
    //     _htmlBuilder        +=  '</div>';

    //     $('.modifier_main_container').append(_htmlBuilder);
    //     $('a.view-file').unbind('click');
    //     $('a.view-file').on('click', function () {

    //         var _file = $(this).data('file');
    //         var _extension = util.getExtension(_file);
    //         var _str = "";

    //         if (_extension === "pdf" || _extension === "ai" ) {

    //             _str     += "Open File (" + _extension + ") on a new window<br />";
    //             _str     += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";

    //         } else {

    //             _str     += "<img style='width: 100%;' src ='" + _file + "' /> <br />";
    //             _str     += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";

    //         }

    //         ub.showModalTool(_str);

    //     })

    //     // Generate Thumbnails

    //     // var _appView = _settingsObject.application.views[0].perspective;
    //     // var _src = ub.funcs.getThumbnailImageMascot(ub.objects[_appView + "_view"]['objects_' + _id], _id);
    //     // console.log(_src);
    //     // $('span.accentThumb > img').attr('src',_src);

    //     // Events

    //         // Opacity Slider

    //             var _from = 100;

    //             $('input#opacity-slider').show();

    //             if (typeof $("#opacity-slider").destroy === "function") {
    //                 $("#opacity-slider").destroy();
    //             }

    //             $("#opacity-slider").ionRangeSlider({
    //                 min: 0,
    //                 max: 100,
    //                 from: typeof _settingsObject.alpha === "number" ? _settingsObject.alpha * 100 : 100,
    //                 onChange: function (data) {

    //                     ub.funcs.changeMascotOpacity(_settingsObject.code, data.from);

    //                 },
    //             });

    //         // End Opacity Slider

    //         // In-place preview

    //         if (_settingsObject.mascot.name === 'Custom Logo' && typeof _settingsObject.customFilename !== "undefined") {

    //             var _filename  = _settingsObject.customFilename;
    //             var _extension = _filename.split('.').pop();

    //             $prevImage = $('span.accentThumb > img');

    //             if (_extension === 'gif' || _extension === 'jpg' || _extension === 'bmp' || _extension === 'png' || _extension === 'jpeg') {

    //                 $prevImage.attr('src', _filename);

    //             } else if (_extension === 'pdf') {

    //                 $prevImage.attr('src', '/images/uiV1/pdf.png');

    //             } else if (_extension === 'ai') {

    //                 $prevImage.attr('src', '/images/uiV1/ai.png');

    //             }

    //         }

    //         /// Application Manipulator Events

    //             ub.funcs.setupManipulatorEvents(_settingsObject, _applicationType);

    //         /// End Application Manipulator Events

    //         /// Tabs

    //             $('div.color-pattern-tabs > span.tab').unbind('click');
    //             $('div.color-pattern-tabs > span.tab').on('click', function () {

    //                 var _item = $(this).data('item');

    //                 $('div.color-pattern-tabs > span.tab').removeClass('active');
    //                 $(this).addClass('active');
    //                 $('div.column1').hide();
    //                 $('div.column1.' + _item).fadeIn();

    //                 if (_item === "manipulators") {
    //                     $('ul.tab-navs > li.tab[data-action="move"]').trigger('click');
    //                 }

    //             });

    //         /// End Tabs

    //         $('span.inPlacePreviewButton').unbind('click');
    //         $('span.inPlacePreviewButton').on('click', function (){

    //             if (!$(this).hasClass('active')){

    //                 $(this).addClass('active');

    //             } else {

    //                 $(this).removeClass('active');

    //             }

    //         });

    //         // End In-place preview

    //         // if (ub.current_material.material.uniform_category !== "Wrestling") {

    //         //     $('span.flipButton').hide();

    //         // } else {

    //             ub.funcs.updateCoordinates(_settingsObject);

    //             var s       = ub.funcs.getPrimaryView(_settingsObject.application);
    //             var sObj    = ub.funcs.getPrimaryViewObject(_settingsObject.application);

    //             if (typeof sObj.application.flip !== "undefined") {

    //                 if (sObj.application.flip === 1) {

    //                     $('span.flipButton').addClass('active');

    //                 } else {

    //                     $('span.flipButton').removeClass('active');

    //                 }

    //             } else {

    //                 $('span.flipButton').removeClass('active');

    //             }

    //         //}

    //         $('span.flipButton').unbind('click');
    //         $('span.flipButton').on('click', function () {

    //             var _settingsObject         = _.find(ub.current_material.settings.applications, {code: _id});
    //             ub.funcs.flipMascot(_settingsObject);

    //         });

    //         $('div.applicationType').on('click', function () {

    //             if ($('div#changeApplicationUI').length > 1) {

    //                 var _status = $('div#changeApplicationUI').data('status');

    //                 if (_status === 'visible') {

    //                     $('div#changeApplicationUI').hide().data('status', 'hidden');
    //                     $('div.applicationType').removeClass('toggledApplicationType');

    //                 } else {

    //                     $('div#changeApplicationUI').fadeIn().data('status', 'visible');
    //                     $('div.applicationType').addClass('toggledApplicationType');

    //                 }

    //                 return;

    //             }

    //             var _settingsObject         = _.find(ub.current_material.settings.applications, {code: _id});
    //             var _validApplicationTypes  = _settingsObject.validApplicationTypes;

    //             _htmlBuilder        =  '<div id="changeApplicationUI" data-status="hidden" data-application-id="' + _id + '">';
    //             _htmlBuilder        +=      '<div class="header">';
    //             _htmlBuilder        +=      '<div class="">Select Application Type for Location <strong>#' + _id + '</strong></div>';
    //             _htmlBuilder        +=      '<div class="close-popup closeApplicationChanger"><i class="fa fa-times" aria-hidden="true"></i></div>';
    //             _htmlBuilder        +=      '<div class="body">';

    //             var _deactivated ='';
    //             var _currentlySelectedType = '';
    //             var _selected = ''

    //             if (!_.contains(_validApplicationTypes, 'number')) { _deactivated = 'deactivatedOptionButton'; }
    //             if (_applicationType === 'front_number' || _applicationType === 'back_number' ) { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

    //             _htmlBuilder        +=           '<div data-type="player_number" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
    //             _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-number-large.png">' + '</div>';
    //             _htmlBuilder        +=                 '<div class="caption">Player Number ' + _selected + '</div>';
    //             _htmlBuilder        +=           '</div>';
    //             _deactivated ='';
    //             _currentlySelectedType = '';
    //             _selected = '';

    //             if (!_.contains(_validApplicationTypes, 'team_name')) { _deactivated = 'deactivatedOptionButton'; }
    //             if (_applicationType === 'team_name') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

    //             _htmlBuilder        +=           '<div data-type="team_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
    //             _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
    //             _htmlBuilder        +=                 '<div class="caption">Team Name ' + _selected + '</div>';
    //             _htmlBuilder        +=           '</div>';

    //             _htmlBuilder        +=           '<br />';
    //             _deactivated = '';
    //             _currentlySelectedType = '';
    //             _selected = '';

    //             if (!_.contains(_validApplicationTypes, 'player_name')) { _deactivated = 'deactivatedOptionButton'; }
    //             if (_applicationType === 'player_name') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

    //             _htmlBuilder        +=           '<div data-type="player_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
    //             _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
    //             _htmlBuilder        +=                 '<div class="caption">Player Name ' + _selected + '</div>';
    //             _htmlBuilder        +=           '</div>';
    //             _deactivated = '';
    //             _currentlySelectedType = '';
    //             _selected = '';

    //             if (!_.contains(_validApplicationTypes, 'logo')) { _deactivated = 'deactivatedOptionButton'; }
    //             if (_applicationType === 'mascot') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

    //             _htmlBuilder        +=           '<div data-type="mascot" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
    //             _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-mascot-large.png">' + '</div>';
    //             _htmlBuilder        +=                 '<div class="caption">Stock Mascot ' + _selected + '</div>';
    //             _htmlBuilder        +=           '</div>';

    //             //if (ub.config.uniform_application_type !== "sublimated" && ub.config.uniform_application_type !== "knitted") {
    //             //if (ub.config.uniform_application_type !== "tackle_twill" && ub.config.uniform_application_type !== "sublimated" && ub.config.uniform_application_type !== "knitted") {
    //                 if (!_.contains(_validApplicationTypes, 'embellishments')) { _deactivated = 'deactivatedOptionButton'; }
    //             //}

    //             _htmlBuilder        +=           '<div class="optionButton ' + _deactivated + '" data-type="embellishments">';
    //             _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-embellishments-large.png">' + '</div>';
    //             _htmlBuilder        +=                 '<div class="caption">Custom Mascot</div>';
    //             _htmlBuilder        +=           '</div>';

    //             _htmlBuilder        +=      '</div>';
    //             _htmlBuilder        += "</div>";
    //             _deactivated = '';
    //             _currentlySelectedType = '';
    //             _selected = '';

    //             $('.modifier_main_container').append(_htmlBuilder);
    //             $('div#changeApplicationUI').fadeIn().data('status', 'visible');
    //             $('div.applicationType').addClass('toggledApplicationType');

    //             $('div.optionButton').on('click', function () {

    //                 if ($(this).hasClass('deactivatedOptionButton')) { return; }

    //                 var _type = $(this).data('type');

    //                 ub.funcs.changeApplicationType(_settingsObject, _type);
    //                 $('div#changeApplicationUI').remove();

    //             });

    //             $('div.closeApplicationChanger').on('click', function () {

    //                 $('div#changeApplicationUI').hide().data('status', 'hidden');
    //                 $('div.applicationType').removeClass('toggledApplicationType');

    //             });

    //         });

    //         var _matchingID = undefined;

    //         _matchingID = ub.data.matchingIDs.getMatchingID(_id);
    //         if (typeof _matchingID !== "undefined") {

    //             ub.funcs.toggleApplication(_matchingID.toString(), _status);

    //         }

    //         $('span.font_size').on('click', function () {

    //             //if (_id === '4') { return; }

    //             var _selectedSize = $(this).data('size');
    //             $('.font_size').removeClass('active');
    //             $(this).addClass('active');

    //             var _isCustom = $(this).hasClass('custom');
    //             var _isScale = $(this).hasClass('scale');
    //             var _isRotate = $(this).hasClass('rotate');
    //             var _isMove = $(this).hasClass('move');

    //             if (_isCustom && _isScale) {

    //                 $('div.color-pattern-tabs').hide();
    //                 $('span.tab[data-item="manipulators"]').trigger('click');
    //                 $('li.tab.scale').trigger('click');

    //                 return;

    //             }

    //             if (_isCustom && _isMove) {

    //                 $('color-pattern-tabs').hide();
    //                 $('span.tab[data-item="manipulators"]').trigger('click');
    //                 $('li.tab.move').trigger('click');

    //                 return;

    //             }

    //             if (_isCustom && _isRotate) {

    //                 $('color-pattern-tabs').hide();
    //                 $('span.tab[data-item="manipulators"]').trigger('click');
    //                 $('li.tab.rotate').trigger('click');

    //                 return;

    //             }

    //             var oldScale = ub.funcs.clearScale(_settingsObject);
    //             _settingsObject.oldScale = oldScale;

    //             ub.funcs.changeMascotSize(_selectedSize, _settingsObject);

    //             var _matchingID = undefined;
    //             _matchingID = ub.data.matchingIDs.getMatchingID(_id);

    //             if (typeof _matchingID !== "undefined") {

    //                 var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
    //                 ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);

    //             }

    //         });

    //         $('span.font_name').on('click', function () {

    //             ub.funcs.createMascotPopup(_title, _mascotObj, _settingsObject);

    //         });


    //         $('span.accentThumb, span.accent').on('click', function () {

    //             ub.funcs.createMascotPopup(_title, _mascotObj, _settingsObject);

    //         });

    //         $('span.colorItem').on('click', function () {

    //             var _layer_no   = $(this).data('layer-no');
    //             var _color_code = $(this).data('color-code');
    //             var _layer_name = $(this).data('layer-name');
    //             var _temp = $(this).data('temp');
    //             var _colorObj = ub.funcs.getColorByColorCode(_color_code);

    //             var _oldVal = {

    //                 layerNo: _layer_no,
    //                 color: _settingsObject.color_array[_layer_no - 1],
    //                 applicationCode: _settingsObject.code,

    //             }

    //             if (_temp !== 'undo') {

    //                 ub.funcs.pushOldState('color change', 'application', _settingsObject, _oldVal);

    //             }

    //             ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject);
    //             ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

    //             var _processMatchingSide = true;
    //             var _matchingID = undefined;
    //             var _matchingSettingsObject = undefined;

    //             _matchingID = ub.data.matchingIDs.getMatchingID(_id);

    //             if (typeof _matchingID !== "undefined") {
    //                 _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
    //             }

    //             // On Crew Socks, only change the color of the matching side if its the same mascot id
    //             if (typeof _matchingSettingsObject !== "undefined") {

    //                 if (_matchingSettingsObject.type !== "free" && ub.funcs.isSocks()) {

    //                     _processMatchingSide = false;

    //                 }

    //                 if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

    //                     if (_settingsObject.mascot.id === _matchingSettingsObject.mascot.id) {
    //                         _processMatchingSide = true;
    //                     }

    //                 }

    //             }

    //             if (typeof _matchingID !== "undefined") {

    //                 if(_processMatchingSide) {

    //                     ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);

    //                 }

    //             }

    //         });

    //     // End Small Color Pickers

    //     // End Events

    //     $("div.toggleOption").unbind('click');
    //     $("div.toggleOption").on("click", function () {

    //         var _currentStatus = $('div.toggle').data('status');
    //         var s;

    //         if(_currentStatus === "on") {
    //             s = 'off';
    //         }
    //         else {
    //             s = 'on';
    //         }

    //         if (s === "on") { ub.funcs.LSRSBSFS(parseInt(_id)); }

    //         ub.funcs.toggleApplication(_id,s);

    //         var _matchingSide;
    //         var _matchingID = undefined;
    //         var _processMatchingSide = true;
    //         var _matchingSettingsObject = undefined;

    //         _matchingID = ub.data.matchingIDs.getMatchingID(_id);

    //         if (typeof _matchingID !== "undefined") {

    //             _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});

    //         }

    //         if (typeof _matchingSettingsObject !== "undefined") {

    //             if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

    //                 // Toggle matching mascot if the same mascot is selected
    //                 _processMatchingSide = _settingsObject.mascot.id === _matchingSettingsObject.mascot.id

    //             }

    //         }

    //         if (typeof _matchingID !== "undefined") {

    //             if (_processMatchingSide) { ub.funcs.toggleApplication(_matchingID,s); }

    //         }

    //     });

    //     $('div#applicationUI').fadeIn();
    //     ub.funcs.activateMoveTool(application_id);
    //     ub.funcs.activateLayer(application_id);
    //     ub.funcs.toggleApplication(_id, _status);
    //     ub.funcs.afterActivateMascots(_id);

    // }

    ub.funcs.selectApplicationTypeLocation =  function (_id, _applicationType, _validApplicationTypes) {    

        console.log('_applicationType===>', _applicationType);

        var _types = [
            {
                'types': {
                    'type': 'number',
                    'dataType': 'player_number',
                    'label': 'Player Number',
                    'icon': '/images/main-ui/icon-number-large.png'
                }
            },
            {
                'types': {
                    'type': 'team_name',
                    'dataType': 'team_name',
                    'label': 'Team Name',
                    'icon': '/images/main-ui/icon-text-large.png'
                }
            },
            {
                'types': {
                    'type': 'player_name',
                    'dataType': 'player_name',
                    'label': 'Player Name',
                    'icon': '/images/main-ui/icon-text-large.png'
                }
            },
            {
                'types': {
                    'type': 'logo',
                    'dataType': 'mascot',
                    'label': 'Stock Mascot',
                    'icon': '/images/main-ui/icon-mascot-large.png'
                }
            },
            {
                'types': {
                    'type': 'embellishments',
                    'dataType': 'embellishments',
                    'label': 'Custom Mascot',
                    'icon': '/images/main-ui/icon-embellishments-large.png'
                }
            }
        ];

        var _deactivated = {'deactivated': 'deactivatedOptionButton'};
        var _current = {'currentlySelectedType': 'currentlySelectedType', 'selected': '(current)'};

        _.map(_types, function (v) {

            // get invalid application types
            if (!_.contains(_validApplicationTypes, v.types.type)) {

                console.log('INVALID APPLICATION TYPE===>', v.types.type);

                // this is only present during activate embellisments / custom mascots code
                if (_applicationType === 'embellishments') {
                    if (ub.config.uniform_application_type !== "sublimated" && ub.config.uniform_application_type === "tackle_twill") {
                        if (!_.contains(_validApplicationTypes, 'embellishments')) {
                            _.extend(v.types, _deactivated);
                        } else {
                            // deactivate invalid
                            _.extend(v.types, _deactivated);
                        }
                    }
                } else {
                    // deactivate invalid
                    _.extend(v.types, _deactivated);
                }

            } else {

                // set currently selected
                if (_applicationType === 'front_number' || _applicationType === 'back_number') {
                    _.extend(_types[0].types, _current);
                } else if (_applicationType === 'team_name') {
                    _.extend(_types[1].types, _current);
                } else if (_applicationType === 'player_name') {
                    _.extend(_types[2].types, _current);
                } else if (_applicationType === 'mascot') {
                    _.extend(_types[3].types, _current);
                } else if (_applicationType === 'embellishments') {
                    _.extend(_types[4].types, _current);
                }
            }
        });

        return {'id': _id, 'application_types': _types};
    }

    ub.funcs.activateMascots = function (application_id) {

        if (ub.funcs.popupsVisible()) {
            return;
        }
        if (!ub.funcs.okToStart()) {
            return;
        }

        ub.funcs.activatePanelGuard();

        var _appInfo = ub.funcs.getApplicationSettings(application_id);

        ub.funcs.activateMoveTool(application_id);

        if (_appInfo.application_type !== "mascot") {

            ub.funcs.activateApplications(application_id);
            return;

        }

        if (ub.funcs.isBitFieldOn()) {

            var _marker = _.find(ub.data.markerBitField, {value: true});

            if (_marker.code.toString() !== application_id.toString()) {
                return;
            }

        }

        $('div#changeApplicationUI').remove();

        var _id = application_id.toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
        var _applicationType = _settingsObject.application_type;
        var _uniformCategory = ub.current_material.material.uniform_category;
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(_id);


        if (ub.funcs.isCurrentSport('Football')) {

            if (_id === '2' && _applicationType === 'mascot') {
                _sizes = ub.funcs.getApplicationSizes('mascot_2');
            }

            if (_id === '5' && _applicationType === 'mascot') {
                _sizes = ub.funcs.getApplicationSizes('mascot_5');
            }

        } else if (ub.current_material.material.uniform_category === "Wrestling") {

            _sizes = ub.funcs.getApplicationSizes('mascot_wrestling');

        } else if (!ub.funcs.isCurrentSport('Football') && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {

            if (ub.funcs.isCurrentType('upper')) {

                _sizes = ub.data.applicationSizes.getSizes(_alias.alias, 'mascot', parseInt(application_id));

            } else if (ub.funcs.isCurrentType('lower') && ub.funcs.isSocks()) {

                _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias, _id);

            } else {

                _sizes = ub.funcs.getApplicationSizesPant(_applicationType, _alias.alias, _id);

            }

        } else {

            console.warn('no sizes setting defaulting to generic');
            _sizes = ub.funcs.getApplicationSizes(_applicationType);

        }

        // New application sizes values from backend
        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _id);

        if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

            ub.utilities.info('===>Using sizes from backend: ');

            console.log('Default Sizes: ');
            console.log(_sizes);
            console.log('Application #: ');
            console.log(_id);

            if (ub.data.mascotSizesFromBackend.isValid(ub.config.sport) && typeof _sizesFromConfig !== "undefined") {

                console.log("SIZE FROM CONFIG===>", _sizesFromConfig);
                console.log(_sizesFromConfig.sizes);
                console.log(_.pluck(_sizesFromConfig.sizes, "size"));

                _sizes = _sizesFromConfig;

            }

        } else {

            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);

                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _id + " don't have application sizes settings on the backend.");

            }

        }


        var _mascotObj = _settingsObject.mascot;
        var _currentSize = _settingsObject.size;
        var _colorArray = _settingsObject.color_array;
        var _mascotName = _mascotObj.name;
        var _thumbIcon = _mascotObj.icon;
        var _title = _applicationType.toTitleCase();
        var _htmlBuilder = '';
        var _generateSizes = '';
        var _colorPickers = '';
        var _appActive = 'checked';
        var _maxLength = 12;

        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);

        if (_settingsObject.type.indexOf('number') !== -1) {
            _maxLength = 2;
        }

        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') {
            _status = _settingsObject.status;
        }

        var _label = 'Size', _class = '';
        if (_isFreeFormEnabled) {
            _label = 'Measurements';
            _class = "custom";
        }

        var _inputSizes;

        // this is to ignore input size 0.5 on application #4 on a specified block pattern
        var blockPatternExceptions = ['Hockey Socks'];

        if (_id === '4' && ub.config.sport !== "Football 2017" && !_.contains(blockPatternExceptions, ub.config.blockPattern)) {

            _inputSizes = [{size: '0.5', }];

        } else {
            _inputSizes = _.sortBy(_sizes.sizes, function (obj) {
                return parseFloat(obj.size)
            });
        }

        if (typeof _settingsObject.size === 'undefined') {

            if (application_id !== 2 || application_id !== 5) {
                _settingsObject.size = 4;
            } else {
                _settingsObject.size = 10;
            }

            if (application_id === 4) {
                _settingsObject.size = 0.5;
            }

        }

        _generateSizes += ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);

        var _isCustomLogo = false, _customFilename = '';
        if (_settingsObject.mascot.name === 'Custom Logo') {
            _isCustomLogo = true;
            _customFilename = _settingsObject.customFilename;
        }

        if (ub.current_material.settings.applications[application_id].mascot.id !== "1039") {

            _.each(_settingsObject.mascot.layers_properties, function (layer) {

                var _hexCode = layer.default_color;
                var _color = ub.funcs.getColorByColorCode(_hexCode);

                if (typeof _color !== 'undefined') {
                    _colorPickers += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color, 'mascots');
                } else {
                    util.error('Hex Code: ' + _hexCode + ' not found!');
                }

            });

        }

        var _templateStrManipulators = ub.funcs.updateManipulatorsPanel(_settingsObject);

        var _isSublimated = false;
        if (ub.config.uniform_application_type === "sublimated") {
            _isSublimated = true;
        }

        var templateData = {
            id: _id,
            status: _status,
            mascotFontName: _mascotName,
            mascotFontCaption: _mascotName,
            mascotFontArrowOpacity: 0,
            class: _class,
            label: _label,
            appType: 'Stock Mascot',
            appLabel: 'Stock Mascot',
            generateSizes: _generateSizes,
            thumbIcon: _thumbIcon,
            accentName: 'Change Mascot',
            isCustomLogo: _isCustomLogo,
            customFilename: _customFilename,
            colorPickers: _colorPickers,
            isSublimated: _isSublimated,
            templateStrManipulators: _templateStrManipulators,
            sampleTextContainerVisibility: 'hidden',
            cogVisibility: '',
            tailSweepsTabVisibility: 'hidden',
            colorTabVisibility: '',
            patternsTabVisibility: 'hidden',
            flipLabel: 'Flip'
        }

        _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui', templateData);

        $('.modifier_main_container').append(_htmlBuilder);

        $('a.view-file').unbind('click');
        $('a.view-file').on('click', function () {

            var _file = $(this).data('file');
            var _extension = util.getExtension(_file);
            var _str = "";

            if (_extension === "pdf" || _extension === "ai") {

                _str += "Open File (" + _extension + ") on a new window<br />";
                _str += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";

            } else {

                _str += "<img style='width: 100%;' src ='" + _file + "' /> <br />";
                _str += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";

            }

            ub.showModalTool(_str);

        })

        // Events

        // Opacity Slider

        var _from = 100;

        $('input#opacity-slider').show();

        if (typeof $("#opacity-slider").destroy === "function") {
            $("#opacity-slider").destroy();
        }

        $("#opacity-slider").ionRangeSlider({
            min: 0,
            max: 100,
            from: typeof _settingsObject.alpha === "number" ? _settingsObject.alpha * 100 : 100,
            onChange: function (data) {

                ub.funcs.changeMascotOpacity(_settingsObject.code, data.from);

            },
        });

        // End Opacity Slider

        // In-place preview

        if (_settingsObject.mascot.name === 'Custom Logo' && typeof _settingsObject.customFilename !== "undefined") {

            var _filename = _settingsObject.customFilename;
            var _extension = _filename.split('.').pop();

            $prevImage = $('span.accentThumb > img');

            if (_extension === 'gif' || _extension === 'jpg' || _extension === 'bmp' || _extension === 'png' || _extension === 'jpeg') {

                $prevImage.attr('src', _filename);

            } else if (_extension === 'pdf') {

                $prevImage.attr('src', '/images/uiV1/pdf.png');

            } else if (_extension === 'ai') {

                $prevImage.attr('src', '/images/uiV1/ai.png');

            }

        }

        /// Application Manipulator Events

        ub.funcs.setupManipulatorEvents(_settingsObject, _applicationType);

        /// End Application Manipulator Events

        /// Tabs

        $('div.color-pattern-tabs > span.tab').unbind('click');
        $('div.color-pattern-tabs > span.tab').on('click', function () {

            var _item = $(this).data('item');

            $('div.color-pattern-tabs > span.tab').removeClass('active');
            $(this).addClass('active');
            $('div.column1').hide();
            $('div.column1.' + _item).fadeIn();

            if (_item === "manipulators") {
                $('ul.tab-navs > li.tab[data-action="move"]').trigger('click');
            }

        });

        /// End Tabs

        $('span.inPlacePreviewButton').unbind('click');
        $('span.inPlacePreviewButton').on('click', function () {

            if (!$(this).hasClass('active')) {

                $(this).addClass('active');

            } else {

                $(this).removeClass('active');

            }

        });

        // End In-place preview

        ub.funcs.updateCoordinates(_settingsObject);

        var s = ub.funcs.getPrimaryView(_settingsObject.application);
        var sObj = ub.funcs.getPrimaryViewObject(_settingsObject.application);

        if (typeof sObj.application.flip !== "undefined") {

            if (sObj.application.flip === 1) {

                $('span.flipButton').addClass('active');

            } else {

                $('span.flipButton').removeClass('active');

            }

        } else {

            $('span.flipButton').removeClass('active');

        }

        $('span.flipButton').unbind('click');
        $('span.flipButton').on('click', function () {

            var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
            ub.funcs.flipMascot(_settingsObject);

        });

        $('div.applicationType').on('click', function () {

            if ($('div#changeApplicationUI').length > 1) {

                var _status = $('div#changeApplicationUI').data('status');

                if (_status === 'visible') {

                    $('div#changeApplicationUI').hide().data('status', 'hidden');
                    $('div.applicationType').removeClass('toggledApplicationType');

                } else {

                    $('div#changeApplicationUI').fadeIn().data('status', 'visible');
                    $('div.applicationType').addClass('toggledApplicationType');

                }

                return;

            }

            var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
            var _validApplicationTypes = _settingsObject.validApplicationTypes;

            // _htmlBuilder        =  '<div id="changeApplicationUI" data-status="hidden" data-application-id="' + _id + '">';
            // _htmlBuilder        +=      '<div class="header">';
            // _htmlBuilder        +=      '<div class="">Select Application Type for Location <strong>#' + _id + '</strong></div>';
            // _htmlBuilder        +=      '<div class="close-popup closeApplicationChanger"><i class="fa fa-times" aria-hidden="true"></i></div>';
            // _htmlBuilder        +=      '<div class="body">';
            //
            // var _deactivated ='';
            // var _currentlySelectedType = '';
            // var _selected = ''
            //
            // if (!_.contains(_validApplicationTypes, 'number')) { _deactivated = 'deactivatedOptionButton'; }
            // if (_applicationType === 'front_number' || _applicationType === 'back_number' ) { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }
            //
            // _htmlBuilder        +=           '<div data-type="player_number" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-number-large.png">' + '</div>';
            // _htmlBuilder        +=                 '<div class="caption">Player Number ' + _selected + '</div>';
            // _htmlBuilder        +=           '</div>';
            // _deactivated ='';
            // _currentlySelectedType = '';
            // _selected = '';
            //
            // if (!_.contains(_validApplicationTypes, 'team_name')) { _deactivated = 'deactivatedOptionButton'; }
            // if (_applicationType === 'team_name') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }
            //
            // _htmlBuilder        +=           '<div data-type="team_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
            // _htmlBuilder        +=                 '<div class="caption">Team Name ' + _selected + '</div>';
            // _htmlBuilder        +=           '</div>';
            //
            // _htmlBuilder        +=           '<br />';
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';
            //
            // if (!_.contains(_validApplicationTypes, 'player_name')) { _deactivated = 'deactivatedOptionButton'; }
            // if (_applicationType === 'player_name') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }
            //
            // _htmlBuilder        +=           '<div data-type="player_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
            // _htmlBuilder        +=                 '<div class="caption">Player Name ' + _selected + '</div>';
            // _htmlBuilder        +=           '</div>';
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';
            //
            // if (!_.contains(_validApplicationTypes, 'logo')) { _deactivated = 'deactivatedOptionButton'; }
            // if (_applicationType === 'mascot') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }
            //
            // _htmlBuilder        +=           '<div data-type="mascot" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-mascot-large.png">' + '</div>';
            // _htmlBuilder        +=                 '<div class="caption">Stock Mascot ' + _selected + '</div>';
            // _htmlBuilder        +=           '</div>';
            //
            // //if (ub.config.uniform_application_type !== "sublimated" && ub.config.uniform_application_type !== "knitted") {
            // //if (ub.config.uniform_application_type !== "tackle_twill" && ub.config.uniform_application_type !== "sublimated" && ub.config.uniform_application_type !== "knitted") {
            //     if (!_.contains(_validApplicationTypes, 'embellishments')) { _deactivated = 'deactivatedOptionButton'; }
            // //}
            //
            // _htmlBuilder        +=           '<div class="optionButton ' + _deactivated + '" data-type="embellishments">';
            // _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-embellishments-large.png">' + '</div>';
            // _htmlBuilder        +=                 '<div class="caption">Custom Mascot</div>';
            // _htmlBuilder        +=           '</div>';
            //
            // _htmlBuilder        +=      '</div>';
            // _htmlBuilder        += "</div>";
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';

            var vAppTypes = ub.funcs.selectApplicationTypeLocation(_id, _applicationType, _validApplicationTypes);

            // send to mustache
            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-choices', vAppTypes);

            $('.modifier_main_container').append(_htmlBuilder);
            $('div#changeApplicationUI').fadeIn().data('status', 'visible');
            $('div.applicationType').addClass('toggledApplicationType');

            $('div.optionButton').on('click', function () {

                if ($(this).hasClass('deactivatedOptionButton')) {
                    return;
                }

                var _type = $(this).data('type');

                ub.funcs.changeApplicationType(_settingsObject, _type);
                $('div#changeApplicationUI').remove();

            });

            $('div.closeApplicationChanger').on('click', function () {

                $('div#changeApplicationUI').hide().data('status', 'hidden');
                $('div.applicationType').removeClass('toggledApplicationType');

            });

        });

        var _matchingID = undefined;

        _matchingID = ub.data.matchingIDs.getMatchingID(_id);
        if (typeof _matchingID !== "undefined") {

            ub.funcs.toggleApplication(_matchingID.toString(), _status);

        }

        $('span.font_size').on('click', function () {

            //if (_id === '4') { return; }

            var _selectedSize = $(this).data('size');
            $('.font_size').removeClass('active');
            $(this).addClass('active');

            var _isCustom = $(this).hasClass('custom');
            var _isScale = $(this).hasClass('scale');
            var _isRotate = $(this).hasClass('rotate');
            var _isMove = $(this).hasClass('move');

            if (_isCustom && _isScale) {

                $('div.color-pattern-tabs').hide();
                $('span.tab[data-item="manipulators"]').trigger('click');
                $('li.tab.scale').trigger('click');

                return;

            }

            if (_isCustom && _isMove) {

                $('color-pattern-tabs').hide();
                $('span.tab[data-item="manipulators"]').trigger('click');
                $('li.tab.move').trigger('click');

                return;

            }

            if (_isCustom && _isRotate) {

                $('color-pattern-tabs').hide();
                $('span.tab[data-item="manipulators"]').trigger('click');
                $('li.tab.rotate').trigger('click');

                return;

            }

            var oldScale = ub.funcs.clearScale(_settingsObject);
            _settingsObject.oldScale = oldScale;

            ub.funcs.changeMascotSize(_selectedSize, _settingsObject);

            var _matchingID = undefined;
            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
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

            var _layer_no = $(this).data('layer-no');
            var _color_code = $(this).data('color-code');
            var _layer_name = $(this).data('layer-name');
            var _temp = $(this).data('temp');
            var _colorObj = ub.funcs.getColorByColorCode(_color_code);

            var _oldVal = {

                layerNo: _layer_no,
                color: _settingsObject.color_array[_layer_no - 1],
                applicationCode: _settingsObject.code,

            }

            if (_temp !== 'undo') {

                ub.funcs.pushOldState('color change', 'application', _settingsObject, _oldVal);

            }

            ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject);
            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

            var _processMatchingSide = true;
            var _matchingID = undefined;
            var _matchingSettingsObject = undefined;

            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {
                _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            }

            // On Crew Socks, only change the color of the matching side if its the same mascot id
            if (typeof _matchingSettingsObject !== "undefined") {

                if (_matchingSettingsObject.type !== "free" && ub.funcs.isSocks()) {

                    _processMatchingSide = false;

                }

                if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

                    if (_settingsObject.mascot.id === _matchingSettingsObject.mascot.id) {
                        _processMatchingSide = true;
                    }

                }

            }

            if (typeof _matchingID !== "undefined") {

                if (_processMatchingSide) {

                    ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);

                }

            }

        });

        // End Small Color Pickers

        // End Events

        $("div.toggleOption").unbind('click');
        $("div.toggleOption").on("click", function () {

            var _currentStatus = $('div.toggle').data('status');
            var s;

            if (_currentStatus === "on") {
                s = 'off';
            }
            else {
                s = 'on';
            }

            if (s === "on") {
                ub.funcs.LSRSBSFS(parseInt(_id));
            }

            ub.funcs.toggleApplication(_id, s);

            var _matchingSide;
            var _matchingID = undefined;
            var _processMatchingSide = true;
            var _matchingSettingsObject = undefined;

            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {

                _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});

            }

            if (typeof _matchingSettingsObject !== "undefined") {

                if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

                    // Toggle matching mascot if the same mascot is selected
                    _processMatchingSide = _settingsObject.mascot.id === _matchingSettingsObject.mascot.id

                }

            }

            if (typeof _matchingID !== "undefined") {

                if (_processMatchingSide) {
                    ub.funcs.toggleApplication(_matchingID, s);
                }

            }

        });

        $('div#applicationUI').fadeIn();
        ub.funcs.activateMoveTool(application_id);
        ub.funcs.activateLayer(application_id);
        ub.funcs.toggleApplication(_id, _status);
        ub.funcs.afterActivateMascots(_id);

    }

    ub.funcs.turnOffApplicationsBySide = function (perspective) {

        _.each(ub.current_material.settings.applications, function (application) {

            var _primaryPerspective = ub.funcs.getPrimaryView(application.application);

            if (_primaryPerspective === perspective) {

                if (application.status === "on") {

                    ub.funcs.toggleApplication(parseInt(application.code), "off");

                }

            }

        });

    }

    ub.funcs.turnOnApplicationsBySide = function (perspective) {

        _.each(ub.current_material.settings.applications, function (application) {

            var _primaryPerspective = ub.funcs.getPrimaryView(application.application);

            if (_primaryPerspective === perspective) {

                if (application.status === "off" && application.application_type !== "free") {

                    ub.funcs.toggleApplication(parseInt(application.code), "on");

                }

            }

        });

    }

    ub.funcs.LSRSBSFS = function (_id) {

        var _settingsObject = ub.funcs.getApplicationSettings(_id);
        var _perspective;

        // LS, RS - FS, BS for crew socks

        if (_id === 52 || _id === 53) {

            ub.funcs.toggleApplication(54, "off");
            ub.funcs.toggleApplication(55, "off");

        }

        if (_id === 54 || _id === 55) {

            ub.funcs.toggleApplication(52, "off");
            ub.funcs.toggleApplication(53, "off");

        }

        // Check if this is from the Free Form Tool on Socks
        // exception on 'Hockey Sock' block pattern
        if (parseInt(_id) > 70 && ub.funcs.isSocks() && ub.config.blockPattern !== 'Hockey Sock') {

            if (typeof _settingsObject !== "undefined" && _settingsObject.application_type !== "free") {

                _perspective = ub.funcs.getPrimaryView(_settingsObject.application);

                if (_perspective === "left" || _perspective === "right") {

                    ub.funcs.turnOffApplicationsBySide('back');
                    ub.funcs.turnOffApplicationsBySide('front');

                    ub.funcs.turnOnApplicationsBySide('left');
                    ub.funcs.turnOnApplicationsBySide('right');

                }

                if (_perspective === "front" || _perspective === "back") {

                    ub.funcs.turnOffApplicationsBySide('left');
                    ub.funcs.turnOffApplicationsBySide('right');

                    ub.funcs.turnOnApplicationsBySide('front');
                    ub.funcs.turnOnApplicationsBySide('back');

                }

            }

        }

    }

    ub.funcs.changeActiveColorSmallColorPicker = function (_layer_no, _color_code, _colorObj, type) {

        var $smallPickerContainer = $('div.smallPickerContainer[data-layer-no="' + _layer_no + '"]');
        var _checkMark = '<i class="fa fa-check" aria-hidden="true"></i>';
        var _checkMarkNone = '<i class="fa fa-ban" aria-hidden="true"></i>';
        var _type = type;

        if (typeof type === "undefined") {

            _type = '';

        } else {

            _type = '[data-object-type="' + type + '"]';

        }

        var $colorItems = $smallPickerContainer.find('span.colorItem' + _type).not('.turnOff').not('[data-color-code="none"]');

        $colorItems.html('&nbsp;');
        $colorItems.css('width', '25px');
        $colorItems.removeClass('activeColorItem');

        var $activeColorItem = $smallPickerContainer.find('span.colorItem' + _type + '[data-color-code="' + _color_code + '"]').not('.turnOff');

        $activeColorItem.addClass('activeColorItem');
        $activeColorItem.css('width', '40px');

        if (_color_code === "none") {

            $activeColorItem.html(_checkMarkNone);
            $activeColorItem.css('color', '#000');

        } else {

            $activeColorItem.css('color', '#fff');
            $activeColorItem.html(_checkMark);

            $smallPickerContainer.find('span.colorItem' + _type + '[data-color-code="none"]').css('color', '#eee').css('width', '25px');

        }

    },

        ub.data.markerBitField = {};
    ub.funcs.highlightMarker = function (code, view) {

        if (view !== ub.active_view) {
            return;
        }

        if (typeof ub.objects[view + '_view']['locations_' + code] !== 'undefined') {

            var s = _.find(ub.objects[view + '_view']['locations_' + code].children, {ubName: 'Marker'});
            s.alpha = 1;

            ub.data.markerBitField[code] = {value: true, code: code}
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

            ub.data.markerBitField[code] = {value: false, code: code}

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

        // Consider deleted locations
        if (typeof _settingsObj === "undefined") {
            return;
        }

        var _views = _settingsObj.application.views;

        ////

        var _state = state;

        if (_state === "off") {

            if (ub.activeApplication === id) {
                return;
            }

            $('div.toggle').data('status', "off");

            $('div.valueContainer').css('margin-left', '-100px');
            $('div.cover').fadeIn('fast');
            $('div.toggle').removeClass('defaultShadow');
            $('div.applicationType').css({'color': '#acacac', 'text-decoration': 'line-through', 'opacity': '0.2'});
            $('span.cog').hide();

        } else {

            $('div.toggle').data('status', "on");

            $('div.valueContainer').css('margin-left', '0px');
            $('div.cover').hide();
            $('div.toggle').addClass('defaultShadow');
            $('div.applicationType').css({'color': '#3d3d3d', 'text-decoration': 'initial', 'opacity': '1'});
            $('span.cog').fadeIn();

            ub.funcs.hideGAFontTool();

        }

        ////

        _.each(_views, function (view) {

            var _view = view.perspective + '_view';
            var _obj = ub.objects[_view]['objects_' + id];

            if (typeof _obj === "undefined") {
                return;
            }

            if (_state === "on") {

                _obj.zIndex = -(ub.funcs.generateZindex('applications') + _settingsObj.zIndex);
                _settingsObj.status = "on";
                if (! (_settingsObj.application_type === "mascot" || _settingsObj.application_type === "embellishments")) {
                    ub.funcs.changeFontFromPopup(_settingsObj.font_obj.id, _settingsObj)
                }
                ub.updateLayersOrder(ub[_view]);
                
            } else {

                _obj.oldZIndex = _obj.zIndex;
                _obj.zIndex = 0;
                ub.updateLayersOrder(ub[_view]);
                _settingsObj.status = "off";

            }

        });

    }

    ub.funcs.deActivateLocations = function () {

        if (ub.showLocation) {

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

    ub.funcs.preProcessApplication = function (applicationID) {

        var _front = [4, 1, 2, 3, 11, 31, 29, 27, 25, 30, 28, 26, 24, 37, 13, 38, 12];
        var _back = [34, 7, 6, 5, 51, 8, 15, 14, 40, 22, 39, 23];
        var _left = [32, 48, 50, 10, 44, 42, 20, 18, 16, 36];
        var _right = [33, 47, 49, 9, 43, 41, 21, 19, 17, 35];

        var _id = parseInt(applicationID);

        // var _frontResult    = _.contains(_front, _id);
        // var _backResult     = _.contains(_back, _id);
        // var _leftResult     = _.contains(_left, _id);
        // var _rightResult    = _.contains(_right, _id);

        // if(_frontResult) { $('a.change-view[data-view="front"]').trigger('click'); }
        // if(_backResult) { $('a.change-view[data-view="back"]').trigger('click'); }
        // if(_leftResult) { $('a.change-view[data-view="left"]').trigger('click'); }
        // if(_rightResult) { $('a.change-view[data-view="right"]').trigger('click'); }

    }

    ub.funcs.getMascotObj = function () {

    }

    ub.funcs.getAccentByName = function (name) {

        var _accent = _.find(ub.data.accents.items, {name: name});
        return _accent;

    }

    ub.funcs.getFontByName = function (name) {

        var _font = _.find(ub.data.fonts, {name: name});
        return _font;

    }

    ub.funcs.getFontByID = function (id) {

        var _font = _.find(ub.data.fonts, {id: id});
        return _font;

    }

    ub.funcs.getSampleAccent = function () {

        var _accent = ub.funcs.getAccentByName('Default');
        return _accent;

    }

    ub.funcs.getSampleTeamName = function () {

        var _sampleTeamName = 'Mustangs';

        if (ub.funcs.getCurrentUniformCategory() === "Wrestling") {
            _sampleTeamName = 'Tigers';
        }

        return _sampleTeamName;

    }

    ub.funcs.getSamplePlayerName = function () {

        var _samplePlayerName = 'Grizzlies';

        if (ub.funcs.getCurrentUniformCategory() === "Wrestling") {
            _samplePlayerName = 'Tiger';
        }

        return _samplePlayerName;

    }

    ub.funcs.getSampleNumber = function () {

        var _sampleNumber = "85";
        return _sampleNumber;

    }

    ub.funcs.clearInksoftID = function (settingsObject) {

        _.each(settingsObject.application.views, function (view) {
            view.application.inksoftDesignID = undefined;
        });

    }

    ub.funcs.changeApplicationType = function (settingsObject, type) {

        // delete custom object amd scale type
        // this are use for embellishment applications only
        // TODO: create a cleaup funcs
        delete settingsObject.custom_obj;
        delete settingsObject.scale_type;

        var _settingsObject = settingsObject;
        var _type = type;
        var _id = parseInt(_settingsObject.code);

        if (_type === 'mascot') {

            var _applicationType = 'mascot';
            var _mascotID = '181'; 

            if (ub.current_material.material.brand === "richardson") { _mascotID = '1584'; }   

            var _size;

            ub.funcs.deActivateApplications();

            _settingsObject.application_type = _applicationType;
            _settingsObject.type = _applicationType;
            _settingsObject.object_type = _applicationType;
            _settingsObject.mascot = _.find(ub.data.mascots, {id: _mascotID});
            _settingsObject.color_array = ub.funcs.getDefaultColors();

            _settingsObject.application.name = _applicationType.toTitleCase();
            _settingsObject.application.type = _applicationType;

            if (_id === 1) {
                _size = 2;
            }
            if (_id === 2) {
                _size = 8;
            }
            if (_id === 5) {
                _size = 10;
            }
            if (_id === 4) {
                _size = 0.5;
            }

            if (_id === 2 || _id === 5 || _id > 70) {
                _size = 8;
            } else if (_id === 9 || _id === 10 || _id === 32 || _id === 33) {
                _size = 3;
            } else {
                _size = 2;
            }

            if (ub.funcs.isCurrentSport('Wrestling') && ub.current_material.material.type === "upper") {
                _size = 5;
            }
            if (ub.funcs.isCurrentSport('Wrestling') && ub.current_material.material.neck_option === "Fight Short") {
                _size = 5;
            }
            if (!ub.funcs.isCurrentSport('Football') && !ub.funcs.isCurrentSport('Wrestling')) {
                _size = 4;
            }

            if (ub.funcs.isCurrentSport('Football 2017') && (_id === 4 || _id === 7)) {
                _size = 1;
            }

            if (ub.funcs.isCurrentSport('Baseball') && _id === 15) {
                _size = 1.75;
            }
            if (ub.funcs.isCurrentSport('Baseball') && (_id === 7 || _id === 6)) {
                _size = 2;
            }
            if (ub.funcs.isCurrentSport('Fastpitch') && _id === 15) {
                _size = 1.75;
            }
            if (ub.funcs.isCurrentSport('Fastpitch') && (_id === 7 || _id === 6)) {
                _size = 2;
            }

            if (ub.funcs.isSocks()) {
                _size = 2.5;
            }

            if (ub.funcs.isCurrentSport("Baseball") && _.contains([37, 38], _id)) {
                _size = 3;
            }
            if (ub.funcs.isCurrentSport("Baseball") && _.contains([39, 40], _id)) {
                _size = 2;
            }
            if (ub.funcs.isCurrentSport("Fastpitch") && _.contains([37, 38], _id)) {
                _size = 3;
            }
            if (ub.funcs.isCurrentSport("Fastpitch") && _.contains([39, 40], _id)) {
                _size = 2;
            }

            if (ub.funcs.isCurrentSport('Volleyball') && ub.current_material.material.type === "lower") {
                _size = 1;
            }
            if (ub.funcs.isCurrentSport('Volleyball') && ub.current_material.material.type === "upper") {
                _size = 2;
            }

            if (ub.funcs.isCurrentSport("Hockey") && _.contains([2, 5], _id)) {
                _size = 6;
            }

            if (ub.funcs.isCurrentSport("2017 Team Short with Pockets (Apparel)")) {
                _size = 4;
            }
            if (ub.funcs.isCurrentSport("Signature Coaches Short (Apparel)")) {
                _size = 4;
            }

            if (ub.funcs.isCurrentSport('Football') && ub.current_material.material.type === "lower" && ub.config.uniform_application_type === "sublimated") {
                _size = 4;
            }

            ub.funcs.setAppSize(_id, _size);
            ub.funcs.clearInksoftID(_settingsObject); // Remove Inksoft ID from settings object in case it was changed from custom to stock

            var _matchingSide;
            var _matchingID = undefined;
            var _processMatchingSide = true;

            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (_.contains(ub.data.matchingApplications, _id) && typeof _matchingID !== 'undefined') {

                _matchingSide = ub.current_material.settings.applications[_matchingID];

                // On Crew Socks, only duplicate application on matching side is the matching side is blank, otherwise skip this and allow different mascots
                if (_matchingSide.type !== "free" && ub.funcs.isSocks()) {
                    _processMatchingSide = false;
                }

                if (_processMatchingSide) {

                    _matchingSide.application_type = _applicationType;
                    _matchingSide.type = _applicationType;
                    _matchingSide.object_type = _applicationType;
                    _matchingSide.color_array = ub.funcs.getDefaultColors();

                    if (_settingsObject.color_array.length > 1) {
                        _settingsObject.color_array = [_settingsObject.color_array[0]];
                    }

                    _matchingSide.mascot = _.find(ub.data.mascots, {id: _mascotID});

                    if (typeof _matchingSide.color_array === 'undefined') {
                        _matchingSide.color_array = [ub.current_material.settings.team_colors[1],];
                    }

                    _matchingSide.application.name = _applicationType.toTitleCase();
                    _matchingSide.application.type = _applicationType;

                    ub.funcs.setAppSize(_matchingID, _size);
                    ub.funcs.update_application_mascot(_matchingSide.application, _matchingSide.mascot);

                }

            }

            ub.funcs.update_application_mascot(_settingsObject.application, _settingsObject.mascot);

            ub.current_material.settings.applications[_id] = _settingsObject;
            ub.funcs.LSRSBSFS(parseInt(_id));

            if (ub.data.useScrollingUI) {
                ub.funcs.activateApplicationsAll(_settingsObject.code);
            } else {
                ub.funcs.activateMascots(_settingsObject.code);
            }

        }

        if (_type === 'player_name') {

            ub.funcs.deActivateApplications();

            var _applicationType = 'player_name';
            var _size = 2.5;

            if (ub.funcs.isFreeFormToolEnabled(_id)) {
                _size = 4;
            }

            if (ub.funcs.isCurrentSport('Baseball')) {
                _size = 2;
            }
            if (ub.funcs.isCurrentSport('Fastpitch')) {
                _size = 2;
            }

            ub.funcs.setAppSize(_id, _size);

            _settingsObject.accent_obj = ub.funcs.getSampleAccent();
            _settingsObject.text = ub.funcs.getSamplePlayerName();
            _settingsObject.application_type = _applicationType;
            _settingsObject.type = _applicationType;
            _settingsObject.object_type = 'text object';
            _settingsObject.font_obj = ub.funcs.getSampleFont();
            _settingsObject.color_array = ub.funcs.getDefaultColors();

            if (_settingsObject.color_array.length > 1) {
                _settingsObject.color_array = [_settingsObject.color_array[0]];
            }

            _settingsObject.application.name = _applicationType.toTitleCase();
            _settingsObject.application.type = _applicationType;

            ub.create_application(_settingsObject, undefined);
            if (ub.data.useScrollingUI) {
                ub.funcs.activateApplicationsAll(_settingsObject.code);
            } else {
                ub.funcs.activateApplications(_settingsObject.code);
            }
            ub.current_material.settings.applications[_id] = _settingsObject;

            delete ub.current_material.settings.applications[_id].application.views[0].application.appCustomScale;
        }

        if (_type === 'player_number') {

            ub.funcs.deActivateApplications();

            var _applicationType = '';
            var _sizeObj = undefined;

            // list of sport block patterns that ignore ub.data.initialSizes
            var blockPatternsException = ['Hockey Socks'];

            // Temporary, this is to fix the issue regarding Hockey Socks (Jan. 25, 2019 @elmer)
            if (!_.contains(blockPatternsException, ub.current_material.material.block_pattern)) {
                _sizeObj = ub.data.initialSizes.getSize(_type, _id, ub.current_material.material.uniform_category);
            } else {

                if (ub.config.type === 'lower' && _.contains(blockPatternsException, ub.current_material.material.block_pattern)) {
                    _sizeObj = ub.data.initialSizesLower.getSize(_type, _id, ub.current_material.material.uniform_category, ub.current_material.material.block_pattern);
                }

            }

            if (typeof _sizeObj !== "undefined") {

                _applicationType = _sizeObj.resultApplicationType;
                _settingsObject.size = _sizeObj.size;
                _settingsObject.font_size = _sizeObj.font_size;

                var _inShoulder = _settingsObject.application.layer.indexOf('Shoulder') !== -1 || _settingsObject.application.layer.indexOf('Cowl') !== -1;
                var _inSleeve = _settingsObject.application.layer.indexOf('Sleeve') !== -1;

                if (_inShoulder) {
                    _applicationType = "shoulder_number";
                }
                if (_inSleeve) {
                    _applicationType = "sleeve_number";
                }

                var _primaryView = ub.funcs.getPrimaryView(_settingsObject.application);

                if (_primaryView === "front" && !(_inShoulder || _inSleeve)) {
                    _applicationType = "front_number";
                }
                if (_primaryView === "back" && !(_inShoulder || _inSleeve)) {
                    _applicationType = "back_number";
                }

            }

            _settingsObject.accent_obj = ub.funcs.getSampleAccent();

            _settingsObject.text = ub.funcs.getSampleNumber();
            _settingsObject.application_type = _applicationType;
            _settingsObject.type = _applicationType;
            _settingsObject.object_type = 'text object';
            _settingsObject.font_obj = ub.funcs.getSampleFont();
            _settingsObject.color_array = ub.funcs.getDefaultColors();

            if (typeof _settingsObject.color_array === 'undefined') {
                _settingsObject.color_array = [ub.current_material.settings.team_colors[1],];
            }

            if (_settingsObject.color_array.length > 1) {
                _settingsObject.color_array = [_settingsObject.color_array[0]];
            }

            _settingsObject.application.name = _applicationType.toTitleCase();
            _settingsObject.application.type = _applicationType;

            var _matchingID;
            var _matchingSide;

            _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

            if (typeof _matchingID !== "undefined") {

                if (_.contains(ub.data.matchingApplications, _id)) {

                    _matchingSide = ub.current_material.settings.applications[_matchingID];

                    _matchingSide.accent_obj = ub.funcs.getSampleAccent();
                    _matchingSide.text = ub.funcs.getSampleNumber();
                    _matchingSide.application_type = _applicationType;
                    _matchingSide.type = _applicationType;
                    _matchingSide.object_type = 'text object';
                    _matchingSide.font_obj = ub.funcs.getSampleFont();
                    _matchingSide.color_array = ub.funcs.getDefaultColors();

                    if (_matchingSide.color_array.length > 1) {
                        _matchingSide.color_array = [_matchingSide.color_array[0]];
                    }

                    _matchingSide.application.name = _applicationType.toTitleCase();
                    _matchingSide.application.type = _applicationType;

                    ub.funcs.setAppSize(_matchingID, _sizeObj.size);
                    ub.create_application(_matchingSide, undefined);

                }

            }

            ub.create_application(_settingsObject, undefined);
            if (ub.data.useScrollingUI) {
                ub.funcs.activateApplicationsAll(_settingsObject.code);
            } else {
                ub.funcs.activateApplications(_settingsObject.code);
            }
            ub.current_material.settings.applications[_id] = _settingsObject;

            delete ub.current_material.settings.applications[_id].application.views[0].application.appCustomScale;

        }

        if (_type === 'team_name') {

            ub.funcs.deActivateApplications();

            var _applicationType = 'team_name';
            var _size = 2;

            if (_.isEqual(ub.config.blockPattern, 'Hockey Twill Set-in')) { _size = 2.5; }

            ub.funcs.setAppSize(_id, _size);

            _settingsObject.text = ub.funcs.getSampleTeamName();
            _settingsObject.accent_obj = ub.funcs.getSampleAccent();
            _settingsObject.application_type = _applicationType;
            _settingsObject.type = _applicationType;
            _settingsObject.object_type = 'text object';
            _settingsObject.font_obj = ub.funcs.getSampleFont();
            _settingsObject.color_array = ub.funcs.getDefaultColors();

            if (_settingsObject.color_array.length > 1) {
                _settingsObject.color_array = [_settingsObject.color_array[0]];
            }

            _settingsObject.application.name = _applicationType.toTitleCase();
            _settingsObject.application.type = _applicationType;

            ub.create_application(_settingsObject, undefined);
            if (ub.data.useScrollingUI) {
                ub.funcs.activateApplicationsAll(_settingsObject.code);
            } else {
                ub.funcs.activateApplications(_settingsObject.code);
            }
            ub.current_material.settings.applications[_id] = _settingsObject;

            ub.funcs.LSRSBSFS(parseInt(_id));

            delete ub.current_material.settings.applications[_id].application.views[0].application.appCustomScale;

        }

        if (_type === 'embellishments') {

            var _applicationType = 'embellishments';
            var _size = 4;
            var _embellishmentID = 1722159;

            // ub.funcs.getDesignSummary

            ub.funcs.deActivateApplications();

            _settingsObject.font_obj = ub.funcs.getSampleFont();
            _settingsObject.application_type = _applicationType;
            _settingsObject.type = _applicationType;
            _settingsObject.object_type = _applicationType;
            _settingsObject.embellishment = window.is.embellishments.getDefaultEmbellishment(_settingsObject); // window.is.embellishments.getEmbellishmentByID(_embellishmentID); // Add support for kollege town, prolook name drops or tailsweeps
            _settingsObject.color_array = ub.funcs.getDefaultColors();

            _settingsObject.application.name = _applicationType.toTitleCase();
            _settingsObject.application.type = _applicationType;

            ub.funcs.setAppSize(_id, _size);

            /// Include Matching Side code here ...

            //==>

            ub.funcs.update_application_embellishments(_settingsObject.application, _settingsObject.embellishment);
            ub.current_material.settings.applications[_id] = _settingsObject;
            ub.funcs.LSRSBSFS(parseInt(_id));

            if (ub.data.useScrollingUI) {
                ub.funcs.activateApplicationsAll(_settingsObject.code);
            } else {
                ub.funcs.activateEmbellishments(_settingsObject.code);
            }

            //==>


            // TODO
            // Create
            // - ub.funcs.update_application_embellishments => from ub.funcs.update_application_mascot(_settingsObject.application, _settingsObject.mascot);
            // - ub.funcs.activateEmbellishments => from ub.funcs.update_application_mascot(_matchingSide.application, _matchingSide.mascot);
            // - ub plugins - $.ub.create_embellishment

        }

        ub.funcs.runAfterUpdate(_id);

    }

    ub.funcs.postData = function (data, url) {

        var _postData = data;
        var _url = url;

        $.ajax({

            url: _url,
            type: "POST",
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function (response) {

                ub.showModal(response.message);
                ub.loader(ub.current_material.fonts_url, 'fonts', ub.callback_update);

            }

        });

    };

    ub.funcs.saveFontData = function (fontID, size, applicationID, perspective) {

        var _newFontSizeTable = [];

        var _fontID = fontID;
        var _fontSize = size;
        var _fontObject = ub.funcs.getFontByID(_fontID);
        var _fontSizeTable = JSON.parse(_fontObject.font_size_table.slice(1, -1));
        var _fontSizeData = ub.data.getPixelFontSize(_fontID, _fontSize);

        var _inputSize = $('input[name="font-size"]').val();
        var _offsetX = $('input[name="offsetX"]').val();
        var _offsetY = $('input[name="offsetY"]').val();
        var _scaleX = $('input[name="scaleX"]').val();
        var _scaleY = $('input[name="scaleY"]').val();

        _fontSizeData.outputSize = _inputSize;
        _fontSizeData.xOffset = _offsetX;
        _fontSizeData.yOffset = _offsetY;
        _fontSizeData.xScale = _scaleX;
        _fontSizeData.yScale = _scaleY;

        _.each(_fontSizeTable, function (fontSizeData) {

            if (fontSizeData.inputSize === _fontSizeData.inputSize) {

                _newFontSizeTable.push(_fontSizeData);
                return;

            }

            _newFontSizeTable.push(fontSizeData);

        });

        var _url = ub.config.api_host + '/api/font/dupdate';
        var _postData = {
            name: _fontObject.name,
            id: fontID,
            font_size_table: _newFontSizeTable,
        }

        ub.funcs.postData(_postData, _url);

    };

    ub.funcs.hideGAFontTool = function () {

        // Hide GA Font Tool
        $('span.cog').hide();

    };

    ub.funcs.runBeforeUpdate = function (application_id) {

        // TODO: Application Preprocessing Event Here ...

    };

    ub.funcs.runAfterUpdate = function (application_id, fromChangeColor) {

        var _settingsObject = ub.funcs.getSettingsObject(application_id);

        // Dirty Flag is set when application is moved using the free form tool
        // Set on Move Tool mouse down

        if (!_settingsObject.dirty) {
            if (ub.current_material.material.brand !== 'richardson') {

                var sport           = ub.current_material.material.uniform_category;
                var blockPattern    = ub.current_material.material.block_pattern;

                // Disable oneInchPullUp for Socks (Apparel) with block pattern of Hockey Socks
                if (!ub.data.oneInchPullUpExemptions.isExempted(sport, blockPattern)) {
                    ub.funcs.oneInchPullUp(application_id);
                }

            }
        }

        ub.funcs.updateCaption(application_id);

        if (ub.funcs.isCurrentType('upper')) {

            ub.funcs.oneInchPullUpMascots(application_id);

        } else {

            if (typeof fromChangeColor == "undefined") {

                ub.funcs.oneInchPushDownMascotsPant(application_id);

            }

        }

    };

    ub.funcs.okToStart = function () {

        var ok = true;

        var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);
        var _sizeOfColorsUsed = _.size(ub.data.colorsUsed);

        if (_sizeOfTeamColors < _sizeOfColorsUsed || _sizeOfTeamColors > 8) {

            //if(_sizeOfTeamColors < _sizeOfColorsUsed){
            if (_sizeOfTeamColors < 2) {
                ub.startModal(1);
                ok = false;
                ;
            }

            if (!ub.branding.useAllColors) {
                if (_sizeOfTeamColors > 8) {
                    ub.startModal(2);
                    ok = false;
                }
            }

        }

        return ok;

    }

    ub.funcs.updateCoordinates = function (_settingsObject) {

        var _primaryViewObj = ub.funcs.getPrimaryViewObject(_settingsObject.application);

        var _x = Math.round(_primaryViewObj.application.center.x);
        var _y = Math.round(_primaryViewObj.application.center.y);

        $('span.custom_text.move').html(_x.toString().substr(0, 4) + ', ' + _y.toString().substr(0, 4));

    }

    ub.funcs.activatePanelGuard = function () {

        if ($('div#parts_dropdown').is(':visible') || $('div#single_team-color-picker').is(':visible')) {

            ub.funcs.activateBody();

        }

    }

    ub.funcs.deactivatePipings = function () {

        $('div#pipingsUI').remove();

    };

    ub.funcs.deActivateRandomFeeds = function () {

        $('div#randomFeedsUI').remove();

    }

    ub.funcs.deactivatePanels = function () {

        ub.funcs.deActivateApplications();
        ub.funcs.deActivateColorPickers();
        ub.funcs.deActivatePatterns();
        ub.funcs.deActivateLocations();
        ub.funcs.deactivatePipings();
        ub.funcs.deactivatePipings();
        ub.funcs.deActivateRandomFeeds();

    }

    ub.funcs.popupsVisible = function () {

        return ($('div#primaryMascotPopup').is(':visible') || $('div#primaryPatternPopup').is(':visible'));

    }

    ub.funcs.beforeActivateApplication = function () {

        // Remove Change Application UI
        $('div#changeApplicationUI').remove();

    }

    ub.funcs.afterActivateApplication = function (application_id) {

        if (!ub.funcs.isCurrentSport('Football')) {

            // Remove force uppercase requirement on Team Name input
            $('input.sampleText').addClass('disableUpperCaseRequirement');

        }

        if (_.contains(ub.fontGuideIDs, window.ub.valid)) {

            $('span.cog').fadeIn();

        }

        // if (parseInt(application_id) === 1) {

        //     var _settingsObject = ub.funcs.getApplicationSettings(1);

        //     if (_settingsObject.application_type === "team_name" && ub.funcs.isCurrentSport('Baseball')) {

        //         //ub.objects.front_view.objects_1.zIndex = -80; // So it will be rendered above the piping
        //         //ub.updateLayersOrder(ub.front_view);

        //     }

        // }

    }

    ub.funcs.isFreeFormToolEnabled = function (application_id) {

        return ub.data.freeFormToolEnabledSports.isValid(ub.current_material.material.uniform_category) && parseInt(application_id) > 70;

    }


    ub.funcs.setAUIActiveSize = function (size) {

        $('span.font_size').removeClass('active');
        $('span.font_size[data-size="' + size + '"]').addClass('active');

    }


    ub.funcs.setupManipulatorEvents = function (settingsObject, _applicationType) {

        $('ul.tab-navs > li.tab').unbind('click');
        $('ul.tab-navs > li.tab').on('click', function () {

            var _action = $(this).data('action');

            $('ul.tab-navs > li.tab').removeClass('active');
            $(this).addClass('active');

            $('div.manipulator-type-container').hide();
            $('div.manipulator-type-container[data-type="' + _action + '"]').show();

            if (_action === "move") {
                $('div.color-pattern-tabs').hide();
                ub.funcs.initializeMovePanel(settingsObject, _applicationType);
            }

            if (_action === "rotate") {
                $('div.color-pattern-tabs').hide();
                ub.funcs.initializeRotatePanel(settingsObject, _applicationType);
            }

            if (_action === "scale") {
                $('div.color-pattern-tabs').hide();
                ub.funcs.initializeScalePanel(settingsObject, _applicationType);
            }

            if (_action === "close") {
                $('.colorContainer.embellishment-buttons-container').show();
                $('span.font_size').removeClass('active');
                $('div.color-pattern-tabs').show();
                $('span.tab[data-item="colors"]').trigger('click');
            }

        });

    }


    ub.funcs.setupTextSmallColorPickerEvents = function (_settingsObject) {

        $('span.colorItem[data-object-type="accent"]').unbind('click');
        $('span.colorItem[data-object-type="accent"]').on('click', function () {

            var _layer_no = $(this).data('layer-no');
            var _color_code = $(this).data('color-code');
            var _layer_name = $(this).data('layer-name');
            var _colorObj = ub.funcs.getColorByColorCode(_color_code);
            var _layer = _.find(_settingsObject.accent_obj.layers, {name: _layer_name});

            _layer.default_color = _colorObj.hex_code;
            _settingsObject.color_array[_layer_no - 1] = _colorObj;

            ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);
            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj, 'accent');

            var _matchingID;
            var _matchingSide;

            _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                var _layer = _.find(_matchingSettingsObject.accent_obj.layers, {name: _layer_name});

                _layer.default_color = _colorObj.hex_code;
                _matchingSettingsObject.color_array[_layer_no - 1] = _colorObj;

                ub.funcs.changeFontFromPopup(_matchingSettingsObject.font_obj.id, _matchingSettingsObject);

            }

        });

    }

    ub.funcs.updateManipulatorsPanel = function (settingsObj) {

        var _templateStr = '';
        _templateStr = ub.utilities.buildTemplateString("#m-manipulator-panel", {});
        return _templateStr;

    }

    ub.funcs.activateApplications = function (application_id) {

        ub.funcs.beforeActivateApplication();

        if ($('div#primaryPatternPopup').is(':visible')) {
            return;
        }
        if ($('div#primaryMascotPopup').is(':visible')) {
            return;
        }

        ub.funcs.beforeActivateApplication();

        if (!ub.funcs.okToStart()) {
            return;
        }

        ub.funcs.activatePanelGuard();

        if (ub.funcs.isBitFieldOn()) {

            var _marker = _.find(ub.data.markerBitField, {value: true});

            if (_marker.code.toString() !== application_id.toString()) {
                return;
            }

        }

        $('div#changeApplicationUI').remove();

        var _id = application_id.toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});

        if (typeof _settingsObject === "undefined") {
            return;
        }

        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);

        var _applicationType = _settingsObject.application_type;
        var _title = _applicationType.toTitleCase();
        var _sampleText = _settingsObject.text;
        var _sizes;
        var _uniformCategory = ub.current_material.material.uniform_category
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(_id);

        if (_uniformCategory === "Football") {

            _sizes = ub.funcs.getApplicationSizes(_applicationType);

        } else if (ub.current_material.material.uniform_category === "Baseball") {

            _sizes = ub.funcs.getApplicationSizes(_applicationType, 'baseball');

        } else if (_uniformCategory !== "Football" && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {

            _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);

        } else {

            ub.utilities.warn('no sizes setting defaulting to generic');
            _sizes = ub.funcs.getApplicationSizes(_applicationType);

        }

        // New application sizes values from backend
        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _id);

        if (typeof _sizesFromConfig !== "undefined") {

            // Debug Info
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

                console.log('Default Sizes: ');
                console.log(_sizes);
                console.log('Application #: ');
                console.log(_id);

                ub.utilities.info('Using sizes from backend: ');

                console.log(_sizesFromConfig);
                console.log(_sizesFromConfig.sizes);
                //console.log(_.pluck(_sizesFromConfig.sizes, "size"));

                // add sort for sizes
                _sizesSorted = _.sortBy(_sizesFromConfig.sizes, function (obj) {
                    return parseFloat(obj.size)
                });
                _sizesFromConfig.sizes = _sizesSorted;

                _sizes = _sizesFromConfig;

            }

        } else {

            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);

                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _id + " don't have application sizes settings on the backend.");

            }

        }

        if (_applicationType === 'mascot') {

            ub.funcs.activateMascots(_id);
            return;

        }

        if (_applicationType === 'embellishments') {

            ub.funcs.activateEmbellishments(_id);
            return;

        }

        var _fontObj = _settingsObject.font_obj;
        var _fontName = _fontObj.name;
        var _fontCaption = _fontObj.caption;
        var _accentObj = _settingsObject.accent_obj;
        var _accentName = _accentObj.title;
        var _accentFilename = _accentObj.thumbnail;
        var _patternName = 'None';
        var _patternFilename = 'none.png';
        var _colorArray = _settingsObject.color_array;
        var _colorArrayString = '';
        var _generateSizes = '';
        var _thumbIcon = '/images/sidebar/' + _accentFilename;
        var _colorPickers = '';

        ub.updateApplicationSpecsPanel(_id);

        _.each(_colorArray, function (_color) {

            if (typeof _color !== "undefined") {

                _colorArrayString += '<span style="color: #' + _color.hex_code + '" class="color-string">' + _color.color_code + "</span>, ";

            }

        });

        var n = _colorArrayString.lastIndexOf(",");
        var _colorArrayString = _colorArrayString.substring(0, n)
        var _htmlBuilder = "";
        var _appActive = 'checked';
        var _maxLength = ub.data.maxLength;

        if (_settingsObject.type.indexOf('number') !== -1) {
            _maxLength = ub.data.maxLengthNumbers;
        }
        if (ub.config.uniform_application_type === 'sublimated') {
            _maxLength = ub.data.maxLengthSublimated;
        }

        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') {
            _status = _settingsObject.status;
        }

        // _htmlBuilder = '<div id="applicationUI" data-application-id="' + _id + '">';
        // _htmlBuilder += '<div class="header">';
        // _htmlBuilder += '<div class="toggle" data-status="' + _status + '"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>';
        // _htmlBuilder += '<div class="applicationType" data-type="' + _applicationType + '">' + " [" + _id + "] " + _title.replace('Number', '# ') + '<span class="changeApplicationType"><i class="fa fa-caret-down" aria-hidden="true"></i></span></div><span class="cog"><i class="fa fa-cog" aria-hidden="true"></i></span></div>';
        // _htmlBuilder += '<div class="body">';
        // _htmlBuilder += '<div class="cover"></div>';
        // _htmlBuilder += '<div class="ui-row">';
        // _htmlBuilder += '<label class="applicationLabels font_name">' + "Sample Text" + '</label>';
        // _htmlBuilder += '<input type="text" name="sampleText" class="sampleText" value="' + _sampleText + '" maxlength="' + _maxLength + '">';
        // _htmlBuilder += '</div>';
        // _htmlBuilder += '<div class="ui-row">';
        // _htmlBuilder += '<label class="applicationLabels font_name">Font</label>';
        // _htmlBuilder += '<span class="fontLeft" data-direction="previous"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';
        // _htmlBuilder += '<span class="font_name" style="font-size: 1.2em; font-family: ' + _fontName + ';">' + _fontCaption + '</span>';
        // _htmlBuilder += '<span class="fontRight" data-direction="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
        // _htmlBuilder += '</div>';
        // _htmlBuilder += '<div class="ui-row">';

        var _label = 'Size';
        var _class = '';

        if (_isFreeFormEnabled) {
            _label = 'Measurements';
            _class = "custom";
        }

        // _htmlBuilder += '<label class="applicationLabels font_size ' + _class + '">' + _label + '</label>';

        if (typeof _settingsObject.font_size === 'undefined') {

            if (application_id !== 2 || application_id !== 5) {

                _settingsObject.font_size = 4;

            } else {

                _settingsObject.font_size = 10;

            }

        }

        _generateSizes = ub.funcs.generateSizes(_applicationType, _sizes.sizes, _settingsObject, application_id);

        // _htmlBuilder += '</div>';

        // // Rotate Team Name in Baseball and Fastpitch
        // _htmlBuilder += '<div class="ui-row angleItems">';
        // _htmlBuilder += '<label class="applicationLabels font_size">Angle</label>';
        // _htmlBuilder += '<span class="angleItem" data-angle="straight">Straight</span>';
        // _htmlBuilder += '<span class="angleItem" data-angle="rotated">Rotated</span>';
        // _htmlBuilder += '</div>';
        // // End Rotate Team Name in Baseball and Fastpitch
        //
        // _htmlBuilder += '<div class="clearfix"></div>';
        // _htmlBuilder += '<div class="color-pattern-tabs">';
        // _htmlBuilder += '<span class="tab active" data-item="colors">Colors</span>';
        // _htmlBuilder += '<span class="tab" data-item="patterns">Patterns</span>';
        // _htmlBuilder += '<span class="tab" data-item="manipulators"></span>';
        //
        var _isBaseballFastpitch = false;
        if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {

            // _htmlBuilder += '<span class="tab" data-item="tailsweeps">Tail Sweeps</span>';
            _isBaseballFastpitch = true;

        }
        //
        // _htmlBuilder += '</div>';
        // _htmlBuilder += '<div class="ui-row">';
        //
        // _htmlBuilder += '<div class="column1 applications colors">'
        // _htmlBuilder += '<div class="sub1"><br />';
        // _htmlBuilder += '<span class="accentThumb"><img src="/images/sidebar/' + _accentFilename + '"/></span><br />';
        // _htmlBuilder += '<span class="accent">' + _accentName + '</span>';
        // _htmlBuilder += '<span class="flipButton">Vertical</span>';
        //
        // _htmlBuilder += '</div>';
        // _htmlBuilder += '<div class="colorContainer">';

        _.each(_settingsObject.accent_obj.layers, function (layer) {

            var _hexCode = layer.default_color;
            var _color = ub.funcs.getColorObjByHexCode(_hexCode);
            var _layerNo = layer.layer_no - 1;

            if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') {
                return;
            }

            _color = _settingsObject.color_array[_layerNo];

            // Use default color if team color is short
            if (typeof _color === "undefined") {

                _hexCode = layer.default_color;
                _color = ub.funcs.getColorObjByHexCode(_hexCode);

                ub.utilities.error('Undefined color found here!!!');

            }

            if (typeof _color !== 'undefined') {

                _colorPickers += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_no, layer.name, layer.default_color, 'accent');

            } else {

                util.error('Hex Code: ' + _hexCode + ' not found!');

            }

        });

        var _tailSweepObject = _settingsObject.tailsweep;

        if (typeof _tailSweepObject === "undefined" || _tailSweepObject.code === "none") {

            _tailSweepObject = {code: 'none', thumbnail: 'none.png'};

        }

        // _htmlBuilder += '</div>';
        // _htmlBuilder += '</div>';

        // if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {
        //
        //     _htmlBuilder += '<div class="column1 applications tailsweeps">';
        //     _htmlBuilder += '<div class="sub1 tailSweepThumb"><br />';
        //     _htmlBuilder += '<span class="tailSweepThumb"><img src="/images/tailsweeps/thumbnails/' + _tailSweepObject.thumbnail + '"/></span><br />';
        //     _htmlBuilder += '<span class="tailsweep">' + _tailSweepObject.code + '</span>';
        //     _htmlBuilder += '<span class="flipButton">Vertical</span>';
        //     _htmlBuilder += '</div>';
        //     _htmlBuilder += '<div class="sizeContainer">';
        //
        //     // Tailsweep, is off for now
        //     // _htmlBuilder        +=                      '<span class="sizeLabel">LENGTH</span>';
        //     // _htmlBuilder        +=                      '<span class="sizeItem" data-size="short">Short</span>';
        //     // _htmlBuilder        +=                      '<span class="sizeItem" data-size="medium">Medium</span>';
        //     // _htmlBuilder        +=                      '<span class="sizeItem" data-size="long">Long</span>';
        //
        //     _htmlBuilder += '<span class="sizeLabel">LENGTH 2</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="1">1</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="2">2</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="3">3</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="4">4</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="5">5</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="6">6</span>';
        //     _htmlBuilder += '<br />';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="7">7</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="8">8</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="9">9</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="10">10</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="11">11</span>';
        //     _htmlBuilder += '<span class="sizeItem sizeItem2" data-size="12">12</span>';
        //
        //     _htmlBuilder += '<label class="applicationLabels">Rotated</label>';
        //     _htmlBuilder += '<span class="angleItem" data-angle="straight">Straight</span>';
        //     _htmlBuilder += '<span class="angleItem" data-angle="rotated">Rotated</span>';
        //
        //     _htmlBuilder += '</div>';
        //     _htmlBuilder += '</div>';
        //
        // }

        var _tailSweepPanel = ''
        if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {
            _isBaseballFastpitch = true;
            _tailSweepThumb = '/images/tailsweeps/thumbnails/' + _tailSweepObject.thumbnail;
            _tailSweepCode  = _tailSweepObject.code;
            _tailSweepPanel = ub.funcs.tailSweepPanel(_tailSweepThumb, _tailSweepCode);
        }

        // var _templateStr = '';
        var _patternObject = _settingsObject.pattern_obj;
        var _patternsPanel = ub.funcs.updateTextPatternPanel(_patternObject);
        var _templateStrManipulators = ub.funcs.updateManipulatorsPanel(_settingsObject);
        //
        // _htmlBuilder += '<div class="column1 applications patterns">';
        // _htmlBuilder += _templateStr;
        // _htmlBuilder += '</div>';
        //
        // _htmlBuilder += '<div class="column1 applications manipulators">';
        // _htmlBuilder += _templateStrManipulators;
        // _htmlBuilder += '</div>';
        //
        //
        // _htmlBuilder += '</div>';
        // _htmlBuilder += '</div>';
        // _htmlBuilder += "</div>";

        var templateData = {
            id: _id,
            status: _status,
            thumbIcon: _thumbIcon,
            accentName: _accentName,
            mascotFontName: _fontName,
            mascotFontCaption: _fontCaption,
            mascotFontArrowOpacity: 100,
            class: _class,
            label: _label,
            applicationType: _applicationType,
            appType: _title.replace('Number', '# '),
            appLabel: 'Font',
            generateSizes: _generateSizes,
            sampleText: _sampleText,
            maxLength: _maxLength,
            accentName: _accentName,
            // isCustomLogo: _isCustomLogo,
            // customFilename: _customFilename,
            colorPickers: _colorPickers,
            // isSublimated: _isSublimated,
            isApplication: 'true',
            patternsPanel: _patternsPanel,
            templateStrManipulators: _templateStrManipulators,
            sampleTextContainerVisibility: '',
            cogVisibility: 'hidden',
            tailSweepsTabVisibility: '',
            colorTabVisibility: '',
            patternsTabVisibility: '',
            flipLabel: 'Vertical',
            isBaseballFastpitch: _isBaseballFastpitch,
            tailSweepPanel: _tailSweepPanel
        }

        _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui', templateData);

        $('.modifier_main_container').append(_htmlBuilder);

        //// Events

        /// Applications Color Events

        ub.funcs.setupTextSmallColorPickerEvents(_settingsObject);

        /// End Application Pattern Events

        /// Applications Pattern Events

        ub.funcs.setupPatternsAndSmallColorPickerEvents(_settingsObject);

        /// End Application Pattern Events

        /// Application Manipulator Events

        ub.funcs.setupManipulatorEvents(_settingsObject, _applicationType);

        /// End Application Manipulator Events

        /// Tail sweep size Event

        $('span.sizeItem').unbind('click');
        $('span.sizeItem').on('click', function () {

            var _size = $(this).data('size');
            $('span.sizeItem').removeClass('active');

            ub.funcs.changeTailSweepFromPopup(_id, _settingsObject, _size);

            $(this).addClass('active');

        });

        // Application w/ Tailsweep angle Event
        $('span.angleItem').unbind('click');
        $('span.angleItem').on('click', function () {

            var _angle = $(this).data('angle');
            $('span.angleItem').removeClass('active');

            ub.funcs.changeAngleFromPopup(_id, _settingsObject, _angle);

            $(this).addClass('active');

        });

        /// color pattern tab

        $('div.color-pattern-tabs > span.tab').unbind('click');
        $('div.color-pattern-tabs > span.tab').on('click', function () {

            var _item = $(this).data('item');

            $('div.color-pattern-tabs > span.tab').removeClass('active');
            $(this).addClass('active');
            $('div.column1').hide();
            $('div.column1.' + _item).fadeIn();

            if (_item === "patterns") {
                if (typeof _settingsObject.pattern !== "undefined") {
                    $('span.sizeItem[data-size="' + _settingsObject.tailsweep.length + '"]').addClass('active');
                }
            }

            if (_item === "manipulators") {
                $('ul.tab-navs > li.tab[data-action="move"]').trigger('click');
            }

        });

        $('span.apply-pattern').unbind('click');
        $('span.apply-pattern').on('click', function () {

            ub.funcs.createPatternPopupApplications(ub.current_material.settings.applications[_id]);

        });

        /// Vertical Text

        if (ub.current_material.material.uniform_category !== "Wrestling") {

            $('span.flipButton').hide();

        } else {

            ub.funcs.updateCoordinates(_settingsObject);

            var s = ub.funcs.getPrimaryView(_settingsObject.application);
            var sObj = ub.funcs.getPrimaryViewObject(_settingsObject.application);

            if (typeof _settingsObject.verticalText !== "undefined" && _settingsObject.verticalText !== 0) {

                $('span.flipButton').addClass('active');

            } else {

                $('span.flipButton').removeClass('active');

            }

        }

        $('span.flipButton').on('click', function () {

            var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});

            ub.funcs.pushOldState('vertical text', 'application', _settingsObject, {verticalText: _settingsObject.verticalText});
            ub.funcs.verticalText(_settingsObject);
            ub.funcs.activateMoveTool(application_id);

        });

        /// End Vertical Text

        $('div.applicationType').on('click', function () {

            var _status = $('div.toggle').data('status');

            // Don't create change application UI is status is off
            if (_status === 'off') {
                return;
            }

            if ($('div#changeApplicationUI').length > 1) {

                var _status = $('div#changeApplicationUI').data('status');

                if (_status === 'visible') {

                    $('div#changeApplicationUI').hide().data('status', 'hidden');
                    $('div.applicationType').removeClass('toggledApplicationType');

                } else {

                    $('div#changeApplicationUI').fadeIn().data('status', 'visible');
                    $('div.applicationType').addClass('toggledApplicationType');

                }

                return;

            }

            var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
            var _validApplicationTypes = _settingsObject.validApplicationTypes;

            // _htmlBuilder = '<div id="changeApplicationUI" data-status="hidden" data-application-id="' + _id + '">';
            // _htmlBuilder += '<div class="header">';
            // _htmlBuilder += '<div class="">Select Application Type for Location <strong>#' + _id + '</strong></div>';
            // _htmlBuilder += '<div class="close-popup closeApplicationChanger"><i class="fa fa-times" aria-hidden="true"></i></div>';
            // _htmlBuilder += '<div class="body">';
            //
            // var _deactivated = '';
            // var _currentlySelectedType = '';
            // var _selected = ''
            //
            // if (!_.contains(_validApplicationTypes, 'number')) {
            //     _deactivated = 'deactivatedOptionButton';
            // }
            // if (_applicationType === 'front_number' || _applicationType === 'back_number') {
            //     _currentlySelectedType = 'currentlySelectedType';
            //     _selected = '(current)';
            // }
            //
            // _htmlBuilder += '<div data-type="player_number" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-number-large.png">' + '</div>';
            // _htmlBuilder += '<div class="caption">Player Number ' + _selected + '</div>';
            // _htmlBuilder += '</div>';
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';
            //
            // if (!_.contains(_validApplicationTypes, 'team_name')) {
            //     _deactivated = 'deactivatedOptionButton';
            // }
            // if (_applicationType === 'team_name') {
            //     _currentlySelectedType = 'currentlySelectedType';
            //     _selected = '(current)';
            // }
            //
            // _htmlBuilder += '<div data-type="team_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
            // _htmlBuilder += '<div class="caption">Team Name ' + _selected + '</div>';
            // _htmlBuilder += '</div>';
            //
            // _htmlBuilder += '<br />';
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';
            //
            // if (!_.contains(_validApplicationTypes, 'player_name')) {
            //     _deactivated = 'deactivatedOptionButton';
            // }
            // if (_applicationType === 'player_name') {
            //     _currentlySelectedType = 'currentlySelectedType';
            //     _selected = '(current)';
            // }
            //
            // _htmlBuilder += '<div data-type="player_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
            // _htmlBuilder += '<div class="caption">Player Name ' + _selected + '</div>';
            // _htmlBuilder += '</div>';
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';
            //
            // if (!_.contains(_validApplicationTypes, 'logo')) {
            //     _deactivated = 'deactivatedOptionButton';
            // }
            // if (_applicationType === 'mascot') {
            //     _currentlySelectedType = 'currentlySelectedType';
            //     _selected = '(current)';
            // }
            //
            // _htmlBuilder += '<div data-type="mascot" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
            // _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-mascot-large.png">' + '</div>';
            // _htmlBuilder += '<div class="caption">Stock Mascot ' + _selected + '</div>';
            // _htmlBuilder += '</div>';
            //
            // //if (ub.config.uniform_application_type !== "sublimated" && ub.config.uniform_application_type !== "knitted") {
            // //if (ub.config.uniform_application_type === "tackle_twill" || ub.config.uniform_application_type === "sublimated" || ub.config.uniform_application_type === "knitted") {
            // if (!_.contains(_validApplicationTypes, 'embellishments')) {
            //     _deactivated = 'deactivatedOptionButton';
            // }
            // //}
            //
            // _htmlBuilder += '<div class="optionButton ' + _deactivated + '" data-type="embellishments">';
            // _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-embellishments-large.png">' + '</div>';
            // _htmlBuilder += '<div class="caption">Custom Mascot</div>';
            // _htmlBuilder += '</div>';
            //
            // _htmlBuilder += '</div>';
            // _htmlBuilder += "</div>";
            // _deactivated = '';
            // _currentlySelectedType = '';
            // _selected = '';

            var vAppTypes = ub.funcs.selectApplicationTypeLocation(_id, _applicationType, _validApplicationTypes);

            // send to mustache
            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-choices', vAppTypes);

            $('.modifier_main_container').append(_htmlBuilder);
            $('div#changeApplicationUI').fadeIn().data('status', 'visible');
            $('div.applicationType').addClass('toggledApplicationType');

            $('div.optionButton').on('click', function () {

                if ($(this).hasClass('deactivatedOptionButton')) {
                    return;
                }

                var _type = $(this).data('type');

                ub.funcs.changeApplicationType(_settingsObject, _type);
                $('div#changeApplicationUI').remove();

                ub.funcs.activateMascots(_id);

            });

            $('div.closeApplicationChanger').on('click', function () {
                $('div#changeApplicationUI').hide().data('status', 'hidden');
                $('div.applicationType').removeClass('toggledApplicationType');
            });

        });

        var _matchingID = undefined;

        _matchingID = ub.data.matchingIDs.getMatchingID(_id);

        if (typeof _matchingID !== "undefined") {

            ub.funcs.toggleApplication(_matchingID.toString(), _status);

        }

        // Font Left and Right

        $('span.fontLeft, span.fontRight').on('click', function (e) {

            var _direction = $(this).data('direction');
            var _newFont = ub.funcs.getFontObj(_direction, _settingsObject.font_obj);

            if (typeof _newFont !== 'undefined') {

                ub.funcs.changeFontFromPopup(_newFont.id, _settingsObject);
                ub.funcs.activateApplications(_settingsObject.code)

            }
            else {

                // No Font!
                return;

            }

            if (_settingsObject.type === "front_number" || _settingsObject.type === "back_number") {

                _.each(ub.current_material.settings.applications, function (_application) {

                    if (_application.type !== _settingsObject.application_type && _application.type !== "logo" && _application.type !== "mascot") {

                        if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                            ub.funcs.changeFontFromPopup(_newFont.id, _application);

                        }

                    }

                });

            }

            var _matchingID = undefined;

            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                ub.funcs.changeFontFromPopup(_newFont.id, _matchingSettingsObject);

            }

        });

        // End Font Left and Right

        $('span.font_size').on('click', function () {

            // If already active, trigger turn off instead
            if (ub.funcs.isSublimated()) {
                if ($(this).hasClass('active')) {
                    $('ul.tab-navs > li.tab.close').trigger('click');
                    return;
                }
            }

            var _selectedSize = $(this).data('size');
            var _isCustom = $(this).hasClass('custom');
            var _isScale = $(this).hasClass('scale');
            var _isRotate = $(this).hasClass('rotate');
            var _isMove = $(this).hasClass('move');

            $('.font_size').removeClass('active');
            $(this).addClass('active');

            if (_isCustom && _isScale) {

                $('color-pattern-tabs').hide();
                $('span.tab[data-item="manipulators"]').trigger('click');
                $('li.tab.scale').trigger('click');

                return;

            }

            if (_isCustom && _isMove) {

                $('color-pattern-tabs').hide();
                $('span.tab[data-item="manipulators"]').trigger('click');
                $('li.tab.move').trigger('click');

                return;

            }

            if (_isCustom && _isRotate) {

                $('color-pattern-tabs').hide();
                $('span.tab[data-item="manipulators"]').trigger('click');
                $('li.tab.rotate').trigger('click');

                return;

            }

            var oldScale = ub.funcs.clearScale(_settingsObject);
            _settingsObject.oldScale = oldScale;

            ub.funcs.changeSize(_selectedSize, _settingsObject);

            var _matchingID = undefined;
            _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                ub.funcs.changeSize(_selectedSize, _matchingSettingsObject);

            }

        });

        $('span.font_name').on('click', function () {

            ub.funcs.createFontPopup(_title, _sampleText, _settingsObject);

        });

        $('span.accentThumb, span.accent').on('click', function () {

            ub.funcs.createAccentPopup(_settingsObject);

        });

        $('span.patternThumb, span.pattern').unbind('click');
        $('span.patternThumb, span.pattern').on('click', function () {

            ub.funcs.createPatternPopupApplications(_settingsObject);

        });

        $('span.tailSweepThumb, span.tailsweep').on('click', function () {

            ub.funcs.createTailSweepPopup(_settingsObject);

        });

        ub.status.onText = false;

        $('input.sampleText').on('focus', function () {

            var _val = $(this).val();
            ub.status.onText = true;

            _settingsObject.text = _val;
            ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

        });

        $('input.sampleText').on('blur', function () {

            var _val = $(this).val();
            ub.status.onText = false;

            _settingsObject.text = _val;
            ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

            // cancel automatic changing of application (e.g. all team names changes)
            if (_isFreeFormEnabled) {
                return;
            }

            _.each(ub.current_material.settings.applications, function (_application) {

                if (_application.type !== "logo" && _application.type !== "mascot") {

                    if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                        _application.text = _val;
                        ub.funcs.changeFontFromPopup(_application.font_obj.id, _application);

                    }

                }

            });

        });

        $('input.sampleText').on('keypress', function (e) {

            var _val = $(this).val();

            if (e.keyCode === 13) {

                _settingsObject.text = _val;

                if (typeof _settingsObject.tailsweep !== "undefined") {

                    // Tailsweep, is off for now
                    // if (_settingsObject.text.length <= 5) { _length = 'short'; }
                    // if (_settingsObject.text.length >= 6 && _settingsObject.text.length <= 7 ) { _length = 'medium'; }
                    // if (_settingsObject.text.length > 7) { _length = 'long'; }

                    _length = (_settingsObject.text.length <= 12) ? _settingsObject.text.length : 12;

                    _settingsObject.tailsweep.length = _length;

                    $('span.sizeItem').removeClass('active');
                    $('span.sizeItem[data-size="' + _settingsObject.tailsweep.length + '"]').addClass('active');

                }

                /// Set Auto Font Size on Team Name, Baseball / Fastpitch

                if (parseInt(application_id) === 1 && (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch'))) {

                    if (_settingsObject.application_type === "team_name") {

                        var _len = _val.length;
                        var _size = _settingsObject.font_size;

                        if (_len <= 4) {
                            _size = 4;
                        } else if (_len >= 5 && _len <= 7) {
                            _size = 3;
                        } else if (_len >= 8) {
                            _size = 2;
                        }

                        ub.funcs.setAppSize(application_id, _size);
                        ub.funcs.setAUIActiveSize(_size);

                    }

                }

                /// End Set Auto Font Size

                ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

                // cancel automatic changing of application (e.g. all team names changes)
                if (_isFreeFormEnabled) {
                    return;
                }

                _.each(ub.current_material.settings.applications, function (_application) {

                    if (_application.type !== "logo" && _application.type !== "mascot") {

                        if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                            _application.text = _val;
                            ub.funcs.changeFontFromPopup(_application.font_obj.id, _application);

                        }

                    }

                });

            }

        });

        ub.funcs.hideGAFontTool();

        $('span.cog').on('click', function () {

            var _fontID = _settingsObject.font_obj.id;
            var _size = _settingsObject.font_size;
            var _fontSizeData = ub.data.getPixelFontSize(_settingsObject.font_obj.id, _size, ub.active_view, {id: _settingsObject.code});
            var _pixelFontSize = _fontSizeData.pixelFontSize;

            var _origSizes = {

                pixelFontSize: _pixelFontSize,
                offSetX: _fontSizeData.xOffset,
                offSetY: _fontSizeData.yOffset,
                scaleX: _fontSizeData.xScale,
                scaleY: _fontSizeData.yScale,

            }

            var _cogBuilder = '';

            $('#cogPopupContainer').remove();

            _cogBuilder += '<div id="cogPopupContainer">';
            _cogBuilder += '<div id="cogPopup">';

            _cogBuilder += '<div class="popupHeader">GA Font Tool <i class="fa fa-floppy-o save-font-data" aria-hidden="true"></i></div>';

            _cogBuilder += '<div class="popup-row-top">';
            _cogBuilder += '<label>Inch: </label>';
            _cogBuilder += '<span class="popupValue"> ' + _size + '</span>' + '"';
            _cogBuilder += '</div>';

            _cogBuilder += '<div class="popup-row">';
            _cogBuilder += '<div class="inputContainer">'
            _cogBuilder += '<div class="inputX">';
            _cogBuilder += '<span class="inputLabel">Font Size: </span><input class="pixelFontSize gaFontInput" name="font-size" value="' + _pixelFontSize + '" /> px';
            _cogBuilder += '</div>';
            _cogBuilder += '<div class="inputY">';
            _cogBuilder += '<div class="notes" style="margin-left: 140px;">Keyboard Shortcuts:<br /><br />Increase Value: <strong>ctrl + > </strong><br />Decrease Value: <strong>ctrl + < </strong><br /><br /></div>';
            _cogBuilder += '</div>';
            _cogBuilder += '</div>';
            _cogBuilder += '</div>';

            _cogBuilder += '<div class="popup-row">';
            _cogBuilder += '<div class="inputContainer">'
            _cogBuilder += '<div class="inputX">';
            _cogBuilder += '<span class="inputLabel">Offset X: </span><input class="offsetX gaFontInput" name="offsetX" value="' + _fontSizeData.xOffset + '" />';
            _cogBuilder += '</div>';
            _cogBuilder += '<div class="inputY">';
            _cogBuilder += '<span class="inputLabel">Offset Y: </span><input class="offsetY gaFontInput" name="offsetY" value="' + _fontSizeData.yOffset + '" />';
            _cogBuilder += '</div>';
            _cogBuilder += '</div>';
            _cogBuilder += '</div>';

            _cogBuilder += '<div class="popup-row">';
            _cogBuilder += '<div class="inputContainer">'
            _cogBuilder += '<div class="inputX">';
            _cogBuilder += '<span class="inputLabel">Scale X: </span><input class="scaleX gaFontInput" name="scaleX" value="' + _fontSizeData.xScale + '" />';
            _cogBuilder += '</div>';
            _cogBuilder += '<div class="inputY">';
            _cogBuilder += '<span class="inputLabel">Scale Y: </span><input class="scaleY gaFontInput" name="scaleY" value="' + _fontSizeData.yScale + '" />';
            _cogBuilder += '</div>';
            _cogBuilder += '</div>';
            _cogBuilder += '</div>';
            _cogBuilder += '<div class="notes">* It is important to start with the font size closest to the size you will end up using. Starting with a small font and scaling it too far will affect the quality of the font. (e.g. jagged / pixelated edges)</div>';

            _cogBuilder += '<div class="button-row">';
            _cogBuilder += '<span class="resetButton">';
            _cogBuilder += 'Reset';
            _cogBuilder += '</span>';
            _cogBuilder += '<span class="showFontGuide" data-status="hidden">';
            _cogBuilder += 'Font Guide';
            _cogBuilder += '</span>';
            _cogBuilder += '<span class="cancelButton">';
            _cogBuilder += 'Close';
            _cogBuilder += '</span>';
            _cogBuilder += '<span class="applyButton">';
            _cogBuilder += 'Apply';
            _cogBuilder += '</span>';
            _cogBuilder += '</div>';

            _cogBuilder += '</div>';
            _cogBuilder += '</div">';

            $('body').append(_cogBuilder);

            /// Events

            $('i.save-font-data').on('click', function (evt) {

                if (evt.altKey) {

                    ub.funcs.saveFontData(_fontID, _size, applicationID, perspective);

                }

            });

            $('span.showFontGuide').on('click', function () {

                var _status = $(this).data('status');

                if (_status === 'hidden') {

                    ub.showFontGuides();
                    $(this).data('status', 'visible');
                    $(this).addClass('guideActive');

                } else {

                    ub.hideFontGuides();
                    $(this).data('status', 'hidden');
                    $(this).removeClass('guideActive');

                }

            });

            $('span.cancelButton').on('click', function () {

                //ub.hideFontGuides();
                $('#cogPopupContainer').remove();

            });

            $('span.resetButton').on('click', function () {

                $('input.pixelFontSize').val(_origSizes.pixelFontSize);
                $('input.offsetX').val(_origSizes.offsetX);
                $('input.offsetY').val(_origSizes.offsetY)
                $('input.scaleX').val(_origSizes.scaleX);
                $('input.scaleY').val(_origSizes.scaleY);
                ;

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

                        if (e.which === 44) {
                            _value -= 5;
                        }

                        if (e.which === 46) {
                            _value += 5;
                        }

                        $textBox.val(_value);

                        $('span.applyButton').trigger('click');
                        $(this).focus();

                    }

                    if (_name === 'scaleX' || _name === 'scaleY') {

                        var _value = parseFloat(_currentVal);

                        if (e.keyCode === 44) {
                            _value -= 0.05;
                        }

                        if (e.keyCode === 46) {
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

            $('input.gaFontInput').focus(function () {

                var _modifier = $(this).attr('name');
                ub.funcs.createAssistants(_settingsObject, _modifier);

            });

        });

        //// End Events

        $('div#applicationUI').fadeIn();
        ub.funcs.activateMoveTool(application_id);
        ub.funcs.activateLayer(application_id);

        $("div.toggleOption").unbind('click');
        $("div.toggleOption").on("click", function () {

            var _currentStatus = $('div.toggle').data('status');
            var s;
            if (_currentStatus === "on") {
                s = 'off';
                $('div#changeApplicationUI').remove();
            }
            else {
                s = 'on';
            }

            if (s === "on") {
                ub.funcs.LSRSBSFS(parseInt(_id));
            }

            ub.funcs.toggleApplication(_id, s);

            var _matchingID = undefined;

            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {

                ub.funcs.toggleApplication(_matchingID.toString(), s);

            }

        });

        /// Initialize

        ub.funcs.toggleApplication(_id, _status);

        if (parseInt(ub.current_material.material.id) !== 394 && parseInt(ub.current_material.material.id) !== 1143) {

            $('div.column1.tailsweeps').hide();
            //$('div.column1.patterns').hide();
            $('span.tab[data-item="tailsweeps"]').hide();
            //$('span.tab[data-item="patterns"]').hide();

        }

        // Disable tailsweep tab when application is not #1
        if (_id !== '1') {

            $('div.column1.tailsweeps').hide();
            $('span.tab[data-item="tailsweeps"]').hide();

        }

        if (_id === '1' && (ub.funcs.isCurrentSport("Baseball") || ub.funcs.isCurrentSport("Fastpitch"))) {

            var _tailSweepObj = ub.current_material.settings.applications[parseInt(_id)].tailsweep;
            if (typeof _tailSweepObj !== "undefined") {

                if (_tailSweepObj.angle === "rotated") {

                    $('span.angleItem').removeClass('active');
                    $('span.angleItem[data-angle="rotated"]').addClass('active');

                } else {

                    $('span.angleItem').removeClass('active');
                    $('span.angleItem[data-angle="straight"]').addClass('active');

                }

            }

            var _angle = _settingsObject.angle;

            $('span.angleItem').removeClass('active');

            if (_angle === "rotated") {
                $('span.angleItem[data-angle="rotated"]').addClass('active');
            } else {
                $('span.angleItem[data-angle="straight"]').addClass('active');
            }

        } else {

            $('div.ui-row.angleItems').hide();

        }

        /// End Initialize

        ub.funcs.afterActivateApplication(application_id);

    }

    ub.funcs.activateMoveTool = function (application_id) {

        // Guard Expressions
        if ($('div#primaryMascotPopup').is(':visible') || $('div#primaryPatternPopup').is(':visible')) {
            return;
        }
        if (ub.config.uniform_application_type === "tackle_twill" && ub.config.sport === "Football") {
            return;
        }
        // End Guard Expressions

        var _applicationObj = ub.current_material.settings.applications[application_id];

        // if (!ub.funcs.isFreeFormToolEnabled(application_id)) { return; }

        // if deleted exit
        if (typeof _applicationObj === "undefined") {
            return;
        }

        var _primaryView = ub.funcs.getPrimaryView(_applicationObj.application);
        var _perspective = _primaryView + '_view';
        var _appObj = ub.objects[_perspective]["objects_" + application_id];

        ub.focusObject = ub.objects[_perspective]["locations_" + application_id];
        ub.targetObj = ub.objects[_perspective]["objects_" + application_id];

        ub.funcs.deactivateMoveTool();

        /// Consider vertical text

        var _topOffset = 0;
        var _leftOffset = 0;

        if (_applicationObj.verticalText) {

            _topOffset = _appObj.height / 2;
            _leftOffset = _appObj.width / 2;

        }

        // adjustment to tools on text

        var _xAnchor = -3;

        if (_applicationObj.application_type !== "mascot") {

            if (!_applicationObj.verticalText) {

                _xAnchor = -5;

            }

        }

        ///

        // --- Move --- //

        var _filenameMove = "/images/builder-ui/move-icon-on.png";
        var _spriteMove = ub.pixi.new_sprite(_filenameMove);
        var _perspective = _primaryView + '_view';

        ub.objects[_perspective].move_tool = _spriteMove;
        ub[_perspective].addChild(_spriteMove);

        var _view = _.find(_applicationObj.application.views, {perspective: _primaryView});

        _spriteMove.position.x = _view.application.center.x;
        _spriteMove.position.y = _view.application.center.y;
        _spriteMove.ubName = 'Move Tool';
        _spriteMove.anchor.set(_xAnchor, 0.0);
        _spriteMove.zIndex = -1000;

        ub.funcs.createDraggable(_spriteMove, _applicationObj, ub[_perspective], _perspective);

        // Turn Off Location

        ub.funcs.unHighlightMarker(application_id, _primaryView);
        ub.data.applicationAccumulator -= 1;

        // End Turn Off Location

        /// Start Manipulator Group

        if (typeof _appObj === "undefined") {
            return;
        }

        var _width = _appObj.width / 2;
        var _height = _appObj.height / 2;
        var _tools = new PIXI.Container();

        // Add additional 20% to width and height to have some allowance

        var _adjW = _width * 0.01;
        var _adjH = _height * 0.01;

        _width = _width + _adjW;
        _height = _height + _adjH;

        var _centerX = _view.application.center.x;
        var _centerY = _view.application.center.y;

        // var _corners = [
        //     {
        //         filename: 'top-left',
        //         // position: {x: -_width - _adjW - _leftOffset, y: -_height - _adjH + _topOffset},
        //         position: {x: 0, y: 0},
        //     },
        //     {
        //         filename: 'top-right',
        //         position: {x: _width - _adjW - _leftOffset, y: -_height - _adjH + _topOffset},
        //     },
        //     {
        //         filename: 'bottom-left',
        //         position: {x: -_width - _adjW - _leftOffset, y: _height - _adjH + _topOffset},
        //     },
        //     {
        //         filename: 'bottom-right',
        //         position: {x: _width - _adjW - _leftOffset, y: _height - _adjH + _topOffset},
        //     },
        // ];

        // _.each(_corners, function (corner) {

        //     var _cornerFilename = "/images/manipulators/" + corner.filename + ".png";
        //     var _sprite = ub.pixi.new_sprite(_cornerFilename);

        //     _sprite.tint = parseInt('888888', 16);
        //     _sprite.position.x = corner.position.x;
        //     _sprite.position.y = corner.position.y;

        //     _tools.addChild(_sprite);

        // });

        ub.objects[_perspective].manipulatorTool = _tools;
        ub[_perspective].addChild(_tools);

        _tools.position.x = _view.application.center.x;
        _tools.position.y = _view.application.center.y;
        _tools.rotation = _view.application.rotation;

        _tools.zIndex = -1000;
        _tools.ubName = "Manipulator Tool";

        ub.tools.manipulator.tools = _tools;

        /// End Manipulator Group

        // --- Center Point --- ///

        var _filenameCenter = "/images/builder-ui/center-point.png";
        var _spriteCenter = ub.pixi.new_sprite(_filenameCenter);

        ub.objects[_perspective].center_tool = _spriteCenter;
        ub[_perspective].addChild(_spriteCenter);

        var _view = _.find(_applicationObj.application.views, {perspective: _primaryView});

        _spriteCenter.position.x = _view.application.center.x;
        _spriteCenter.position.y = _view.application.center.y;

        _spriteCenter.ubName = 'Center Tool';
        _spriteCenter.anchor.set(0, 0);
        _spriteCenter.zIndex = -1000;
        _spriteCenter.alpha = 0;

        // Center Point Adjustment

        _spriteCenter.position.x -= _appObj.width / 4;
        _spriteCenter.position.y -= _appObj.height / 4;

        ub.updateLayersOrder(ub[_perspective]);
        ub.funcs.createDraggable(_spriteCenter, _applicationObj, ub[_perspective], _perspective);

        // --- Rotate --- ///

        var _filenameRotate = "/images/builder-ui/rotate-icon-on.png";
        var _spriteRotate = ub.pixi.new_sprite(_filenameRotate);

        ub.objects[_perspective].rotate_tool = _spriteRotate;
        ub[_perspective].addChild(_spriteRotate);

        var _view = _.find(_applicationObj.application.views, {perspective: _primaryView});

        _spriteRotate.position.x = _view.application.center.x;
        _spriteRotate.position.y = _view.application.center.y;

        _spriteRotate.ubName = 'Rotate Tool';
        _spriteRotate.anchor.set(_xAnchor, 2.0);
        _spriteRotate.zIndex = -1000;

        ub.funcs.createDraggable(_spriteRotate, _applicationObj, ub[_perspective], _perspective);


        // --- Scale --- ///


        if (ub.config.uniform_application_type === "sublimated" || ub.config.uniform_application_type === "knitted") {

            var _filenameScale = "/images/builder-ui/scale-icon-on.png";
            var _spriteScale = ub.pixi.new_sprite(_filenameScale);

            ub.objects[_perspective].scale_tool = _spriteScale;
            ub[_perspective].addChild(_spriteScale);

            var _view = _.find(_applicationObj.application.views, {perspective: _primaryView});

            _spriteScale.position.x = _view.application.center.x;
            _spriteScale.position.y = _view.application.center.y;
            _spriteScale.ubName = 'Scale Tool';

            var _x = _xAnchor;

            _spriteScale.anchor.set(_x, -2);
            _spriteScale.zIndex = -1000;

            ub.funcs.createDraggable(_spriteScale, _applicationObj, ub[_perspective], _perspective);

        }

        // --- Reset --- ///

        var _filenameReset = "/images/builder-ui/reset-icon-on.png";
        var _spriteReset = ub.pixi.new_sprite(_filenameReset);

        ub.objects[_perspective].reset_tool = _spriteReset;
        ub[_perspective].addChild(_spriteReset);

        var _view = _.find(_applicationObj.application.views, {perspective: _primaryView});

        _spriteReset.position.x = _view.application.center.x;
        _spriteReset.position.y = _view.application.center.y;

        _spriteReset.ubName = 'Reset Tool';
        _spriteReset.anchor.set(-1000, -4);
        _spriteReset.zIndex = -1000;
        ub.funcs.createDraggable(_spriteReset, _applicationObj, ub[_perspective], _perspective);

        // --- Delete --- ///

        if (ub.config.uniform_application_type === "sublimated" || ub.config.uniform_application_type === "knitted") {

            var _filenameDelete = "/images/builder-ui/delete-icon-on.png";
            var _spriteDelete = ub.pixi.new_sprite(_filenameDelete);

            ub.objects[_perspective].delete_tool = _spriteDelete;
            ub[_perspective].addChild(_spriteDelete);

            var _view = _.find(_applicationObj.application.views, {perspective: _primaryView});

            _spriteDelete.position.x = _view.application.center.x;
            _spriteDelete.position.y = _view.application.center.y;
            _spriteDelete.ubName = 'Delete Tool';
            _spriteDelete.anchor.set(_xAnchor, 4);
            _spriteDelete.zIndex = -1000;

        }

        ub.funcs.createDraggable(_spriteDelete, _applicationObj, ub[_perspective], _perspective);

        //if (parseInt(application_id) < 70) {

        //    _spriteDelete.alpha = 0;

        //}

        // ub.updateLayersOrder(ub[_perspective]);
    }

    ub.funcs.deactivateMoveTool = function () {

        ub.status.manipulatorDown = false;

        if (ub.funcs.isLayersPanelVisible()) {
            $('span.layer').removeClass('active');
        }

        _.each(ub.views, function (view) {

            var _view = view + '_view';

            if (typeof ub.objects[_view].move_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].move_tool);
                delete ub.objects[_view].move_tool;

            }

            if (typeof ub.objects[_view].rotate_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].rotate_tool);
                delete ub.objects[_view].rotate_tool;

            }

            if (typeof ub.objects[_view].scale_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].scale_tool);
                delete ub.objects[_view].scale_tool;

            }

            if (typeof ub.objects[_view].scale_x_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].scale_x_tool);
                delete ub.objects[_view].scale_tool;

            }

            if (typeof ub.objects[_view].scale_y_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].scale_y_tool);
                delete ub.objects[_view].scale_tool;

            }

            if (typeof ub.objects[_view].reset_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].reset_tool);
                delete ub.objects[_view].reset_tool;

            }

            if (typeof ub.objects[_view].center_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].center_tool);
                delete ub.objects[_view].center_tool;

            }

            if (typeof ub.objects[_view].delete_tool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].delete_tool);
                delete ub.objects[_view].delete_tool;

            }

            if (typeof ub.objects[_view].manipulatorTool !== 'undefined') {

                ub[_view].removeChild(ub.objects[_view].manipulatorTool);
                delete ub.objects[_view].manipulatorTool;

            }

        });

        $('div.debug-panel').hide();

    }

    // ub.funcs.deactivateMoveTool1 = function () {

    //     _.each(ub.views, function (view) {

    //         var _view = view + '_view';

    //         if (typeof ub.objects[_view].move_tool !== 'undefined') {

    //             ub[_view].removeChild(ub.objects[_view].move_tool);
    //             delete ub.objects[_view].move_tool;

    //         }

    //     });

    // }

    ub.funcs.positionGaFontTool = function () {

        var _windowWidth = window.innerWidth;
        var _popupContainer = $('#cogPopupContainer').width();
        var _left = _windowWidth - (_popupContainer + 110);

        $('#cogPopupContainer').css('left', _left + 'px');

    };

    ub.funcs.getApplicationSizesPant = function (applicationType, sport, id) {

        var _sizes = undefined;

        if (!ub.funcs.isCurrentSport('Football') && !ub.funcs.isCurrentSport('Wrestling')) {
            // _sizes = _.find(ub.data.applicationSizesPant.items, {name: applicationType, sport: sport, id});

            _sizes = ub.data.applicationSizesPant.getSize(applicationType, sport, parseInt(id));

        }

        if (typeof _sizes === 'undefined') {
            ub.utilities.warn('Application Sizes for ' + applicationType + ' is not found!');
        }

        return _sizes;

    }

    ub.funcs.getApplicationSizes = function (applicationType, alias) {

        var _factory = ub.current_material.material.factory_code;
        var _sizes = undefined;

        if (applicationType === 'team_name') {
            _sizes = _.find(ub.data.applicationSizes.items, {factory: _factory, name: 'team_name'});
        } else {
            _sizes = _.find(ub.data.applicationSizes.items, {name: applicationType});
        }

        if (applicationType === "mascot_wrestling") {
            _sizes = _.find(ub.data.applicationSizes.items, {name: 'mascot_wrestling'});
        }

        if (applicationType === "text_wrestling") {
            _sizes = _.find(ub.data.applicationSizes.items, {name: 'text_wrestling'});
        }

        if (!ub.funcs.isCurrentSport('Football') && !ub.funcs.isCurrentSport('Wrestling')) {

            _sizes = _.find(ub.data.applicationSizes.items, {name: applicationType, sport: alias});

            if (ub.config.sport === "Lacrosse" && ub.config.type === "lower") {
                _sizes = ub.funcs.getApplicationSizesPant(applicationType, alias);
            }
            if (ub.config.sport === "Basketball" && ub.config.type === "lower") {
                _sizes = ub.funcs.getApplicationSizesPant(applicationType, alias);
            }
            if (ub.config.sport === "Tennis" && ub.config.type === "lower") {
                _sizes = ub.funcs.getApplicationSizesPant(applicationType, alias);
            }


        }

        if (applicationType === 'team_name' && ub.funcs.isCurrentSport('Wrestling')) {
            _sizes = _.find(ub.data.applicationSizes.items, {name: 'team_name', sport: 'wrestling'});
        }

        if (typeof _sizes === 'undefined') {
            ub.utilities.warn('Application Sizes for ' + applicationType + ' is not found! Using default');
            _sizes = ub.data.applicationSizes.getSizes('default', applicationType);
        }

        return _sizes;

    }

    /// End Interactive Applications

    ub.funcs.popupTest = function () {

        var _result = $('div#primaryTailSweepPopup').is(':visible') || $('div#primaryFontPopup').is(':visible') || $('div#primaryAccentPopup').is(':visible') || $('div#primaryMascotPopup').is(':visible') || $('div.bootbox').is(':visible');

        return _result;

    }

    /// Locations and Free Application Types

    ub.data.locationSprites = [];

    ub.funcs.createClickableMarkers = function (sprite, view, locationCode, viewPerspective) {

        if (!ub.config.isFeatureOn('ui', 'hotspots')) {
            return;
        }

        var basesprite;

        baseSprite = _.first(sprite.children);
        baseSprite.oldTint = baseSprite.tint;

        sprite.spriteType = 'Marker';
        sprite.draggable({manager: ub.dragAndDropManager, disabled: true,});
        sprite.mouseup = sprite.touchend = function (data) {
        };

        $('body').mouseup(function () {

            if (viewPerspective !== ub.active_view) {
                return;
            }
            if (ub.status.fullView.getStatus()) {
                return;
            }
            if (ub.funcs.popupTest()) {
                return;
            }

            if (sprite.ubHover) {

                var _id = locationCode;
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});

                ub.funcs.deActivateLocations();
                ub.showLocation = false;

                if (_settingsObject.application_type === "free") {

                    if (!ub.data.useScrollingUI) {
                        ub.funcs.activateFreeApplication(locationCode);
                    }

                }
                else if (_settingsObject.application_type === "mascot") {

                    if (ub.data.useScrollingUI) {
                        // Trigger click on tab
                        ModifierController.scrollToOptions(_settingsObject.application_type, _id, _settingsObject.code);
                    } else {
                        ub.funcs.activateMascots(locationCode);
                    }

                } else {

                    if (ub.data.useScrollingUI) {
                        ModifierController.scrollToOptions(_settingsObject.application_type, _id, _settingsObject.code);
                    } else {
                        ub.funcs.activateApplications(_settingsObject.code);
                    }

                }

                sprite.ubHover = false;

            }

        });

        sprite.mousedown = sprite.touchstart = function (data) {

            if (ub.status.fullView.getStatus()) {
                return;
            }
            if (viewPerspective !== ub.active_view) {
                return;
            }
            if (ub.status.fontPopupVisible) {
                return;
            }
            if (ub.funcs.popupTest()) {
                return;
            }
            if (typeof this.interactionData === 'undefined') {
                return;
            }

            var this_data = this.interactionData.data;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

        };

        sprite.mousemove = sprite.mousemove = function (interactionData) {

            if (ub.funcs.popupTest()) {
                return;
            }
            if (viewPerspective !== ub.active_view) {
                return;
            }

            if (ub.status.fullView.getStatus()) {
                return;
            }

            var this_data = interactionData.data;
            window.sprite = sprite;

            var point = {
                x: this_data.global.x,
                y: this_data.global.y
            };

            /// Start Hotspot

            var sprite_obj;

            if (sprite.children.length === 0) {

                sprite_obj = sprite

            } else {

                sprite_obj = _.first(sprite.children);

            }

            if (typeof sprite_obj.containsPoint === "function") {

                var _sizeOfApplications = _.size(ub.current_material.settings.applications);

                if (sprite_obj.containsPoint(point)) {

                    if (ub.zoom) {
                        return;
                    }

                    if (typeof ub.objects[viewPerspective + '_view']['rotate_tool'] === "object") {
                        return;
                    } // if move tool is visible don't show location marker

                    // start

                    var _match = _.find(ub.data.placeHolderApplications, {id: parseInt(locationCode)});

                    if (typeof _match === "undefined") {

                        sprite.ubHover = true;
                        ub.funcs.highlightMarker(locationCode, viewPerspective);
                        ub.data.applicationAccumulator = _sizeOfApplications;

                    }

                } else {

                    // restore

                    ub.funcs.unHighlightMarker(locationCode, viewPerspective);
                    sprite.ubHover = false;
                    ub.data.applicationAccumulator -= 1;

                }

            }

            /// End Hot Spot

        };

    }

    /// End Create Clickable Application

    ub.funcs.removeLocations = function () {

        var _locations = ub.current_material.settings.applications;

        _.each(_locations, function (location) {

            _.each(location.application.views, function (view, index) {

                var _perspective = view.perspective + '_view';

                var locationObject = ub.objects[_perspective]['locations_' + location.code];

                //locationObject.zIndex = 1;

                if (typeof locationObject !== 'undefined') {
                    locationObject.alpha = 0;
                }

                //ub.updateLayersOrder(ub[_perspective]);

            })

        });

        ub.showLocation = false;

    }

    ub.funcs.renderLocations = function (locationCode) {

        var _locations = ub.current_material.settings.applications;

        _.each(_locations, function (location) {

            if (location.type === "free") {

                /// Todo: Handle Here ....

            }

            _.each(location.application.views, function (view, index) {

                var _perspective = view.perspective + '_view';
                var _viewObject = ub.objects[_perspective];

                // If object already exists continue
                if (typeof _viewObject['locations_' + location.code] === "object") {
                    return;
                }

                var _x = view.application.center.x;
                var _y = view.application.center.y;
                var _sprite = ub.funcs.createLocationSprite(location.code);

                _viewObject['locations_' + location.code] = _sprite;

                _sprite.position.x = _x;
                _sprite.position.y = _y;

                _sprite.zIndex = -(ub.funcs.generateZindex('locations')) + (index * -1);

                ub[_perspective].addChild(_sprite);
                ub.updateLayersOrder(ub[_perspective]);

                ub.funcs.createClickableMarkers(_sprite, _viewObject, location.code, view.perspective);

            });

        });

        if (typeof locationCode !== "undefined") {

            ub.funcs.activateFreeApplication(locationCode);

        }

    }

    ub.funcs.locationMarkersExist = function () {

        var _locations = ub.current_material.settings.applications;
        var _firstID = _.first(_.pluck(ub.current_material.settings.applications, 'code'));
        var _pview = ub.funcs.getPrimaryView(ub.current_material.settings.applications[_firstID].application);

        if (typeof ub.objects[_pview + '_view'] === "undefined") {

            return false;

        }

        return typeof ub.objects[_pview + '_view']['locations_' + _firstID] !== "undefined";

    }

    ub.funcs.showLocations = function (alphaOff) {

        var _locations = ub.current_material.settings.applications;
        ub.showLocation = true;

        // Don't process this function when there's no application

        var _firstID = _.first(_.pluck(ub.current_material.settings.applications, 'code'));

        if (typeof _firstID === "undefined") {

            ub.utilities.info('This uniform has no Applications.');
            return;

        }

        var _objectPresent = false;
        var _pView = ub.funcs.getPrimaryView(ub.current_material.settings.applications[_firstID].application);
        var _locationsMarkerExists = ub.funcs.locationMarkersExist();

        if (!_locationsMarkerExists) {

            ub.funcs.renderLocations();

        }

        _.each(_locations, function (location) {

            _.each(location.application.views, function (view, index) {

                var _perspective = view.perspective + '_view';
                var _locationObj = ub.objects[_perspective]['locations_' + location.code];

                if (typeof alphaOff !== 'undefined') {

                    _locationObj.alpha = 0;

                } else {

                    var _match = _.find(ub.data.placeHolderApplications, {id: parseInt(location.code)});

                    if (typeof _match === "undefined") {

                        _locationObj.alpha = 1;

                    }

                }

            })

        });

    }

    ub.funcs.getNewCustomID = function () {

        var _ctr = 70;

        var _lastAdded = _.last(_.filter(ub.current_material.settings.applications, function (app) {
            return parseInt(app.code) > 70;
        }));

        if (typeof _lastAdded !== "undefined") {
            _ctr = parseInt(_lastAdded.code);
        }

        return _ctr + 1;

    }

    ub.funcs.deleteLocation = function (locationID) {

        ub.funcs.activateBody();

        var _appSettings = ub.current_material.settings.applications[locationID];

        _.each(_appSettings.application.views, function (view) {

            var _obj = ub.objects[view.perspective + '_view']['objects_' + locationID];
            ub[view.perspective + '_view'].removeChild(_obj);

            var _lObj = ub.objects[view.perspective + '_view']['locations_' + locationID];
            ub[view.perspective + '_view'].removeChild(_lObj);

            delete ub.objects[view.perspective + '_view']['objects_' + locationID];
            delete ub.objects[view.perspective + '_view']['locations_' + locationID];
            ub.activeApplication = undefined;

        });

        delete ub.current_material.settings.applications[locationID];

        if (typeof ub.data.applications_transformed["Body"] !== "undefined") {

            delete ub.data.applications_transformed["Body"][locationID];

        } else {

            if (typeof ub.data.applications_transformed["Body Panel Color"] !== "undefined") {

                delete ub.data.applications_transformed["Body Panel Color"][locationID];

            }

        }

        delete ub.data.applications_transformed_one_dimensional[locationID];

        ub.funcs.deactivateMoveTool(locationID);
        ub.tools.activeTool.deactivate();
        ub.funcs.updateLayerTool();

        ub.funcs.gotoFirstMaterialOption();
        $('body').css('cursor', 'auto');

    };

    ub.funcs.activateBody = function () {

        $('div.pd-dropdown-links[data-ctr="1"]').trigger('click'); // 1 is first body part [Body, Front Body or Left Body]

    }

    ub.funcs.getNewZIndex = function () {

        var _size = _.size(ub.current_material.settings.applications);

        return _size + 1;

    }

    ub.funcs.isUniformFullSublimation = function () {

        return ub.current_material.material.uniform_application_type === "sublimated" || ub.current_material.material.uniform_application_type === "knitted";

    }

    ub.funcs.getFreeFormLayers = function () {

        var _list = [];

        if (ub.funcs.isUniformFullSublimation()) {

            _list = _.sortBy(ub.data.modifierLabels, function (item) {

                var i = 100;

                // set intGroupID value (if it is NaN),
                // this is to make sure that _.sortBy work
                if (Number.isNaN(item.intGroupID)) {
                    item.intGroupID = i++;
                }

                return item.intGroupID;

            });

            _list = _.reject(_list, function (item) {
                return item.name.indexOf('Trim') > -1 ||
                    item.name.indexOf('Piping') > -1 ||
                    item.name.indexOf('Stripe') > -1 ||
                    item.name.indexOf('Front Insert') > -1 ||
                    item.name.indexOf('Zipper') > -1 ||
                    item.name.indexOf('Sleeve Cuff') > -1 ||
                    item.name.indexOf('Hood Cuff') > -1 ||
                    item.name.indexOf('Pocket Cuff') > -1 ||
                    item.name.indexOf('Arm Cuff') > -1 ||
                    item.name.indexOf('Prolook') > -1 ||
                    item.name.indexOf('Belt Loop') > -1 ||
                    item.name.indexOf('Button') > -1 ||
                    item.name.indexOf('Front Body Color') > -1 ||
                    item.name.indexOf('Back Body Color') > -1 ||
                    item.name.indexOf('Side Insert Color') > -1 ||
                    item.name.indexOf('Side Insert') > -1;
            });

            if (ub.funcs.isSocks()) {

                _list = _.reject(_list, function (item) {
                    return item.name.indexOf('Sublimated') === -1 && (item.name.indexOf('Body') === -1 && ub.current_material.material.uniform_category === "Socks (Apparel)");
                });

                if (ub.config.option === "Baseball Home Run Sublimated") {

                    _list = _.reject(_list, function (item) {
                        return item.name.indexOf('Sublimated') === -1 && ub.current_material.material.uniform_category === "Socks (Apparel)";
                    });

                }

                if (ub.config.option === "Baseball Home Run") {

                    _list = _.reject(_list, function (item) {
                        return item.name.indexOf('Body') === -1 && ub.current_material.material.uniform_category === "Socks (Apparel)";
                    });

                }

                if (ub.config.option === "Home Run Sublimated") {

                    _list = _.reject(_list, function (item) {
                        return item.name.indexOf('Sublimated') === -1 && ub.current_material.material.uniform_category === "Socks (Apparel)";
                    });

                }

            }

            if (ub.funcs.isCurrentSport('Wrestling')) {

                _list = _.reject(_list, function (item) {
                    return item.name.indexOf('Body') === -1 && item.name.indexOf('Buckle') === -1;
                });

            }

        }

        _.each(_list, function(item) {
            if (item.name.includes("Body Left") || item.name.includes("Front Body")) {
                item.position = 1;
            }

            if (item.name.includes("Body Right") || item.name.includes("Back Body")) {
                item.position = 2;
            }
        });

        return _.sortBy(_list, 'position');
    }

    ub.funcs.getCentoid = function (perspective, part) {

        var _partObject = _.find(ub.data.boundaries_transformed_one_dimensional[perspective], {name: part});
        var _polygon = [];
        var _cx = undefined;
        var con = new ub.Contour();

        if (typeof _partObject === "undefined") {
            return undefined;
        }
        if (typeof _polygon === "undefined") {
            ub.utilities.warn('No Bounding Box Defined for ' + part);
        }

        if (typeof _polygon !== "undefined") {

            con.pts = _partObject.polygon;
            _cx = con.centroid().x;

        }

        return _cx

    }

    ub.funcs.newApplication = function (perspective, part, type, side) {
        var _pha = _.find(ub.data.placeHolderApplications, {perspective: perspective});
        var _phaSettings = ub.utilities.cloneObject(ub.data.placeholderApplicationSettings[_pha.id]);
        var _part = part;
        var _sport = ub.current_material.material.uniform_category;
        var _blockPattern = ub.current_material.material.block_pattern;
        var _primaryView = ub.funcs.getPrimaryView(_phaSettings.application);
        var _primaryViewObject = ub.funcs.getPrimaryViewObject(_phaSettings.application);

        var _withPlaceholderOverrides = false; // Placeholder overrides set on the backend
        var _perspectiveMarkForDeletion = undefined;

        // Process Uniforms with Extra Layer

        if (ub.data.sportsWithExtraLayer.isValid(ub.current_material.materials_options)) {

            var _extra = ub.objects[perspective + '_view']['extra'];

            if (typeof _extra === "undefined") {
                ub.utilities.error('Extra Layer not detected!');
            }

            if (typeof _extra !== "undefined") {

                var whiteList = ['Body', 'Front Body', 'Back Body', 'Body Left', 'Body Right'];

                if (_.contains(whiteList, _part)) {
                    _part = 'Extra';
                }

            }

        }

        var _exempted = ub.data.applicationProjectionExemptions.isExempted(perspective, part, ub.config.sport);

        // For Cowls, etc which uses a non-standard primary perspectives
        if (_exempted.isExempted) {

            var _primaryViewFound = _.find(_phaSettings.application.views, {perspective: _exempted.result.primary});

            if (typeof _primaryViewFound !== "undefined") {

                _primaryViewFound.application.isPrimary = 1;
                _primaryViewObject = _primaryViewFound;

                _phaSettings.application.views = _.filter(_phaSettings.application.views, function (view) {

                    var _ok = view.perspective !== "left" && view.perspective !== "right" && (_primaryView === "front") ? view.perspective === "back" : view.perspective === "front";
                    return _ok;

                });

            }

            ub.funcs.setActiveView('front');

        }

        // For instances where the part has left or right (e.g. sleeve), converts it to Left Sleeve
        if (typeof side !== "undefined" && side !== "na") {
            _part = side.toTitleCase() + " " + _part;
        }

        // Set Mascots Only for now on Socks
        _phaSettings.validApplicationTypes = ub.data.freeFormValidTypes.getItem(ub.current_material.material.uniform_category, _part).validTypes;

        _.each(_phaSettings.application.views, function (_perspectiveView) {

            var _perspective = _perspectiveView.perspective;

            // Get Center of Polygon
            var _cx = ub.funcs.getCentoid(_perspective, _part);

            // CX Override
            if (typeof _cx !== "undefined") {

                _perspectiveView.application.center = _cx;
                _perspectiveView.application.pivot = _cx;

            }

            if (typeof _perspectiveView !== "undefined") {

                var _overrides = ub.data.placeHolderOverrides.getOverrides(_sport, _part, _perspectiveView.perspective, _blockPattern);

                if (typeof _overrides !== "undefined") {

                    _withPlaceholderOverrides = true;

                    _perspectiveView.application.rotation = _overrides.rotation;
                    _perspectiveView.application.center = _overrides.position;
                    _perspectiveView.application.pivot = _overrides.position;

                } else {

                    // If has a placeholder override but this particular view has none set delete
                    if (_withPlaceholderOverrides) {
                        _perspectiveMarkForDeletion = _perspectiveView.perspective;
                    }

                }

            }

        });

        if (typeof _perspectiveMarkForDeletion !== "undefined") {

            _phaSettings.application.views = _.filter(_phaSettings.application.views, function (view) {
                return view.perspective !== _perspectiveMarkForDeletion;
            });

        }

        _.each(_phaSettings.application.views, function (_perspectiveView) {

            // Get Center of Polygon
            var _cx = ub.funcs.getCentoid(_perspectiveView.perspective, _part);
            var _overrides = ub.data.placeHolderOverrides.getOverrides(_sport, _part, _perspectiveView.perspective, _blockPattern);

            // CX Override
            if (typeof _cx !== "undefined" && typeof _overrides === "undefined") {

                _perspectiveView.application.center = _cx;
                _perspectiveView.application.pivot = _cx;

            }

            if (typeof _perspectiveView !== "undefined" && typeof _overrides === "undefined") {

                if (parseInt(_perspectiveView.application.isPrimary) !== 1) {

                    var _bounds = ub.funcs.getBoundaries(_perspectiveView.perspective, _part, false);
                    var _overrideX = undefined;

                    if (_primaryView === "front") {

                        if (typeof _bounds !== "undefined") {

                            if (_perspectiveView.perspective === "left") {
                                _overrideX = _bounds.minMax.minX;
                            }
                            if (_perspectiveView.perspective === "right") {
                                _overrideX = _bounds.minMax.maxX;
                            }

                        }

                    }

                    if (_primaryView === "back") {

                        if (typeof _bounds !== "undefined") {

                            if (_perspectiveView.perspective === "left") {
                                _overrideX = _bounds.minMax.maxX;
                            }
                            if (_perspectiveView.perspective === "right") {
                                _overrideX = _bounds.minMax.minX;
                            }

                        }

                    }

                    if (_primaryView === "right") {

                        if (typeof _bounds !== "undefined") {

                            if (_perspectiveView.perspective === "front") {
                                _overrideX = _bounds.minMax.minX;
                            }
                            if (_perspectiveView.perspective === "back") {
                                _overrideX = _bounds.minMax.maxX;
                            }

                        }

                    }

                    if (_primaryView === "left") {

                        if (typeof _bounds !== "undefined") {

                            if (_perspectiveView.perspective === "front") {
                                _overrideX = _bounds.minMax.maxX;
                            }
                            if (_perspectiveView.perspective === "back") {
                                _overrideX = _bounds.minMax.minX;
                            }

                        }

                    }

                    _perspectiveView.application.position = {x: _overrideX, y: _primaryViewObject.application.center.x};
                    _perspectiveView.application.center = {x: _overrideX, y: _primaryViewObject.application.center.y};

                }

            }

        });

        var _newID = ub.funcs.getNewCustomID();
        var _newApplication = JSON.parse(JSON.stringify(_phaSettings)); // Quick Clone

        _newID = _newID;
        _newIDStr = _newID.toString();

        _newApplication.code = _newIDStr;
        _newApplication.application.id = _newIDStr;
        _newApplication.configurationSource = "Added";

        _newApplication.zIndex = ub.funcs.getNewZIndex();

        if (ub.data.placeHolderOverrideSports.isValid(ub.sport)) {

            var _tmp = [];

            _.each(_newApplication.application.views, function (view) {

                view.application.id = _newIDStr;

                // For Socks push only the primary perspective
                if (ub.funcs.isSocks()) {
                    if (view.application.isPrimary === 1) {
                        _tmp.push(view);
                    }
                } else {
                    _tmp.push(view);
                }

            });

            _newApplication.application.views = _tmp;

        }

        var _withBodyLeftRight = ub.data.withBodyLeftRight.isOk(ub.sport, ub.neckOption);

        if (_withBodyLeftRight) {

            if (_part === "Body Left") {

                _newApplication.application.views = _.filter(_newApplication.application.views, function (view) {
                    return view.perspective !== "right";
                });

            }

            if (_part === "Body Right") {

                _newApplication.application.views = _.filter(_newApplication.application.views, function (view) {
                    return view.perspective !== "left";
                });

            }

        }

        // Cinch Sack doens't have a left and right perspective
        if (ub.sport === "Cinch Sack (Apparel)") {

            _newApplication.application.views = _.filter(_newApplication.application.views, function (view) {
                return view.perspective !== "left" && view.perspective !== "right";
            });

        }

        var _isSingleView = ub.data.categoriesWithSingleViewApplications.getItem(ub.config.sport, ub.config.type, ub.config.blockPattern, ub.config.option);

        if (_isSingleView) {

            _newApplication.application.views = _.filter(_newApplication.application.views, function (view) {
                return view.application.isPrimary === 1;
            });

        }

        ub.current_material.settings.applications[_newIDStr] = _newApplication;

        _newApplication.application.layer = _part;

        if (typeof ub.data.applications_transformed[_part] !== 'undefined') {

            ub.data.applications_transformed[_part][_newIDStr] = _newApplication.application;
            _newApplication.application.layer = _part;

        } else {

            if (typeof ub.data.applications_transformed["Body Panel Color"] !== 'undefined') {

                _newApplication.application.layer = "Body Panel Color";
                ub.data.applications_transformed["Body Panel Color"][_newIDStr] = _newApplication.application;

            }

        }

        ub.data.applications_transformed_one_dimensional[_newIDStr] = _newApplication.application;
        ub.funcs.renderLocations(_newIDStr);
        ub.funcs.pushOldState('add location', 'application', _newApplication, {applicationID: _newIDStr});
        ub.funcs.updateLayerTool();

        $('div.optionButton[data-type="' + type + '"]').trigger('click');

        $.smkAlert({
            text: 'Added [' + type.toTitleCase() + '] on [' + part.toTitleCase() + '] layer',
            type: 'success',
            time: 10,
            marginTop: '90px'
        });

        // Initialize New Embellishment Popup
        if (type === "embellishments") {

            _newApplication.font_size = _newApplication.size;

            if (typeof ub.user.id === "undefined" || typeof is.embellishments.userItems === "undefined" || is.embellishments.userItems.length === 0) {

                is.loadDesigner(undefined, _newIDStr);

            } else {

                ub.funcs.createEmbellishmentSelectionPopup(_newApplication);

            }

        }

    }

    ub.funcs.addLocation = function (artOnly) {
        // Guard

        var _submimatedSport = ub.data.freeFormToolEnabledSports.get(ub.current_material.material.uniform_category);
        if (typeof _submimatedSport === "undefined") {
            return;
        }

        // End Guard

        // Select Perspective

        var template = $('#m-add-free-form-application').html();
        var data = {parts: ub.funcs.getFreeFormLayers(),};
        var markup = Mustache.render(template, data);

        var dialog = bootbox.dialog({
            title: 'Add a new Free Form Application',
            message: markup,
        });

        dialog.init(function () {

            // Perspectives

            $('div.perspective-container > span.perspective').unbind('click');
            $('div.perspective-container > span.perspective').on('click', function () {

                var _perspective = $(this).data('id');

                $('div.perspective-container > span.perspective').removeClass('active');
                $(this).addClass('active');

                ub.funcs.setActiveView(_perspective);

                if (ub.data.sportsWithExtraLayer.isValid(ub.current_material.materials_options)) {

                    var _partToMakeActive = '';

                    $('span.part').removeClass('active');

                    if (_perspective === "back" || _perspective === "front") {

                        if (ub.data.freeFormToolFirstPartSelection.activateOnLowerUniform(ub.current_material.material.uniform_category)) {

                            $('span.part').first().addClass('active');

                        } else {

                            _partToMakeActive =  _perspective.toTitleCase();

                            $('div.part-container span').each(function() {
                                var part = $(this).text();

                                if (part.indexOf(_partToMakeActive) !== -1) {
                                    _partToMakeActive = part;
                                    $('span.part').removeClass('active');
                                    $('span.part[data-id="' + _partToMakeActive + '"]').addClass('active');
                                }

                            });
                        }

                        // Hide label.leftRightPart and div.side-container, not applicable on front or back perspective
                        $('label.leftrightPart, div.side-container').hide();
                        $('span.side').removeClass('active');

                    } else {
                        // If perspective is not Front or Back, just select the first part
                        $('span.part').first().addClass('active');
                        $('span.part').first().trigger('click');
                        var side = $('span.side.active').data('id');
                        var _partToMakeActive = _perspective.toTitleCase();

                        $('div.part-container span').each(function() {
                            var part = $(this).text();
                            var makeActive = '';

                            if (part.indexOf(_partToMakeActive) !== -1) {
                                makeActive = part;
                                $("span.part").removeClass('active');
                                $('span.part[data-id="' + makeActive + '"]').addClass('active');
                            }
                        });

                        if ($('span.side').hasClass('active')) {

                            side = side.toTitleCase() + " ";

                            side = $('span.side.active').text().replace(side, '');

                            $('span.part.active').removeClass('active');

                            $('span.part[data-id="' + side + '"]').addClass('active');

                            $('span.side.active').removeClass('active');

                            $('span.side[data-id="' + _perspective + '"]').addClass('active');

                            if (typeof $('span.part.active').data('id') === 'undefined') {
                                $('span.part').first().addClass('active');
                                $('span.side.active').removeClass('active');
                            }

                        }

                    }

                    if (ub.funcs.isSocks()) {
                        _part = "Sublimated";

                        if (typeof ub.data.modifierLabels["Body"] !== "undefined") {
                            _part = "Body";
                        }

                        $('span.part[data-id="' + _part + '"]').addClass('active');

                    }

                }

            });

            // Parts

            $('div.part-container > span.part').unbind('click');
            $('div.part-container > span.part').on('click', function () {

                var _part = $(this).data('id');

                $('div.part-container > span.part').removeClass('active');
                $(this).addClass('active');

                var _left = _.find(ub.current_material.materials_options, {name: "Left " + _part});

                if (typeof _left !== "undefined") {

                    // This has a left / right part

                    $('span.partName').html(_part);

                    $('span.side[data-id="na"]').hide();
                    $('label.leftrightPart, div.side-container').fadeIn();

                    $('span.side').removeClass('active');
                    $('span.side[data-id="left"]').addClass('active');

                    $('span.side[data-id="left"]').html('Left ' + _part);
                    $('span.side[data-id="right"]').html('Right ' + _part);

                    var _side = $('span.perspective.active').data('id');

                    if (_side === "front" || _side === "back") {

                        _side = "left";
                        $('span.perspective').removeClass('active');
                        $('span.perspective[data-id="' + _side + '"]').addClass('active');

                    }

                    $('span.side').removeClass('active');
                    $('span.side[data-id="' + _side + '"]').addClass('active');

                } else {

                    /*var _isLowerFootball2017Uniform = (ub.current_material.material.uniform_category === "Football 2017" && ub.current_material.material.type === "lower");

                    if (_part === "Body" && !_isLowerFootball2017Uniform && !ub.funcs.isSocks()) {

                        $('span.perspective').removeClass('active');
                        $('span.perspective[data-id="front"]').addClass('active');

                    }*/

                    $('label.leftrightPart, div.side-container').hide();
                    $('span.side').removeClass('active');
                    $('span.side[data-id="na"]').addClass('active');
                    $('span.side[data-id="na"]').show();

                }

            });

            // Sides

            $('div.side-container > span.side').unbind('click');
            $('div.side-container > span.side').on('click', function () {

                var _side = $(this).data('id');
                var _previousPart = $('span.part.active').data("id");
                var _isExempted = ub.data.applicationProjectionExemptions.isExempted(_side, _previousPart, ub.config.sport);

                $('div.side-container > span.side').removeClass('active');
                $(this).addClass('active');
            });

            // Application Type

            $('div.application-container > span.optionButton').unbind('click');
            $('div.application-container > span.optionButton').on('click', function () {

                var _part = $(this).data('id');

                $('div.application-container > span.optionButton').removeClass('active');
                $(this).addClass('active');

            });

            /// Init Code

            if (ub.funcs.isSocks() && ub.config.blockPattern !== 'Hockey Sock') {

                // Hide Player # and Player Name options on all Socks (Apparel) except on 'Hockey Sock' block pattern
                $('span.optionButton[data-type="player_number"]').hide();
                $('span.optionButton[data-type="player_name"]').hide();

            }

            $('div.perspective-container > span.perspective[data-id="' + ub.active_view + '"]').addClass('active');

            var _part = 'Body';

            if (ub.funcs.isSocks()) {
                _part = "Sublimated";
            }

            if (ub.funcs.isCurrentSport('Wrestling') && ub.current_material.material.neck_option === "Fight Short") {
                _part = "Body Left"
            }

            /// Acitvate Part / Perspective

            if (ub.data.sportsWithExtraLayer.isValid(ub.current_material.materials_options)) {

                var _partToMakeActive = '';

                $('span.part').removeClass('active');

                if (ub.active_view === "back" || ub.active_view === "front" || ub.funcs.isSocks()) {

                    _partToMakeActive = ub.active_view.toTitleCase() + " Body";
                    $('span.part[data-id="' + _partToMakeActive + '"]').addClass('active');

                }

            } else {

                $('div.part-container > span.part[data-id="' + _part + '"]').addClass('active');

            }

            // Catch all expression when nothing is selected, just select first if perspective is not Front or Back
            if (!$('span.part').hasClass('active')) {

                var $perspective = $('div.perspective-container').find('span.perspective.active');

                if ($perspective.text() === "Back" || $perspective.text() === "Front") {

                    if (ub.data.freeFormToolFirstPartSelection.activateOnLowerUniform(ub.current_material.material.uniform_category)) {

                        $('span.part').first().addClass('active');

                    } else {

                        var _partToMakeActive =  $perspective.text().toTitleCase();

                        var partCount = 0; 

                        $('div.part-container span').each(function() {
                            
                            var part = $(this).text();

                            if (part.indexOf(_partToMakeActive) !== -1 && partCount < 1) {
                                partCount++;
                                _partToMakeActive = part;
                            }

                        });

                        $('span.part[data-id="' + _partToMakeActive + '"]').addClass('active');

                    }

                } else {

                    $('span.part').first().addClass('active');
                    var side = $('span.side.active').data('id');
                    var _partToMakeActive = $perspective.text().toTitleCase();

                    $('div.part-container span').each(function() {
                        var part = $(this).text();
                        var makeActive = '';

                        if (part.indexOf(_partToMakeActive) !== -1) {
                            makeActive = part;
                            $("span.part").removeClass('active');
                            $('span.part[data-id="' + makeActive + '"]').addClass('active');
                        }
                    });
                }

            }

            $('div.application-container').find('span.optionButton[data-type="mascot"]').addClass('active');

            // Footer Buttons

            $('span.cancelButton').unbind('click');
            $('span.cancelButton').on('click', function () {

                dialog.modal('hide');

            });

            $('span.okButton').unbind('click');
            $('span.okButton').on('click', function () {

                var _perspective = $('span.perspective.active').data('id');
                var _part = $('span.part.active').data('id');
                var _type = $('span.optionButton.active').data('type');
                var _side = $('span.side.active').data('id');

                ub.funcs.newApplication(_perspective, _part, _type, _side);

                dialog.modal('hide');

            });

            // Cinch Sack doesnt have a Left and Right View

            if (ub.funcs.isCurrentSport("Cinch Sack (Apparel)")) {

                $('span.perspective[data-id="left"], span.perspective[data-id="right"]').hide();

            }

            /// End Init Code

            // Art Only

            if (typeof artOnly !== "undefined") {

                if (artOnly) {

                    $('span.optionButton').not('[data-type="embellishments"]').hide();
                    $('span.optionButton[data-type="mascot"]').removeClass('active');
                    $('span.optionButton[data-type="embellishments"]').addClass('active');

                    $('span.okButton').text('Next');

                }

            }

            // End Art Only

        $('div.perspective-container > span.perspective.active').trigger('click');

        });

        // End Select Perspective

    };

    ub.sort = undefined;

    ub.funcs.getSampleCaption = function (app) {

        var _caption = ''

        switch (app.application_type) {

            case 'free':

                _caption = '(UNUSED)';
                break;

            case 'shoulder_number':

                _caption = app.text;
                break;

            case 'sleeve_number':

                _caption = app.text;
                break;

            case 'front_number':

                _caption = app.text;
                break;

            case 'back_number':

                _caption = app.text;
                break;

            case 'player_name':

                _caption = app.text;
                break;

            case 'mascot':

                _caption = app.mascot.name;
                break;

            case 'team_name':

                _caption = app.text;
                break;

            case 'embellishments':

                _caption = app.embellishment.name.toString();
                break;

            default:

                util.error('app type not detected: ' + app.application_type);

        }

        _caption = _caption.toUpperCase();

        return _caption;

    };

    ub.funcs.updateCaption = function (appID) {

        if (!$('div#layers-order').is(':visible')) {
            return;
        }

        var $locationLayer = $('span.layer[data-location-id="' + appID + '"]');
        var _settingsObject = ub.funcs.getSettingsObject(appID);
        var _caption = ub.funcs.getSampleCaption(_settingsObject);
        var _applicationType = _settingsObject.application_type.toUpperCase().replace('_', ' ');
        var _appTypeAlias = _applicationType;

        if (_applicationType === "EMBELLISHMENTS") {
            _appTypeAlias = 'C. MASCOT';
        }
        if (_applicationType === "MASCOT") {
            _appTypeAlias = 'S. MASCOT';
        }

        $locationLayer.find('span.caption').html(_caption);
        $locationLayer.find('span.application_type').html(_appTypeAlias);

    }

    // Activate Move Tool and Primary Perspective
    ub.funcs.activateManipulator = function (appID) {

        var _appCode = appID;
        var _settingsObject = ub.funcs.getSettingsObject(_appCode);

        if (_settingsObject.application_type === "free") {

            ub.funcs.activateFreeApplication(_appCode);

        } else {
            console.log("Activate Manipulator");
            ub.funcs.activateApplications(_appCode);

        }

    }

    ub.funcs.isLayersPanelVisible = function () {

        return $('div#layers-order').is(':visible');

    }

    ub.funcs.activateLayer = function (_appID) {

        var _view = ub.funcs.getPrimaryView(ub.current_material.settings.applications[_appID].application);
        //$('a.change-view[data-view="' + _view + '"]').trigger('click');

        if (!ub.funcs.isLayersPanelVisible()) {
            return;
        }

        $('span.layer').removeClass('active');
        $('span.layer[data-location-id="' + _appID + '"]').addClass('active');

    }

    ub.funcs.setActiveView = function (view) {

        $('a.change-view[data-view="' + view + '"]').trigger('click');

    }

    ub.funcs.updateLayerTool = function () {

        var _htmlStr = '';
        var _applicationCollection = _.sortBy(ub.current_material.settings.applications, 'zIndex').reverse();

        _.each(_applicationCollection, function (app) {

            var _zIndex = app.zIndex;
            var _applicationType = app.application_type.toUpperCase().replace('_', ' ');

            var _applicationCode = app.code;
            var _caption = ub.funcs.getSampleCaption(app);
            var _primaryView = ub.funcs.getPrimaryView(app.application);
            var _perspectivePart = '<span class="perspective">(' + _primaryView.substring(0, 1).toUpperCase() + ')</span>';

            var _appTypeAlias = _applicationType;

            if (_applicationType === "EMBELLISHMENTS") {
                _appTypeAlias = 'C. MASCOT';
            }
            if (_applicationType === "MASCOT") {
                _appTypeAlias = 'S. MASCOT';
            }

            var _applicationTypePart = ' <span class="application_type">' + _appTypeAlias + '</span>';
            var _captionPart = '<span class="caption">' + window.util.truncate(_caption) + '</span>';
            var _codePart = '<span class="code"> #' + app.code + '</span>';

            _htmlStr += '<span class="layer unselectable" data-location-id="' + app.code + '" data-zIndex="' + app.zIndex + '">' + _codePart + _captionPart + _perspectivePart + _applicationTypePart + '</span>';

        });

        $('div.layers-container').html('');
        $('div.layers-container').html(_htmlStr);

        $('span.layer').unbind('click');
        $('span.layer').on('click', function () {

            if ($(this).hasClass('active')) {

                ub.funcs.deactivateMoveTool();
                ub.funcs.activateBody();

                return;

            }

            var _appCode = $(this).data('location-id');
            ub.funcs.activateManipulator(_appCode);

        });

        if (!ub.data.freeFormToolEnabledSports.isValid(ub.current_material.material.uniform_category)) {
            return;
        } // Cancel Draggable if not Wrestling, in the future make switch for sublimated

        ub.data.sorting = false;

        ub.sort = $("div.layers-container").sortable({

            handle: '.layer',
            animation: 150,
            onStart: function (evt) {

                ub.data.sorting = true;
                ub.data.justSorted = true;

            },
            onEnd: function (evt) {

                ub.data.sorting = false;
                ub.data.justSorted = true;

            },
            onUpdate: function (evt) {

                $.each($('span.layer'), function (key, value) {

                    var _length = _.size(ub.current_material.settings.applications);

                    var _index = _length - (key + 1);
                    var _locID = $(value).data('location-id');
                    var _app = ub.current_material.settings.applications[_locID];

                    _app.zIndex = _index;

                    $(this).find('span.zIndex').html(_index + 1);

                    if (_app.application_type === "free") {
                        return;
                    }

                    _.each(_app.application.views, function (view) {

                        var _obj = ub.objects[view.perspective + '_view']['objects_' + _locID];

                        if (_obj.zIndex !== 0) { // Skip changing zIndex if application is disabled

                            _obj.zIndex = -(ub.funcs.generateZindex('applications') + _index);

                        }

                    });


                });

                ub.updateLayersOrder(ub.front_view);
                ub.updateLayersOrder(ub.back_view);
                ub.updateLayersOrder(ub.left_view);
                ub.updateLayersOrder(ub.right_view);

                var _locationID = $(evt.item).data('location-id');
                ub.funcs.activateManipulator(_locationID);

            }

        });

    }

    ub.funcs.hideLayerTool = function () {

        if ($('div#layers-order').is(':visible')) {

            $('div#layers-order').removeClass('on').addClass('off');
            $('a.change-view[data-view="layers"]').removeClass('active-change-view');

        }

    }

    ub.funcs.hiderandomFeedsTool = function () {

        $('div#randomFeeds-panel').removeClass('on').addClass('off');
        $('a.change-view[data-view="randomFeed"]').removeClass('active-change-view');
        $('div#randomFeedsUI').remove();

    }

    ub.is.wrestling = function () {

        return ub.funcs.getCurrentUniformCategory() === "Wrestling";

    }

    ub.funcs.showLayerTool = function () {

        ub.funcs.activateBody();

        if ($('div#layers-order').is(':visible')) {

            $('div#layers-order').removeClass('on').addClass('off');
            $('a.change-view[data-view="layers"]').removeClass('active-change-view');

            $('a.change-view[data-view="locations"]').click();

        } else {

            $('div#layers-order').removeClass('off').addClass('on');
            $('a.change-view[data-view="layers"]').addClass('active-change-view');

        }

        var $layerTool = $('div#layers-order');
        $layerTool.unbind('mousedown');
        $layerTool.mousedown(ub.funcs.handle_mousedown);

        ub.funcs.updateLayerTool();
        // End Populate Layer Tool

        $('div.layers-header > span.close').on('click', function () {

            ub.funcs.hideLayerTool();

            if (ub.showLocation) {

                ub.funcs.removeLocations();
                $('span.show-locations').find('span.caption').html("Show Location Markers");
                $('span.show-locations').removeClass('active');

            }

        });

        if (ub.funcs.isTackleTwill()) {

            $('span.add-application').addClass('inactive');
            $('em.dragMessage').remove();
            $('div.layers-container').addClass('notSublimated');

        }

        $('span.add-application').unbind('click');
        $('span.add-application').on('click', function () {

            if (!ub.funcs.isTackleTwill()) {
                $('a.change-view[data-view="locations-add"]').click();
            }

        });

        $('span.show-locations').unbind('click');
        $('span.show-locations').on('click', function () {

            if ($(this).find('span.caption').html() === "Show Location Markers") {

                $(this).find('span.caption').html("Hide Location Markers");
                $(this).addClass('active');
                ub.funcs.showLocations();

            } else {

                $(this).find('span.caption').html("Show Location Markers");
                $(this).removeClass('active');
                ub.funcs.removeLocations();

            }

        })

        $('div#layers-order > span.close').unbind('click');
        $('div#layers-order > span.layers-close').on('click', function () {
            ub.funcs.showLayerTool();
        });

        /// After Load

        ub.funcs.gotoFirstApplication();
        ub.funcs.activeStyle('layers');

        /// End After Load

    }

    ub.funcs.activateFreeApplication = function (application_id) {

        if (ub.funcs.popupsVisible()) {
            return true;
        }
        if (!ub.funcs.okToStart()) {
            return;
        }

        ub.funcs.activatePanelGuard();

        var _id = application_id.toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
        var _validApplicationTypes = _settingsObject.validApplicationTypes;

        var _htmlBuilder;

        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);

        _htmlBuilder = '<div id="applicationUI" data-application-id="' + _id + '">';
        _htmlBuilder += '<div class="header">';
        _htmlBuilder += '<div class="applicationType">Select Application Type for Location (#' + _id + ')</div>';
        _htmlBuilder += '<div class="body">';

        var _deactivated = '';


        if (!_.contains(_validApplicationTypes, 'number')) {
            _deactivated = 'deactivatedOptionButton';
        }

        _htmlBuilder += '<div class="optionButton ' + _deactivated + '" data-type="player_number">';
        _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-number-large.png">' + '</div>';
        _htmlBuilder += '<div class="caption">Player Number</div>';
        _htmlBuilder += '</div>';
        _deactivated = '';

        if (!_.contains(_validApplicationTypes, 'team_name')) {
            _deactivated = 'deactivatedOptionButton';
        }

        _htmlBuilder += '<div class="optionButton ' + _deactivated + '" data-type="team_name">';
        _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
        _htmlBuilder += '<div class="caption">Team Name</div>';
        _htmlBuilder += '</div>';

        _htmlBuilder += '<br />';
        _deactivated = '';

        if (!_.contains(_validApplicationTypes, 'player_name')) {
            _deactivated = 'deactivatedOptionButton';
        }

        _htmlBuilder += '<div class="optionButton ' + _deactivated + '" data-type="player_name">';
        _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
        _htmlBuilder += '<div class="caption">Player Name</div>';
        _htmlBuilder += '</div>';
        _deactivated = '';

        if (!_.contains(_validApplicationTypes, 'logo')) {
            _deactivated = 'deactivatedOptionButton';
        }

        _htmlBuilder += '<div class="optionButton ' + _deactivated + '" data-type="mascot">';
        _htmlBuilder += '<div class="icon">' + '<img src="/images/main-ui/icon-mascot-large.png">' + '</div>';
        _htmlBuilder += '<div class="caption">Mascot</div>';
        _htmlBuilder += '</div>';

        if (ub.config.uniform_application_type !== "sublimated") {
            if (!_.contains(_validApplicationTypes, 'embellishments')) {
                _deactivated = 'deactivatedOptionButton';
            }
        }

        _htmlBuilder        +=           '<div class="optionButton ' + _deactivated + '" data-type="embellishments">';
        _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-embellishments-large.png">' + '</div>';
        _htmlBuilder        +=                 '<div class="caption">Custom Mascot</div>';
        _htmlBuilder        +=           '</div>';

        _htmlBuilder += '</div>';
        _htmlBuilder += "</div>";
        _deactivated = '';

        $('.modifier_main_container').append(_htmlBuilder);
        $('div#applicationUI').fadeIn();

        $('div.optionButton').on('click', function () {

            if ($(this).hasClass('deactivatedOptionButton')) {
                return;
            }

            var _type = $(this).data('type');
            _settingsObject.status = 'on';

            ub.funcs.changeApplicationType(_settingsObject, _type);
            $('div#changeApplicationUI').remove();

        });

        ub.funcs.activateLayer(application_id);

    };

    ub.funcs.gotoFirstApplication = function () {

        if ($('span.layer').length > 0) {
            $('span.layer').first().trigger('click');
        }

        // var _keys = _.keys(ub.current_material.settings.applications);

        // if (_keys.length > 0) {
        //     var _firstApplication = _keys[0];
        // }

        // var obj1 = a = ub.funcs.getApplicationSettings(1);
        // var $layersContainer = $('div.layers-container');

        // if ((ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) && ub.current_material.material.type === "lower") {

        //     $('span.layer[data-location-id="38"]').trigger('click');
        //     $layersContainer.scrollTo($('span.layer[data-location-id="38"]'));

        // } else if (ub.funcs.isCurrentSport('Baseball') && ub.current_material.material.type === "upper") {

        //     $('span.layer[data-location-id="1"]').trigger('click');
        //     $layersContainer.scrollTo($('span.layer[data-location-id="1"]'));

        // } else if (typeof obj1 === "object") {

        //     $('span.layer[data-location-id="1"]').trigger('click');
        //     $layersContainer.scrollTo($('span.layer[data-location-id="1"]'));

        // } else {

        //     var $span = $('span.layer').first();
        //     if (typeof $span !== "undefined") { $span.trigger('click'); }

        // }

    }

    ub.funcs.gotoFirstMaterialOption = function () {

        var _firstPart = $($('div.pd-dropdown-links')[1]).data('fullname');
        $('div.pd-dropdown-links[data-fullname="' + _firstPart + '"]').trigger('click');

    }

    ub.funcs.showCrossHair = function (x, y) {

        ub.funcs.removeCrossHair();

        var _sprite = ub.pixi.new_sprite('/images/main-ui/ch.png');

        ub.ch = _sprite;

        _sprite.anchor.set(0.5, 0.5);

        _sprite.position.x = x;
        _sprite.position.y = y;
        _sprite.zIndex = -1000;

        ub[ub.active_view + "_view"].addChild(_sprite);
        ub.objects[ub.active_view + "_view"]['ch'] = _sprite;

        ub.updateLayersOrder(ub[ub.active_view + "_view"]);

    }

    ub.funcs.printFontData = function (location, perspective) {

        var _orig = ub.funcs.getApplicationSettingsByView(location, perspective).application.center;

        var _origX = _orig.x;
        var _origY = _orig.y;

        console.log("{");
        console.log("    location: '" + location + "',");
        console.log("    fontName: 'Badgers'" + ",");
        console.log("    perspective: '" + perspective + "',");
        console.log("    size: '4',");
        console.log("    origY: " + _origY + ",");
        console.log("    origX: " + _origX + ",");
        console.log("    adjustmentY: " + _origY + ",");
        console.log("    adjustmentX: " + _origX + ",");
        console.log("    scaleY: 1,");
        console.log("    scaleX: 1,");
        console.log("},{");
        console.log("    location: '" + location + "',");
        console.log("    fontName: 'Badgers'" + ",");
        console.log("    perspective: '" + perspective + "',");
        console.log("    size: '3',");
        console.log("    origY: " + _origY + ",");
        console.log("    origX: " + _origX + ",");
        console.log("    adjustmentY: " + _origY + ",");
        console.log("    adjustmentX: " + _origX + ",");
        console.log("    scaleY: 1,");
        console.log("    scaleX: 1,");
        console.log("}");

        return 'ok';

    }

    ub.funcs.removeCrossHair = function () {

        ub[ub.active_view + '_view'].removeChild(ub.ch)

    }

    /// End Locations and Free Application Types

    ub.uploadThumbnail = function (view) {

        ub[view].visible = true;

        ub.funcs.fullResetHighlights();

        var _dataUrl = ub.getThumbnailImage(view);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            data: JSON.stringify({dataUrl: _dataUrl}),
            url: ub.config.host + "/saveLogo",
            dataType: "json",
            type: "POST",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {

                if (response.success) {

                    ub.current_material.settings.thumbnails[view] = response.filename;

                    if (ub.funcs.thumbnailsUploaded()) {

                        $('span.processing').fadeOut();
                        $('span.submit-order').fadeIn();

                    }

                }
                else {

                    console.log('Error generating thumbnail for ' + view);
                    console.log(response.message);

                }

            }

        });

    }

    ub.funcs.fileUpload = function (file, settingsObj, callback) {

        $('span.ok_btn').attr('data-status', 'processing');
        $('em.unsupported-file').html('');

        var _file = file;
        var formData = new FormData();

        formData.append('file', file);

        if (typeof $.ajaxSettings.headers !== "undefined") {
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        }

        $.ajax({

            data: formData,
            url: ub.config.api_host + "/api/fileUpload",
            type: "POST",
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            crossDomain: true,
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {

                if (response.success) {

                    var _extension = response.filename.split('.').pop();
                    window.uploaded_filename = response.filename;
                    callback(response.filename);

                    if (_extension === 'gif' || _extension === 'jpg' || _extension === 'bmp' || _extension === 'png' || _extension === 'jpeg') {

                        $('img#preview').attr('src', response.filename);

                    } else if (_extension === 'pdf') {

                        $('img#preview').attr('src', '/images/uiV1/pdf.png');

                    } else if (_extension === 'ai') {

                        $('img#preview').attr('src', '/images/uiV1/ai.png');

                    } else {

                        $('em.unsupported-file').html('Unsupported File Type: (' + _extension + ')!');
                        $('span.ok_btn').css('display', 'none');
                        return;

                    }

                    $('em.unsupported-file').html('Uploaded File is ok! (' + _extension + ')');
                    $('span.ok_btn').html('Submit Logo (' + _extension + ')');
                    $('span.ok_btn').attr('data-status', 'ok');
                    $('span.ok_btn').css('display', 'inline-block');

                }
                else {

                    console.log('Error Uploading Custom Artwork');
                    console.log(response.message);

                }

            }

        });

    }

    ub.funcs.fileUploadAttachment = function (file, callback) {

        $('span.ok_btn').attr('data-status', 'processing');
        $('em.unsupported-file').html('');

        var _file = file;
        var formData = new FormData();

        formData.append('file', file);

        if (typeof $.ajaxSettings.headers !== "undefined") {
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        }

        $.ajax({

            data: formData,
            url: ub.config.api_host + "/api/fileUpload",
            type: "POST",
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            crossDomain: true,
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {

                if (response.success) {

                    var _extension = response.filename.split('.').pop();

                    if (ub.data.validDocumentTypesForUpload.isValidDocument(_extension)) {

                        callback(response.filename, _extension, true);

                    } else {

                        callback(response.filename, _extension, false);

                    }

                }
                else {

                    callback(undefined, undefined, undefined);

                }

            }

        });

    }


    ub.uploadLogo = function (dUrl) {

        $('span.ok_btn').css('color', '#3d3d3d');
        $('span.ok_btn').html('Processing...  <img src="/images/loading.gif" />');
        $('span.ok_btn').hide();
        $('span.ok_btn').fadeIn();
        $('span.ok_btn').attr('data-status', 'processing');
        $('span.ok_btn').css('border', 'none');

        var _dataUrl = dUrl;

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({

            data: JSON.stringify({dataUrl: _dataUrl}),
            url: ub.config.host + "/saveLogo",
            dataType: "json",
            type: "POST",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {

                if (response.success) {

                    window.uploaded_filename = response.filename;

                    $('span.ok_btn').css('background-color', '#acacac');
                    $('span.ok_btn').html('Submit Logo');
                    $('span.ok_btn').attr('data-status', 'ok');
                    $('span.ok_btn').css('display', 'inline-block');
                    $('span.ok_btn').css('border', '1px solid #3d3d3d');
                    $('span.ok_btn:hover').css({'background-color': '#3d3d3d', 'color': 'white'});

                }
                else {

                    console.log('Error Uploading Custom Artwork');
                    console.log(response.message);

                }

            }

        });

    }

    ub.funcs.turnLocationsOff = function () {

        ub.funcs.removeLocations();
        ub.funcs.deactivateMoveTool();
        $('a[data-view="locations"]').removeClass('zoom_on');

    }

    // ub.funcs.isSublimated = function () {

    //     var _factoryCode = ub.current_material.material.factory_code;
    //     var _result = false;

    //     if (_factoryCode === "BLB") {

    //         _result = true;

    //     }

    //     return _result;

    // }

    ub.funcs.removePatternMasks = function () {

        _.each(ub.views, function (view) {

            var _viewStr = view + '_view';

            _.each(ub.objects[_viewStr], function (obj) {

                var s = obj.name;

                if (s !== null) {

                    if (s.indexOf('pattern') > -1) {

                        obj.oldMask = obj.mask;
                        obj.mask = undefined;

                    }
                }

            });

        })

    }

    ub.funcs.restorePatternMasks = function () {

        _.each(ub.views, function (view) {

            var _viewStr = view + '_view';

            _.each(ub.objects[_viewStr], function (obj) {

                var s = obj.name;

                if (s !== null) {

                    if (s.indexOf('pattern') > -1) {

                        obj.mask = obj.oldMask;

                    }
                }

            });

        });

    }

    ub.funcs.generateZindex = function (type) {

        var _val = 0;

        switch (type) {

            case 'locations':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 200;
                break;

            case 'applications':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 150;
                break;

            case 'randomFeeds':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 50;
                break;

            case 'pipings':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 50;
                break;

            case 'namedrops':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 55;
                break;

            case 'logos':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 55;
                break;

            case 'gradients':
                _val = (ub.maxLayers * (ub.zIndexMultiplier)) + 55;
                break;

            default:
                _val = 0;

        }

        return _val;

    }

    ub.funcs.removePolygon = function () {

        _.each(ub.views, function (view) {

            if (typeof ub.objects[view + '_view']['activePolygon'] !== "undefined") {

                ub[view + '_view'].removeChild(ub.objects[view + '_view']['activePolygon']);

            }

        });

    }

    ub.funcs.createEllipse = function (graphics, coordinates) {

        var width = 7;
        var height = 7;

        graphics.beginFill(0x000000);
        graphics.drawEllipse(coordinates.x, coordinates.y, width, height);
        graphics.endFill();

    }

    ub.funcs.createPolygon = function (perspective, polygon, minMax) {

        var graphics = new PIXI.Graphics();

        ub.funcs.removePolygon(); // Remove if previous polygon exists

        graphics.lineStyle(2, 0x000000, 1);
        graphics.drawPolygon(polygon);

        ub.activePolygon = graphics;

        ub.funcs.createEllipse(graphics, minMax.minXCoor);
        ub.funcs.createEllipse(graphics, minMax.minYCoor);
        ub.funcs.createEllipse(graphics, minMax.maxXCoor);
        ub.funcs.createEllipse(graphics, minMax.maxYCoor);

        // Center Point - manual centoid
        ub.funcs.createEllipse(graphics, {
            x: minMax.centoid.x,
            y: minMax.centoid.y,
        });

        ub.objects[perspective + '_view']['activePolygon'] = ub.activePolygon;
        ub[perspective + '_view'].addChild(ub.activePolygon);

    }

    ub.funcs.getBoundariesCurrentView = function (materialOption) {

        return ub.funcs.getBoundaries(ub.active_view, materialOption);

    }

    ub.funcs.getBoundarySettings = function (perspective, materialOption) {

        var _result = _.find(ub.data.boundaries_transformed_one_dimensional[perspective], {name: materialOption.toTitleCase()});
        return _result;

    }

    ub.funcs.getMaterialOptionAngle = function (perspective, materialOption) {

        var _angle = 0;
        var _result = ub.funcs.getBoundarySettings(perspective, materialOption);

        if (typeof _result === "undefined") {

            ub.utilties.info('No boundary settings for ' + perspective + ' / ' + materialOption);

        }

        if (typeof _result !== "undefined") {

            if (typeof _result.polygon[0].angle !== "undefined") {

                _angle = _result.polygon[0].angle;

            } else {

                ub.utilties.info('No angle field detected from ' + perspective + ' / ' + materialOption);

            }

        }

        return _angle;

    }

    ub.funcs.getBoundaries = function (perspective, materialOption, skipDrawPolygon) {

        var _result = ub.funcs.getBoundarySettings(perspective, materialOption);
        var _polygon = undefined;
        var _array = [];

        if (typeof _result !== "undefined") {

            _polygon = _result.polygon;

        }

        // convert to linear array

        var minMax = {
            minX: ub.dimensions.width,
            minY: ub.dimensions.height,
            maxX: 0,
            maxY: 0,

            minXCoor: {x: 0, y: 0},
            minYCoor: {x: 0, y: 0},
            maxXCoor: {x: 0, y: 0},
            maxYCoor: {x: 0, y: 0},
        }

        _.each(_polygon, function (point) {

            minMax.minX = Math.min(point.x, minMax.minX);
            minMax.minY = Math.min(point.y, minMax.minY);
            minMax.maxX = Math.max(point.x, minMax.maxX);
            minMax.maxY = Math.max(point.y, minMax.maxY);

            if (minMax.minX === point.x) {
                minMax.minXCoor = {x: point.x, y: point.y};
            }
            if (minMax.minY === point.y) {
                minMax.minYCoor = {x: point.x, y: point.y};
            }
            if (minMax.maxX === point.x) {
                minMax.maxXCoor = {x: point.x, y: point.y};
            }
            if (minMax.maxY === point.y) {
                minMax.maxYCoor = {x: point.x, y: point.y};
            }

            minMax.centoid = {
                x: ((minMax.maxXCoor.x - minMax.minXCoor.x) / 2) + minMax.minXCoor.x,
                y: ((minMax.maxYCoor.y - minMax.minYCoor.y) / 2) + minMax.minYCoor.y,
            };

            _array.push(point.x);
            _array.push(point.y);

        });

        if (skipDrawPolygon) {
            ub.funcs.createPolygon(perspective, _array, minMax);
        }

        return {boundaries: _array, minMax: minMax};

    }

    ub.funcs.setSocksPatternScale = function (percentage) {

        ub.funcs.setPatternScale('sublimated', percentage);

    }

    ub.funcs.setPatternScale = function (part, percentage) {

        _.each(ub.views, function (view) {

            var _part = ub.objects[view + '_view']['pattern_' + part];

            if (typeof _part !== "undefined") {

                ub.objects[view + '_view']['pattern_' + part].scale = {x: percentage, y: percentage};

            }

        });

    }

    ub.funcs.changeActiveView = function (perspective) {

        $('a.change-view[data-view="' + perspective + '"]').trigger('click');

    }

    ub.funcs.getMascotByID = function (id) {

        var _result = _.find(ub.data.mascots, {id: id.toString()});
        return _result;

    }

});