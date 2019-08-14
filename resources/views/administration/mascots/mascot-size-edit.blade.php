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
</style>

<link rel="stylesheet" type="text/css" href="/css/libs/select2/selectize.css">
@endsection
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
                <div class="panel-heading">Edit Mascot Size</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/mascot_size/update" enctype="multipart/form-data" id='update-mascot-size-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="mascot_size_id" value="{{ $mascot_size->id }}">
                        <input type="hidden" id="old_props_data" value="{{ $mascot_size->properties }}">
                        <input type="hidden" id="props_data" value="" name="props_data">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="name" value="{{ $mascot_size->name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select class="form-control sport" name="uniform_category_id" id="uniform_category_id" required="true">
                                    <option value="">None</option>
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->id }}' @if($sport->id == $mascot_size->uniform_category_id) selected="selected"@endif>{{ $sport->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-6">
                                <input type="hidden" class="block-pattern-val" id="block_pattern_value" name="block_pattern_value" value="{{ $mascot_size->block_patterns }}">
                                <select name="block_pattern_id[]" class="form-control block-pattern" id="block_pattern" multiple="multiple" required="true">
                                </select>
                            </div>
                        </div>
                       <textarea name="hide" style="display:none;" id="block_patterns_data"><?php echo json_encode($block_patterns, JSON_FORCE_OBJECT);?></textarea>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Options</label>
                            <div class="col-md-6">
                                <input type="hidden" class="neck-option-val" id="neck_option_value" name="block_pattern_options_value" value="{{ $mascot_size->block_pattern_options }}">
                               <select class="form-control material-neck-option" name="neck_option[]" id="neck_option" multiple="multiple" required="true">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name="type" class="form-control type">
                                    <option value="lower" @if($mascot_size->type == "lower") selected @endif>Lower</option>
                                    <option value="upper" @if($mascot_size->type == "upper") selected @endif>Upper</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Active</label>
                            <div class="col-md-6">
                                <select name="active" class="form-control active">
                                    <option value="0" @if($mascot_size->active == 0) selected @endif>No</option>
                                    <option value="1" @if($mascot_size->active == 1) selected @endif>Yes</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Brand</label>
                           <div class="col-md-6">
                                <select name="brand" class="form-control">
                                        <option value="none" @if($mascot_size->brand == "none") selected="selected"@endif>None</option>
                                        <option value="prolook" @if($mascot_size->brand == "prolook") selected="selected"@endif>Prolook</option>
                                        <option value="richardson" @if($mascot_size->brand == "richardson") selected="selected"@endif>Richardson</option>
                                        <option value="riddell" @if($mascot_size->brand == "riddell") selected="selected"@endif>Riddell</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Notes</label>
                            <div class="col-md-6">
                               <textarea class="form-control notes" name="notes">{{ $mascot_size->notes }}</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Size & Scale Properties</label>
                            <div class="col-md-6">
                                <a href="#" class="btn btn-xs btn-primary add-prop">Add</a>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>Scale</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="props-content">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-mascot-size">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Mascot Size
                                </button>
                                <a href="/administration/mascot_sizes" class="btn btn-danger">
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
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

window.properties = [];

loadProperties();

$('.add-prop').on('click', function(e){
    e.preventDefault();
    var elem = `<tr class="prop-row">
                    <td>
                        <input type="number" class="prop-size prop-data" step="0.01">
                    </td>
                    <td>
                        <input type="number" class="prop-scale prop-data" step="0.01">
                    </td>
                    <td>
                        <a href="#" class="btn btn-xs btn-danger remove-prop">Remove</a>
                    </td>
                </tr>`;
    $('.props-content').prepend(elem);
    removeButton();
    updateFields();
    updateData();
});

function loadProperties(){
    if( $('#old_props_data').val() ){
        var properties = JSON.parse($('#old_props_data').val());
        properties.forEach(function(entry) {
            var elem = `<tr class="prop-row">
                    <td>
                        <input type="number" class="prop-size prop-data" step="0.01" value="` + entry.size + `">
                    </td>
                    <td>
                        <input type="number" class="prop-scale prop-data" step="0.01" value="` + entry.scale + `">
                    </td>
                    <td>
                        <a href="#" class="btn btn-xs btn-danger remove-prop">Remove</a>
                    </td>
                </tr>`;
            $('.props-content').append(elem);
            removeButton();
            updateFields();
            updateData();
        });
    }
}

function removeButton(){
    $('.remove-prop').on('click', function(e){
        e.preventDefault();
        $(this).parent().parent().remove();
        updateData();
    });
}

function updateData(){
    window.properties = [];
    $(".prop-row").each(function(i) {
        var x = {
            size: $(this).find('.prop-size').val(),
            scale: $(this).find('.prop-scale').val()
        };
        window.properties.push(x);
    });
    $('#props_data').val(JSON.stringify(window.properties));
}

function updateFields(){
    $('.prop-data').on('keyup', function(){
        updateData();

    });
}

window.block_patterns = null;
    getBlockPatterns(function(block_patterns){
        window.block_patterns = block_patterns;
    });

    function getBlockPatterns(callback){
        var block_patterns;
        var url = "//" +api_host+ "/api/block_patterns";
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
        var x = _.filter(window.block_patterns, function(e){ return e.uniform_category_id == sport; });
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
