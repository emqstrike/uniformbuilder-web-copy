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

<div class="col-md-12">
    <h1>
        Colors
        <small>
            <a href="addColorForm" class='btn btn-xs btn-success'>Add New Color</a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-5">
    <table class='table table-bordered'>
    <tr>
        <th colspan='3'>
            Color
        </th>
    </tr>
@forelse ($colors as $color)

    <tr class='color-{{ $color->id }} {{ (!$color->active) ? ' inactive' : '' }}'>
        <td>
            {{ $color->name }}
        </td>
        <td style='background-color: #{{ $color->hex_code }}; width: 300px; height: 30px; border: 1px solid #ddd;'>
            <span class='badge'>{{ $color->color_code }}</span>
            <a href="editColorForm/{{ $color->id }}" class="btn btn-primary pull-right btn-xs edit-color" data-color-id="{{ $color->id }}" role="button">Edit</a>
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? : 'disabled="disabled"' }}>Disable</a>
            <a href="#" class="btn btn-info btn-xs enable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? 'disabled="disabled"' : '' }}>Enable</a>
            <a href="#" class="btn btn-danger btn-xs delete-color" data-color-id="{{ $color->id }}" role="button">Remove</a>
        </td>
    </tr>

@empty

    <tr>
        <td>
            No Colors
        </td>
    </tr>

@endforelse
    </table>
</div>

@include('partials.confirmation-modal')

@endsection

@section('custom-styles')
.inactive {background-color: #ccc;}
@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('.enable-color').on('click', function(){
        var id = $(this).data('color-id');
        var url = "//{{ $api_host }}/api/color/" + id + "/enable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.color-' + id;
                alert(response.message);
                $(elem + ' .disable-color').removeAttr('disabled');
                $(elem + ' .enable-color').attr('disabled', 'disabled');
                $(elem).removeClass('inactive');
            }
        });
    });

    $('.disable-color').on('click', function(){
        var id = $(this).data('color-id');
        var url = "//{{ $api_host }}/api/color/" + id + "/disable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.color-' + id;
                alert(response.message);
                $(elem + ' .enable-color').removeAttr('disabled');
                $(elem + ' .disable-color').attr('disabled', 'disabled');
                $(elem).addClass('inactive');
            }
        });
    });

    $('.delete-color').on('click', function(){
        var id = $(this).data('color-id');
        modalConfirm('Remove color', 'Are you sure you want to delete the color?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//{{ $api_host }}/api/color/" + id + "/delete/";
        $.getJSON(url, function(response){
            if (response.success) {
                $('#confirmation-modal').modal('hide');
                $('.color-' + id).fadeOut();
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
