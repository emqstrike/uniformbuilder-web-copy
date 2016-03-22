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
                        <span class="glyphicon glyphicon-star"></span>
                        Preferences
                        <br />
                        <small>
                            <a href="/administration/preference/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add a Preference
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>School</th>
                                <th>Team Name</th>
                                <th>Mascot</th>
                                <th>Font</th>
                                <th>Sport</th>
                                <th>Colors</th>
                                <th>Active Status</th>
                                <th>User ID</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($preferences as $preference)
                    <tr class='preference-{{ $preference->id }} {{ (!$preference->active) ? ' inactive' : '' }}'>
                        <td>
                            <img src="{{ $preference->logo }}" alt="Preference Logo" style="width: 50px; height: 50px;">
                        </td>
                        <td>
                            {{ $preference->name }}
                        </td>
                        <td>
                            {{ $preference->school_name }}
                        </td>
                        <td>
                            {{ $preference->team_name }}
                        </td>
                        <td>
                            <center><img src="{{ $preference->icon }}" style="height: 75px; width: 75px;" class="img-thumbnail"></center>
                        </td>
                        <td>
                            {{ $preference->font }}
                        </td>
                        <td>
                            {{ $preference->uniform_category }}
                        </td>
                        <td class="colors-cell">
                            <input type="hidden" value="{{ $preference->colors_properties }}" class="color-prop-container">
                        </td>
                        <td>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-preference" id="switch-{{ $preference->id }}" data-preference-id="{{ $preference->id }}" {{ ($preference->active) ? 'checked' : '' }}>
                                <label class="onoffswitch-label" for="switch-{{ $preference->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            {{ $preference->last_name }}, {{ $preference->first_name }} - [{{ $preference->user_id }}]
                        </td>
                        <td>
                            <a href="/administration/preference/edit/{{ $preference->id }}" class="btn btn-primary btn-xs edit-preference" data-preference-id="{{ $preference->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-preference" data-preference-id="{{ $preference->id }}" data-preference-name="{{ $preference->name }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Preference Found
                        </td>
                    </tr>

                @endforelse

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <textarea id="colors_textarea"><?php echo json_encode($colors, JSON_FORCE_OBJECT);?></textarea>              
</section>

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/preferences.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection