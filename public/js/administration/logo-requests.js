$(document).ready(function(){

// $('.assign-artwork').on('click', function(e){
//     e.preventDefault();
//     var data = {};
//     data.artworks = $(this).data('artwork-json');
//     data.ga_id = $(this).data('user-id');
//     data.order_id = $(this).data('order-id');
//     data.order_code = $(this).data('order-code');
//     data.approve = false;
//     data.item = "Uniform name";
//     data.status = "processing";
//     console.log(data);
//     insertAR(data);
// });

$('.assign-button').on('click', function(e){
    e.preventDefault();
    console.log('assign button');
    // var data = {};
    // data.artworks = $(this).data('artwork-json');
    // data.ga_id = $(this).data('user-id');
    // data.order_id = $(this).data('order-id');
    // data.order_code = $(this).data('order-code');
    // data.approve = false;
    // data.item = "Uniform name";
    // data.status = "processing";
    // console.log(data);
    // insertAR(data);
});

$('.file-link').on('click', function(e){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
});

$('.upload-mascot').on('click', function(e){
    e.preventDefault();
});

$('.reject-logo').on('click', function(e){
    e.preventDefault();

    var data = {};
    data.subject = "This order was rejected because of the following reasons: ";
    data.order_code = $(this).data('code');
    // data.status = "rejected";
    data.type = $(this).data('type');
    data.sender_id = "0";
    data.recipient_id = $(this).data('user-id').toString();

    // console.log(data);

    bootbox.prompt({
        size: "medium",
        title: "Reject logo? Enter note.",
        message: "Reject Logo?",
        buttons: {
            'cancel': {
                label: 'Cancel'
                // className: 'btn-default pull-left'
            },
            'confirm': {
                label: 'Reject Logo',
                className: 'btn-danger pull-right'
            }
        },
        callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/
            if(result){
                bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
                var order_link = 'http://customizer.prolook.com/order/'+data.order_code;
                var message = "Please edit the order and submit it again using this link: "+order_link;
                data.content = result+". "+message; // message content
                console.log(data);
                insertMessage(data);
            } else {
                console.log('Canceled.');
            }
        }
    });
});

function insertMessage(data){
    var order_code = data.order_code;
    var type = data.type;
    var content = data.content;
    var recipient_id = data.recipient_id;

    console.log(data);
    $.ajax({
        // url: '//' + api_host + '/api/api/message',
        url: '//' + api_host + '/api/message',
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            // alert(data['message']);
            rejectArtwork(order_code, type, content, recipient_id);
            // window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function rejectArtwork(order_code, type, content,recipient_id){
    var data = {};
    data.order_code = order_code;
    data.content = content;
    data.type = type;
    data.recipient_id = recipient_id;
    
    $.ajax({
        url: '//' + api_host + '/api/v1-0/logo_request/reject',
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function insertAR(data){
    bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
    $.ajax({
        url: '//' + api_host + '/api/artwork_request',
        // url: '//' + api_host + '/api/artwork_request',
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
