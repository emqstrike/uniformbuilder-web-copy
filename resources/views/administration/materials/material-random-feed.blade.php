@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
    .big-checkbox {width: 30px; height: 30px; padding-top: 20px;}


</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Random Feed</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/updateRandomFeed" enctype="multipart/form-data" id='edit-random-feed-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">
                        <input type="hidden" id="random_feed_data" value="{{ $material->random_feed }}">
                        <input type="hidden" name="random_feed" id="random_feed">
                        <div class="col-md-12">
                            <a href="#" class="btn btn-success add-random-feed">
                            <span class="glyphicon glyphicon-plus"></span>
                            Add Random Feed
                            </a>
                            <a href="#" class="btn btn-info copy-random-feed">
                            <span class="glyphicon glyphicon-copy"></span>
                            Copy
                            </a>
                            <textarea id="ta_random_feed_data" style="display: none;"></textarea>
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
                                <textarea id="ta_load_random_feed"></textarea>
                                <a href="#" class="btn btn-xs btn-primary load-random-feed">Load</a>
                            </div>
                        </div>
                        <div class="col-md-12 random-feed-content">
                        </div>

                        <div class="form-group col-md-12">
                            <center>
                                <button type="submit" class="btn btn-primary edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Random Feed
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

@include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])

@endsection

@section('scripts')
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/polygon.js"></script>
<script type="text/javascript" src="/js/administration/random-feed.js"></script>
@endsection