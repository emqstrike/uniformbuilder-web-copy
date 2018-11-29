@extends('administration.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/iconpicker/css/fontawesome-iconpicker.min.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }
    
        li.select2-selection__choice {
            color: black !important;
        }

        .select2-container .select2-selection--single {
            height: auto;
        }
    </style>
@endsection

@section('content')
    <div class="container-fluid main-content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-info">
                    <div class="panel-heading">Edit Menu</div>
                    <div class="panel-body">
                        @include('administration.partials.flash-message')

                        <form action="{{ route('update_menu') }}" class="form-horizontal" method="POST">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            <input type="hidden" name="id" value="{{ $currentMenu->id }}">
                            <input type="hidden" name="brand" value="{{ env('BRAND') }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Route Name</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="route_name" value="{{ $currentMenu->route_name }}" required="required">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Menu Text</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="menu_text" value="{{ $currentMenu->menu_text }}" required="required">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Icon</label>
                                <div class="col-md-6">
                                    <div>
                                        <div class="btn-group" role="group" aria-label="...">
                                            <button type="button" class="btn btn-default">
                                                <span id="demo-icon" class="{{ $currentMenu->icon_class }}"></span>
                                            </button>
                                            <button type="button" class="btn btn-primary picker-button">Pick an Icon</button>
                                        </div>
                                        <input id="icon-field" type="hidden" class="icon-class-input form-control" name="icon_class" value="{{ $currentMenu->icon_class }}" />
                                    </div>

                                    <div id="iconPicker" class="modal fade">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    <h4 class="modal-title">Icon Picker</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div>
                                                        <ul class="icon-picker-list">
                                                            <li>
                                                                <a data-class="<%item%> <%activeState%>" data-index="<%index%>">
                                                                    <span class="<%item%>"></span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" id="change-icon" class="btn btn-success">
                                                        <span class="fa fa-check-circle-o"></span>
                                                        Use Selected Icon
                                                    </button>
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Remarks</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="remarks" value="{{ $currentMenu->remarks }}">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Parent Menu</label>
                                <div class="col-md-6">
                                    <select name="parent_id" class="form-control menus">
                                        <option value="0">(No Parent)</option>
                                        @foreach ($menus as $menu)
                                            @include('administration.menus.partials.menu-dropdown')
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Type</label>
                                <div class="col-md-6">
                                    <select name="type" class="form-control">
                                        <option value="header" @if ($currentMenu->type == 'header') selected="selected" @endif>Header</option>
                                        <option value="link" @if ($currentMenu->type == 'link') selected="selected" @endif>Link</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button class="btn btn-primary" type="submit">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Menu
                                    </button>

                                    <a href="{{ route('menus') }}" class="btn btn-danger">
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
    <script type="text/javascript" src="/iconpicker/js/fontawesome-iconpicker.min.js"></script>

    <script>
        $(document).ready(function() {
            $('.menus').select2();
        });
    </script>
@endsection