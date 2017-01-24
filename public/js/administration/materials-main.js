$(document).ready(function() {

	// var $container = $('.isotope').isotope({
	//     itemSelector: '.material-div',
	//     getSortData: {
	//       category: '[data-category]'
	//     }
	// });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
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
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                    // var val = $('<div/>').html(d).text();
                    // select.append( '<option value="' + val + '">' + val + '</option>' );
                } );
            } );
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

	// $('.toggle-material').on('click', function(){
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

    $('.duplicate-material').on('click', function(){
        var id = $(this).data('material-id');
        var name = $(this).data('material-name');
        modalConfirm(
            'Duplicate Material',
            'Are you sure you want to duplicate the Material: '+ name +'?',
            id,
            'confirm-yes',
            'confirmation-modal-duplicate-material'
        );
    });

    $('#confirmation-modal-duplicate-material .confirm-yes').on('click', function(){
        var id = $(this).data('value');
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
    });

    $(document).on('click', '#filtersCategory button', function() {
        $("#filters button[data-category]").hide().removeClass("btn-primary");
        $("#filters button:first-child").addClass("btn-primary");
       console.log($(this).text());
        if($(this).text() == "All"){
            $("#filters button").show();
        }
        else{
           
            $("#filters button[data-category='"+ $(this).text() +"']").show();
        }

    });



});