@extends('administration.lte-main')

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
                <div class="panel-heading">Add New tailsweep</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/tailsweep/add" enctype="multipart/form-data" id='create-tailsweep-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="layers_properties" id="layers-properties">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Tailsweep Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control tailsweep-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control tailsweep-code" name="code" value="{{ old('code') }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Title</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-title" name="title" value="{{ old('title') }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-6 thumbnail_upload">

                                <input type="hidden" class="form-control tailsweep-thumbnail" name="thumbnail">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*" >
                           
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Short</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-short" name="short" value="{{ old('short') }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Medium</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-medium" name="medium" value="{{ old('medium') }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Long</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-long" name="long" value="{{ old('long') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Brand</label>
                            <div class="col-md-6">
                                <select name="brand_id" class="form-control">
                                    @foreach ($brands as $brand)
                                        <option value="{{ $brand->id }}">
                                            {{ $brand->site_name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-tailsweep">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Tailsweep
                                </button>
                                <a href="/administration/tailsweeps" class="btn btn-danger">
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
<!-- <script type="text/javascript" src="/js/administration/tailsweeps.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){

     $(".thumbnail-file").change(function (){
        var fileName = URL.createObjectURL(event.target.files[0]);
        console.log(fileName);
        $(".thumbnail_upload").prepend('<img src='+ fileName +'>');
     });

});
</script>
@endsection