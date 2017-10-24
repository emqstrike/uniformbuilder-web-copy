@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<section class="content">
<!-- </div> -->
    <div class="row">
        <input type="hidden" class="a-type" value="{{ $account_type }}">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Origin</th>
                            <th>Type</th>
                            <th>Reference ID</th>
                            <th>Client</th>
                            <th>Submitted By</th>
                            <th>Artworks</th>
                            <th>Notes</th>
                            <th>User Notes</th>
                            <th>Status</th>
                            <th>Assigned GA</th>
                            <th>Date Submitted</th>
                            <th>Date Finished</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($logo_requests as $logo_request)
                        <tr>
                            <td>
                                {{ $logo_request->id }}
                            </td>
                            <td>
                                {{ $logo_request->origin }}
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->type }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->reference_id }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->client_name }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->submitted_by_user_id }}
                                </div>
                            </td>
                            <td>
                                <!-- <div> -->
                                <table class="table table-striped">
                                <tbody>
                                    @if ( isset($logo_request->properties) )
                                        {{--*/ $ctr = 0 /*--}}
                                        @foreach ($logo_request->properties as $item)
                                        <tr>
                                            <td>
                                            Application #{{ $item['code'] }}
                                            <img src="{{ $item['file'] }}" style="height: 30px; width: 30px;">
                                            <a href="upload_logo_request/{{ $logo_request->id }}/{{ $ctr }}/{{ $logo_request->submitted_by_user_id }}" class="btn btn-xs btn-primary">Upload Artwork</a></br>
                                            {{--*/ $ctr++ /*--}}
                                            </td>
                                        </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                                </table>
                                <!-- </div> -->
                            </td>
                            <td>
                                @if ( isset($logo_request->properties) )
                                    {{--*/ $ctr = 0 /*--}}
                                    @foreach ($logo_request->properties as $item)
                                    <p style="font-style: italic">{{ $item['notes'] }}</p>
                                        @if( isset($item['user_rejected']) )
                                            @if( $item['user_rejected'] == "1" )
                                                <div class="alert alert-danger">
                                                    Rejected
                                                </div>
                                            @endif
                                            <a href="#" class="btn btn-xs btn-default">View notes</a>
                                        @elseif( isset($item['mascot_id']) && $item['approved'] == 1 )
                                            <div class="alert alert-success">
                                                Approved
                                            </div>
                                        @else
                                        @endif
                                    {{--*/ $ctr++ /*--}}
                                    @endforeach
                                @endif
                            </td>
                            <td>
                                @if ( isset($logo_request->properties) )
                                    {{--*/ $ctr = 0 /*--}}
                                    @foreach ($logo_request->properties as $item)
                                        @if ( isset($item['user_notes']) )
                                         <p style="font-style: italic">{{ $item['user_notes'] }}</p>
                                        @endif
                                    {{--*/ $ctr++ /*--}}
                                    @endforeach
                                @endif
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->status }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->assigned_ga_id }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->created_at }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $logo_request->datetime_finished }}
                                </div>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs assign-button">Assign</a>
                                <a href="#" class="btn btn-success btn-xs">Mark Done</a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='7'>
                                No New Artwork Requests
                            </td>
                        </tr>

                    @endforelse

                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('administration.orders.order-view-modal')

@include('administration.orders.roster-view-modal')

@include('administration.orders.order-view-json-modal')

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<!-- <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script> -->
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/logo-requests.js"></script>
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