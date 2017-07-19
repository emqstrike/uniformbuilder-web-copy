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

   	$('.delete-rep').on('click', function(){


       var id = [];
       id.push( $(this).data('rep-id'));
       
   	   modalConfirm('Remove part', 'Are you sure you want to remove this Sales Rep?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        console.log(id);
        
        var url = "//localhost:8888/api/sales_rep/delete/";
       
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

   