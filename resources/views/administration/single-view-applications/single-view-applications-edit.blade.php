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
                <div class="panel-heading">Modifys Category with Single Applications</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/single_view_applications/update" enctype="multipart/form-data" id='create_application_size'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="id" value="{{ $single_view_applications->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-4">
                                <select class="form-control sport" name="uniform_category_id" id="uniform_category_id" >
                                    <option value="">None</option>
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->id }}' @if($sport->id == $single_view_applications->uniform_category_id) selected="selected"@endif>{{ $sport->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <input type="hidden" class="block-pattern-val" id="block_pattern_value" name="block_pattern_value" value="{{ $single_view_applications->block_patterns }}">
                                <select name="block_pattern_id[]" class="form-control block-pattern" id="block_pattern" multiple="multiple">
                                </select>
                            </div>
                        </div>
                       <textarea name="hide" style="display:none;" id="block_patterns_data"><?php echo json_encode($block_patterns, JSON_FORCE_OBJECT);?></textarea>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Neck Option</label>
                            <div class="col-md-4">
                                <input type="hidden" class="neck-option-val" id="neck_option_value" name="neck_option_value" value="{{ $single_view_applications->neck_options }}">
                               <select class="form-control material-neck-option" name="neck_option[]" id="neck_option" multiple="multiple">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-2">
                                <select class="form-control app-type" name="type">
                                    <option value="upper" @if($single_view_applications->type == "upper") selected="selected"@endif >Upper</option>
                                    <option value="lower" @if($single_view_applications->type == "lower") selected="selected"@endif >Lower</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Active</label>
                            <div class="col-md-2">
                                <select class="form-control app-active" name="active">
                                    <option value="1" @if($single_view_applications->active == 1) selected="selected"@endif >Yes</option>
                                    <option value="0" @if($single_view_applications->active == 0) selected="selected"@endif >No</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
                                </button>
                                <a href="/administration/single_view_applications" class="btn btn-danger">
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
    var block_patterns_val = $('#block_pattern_value').val();
    var block_patterns_value = block_patterns_val.toString().split(",");

    $(document).on('change', '.sport', function() {
    sport = $('.sport').val();
        getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; });
        var x = _.filter(window.block_patterns, function(e){ return e.uniform_category_id === sport; });
                block_patterns_value.forEach(function(pattern) {
                    $( '#block_pattern' ).html('');
                    $.each(x, function(i, item) {
                        if( pattern == item.name ){
                        $('#block_pattern' ).append( '<option value="' + item.name + '" selected>' + item.name + '</option>' );
                        }
                        else {
                        $('#block_pattern' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                        }
                    });
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
            var name = item_name
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
        $('.material-neck-option').trigger('change');
    });

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

    if($('#neck_option_value').val()){
        var bpos = JSON.parse($('#neck_option_value').val());
    }
    $('.material-neck-option').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    $(".material-neck-option").change(function() {
        $('#neck_option_value').val($(this).val());
    });

    $('.material-neck-option').select2('val', bpos);

});

</script>

@endsection
