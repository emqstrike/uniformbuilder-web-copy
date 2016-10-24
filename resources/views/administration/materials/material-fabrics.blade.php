@extends('administration.lte-main')



@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        Materials Fabrics
                        <small>
                            <a href="/administration/materials_fabric/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Material Fabric
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered materials_fabrics'>
                    <thead>
                        <tr>
                            <th>Material Id</th>
                            <th>Material</th>
                            <th>Factory Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        @forelse ($materials_fabrics as $key => $materials_fabric)
                        
                          <tr class='materials-fabric-{{ $materials_fabric->id }} '>
                            <td>{{ $materials_fabric->material_id }}</td>
                            <td>{{ $materials_fabric->material }}</td>
                            <td>{{ $materials_fabric->factory_id }}</td>
                            <td>
                                <a href="/administration/materials_fabric/edit/{{ $materials_fabric->id }}" class="btn btn-primary btn-xs edit-materials-fabric" data-materials-fabric-id="{{ $materials_fabric->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-materials-fabric" data-materials-fabric-id="{{ $materials_fabric->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>

                            </td> 
                                   
                                

                          </tr>

                        @empty

                            <tr>
                                <td colspan='4'>
                                    No Materials Fabrics
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
    
@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript">
    $(document).on('click', '.delete-materials-fabric', function(){
      $.confirm({
      title: 'Materials Fabrics',
      content: 'Are you want to delete Materials Fabrics?',
      confirmButton: 'YES',
      cancelButton: 'NO',
      confirmButtonClass: 'confirmButtonYes btn-danger',
      cancelButtonClass: 'confirmButtonNo btn-success',
      });
      $(".confirmButtonYes").attr('data-materials-fabric-id',$(this).data('materials-fabric-id'));
     

     
    });
    
    $(document).on('click', '.confirmButtonYes', function(){
      
        var id = $(this).data('materials-fabric-id');

         //var url = "http://localhost:8888/api/materials_fabric/delete";
        var url = "//" + api_host + "/api/materials_fabric/delete/";
                   
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
                    // $('#confirmation-modal').modal('hide');
                    $('.font-' + id).fadeOut();
                     $( ".box-body" ).load( location+" .materials_fabrics" );  

                }
            }
        });
     });
</script>
<!-- <script type="text/javascript" src="/js/administration/materials_fabrics.js"></script> -->

@endsection
