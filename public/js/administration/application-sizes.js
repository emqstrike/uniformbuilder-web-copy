$(document).ready(function(){

    if( $('#old_properties').val() ) {
        var data = JSON.parse($('#old_properties').val());
        loadConfigurations(data);
    }

    window.app_types = ['team_name', 'player_name', 'front_number', 'back_number', 'shoulder_number', 'sleeve_number', 'mascot', 'embellishments'];

    $(".add-props").on('click', function(e) {
        e.preventDefault();
        var app_numbers_options = buildAppNumOptions();
        var app_sizes_options = buildAppSizeOptions();
        var app_default_elem = '<option value="none">None</option>';
        var td_open = '<td>';
        var td_close = '</td>';
        window.app_type = null;
          var type_elem = '';
          app_types.forEach(function(type) {
                type_elem += '<option value="'+type+'">'+type+'</option>';
            });
        window.app_type = type_elem;
        var type = '<select class="form-control app-type">'+window.app_type+'</select>';
        var application_number ='<select class="form-control app-numbers" multiple="multiple">'+app_numbers_options+'</select>';
        var size = '<select class="form-control app-size" multiple="multiple">'+app_sizes_options+'</select>';
        var scale = '<input type="text" class="form-control app-scale">';
        var def = '<select class="form-control app-def">'+app_default_elem+'</select>';
        var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
        var elem = '<tr class="layer-row">' +
                        td_open +
                            type +
                        td_close +
                        td_open +
                            application_number +
                        td_close +
                        td_open +
                            size +
                        td_close +
                        td_open +
                            scale +
                        td_close +
                        td_open +
                            def +
                        td_close +
                        td_open +
                            delete_row +
                        td_close +
                    '</tr>';
        $('.properties-content').append(elem);
        refreshSelectBoxes();
        updateJSON();
    });

    $("#create_application_size").on("click", ".delete-row", function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
    });

    function deleteButton(){
        $('.delete-row').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateJSON();
        });
    }

    function loadConfigurations(data){
        var app_numbers_options = buildAppNumOptions();
        var app_sizes_options = buildAppSizeOptions();
        var app_numbers_ref = [];
        var app_sizes_ref = [];
        var default_sizes = [];
        window.app_types = ['team_name', 'player_name', 'front_number', 'back_number', 'shoulder_number', 'sleeve_number', 'mascot', 'embellishments'];
        data.forEach(function(entry, i) {
            var app_nums = entry.application_number;
            app_numbers_ref.push(app_nums);
            app_sizes_ref.push(entry.size);
            default_sizes.push(entry.default);
            var app_num_class = "app-num-"+i;
            var app_size_class = "app-size-"+i;
            var app_def_class = "app-def-"+i;
            var app_size = entry.size;
            var app_scale = entry.scale;
            var td_open = '<td>';
            var td_close = '</td>';
            window.app_type = null;
                var type_elem = '';
                app_types.forEach(function(type) {
                    if (type == entry.type) {
                        type_elem += '<option value="'+type+'" selected>'+type+'</option>';
                    }
                    else {
                        type_elem += '<option value="'+type+'">'+type+'</option>';
                      }
                    });
                window.app_type = type_elem;
            var type = '<select class="form-control app-type">'+window.app_type+'</select>';
            var application_number = `<select class="form-control app-numbers `+app_num_class+`" multiple="multiple">`+app_numbers_options+`</select>`;
            var size = `<select class="form-control app-size `+app_size_class+`" multiple="multiple">`+app_sizes_options+`</select>`;
            var scale = '<input type="text" class="form-control app-scale" value="'+app_scale+'">';
            var def =  '<select class="form-control app-def '+app_def_class+'"></select>';
            var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
            var elem = '<tr class="layer-row">' +
                            td_open +
                                type +
                            td_close +
                            td_open +
                                application_number +
                            td_close +
                            td_open +
                                size +
                            td_close +
                            td_open +
                                scale +
                            td_close +
                            td_open +
                                def +
                            td_close +
                            td_open +
                                delete_row +
                            td_close +
                        '</tr>';
            $('.properties-content').append(elem);

            updateJSON();
            setDefault(app_sizes_ref, entry.default);
            setTimeout(refreshSelect2s(app_numbers_ref), 1000);
        });

    }


    function refreshSelect2s(app_numbers_ref){
        refreshSelectBoxes();
        app_numbers_ref.forEach(function(entry, i) {
            try {
                var app_num_class = ".app-num-"+i;
                $(app_num_class).select2('val', entry);
            }
            catch(err) {
                console.log(err.message);
            }
        });
        updateJSON();
    }

    function updateJSON() {
        var data = [];
        $(".layer-row").each(function(i) {
            var x = {
                "type" : $(this).find('.app-type').val(),
                "application_number" : $(this).find('.app-numbers').val(),
                "size" : $(this).find('.app-size').val(),
                "scale" : $(this).find('.app-scale').val(),
                "default" : $(this).find('.app-def').val()
            };
            data.push(x);
        });
        // console.log(JSON.stringify(data));
        $('#properties').val(JSON.stringify(data));
    }

    function buildAppNumOptions() {
        var elem = '';
        for(var i = 1; i <= 51; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        for(var i = 71; i <= 99; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        return elem;
    }

    function buildAppSizeOptions() {
        var elem = '';
        elem += '<option value="'+0.5+'">'+0.5+'</option>';
        elem += '<option value="'+1.5+'">'+1.5+'</option>';
        elem += '<option value="'+2.5+'">'+2.5+'</option>';
        for(var i = 1; i <= 12; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        return elem;
    }


    function refreshSelectBoxes(){
        $(".app-numbers").each(function(i) {
            $(this).select2({
                placeholder: "Select numbers",
                multiple: true,
                allowClear: true
            });
        });
        $(".app-size").each(function(i) {
            $(this).select2({
                placeholder: "Select",
                multiple: true,
                allowClear: true
            });
        });
    }

    function setValue(thisObj) {
        var sizes = thisObj.parent().parent().find('.app-size').val().toString();
        var def_value = sizes.split(",");
        var elem = '';
        def_value.forEach( function(entry) {
           elem += '<option value="'+entry+'">'+entry+'</option>';
        });
        thisObj.parent().parent().find('.app-def').empty().append(elem);
    }

    function setDefault(sizes, def_value) {
        refreshSelectBoxes();
        // var sizes = sizes.toString();
        // var def_values = sizes.split(",");
        // var elem = '';
        sizes.forEach( function(entry, i) {
            try {
                var app_size_class = ".app-size-"+i;
                var app_def_class = ".app-def-"+i;
                $(app_size_class).select2('val', entry);
                var sizes_value = entry.toString().split(",");
                $(app_def_class).html('');
                var elem2 = '';
                sizes_value.forEach(function(size, j){
                    if(def_value == size) {
                            elem2 += '<option value="'+size+'" selected>'+size+'</option>';
                        }
                    else {
                            elem2 += '<option value="'+size+'">'+size+'</option>';
                        }
                });
                $(app_def_class).append(elem2);
            }
            catch (err) {
                console.log(err.message);
            }
        });
        updateJSON();
    }

    $("#create_application_size").on("change", ".app-size", function(e){
        e.preventDefault();
        setValue($(this));
        updateJSON();
    });

    $("#create_application_size").on("keyup", ".app-scale", function(e){
        updateJSON();
    });

    $("#create_application_size").on("change", ".app-def, .app-type, .app-numbers", function(e){
        updateJSON();
    });

    $("#create_application_size").on("click", ".delete-row", function(e){
        updateJSON();
    });
});
