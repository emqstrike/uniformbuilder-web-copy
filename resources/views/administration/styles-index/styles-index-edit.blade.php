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
                <div class="panel-heading"><h4>Edit Dealer</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/styles_index/update" enctype="multipart/form-data" id='cut_links_form'>
                        
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        
                        <input type="hidden" name="id" value="{{$styles_indexes->id}}"> 

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-4">
                               <input type="text" name="name" class="form-control" value="{{$styles_indexes->name}}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Alias</label>
                            <div class="col-md-4">
                               <input type="text" name="alias" class="form-control" value="{{$styles_indexes->alias}}">
                            </div>
                        </div>                        
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-4">
                              <input type="text" name="description" class="form-control" value="{{$styles_indexes->description}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-2">                                
                                <select class="form-control" name="gender">
                                    <option value="men" @if($styles_indexes->gender == "men") selected="selected"@endif>Male</option>
                                    <option value="women" @if($styles_indexes->gender == "women") selected="selected"@endif>Female</option>
                                </select>
                            </div>
                        </div>                     
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control thumbnail" name="thumbnail" accept="image/*" >
                                <input type="text" name="thumbnail_text" class="form-control" value="{{$styles_indexes->thumbnail}}" readonly="true">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-styles-index">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
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

<!-- Modal -->

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>

@endsection
