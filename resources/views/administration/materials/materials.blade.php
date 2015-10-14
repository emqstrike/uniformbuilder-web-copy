@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="col-md-12">
    <h1>
        <span class="fa fa-cubes"></span>
        Materials
        <small>
            <a href="/administration/material/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Material
            </a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-12">
    <table data-toggle='table' class='materials'>
        <thead>
            <tr class="center-table-heads">
                <th>Thumbnail</th>
                <th>Material Name</th>
                <th>Material Options</th>
                <th>Code</th>
                <th>Type</th>
                <th>Uniform Category</th>
                <th>Gender</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

        @forelse ($materials as $material)

            <tr class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }}'>
                <td>
                    <div class="item row" style="display: inline;">
                        <div style="border: 1px solid #e3e3e3;">
                            <div>
                                <center><img src="https://www.blueinc.co.uk/images/mens-white-baseball-jersey-t-shirt-p20950-24151_image.jpg"
                                             width="300px"
                                             height="300px"
                                             alt="{{ $material->slug }}"></center>
                            </div>
                            <div class="caption">
                                <div class="col-md-5">{{ $material->name }}{{ $material->code }}</div>
                                <div class="col-md-3">{{ $material->uniform_category }}</div>
                                <div class="col-md-2">{{ ucfirst($material->type) }}</div>
                                <div class="col-md-2">
                                    @if ($material->gender == "men")
                                    <i class="fa fa-mars"></i>
                                    @else
                                    <i class="fa fa-venus"></i>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    {{ $material->name }}
                </td>
                <td>
                    <div class="row">
                        <div class="col-md-3">
                        <span class="label label-info">FRONT</span>                        
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "front")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @else
                                        <img src="http://dummyimage.com/100" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @endif
                                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right" 
                                                data-material-option-id="{{ $option->id }}" 
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a><br>
                                    <a href="#" class="btn btn-success btn-xs test-modal"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}">{{ $option->name }} 
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                        <div class="col-md-3">
                        <span class="label label-info">BACK</span>
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "back")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($option->material_option_path)
                                        <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @else
                                        <img src="http://dummyimage.com/100" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @endif
                                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right" 
                                                data-material-option-id="{{ $option->id }}" 
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a><br>
                                    <a class="btn btn-success btn-xs edit-material-option"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}">{{ $option->name }} 
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                        <div class="col-md-3">
                        <span class="label label-info">RIGHT</span>
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "right")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                class="material-option-{{ $option->id }}  material-option-item" 
                                data-material-option-name="{{ $option->name }}">
                                    @if ($option->material_option_path)
                                        <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @else
                                        <img src="http://dummyimage.com/100" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @endif
                                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right" 
                                                data-material-option-id="{{ $option->id }}" 
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a><br>
                                    <a class="btn btn-success btn-xs edit-material-option"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}">{{ $option->name }} 
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                        <div class="col-md-3">
                        <span class="label label-info">LEFT</span>
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "left")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($option->material_option_path)
                                        <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @else
                                        <img src="http://dummyimage.com/100" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}">
                                    @endif
                                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right" 
                                                data-material-option-id="{{ $option->id }}" 
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a><br>
                                    <a class="btn btn-success btn-xs edit-material-option"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}">{{ $option->name }} 
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                    </div>
                    <hr>
                        <a href="#" class='btn btn-xs btn-success add-material-option'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add Material Option
                        </a>
                </td>
                <td>
                    <span class="label label-default">
                        {{ $material->code }}
                    </span>
                </td>
                <td>
                    {{ ucfirst($material->type) }}
                </td>
                <td>
                    {{ $material->uniform_category }}
                </td>
                <td>
                    {{ ucfirst($material->gender) }}
                </td>
                <td>
                    <a href="#" class="btn btn-default btn-xs disable-material" 
                    data-material-id="{{ $material->id }}" 
                    role="button" {{ ($material->active) ? : 'disabled="disabled"' }}>
                        <i class="glyphicon glyphicon-eye-close"></i>
                        Disable
                    </a>
                    <a href="#" class="btn btn-info btn-xs enable-material" 
                    data-material-id="{{ $material->id }}" 
                    role="button" {{ ($material->active) ? 'disabled="disabled"' : '' }}>
                        <i class="glyphicon glyphicon-eye-open"></i>
                        Enable
                    </a>
                </td>
                <td>
                    <div>
                        <a href="#" class="btn btn-default btn-xs show-material" role="button"
                            data-material-name="{{ $material->name }}"
                            data-material-code="{{ $material->code }}"
                            data-material-type="{{ $material->type }}"
                            data-material-uniform-category="{{ $material->uniform_category }}"
                            data-material-gender="{{ $material->gender }}"
@if (env('BUILDER_APPROACH') == '3D')
                            data-material-path="{{ $material->material_path }}"
                            data-bump-map-path="{{ $material->bump_map_path }}"
                            data-shadow-path="{{ $material->shadow_path }}"
                            data-highlight-path="{{ $material->highlight_path }}"
@elseif (env('BUILDER_APPROACH') == '2D')
                            data-front-view-path="{{ $material->front_view_path }}"
                            data-front-view-shape="{{ $material->front_view_shape }}"
                            data-back-view-path="{{ $material->back_view_path }}"
                            data-back-view-shape="{{ $material->back_view_shape }}"
                            data-right-side-view-path="{{ $material->right_side_view_path }}"
                            data-right-side-view-shape="{{ $material->right_side_view_shape }}"
                            data-left-side-view-path="{{ $material->left_side_view_path }}"
                            data-left-side-view-shape="{{ $material->left_side_view_shape }}"
@endif
                            data-material-id="{{ $material->id }}">
                            <li class="glyphicon glyphicon-info-sign"></li>
                            View
                        </a>
                        <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-primary btn-xs edit-material" role="button">
                            <i class="glyphicon glyphicon-edit"></i>
                            Edit
                        </a>
                        <a href="#" class="btn btn-danger pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                            Remove
                        </a>
                    </div>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan='4' align='center'>
                    No Materials
                </td>
            </tr>
        @endforelse

        </tbody>
    </table>

</div>

@include('administration.materials.material-view-modal')

@include('administration.materials.material-option-create-modal')

@include('administration.materials.material-option-edit-modal')

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="test-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/add" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" name="boundary_properties" id="boundary-properties">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Add a Material Option for <span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-6">
                    <div id="material-option-gradients" style="border: 1px solid black;">
                        <canvas id="bounding-box-preview"></canvas>
                    </div>

                    <div id="material-option-placements">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label class="control-label">Name:</label>
                    <input type="text" name="name" class="form-control" />
                </div>
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
                    <input type="file" name="material_option_path" id="file-src">
                </div>
                <div class="form-group">
                    <label class="control-label">Layer Level:</label>
                    <input type="number" name="layer_level" class="form-control" value='1' />
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
                <div class='form-group'>
                    <div>
                        <label class="control-label">Blend</label>
                    </div>
                    <div>
                        <input type="checkbox" name="is_blend" /> Check this if the material option could be <strong>blended</strong> with other material options.
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

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection
