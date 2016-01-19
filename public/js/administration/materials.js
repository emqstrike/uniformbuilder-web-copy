$(document).ready(function() {

    var materialOptions = {};
    materialOptions['front'] = {};
    materialOptions['back'] = {};
    materialOptions['left'] = {};
    materialOptions['right'] = {};

    $(document).on('change', function() {
        var length = $('.options-row').length;
        renumberRows(length);
    });

    $( "tbody" ).disableSelection();
    $( "tbody" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            var length = $('.options-row').length;
            $(".options-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length = length-1;
            });
            var newLength = $('.options-row').length;
            renumberRows(newLength);
        }
    });

    $(document).on('click', '.clone-row', function() {
        var length = $('.options-row').length;
        $(".options-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length = length-1;
        });
        var newLength = $('.options-row').length;
        renumberRows(newLength);
    });

    $("#material-option-name").keyup(function() {
        checkNameLength();
    });

    $(document).on('change', '.setting-types,.perspective,#file-src,#layer-level,.gradients,.default-color,.origin,.colors', function() {
        updateCoordinates();
    });

    $('a[data-toggle=popover],img[data-toggle=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'left',
        content: function(){
            return '<img src="'+$(this).data('img') + '" style="width: 200px; height: 200px; background-color: #e3e3e3;"/>';
        }
    });

    var canvasFront = this.__canvas = new fabric.Canvas('applications-front-canvas');
    canvasFront.setWidth( 496 );
    canvasFront.setHeight( 550 );

    fabric.Object.prototype.transparentCorners = false;

    var application_number = 1;

    $('#add_front_application').mousedown(function(){

        var default_item = $('#front-default-item').val();

        var area = new fabric.Rect({
            id: application_number,
            fill: '#e3e3e3',
            height: 30,
            width: 30,
            strokeWidth: 1,
            stroke: 'red',
            opacity: 0.6,
            originX: 'center',
            originY: 'center'
        });

        var appID = new fabric.IText(application_number.toString(),{
            fontFamily: 'arial black',
            originX: 'center',
            originY: 'center',
            opacity: 0.6,
            fontSize: 11
        });

        var itemText = new fabric.IText(default_item.toString(),{
            fontFamily: 'arial black',
            originX: 'center',
            originY: 'top',
            opacity: 0.6,
            fontSize: 8
        });

        var group = new fabric.Group([ area, appID, itemText ], {
            id: area.id,
            left: canvasFront.width / 2.6,
            top: canvasFront.height / 5,
            default_item: default_item
        });

        canvasFront.add(group);
        application_number++;

        var text = $(this).val();
        var itemsArr = ["logo", "number", "team_name", "player_name"];
        var selectAppend = "<select class=\"app-def-item\">";
        var updateApplication = "<a class=\"btn btn-xs btn-success update-application\" data-id=" + canvasFront.getObjects().indexOf(group) + ">Update</a>";

        selectAppend += "<option value=" + group.default_item + ">" + group.default_item + "</option>";

        for(var i = 0; i<itemsArr.length; i++) {

            if(group.default_item != itemsArr[i]) {
                selectAppend += "<option value=" + itemsArr[i] + ">" + itemsArr[i] + "</option>";
            }

        }

        selectAppend += "</select>";

        $( ".front-applications" ).append( "<div style=\"font-size: 11px; text-align:left;\"><input type=\"text\" name=\"application_id\" value=" + group.id + " size=\"3\">" + selectAppend + updateApplication + "</div>");

        var canvasItem = "application"+group.id;

    });

var applicationProperties = {};        

    $(document).on('click', '.update-application', function() {
        var itemIdx = $(this).data('id');
        var applicationId = $(this).siblings("input[name=application_id]").val();
        var applicationType = $(this).siblings("select[class=app-def-item]").val();
        var items = canvasFront.getObjects();
        var item = items[itemIdx];

        item.id = applicationId;

        var thisGroup = canvasFront.item(itemIdx);

        thisGroup.item(1).text = applicationId;
        thisGroup.item(2).text = applicationType;

        canvasFront.setActiveObject(canvasFront.item(itemIdx));

        canvasFront.renderAll();
        updateCoordinates();
        
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
        stroke: '#222',
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

    //midLine.lockUniScaling = true;
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
        'object:moving': updateCoordinates,
        'object:scaling': updateCoordinates,
        'object:rotating': updateCoordinates,
        'mouse:up': updateCoordinates
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

    $('.clone-row').on('click', function(){
        $( ".options-row:first" ).clone().appendTo( "#options-row-container" );

        $('.mo-default-color, .mo-sublimated-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
        });

        $(".mo-options-src").change(function() {

        var elem = $(this).parent().siblings().find('.thumbnail-link');
        var elem2 = $(this).parent().siblings().find('.thumb-container');

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
        $('.material-id').prop("value", material.id);
    });

    $('.edit-material-option').on('click', function(){
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
                type: $(this).data('material-option-setting-type'),
                code: $(this).data('material-option-setting-code'),
                path: $(this).data('material-option-path'),
                perspective: $(this).data('material-option-perspective'),
                colors: $(this).data('material-option-colors'),
                gradients: $(this).data('material-option-gradients'),
                blend: ($(this).data('material-option-blend') == 'yes') ? true : false,
                boundary_properties: ($(this).data('material-option-boundary-properties')),
                applications_properties: ($(this).data('material-option-applications-properties')),
            }
        };

        $('.material-id').prop("value", material.id);
        $('.material-option-id').prop("value", material.option.id);
        $('#material-option-name').val(material.option.name);
        $('#saved-setting-type').val(material.option.type);
        $('#saved-setting-type').text(material.option.type);
        $('#saved-setting-type').attr('selected','selected');
        $('#saved-origin').val(material.option.origin);
        $('#saved-origin').text(material.option.origin);
        $('#saved-origin').attr('selected','selected');
        $('#saved-default-color').val(material.option.default_color);
        $('#saved-default-color').text(material.option.default_color);
        $('#saved-default-color').attr('selected','selected');
        $('#saved-perspective').val(material.option.perspective);
        $('#saved-perspective').text(material.option.perspective + " View");
        $('#saved-perspective').attr('selected','selected');
        $('#boundary-properties').prop("value", material.option.boundary_properties);
        $('.a-prop').prop("value", material.option.applications_properties);

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
        
        $("#shape-view").css("background-image", "url("+material_option_shape+")");
        $("#material-option-bounding-box").css("background-image", "url("+material_option_shape+")");

        $("#material-option-bounding-box-top").css("background-image", "url("+material.option.path+")");
        $("#shape-view-top").css("background-image", "url(" + material.option.path + ")");
        checkNameLength();

        var jason = $('#boundary-properties').val().replace(/\\/g, '');
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

        var appPropJson = $('.a-prop').val().replace(/\\/g, '');
        var appProp = appPropJson.substring(1, appPropJson.length-1);
        var app_properties = JSON.parse(appProp);

        $(".front-applications").remove(".apOpt");
        clearAppPropOptions();

        // ITERATE THROUGH THE JSON, AND INSERT THE APPLICATIONS

        for(c = 0; c < Object.keys(app_properties).length; c++){

            var l = "layer"+c;
            var default_item = app_properties[l].type;
            var iid = app_properties[l].id;

            if(!app_properties[l].id){
                break;
            }

            var area = new fabric.Rect({
                id: c,
                fill: '#e3e3e3',
                height: app_properties[l].height,
                width: app_properties[l].width,
                strokeWidth: 1,
                stroke: 'red',
                opacity: 0.6,
                originX: 'center',
                originY: 'center'
            });

            var appID = new fabric.IText(iid.toString(),{
                fontFamily: 'arial black',
                originX: 'center',
                originY: 'center',
                opacity: 0.6,
                fontSize: 11
            });

            var text = app_properties[l].type;
            var itemText = new fabric.IText(text.toString(),{
                fontFamily: 'arial black',
                originX: 'center',
                originY: 'top',
                opacity: 0.6,
                fontSize: 8
            });

            var group = new fabric.Group([ area, appID, itemText ], {
                id: c,
                left: app_properties[l].topLeft.x,
                top: app_properties[l].topLeft.y,
                default_item: default_item
            });

            if(app_properties[l].id != null){

                var itemsArr = ["logo", "number", "team_name", "player_name"];
                var selectAppend = "<select class=\"app-def-item\">";
                var updateApplication = "<a class=\"btn btn-xs btn-success update-application\" data-id=" + c + ">Update</a>";

                selectAppend += "<option value=\"" + app_properties[l].type + "\">" + app_properties[l].type + "</option>";

                for(var i = 0; i<itemsArr.length; i++) {

                    if(group.default_item != itemsArr[i]) {
                        selectAppend += "<option value=" + itemsArr[i] + ">" + itemsArr[i] + "</option>";
                    }

                }

                selectAppend += "</select>";

                $( ".front-applications" ).append( "<div class = \"apOpt\" style=\"font-size: 11px; text-align:left;\"><input type=\"text\" name=\"application_id\" value=" + app_properties[l].id + " size=\"3\">" + selectAppend + updateApplication + "</div>");
                canvasFront.add(group);
                var canvasItem = "application"+group.id;
                var thisGroup = group;

                thisGroup.oCoords.tl.x = app_properties[l].topLeft.x;
                thisGroup.oCoords.tl.y = app_properties[l].topLeft.y;
                thisGroup.oCoords.tr.x = app_properties[l].topRight.x;
                thisGroup.oCoords.tr.y = app_properties[l].topRight.y;
                thisGroup.oCoords.bl.x = app_properties[l].bottomLeft.x;
                thisGroup.oCoords.bl.y = app_properties[l].bottomLeft.y;
                thisGroup.oCoords.br.x = app_properties[l].bottomRight.x;
                thisGroup.oCoords.br.y = app_properties[l].bottomRight.y;
                thisGroup.centerPoint = app_properties[l].pivot;
                thisGroup.setAngle(app_properties[l].rotation);

                
                thisGroup.width = app_properties[l].width;
                thisGroup.height = app_properties[l].height;
                thisGroup.left = app_properties[l].topLeft.x;
                thisGroup.top = app_properties[l].topLeft.y;
                thisGroup.pivot = thisGroup.centerPoint;

                window.g = {};
                window.g = group;
                
                canvasFront.renderAll();

            }
            else{
                break;
            }
        }


        var boundaryProperties = JSON.stringify(data);

        $('#boundary-properties').prop('value', boundaryProperties);


        $("#file-src").prop("src", material.option.path);
        $("#layer-level").prop("value", material.option.layer_level);

        if (material.option.blend) {
            $('#is-blend').attr('checked', 'checked');
        } else {
            $('#is-blend').attr('checked', 'unchecked');
        }

        $('#saved-setting-type').attr('selected',true);
        $('#saved-perspective').attr('selected',true);
        $('#edit-material-option-modal .material-option-path').attr('src', material.option.path);
        $('#save-material-option-modal .material-id').val(material.id);
        $('#save-material-option-modal .modal-title span').html("Edit: " + material.option.name);
        $('#save-material-option-modal').modal('show');
    });

    $('.enable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/enable/";
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
                    $(elem + ' .disable-material').removeAttr('disabled');
                    $(elem + ' .enable-material').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/disable/";
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
                    $(elem + ' .enable-material').removeAttr('disabled');
                    $(elem + ' .disable-material').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
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

    function bindColorsSelect2()
    {
        $('.colors').select2({
            placeholder: "Select colors",
            multiple: true,
            allowClear: true
        });

        // $(".colors-multi-select").each(function(i) {
        //     var color = $(this).data('color');
        //     $('.select2-choice').css("background-color",color);
        //     // $('.select2-results .select2-highlighted').css("background-color",color);
        // });
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

    function renumberRows(length){
        $(".options-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".mo-layer.layer" + length;

            materialOptions.front[thisLayer] = {};
            materialOptions.front[thisLayer]['image_file'] = {};
            materialOptions.front[thisLayer]['layer'] = {};
            materialOptions.front[thisLayer]['name'] = {};
            materialOptions.front[thisLayer]['setting-type'] = {};
            materialOptions.front[thisLayer]['default_color'] = {};
            materialOptions.front[thisLayer]['sublimated_default_color'] = {};

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

            materialOptions.front[thisLayer]['name'] = $(this).find(name_class).val();
            materialOptions.front[thisLayer]['layer'] = $(this).find(layer_class).val();
            materialOptions.front[thisLayer]['image_file'] = $(this).find(src_class).val();
            materialOptions.front[thisLayer]['setting-type'] = $(this).find(type_class).val();
            materialOptions.front[thisLayer]['image_file'] = $(this).find(src_class).val();
            materialOptions.front[thisLayer]['setting-type'] = $(this).find(type_class).val();
            materialOptions.front[thisLayer]['default_color'] = $(this).find(src_class).val();
            materialOptions.front[thisLayer]['sublimated_default_color'] = $(this).find(type_class).val();

            length--;
        });
        var moProperties = JSON.stringify(materialOptions);
    }

    function updateCoordinates() {

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
        $('.b-prop').prop('value', boundaryProperties);

        $(".update-application").each(function(i) {
            // BUILD APPLICATION PROPERTIES JSON

            itemIdx = "layer"+$(this).data('id');
            layer = $(this).data('id');
            applicationType = $(this).siblings("select[class=app-def-item]").val();
            applicationId = $(this).siblings("input[name=application_id]").val();

            thisGroup = canvasFront.item(layer);

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

            applicationProperties[itemIdx].type = applicationType;
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
            applicationProperties[itemIdx].pivot = thisGroup.getCenterPoint();
            applicationProperties[itemIdx].rotation = thisGroup.getAngle();
        });
        var appProperties = JSON.stringify(applicationProperties);
        $('.a-prop').prop('value', appProperties);
        window.ap = appProperties;
    }

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

    bindColorsSelect2();
    bindGradientsSelect2();
});