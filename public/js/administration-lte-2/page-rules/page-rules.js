$(document).ready(function() {
    $('.allowed-pages').select2({
        multiple: true,
        allowClear: true
    });

    $('.select2-selection__choice').removeAttr('title');
    $('select').on('change', function (evt) {
        $('.select2-selection__choice').removeAttr('title');
    });

    $('.add-page-rule').click(function() {
        $('#add-page-rule .user-type').trigger('change');
        $('#add-page-rule').modal('show');
    });

    $('#add-page-rule .user-type').change(function() {
        $('#add-page-rule .user-role option').each(function(key, value) {
            $(this).remove();
        })

        var html = "";
        var type = $(this).val();
        var availableNormalRoles = $('table').data('available-normal-roles');
        var availableAdminRoles = $('table').data('available-admin-roles');

        if (type == 'administrator') {
            $.each(availableAdminRoles, function(key, role) {
                html += "<option value='" + role + "'>" + role + "</option>";
            });
        } else if (type == 'normal') {
            $.each(availableNormalRoles, function(key, role) {
                html += "<option value='" + role + "'>" + role.replace('_', ' ') + "</option>";
            });
        }

        $('#add-page-rule .user-role').append(html);
    });

    $('#add-page-rule').on('shown.bs.modal', function (e) {
        $('#add-page-rule .allowed-pages option').each(function(key, value) {
            $(this).remove();
        });

        var html = "";
        var pages = $('table').data('pages');

        $.each(pages, function(key, page) {
            html += "<option value='" + page.code + "'>" + page.page_name + " (" +  page.code + ")</option>";
        });

        $('#add-page-rule .allowed-pages').append(html);
    });

    $('.save-page-rule').click(function() {
        var data = {
            type: $('#add-page-rule .user-type').val(),
            role: $('#add-page-rule .user-role').val(),
            allowed_pages: JSON.stringify($('#add-page-rule .allowed-pages').val()),
            brand: $('#add-page-rule .input-page-rule-brand').val()
        }

        var url = "//" + api_host + "/api/page_rule/";

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
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
    });

    $('.remove-page-rule').click(function() {
        var id = $(this).data('page-rule-id');

        var url = "//" + api_host + "/api/page_rules/" + id + "/delete";

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
    });

    $('.edit-page-rule').click(function() {
        var html = "";

        var id = $(this).data('page-rule-id');
        var type = $(this).closest('tr').data('type');
        var role = $(this).closest('tr').data('role');
        var selectedAllowedPages = $(this).closest('tr').data('allowed-page');
        var pages = $('table').data('pages');

        $('#edit-page-rule .input-page-rule-id').val(id);
        $('#edit-page-rule .user-type').val(type);
        $('#edit-page-rule .user-role').val(role);

        $.each(pages, function(key, page) {
            if (selectedAllowedPages.indexOf(page.code) >= 0) {
                html += "<option value='" + page.code + "' selected='selected'>" + page.page_name + " (" +  page.code + ")</option>";
            } else {
                html += "<option value='" + page.code + "'>" + page.page_name + " (" +  page.code + ")</option>";
            }
        });

        $('#edit-page-rule .allowed-pages').append(html);
        $('#edit-page-rule').modal('show');
    });

    $('#edit-page-rule').on('hidden.bs.modal', function (e) {
        $('#edit-page-rule .allowed-pages option').each(function(key, value) {
            $(this).remove();
        });

        $('#edit-page-rule .user-type').val();
        $('#edit-page-rule .user-role').val();
    });

    $('.update-page-rule').click(function() {
        var id = $('#edit-page-rule .input-page-rule-id').val();
        
        var data = {
            allowed_pages: JSON.stringify($('#edit-page-rule .allowed-pages').val())
        }

        var url = "//" + api_host + "/api/page_rules/" + id + "/update";

        $.ajax({
            url: url,
            type: 'PATCH',
            data: JSON.stringify(data),
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
    });
});