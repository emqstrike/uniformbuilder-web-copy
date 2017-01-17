@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

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
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' id='materials_table' class='data-table table table-bordered materials display'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Preview</th>
                                <th>Name</th>
                                <th>Sport</th>
                                <th>Block Pattern</th>
                                <th>Neck</th>
                                <th>Price Item</th>
                                <th>Type</th>
                                <th>Asset Target</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
        @forelse ($materials as $material)
            <tr>
                <td>
                    {{ $material->id }}
                </td>
                <td>
                    <center><img src="{{ $material->thumbnail_path }}" style="height: 45px; width: 35px;" data-toggle="popover"></center>
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
                    {{ $material->price_item_code }}
                </td>
                <td>
                    {{ $material->type }}
                </td>
                <td>
                    {{ $material->asset_target }}
                </td>
                <td class="td-buttons">
                    <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-xs btn-primary">Edit</a>
                    <a href="/administration/material/view_material_options/{{ $material->id }}" class="btn btn-xs btn-default">Material Options</a>
                    <a href="/administration/material/materials_options_setup/{{ $material->id }}" class="btn btn-xs btn-default" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}">
                        <span class="glyphicon glyphicon-cog"></span>
                    </a>
                    <a href="#" class="btn btn-xs btn-default duplicate-material" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}">
                        <i class="glyphicon glyphicon-copy"></i>
                    </a>
                    <a href="/administration/material/{{ $material->id }}/pipings" class="btn btn-xs btn-warning">
                        <span class="glyphicon glyphicon-stats"></span>
                    </a>
                    <a href="#" class="btn btn-xs btn-danger delete-material" data-material-id="{{ $material->id }}">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a>
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

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-duplicate-material'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/isotope/isotope.pkgd.min.js"></script>
<script type="text/javascript" src="/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<!-- <script type="text/javascript" src="/bootstrap/js/bootstrap.min.js"></script> -->
<script type="text/javascript" src="/js/administration/materials-main.js"></script>
@endsection