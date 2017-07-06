@extends('administration.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <section class="content">
        <div>
            <h1 style="display: inline;">
                Custom Artwork Requests

                <a href="{{ route('getProcessingCustomArtworkRequests') }}" class="btn btn-primary pull-right">View "Processing" Custom Artworks</a>
            </h1>
        </div>

        <div>
            <div class="row">
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
                                                </td>
                                                <td>{{ $customArtworkRequest->origin }}</td>
                                                <td>{{ $customArtworkRequest->status }}</td>
                                                <td>
                                                    @if ($customArtworkRequest->status != "processing" )
                                                        <button class="btn btn-primary btn-xs assign-custom-artwork" data-custom-artwork-id="{{ $customArtworkRequest->id }}" data-ga-id="{{ $user_id }}">
                                                            Assign
                                                        </button>
                                                    @endif

                                                    <button class="btn btn-danger btn-xs reject-artwork">
                                                        Reject
                                                    </button>
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
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/bootbox.min.js"></script>
    <script type="text/javascript" src="/js/administration/custom-artwork-request.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function(){
            $('.data-table').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": true,
                "autoWidth": false
            });
        });
    </script>
@endsection