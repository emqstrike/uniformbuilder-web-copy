@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Colors')
                    <h1>
                        <span class="fa fa-tint"></span>
                        Colors
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table display table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order</th>
                            <th>Master Color ID</th>
                            <th>Color Name</th>
                            <th>Sublimation Only</th>
                            <th>Color</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($colors as $color)
                        <tr class='color-{{ $color->id }} {{ (!$color->active) ? ' inactive' : '' }}'>
                            <td class="col-md-1">
                                {{ $color->id }}
                            </td>
                            <td class="col-md-1">
                                {{ $color->order }}
                            </td>
                            <td class="col-md-1">
                                <input type="number" class="form-control master-color" name="master-color" value="{{ $color->master_color_id }}" disabled="true">
                            </td>
                            <td class="col-md-2">
                                <input type="text" class="form-control color-name" name="color-name" value="{{ $color->name }}" disabled="true">
                            </td>
                            <td class="col-md-1">
                            <select class="form-control sublimation-only" name='sublimation_only' disabled="true">
                                    <option value='0' @if ($color->sublimation_only == '0') selected @endif>No</option>
                                    <option value='1' @if ($color->sublimation_only == '1') selected @endif>Yes</option>
                                </select>
                            </td>
                            <td style='background-color: #{{ $color->hex_code }}; height: 30px; border: 1px solid #ddd;' class="col-md-2">
                                <span id="color-code" class='badge'>{{ $color->color_code }}</span>
                                <input type="text" size="3" id="color-code-text" style="display: none"value="{{ $color->color_code }}" maxlength="2">
                                <input type="hidden" name="hex-code" id="hex-code" value="{{ $color->hex_code }}">
                                <input class="form-control colorpicker" id="colorpicker" type="hidden">
                            </td>
                            <td class="col-md-1">
                                <select class="form-control brand-id" name='brand_id' disabled="true">
                                    <option value='0' @if ($color->brand_id == '0') selected @endif>No Brand</option>
                                    <option value='1' @if ($color->brand_id == '1') selected @endif>Prolook</option>
                                    <option value='2' @if ($color->brand_id == '2') selected @endif>Richardson</option>
                                </select>
                            </td>
                            </td>
                            <td class="col-md-2">
                                <a href="#" class="btn btn-default btn-xs btn-flat disable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs btn-flat enable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>

                                <a href="#" class="btn btn-primary btn-xs btn-flat edit-button" data-color-id="{{ $color->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-default btn-xs btn-flat save-button" data-color-id="{{ $color->id }}" role="button" disabled="true">
                                    <i class="glyphicon glyphicon-floppy-save"></i>
                                    Save
                                </a>

                                <a href="#" class="btn btn-danger btn-xs btn-flat delete-color" data-color-id="{{ $color->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='3'>
                                No Colors
                            </td>
                        </tr>

                    @endforelse
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@include('administration-lte-2.colors.colors-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){

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
        $(this).parent().siblings('td').find('#colorpicker').spectrum({
            color: hex_code,
            preferredFormat: "hex",
            showInput: true,
            move: function(tinycolor) {
                $(this).parent().parent().find('#hex-code').val(tinycolor);
            },
            hide: function(tinycolor) {
                $(this).parent().parent().find('#hex-code').val(tinycolor);
            }
            });
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
            save_button.attr('disabled', 'true');
        } else {
            save_button.removeAttr('disabled');
        }
    });

    $(document).on('click', '.save-button', function() {
        var id = $(this).data('color-id');
        var name = $(this).parent().siblings('td').find('.color-name').val();
        var color_code = $(this).parent().siblings('td').find('#color-code-text').val();
        var hex_code = $(this).parent().siblings('td').find('#hex-code').val();
        hex_code = hex_code.replace(/#/g, '');
        var sublimation_only = $(this).parent().siblings('td').find('.sublimation-only').val();
        var master_color_id = $(this).parent().siblings('td').find('.master-color').val();
        var brand_id = $(this).parent().siblings('td').find('.brand-id').val();
        var data = {
            "id" : id,
            "name" : name,
            "color_code" : color_code,
            "hex_code" : hex_code,
            "sublimation_only" : sublimation_only,
            "master_color_id" : master_color_id,
            "brand_id" : brand_id
        };
        updateColor(data);
    });

    function updateColor(data) {
        var url = "//" + api_host + "/api/color/update";
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

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.color_code = $('.input-color-code').val();
        data.name = $('.input-color-name').val();
        var hex_code = $('#create-hex-code').val();
        data.hex_code = hex_code.replace(/#/g, '');
        data.brand_id = $('.input-brand-id').val();
        data.master_color_id = $('.input-master-color').val();
        addColor(data);
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

    function addColor(data) {
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
        "autoWidth": false
    });
});
</script>

@endsection

