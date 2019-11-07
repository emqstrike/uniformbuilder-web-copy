@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/administration-lte-2/materials.css">

    <style>
        #app-controls td,
        #app-controls th {
            border: none;
            padding: 0;
        }

        .select2-container--open .select2-dropdown--above {
            z-index: 999999;
        }

        .select2-container .select2-selection--single {
            height: auto !important;
        }

        .app-default-mascot {
            width: 100%;
        }

        .select2-hidden-accessible {
            opacity: 0;
            visibility: hidden;
        }
    </style>
@endsection

@section('custom-styles')
    @foreach ($fonts as $font)
        @font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
    @endforeach
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <div class="col-md-12">
                            @section('page-title', 'Material Options')

                            @include('administration.partials.flash-message')

                            <h1>Material Application ID: {{ $materialOption->id }}</h1>
                            <h4>Edit: {{ $materialOption->name }}</h4>
                        </div>
                    </div>

                    <div class="box-body">
                        <div class="col-md-12">
                            <form action="{{ route('v1_save_applications') }}" id="applications_form" role="form" method="POST" enctype="multipart/form-data"
                                data-material-id="{{ $material->id }}"
                                data-material-name="{{ $material->name }}"
                                data-material-brand="{{ $material->brand }}"
                                data-material-option-id="{{ $materialOption->id }}"
                                data-material-option-name="{{ $materialOption->name }}"
                                data-material-option-setting-type="{{ $materialOption->setting_type }}"
                                data-material-option-setting-code="{{ $materialOption->setting_code }}"
                                data-material-option-path="{{ $materialOption->material_option_path }}"
                                data-material-option-perspective="{{ $materialOption->perspective }}"
                                data-material-option-applications-properties="{{ $materialOption->applications_properties }}"
                                data-material-highlights-path="{{ $highlightPath }}"
                                data-material-option-guide="{{ $guide }}"
                            >
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <input type="hidden" class="material-id" name="material_id" value="{{ $material->id }}">
                                <input type="hidden" id="app_option_id" class="material-option-id" name="app_material_option_id" value="{{ $materialOption->id }}">
                                <input type="hidden" name="applications_properties" id="a-application-properties" class="a-prop value" value="{{ $materialOption->applications_properties }}">
                                <input type="hidden" id="app-saved-perspective" value="{{ $materialOption->perspective }}">
                                <input type="hidden" id="app-material-option-name" value="{{ $materialOption->name }}">
                                <input type="hidden" id="app-material-brand" value="{{ $material->brand }}">

                                <input type="hidden" id="material_uniform_category" value="{{ $material->uniform_category }}">
                                <input type="hidden" id="material_asset_target" value="{{ $material->asset_target }}">
                                <input type="hidden" id="material_brand" value="{{ $material->brand }}">

                                <div class="row">
                                    <div class="col-md-4">
                                        <div id="shape-guide" style="border: 1px solid #e3e3e3; z-index: 0; position: absolute; float: left; opacity: 0.45; background-image: url('{{ $guide }}')"></div>
                                        <div id="shape-crosshair" style="border: 1px solid #e3e3e3; z-index: 1; position: absolute; float: left; opacity: 0.45;"></div>

                                        <div id="shape-view" style="border: 1px solid #e3e3e3;  background-image: url('{{ $highlightPath }}')"></div>

                                        <div id="shape-view-top" style="border: 1px solid #e3e3e3; z-index: 2; position: relative; float: left; margin-top: -550px; opacity: 0.45; background-image: url('{{ $materialOption->material_option_path }}')">
                                            <canvas id="applications-front-canvas"></canvas>
                                        </div>

                                        <div id="app-controls" style="margin-top: 5px;">
                                            <table style="width: 200px;" style="overflow: x;">
                                                <tr>
                                                    <td colspan="2">
                                                        <center>
                                                            <a href="#" class="btn btn-default" id="move-top">
                                                                <span class="glyphicon glyphicon-arrow-up"></span>
                                                            </a>
                                                        </center>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <center>
                                                            <a href="#" class="btn btn-default" id="move-left">
                                                                <span class="glyphicon glyphicon-arrow-left"></span>
                                                            </a>
                                                        </center>
                                                    </td>
                                                    <td>
                                                        <center>
                                                            <a href="#" class="btn btn-default" id="move-right">
                                                                <span class="glyphicon glyphicon-arrow-right"></span>
                                                            </a>
                                                        </center>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <center>
                                                            <a href="#" class="btn btn-default" id="move-bottom">
                                                                <span class="glyphicon glyphicon-arrow-down"></span>
                                                            </a>
                                                        </center>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div id="applications_div" class="col-md-8">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <h3>Applications</h3>
                                            </div>

                                            <div class="col-md-8">
                                                <div class="form-inline" style="margin-top: 16px;">
                                                    <label>Load Application Template</label>

                                                    <select name="load_applications_template" class="form-control load-applications-template" style="width: 200px; margin-right: 89px;">
                                                        <option value='"{}"'>None</option>
                                                        @foreach ($applications as $application)
                                                            <option value='{{ $application->applications_properties }}'>
                                                                {{ $application->block_pattern }}-
                                                                {{ $application->perspective }}-
                                                                {{ $application->part }}-
                                                                {{ $application->name }}
                                                            </option>
                                                        @endforeach
                                                    </select>

                                                    <label>Filter</label>
                                                    <input type="text" id="filter_app_template" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <hr>
                                            </div>
                                        </div>

                                        <div class="row" style="margin-bottom: 20px;">
                                            <div class="col-md-12">
                                                <div class="form-inline">
                                                    <a class="btn btn-flat btn-success" id="add_front_application"><i class="fa fa-plus"></i></a>
                                                    <select name="default_item" id="front-default-item" class="form-control">
                                                        <option value="logo" data-def-name="logo">Logo</option>
                                                        <option value="number" data-def-name="number">Number</option>
                                                        <option value="team_name" data-def-name="team_name">Team Name</option>
                                                        <option value="player_name" data-def-name="player_name">Player Name</option>
                                                        <option value="mascot" data-def-name="mascot">Mascot</option>
                                                        <option value="free" data-def-name="mascot">Free</option>
                                                    </select>
                                                    <input type="text" name="application_name" id="application_name" value="Logo" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div id="applications_table_container">
                                                    <table class="table table-bordered table-hover" id="applications_table">
                                                        <thead>
                                                            <th id="actions-heading">Actions</th>
                                                            <th>App #</th>
                                                            <th>Type</th>
                                                            <th>Name</th>
                                                            <th>Rotation</th>
                                                            <th>X</th>
                                                            <th>Y</th>
                                                            <th>Primary</th>
                                                            <th>Logo</th>
                                                            <th>Embellishment</th>
                                                            <th>Team name</th>
                                                            <th>Player name</th>
                                                            <th>Number</th>
                                                            <th>Font sizes</th>
                                                            <th>Colors</th>
                                                            <th>Accent</th>
                                                            <th>Default Mascot</th>
                                                            <th>Tailsweep</th>
                                                            <th>Rotated Tailsweep</th>
                                                            <th>Default Font</th>
                                                            <th>Default Text</th>
                                                            <th>Vertical Text</th>
                                                            <th>Default Number</th>
                                                            <th>Inksoft Design ID</th>
                                                            <th>Opacity</th>
                                                            <th>Pattern Position</th>
                                                            <th>Default Pattern</th>
                                                            <th>Custom Scale X</th>
                                                            <th>Custom Scale Y</th>
                                                            <th>Flipped</th>
                                                        </thead>

                                                        <tbody class="front-applications">
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6" style="margin-top: 20px;">
                                                        <div class="form-inline">
                                                            <input type="text" id="app_template_name" class="form-control" placeholder="Template Name.">
                                                            <a href="#" class="btn btn-flat btn-primary" id="save_app_template">
                                                            <span class="glyphicon glyphicon-save"></span> Save as Template</a>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6 text-right" style="margin-top: 20px;">
                                                        <input type="submit" class="btn btn-flat btn-success save-applications-button" value="Save">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
    <script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/ddslick.min.js"></script>
    <script type="text/javascript" src="/underscore/underscore.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/materials/material-application.js"></script>
@endsection
