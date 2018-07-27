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


    .file {
      position: relative;
    }
    .file label {
      background: #39D2B4;
      padding: 5px 20px;
      color: #fff;
      font-weight: bold;
      font-size: .9em;
      transition: all .4s;
    }
    .file input {
      position: absolute;
      display: inline-block;
      left: 0;
      top: 0;
      opacity: 0.01;
      cursor: pointer;
    }
    .file input:hover + label,
    .file input:focus + label {
      background: #34495E;
      color: #39D2B4;
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
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                    <hr>
                    Uniform Category:
                    <select class="active-sport">
                        <option value="{{ $active_sport }}">{{ $active_sport }}</option>
                    </select>
                </div>
                <div class="box-body">
                    <table class='data-table table display table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
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
                                    <input type="checkbox" name="onoffswitch2" class="onoffswitch-checkbox toggle-mascot-typographic" id="switch-typographic-{{ $mascot->id }}" data-mascot-id="{{ $mascot->id }}" {{ ($mascot->typographic) ? 'checked' : '' }}>
                                    <label class="switch">
                                      <input type="checkbox">
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
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs btn-flat enable-mascot" data-mascot-id="{{ $mascot->id }}" role="button" {{ ($mascot->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>
                            </td>
                            <td class="col-md-2">
                                <a href="#" class="btn btn-primary btn-xs btn-flat edit-button" data-mascot-id="{{ $mascot->id }}" role="button">
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
@include('administration-lte-2.mascots.mascots-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    window.sports = null;
    window.mascot_categories = null;

    getSports(function(sports){ window.sports = sports; });
    getMascotCategories(function(categories){ window.mascot_categories = categories; });

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

    function getMascotCategories(callback){
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

    loadMascotCategories();
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
        window.location = "/administration/v1-0/mascots/"+$(this).val();
    });

    function loadUniformCategories() {
        var category_elem = '<option value="All">All</option>';
        sorted_category = _.sortBy(window.sports, function (s) { return s.name });

        _.each(sorted_category, function(category) {
            category_elem += `<option value=` + category.name + `>` + category.name + `</option>`;
        });
        $('.input-uniform-category').append(category_elem);
    }

    function loadMascotCategories() {
        var mcategory_elem = '';
        sorted_mcategory = _.sortBy(window.mascot_categories, function (m) { return m.name });

        _.each(sorted_mcategory, function(category) {
            mcategory_elem += `<option value=` + category.name + `>` + category.name + `</option>`;
        });
        $('.input-mascot-category').append(mcategory_elem);
    }


    $(document).on('click', '.edit-button', function(e) {
        e.preventDefault();
        $(this).parent().siblings('td').find('.color-name').prop('disabled', false);
        $(this).parent().siblings('td').find('.sublimation-only').prop('disabled', false);
        $(this).parent().siblings('td').find('.master-color').prop('disabled', false);
        $(this).parent().siblings('td').find('.brand-id').prop('disabled', false);
        $(this).parent().siblings('td').find('#color-code').css("visibility" , "hidden");
        var color_code = $(this).parent().siblings('td').find('#color-code-text');
        color_code.show();
        var hex_code = $(this).parent().siblings('td').find('#hex-code').val();
    });

    $(document).on('change', '.sublimation-only, #color-code-text, #colorpicker, .brand-id, .master-color',  function() {
        var save_button = $(this).parent().siblings('td').find('.save-button');
        save_button.removeAttr('disabled');
        $(this).parent().siblings('td').find('.color-name').trigger('change');
    });

    $(document).on('change', '.color-name',  function() {
        var save_button = $(this).parent().siblings('td').find('.save-button');
        var color_name = $(this).val();
        if(color_name == '') {
            save_button.attr('disabled', 'disabled');
        } else {
            save_button.removeAttr('disabled');
        }
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-mascot-name').val();
        data.code = $('.input-mascot-code').val();
        data.category = $('.input-mascot-category').val();
        data.sports = $('.input-uniform-category').val();
        data.icon = $('.input-icon').val();
        data.ai_file = $('.input-ai-file').val();
        data.brand = $('.input-brand').val();
        data.master_color_id = $('.input-master-color').val();

        if(window.modal_action == 'add'){
        var url = "//" + api_host + "/api/mascot";
        console.log(url);
        console.log(data);
            // addUpdateRecord(data, url);
        } else if(window.modal_action == 'update'){
            data.id =  $('.input-id').val();
            var url = "//" + api_host + "/api/mascot/update";
            console.log(url);
            console.log(data);
            // addUpdateRecord(data, url);
        }
        $('.submit-new-record').attr('disabled', 'true');
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-color-code').val('');
        $('.input-color-name').val('');
        $('.input-master-color').val('');
        $('.input-brand-id').val('0');
        $('#create-hex-code').val('#ff0000');
        $('#create_colorpicker').spectrum({
            color: "#ff0000",
            preferredFormat: "hex",
            showInput: true,
            move: function(tinycolor) {
                $('#create-hex-code').val(tinycolor);
            },
            hide: function(tinycolor) {
                $('#create-hex-code').val(tinycolor);
            }
            });
        $('.submit-new-record').removeAttr('disabled');
    });

    function addUpdateRecord(data) {
        var url = "//" + api_host + "/api/color";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            headers: {"accessToken": atob(headerValue)},
            contentType: 'application/json;',
            success: function (data) {
                if(data.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Success',
                        text: data.message,
                        type: 'success',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: data.message,
                        type: 'error',
                        hide: true
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //Error Code Here
            }
        });
    }

    $(document).on('click', '.enable-color', function(e) {
        e.preventDefault();
        var id = $(this).data('color-id');
        var url = "//" + api_host + "/api/color/enable/";
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
                    var elem = '.color-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-color').removeAttr('disabled');
                    $(elem + ' .enable-color').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $(document).on('click', '.disable-color', function(e) {
        e.preventDefault();
        var id = $(this).data('color-id');
        var url = "//" + api_host + "/api/color/disable/";
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
                    var elem = '.color-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-color').removeAttr('disabled');
                    $(elem + ' .disable-color').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $(document).on('click', '.delete-color', function(e) {
        e.preventDefault();
        var id = $(this).data('color-id');
        modalConfirm('Remove color', 'Are you sure you want to delete the color?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/color/delete/";
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
                    $('#confirmation-modal').modal('hide');
                    $('.color-' + id).fadeOut();
                }
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
});
</script>

@endsection

