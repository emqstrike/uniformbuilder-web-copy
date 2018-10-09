@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>Categories with Single View Applications</h3>
                    <a href="/administration/single_view_applications/add" class='btn btn-md btn-default single-view-applications-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class="data-table table table-bordered table-striped table-hover" id="application-sizes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($single_view_applications as $item)
                        <tr class='single-view-applications-{{ $item->id }}'>
                            <td>
                                {{ $item->id }}
                            </td>
                            <td>
                                {{ $item->sport }}
                            </td>
                            <td>
                                {{ $item->block_patterns }}
                            </td>
                            <td>
                                {{ $item->neck_options }}
                            </td>
                            <td>
                                {{ $item->type }}
                            </td>
                            <td>
                                @if($item->active == 1)
                                {{ 'Yes' }}
                                @else
                                {{ 'No' }}
                                @endif
                            </td>
                            <td>
                                <a href="single_view_applications/edit/{{ $item->id }}" class="btn btn-xs btn-primary">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-single-view-applications btn btn-xs btn-danger" data-single-view-applications-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='7'>
                                No Record
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

@include('partials.confirmation-modal')
{{-- @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal']) --}}


@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>

<script type="text/javascript">
$(document).ready(function(){
    try {
        $('.data-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false
        });
    } catch(e) {
        // statements
        console.log(e);
    }

    $(document).on('click', '.delete-single-view-applications', function(){
       var id = [];
       id.push( $(this).data('single-view-applications-id'));
       modalConfirm('Remove Single View Applications', 'Are you sure you want to delete the single view application?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/single_view_applications/delete";

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
                   new PNotify({
                       title: 'Success',
                       text: response.message,
                       type: 'success',
                       hide: true
                   });
                   $('#confirmation-modal').modal('hide');
                  $.each(id, function (index, value) {
                     console.log(value);
                     $('.single-view-applications-' + value).fadeOut();
                     // Will stop running after "three"

                   });

               }
           }
       });
    });

});
</script>
@endsection
