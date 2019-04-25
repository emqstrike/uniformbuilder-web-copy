@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">

    <style>
        .logo-position-table td {
            vertical-align: bottom !important;
        }

        tbody, td, th {
            border: 1px solid #e3e3e3 !important;
        }

        .global-color {
            display: inline-block;
        }

        #copy-logo-position-data-modal textarea,
        #load-logo-position-data-modal textarea {
            height: 20em;
            padding: 10px;
            resize: none;
            width: 100%;
        }

        #copy-to-clipboard-tooltip {
            background: #555555;
            border-radius: 6px;
            display: none;
            color: #ffffff;
            left: 0;
            margin: 0 auto;
            padding: 8px;
            position: absolute;
            right: 0;
            top: -15px;
            width: 150px;
        }

        #copy-to-clipboard-tooltip:after {
            border-color: #555 transparent transparent transparent;
            border-style: solid;
            border-width: 5px;
            bottom: -10px;
            content: "";
            left: 70px;
            position: absolute;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Modify Logo Position')

                        <div class="row">
                            <div class="col-md-6">
                                <h1>Modify Logo Position</h1>
                            </div>

                            <div class="col-md-6 text-right" style="padding-top: 20px;">
                                <a href="#" class="btn btn-flat btn-default copy-logo-position">
                                    Copy
                                </a>

                                <a href="#" class="btn btn-flat btn-default open-load-logo-position-modal-button">Load</a>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ route('v1_update_logo_position') }}" enctype="multipart/form-data" id='edit-logo-position-form'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="material_id" value="{{ $material->id }}">
                            <input type="hidden" id="logo_position_data" value="{{ $material->logo_position }}">
                            <input type="hidden" name="logo_position" id="logo-position">

                            <div class="row">
                                <div class="col-md-12">
                                    <hr>
                                </div>
                            </div>

                            <div class="row" style="margin-bottom: 20px;">
                                <div class="col-md-6">
                                    <a href="#" class="btn btn-flat btn-success add-logo-position">
                                        Add Logo Position
                                    </a>
                                </div>

                            </div>


                            <div class="row">
                                <div class="col-md-12">
                                    <div class="logo-position-content"></div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <button type="submit" class="btn btn-flat btn-primary edit-logo-position">
                                        Update Logo Position
                                    </button>
                                    <a href="{{ route('v1_materials_index') }}" class="btn btn-flat btn-danger" style="margin-right: 15px;">
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

    @include('administration-lte-2.master-pages.materials.modal.copy-logo-position-data')
    @include('administration-lte-2.master-pages.materials.modal.load-logo-position-data')

    @include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])
@endsection

@section('scripts')

    <script type="text/javascript" src="/js/administration-lte-2/materials/logo-position.js"></script>
    <script src="/js/libs/select2/select2.min.js"></script>
    <script src="/underscore/underscore.js"></script>

    <script>
        $(document).ready(function() {
            $('#copy-data-to-clipboard').click(function() {
                $('#copy-logo-position-data-modal textarea').select();
                document.execCommand('copy');

                $('#copy-to-clipboard-tooltip').fadeIn();

                setTimeout(function() {
                    $('#copy-to-clipboard-tooltip').fadeOut();
                }, 500);
            });

            $('.open-load-logo-position-modal-button').click(function() {
                $('#load-logo-position-data-modal').modal('show');
            });
        });
    </script>
@endsection
