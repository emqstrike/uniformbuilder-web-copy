$(document).ready(function() {

    $(document).on('change', '.brand', function () {
        var brand = $(this).val();
        generateColorsDropdown(brand);
    });

    function generateColorsDropdown(brand) {
        var elem = $('.ma-default-color').empty();
        var opts = '';
        getColors(brand, function(colors) {
            colors.forEach(function(color) {
                opts += `<option data-color="#`+color.hex_code+`" style="background-color: #`+color.hex_code+`; text-shadow: 1px 1px #000;" value="`+color.color_code+`">
                                `+color.name+`
                            </option>`
            });
            elem.append(opts)
            $('.ma-default-color').trigger('change');
        });
    }

    function getColors(brand, callback){
        var colors;
        var url = "//" + api_host + "/api/colors/" + brand;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                colors = data['colors'];
                if(typeof callback === "function") callback(colors);
            }
        });
    }

    $('.brand').trigger('change');

    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });


    $( ".mascot-row" ).each(function( index ) {
            if (typeof($(this).attr("data-sports")) != 'undefined') {
                //sport sample data string ["baseball","batketball"]
                var sports = $(this).attr("data-sports").replace(/[\[\]']+/g, '').replace(/['"]+/g, '');
                sports = sports.split(',');
                for (i = 0; i < sports.length; i++) {
                    console.log(sports[i]);
                    $(this).addClass(sports[i]);
                }

            }


        });

    try{
        var $container = $('.isotope').isotope({
            itemSelector: '.mascot-row',
            getSortData: {
              category: '[data-category]'
            }
        });

         $(document).on('click', '.brand-filter', function() {
            $(".brand-filter").removeClass('btn-primary');
            $(this).addClass('btn-primary');
            var filterValue = $( this ).val() + "" + $("#filterSports .btn-primary").attr('data-filter')+ "" + $("#filters .btn-primary").attr('data-filter');
            console.log(filterValue);
            $container.isotope({ filter: filterValue });
        });

        $('#filters').on( 'click', 'button', function() {
            var filterValue = $( this ).attr('data-filter') + "" + $("#filterSports .btn-primary").attr('data-filter')+ "" + $('.brand-filter.btn-primary').val();
            console.log(filterValue);
            $container.isotope({ filter: filterValue });
        });

        $('#filterSports').on( 'click', 'button', function() {
            var filterValue = $( this ).attr('data-filter') + "" + $("#filters .btn-primary").attr('data-filter')+ "" + $('.brand-filter.btn-primary').val();
            console.log(filterValue);
            $container.isotope({ filter: filterValue });
         });

        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.btn-primary').removeClass('btn-primary');
                $( this ).addClass('btn-primary');
            });
        });
    } catch(err){
        console.log(err.message);
    }


    var layers_properties = {};
    var length = $('.layers-row').length;
    renumberRows(length);

    $('#colors_textarea').hide();

    var x_csrf_token = $('#x-csrf-token').val();
    // console.log("x-csrf-token"+x_csrf_token);

    rebind();
    toggler();

    function rebind(){
        $('.btn-mascot-category').on('click', function(){
            $('.mascot-row').fadeOut();
            var category = $(this).data('category');
            console.log("CATEGORY: "+category);
            var url = "/administration/mascots_filter";
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify({category: category}),
                dataType: 'json',
                crossDomain: true,
                contentType: 'application/json',
                // headers: {"accessToken": atob(headerValue), "X-CSRF-TOKEN": x_csrf_token},
                headers: {"accessToken": atob(headerValue), "X-CSRF-TOKEN": x_csrf_token},
                success: function(response){
                    console.log(response);
                    if (response.success) {
                        $('#mascots_container_box').html('');
                        $('#mascots_container_box').html(response.html).fadeIn("slow");
                        new PNotify({
                            title: 'Category',
                            text: category,
                            type: 'success',
                            hide: true
                        });
                        // $('#mascots_container_box').fadeIn("slow");
                        rebind();
                        toggler();
                    }
                }
            });
        });
    }

    function toggler(){
        $('.toggle-mascot').on('click', function(){
            var id = $(this).data('mascot-id');
            var url = "//" + api_host + "/api/mascot/toggle/";
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
        $('.toggle-mascot-typographic').on('click', function(){

            var id = $(this).data('mascot-id');
            console.log(id);
             var url = "//" + api_host + "/api/mascot/toggle_typographic/";
            //  var url = "//localhost:8888/api/mascot/toggle_typographic/";

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
    }

    $('.delete-mascot').on('click', function(){
        var id = $(this).data('mascot-id');
        modalConfirm('Remove mascot', 'Are you sure you want to delete the mascot?', id);
    });

    $('#confirmation-modal-mascot-category .confirm-yes').on('click', function(){
        var id = $(this).data('value');

        console.log("DELETE NOW");
        var url = "//" + api_host + "/api/mascot_category/delete/";
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
                    $('#confirmation-modal-mascot-category').modal('hide');
                    $('.mascot-category-' + id).fadeOut();
                }
            }
        });
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){

        var id = $(this).data('value');
        var url = "//" + api_host + "/api/mascot/delete/";

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
                    $('.mascot-' + id).fadeOut();
                    location.reload();
                }
            }
        });


    });

    $(document).on('change', function() {
        var length = $('.layers-row').length;
        renumberRows(length);
    });

    $( "tbody" ).disableSelection();
    $( "tbody" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            var length = $('.layers-row').length;
            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length = length-1;
            });
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        }
    });

    // var layers_properties = {};
    var existing_layers_properties = null;

    function renumberRows(length){
        layers_properties = {};
        $(".layers-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".ma-layer.layer" + length;

            layers_properties[length] = {};
            layers_properties[length]['default_color'] = {};
            layers_properties[length]['layer_number'] = {};
            layers_properties[length]['team_color_id'] = {};
            layers_properties[length]['filename'] = {};

            $(this).find('.ma-layer').removeClass().addClass("ma-layer");
            $(this).find('.ma-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('ma-layer');

            $(this).find('.ma-team-color-id').removeClass().addClass("ma-team-color-id");
            $(this).find('.ma-team-color-id').addClass(thisLayer);
            var team_color_id_class = ".ma-team-color-id.layer" + length;
            $(this).find(team_color_id_class).addClass('ma-team-color-id');

            $(this).find('.ma-default-color').removeClass().addClass("ma-default-color");
            $(this).find('.ma-default-color').addClass(thisLayer);
            var default_color_class = ".ma-default-color.layer" + length;
            $(this).find(default_color_class).addClass('ma-default-color');

            $(this).find('.ma-options-src').removeClass().addClass("ma-options-src");
            $(this).find('.ma-options-src').addClass(thisLayer);
            var src_class = ".ma-options-src.layer" + length;
            $(this).find(src_class).addClass('ma-options-src');

            var hexString = $(this).find(default_color_class).val()

            if(hexString.replace('#','')){
                hexString = hexString.replace('#','');
            }

            layers_properties[length]['default_color'] = hexString;
            layers_properties[length]['layer_number'] = $(this).find(layer_class).val();
             layers_properties[length]['filename'] = $(this).find('.default_img').val();
            if($(this).find(src_class).val()){
            layers_properties[length]['filename'] = $(this).find(src_class).val();

                }

            layers_properties[length]['team_color_id'] = $(this).find(team_color_id_class).val();

            length--;
        });
        var layersProperties = JSON.stringify(layers_properties);
        window.lp = layersProperties;
        $('#layers-properties').val(layersProperties);
        $('#existing-colors-properties').val(layersProperties);
    }

    $(document).on("click", "a.btn-remove-layer", function(){

        var length = 0;

        $(".layers-row").each(function(i) {
            length++;
        });

        // if(length > 1){
        $(this).closest('tr').remove();
        length--;
        // }


        var ctr = length;

        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(ctr);
            $(this).find(".layer-number").val(ctr);
            ctr--;
        });

        renumberRows(length);

    });

    $(document).on('click', '.clone-row', function() {

        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );
            $(document).on("change", ".ma-default-color", function(){

            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
        });

        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length--;
        });
        var newLength = $('.layers-row').length;
        $('.ma-default-color').trigger('change');
    });

    $(document).on('click', '.edit-clone-row', function() {

        $( "#base-row" ).clone().appendTo( "#layers-row-container" );

        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length--;
        });
        var newLength = $('.layers-row').length;
    });

});
