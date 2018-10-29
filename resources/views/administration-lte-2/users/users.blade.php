@extends('administration-lte-2.lte-main')

@section('styles')
    <meta name="_token" content="{{ csrf_token() }}">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }

        span.select2 {
            width: 100% !important;
        }

        li.select2-selection__choice {
            color: black !important;
        }

        .select2-selection__clear {
            display: none;
        }
    </style>
@endsection

@section('content')
    <section class='content'>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Users')
                        <h1>
                            <span class="glyphicon glyphicon-user"></span>
                            Users
                            <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                        </h1>
                    </div>
                    <div class="box-body">
                        <table class='data-table table table-bordered table-hover users-table display' cellspacing="0">
                            <thead>
                                <input type="hidden" id="users-data" value="{{ $users_string }}">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th id="select-filter">Account Type</th>
                                    <th class="select-filter">Role</th>
                                    <th>Email</th>
                                    <th>Allowed Pages</th>
                                    <th id="select-filter">Rep Name</th>
                                    <th>Last Login</th>
                                    <th>Active Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                            @forelse ($users as $user)
                                <tr class='user-{{ $user->id }} {{ (!$user->active) ? ' inactive' : '' }}' data-limited-access="{{ $user->limited_access }}">
                                    <td class="td-user-id">{{ $user->id }}</td>
                                    <td>{{ $user->first_name }} {{ $user->last_name }}<input type="hidden" class="user-first-name" value="{{ $user->first_name }}"><input type="hidden" class="user-last-name" value="{{ $user->last_name }}"></td>
                                    <td class="td-user-type">{{ ucfirst($user->type) }}</td>
                                    <td id="td-user-type">{{ ucfirst($user->role) }}</td>
                                    <td class="td-user-email">{{ $user->email }}</td>

                                    <td class="td-user-allowed-pages" data-user-allowed-pages="{{ $user->allowed_pages }}">
                                        @if ($user->allowed_pages)
                                            @foreach (json_decode($user->allowed_pages, true) as $allowedPage)
                                                {{ $allowedPage }}<br>
                                            @endforeach
                                        @endif
                                    </td>
                                    <td>{{ $user->rep_first_name }} {{ $user->rep_last_name }}</td>
                                    <td>{{ $user->last_login }}
                                        <input type="hidden" class="user-role" value="{{ $user->role }}">
                                        <input type="hidden" class="user-zip" value="{{ $user->zip }}">
                                        <input type="hidden" class="user-rep-id" value="{{ $user->default_rep_id }}">
                                    </td>
                                    <td>
                                        <a href="#" class="btn btn-default btn-xs disable-user btn-flat" data-user-id="{{ $user->id }}" role="button" {{ ($user->active) ? : 'disabled="disabled"' }}>
                                            Disable
                                        </a>
                                        <a href="#" class="btn btn-info btn-xs enable-user btn-flat" data-user-id="{{ $user->id }}" role="button" {{ ($user->active) ? 'disabled="disabled"' : '' }}>
                                            Enable
                                        </a>
                                    </td>
                                    <td>
                                        <a href="#" class="btn btn-primary btn-xs btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                        <a href="#" class="btn btn-success btn-xs btn-flat edit-allowed-pages @if ((! $user->role) || (! $user->active)) disabled @endif" data-target="#allowedPagesModal" data-toggle="modal">Edit allowed pages</a>
                                        <a href="#" class="btn btn-primary btn-xs btn-flat view-trans pull-right" data-link="{{ env('CUSTOMIZER_HOST') }}/administration/v1-0/user/transactions/{{ $user->id }}">View Transactions</a>
                                        @if (1 == 0)
                                            @if ($user->email != Session::get('email'))
                                                <a href="#" class="btn btn-danger pull-right btn-xs btn-flat delete-user" data-user-id="{{ $user->id }}" role="button">Delete</a>
                                            @else
                                                <a href="#" class="btn btn-warning pull-right btn-xs" role="button">This is YOU</a>
                                            @endif
                                        @endif
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan='10'>
                                        No Users
                                    </td>
                                </tr>
                            @endforelse
                            </tbody>
                              <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    @include('administration-lte-2.users.users-modal')
    @include('administration-lte-2.users.allowed-pages-modal')
    @include('partials.confirmation-modal')
@endsection

@section('scripts')
    @include('administration-lte-2.partials.users.allowed-pages-scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){

            window.modal_action = null;
            window.sales_reps = null;

            $('.add-record').on('click', function(e) {
                e.preventDefault();
                window.modal_action = 'add';
                $('.modal-title').text('Add User Information');
                $('.submit-new-record').text('Add Record');
            });

            $('.edit-allowed-pages').click(function() {
                window.user_limited_access = $(this).closest('tr').data('limited-access');

                $('#default_allowed_pages option').each(function() {
                    $(this).remove();
                });

                $('#allowed_pages option').each(function() {
                    $(this).remove();
                });

                $('#limited_access option').each(function() {
                    $(this).remove();
                });
            });

            $(document).on('click', '.edit-record', function(e) {
                e.preventDefault();
                window.modal_action = 'update';
                $('.modal-title').text('Edit User Information');
                $('.submit-new-record').text('Update Record');
                var data = {};
                data.id = $(this).parent().parent().find('.td-user-id').html();
                data.first_name = $(this).parent().parent().find('.user-first-name').val();
                data.last_name = $(this).parent().parent().find('.user-last-name').val();
                var type = $(this).parent().parent().find('.td-user-type').html();
                data.type = type.toLowerCase();
                data.email = $(this).parent().parent().find('.td-user-email').html();
                data.role = $(this).parent().parent().find('.user-role').val();
                data.zip = $(this).parent().parent().find('.user-zip').val();
                data.rep_id = $(this).parent().parent().find('.user-rep-id').val();

                $('.input-user-id').val(data.id);
                $('.input-first-name').val(data.first_name);
                $('.input-last-name').val(data.last_name);
                $('.input-user-email').val(data.email);
                $('.input-user-type').val(data.type);
                $('.input-user-role').val(data.role);
                $('.input-rep-id').val(data.rep_id);
                $('.input-user-zip').val(data.zip);

                $('.input-user-password').val("");
                $('.input-confirm-password').val("");
            });

            $("#myForm").submit(function(e){
                e.preventDefault();
                var data = {};
                data.first_name = $('.input-first-name').val();
                data.last_name = $('.input-last-name').val();
                data.email = $('.input-user-email').val();
                data.type = $('.input-user-type').val();
                data.role = $('.input-user-role option:selected').val();
                data.default_rep_id = $('.input-rep-id option:selected').val();
                data.zip = $('.input-user-zip').val();

                var newPassword = $('.input-user-password').val();
                var newConfirm = $('.input-confirm-password').val();

                if(window.modal_action == 'add'){
                    data.password = newPassword;
                    var url = "//" + api_host +"/api/user";
                } else if(window.modal_action == 'update')  {
                    data.id = $('.input-user-id').val();
                    var url = "//" + api_host +"/api/user/update";
                    if(newPassword !== "" && newConfirm !== ""){
                        data.password = newPassword;
                    }
                }
                if (newPassword != newConfirm) {
                    new PNotify({
                        title: 'Warning',
                        text: 'Passwords does not match',
                        type: 'warning',
                        hide: true
                    });
                } else {
                    addUpdateRecord(data, url);
                }
            });

            function addUpdateRecord(data, url){
                $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json;',
                    headers: {"accessToken": atob(headerValue)},
                    success: function (data) {
                        if(data.success){
                            window.location.reload();
                            new PNotify({
                                title: 'Success',
                                text: data.message,
                                type: 'success',
                                hide: true
                            });
                        } else {
                            new PNotify({
                                title: 'Error',
                                text: data.message,
                                type: 'error',
                                hide: true
                            });
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                    }
                });
            };

            $("#myModal").on("hidden.bs.modal", function() {
                $('.input-user-id').val('');
                $('.input-first-name').val('');
                $('.input-last-name').val('');
                $('.input-user-email').val('');
                $('.user-type').val('normal');
                $('.user-role').val('default');
                $('.user-zip').val('');
                $('.input-user-password').val('');
                $('.input-confirm-password').val('');
            });

           $('.data-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "pageLength": 15,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false,
               initComplete: function () {
                this.api().columns('#select-filter').every( function () {
                    var column = this;
                    var select = $(`<select><option value=""></option></select>`)
                        .appendTo( $(column.footer()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                            .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );
                    column.data().unique().sort().each( function ( d, j ) {

                        select.append( `<option value="`+d+`">`+d+`</option>` );
                    } );
                } );
            }
            });

            $(document).on('click', '.enable-user', function(e) {
                e.preventDefault();
                var id = $(this).data('user-id');
                var url = "//" + api_host + "/api/user/enable/";
                $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify({id: id}),
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": atob(headerValue)},
                    success: function(response){
                        if (response.success) {
                            var elem = '.user-' + id;
                            new PNotify({
                                title: 'Success',
                                text: response.message,
                                type: 'success',
                                hide: true
                            });
                            $(elem + ' .disable-user').removeAttr('disabled');
                            $(elem + ' .enable-user').attr('disabled', 'disabled');
                            $(elem).removeClass('inactive');
                        }
                    }
                });
            });

            $(document).on('click', '.disable-user', function(e) {
                e.preventDefault();
                var id = $(this).data('user-id');
                var url = "//" + api_host + "/api/user/disable/";
                $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify({id: id}),
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": atob(headerValue)},
                    success: function(response){
                        if (response.success) {
                            var elem = '.user-' + id;
                            new PNotify({
                                title: 'Success',
                                text: response.message,
                                type: 'success',
                                hide: true
                            });
                            $(elem + ' .enable-user').removeAttr('disabled');
                            $(elem + ' .disable-user').attr('disabled', 'disabled');
                            $(elem).addClass('inactive');
                        }
                    }
                });
            });

            $('.delete-user').on('click', function(){
                var id = $(this).data('user-id');
                modalConfirm('Remove user', 'Are you sure you want to delete the user?', id);
            });

            $('#confirmation-modal .confirm-yes').on('click', function(){
                var id = $(this).data('value');
                var url = "//" + api_host + "/api/user/delete/";
                $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify({id: id, loggedInUser: window.loggedInUser}),
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": atob(headerValue)},
                    success: function(response){
                        if (response.success) {
                            $('#confirmation-modal').modal('hide');
                            $('.user-' + id).fadeOut();
                        } else {
                            $('#confirmation-modal').modal('hide');
                            new PNotify({
                                title: 'Success',
                                text: response.message,
                                type: 'success',
                                hide: true
                            });
                        }
                    }
                });
            });

            getSalesReps(function(sales_reps){ window.sales_reps = sales_reps; });
            function getSalesReps(callback){
                var sales_reps;
                var url = "//" +api_host+ "/api/sales_reps";
                $.ajax({
                    url: url,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    success: function(data){
                        sales_reps = data['sales_reps'];
                        if(typeof callback === "function") callback(sales_reps);
                    }
                });
            }

            var sr_elem ='';
            var sorted_sales_reps = _.sortBy(window.sales_reps, function(e) { return e.last_name });
            _.each(sorted_sales_reps, function(sr) {
                sr_elem += '<option value="'+sr.id+'">'+sr.last_name+', '+sr.first_name+'['+sr.rep_id+']</option>';
            });
            $('.input-rep-id').append(sr_elem);

            $(document).on('click', '.view-trans', function(e) {
            e.preventDefault(e);
            var url = $(this).data('link');
            OpenInNewTab(url);
            });

            function OpenInNewTab(url) {
                var win = window.open(url, '_blank');
                win.focus();
            }

            @if (Session::has('message'))
                new PNotify({
                    title: 'Success',
                    text: "{{ Session::get('message') }}",
                    type: 'success',
                    hide: true
                });
            @endif
        });
    </script>
@endsection
