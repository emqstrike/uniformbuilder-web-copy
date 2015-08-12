@extends('administration.main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Pattern</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/pattern/update" enctype="multipart/form-data" id='edit-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="base_pattern_id" value="{{ $pattern->id }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control pattern-name" name="name" value="{{ $pattern->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">1</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-1-file" name="layer_1_path" accept="image/*">
                                @if ($pattern->layer_1_path)
                                <img src="{{ $pattern->layer_1_path }}" width="100px" height="100px">
                                <a href="#" class="btn btn-danger btn-xs delete-pattern-layer" data-pattern-id="{{ $pattern->id }}" date-field="layer_1_path" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Delete Layer
                                </a>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">2</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-2-file" name="layer_2_path" accept="image/*">
                                @if ($pattern->layer_2_path)
                                <img src="{{ $pattern->layer_2_path }}" width="100px" height="100px">
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">3</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-3-file" name="layer_3_path" accept="image/*">
                                @if ($pattern->layer_3_path)
                                <img src="{{ $pattern->layer_3_path }}" width="100px" height="100px">
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">4</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-4-file" name="layer_4_path" accept="image/*">
                                @if ($pattern->layer_4_path)
                                <img src="{{ $pattern->layer_4_path }}" width="100px" height="100px">
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary update-pattern">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Pattern
                                </button>
                                <a href="/administration/patterns" class="btn btn-lg btn-danger">
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
@include('partials.confirmation-modal')

@endsection

@section('custom-scripts')

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/patterns.js"></script>
@endsection