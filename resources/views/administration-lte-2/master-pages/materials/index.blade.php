@extends('administration-lte-2.lte-main')

@section('styles')
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
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Materials')

                        <h1>
                            <i class="fa fa-bookmark"></i>
                            Materials
                            <small>
                                <a href="{{ route('v1_material_add') }}" class='btn btn-md btn-default btn-flat materials-add'>
                                    <span class="glyphicon glyphicon-plus"></span>
                                </a>
                            </small>
                        </h1>

                        <a href="#" class="btn btn-xs btn-primary btn-flat log-ids">Log ids</a>
                        <hr>
                        Sport:
                        <select class="active-sport">
                            <option value="{{ $active_sport }}">{{ $active_sport }}</option>
                        </select>
                        <a href="#" class="btn btn-danger btn-xs btn-flat reset-filter">Reset Filters</a>
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
                                    <th>Uniform Application Type</th>
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
                                            {{ $material->uniform_application_type }}
                                        </td>
                                        <td class="td-buttons">
                                            <a href="{{ route('v1_material_edit', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-primary">Edit</a>
                                            <a href="{{ route('v1_view_material_option', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-default">Material Options</a>
                                            <a href="{{ $material->styles_pdf }}" target="_blank" class="btn btn-sm btn-flat btn-default @if(! $material->styles_pdf) disabled @endif">
                                                <i class="fa fa-download"></i>
                                            </a>
                                            <a href="{{ route('v1_materials_options_setup', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-default" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}">
                                                <span class="glyphicon glyphicon-cog"></span>
                                            </a>
                                            <a href="#" class="btn btn-sm btn-flat btn-default duplicate-material" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}">
                                                <i class="glyphicon glyphicon-copy"></i>
                                            </a>
                                            <a href="{{ route('v1_piping_add', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-warning">
                                                <span class="glyphicon glyphicon-stats"></span>
                                            </a>
                                            <a href="{{ route('v1_random_feed', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-warning">
                                                <i class="fa fa-random" aria-hidden="true"></i>
                                            </a>
                                            <a href="{{ route('v1_logo_position', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-warning">
                                                <i class="fa fa-github-alt" aria-hidden="true"></i>
                                            </a>
                                            <a href="{{ route('v1_material_gradient', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-warning">
                                                <i class="fa fa-square" aria-hidden="true"></i>
                                            </a>
                                            <a href="{{ route('v1_material_options_dropzone', ['id' => $material->id]) }}" class="btn btn-sm btn-flat btn-default">
                                                <i class="fa fa-upload" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" class="btn btn-sm btn-flat btn-danger delete-material" data-material-id="{{ $material->id }}">
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
                                @endforelse
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
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
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/materials-main.js"></script>
@endsection
