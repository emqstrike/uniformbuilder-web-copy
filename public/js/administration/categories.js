$(document).ready(function(){
    $('.enable-category').on('click', function(){
        var id = $(this).data('category-id');
        var url = "//" + api_host + "/api/category/enable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.category-' + id;
                alert(response.message);
                $(elem + ' .disable-category').removeAttr('disabled');
                $(elem + ' .enable-category').attr('disabled', 'disabled');
                $(elem).removeClass('inactive');
            }
        });
    });

    $('.disable-category').on('click', function(){
        var id = $(this).data('category-id');
        var url = "//" + api_host + "/api/category/disable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.category-' + id;
                alert(response.message);
                $(elem + ' .disable-category').attr('disabled', 'disabled');
                $(elem + ' .enable-category').removeAttr('disabled');
                $('.category-' + id).addClass('inactive');
            }
        });
    });

    $('.delete-category').on('click', function(){
        var id = $(this).data('category-id');
        modalConfirm('Remove Uniform Category', 'Are you sure you want to delete the uniform category?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/category/delete/";
        $.getJSON(url, function(response){
            if (response.success) {
                $('#confirmation-modal').modal('hide');
                $('.category-' + id).fadeOut();
            }
        });
    });

    function modalConfirm(title, message, value)
    {
        $('#confirmation-modal .modal-title').text(title);
        $('#confirmation-modal .modal-body').text(message);
        $('#confirmation-modal .confirm-yes').data('value', value);
        $('#confirmation-modal').modal('show');
    }
});
