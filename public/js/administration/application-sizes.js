$(document).ready(function(){

    if( $('#old_properties').val() ) {       
        var data = JSON.parse($('#old_properties').val());    
        loadConfigurations(data);
    }    
    
    $(".add-props").on('click', function(e) {
        e.preventDefault();
        var app_numbers_options = buildAppNumOptions();
        var app_default_elem = '<option value="none">None</option>';
        var td_open = '<td>';
        var td_close = '</td>';
        var application_number = '<select class="form-control app-numbers" multiple="multiple">'+app_numbers_options+'</select>';
        var size = '<input type="text" class="form-control app-size">';
        var scale = '<input type="text" class="form-control app-scale">';
        var def = '<select class="form-control app-def">'+app_default_elem+'</select>';
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
        var default_sizes = [];
        data.forEach(function(entry, i) {                         
            var app_nums = entry.application_number;
            app_numbers_ref.push(app_nums);
            default_sizes.push(entry.default);
            var app_num_class = "app-num-"+i;
            var app_def_class = "app-def-"+i;
            var app_size = entry.size;
            var app_scale = entry.scale; 
            var app_default_elem = '<option value="'+entry.default+'" selected>'+entry.default+'</option>';           
            var td_open = '<td>';
            var td_close = '</td>';
            var application_number = `<select class="form-control app-numbers `+app_num_class+`" multiple="multiple">`+app_numbers_options+`</select>`;
            var size = '<input type="text" class="form-control app-size" value="'+app_size+'">';
            var scale = '<input type="text" class="form-control app-scale" value="'+app_scale+'">';
            var def =  '<select class="form-control app-def '+app_def_class+'">'+app_default_elem+'</select>';
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
            setTimeout(refreshSelect2s(app_numbers_ref, entry.default), 1000);                    
        });     
               
    }

    function refreshSelect2s(app_numbers_ref, default_size){
        refreshSelectBoxes();       
        app_numbers_ref.forEach(function(entry, i) {
            try {
                var app_num_class = ".app-num-"+i;    
                var app_def_class = ".app-def-"+i;          
                $(app_num_class).select2('val', entry);
                var sizes = entry.toString().split(",");
                $(app_def_class).html('');
                var elem2 = '';            
                sizes.forEach(function(size, j) {
                    if(default_size == size){
                        elem2 += "<option selected>"+size+"</option>";
                    } else {
                        elem2 += "<option>"+size+"</option>";
                    }
                });
                $(app_def_class).append(elem2);
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
    function setValue(thisObj){
                
      var selected_app_numbers = thisObj.parent().parent().find('.app-numbers').val().toString();    
      var def_value = selected_app_numbers.split(",");
      console.log(def_value);
      var elem = '';
      def_value.forEach( function(entry) {
           elem += '<option value="'+entry+'">'+entry+'</option>';
      });
      thisObj.parent().parent().find('.app-def').empty().append(elem); 
      }

    $("#create_application_size").on("change", ".app-numbers", function(e){
        e.preventDefault();
        setValue($(this));
        updateJSON();
    });

    $("#create_application_size").on("keyup", ".app-size", function(e){
        updateJSON();
    });

    $("#create_application_size").on("keyup", ".app-scale", function(e){
        updateJSON();
    });

    $("#create_application_size").on("change", ".app-def", function(e){        
        updateJSON();
    });   

    $("#create_application_size").on("click", ".delete-row", function(e){
        updateJSON();
    });

});