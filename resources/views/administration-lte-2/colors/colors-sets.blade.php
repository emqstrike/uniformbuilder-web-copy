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
                    <h1>
                        <span class="fa fa-tint"></span>
                        Colors Sets
                            <a href="/administration/v1-0/colors_set/add" class='btn btn-sm btn-success btn-flat'> Add </a>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered display' id="colors-set-table">
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
                                    <label class="switch">
                                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-color-set" id="switch-{{ $set->id }}" data-color-set-id="{{ $set->id }}" {{ ($set->active) ? 'checked' : '' }}>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                        </td>
                            <td>
                                <a href="/administration/v1-0/colors_set/edit/{{$set->id}}" class="edit-color-set btn btn-info btn-xs btn-flat">Edit</a>
                                <a href="#" class="btn btn-danger delete-color-set btn-xs btn-flat" data-color-set-id="{{ $set->id }}">Remove</a>
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
<script type="text/javascript">
$(document).ready(function(){

    window.colors = null;

    getColors(function(colors){ window.colors = colors; });

    var active_colors = _.filter(window.colors, function(item) { return item.active == 1; });

    var sorted_colors = _.sortBy(active_colors, function(color) {  return color.order;  });

    $(".colors").each(function(i) {
        var strColors = $(this).val().replace(/\\"/g, '"');
        strColors = strColors.substring(1, strColors.length-1);
        strColors = JSON.parse(strColors);
        var elem = "";
        var thisElem = $(this);
        $.each(sorted_colors, function(i, item) {
            strColors.forEach(function(entry) {
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

    function getColors(callback){
        var colors;
        var url = "//" +api_host+ "/api/colors";
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
