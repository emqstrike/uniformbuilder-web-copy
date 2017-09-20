$(document).ready(function(){

    if( $('#old_properties').val() ) {       
        var data = JSON.parse($('#old_properties').val());    
        loadConfigurations(data);
    }    

    $(".add-props").on('click', function(e) {
        e.preventDefault();
        var app_numbers_options = buildAppNumOptions();
        var td_open = '<td>';
        var td_close = '</td>';
        var application_number = '<select class="form-control app-numbers" multiple="multiple">'+app_numbers_options+'</select>';
        var size = '<input type="text" class="app-size">';
        var scale = '<input type="text" class="app-scale">';
        var def = '<input type="text" class="app-def">';
        var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
        var elem = '<tr class="layer-row">' +
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
        var app_numbers_ref = [];
        data.forEach(function(entry, i) {                         
            var app_nums = entry.application_number;
            app_numbers_ref.push(app_nums); 
            var app_num_class = "app-num-"+i;            
            var app_size = entry.size;
            var app_scale = entry.scale; 
            var app_def = entry.default;           
            var td_open = '<td>';
            var td_close = '</td>';
            var application_number = `<select class="form-control app-numbers `+app_num_class+`" multiple="multiple">`+app_numbers_options+`</select>`;
            var size = '<input type="text" class="form-control app-size" value="'+app_size+'">';
            var scale = '<input type="text" class="form-control app-scale" value="'+app_scale+'">';
            var def = '<input type="text" class="form-control app-def" value="'+app_def+'">';
            var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
            var elem = '<tr class="layer-row">' +
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
        });
        setTimeout(refreshSelect2s(app_numbers_ref), 1000);
    }

    function refreshSelect2s(app_numbers_ref){
        refreshSelectBoxes();       
        app_numbers_ref.forEach(function(entry, i) {
            var app_num_class = ".app-num-"+i;            
            $(app_num_class).select2('val', entry);           
        });
        updateJSON();
    }    

    function updateJSON() {
        var data = [];
        $(".layer-row").each(function(i) {
            var x = {
                "application_number" : $(this).find('.app-numbers').val(),
                "size" : $(this).find('.app-size').val(),
                "scale" : $(this).find('.app-scale').val(),
                "default" : $(this).find('.app-def').val()
            };
            data.push(x);
        });
        console.log(JSON.stringify(data));
        $('#properties').val(JSON.stringify(data));
    }

    function buildAppNumOptions() {
        var elem = '';
        for(var i = 1; i <= 51; i++){
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
    }

    $("#create_application_size").on("change", ".app-numbers", function(e){
        updateJSON();
    });

    $("#create_application_size").on("keyup", ".app-size", function(e){
        updateJSON();
    });

    $("#create_application_size").on("keyup", ".app-scale", function(e){
        updateJSON();
    });

    $("#create_application_size").on("keyup", ".app-def", function(e){
        updateJSON();
    });

    $("#create_application_size").on("click", ".delete-row", function(e){
        updateJSON();
    });

});