@extends('administration.main')

@section('content')

@if (Session::has('message'))
<div class="alert alert-warning alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>
    <h4 class='flash-title'>Alert</h4>
    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

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
            <img src="{{ $material->thumbnail_path }}" width="100px" height="100px" alt="{{ $material->name }}">
            <div class="caption">
                <h3 class="panel-title">{{ $material->name }}</h3>
                <a href="#" class="btn btn-info btn-xs" role="button">Enable</a>
                <a href="#" class="btn btn-default btn-xs" role="button">Disable</a>
                <a href="#" class="btn btn-danger btn-xs delete-material" data-material-id="{{ $material->id }}" role="button">Delete</a>
            </div>
        </div>
    </div>

@empty

No materials

@endforelse
</div>

<div id="response"></div>

@include('partials.confirmation-modal')

@endsection

@section('custom-styles')

@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm('Remove Material', 'Are you sure you want to delete the Material?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        $.ajax({
            url: "//{{ $api_host }}/api/material/delete/" + id + "?callback=?",
            method: 'GET',
            dataType: 'jsonp',
            contentType: 'application/json',
            jsonp: 'jsonp',
            jsonpCallback: 'jsonCallback',
            crossDomain: true,
            success: function(json) {
                console.log('SUCCESS');
                console.log(json);
            },
            error: function(error) {
                console.log('ERROR');
                console.log(error);
            }
        });
        function jsonCallback(x){
            console.log(x);
        }
    });

    function modalConfirm(title, message, value)
    {
        $('#confirmation-modal .modal-title').text(title);
        $('#confirmation-modal .modal-body').text(message);
        $('#confirmation-modal .confirm-yes').data('value', value);
        $('#confirmation-modal').modal('show');
    }
});

@endsection
