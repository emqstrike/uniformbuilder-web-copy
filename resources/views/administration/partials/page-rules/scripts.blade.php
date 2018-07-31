<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>

<script>
    $(document).ready(function() {
        $('.pages').select2({
            multiple: true,
            allowClear: true
        });

        $('#type').change(function() {
            var type = $(this).val();

            $('#role').prop('disabled', true);

            if (type == 'administrator') {
                var url = "{{ route('get_available_admin_roles_in_page_rules') }}";
                console.log("{{ route('get_available_admin_roles_in_page_rules') }}");
            } else if (type == 'normal') {
                var url = "{{ route('get_available_normal_roles_in_page_rules') }}";
            }

            $.get(url, function(data, status) {
                var options = "";

                $('#role option').each(function() {
                    $(this).remove();
                });

                $('#role').prop('disabled', false);

                $.each(data, function(key, value) {
                    options += "<option value='" + value.code + "'>" + value.name + "</value>";
                });

                $('#role').append(options);
            });
        });

        $('#type').trigger('change');
    });
</script>