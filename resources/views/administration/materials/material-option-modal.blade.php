<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="save-material-option-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/save" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" class="material-option-id" name="material_option_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <input type="hidden" name="boundary_properties" id="boundary-properties">
            <input type="hidden" name="front_application_properties" id="front-application-properties">
            <input type="hidden" name="back_application_properties" id="back-application-properties">
            <input type="hidden" name="left_application_properties" id="left-application-properties">
            <input type="hidden" name="right_application_properties" id="right-application-properties">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-2">
                    <label class="control-label">Name:</label>
                    <input type="text" name="name" class="form-control" id="material-option-name">
                </div>
                <div class="col-md-2">
                    <label class="control-label">Setting Type:</label>
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
                    <label class="control-label">Perspective:</label>
                    <select name='perspective' class='form-control perspective'>
                        <option value='front'>Front View</option>
                        <option value='back'>Back View</option>
                        <option value='right'>Right Side View</option>
                        <option value='left'>Left Side View</option>
                        <option id='saved-perspective'></option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="control-label">Material Option File:</label>
                    <input type="file" name="material_option_path" id="file-src">
                </div>
                <div class="col-md-2">
                    <label class="control-label">Layer Level:</label>
                    <input type="number" name="layer_level" id="layer-level" class="form-control" value='1' />
                </div>
                <div class="col-md-6">
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
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label">Origin:</label>
                        <select name="origin" class="form-control origin">
                            <option value="web">Web</option>
                            <option value="ipad">ipad</option>
                            <option id='saved-origin'></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Layer Level:</label>
                        <input type="number" name="layer_level" id="layer-level" class="form-control" value='1' />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Default Color:</label>
                        <select class="form-control default-color" name="default_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                        @foreach ($colors as $color)
                            @if ($color->active)
                            <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }};" value="{{ $color->color_code }}">
                                {{ $color->name }}
                            </option>
                            @endif
                        @endforeach
                        <option data-color="" value="" id="saved-default-color"></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Colors:</label>
                        <select name="colors[]" class="form-control colors" style="width: 100%" multiple="multiple">
                            @foreach ($colors as $color)
                                @if ($color->active)
                                <option value='{{ $color->color_code }}' selected="selected">
                                    {{ $color->name }}
                                </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
               <!--  <div class="col-md-6">
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
                </div> -->
                </div>
                <div class="col-md-4">
                    <div id="material-option-bounding-box" style="border: 1px solid black;">
                        <canvas id="bounding-box-canvas"></canvas>
                    </div>

                    <div id="material-option-placements">
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="col-md-2"><span class="badge badge-success">Front</span>
                        <input type="file" name="material_option_front_shape_path" id="front-src" class="shape-view" data-perspective="front">
                    </div>
                    <br><br><br>
                    <div id="front-shape-view" style="border: 1px solid #e3e3e3; background-image: url(http://www.icejerseys.com/images/products/33/Boston-Red-Sox-Replica-Home-MLB-Baseball-Jersey-N3127_XL.jpg);">
                        <canvas id="applications-front-canvas"></canvas>
                        <div style="float: left; text-align: center;" class="front-applications text-center">
                            <a class="btn btn-xs btn-primary" id="add_front_application"><i class="fa fa-plus"></i></a>
                            <select name="default_item" id="front-default-item">
                                <option value="logo">Logo</option>
                                <option value="number">Number</option>
                                <option value="team_name">Team Name</option>
                                <option value="player_name">Player Name</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="Save">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>