<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="save-material-option-applications-modal" data-backdrop="static" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/saveApplications" id="applications_form" role="form" method="POST" enctype="multipart/form-data">
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
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-4">
                    <br><br><br>
                    <!-- <div>
                        <a href="#" class="btn btn-primary update-applications-json">Save</a>
                    </div> -->
                    <div id="shape-guide" style="border: 1px solid #e3e3e3; z-index: 0; position: absolute; float: left; opacity: 0.45;"></div>
                    <div id="shape-crosshair" style="border: 1px solid #e3e3e3; z-index: 1; position: absolute; float: left; opacity: 0.45;"></div>
                    <div id="shape-view" style="border: 1px solid #e3e3e3;"></div>
                    <div id="shape-view-top" style="border: 1px solid #e3e3e3; z-index: 2; position: relative; float: left; margin-top: -550px; opacity: 0.45;">
                        <canvas id="applications-front-canvas"></canvas>
                    </div>
                </div>
                <div class="col-md-8" id="applications_div">
                    <div style="float: left; text-align: center; margin-top: 60px; z-index: 50; position: relative; border: 1px solid black;" class="text-center">
                        <a href="#" style="float: left; position: relative; margin-top: 5px; margin-left: 5px;" id="app_controls_button" class="btn btn-default app-controls-button"><span class="glyphicon glyphicon-cog"></span> Show Controls</a>
                        <a href="#" style="float: left; position: relative; margin-top: 50px; margin-left: 5px;" class="btn btn-default btn-fix-app">Fix Applications</a>
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
                        <hr>
                        <h3>Applications</h3>
                        <center>
                            <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Load Application Template:</label>
                            <select name="load_applications_template" class="form-control load-applications-template" style="width: 200px;">
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
                            Filter: <input type="text" id="filter_app_template">
                        </center>
                        <hr>
                        <div align="left">
                            <a class="btn btn-xs btn-success" id="add_front_application"><i class="fa fa-plus"></i></a>
                            <select name="default_item" id="front-default-item">
                                <option value="logo" data-def-name="logo">Logo</option>
                                <option value="number" data-def-name="number">Number</option>
                                <option value="team_name" data-def-name="team_name">Team Name</option>
                                <option value="player_name" data-def-name="player_name">Player Name</option>
                                <option value="mascot" data-def-name="mascot">Mascot</option>
                                <option value="free" data-def-name="mascot">Free</option>
                            </select>
                            <input type="text" name="application_name" id="application_name" value="Logo" style="margin-bottom: 10px;">
                        </div>
                        <table class="table table-bordered table-hover" id="applications_table">
                            <thead>
                                <th></th>
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
                        <input type="text" id="app_template_name" placeholder="Template Name.">
                        <a href="#"
                            class="btn btn-xs btn-primary" id="save_app_template">
                        <span class="glyphicon glyphicon-save"></span> Save as Template</a><hr>
                    </div>
                </div>
            </div>
            <hr>
            <div class="modal-footer">
                <a href="#" class="btn btn-success update-applications-json" style="display:none">Update Changes</a>
                <input type="submit" class="btn btn-primary save-applications-button" value="Save">
                <input type="submit" class="btn btn-primary save-applications" value="Save" style="display:none">
                <!-- <a href="#" class="btn btn-primary update-applications-json">Save Changes</a> -->
                <!-- <a href="#" class="btn btn-success update-applications-json">Finalize</a>
                <input type="submit" class="btn btn-primary save-changes" value="Save">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button> -->
            </div>
            </form>
        </div>
    </div>
</div>
