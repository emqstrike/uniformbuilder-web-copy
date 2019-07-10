@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
    .switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 27.2px;
    }
    .switch input {display:none;}
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20.08px;
      width: 20.08px;
      left: 3.2px;
      bottom: 3.2px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    input:checked + .slider {
      background-color: #39d2b4;
    }
    input:focus + .slider {
      box-shadow: 0 0 1px #77dd77;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(20.08px);
      -ms-transform: translateX(20.08px);
      transform: translateX(20.08px);
    }

</style>
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Mascots')
                    <h1>
                        <span class="fa fa-futbol-o"></span>
                        Mascots
                        <a href="/administration/v1-0/mascot/add" class="btn btn-success btn-sm btn-flat add-record">
                        Add
                        </a>
                    </h1>
                    <hr>
                   <label>Uniform Category:</label>
                    <select class="active-sport">
                        <option value="{{ $active_sport }}">{{ $active_sport }}</option>
                    </select>
                    <label>  Mascot Category: </label>
                    <select class="active-category">
                        <option value="{{ $active_category }}">{{ $active_category }}</option>
                    </select>
                </div>
                <div class="box-body">
                    <table class='data-table table display table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Alias</th>
                            <th id="select-filter">Category</th>
                            <th>Sports</th>
                            <th>Icon</th>
                            <th>Typhographic</th>
                            <th id="select-filter">Brand</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($mascots as $mascot)
                        <tr class='mascot-{{ $mascot->id }} {{ (!$mascot->active) ? ' inactive' : '' }}'>
                            <td class="col-md-1">
                                {{ $mascot->id }}
                            </td>
                            <td class="col-md-1">
                                {{ $mascot->name }}
                            </td>
                            <td class="col-md-1">
                                {{ $mascot->code }}
                            </td>
                            <td class="col-md-1">
                                {{ $mascot->alias }}
                            </td>
                            <td class="col-md-2">
                                {{ $mascot->category }}
                            </td>
                            <td class="col-md-2">
                                {{ $mascot->sports }}
                            </td>
                            <td align="center">
                            @if ($mascot->icon)
                                <img src="{{ $mascot->icon }}" style="height: 60px; width: 65px;">
                            @else
                                <img src="" style="height: 60px; width: 65px;">
                            @endif
                            </td>
                            <td class="col-md-1">
                                <div class="onoffswitch">
                                    <label class="switch">
                                      <input type="checkbox" class="onoffswitch-checkbox toggle-mascot-typographic" id="switch-typographic-{{ $mascot->id }}" data-mascot-id="{{ $mascot->id }}" {{ ($mascot->typographic) ? 'checked' : '' }}>
                                      <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                {{ $mascot->brand }}
                            </td>
                            <td class="col-md-2">
                                <a href="#" class="btn btn-default btn-xs btn-flat disable-mascot" data-mascot-id="{{ $mascot->id }}" role="button" {{ ($mascot->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                </a>
                                <a href="#" class="btn btn-info btn-xs btn-flat enable-mascot" data-mascot-id="{{ $mascot->id }}" role="button" {{ ($mascot->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                </a>
                            </td>
                            <td class="col-md-2">
                                <a href="/administration/v1-0/mascot/edit/{{ $mascot->id }}" class="btn btn-primary btn-xs btn-flat edit-button" data-mascot-id="{{ $mascot->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger btn-xs btn-flat delete-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty
                        <tr>
                            <td colspan='9'>
                                No Mascots
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                    <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    window.sports = null;
    window.categories = null;

    getSports(function(sports){ window.sports = sports; });
    getCategories(function(categories){ window.categories = categories; });

    function getSports(callback){
        var sports;
        var url = "//" + api_host + "/api/categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                sports = data['categories'];
                if(typeof callback === "function") callback(sports);
            }
        });
    }

    function getCategories(callback){
        var categories;
        var url = "//" + api_host + "/api/mascot_categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                categories = data['mascots_categories'];
                if(typeof callback === "function") callback(categories);
            }
        });
    }

    loadUniformCategories();

    window.active_sport = $('.active-sport').val();
    sports = _.filter(window.sports, function(e){
        return window.active_sport !== e.name;
    });

    sports_sorted = _.sortBy(sports, function(o) { return o.name; });

    var elem = '';
    if(window.active_sport != 'All') {
        elem += '<option value="All">All</option>';
    }

    sports_sorted.forEach(function(entry) {
        elem += '<option value="'+entry.name+'">'+entry.name+'</option>';
    });
    $('.active-sport').append(elem);

    $(document).on('change', '.active-sport', function() {
        var category_filter = $('.active-category').val();
        window.location = "/administration/v1-0/mascots/"+$(this).val()+"/"+category_filter;
    });


    window.active_category = $('.active-category').val();
    categories = _.filter(window.categories, function(e){
        return window.active_category !== e.name;
    });

    categories_sorted = _.sortBy(categories, function(c) { return c.name; });

    var mascot_elem = '';
    if(window.active_category != 'All') {
        mascot_elem += '<option value="All">All</option>';
    }

    categories_sorted.forEach(function(entry) {
        mascot_elem += '<option value="'+entry.name+'">'+entry.name+'</option>';
    });
    $('.active-category').append(mascot_elem);

    $(document).on('change', '.active-category', function() {
        var sport_filter = $('.active-sport').val();
        window.location = "/administration/v1-0/mascots/"+sport_filter+"/"+$(this).val();
    });

    function loadUniformCategories() {
        var category_elem = '<option value="All">All</option>';
        sorted_category = _.sortBy(window.sports, function (s) { return s.name });

        _.each(sorted_category, function(category) {
            category_elem += `<option value=` + category.name + `>` + category.name + `</option>`;
        });
        $('.input-uniform-category').append(category_elem);
    }

     $(document).on('click', '.enable-mascot', function(e) {
        e.preventDefault();
        var id = $(this).data('mascot-id');
        var url = "//" + api_host + "/api/mascot/toggle";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.mascot-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-mascot').removeAttr('disabled');
                    $(elem + ' .enable-mascot').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $(document).on('click', '.disable-mascot', function(e) {
        e.preventDefault();
        var id = $(this).data('mascot-id');
        var url = "//" + api_host + "/api/mascot/toggle";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.mascot-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-mascot').removeAttr('disabled');
                    $(elem + ' .disable-mascot').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $(document).on('click', '.toggle-mascot-typographic', function(e){
        e.preventDefault();
        var id = $(this).data('mascot-id');
        console.log(id);
         var url = "//" + api_host + "/api/mascot/toggle_typographic/";
         $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    window.location.reload();
                    var elem = '.mascot-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

    $(document).on('click', '.delete-mascot', function(e) {
        e.preventDefault();
        var id = $(this).data('mascot-id');
        modalConfirm('Remove Mascot', 'Are you sure you want to delete the Mascot?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/mascot/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
               if(response.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Warning',
                        text: response.message,
                        type: 'warning',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: response.message,
                        type: 'error',
                        hide: true
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        initComplete: function () {
        this.api().columns('#select-filter').every( function () {
            var column = this;
            var select = $(`<select><option value=""></option></select>`)
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                    .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );
            column.data().unique().sort().each( function ( d, j ) {

                select.append( `<option value="`+d+`">`+d+`</option>` );
            } );
        } );
    }
    });

    @if (Session::has('message'))
        new PNotify({
            title: 'Success',
            text: "{{ Session::get('message') }}",
            type: 'success',
            hide: true
        });
    @endif
});
</script>

@endsection

