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
                    <h3>Styles Index Items</h3>
                    <a href="/administration/style_index_item/add" class='btn btn-md btn-default dealers-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8' id='styles_indexes_table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>Alias</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Block Pattern Option</th>
                            <th>Description</th> 
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($style_index_items as $item)
                        <tr class='styles-index-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                              <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->thumbnail }}">View</a>
                            </td>
                            <td>
                                {{$item->name}}
                            </td>
                             <td>
                                {{$item->alias}} 
                            </td>
                            <td>                              
                                {{$item->description}} 
                            </td>
                            <td>                              
                               {{$item->gender}}
                            </td>
                            <td class="td-buttons">
                                <a href="/administration/styles_index/items/{{$item->id}}" class="view-styles-index-items btn btn-default btn-xs">
                                    <i class="fa fa-info-circle" aria-hidden="true"> View Items</i>
                                </a>                             
                                <a href="/administration/styles_index/edit/{{$item->id}}" class="edit-styles-index btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-styles-index btn btn-xs btn-danger" data-styles-index-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>
                                
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='10'>
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
  
    $('.file-link').on('click', function(){  
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });

    function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
    }
    
    $('#styles_indexes_table').on('click', '.delete-styles-index', function(){
       var id = [];
       id.push( $(this).data('styles-index-id'));
       console.log(id);
       modalConfirm('Remove Styles Index', 'Are you sure you want to delete the styles index?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/style_index/delete";
       
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
                     $('.styles-index-' + value).fadeOut();
                     // Will stop running after "three"
                     
                   });              

               }
           }
       });
   });

});
</script>
@endsection