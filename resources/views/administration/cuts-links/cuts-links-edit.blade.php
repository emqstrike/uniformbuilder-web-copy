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
                <div class="panel-heading"><h4>Edit Cuts Links</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/cuts_links/update" enctype="multipart/form-data" id='cut_links_form'>

                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <input type="hidden" name="id" value="{{$cut_links->id}}">
                        <input type="hidden" id="pattern_id" value="{{ $cut_links->block_pattern_id}}">
                        <input type="hidden" id="existing_neck_option" value="{{ $cut_links->neck_option }}">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-4">
                                <select name="sport" class="form-control sport">
                                    @foreach($sports as $sport)
                                        <option value="{{ $sport->id }}" @if($cut_links->sport == $sport->id) selected="selected"@endif>{{ $sport->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <select name="block_pattern_id" class="form-control" id="block_pattern">
                                    {{-- @foreach($block_patterns as $block_pattern)
                                        <option value="{{$block_pattern->id}}" @if($cut_links->block_pattern_id == $block_pattern->id) selected="selected"@endif>{{ $block_pattern->name }}</option>
                                    @endforeach --}}
                                </select>
                            </div>
                        </div>
                       <textarea name="hide" style="display:none;" id="block_patterns_data"><?php echo json_encode($block_patterns, JSON_FORCE_OBJECT);?></textarea>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Neck Option</label>
                            <div class="col-md-4">
                               <select class="form-control material-neck-option" name="neck_option" id="neck_option">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Cuts PDF</label>
                            <div class="col-md-4 material">
                                <input type="text" class="form-control" value="{{ $cut_links->cuts_pdf }}" disabled>
                                <input type="file" class="form-control cuts-pdf" name="cuts_pdf" accept=".ai,.pdf">
                            </div>
                        </div>

                        <hr>

                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-cut-links">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
                                </button>
                                <a href="/administration/cuts_links" class="btn btn-danger">
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

<!-- Modal -->

@endsection

@section('custom-scripts')
<script src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script src="/js/administration/common.js"></script>
<script src="/jquery-ui/jquery-ui.min.js"></script>
<script src="/js/libs/select2/select2.min.js"></script>
<script src="/js/ddslick.min.js"></script>
<script src="/underscore/underscore.js"></script>
<script>
$(function(){

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
    var block_pattern_id = $('#pattern_id').val();
    var existing_neck_option = $('#existing_neck_option').val();
    $(document).on('change', '.sport', function() {
    sport = $('.sport').val();
        getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; });
        var x = _.filter(window.block_patterns, function(e){ return e.uniform_category_id == sport; });
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
        if( item.id == block_pattern_id ){
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
