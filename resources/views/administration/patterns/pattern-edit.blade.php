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
@section('content')



<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Pattern</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/pattern/update" enctype="multipart/form-data" id='edit-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="base_pattern_id" value="{{ $pattern->id }}">
                        <input type="hidden" id="pattern_properties" name="pattern_properties" value="{{ $pattern->pattern_properties }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control pattern-name" name="name" value="{{ $pattern->name }}">
                            </div>
                        </div>
                      
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sports</label>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" value="{{ $pattern->sports }}">
                                <select name="sports[]" class="form-control sports" multiple="multiple">
                                    @foreach ($categories as $category)
                                        @if ($category->active)
                                        <option value='{{ $category->name }}'>
                                            {{ $category->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                    <option value="All">All</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Target Block Pattern Option</label>
                            <div class="col-md-6">
                                <input type="hidden" class="block-pattern-options-val" id="block_pattern_options_value" name="block_pattern_options_value" value="{{ $pattern->block_pattern_options }}">
                                <select name="block_pattern_options[]" class="form-control block-pattern-options" multiple="multiple">
                                    {{-- @foreach ($categories as $category)
                                        @if ($category->active)
                                        <option value='{{ $category->name }}'>
                                            {{ $category->name }}
                                        </option>
                                        @endif
                                    @endforeach --}}
                                    <!-- <option value="All">All</option> -->
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Asset Target</label>
                            <div class="col-md-6">
                                <select class="form-control pattern-asset-target" name="asset_target" id="asset_target">
                                    <option value="web" @if( $pattern->asset_target == "web" ) selected="selected"@endif>Web</option>
                                    <option value="ipad" @if( $pattern->asset_target == "ipad" ) selected="selected"@endif>iPad</option>
                                    <option value="team_stores" @if( $pattern->asset_target == "team_stores" ) selected="selected"@endif>Team Stores</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                                @if ($pattern->thumbnail_path)
                                <div class="thumbnail_path">
                                    <img src="{{ $pattern->thumbnail_path }}" width="100px" height="100px">
                                    <!-- <a href="#" class="btn btn-danger btn-xs delete-pattern-thumbnail"
                                        data-pattern-id="{{ $pattern->id }}"
                                        data-field="thumbnail_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a> -->
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Pattern Layer</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer #</th>
                                            <th>Default Color</th>
                                            <th>Thumbnail</th>
                                            <th>New Pattern File</th>
                                            <th>Team Color ID</th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container" class="layers"></tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-pattern">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Pattern
                                </button>
                                <a href="/administration/patterns" class="btn btn-danger">
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

@section('scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/patterns.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
@endsection
@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){

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
    // $('.block-pattern-options').html('');
    // var sports = $('.sports-val').val().slice(1, -1).split('"').join('');
    var sports = $('.sports-val').val().split('"').join('');
    var sports_arr = null;
    var block_pattern_options = [];
    console.log('[[SPORTS]]');
    console.log(sports);
    if(sports != null){
        sports_arr = sports.split(",");
        console.log(sports_arr);
        sports_arr.forEach(function(entry) {
            console.log('ENTRY: ' + entry);
            var x = _.filter(window.block_patterns, function(e){ return e.uniform_category === entry; });
            console.log(x);
            x.forEach(function(entry) {
                var y = JSON.parse(entry.neck_options);

                var list = [];
                _.each(y, function(item){
                    list.push(_.omit(item, 'children'));
                    list.push(_.flatten(_.pick(item, 'children')));
                });
                var result = _.flatten(list);
                // console.log('[ RESULT ]');
                // console.log(result);
                // console.log(_.flatten(y, true));
                // for(var i = 0; i <= 10; i++){
                //     console.log(y[i]);
                //     if( y[i] !== 'undefined' ){
                //         console.log('gets in');
                //         block_pattern_options.push(y[i].name);
                //     }
                    // }
                result.forEach(function(i) {
                    block_pattern_options.push(i.name);
                    // $('.block-pattern-options').append('<option value="'+i.name+'">'+i.name+'</option>');
                });
            });
            // var z = _.uniq(block_pattern_options);
            
            // z.forEach(function(i) {
            //     $('.block-pattern-options').append('<option value="'+i+'">'+i+'</option>');
            // });
            // console.log(y);
            // x = _.flatten(y, true);
            // block_pattern_options.push(x.neck_options);
        });
        var z = _.sortBy(_.uniq(block_pattern_options));
        $('.block-pattern-options').html('');
        z.forEach(function(i) {
            $('.block-pattern-options').append('<option value="'+i+'">'+i+'</option>');
        });
    }


}
// console.log(block_pattern_options);

    $('select:not(:has(option))').attr('visible', false);

    $('.layer-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        $(this).css('color', '#fff');
        $(this).css('text-shadow', '1px 1px #000');
    });
    var inviteList = [
    {
        text: 'Option One',
        value: 1
    },
    {
        text: 'Option Two',
        value: 2
    }
];


 
    if($('#sports_value').val()){
        var sports = JSON.parse($('#sports_value').val());   
    }
    // var sports = JSON.parse($('#sports_value').val());

    $('.sports').select2({
        placeholder: "Select sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('#sports_value').val($(this).val());
        bindBPOS();
        console.log('change sports binded BPOS')
    });

    $('.sports').select2('val', sports);


// BLOCK PATTERN OPTIONS


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



    // $('.input-tags').selectize({
    //                 plugins: ['remove_button'],
    //                 persist: false,
    //                 create: true,
    //                 items: [{ id: 1, name: 'test' }, { id: 2, name: 'test2' }],
    //                 render: {
    //                     item: function(data, escape) {
    //                         return '<div>"' + escape(data.text) + '"</div>';
    //                     }
    //                 },
                     

    //                 // onDelete: function(values) {
    //                 //     return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
    //                 // }
    //             });

var options=[
    {value:0, text:"option 0"},
    {value:1, text:"option 1"},
    {value:2, text:"option 2"},
    {value:3, text:"option 3"},
];
var $select = $('#select-gear').selectize({
                    sortField: 'text',
                    plugins: ['remove_button'],
                    items: [{ id: 1, name: 'test' }, { id: 2, name: 'test2' }],
                    "options":options
                });



    $('.input-tags').selectize({
                    plugins: ['remove_button'],
                    persist: false,
                    create: true,
                    items: [{ id: 1, name: 'test' }, { id: 2, name: 'test2' }],
                    render: {
                        item: function(data, escape) {
                            return '<div>"' + escape(data.text) + '"</div>';
                        }
                    },
                     

                    // onDelete: function(values) {
                    //     return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
                    // }
                });



    

});
</script>
@endsection