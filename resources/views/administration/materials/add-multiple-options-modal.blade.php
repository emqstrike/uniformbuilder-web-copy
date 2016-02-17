<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="add-multiple-options-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/saveMultiple" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-option-id" name="material_option_id">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <input type="hidden" name="boundary_properties" id="boundary-properties">
            <input type="hidden" name="applications_properties" id="application-properties">
            <input type="hidden" name="is_blend_array" id="is-blend-array">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body front-options">
                <h4>PERSPECTIVE :&nbsp;
                <input type="text" name="perspective" class="perspective-multiple-upload">
                </h4>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Layer</th>
                            <th>Setting Type</th>
                            <th width="160px;">Default Color</th>
                            <th width="160px;">Sublimated Default Color</th>
                            <th>Blend</th>
                            <th>Team Color ID</th>
                            <th>Image File</th>
                            <th>Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody id="options-row-container" class="upload-sortable-rows">
                        <tr class="options-row">
                            <td><input type="text" class="mo-name layer1" name="mo_name[]"></td>
                            <td>
                                <select class="mo-layer layer1"  name="mo_layer[]">
                                    <option value = '1' class="layer-number">1</option>
                                </select>
                            </td>
                            <td>
                                <select class="mo-setting-type layer1" name="mo_setting_type[]">
                                    <option value='part'>Part</option>
                                    <option value='shape'>Shape</option>
                                    <option value='piping'>Piping</option>
                                    <option value='panel'>Panel</option>
                                    <option value='static_layer'>Static Layer</option>
                                    <option value='highlights'>Highlights</option>
                                    <option value='shadows'>Shadows</option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control mo-default-color layer1" name="mo_default_color[]" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($colors as $color)
                                    @if ($color->active)
                                    <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;" value="{{ $color->color_code }}">
                                        {{ $color->name }}
                                    </option>
                                    @endif
                                @endforeach
                                <option data-color="" value="" id="saved-default-color"></option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control mo-sublimated-default-color layer1" name="mo_sublimated_default_color[]" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($colors as $color)
                                    @if ($color->active)
                                    <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;" value="{{ $color->color_code }}">
                                        {{ $color->name }}
                                    </option>
                                    @endif
                                @endforeach
                                <option data-color="" value="" id="saved-default-color"></option>
                                </select>
                            </td>
                            <td>
                                <input class="check mo-blend layer1" name="mo_blend[]" type="checkbox" value="{{ $color->hex_code }}">
                            </td>
                            <td>
                                <select class="mo-team-color-id layer1" name="mo_team_color_id[]">
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                            </td>
                            <td>
                                <input type="file" class="mo-options-src layer1" name="mo_image[]">
                            </td>
                            <td>
                                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <a class="btn btn-primary clone-row"><i class="fa fa-plus"></i> Add option</a>
                </div>
            </div>
            <table class="table table-bordered">
                <tr>
                    <td width="100px;">
                        <label>Origin</label>
                        <select name="origin" class="form-control">
                            <option value="web">Web</option>
                            <option value="ipad">iPad</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Colors</label>
                        <select name="colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                <option value='{{ $color->color_code }}' selected="selected">
                                    {{ $color->name }}
                                </option>
                                @endif
                            @endforeach
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Sublimated Colors</label>
                        <select name="sublimated_colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                <option value='{{ $color->color_code }}' selected="selected">
                                    {{ $color->name }}
                                </option>
                                @endif
                            @endforeach
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Gradients</label>
                        <select name="gradients[]" class="form-control gradients" style="width: 100%" multiple="multiple">
                            @foreach ($gradients as $gradient)
                                @if ($gradient->active)
                                <option value='{{ $gradient->id }}' selected="selected">
                                    {{ $gradient->name }}
                                </option>
                                @endif
                            @endforeach
                        </select>
                    </td>
                </tr>
            </table>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary save-multiple" value="Upload">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>