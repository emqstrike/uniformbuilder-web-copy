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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/application_size/add" enctype="multipart/form-data" id='create_application_size'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="name" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select class="form-control" name="uniform_category_id">
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
                            <label class="col-md-4 control-label">Configurations</label>
                            <div class="col-md-6 config-content">
                                <a href="#" class='btn btn-xs btn-default add-configuration'>
                                    <span class="glyphicon glyphicon-plus"></span> Add
                                </a>
                            </div>
                        </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Information
                                </button>
                                <a href="/administration/block_patterns" class="btn btn-danger">
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
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/ddslick.min.js"></script>
<script>
$(document).ready(function(){

    window.table = '<hr><table class="table table-bordered"><tbody>';
    var app_numbers_options = buildAppNumOpts();
    window.table += `<tr>
                <td>Application Numbers</td>
                <td>
                    <select class="form-control app-numbers" multiple="multiple">
                        `+app_numbers_options+`
                    </select>
                </td>
            </tr>
            <tr>
                <td>Type</td>
                <td>
                    <select class="form-control app-type">
                        <option value="upper">Upper</option>
                        <option value="lower">Lower</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Sizes</td>
                <td>
                    <select class="form-control app-sizes" multiple="multiple">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </td>
            </tr>`;

    $(".add-configuration").click(function(e) {
        e.preventDefault();
        $('.config-content').append(window.table);
        refreshSelectBoxes();
    });

    function buildAppNumOpts(){
        var elem = '';
        for(var i = 1; i <= 51; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        return elem;
    }

    function refreshSelectBoxes(){
        $(".app-numbers").each(function(i) {
            $(this).select2({
                placeholder: "Select application numbers",
                multiple: true,
                allowClear: true
            });
        });

        $(".app-sizes").each(function(i) {
            $(this).select2({
                placeholder: "Select application sizes",
                multiple: true,
                allowClear: true
            });
        });
    }

    $("#create_application_size").on("change", ".app-numbers", function(e){

    });
});
</script>
@endsection
