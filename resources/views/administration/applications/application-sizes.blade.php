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
                    <h3>Application Sizes</h3>
                    <a href="/administration/application_size/add" class='btn btn-md btn-default appication-size-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class="data-table table table-bordered table-striped table-hover" id="application-sizes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Uniform Application Type</th>
                            <th>Brand</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($application_sizes as $item)
                        <tr class='application-size-{{ $item->id }}'>
                            <td>
                                {{ $item->id }}
                            </td>
                            <td>
                                {{ $item->name }}
                            </td>
                            <td>
                                {{ $item->sport }}
                            </td>
                            <td>
                                {{ $item->block_pattern }}
                            </td>
                            <td>
                                {{ $item->neck_option }}
                            </td>
                            <td>
                                {{ $item->type }}
                            </td>
                            <td>
                                {{ $item->uniform_application_type }}
                            </td>
                            <td>
                                {{ $item->brand }}
                            </td>
                            <td>
                                {{ $item->notes }}
                            </td>
                            <td>
                                <a href="application_size/edit/{{ $item->id }}" class="btn btn-xs btn-primary">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="duplicate-application-size btn btn-xs btn-default" data-application-size-id="{{ $item->id }}" data-application-size-name="{{ $item->name }}" role="button">
                                    <i class="glyphicon glyphicon-copy"> Clone</i>
                                </a>

                                <a href="#" class="delete-application-size btn btn-xs btn-danger" data-application-size-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
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
@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-duplicate-application-size'])

@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/js/administration/artworks.js"></script>

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

    $('.delete-application-size').on('click', function(){
       var id = [];
       id.push( $(this).data('application-size-id'));
       console.log(id);
       modalConfirm('Remove Application Size', 'Are you sure you want to delete the application size?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/application_size/delete";

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
                     $('.application-size-' + value).fadeOut();
                     // Will stop running after "three"

                   });

               }
           }
       });
    });

    $('#application-sizes-table').on('click', '.duplicate-application-size', function(e){
        e.preventDefault();
        var id = $(this).data('application-size-id');
        var name = $(this).data('application-size-name');
        modalConfirm(
            'Duplicate Application Size',
            'Are you sure you want to duplicate the Application Size: '+ name +'?',
            id,
            'confirm-yes',
            'confirmation-modal-duplicate-application-size'
        );

    });

    $('#confirmation-modal-duplicate-application-size .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/application_size/duplicate";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            // headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal').modal('hide');
                    window.location.reload(true);
                }
            }
        });
    });

});
</script>
@endsection
