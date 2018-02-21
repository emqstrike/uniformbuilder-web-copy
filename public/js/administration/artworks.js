$(document).ready(function(){



$('.assign-artwork').on('click', function(e){
    e.preventDefault();
    var data = {};
    data.artworks = $(this).data('artwork-json');
    data.ga_id = $(this).data('user-id');
    data.order_id = $(this).data('order-id');
    data.order_code = $(this).data('order-code');
    data.approve = false;
    data.item = "Uniform name";
    data.status = "processing";
    console.log(data);
    insertAR(data);
});

$('.file-link').on('click', function(e){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
});

$('.upload-mascot').on('click', function(e){
    e.preventDefault();
});

function insertAR(data){
    bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
    $.ajax({
        // url: '//' + api_host + '/api/artwork_request',
        url: '//api.prolook.com/api/artwork_request',
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            alert('Artwork Request Inserted!');
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}



});