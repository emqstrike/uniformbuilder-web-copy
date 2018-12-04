$(document).ready(function(){

    try {
        $('.autosized').autosize({append: "\n"});
    } catch(err){
        console.log(err.message);
    }

    $('.part-and-fabrics .fabrics').select2({
        data: JSON.parse($('#fabrics-list').val()),
        multiple: true,
        allowClear: true
    });

    var layers_properties = {};

    $(document).on('click', '.clone-row', function() {
        var colors = $('#layers-row-container').data('colors');

        var coordinatingColorDropdown = "<select class='coordinating-colors'>";
        var limitedColorsDropdown = "<select class='limited-color'>";

        $.each(colors, function(key, value) {
            if (value.active == true) {
                coordinatingColorDropdown += "<option value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                limitedColorsDropdown += "<option value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
            }
        });

        coordinatingColorDropdown += "</select>";
        limitedColorsDropdown += "</select>";

        var elem = `<tr class="layers-row">
            <td>
                <input type="text" class="neck-option-name form-control layer1" name="neck_option_name[]">
            </td>
            <td>
                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
            </td>
            <td>
                <input type="file" class="neck-option-file layer1" name="neck_option_image[]">
            </td>
            <td>
                <input type="text" class="neck-option-alias layer1" name="neck_option_alias[]">
            </td>
            <td>
                <textarea class="neck-option-placeholder-overrides form-control layer1" name="neck_option_placeholder_overrides"  autosized></textarea>
            </td>

            <td>
                <div style="margin-bottom: 10px;">
                    <button class="btn btn-xs btn-flat btn-success clone-coordinating-color">
                        <span class="fa fa-plus"></span>
                    </button>
                </div>

                <div class="coordinating-colors-column">
                    <div class="coordinating-colors-container">
                        <div class="row">
                            <div class="col-md-12">
                                <input type="text" class="coordinating-colors-name" placeholder="Name">
                                ` + coordinatingColorDropdown + coordinatingColorDropdown + `
                            </div>
                        </div>

                        <div style='border-top: 1px solid rgba(0, 0, 0, .1); margin-top: 10px; padding-top: 10px;'>
                            <button class="btn btn-xs btn-flat btn-danger remove-coordinating-color" style="display: none;">
                                Remove row
                            </button>
                        </div>
                    </div>
                </div>
            </td>

            <td>
               <div style="margin-bottom: 10px;">
                    <button class="btn btn-xs btn-flat btn-success clone-limited-color">
                        <span class="fa fa-plus"></span>
                    </button>
                </div>

                <div class="limited-colors-column">
                    <div class="limited-colors-container">
                        <div class="row">
                            <div class="col-md-12">
                                <input type="text" class="limited-colors-name layer" placeholder="Name">

                                <div style="margin: 15px 0;">
                                    <button class='btn btn-xs btn-flat btn-primary add-limited-color'>Add color</button>
                                </div>

                                <div class='limited-color-row'>
                                    <div class='row'>
                                        <div class='col-md-10'>
                                            ` + limitedColorsDropdown + `
                                        </div>

                                        <div class='col-md-1'>
                                            <button class='btn btn-xs btn-flat btn-success remove-limited-color' style='display: none;'><span class='fa fa-minus'></span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style='border-top: 1px solid rgba(0, 0, 0, .1); margin-top: 10px; padding-top: 10px;'>
                            <button class="btn btn-xs btn-flat btn-danger remove-limited-color-row" style="display: none;">
                                Remove row
                            </button>
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <a class="btn btn-flat btn-danger btn-xs btn-remove-option"><i class="fa fa-remove"></i> Remove</a>
            </td>
        </tr>`;

        $('#layers-row-container').append(elem);
        var length = $('.layers-row').length;
        updater();
        updateJSON(length, 1);
    });

    $(document).on('change', 'input', function() {
        updater();
    });

    updater();
    function updater(edit){
        $('.neck-option-name, .neck-option-placeholder-overrides, .neck-option-alias').keyup(function(){
            var length = $('.layers-row').length;
            updateJSON(length, edit);
        });
    }

    $('body').on('click', '.delete-block-pattern', function(){
        var id = $(this).data('block-pattern-id');
        modalConfirm('Remove Block Pattern', 'Are you sure you want to delete the block pattern?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){

        var id = $(this).data('value');
        var url = "//" + api_host + "/api/block_pattern/delete/";

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
                    $('.block-pattern-' + id).fadeOut();
                }
            }
        });
    });

    function updateJSON(length, edit) {
        layers_properties = {};
        var ctr = 1;

        $(".layers-row").each(function(i) {

            if(ctr <= length){
                var thisLayer = "layer"+ctr;

                layers_properties[ctr] = {};
                layers_properties[ctr]['name'] = {};
                layers_properties[ctr]['thumbnail_path'] = {};
                layers_properties[ctr]['alias'] = {};
                layers_properties[ctr]['placeholder_overrides'] = {};
                layers_properties[ctr]['coordinating_colors'] = {};
                layers_properties[ctr]['limited_colors'] = {};

                $(this).find('.neck-option-name').removeClass().addClass("neck-option-name");
                $(this).find('.neck-option-name').addClass(thisLayer);
                var name_class = ".neck-option-name.layer" + ctr;
                $(this).find(name_class).addClass('neck-option-name');

                $(this).find('.neck-option-file').removeClass().addClass("neck-option-file");
                $(this).find('.neck-option-file').addClass(thisLayer);
                var file_class = ".neck-option-file.layer" + ctr;
                $(this).find(file_class).addClass('neck-option-file');

                $(this).find('.neck-option-alias').removeClass().addClass('neck-option-alias');
                $(this).find('.neck-option-alias').addClass(thisLayer);
                var alias_class = '.neck-option-alias.layer' + ctr;
                $(this).find(alias_class).addClass('neck-option-alias');

                $(this).find('.neck-option-placeholder-overrides').removeClass().addClass("neck-option-placeholder-overrides");
                $(this).find('.neck-option-placeholder-overrides').addClass(thisLayer);
                var placeholder_class = ".neck-option-placeholder-overrides.layer" + ctr;
                $(this).find(placeholder_class).addClass('neck-option-placeholder-overrides');

                $(this).find('.neck-option-existing-file').removeClass().addClass('neck-option-existing-file');
                $(this).find('.neck-option-existing-file').addClass(thisLayer);

                $(this).find('.coordinating-colors-container')
                       .removeClass()
                       .addClass('coordinating-colors-container')
                       .addClass(thisLayer);

                $(this).find('.coordinating-colors')
                       .removeClass()
                       .addClass('coordinating-colors')
                       .addClass(thisLayer);

                $(this).find('.limited-colors-container')
                       .removeClass()
                       .addClass('limited-colors-container')
                       .addClass(thisLayer);

                $(this).find('.limited-color')
                       .removeClass()
                       .addClass('limited-color')
                       .addClass(thisLayer);

                var existing_file_class = ".neck-option-existing-file.layer" + ctr;

                layers_properties[ctr]['name'] = $(this).find(name_class).val();
                layers_properties[ctr]['placeholder_overrides'] = $(this).find(placeholder_class).val();
                layers_properties[ctr]['alias'] = $(this).find(alias_class).val();
                layers_properties[ctr]['thumbnail_path'] = $(this).find(existing_file_class).val();

                var coordinatingColors = [];

                var limitedColors = [];
                var limitedColorsObject = {};

                $('.coordinating-colors-container.layer' + ctr).each(function(key, val) {
                    var colors = [];
                    var coordinatingColorsObject = {};

                    coordinatingColorsObject.name = $(this).find('.coordinating-colors-name').val();

                    $(this).find('.coordinating-colors').each(function(key, val) {
                        colors.push($(this).val());
                    });

                    coordinatingColorsObject.colors = colors;
                    coordinatingColors.push(coordinatingColorsObject);
                });

                $('.limited-colors-container.layer' + ctr).each(function(key, val) {
                    var limitedColorsObject = {};
                    var colors = [];

                    limitedColorsObject.name = $(this).find('.limited-colors-name').val();
                    
                    $(this).find('.limited-color').each(function(key, val) {
                        colors.push($(this).val());
                    });

                    limitedColorsObject.color = colors;
                    limitedColors.push(limitedColorsObject);
                });

                layers_properties[ctr]['coordinating_colors'] = coordinatingColors;
                layers_properties[ctr]['limited_colors'] = limitedColors;
            }
            
            ctr++;
            $('.btn-remove-option').on('click', function(){
                $(this).parent().parent().remove();
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });
        });

        var layersProperties = JSON.stringify(layers_properties);
        $('#neck_options').val(layersProperties);

        console.log(layers_properties);
    }


    if( $( ".layers-row" ) ){
        try{
            buildLayers();
        } catch(err){
            console.log('failed to build layers');
        }
    }

    function buildLayers() {
        neck_options = $('#neck_options').val();
        var data = JSON.parse(neck_options);

        var length = Object.keys(data).length;
        var x = 1;

        var colors = $('#layers-row-container').data('colors');

        while(x <= length) {
            updater(1);

            var open            = '<tr class="layers-row">';
            var existing_file   = '<input type="hidden" name="neck_option_existing_file[]" class="neck-option-existing-file layer' + x + '" value="' + data[x].thumbnail_path + '">';
            var name            = '<td><input type="text" class="neck-option-name form-control layer' + x + '" value="' + data[x].name + '" name="neck_option_name[]"></td>';
            var file            = '<td><input type="file" class="neck-option-file layer' + x + '" name="neck_option_image[]"></td>';
            var thumbnail       = '<td><img src="' + data[x].thumbnail_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" name="image-existing-source" value="' + data[length]['filename'] + '"></td>';
            var alias           = '<td><input type="text" class="neck-option-alias layer' + x + '" name="neck_option_alias[]" value="' + data[x].alias + '"></td>'
            var placeholder     = '<td><textarea class="neck-option-placeholder-overrides form-control layer" name="neck_option_placeholder_overrides"  autosized>'+ data[x].placeholder_overrides +'</textarea></td>';

            var coordinatingColors = "<td>";
                coordinatingColors += "<div style='margin-bottom: 10px;'>";
                    coordinatingColors += "<button class='btn btn-xs btn-flat btn-success clone-coordinating-color'><span class='fa fa-plus'></span></button>";
                coordinatingColors += "</div>";

                coordinatingColors += "<div class='coordinating-colors-column'>";
                    if (data[x].coordinating_colors == undefined) {
                        coordinatingColors += "<div class='coordinating-colors-container layer" + x + "'>";
                            coordinatingColors += "<div class='row'>";
                                coordinatingColors += "<div class='col-md-12'>";
                                    coordinatingColors += "<input type='text' class='coordinating-colors-name layer1" + x + "' placeholder='Name'>";

                                    for (var counter = 1; counter <= 2; counter++) {
                                        coordinatingColors += "<select class='coordinating-colors layer" + x + "'>";
                                            $.each(colors, function(key, value) {
                                                coordinatingColors += "<option value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                                            });
                                        coordinatingColors += "</select>";
                                    }
                                coordinatingColors += "</div>";
                            coordinatingColors += "</div>";

                            coordinatingColors += "<div style='border-top: 1px solid rgba(0, 0, 0, .1); margin-top: 10px; padding-top: 10px;'>";
                                coordinatingColors += "<button class='btn btn-xs btn-flat btn-danger remove-coordinating-color pull-right' style='display: none;'><span class='fa fa-remove'></span></button>";
                            coordinatingColors += "</div>";
                        coordinatingColors += "</div>";
                    } else {
                        $.each(data[x].coordinating_colors, function(key, value) {
                            coordinatingColors += "<div class='coordinating-colors-container layer" + x + "'>";
                                coordinatingColors += "<div class='row'>";
                                    coordinatingColors += "<div class='col-md-12'>";
                                        coordinatingColors += "<input type='text' class='coordinating-colors-name layer" + x + "' value='" + value.name + "'>";

                                        $.each(value.colors, function(key, colorCode) {
                                            coordinatingColors += "<select class='coordinating-colors layer" + x +"'>";
                                                $.each(colors, function(key, value) {
                                                    if (colorCode == value.color_code) {
                                                        coordinatingColors += "<option selected value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                                                    } else {
                                                        coordinatingColors += "<option value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                                                    }
                                                });
                                            coordinatingColors += "</select>";
                                        });
                                    coordinatingColors += "</div>";
                                coordinatingColors += "</div>";
                                
                                coordinatingColors += "<div style='border-top: 1px solid rgba(0, 0, 0, .1); margin-top: 10px; padding-top: 10px;'>";
                                    if (key == 0) {
                                        coordinatingColors += "<button class='btn btn-xs btn-flat btn-danger remove-coordinating-color' style='display: none;'>Remove row</button>";
                                    } else {
                                        coordinatingColors += "<button class='btn btn-xs btn-flat btn-danger remove-coordinating-color'>Remove row</button>";
                                    }
                                coordinatingColors += "</div>";
                            coordinatingColors += "</div>";
                        });
                    }
                coordinatingColors += "</div>";
            coordinatingColors += "</td>";
                      

            var limitedColors = "<td>";
                limitedColors += "<div style='margin-bottom: 10px;'>";
                    limitedColors += "<button class='btn btn-xs btn-flat btn-success clone-limited-color'><span class='fa fa-plus'></span></button>";
                limitedColors += "</div>";

                limitedColors += "<div class='limited-colors-column'>";
                    console.log(data[x].limited_colors);
                    if (data[x].limited_colors == undefined) {
                        limitedColors += "<div class='limited-colors-container layer" + x + "'>";
                            limitedColors += "<div class='row'>";
                                limitedColors += "<div class='col-md-12'>";
                                    limitedColors += "<input type='text' class='limited-colors-name layer" + x + "' placeholder='Name'>";

                                    limitedColors += "<div style='margin: 15px 0;'>";
                                        limitedColors += "<button class='btn btn-xs btn-flat btn-primary add-limited-color'>Add color</button>";
                                    limitedColors += "</div>";

                                    limitedColors += "<div class='limited-color-row'>";
                                        limitedColors += "<div class='row'>";
                                            limitedColors += "<div class='col-md-10'>";
                                                limitedColors += "<select class='limited-color layer" + x +"'>";
                                                    $.each(colors, function(key, value) {
                                                        limitedColors += "<option value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                                                    });
                                                limitedColors += "</select>";
                                            limitedColors += "</div>";

                                            limitedColors += "<div class='col-md-1'>";
                                                limitedColors += "<button class='btn btn-xs btn-flat btn-success remove-limited-color' style='display: none;'><span class='fa fa-minus'></span></button>";
                                            limitedColors += "</div>";
                                        limitedColors += "</div>";
                                    limitedColors += "</div>";
                                limitedColors += "</div>";

                                limitedColors += "<div class='col-md-1'>";
                                    limitedColors += "<button class='btn btn-xs btn-flat btn-danger remove-limited-color pull-right' style='display: none;'><span class='fa fa-remove'></span></button>";
                                limitedColors += "</div>";
                            limitedColors += "</div>";

                            limitedColors += "<div style='border-top: 1px solid rgba(0, 0, 0, .1); margin-top: 10px; padding-top: 10px;'>";
                                limitedColors += "<button class='btn btn-xs btn-flat btn-danger remove-limited-color-row' style='display: none;'>Remove row</button>";
                            limitedColors += "</div>";
                        limitedColors += "</div>";
                    } else {
                        $.each(data[x].limited_colors, function(key, value) {
                            limitedColors += "<div class='limited-colors-container layer" + x + "'>";
                                limitedColors += "<div class='row'>";
                                    limitedColors += "<div class='col-md-12'>";
                                        limitedColors += "<input type='text' class='limited-colors-name layer" + x + "' value='" + value.name + "'>";

                                        limitedColors += "<div style='margin: 15px 0;'>";
                                            limitedColors += "<button class='btn btn-xs btn-flat btn-primary add-limited-color'>Add color</button>";
                                        limitedColors += "</div>";

                                        $.each(value.color, function(key, colorCode) {
                                            limitedColors += "<div class='limited-color-row'>";
                                                limitedColors += "<div class='row'>";
                                                    limitedColors += "<div class='col-md-10'>";
                                                        limitedColors += "<select class='limited-color layer" + x +"'>";
                                                            $.each(colors, function(key, value) {
                                                                if (colorCode == value.color_code) {
                                                                    limitedColors += "<option selected value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                                                                } else {
                                                                    limitedColors += "<option value='" + value.color_code + "' style='background: #" + value.hex_code + "; color: #ffffff;'>" + value.name + "</option>";
                                                                }
                                                            });
                                                        limitedColors += "</select>";
                                                    limitedColors += "</div>";

                                                    limitedColors += "<div class='col-md-1'>";
                                                        if (key == 0) {
                                                            limitedColors += "<button class='btn btn-xs btn-flat btn-success remove-limited-color' style='display: none;'><span class='fa fa-minus'></span></button>";
                                                        } else {
                                                            limitedColors += "<button class='btn btn-xs btn-flat btn-success remove-limited-color'><span class='fa fa-minus'></span></button>";
                                                        }
                                                    limitedColors += "</div>";
                                                limitedColors += "</div>";
                                            limitedColors += "</div>";
                                        });
                                    limitedColors += "</div>";
                                limitedColors += "</div>";
                                
                                limitedColors += "<div style='border-top: 1px solid rgba(0, 0, 0, .1); margin-top: 10px; padding-top: 10px;'>";
                                    if (key == 0) {
                                        limitedColors += "<button class='btn btn-xs btn-flat btn-danger remove-limited-color-row' style='display: none;'>Remove row</button>";
                                    } else {
                                        limitedColors += "<button class='btn btn-xs btn-flat btn-danger remove-limited-color-row'>Remove row</button>";
                                    }
                                limitedColors += "</div>";
                            limitedColors += "</div>";
                        });
                    }
                limitedColors += "</div>";
            limitedColors += "</td>";

            var remove          = '<td><a class="btn btn-flat btn-danger btn-xs btn-remove-option"><i class="fa fa-remove"></i> Remove</a></td>';
            var close           = '<tr>';

            if (! data[x].thumbnail_path) {
                thumbnail = '<td><img src="https://via.placeholder.com/30x30?text=."><input type="hidden" name="image-existing-source" value="' + data[length]['filename'] + '"></td>';
            }

            $('#layers-row-container').append( open + name + existing_file + thumbnail + file + alias + placeholder + coordinatingColors + limitedColors + remove + close );
            x++;

            $('.btn-remove-option').on('click', function(){
                $(this).parent().parent().remove();
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-name').keyup(function(){
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-alias').keyup(function(){
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-placeholder-overrides').keyup(function(){
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });
        }
    }

    $('.toggle-block-pattern').on('click', function() {
        var id = $(this).data('block-pattern-id');
        var url = "//" + api_host + "/api/block_pattern/toggle/";

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
                    console.log(response.message);
                }
            }
        });
    });

    $('body').on('click', '.clone-coordinating-color', function(e) {
        e.preventDefault();

        var row = $(this).closest('.layers-row');
        var colors = row.find('.coordinating-colors-container:last').clone();

        if (row.find('.coordinating-colors-container').length > 0) {
            colors.find('.remove-coordinating-color').removeAttr('style');
        }

        colors.find('.coordinating-colors-name').val('');
        row.find('.coordinating-colors-column').append(colors);

        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('click', '.remove-coordinating-color', function(e) {
        e.preventDefault();

        $(this).closest('.coordinating-colors-container').remove();

        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('click', '.clone-limited-color', function(e) {
        e.preventDefault();

        var row = $(this).closest('.layers-row');
        var colors = row.find('.limited-colors-container:last').clone();

        if (row.find('.limited-colors-container').length > 0) {
            colors.find('.remove-limited-color-row').removeAttr('style');
        }

        colors.find('.limited-color-row:not(:first)').remove();
        colors.find('.limited-colors-name').val('');
        row.find('.limited-colors-column').append(colors);

        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('click', '.add-limited-color', function(e) {
        e.preventDefault();

        var row = $(this).closest('.limited-colors-container');
        var clonedDropdown = row.find('.limited-color-row:last').clone();
        row.find('.col-md-12').append(clonedDropdown);

        if (row.find('.limited-color-row').length > 0) {
            clonedDropdown.find('.remove-limited-color').removeAttr('style');
        }

        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('click', '.remove-limited-color-row', function(e) {
        e.preventDefault();

        $(this).closest('.limited-colors-container').remove();

        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('click', '.remove-limited-color', function(e) {
        e.preventDefault();

        $(this).closest('.limited-color-row').remove();

        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('change', '.coordinating-colors', function() {
        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('change', '.limited-color', function() {
        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('keypress', '.limited-colors-name', function() {
        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('body').on('keypress', '.coordinating-colors-name', function() {
        var length = $('.layers-row').length;
        updateJSON(length, 1);
    });

    $('.clone-parts-and-fabrics').click(function(e) {
        e.preventDefault();

        $('.part-and-fabrics .fabrics').select2('destroy');

        var cloned = $('.part-and-fabrics').first().clone(true);

        cloned.find('.fabrics option').remove();
        cloned.find('.name').val('');
        cloned.find('.part-fabrics-field').val('');

        $('#part-and-fabrics-container').append(cloned);

        $('.part-and-fabrics .fabrics').each(function() {
            $(this).removeAttr('data-select2-id').select2();
        });

        if ($('.part-and-fabrics').length > 1) {
            cloned.find('.remove-parts-and-fabric').removeAttr('style');
        }

        $('.part-and-fabrics .fabrics').select2({
            data: JSON.parse($('#fabrics-list').val()),
            multiple: true,
            allowClear: true
        });
    });

    $('.remove-parts-and-fabric').click(function(e) {
        e.preventDefault();

        $(this).closest('.part-and-fabrics').remove();
    });

    $('body').on('change', '.part-and-fabrics .fabrics', function() {
        var field = $(this).prev('.part-fabrics-field');
        field.val($(this).val());
    });
});
