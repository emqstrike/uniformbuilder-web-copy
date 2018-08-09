@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        .piping-table td {
            vertical-align: bottom !important;
        }

        tbody, td, th {
            border: 1px solid #e3e3e3 !important;
        }

        .global-color {
            display: inline-block;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Modify Piping (Dynamic)')

                        <div class="row">
                            <div class="col-md-6">
                                <h1>Modify Piping (Dynamic)</h1>
                            </div>

                            <div class="col-md-6 text-right" style="padding-top: 20px;">
                                <a href="#" class="btn btn-flat btn-default copy-piping">
                                    <span class="glyphicon glyphicon-copy"></span>
                                    Copy
                                </a>
                                <textarea id="ta_pipings_data" style="display: none;"></textarea>

                                <textarea id="ta_load_pipings" style="display: none;"></textarea>
                                <a href="#" class="btn btn-flat btn-default load-piping">Load</a>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <form class="form-horizontal" role="form" method="POST" action="/administration/material/updatePipings" enctype="multipart/form-data" id='edit-piping-form'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="material_id" value="{{ $material->id }}">
                            <input type="hidden" id="pipings_data" value="{{ $material->pipings }}">
                            <input type="hidden" name="pipings" id="pipings">

                            <div class="row">
                                <div class="col-md-12">
                                    <hr>
                                </div>
                            </div>

                            <div class="row" style="margin-bottom: 20px;">
                                <div class="col-md-6">
                                    <a href="#" class="btn btn-flat btn-success add-piping">
                                        <span class="glyphicon glyphicon-plus"></span>
                                        Add Piping
                                    </a>
                                </div>

                                <div class="col-md-6 text-right">
                                    <label>Change Colors</label>
                                    <div class="global-color"></div>
                                    <div class="global-color"></div>
                                    <div class="global-color"></div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-12">
                                    <div class="pipings-content"></div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <button type="submit" class="btn btn-flat btn-primary edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Pipings
                                    </button>
                                    <a href="/administration/materials" class="btn btn-flat btn-danger" style="margin-right: 15px;">
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
    </section>

    @include('administration.materials.material-piping-polygon-modal')
    @include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])
@endsection

@section('scripts')
    <script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
    <script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/administration/polygon.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/pipings.js"></script>
@endsection