@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>

@endsection

@section('content')

@if (Session::has('message'))
<div class="alert alert-{{ Session::get('alert-class') }} alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <i class="fa fa-bookmark"></i>
                        Feedbacks
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered feedbacks'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <!-- <th>Subject</th> -->
                                <th>Date</th>
                                <th>Content</th>
                                <th>Type</th>
                                <th>Email</th>
                                <th>User ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($feedbacks as $feedback)
                    <tr class='feature-flag-{{ $feedback->id }} '>
                        <td>
                            {{ $feedback->id }}
                        </td>
                        <!-- <td>
                            {{ $feedback->subject }}
                        </td> -->
                        <td>
                            {{ $feedback->created_at }}
                        </td>
                        <td>
                            {{ $feedback->content }}
                        </td>
                        <td>
                            {{ $feedback->type }}
                        </td>
                        <td>
                            {{ $feedback->email }}
                        </td>
                        <td>
                            {{ $feedback->user_id }}
                        </td>
                        <td>
                            @if($feedback->reply == null)
                            <a href="feedback/reply/{{ $feedback->id }}" class="btn btn-primary btn-xs">Reply</a>
                            @else
                            <a href="feedback/thread/{{ $feedback->id }}" class="btn btn-success btn-xs">Thread</a>
                            @endif
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Feature Flags Found
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

{{-- @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal']) --}}

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection