<!-- Edit Boundary Modal -->
<div class="modal fade" id="save-material-option-boundary-modal" data-backdrop="static" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/saveBoundary" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" class="material-option-id" name="material_option_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <input type="hidden" name="boundary_properties" id="boundary-properties" class="b-prop" value="">
            <input type="hidden" id="app-saved-perspective" value="">
            <input type="hidden" id="app-material-option-name" value="">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="col-md-12">
                                        Load Template: <select name="load_boundaries_template" class="load-boundaries-template" style="width: 100px; display: inline;">
                                            <option value='"{}"'>None</option>
                                            @foreach ($boundaries as $boundary)
                                                <option value='{{ $boundary->boundary_properties }}'>
                                                    {{ $boundary->block_pattern }}-
                                                    {{ $boundary->neck_option }}-
                                                    {{ $boundary->perspective }}-
                                                    {{ $boundary->part }}-
                                                    {{ $boundary->name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        Filter: <input type="text" id="filter_boundary">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="col-md-6">Pattern Angle: <input type="text" id="pattern_angle" placeholder="Angle..."></td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#" class="btn btn-success btn-xs add-point" style="margin-top: -3px;">Add point</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr>
                    <div id="material-option-bounding-box" style="border: 1px solid black;"></div>
                    <div id="material-option-bounding-box-top" style=" z-index: 2; position: relative; float: left; margin-top: -555px; opacity: 0.45;">
                        <canvas id="bounding-box-canvas"></canvas>
                    </div>
                    <div class="col-md-12">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="col-md-6">
                                        <input type="text" class="pull-right" style="display: inline;" id="boundary_template_name" placeholder="Template Name...">
                                    </td>
                                    <td class="col-md-6">
                                        <a href="#"
                                           class="btn btn-xs btn-primary" id="save_boundary_template">
                                        <span class="glyphicon glyphicon-save"></span> Save as Template
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <hr>
            <div class="modal-footer">
                <div class="col-md-12">
                    <input type="submit" class="btn btn-primary save-changes" value="Save">
                    <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>