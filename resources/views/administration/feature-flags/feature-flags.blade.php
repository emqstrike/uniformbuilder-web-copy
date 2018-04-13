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
                        <i class="fa fa-bookmark"></i>
                        Feature Flags
                        <br />
                        <small>
                            <a href="/administration/feature_flag/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add a feature flag
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Group</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Switch</th>

                                <th>User Types</th>
                                <th>Roles</th>
                                <th>State</th>
                                <th>Uniform Category</th>
                                <th>Active</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($feature_flags as $feature_flag)
                    <tr class='feature-flag-{{ $feature_flag->id }} {{ (!$feature_flag->active) ? ' inactive' : '' }}'>
                        <td>
                            {{ $feature_flag->name }}
                        </td>
                        <td>
                            {{ $feature_flag->group }}
                        </td>
                        <td>
                            {{ $feature_flag->category }}
                        </td>
                        <td>
                            {{ $feature_flag->description }}
                        </td>
                        <td>
                            {{ $feature_flag->switch }}
                        </td>

                        <td>
                            {{ $feature_flag->user_types }}
                        </td>
                        <td>
                            {{ $feature_flag->roles }}
                        </td>
                        <td>
                            {{ $feature_flag->state }}
                        </td>
                        <td class='sports-list'>
                            {{ $feature_flag->sports }}
                        </td>

                                 <td>
                            <div class="onoffswitch">
                                 <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-feature-flag" id="switch-{{ $feature_flag->id }}" data-feature-flag-id="{{ $feature_flag->id }}" {{ ($feature_flag->active) ? 'checked' : '' }}>
                                   <label class="onoffswitch-label" for="switch-{{ $feature_flag->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <a href="#" class="btn btn-danger delete-feature-flag" data-feature-flag-id="{{ $feature_flag->id }}">Remove</a>
                        </td>


                        <td>
                            <a href="/administration/feature_flag/edit/{{ $feature_flag->id }}" class="btn btn-primary btn-xs edit-feature-flag-flag" data-feature-flag-flag-id="{{ $feature_flag->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <!-- <a href="#" class="btn btn-danger pull-right btn-xs delete-block-pattern" data-block-pattern-id="{{ $feature_flag->id }}" data-block-pattern-name="{{ $feature_flag->name }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a> -->
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Feature Flags Found
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

{{-- @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal']) --}}

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="/js/administration/feature-flags.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){

      $('.toggle-feature-flag').on('click', function(){
            var id = $(this).data('feature-flag-id');
            var url = "//" + api_host + "/api/feature/toggle/";

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



      $('.delete-feature-flag').on('click', function(){
            var id = $(this).data('feature-flag-id');
         var url = "//" + api_host + "/api/feature/delete/";
         //   var url = "//localhost:8888/api/feature/delete";


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

                        $( ".data-table" ).load( location+" .data-table" );

                    }
                }
            });
        });
});



</script>
@endsection
