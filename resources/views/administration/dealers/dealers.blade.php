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
                    <h3>Dealers</h3>
                    <a href="/administration/dealers/add" class='btn btn-md btn-default dealers-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Manager</th>
                            <th>Logo</th>                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($dealers as $item)
                        <tr class='dealer-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                                {{$item->name}}    
                            </td>
                            <td>
                                {{$item->description}}
                            </td>
                             <td>
                                {{$item->first_name}} {{$item->last_name}}
                            </td>
                            <td>                              
                                {{-- <a href="#"  class="file-link" data-link="{{$item->logo}}"> View </a> --}}
                                <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->logo }}">View</a>
                            </td>
                            <td class="td-buttons">
                              {{--   <a href="#" class="btn btn-default btn-xs " >
                                    <i class="glyphicon glyphicon-info-sign"> Info</i>
                                </a> --}}
                                <a href="/administration/dealers/edit/{{$item->id}}" class="edit-dealer btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-dealer btn btn-xs btn-danger" data-dealer-id="{{ $item->id }}" role="button">
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
    
    $('.delete-dealer').on('click', function(){
       var id = [];
       id.push( $(this).data('dealer-id'));
       console.log(id);
       modalConfirm('Remove Dealer', 'Are you sure you want to delete the dealer?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/dealers/delete";
       
        $.ajax({
           url: url,
           type: "POST",
           data: JSON.stringify({id: id}),
           dataType: "json",
           crossDomain: true,
           contentType: 'application/json',
           //headers: {"accessToken": atob(headerValue)},
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
                     $('.dealer-' + value).fadeOut();
                     // Will stop running after "three"
                     
                   });              

               }
           }
       });
   });

});
</script>
@endsection