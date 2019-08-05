<!-- Edit Boundary Modal -->
<div class="modal fade" id="save-material-option-boundary-modal" data-backdrop="static" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('v1_qx7_save_bounding_box') }}" role="form" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" class="material-id" name="material_id">
                <input type="hidden" class="material-option-id" name="material_option_id">
                <input type="hidden" name="form-action" id="form-action" value="">
                <input type="hidden" name="boundary_properties" id="boundary-properties" class="b-prop" value="">
                <input type="hidden" id="app-saved-perspective" value="">
                <input type="hidden" id="app-material-option-name" value="">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title"><span></span></h4>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Load Template</label>
                                <select name="load_boundaries_template" class="load-boundaries-template form-control">
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
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Filter</label>
                                <input type="text" id="filter_boundary" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Pattern Angle</label>
                                <input type="number" step="any" id="pattern_angle" class="form-control" placeholder="Angle">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <a href="#" class="btn btn-success btn-flat btn-xs add-point" style="margin-top: -3px;">Add point</a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div id="material-option-bounding-box"></div>
                            <div id="material-option-bounding-box-top" style=" z-index: 2; position: relative; float: left; margin-top: -555px; opacity: 0.45;">
                                <canvas id="bounding-box-canvas"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div id="save-template-container" class="form-inline">
                                <input type="text" class="form-control" id="boundary_template_name" placeholder="Template Name">

                                <a href="#" class="btn btn-flat btn-primary" id="save_boundary_template">
                                    <span class="glyphicon glyphicon-save"></span> Save as Template
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-center">
                            <input type="submit" class="btn btn-flat btn-primary save-changes" value="Save">
                            <button class="btn btn-flat btn-danger confirm-no" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
