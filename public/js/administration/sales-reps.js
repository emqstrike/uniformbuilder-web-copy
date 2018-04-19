$(document).ready(function(){


    $('.view-zip-codes').on('click', function(e){
        e.preventDefault();
        //Open loading modal
        getZIP($(this));
        $('#viewZIPCodes').modal('show');

    });

   	function getZIP(thisObj) {
   		var zip = thisObj.parent().parent().find('.zip-codes').val();
   		$('.zips').val(zip);
   	}

    $(document).on('click', '.delete-rep', function() {
       var id = [];
       id.push( $(this).data('rep-id'));

   	   modalConfirm('Remove Sales Rep', 'Are you sure you want to remove this Sales Rep?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/sales_rep/delete/";

        $.ajax({
           url: url,
           type: "POST",
           data: JSON.stringify({id: id}),
           dataType: "json",
           crossDomain: true,
           contentType: 'application/json',
           //headers: {"accessToken": atob(headerValue)},
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
                     $('.reps-' + value).fadeOut();

                     // Will stop running after "three"

                   });


               }
           }
       });
   });

});


