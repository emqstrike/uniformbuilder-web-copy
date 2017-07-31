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
                <div class="panel-heading"><h4>Add New Cuts Links</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/cuts_links/add" enctype="multipart/form-data" id='part_aliases_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <input type="hidden" name="id" id="id">
                                           
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-4">
                                <select name="sport" class="form-control sport">
                                    @foreach($sports as $sport)
                                        <option value="{{ $sport->id }}">{{ $sport->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>                       
                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <select name="block_pattern_id" class="form-control" id="block_pattern">
                                   @foreach($block_patterns as $block_pattern)
                                        <option value="{{ $block_pattern->id }}">{{ $block_pattern->name }}</option>
                                    @endforeach
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
                                <input type="file" class="form-control cuts-pdf" name="cuts_pdf" accept=".ai,.pdf" >
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Cuts Links
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
