$(document).ready(function(){
    $( "#file-src" ).change(function() {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;
 
        if (/^image/.test( files[0].type)){
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
 
            reader.onloadend = function(){
                $("#material-option-bounding-box").css("background-image", "url("+this.result+")");
            }
        }
    });


        var canvas = this.__canvas = new fabric.Canvas('bounding-box-canvas');
        fabric.Object.prototype.transparentCorners = false;
        canvas.setWidth( 496 );
        canvas.setHeight( 550 );

        window.shapes = {};

        var data = {
                    topLeft:   { 
                                    "x":0, 
                                    "y":0
                                },
                    topRight:   { 
                                    "x":0, 
                                    "y":0
                                },
                    bottomLeft: { 
                                    "x":0, 
                                    "y":0
                                },
                    bottomRight:{ 
                                    "x":0, 
                                    "y":0
                                },
                    pivot: 0,
                    rotation: 0,
                };

        var box = new fabric.Rect({
            width: 250, height: 250, angle: 0,
            fill: 'transparent',
            stroke: '#e3e3e3',
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
            left: canvas.width/2.6,
            top: canvas.height/5
        });

        window.shapes.bounding_box = bounding_box;

        bounding_box.transparentCorners = false;
        canvas.add(bounding_box);
        updateCoordinates();

        canvas.on({
            'object:moving': updateCoordinates,
            'object:scaling': updateCoordinates,
            'object:rotating': updateCoordinates,
            'mouse:up': updateCoordinates
        });

        function updateCoordinates() {

            circle.radius = box.height/2;

            var topLeftX                = bounding_box.oCoords.tl.x;
            var topLeftY                = bounding_box.oCoords.tl.y;
            var topRightX               = bounding_box.oCoords.tr.x;
            var topRightY               = bounding_box.oCoords.tr.y;
            var bottomLeftX             = bounding_box.oCoords.bl.x;
            var bottomLeftY             = bounding_box.oCoords.bl.y;
            var bottomRightX            = bounding_box.oCoords.br.x;
            var bottomRightY            = bounding_box.oCoords.br.y;

            canvas.renderAll();

            data.topLeft.x          = topLeftX;
            data.topLeft.y          = topLeftY;
            data.topRight.x         = topRightX;
            data.topRight.y         = topRightY;
            data.bottomLeft.x       = bottomLeftX;
            data.bottomLeft.y       = bottomLeftY;
            data.bottomRight.x      = bottomRightX;
            data.bottomRight.y      = bottomRightY;
            data.pivot              = bounding_box.getCenterPoint();
            data.rotation           = bounding_box.getAngle();

            console.log("BOOM RESULT!!! - " + data.topLeft.x);

            var boundaryProperties = JSON.stringify(data);

            $( '#boundary-properties' ).prop('value',boundaryProperties);

            console.log(boundaryProperties);
        }


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

    $('.add-material-option').on('click', function(){
        $('#form-action').attr('value','add');
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name')
        };
        $('#add-edit-material-option-modal .material-id').val(material.id);
        $('#add-edit-material-option-modal .modal-title').html("Add Material Options for: " + material.name);
        $('#add-edit-material-option-modal').modal('show');

        $('.material-id').prop("value", material.id);
        console.log($('.material-id').val());
        $('.material-option-id').val('');
        $('#material-option-name').val('');
        $('#saved-setting-type').val('');
        $('#saved-setting-type').prop("visible", false);
        $('#saved-perspective').val('');
        $('#saved-perspective').prop("visible", false);
        $('#boundary-properties').val('');
        $("#material-option-bounding-box").css("background-image", '');

    });

    $('.edit-material-option').on('click', function(){
        $('#form-action').attr('value','edit');
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            option: {
                id: $(this).data('material-option-id'),
                name: $(this).data('material-option-name'),
                layer_level: $(this).data('material-option-layer-level'),
                type: $(this).data('material-option-setting-type'),
                code: $(this).data('material-option-setting-code'),
                path: $(this).data('material-option-path'),
                perspective: $(this).data('material-option-perspective'),
                colors: $(this).data('material-option-colors'),
                gradients: $(this).data('material-option-gradients'),
                blend: ($(this).data('material-option-blend') == 'yes') ? true : false,
                boundary_properties: ($(this).data('material-option-boundary-properties'))
            }
        };

        var type = capitalize(material.option.type);
        var perspective = capitalize(material.option.perspective);

        $('.material-id').prop("value", material.id);
        $('.material-option-id').prop("value", material.option.id);
        $('#material-option-name').val(material.option.name);
        $('#saved-setting-type').val(material.option.type);
        $('#saved-setting-type').text(type);
        $('#saved-perspective').val(material.option.perspective);
        $('#saved-perspective').text(perspective + " View");
        $('#boundary-properties').prop("value", material.option.boundary_properties);

        var jason = $('#boundary-properties').val().replace(/\\/g, '');
        var output = jason.substring(1, jason.length-1);
        var myData = JSON.parse(output);

        bounding_box.oCoords.tl.x   = myData.topLeft.x;
        bounding_box.oCoords.tl.y   = myData.topLeft.y;
        bounding_box.oCoords.tr.x   = myData.topRight.x;
        bounding_box.oCoords.tr.y   = myData.topRight.y;
        bounding_box.oCoords.bl.x   = myData.bottomLeft.x;
        bounding_box.oCoords.bl.y   = myData.bottomLeft.y;
        bounding_box.oCoords.br.x   = myData.bottomRight.x;
        bounding_box.oCoords.br.y   = myData.bottomRight.y;
        bounding_box.centerPoint    = myData.pivot;
        bounding_box.angle          = myData.rotation;

        
        bounding_box.width = myData.topRight.x - myData.topLeft.x;
        bounding_box.height = myData.bottomLeft.y - myData.topLeft.y;
        box.width = myData.topRight.x - myData.topLeft.x;
        box.height = myData.bottomLeft.y - myData.topLeft.y;
        bounding_box.left = myData.topLeft.x;
        bounding_box.top = myData.topLeft.y;

        canvas.renderAll();

        var boundaryProperties = JSON.stringify(data);

        $( '#boundary-properties' ).prop('value',boundaryProperties);


        $("#file-src").prop("src", material.option.path);
        $("#layer-level").prop("value", material.option.layer_level);
        $("#material-option-bounding-box").css("background-image", "url(" + material.option.path + ")");

        if (material.option.blend) {
            $('#is-blend').attr('checked', 'checked');
            console.log('checked');
        } else {
            $('#is-blend').attr('checked', 'unchecked');
            console.log('unchecked');
        }


        function capitalize(c)
        {
            return c[0].toUpperCase() + c.slice(1);
        }

        $('#saved-setting-type').attr('selected',true);
        $('#saved-perspective').attr('selected',true);
        console.log("TYPE: " + material.option.type);
        $('#edit-material-option-modal .material-option-path').attr('src', material.option.path);
        
        console.log(material.option.blend);        

        $('#add-edit-material-option-modal .material-id').val(material.id);
        $('#add-edit-material-option-modal .modal-title span').html("Edit: " + material.option.name);
        $('#add-edit-material-option-modal').modal('show');

        console.log($('#form-action').val());
        console.log($('.material-id').val());

        console.log(material.option.colors);
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-material').removeAttr('disabled');
                    $(elem + ' .enable-material').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                    flashAlertFadeOut();
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .enable-material').removeAttr('disabled');
                    $(elem + ' .disable-material').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                    flashAlertFadeOut();
                }
            }
        });
    });

    // DELETE MATERIAL
    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm(
            'Remove Material',
            'Are you sure you want to delete the Material?',
            id
        );
    });

    // DELETE MATERIAL OPTION
    $('.delete-material-option').on('click', function(){
        var id = $(this).data('material-option-id');
        modalConfirm(
            'Remove Material Option',
            'Are you sure you want to delete the Material Option?',
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
                    $('.flash-alert').hide();
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal').modal('hide');
                    $('.material-' + id).fadeOut();
                    flashAlertFadeOut();
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
                    $('.flash-alert').hide();
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal-material-option').modal('hide');
                    $('.material-option-' + id).fadeOut();
                    flashAlertFadeOut();
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

    // Delete Material Image
    $('.delete-material-image').on('click', function(){
        var id = $(this).data('material-id');console.log(id);
        var field = $(this).data('field');console.log(field);
        $('#confirmation-modal .confirm-delete-field').data('field', field);
        modalConfirm('Remove pattern', 'Are you sure you want to delete this image?', id, 'confirm-delete-field');
    });

    // Delete Layer
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
    }

    function bindGradientsSelect2()
    {
        $('.gradients').select2({
            placeholder: "Select gradients",
            multiple: true,
            allowClear: true
        });
    }

    bindColorsSelect2();
    bindGradientsSelect2();
});