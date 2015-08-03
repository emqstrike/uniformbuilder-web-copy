@extends('administration.main')

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>
    <h4 class='flash-title'>Alert</h4>
    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="col-md-12"
>    <h1>
        Materials
        <small>
            <a href="addMaterialForm" class='btn btn-xs btn-success'>Add New Material</a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-12">
@forelse ($materials as $material)

    <div class="col-md-1 material-{{ $material->id }}">
        <div class="thumbnail{{ (!$material->active) ? ' inactive' : '' }}" id="active-status-material-{{ $material->id }}">
            <img src="{{ $material->thumbnail_path }}" width="100px" height="100px" alt="{{ $material->name }}">
            <div class="caption">
                <h3 class="panel-title">{{ $material->name }}</h3>
                <a href="#" class="btn btn-danger btn-xs pull-right delete-material" data-material-id="{{ $material->id }}" role="button">×</a>
                <a href="#" class="btn btn-info btn-xs enable-material" data-material-id="{{ $material->id }}" role="button">On</a>
                <a href="#" class="btn btn-default btn-xs disable-material" data-material-id="{{ $material->id }}" role="button">Off</a>
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
.inactive {background-color: #ccc;}
@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('.enable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//{{ $api_host }}/api/material/" + id + "/enable/";
        $.getJSON(url, function(response){
            if (response.success) {
                $('#active-status-material-' + id).removeClass('inactive');
            }
        });
    });

    $('.disable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//{{ $api_host }}/api/material/" + id + "/disable/";
        $.getJSON(url, function(response){
            if (response.success) {
                $('#active-status-material-' + id).addClass('inactive');
            }
        });
    });

    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm('Remove Material', 'Are you sure you want to delete the Material?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//{{ $api_host }}/api/material/" + id + "/delete/";
        $.getJSON(url, function(response){
            if (response.success) {
                $('#confirmation-modal').modal('hide');
                $('.material-' + id).fadeOut();
            }
        });
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
