@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Lining</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/lining/update" id='edit-lining-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="lining_id" value="{{ $lining->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Lining Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control lining-name" name="name" value="{{ $lining->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Lining Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control lining-code" name="code" value="{{ $lining->code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-lining">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Lining
                                </button>
                                <a href="/administration/linings" class="btn btn-danger">
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
@include('partials.confirmation-modal', ['attributes' => ['lining'], 'yes_class_name' => 'confirm-delete-lining'])

@endsection

@section('custom-scripts')

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/linings.js"></script>
@endsection
