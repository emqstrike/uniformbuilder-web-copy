$(document).ready(function(){

    var fontSizes = [];

    // $('[data-toggle="tooltip"]').tooltip();
    // $('table').tooltip({ selector: '[data-toggle="tooltip"]' });
    $('[data-toggle="tooltip"]').popover({
        html: true,
        trigger: 'hover',
        placement: 'top',
        content: function(){
            return $(this).data('message');
        }
    });

    $('.preview-button').on('click', function(){
        text = $('#text-source').val();
        size = $('#size-source').val();
        $('#p-text').text(text);
        $('#p-text').css('font-size',size+'px');
    });

    var font_sizes = ['1', '2', '2.5', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    $.each(font_sizes, function( i, value ) {
        elem = '<td><input type="number" class="output-size td-' + font_sizes[i] + '" style="width: 90px;">';

        offset_label = '<br><br><label class="col-md-5 control-label">Offset</label><br>';
        x_offset = '<br>x: <input type="number" class="output-x-offset td-' + font_sizes[i] + '" style="width: 45px;">';
        y_offset = '<br>y: <input type="number" class="output-y-offset td-' + font_sizes[i] + '" style="width: 45px;">';

        scale_label = '<br><br><label class="col-md-5 control-label">Scale</label><br>';
        x_scale = '<br>x: <input type="text" class="output-x-scale td-' + font_sizes[i] + '" style="width: 45px;">';
        y_scale = '<br>y: <input type="text" class="output-y-scale td-' + font_sizes[i] + '" style="width: 45px;"></td>';

        $('.input-size-header').append('<th>' + font_sizes[i] + '</th>');
        $('.output-size-row').append(   elem +
                                        offset_label +
                                        x_offset +
                                        y_offset +
                                        scale_label +
                                        x_scale +
                                        y_scale);
        if( font_sizes[i] == 12 ){ outSizeEvent(); }
    });

    try{
        old_fst = $('#old_font_size_table').val();
        old_fst = old_fst.substring(1, old_fst.length-1);
        old_fst = JSON.parse(old_fst);

        loadFontSizeTable(old_fst);
    } catch(err){
        console.log(err.message);
    }

    function loadFontSizeTable(old_fst){
        ctr = 0;

        if( old_fst.length == 12 ){
            row = {};
            row['inputSize'] = 0;
            row['outputSize'] = 0;
            row['xOffset'] = 0;
            row['yOffset'] = 0;
            row['xScale'] = 0;
            row['yScale'] = 0;
            old_fst.splice(2, 0, row);
        }
        $(".output-size").each(function(i) {

            $(this).val(old_fst[ctr].outputSize);

            ctr++;
        });
        ctr = 0;
        $(".output-x-offset").each(function(i) {
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                $(this).val(old_fst[2].xOffset);
            } else {
                $(this).val(old_fst[ctr].xOffset);
            }
            ctr++;
        });
        ctr = 0;
        $(".output-y-offset").each(function(i) {
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                $(this).val(old_fst[2].yOffset);
            } else {
                $(this).val(old_fst[ctr].yOffset);
            }
            ctr++;
        });
        ctr = 0;
        $(".output-x-scale").each(function(i) {
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                $(this).val(old_fst[2].xScale);
            } else {
                $(this).val(old_fst[ctr].xScale);
            }
            ctr++;
        });
        ctr = 0;
        $(".output-y-scale").each(function(i) {
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                $(this).val(old_fst[2].yScale);
            } else {
                $(this).val(old_fst[ctr].yScale);
            }
            ctr++;
        });
    }

    function outSizeEvent(){
        $(".output-size").each(function(i) {
            $(this).change(function() {

                updateFontSizes();
            });
        });

        $(".output-x-offset").each(function(i) {
            $(this).change(function() {

                updateFontSizes();
            });
        });

        $(".output-y-offset").each(function(i) {
            $(this).change(function() {

                updateFontSizes();
            });
        });

        $(".output-x-scale").each(function(i) {
            $(this).change(function() {

                updateFontSizes();
            });
        });

        $(".output-y-scale").each(function(i) {
            $(this).change(function() {

                updateFontSizes();
            });
        });
    }

    function updateFontSizes(){
        fontSizes = [];
        ctr = 0;
        $(".output-size").each(function(i) {
            row = {};

            if( $(this).hasClass( "td-2.5" ) ){
                row['inputSize'] = '2.5';
                row['outputSize'] = $(this).val();
                fontSizes.push(row);
            } else {
                if( ctr <=2 ){
                    c = ctr + 1;
                } else {
                    c = ctr;
                }

                row['inputSize'] = c.toString();
                row['outputSize'] = $(this).val();
                tdclass = $(this).attr('class').split(' ');

                if( ctr == 3 ){
                    row['inputSize'] = '3';
                    row['outputSize'] = $(this).val();
                    tdclass = $(this).attr('class').split(' ');
                    fontSizes.push(row);
                } else {
                    if( ctr == 4 ){
                        row['inputSize'] = '4';
                    } else {
                        row['inputSize'] = c.toString();
                    }

                    row['outputSize'] = $(this).val();
                    tdclass = $(this).attr('class').split(' ');
                    fontSizes.push(row);
                }
            }
            // fontSizes.push(row);

            ctr++;

        });
        ctr = 0;
        $(".output-x-offset").each(function(i) {
            fontSizes[ctr]['xOffset'] = {};
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                fontSizes[2]['xOffset'] = {};
                if( $(this).val() == "" ){
                    ctrx  = ctr-1;
                    fontSizes[2]['xOffset'] = '0';
                } else {
                    fontSizes[2]['xOffset'] = $(this).val();
                }
            } else {
                if( $(this).val() == "" ){
                    fontSizes[ctr]['xOffset'] = "0";
                } else {
                    fontSizes[ctr]['xOffset'] = $(this).val();
                }
            }
            ctr++;
        });
        ctr = 0;
        $(".output-y-offset").each(function(i) {
            fontSizes[ctr]['yOffset'] = {};
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                fontSizes[2]['yOffset'] = {};
                if( $(this).val() == "" ){
                    ctrx  = ctr-1;
                    fontSizes[2]['yOffset'] = '0';
                } else {
                    fontSizes[2]['yOffset'] = $(this).val();
                }
            } else {
                if( $(this).val() == "" ){
                    fontSizes[ctr]['yOffset'] = "0";
                } else {
                    fontSizes[ctr]['yOffset'] = $(this).val();
                }
            }
            ctr++;
        });
        ctr = 0;
        $(".output-x-scale").each(function(i) {
            fontSizes[ctr]['xScale'] = {};
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                fontSizes[2]['xScale'] = {};
                if( $(this).val() == "" ){
                    ctrx  = ctr-1;
                    fontSizes[2]['xScale'] = '0';
                } else {
                    fontSizes[2]['xScale'] = $(this).val();
                }
            } else {
                if( $(this).val() == "" ){
                    fontSizes[ctr]['xScale'] = "1";
                } else {
                    fontSizes[ctr]['xScale'] = $(this).val();
                }
            }
            ctr++;
        });
        ctr = 0;
        $(".output-y-scale").each(function(i) {
            fontSizes[ctr]['yScale'] = {};
            if( $(this).hasClass( "td-2.5" ) ){ // for 2.5"
                fontSizes[2]['yScale'] = {};
                if( $(this).val() == "" ){
                    ctrx  = ctr-1;
                    fontSizes[2]['yScale'] = '0';
                } else {
                    fontSizes[2]['yScale'] = $(this).val();
                }
            } else {
                if( $(this).val() == "" ){
                    fontSizes[ctr]['yScale'] = "1";
                } else {
                    fontSizes[ctr]['yScale'] = $(this).val();
                }
            }
            ctr++;
        });
        console.log(fontSizes);
        $('#font_size_table').val("'" + JSON.stringify(fontSizes) + "'");
    }

    try{
        updateFontSizes();
    } catch(err){
        console.log(err.message);
    }

    $('.add-font-size').on('click', function(e){
        var perspective = $(this).data('perspective');
        var tbl_class = '.'+perspective+'-fst-body';
        e.preventDefault();
        var elem = '<tr><td><input type="number" step="any" class="inputs input-size"></td><td><input type="number" step="any" class="inputs output-size"></td><td><input type="number" step="any" class="inputs x-offset"></td><td><input type="number" step="any" class="inputs y-offset"></td><td><input type="number" step="any" class="inputs x-scale"></td><td><input type="number" step="any" class="inputs y-scale"></td><td><input type="number" step="any" class="inputs application-number"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>'
        // $('.front-fst-body').prepend(elem);
        $(tbl_class).prepend(elem);
        refreshMultipleFST();
    });

    $("#create-font-form").on("keyup", ".inputs", function(e){
        refreshMultipleFST();
    });

    $("#create-font-form").on("change", ".inputs", function(e){
        refreshMultipleFST();
    });

    function refreshMultipleFST(){
        var data = [];
        var perspectives = ["front", "back", "left", "right"];
        perspectives.forEach(function(entry) {
            var perspectiveData = {
                "perspective" : entry
            };
            var temp = [];
            var elem_class = '.'+entry+'-fst-body tr';
            // $(".front-fst-body tr").each(function(i) {
            $(elem_class).each(function(i) {
                // console.log(this);
                var x = {
                    "inputSize" : $(this).find('.input-size').val(),
                    "outputSize" : $(this).find('.output-size').val(),
                    "x_offset" : $(this).find('.x-offset').val(),
                    "y_offset" : $(this).find('.y-offset').val(),
                    "x_scale" : $(this).find('.x-scale').val(),
                    "y_scale" : $(this).find('.y-scale').val(),
                    "application_number" : $(this).find('.application-number').val()
                };

                temp.push(x);
            });
            perspectiveData.sizes = temp;
            data.push(perspectiveData);

        });
        // var frontSizes = {
        //     "perspective" : "front"
        // };
        // var temp = [];
        // $(".front-fst-body tr").each(function(i) {
        //     console.log(this);
        //     var x = {
        //         "inputSize" : $(this).find('.input-size').val(),
        //         "outputSize" : $(this).find('.output-size').val(),
        //         "x_offset" : $(this).find('.x-offset').val(),
        //         "y_offset" : $(this).find('.y-offset').val(),
        //         "x_scale" : $(this).find('.x-scale').val(),
        //         "y_scale" : $(this).find('.y-scale').val()
        //     };

        //     temp.push(x);
        // });
        // frontSizes.sizes = temp;
        // data.push(frontSizes);
        console.log(JSON.stringify(data));
        $('#font_size_tables').val(JSON.stringify(data));
    }

    $("#create-font-form").on("click", ".remove-layer", function(e){
        e.preventDefault();
        $(this).parent().parent().remove();
    });

    $('.enable-font').on('click', function(){
        var id = $(this).data('font-id');
        var url = "//" + api_host + "/api/font/enable/";
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
                    var elem = '.font-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-font').removeAttr('disabled');
                    $(elem + ' .enable-font').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-font').on('click', function(){
        var id = $(this).data('font-id');
        var url = "//" + api_host + "/api/font/disable/";
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
                    var elem = '.font-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-font').removeAttr('disabled');
                    $(elem + ' .disable-font').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-font').on('click', function(){
        var id = $(this).data('font-id');
        modalConfirm('Remove font', 'Are you sure you want to delete the font?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/font/delete/";
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
                    $('.font-' + id).fadeOut();
                }
            }
        });
    });

    // Edit Pattern Scripts
    $('#edit-font-form').submit(function(){
        new PNotify({
            title: 'Updating font',
            text: 'Please wait while we are saving font...',
            type: 'success',
            hide: true
        });
        $('.main-content').fadeOut('slow');
    });

});