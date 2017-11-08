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
                <div class="panel-heading"><h4>Add New Styles Index</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/styles_index/add" enctype="multipart/form-data" id='styles_indexes_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">                        
                                           
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
                                <button type="submit" class="btn btn-primary create-styles-index">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Styles Index
                                </button>
                                <a href="/administration/styles_indexes" class="btn btn-danger">
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

@endsection
