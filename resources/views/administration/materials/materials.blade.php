@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')

<div class="col-md-12">
    <h1>
        <small>
            <a href="/administration/material/add" class='btn btn-md btn-default materials-add'>
                <span class="glyphicon glyphicon-plus"></span>
            </a>
        </small>
        <p class="materials-header">Materials</p>
    </h1>
</div>
<div id="filtersFlatforms" class="col-md-12 button-group" style="margin-top: 10px;">
<button class="button btn-primary" data-filter="">All</button>

<button class="button" data-filter=".web" >Web</button>
<button class="button" data-filter=".ipad" >Ipad</button>



</div>

<div id="filtersCategory" class="col-md-12 button-group" style="margin-top: 10px;">
<button class="button btn-primary" data-filter="">All</button>

<?php $lCategory = ""; ?>
@foreach ($block_patterns as $block_pattern)
    @if ($lCategory != $block_pattern->uniform_category)
    <button class="button" data-filter=".{{ $block_pattern->uniform_category }}" >{{ $block_pattern->uniform_category }}</button>
    @endif

    <?php $lCategory = $block_pattern->uniform_category; ?>
    
@endforeach
</div>
<div id="filters" class="col-md-12 button-group" style="margin-top: 10px;">
<button class="button btn-primary" data-filter="">All</button>
@foreach ($block_patterns as $block_pattern)
    <button class="button" data-filter=".{{ $block_pattern->id }}" data-category="{{ $block_pattern->uniform_category }}">{{ $block_pattern->name }}</button>
@endforeach
</div>
<div class="container-fluid main-content isotope" style="margin-top: 300px;">
        @forelse ($materials as $material)
            <div class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }} material-div col-md-3 {{ $material->block_pattern_id }} {{ $material->uniform_category }} {{ $material-> asset_target }}' data-category="{{ $material->block_pattern_id }}">
                <div class="material-id-div">
                    <span class="label material-label">{{ $material->id }}</span>
                </div>
                <div class="top-right-corner">
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-material" id="switch-{{ $material->id }}" data-material-id="{{ $material->id }}" {{ ($material->active) ? 'checked' : '' }}>
                        <label class="onoffswitch-label" for="switch-{{ $material->id }}">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>
                <div class="col-md-12">
                    <center>
                        <img src="{{ $material->thumbnail_path }}" alt="{{ $material->slug }}" class="material-thumbnail">
                    </center>
                </div><hr>
                <div class="div-inline"><span class="label label-default fs-11">{{ $material->price_item_code }}</span></div>
                <div class="div-inline"><span class="label label-default fs-11">{{ $material->uniform_category }}</span></div>
                <div class="div-inline"><span class="label label-default fs-11">{{ ucfirst($material->type) }}</span></div>
                <div class="div-inline"><span class="label label-default fs-11">{{ ucfirst($material->neck_option) }}</span></div>
                <div class="material-name-div col-md-12"><center><h4 class="transform-1-3">{{ $material->name }}</h4></center></div>
                <div class="material-buttons">
                    <a href="/administration/material/edit/{{ $material->id }}" class="1pxb btn btn-default btn-xs edit-material" role="button"
                    {{ ($material->active) ? '' : 'disabled' }}>
                        Edit Material
                    </a>
                    <a href="/administration/material/view_material_options/{{ $material->id }}" class='1pxb btn btn-xs btn-default'
                        data-material-name="{{ $material->name }}"
                        data-material-id="{{ $material->id }}"
                        data-material-thumbnail="{{ $material->thumbnail_path }}"
                        {{ ($material->active) ? '' : 'disabled' }}>

                    </a>
                    <a href="/administration/material/materials_options_setup/{{ $material->id }}" class='1pxb btn btn-xs btn-default'>
                        <span class="glyphicon glyphicon-cog"></span>
                    </a>

                    <a href="#" class="btn btn-default pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? '' : 'disabled' }}>
                        <i class="glyphicon glyphicon-trash"></i>
                    </a>
                    <a href="#" class="btn btn-default mr-10 pull-right btn-xs duplicate-material" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}" role="button" {{ ($material->active) ? '' : 'disabled' }}>
                        <i class="glyphicon glyphicon-copy"></i>
                    </a>

                    <a href="#" class="btn btn-default mr-10 btn-xs duplicate-material" data-material-id="{{ $material->id }}" data-material-name="{{ $material->name }}" role="button" {{ ($material->active) ? '' : 'disabled' }}>
                        <i class="glyphicon glyphicon-copy"></i>
                    </a>
                    <a href="/administration/material/piping/{{ $material->id }}" class='1pxb btn btn-xs btn-default'>
                        <span>P</span>
                    </a>
                    <!-- <a href="#" class='1pxb btn btn-xs btn-default'>
                        <span>Y</span>
                    </a>
                    <a href="#" class='1pxb btn btn-xs btn-default'>
                        <span>S</span>
                    </a> -->
                    <a href="#" class="btn btn-default pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? '' : 'disabled' }}>
                        <i class="glyphicon glyphicon-trash"></i>
                    </a>
                    
>>>>>>> 81b299f34f191683d3e2e104d3ca2512b71ffcae
                </div>
            </div>
        @empty
            <p>No Materials</p>
        @break
        @endforelse

</div>

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-duplicate-material'])

@endsection

@section('scripts')
<!-- <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script> -->
<!-- <script type="text/javascript" src="/js/libs/select2/select2.min.js"></script> -->
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/isotope/isotope.pkgd.min.js"></script>
<script type="text/javascript" src="/js/administration/materials-main.js"></script>
<!-- <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script> -->
@endsection