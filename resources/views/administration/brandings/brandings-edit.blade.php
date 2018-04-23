@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading"><h4>Edit Brand</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/brandings/update" enctype="multipart/form-data" id='brandings_form'>

                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <input type="hidden" name="id" value="{{$brandings->id}}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-4">
                               <input type="text" name="site_name" class="form-control" value="{{$brandings->site_name}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-4">
                              <input type="text" name="site_code" class="form-control" value="{{$brandings->site_code}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Template Folder</label>
                            <div class="col-md-4">
                              <input type="text" name="template_folder" class="form-control" value="{{$brandings->template_folder}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-brand">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Brand
                                </button>
                                <a href="/administration/brandings" class="btn btn-danger">
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>

<script>
$(function(){

});
</script>
@endsection
