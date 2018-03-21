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
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading"><h4>Add New Styles Index Item</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/style_index_item/add" enctype="multipart/form-data" id='styles_indexes_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="style_index_id" value="{{ $style_index_id }}">                        
                                           
                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-4">
                               <input type="text" name="name" class="form-control">
                            </div>
                        </div>                       
                        <div class="form-group">
                            <label class="col-md-4 control-label">Alias</label>
                            <div class="col-md-4">
                              <input type="text" name="alias" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-4">
                                <select class="form-control sport" name="uniform_category_id">
                                    <option value="">None</option>
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->id }}'>{{ $sport->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <input type="hidden" class="block-pattern-val" id="block_pattern_value" name="block_pattern_value">
                                <select name="block_pattern_id[]" class="form-control block-pattern" id="block_pattern" multiple="multiple">                                  
                                </select>
                            </div>
                        </div>
                        <textarea name="hide" style="display:none;" id="block_patterns_data"><?php echo json_encode($block_patterns, JSON_FORCE_OBJECT);?></textarea>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Neck Option</label>
                            <div class="col-md-4">
                                <input type="hidden" class="neck-option-val" id="neck_option_value" name="neck_option_value">
                                <select class="form-control material-neck-option" name="neck_option[]" id="neck_option" multiple="multiple">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-4">
                              <input type="text" name="description" class="form-control">
                            </div>
                        </div>                   
                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-2">                                
                                <select class="form-control" name="gender">
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control thumbnail" name="thumbnail" accept="image/*" >
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-styles-index-item">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Style Index Item
                                </button>
                                <a href="/administration/styles_index/items/{{ $style_index_id }}" class="btn btn-danger">
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/ddslick.min.js"></script>

<script>
$(function(){
        window.block_patterns = null;

        getBlockPatterns(function(block_patterns){ 
            window.block_patterns = block_patterns; 
        });

        function getBlockPatterns(callback){
            var block_patterns;
<<<<<<< Updated upstream
            var url = "//api.prolook.com/api/block_patterns";
=======
<<<<<<< HEAD
            var url = "//" + api_host + "/api/block_patterns";
=======
            var url = "//api.prolook.com/api/block_patterns";
>>>>>>> c88c648330b46adcd3f1fdad8611414f33cadafe
>>>>>>> Stashed changes
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
        $(document).on('change', '.sport', function() {
        sport = $('.sport').val();
            getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; }); 
            var x = _.filter(window.block_patterns, function(e){ return e.uniform_category_id === sport; });
                    $( '#block_pattern' ).html('');
                    $.each(x, function(i, item) {
                        $('#block_pattern' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                    });
        $('#block_pattern').trigger('change');           
        });        
        $('.sport').trigger('change');
        var block_patterns_array = $('#block_patterns_data').text();
        var z = JSON.parse(block_patterns_array);
        window.block_patterns = _.flatten(z, true);
        $(document).on('change', '#block_pattern', function() {           
        var options = []; 
        var bps = $('#block_pattern_value').val();
        var bps_name = bps.toString().split(","); 
        console.log(bps_name);       
            bps_name.forEach( function(item_name) {               
                var name = item_name;
                $.each(z, function(i, item) {
                   if( item.name == name ){
                        var optx = JSON.parse(item.neck_options);
                        $.each(optx, function(i, item) {
                            options.push(item.name);
                        
                        });
                    } else {
                    }
                }); 
            });             
        var y = _.sortBy(_.uniq(options));
        $( '#neck_option' ).html('');
        y.forEach(function(i) {
            $('#neck_option').append('<option value="'+i+'">'+i+'</option>');
        });        
      }); 

    if($('#neck_option_value').val()){
        var bpos = JSON.parse($('#neck_option_value').val());   
    }
    $('.material-neck-option').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });
    
    $(".material-neck-option").change(function() {
        // $('#neck_option_value').val($(this).val());
        $('#neck_option_value').val($(this).val());
    });         

    $('.material-neck-option').select2('val', bpos);
    
    if($('#block_pattern_value').val()){
        var bp = JSON.parse($('#block_pattern_value').val());   
    }
    $('.block-pattern').select2({
        placeholder: "Select block pattern",
        multiple: true,
        allowClear: true
    });
    
    $(".block-pattern").change(function() {
        $('#block_pattern_value').val($(this).val());
    });         

    $('.block-pattern').select2('val', bp);



});   
</script>

@endsection
