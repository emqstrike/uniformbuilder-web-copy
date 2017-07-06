@extends('administration.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <section class="content">
        <div>
            <h1 style="display: inline;">"Processing" Custom Artwork Requests</h1>
            <a href="{{ route('indexCustomArtworkRequests') }}" class="btn btn-primary pull-right">View "New" Custom Artworks</a>
        </div>

        <div class="row">
            <input type="hidden" class="a-type" value="{{ $account_type }}">
            
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header"></div>

                    <div class="box-body">
                        <table class="data-table table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>GA ID</th>
                                    <th>File</th>
                                    <th>Origin</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($customArtworkRequests)
                                    @foreach ($customArtworkRequests as $customArtworkRequest)
                                        <tr>
                                            <td>{{ $customArtworkRequest->user }}</td>
                                            <td>{{ $customArtworkRequest->ga_id }}</td>
                                            <td>
                                                <a href="{{ $customArtworkRequest->file }}" class="btn btn-primary btn-xs">View File</a>
                                                <a href="{{ route('uploadCustomArtworkRequest', ['id' => $customArtworkRequest->id]) }}">Upload artwork</a>
                                            </td>
                                            <td>{{ $customArtworkRequest->origin }}</td>
                                            <td>{{ $customArtworkRequest->status }}</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs mark-as-done-custom-artwork" data-custom-artwork-id="{{ $customArtworkRequest->id }}">Mark as done</button>
                                            </td>
                                        </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="6">No Custom Artwork Requests</td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/bootbox.min.js"></script>
    <script type="text/javascript" src="/js/administration/artworks.js"></script>

    <script type="text/javascript">
        $('.mark-as-done-custom-artwork').click(function() {
            var data = {};

            data.custom_artwork_id = $(this).data('custom-artwork-id');

            bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });

            $.ajax({
                url: '//' + api_host + '/api/custom_artwork_requests/mark_as_done',
                type: "PATCH",
                data: JSON.stringify(data),
                contentType: 'application/json;',
                success: function (data) {
                    alert('Custom Artwork marked as done!');
                    window.location.reload();
                },
            });
        });
    </script>
@endsection