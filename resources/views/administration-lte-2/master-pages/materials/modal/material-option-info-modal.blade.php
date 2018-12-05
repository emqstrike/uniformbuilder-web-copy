<!-- Add Material Option Modal -->
<div class="modal fade" id="save-material-option-info-modal" data-backdrop="static" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/v1-0/material_option/save" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" class="material-option-id" name="material_option_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <input type="hidden" name="boundary_properties" id="boundary-properties" class="b-prop" value="">
            <input type="hidden" name="applications_properties" id="application-properties" class="a-prop" value="">
            <input type="hidden" name="pattern_properties" id="pattern_properties">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Name:</label>
                        <input type="text" name="name" class="form-control" id="material-option-name">
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Part Type:</label>
                        <select name='part_type' class='form-control part-type'>
                            <option value=''>None</option>
                            <option value='twill'>Twill</option>
                            <option value='sublimated'>Sublimated</option>
                            <option id='saved-part-type'></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">Setting Type:</label>
                        <select name='setting_type' class='form-control setting-types'>
                            <option value='part'>Part</option>
                            <option value='shape'>Shape</option>
                            <option value='piping'>Piping</option>
                            <option value='panel'>Panel</option>
                            <option value='static_layer'>Static Layer</option>
                            <option value='highlights'>Highlights</option>
                            <option value='shadows'>Shadows</option>
                            <option value='body_inside'>Body Inside</option>
                            <option value='mesh_shadows'>Mesh Shadows</option>
                            <option value='mesh_highlights'>Mesh Highlights</option>
                            <option id='saved-setting-type'></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">Prespective:</label>
                        <select name='perspective' class='form-control perspective' id="select-perspective">
                            <option value='front'>Front View</option>
                            <option value='back'>Back View</option>
                            <option value='right'>Right Side View</option>
                            <option value='left'>Left Side View</option>
                            <option id='saved-perspective'></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">Team Color ID:</label>
                        <select name='team_color_id' class='form-control team-color-id' id="team_color_id"></select>
                    </div>
                </div>

                <div class="col-md-4">
                    <label class="control-label">Group ID:</label>
                    <input type="text" name="group_id" class="form-control" id="group_id">
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">Origin:</label>
                        <select name="origin" class="form-control origin">
                            <option value="web">Web</option>
                            <option id='saved-origin'></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">Layer-Level:</label>
                        <input type="number" name="layer_level" id="layer-level" class="form-control" value='1' />
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Material Option File:</label>
                        <input type="file" name="material_option_path" id="file-src">
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label">Gradients:</label>
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
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label">Default Color:</label>
                        <select class="form-control default-color" name="default_color" id="def-color">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                    <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }};" value="{{ $color->color_code }}">
                                        {{ $color->name }}
                                    </option>
                                @endif
                            @endforeach
                            <option data-color="" value="" id="saved-default-color" class="saved-default-color"></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Colors:</label>
                        <select name="colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                    <option data-color="#{{ $color->hex_code }}" value='{{ $color->color_code }}' selected="selected">
                                        {{ $color->name }}
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Sublimated Default Color:</label>
                        <select class="form-control sublimated-default-color" name="sublimated_default_color">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                    <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }};" value="{{ $color->color_code }}">
                                        {{ $color->name }}
                                    </option>
                                @endif
                            @endforeach
                            <option data-color="" value="" id="saved-sublimated-default-color"></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Sublimated Colors:</label>
                        <select id="sublimated-colors" name="sublimated_colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                    <option value='{{ $color->color_code }}' selected="selected" data-color="#{{ $color->hex_code }}">
                                        {{ $color->name }}
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Default Fabric:</label>
                        <select class="form-control default-fabric" name="fabric_id" id="default_fabric">
                        </select>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Default Pattern:</label>
                        <select class="form-control default-pattern" name="pattern_id" id="default_pattern">
                            <option value="">None</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-12" id="pattern_layers_OC">
                    <hr>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Build Type:</label>
                        <select class="form-control build-type" name="build_type" id="build_type">
                        </select>
                    </div>
                   
                    <div class="form-group">
                        <label>Pattern Opacity:</label>
                        <input type="number" name="pattern_opacity" class="form-control" id="pattern-opacity" max="100" min="1" maxlength="3">
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Blend:</label>
                        <input type="checkbox" name="is_blend" id="is_blend" value="1">
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Pattern:</label>
                        <input type="checkbox" name="allow_pattern" id="allow_pattern" value="1">
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Gradient:</label>
                        <input type="checkbox" name="allow_gradient" id="allow_gradient" value="1">
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Color:</label>
                        <input type="checkbox" name="allow_color" id="allow_color" value="1">
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Default Asset:</label>
                        <input type="checkbox" name="default_asset" id="default_asset">
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label">Default Display:</label>
                        <select class="form-control default-display" name="default_display" id="default_display">
                        </select>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <div class="col-md-12">
                    <div class="form-group">
                        <input type="submit" class="btn btn-flat btn-primary save-changes" value="Save">
                        <button class="btn btn-danger btn-flat confirm-no" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>