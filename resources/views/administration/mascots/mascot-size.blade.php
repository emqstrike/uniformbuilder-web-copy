@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-mascot-size"></span>
                        Mascot Sizes
                        <small>
                            <a href="/administration/mascot_size/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot Size
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered mascot-sizes'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Block Pattern Option</th>
                            <th>Type</th>
                            <th>Notes</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                         @forelse ($mascot_sizes as $mascot_size)

                        <tr class='mascot-size-{{ $mascot_size->id }}'>
                            <td>
                                {{ $mascot_size->id }}
                            </td>
                            <td>
                                {{ $mascot_size->sport }}
                            </td>
                            <td>
                                {{ $mascot_size->block_patterns }}
                            </td>
                            <td>
                                {{ $mascot_size->block_pattern_options }}
                            </td>
                            <td>
                                {{ $mascot_size->type }}
                            </td>
                             <td>
                                {{ $mascot_size->notes }}
                            </td>
                            <td>
                                @if( $mascot_size->active )g
                                    Yes
                                @else
                                    No
                                @endif
                            </td>
                            <td>
                                <a href="/administration/mascot_size/edit/{{ $mascot_size->id }}" class="btn btn-primary btn-xs edit-mascot-size" data-mascot-size-id="{{ $mascot_size->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger btn-xs delete-mascot-size" data-mascot-size-id="{{ $mascot_size->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>


                        </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Fonts
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

@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
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

    $(document).on('click', '.delete-mascot-size', function(){
        var id = $(this).data('mascot-size-id');
        modalConfirm('Remove mascot-size', 'Are you sure you want to delete the mascot-size?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/mascot_size/delete/";
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
                    $('.mascot-size-' + id).fadeOut();
                }
            }
        });
    });
});
</script>
@endsection
