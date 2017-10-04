@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/jjsonviewer/css/jjsonviewer.css">
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>Inksoft Designs</h3>
                    <a href="/administration/inksoft_design/add" class='btn btn-md btn-default inksoft-designs-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Design ID</th>
                            <th>User ID</th>
                            <th>PNG</th>
                            <th>SVG</th>
                            <th>Design Summary</th>
                            <th>Design Details</th>
                            <th>Category</th> 
                            <th>Type</th> 
                            <th>Is Public</th>                             
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($inksoft_designs as $item)
                        <tr class='inksoft-design-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                             <td>
                                <a href="#" class="btn btn-default btn-xs file-link" data-link="{{$item->thumbnail}}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>                                
                            </td>
                            <td>
                                {{$item->design_id}}    
                            </td>
                            <td>
                                {{$item->user_id}}
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs file-link" data-link="{{$item->png_filename}}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>                                                               
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs file-link" data-link="{{$item->svg_filename}} "><i class="fa fa-picture-o" aria-hidden="true"></i></a>                              
                                
                            </td>
                            <td>
                                <input type="hidden" class="design-summary" value="{{ $item->design_summary }}">
                                <button class="view-design-summary btn btn-default btn-sm">View</button>                          
                            </td>
                            <td>
                                <input type="hidden" class="design-details" value="{{$item->design_details}}">
                                <button class="view-design-details btn btn-default btn-sm">View</button>                             
                            </td>
                            <td>
                                {{$item->category}} 
                            </td>
                            <td>
                                @if($item->type == "user_design") 
                                    {{'User Design'}}
                                @elseif($item->type == "tailsweeps")
                                    {{'Tailsweeps'}}
                                @elseif($item->type == "kollege_town")
                                    {{'Kollege Town'}}
                                @else
                                    {{'None'}}
                                @endif
                            </td>
                            <td>
                                @if($item->is_public == 1) 
                                    {{'Yes'}}
                                @else 
                                    {{'No'}}
                                @endif                               
                            </td>                            
                            <td class="td-buttons">                             
                                <a href="/administration/inksoft_design/edit/{{$item->id}}" class="edit-inksoft-design btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-inksoft-design btn btn-xs btn-danger" data-inksoft-design-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>
                                
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='12'>
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
  <!-- Modal -->
<div id="viewModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
        <div class="modal-content modal-lg">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3 class="modal-title" align="center">Design</h3>
            </div>
            <div class="modal-body" align="left">
                  <div class="codes">                      
                      <pre id="design" ></pre>
                  </div>
            </div>
            <div class="modal-footer" >
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
<script type='text/javascript' src='/jjsonviewer/js/jjsonviewer.js'></script>


<script type="text/javascript">
$(document).ready(function(){
  
    $('.file-link').on('click', function(){  
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    }); 

    function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
    }

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });   

    $('.view-design-summary').on('click', function(e){
        e.preventDefault();
        //Open loading modal
        getSummary($(this));
        $('#viewModal').modal('show');  
      
    });

    function getSummary(thisObj) {
      var jsonVal = thisObj.parent().parent().find('.design-summary').val();
      var pJson = JSON.parse(jsonVal);
      var sJson = JSON.stringify(pJson, undefined, 2);      
      $('#design').jJsonViewer(sJson, {expanded: true});  
    }

    $('.view-design-details').on('click', function(e){
        e.preventDefault();
        //Open loading modal
        getDetails($(this));
        $('#viewModal').modal('show');   
    });

    function getDetails(thisObj) {
      var jsonVal = thisObj.parent().parent().find('.design-details').val();
      var pJson = JSON.parse(jsonVal);
      var sJson = JSON.stringify(pJson, undefined, 2);   
      $('#design').jJsonViewer(sJson, {expanded: true});      
    }


    $('.delete-inksoft-design').on('click', function(){
       var id = [];
       id.push( $(this).data('inksoft-design-id'));
       console.log(id);
       modalConfirm('Remove Design', 'Are you sure you want to delete the Inksoft Design?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/inksoft_design/delete";
       
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
                     $('.inksoft-design-' + value).fadeOut();
                     // Will stop running after "three"
                     
                   });              

               }
           }
       });
   });

});
</script>
@endsection