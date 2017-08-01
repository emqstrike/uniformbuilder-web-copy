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
                    <h3>Cuts Links</h3>
                    <a href="/administration/cuts_links/add" class='btn btn-md btn-default cuts-links-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sport</th>
                            <th>Block Pattern ID</th>
                            <th>Neck Option</th>
                            <th>Cuts PDF</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($cuts_links as $item)
                        <tr class='cut-link-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                                {{$item->sport_name}}    
                            </td>
                            <td>
                                {{$item->block_pattern}}
                            </td>
                             <td>
                                {{$item->neck_option}}
                            </td>
                            <td>
                                {{$item->cuts_pdf}}
                            </td>
                            <td class="td-buttons">
                                <a href="#" class="btn btn-default btn-xs " >
                                    <i class="glyphicon glyphicon-info-sign"> Info</i>
                                </a>
                                <a href="/administration/cuts_links/edit/{{$item->id}}" class="edit-cut-link btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-cut-links btn btn-xs btn-danger" data-cut-link-id="{{ $item->id }}" role="button">
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
<script type="text/javascript" src="/js/administration/parts-aliases.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
    
    $('.delete-cut-links').on('click', function(){
       var id = [];
       id.push( $(this).data('cut-link-id'));
       console.log(id);
       modalConfirm('Remove Cut Links', 'Are you sure you want to delete the cut link?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//api-dev.qstrike.com/api/cuts_links/delete/";
        //var url = "//localhost:8888/api/cuts_links/delete/";
       
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
                     $('.cut-link-' + value).fadeOut();
                     // Will stop running after "three"
                     
                   });              

               }
           }
       });
   });

});
</script>
@endsection