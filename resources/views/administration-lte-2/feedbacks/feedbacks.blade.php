@extends('administration-lte-2.lte-main')

@section('styles')

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
                    @section('page-title', 'Feedbacks')
                    <h1>
                        <i class="fa fa-comments"></i>
                        Feedbacks
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-hover table-bordered display feedbacks'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th style="width: 100px;">Date</th>
                                <th>Content</th>
                                <th>Type</th>
                                <th>Email</th>
                                <th>User ID</th>
                                <!-- <th>Action</th> -->
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($feedbacks as $feedback)
                    <tr class='feature-flag-{{ $feedback->id }} '>
                        <td>
                            {{ $feedback->id }}
                        </td>
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
 <!--                        <td>
                            @if($feedback->reply == null)
                            <a href="feedback/reply/{{ $feedback->id }}" class="btn btn-flat btn-primary btn-xs">Reply</a>
                            @else
                            <a href="feedback/thread/{{ $feedback->id }}" class="btn btn-flat btn-success btn-xs">Thread</a>
                            @endif
                        </td> -->
                    </tr>

                @empty

                    <tr>
                        <td colspan='6'>
                            No Feedbacks Found
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

<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "pageLength": 15
    });
});
</script>
@endsection
