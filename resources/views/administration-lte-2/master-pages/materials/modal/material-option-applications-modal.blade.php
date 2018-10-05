<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="save-material-option-applications-modal" data-backdrop="static" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('v1_save_applications') }}" id="applications_form" role="form" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" class="material-id" name="material_id">
                <input type="hidden" id="app_option_id" class="material-option-id" name="app_material_option_id">
                <input type="hidden" name="form-action" id="form-action" value="">
                <input type="hidden" name="applications_properties" id="a-application-properties" class="a-prop value" value="">
                <input type="hidden" id="app-saved-perspective" value="">
                <input type="hidden" id="app-material-option-name" value="">
                <input type="hidden" id="app-material-brand" value="">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title"><span></span></h4>
                </div>

                <div class="modal-body">
                    <div class="col-md-4">
                        <div id="shape-guide" style="border: 1px solid #e3e3e3; z-index: 0; position: absolute; float: left; opacity: 0.45;"></div>
                        <div id="shape-crosshair" style="border: 1px solid #e3e3e3; z-index: 1; position: absolute; float: left; opacity: 0.45;"></div>
                        <div id="shape-view" style="border: 1px solid #e3e3e3;"></div>
                        <div id="shape-view-top" style="border: 1px solid #e3e3e3; z-index: 2; position: relative; float: left; margin-top: -550px; opacity: 0.45;">
                            <canvas id="applications-front-canvas"></canvas>
                        </div>

                        <div id="app-controls" style="margin-top: 5px;">
                            <table style="width: 200px;" style="overflow: x;">
                                <tr>
                                    <td colspan="2">
                                        <center>
                                            <a href="#" class="btn btn-default" id="move-top">
                                                <span class="glyphicon glyphicon-arrow-up"></span>
                                            </a>
                                        </center>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <center>
                                            <a href="#" class="btn btn-default" id="move-left">
                                                <span class="glyphicon glyphicon-arrow-left"></span>
                                            </a>
                                        </center>
                                    </td>
                                    <td>
                                        <center>
                                            <a href="#" class="btn btn-default" id="move-right">
                                                <span class="glyphicon glyphicon-arrow-right"></span>
                                            </a>
                                        </center>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <center>
                                            <a href="#" class="btn btn-default" id="move-bottom">
                                                <span class="glyphicon glyphicon-arrow-down"></span>
                                            </a>
                                        </center>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="col-md-8" id="applications_div">
                        <div class="row">
                            <div class="col-md-4">
                                <h3>Applications</h3>
                            </div>

                            <div class="col-md-8">
                                <div class="form-inline" style="margin-top: 16px;">
                                    <label>Load Application Template</label>

                                    <select name="load_applications_template" class="form-control load-applications-template" style="width: 200px; margin-right: 89px;">
                                        <option value='"{}"'>None</option>
                                        @foreach ($applications as $application)
                                            <option value='{{ $application->applications_properties }}'>
                                                {{ $application->block_pattern }}-
                                                {{ $application->perspective }}-
                                                {{ $application->part }}-
                                                {{ $application->name }}
                                            </option>
                                        @endforeach
                                    </select>

                                    <label>Filter</label>
                                    <input type="text" id="filter_app_template" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row" style="margin-bottom: 20px;">
                            <div class="col-md-12">
                                <div class="form-inline">
                                    <a class="btn btn-flat btn-success" id="add_front_application"><i class="fa fa-plus"></i></a>
                                    <select name="default_item" id="front-default-item" class="form-control">
                                        <option value="logo" data-def-name="logo">Logo</option>
                                        <option value="number" data-def-name="number">Number</option>
                                        <option value="team_name" data-def-name="team_name">Team Name</option>
                                        <option value="player_name" data-def-name="player_name">Player Name</option>
                                        <option value="mascot" data-def-name="mascot">Mascot</option>
                                        <option value="free" data-def-name="mascot">Free</option>
                                    </select>
                                    <input type="text" name="application_name" id="application_name" value="Logo" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div id="applications_table_container">
                                    <table class="table table-bordered table-hover" id="applications_table">
                                        <thead>
                                            <th id="actions-heading">Actions</th>
                                            <th>App #</th>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Rotation</th>
                                            <th>X</th>
                                            <th>Y</th>
                                            <th>Primary</th>
                                            <th>Logo</th>
                                            <th>Embellishment</th>
                                            <th>Team name</th>
                                            <th>Player name</th>
                                            <th>Number</th>
                                            <th>Font sizes</th>
                                            <th>Colors</th>
                                            <th>Accent</th>
                                            <th>Default Mascot</th>
                                            <th>Tailsweep</th>
                                            <th>Rotated Tailsweep</th>
                                            <th>Default Font</th>
                                            <th>Default Text</th>
                                            <th>Vertical Text</th>
                                            <th>Default Number</th>
                                            <th>Inksoft Design ID</th>
                                            <th>Opacity</th>
                                            <th>Pattern Position</th>
                                            <th>Default Pattern</th>
                                            <th>Custom Scale X</th>
                                            <th>Custom Scale Y</th>
                                            <th>Flipped</th>
                                        </thead>

                                        <tbody class="front-applications">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6" style="margin-top: 20px;">
                                <div class="form-inline">
                                    <input type="text" id="app_template_name" class="form-control" placeholder="Template Name.">
                                    <a href="#" class="btn btn-flat btn-primary" id="save_app_template">
                                    <span class="glyphicon glyphicon-save"></span> Save as Template</a>
                                </div>
                            </div>

                            <div class="col-md-6 text-right" style="margin-top: 20px;">
                                <a href="#" class="btn btn-flat btn-success update-applications-json" style="display:none">Update Changes</a>
                                <input type="submit" class="btn btn-flat btn-success save-applications-button" value="Save Data">
                                <input type="submit" class="btn btn-flat btn-success save-applications" value="Save Data" style="display:none">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
