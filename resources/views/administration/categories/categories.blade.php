@extends('administration.main')

@section('content')

<div class="col-md-12">
    <h1>
        Uniform Categories
        <small>
            <a href="/administration/addCategoryForm" class='btn btn-xs btn-success'>Add New Uniform Category</a>
        </small>
    </h1>
</div>

<div class="row col-md-5">
    <table class='table table-bordered'>
    <tr>
        <th colspan='2'>
            Categories
        </th>
    </tr>
@forelse ($categories as $category)

    <tr class='category-{{ $category->id }} {{ (!$category->active) ? ' inactive' : '' }}'>
        <td>
            {{ $category->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? : 'disabled="disabled"' }}>Disable</a>
            <a href="#" class="btn btn-info btn-xs enable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? 'disabled="disabled"' : '' }}>Enable</a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-category" data-category-id="{{ $category->id }}" role="button">Remove</a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='2'>
            No Uniform Categories
        </td>
    </tr>

@endforelse
    </table>
</div>
@include('partials.confirmation-modal')

@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('.enable-category').on('click', function(){
        var id = $(this).data('category-id');
        var url = "//{{ $api_host }}/api/category/" + id + "/enable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.category-' + id;
                alert(response.message);
                $(elem + ' .disable-category').removeAttr('disabled');
                $(elem + ' .enable-category').attr('disabled', 'disabled');
                $(elem).removeClass('inactive');
            }
        });
    });

    $('.disable-category').on('click', function(){
        var id = $(this).data('category-id');
        var url = "//{{ $api_host }}/api/category/" + id + "/disable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.category-' + id;
                alert(response.message);
                $(elem + ' .disable-category').attr('disabled', 'disabled');
                $(elem + ' .enable-category').removeAttr('disabled');
                $('.category-' + id).addClass('inactive');
            }
        });
    });

    $('.delete-category').on('click', function(){
        var id = $(this).data('category-id');
        modalConfirm('Remove Uniform Category', 'Are you sure you want to delete the uniform category?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//{{ $api_host }}/api/category/" + id + "/delete/";
        $.getJSON(url, function(response){
            if (response.success) {
                $('#confirmation-modal').modal('hide');
                $('.category-' + id).fadeOut();
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