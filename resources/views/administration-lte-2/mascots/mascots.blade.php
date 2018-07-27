@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #77dd77;
}

input:focus + .slider {
  box-shadow: 0 0 1px #77dd77;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
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
                        <span class="fa fa-image"></span>
                        Mascots
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table display table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th id="select-filter">Sports</th>
                            <th>Icon</th>
                            <th>Typhographic</th>
                            <th>Brand</th>
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
                      <!--               <label class="onoffswitch-label" for="switch-typographic-{{ $mascot->id }}">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label> -->
                                </div>
                            </td>
                            <td>
                                {{ $mascot->brand }}
                            </td>
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

                                <a href="#" class="btn btn-primary btn-xs btn-flat edit-button" data-mascot-id="{{ $mascot->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-default btn-xs btn-flat save-button" data-mascot-id="{{ $mascot->id }}" role="button" disabled="true">
                                    <i class="glyphicon glyphicon-floppy-save"></i>
                                    Save
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

