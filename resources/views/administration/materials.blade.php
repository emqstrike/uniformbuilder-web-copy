@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">

@endsection

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

<div class="col-md-12">
    <h1>
        Materials
        <small>
            <a href="addMaterialForm" class='btn btn-xs btn-success'>Add New Material</a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-7">
    <table data-toggle='table' class='materials'>
        <thead>
            <tr>
                <th>Thumbnail</th>
                <th>Material Name</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        @forelse ($materials as $material)
            <tr class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }}'>
                <td>
                    <img src="{{ $material->thumbnail_path }}" width="100px" height="100px" alt="{{ $material->slug }}">
                </td>
                <td>
                    {{ $material->name }} <br>
                    <span class="badge">{{ $material->code }}</span>
                </td>
                <td>
                    <a href="#" class="btn btn-default btn-xs disable-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? : 'disabled="disabled"' }}>Disable</a>
                    <a href="#" class="btn btn-info btn-xs enable-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? 'disabled="disabled"' : '' }}>Enable</a>
                </td>
                <td>
                    <a href="#" class="btn btn-default btn-xs show-material" role="button"
                        data-material-name="{{ $material->name }}"
                        data-material-code="{{ $material->code }}"
                        data-material-path="{{ $material->material_path }}"
                        data-bump-map-path="{{ $material->bump_map_path }}"
                        data-shadow-path="{{ $material->shadow_path }}"
                        data-highlight-path="{{ $material->highlight_path }}"
                        data-material-id="{{ $material->id }}">View</a>
                    <a href="/administration/editMaterialForm/{{ $material->id }}" class="btn btn-primary btn-xs edit-material" role="button">Edit</a>
                    <a href="#" class="btn btn-danger pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button">Remove</a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan='4' align='center'>
                    No Materials
                </td>
            </tr>
        @endforelse
        </tbody>
    </table>

</div>

<!-- Information Modal -->
<div class="modal fade" id="view-material-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tab-material-image" data-toggle="tab">Base Material</a></li>
                        <li><a href="#tab-bump-map-image" data-toggle="tab">Bump Map</a></li>
                        <li><a href="#tab-shadow-image" data-toggle="tab">Shadow</a></li>
                        <li><a href="#tab-highlight-image" data-toggle="tab">Highlight</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-material-image" align='center'>
                            <img src="" class="material-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-bump-map-image" align='center'>
                            <img src="" class="bump-map-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-shadow-image" align='center'>
                            <img src="" class="shadow-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-highlight-image" align='center'>
                            <img src="" class="highlight-image" width="300px" height="300px">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

@include('partials.confirmation-modal')

@endsection

@section('custom-styles')
.inactive {background-color: #ccc;}
@endsection

@section('scripts')

<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>

@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('.materials').bootstrapTable();

    $('.show-material').on('click', function(){
        var material = {};
        material.id = $(this).data('material-id');
        material.name = $(this).data('material-name');
        material.material_path = $(this).data('material-path');
        material.bump_map_path = $(this).data('bump-map-path');
        material.shadow_path = $(this).data('shadow-path');
        material.highlight_path = $(this).data('highlight-path');
        $('#view-material-modal .modal-title').text(material.name);
        $('#view-material-modal .material-image').attr('src', material.material_path);
        $('#view-material-modal .bump-map-image').attr('src', material.bump_map_path);
        $('#view-material-modal .shadow-image').attr('src', material.shadow_path);
        $('#view-material-modal .highlight-image').attr('src', material.highlight_path);
        $('.nav-tabs').tab('show');
        $('#view-material-modal').modal('show');
    });

    $('.enable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//{{ $api_host }}/api/material/" + id + "/enable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.material-' + id;
                $('.flash-alert .flash-title').text(response.message);
                $('.flash-alert').addClass('alert-info').fadeIn();
                $(elem + ' .disable-material').removeAttr('disabled');
                $(elem + ' .enable-material').attr('disabled', 'disabled');
                $(elem).removeClass('inactive');
            }
        });
    });

    $('.disable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//{{ $api_host }}/api/material/" + id + "/disable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.material-' + id;
                $('.flash-alert .flash-title').text(response.message);
                $('.flash-alert').addClass('alert-info').fadeIn();
                $(elem + ' .enable-material').removeAttr('disabled');
                $(elem + ' .disable-material').attr('disabled', 'disabled');
                $(elem).addClass('inactive');
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
