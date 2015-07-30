@extends('administration.main')
 
@section('content')

<div class="col-md-12">
    <h1>
        Colors
        <small>
            <a href="addColorForm" class='btn btn-xs btn-success'>Add New Color</a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-12">
@forelse ($colors as $color)

    <div class="col-md-1">
        <div class="thumbnail" align='center'>
            <div style='background-color: #{{ $color->hex_code }}; width: 100px; height: 100px; border: 1px solid #ddd;'></div>
            <div class="caption">
                <h3 class="panel-title">{{ $color->name }}</h3>
                <a href="#" class="btn btn-danger btn-xs pull-right" role="button">×</a>
                <a href="#" class="btn btn-info btn-xs" role="button">On</a>
                <a href="#" class="btn btn-default btn-xs" role="button">Off</a>
            </div>
        </div>
    </div>

@empty

No Textures

@endforelse
</div>

@endsection

@section('custom-styles')

@endsection