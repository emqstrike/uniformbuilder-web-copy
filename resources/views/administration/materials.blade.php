@extends('administration.main')

@section('content')

<div class="col-md-12">
    <h1>
        Materials
        <small>
            <a href="addMaterialForm" class='btn btn-xs btn-success'>Add New Material</a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-12">
@forelse ($materials as $material)

    <div class="col-md-1">
        <div class="thumbnail">
            <img src="{{ $material->material_path }}" width="100px" height="100px" alt="{{ $material->name }}">
            <div class="caption">
                <h3 class="panel-title">{{ $material->name }}</h3>
                <a href="#" class="btn btn-danger btn-xs pull-right" role="button">×</a>
                <a href="#" class="btn btn-info btn-xs" role="button">On</a>
                <a href="#" class="btn btn-default btn-xs" role="button">Off</a>
            </div>
        </div>
    </div>

@empty

No materials

@endforelse
</div>

@endsection

@section('custom-styles')

@endsection