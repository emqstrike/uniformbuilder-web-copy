@extends('administration.lte-main')

@section('styles')
    <meta name="_token" content="{{ csrf_token() }}">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-envelope"></span>
                        Messages
                        <small>
                            <a href="/administration/message/compose" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Compose
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered messages-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>Content</th>
                            <th>Type</th>
                            <th>Order Code</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @if ($messages)
                            @foreach ($messages as $message)
                                <tr id="message-{{ $message->id }}">
                                    <td>{{ $message->id }}</td>
                                    <td>{{ $message->subject }}</td>
                                    <td>{{ $message->content }}</td>
                                    <td>{{ $message->type }}</td>
                                    <td>{{ $message->order_code }}</td>
                                    <td>{{ Carbon\Carbon::parse($message->created_at)->toFormattedDateString() }}</td>
                                    <td>
                                        <a href="#" data-message-id="{{ $message->id }}" class="btn btn-danger btn-xs edit-user delete-message">Delete</a>
                                    </td>
                                </tr>
                            @endforeach
                        @endif
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>

    <script>
        $(document).ready(function() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })

            $('.messages-table').DataTable();

            $('.delete-message').click(function(event) {
                event.preventDefault();

                var response = confirm('Are you sure you want to delete?');

                if (response == true) {
                    var id = $(this).data('message-id');

                    $.ajax({
                        method: 'POST',
                        url: "//{{ env('API_HOST') }}/api/messages/delete",
                        data: JSON.stringify({id: id}),
                        success: function(response) {
                            if (response.success) {
                                new PNotify({
                                    title: 'Success',
                                    text: response.message,
                                    type: 'success',
                                    hide: true
                                });

                                $('#message-' + id).fadeOut();
                            }
                        }
                    });
                }
            });
        });
    </script>
@endsection