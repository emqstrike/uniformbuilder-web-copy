@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Upload a file</div>
                <div class="panel-body col-md-8 text-center">
                    
                </div>
                <div class="panel-body col-md-4">
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/test/uploadFile" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Folder Name</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control folder-name" name="folder_name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">PDF File</label>
                            <div class="col-md-8">
                                <input type="file" class="form-control file" name="file" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-file">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add
                                </button>
                                <a href="/administration/materials" class="btn btn-danger">
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