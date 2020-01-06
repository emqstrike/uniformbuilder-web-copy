@extends('administration.lte-main')

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

        #copy-piping-data-modal textarea,
        #load-piping-data-modal textarea {
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

                                <a href="#" class="btn btn-flat btn-default open-load-piping-modal-button">Load</a>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ route('qx7_update_piping') }}" enctype="multipart/form-data" id='edit-piping-form'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="style_id" value="{{ $style->id }}">
                            <input type="hidden" id="pipings_data" value="{{ $style->pipings }}">
                            <input type="hidden" name="pipings" id="pipings">
                            <input type="hidden" name="material_brand" value="{{ $style->brand }}">

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
                                    <button type="submit" class="btn btn-flat btn-primary ">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Pipings
                                    </button>
                                    <a href="{{ route('qx7_style_requests') }}" class="btn btn-flat btn-danger" style="margin-right: 15px;">
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

    @include('administration-lte-2.master-pages.materials.modal.copy-piping-data')
    @include('administration-lte-2.master-pages.materials.modal.load-data')
    @include('administration.materials.material-piping-polygon-modal')
    @include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])
@endsection

@section('scripts')

    <script type="text/javascript" src="/js/administration-lte-2/materials/pipings.js"></script>

    <script>
        $(document).ready(function() {
            $('#copy-data-to-clipboard').click(function() {
                $('#copy-piping-data-modal textarea').select();
                document.execCommand('copy');

                $('#copy-to-clipboard-tooltip').fadeIn();

                setTimeout(function() {
                    $('#copy-to-clipboard-tooltip').fadeOut();
                }, 500);
            });

            $('.open-load-piping-modal-button').click(function() {
                $('#load-piping-data-modal').modal('show');
            });
        });
    </script>
@endsection
