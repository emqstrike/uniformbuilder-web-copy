@extends('administration.lte-main')


@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection


@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-th"></span>
                        Colors
                        <small>
                            <a href="/administration/color/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Color
                            </a>
                        </small>
                    </h1>
                    <!-- <small>
                        <a href="/administration/colors/updateAll" class='btn btn-xs btn-primary'>
                            <span class="glyphicon glyphicon-refresh"></span>
                            Update Colors
                        </a>
                    </small> -->
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered'>
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
                            <td>
                                {{ $color->id }}
                            </td>
                            <td>
                                {{ $color->order }}
                            </td>
                            <td>
                                <input type="text" class="form-control color-name" name="color-name" value="{{ $color->name }}" disabled="true">
                            </td>
                            <td>
                            <select class="form-control sublimation-only" name='sublimation_only' disabled="true">
                                    <option value='0' @if ($color->sublimation_only == '0') selected @endif>No</option>
                                    <option value='1' @if ($color->sublimation_only == '1') selected @endif>Yes</option>
                                </select>
                            </td>
                            <td style='background-color: #{{ $color->hex_code }}; width: 300px; height: 30px; border: 1px solid #ddd;'>
                                <span id="color-code" class='badge'>{{ $color->color_code }}</span>
                                <input type="text" size="3" id="color-code-text" style="display: none"value="{{ $color->color_code }}">
                                <input type="hidden" name="hex-code" id="hex-code" value="{{ $color->hex_code }}">
                                <input class="form-control colorpicker" id="colorpicker" type="hidden">
                              {{--   <a href="/administration/color/edit/{{ $color->id }}" class="btn btn-primary pull-right btn-xs edit-color" data-color-id="{{ $color->id }}" role="button">

                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a> --}}
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs disable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs enable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>

                                <a href="#" class="btn btn-primary btn-xs edit-button" data-color-id="{{ $color->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-default btn-xs save-button" data-color-id="{{ $color->id }}" role="button" disabled="true">
                                    <i class="glyphicon glyphicon-floppy-save"></i>
                                    Save
                                </a>

                                <a href="#" class="btn btn-danger pull-right btn-xs delete-color" data-color-id="{{ $color->id }}" role="button">
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

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/libs/spectrum/spectrum.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/colors.js"></script>

<script type="text/javascript">

$(document).ready(function(){


    $(document).on('click', '.edit-button', function(e) {
        e.preventDefault();

        $(this).parent().siblings('td').find('.color-name').prop('disabled', false);
        $(this).parent().siblings('td').find('.sublimation-only').prop('disabled', false);
        $(this).parent().siblings('td').find('#color-code').css("visibility" , "hidden");
        var color_code = $(this).parent().siblings('td').find('#color-code-text');
        color_code.show();
        var hex_code = $(this).parent().siblings('td').find('#hex-code').val();
        console.log(hex_code);
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
       console.log(hex_code);
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
        console.log(data);
        updateColor(data);
    });

    function updateColor(data){

        var url = "//" + api_host + "/api/color/update";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            headers: {"accessToken": atob(headerValue)},
            contentType: 'application/json;',
            success: function (data) {
                alert('Successfully updated!');
                document.location.reload();
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

