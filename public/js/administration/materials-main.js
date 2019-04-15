$(document).ready(function() {

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        "stateSave": true,
        initComplete: function () {
            this.api().columns().every( function () {

                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                        .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );

                column.data().unique().sort().each( function ( d, j ) {

                    select.append( '<option value="'+d+'">'+d+'</option>' );
                } );
            } );
        }
    });

    $(document).on('click', '.reset-filter', function(e) {
        e.preventDefault();
        console.log('Clear Filter');
        resetColumnFilter();
    });

    function  resetColumnFilter()
    {
        var table = $('.data-table').DataTable();
            table.search( '' ).columns().search( '' ).draw();
    }


    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    window.sports = null;

    getSports(function(sports){ window.sports = sports; });
    function getSports(callback){
        var sports;
        var url = "//" + api_host + "/api/categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                sports = data['categories'];
                if(typeof callback === "function") callback(sports);
            }
        });
    }

    window.active_sport = $('.active-sport').val();
    sports = _.filter(window.sports, function(e){
        return window.active_sport !== e.name;
    });

    sports_sorted = _.sortBy(sports, function(o) { return o.name; });

    sports_sorted.forEach(function(entry) {
        if (entry.name) {
            var elem = '<option value="' + entry.name + '">' + entry.name + '</option>';
            $('.active-sport').append(elem);
        }
    });

    var is_all_option_exists = false;

    $('.active-sport option').each(function() {
        if (this.value == 'All') {
            is_all_option_exists = true;
        }
    });

    if (! is_all_option_exists) {
        var elem = '<option value="all">All</option>';
        $('.active-sport').prepend(elem);
    }

    // console.log("SPORTS");
    // console.log(sports);

    $(document).on('change', '.active-sport', function() {
        // check for current version of the dashboard
        if (window.location.href.search('v1-0') > 0) {
            window.location = "/administration/v1-0/materials/" + $(this).val();
        } else {
            window.location = "/administration/materials/" + $(this).val();
        }
    });

    $('img[data-toggle=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'right',
        content: function(){
            return '<img src="'+$(this).attr('src') + '" style="width: 220px; height: 300px; background-color: #525252;"/>';
        }
    });
    $('.log-ids').on('click', function(){
        var ids = [];

        var table = $('.data-table').DataTable();

        var xdata = table.rows( { filter : 'applied'} ).data();
        $.each(xdata, function(i, item) {
            var elem = new DOMParser().parseFromString(item[0], 'text/html');
            var id = $(elem).find('a.material-id-link');
            ids.push($(id)[0].innerHTML);
        });

        console.log(JSON.stringify(ids));
    });

    var filtersFlatforms="";
    $('#filtersFlatforms').on( 'click', 'button', function() {

     filtersFlatforms = $( this ).attr('data-filter');

     materials_button_filters();
    });

    var filtersCategory="";
    $('#filtersCategory').on( 'click', 'button', function() {
        filtersCategory = $( this ).attr('data-filter');
        materials_button_filters();
    });
    var filters="";
    $('#filters').on( 'click', 'button', function() {
        filters = $( this ).attr('data-filter');
        materials_button_filters();
    });

    function materials_button_filters(){
        console.log(filtersFlatforms + "" + filtersCategory + "" + filters);
        $container.isotope({ filter: filtersFlatforms + "" + filtersCategory + "" + filters});
    }

    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.btn-primary').removeClass('btn-primary');
            $( this ).addClass('btn-primary');
        });
    });

    $("#materials_table").on("click", ".toggle-material", function(e){
        e.preventDefault();
        console.log('toggle');
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/toggle/";
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
                    console.log('toggle success');

                 window.location.reload(true);
                } else {
                    console.log('toggle fail');
                }
            }
        });
    });

    // refreshDeleteButtons();

    $("#materials_table").on("click", ".delete-material", function(e){
        var id = $(this).data('material-id');
        e.preventDefault();
        console.log('try to delete');
        if(!confirm('Do you want to delete this item?')){
            console.log('no');
        } else {
            console.log('delete');
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
                        $('.material-' + id).fadeOut();
                        window.location.reload(true);
                    }
                }
            });
        }
    });

    $("#materials_table").on("click", ".duplicate-material", function(e){
        var id = $(this).data('material-id');
        e.preventDefault();
        console.log('try to duplicate');
        if(!confirm('Do you want to duplicate this item?')){
            console.log('no');
        } else {
            console.log('duplicate');
            var url = "//" + api_host + "/api/material/duplicate/"+id;
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
                        window.location.reload(true);
                    }
                }
            });
        }
    });

    $(document).on('click', '#filtersCategory button', function() {
        $("#filters button[data-category]").hide().removeClass("btn-primary");
        $("#filters button:first-child").addClass("btn-primary");
       console.log($(this).text());
        if($(this).text() == "All"){
            $("#filters button").show();
        } else {
            $("#filters button[data-category='"+ $(this).text() +"']").show();
        }

    });

    $(document).on('change','#sports-filter',function(){
        var sports_selected = $(this).find("option:selected").val();
        var materials_data = $("#materials-data").val();
        materials_data = JSON.parse(materials_data);

        if(sports_selected != ""){
        $("#block-patterns-filter select option").hide();
            $.each(materials_data, function(i, item){
                if(sports_selected == item.uniform_category){
                    $('#block-patterns-filter select option[value="' + item.block_pattern + '"]').show();
                     $('#block-patterns-filter select option[value=""]').show();

                }
            });
            $("#necks-filter select option").hide();
            $.each(materials_data, function(i, item){
                if(sports_selected == item.uniform_category){
                    console.log(sports_selected);
                    console.log(item.uniform_category);
                    console.log(item.neck_option);
                    $('#necks-filter select option[value="' + item.neck_option + '"]').show();
                    $('#necks-filter select option[value=""]').show();
                }
            });
        }else{
            $("#block-patterns-filter select option").show();
        }


    });

    $(document).on('change','#block-patterns-filter',function(){

        var block_patterns_selected = $(this).find("option:selected").val();
        var materials_data = $("#materials-data").val();
        materials_data = JSON.parse(materials_data);

        if(block_patterns_selected != ""){
        $("#necks-filter select option").hide();
            $.each(materials_data, function(i, item){
                if(block_patterns_selected == item.block_pattern){

                    $('#necks-filter select option[value="' + item.neck_option + '"]').show();
                    $('#necks-filter select option[value=""]').show();
                }
            });
        }else{
            $("#necks-filter select option").show();
        }
    });


    $(document).on('click','.material-id-link',function(e){
        e.preventDefault();
        var url = $(this).data('link');
        var win = window.open(url, '_blank');
        win.focus();
    });

});
