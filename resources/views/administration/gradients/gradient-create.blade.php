@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Gradient</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/gradient/add" enctype="multipart/form-data" id='create-gradient-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gradient Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control gradient-name" name="name" value="{{ old('name') }}" required="true">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Upload Gradient File</label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control gradient-file" name="gradient_path" accept="image/*" required="true">
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-gradient">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Gradient
                                </button>
                                <a href="/administration/gradients" class="btn btn-danger">
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
