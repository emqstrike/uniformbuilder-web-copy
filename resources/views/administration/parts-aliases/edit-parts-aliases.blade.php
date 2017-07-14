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
                <div class="panel-heading">Edit New Parts Aliases</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/parts_aliases/update" enctype="multipart/form-data" id='part_aliases_form'>
                        
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <input type="hidden" name="properties" id="properties" value="{{$part->properties}}">
                        <input type="hidden" name="partId" value="{{$part->id}}">
                        <button class="load-props" name="load-props" hidden="hidden"></button>
                        <input type="hidden" name="configurations" id="configurations"><div class="form-group">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-4">
                                <textarea name="description" class="form-control">{{$part->description}}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-4">
                                <select name="uniform_category_id" class="form-control uniform-category-id">
                                    @foreach($sports as $sport)
                                        <option value="{{ $sport->id }}" @if($part->uniform_category_id == $sport->id) selected="selected"@endif>{{ $sport->name }}</option>
                                    @endforeach 
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Template</label>
                            <div class="col-md-4">
                                <select name="price_item_template_id" class="form-control">
                                    @foreach($price_item_templates as $price_item_template)
                                        <option value="{{$price_item_template->id}}" @if($part->price_item_template_id == $price_item_template->id) selected="selected"@endif>{{ $price_item_template->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <select name="block_pattern_id" class="form-control">
                                    @foreach($block_patterns as $block_pattern)
                                        <option value="{{$block_pattern->id}}" @if($part->block_pattern_id == $block_pattern->id) selected="selected"@endif>{{ $block_pattern->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-4">
                                <select name="type" class="form-control">
                                  @foreach($types as $type)
                                        <option value="{{ $type }}" @if($type == $part->type) selected="selected"@endif>{{ $type }}</option>
                                  @endforeach
                                </select>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-1 control-label">Material ID</label>
                            <div class="col-md-1">
                                <input type="text" class="material-id-parts" value="92">
                            </div>
                            <div class="col-md-1">
                                    <a href="#" class="btn btn-primary get-parts">Get Parts</a>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-1 control-label">Qstrike Item ID</label>
                            <div class="col-md-1">
                                <input type="text" class="item-id" value="455"> 
                            </div>
                            <div class="col-md-1">
                                    <a href="#" class="btn btn-primary get-questions">Get Questions</a>
                            </div>
                        </div>

                        <div class="form-group">

                            <label class="col-md-1 control-label">Properties
                                <a href="#" class="btn btn-primary btn-xs add-props">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                </a>
                            </label>
                            <div class="col-md-11">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Part Name</th>
                                            <th>Question</th>
                                            <th>Edit Part Name</th>
                                            <th>Value</th>
                                            <th>Type</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="properties-content"></tbody>

                                </table>
                                 <div class="testproperties">
                                    <ol class="testol">
                                        
                                    </ol>
                                </div>
                                <!-- <select name="block_pattern_id" class="form-control">
                                    <option value="0"></option>
                                </select> -->
                            </div>

                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
                                </button>
                                <a href="/administration/parts_aliases" class="btn btn-danger">
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
<div id="getPartsModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3 class="modal-title" align="center">Please Wait</h3>
      </div>
      <div class="modal-body" align="center">
            <div class="progress">
                <div class="progress-bar progress-bar-info progress-bar-striped" style="width: 100%;">Loading...</div>
            </div>
      </div>
      <div class="modal-footer" >
        
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
<script type="text/javascript" src="/js/administration/parts-aliases.js"></script>
<script>
$(function(){
    
    //Load Props
    setTimeout(function(){
    $('.load-props').click();
    }, 500);

});   



</script>
@endsection
