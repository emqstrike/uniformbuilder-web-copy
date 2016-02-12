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

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Mascots
                        <small>
                            <a href="/administration/mascot/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Mascot Name</th>
                                <th>Code</th>
                                <th>Active Status</th>
                                <th>Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                @forelse ($mascots as $mascot)

                    <tr class='mascot-{{ $mascot->id }} {{ (!$mascot->active) ? ' inactive' : '' }}'>
                        <td>
                            @if ($mascot->icon)
                            <img src="{{ $mascot->icon }}" width="100px" height="100px">
                            @else
                            <img src="http://dummyimage.com/100" width="100px" height="100px">
                            @endif
                        </td>
                        <td>
                            {{ $mascot->name }}
                        </td>
                        <td>
                            {{ $mascot->code }}
                        </td>
                        <td>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-mascot" id="switch-{{ $mascot->id }}" data-mascot-id="{{ $mascot->id }}" {{ ($mascot->active) ? 'checked' : '' }}>
                                <label class="onoffswitch-label" for="switch-{{ $mascot->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            {{ $mascot->category }}
                        </td>
                        <td>
                            <a href="/administration/mascot/edit/{{ $mascot->id }}" class="btn btn-primary btn-xs edit-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-default btn-xs show-mascot" role="button"
                                data-mascot-name="{{ $mascot->name }}"
                                data-mascot-id="{{ $mascot->id }}">
                                <li class="glyphicon glyphicon-info-sign"></li>
                                View
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
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

<!-- Information Modal -->
<div class="modal fade" id="view-mascot-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-mascot-layers" data-toggle="tab">Layers</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-pattern-layers" align='center'>
                            <span class="badge mascot-layers-path"></span>
                            <img src="" class="mascot-layers" width="300px" height="300px" style="background: black;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
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