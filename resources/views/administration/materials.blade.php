@extends('administration.main')

@section('content')

<a href="addMaterialForm" class='btn btn-success'>Add New Material</a>

@forelse ($materials as $material)

    <h1>{{ $material->name }}
        <a href="materialEdit/{{ $material->id }}" class='btn btn-info'>Edit</a>
        <a href="material/delete/{{ $material->id }}" class='btn btn-warning'>Delete</a>
    </h1>
    <img src="{{ $material->material_path }}" width="100px">
    <img src="{{ $material->bump_map_path }}" width="100px">

@empty

No materials

@endforelse

@endsection