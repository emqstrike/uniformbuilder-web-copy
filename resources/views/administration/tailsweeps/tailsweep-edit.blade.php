@extends('administration.lte-main')



@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Edit tailsweep</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/tailsweep/update" enctype="multipart/form-data" id='create-tailsweep-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="tailsweep_id" value="{{ $tailsweep->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Tailsweep Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control tailsweep-name" name="name" value="{{ $tailsweep->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control tailsweep-code" name="code" value="{{ $tailsweep->code }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Title</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-title" name="title" value="{{ $tailsweep->title }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-6 thumbnail_upload">
                                <img src="{{ $tailsweep->thumbnail }}">
                                <input type="hidden" class="form-control tailsweep-thumbnail" name="thumbnail" value="{{ $tailsweep->thumbnail }}">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*" >
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Short</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-short" name="short" value="{{ $tailsweep->short }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Medium</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-medium" name="medium" value="{{ $tailsweep->medium }}">
                            </div>
                        </div>
                           <div class="form-group">
                            <label class="col-md-4 control-label">Long</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tailsweep-long" name="long" value="{{ $tailsweep->long }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Brand</label>
                            <div class="col-md-6">
                                <select name="brand_id" class="form-control">
                                    @foreach ($brands as $brand)
                                        <option value="{{ $brand->id }}" @if ($brand->id == $tailsweep->brand_id) selected="selected" @endif>
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
                                    Update Tailsweep
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

        $(".thumbnail_upload img").attr('src',fileName);
    });

});
</script>
@endsection