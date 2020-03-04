$(document).ready(function() {
    $('.slide-zoomout').animate({
        'zoom': 0.45
    }, 400);

    var material = {};
    var materialOptions = {};
    materialOptions['front'] = {};
    materialOptions['back'] = {};
    materialOptions['left'] = {};
    materialOptions['right'] = {};

    var canvasFront = this.__canvas = new fabric.Canvas('applications-front-canvas');

    canvasFront.customiseControls({
        tl: {
            action: 'rotate',
            cursor: 'http://findicons.com/files/icons/2625/google_plus_interface_icons/128/rotate.png'
        },
        mr: {
            action: function(e, target) {
                target.set({
                    left: 200
                });
                canvas.renderAll();
            }
        }
    });

    canvasFront.setWidth(496);
    canvasFront.setHeight(550);
    var IN = 20;
    fabric.Object.prototype.transparentCorners = false;
    window.current_pattern_properties;
    window.app_current_pattern_properties = {};

    var topInterval; // Intervals for moving the applications
    var bottomInterval;
    var leftInterval;
    var rightInterval;
    var polyData;
    var appPropJson = "";
    var applicationProperties = {};

    window.colors = null;
    window.fonts = null;
    window.mascots = null;
    window.patterns = null;

    var temp_category= $('#material_uniform_category').val();
    var temp_brand  = $('#material_brand').val();

    var lineIdx = 0;
    var loadCase = 0;
    var coords = [];

    getFonts(function(fonts) {
        window.fonts = fonts;
    });

    getColors(temp_brand, function(colors){ window.colors = colors; });
    // getFonts(temp_category, temp_brand, function(fonts){ window.fonts = fonts; });
    getMascots(function(mascots){ window.mascots = mascots; });
    getPatterns(temp_brand, function(patterns){ window.patterns = patterns; });
    getAccents(function(accents){ window.accents = accents; });
    getTailsweeps(function(tailsweeps){ window.tailsweeps = tailsweeps; });
    getFabrics(function(fabrics){ window.fabrics = fabrics; });

    var accentObject= [];

    jQuery.each(accents, function(index, item) {
        var layers = (item.accent_properties).slice(1, -1);
        layers =jQuery.parseJSON(layers);

        accent = {
            "name" : item.name,
            "id": item.secondary_id,
            "layers": layers.length,
            "thumbnail" : item.thumbnail_path,
        }

        accentObject.push(accent);
    });

    window.accents = accentObject;

    var colors_dropdown = generateColorsDropdown();

    function generateColorsDropdown(color_code) {
        var colors_dropdown = '';

        $.each(window.colors, function( key, value ) {
            var c_hex_code = value.brand_id == 5 ? value.web_hex_code : value.hex_code;
            var c_name = value.brand_id == 5 ? value.color_alias : value.name;
            var is_selected = color_code === value.color_code ? "selected" : "";
            colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + c_hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + c_hex_code + '" ' + is_selected + '>' + c_name + '</option>';
        });

        return colors_dropdown;
    }



    function generateTeamColorsIDDropdown(id) {
        var team_colors_id_dropdown = '<option value="">None</option>';
        var ctr = 1;

        while( ctr <= 10 ){
            if( ctr == id){
                team_colors_id_dropdown += '<option value="' + ctr + '" selected>' + ctr + '</option>';
            } else {
                team_colors_id_dropdown += '<option value="' + ctr + '">' + ctr + '</option>';
            }
            ctr++;
        }

        return team_colors_id_dropdown;
    }

    $("#default_pattern").change(function() {
        $('#pattern_layers_OC').html('');
        var id = $(this).val();
        loadPatternLayers(id);
    });

    function refreshTID(){
        $(".layer-team-color-id").change(function() {
            var x = 1;
            $(".layer-team-color-id").each(function(i) {
                window.current_pattern_properties[x].team_color_id = $(this).val();
                x++;
            });
            $('#pattern_properties').val( '"' + JSON.stringify(window.current_pattern_properties) + '"' );
        });
    }

    function refreshColors(){
        $(".layer-default-color").change(function() {
            var x = 1;
            $(".layer-default-color").each(function(i) {
                window.current_pattern_properties[x].default_color = $(this).val();
                x++;
            });
            $('#pattern_properties').val( '"' + JSON.stringify(window.current_pattern_properties) + '"' );
        });
    }

    function refreshColorBG(){
        $('.layer-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
            $(this).css('color', '#fff');
            $(this).css('text-shadow', '1px 1px #000');
        });
    }

    function loadPatternLayers(id, loaded_pattern){
        var tcids = '<option value="">None</option>';

        if(loaded_pattern == 1){
            var pval = $('#pattern_properties').val();
            var xstring = "";

            if( pval.charAt(pval.length - 1) === '"' ){
                xstring = pval.substring(0, pval.length - 1);
            } else {
                xstring = pval;
            }

            if( xstring.charAt(0) === '"' ){
                xstring = xstring.substring(1, xstring.length);
            }

            if( xstring.charAt(xstring.length - 1) === '"' ){
                xstring = xstring.substring(0, xstring.length - 1);
            }

            if( xstring.charAt(0) === '"' ){
                xstring = xstring.substring(1, xstring.length);
            }

            var pattern_props = JSON.parse( xstring );

            window.current_pattern_properties = pattern_props;
            var x = 1;

            $.each(pattern_props, function(i, item) {
                var colors = generateColorsDropdown(item.default_color);
                var label = '<b>Layer #<b>' + x;
                var select = ' <select class="layer-default-color layer' + x + '">' + colors + '</select>';
                var tcids = generateTeamColorsIDDropdown(item.team_color_id);
                var tcid = '<select class="layer-team-color-id layer' + x + '">' + tcids + '</select>';
                var preview = '<div style="border: 1px solid black; background-color: red;"><img src = "' + item.file_path + '" style="width: 150px"></div>';
                $('#pattern_layers_OC').append( label + select + tcid + preview + '<hr>' );
                refreshColors();
                refreshTID();
                refreshColorBG();
                x++;
            });
        } else {
            $.each(window.patterns, function(i, item) {
                if( item.id == id ){
                    var pattern_props = JSON.parse( item.pattern_properties );
                    window.current_pattern_properties = pattern_props;
                    var x = 1;

                    $.each(pattern_props, function(i, item) {
                        var colors = generateColorsDropdown(item.default_color);
                        var tcid = generateTeamColorsIDDropdown(item.team_color_id);
                        var label = '<b>Layer #</b>' + x;
                        var select = ' <select class="layer-default-color layer' + x + '">' + colors + '</select>';
                        var tcids = generateTeamColorsIDDropdown(item.team_color_id);
                        var tcid = '<select class="layer-team-color-id layer' + x + '">' + tcids + '</select>';
                        var preview = '<div style="border: 1px solid black; background-color: red;"><img src = "' + item.file_path + '" style="width: 150px"></div>';
                        $('#pattern_layers_OC').append( label + select + tcid + preview + '<hr>' );
                        refreshColors();
                        refreshTID();
                        refreshColorBG();
                        x++;
                    });
                }
            });
        }
        $('#pattern_properties').val( '"' + JSON.stringify(window.current_pattern_properties) + '"' );
    }

    $(document).on('change', '.app-pattern-properties', function() {
        var id = $(this).parent().find('.app-def-pattern').val();
        var props = $(this).val();
        var pattern_loaded = 0;

        //set blank pattern for existing applications
        if (props == undefined || props == 'undefined' || props == "" || props == null) {
            if (temp_brand == 'prolook') {
                $(this).parent().find('.app-def-pattern').val(33);
                id = 33;
            } else if (temp_brand == 'richardson') {
                $(this).parent().find('.app-def-pattern').val(318);
                id = 318;
            } else if (temp_brand == 'richardson') {
                $(this).parent().find('.app-def-pattern').val(496);
                id = 496;
            }
        }
        else {
            pattern_loaded = 1;
        }

        loadAppPatternLayers($(this), id, pattern_loaded);
    });

    $(document).on('change', '.app-def-pattern', function() {
        $(this).parent().find('.app_pattern_layers_OC').html('');
        var props = $(this).parent().find('.app-pattern-properties').val();
        var id = $(this).val();
        var pattern_loaded = 0;
        loadAppPatternLayers($(this), id, pattern_loaded);
    });

    function appRefreshTID(){
        $(".app-layer-team-color-id").change(function() {
            window.app_current_pattern_properties =  JSON.parse($(this).parent().parent().find('.app-pattern-properties').val());
            var layer = _.size(window.app_current_pattern_properties);
            for (x = 1; x <= layer; x++) {
                window.app_current_pattern_properties[x].team_color_id = $(this).parent().find(".app-layer-team-color-id.layer"+x).val();
            }
            $(this).parent().parent().find('.app-pattern-properties').val(JSON.stringify(window.app_current_pattern_properties));
        });
    }

    function appRefreshColors(){
        $(".app-layer-default-color").change(function() {
            var x = 1;
            window.app_current_pattern_properties =  JSON.parse($(this).parent().parent().find('.app-pattern-properties').val());
            var layer = _.size(window.app_current_pattern_properties);
            for (x = 1; x <= layer; x++) {
                window.app_current_pattern_properties[x].default_color = $(this).parent().find(".app-layer-default-color.layer"+x).val();
            }
            $(this).parent().parent().find('.app-pattern-properties').val(JSON.stringify(window.app_current_pattern_properties));
        });
    }

    function appRefreshColorBG(){
        $('.app-layer-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
            $(this).css('color', '#fff');
            $(this).css('text-shadow', '1px 1px #000');
        });
    }

    function loadAppPatternLayers(thisObj, id, loaded_pattern){
        var tcids = '<option value="">None</option>';

        if(loaded_pattern == 1){
            var pval = thisObj.parent().find('.app-pattern-properties').val();

            var xstring = "";
            if( pval.charAt(pval.length - 1) === '"' ){
                xstring = pval.substring(0, pval.length - 1);
            } else {
                xstring = pval;
            }

            if( xstring.charAt(0) === '"' ){
                xstring = xstring.substring(1, xstring.length);
            }

            if( xstring.charAt(xstring.length - 1) === '"' ){
                xstring = xstring.substring(0, xstring.length - 1);
            }

            if( xstring.charAt(0) === '"' ){
                xstring = xstring.substring(1, xstring.length);
            }

            var app_pattern_props = JSON.parse( xstring );
            window.app_current_pattern_properties = app_pattern_props;
            var x = 1;

            $.each(app_pattern_props, function(i, item) {
                var colors = generateColorsDropdown(item.default_color);
                var label = '<b>Layer #</b>' + x;
                var select = ' <select class="app-layer-default-color layer' + x + '">' + colors + '</select>';
                var tcids = generateTeamColorsIDDropdown(item.team_color_id);
                var tcid = '<select class="app-layer-team-color-id layer' + x + '">' + tcids + '</select>';
                thisObj.parent().find('.app_pattern_layers_OC').append( label + select + tcid + '<hr>' );
                appRefreshColors();
                appRefreshTID();
                appRefreshColorBG();
                x++;
            });
        } else {
            $.each(window.patterns, function(i, item) {
                if( item.id == id ){
                    var app_pattern_props = JSON.parse( item.pattern_properties );
                    window.app_current_pattern_properties = app_pattern_props;
                    var x = 1;
                    $.each(app_pattern_props, function(i, item) {
                        var colors = generateColorsDropdown(item.default_color);
                        var tcid = generateTeamColorsIDDropdown(item.team_color_id);
                        var label = '<b>Layer #</b>' + x;
                        var select = ' <select class="app-layer-default-color layer' + x + '">' + colors + '</select>';
                        var tcids = generateTeamColorsIDDropdown(item.team_color_id);
                        var tcid = '<select class="app-layer-team-color-id layer' + x + '">' + tcids + '</select>';
                        thisObj.parent().find('.app_pattern_layers_OC').append( label + select + tcid + '<hr>' );
                        appRefreshColors();
                        appRefreshTID();
                        appRefreshColorBG();
                        x++;
                    });
                }
            });
        }
        thisObj.parent().find('.app-pattern-properties').val(JSON.stringify(window.app_current_pattern_properties));
    }

    $('.confirm_no').on('click', function(){
        window.location.reload(true);
    });

    $('.add-point').on('click', function(){
        var pointsCount = canvas.getObjects('circle').length;
        var linesCount = canvas.getObjects('line').length;
        var l = linesCount - 1;
        var lines = canvas.getObjects('line');
        var circles = canvas.getObjects('circle');
        var itemsCount = canvas.getObjects().length;
        var y = pointsCount - 1;

        if( pointsCount < 50 ){
            var z = pointsCount + 1;
            var j = pointsCount - 1;

            lines.forEach(function(entry) {
                if( entry.id == l ){
                    entry.remove();
                    var a = Math.floor((Math.random() * 5) + 1);
                    var b = Math.floor((Math.random() * 5) + 1);
                    if( loadCase == 0 ){
                        window['a'+z] = addPoint('a'+z, a * IN, b * IN, 'knot');
                        addLine(window['a'+pointsCount], window['a'+z], lineIdx);
                        lineIdx++;
                        addLine(window['a'+z], window['a1'], lineIdx);
                    } else {
                        window['a'+pointsCount] = addPoint('a'+pointsCount, a * IN, b * IN, 'knot');
                        addLine(window['a'+j], window['a'+pointsCount], lineIdx);
                        lineIdx++;
                        addLine(window['a'+pointsCount], window['a0'], lineIdx);
                    }

                    canvas.renderAll();
                }
            });
        }
        bringingPointToFront();
    });

    $('#material-option-bounding-box-top').on('dblclick', function(e){
        var pointsCount = canvas.getObjects('circle').length;
        var linesCount = canvas.getObjects('line').length;
        var l = linesCount - 1;
        var lines = canvas.getObjects('line');
        var circles = canvas.getObjects('circle');
        var itemsCount = canvas.getObjects().length;
        var y = pointsCount - 1;
        var posX = $(this).offset().left;
        var posY = $(this).offset().top;

        if( pointsCount < 50 ){
            var z = pointsCount + 1;
            var j = pointsCount - 1;

            lines.forEach(function(entry) {
                if( entry.id == l ){
                    entry.remove();
                    var a = (e.pageX - posX)/20;
                    var b = (e.pageY - posY)/20;
                    if( loadCase == 0 ){
                        window['a'+z] = addPoint('a'+z, a * IN, b * IN, 'knot');
                        addLine(window['a'+pointsCount], window['a'+z], lineIdx);
                        lineIdx++;
                        addLine(window['a'+z], window['a1'], lineIdx);
                    } else {
                        window['a'+pointsCount] = addPoint('a'+pointsCount, a * IN, b * IN, 'knot');
                        addLine(window['a'+j], window['a'+pointsCount], lineIdx);
                        lineIdx++;
                        addLine(window['a'+pointsCount], window['a0'], lineIdx);
                    }

                    canvas.renderAll();
                }
            });
        }
        bringingPointToFront();
        updateCoordinates();
    });


    $(document).on('click', '.update-applications-json', function() {
        updateApplicationsJSON();
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
                $(this).find(".mo-layer").val(length);
                var type = $(this).find(".mo-setting-type").val();
                if(type == "highlights"){
                    $(this).find(".mo-layer").val('99');
                }
                if(type == "shadows"){
                    $(this).find(".mo-layer").val('98');
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
            if(0<i){
                $(this).find(".remove-row").show();

            }else{
                 $(this).find(".remove-row").hide();
            }

            $(this).find(".mo-layer").val(length);
            var type = $(this).find(".mo-setting-type").val();
            if(type == "highlights"){
                $(this).find(".mo-layer").val('99');
            }
            if(type == "shadows"){
                $(this).find(".mo-layer").val('98');
            }
            length = length-1;
        });
        var newLength = $('.options-row').length;
        renumberRows(newLength);
    }

    $("#material-option-name").keyup(function() {
        checkNameLength();
    });

    $(document).on('keyup', '#pattern_angle', function() {
        var groups = canvas.getObjects('group');
        groups[0].setAngle($(this).val());
        canvas.renderAll();
        updateCoordinates();
    });




    $(document).on('change', '.app-default-font', function() {
        var font = $('option:selected', this).data('font-family');
        var font_size = 30;
        $(this).css('font-family', font);
        $(this).css('font-size', font_size);

        $(this).parent().siblings('td').find("input[class=app-def-name]").css('font-family', font);
        $(this).parent().siblings('td').find("input[class=app-def-name]").css('font-size', font_size);

        $(this).parent().siblings('td').find("input[class=app-default-text]").css('font-family', font);
        $(this).parent().siblings('td').find("input[class=app-default-text]").css('font-size', font_size);

        $(this).parent().siblings('td').find("input[class=app-default-number]").css('font-family', font);
        $(this).parent().siblings('td').find("input[class=app-default-number]").css('font-size', font_size);
    });

    $('a[data-toggle=popover],img[data-toggle=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'top',
        content: function(){
            return '<img src="'+$(this).data('img') + '" style="width: 200px; height: 200px; background-color: #525252;"/>';
        }
    });

    $('.app-rotation-flip').on('click', function(){
        var id = $(this).data('id');
        flipApplication(id);
    });

    function dynamicSort(property)
    {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a,b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }

    $('#add_front_application').mousedown(function() {
        $('.app-default-mascot').ddslick('destroy');

        var default_item = $('#front-default-item').val();
        var default_name_raw = $('#application_name').val();
        var default_name = default_name_raw.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"");

        var fill = '#e3e3e3';
        var height = 25;
        var width = 25;
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
        group.lockUniScaling = true;
        group.lockScalingX = true;
        group.lockScalingY = true;
        group.customiseCornerIcons({
            settings: {
                borderColor: 'blue',
                cornerSize: 15,
                cornerShape: 'rect',
                cornerBackgroundColor: 'blue'
            },
            tl: {
                // icon: 'http://52.39.10.209/rotate.svg'
            }
        });
        group.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            tr: false,
            // tl: false,
            br: false,
            bl: false
        });
        group.hasRotatingPoint = false;
        canvasFront.add(group);

        var fonts_options = '<option value="">Not Set</option>';
        var app_material_brand = $('#app-material-brand').val();

        for (var i = 0; i < window.fonts.length; i++) {
            if (window.fonts[i].active == 1) {
                fonts_options += "<option value=" + window.fonts[i].id + " data-sport = '" + window.fonts[i].sports + "' style='font-family: " + window.fonts[i].name + "; font-size: 30px;' data-font-family='" + window.fonts[i].name + "'>" + window.fonts[i].name + "</option>";
            }
        }

        var def_patterns_options = '';
        var current_sport = $('#material_uniform_category').val();
        var current_asset_target = $('#material_asset_target').val();
        var alter_sport_name = temp_brand == "Riddell" ? "RDL "+current_sport : current_sport;
        var input_patterns = _.filter(window.patterns, function(pattern) {
            var sport = JSON.parse(pattern.sports);
            var asset_target = pattern.asset_target;
            var sportOk = _.contains(sport, alter_sport_name);
            return sportOk;
        });


        // sort input patterns by name in ascending order
        input_patterns.sort(dynamicSort('name'));

        $.each(input_patterns, function (i, item) {
            if (item.id == 33 && temp_brand == 'prolook') {
                def_patterns_options += '<option value="' + item.id + '" data-asset-target="'+ item.asset_target +'" selected>' + item.name + '</option>';
            } else if (item.id == 318 && temp_brand == 'richardson') {
                def_patterns_options += '<option value="' + item.id + '" data-asset-target="'+ item.asset_target +'" selected>' + item.name + '</option>';
            } else if (item.id == 496 && (temp_brand == 'Riddell' || temp_brand == 'riddell')) {
                def_patterns_options += '<option value="' + item.id + '" data-asset-target="'+ item.asset_target +'" selected>' + item.name + '</option>';
            } else {
                def_patterns_options += '<option value="' + item.id + '" data-asset-target="'+ item.asset_target +'">' + item.name + '</option>';
            }
        });

        var blank_pattern = '{"1":{"default_color":"W","file_path":"https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Blank/174d8840919615bfd3255478.png","layer":"1","team_color_id":"1"}}';

        var font_label              = '<label class="control-label label-default" style="float: left; padding: 5px; border-radius: 3px; margin-top: 5px;">Font:</label>';
        var default_text_label      = '<label class="control-label label-default" style="float: left; padding: 5px; border-radius: 3px; margin-top: 5px;">Text:</label>';
        var default_number_label    = '<label class="control-label label-default" style="float: left; padding: 5px; border-radius: 3px; margin-top: 5px;">Number:</label>';
        var text                    = $(this).val();
        var style                   = 'margin-right: 5px';
        var items_arr               = ["logo", "number", "team_name", "player_name", "mascot", "free"];
        var app_id                  = '<input type="text" style="' + style + '" class="app-id" name="application_id" data-id="' + group.id + '" value="' + group.id + '" size="3">';
        var delete_application      = '<a href="#" class="btn btn-flat btn-xs btn-primary save_app_row_template" ><span class="glyphicon glyphicon-save"></span> Save Row Template</a> <a class="btn btn-flat btn-xs btn-danger delete-application" data-id="' + canvasFront.getObjects().indexOf(group) + '">Delete</a>';
        var def_name                = '<input type="text" style="' + style + '; float: left; width: 300px;" data-id="' + application_number + '" class="app-def-name" value="'+default_name+'">';
        var application_rotation    = '<input type="text" data-id="' + canvasFront.getObjects().indexOf(group) + '" style="' + style + '" class="app-rotation" value="0" size="3">';
        var app_x                   = '<input type="text" style="' + style + '" class="app-x" value="' +canvasFront.width / 2+ '" size="4">';
        var app_y                   = '<input type="text" style="' + style + '" class="app-y" value=' + canvasFront.height / 2 + ' size="4">';
        var app_primary             = '<input checked type="checkbox" style="' + style + '" class="app-primary" value="1">';
        var app_logo                = '<input checked type="checkbox" style="' + style + '" class="app-logo" value="1">';
        var app_team_name           = '<input checked type="checkbox" style="' + style + '" class="app-team-name" value="1">';
        var app_player_name         = '<input checked type="checkbox" style="' + style + '" class="app-player-name" value="1">';
        var app_number              = '<input checked type="checkbox" style="' + style + '" class="app-number" value="1">';
        var app_font_sizes          = '<input type="text" style="' + style + '" class="app-font-sizes" value="" size="3">';
        var colors                  = '<input type="text" style="' + style + '" class="app-colors" value=""><div class="colorSelection"></div>' ;
        var default_mascot          = '<input type="textbox" class="mascotFilter"><select style=' + style + ' class="app-default-mascot" data-id="' + group.id + '"></select><input type="hidden" class="app-mascot-value amv' + group.id + '" id="amv' + group.id + '">';
        var accents                 = '<select style=' + style + ' class="app-default-accent" data-id="' + group.id + '"></select><input type="hidden" class="app-accent-value amv' + group.id + '" id="amv' + group.id + '">';
        var tailsweep               = '<select style=' + style + ' class="app-default-tailsweep" data-id="' + group.id + '"></select><input type="hidden" class="app-tailsweep-value amv' + group.id + '" id="amv' + group.id + '">';
        var default_font            = '<select style="' + style + '; float: left; width: 300px;" class="app-default-font" data-id="' + group.id + '">' + fonts_options + '</select>';
        var default_text            = '<input type="text" style="' + style + '; float: left; width: 300px;" class="app-default-text" data-id="' + canvasFront.getObjects().indexOf(group) + '"><br>';
        var vertical_text           = '<input type="checkbox" style="' + style + '" class="app-vertical-text" value="1" data-id="' + canvasFront.getObjects().indexOf(group) + '">';
        var default_number          = '<input type="number" style="' + style + '; float: left; width: 90px;" class="app-default-number" size="3" data-id="' + canvasFront.getObjects().indexOf(group) + '">';
        var rotated_tailsweep       = '<input type="checkbox" style="' + style + '" class="app-rotated-tailsweep" value="1" data-id="' + canvasFront.getObjects().indexOf(group) + '"><a href="#" class="appTooltip" data-toggle="tooltip" data-message="App #: "><span class="glyphicon glyphicon-info-sign"></span></a>';
        var embellishment           = '<input checked type="checkbox" style="' + style + '" class="app-embellishment" value="1">';
        var inksoft_design_id       = '<input type="number" style="' + style + '" class="app-inksoft-design-id" value="" size="3">';
        var app_opacity             = '<input type="number" style="' + style + '" class="app-opacity" size="2" value="100">';
        var def_pattern_position    = '<input type="number" style="' + style + '" class="app-def-pattern-position" size="2" value="0">';
        var app_default_pattern     = `<select style="` + style + `" class="app-def-pattern" data-id="` + group.id + `">` + def_patterns_options + `</select><div class="col-md-12 app_pattern_layers_OC" data-id="` + group.id + `" id="app_pattern_layers_OC"></div><input type="hidden" style="` + style + `" data-id="` + group.id + `" class="app-pattern-properties" value=`+blank_pattern+`>`;
        var custom_scale_x          = '<input type="text" style="' + style + '" class="app-custom-scale-x" value="0" size="4">';
        var custom_scale_y          = '<input type="text" style="' + style + '" class="app-custom-scale-y" value="0" size="4">';
        var flipped                 = '<input type="checkbox" style="' + style + '" class="app-flipped" value="1"><a href="#" class="appTooltip" data-toggle="tooltip" data-message="App #: "><span class="glyphicon glyphicon-info-sign"></span></a>';

        var flip = "<a href='#' data-id='" + group.id + "' class='btn btn-flat btn-xs btn-primary app-rotation-flip'>Flip</a>";

        var select_append           = '<select class="app-def-item" style="' + style + '" data-id="' + canvasFront.getObjects().indexOf(group) + '">';
        select_append += '<option value="' + default_item + '">' + default_item + '</option>';

        for (var i = 0; i<items_arr.length; i++) {
            if (default_item != items_arr[i]) {
                select_append += "<option value=" + items_arr[i] + ">" + items_arr[i] + "</option>";
            }
        }

        select_append += "</select>";

        var fields = [
            delete_application,
            app_id,
            select_append,
            def_name,
            application_rotation,
            app_x,
            app_y,
            app_primary,
            app_logo,
            embellishment,
            app_team_name,
            app_player_name,
            app_number,
            app_font_sizes,
            colors,
            accents,
            default_mascot,
            tailsweep,
            rotated_tailsweep,
            default_font,
            default_text,
            vertical_text,
            default_number,
            inksoft_design_id,
            app_opacity,
            def_pattern_position,
            app_default_pattern,
            custom_scale_x,
            custom_scale_y,
            flipped,
            flip
        ];

        $( ".front-applications" ).append(generateTRow(fields));

        var canvasItem = "application" + group.id;
        application_number++;

        $.each(window.mascots, function(i, item) {
            item['text'] = item.name;
            item['value'] = item.id;
            item['selected'] = false;

            var c = 0;

            var xdata = JSON.parse(item.layers_properties);

            $.each(xdata, function(i, item) {
                c++;
            });

            item['description'] = item.category + ' [ ' + c + ' ]';
            item['imageSrc'] = item.icon;
            item['layers'] = c ;
        });

        $.each(window.accents, function(i, item) {
            item['text'] = item.name;
            item['value'] = item.id;
            item['selected'] = false;
            item['description'] = 'Accent';
            item['imageSrc'] = item.thumbnail;
        });

        var accentsData = window.accents;
        var accent_class = '.app-default-accent';

        $(accent_class).ddslick({
            data: accentsData,
            width: 250,
            height: 300,
            imagePosition: "left",
            selectText: "Select Accent",
            onSelected: function (data) {
                var rowIndex = data.original[0].outerHTML;
                rowIndex = $.parseHTML(rowIndex);
                rowIndex = $(rowIndex).data("id");

                if ($('.app-def-item').eq(rowIndex).val()!="mascot") {
                    accentMascotSelect(data,"accent",rowIndex);
                }
            },
        });

        $.each(window.tailsweeps, function(i, item) {
            item['text'] = item.name;
            item['value'] = item.id;
            item['selected'] = false;
        });

        var tailsweepsData = window.tailsweeps;
        var tailsweep_class = '.app-default-tailsweep';

        $(tailsweep_class).ddslick({
            data: tailsweepsData,
            width: 250,
            height: 300,
            imagePosition: "left",
            selectText: "Select Tailsweep",
            onSelected: function (data) {
            },
        });

        $(document).on("change",".accentLayerColors",function(){
            updateColorField(this);
        });

        function updateColorField(t){
        var colorCodeField="";
           $(t).parent(".colorSelection").find("select").each(function() {
                var colorCode = ($(this).find(":selected"))[0].outerHTML;

                colorCode =  $.parseHTML(colorCode);
                colorCode = $(colorCode).data("color-code");
                colorCodeField = colorCodeField + "," + colorCode;
                $(this).css("background","#" + $(this).find(":selected").val());
            });

           $(t).parent(".colorSelection").siblings(".app-colors").val(colorCodeField.slice(1));
        }

        $(".app-rotation-flip").each(function(i) {
            $(this).on('click', function(){
                var id = $(this).data('id');
                flipApplication(id);
            });
        });

        updateApplicationsJSON();

        $(document).on('change', '.app-id', function() {
            var temp_app_id = $(this).val();
            $(this).parent().find('.appTooltip').data('message', 'App #: ' + temp_app_id);
        });

        $('[data-toggle="tooltip"]').popover({
            html: true,
            trigger: 'hover',
            placement: 'top',
            content: function(){
                return $(this).data('message');
            }
        });
    });
    //


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
        reIndexRowsDataID();
    });

    function reIndexRowsDataID(){
        var ctr = 0;
        $(".app-rotation").each(function(i) {
            $(this).data('id', ctr);
            ctr++;
        });
        ctr = 0;
        $(".delete-application").each(function(i) {
            $(this).data('id', ctr);
            ctr++;
        });
    }

    $('.mo-default-color, .mo-sublimated-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });

    $('.app-rotation').change(function(){
        // checkpoint
        updateRXY(0);
    });

    /*
        Initialize CANVAS for Bounding Polygon
    */
    try {
        var canvas = this.__canvas = new fabric.Canvas('bounding-box-canvas');
        fabric.Object.prototype.transparentCorners = false;
        canvas.setWidth( 496 );
        canvas.setHeight( 550 );
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    }
    catch(err) {
    }

    try {
        canvasFront.on({
            'object:moving': updateCoordinatesXYR, // updateCoordinatesXYR
            'object:scaling': updateCoordinatesXYR,
            'object:rotating': updateCoordinatesXYR,
            'mouse:down': flashApplicationRow
        });
    }
    catch(err) {
    }

    // window.materialOptionSettings = null;
    // var url = "//" + api_host + "/api/cuts/settings";
    // $.ajax({
    //     url: url,
    //     type: "GET",
    //     dataType: "json",
    //     crossDomain: true,
    //     contentType: 'application/json',
    //     success: function(response){
    //         window.materialOptionSettings = response;
    //         var type = 'pant cut';
    //         var items = materialOptionSettings[type];
    //     }
    // });

    $('.materials').bootstrapTable();

    $(".options-row-source").hide();

    $('#front-default-item').change(function(){
        var def_name = $(this).find("option:selected").text();
        $('#application_name').val(def_name);
    });

    $('.clone-row').on('click', function(){
        $( ".options-row:first" ).clone().prependTo( "#options-row-container" );

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
                    $(this).parent().siblings().find(".mo-layer").val('99');
                } else{
                    $(this).parent().siblings().find(".mo-layer").val('98');
                }
            }
        });

        $(".mo-layer").keyup(function() {
            var newLength = $('.options-row').length;
            renumberRows(newLength);
        });

        $(".mo-name").keyup(function() {
            var elem = $(this).parent().siblings().find('.mo-layer');
            var name = $(this).val().toLowerCase();
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
            filename = filename.split("_").join(' ');
            filename.capitalize();

            if( filename.charAt(0) == ' ' ){
                filename = filename.substr(1);
            }

            var fn = filename.capitalize();

            $(this).parent().siblings().find('.mo-name').val(fn);

            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return;

            if (/^image/.test(files[0].type)){
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);

                reader.onloadend = function() {
                    elem.data('img',this.result);
                    elem2.attr('src',this.result);
                    elem2.data('img',this.result);

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

    $('.add-multiple-material-option').on('click', function(){

        $('#add-multiple-options-modal').modal('show');


    });

    $('.cleanup-material').on('click', function(){
        $('#cleanup-material-modal').modal('show');
        var id = $(this).data('id');
        $('#cleanup_material_id').val(id);
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

    $('.add-multiple-material-option').on('click', function(){
        material = {
            id: $(this).data('material-id')
        };
        var perspective = $(this).data('add-to-perspective');
        $('.material-id').prop("value", material.id);
        $('.perspective-multiple-upload').val(perspective);
    });

    $('.material-option-boundary').on('click', function(){
        application_number = 0;
        material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            front_shape: ($(this).data('material-front-shape')),
            back_shape: ($(this).data('material-back-shape')),
            left_shape: ($(this).data('material-left-shape')),
            right_shape: ($(this).data('material-right-shape')),
            option: {
                material_id: $(this).data('material-id'),
                id: $(this).data('material-option-id'),
                name: $(this).data('material-option-name'),
                type: $(this).data('material-option-setting-type'),
                code: $(this).data('material-option-setting-code'),
                path: $(this).data('material-option-path'),
                perspective: $(this).data('material-option-perspective'),
                boundary_properties: ($(this).data('material-option-boundary-properties')),
                highlights: ($(this).data('material-highlights-path'))
            }
        };

        $('.b-prop').val(material.option.boundary_properties);
        // $('#boundary-properties').val(material.option.boundary_properties);
        $('.material-option-id').val(material.option.id);
        $('.material-id').val(material.id);

        var perspective = material.option.perspective;
        var material_option_shape = material.option.path;

        $('#app-saved-perspective').val(material.option.perspective);
        $('#app-material-option-name').val(material.option.name);
        $("#material-option-bounding-box-top").css("background-image", "url("+material.option.path+")");
        $("#material-option-bounding-box").css("background-image", "url("+material.option.highlights+")");

        $( ".front-applications" ).html(''); // prevents continuous appending of applications points

        canvasFront.clear();

        $("#file-src").prop("src", material.option.path);
        $("#layer-level").prop("value", material.option.layer_level);

        if (material.option.blend) {
            $('#is-blend').attr('checked', 'checked');
        } else {
            $('#is-blend').attr('checked', 'unchecked');
        }

        if($('.b-prop').val != "" || $('.b-prop').val != "\"{}\""){
            canvas.clear();
            var jason = $('.b-prop').val();
            var output = jason.substring(1, jason.length-1);
            polyData = JSON.parse(output);

            loadPolygon(polyData);
            updateCoordinates();
            canvasFront.clear();

            var boundaryProperties = '"'+JSON.stringify(polyData)+'"';
            $('.b-prop').prop('value', boundaryProperties);
        }

        $('#saved-setting-type').attr('selected',true);
        $('#saved-perspective').attr('selected',true);
        $('#edit-material-option-boundary-modal .material-option-path').attr('src', material.option.path);
        $('#save-material-option-boundary-modal .material-id').val(material.id);
        $('#save-material-option-boundary-modal .modal-title span').html("Edit: " + material.option.name);
        $('#save-material-option-boundary-modal').modal('show');

        bringingPointToFront();

    });

    $('.update-applications-json').on('click', function(){
        updateApplicationsJSON();
    });

    $('.save-applications-button').on('click', function(){
        updateApplicationsJSON();
        $(".save-applications").trigger("click");
    });

    initializeMaterialApplication();
    function initializeMaterialApplication() {
        application_number = 0;
        material = {
            id: $('#applications_form').data('material-id'),
            name: $('#applications_form').data('material-name'),
            brand: $('#applications_form').data('material-brand'),
            option: {
                id: $('#applications_form').data('material-option-id'),
                name: $('#applications_form').data('material-option-name'),
                type: $('#applications_form').data('material-option-setting-type'),
                code: $('#applications_form').data('material-option-setting-code'),
                path: $('#applications_form').data('material-option-path'),
                perspective: $('#applications_form').data('material-option-perspective'),
                applications_properties: ($('#applications_form').data('material-option-applications-properties')),
                highlights: ($('#applications_form').data('material-highlights-path')),
                guide: ($('#applications_form').data('material-option-guide'))
            }
        };

        $('.a-prop').prop("value", material.option.applications_properties);

        var va_prop_val = $('.a-prop').val();
        if($('.a-prop').val() != "\"{}\""){
            va_prop_val = $('.a-prop').val();
            $('.a-prop').prop("value", va_prop_val);
        }

        var perspective = material.option.perspective;
        var material_option_shape = material.option.path;

        $('#app-saved-perspective').val(material.option.perspective);
        $('#app-material-option-name').val(material.option.name);
        $("#shape-guide").css("background-image", "url(" + material.option.guide + ")");
        $("#shape-view").css("background-image", "url(" + material.option.highlights + ")");
        $("#shape-view-top").css("background-image", "url(" + material.option.path + ")");
        $('#app-material-brand').val(material.brand);

        $( ".front-applications" ).html(''); // prevents continuous appending of applications point
        canvasFront.clear();

        var apps = material.option.applications_properties;
        apps = apps.substring(1, apps.length-1);
        var app_properties = JSON.parse(apps);

        appendApplications(app_properties);

        if($('.a-prop').val() != "\"{}\""){
            var ap_out = va_prop_val.substring(1, va_prop_val.length-1);
            $(".front-applications").remove(".apOpt");
            clearAppPropOptions();
        }

        $("#file-src").prop("src", material.option.path);
        $("#layer-level").prop("value", material.option.layer_level);

        if (material.option.blend) {
            $('#is-blend').attr('checked', 'checked');
        } else {
            $('#is-blend').attr('checked', 'unchecked');
        }


        $('#saved-setting-type').attr('selected',true);
        $('#saved-perspective').attr('selected',true);
        $('#edit-material-option-applications-modal .material-option-path').attr('src', material.option.path);
        $('#save-material-option-applications-modal .material-id').val(material.id);
        $('#save-material-option-applications-modal .modal-title span').html("Edit: " + material.option.name);
        $('#save-material-option-applications-modal').modal('show');

        $(document).on('change', '.app-id', function(){
            var temp_app_id = $(this).val();
            $(this).parent().parent().find('.appTooltip').data('message', 'App #: '+temp_app_id);
        });

        $('[data-toggle="tooltip"]').popover({
            html: true,
            trigger: 'hover',
            placement: 'top',
            content: function(){
                return $(this).data('message');
            }
        });
    }

    function appendApplications(app_properties) {
        var dividend = 2;

        for (c = 0; c < Object.keys(app_properties).length; c++) {

            var l = 'layer' + c;
            var mascot_offset = 4;
            var app_prop_id = app_properties[l].id;
            var app_prop_type = app_properties[l].type;

            // break loop if there's no data, to prevent error: Cheat
            if (! app_properties[l].id) {
                break;
            }

            var fill = '#e3e3e3';
            var height = app_properties[l].height / dividend;
            var width = app_properties[l].width / dividend;
            var opacity = 0.6;
            var font_family = 'arial black';
            var stroke_color = 'red';
            var stroke_width = 1;
            var app_id_font_size = (( app_properties[l].topRight.x / dividend ) - (app_properties[l].topLeft.x / dividend)) / 3;
            var app_type_font_size = (( app_properties[l].topRight.x / dividend ) - (app_properties[l].topLeft.x / dividend)) / 5.2;
            var group_left = app_properties[l].topLeft.x / dividend;
            var group_top = app_properties[l].topLeft.y / dividend;

            // Generate Fabric objects then add to canvas
            var area = fabricAppRectangle(c, fill, height, width, stroke_width, stroke_color, opacity);
            var app_id = fabricAppID( app_prop_id.toString(), font_family, opacity, app_id_font_size);
            var app_type = fabricAppType( app_prop_type.toString(), font_family, opacity, app_type_font_size);
            var group = fabricAppGroup( c, group_left, group_top, area, app_id, app_type, app_prop_type);

            group.lockUniScaling = true;
            group.lockScalingX = true;
            group.lockScalingY = true;
            group.customiseCornerIcons({
                settings: {
                    borderColor: 'blue',
                    cornerSize: 15,
                    cornerShape: 'rect',
                    cornerBackgroundColor: 'blue'
                },
                tl: {
                }
            });

            group.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                tr: false,
                br: false,
                bl: false
            });

            group.hasRotatingPoint = false;
            group.setCoords();
            canvasFront.add(group);


            if (app_properties[l].appCustomScale === '' || app_properties[l].appCustomScale === null || app_properties[l].appCustomScale === 'undefined' || app_properties[l].appCustomScale === undefined) {
                var appCustomScaleX = 0;
                var appCustomScaleY = 0;
            } else {
                appCustomScaleX = app_properties[l].appCustomScale.x;
                appCustomScaleY = app_properties[l].appCustomScale.y;
            }


            if (app_properties[l].id != null) {
                var style                   = 'margin-right: 5px';
                var items_arr               = ["logo", "number", "team_name", "player_name", "mascot", "free"];
                var app_id                  = '<input type="text" style="' + style + '" class="app-id" data-id="' + c + '" name="application_id" value="' + app_properties[l].id + '" size="3">';
                var def_name                = '<input type="text" style="' + style + '; float: left; width: 300px" data-id="' + c + '"class="app-def-name" value="' + app_properties[l].name + '">';
                var delete_application      = '<a href="#" class="btn btn-flat btn-xs btn-primary save_app_row_template" ><span class="glyphicon glyphicon-save"></span> Save Row Template</a> <a class="btn btn-flat btn-xs btn-danger delete-application" data-id="' + c + '">Delete</a>';
                var application_rotation    = '<input type="text" data-id="' + c + '" style="' + style + '" class="app-rotation" value="' + app_properties[l].rotation + '" size="3">';
                var ix = ( app_properties[l].pivot.x ) / dividend;
                var iy = ( app_properties[l].pivot.y ) / dividend;
                var app_x                   = '<input type="text" data-id="' + c + '" style="' + style + '" class="app-x" value="' + ix + '" size="4">';
                var app_y                   = '<input type="text" data-id="' + c + '" style="' + style + '" class="app-y" value='  + iy + ' size="4">';

                var checked = "checked";

                var primary_checked     = "",
                    logo_checked        = "",
                    team_name_checked   = "",
                    player_name_checked = "",
                    number_checked      = "",
                    vertical_text_checked = "",
                    rotated_tailsweep_checked = "";
                    embellishment_checked = "";
                    flipped_checked = "";

                // Check checkbox if value is 1, isn't it obvious?
                if(app_properties[l].isPrimary == 1){ primary_checked = checked; }
                if(app_properties[l].hasLogo == 1){ logo_checked = checked; }
                if(app_properties[l].hasTeamName == 1){ team_name_checked = checked; }
                if(app_properties[l].hasPlayerName == 1){ player_name_checked = checked; }
                if(app_properties[l].hasNumber == 1){ number_checked = checked; }
                if(app_properties[l].verticalText == 1){ vertical_text_checked = checked; }
                if(app_properties[l].rotatedTailsweep == 1){ rotated_tailsweep_checked = checked; }
                if(app_properties[l].hasEmbellishment == 1){ embellishment_checked = checked; }
                if(app_properties[l].isFlipped == 1){ flipped_checked = checked; }

                var app_primary         = '<input type="checkbox" style="'  + style + '" class="app-primary" value="1" '        + primary_checked                   + '>';
                var app_logo            = '<input type="checkbox" style="'  + style + '" class="app-logo" value="1" '           + logo_checked                      + '>';
                var app_team_name       = '<input type="checkbox" style="'  + style + '" class="app-team-name" value="1" '      + team_name_checked                 + '>';
                var app_player_name     = '<input type="checkbox" style="'  + style + '" class="app-player-name" value="1" '    + player_name_checked               + '>';
                var app_dnumber         = '<input type="checkbox" style="'  + style + '" class="app-number" value="1" '         + number_checked                    + '>';
                var app_font_sizes      = '<input type="text" style="'      + style + '" class="app-font-sizes" value="'        + app_properties[l].fontSizes       + '" size="3">';
                var app_colors          = '<input type="text" style="'      + style + '" class="app-colors" value="'     + app_properties[l].colors    + '" ><div class="colorSelection"></div>';
                var app_accents         = '<select style=' + style + ' id="default_accent_' + c + '" class="app-default-accent" data-id="' + c + '"></select><input type="hidden" class="app-accent-value amv' + c + '" id="amv' + c + '" >';
                var default_mascot      = '<input type="textbox" class="mascotFilter"><select style=' + style + ' id="default_mascot_' + c + '" class="app-default-mascot default_mascot_' + c + '" data-id="' + c + '"></select><input type="hidden" class="app-mascot-value amv' + c + '" id="amv' + c + '" value="' + app_properties[l].defaultMascot + '">';
                var app_accents         = '<select style=' + style + ' id="default_accent_' + c + '" class="app-default-accent" data-id="' + c + '"></select><input type="hidden" class="app-accent-value amv' + c + '" id="amv' + c + '" >';
                var default_tailsweep   = '<select style=' + style + ' id="default_tailsweep_' + c + '" class="app-default-tailsweep" data-id="' + c + '"></select><input type="hidden" class="app-tailsweep-value amv' + c + '" id="amv' + c + '" >';

                var app_font = "";

                var selectedMascotID = app_properties[l].defaultMascot;

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

                var fonts_options = '<option value="Arial" data-font-family="Arial" style="font-family: Arial;">Not Set</option>';
                var app_material_brand = $('#app-material-brand').val();

                for(var i = 0; i < window.fonts.length; i++) {
                        console.log(window.fonts[i]);
                    if(window.fonts[i].active == 1 ){
                        if(app_font == window.fonts[i].id ){
                            fonts_options += "<option value=" + window.fonts[i].id + " data-sport='" + window.fonts[i].sports + "'  data-font-family='" + window.fonts[i].name + "' style='font-family: " + window.fonts[i].name + "; font-size: 30px; width: 300px;' selected>" + window.fonts[i].name + "</option>";
                        } else {
                            fonts_options += "<option value=" + window.fonts[i].id + " data-sport='" + window.fonts[i].sports + "' data-font-family='" + window.fonts[i].name + "' style='font-family: " + window.fonts[i].name + "; font-size: 30px; width: 300px;'>" + window.fonts[i].name + "</option>";
                        }
                    }
                }

                var font_style = "";
                for(var i = 0; i < window.fonts.length; i++) {
                    if( app_properties[l].defaultFont == window.fonts[i].id ){
                        font_style = window.fonts[i].name;
                    }
                }

                var def_patterns_options = '';
                var current_sport = $('#material_uniform_category').val();
                var current_asset_target = $('#material_asset_target').val();
                var alter_sport_name = temp_brand == "Riddell" ? "RDL "+current_sport : current_sport;
                var input_patterns = _.filter(window.patterns, function(pattern) {
                    var sport = JSON.parse(pattern.sports);
                    // var asset_target = pattern.asset_target;
                    // var bp_options = pattern.block_pattern_options;
                    var sportOk = _.contains(sport, alter_sport_name);
                    return sportOk;
                });

                // set BLANK pattern for existing
                if(app_properties[l].appDefPattern === '' || app_properties[l].appDefPattern === null || app_properties[l].appDefPattern === 'undefined' || app_properties[l].appDefPattern === undefined) {
                    if (temp_brand == 'prolook') {
                        app_properties[l].appDefPattern = 33;
                    } else if (temp_brand == 'richardson') {
                        app_properties[l].appDefPattern = 318;
                    } else if (temp_brand == 'riddell' || temp_brand == 'Riddell') {
                        app_properties[l].appDefPattern = 496;
                    }
                }

                $.each(input_patterns, function (i, item) {
                    if(app_properties[l].appDefPattern == item.id) {
                        def_patterns_options += '<option value="' + item.id + '" selected>' + item.name + '</option>';
                    }
                    else {
                        def_patterns_options += '<option value="' + item.id + '">' + item.name + '</option>';
                    }
                });

                var default_font        = '<select style="' + style + '; float: left; width: 300px;" class="app-default-font" data-id="' + group.id + '">' + fonts_options + '</select>';
                var default_text        = '<input type="text" style="' + style + '; float: left; width: 300px;" class="app-default-text" data-id="' + group.id + '" value="' + app_text + '"><br>';
                var vertical_text       = '<input type="checkbox" style="'  + style + '" class="app-vertical-text" value="1" data-id="' + group.id + '" '        + vertical_text_checked                   + '>';
                var default_number      = '<input type="number" style="' + style + '; float: left; width: 90px;" class="app-default-number" data-id="' + group.id + '" value="' + app_number + '">';
                var embellishment       = '<input type="checkbox" style="'  + style + '" class="app-embellishment" value="1" '         + embellishment_checked                    + '>';
                var inksoft_design_id   = '<input type="number" style="'      + style + '" class="app-inksoft-design-id" value="'        + app_properties[l].inksoftDesignID       + '" size="3">';
                var flipped             = '<input type="checkbox" style="'  + style + '" class="app-flipped" value="1" '         + flipped_checked                    + '><a href="#" class="appTooltip" data-toggle="tooltip" data-message="App #: ' + app_properties[l].id + '"><span class="glyphicon glyphicon-info-sign"></span></a>';
                var app_opacity         = '<input type="number" style="'      + style + '" class="app-opacity" value="'        + app_properties[l].appOpacity       + '" size="2">';
                var def_pattern_position= '<input type="number" style="'      + style + '" class="app-def-pattern-position" value="'        + app_properties[l].appDefPatternPosition       + '" size="2">';
                var app_default_pattern = `<select style='` + style + `'; float: left; width: 300px;" class="app-def-pattern" data-id='` + group.id + `'>'` + def_patterns_options + `'</select><div class="col-md-12 app_pattern_layers_OC" data-id='` + group.id + `' id="app_pattern_layers_OC"></div><input type="hidden" style='` + style+ `' class="app-pattern-properties" data-id='` + group.id + `' value='` +app_properties[l].appPatternProperties+ `'>`;
                var custom_scale_x      = `<input type="text" style="` + style + `" class="app-custom-scale-x" value="`         + appCustomScaleX     + `" size="4">`;
                var custom_scale_y      = '<input type="text" style="' + style + '" class="app-custom-scale-y" value='          + appCustomScaleY     + ' size="4">'
                var rotated_tailsweep   = '<input type="checkbox" style="'  + style + '" class="app-rotated-tailsweep" value="1" data-id="' + group.id + '" '        + rotated_tailsweep_checked                   + '><a href="#" class="appTooltip" data-toggle="tooltip" data-message="App #: ' + app_properties[l].id + '"><span class="glyphicon glyphicon-info-sign"></span></a>';

                // Append options to selectbox
                var select_append       = '<select class="app-def-item" style="' + style + '" data-id="' + c + '">';
                select_append           += '<option value="' + app_properties[l].type + '">' + app_properties[l].type + '</option>';

                for(var i = 0; i<items_arr.length; i++) {
                    if(app_properties[l].type != items_arr[i]) {
                        select_append += "<option value=" + items_arr[i] + ">" + items_arr[i] + "</option>";
                    }
                }

                select_append += "</select>";

                var flip = "<a href='#' data-id='" + c + "' class='btn btn-flat btn-xs btn-primary app-rotation-flip'>Flip</a>";
                // contain TDs in an array, obvious?
                var fields = [
                    delete_application,
                    app_id,
                    select_append,
                    def_name,
                    application_rotation,
                    app_x,
                    app_y,
                    app_primary,
                    app_logo,
                    embellishment,
                    app_team_name,
                    app_player_name,
                    app_dnumber,
                    app_font_sizes,
                    // app_sizes,
                    app_colors,
                    app_accents,
                    default_mascot,
                    default_tailsweep,
                    rotated_tailsweep,
                    default_font,
                    default_text,
                    vertical_text,
                    default_number,
                    inksoft_design_id,
                    app_opacity,
                    def_pattern_position,
                    app_default_pattern,
                    custom_scale_x,
                    custom_scale_y,
                    flipped,
                    flip
                ];

                $( ".front-applications" ).append(generateTRow(fields));

                var canvasItem = "application"+group.id;
                var thisGroup = group;

                var mascotsData = window.mascots;
                var mascot_class = '.default_mascot_' + c;
                var mascot_id = '#default_mascot_' + c;
                var amv_class = '.amv' + c;
                var amv_id = '#amv' + c;
                var id_beta = 'amv' + c;

                var getMascotByIDurl = "//" + api_host + "/api/mascot/" + selectedMascotID;
                $.ajax({
                    url: getMascotByIDurl,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    success: function(data) {
                        if (data.mascot.success === true) {
                            var mascot = data.mascot.mascot;
                            var layerProperties = JSON.parse(mascot.layers_properties);

                            var index = 0;

                            $.each(layerProperties, function(i, item) {
                                index++;
                            });

                            var description = mascot.category + ' [ ' + c + ' ]';

                            $(mascot_id).append("<option value='' data-image='' data-description=''>None</option>");

                            var option = "<option value='" + mascot.id + "' data-image='" + mascot.icon + "' data-description='" + description + "' selected='selected'>";
                                option += mascot.name
                                option += "</option>";

                            $(mascot_id).append(option);

                            $(mascot_id).select2({
                                width: '300px',
                                templateResult: formatState,
                                templateSelection: formatState,
                                minimumResultsForSearch: -1
                            });
                        }
                    }
                });


                $.each(window.accents, function(i, item) {
                    item['text'] = item.name;
                    item['value'] = item.id;

                    if( app_properties[l].accents == item.id ){
                        item['selected'] = true;
                    } else {
                        item['selected'] = false;
                    }

                    item['description'] = 'Accent';
                    item['imageSrc'] = item.thumbnail;
                });

                var accentsData = window.accents;
                var accent_class = '.app-default-accent';
                $(accent_class).ddslick({
                    data: accentsData,
                    width: 250,
                    height: 300,
                    imagePosition: "left",
                    selectText: "Select Accent",
                    onSelected: function (data) {
                        var rowIndex = data.original[0].outerHTML;
                        rowIndex = $.parseHTML(rowIndex);
                        rowIndex = $(rowIndex).data("id");

                        if($('.app-def-item').eq(rowIndex).val()!="mascot"){
                            accentMascotSelect(data,"accent",rowIndex);
                        }
                    },
                });


                $.each(window.mascots, function(i, item) {
                    item['text'] = item.name;
                    item['value'] = item.id;

                    if( app_properties[l].defaultMascot == item.id ){
                        item['selected'] = true;
                    } else {
                        item['selected'] = false;
                    }

                    var c = 0;
                    var xdata = JSON.parse(item.layers_properties);
                    $.each(xdata, function(i, item) {
                        c++;
                    });

                    item['description'] = item.category + ' [ ' + c + ' ]';
                    item['imageSrc'] = item.icon;
                    item['layers'] = c ;
                });

                $.each(window.tailsweeps, function(i, item) {
                    item['text'] = item.name;
                    item['value'] = item.id;

                    if( app_properties[l].tailsweeps == item.id ){
                        item['selected'] = true;
                    } else {
                        item['selected'] = false;
                    }
                });

                var tailsweepsData = window.tailsweeps;
                var tailsweep_class = '.app-default-tailsweep';
                $(tailsweep_class).ddslick({
                    data: tailsweepsData,
                    width: 250,
                    height: 300,
                    imagePosition: "left",
                    selectText: "Select Tailsweep",
                    onSelected: function (data) {
                    },
                });

                $(document).on("change",".accentLayerColors",function(){
                    updateColorField(this);
                });

                function updateColorField(t) {
                    var colorCodeField="";

                    $(t).parent(".colorSelection").find("select").each(function() {
                        var colorCode = ($(this).find(":selected"))[0].outerHTML;
                        colorCode =  $.parseHTML(colorCode);
                        colorCode = $(colorCode).data("color-code");
                        colorCodeField = colorCodeField +","+colorCode;
                        $(this).css("background","#"+$(this).find(":selected").val());
                    });

                    $(t).parent(".colorSelection").siblings(".app-colors").val(colorCodeField.slice(1));
                }

                $(document).on('change', '.app-def-item', function() {
                    
                    
                    if($(this).val() == "mascot"){
                        var selectedMascot = $(".application-row").eq($(".app-def-item").index(this)).find(".dd-container:odd").data('ddslick').selectedIndex;
                        
                        if(selectedMascot == -1){
                            $(".application-row").eq($(".app-def-item").index(this)).find(".app-colors").val("");
                            $(".application-row").eq($(".app-def-item").index(this)).find(".colorSelection").empty();
                        }
                    }else{
                        var selectedAccent = $(".application-row").eq($(".app-def-item").index(this)).find(".dd-container:even").data('ddslick').selectedIndex;
                        

                        if(selectedAccent == -1){
                            $(".application-row").eq($(".app-def-item").index(this)).find(".app-colors").val("");
                            $(".application-row").eq($(".app-def-item").index(this)).find(".colorSelection").empty();
                        }
                 
                        if(selectedAccent == -1){
                            selectedAccent = 0;
                        }
                      
                        selectedAccent = selectedAccent.toString();
                        
                        $(".application-row").eq($(".app-def-item").index(this)).find(".dd-container:even").ddslick('select', {index: selectedAccent }); 
                        
                    }

                });


                $(document).on('change', '.app-default-font', function() {
                    var font = $('option:selected', this).data('font-family');
                    var font_size = 30;
                    $(this).css('font-family', font);
                    $(this).css('font-size', font_size);
                    $(this).css('width', '300px');

                    $(this).parent().siblings('td').find("input[class=app-def-name]").css('font-family', font);
                    $(this).parent().siblings('td').find("input[class=app-def-name]").css('font-size', font_size);

                    $(this).parent().siblings('td').find("input[class=app-default-text]").css('font-family', font);
                    $(this).parent().siblings('td').find("input[class=app-default-text]").css('font-size', font_size);

                    $(this).parent().siblings('td').find("input[class=app-default-number]").css('font-family', font);
                    $(this).parent().siblings('td').find("input[class=app-default-number]").css('font-size', font_size);
                });

                $('.app-rotation-flip').on('click', function(){
                    var id = $(this).data('id');
                    flipApplication(id);
                });

                $('.app-rotation').change(function(){
                    updateRXY(0);
                });

                thisGroup.oCoords.tl.x  = (app_properties[l].topLeft.x) / dividend;
                thisGroup.oCoords.tl.y  = (app_properties[l].topLeft.y) / dividend;
                thisGroup.oCoords.tr.x  = (app_properties[l].topRight.x) / dividend;
                thisGroup.oCoords.tr.y  = (app_properties[l].topRight.y) / dividend;
                thisGroup.oCoords.bl.x  = (app_properties[l].bottomLeft.x) / dividend;
                thisGroup.oCoords.bl.y  = (app_properties[l].bottomLeft.y) / dividend;
                thisGroup.oCoords.br.x  = (app_properties[l].bottomRight.x) / dividend;
                thisGroup.oCoords.br.y  = (app_properties[l].bottomRight.y) / dividend;

                app_properties[l].pivot.x = app_properties[l].pivot.x / dividend;
                app_properties[l].pivot.y = app_properties[l].pivot.y / dividend;

                app_properties[l]['temp'] = {};

                app_properties[l].temp['x'] = ( app_properties[l].pivot.x / dividend ) - 3;
                app_properties[l].temp['y'] = ( app_properties[l].pivot.y / dividend );

                thisGroup.centerPoint   = app_properties[l].temp;

                thisGroup.width         = (app_properties[l].width) / dividend;
                thisGroup.height        = (app_properties[l].height) / dividend;

                thisGroup.left = app_properties[l].pivot.x;
                thisGroup.top = app_properties[l].pivot.y;
                thisGroup.pivot = thisGroup.centerPoint;
                thisGroup.setAngle(app_properties[l].rotation);
                thisGroup.setCoords();
                application_number++;
                canvasFront.renderAll();
            } else{
                break;
            }

            $(".app-default-font").each(function(i) {
                var font = $('option:selected', this).data('font-family');
                var font_size = 30;
                $(this).css('font-family', font);
                $(this).css('font-size', font_size);

                $(this).parent().siblings('td').find("input[class=app-def-name]").css('font-family', font);
                $(this).parent().siblings('td').find("input[class=app-def-name]").css('font-size', font_size);

                $(this).parent().siblings('td').find("input[class=app-default-text]").css('font-family', font);
                $(this).parent().siblings('td').find("input[class=app-default-text]").css('font-size', font_size);

                $(this).parent().siblings('td').find("input[class=app-default-number]").css('font-family', font);
                $(this).parent().siblings('td').find("input[class=app-default-number]").css('font-size', font_size);
            });
        }

        $('.app-pattern-properties').trigger('change');
    }

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

    function fixLoadPolygon(){
        var va_prop_val = $('.load-boundaries-template').val();

        var output = va_prop_val.substring(1, va_prop_val.length-1);
        polyData = JSON.parse(output);

        loadPolygon(polyData);
    }

    $('#save_boundary_template').on('click', function(){
        var name = $('#boundary_template_name').val();
        var block_pattern = $('#material_block_pattern').val();
        var neck_option = $('#material_neck_option').val();
        var perspective = $('#app-saved-perspective').val();
        var part = $('#app-material-option-name').val();
        var boundary_properties = $('.b-prop').val();

        var description = "Lorem Ipsum Yaddah";

        var url = "//" + api_host + "/api/boundary";

        var myData={
            "name":name,
            "block_pattern":block_pattern,
            "perspective":perspective,
            "part":part,
            "description":description,
            "boundary_properties":boundary_properties,
            "neck_option":neck_option
        };

        if($(this).attr('disabled') != 'disabled'){
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

    $('#save_app_template').on('click', function(){
        updateApplicationsJSON();
        var name = $('#app_template_name').val();
        var block_pattern = $('#material_block_pattern').val();
        var perspective = $('#app-saved-perspective').val();
        var part = $('#app-material-option-name').val();
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

                    }
                }
            });
        }
    });

    $(document).on('click', '.save_app_row_template', function(){

        updateApplicationsJSON();
        var block_pattern = $('#material_block_pattern').val();
        var perspective = $('#app-saved-perspective').val();
        var part = $('#app-material-option-name').val();
        var applications_properties = $('.a-prop').val();
        applications_properties = jQuery.parseJSON(applications_properties.slice(1, -1));

         layer = "layer"+$(".save_app_row_template").index(this);


        for (var key in applications_properties) {

         if(key == layer){

               applications_properties = applications_properties[key];
         }

        }
        data={
         layer0 : applications_properties

        }


        var description = "Lorem Ipsum Yaddah";

        var url = "//" + api_host + "/api/application";
       // var url = "//localhost:8888/api/application";
        var name = "App-"+applications_properties['id'];
        var myData={
            "name":name,
            "block_pattern":block_pattern,
            "perspective":perspective,
            "part":part,
            "description":description,
            "applications_properties": '"'+JSON.stringify(data)+'"'
        };

        if($(this).attr('disabled') != 'disabled'){

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

    /*
        Confirmation Modals
    */

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
            checkedMaterialOptionsIDs,
            'confirm-yes',
            'confirmation-modal-multiple-material-option'
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

    $('#confirmation-modal-multiple-material-option .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material_option/deleteMultiple/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(id),
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
                }



                window.location.reload(true);
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

    /*
        Helpers
    */

    function distance(p1, p2) {
        //Accepts two objects p1 & p2. Returns the distance between p1 & p2
        return Math.sqrt(((p2.left - p1.left) * (p2.left - p1.left)) + ((p2.top - p1.top) * (p2.top - p1.top)));
    }

    function getColors(brand, callback){
        var colors;
        var url = "//" + qx7_host + "/api/rule/" + $('#rule_id').val();
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                colors = data.rules.colors;
                if(typeof callback === "function") callback(colors);
            }
        });
    }

    function getAccents(callback){
       var accents;
       var url = "//" + api_host + "/api/accents";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                    accents = $(data['accents']).filter(function (i,n){return n.active == 1 });
                if(typeof callback === "function") callback(accents);
            }
        });
    }
    function getTailsweeps(callback){
        var tailsweep;
       var url = "//" + api_host + "/api/tailsweeps";
     //var url = "//localhost:8888/api/tailsweeps";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                   tailsweeps = data['tailsweeps'];
                if(typeof callback === "function") callback(tailsweeps);


            }
        });
    }

    function getFonts(callback){
        var url = "//" + qx7_host + "/api/rule/" + $('#rule_id').val() ;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                var fonts = data.rules.fonts;
                if (typeof callback === "function") {
                    callback(fonts);
                }
            }
        });
    }

    function getMascots(callback){
        var mascots;
        var url = "//" + api_host + "/api/mascots";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                mascots = data['mascots'];
                mascots = mascots.slice(1, 3); // return few mascots for testing to reduce loading time
                if(typeof callback === "function") callback(mascots);
            }
        });
    }

    function getPatterns(temp_brand, callback){
        var patterns;
        var url = "//" + api_host + "/api/patterns/" + temp_brand;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                patterns = data['patterns'];
                if(typeof callback === "function") callback(patterns);
            }
        });
    }

    function getFabrics(callback){
        var fabrics;
        var url = "//" + api_host + "/api/fabrics";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                fabrics = data['fabrics'];
                if(typeof callback === "function") callback(fabrics);
            }
        });
    }

    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    $(document).on('change', '#block_pattern', function() {
    });

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

    $(".load-boundaries-template").change(function() {
        var va_prop_val = $(this).val();

        if( va_prop_val == '"{}"' || va_prop_val == null ){
            va_prop_val = '"[{"angle":0,"x":20,"y":60},{"x":20,"y":20},{"x":60,"y":20},{"x":60,"y":60}]"';
        }

        var output = va_prop_val.substring(1, va_prop_val.length-1);
        polyData = JSON.parse(output);
        loadPolygon(polyData);
        updateCoordinates();
        $('.b-prop').val(va_prop_val);
        canvas.renderAll();
    });

    $(".load-applications-template").change(function() {
        canvasFront.clear();
        canvas.renderAll();
        application_number = 0;
        $( ".front-applications" ).html(''); // prevents continuous appending of applications points
        var va_prop_val = $(this).val();

        if(va_prop_val != "\"{}\""){
            var ap_out = va_prop_val.substring(1, va_prop_val.length-1);
            var app_properties = JSON.parse(ap_out);

            $(".front-applications").remove(".apOpt");
            clearAppPropOptions();
            appendApplications(app_properties);

        }
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

    function generateTRow(fields){
        var tr = '<tr class="application-row">';
        var c = 0;

        fields.forEach(function(entry) {
            if( c === 16 ) {
                tr += '<td class="msc">' + entry + '</td>';
            } else if(c === 17){
                tr += '<td class="tsc">' + entry + '</td>';
            }else {
                tr += '<td>' + entry + '</td>';
            }
            c++;
        });
        tr += '</tr>';
        return tr;
    }

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

    /*
        Custom fabric functions
    */

    function addCircle(name, x, y, style) {
        if (style === 'knot') {
            // cfill = 'FireBrick';
            // cstroke = 'FireBrick';
            cfill = 'red';
            cstroke = 'red';
            ctype = 'knot';
        } else {
            cfill = '';
            cstroke = 'red';
            ctype = 'control';
        }
        var c = new fabric.Circle({
            name: name,
            left: x,
            top: y,
            strokeWidth: 2,
            radius: 5.8,
            fill: cfill,
            stroke: cstroke,
            hasBorders: false,
            hasControls: false,
            lockUniScaling: true,
            selectable: true,
            coords: x + ', ' + y,
            reference: true,
            ptype: ctype,
            opacity: 0.3
        });
        return c;
    } // addCircle()

    function addPoint(name, x, y, style) {
        var p = addCircle(name, x, y, style);
        p.point = new fabric.Point(x, y);
        p.text = new fabric.Text(name, {
            left: x,
            top: y - 10,
            name: name + '_text',
            fill: '#808080',
            fontSize: 14,
            hasBorders: false,
            hasControls: false,
            lockUniScaling: true,
            selectable: false,
            reference: true
        });
        // canvas.add(p.text);
        canvas.add(p);

        return p;
    } // addPoint()

    function addLine(p0, p1, lineIdx) {
        var new_line = new fabric.Object();
        new_line = new fabric.Line([p0.left, p0.top, p1.left, p1.top], {
            id: lineIdx,
            fill: "red",
            stroke: "red",
            strokeLinejoin: "miter",
            strokeMiterlimit: 1,
            strokeWidth: 3,
            strokeDashArray: [5, 5],
            selectable: false,
            hasBorders: false,
            hasControls: false,
            reference: false,
            opacity: 0.8,
            name: "Line_" + p0.name + p1.name
        });
        new_line.setShadow("3px 3px 2px rgba(94, 128, 191, 0.5)");
        if (p0.hasOwnProperty('outPath') === false) {
            p0.outPath = [];
        }
        p0.outPath.push(new_line);
        if (p1.hasOwnProperty('inPath') === false) {
            p1.inPath = [];
        }
        p1.inPath.push(new_line);
        canvas.add(new_line);

        return new_line;
    } //addLine()

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
        var line1 = new fabric.Line([0, 0, 25, 0], {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 1,
            hasControls: true,
            hasRotatingPoint: true,
            padding: 0,
            left: 0,
            top: 0
            // scaleX: 3,
            // scaleY: 3
        });
        var line2 = new fabric.Line([0, 0, 0, 25], {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 1,
            hasControls: true,
            hasRotatingPoint: true,
            padding: 0,
            left: 0,
            top: 0
            // scaleX: 3,
            // scaleY: 3
        });
        var fb_obj = new fabric.Group([ rectangle, app_id, app_type, line1, line2 ], {
            id: obj_id,
            left: obj_left,
            top: obj_top,
            default_item: default_item
        });

        return fb_obj;
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
             if(0<i){
                $(this).find(".remove-row").show();

            }else{
                 $(this).find(".remove-row").hide();
            }
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
    }

    function updateCoordinatesXYR() {
        var cs = 1;
        updateRXY(cs);
    }

    function flipApplication(id){

        thisGroup = canvasFront.item(id);
        var angle = thisGroup.getAngle();
        var newAngle = 360 - angle;

        try{
            thisGroup.setAngle(newAngle).setCoords();
            canvasFront.renderAll();
        } catch( err ){
        }

    }

    function updateRXY(cs){
        applicationProperties = {}

        if(cs == 1){
            $(".app-rotation").each(function(i) {
                itemIdx = "layer"+$(this).data('id');
                layer = $(this).data('id');

                thisGroup = canvasFront.item(layer);
                applicationProperties[itemIdx] = {};
                applicationProperties[itemIdx].pivot = {};
                applicationProperties[itemIdx].pivot = thisGroup.getCenterPoint();

                $(this).parent().siblings('td').find("input[class=app-x]").val(applicationProperties[itemIdx].pivot.x);
                $(this).parent().siblings('td').find("input[class=app-y]").val(applicationProperties[itemIdx].pivot.y);
                $(this).val(thisGroup.getAngle());

                canvasFront.renderAll();
            });
        } else {
            $(".app-rotation").each(function(i) {
                itemIdx = "layer"+$(this).data('id');
                layer = $(this).data('id');

                var val = $(this).val();

                thisGroup = canvasFront.item(layer);
                thisGroup.setAngle(val).setCoords();

                canvasFront.renderAll();
            });
            cs = 0;
            updateApplicationsJSON();
        }
    }

    function updateCoordinates(cs) {

        applicationProperties = {}
        var circles = canvas.getObjects('circle');
        var x = 0;
        circles.forEach(function(entry) {
            var getCenterPoint = entry.getCenterPoint();
            coords[x] = {};
            var groups = canvas.getObjects('group');
            if( x == 0 ){
                coords[x]['angle'] = parseFloat(groups[0].getAngle());
                var pivot = groups[0].getCenterPoint();
                coords[x]['px'] = pivot.x * 2;
                coords[x]['py'] = pivot.y * 2;
            }

            coords[x]['x'] = parseFloat(getCenterPoint.x.toFixed(2)) * 2;
            coords[x]['y'] = parseFloat(getCenterPoint.y.toFixed(2)) * 2;
            x++;
        });

        canvas.renderAll();
        var boundaryProperties = JSON.stringify(coords);
        boundaryProperties = '"'+boundaryProperties+'"';
        $('.b-prop').prop('value', boundaryProperties);
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
    });

    $(".mo-layer").keyup(function() {
        var newLength = $('.options-row').length;
        renumberRows(newLength);
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

        filename = filename.split("_").join(' ');

        if( filename.charAt(0) == ' ' ){
            filename = filename.substr(1);
        }

        var fn = filename.capitalize();
        $(this).parent().siblings().find('.mo-name').val(fn);

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
    /*
            Fabric Listeners
    */
try {
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
}
catch(err) {  }

    bindColorsSelect2();
    bindGradientsSelect2();

try {
canvas.observe('object:rotating', function (e) {

    canvas.renderAll();
    var circles = canvas.getObjects('circle');
    var groups = canvas.getObjects('group');
    coords = new Array();
    var x = 0;
    circles.forEach(function(entry) {
        var getCenterPoint = entry.getCenterPoint();
        coords[x] = {};
        if( x == 0 ){
            coords[x]['angle'] = parseFloat(groups[0].getAngle());
        }
        coords[x]['x'] = parseFloat(getCenterPoint.x.toFixed(2)) * 2;
        coords[x]['y'] = parseFloat(getCenterPoint.y.toFixed(2)) * 2;
        x++;
    });
    coords.forEach(function(entry) {

    });

    updateCoordinates();
    $('#pattern_angle').val(parseFloat(groups[0].getAngle().toFixed(2)));
});

canvas.observe('object:moving', function (e) {
    var p = e.target;

    if (p.hasOwnProperty("text") === true) {
        //move text label to new circle location
        p.text.set({
            'left': p.left,
            'top': p.top - 10
        });
    }

    if (p.hasOwnProperty("inPath") === true) {
        //inpaths - paths end at circle
        for (var i = 0; i < p.inPath.length; i++) {
            ppath = p.inPath[i];
            if (p.ptype === 'control') {
                ppath.path[1][3] = p.left; // p is 2nd control circle in curve, update c1.x
                ppath.path[1][4] = p.top; // p is 2nd control circle in curve, update c1.y
            } else if (ppath.type === 'path') {
                ppath.path[1][5] = p.left; // p is end circle in curve, update p1.x
                ppath.path[1][6] = p.top; // p is end circle in curve update p1.y
            } else if (ppath.type === 'line') {
                ppath.set({
                    'x2': p.left,
                    'y2': p.top
                }); //p is begin circle in line, update left & top
            }
        }
    }
    if (p.hasOwnProperty("outPath") === true) {
        //outpaths - paths begin at circle
        for (var i = 0; i < p.outPath.length; i++) {
            ppath = p.outPath[i];
            if (p.ptype === 'control') {
                ppath.path[1][1] = p.left; //p is 1st control circle in curve, update c0.x
                ppath.path[1][2] = p.top; //p is 1st control circle in curve, update c0.y
            } else if (ppath.type === 'path') {
                ppath.path[0][1] = p.left; // p is begin circle in curve, update p0.x
                ppath.path[0][2] = p.top; // p is begin circle in curve, update p0.y
            } else if (ppath.type === 'line') {
                ppath.set({
                    'x1': p.left,
                    'y1': p.top
                }); //p is end circle in line, update left & top
            }
        }
    }
    canvas.renderAll();
    var circles = canvas.getObjects('circle');
    var groups = canvas.getObjects('group');
    coords = new Array();
    var x = 0;
    circles.forEach(function(entry) {
        var getCenterPoint = entry.getCenterPoint();
        coords[x] = {};
        if( x == 0 ){
            coords[x]['angle'] = parseFloat(groups[0].getAngle());
        }
        coords[x]['x'] = parseFloat(getCenterPoint.x.toFixed(2)) * 2;
        coords[x]['y'] = parseFloat(getCenterPoint.y.toFixed(2)) * 2;
        x++;
    });
    updateCoordinates();
    });
}
catch(err) {  }

function loadPolygon(data){
    var angle;
    canvas.clear();
    var z = 0;
    window.px = 0;
    window.py = 0;
    $.each(data, function(i, item) {
        var xcoord = item.x / 2;
        var ycoord = item.y / 2;

        if( z == 0 && item.angle != undefined ){
            angle = item.angle;
            if(item.px){
                window.px = item.px / 2;
                window.py = item.py / 2;
            }
        }
        window['a'+z] = addPoint('a'+z, xcoord, ycoord, 'knot');
        z++;
    });

    lineIdx = 0;
    var circles = canvas.getObjects('circle');
    var x = 0;
    var a = circles.length - 1;

    circles.forEach(function(entry) {
        var y = x + 1;
        if( x < a ){
            addLine(window['a'+x], window['a'+y], lineIdx);
            lineIdx++;
        } else {
            addLine(window['a'+x], window['a0'], lineIdx);
        }

        x++;
    });

    loadCase = 1;

    try {
        $('#pattern_angle').val(parseFloat(angle.toFixed(2)));
    }
    catch(err) { }

    if( window.px == 0 || window.px == null ){
        window.px = 453;
        window.py = 362;
    }

    var rect = new fabric.Rect({
        left: window.px,
        top: window.py,
        fill: 'White',
        stroke: 'red',
        stroke_width: '2px',
        hasBorders: false,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        width: 50,
        height: 50
    });

    var text = new fabric.Text('Pattern Angle', { fill: 'black', fontSize: 15, left: window.px, top: window.py });

    var triangle = new fabric.Triangle({  width: 35, height: 20, fill: 'red', left: window.px, top: window.py, angle: 180 });

    if( angle == null || angle == "" ){
        angle = 0;
    }

    var group = new fabric.Group([ rect, triangle, text ], { left: window.px, top: window.py, angle: angle });


    canvas.add(group);
    canvas.renderAll();
    // fixLoadPolygon();
}

$(".app-rotation").click(function(){

    sampleAccents = $(".app-rotation").parent().siblings('td').find(".dd-selected-value").val();
});
$(".dd-selected-value").click(function(){

    sampleAccents = $(".app-rotation").parent().siblings('td').find(".dd-selected-value").val();
});





    function updateApplicationsJSON() {
        var multiplier = 2;
        applicationProperties = {};
        cx = 0;


        $(".app-rotation").each(function(i) {
            
            itemIdx = "layer" + $(this).data('id');
            layer = $(this).data('id');

            var rotation_val = $(this).val();

            thisGroup = canvasFront.item(layer);
            applicationType = $(this).parent().siblings('td').find("select[class=app-def-item]").val();
            applicationName = $(this).parent().siblings('td').find("input[class=app-def-name]").val();
            applicationId = $(this).parent().siblings('td').find("input[class=app-id]").val();

            isPrimary = $(this).parent().siblings('td').find("input[class=app-primary]");
            hasLogo = $(this).parent().siblings('td').find("input[class=app-logo]");
            hasTeamName = $(this).parent().siblings('td').find("input[class=app-team-name]");
            hasPlayerName = $(this).parent().siblings('td').find("input[class=app-player-name]");
            hasNumber = $(this).parent().siblings('td').find("input[class=app-number]");
            fontSizes = $(this).parent().siblings('td').find("input[class=app-font-sizes]").val();
            uniformSizes = $(this).parent().siblings('td').find("input[class=app-uniform-sizes]").val();
            verticalText = $(this).parent().siblings('td').find("input[class=app-vertical-text]");
            rotatedTailsweep = $(this).parent().siblings('td').find("input[class=app-rotated-tailsweep]");

            applicationFont = $(this).parent().siblings('td').find("select[class=app-default-font]").val();
            applicationText = $(this).parent().siblings('td').find("input[class=app-default-text]").val();
            applicationNumber = $(this).parent().siblings('td').find("input[class=app-default-number]").val();

            applicationColors = $(this).parent().siblings('td').find("input[class=app-colors]").val();
            applicationAccents = $(this).parent().siblings('td').find(".dd-selected-value").val();
            applicationMascot = $(this).parent().siblings('td.msc').find(".app-default-mascot").val();
            applicationTailsweep = $(this).parent().siblings('td.tsc').find(".dd-selected-value").val();

            hasEmbellishment = $(this).parent().siblings('td').find("input[class=app-embellishment]");
            inksoftDesignID = $(this).parent().siblings('td').find("input[class=app-inksoft-design-id]").val();
            appOpacity = $(this).parent().siblings('td').find("input[class=app-opacity]").val();
            appDefPatternPosition = $(this).parent().siblings('td').find("input[class=app-def-pattern-position]").val();
            appDefPattern = $(this).parent().siblings('td').find("select[class=app-def-pattern]").val();
            appPatternProperties = $(this).parent().siblings('td').find("input[class=app-pattern-properties]").val();

            isFlipped = $(this).parent().siblings('td').find("input[class=app-flipped]");
            fontData = window.fontData;

            if (isPrimary.prop( "checked" )) {
                isPrimary = 1;
            } else {
                isPrimary = 0;
            }

            if (hasLogo.prop("checked")) {
                hasLogo = 1;
            } else {
                hasLogo = 0;
            }

            if (hasTeamName.prop("checked")) {
                hasTeamName = 1;
            } else {
                hasTeamName = 0;
            }

            if (hasPlayerName.prop("checked")) {
                hasPlayerName = 1;
            } else {
                hasPlayerName = 0;
            }

            if (verticalText.prop("checked")) {
                verticalText = 1;
            } else {
                verticalText = 0;
            }

            if(rotatedTailsweep.prop( "checked" )){
                rotatedTailsweep = 1;
            } else {
                rotatedTailsweep = 0;
            }

            if(hasNumber.prop( "checked" )){
                hasNumber = 1;
            } else {
                hasNumber = 0;
            }

            if(hasEmbellishment.prop( "checked" )){
                hasEmbellishment = 1;
            } else {
                hasEmbellishment = 0;
            }

            if(isFlipped.prop( "checked" )){
                isFlipped = 1;
            } else {
                isFlipped = 0;
            }

            var topLeftX = thisGroup.oCoords.tl.x * multiplier;
            var topLeftY = thisGroup.oCoords.tl.y * multiplier;
            var topRightX = thisGroup.oCoords.tr.x * multiplier;
            var topRightY = thisGroup.oCoords.tr.y * multiplier;
            var bottomLeftX = thisGroup.oCoords.bl.x * multiplier;
            var bottomLeftY = thisGroup.oCoords.bl.y * multiplier;
            var bottomRightX = thisGroup.oCoords.br.x * multiplier;
            var bottomRightY = thisGroup.oCoords.br.y * multiplier;
            var mascot_offset = 3;

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
            applicationProperties[itemIdx]['verticalText'] = {};
            applicationProperties[itemIdx]['rotatedTailsweep'] = {};

            applicationProperties[itemIdx]['defaultMascot'] = {};
            applicationProperties[itemIdx]['defaultFont'] = {};
            applicationProperties[itemIdx]['defaultText'] = {};
            applicationProperties[itemIdx]['defaultNumber'] = {};

            applicationProperties[itemIdx]['mascotData'] = {};
            applicationProperties[itemIdx]['fontData'] = {};

            applicationProperties[itemIdx]['center'] = {};
            applicationProperties[itemIdx]['colors'] = {};
            applicationProperties[itemIdx]['accents'] = {};
            applicationProperties[itemIdx]['tailsweeps'] = {};

            applicationProperties[itemIdx]['hasEmbellishment'] = {};
            applicationProperties[itemIdx]['inksoftDesignID'] = {};

            applicationProperties[itemIdx]['appOpacity'] = {};
            applicationProperties[itemIdx]['appDefPatternPosition'] = {};
            applicationProperties[itemIdx]['appDefPattern'] = {};
            applicationProperties[itemIdx]['appPatternProperties'] = {};

            applicationProperties[itemIdx]['appCustomScale'] = {};

            applicationProperties[itemIdx].type = applicationType;
            applicationProperties[itemIdx].name = applicationName;
            applicationProperties[itemIdx].id = applicationId;
            // applicationProperties[itemIdx].layerOrder = applicationId;
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
            applicationProperties[itemIdx].verticalText = verticalText;
            applicationProperties[itemIdx].rotatedTailsweep = rotatedTailsweep;

            applicationProperties[itemIdx].hasEmbellishment = hasEmbellishment;
            applicationProperties[itemIdx].inksoftDesignID = inksoftDesignID;

            applicationProperties[itemIdx].appOpacity = appOpacity;
            applicationProperties[itemIdx].appDefPatternPosition = appDefPatternPosition;
            applicationProperties[itemIdx].appDefPattern = appDefPattern;
            applicationProperties[itemIdx].appPatternProperties = appPatternProperties;

            applicationProperties[itemIdx].appCustomScale.x = $(this).parent().siblings('td').find("input[class=app-custom-scale-x]").val();
            applicationProperties[itemIdx].appCustomScale.y = $(this).parent().siblings('td').find("input[class=app-custom-scale-y]").val();

            applicationProperties[itemIdx].isFlipped = isFlipped;

            applicationProperties[itemIdx].defaultMascot = applicationMascot;

            applicationProperties[itemIdx].defaultFont = applicationFont;
            applicationProperties[itemIdx].defaultText = applicationText;
            applicationProperties[itemIdx].defaultNumber = applicationNumber;

            applicationProperties[itemIdx].colors = applicationColors;
            applicationProperties[itemIdx].accents = applicationAccents;
            applicationProperties[itemIdx].tailsweeps = applicationTailsweep;

            applicationProperties[itemIdx].topLeft.xp = ((topLeftX / canvasFront.width) * 100) * multiplier;
            applicationProperties[itemIdx].topLeft.yp = ((topLeftY / canvasFront.height) * 100) * multiplier;
            applicationProperties[itemIdx].topRight.xp = ((topRightX / canvasFront.width) * 100) * multiplier;
            applicationProperties[itemIdx].topRight.yp = ((topRightY / canvasFront.height) * 100) * multiplier;
            applicationProperties[itemIdx].bottomLeft.xp = ((bottomLeftX / canvasFront.width) * 100) * multiplier;
            applicationProperties[itemIdx].bottomLeft.yp = ((bottomLeftY / canvasFront.height) * 100) * multiplier;
            applicationProperties[itemIdx].bottomRight.xp = ((bottomRightX / canvasFront.width) * 100) * multiplier;
            applicationProperties[itemIdx].bottomRight.yp = ((bottomRightY / canvasFront.height) * 100) * multiplier;

            applicationProperties[itemIdx].width = thisGroup.getWidth() * multiplier;
            applicationProperties[itemIdx].height = thisGroup.getHeight() * multiplier;
            applicationProperties[itemIdx].widthp = ((thisGroup.getWidth() / canvasFront.width) * 100) * multiplier;
            applicationProperties[itemIdx].heightp = ((thisGroup.getHeight() / canvasFront.height) * 100) * multiplier;
            applicationProperties[itemIdx].pivot = thisGroup.getCenterPoint();
            applicationProperties[itemIdx].pivot.x = $(this).parent().siblings('td').find("input[class=app-x]").val();
            applicationProperties[itemIdx].pivot.y = $(this).parent().siblings('td').find("input[class=app-y]").val();
            applicationProperties[itemIdx].rotation = thisGroup.getAngle();

            if(applicationProperties[itemIdx].rotation != rotation_val){
               applicationProperties[itemIdx].rotation = rotation_val;
            }

            var tx = parseFloat(applicationProperties[itemIdx].pivot.x);
            var ty = parseFloat(applicationProperties[itemIdx].pivot.y);

            applicationProperties[itemIdx].center.x = ( tx + 3 ) * multiplier;
            applicationProperties[itemIdx].center.y = ( ty ) * multiplier;

            applicationProperties[itemIdx].pivot.x = applicationProperties[itemIdx].pivot.x * multiplier;
            applicationProperties[itemIdx].pivot.y = applicationProperties[itemIdx].pivot.y * multiplier;


            try{
                if(cs == 1){
                    $(this).parent().siblings('td').find("input[class=app-x]").val(applicationProperties[itemIdx].pivot.x);
                    $(this).parent().siblings('td').find("input[class=app-y]").val(applicationProperties[itemIdx].pivot.y);
                    $(this).val(thisGroup.getAngle());
                } else {
                    applicationProperties[itemIdx].rotation = rotation_val;
                }
            } catch(err){

            }
            cx++;
            canvasFront.renderAll();
        });

        var appProperties = JSON.stringify(applicationProperties);

        appProperties = '"'+appProperties+'"';

        $('#a-application-properties').val(appProperties);
        window.ap = appProperties;
    }


    function accentMascotSelect(data,accentMascot,rowIndex) {
        var layers;
        var colorCode = $(".app-colors").eq(rowIndex).val().split(',');
        var colorCodeField = "";

        if (accentMascot == "accent") {
            layers = ((data.selectedData).layers) - 2;
        } else {
            layers = data.layers;
        }

        for (var i = 0; i < layers; i++) {
            if (colorCode[i]) {
                if (colorCodeField) {
                    colorCodeField = colorCodeField +","+colorCode[i];
                } else {
                    colorCodeField = colorCode[i];
                }
            } else {
                if (colorCodeField) {
                    colorCodeField = colorCodeField + "," + window.colors[0].color_code;
                } else {
                    colorCodeField = window.colors[0].color_code;
                }
            }
        }

        $(".app-colors").eq(rowIndex).val(colorCodeField);
        $(".colorSelection").eq(rowIndex).empty();
        $.each(colorCodeField.split(','), function (intIndex, objValue) {
            $(".colorSelection").eq(rowIndex).append( "<select class='accentLayerColors form-control' ></select>");

            jQuery.each(window.colors, function(index, item) {
                $(".accentLayerColors").append( "<option value="+item.web_hex_code+" data-color-code="+item.color_code+" data-color-id="+ item.id +"  style='background:#"+item.web_hex_code+"'>"+ item.color_alias +"</option>")
            });

            $(".colorSelection").eq(rowIndex).find("select.accentLayerColors").eq(intIndex).find("option").filter(function() {
                return $(this).data("color-code") == objValue;
            }).prop('selected', true);

            $(".colorSelection").eq(rowIndex).find("select.accentLayerColors").eq(intIndex).css("background","#" + $(".colorSelection").eq(rowIndex).find("select.accentLayerColors").eq(intIndex).val())
        });
    }

    $(document).on('click', '.material-options-Checkbox,.multiple-options-Checkbox', function() {
        if ($(this).is(':checked')) {
            $($(this).data("checkboxselected")).prop('checked', true);
        } else {
            $($(this).data("checkboxselected")).prop('checked', false);
        }
    });

    $(document).on('change', '.app-def-item', function() {
        var subject = $(this).val();
        
        subject = subject.replace(/_/g, ' ');

        function capitalizeFirstLetter(subject) {
            return subject.charAt(0).toUpperCase() + subject.slice(1);
        }

        subject = capitalizeFirstLetter(subject);

        $(".app-def-name").eq($(".app-def-item").index(this)).val(subject);
        
    });

    $(document).on('click', '.remove-row', function() {
        $(".options-row").eq($(".remove-row").index(this)).remove();
    });

    function bringingPointToFront() {
        canvas.forEachObject(function(key,obj) {
            var subjectName = "" + canvas.item(obj).name + "";

            // subjectName = jQuery.parseJSON( subjectName);
            subjectName = subjectName.substring(0,4);

            if (subjectName == "Line") {
                // canvas.sendToBack(canvas.item(obj));

                canvas.item(obj).evented = false;
                canvas.item(obj).selectable = false;
            } else if (subjectName != "unde") {
                // canvas.sendToFront(canvas.item(obj));
                canvas.item(obj).evented = true;
                canvas.item(obj).selectable = true;
            }

           // canvas.item(obj).visible = false;
        });
        canvas.renderAll();
    }



    $(document).on('click','select.load-boundaries-template',function() {
        var str2 = $("#filter_boundary").val().toLowerCase();
        str2 = str2.split(' ');

        $(".load-boundaries-template option").hide();

        $.each(str2, function(index, value) {
           $(".load-boundaries-template option").each(function(index) {
              var str1 = $( this ).text().toLowerCase();

                if(str1.indexOf(value) != -1){
                    $(this).show();
                }
            });
        });
    });

    $(document).on('click','.load-applications-template',function() {
        var str2 = $("#filter_app_template").val();
        str2 = str2.split(' ');

        $(".load-applications-template option").hide();

        $.each(str2, function(index, value) {
           $(".load-applications-template option").each(function(index) {
                var str1 = $( this ).text().toLowerCase();

                if (str1.indexOf(value) != -1) {
                    $(this).show();
                }
            });
        });
    });

    // $(document).on('click', '.app-default-font', function() {
    //     var Sports = $("#material_uniform_category").val();
    //     $(".app-default-font option").hide();
    //     $(this).find("option:first-child").show();

    //     $(this).find("option").each(function(index) {
    //         var stringSport = JSON.stringify($(this).data("sport"));
    //         stringSport = "" + stringSport + "";

    //         if (stringSport.indexOf(Sports) > -1) {
    //             $(this).show();
    //         }
    //     });
    // });

    $('.export_material_prop').on('click', function() {
        var bp_id =   $('.export_block_pattern_id :selected').val();
        var material_prop = $('#material_props_data').text();
        var url = "//" + api_host + "/api/block_pattern/update";
        var data = JSON.stringify({id: bp_id, material_reference_properties: material_prop});

        $.ajax({
           url: url,
           type: "POST",
           data: data,
           dataType: "json",
           crossDomain: true,
           contentType: 'application/json',
           headers: {"accessToken": atob(headerValue)},
           success: function(response) {
                if (response.success) {
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

    $(document).on('change', '.mascotFilter', function () {
        keyword = $(this).val();
        var mascotDropdown = $(this).next('.app-default-mascot');

        var url = "//" + api_host + "/api/mascots/get_mascot_by_name_or_code/" + keyword;

        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data) {
                $.each(data.mascots, function(i, item) {
                    item['text'] = item.name;
                    item['value'] = item.id;
                    item['selected'] = false;

                    var c = 0;

                    var xdata = JSON.parse(item.layers_properties);

                    $.each(xdata, function(i, item) {
                        c++;
                    });

                    item['description'] = item.category + ' [ ' + c + ' ]';
                    item['imageSrc'] = item.icon;
                    item['layers'] = c ;
                });

                mascotDropdown.find('option').remove();

                mascotDropdown.append("<option value='' data-image='' data-description=''>None</option>");

                for (var index = 0; index < data.mascots.length; index++) {
                    var mascot = data.mascots[index];

                    var option = "<option value='" + mascot.value + "' data-image='" + mascot.imageSrc + "' data-description='" + mascot.description + "'>";
                        option += mascot.text
                        option += "</option>";

                    mascotDropdown.append(option);
                }

                mascotDropdown.select2({
                    width: '300px',
                    templateResult: formatState,
                    templateSelection: formatState,
                    minimumResultsForSearch: -1
                });

                mascotDropdown.change(function() {
                    var id = $(this).val();
                    var rowIndex = $(this).data('id');

                    var mascotData = data.mascots.filter(function(mascot) {
                        return mascot.id == id;
                    });

                    accentMascotSelect(mascotData, 'mascot', rowIndex);
                });
            }
        });
    });

    function formatState(state) {
        var element = $(state.element);

        if (! state.id) {
            return state.text;
        }

        var html = `<div class="row">
                        <div class="col-md-4">
                            <img src="` + element.data('image') + `" style="width: 100%;">
                        </div>

                        <div class="col-md-8">
                            <strong>` + state.text +`</strong><br> ` + element.data('description') + `
                        </div>
                    </div>`;

        var $state = $(html);

        return $state;
    }
});
