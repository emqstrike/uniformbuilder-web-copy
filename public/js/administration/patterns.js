$(document).ready(function(){

    window.colors = null;
    getColors(function(colors){
        window.colors = colors;
    });

    window.edit = 0;

    function getColors(callback){
        var colors;
        var url = "//api.prolook.com/api/colors";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                colors = data['colors'];
                // console.log("Mascots: "+items);
                if(typeof callback === "function") callback(colors);
            }
        });
    }

    var colors_dropdown = generateColorsDropdown();
    function generateColorsDropdown(){
        $.each(window.colors, function( key, value ) {
            colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '">' + value.name + '</option>';
        });
        return colors_dropdown;
    }

    try {
        $('.layer-default-color').append(colors_dropdown);
    }
    catch(err) {
        console.log(err.message);
    }

    $(document).on('change', function() {
        var length = $('.layers-row').length;
        // updateJSON(length);
        layerNumbers();
        updater(edit);
    });

    $( "tbody" ).disableSelection();
    $( "tbody.layers" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            layerNumbers();
        }
    });

    updater();
    function updater(edit){
        
        $('.neck-option-name').keyup(function(){

            console.log($(this).val());
            var length = $('.layers-row').length;
            updateJSON(length, edit);

        });

    }

    function layerNumbers(){
        var length = $('.layers-row').length;
        var x = 1;
        $(".layers-row").each(function(i) {
            $(this).find(".ma-layer").val(x);
            // length = length-1;
            x++;
        });
        var newLength = $('.layers-row').length;
        updateJSON(newLength);
    }

    function updateJSON(length, edit){
        console.log('EDIT: ' + edit);
        pattern_properties = {};
        var ctr = 1;
        // while( ctr <= length ){
            $(".layers-row").each(function(i) {
                var thisLayer = "layer"+ctr;
                var layer_class = ".ma-layer.layer" + ctr;

                pattern_properties[ctr] = {};
                pattern_properties[ctr]['default_color'] = {};
                pattern_properties[ctr]['file_path'] = {};
                pattern_properties[ctr]['layer'] = {};
                pattern_properties[ctr]['team_color_id'] = {};

                $(this).find('.ma-layer').removeClass().addClass("ma-layer");
                $(this).find('.ma-layer').addClass(thisLayer);
                $(this).find(layer_class).addClass('ma-layer');

                $(this).find('.layer-default-color').removeClass().addClass("layer-default-color");
                $(this).find('.layer-default-color').addClass(thisLayer);
                var default_color_class = ".layer-default-color.layer" + ctr;
                $(this).find(default_color_class).addClass('layer-default-color');

                $(this).find('.pattern-team-color-id').removeClass().addClass("pattern-team-color-id");
                $(this).find('.pattern-team-color-id').addClass(thisLayer);
                var ptid_class = ".pattern-team-color-id.layer" + ctr;
                $(this).find(ptid_class).addClass('pattern-team-color-id');

                // var hexString = $(this).find(default_color_class).val()
                
                // if(hexString.replace('#','')){
                //     hexString = hexString.replace('#','');
                // }
                var existing_file_class = ".pattern-source.layer" + ctr;
                
                pattern_properties[ctr]['default_color'] = $(this).find(default_color_class).val();
                pattern_properties[ctr]['layer'] = $(this).find(layer_class).val();
                // pattern_properties[length]['file_path'] = "";
                if( window.edit == 1 ){

                    pattern_properties[ctr]['file_path'] = $(this).find(existing_file_class).val();

                } else {

                    pattern_properties[ctr]['file_path'] = null;

                }
                pattern_properties[ctr]['team_color_id'] = $(this).find(ptid_class).val();

                // length--;
                ctr++;

            });
        //     ctr++;
        // }
        var patternProperties = JSON.stringify(pattern_properties);
        console.log( patternProperties );
        // window.lp = patternProperties;
        $('#pattern_properties').val(patternProperties);
        // $('#existing-colors-properties').val(layersProperties);
    }

    $(document).on('click', '.clone-row', function() {

        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );
        layerNumbers();
        updater();

        $('.layer-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
            $(this).css('color', '#fff');
            $(this).css('text-shadow', '1px 1px #000');
        });

        var length = $('.layers-row').length;

        $(".layer-default-color").each(function(i) {
            $(this).html('');
            var thisElem = $(this);

            $(this).append(colors_dropdown);
        });


    });

    for( var i = 0; i <= 10; i++ ){
        if( i== 0){
            $('#pattern_tc_id_dp').append('<option value="">None</option>');
        } else {
            $('#pattern_tc_id_dp').append('<option value="' + i + '">' + i + '</option>');
        }
    }

    $('.show-pattern').on('click', function(){
        var pattern = {};
        pattern.id = $(this).data('pattern-id');
        pattern.name = $(this).data('pattern-name');
        pattern.layer_1 = $(this).data('pattern-layer-one');
        pattern.layer_2 = $(this).data('pattern-layer-two');
        pattern.layer_3 = $(this).data('pattern-layer-three');
        pattern.layer_4 = $(this).data('pattern-layer-four');

        $('#view-pattern-modal .modal-title').text(pattern.name);

        $('#view-pattern-modal .pattern-layer-1').attr('src', pattern.layer_1);
        $('.pattern-layer-1-path').text(pattern.layer_1);
        if (pattern.layer_1) {
            $('.tab-menu-layer-1').show();
        } else {
            $('.tab-menu-layer-1').hide();
        }

        $('#view-pattern-modal .pattern-layer-2').attr('src', pattern.layer_2);
        $('.pattern-layer-2-path').text(pattern.layer_2);
        if (pattern.layer_2) {
            $('.tab-menu-layer-2').show();
        } else {
            $('.tab-menu-layer-2').hide();
        }

        $('#view-pattern-modal .pattern-layer-3').attr('src', pattern.layer_3);
        $('.pattern-layer-3-path').text(pattern.layer_3);
        if (pattern.layer_3) {
            $('.tab-menu-layer-3').show();
        } else {
            $('.tab-menu-layer-3').hide();
        }

        $('#view-pattern-modal .pattern-layer-4').attr('src', pattern.layer_4);
        $('.pattern-layer-4-path').text(pattern.layer_4);
        if (pattern.layer_4) {
            $('.tab-menu-layer-4').show();
        } else {
            $('.tab-menu-layer-4').hide();
        }

        $('.nav-tabs').tab('show');
        $('#view-pattern-modal').modal('show');
    });

    $('.enable-pattern').on('click', function(){
        var id = $(this).data('pattern-id');
        var url = "//" + api_host + "/api/pattern/enable/";
        //var url = "//localhost:8888/api/pattern/enable/";
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
                    var elem = '.pattern-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-pattern').removeAttr('disabled');
                    $(elem + ' .enable-pattern').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-pattern').on('click', function(){
        var id = $(this).data('pattern-id');
        var url = "//" + api_host + "/api/pattern/disable/";
        // var url = "//localhost:8888/api/pattern/disable/";
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
                    var elem = '.pattern-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-pattern').removeAttr('disabled');
                    $(elem + ' .disable-pattern').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });


//toggle
       $('.toggle-pattern').on('click', function(){
            var id = $(this).data('pattern-id');
            var url = "//" + api_host + "/api/pattern/toggle/";
                //var url = "//localhost:8888/api/pattern/toggle/";
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



    $('.delete-pattern').on('click', function(){

        var id = [];
        id.push( $(this).data('pattern-id'));
        
     
        modalConfirm('Remove pattern', 'Are you sure you want to delete the pattern?', id);
    });

    $('.delete-pattern-thumbnail').on('click', function(){
        var id = $(this).data('pattern-id');
        $('#confirmation-modal-delete-thumbnail').modal();
    });

    
    $(document).on('click', '#confirmation-modal-delete-thumbnail .confirm-yes', function() {
        var id = $(this).data('value');
         var url = "//" + api_host + "/api/pattern/delete/";
    // var url = "//localhost:8888/api/pattern/deleteThumbnail/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: $(this).data('value')}),
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
                    $('#confirmation-modal-delete-thumbnail').modal('hide');
                    $('.thumbnail_path').fadeOut();
                }
            }
        });
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
         var id = $(this).data('value');
        var url = "//" + api_host + "/api/pattern/delete/";


        //var url = "//localhost:8888/api/pattern/delete/";

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id:  $(this).data('value')}),
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
                   $.each(id, function (index, value) {
                      console.log(value);
                      $('.pattern-' + value).fadeOut();

                      // Will stop running after "three"
                      
                    });
                    

                }
            }
        });
    });


     $(document).on('click', '.clone-pattern', function(e) {
        e.preventDefault();
        var id = $(this).data('pattern-id');
        var url = "//" + api_host + "/api/pattern/duplicate/";


       // var url = "//localhost:8888/api/pattern/duplicate/";

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

                     $( ".box-body" ).load( location+" .patterns" ); 
                     $('html, body').scrollTop( $(document).height() );
           
             
                    

                }
            }
        });
    });




    // Edit Pattern Scripts
    $('#edit-pattern-form').submit(function(){
        new PNotify({
            title: 'Updating pattern',
            text: 'Please wait while we are saving pattern...',
            type: 'success',
            hide: true
        });
        $('.main-content').fadeOut('slow');
    });

    $('.delete-pattern-layer').on('click', function(){
        var id = $(this).data('pattern-id');
        var layer = $(this).data('layer');
        $('#confirmation-modal .confirm-delete-layer').data('layer', layer);
        modalConfirm('Remove pattern', 'Are you sure you want to delete the pattern layer?', id, 'confirm-delete-layer');
    });

    // Delete Layer
    $('#confirmation-modal .confirm-delete-layer').on('click', function(){
        var id = $(this).data('value');
        var layer = $(this).data('layer');
        var url = "//" + api_host + "/api/pattern/deleteLayer/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, layer: layer}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    new PNotify({
                        title: 'Updating pattern',
                        text: 'Please wait while we are saving pattern...',
                        type: 'success',
                        hide: true
                    });
                    $('.' + layer).fadeOut();
                }
            }
        });
    });

    try {
        buildLayers();
    }
    catch(err) {
        // console.log(err.message);
    }

    function buildLayers(){

        window.edit = 1;

        pattern_properties = $('#pattern_properties').val();
        var data = JSON.parse(pattern_properties);

        var length = Object.keys(data).length;
        var x = 1;

        while(x <= length) {

            updater(edit);

            var team_color_id_options = '';
            for( var y = 1; y <=10; y++ ){
                var selected = '';
                if( y == data[x].team_color_id ){
                    selected = 'selected';
                }
                team_color_id_options += '<option value="' + y + '" ' + selected + '>' + y + '</option>';
            }

            

            var colors_dropdown = '';
            $.each(window.colors, function( key, value ) {
                var selected = '';
                if( data[x].default_color == value.color_code ){
                    selected = 'selected';
                }
                colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '" ' + selected + '>' + value.name + '</option>';
            });

            var open            = '<tr class="layers-row">';
            // var existing_file   = '<input type="hidden" class="pattern-layer-existing-file layer' + x + '" value="' + data[x].file_path + '">';
            var layer           = '<td><input type="text" class="ma-layer layer' + x + '" value="' + x + '" size="3" disabled></td>';
            var default_color   = '<td><select class="layer-default-color layer' + x + '">' + colors_dropdown + '</select></td>';
            var new_file        = '<td><input type="file" class="pattern-layer-file layer' + x + '" name="pattern_layer_image[]"></td>';
            var thumbnail       = '<td><img src="' + data[x].file_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" class="pattern-source layer' + x + '" value="' + data[x]['file_path'] + '"></td>';
            var team_color_id   =  '<td><select class="pattern-team-color-id layer' + x + '">' + team_color_id_options + '</select></td>';
            var remove          = '<td><a class="btn btn-danger btn-xs delete-pattern-layer"><i class="fa fa-remove"></i> Remove</a></td>';
            var close           = '<tr>';

            $('#layers-row-container').append( open + layer + default_color + thumbnail + new_file + team_color_id + remove + close );
            x++;

        }

    }

    $(document).on('click', '.delete-pattern-layer', function() {
        $(this).parent().parent().remove();
        layerNumbers();
    });
    var multipleRemove=[];
    $(document).on('click', '#multipleDelete', function() {
        if($(this).is(':checked')){
            multipleRemove.push($(this).data("pattern-id"));
       
 
        }else{
           multipleRemove.splice( $.inArray($(this).data("pattern-id"),multipleRemove) ,1 );

        }
       multipleRemove = multipleRemove.sort();

 
    });

    $(document).on('click', '.multiple-delete-pattern', function() {
     
        modalConfirm('Remove pattern', 'Are you sure you want to delete the pattern?', multipleRemove);
 

    });
    //   var id = multipleRemove;
    //    // var url = "//" + api_host + "/api/pattern/deleteThumbnail";
    //    var url = "//localhost:8888/api/pattern/deleteThumbnail";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 $('#confirmation-modal-delete-thumbnail').modal('hide');
    //                 $('.thumbnail_path').fadeOut();
    //             }
    //         }
    //     });

    //  });

    //  $(document).on('click', '.multiple-delete-pattern', function() {
    //     var id = multipleRemove;
        

    //     console.log(id);

    //    // var url = "//" + api_host + "/api/pattern/delete/";


    //     var url = "//localhost:8888/api/pattern/delete/";

    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 $('#confirmation-modal').modal('hide');
    //                 $('.pattern-' + id).fadeOut();
    //             }
    //         }
    //     });
    // });





});