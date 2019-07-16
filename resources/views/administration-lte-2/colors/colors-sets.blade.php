@extends('administration-lte-2.lte-main')

@section('styles')
@endsection

@section('content')
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

.li{
    display: inline-block;
    max-width:50%;
    width:50px;
    font-size:10px;
    text-align: center;
    word-break:break-all;
    margin: 0;
    padding: 0;
}


</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Colors Sets')
                    <h1>
                        <span class="fa fa-tint"></span>
                        Colors Sets
                            <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                    <hr>
                    Brand:
                    <select class="active-brand">
                        <option value='prolook' @if ($active_brand == 'prolook') selected @endif>Prolook</option>
                        <option value='richardson' @if ($active_brand == 'richardson') selected @endif>Richardson</option>
                        <option value='riddell' @if ($active_brand == 'riddell') selected @endif>Riddell</option>
                    </select>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered display' id="colors-set-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color Set Name</th>
                            <th>Uniform Application Type</th>
                            <th>Colors</th>
                            <th>Brand</th>
                            <th>Active Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($colors_sets as $set)
                        <tr class='set-{{ $set->id }}'>
                            <td class="td-color-set-id">{{ $set->id }}</td>
                            <td class="td-color-set-name">{{ $set->name }}</td>
                            <td class="td-color-set-type">{{ $set->uniform_type }}</td>
                            <td>
                            <ul class="nav nav-pills colors-column">
                            </ul>
                                <textarea class="colors" style="display:none;"><?php echo json_encode($set->colors, JSON_FORCE_OBJECT);?></textarea>
                            </td>
                            <td class="td-color-set-brand">{{ $set->brand }}</td>
                             <td>
                                <div class="onoffswitch">
                                    <label class="switch">
                                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-color-set" id="switch-{{ $set->id }}" data-color-set-id="{{ $set->id }}" {{ ($set->active) ? 'checked' : '' }}>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                        </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                <a href="#" class="btn btn-danger delete-color-set btn-xs btn-flat" data-color-set-id="{{ $set->id }}">Remove</a>
                            </td>

                        </tr>
                    @empty

                        <tr>
                            <td colspan='8'>
                                No Colors Sets
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

@include('administration-lte-2.colors.colors-set-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function(){

    window.colors = null;
    var active_brand = $('.active-brand').val();
    getColors(active_brand, function(colors){ window.colors = colors; });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Color Set Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Color Set Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().find('.td-color-set-id').text();
        data.name = $(this).parent().parent().find('.td-color-set-name').text();
        data.uniform_type = $(this).parent().parent().find('.td-color-set-type').text();
        data.brand = $(this).parent().parent().find('.td-color-set-brand').text();
        var raw_colors = JSON.parse($(this).parent().parent().find('.colors').val());
        data.colors = raw_colors.replace(/[\[\]'"]+/g, '');
        $('.input-color-id').val(data.id);
        $('.input-color-name').val(data.name);
        $('.input-type').val(data.uniform_type);
        $('.input-brand').val(data.brand);
        $('.colors-val').val(data.colors);
        $(".input-colors").val(data.colors.split(','));
        $(".input-colors").trigger("change");
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-color-id').val('');
        $('.input-color-name').val('');
        $('.input-type').val('');
        $('.input-brand').val('prolook');
        $('.input-colors').val('');
        $('.colors-val').val('');
        $(".input-colors").trigger("change");

    });

    $("#myForm").submit(function(e){
        e.preventDefault();
        var data = {};
        data.name = $('.input-color-name').val();
        data.uniform_type = $('.input-type').val();
        data.brand = $('.input-brand').val();
        var raw_colors = $('.colors-val').val();
        data.colors = raw_colors.split(",");
        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/color_set";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-color-id').val();
            var url = "//" + api_host +"/api/color_set/update";
        }
        addUpdateRecord(data, url);
    });

    var active_colors = _.filter(window.colors, function(item) { return item.active == 1; });
    var sorted_colors = _.sortBy(active_colors, function(color) {  return color.order;  });

    $(".colors").each(function(i) {
        var strColors = $(this).val().replace(/\\"/g, '"');
        strColors = strColors.substring(1, strColors.length-1);
        strColors = JSON.parse(strColors);
        var elem = "";
        var thisElem = $(this);
        $.each(sorted_colors, function(i, item) {
            try {
                strColors.forEach(function(entry) {
                    if( entry === item.color_code ){
                        elem += '<li class="li" style="background-color: #' + item.hex_code +'"><a href="#" style="text-shadow: 1px 1px #000; color: #fff; ">' + item.color_code + '</a></li>';
                    }
                });
            } catch(err) {
                console.log(err.message);
            }
        });
        $(this).siblings('.colors-column').append(elem);
    });

    $('.input-colors').select2({
        placeholder: "Colors",
        multiple: true,
        allowClear: true
    });

    var colors_elem = '';
    _.each(sorted_colors, function(color) {
        if(color.sublimation_only) {
            colors_elem += '<option value="'+color.color_code+'">*'+color.name+'</option>';
        } else {
            colors_elem += '<option value="'+color.color_code+'">'+color.name+'</option>';
        }

    });
    $('.input-colors').append(colors_elem);

    $(".input-colors").change(function() {
        $('.colors-val').val($(this).val());
    });

    $(document).on('click', '.toggle-color-set', function(e) {
        e.preventDefault();
        var id = $(this).data('color-set-id');
        var url = "//" + api_host + "/api/color_set/toggle/";
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

    $('#colors-set-table').on('click', '.delete-color-set', function(e){
        e.preventDefault();
        var id = [];
        id.push( $(this).data('color-set-id'));
        modalConfirm('Remove Color Set', 'Are you sure you want to delete the color set?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
            var url = "//" + api_host + "/api/color_set/delete/";
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
                            type: 'notice',
                            hide: true
                        });
                         $('#confirmation-modal').modal('hide');
                        $( ".data-table" ).load( location+" .data-table" );
                    }
                }
            });
    });

    $(document).on('change', '.active-brand', function() {
        window.location = "/administration/v1-0/colors_sets/"+$(this).val();
    });

     function addUpdateRecord(data, url){
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json;',
            headers: {"accessToken": atob(headerValue)},
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
            }
        });
    };

    function getColors(brand, callback){
        var colors;
        var url = "//" +api_host+ "/api/colors/" + brand;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                colors = data['colors'];
                if(typeof callback === "function") callback(colors);
            }
        });
    }

});
</script>
@endsection
