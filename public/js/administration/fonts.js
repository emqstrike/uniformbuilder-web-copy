$(document).ready(function(){

    var fontSizes = [];

    for( x = 1; x <= 12; x++ ){
        elem = '<td><input type="number" class="output-size td-' + x + '" style="width: 70px;"></td>';
        $('.input-size-header').append('<th>' + x + '</th>');
        $('.output-size-row').append(elem);
        if( x == 12 ){ outSizeEvent(); }
    }

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
        $(".output-size").each(function(i) {
            $(this).val(old_fst[ctr].outputSize);
            ctr++;
        });
    }

    function outSizeEvent(){
        $(".output-size").each(function(i) {
            $(this).change(function() {
                console.log('change');
                updateFontSizes();
                console.log(JSON.stringify(fontSizes));
            });
        });
    }

    function updateFontSizes(){
        fontSizes = [];
        ctr = 1;
        $(".output-size").each(function(i) {
            row = {};
            row['inputSize'] = ctr;
            row['outputSize'] = $(this).val();
            fontSizes.push(row);
            ctr++;
        });
        $('#font_size_table').val("'" + JSON.stringify(fontSizes) + "'");
    }

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