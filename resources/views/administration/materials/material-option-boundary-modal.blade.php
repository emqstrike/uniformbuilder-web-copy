<!-- Add Material Option Modal -->
<div class="modal fade" id="save-material-option-boundary-modal" aria-hidden="false">
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
                    <div>
                        <div class="col-md-6">
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
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="boundary_template_name" placeholder="Template Name...">
                            <a href="#"
                                class="btn btn-xs btn-primary" id="save_boundary_template" disabled>
                            <span class="glyphicon glyphicon-save"></span> Save as Template</a>        
                        </div>
                    </div>
                    <div class="col-md-12">
                        <a href="#" class="btn btn-success add-point">Add point</a>
                    </div>
                    <div id="material-option-bounding-box" style="border: 1px solid black;"></div>
                    <div id="material-option-bounding-box-top" style=" z-index: 2; position: relative; float: left; margin-top: -555px; opacity: 0.45;">
                        <canvas id="bounding-box-canvas"></canvas>
                    </div>
                </div>
            </div>
            <hr>
            <div class="modal-footer">
                <div class="col-md-12">
                    <a href="#" class="btn btn-success update-applications-json">Save Properties</a>
                    <input type="submit" class="btn btn-primary save-changes" value="Save">
                    <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>