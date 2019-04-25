@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style>
    td {
            vertical-align: bottom !important;
        }

        tbody, td, th {
            border: 1px solid #e3e3e3 !important;
        }

        .global-color {
            display: inline-block;
        }

        #copy-random-feed-data textarea,
        #load-random-feed-modal textarea {
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
                        @section('page-title', 'Modify Random Feed')

                        <div class="row">
                            <div class="col-md-6">
                                <h1>Modify Random Feed</h1>
                            </div>

                            <div class="col-md-6 text-right" style="padding-top: 20px;">
                                <a href="#" class="btn btn-flat btn-default copy-random-feed">
                                    <span class="glyphicon glyphicon-copy"></span>
                                    Copy
                                </a>


                                <a href="#" class="btn btn-flat btn-default load-random-feed-modal">Load</a>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ route('v1_update_random_feed') }}" enctype="multipart/form-data" id='edit-random-feed-form'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="material_id" value="{{ $material->id }}">
                            <input type="hidden" id="random_feed_data" value="{{ $material->random_feed }}">
                            <input type="hidden" name="random_feed" id="random_feed">

                            <div class="row">
                                <div class="col-md-12">
                                    <hr>
                                </div>
                            </div>

                            <div class="row" style="margin-bottom: 20px;">
                                <div class="col-md-6">
                                    <a href="#" class="btn btn-flat btn-success add-random-feed">
                                        <span class="glyphicon glyphicon-plus"></span>
                                        Add Random Feed
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
                                    <div class="random-feed-content"></div>
                                </div>
                            </div>

                            <div class="form-group col-md-12">
                                <center>
                                    <button type="submit" class="btn btn-flat btn-primary edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Random Feed
                                    </button>
                                    <a href="/administration/materials" class="btn btn-flat btn-danger" style="margin-right: 15px;">
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
    </section>

    @include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])
    @include('administration-lte-2.master-pages.materials.modal.copy-random-feed-data')
    @include('administration-lte-2.master-pages.materials.modal.load-random-feed-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/polygon.js"></script>
<script type="text/javascript" src="/js/administration/random-feed.js"></script>
<script>
        $(document).ready(function() {
            $('#copy-data-to-clipboard').click(function() {
                $('#copy-random-feed-data textarea').select();
                document.execCommand('copy');

                $('#copy-to-clipboard-tooltip').fadeIn();

                setTimeout(function() {
                    $('#copy-to-clipboard-tooltip').fadeOut();
                }, 500);
            });

            $('.open-load-piping-modal-button').click(function() {
                $('#load-piping-data-modal').modal('show');
            });

            $('.load-random-feed-modal').click(function() {
                $('#load-random-feed-modal').modal('show');
            })
        });
    </script>
@endsection
