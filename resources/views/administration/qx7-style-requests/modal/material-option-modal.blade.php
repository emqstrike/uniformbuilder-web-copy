<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="save-material-option-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/save" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" class="material-option-id" name="material_option_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <input type="hidden" name="boundary_properties" id="boundary-properties" class="b-prop" value="">
            <input type="hidden" name="applications_properties" id="application-properties" class="a-prop" value="">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-4">
                    <div>
                        <a href="#" class="btn btn-success add-point">Add point</a>
                        <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Load Template:</label>
                        <select name="load_boundaries_template" class="load-boundaries-template" style="width: 200px;">
                            <option value='"{}"'>None</option>
                            @foreach ($boundaries as $boundary)
                                <option value='{{ $boundary->boundary_properties }}'>
                                    {{ $boundary->block_pattern }}-
                                    {{ $boundary->perspective }}-
                                    {{ $boundary->part }}-
                                    {{ $boundary->name }}
                                </option>
                            @endforeach
                        </select>
                        <input type="text" id="boundary_template_name" placeholder="Template Name...">
                        <a href="#"
                            class="btn btn-xs btn-primary" id="save_boundary_template" disabled>
                        <span class="glyphicon glyphicon-save"></span> Save as Template</a>
                        <!-- <a href="#" class="btn btn-primary update-applications-json" style="float: right;">Save</a> -->
                    </div>
                    <div id="material-option-bounding-box" style="border: 1px solid black;"></div>
                    <div id="material-option-bounding-box-top" style=" z-index: 2; position: relative; float: left; margin-top: -555px; opacity: 0.45;">
                        <canvas id="bounding-box-canvas"></canvas>
                    </div>
                </div>
                <div class="col-md-2">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Name:</label>
                    <input type="text" name="name" class="form-control" id="material-option-name">
                </div>
                <div class="col-md-2">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Setting Type:</label>
                    <select name='setting_type' class='form-control setting-types'>
                        <option value='part'>Part</option>
                        <option value='shape'>Shape</option>
                        <option value='piping'>Piping</option>
                        <option value='panel'>Panel</option>
                        <option value='static_layer'>Static Layer</option>
                        <option value='highlights'>Highlights</option>
                        <option value='shadows'>Shadows</option>
                        <option id='saved-setting-type'></option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Prespective:</label>
                    <select name='perspective' class='form-control perspective' id="select-perspective">
                        <option value='front'>Front View</option>
                        <option value='back'>Back View</option>
                        <option value='right'>Right Side View</option>
                        <option value='left'>Left Side View</option>
                        <option id='saved-perspective'></option>
                    </select>
                </div>
                <div class="col-md-1">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Team Color ID:</label>
                    <select name='team_color_id' class='form-control team-color-id' id="team_color_id">
                    </select>
                </div>
                <div class="col-md-1">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Group ID:</label>
                    <input type="text" name="group_id" class="form-control" id="group_id">
                </div>
                <div class="col-md-6">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Material Option File:</label>
                    <input type="file" name="material_option_path" id="file-src">
                </div>
                <div class="col-md-2">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Origin:</label>
                    <select name="origin" class="form-control origin">
                        <option value="web">Web</option>
                        <option id='saved-origin'></option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Layer-Level:</label>
                    <input type="number" name="layer_level" id="layer-level" class="form-control" value='1' />
                </div>
                <div class="col-md-6">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Gradients:</label>
                    <select name="gradients[]" class="form-control gradients" style="width: 100%" multiple="multiple">
                        @foreach ($gradients as $gradient)
                            @if ($gradient->active)
                            <option value='{{ $gradient->id }}' selected="selected">
                                {{ $gradient->name }}
                            </option>
                            @endif
                        @endforeach
                    </select>
                </div>
                <div class="col-md-8">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Default Color:</label>
                    <select class="form-control default-color" name="default_color" style="color: #000;text-shadow: 1px 1px #000;" id="def-color">
                    @foreach ($colors as $color)
                        <option data-color="#{{ $color->web_hex_code }}" style="background-color: #{{ $color->web_hex_code }};" value="{{ $color->color_code }}">
                            {{ $color->color_alias }}
                        </option>
                    @endforeach
                    <option data-color="" value="" id="saved-default-color" class="saved-default-color"></option>
                    </select>
                </div>
                <div class="col-md-8">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Colors:</label>
                    <select name="colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                        @foreach ($colors as $color)
                            <option value='{{ $color->color_code }}' selected="selected">
                                {{ $color->color_alias }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col-md-8">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Sublimated Default Color:</label>
                    <select class="form-control sublimated-default-color" name="sublimated_default_color" style="background-color: #fff; color: #000;text-shadow: 1px 1px #000;">
                    @foreach ($colors as $color)
                        <option data-color="#{{ $color->web_hex_code }}" style="background-color: #{{ $color->web_hex_code }};" value="{{ $color->color_code }}">
                            {{ $color->color_alias }}
                        </option>
                    @endforeach
                    <option data-color="" value="" id="saved-sublimated-default-color"></option>
                    </select>
                </div>
                <div class="col-md-8">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Sublimated Colors:</label>
                    <select name="sublimated_colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                        @foreach ($colors as $color)
                            <option value='{{ $color->color_code }}' selected="selected">
                                {{ $color->color_alias }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-8">
                </div>
                <div class="col-md-1">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Blend:</label>
                    <input type="checkbox" name="is_blend" id="is_blend" value="1">
                </div>
                <div class="col-md-1">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Pattern:</label>
                    <input type="checkbox" name="allow_pattern" id="allow_pattern" value="1">
                </div>
                <div class="col-md-1">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Gradient:</label>
                    <input type="checkbox" name="allow_gradient" id="allow_gradient" value="1">
                </div>
                <div class="col-md-1">
                    <label class="control-label label-default" style="padding: 5px; border-radius: 3px; margin-top: 5px;">Color:</label>
                    <input type="checkbox" name="allow_color" id="allow_color" value="1">
                </div>

                <div class="col-md-4">
                    <br><br><br>
                    <!-- <div>
                        <a href="#" class="btn btn-primary update-applications-json">Save</a>
                    </div> -->
                    <div id="shape-view" style="border: 1px solid #e3e3e3;"></div>
                    <div id="shape-view-top" style="border: 1px solid #e3e3e3; z-index: 2; position: relative; float: left; margin-top: -550px; opacity: 0.45;">
                        <canvas id="applications-front-canvas"></canvas>
                    </div>
                </div>
                <div class="col-md-8" id="applications_div">
                    <div style="float: left; text-align: center; margin-top: 60px; z-index: 50; position: relative; border: 1px solid black;" class="text-center">
                        <a href="#" style="float: left; position: relative; margin-top: 5px; margin-left: 5px;" id="app_controls_button" class="btn btn-default app-controls-button"><span class="glyphicon glyphicon-cog"></span> Show Controls</a>
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
                        </center>
                        <hr>
                        <a class="btn btn-xs btn-success" id="add_front_application"><i class="fa fa-plus"></i></a>
                        <select name="default_item" id="front-default-item">
                            <option value="logo" data-def-name="logo">Logo</option>
                            <option value="number" data-def-name="number">Number</option>
                            <option value="team_name" data-def-name="team_name">Team Name</option>
                            <option value="player_name" data-def-name="player_name">Player Name</option>
                        </select>
                        <input type="text" name="application_name" id="application_name" value="Logo" style="margin-bottom: 10px;">

                        <table class="table table-bordered">
                            <thead>
                                <th>App #</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Rotation</th>
                                <th>X</th>
                                <th>Y</th>
                                <th>Primary</th>
                                <th>Logo</th>
                                <th>Team name</th>
                                <th>Player name</th>
                                <th>Number</th>
                                <th>Font sizes</th>
                                <th>Sizes</th>
                                <th>Default Macot</th>
                                <th>Default Font</th>
                                <th>Default Text</th>
                                <th>Default Number</th>
                            </thead>
                            <!-- <tbody class="front-applications">
                            </tbody> -->
                        </table>
                        <input type="text" id="app_template_name" placeholder="Template Name.">
                        <a href="#"
                            class="btn btn-xs btn-primary" id="save_app_template" disabled>
                        <span class="glyphicon glyphicon-save"></span> Save as Template</a><hr>
                    </div>
                </div>
            </div>
            <hr>
            <div class="modal-footer">
                <a href="#" class="btn btn-success update-applications-json">Save Properties</a>
                <input type="submit" class="btn btn-primary save-changes" value="Save">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>
