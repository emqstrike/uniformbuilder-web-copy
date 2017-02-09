@extends('administration.lte-main')

@section('styles')
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
                    <table data-toggle='table' class='table table-bordered mascot-sizes'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sport</th>
                            <th>Size</th>
                            <th>Scale</th>
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
                                {{ $mascot_size->size }}
                            </td>
                            <td>
                                {{ $mascot_size->scale }}
                            </td>                                                       <td>
                                <a href="/administration/mascot_size/edit/{{ $mascot_size->id }}" class="btn btn-primary btn-xs edit-mascot-size" data-mascot-size-id="{{ $mascot_size->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-mascot-size" data-mascot-size-id="{{ $mascot_size->id }}" role="button">
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<!-- <script type="text/javascript" src="/js/administration/mascot-sizes.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){

    $('.delete-mascot-size').on('click', function(){
        var id = $(this).data('mascot-size-id');
        modalConfirm('Remove mascot-size', 'Are you sure you want to delete the mascot-size?', id);
    });
    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');


       //var url = "//" + api_host + "/api/mascot_size/delete/";
       var url = "//localhost:8888/api/mascot_size/delete/";

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