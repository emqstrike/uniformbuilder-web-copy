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
                <div class="panel-heading"><h4>Add New Inksoft Design</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/inksoft_design/add" enctype="multipart/form-data" id='dealers_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">                        
                                           
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design ID</label>
                            <div class="col-md-4">
                               <input type="text" name="design_id" class="form-control">
                            </div>
                        </div>                       
                        <div class="form-group">
                            <label class="col-md-4 control-label">User ID</label>
                            <div class="col-md-4">
                              <input type="text" name="user_id" class="form-control">
                            </div>
                        </div>                        
                       <div class="form-group">
                            <label class="col-md-4 control-label">PNG</label>
                            <div class="col-md-4">
                              <input type="text" name="png_filename" class="form-control">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label">SVG</label>
                            <div class="col-md-4">
                              <input type="text" name="svg_filename" class="form-control">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-4">
                              <input type="text" name="thumbnail" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Summary</label>
                            <div class="col-md-4">
                              <textarea name="design_summary" class="form-control" id="design_summary" cols="10" rows="10"></textarea>
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Details</label>
                            <div class="col-md-4">
                              <textarea name="design_details" class="form-control" id="design_details" cols="10" rows="10"></textarea>
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-4">
                              <input type="text" name="category" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Type</label>
                           <div class="col-md-2">
                                <select name="type" class="form-control">
                                        <option value="user_design">User Design</option>
                                        <option value="tailsweeps">Tailsweeps</option>
                                        <option value="kollege_town">Kollege Town</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Is public? </label>
                           <div class="col-md-1">
                                <select name="is_public" class="form-control">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                </select>
                            </div>
                        </div>                     
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-inksoft-design">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add InkSoft Design
                                </button>
                                <a href="/administration/inksoft_designs" class="btn btn-danger">
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
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>

<script>
$(function(){

   
});   
</script>
@endsection
