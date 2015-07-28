@extends('administration.main')

@section('content')

<a href="addTextureForm" class='btn btn-success'>Add New Texture</a>

@forelse ($textures as $texture)

    <h1>{{ $texture->name }}
        <a href="textureEdit/{{ $texture->id }}" class='btn btn-info'>Edit</a>
        <a href="texture/delete/{{ $texture->id }}" class='btn btn-warning'>Delete</a>
    </h1>
    <img src="{{ $texture->texture_path }}" width="100px">
    <img src="{{ $texture->bump_map_path }}" width="100px">

@empty

No Textures

@endforelse

@endsection