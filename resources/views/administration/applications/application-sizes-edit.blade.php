@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
    
li.select2-selection__choice {
    color: black !important;
}

.animated {
    -webkit-transition: height 0.2s;
    -moz-transition: height 0.2s;
    transition: height 0.2s;
}
.inputs {
    width: 45px;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Application Size</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/application_size/update" enctype="multipart/form-data" id='create_application_size'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="application_size_id" value="{{ $application_size->id }}">
                        <input type="hidden" name="properties" id="properties">
                        <input type="hidden" name="old_properties" id="old_properties" value="{{ $application_size->properties }}">
                        <input type="hidden" id="pattern_id" value="{{ $application_size->block_pattern_id}}">                                      
                        <input type="hidden" id="existing_neck_option" value="{{ $application_size->neck_option }}">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="name" value="{{ $application_size->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select class="form-control sport" name="uniform_category_id">
                                    <option value="">None</option>
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->id }}' @if($sport->id == $application_size->uniform_category_id) selected="selected"@endif>{{ $sport->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-6">
                                <select name="block_pattern_id" class="form-control" id="block_pattern">                                    
                                </select>
                            </div>
                        </div>
                       <textarea name="hide" style="display:none;" id="block_patterns_data"><?php echo json_encode($block_patterns, JSON_FORCE_OBJECT);?></textarea>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Neck Option</label>
                            <div class="col-md-6">
                               <select class="form-control material-neck-option" name="neck_option" id="neck_option">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">                                
                                <select class="form-control app-type" name="type">
                                    <option value="upper" @if($application_size->type == "upper") selected="selected"@endif >Upper</option>
                                    <option value="lower" @if($application_size->type == "lower") selected="selected"@endif >Lower</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Notes</label>
                            <div class="col-md-6">
                               <textarea class="form-control notes" name="notes">{{ $application_size->notes }}</textarea>
                            </div>
                        </div>                                              
                        <div class="row form-group">
                            <label class="col-md-1 control-label">Properties
                                <a href="#" class="btn btn-primary btn-xs add-props">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                </a>
                            </label>
                        </div>
                        <div class="row form-group">   
                            <div class="col-md-11">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Application Numbers</th>
                                            <th>Size</th>
                                            <th>Scale</th>
                                            <th>Default</th>                                           
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="properties-content">
                                        
                                    </tbody>
                                </table>                              
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
                                </button>
                                <a href="/administration/application_sizes" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                        <br><br>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script src="/js/administration/common.js"></script>
<script src="/jquery-ui/jquery-ui.min.js"></script>
<script src="/js/libs/select2/select2.min.js"></script>
<script src="/js/ddslick.min.js"></script>
<script src="/underscore/underscore.js"></script>
<script src="/js/administration/application-sizes.js"></script>

<script>
$(function(){
    
    window.block_patterns = null;
    getBlockPatterns(function(block_patterns){
        window.block_patterns = block_patterns;
    });

    function getBlockPatterns(callback){
        var block_patterns;
        var url = "//api-dev.qstrike.com/api/block_patterns";        
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }    
    var sport = null;
    var block_pattern_id = $('#pattern_id').val();
    var existing_neck_option = $('#existing_neck_option').val(); 
    $(document).on('change', '.sport', function() {
    sport = $('.sport').val();
        getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; }); 
        var x = _.filter(window.block_patterns, function(e){ return e.uniform_category_id === sport; });
                $( '#block_pattern' ).html('');
                $.each(x, function(i, item) {
                    if( block_pattern_id == item.id ){
                    $('#block_pattern' ).append( '<option value="' + item.id + '" selected>' + item.name + '</option>' );
                    }
                    else {
                    $('#block_pattern' ).append( '<option value="' + item.id + '">' + item.name + '</option>' );
                    }
                });
    $('#block_pattern').trigger('change');           
    });  
    $('.sport').trigger('change');
    $.each(window.block_patterns, function(i, item) {
        if( item.id === block_pattern_id ){
            window.neck_options = JSON.parse(item.neck_options);
            $.each(window.neck_options, function(i, item) {
                if( existing_neck_option == item.name ){
                    $( '#neck_option' ).append( '<option value="' + item.name + '" selected>' + item.name + '</option>' );
                } else {
                    $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                }
            });
        }
    });

   var block_patterns_array = $('#block_patterns_data').text();
    var z = JSON.parse(block_patterns_array);
    window.block_patterns = _.flatten(z, true);
    $(document).on('change', '#block_pattern', function() {
    var id = $(this).val();
    $( '#neck_option' ).html('');
    $.each(z, function(i, item) {
       if( item.id == id ){
            var optx = JSON.parse(item.neck_options);
            $.each(optx, function(i, item) {
                $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
            });
        } else {
        }
    });
  }); 

});   

</script>

@endsection
