@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
    .big-checkbox {width: 30px; height: 30px; padding-top: 20px;}

    .flex {
        display: flex;
        flex-direction: row;
    }

    .delete-image a {
        color: red;
    }

</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Piping (Dynamic)</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/updatePipings" enctype="multipart/form-data" id='edit-piping-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">
                        <input type="hidden" id="pipings_data" value="{{ $material->pipings }}">
                        <input type="hidden" name="pipings" id="pipings">
                        <div class="col-md-12">
                            <a href="#" class="btn btn-success add-piping">
                            <span class="glyphicon glyphicon-plus"></span>
                            Add Piping
                            </a>
                            <a href="#" class="btn btn-info copy-piping">
                            <span class="glyphicon glyphicon-copy"></span>
                            Copy
                            </a>
                            <textarea id="ta_pipings_data" style="display: none;"></textarea>
                        </div>
                        <div class="col-md-1">
                            Change Colors
                            <div class="global-color">
                                
                            </div>
                            <div class="global-color">
                     
                            </div>
                            <div class="global-color">
                     
                            </div>
                        </div>
                        <div class="col-md-11">
                            <div class="pull-right">
                                <textarea id="ta_load_pipings"></textarea>
                                <a href="#" class="btn btn-xs btn-primary load-piping">Load</a>
                            </div>
                        </div>
                        <div class="col-md-12 pipings-content">
                        </div>

                        <div class="form-group col-md-12">
                            <center>
                                <button type="submit" class="btn btn-primary edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Pipings
                                </button>
                                <a href="/administration/materials" class="btn btn-danger" style="margin-right: 15px;">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@include('administration.materials.material-piping-polygon-modal')

@include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])

@endsection

@section('scripts')
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/polygon.js"></script>
<script type="text/javascript" src="/js/administration/pipings.js"></script>
@endsection