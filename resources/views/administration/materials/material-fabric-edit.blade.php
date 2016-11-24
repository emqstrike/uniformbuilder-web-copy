@extends('administration.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New mascot</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/materials_fabric/add" enctype="multipart/form-data" id='create-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="materials_fabric_id" id="materials_fabric_id" value="{{ $materials_fabric->id }}">  
                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Id</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control materials-id" name="material_id" value="{{ $materials_fabric->material_id }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Materials</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control materials" name="material_name" value="{{ $materials_fabric->material }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Factorys</label>
                            <div class="col-md-6">
                                <select name='factory_id' class="form-control factory-id">
                                    @foreach ($factories as $factory)
                                        @if ($factory->active)
                                            @if( ($factory -> id) == $materials_fabric->factory_id) 
                                                 <option  selected="selected" value='{{ $factory->id }}'>{{ $factory->name }}</option>
                                             @else if
                                                <option value='{{ $factory->id }}'>{{ $factory->name }}</option>
                                             @endif
                                        @endif
                                    @endforeach
                                </select>
                            
                            </div>
                        </div>
                 
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="btn btn-primary create-materials-fabrics">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Material Fabric
                                </div>
                                <a href="/administration/materials_fabrics" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
});


window.data = {};
data.id = $("#materials_fabric_id").val();
$(document).on('change', '.materials-id', function(){
    data.material_id = $(this).val();
 });
$(document).on('change', '.materials', function(){

    data.material = $(this).val();
 });
$(document).on('change', '.factory-id', function(){

        data.factory_id = $(this).val();



        console.log(data);
  
  
 });

$(document).on('click', '.create-materials-fabrics', function(){

  


     //var url = "http://localhost:8888/api/materials_fabric/update";
    var url = "//" + api_host + "/api/materials_fabric/update";
               
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
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
            

            }
        }
    });
  
 });




</script>
@endsection