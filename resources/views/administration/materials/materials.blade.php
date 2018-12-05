@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style>
.table td,
.table th {
    white-space: nowrap;
    width: 1%;
}
.box-body {
    overflow-y: scroll;
    max-height: 650px;
}
.zoomed-out {
    zoom: 0.9;
    -moz-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    margin-left: -60px;
}
</style>
@endsection

@section('content')
<!-- Confirmation Modal -->
<div class="modal confirmation-modal" @if (isset($confirmation_modal_id)) id="{{ $confirmation_modal_id }}" @else id="confirmation-modal" @endif aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">Message</div>
            <div class="modal-footer">
                <button class="btn btn-danger @if (isset($yes_class_name)) {{ $yes_class_name }} @else confirm-yes @endif" data-value=''
                @if (isset($attributes))
                    @if (count($attributes) > 0)
                        @foreach ($attributes as $attribute)
                            data-{{ $attribute }}=""
                        @endforeach
                    @endif
                @endif
                >
                    <li class="glyphicon glyphicon-ok"></li>
                    Yes
                </button>
                <button class="btn btn-default confirm-no" data-dismiss="modal">
                    <li class="glyphicon glyphicon-remove"></li>
                    No
                </button>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <i class="fa fa-bookmark"></i>
                        Materials
                        <small>
                            <a href="/administration/material/add" class='btn btn-md btn-default materials-add'>
                                <span class="glyphicon glyphicon-plus"></span>
                            </a>
                        </small>
                    </h1>
                    <a href="#" class="btn btn-xs btn-primary log-ids">Log ids</a>
                    <hr>
                    Sport:
                    <select class="active-sport">
                        <option value="{{ $active_sport }}">{{ $active_sport }}</option>
                    </select>
                </div>
                <div class="box-body">
                    <table data-toggle='table' id='materials_table' class='data-table zoomed-out table table-bordered table-hover materials display'>
                     <thead>
                        <input type="hidden" id="materials-data" value="{{ $materials_string }}">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Sport</th>
                                <th>Block Pattern</th>
                                <th>Neck</th>
                                <th>Type</th>
                                <th>Gender</th>
                                <th>Active</th>
                                <th>Asset Target</th>
                                <th>Blank</th>
                                <th>Customizer Available</th>
                                <th>Brand</th>
                                <th>Uniform Application Type</th>
                               {{--  <th>Customizer Available</th> --}}
                                <th>Actions</th>
                                <th>Price Item</th>
                                <th>SKU</th>
                                <th>Item ID</th>
                            </tr>
                        </thead>
                        <tbody>
        @forelse ($materials as $material)
            <tr>
                <td class="m-id-val">
                    {{ $material->id }}
                </td>
                <td>
                    {{ $material->name }}
                </td>
                <td>
                    {{ $material->uniform_category }}
                </td>
                <td>
                    {{ $material->block_pattern }}
                </td>
                <td>
                    {{ $material->neck_option }}
                </td>
                <td>
                    {{ $material->type }}
                </td>
                <td>
                    {{ $material->gender }}
                </td>
                <td>
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-material" id="switch-{{ $material->id }}" data-material-id="{{ $material->id }}" {{ ($material->active) ? 'checked' : '' }}>
                        <label class="onoffswitch-label" for="switch-{{ $material->id }}">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </td>
                <td>
                    {{ $material->asset_target }}
                </td>
                <td>
                    {{ $material->is_blank }}
                </td>
                <td>
                    @if($material->customizer_available) Yes @else No @endif
                </td>
                <td>
                    {{ $material->brand }}
                </td>
                <td>
                    {{ $material->uniform_application_type }}
                </td>
               {{--  <td>
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox customizer-available" id="customizer-available-{{ $material->id }}" data-material-id="{{ $material->id }}" {{ ($material->customizer_available) ? 'checked' : '' }}>
                        <label class="onoffswitch-label" for="customizer-available-{{ $material->id }}">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </td> --}}
                <td class="td-buttons">
                    <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-xs btn-primary">Edit</a>
                    <a href="/administration/material/view_material_options/{{ $material->id }}" class="btn btn-xs btn-default">Material Options</a>
        <!--            <a href="#" class="btn btn-xs btn-primary toggle-material" data-material-id="{{ $material->id }}">Toggle</a>-->
                    <a href="/administration/material/materials_options_setup/{{ $material->id }}" class="btn btn-xs btn-default" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}">
                        <span class="glyphicon glyphicon-cog"></span>
                    </a>
                    <a href="#" class="btn btn-xs btn-default duplicate-material" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}">
                        <i class="glyphicon glyphicon-copy"></i>
                    </a>
                    <a href="/administration/material/{{ $material->id }}/pipings" class="btn btn-xs btn-warning">
                        <span class="glyphicon glyphicon-stats"></span>
                    </a>
                    <a href="/administration/material/{{ $material->id }}/random_feed" class="btn btn-xs btn-warning">
                        <i class="fa fa-random" aria-hidden="true"></i>
                    </a>
                    <a href="/administration/material/{{ $material->id }}/logo_position" class="btn btn-xs btn-flat btn-warning">
                        <i class="fa fa-github-alt" aria-hidden="true"></i>
                    </a>
                    <a href="/administration/material/{{ $material->id }}/gradient") }}" class="btn btn-xs btn-flat btn-warning">
                        <i class="fa fa-square" aria-hidden="true"></i>
                    </a>
                    <a href="/administration/material/materials_options/dropzone/{{ $material->id }}" class="btn btn-xs btn-default">
                        <i class="fa fa-upload" aria-hidden="true"></i>
                    </a>
                    <a href="#" class="btn btn-xs btn-danger delete-material" data-material-id="{{ $material->id }}">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a>
                </td>
                <td>
                    {{ $material->price_item_code }}
                </td>
                <td>
                    {{ $material->sku }}
                </td>
                <td>
                    {{ $material->item_id }}
                </td>
            </tr>
        @empty
            <p>No Materials</p>
        @break
        @endforelse
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <!-- <td id="sports-filter"></td> -->
                <td></td>
                <td id="block-patterns-filter"></td>
                <td id="necks-filter"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
        </table>
        </div>
        </div>
        </div>
        </div>
        </section>

</div>

{{-- @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal']) --}}

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

<!-- @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-duplicate-material']) -->

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<!-- <script type="text/javascript" src="/fabricjs/fabric.min.js"></script> -->
<!-- <script type="text/javascript" src="/isotope/isotope.pkgd.min.js"></script> -->
<!-- <script type="text/javascript" src="/bootstrap/js/bootstrap.min.js"></script> -->
<script type="text/javascript" src="/js/administration/datatables.min.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<!-- <script type="text/javascript" src="/bootstrap/js/bootstrap.min.js"></script> -->
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/materials-main.js"></script>
@endsection
