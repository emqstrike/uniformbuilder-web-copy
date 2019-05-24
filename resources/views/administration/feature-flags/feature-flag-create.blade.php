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
                <div class="panel-heading">Add New Feature Flag</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/feature_flag/add" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <!-- <input type="hidden" name="neck_options" id="neck_options" value=""> -->

                        <div class="form-group">
                            <label class="col-md-4 control-label">Feature Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="name" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="group" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="category" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="description"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Switch</label>
                            <div class="col-md-6">
                                <select name='switch' class="form-control">
                                    <option value='enable'>Enable</option>
                                    <option value='disable'>Disable</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Active</label>
                            <div class="col-md-6">
                                <select name='active' class="form-control">
                                    <option value='1'>YES</option>
                                    <option value='0'>NO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">User Types</label>
                            <div class="col-md-6">
                                <input type="hidden" class="users-types-val" name="users_types_value">
                                <select name="user_types[]" id="users" class="form-control user-types" multiple="multiple">
                                    <option value='normal'>Normal</option>
                                    <option value='administrator'>Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Roles</label>
                            <div class="col-md-6">
                                <input type="hidden" class="users-roles-val" name="users_roles_value">
                                <select name="user_roles[]" id="users" class="form-control user-roles" multiple="multiple">
                                    <option value="default">Default</option>
                                    <option value="ga">Graphics Artist</option>
                                    <option value="qa">QA</option>
                                    <option value="rep">Sales Rep</option>
                                    <option value="rep_manager">Manager</option>
                                    <option value="dealer">Dealer</option>
                                    <option value="coach">Coach</option>
                                    <option value="dev">Developer</option>
                                    <option value="executive">Executive</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Users</label>
                            <div class="col-md-6">
                                <input type="hidden" class="users-val" name="users_value">
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
                            <label class="col-md-4 control-label">State (Abbreviation)</label>
                            <div class="col-md-1">
                                <input type="name" id="state_input" maxlength="2" class="form-control" name="state" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category</label>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" name="sports_value">
                                <select name="sports[]" id="users" class="form-control sports" multiple="multiple">
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
                            <label class="col-md-4 control-label">Beta</label>
                            <div class="col-md-6">
                                <select name='beta' class="form-control">
                                    <option value='1'>YES</option>
                                    <option value='0'>NO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Feature Flag
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

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<!-- <script type="text/javascript" src="/js/administration/feature-flags.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){
    $('.user-types').select2({
        placeholder: "Select User Types",
        multiple: false,
        allowClear: true
    });

    var maxStateChars = $("#state_input");
    var max_length = maxStateChars.attr('maxlength');
    if (max_length > 0) {
        maxStateChars.bind('keyup', function(e){
            length = new Number(maxStateChars.val().length);
            counter = max_length-length;
            $("#sessionNum_counter").text(counter);
        });
    }

    $(".user-types").change(function() {
        $('.users-types-val').val($(this).val());
    });

    $('.user-roles').select2({
        placeholder: "Select User Roles",
        multiple: true,
        allowClear: true
    });

    $(".user-roles").change(function() {
        $('.users-roles-val').val($(this).val());
    });
    $('.users').select2({
        placeholder: "Select Users",
        multiple: true,
        allowClear: true
    });

    $(".users").change(function() {
        $('.users-val').val($(this).val());
    });

    $('.sports').select2({
        placeholder: "Select Uniform Category",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('.sports-val').val($(this).val());
    });
});
</script>
@endsection
