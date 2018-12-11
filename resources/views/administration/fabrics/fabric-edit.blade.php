@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Fabric</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/fabric/update" enctype="multipart/form-data" id='edit-fabric-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="fabric_id" value="{{ $fabric->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material ID</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control factory-material-id" name="factory_material_id" value="{{ $fabric->factory_material_id }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material" name="material" value="{{ $fabric->material }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Abbreviation</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-abbreviation" name="material_abbreviation" value="{{ $fabric->material_abbreviation }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail" accept="image/*">
                                @if ($fabric->thumbnail)
                                <div class="thumbnail">
                                    <img src="{{ $fabric->thumbnail }}" style="height: 80; width: 88;">
                                    <a href="#" class="btn btn-danger btn-xs delete-fabric-image"
                                        data-fabric-id="{{ $fabric->id }}"
                                        data-field="thumbnail"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-fabric">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Fabric
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
@include('partials.confirmation-modal', ['attributes' => ['fabric'], 'yes_class_name' => 'confirm-delete-fabric'])

@endsection

@section('custom-scripts')

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/fabrics.js"></script>
@endsection
