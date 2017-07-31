@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<section class="content">
<!-- <a href="#" class="btn btn-success update-from-factory">TEST</a> -->
<!-- <a href="#" class="btn btn-success updatePart">Update Part</a> -->
<div><h1 style="display: inline;">"Processing" Artwork Requests</h1><a href="../artwork_requests" class="btn btn-primary pull-right">View "New" Artworks</a>
</div>
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
                            <th>Order code</th>
                            <th>Item</th>
                            <th>GA ID</th>
                            <th>Status</th>
                            <th>Artwork</th>
                            <th>Status / Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($artworks as $artwork)
                        <tr>
                            <td>
                                <p style="font-size: 17px">{{ $artwork->order_code }}</p>
                            </td>
                            <td>
                                <div>
                                    {{ $artwork->item }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $artwork->ga_id }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $artwork->status }}
                                </div>
                            </td>
                            <td>
                                <!-- <div> -->
                                <table class="table table-striped">
                                <tbody>
                                    @if ( isset($artwork->artworks) )
                                        {{--*/ $ctr = 0 /*--}}
                                        @foreach ($artwork->artworks as $art)
                                        <tr>
                                            <td>
                                            Application #{{ $art['code'] }}
                                            <img src="{{ $art['file'] }}" style="height: 30px; width: 30px;">
                                            <a href="../upload_artwork/{{ $artwork->id }}/{{ $ctr }}/{{ $artwork->user_id }}" class="btn btn-xs btn-primary">Upload Artwork</a></br>
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
                                @if ( isset($artwork->artworks) )
                                    {{--*/ $ctr = 0 /*--}}
                                    @foreach ($artwork->artworks as $art)
                                        @if( isset($art['user_rejected']) )
                                            <div class="alert alert-danger">
                                                Rejected
                                            </div>
                                            <a href="#" class="btn btn-xs btn-default">View notes</a>
                                        @elseif( isset($art['mascot_id']) && $art['approved'] == 1 )
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
<script type="text/javascript" src="/js/administration/artworks.js"></script>
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