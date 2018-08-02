@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<style type="text/css">
.onoffswitch {
    position: relative; width: 61px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 9px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 20px; padding: 0; line-height: 20px;
    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    padding-left: 5px;
    background-color: #02C723; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 5px;
    background-color: #BF5050; color: #FFFFFF;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 1px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 37px;
    border: 2px solid #999999; border-radius: 9px;
    transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px;
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
                    <h1>
                        Colors Sets
                        <small>
                            <a href="/administration/colors_set/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Colors Set
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
                    <textarea class="colors-all" style="display:none;"><?php echo json_encode($colors, JSON_FORCE_OBJECT);?></textarea>
                    <table class='data-table table table-bordered' id="colors-set-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color Set Name</th>
                            <th>Uniform Application Type</th>
                            <th>Colors</th>
                            <th>Active Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($colors_sets as $set)
                        <tr class='set-{{ $set->id }}'>
                            <td>
                                {{ $set->id }}
                            </td>
                            <td>
                                {{ $set->name }}
                            </td>
                            <td>
                                {{ $set->uniform_type }}
                            </td>

                            <td>
                            <ul class="nav nav-pills colors-column">
                            </ul>
                                <textarea class="colors" style="display:none;"><?php echo json_encode($set->colors, JSON_FORCE_OBJECT);?></textarea>
                            </td>

                             <td>
                                <div class="onoffswitch">
                                     <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-color-set" id="switch-{{ $set->id }}" data-color-set-id="{{ $set->id }}" {{ ($set->active) ? 'checked' : '' }}>
                                       <label class="onoffswitch-label" for="switch-{{ $set->id }}">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </td>
                        </td>
                            <td>
                                <a href="/administration/colors_set/edit/{{$set->id}}" class="edit-color-set btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit">Edit</i>
                                </a>
                                <a href="#" class="btn btn-danger delete-color-set btn-xs pull-right" data-color-set-id="{{ $set->id }}">Remove</a>
                            </td>

                        </tr>
                    @empty

                        <tr>
                            <td colspan='3'>
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

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    var all_colors = JSON.parse( $('.colors-all').val() );

    $(".colors").each(function(i) {
        var strColors = $(this).val().replace(/\\"/g, '"');
        strColors = strColors.substring(1, strColors.length-1);
        strColors = JSON.parse(strColors);
        var elem = "";
        var thisElem = $(this);
        strColors.forEach(function(entry) {
            $.each(all_colors, function(i, item) {
                if( entry == item.color_code ){
                    elem += '<li class="li" style="background-color: #' + item.hex_code +'"><a href="#" style="text-shadow: 1px 1px #000; color: #fff; ">' + item.color_code + '</a></li>';
                }
            });
        });
        $(this).siblings('.colors-column').append(elem);
    });

    $('.toggle-color-set').on('click', function(){
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

                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    console.log(response.message);
                }
            }
        });
    });

    $('#colors-set-table').on('click', '.delete-color-set', function(e){
        e.preventDefault();
        var id = [];
        id.push( $(this).data('color-set-id'));
        console.log(id);
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
                        new PNotify({
                            title: 'Success',
                            text: response.message,
                            type: 'success',
                            hide: true
                        });
                         $('#confirmation-modal').modal('hide');
                        $( ".data-table" ).load( location+" .data-table" );
                    }
                }
            });
        });

});
</script>
@endsection
