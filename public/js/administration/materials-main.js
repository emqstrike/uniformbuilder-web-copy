$(document).ready(function() {

	var $container = $('.isotope').isotope({
    itemSelector: '.material-div',
    // layoutMode: 'fitRows',
    getSortData: {
      // name: '.name',
      // symbol: '.symbol',
      // number: '.number parseInt',
      category: '[data-category]',
      // weight: function( itemElem ) {
      //   var weight = $( itemElem ).find('.weight').text();
      //   return parseFloat( weight.replace( /[\(\)]/g, '') );
      // }
    }
  });

  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });
  
  // change is-checked class on buttons
  // $('.button-group').each( function( i, buttonGroup ) {
  //   var $buttonGroup = $( buttonGroup );
  //   $buttonGroup.on( 'click', 'button', function() {
  //     $buttonGroup.find('.is-checked').removeClass('is-checked');
  //     $( this ).addClass('is-checked');
  //   });
  // });

	$('.toggle-material').on('click', function(){
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
                }
            }
        });
    });

    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm(
            'Remove Material',
            'Are you sure you want to delete the Material?',
            id
        );
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
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
                    $('#confirmation-modal').modal('hide');
                    $('.material-' + id).fadeOut();
                }
            }
        });
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

});