$(document).ready(function() {
    $('.data-table').DataTable({
        'paging': true,
        'searching': true
    });

    $('body').on('click', '.delete-page', function() {
        var pageId = $(this).data('page-id');
        var url = "//" + api_host + "/api/page/" + pageId + "/delete/";

        var confirmation = confirm('Are you sure you want to delete this page?');

        if (confirmation == true) {
            $.ajax({
                url: url,
                type: 'GET',
                headers: {"accessToken": atob(headerValue)},
                contentType: 'application/json',
                success: function(response) {
                    if (response.success == true) {
                        location.reload();

                        new PNotify({
                            title: 'Success',
                            text: response.message,
                            type: 'success',
                            hide: true
                        });
                    } else {
                        new PNotify({
                            title: 'Error',
                            text: response.message,
                            type: 'error',
                            hide: true
                        });
                    }
                }
            });
        }
    });

    $('body').on('click', '.edit-page', function() {
        var id = $(this).data('page-id');
        var name = $(this).closest('tr').find('.page-name').text();
        var code = $(this).closest('tr').find('.page-code').text();

        $('#add-edit-page h4').text('Edit Page');

        $('#add-edit-page .input-page-id').val(id);
        $('#add-edit-page .input-page-name').val(name);
        $('#add-edit-page .input-page-code').val(code);

        $('#add-edit-page .btn-primary').addClass('update-page');

        $('#add-edit-page').modal('show');
    });

    $('.add-page').click(function() {
        $('#add-edit-page h4').text('Add Page');
        $('#add-edit-page .btn-primary').addClass('save-page');
        $('#add-edit-page').modal('show');
    });

    $('body').on('click', '.update-page', function() {
        $('#add-edit-page .alert-danger').fadeOut().empty();
        
        var id =  $('#add-edit-page .input-page-id').val();

        var data = {
            page_name: $('#add-edit-page .input-page-name').val(),
            code: $('#add-edit-page .input-page-code').val(),
            brand: $('#add-edit-page .input-page-brand').val()
        }

        var url = "//" + api_host + "/api/page/" + id + "/update/";

        $.ajax({
            url: url,
            type: 'PATCH',
            data: JSON.stringify(data),
            headers: {"accessToken": atob(headerValue)},
            contentType: 'application/json',
            success: function(response) {
                if (response.errors != undefined) {
                    var html = "<ul>";

                    $.each(response.errors, function(key, value) {
                        html += "<li>" + value + "</li>";
                    });

                    html += "</ul>";

                    $('#add-edit-page .alert-danger').append(html).fadeIn();
                } else {
                    if (response.success == true) {
                        location.reload();

                        new PNotify({
                            title: 'Success',
                            text: response.message,
                            type: 'success',
                            hide: true
                        });
                    } else {
                        new PNotify({
                            title: 'Error',
                            text: response.message,
                            type: 'error',
                            hide: true
                        });
                    }
                }
            }
        });
    });

    $('body').on('click', '.save-page', function() {
        $('#add-edit-page .alert-danger').fadeOut().empty();

        var data = {
            page_name: $('#add-edit-page .input-page-name').val(),
            code: $('#add-edit-page .input-page-code').val(),
            brand: $('#add-edit-page .input-page-brand').val()
        }

        var url = "//" + api_host + "/api/page/";

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            headers: {"accessToken": atob(headerValue)},
            contentType: 'application/json',
            success: function(response) {
                if (response.errors != undefined) {
                    var html = "<ul>";

                    $.each(response.errors, function(key, value) {
                        html += "<li>" + value + "</li>";
                    });

                    html += "</ul>";

                    $('#add-edit-page .alert-danger').append(html).fadeIn();
                } else {
                    if (response.success == true) {
                        location.reload();

                        new PNotify({
                            title: 'Success',
                            text: response.message,
                            type: 'success',
                            hide: true
                        });
                    } else {
                        new PNotify({
                            title: 'Error',
                            text: response.message,
                            type: 'error',
                            hide: true
                        });
                    }
                }
            }
        });
    });

    $('#add-edit-page').on('hidden.bs.modal', function (e) {
        $('#add-edit-page .btn-primary').removeClass('update-page');
        $('#add-edit-page .btn-primary').removeClass('save-page');

        $('#add-edit-page .input-page-id').val('');
        $('#add-edit-page .input-page-name').val('');
        $('#add-edit-page .input-page-code').val('');
    });
});

   