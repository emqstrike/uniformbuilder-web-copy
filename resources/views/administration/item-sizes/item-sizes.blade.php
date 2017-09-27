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
                    <h3>Item Sizes</h3>
                    <a href="/administration/item_size/add" class='btn btn-md btn-default item-size-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sport</th>
                            <th>Description</th>                                                     
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($item_sizes as $item)
                        <tr class='item-size-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                                {{$item->sport}}    
                            </td>
                            <td>
                                {{$item->description}}
                            </td>                       
                            <td class="td-buttons">                             
                                <a href="/administration/item_size/edit/{{$item->id}}" class="edit-item-size btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-item-size btn btn-xs btn-danger" data-item-size-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>
                                
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='1'>
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
@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
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

    
    $('.delete-item-size').on('click', function(){
       var id = [];
       id.push( $(this).data('item-size-id'));
       console.log(id);
       modalConfirm('Remove Item Size', 'Are you sure you want to delete the item size?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/item_size/delete";
       
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
                     $('.item-size-' + value).fadeOut();
                     // Will stop running after "three"
                     
                   });              

               }
           }
       });
   });

});
</script>
@endsection