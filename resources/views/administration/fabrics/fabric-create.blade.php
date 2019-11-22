@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Fabric</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/fabric/add" enctype="multipart/form-data" id='create-fabric-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material ID</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control factory-material-id" name="factory_material_id" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material" name="material">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Abbreviation</label>
                            <div class="col-md-6 material">
                               <input type="text" class="form-control material-abbreviation" name="material_abbreviation">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea name="description" class="form-control"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-fabric">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Fabric
                                </button>
                                <a href="/administration/fabrics" class="btn btn-danger">
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
