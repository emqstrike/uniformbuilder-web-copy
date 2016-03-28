$(document).ready(function() {

    var materialOptions = {};
    materialOptions['front'] = {};
    materialOptions['back'] = {};
    materialOptions['left'] = {};
    materialOptions['right'] = {};

    var canvasFront = this.__canvas = new fabric.Canvas('applications-front-canvas');
    canvasFront.setWidth( 496 );
    canvasFront.setHeight( 550 );
    fabric.Object.prototype.transparentCorners = false;

    var topInterval;
    var bottomInterval;
    var leftInterval;
    var rightInterval;

    $('#applications_div').animate({ 'zoom': 0.75 }, 400);
    // $('#save-material-option-modal').css('height',$( window ).height()*1);
    // $('#save-material-option-modal').css('overflow','auto');

    window.mascots = null;
    getMascots(function(mascots){
        // console.log(items);
        window.mascots = mascots;
    });

    function getMascots(callback){
        var mascots;
        // var url = "//" + api_host + "/api/mascots";
        var url = "//api-dev.qstrike.com/api/mascots";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                mascots = data['mascots'];
                // console.log("Mascots: "+items);
                if(typeof callback === "function") callback(mascots);
            }
        });
    }

    window.fonts = null;
    getFonts(function(fonts){
        // console.log(items);
        window.fonts = fonts;
    });

    function getFonts(callback){
        var mascots;
        // var url = "//" + api_host + "/api/mascots";
        var url = "//api-dev.qstrike.com/api/fonts";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                fonts = data['fonts'];
                // console.log("Mascots: "+items);
                if(typeof callback === "function") callback(fonts);
            }
        });
    }

    // console.log('FONTS: '+JSON.stringify(fonts));

    var controls_state = 0;
    $('#app-controls').hide();

    $(document).on('click', '#app_controls_button', function() {
        if( controls_state == 0 ){
            $('#app-controls').fadeIn();
            $(this).text('Hide Controls');
            controls_state = 1;
            console.log('toggle if');
        } else{
            $('#app-controls').fadeOut();
            $(this).text('Show Controls');
            controls_state = 0;
            console.log('toggle else');
        }
    });

    var application_number = 0;

    $('.confirm-no').on('click', function(){
        location.reload();
    });

    // *** Set the rows of Material Options Uploader to Sortable

    $( "tbody" ).disableSelection();
    $( "tbody.upload-sortable-rows" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            var length = $('.options-row').length;
            $(".options-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                var type = $(this).find(".mo-setting-type").val();
                if(type == "highlights"){
                    $(this).find(".layer-number").val('99');
                    $(this).find(".layer-number").text('99');
                }
                if(type == "shadows"){
                    $(this).find(".layer-number").val('98');
                    $(this).find(".layer-number").text('98');
                }
                length = length-1;
            });
            var newLength = $('.options-row').length;
            renumberRows(newLength);
        }
    });

    // *** Materials Options Uploader helpers

    $(document).on('click', '.clone-row', function() {
        syncMOLayers();
    });

    function syncMOLayers(){
        var length = $('.options-row').length;
        $(".options-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            var type = $(this).find(".mo-setting-type").val();
            if(type == "highlights"){
                $(this).find(".layer-number").val('99');
                $(this).find(".layer-number").text('99');
            }
            if(type == "shadows"){
                $(this).find(".layer-number").val('98');
                $(this).find(".layer-number").text('98');
            }
            length = length-1;
        });
        var newLength = $('.options-row').length;
        renumberRows(newLength);
    }

    $("#material-option-name").keyup(function() {
        checkNameLength();
    });

    $(document).on('change', '.front-applications, .app-id, .app-def-item, .app-def-name, .app-uniform-sizes, .app-font-sizes, .app-number, .app-player-name, .app-team-name, .app-logo, .app-primary, #group_id,#is_blend,#allow_pattern,#allow_gradient,#allow_color,.setting-types,.perspective,#file-src,#layer-level,.gradients,.default-color,.origin,.colors', function() {
        // if($(this).hasClass('app-default-mascot')){
        //     $(this).ddslick({
        //         data: ddData,
        //         width: 300,
        //         height: 300,
        //         imagePosition: "left",
        //         selectText: "Select Mascot",
        //         onSelected: function (data) {
        //             $(this).find(".app-mascot-value").val(data['selectedData']['value']);
        //         },
        //     });
        // }

        updateCoordinates();
    });

    // $(document).on('change', '.app-default-mascot, .dd-selected-value', function() {
    //     console.log('mascot changed');
    //     updateCoordinates();
    // });

    $('a[data-toggle=popover],img[data-toggle=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'top',
        content: function(){
            return '<img src="'+$(this).data('img') + '" style="width: 200px; height: 200px; background-color: #525252;"/>';
        }
    });

    $('#add_front_application').mousedown(function(){

        var default_item = $('#front-default-item').val();
        var default_name_raw = $('#application_name').val();
        var default_name = default_name_raw.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"");

        var fill = '#e3e3e3';
        var height = 30;
        var width = 30;
        var opacity = 0.6;
        var font_family = 'arial black';
        var stroke_color = 'red';
        var stroke_width = 1;
        var app_id_font_size = 8;
        var app_type_font_size = 8;
        var group_left = canvasFront.width / 2.6;
        var group_top = canvasFront.height / 5;

        var area = fabricAppRectangle(application_number, fill, height, width, stroke_width, stroke_color, opacity);
        var app_id = fabricAppID( application_number.toString(), font_family, opacity, app_id_font_size);
        var app_type = fabricAppType( default_item.toString(), font_family, opacity, app_type_font_size);
        var group = fabricAppGroup( application_number, group_left, group_top, area, app_id, app_type, default_item);
        canvasFront.add(group);

        var fonts_options = '<option value="">Not Set</option>';
        for(var i = 0; i < window.fonts.length; i++) {
            fonts_options += "<option value=" + window.fonts[i].id + ">" + window.fonts[i].name + "</option>";
        }

        var font_label              = '<label class="control-label label-default" style="float: left; padding: 5px; border-radius: 3px; margin-top: 5px;">Font:</label>';
        var default_text_label      = '<label class="control-label label-default" style="float: left; padding: 5px; border-radius: 3px; margin-top: 5px;">Text:</label>';
        var default_number_label    = '<label class="control-label label-default" style="float: left; padding: 5px; border-radius: 3px; margin-top: 5px;">Number:</label>';
        var text                    = $(this).val();
        var style                   = 'margin-right: 5px';
        var items_arr               = ["logo", "number", "team_name", "player_name"];
        var app_id                  = '<input type="text" style="' + style + '" class="app-id" name="application_id" data-id="' + group.id + '" value="' + group.id + '" size="3">';
        var delete_application      = '<a class="btn btn-xs btn-danger delete-application" data-id="' + canvasFront.getObjects().indexOf(group) + '">Delete</a>';
        var def_name                = '<input type="text" style="' + style + '" data-id="' + application_number + '" class="app-def-name" value="'+default_name+'">';
        var application_rotation    = '<input type="text" data-id="' + canvasFront.getObjects().indexOf(group) + '" style="' + style + '" class="app-rotation" value="0" size="3">';
        var app_x                   = '<input type="text" style="' + style + '" class="app-x" value="' +canvasFront.width / 2+ '" size="4">';
        var app_y                   = '<input type="text" style="' + style + '" class="app-y" value=' + canvasFront.height / 2 + ' size="4">';
        var app_primary             = '<input type="checkbox" style="' + style + '" class="app-primary" value="1">';
        var app_logo                = '<input type="checkbox" style="' + style + '" class="app-logo" value="1">';
        var app_team_name           = '<input type="checkbox" style="' + style + '" class="app-team-name" value="1">';
        var app_player_name         = '<input type="checkbox" style="' + style + '" class="app-player-name" value="1">';
        var app_number              = '<input type="checkbox" style="' + style + '" class="app-number" value="1">';
        var app_font_sizes          = '<input type="text" style="' + style + '" class="app-font-sizes" value="" size="3">';
        var app_sizes               = '<input type="text" style="' + style + '" class="app-uniform-sizes" value="" size="3">';
        var default_mascot          = '<select style=' + style + ' class="app-default-mascot" data-id="' + group.id + '"></select><input type="hidden" class="app-mascot-value amv' + group.id + '" id="amv' + group.id + '">';
        var default_font            = '<select style=' + style + ' class="app-default-font" data-id="' + group.id + '">' + fonts_options + '</select>';
        var default_text            = '<input type="text" style="' + style + '" class="app-default-text" data-id="' + canvasFront.getObjects().indexOf(group) + '"><br>';
        var default_number          = '<input type="number" style="' + style + '" class="app-default-number" size="3" data-id="' + canvasFront.getObjects().indexOf(group) + '">';

        var select_append           = '<select class="app-def-item" style="' + style + '" data-id="' + canvasFront.getObjects().indexOf(group) + '">';
        select_append += '<option value="' + default_item + '">' + default_item + '</option>';
        for(var i = 0; i<items_arr.length; i++) {

            if(default_item != items_arr[i]) {
                select_append += "<option value=" + items_arr[i] + ">" + items_arr[i] + "</option>";
            }

        }
        select_append += "</select>";

        // var defaults = default_font + default_text + default_number;
        var fields = [
                    app_id,
                    select_append,
                    def_name,
                    application_rotation,
                    app_x,
                    app_y,
                    app_primary,
                    app_logo,
                    app_team_name,
                    app_player_name,
                    app_number,
                    app_font_sizes,
                    app_sizes,
                    default_mascot,
                    default_font,
                    default_text,
                    default_number,
                    delete_application
                ];

        $( ".front-applications" ).append(generateTRow(fields));
        var canvasItem = "application"+group.id;
        application_number++;

        $.each(window.mascots, function(i, item) {
            item['text'] = item.name;
            item['value'] = item.id;
            item['selected'] = false;
            item['description'] = 'Mascot';
            item['imageSrc'] = item.icon;
        });

        var mascotsData = window.mascots;

        var mascot_class = '.app-default-mascot';
        $(mascot_class).ddslick({
            data: mascotsData,
            width: 200,
            height: 300,
            imagePosition: "left",
            selectText: "Select Mascot",
            onSelected: function (data) {
                $('#mascot').val(data['selectedData']['value']);
            },
        });
    });

var applicationProperties = {};    

    $(document).on('click', '.delete-application', function() {
        var itemIdx = $(this).data('id');
        var items = canvasFront.getObjects();
        var item = items[itemIdx];

        var thisGroup = canvasFront.item(itemIdx);

        canvasFront.setActiveObject(canvasFront.item(itemIdx));
        activeObject = canvasFront.getActiveObject();
        canvasFront.remove(activeObject);
        $(this).parent().parent().remove();

        canvasFront.renderAll();
        updateCoordinates();
        application_number--;
    });

    $('.mo-default-color, .mo-sublimated-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });


    var canvas = this.__canvas = new fabric.Canvas('bounding-box-canvas');
    fabric.Object.prototype.transparentCorners = false;
    canvas.setWidth( 496 );
    canvas.setHeight( 550 );

    window.shapes = {};

    var data = {
        topLeft: {
            "x":0,
            "y":0
        },
        topRight: {
            "x":0,
            "y":0
        },
        bottomLeft: {
            "x":0,
            "y":0
        },
        bottomRight: {
            "x":0,
            "y":0
        },
        width: 0,
        height: 0,
        pivot: 0,
        rotation: 0,
        };

    var box = new fabric.Rect({
        width: 250, height: 250, angle: 0,
        fill: 'transparent',
        stroke: 'red',
        originX: 'center',
        originY: 'center'
    });

    var circle = new fabric.Circle({
        radius: 40,
        fill: 'red',
        opacity: 0.35,
        originX: 'center',
        originY: 'center'
    });

    circle.hasBorders = false;
    circle.hasControls = false;

    var text = new fabric.Text('Bounding box', {
        fontSize: 11,
        originX: 'center',
        originY: 'center'
    });

    var bounding_box = new fabric.Group([ box, text ], {
        left: canvas.width / 2.6,
        top: canvas.height / 5
    });

    var midLine = new fabric.Line([0, 20, 350, 20], {
        strokeDashArray: [5, 5],
        stroke: 'red',
        originX: 'center',
        originY: 'center',
        angle: 90,
        left: canvas.width / 2,
        top: canvas.height / 2
    });

    midLine.hasControls = false;

    window.shapes.bounding_box = bounding_box;

    bounding_box.transparentCorners = false;
    canvas.add(bounding_box, midLine);
    updateCoordinates();

    canvas.on({
        'object:moving': updateCoordinates,
        'object:scaling': updateCoordinates,
        'object:rotating': updateCoordinates,
        'mouse:up': updateCoordinates
    });

    canvasFront.on({
        'object:moving': updateCoordinatesXYR,
        'object:scaling': updateCoordinatesXYR,
        'object:rotating': updateCoordinatesXYR,
        'mouse:up': updateCoordinates,
        'mouse:down': flashApplicationRow
    });

    $(".modal").each(function(i) {
        $(this).draggable({
            handle: ".modal-header"
        });
    });

    window.materialOptionSettings = null;
    var url = "//" + api_host + "/api/cuts/settings";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(response){
            window.materialOptionSettings = response;
            var type = 'pant cut';
            var items = materialOptionSettings[type];
        }
    });

    $('.materials').bootstrapTable();

    $(".options-row-source").hide();

    $('#front-default-item').change(function(){
        var def_name = $(this).val();
        $('#application_name').val(def_name);
    });

    $('.clone-row').on('click', function(){
        $( ".options-row:first" ).clone().appendTo( "#options-row-container" );

        $('.mo-default-color, .mo-sublimated-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
        });

        $(".mo-setting-type").change(function() {
            var elem = $(this).parent().siblings().find('.mo-name');
            var type = $(this).val();
            var type_raw = type;
            var sub_def_color_class = ".mo-sublimated-default-color.layer" + length;

            if(type == "highlights" || type == "shadows"){
                type = type.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });

                elem.val(type);

                if(type_raw == "highlights"){
                    $(this).parent().siblings().find(".layer-number").val('99');
                    $(this).parent().siblings().find(".layer-number").text('99');
                } else{
                    $(this).parent().siblings().find(".layer-number").val('98');
                    $(this).parent().siblings().find(".layer-number").text('98');
                }

            }
        });

        $(".mo-name").keyup(function() {
            var elem = $(this).parent().siblings().find('.mo-layer');
            var name = $(this).val().toLowerCase();
            // if(name == "body"){
            //     console.log('MATCH');
            //     $(this).val("Body");
            //     $(elem).append( "<option value=\"-1\" selected class=\"body-layer-number\">-1</option>");
            // }
            // else{
            //     $(".body-layer-number").remove();
            // }
        });

        $(".mo-group-id").keyup(function() {
            renumberRows();
        });

        $(".mo-options-src").change(function() {

            var elem = $(this).parent().siblings().find('.thumbnail-link');
            var elem2 = $(this).parent().siblings().find('.thumb-container');

            var filename = $(this).val();
            filename = filename.split("\\");
            filename = filename[2].split(".");
            var filenamex = filename[0].replace("_", " ");
            filename = filenamex.replace(/[0-9]/g, '');
            filename = filename.replace("_", " ");
            filename = filename.replace("_", " ");

            if( filename.charAt(0) == ' ' ){
                filename = filename.substr(1);
            }

            console.log('FILENAME: '+filename);

            $(this).parent().siblings().find('.mo-name').val(filename);

            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return;

            if (/^image/.test(files[0].type)){
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);

                reader.onloadend = function() {
                    elem.data('img',this.result);
                    elem2.attr('src',this.result);
                    elem2.data('img',this.result);

                    console.log('change file: '+this.result);
                    $(this).parent().siblings().find('.mo-name').val(this.result);
                }
            }

            $('a[data-toggle=popover],img[data-toggle=popover]').popover({
                html: true,
                trigger: 'hover',
                placement: 'left',
                content: function(){
                    return '<img src="'+$(this).data('img') + '" style="width: 200px; height: 200px; background-color: #e3e3e3;"/>';
                }
            });
        }); 

    });

    $('.show-material').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            code: $(this).data('material-code'),
            type: $(this).data('material-type'),
            uniform_category: $(this).data('material-uniform-category'),
            gender: $(this).data('material-gender'),
            v3d: {
                material_path: $(this).data('material-path'),
                bump_map_path: $(this).data('bump-map-path'),
                shadow_path: $(this).data('shadow-path'),
                highlight_path: $(this).data('highlight-path'),
            },
            v2d: {
                front: {
                    view_path: $(this).data('front-view-path'),
                    shape_path: $(this).data('front-view-shape')
                },
                back: {
                    view_path: $(this).data('back-view-path'),
                    shape_path: $(this).data('back-view-shape')
                },
                right_side: {
                    view_path: $(this).data('right-side-view-path'),
                    shape_path: $(this).data('right-side-view-shape')
                },
                left_side: {
                    view_path: $(this).data('left-side-view-path'),
                    shape_path: $(this).data('left-side-view-shape')
                }
            }
        };

        $('#view-material-modal .modal-title').text(material.name);
        $('#view-material-modal .modal-material-code').text(material.code);
        $('#view-material-modal .modal-material-type').text(material.type);
        $('#view-material-modal .modal-material-uniform-category').text(material.uniform_category);
        $('#view-material-modal .modal-material-gender').text(material.gender);
        $('#view-material-modal .material-image').attr('src', material.material_path);
        $('#view-material-modal .bump-map-image').attr('src', material.bump_map_path);
        $('#view-material-modal .shadow-image').attr('src', material.shadow_path);
        $('#view-material-modal .highlight-image').attr('src', material.highlight_path);
        $('#view-material-modal .front-view-image').attr('src', material.v2d.front.view_path);
        $('#view-material-modal .front-view-shape').attr('src', material.v2d.front.shape_path);
        $('#view-material-modal .back-view-image').attr('src', material.v2d.back.view_path);
        $('#view-material-modal .back-view-shape').attr('src', material.v2d.back.shape_path);
        $('#view-material-modal .right-side-view-image').attr('src', material.v2d.right_side.view_path);
        $('#view-material-modal .right-side-view-shape').attr('src', material.v2d.right_side.shape_path);
        $('#view-material-modal .left-side-view-image').attr('src', material.v2d.left_side.view_path);
        $('#view-material-modal .left-side-view-shape').attr('src', material.v2d.left_side.shape_path);
        $('.nav-tabs').tab('show');
        $('#view-material-modal').modal('show');
    });

var material = {};

    $('.add-multiple-material-option').on('click', function(){
        $('#add-multiple-options-modal').modal('show');
    });

    $('.cleanup-material').on('click', function(){
        $('#cleanup-material-modal').modal('show');
        var id = $(this).data('id');
        $('#cleanup_material_id').val(id);
    });

    $('.add-material-option').on('click', function(){
        material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            front_shape: ($(this).data('material-front-shape')),
            back_shape: ($(this).data('material-back-shape')),
            left_shape: ($(this).data('material-left-shape')),
            right_shape: ($(this).data('material-right-shape'))
        };
        $('#save-material-option-modal .material-id').val(material.id);
        $('#save-material-option-modal .modal-title').html("Add Material Options for: " + material.name);
        $('#save-material-option-modal').modal('show');

        $('.material-id').prop("value", material.id);
        $('.material-option-id').val('');
        $('#material-option-name').val('');
        $('#saved-setting-type').val('');
        $('#saved-setting-type').prop("visible", false);
        $('#saved-perspective').val('');
        $('#saved-perspective').prop("visible", false);
        $('#boundary-properties').val('');
        $('#application-properties').val('');
        $("#material-option-bounding-box").css("background-image", '');
        $("#shape-view-top").css("background-image", "url()");
        $("#material-option-bounding-box-top").css("background-image", "url()");
        checkNameLength();
        canvasFront.clear();
        clearAppPropOptions();

    });

    $("#select-perspective").on('change', function() {
        var perspective = $(this).val();
        var material_shape;
        if(perspective == 'front') {
            material_shape = material.front_shape;
        } else if(perspective == 'back') {
            material_shape = material.back_shape;
        } else if(perspective == 'left') {
            material_shape = material.left_shape;
        } else if(perspective == 'right') {
            material_shape = material.right_shape;
        }
        $("#shape-view").css("background-image", "url("+material_shape+")");
        $("#material-option-bounding-box").css("background-image", "url("+material_shape+")");

    });

var appPropJson = "";
    $('.add-multiple-material-option').on('click', function(){
        material = {
            id: $(this).data('material-id')
        };
        var perspective = $(this).data('add-to-perspective');
        $('.material-id').prop("value", material.id);
        $('.perspective-multiple-upload').val(perspective);
    });

    $('.edit-material-option').on('click', function(){
        application_number = 0;
        material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            front_shape: ($(this).data('material-front-shape')),
            back_shape: ($(this).data('material-back-shape')),
            left_shape: ($(this).data('material-left-shape')),
            right_shape: ($(this).data('material-right-shape')),
            option: {
                id: $(this).data('material-option-id'),
                name: $(this).data('material-option-name'),
                origin: $(this).data('material-option-origin'),
                layer_level: $(this).data('material-option-layer-level'),
                default_color: $(this).data('material-option-default-color'),
                sublimated_default_color: $(this).data('material-option-sublimated-default-color'),
                default_color_name: $(this).data('material-option-default-color-name'),
                sublimated_default_color_name: $(this).data('material-option-sublimated-default-color-name'),
                type: $(this).data('material-option-setting-type'),
                team_color_id: $(this).data('material-option-team-color-id'),
                group_id: $(this).data('material-option-group-id'),
                code: $(this).data('material-option-setting-code'),
                path: $(this).data('material-option-path'),
                perspective: $(this).data('material-option-perspective'),
                colors: $(this).data('material-option-colors'),
                gradients: $(this).data('material-option-gradients'),
                blend: ($(this).data('material-option-blend') == 'yes') ? true : false,
                allow_pattern: ($(this).data('material-option-allow-pattern') == 'yes') ? true : false,
                allow_gradient: ($(this).data('material-option-allow-gradient') == 'yes') ? true : false,
                allow_color: ($(this).data('material-option-allow-color') == 'yes') ? true : false,
                boundary_properties: ($(this).data('material-option-boundary-properties')),
                applications_properties: ($(this).data('material-option-applications-properties')),
                highlights: ($(this).data('material-highlights-path'))
            }
        };

        // console.log("HIGHLIGHTS PATH: "+material.option.highlights);

        $('.material-id').prop("value", material.id);
        $('.material-option-id').prop("value", material.option.id);
        $('#material-option-name').val(material.option.name);
        $('#group_id').val(material.option.group_id);
        $('#saved-setting-type').val(material.option.type);
        $('#saved-setting-type').text(material.option.type);
        $('#saved-setting-type').attr('selected','selected');
        $('#saved-origin').val(material.option.origin);
        $('#saved-origin').text(material.option.origin);
        $('#saved-origin').attr('selected','selected');

        $('.saved-default-color').val(material.option.default_color);
        $('.saved-default-color').text(material.option.default_color_name);
        $('.saved-default-color').attr('selected','selected');

        $('#saved-sublimated-default-color').val(material.option.sublimated_default_color);
        $('#saved-sublimated-default-color').text(material.option.sublimated_default_color_name);
        $('#saved-sublimated-default-color').attr('selected','selected');

        $('#saved-perspective').val(material.option.perspective);
        $('#saved-perspective').text(material.option.perspective + " View");
        $('#saved-perspective').attr('selected','selected');

        if(material.option.blend){
            $('#is_blend').prop('checked','checked');
        }
        if(material.option.allow_pattern){
            $('#allow_pattern').prop('checked','checked');
        }
        if(material.option.allow_gradient){
            $('#allow_gradient').prop('checked','checked');
        }
        if(material.option.allow_color){
            $('#allow_color').prop('checked','checked');
        }
        
        var id_nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        var team_color_id_options = "";

        id_nums.forEach(function(entry) {
            id = entry;
            if(id == material.option.team_color_id){
                team_color_id_options = team_color_id_options + "<option value="+id+" selected>"+id+"</option>";
            } else {
                team_color_id_options = team_color_id_options + "<option value="+id+">"+id+"</option>";
            }
        });

        $('#team_color_id').append(team_color_id_options);

        $('.b-prop').prop("value", material.option.boundary_properties);
        $('.a-prop').prop("value", material.option.applications_properties);
        var va_prop_val = $('.a-prop').val();
        if($('.a-prop').val() != "\"{}\""){
            va_prop_val = $('.a-prop').val();
            $('.a-prop').prop("value", va_prop_val);
        }

        var perspective = material.option.perspective;
        var material_option_shape;
        if(perspective == 'front') {
            material_option_shape = material.front_shape;
        } else if(perspective == 'back') {
            material_option_shape = material.back_shape;
        } else if(perspective == 'left') {
            material_option_shape = material.left_shape;
        } else if(perspective == 'right') {
            material_option_shape = material.right_shape;
        }

        if(material.option.highlights != null){
            material_option_shape = material.option.highlights;
        }

        $("#shape-view").css("background-image", "url("+material_option_shape+")");
        $("#shape-view-top").css("background-image", "url("+material.option.path+")");
        $("#material-option-bounding-box-top").css("background-image", "url("+material.option.path+")");
        $("#material-option-bounding-box").css("background-image", "url("+material_option_shape+")");
        checkNameLength();

        $( ".front-applications" ).html(''); // prevents continuous appending of applications points

        // **************
        if($('.b-prop').val != "" || $('.b-prop').val != "\"\""){
            var jason = $('.b-prop').val();
            var output = jason.substring(1, jason.length-1);
            var myData = JSON.parse(output);

            bounding_box.oCoords.tl.x = myData.topLeft.x;
            bounding_box.oCoords.tl.y = myData.topLeft.y;
            bounding_box.oCoords.tr.x = myData.topRight.x;
            bounding_box.oCoords.tr.y = myData.topRight.y;
            bounding_box.oCoords.bl.x = myData.bottomLeft.x;
            bounding_box.oCoords.bl.y = myData.bottomLeft.y;
            bounding_box.oCoords.br.x = myData.bottomRight.x;
            bounding_box.oCoords.br.y = myData.bottomRight.y;
            bounding_box.centerPoint = myData.pivot;
            bounding_box.setAngle(myData.rotation);

            bounding_box.width = myData.boxWidth;
            bounding_box.height = myData.boxHeight;
            box.width = myData.boxWidth;
            box.height = myData.boxHeight;
            bounding_box.left = myData.topLeft.x;
            bounding_box.top = myData.topLeft.y;

            canvas.renderAll();
            canvasFront.clear();

            if($('.a-prop').val() != "\"{}\""){
            var ap_out = va_prop_val.substring(1, va_prop_val.length-1);
            var app_properties = JSON.parse(ap_out);

            $(".front-applications").remove(".apOpt");
            clearAppPropOptions();

            // ITERATE THROUGH THE JSON, AND INSERT THE APPLICATIONS

            appendApplications(app_properties);

            } // ************************ APP PROP IF END


            var boundaryProperties = JSON.stringify(data);
            $('.b-prop').prop('value', boundaryProperties);

            // var applicationsProperties = JSON.stringify(data);
            // $('.a-prop').prop('value', applicationsProperties);

            // console.log("CONSOLE LOG: " + applicationsProperties);


            $("#file-src").prop("src", material.option.path);
            $("#layer-level").prop("value", material.option.layer_level);

            if (material.option.blend) {
                $('#is-blend').attr('checked', 'checked');
            } else {
                $('#is-blend').attr('checked', 'unchecked');
            }

        }
        // **************

        $('#saved-setting-type').attr('selected',true);
        $('#saved-perspective').attr('selected',true);
        $('#edit-material-option-modal .material-option-path').attr('src', material.option.path);
        $('#save-material-option-modal .material-id').val(material.id);
        $('#save-material-option-modal .modal-title span').html("Edit: " + material.option.name);
        $('#save-material-option-modal').modal('show');
    });

    function appendApplications(app_properties){

        for(c = 0; c < Object.keys(app_properties).length; c++){

            var l = 'layer'+c;
            var app_prop_id = app_properties[l].id;
            var app_prop_type = app_properties[l].type;

            // break loop if there's no data, to prevent error: Cheat
            if(!app_properties[l].id){ break; }

            var fill = '#e3e3e3';
            var height = app_properties[l].height;
            var width = app_properties[l].width;
            var opacity = 0.6;
            var font_family = 'arial black';
            var stroke_color = 'red';
            var stroke_width = 1;
            var app_id_font_size = ( app_properties[l].topRight.x - app_properties[l].topLeft.x ) / 3;
            var app_type_font_size = ( app_properties[l].topRight.x - app_properties[l].topLeft.x ) / 5.2;
            var group_left = app_properties[l].topLeft.x;
            var group_top = app_properties[l].topLeft.y;

            // Generate Fabric objects then add to canvas
            var area = fabricAppRectangle(c, fill, height, width, stroke_width, stroke_color, opacity);
            var app_id = fabricAppID( app_prop_id.toString(), font_family, opacity, app_id_font_size);
            var app_type = fabricAppType( app_prop_type.toString(), font_family, opacity, app_type_font_size);
            var group = fabricAppGroup( c, group_left, group_top, area, app_id, app_type, app_prop_type);
            canvasFront.add(group);

            if(app_properties[l].id != null){

                var style                   = 'margin-right: 5px';
                var items_arr               = ["logo", "number", "team_name", "player_name"];
                var app_id                  = '<input type="text" style="' + style + '" class="app-id" data-id="'   + c + '" name="application_id" value="'  + app_properties[l].id + '" size="3">';
                var def_name                = '<input type="text" style="' + style + '" data-id="'                  + c + '"class="app-def-name" value="'    + app_properties[l].name + '">';
                var delete_application      = '<a class="btn btn-xs btn-danger delete-application" data-id="' + c + '">Delete</a>';
                var application_rotation    = '<input type="text" data-id="' + c + '" style="' + style + '" class="app-rotation" value="'  + app_properties[l].rotation    + '" size="3">';
                var app_x                   = '<input type="text" data-id="' + c + '" style="' + style + '" class="app-x" value="'         + app_properties[l].pivot.x     + '" size="4">';
                var app_y                   = '<input type="text" data-id="' + c + '" style="' + style + '" class="app-y" value='          + app_properties[l].pivot.y     + ' size="4">';

                var checked = "checked";
                var primary_checked     = "",
                    logo_checked        = "",
                    team_name_checked   = "",
                    player_name_checked = "", 
                    number_checked      = "";

                // Check checkbox if value is 1, isn't it obvious?
                if(app_properties[l].isPrimary == 1){ primary_checked = checked; }
                if(app_properties[l].hasLogo == 1){ logo_checked = checked; }
                if(app_properties[l].hasTeamName == 1){ team_name_checked = checked; }
                if(app_properties[l].hasPlayerName == 1){ player_name_checked = checked; }
                if(app_properties[l].hasNumber == 1){ number_checked = checked; }

                var app_primary         = '<input type="checkbox" style="'  + style + '" class="app-primary" value="1" '        + primary_checked                   + '>';
                var app_logo            = '<input type="checkbox" style="'  + style + '" class="app-logo" value="1" '           + logo_checked                      + '>';
                var app_team_name       = '<input type="checkbox" style="'  + style + '" class="app-team-name" value="1" '      + team_name_checked                 + '>';
                var app_player_name     = '<input type="checkbox" style="'  + style + '" class="app-player-name" value="1" '    + player_name_checked               + '>';
                var app_number          = '<input type="checkbox" style="'  + style + '" class="app-number" value="1" '         + number_checked                    + '>';
                var app_font_sizes      = '<input type="text" style="'      + style + '" class="app-font-sizes" value="'        + app_properties[l].fontSizes       + '" size="3">';
                var app_sizes           = '<input type="text" style="'      + style + '" class="app-uniform-sizes" value="'     + app_properties[l].uniformSizes    + '" size="3">';
                var default_mascot      = '<select style=' + style + ' id="default_mascot_' + c + '" class="app-default-mascot default_mascot_' + c + '"></select><input type="hidden" class="app-mascot-value amv' + c + '" id="amv' + c + '" value="' + app_properties[l].defaultMascot + '">';
        
                var app_font = "";
                if(app_properties[l].hasOwnProperty('defaultFont')){
                    app_font = app_properties[l].defaultFont;
                }
                var app_text = "";
                if(app_properties[l].hasOwnProperty('defaultText')){
                    app_text = app_properties[l].defaultText;
                }
                var app_number = "";
                if(app_properties[l].hasOwnProperty('defaultNumber')){
                    app_number = app_properties[l].defaultNumber;
                }

                var fonts_options = '<option value="">Not Set</option>';
                for(var i = 0; i < window.fonts.length; i++) {
                    if(app_font == window.fonts[i].id){
                        fonts_options += "<option value=" + window.fonts[i].id + " selected>" + window.fonts[i].name + "</option>";
                    } else {
                        fonts_options += "<option value=" + window.fonts[i].id + ">" + window.fonts[i].name + "</option>";
                    }
                }

                var default_font        = '<select style=' + style + ' class="app-default-font" data-id="' + group.id + '">' + fonts_options + '</select>';
                var default_text        = '<input type="text" style="' + style + '" class="app-default-text" data-id="' + group.id + '" value="' + app_text + '"><br>';
                var default_number      = '<input type="number" style="' + style + '" class="app-default-number" size="3" data-id="' + group.id + '" value="' + app_number + '">';

                // var default_mascot      = '<select style=' + style + ' id="default_mascot_' + c + '" class="app-default-mascot default_mascot_' + c + '"></select><input type="hidden" class="app-mascot-value amv' + c + '" id="amv' + c + '">';

                // Append options to selectbox
                var select_append       = '<select class="app-def-item" style="' + style + '" data-id="' + c + '">';
                select_append           += '<option value="' + app_properties[l].type + '">' + app_properties[l].type + '</option>';
                for(var i = 0; i<items_arr.length; i++) {

                    if(app_properties[l].type != items_arr[i]) {
                        select_append += "<option value=" + items_arr[i] + ">" + items_arr[i] + "</option>";
                    }

                }
                select_append += "</select>";

                // contain TDs in an array, obvious?
                var fields = [
                    app_id,
                    select_append,
                    def_name,
                    application_rotation,
                    app_x,
                    app_y,
                    app_primary,
                    app_logo,
                    app_team_name,
                    app_player_name,
                    app_number,
                    app_font_sizes,
                    app_sizes,
                    default_mascot,
                    default_font,
                    default_text,
                    default_number,
                    delete_application
                ];

                $( ".front-applications" ).append(generateTRow(fields));
                var canvasItem = "application"+group.id;
                var thisGroup = group;

                $.each(window.mascots, function(i, item) {
                    item['text'] = item.name;
                    item['value'] = item.id;
                    if( app_properties[l].defaultMascot == item.id ){
                        item['selected'] = true;
                    } else {
                        item['selected'] = false;
                    }
                    item['description'] = 'Mascot';
                    item['imageSrc'] = item.icon;
                });

                var mascotsData = window.mascots;

                var mascot_class = '.default_mascot_'+c;
                var mascot_id = '#default_mascot_'+c;
                var amv_class = '.amv'+c;
                var amv_id = '#amv'+c;
                $(mascot_id).ddslick({
                    data: mascotsData,
                    width: 250,
                    height: 300,
                    imagePosition: "left",
                    selectText: "Select Mascot",
                    onSelected: function (data) {
                        $(amv_id).val(data['selectedData']['value']);
                        var firstClass = $(this).attr("class");
                        // console.log('This Class >> ' + firstClass);
                        // console.log('AMV CLASS > '+amv_class);
                        // console.log('DD Click ' + data['selectedData']['value']);
                        updateCoordinates();
                    },
                });

                thisGroup.oCoords.tl.x  = app_properties[l].topLeft.x;
                thisGroup.oCoords.tl.y  = app_properties[l].topLeft.y;
                thisGroup.oCoords.tr.x  = app_properties[l].topRight.x;
                thisGroup.oCoords.tr.y  = app_properties[l].topRight.y;
                thisGroup.oCoords.bl.x  = app_properties[l].bottomLeft.x;
                thisGroup.oCoords.bl.y  = app_properties[l].bottomLeft.y;
                thisGroup.oCoords.br.x  = app_properties[l].bottomRight.x;
                thisGroup.oCoords.br.y  = app_properties[l].bottomRight.y;
                thisGroup.centerPoint   = app_properties[l].pivot;
                thisGroup.setAngle(app_properties[l].rotation);
                thisGroup.width         = app_properties[l].width;
                thisGroup.height        = app_properties[l].height;
                thisGroup.left          = app_properties[l].topLeft.x;
                thisGroup.top           = app_properties[l].topLeft.y;
                thisGroup.pivot         = thisGroup.centerPoint;
                
                canvasFront.renderAll();

                application_number++;
            }
            else{
                break;
            }
        }
    }

    // *** Applications Properties helpers

    function flashApplicationRow(e){
        var obj_id = e.target.get('id');
        var ctr = 0;
        $('.application-row').each(function(i, obj) {
            if( ctr == obj_id ){
                $(this).fadeOut();
                setTimeout(fadeInRow($(this)), 1000)
            }
            ctr++;
        });
    }

    function fadeInRow(row){
        row.fadeIn();
    }

    $(document).on('change', '.app-id', function() {
        var itemIdx = $(this).data('id');
        var newId = $(this).val();

        var items = canvasFront.getObjects();
        var item = items[itemIdx];
        var thisGroup = canvasFront.item(itemIdx);

        thisGroup.item(1).text = newId;
        canvasFront.renderAll();
        updateCoordinates();
    });

    $(document).on('change', '.app-def-item', function() {

        var itemIdx = $(this).data('id');
        var newName = $(this).val();
        var items = canvasFront.getObjects();
        var item = items[itemIdx];
        var thisGroup = canvasFront.item(itemIdx);

        thisGroup.item(2).text = newName;
        canvasFront.renderAll();
        updateCoordinates();
    });

    $(document).on('change', '.app-rotation', function() {
        var itemIdx = $(this).data('id');
        var newName = $(this).val();
        var items = canvasFront.getObjects();
        var item = items[itemIdx];
        
        canvasFront.item(itemIdx).setAngle($(this).val()).setCoords();
        canvasFront.renderAll();
        updateCoordinates();
    });

    $("#app_template_name").keyup(function() {
        console.log("Changed template name, length is: "+$(this).val().length);
        if( $(this).val().length > 2 ){
            $('#save_app_template').removeAttr('disabled');
            console.log('IF');
        } else {
            $('#save_app_template').attr('disabled', 'disabled');
            console.log('ELSE');
        }
    });

    $(".load-applications-template").change(function() {
        canvasFront.clear();
        application_number = 1;
        $( ".front-applications" ).html(''); // prevents continuous appending of applications points

        console.log('CHANGE TEMPLATE');
        var va_prop_val = $(this).val();

        if(va_prop_val != "\"{}\""){
            var ap_out = va_prop_val.substring(1, va_prop_val.length-1);
            var app_properties = JSON.parse(ap_out);

            $(".front-applications").remove(".apOpt");
            clearAppPropOptions();
            appendApplications(app_properties);

        }
        updateCoordinates();
    });

    $('#save_app_template').on('click', function(){
        var name = $('#app_template_name').val();
        var block_pattern = $('#material_block_pattern').val();
        var perspective = $('#saved-perspective').val();
        var part = $('#material-option-name').val();
        var applications_properties = $('.a-prop').val();

        var description = "Lorem Ipsum Yaddah";

        var url = "//" + api_host + "/api/application";

        var myData={
            "name":name,
            "block_pattern":block_pattern,
            "perspective":perspective,
            "part":part,
            "description":description,
            "applications_properties":applications_properties
        };

        if($(this).attr('disabled') != 'disabled'){
            console.log('SAVE TEMPLATE!');
            console.log('myData: '+JSON.stringify(myData));

            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(myData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": atob(headerValue)},
                success: function(response){
                    if (response.success) {
                        var elem = '.material-' + id;
                        new PNotify({
                            title: 'Success',
                            text: response.message,
                            type: 'success',
                            hide: true
                        });
                    }
                }
            });
        }
        
        
    });

    // *** Active / Disabled toggler

    $('.toggle-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/toggle/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.material-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

    // *** Confirmation Modals

    $('.duplicate-material').on('click', function(){
        var id = $(this).data('material-id');
        var name = $(this).data('material-name');
        modalConfirm(
            'Duplicate Material',
            'Are you sure you want to duplicate the Material: '+ name +'?',
            id,
            'confirm-yes',
            'confirmation-modal-duplicate-material'
        );
    });

    $('#confirmation-modal-duplicate-material .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material/duplicate/"+id;
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal').modal('hide');
                    window.location.reload(true);
                }
            }
        });
    });

    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm(
            'Remove Material',
            'Are you sure you want to delete the Material?',
            id
        );
    });

    $('.delete-material-option').on('click', function(){
        var id = $(this).data('material-option-id');
        var name = $(this).data('material-option-name');
        modalConfirm(
            'Remove Material Option',
            'Are you sure you want to delete the Material Option: '+ name +'?',
            id,
            'confirm-yes',
            'confirmation-modal-material-option'
        );
    });

    $('.cleanup-material-option').on('click', function(){
        var id = $(this).data('material-option-id');
        var name = $(this).data('material-option-name');
        modalConfirm(
            'Cleanup Material Option',
            'This will reset the applications of : '+ name +'.',
            id,
            'confirm-yes',
            'confirmation-modal-cleanup-material-option'
        );
    });

    $('#confirmation-modal-cleanup-material-option .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material_option/cleanupApp/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal-cleanup-material-option').modal('hide');
                    location.reload();
                    $('.material-option-' + id).fadeOut();
                    $('.material-option-' + id).fadeIn();
                }
            }
        });
    });

    $('.delete-multiple-material-option').on('click', function(){
        var checkedMaterialOptionsIDs = [];
        $('input[type=checkbox]:checked').each(function () {
            if($(this).hasClass("delete-multiple-material-options")){
                checkedMaterialOptionsIDs.push($(this).val());
            }
            
        });
        modalConfirm(
            'Remove Multiple Material Options',
            'Are you sure you want to delete the following Material Options? : '+ checkedMaterialOptionsIDs +'?',
            'confirm-yes',
            'confirmation-modal-multiple-material-option'
        );
    });

    $('#confirmation-modal-multiple-material-option .confirm-yes').on('click', function(){
        var id = $(this).data('checkedMaterialOptionsIDs');
        var url = "//" + api_host + "/api/material_option/deleteMultiple/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal-multiple-material-option').modal('hide');
                    $('.material-option-' + id).fadeOut();
                }
            }
        });
    });

    $('#confirmation-modal-material-option .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material_option/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal-material-option').modal('hide');
                    $('.material-option-' + id).fadeOut();
                }
            }
        });
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal').modal('hide');
                    $('.material-' + id).fadeOut();
                }
            }
        });
    });

    $('#add-material-option-modal .setting-types').on('change', function(){
        var key = $(this).val();
        var items = materialOptionSettings[key];
    });

    $('#edit-material-option-modal .setting-types').on('change', function(){
        var key = $(this).val();
        var items = materialOptionSettings[key];
    });

    function loadItemsToSettingCodes(items, action) {
        if (typeof action == 'undefined') action = 'add';
        $('#' + action + '-material-option-modal .setting-codes').empty(); // clear
        if (items) {
            if (items.length > 0) {
                $.each(items, function(index, item){
                    $('#' + action + '-material-option-modal .setting-codes')
                        .append(
                            $('<option></option>').val(item.code).html(item.value)
                        );
                });
            }
        }
    }

    $('.delete-material-image').on('click', function(){
        var id = $(this).data('material-id');
        var field = $(this).data('field');
        $('#confirmation-modal .confirm-delete-field').data('field', field);
        modalConfirm('Remove pattern', 'Are you sure you want to delete this image?', id, 'confirm-delete-field');
    });

    $('#confirmation-modal .confirm-delete-field').on('click', function(){
        var id = $(this).data('value');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/material/deleteImage/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                }
            }
        });
    });

    // *** Custom Fabric Functions

    function fabricAppRectangle(obj_id, fill, obj_height, obj_width, stroke_width, stroke_color, opacity ){
        var fb_obj = new fabric.Rect({
            id: obj_id,
            fill: fill,
            height: obj_height,
            width: obj_width,
            strokeWidth: stroke_width,
            stroke: stroke_color,
            opacity: opacity,
            originX: 'center',
            originY: 'center'
        });

        return fb_obj;
    }

    function fabricAppID( text, font_family, opacity, font_size ){
        var fb_obj = new fabric.IText(text,{
            fontFamily: font_family,
            originX: 'center',
            originY: 'bottom',
            opacity: opacity,
            fontSize: font_size
        });

        return fb_obj;
    }

    function fabricAppType( text, font_family, opacity, font_size ){
        var fb_obj = new fabric.IText(text,{
            fontFamily: font_family,
            originX: 'center',
            originY: 'top',
            opacity: opacity,
            fontSize: font_size
        });

        return fb_obj;
    }

    function fabricAppGroup( obj_id, obj_left, obj_top, rectangle, app_id, app_type, default_item ){
        var fb_obj = new fabric.Group([ rectangle, app_id, app_type ], {
            id: obj_id,
            left: obj_left,
            top: obj_top,
            default_item: default_item
        });

        return fb_obj;
    }

    // *** Generate rows when appending applications in canvas

    function generateTRow(fields){
        var tr = '<tr class="application-row">';
        fields.forEach(function(entry) {
            tr += '<td>' + entry + '</td>';
        });
        tr += '</tr>';
        return tr;
    }

    // *** Bind Color selects

    function bindColorsSelect2()
    {
        $('.colors').select2({
            placeholder: "Select colors",
            multiple: true,
            allowClear: true
        });
    }

    function bindGradientsSelect2()
    {
        $('.gradients').select2({
            placeholder: "Select gradients",
            multiple: true,
            allowClear: true
        });
    }

    function clearAppPropOptions(){
        $(".apOpt").each(function(i) {
            $(this).remove();
        });
    }

    function checkNameLength(){
        var uniformOptionName = $("#material-option-name").val();
        if(uniformOptionName.length > 2){
            $(".save-changes").prop('disabled',false);
        }else{
            $(".save-changes").prop('disabled',true);
        }
    }

    // *** Renumber rows - Material Options Uploader

    function renumberRows(length){

        var is_blend_arr = [];
        var allow_pattern_arr = [];
        var allow_gradient_arr = [];
        var allow_color_arr = [];

        $(".options-row").each(function(i) {
            var old_length = length;
            var thisLayer = "layer"+length;
            var layer_class = ".mo-layer.layer" + length;

            var settingTypeVal = $(this).find('.mo-setting-type').val();

            if( settingTypeVal == "hightlight" ){
                layer_class = ".mo-layer.layer99";
                length = '99';
            }else if( settingTypeVal == "shadow" ){
                layer_class = ".mo-layer.layer98";
                length = '98';
            }

            materialOptions.front[thisLayer] = {};
            materialOptions.front[thisLayer]['image_file'] = {};
            materialOptions.front[thisLayer]['layer'] = {};
            materialOptions.front[thisLayer]['name'] = {};
            materialOptions.front[thisLayer]['setting_type'] = {};
            materialOptions.front[thisLayer]['team_color_id'] = {};
            materialOptions.front[thisLayer]['group_id'] = {};
            materialOptions.front[thisLayer]['default_color'] = {};
            materialOptions.front[thisLayer]['sublimated_default_color'] = {};
            materialOptions.front[thisLayer]['is_blend'] = {};
            materialOptions.front[thisLayer]['allow_pattern'] = {};
            materialOptions.front[thisLayer]['allow_gradient'] = {};
            materialOptions.front[thisLayer]['allow_color'] = {};

            $(this).find('.mo-layer').removeClass().addClass("mo-layer");
            $(this).find('.mo-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('mo-layer');

            $(this).find('.mo-name').removeClass().addClass("mo-name");
            $(this).find('.mo-name').addClass(thisLayer);
            var name_class = ".mo-name.layer" + length;
            $(this).find(name_class).addClass('mo-name');

            $(this).find('.mo-options-src').removeClass().addClass("mo-options-src");
            $(this).find('.mo-options-src').addClass(thisLayer);
            var src_class = ".mo-options-src.layer" + length;
            $(this).find(src_class).addClass('mo-options-src');

            $(this).find('.mo-setting-type').removeClass().addClass("mo-setting-type");
            $(this).find('.mo-setting-type').addClass(thisLayer);
            var type_class = ".mo-setting-type.layer" + length;
            $(this).find(type_class).addClass('mo-setting-type');

            $(this).find('.mo-default-color').removeClass().addClass("mo-default-color");
            $(this).find('.mo-default-color').addClass(thisLayer);
            var def_color_class = ".mo-default-color.layer" + length;
            $(this).find(def_color_class).addClass('mo-default-color');

            $(this).find('.mo-sublimated-default-color').removeClass().addClass("mo-sublimated-default-color");
            $(this).find('.mo-sublimated-default-color').addClass(thisLayer);
            var sub_def_color_class = ".mo-sublimated-default-color.layer" + length;
            $(this).find(sub_def_color_class).addClass('mo-sublimated-default-color');



            // ARRAYS ******************************

            $(this).find('.mo-blend').removeClass().addClass("mo-blend");
            $(this).find('.mo-blend').addClass(thisLayer);
            var mo_blend_class = ".mo-blend.layer" + length;
            $(this).find(mo_blend_class).addClass('mo-blend');

            $(this).find('.mo-allow-pattern').removeClass().addClass("mo-allow-pattern");
            $(this).find('.mo-allow-pattern').addClass(thisLayer);
            var mo_allow_pattern_class = ".mo-allow-pattern.layer" + length;
            $(this).find(mo_allow_pattern_class).addClass('mo-allow-pattern');

            $(this).find('.mo-allow-gradient').removeClass().addClass("mo-allow-gradient");
            $(this).find('.mo-allow-gradient').addClass(thisLayer);
            var mo_allow_gradient_class = ".mo-allow-gradient.layer" + length;
            $(this).find(mo_allow_gradient_class).addClass('mo-allow-gradient');

            $(this).find('.mo-allow-color').removeClass().addClass("mo-allow-color");
            $(this).find('.mo-allow-color').addClass(thisLayer);
            var mo_allow_color_class = ".mo-allow-color.layer" + length;
            $(this).find(mo_allow_color_class).addClass('mo-allow-color');

            // END ARRAYS



            $(this).find('.mo-team-color-id').removeClass().addClass("mo-team-color-id");
            $(this).find('.mo-team-color-id').addClass(thisLayer);
            var team_color_id_class = ".mo-team-color-id.layer" + length;
            $(this).find(team_color_id_class).addClass('mo-team-color-id');

            $(this).find('.mo-group-id').removeClass().addClass("mo-group-id");
            $(this).find('.mo-group-id').addClass(thisLayer);
            var group_id_class = ".mo-group-id.layer" + length;
            $(this).find(group_id_class).addClass('mo-group-id');

            materialOptions.front[thisLayer]['name'] = $(this).find(name_class).val();
            materialOptions.front[thisLayer]['layer'] = $(this).find(layer_class).val();
            materialOptions.front[thisLayer]['image_file'] = $(this).find(src_class).val();
            materialOptions.front[thisLayer]['setting_type'] = $(this).find(type_class).val();
            materialOptions.front[thisLayer]['team_color_id'] = $(this).find(team_color_id_class).val();
            materialOptions.front[thisLayer]['group_id'] = $(this).find(group_id_class).val();
            materialOptions.front[thisLayer]['default_color'] = $(this).find(def_color_class).val();
            materialOptions.front[thisLayer]['sublimated_default_color'] = $(this).find(sub_def_color_class).val();

            if($(mo_blend_class).is(':checked')){
                materialOptions.front[thisLayer]['is_blend'] = "1";
            }else{
                materialOptions.front[thisLayer]['is_blend'] = "0";
            }

            if($(mo_allow_pattern_class).is(':checked')){
                materialOptions.front[thisLayer]['allow_pattern'] = "1";
            }else{
                materialOptions.front[thisLayer]['allow_pattern'] = "0";
            }


            if($(mo_allow_gradient_class).is(':checked')){
                materialOptions.front[thisLayer]['allow_gradient'] = "1";
            }else{
                materialOptions.front[thisLayer]['allow_gradient'] = "0";
            }


            if($(mo_allow_color_class).is(':checked')){
                materialOptions.front[thisLayer]['allow_color'] = "1";
            }else{
                materialOptions.front[thisLayer]['allow_color'] = "0";
            }


            is_blend_arr.push(materialOptions.front[thisLayer]['is_blend']);
            $('#is-blend-array').val(is_blend_arr);

            allow_pattern_arr.push(materialOptions.front[thisLayer]['allow_pattern']);
            $('#allow-pattern-array').val(allow_pattern_arr);

            allow_gradient_arr.push(materialOptions.front[thisLayer]['allow_gradient']);
            $('#allow-gradient-array').val(allow_gradient_arr);

            allow_color_arr.push(materialOptions.front[thisLayer]['allow_color']);
            $('#allow-color-array').val(allow_color_arr);

            length = old_length;
            length--;
        });
        var moProperties = JSON.stringify(materialOptions);
        console.log("MOS: "+moProperties);
    }

    // *** Update Coordinates if Canvas is Updated
    function updateCoordinatesXYR() {
        var cs = 1;
        updateCoordinates(cs);
    }

    function updateCoordinates(cs) {

        applicationProperties = {}

        circle.radius = box.height / 2;

        var topLeftX = bounding_box.oCoords.tl.x;
        var topLeftY = bounding_box.oCoords.tl.y;
        var topRightX = bounding_box.oCoords.tr.x;
        var topRightY = bounding_box.oCoords.tr.y;
        var bottomLeftX = bounding_box.oCoords.bl.x;
        var bottomLeftY = bounding_box.oCoords.bl.y;
        var bottomRightX = bounding_box.oCoords.br.x;
        var bottomRightY = bounding_box.oCoords.br.y;

        canvas.renderAll();

        data.topLeft.x = topLeftX;
        data.topLeft.y = topLeftY;
        data.topRight.x = topRightX;
        data.topRight.y = topRightY;
        data.bottomLeft.x = bottomLeftX;
        data.bottomLeft.y = bottomLeftY;
        data.bottomRight.x = bottomRightX;
        data.bottomRight.y = bottomRightY;
        data.boxWidth = bounding_box.getWidth();
        data.boxHeight = bounding_box.getHeight();
        data.pivot = bounding_box.getCenterPoint();
        data.rotation = bounding_box.getAngle();

        var boundaryProperties = JSON.stringify(data);
        boundaryProperties = "\""+boundaryProperties+"\"";
        $('.b-prop').prop('value', boundaryProperties);

        $(".app-rotation").each(function(i) {
            // BUILD APPLICATION PROPERTIES JSON

            itemIdx = "layer"+$(this).data('id');
            layer = $(this).data('id');

            thisGroup = canvasFront.item(layer);
            applicationType = $(this).parent().siblings('td').find("select[class=app-def-item]").val();
            applicationName = $(this).parent().siblings('td').find("input[class=app-def-name]").val();
            applicationId = $(this).parent().siblings('td').find("input[name=application_id]").val();

            isPrimary = $(this).parent().siblings('td').find("input[class=app-primary]");
            hasLogo = $(this).parent().siblings('td').find("input[class=app-logo]");
            hasTeamName = $(this).parent().siblings('td').find("input[class=app-team-name]");
            hasPlayerName = $(this).parent().siblings('td').find("input[class=app-player-name]");
            hasNumber = $(this).parent().siblings('td').find("input[class=app-number]");
            fontSizes = $(this).parent().siblings('td').find("input[class=app-font-sizes]").val();
            uniformSizes = $(this).parent().siblings('td').find("input[class=app-uniform-sizes]").val();

            applicationMascot = $(this).parent().siblings('td').find(".dd-selected-value").val();
            applicationFont = $(this).parent().siblings('td').find(".dd-selected-value").val();
            applicationText = $(this).parent().siblings('td').find(".dd-selected-value").val();
            applicationNumber = $(this).parent().siblings('td').find(".dd-selected-value").val();
            // console.log("Default Mascot:"+applicationMascot);
            if(isPrimary.prop( "checked" )){
                isPrimary = 1;
            } else {
                isPrimary = 0;
            }

            if(hasLogo.prop( "checked" )){
                hasLogo = 1;
            } else {
                hasLogo = 0;
            }

            if(hasTeamName.prop( "checked" )){
                hasTeamName = 1;
            } else {
                hasTeamName = 0;
            }

            if(hasPlayerName.prop( "checked" )){
                hasPlayerName = 1;
            } else {
                hasPlayerName = 0;
            }

            if(hasNumber.prop( "checked" )){
                hasNumber = 1;
            } else {
                hasNumber = 0;
            }

            var topLeftX = thisGroup.oCoords.tl.x;
            var topLeftY = thisGroup.oCoords.tl.y;
            var topRightX = thisGroup.oCoords.tr.x;
            var topRightY = thisGroup.oCoords.tr.y;
            var bottomLeftX = thisGroup.oCoords.bl.x;
            var bottomLeftY = thisGroup.oCoords.bl.y;
            var bottomRightX = thisGroup.oCoords.br.x;
            var bottomRightY = thisGroup.oCoords.br.y;

            canvas.renderAll();

            applicationProperties[itemIdx] = {};
            applicationProperties[itemIdx]['type'] = {};
            applicationProperties[itemIdx]['name'] = {};
            applicationProperties[itemIdx]['id'] = {};
            applicationProperties[itemIdx]['layerOrder'] = {};
            applicationProperties[itemIdx]['topLeft'] = {};
            applicationProperties[itemIdx]['topLeft']['x'] = {};
            applicationProperties[itemIdx]['topLeft']['y'] = {};
            applicationProperties[itemIdx]['topRight'] = {};
            applicationProperties[itemIdx]['topRight']['x'] = {};
            applicationProperties[itemIdx]['topRight']['y'] = {};
            applicationProperties[itemIdx]['bottomLeft'] = {};
            applicationProperties[itemIdx]['bottomLeft']['x'] = {};
            applicationProperties[itemIdx]['bottomLeft']['y'] = {};
            applicationProperties[itemIdx]['bottomRight'] = {};
            applicationProperties[itemIdx]['bottomRight']['x'] = {};
            applicationProperties[itemIdx]['bottomRight']['y'] = {};
            applicationProperties[itemIdx]['isPrimary'] = {};
            applicationProperties[itemIdx]['hasLogo'] = {};
            applicationProperties[itemIdx]['hasTeamName'] = {};
            applicationProperties[itemIdx]['hasPlayerName'] = {};
            applicationProperties[itemIdx]['hasNumber'] = {};
            applicationProperties[itemIdx]['fontSizes'] = {};
            applicationProperties[itemIdx]['uniformSizes'] = {};

            applicationProperties[itemIdx]['defaultMascot'] = {};

            applicationProperties[itemIdx].type = applicationType;
            applicationProperties[itemIdx].name = applicationName;
            applicationProperties[itemIdx].id = applicationId;
            applicationProperties[itemIdx].layerOrder = applicationId;
            applicationProperties[itemIdx].topLeft.x = topLeftX;
            applicationProperties[itemIdx].topLeft.y = topLeftY;
            applicationProperties[itemIdx].topRight.x = topRightX;
            applicationProperties[itemIdx].topRight.y = topRightY;
            applicationProperties[itemIdx].bottomLeft.x = bottomLeftX;
            applicationProperties[itemIdx].bottomLeft.y = bottomLeftY;
            applicationProperties[itemIdx].bottomRight.x = bottomRightX;
            applicationProperties[itemIdx].bottomRight.y = bottomRightY;
            applicationProperties[itemIdx].isPrimary = isPrimary;
            applicationProperties[itemIdx].hasLogo = hasLogo;
            applicationProperties[itemIdx].hasTeamName = hasTeamName;
            applicationProperties[itemIdx].hasPlayerName = hasPlayerName;
            applicationProperties[itemIdx].hasNumber = hasNumber;
            applicationProperties[itemIdx].fontSizes = fontSizes;
            applicationProperties[itemIdx].uniformSizes = uniformSizes;

            applicationProperties[itemIdx].defaultMascot = applicationMascot;

            // SAVE PERCENTAGES TO ADAPT ON DIFFERENT VIEWPORT SIZES

            applicationProperties[itemIdx].topLeft.xp = (topLeftX / canvasFront.width) * 100;
            applicationProperties[itemIdx].topLeft.yp = (topLeftY / canvasFront.height) * 100;
            applicationProperties[itemIdx].topRight.xp = (topRightX / canvasFront.width) * 100;
            applicationProperties[itemIdx].topRight.yp = (topRightY / canvasFront.height) * 100;
            applicationProperties[itemIdx].bottomLeft.xp = (bottomLeftX / canvasFront.width) * 100;
            applicationProperties[itemIdx].bottomLeft.yp = (bottomLeftY / canvasFront.height) * 100;
            applicationProperties[itemIdx].bottomRight.xp = (bottomRightX / canvasFront.width) * 100;
            applicationProperties[itemIdx].bottomRight.yp = (bottomRightY / canvasFront.height) * 100;

            applicationProperties[itemIdx].width = thisGroup.getWidth();
            applicationProperties[itemIdx].height = thisGroup.getHeight();
            applicationProperties[itemIdx].widthp = (thisGroup.getWidth() / canvasFront.width) * 100;;
            applicationProperties[itemIdx].heightp = (thisGroup.getHeight() / canvasFront.height) * 100;;
            // thisGroup.left 
            applicationProperties[itemIdx].pivot = thisGroup.getCenterPoint();
            applicationProperties[itemIdx].rotation = thisGroup.getAngle();

            if(cs == 1){
                $(this).parent().siblings('td').find("input[class=app-x]").val(applicationProperties[itemIdx].pivot.x);
                $(this).parent().siblings('td').find("input[class=app-y]").val(applicationProperties[itemIdx].pivot.y);
                $(this).val(thisGroup.getAngle());
            }

            canvasFront.renderAll();
        });
        var appProperties = JSON.stringify(applicationProperties);
        appProperties = "\""+appProperties+"\"";
        $('.a-prop').prop('value', appProperties);
        window.ap = appProperties;

        // console.log("APP PROPS: "+window.ap);
    }

    // UPDATES - DETECTOR

    $(".mo-setting-type").change(function() {
        var elem = $(this).parent().siblings().find('.mo-name');
        var type = $(this).val();
        var sub_def_color_class = ".mo-sublimated-default-color.layer" + length;

        if(type == "highlights" || type == "shadows"){
            type = type.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            type = type.slice(0,-1)
            elem.val(type);
            syncMOLayers();
        }
    });

    $(".mo-name").keyup(function() {
        var elem = $(this).parent().siblings().find('.mo-layer');
        var name = $(this).val().toLowerCase();
        // if(name == "body"){
        //     console.log('MATCH');
        //     $(this).val("Body");
        //     $(elem).append( "<option value=\"-1\" selected class=\"body-layer-number\">-1</option>");
        // }
        // else{
        //     $(".body-layer-number").remove();
        // }
    });

    // CHANGES BACKGROUNDS OF CANVASES

    $("#file-src").change(function() {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;
 
        if (/^image/.test(files[0].type)){
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
 
            reader.onloadend = function() {
                $("#shape-view-top").css("background-image", "url("+this.result+")");
                $("#material-option-bounding-box-top").css("background-image", "url("+this.result+")");
            }
        }
    });

    $(".shape-view").change(function() {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;

        var perspective = $(this).data('perspective');

        if (/^image/.test(files[0].type)){
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
 
            reader.onloadend = function() {

                if(perspective == 'front') {
                    $("#front-shape-view").css("background-image", "url("+this.result+")");
                } else if(perspective == 'back') {
                    $("#back-shape-view").css("background-image", "url("+this.result+")");
                } else if(perspective == 'left') {
                    $("#left-shape-view").css("background-image", "url("+this.result+")");
                } else if(perspective == 'right') {
                    $("#right-shape-view").css("background-image", "url("+this.result+")");
                }

            }
        }
    });

    $(".mo-options-src").change(function() {

        var elem = $(this).parent().siblings().find('.thumbnail-link');
        var elem2 = $(this).parent().siblings().find('.thumb-container');

        var filename = $(this).val();
        filename = filename.split("\\");
        filename = filename[2].split(".");
        var filenamex = filename[0].replace("_", " ");
        filename = filenamex.replace(/[0-9]/g, '');
        filename = filename.replace("_", " ");
        filename = filename.replace("_", " ");

        if( filename.charAt(0) == ' ' ){
            filename = filename.substr(1);
        }

        console.log('FILENAME: '+filename);

        $(this).parent().siblings().find('.mo-name').val(filename);

        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;

        if (/^image/.test(files[0].type)){
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);

            reader.onloadend = function() {
                elem.data('img',this.result);
                elem2.attr('src',this.result);
                elem2.data('img',this.result);
            }
        }
    });

    // *** Fabric Listeners

    fabric.util.addListener(document.getElementById('move-top'), 'mouseenter', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            topInterval = setInterval(function() {
               activeObject.top -= 1;
               canvasFront.renderAll();
               updateCoordinatesXYR();  
            }, 100);
        }

    });

    fabric.util.addListener(document.getElementById('move-top'), 'mouseleave', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            clearInterval(topInterval);
        }
        updateCoordinatesXYR();

    });

    fabric.util.addListener(document.getElementById('move-bottom'), 'mouseenter', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            bottomInterval = setInterval(function() {
               activeObject.top += 1;
               canvasFront.renderAll();
               updateCoordinatesXYR();
            }, 100);
        }

    });

    fabric.util.addListener(document.getElementById('move-bottom'), 'mouseleave', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            clearInterval(bottomInterval);
        }
        updateCoordinatesXYR();

    });

    fabric.util.addListener(document.getElementById('move-left'), 'mouseenter', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            leftInterval = setInterval(function() {
               activeObject.left -= 1;
               canvasFront.renderAll();
               updateCoordinatesXYR();   
            }, 100);
        }

    });

    fabric.util.addListener(document.getElementById('move-left'), 'mouseleave', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            clearInterval(leftInterval);
        }
        updateCoordinatesXYR();

    });

    fabric.util.addListener(document.getElementById('move-right'), 'mouseenter', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            rightInterval = setInterval(function() {
               activeObject.left += 1;
               canvasFront.renderAll();
               updateCoordinatesXYR();  
            }, 100);
        }

    });

    fabric.util.addListener(document.getElementById('move-right'), 'mouseleave', function () {

        activeObject = canvasFront.getActiveObject();
        if(activeObject){
            clearInterval(rightInterval);
        }
        updateCoordinatesXYR();

    });

    // *** END OF Fabric Listeners

    bindColorsSelect2();
    bindGradientsSelect2();
});