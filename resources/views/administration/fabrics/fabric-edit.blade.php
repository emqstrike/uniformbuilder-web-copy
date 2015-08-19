@extends('administration.main')

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>
    <h4 class='flash-title'>Alert</h4>
    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

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

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Fabric Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control fabric-name" name="name" value="{{ $fabric->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Fabric Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control fabric-code" name="name" value="{{ $fabric->code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Fabric File</label>
                            <div class="col-md-6 fabric">
                                <input type="file" class="form-control fabric-file" name="fabric_path" accept="image/*">
                                @if ($fabric->fabric_path)
                                <img src="{{ $fabric->fabric_path }}" class="fabric_path" width="100px" height="100px">
                                <a href="#" class="btn btn-danger btn-xs delete-fabric-path fabric_path"
                                    data-fabric-id="{{ $fabric->id }}"
                                    data-fabric-path="fabric_path"
                                    role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Delete Layer
                                </a>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary update-fabric">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Fabric
                                </button>
                                <a href="/administration/fabrics" class="btn btn-lg btn-danger">
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
@include('partials.confirmation-modal', ['attributes' => ['layer'], 'yes_class_name' => 'confirm-delete-layer'])

@endsection

@section('custom-scripts')

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/fabrics.js"></script>
@endsection