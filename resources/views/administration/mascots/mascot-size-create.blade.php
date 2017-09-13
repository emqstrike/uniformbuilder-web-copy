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
                <div class="panel-heading">Add New Mascot Size</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/mascot_size/add" enctype="multipart/form-data" id='create-mascot-size-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" id="props_data" value="" name="props_data">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select class="form-control sport" name='sport'>
                                @foreach ($sports as $sport)
                                    <option value='{{ $sport->name }}'>{{ $sport->name }}</option>
                                @endforeach
                                </select>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Target Block Pattern Option</label>
                            <div class="col-md-6">
                                <input type="hidden" class="block-pattern-options-val" id="block_pattern_options_value" name="block_pattern_options_value">
                                <select name="block_pattern_options[]" class="form-control block-pattern-options" multiple="multiple">

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name="type" class="form-control type">
                                    <option value="lower">Lower</option>
                                    <option value="upper">Upper</option>
                                </select>
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
                                <button type="submit" class="btn btn-primary create-mascot-size">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Mascot Size
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
<!-- <script type="text/javascript" src="/js/administration/mascot-sizes.js"></script> -->
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

window.properties = [];

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
    console.log(JSON.stringify(window.properties));
    $('#props_data').val(JSON.stringify(window.properties));
}

function updateFields(){
    $('.prop-data').on('keyup', function(){
        updateData();
        // window.properties = [];
        // $(".prop-row").each(function(i) {
        //     var x = {
        //         size: $(this).find('.prop-size').val(),
        //         scale: $(this).find('.prop-scale').val()
        //     };
        //     window.properties.push(x);
        // });
    });
    // console.log(JSON.stringify(window.properties));
}

$(document).on("change",".sport",function(){     
    bindBPOS();
    console.log("change sport");
});

window.block_patterns = null;

getBlockPatterms(function(block_patterns){ window.block_patterns = block_patterns; });

function getBlockPatterms(callback){
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

console.log(window.block_patterns);
bindBPOS();
function bindBPOS(){
    // var sports = $('.sports-val').val().split('"').join('');
    var sports = $('.sport').val();
    // console.log(sports);
    var sports_arr = null;
    var block_pattern_options = [];
    // console.log('[[SPORTS]]');
    // console.log(sports);
    if(sports != null){
        sports_arr = sports.split(",");
        console.log(sports_arr);
        sports_arr.forEach(function(entry) {
            // console.log('ENTRY: ' + entry);
            var x = _.filter(window.block_patterns, function(e){ return e.uniform_category === entry; });
            // console.log(x);
            x.forEach(function(entry) {
                var y = JSON.parse(entry.neck_options);
                var list = [];
                _.each(y, function(item){
                    list.push(_.omit(item, 'children'));
                    list.push(_.flatten(_.pick(item, 'children')));
                });
                var result = _.flatten(list);

                result.forEach(function(i) {
                    block_pattern_options.push(i.name);
                });
            });
        });
        var z = _.sortBy(_.uniq(block_pattern_options));
        $('.block-pattern-options').html('');
        z.forEach(function(i) {
            $('.block-pattern-options').append('<option value="'+i+'">'+i+'</option>');
        });
    }
}

if($('#block_pattern_options_value').val()){
        var bpos = JSON.parse($('#block_pattern_options_value').val());   
    }
    // var sports = JSON.parse($('#sports_value').val());

    $('.block-pattern-options').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    $(".block-pattern-options").change(function() {
        $('#block_pattern_options_value').val($(this).val());
    });

    $('.block-pattern-options').select2('val', bpos);

});
</script>
@endsection