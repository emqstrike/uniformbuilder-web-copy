<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script>
    $(document).ready(function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });

        $(document).on('click', '.edit-allowed-pages', function(e) {
            e.preventDefault();

            var user_allowed_pages = $(this).parent().parent().find('.td-user-allowed-pages').data('user-allowed-pages');
            var data = {};

            data.user_id = $(this).parent().parent().find('.td-user-id').html();

            data.first_name = $(this).parent().parent().find('.user-first-name').val();
            data.last_name = $(this).parent().parent().find('.user-last-name').val();

            var type = $(this).parent().parent().find('.td-user-type').html();
            data.type = type.toLowerCase();
            data.role = $(this).parent().parent().find('.user-role').val();

            $('#user_id').val(data.user_id);
            $('#first_name').val(data.first_name);
            $('#last_name').val(data.last_name);
            $('#type').val(data.type);
            $('#role').val(data.role);

            var url = "{{ env('APP_URL') }}/administration/page_rule/" + data.type + "/" + data.role;

            $.get(url, function(data, status) {
                var allowed_pages = "";

                if (data.allowed_pages) {
                    allowed_pages = JSON.parse(data.allowed_pages);

                    var html = "";

                    jQuery.each(allowed_pages, function(key, value) {
                        html += "<option selected='selected' value='" + value + "'>" + value + "</option>";
                    });

                    $('#default_allowed_pages').append(html);
                }

                $.get("{{ env('APP_URL') }}/administration/pages/v1-0", function(data, status) {
                    var html = "";

                    jQuery.each(data, function(key, value) {
                        if (allowed_pages.indexOf(value.code) < 0) {    
                            if (user_allowed_pages.indexOf(value.code) >= 0) {
                                html += "<option selected='selected' value='" + value.code + "'>" + value.code + "</option>";
                            } else {
                                html += "<option value='" + value.code + "'>" + value.code + "</option>";
                            }
                        }
                    });

                    $('#allowed_pages').append(html);
                });

                $.get("{{ env('APP_URL') }}/administration/pages/v1-0", function(data, status) {
                    var user_limited_access = window.user_limited_access;
                    console.log(user_limited_access);
                    var html = "";

                    jQuery.each(data, function(key, value) {
                        if (user_limited_access.indexOf(value.code) >= 0) {
                            html += "<option selected='selected' value='" + value.code + "'>" + value.code + "</option>";
                        } else {
                            html += "<option value='" + value.code + "'>" + value.code + "</option>";
                        }
                    });

                    $('#limited_access').append(html);
                });
            });
        });

        $('#default_allowed_pages').select2({
            multiple: true,
            allowClear: true
        });

        $('#limited_access').select2({
            multiple: true,
            allowClear: true
        });

        $('#allowed_pages').select2({
            multiple: true,
            allowClear: true
        });

        $('#allowedPagesForm').submit(function(e) {
            e.preventDefault();

            var data = {};
            data.user_id = $('#user_id').val();
            data.allowed_pages = $('#allowed_pages').val();
            data.limited_access = $('#limited_access').val();

            $.ajax({
                url: "{{ env('APP_URL') }}/administration/user/update_allowed_pages",
                type: "POST",
                data: data,
                success: function(response) {
                    if(response.success){
                        window.location.reload();
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
            })
        });
    });
</script>