<!-- Add Material Option Modal -->
<div class="modal fade" id="add-material-option-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/add" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Add a Material Option for <span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="control-label">Name:</label>
                    <input type="text" name="name" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="control-label">Setting Type:</label>
                    <select name='setting_type' class='form-control setting-types'>
                        <option value='pant cut'>Pant Cut</option>
                        <option value='waist cut'>Waist Cut</option>
                        <option value='sleeve style'>Sleeve Style</option>
                        <option value='neck style'>Neck Style</option>
                        <option value='sleeve panel'>Sleeve Panel</option>
                        <option value='shoulder panel'>Shoulder Panel</option>
                        <option value='underarm panel'>Underarm Panel</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Setting Type Item:</label>
                    <select name='setting_code' class='form-control setting-codes'>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Perspective:</label>
                    <select name='perspective' class='form-control perspective'>
                        <option value='front'>Front View</option>
                        <option value='back'>Back View</option>
                        <option value='right'>Right Side View</option>
                        <option value='left'>Left Side View</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Material Option File:</label>
                    <input type="file" name="material_option_path">
                </div>
                <div class="form-group">
                    <label class="control-label">Layer Level:</label>
                    <input type="number" name="layer_level" class="form-control" value='1' />
                </div>
                <div class="form-group">
                    <label class="control-label">Colors:</label>
                    <select name="colors" class="form-control colors" style="width: 100%">
                        @foreach ($colors as $color)
                            @if ($color->active)
                            <option value='{{ $color->color_code }}'>
                                {{ $color->name }}
                            </option>
                            @endif
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Gradients:</label>
                    <select name="gradients" class="form-control gradients" style="width: 100%">
                        @foreach ($gradients as $gradient)
                            @if ($gradient->active)
                            <option value='{{ $gradient->name }}'>
                                {{ $gradient->name }}
                            </option>
                            @endif
                        @endforeach
                    </select>
                </div>

                <div class='form-group'>
                    <label class="control-label">Reference Notes</label>
                    <div>
                        <a href="https://s3-us-west-2.amazonaws.com/uniformbuilder/references/sleeve+styles+page+1.pdf" target="_blank">
                            <span class="fa fa-info-circle"></span>
                            Sleeve Styles Page 1
                        </a>
                    </div>
                    <div>
                        <a href="https://s3-us-west-2.amazonaws.com/uniformbuilder/references/sleeve+styles+page+2.pdf" target="_blank">
                            <span class="fa fa-info-circle"></span>
                            Sleeve Styles Page 2
                        </a>
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


@section('custom-scripts')
$('.colors').select2({
    placeholder: "Select colors",
    multiple: true
});

$('.gradients').select2({
    placeholder: "Select gradients",
    multiple: true
});
@endsection