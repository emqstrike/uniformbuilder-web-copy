@extends('administration.main')
 
@section('content')

<div class="col-md-12">
    <h1>
        Uniform Categories
        <small>
            <a href="addColorForm" class='btn btn-xs btn-success'>Add New Uniform Category</a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-12">
@forelse ($categories as $category)

    <div class="col-md-1">
        <div class="thumbnail" align='center'>
            <div class="caption">
                <h3 class="panel-title">{{ $category->name }}</h3>
                <a href="#" class="btn btn-danger btn-xs pull-right" role="button">×</a>
                <a href="#" class="btn btn-info btn-xs" role="button">On</a>
                <a href="#" class="btn btn-default btn-xs" role="button">Off</a>
            </div>
        </div>
    </div>

@empty

No Uniform Categories

@endforelse
</div>

@endsection

@section('custom-styles')

@endsection