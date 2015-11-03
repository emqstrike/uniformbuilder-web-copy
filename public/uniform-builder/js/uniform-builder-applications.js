$(document).ready(function() {

    $("#file-src").change(function() {

        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) { return; } // no file selected, or no FileReader support

        if (/^image/.test(files[0].type)) { // only image file

            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function() { // set image data as background of div

                var logos = ub.current_material.settings.files.logos;
                var file = files[0];
                var id = new Date().getTime();

                logos[id] = {
                    id: id,
                    filename: file.name,
                    dataUrl: this.result
                };

                var markup = "<tr data-id='" + id + "'>";
                markup += "<td>" + "<img class='logo_list' src='" + this.result + "' />" + "</td>";
                markup += "<td>" + "<a class='logo_list' data-id='" + id + "' data-action='preview'>" + file.name + "</a>" + "</td>";
                markup += "<td>" + "<a class='logo_list' data-action='remove' data-id='" + id + "' class='btn-remove'>" + "<i class='fa fa-times'></i>" + "</td>";
                markup += "</tr>";

                $('table.logos').append(markup);
                $('.file_upload.logo > .image_preview').css("background-image", "url(" + this.result + ")");
                ub.funcs.update_logos_picker();

                $('a.logo_list').on('click', function() {

                    var action = $(this).data('action');
                    var id = $(this).data('id');
                    var logos = ub.current_material.settings.files.logos;

                    if (action === 'remove') {

                        $('tr[data-id="' + id + '"]').remove();
                        logos[id] = null;
                        delete logos[id];

                        $('.file_upload.logo > .image_preview').css("background-image", "none");
                        $("#file-src").val('');

                        ub.funcs.update_logos_picker();

                    } else if (action === 'preview') {

                        $('.file_upload.logo > .image_preview').css('background-image', "url(" + logos[id].dataUrl + ")");

                    }

                });

            }
        }

    });

    ub.funcs.update_logos_picker = function() {

        _.each($('.logos_picker'), function(e) {

            var $container = $(e);
            var logos = ub.current_material.settings.files.logos;
            var application_id = $container.data('id');
            var markup = "";

            markup += "<div class='row'>";

            _.each(logos, function(logo) {
                markup += "<div class='col-md-4'>";
                markup += "<a class='thumbnail logo_picker' data-id='" + logo.id + "'>" + "<img class = 'logo_picker' src='" + logo.dataUrl + "'>" + "</a>";
                markup += "</div>";
            });

            markup += "</div><div class='logo_sliders' data-id='" + application_id + "'>";
            markup += "<input type='checkbox' id='flip_logo_" + application_id + "' value data-target='logo' data-label='flip' data-id='" + application_id + "'> Flip<br /><br />";
            markup += "Opacity: <span data-target='logo' data-label='opacity' data-id='" + application_id + "'>100</span>% <div class='logo_slider opacity_slider' data-id='" + application_id + "'></div><br />";
            markup += "Scale: <span data-target='logo' data-label='scale' data-id='" + application_id + "'>100</span>% <div class='logo_slider scale_slider' data-id='" + application_id + "'></div><br />";
            markup += "Rotation: <div class='logo_slider rotation_slider' data-id='" + application_id + "'></div><br />";
            markup += "X Position: <span></span> <div class='x_slider logo_slider' data-id='" + application_id + "'></div><br />";
            markup += "Y Position: <span></span> <div data-id='" + application_id + "' class='y_slider logo_slider'></div></div><br />";

            $container.html(markup);

            var application = _.find(ub.data.applications.items, {
                id: application_id
            });

            $('input#flip_logo_' + application_id).click( function(){

                var obj = ub.objects.front_view['objects_0'+application_id];

                if( $(this).is(':checked') ) {


                    obj.flipped = true;
                    obj.scale.x = Math.abs(obj.scale.x) * -1;

                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');
                    $angle_slider_logo.find('div.rs-bg-color').css({
                        '-moz-transform': 'scaleX(-1)',
                        '-o-transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)',
                        'transform': 'scaleX(-1)',
                        'filter': 'FlipH',
                        '-ms-filter': "FlipH",
                    });

                }
                else {
                
                    obj.flipped = false;
                    obj.scale.x = Math.abs(obj.scale.x);

                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');
                    $angle_slider_logo.find('div.rs-bg-color').css({
                        '-moz-transform': 'scaleX(1)',
                        '-o-transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)',
                        'transform': 'scaleX(1)',
                        'filter': 'none',
                        '-ms-filter': "none",
                    });

                }

            });

            $('div.y_slider[data-id="' + application_id + '"]').limitslider({

                values: [application.position.y],
                min: 0,
                max: ub.dimensions.height,
                gap: 0,

                change: function(event, ui) {

                    var application = _.find(ub.data.applications.items, {
                        id: application_id
                    });
                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects.front_view['objects_0' + application_id];
                    object.y = value;

                }

            });

            $('div.x_slider[data-id="' + application_id + '"]').limitslider({

                values: [application.position.x],
                min: 0,
                max: ub.dimensions.width,
                gap: 0,

                change: function(event, ui) {

                    var application = _.find(ub.data.applications.items, {
                        id: application_id
                    });
                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects.front_view['objects_0' + application_id];
                    object.x = value;

                }

            });

            $('div.scale_slider[data-id="' + application_id + '"]').limitslider({

                values: [100],
                min: 0,
                max: 100,
                gap: 0,

                change: function(event, ui) {

                    var application = _.find(ub.data.applications.items, {
                        id: application_id
                    });
                    var value = $(this).limitslider("values")[0];

                    var object = ub.objects.front_view['objects_0' + application_id];

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

            $('div.opacity_slider[data-id="' + application_id + '"]').limitslider({

                values: [100],
                min: 0,
                max: 100,
                gap: 0,

                change: function(event, ui) {

                    var application = _.find(ub.data.applications.items, {
                        id: application_id
                    });
                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects.front_view['objects_0' + application_id];
                    object.alpha = value / 100;

                    $('span[data-target="logo"][data-label="opacity"][data-id="' + application_id + '"]').text(value);


                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

                    var opacity =  value / 100;
                    $angle_slider_logo.find('div.rs-bg-color').css({
                        "opacity": opacity,
                    });

                }

            });

            var $rotation_slider = $('div.rotation_slider[data-id="' + application_id + '"]');
            $rotation_slider.roundSlider({

                values: [0],
                min: 0,
                max: 620,
                gap: 0,
                width: 5,
                handleSize: "+14",
                startAngle: 90,

                change: function(event, ui) {

                    var application = _.find(ub.data.applications.items, {
                        id: application_id
                    });
                    var value = parseInt($rotation_slider.find('span.edit').html());
                    var object = ub.objects.front_view['objects_0' + application_id];

                    object.rotation = value / 100;

                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

                    var rotation = ( value / 620 ) * 360;
                    $angle_slider_logo.find('div.rs-bg-color').css({
                        "-webkit-transform": "rotate(" + rotation + "deg)",
                    });

                }

            });

            $('a.logo_picker').on('click', function() {

                $a = $(this);

                var application_id = $a.parent().parent().parent().data('id');
                var logo_id = $a.data('id');

                var logo = _.find(logos, {
                    id: logo_id
                });
                var application = _.find(ub.data.applications.items, {
                    id: application_id
                });

                ub.funcs.update_application(application, logo);

                //// Change Background 

                $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

                $angle_slider_logo.find('div.rs-bg-color').css({
                    'background-image': 'url(' + logo.dataUrl + ')',
                    'background-size': '80%',
                    'background-position': 'center center',
                    'background-repeat': 'no-repeat',
                });

                console.log(logo.dataUrl);
                console.log($angle_slider_logo);
                console.log('div.rotation_slider[data-id="' + application_id + '"]');

                console.log('-----');
                console.log($angle_slider_logo.find('div.rs-bg-color'));

                window.s = $angle_slider_logo.find('div.rs-bg-color');
    
                //// End Change Background

            });

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

    ub.funcs.update_application = function(application, logo) {

        var x = ub.dimensions.width * application.position.x;
        var y = ub.dimensions.height * application.position.y;
        var settings = ub.current_material.settings;
        var application_logo_code = application.code + '_' + logo.id;

        settings.applications[application.code] = {
            application: application,
            logo: logo
        };

        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var sprite = PIXI.Sprite.fromImage(logo.dataUrl);
        var mask = _.find(ub.current_material.material.options, {
            perspective: application.perspective,
            name: 'Body'
        });
        var mask = ub.pixi.new_sprite(mask.material_option_path);

        sprite.mask = mask;

        var s = view_objects['objects_' + application.code];

        if (typeof(s) === 'object') {
            view.removeChild(view_objects['objects_' + application.code]);
            delete view_objects['objects_' + application.code];
        }

        view_objects['objects_' + application.code] = sprite;
        view.addChild(sprite);

        ub.updateLayersOrder(view);

        sprite.position.x = x - (sprite.width / 2);
        sprite.position.y = y - (sprite.height / 2);
        sprite.zIndex = -51;
        sprite.anchor.set(0.5, 0.5);

        $('div.x_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.x]);
        $('div.y_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.y]);

        sprite.draggable({
            manager: ub.dragAndDropManager
        });

        sprite.mouseup = sprite.touchend = function(data) {

            if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                sprite.x = sprite.oldX;
                sprite.y = sprite.oldY;

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

                            sprite.x = x;
                            sprite.y = y;
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

            window.data = this.interactionData.data;
            window.this = this;
            window.sprite = sprite;

            var point = {
                x: window.data.global.x,
                y: window.data.global.y
            };

            if (sprite.containsPoint(point)) {
                sprite.zIndex = -500;
                this.tint = 0x555555;
                ub.updateLayersOrder(view);
            } else {
                sprite.zIndex = sprite.originalZIndex;
                this.tint = 0xffffff;
                ub.updateLayersOrder(view);
            }

        };

    };

});