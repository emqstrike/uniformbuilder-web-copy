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
                        <i class="fa fa-info"></i>
                        Helpers
                        <br />
                        <small>
                            <a href="/administration/helper/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add a helper
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Idx</th>
                                <th>Feature</th>
                                <th>Group</th>
                                <th>Category</th>
                                <th>Sports</th>
                                <th>Video</th>
                                <th>GIF</th>
                                <th>PDF</th>
                                <th>Active</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($helpers as $helper)
                    <tr class='helper-{{ $helper->id }}'>
                        <td>
                            {{ $helper->id }}
                        </td>
                        <td>
                            {{ $helper->index }}
                        </td>
                        <td>
                            {{ $helper->feature }}
                        </td>
                        <td>
                            {{ $helper->group }}
                        </td>
                        <td>
                            {{ $helper->category }}
                        </td>
                        <td>
                            {{ $helper->sports }}
                        </td>
                        <td>
                            {{ $helper->video_url }}
                        </td>
                        <td>
                            {{ $helper->gif_url }}
                        </td>
                        <td>
                            {{ $helper->pdf_url }}
                        </td>
                        <td>
                            <div class="onoffswitch">
                                 <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-helpers" id="switch-{{ $helper->id }}" data-helpers-id="{{ $helper->id }}" {{ ($helper->active) ? 'checked' : '' }}>
                                   <label class="onoffswitch-label" for="switch-{{ $helper->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <a href="/administration/helper/edit/{{ $helper->id }}" class="btn btn-primary btn-xs edit-helper" data-helper-id="{{ $helper->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-helper" data-helper-id="{{ $helper->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"> Remove</i>
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan='3'>
                            No Helpers Found
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>

<script type="text/javascript">
$(document).ready(function(){

        $('.toggle-helpers').on('click', function(){
            var id = $(this).data('helpers-id');
            var url = "//" + api_host + "/api/helper/toggle/";

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

        $(document).on('click', '.delete-helper', function() {
            var id = $(this).data('helper-id');
            modalConfirm('Remove Helper', 'Are you sure you want to remove this helper?', id);
        });

        $('#confirmation-modal .confirm-yes').on('click', function(){
            var id = $(this).data('value');
            var url = "//" + api_host + "/api/helper/delete/";
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
                            $('.helper-'+id).fadeOut();
                   }
               }
           });
        });
});
</script>
@endsection
