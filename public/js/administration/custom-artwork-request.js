$('.assign-custom-artwork').click(function() {
    var data = {};

    data.ga_id             = $(this).data('ga-id');
    data.custom_artwork_id = $(this).data('custom-artwork-id');
    data.status            = "processing";

    assignGA(data);
});

function assignGA(data)
{
    bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
    $.ajax({
        url: '//' + api_host + '/api/custom_artwork_requests/update',
        type: "PATCH",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            alert('Custom Artwork Request Inserted!');
            window.location.reload();
        },
    })
}