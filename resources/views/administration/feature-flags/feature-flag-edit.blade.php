@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
    
li.select2-selection__choice {
    color: black !important;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Feature Flag</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/feature_flag/update" enctype="multipart/form-data" id='edit-feature_flag-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="feature_flag_id" value="{{ $feature_flag->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Feature Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="name" value="{{ $feature_flag->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="group" value="{{ $feature_flag->group }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="category" value="{{ $feature_flag->category }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="description">{{ $feature_flag->description }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Switch</label>
                            <div class="col-md-6">
                                <select name='switch' class="form-control">
                                    <option value='enable' @if ($feature_flag->switch == "enable") selected="selected"@endif>Enable</option>
                                    <option value='disable' @if ($feature_flag->switch == "disable") selected="selected"@endif>Disable</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Active</label>
                            <div class="col-md-6">
                                <select name='active' class="form-control">
                                    <option value='1' @if ($feature_flag->active == "1") selected="selected"@endif>YES</option>
                                    <option value='0' @if ($feature_flag->active == "0") selected="selected"@endif>NO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">User Types</label>
                            <div class="col-md-6">
                                <input type="hidden" name="users_types_value" id="user_types_value" value="{{ $feature_flag->user_types }}">
                                <select name="user_types[]" id="user-types" class="form-control user-types" multiple="multiple">
                                    <option value='normal'>Normal</option>
                                    <option value='qa'>QA</option>
                                    <option value='ga'>Graphic Artist</option>
                                    <option value='rep'>Sales Rep</option>
                                    <option value='manager'>Manager</option>
                                    <option value='dealer'>Dealer</option>
                                    <option value='administrator'>Administrator</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Users</label>
                            <div class="col-md-6">
                                <input type="hidden" id="users" name="users_value" value="{{ $feature_flag->user_ids }}">
                                <select name="users[]" id="users" class="form-control users" multiple="multiple">
                                    @foreach ($users as $user)
                                        <option value='{{ $user->id }}'>
                                            {{ $user->first_name }} {{ $user->last_name }} [{{ $user->id }}]
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">State</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="state" value="{{ $feature_flag->state }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sports</label>
                            <div class="col-md-6">
                                <input type="hidden" name="sports_value" id="sports" value="{{ $feature_flag->sports }}">
                                <select name="sports[]" class="form-control sports" multiple="multiple">
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->name }}'>
                                            {{ $sport->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update
                                </button>
                                <a href="/administration/feature_flags" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script>
$(document).ready(function(){
    var user_types = JSON.parse($('#user_types_value').val());

    $('.user-types').select2({
        placeholder: "Select user types",
        multiple: true,
        allowClear: true
    });

    $(".user-types").change(function() {
        // console.log($(this).val());
        $('#user_types_value').val($(this).val());
    });

    $('.user-types').select2('val', user_types);



    // ************** USERS

    $('.users').select2({
        placeholder: "Select users",
        multiple: true,
        allowClear: true
    });

    $(".users").change(function() {
        // console.log($(this).val());
        $('#users').val($(this).val());
    });

    try{
        var users = JSON.parse($('#users').val());

        $('.users').select2('val', users);
    } catch(err){

    }


    // ************** END USERS







    var sports = JSON.parse($('#sports').val());

    $('.sports').select2({
        placeholder: "Select user types",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        // console.log($(this).val());
        $('#sports').val($(this).val());
    });

    $('.sports').select2('val', sports);
});
</script>
@endsection