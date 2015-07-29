@extends('administration.main')
 
@section('content')

@forelse ($colors as $color)

    <div style="border-color: black; border:1px">
        <h3>{{ $color->name }} <a href="#editColor" class='btn btn-info'>Edit</a></h3>
        <div style='background-color: #{{ $color->hex_code }}; width: 100px; height: 100px;'></div>
    </div>

@empty

No Textures

@endforelse

@endsection