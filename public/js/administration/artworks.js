$(document).ready(function(){



$('.assign-artwork').on('click', function(e){
    e.preventDefault();
    var data = {};
    data.artworks = $(this).data('artwork-json');
    data.ga_id = $(this).data('user-id');
    data.order_code = $(this).data('order-code');
    data.approve = false;
    data.item = "Uniform name";
    console.log(data);
    insertAR(data);
});

$('.file-link').on('click', function(e){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
});

function insertAR(data){
    $.ajax({
        url: '//' + api_host + '/api/artwork_request',
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            alert('Artwork Request Inserted!');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //Error Code Here
        }
    });
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}



});