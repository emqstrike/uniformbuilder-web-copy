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
                    @section('page-title', 'Colors')
                    <h1>
                        <span class="fa fa-tint"></span>
                        Colors
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                    <hr>
                    Brand:
                    <select class="active-brand">
                        <option value='prolook' @if ($active_brand == 'prolook') selected @endif>Prolook</option>
                        <option value='richardson' @if ($active_brand == 'richardson') selected @endif>Richardson</option>
                    </select>
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
                            <th>Active</th>
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
                                <select class="form-control brand" name='brand' disabled="true">
                                    <option value='prolook' @if ($color->brand == 'prolook') selected @endif>Prolook</option>
                                    <option value='richardson' @if ($color->brand == 'richardson') selected @endif>Richardson</option>
                                </select>
                            </td>
                            <td>
                                <div class="onoffswitch">
                                    <label class="switch">
                                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-color" id="switch-{{ $color->id }}" data-color-id="{{ $color->id }}" {{ ($color->active) ? 'checked' : '' }}>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="col-md-2">
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
                            <td colspan='9'>
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
        $(this).parent().siblings('td').find('.brand').prop('disabled', false);
        $(this).parent().siblings('td').find('#color-code').css("visibility" , "hidden");
        var color_code = $(this).parent().siblings('td').find('#color-code-text');
        color_code.show();
        var hex_code = $(this).parent().siblings('td').find('#hex-code').val();
        $(this).parent().siblings('td').find('#colorpicker').spectrum({
            color: hex_code,
            preferredFormat: "hex",
            showInput: true,
            move: function(tinycolor) {
                $(this).parent().parent().find('#hex-code').val(tinycolor)  ;
            },
            hide: function(tinycolor) {
                $(this).parent().parent().find('#hex-code').val(tinycolor);
            }
            });
    });

    $(document).on('change', '.sublimation-only, #color-code-text, #colorpicker, .brand, .master-color',  function() {
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

    $(document).on('click', '.save-button', function() {
        var id = $(this).data('color-id');
        var name = $(this).parent().siblings('td').find('.color-name').val();
        var color_code = $(this).parent().siblings('td').find('#color-code-text').val();
        var hex_code = $(this).parent().siblings('td').find('#hex-code').val();
        hex_code = hex_code.replace(/#/g, '');
        var sublimation_only = $(this).parent().siblings('td').find('.sublimation-only').val();
        var master_color_id = $(this).parent().siblings('td').find('.master-color').val();
        var brand = $(this).parent().siblings('td').find('.brand').val();
        var data = {
            "id" : id,
            "name" : name,
            "color_code" : color_code,
            "hex_code" : hex_code,
            "sublimation_only" : sublimation_only,
            "master_color_id" : master_color_id,
            "brand" : brand
        };
        if(!$(this).attr('disabled')) {
            updateColor(data);
        }
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
        data.brand = $('.input-brand').val();
        data.master_color_id = $('.input-master-color').val();
        addColor(data);
        $('.submit-new-record').attr('disabled', 'true');
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-color-code').val('');
        $('.input-color-name').val('');
        $('.input-master-color').val('');
        $('.input-brand').val('none');
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

    $(document).on('click', '.toggle-color', function(e) {
        e.preventDefault();
        var id = $(this).data('color-id');
        var url = "//" + api_host + "/api/color/toggle/";
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

    $(document).on('change', '.active-brand', function() {
        window.location = "/administration/v1-0/colors/"+$(this).val();
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

