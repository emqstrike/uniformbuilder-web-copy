@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/administration-lte-2/dropzone.css">
    <style>
        #materialDropzone {
            border-radius: 10px;
            border: 3px dashed #e3e3e3;
            margin-bottom: 30px;
        }

        #materialDropzone {
            font-weight: bold;
        }

        .dz-image {
            background-color: gray;
        }

        table th {
            background: #293438;
            color: #ffffff;
        }

        .box-body td, th {
            border: 1px solid #e3e3e3;
            padding: 15px;
            vertical-align: top;
        }
    </style>
@endsection

@section('content')
    @if (Session::has('message'))
        <div class="alert alert-info alert-dismissable flash-alert">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                ×
            </button>

            <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
        </div>
    @endif

    <div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="progress-modal-message"></h4>
                </div>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Dropzone')

                        <h1>Dropzone</h1>
                    </div>

                    <div class="body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <form action="/administration/material/insert_dz_image" class="custom-dropzone" id="materialDropzone">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                                        <input type="hidden" name="material_id" id="material_id" value="{{ $material->id }}">
                                        <input type="hidden" name="application_type" id="application_type" value="{{ $material->uniform_application_type }}">
                                        <input type="hidden" class="data-string">

                                        <div class="dz-default dz-message">
                                            <span>Drop files here to upload</span>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Origin</label>

                                        <select class="form-control origin">
                                            <option value="web">Web</option>
                                            <option value="ipad">iPad</option>
                                            <option value="team_stores">Team Stores</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Perspective</label>

                                        <select class="form-control perspective">
                                            <option value="front">Front</option>
                                            <option value="back">Back</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table table-bordered col-md-12" id="image_table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Layer Number</th>
                                                <th>Setting Type</th>
                                                <th>Default Color</th>
                                                <th><input class="mo-allow-all-pattern" type="checkbox" value="1"> Allow Pattern</th>
                                                <th><input class="mo-allow-all-color" type="checkbox" value="1"> Allow Color</th>
                                                <th>Team Color ID</th>
                                                <th>Group ID</th>
                                                <th>Preview</th>
                                            </tr>
                                        </thead>
                                        <tbody class="material-options-rows"></tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12" style="margin-bottom: 30px;">
                                    <a href="#" class="btn btn-flat btn-primary submit-data">Submit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/dropzone/dropzone.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/materials/dropzone.js"></script>
@endsection