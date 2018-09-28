@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
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
</style>
@endsection

@section('content')

@if (Session::has('message'))
<div class="alert alert-{{ Session::get('alert-class') }} alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Mascots Groups Categories
                        <br />
                        <small>
                            <a href="/administration/mascots_groups_categories/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot Group Category
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns mascots-groups-categories-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($mascots_groups_categories as $mascots_group_categories)
                    <tr class='mascot-category-{{ $mascots_group_categories->id }} {{ (!$mascots_group_categories->active) ? ' inactive' : '' }}'>
                        <td>
                            {{ $mascots_group_categories->name }}
                        </td>
                        <td>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-mascot-group-category" id="switch-{{ $mascots_group_categories->id }}" data-mascot-group-category-id="{{ $mascots_group_categories->id }}" {{ ($mascots_group_categories->active) ? 'checked' : '' }}>
                                <label class="onoffswitch-label" for="switch-{{ $mascots_group_categories->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <a href="/administration/mascots_groups_categories/edit/{{ $mascots_group_categories->id }}" class="btn btn-primary btn-xs edit-mascot" data-mascot-category-id="{{ $mascots_group_categories->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-mascot-group-category" data-mascot-group-category-id="{{ $mascots_group_categories->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>


                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
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

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>

<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>



<script type="text/javascript">
$(document).ready(function(){
    //     $('.delete-mascot-group-category').on('click', function(){
    //     console.log("asdsadasd");

    //     modalConfirm('Remove mascot category', 'Are you sure you want to delete the mascot category?', id);
    // });

    $(document).on('click', '.delete-mascot-group-category', function(){
          var id = $(this).data('mascot-group-category-id');
        console.log("DELETE CATEGORY: "+id);
      $.confirm({
      title: 'Accent',
      content: 'Are you want to delete Mascot Group Category?',
      confirmButton: 'YES',
      cancelButton: 'NO',
      confirmButtonClass: 'confirmButtonYes btn-danger',
      cancelButtonClass: 'confirmButtonNo btn-success',
      });
      $(".confirmButtonYes").attr('data-mascot-group-category-id',id);



    });
    $(document).on('click', '.confirmButtonYes', function(){
        var id = $(this).data('mascot-group-category-id');

       //  var url = "http://localhost:8888/api/mascot_group_category/delete";
        var url = "//" + api_host + "/api/mascot_group_category/delete";

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
                    // $('#confirmation-modal').modal('hide');
                    $('.font-' + id).fadeOut();
                     $( ".box-body" ).load( location+" .mascots-groups-categories-table" );

                }
            }
        });
     });
       $('.toggle-mascot-group-category').on('click', function(){
        var id = $(this).data('mascot-group-category-id');

        // var url = "http://localhost:8888/api/mascot_group_category/toggle/";
         var url = "//" + api_host + "/api/mascot_group_category/toggle/";
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
                    var elem = '.material-' + id;
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



});
</script>
@endsection
