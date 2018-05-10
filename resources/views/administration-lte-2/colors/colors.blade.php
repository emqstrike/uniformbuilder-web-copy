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
                            <th>Color</th>
                            <th>Sublimation Only</th>
                            <th>Edit</th>
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
                                <input type="text" size="3" id="color-code-text" style="display: none"value="{{ $color->color_code }}">
                                <input type="hidden" name="hex-code" id="hex-code" value="{{ $color->hex_code }}">
                                <input class="form-control colorpicker" id="colorpicker" type="hidden">
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
<script type="text/javascript" src="/js/administration/colors.js"></script>

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

    $(document).on('change', '.color-name',  function() {
        var save_button = $(this).parent().siblings('td').find('.save-button');
        save_button.removeAttr('disabled');
    });
    $(document).on('change', '.sublimation-only',  function() {
        var save_button = $(this).parent().siblings('td').find('.save-button');
        save_button.removeAttr('disabled');
    });
    $(document).on('change', '#color-code-text',  function() {
        var save_button = $(this).parent().siblings('td').find('.save-button');
        save_button.removeAttr('disabled');
    });
    $(document).on('change', '#colorpicker',  function() {
        var save_button = $(this).parent().siblings('td').find('.save-button');
        save_button.removeAttr('disabled');
    });

    $(document).on('click', '.save-button', function() {
        var id = $(this).data('color-id');
        var name = $(this).parent().siblings('td').find('.color-name').val();
        var color_code = $(this).parent().siblings('td').find('#color-code-text').val();
        var hex_code = $(this).parent().siblings('td').find('#hex-code').val();
        hex_code = hex_code.replace(/#/g, '');
        var sublimation_only = $(this).parent().siblings('td').find('.sublimation-only').val();
        var data = {
            "id" : id,
            "name" : name,
            "color_code" : color_code,
            "hex_code" : hex_code,
            "sublimation_only" : sublimation_only
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
        addColor(data);
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-color-code').val('');
        $('.input-color-name').val('');
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

