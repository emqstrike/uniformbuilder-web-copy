@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
    .modal.modal-wide .modal-dialog {
      width: 90%;
    }
    .modal-wide .modal-body {
      overflow-y: auto;
    }
    #material-option-gradients {
        width: 500px;
        height: 500px;
        background-position: center center;
        background-size: cover;
        -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
        display: inline-block;
    }
</style>

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
            <tr>
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
                    <!-- @if ($material->thumbnail_path)
                    <img src="{{ $material->thumbnail_path }}" width="100px" height="100px" alt="{{ $material->slug }}">
                    @else
                    <img src="http://dummyimage.com/100" width="100px" height="100px" alt="{{ $material->slug }}">
                    @endif -->
                    <!-- B E G I N of new LAYOUT -->


                    <!-- <div class="item row" style="display: inline;">
                        <div class="thumbnail">
                            <img src="https://www.blueinc.co.uk/images/mens-white-baseball-jersey-t-shirt-p20950-24151_image.jpg" width="300px" height="300px" alt="{{ $material->slug }}">
                            <div class="caption" style="display: inline;">
                                <center>
                                    <span>
                                        {{ $material->code }}
                                        <span>{{ $material->name }}</span>
                                        {{ $material->code }}
                                    </span>
                                    <span>
                                        {{ $material->uniform_category }}
                                    </span>
                                    <span>
                                        {{ ucfirst($material->type) }}
                                    </span>
                                    <span>
                                        @if ($material->gender == "men")
                                        <i class="fa fa-mars"></i>
                                        @else
                                        <i class="fa fa-venus"></i>
                                        @endif
                                    </span>
                                </center>
                            </div>
                        </div>
                    </div> -->
                    <div class="item row" style="display: inline;">
                        <div style="border: 1px solid #e3e3e3;">
                            <div>
                                <center><img src="https://www.blueinc.co.uk/images/mens-white-baseball-jersey-t-shirt-p20950-24151_image.jpg" width="300px" height="300px" alt="{{ $material->slug }}"></center>
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
                            @if ( $option->perspective == "front")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                class="material-option-{{ $option->id }}  material-option-item" 
                                data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <img src="{{ $material->thumbnail_path }}" 
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
                        <span class="label label-info">BACK</span>
                        @foreach ($material->options as $option)
                            @if ( $option->perspective == "back")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                class="material-option-{{ $option->id }}  material-option-item" 
                                data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <img src="{{ $material->thumbnail_path }}" 
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
                            @if ( $option->perspective == "right")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                class="material-option-{{ $option->id }}  material-option-item" 
                                data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <img src="{{ $material->thumbnail_path }}" 
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
                            @if ( $option->perspective == "left")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                class="material-option-{{ $option->id }}  material-option-item" 
                                data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <img src="{{ $material->thumbnail_path }}" 
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
                        <a href=""><span class="fa fa-chevron-down"></span></a>
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

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $( "#file-src" ).change(function() {
        // console.log("changed");
        // var src = $( "#file-src" ).val();
        // console.log(src);
        // $( "#material-option-preview" ).attr('src',src);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
 
        if (/^image/.test( files[0].type)){ // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file
 
            reader.onloadend = function(){ // set image data as background of div
                $("#material-option-gradients").css("background-image", "url("+this.result+")");
                $("#material-option-placements").css("background-image", "url("+this.result+")");
            }
        }
    });

    (function() {
        var canvas = this.__canvas = new fabric.Canvas('c');
        fabric.Object.prototype.transparentCorners = false;
        canvas.setWidth( 496 );
        canvas.setHeight( 550 );

        window.shapes = {};

        var data = {

                    topLeft:[{x:0,y:0}],
                    topRight:[{x:0,y:0}],
                    bottomLeft:[{x:0,y:0}],
                    bottomRight:[{x:0,y:0}],
                    pivot: 0,
                    rotation: 0,

                };

        var box = new fabric.Rect({
            width: 250, height: 250, angle: 0,
            fill: 'green',
            opacity: 0.35,
            originX: 'center',
            originY: 'center'
        });

        window.shapes.box = box;

        var circle = new fabric.Circle({
            //radius: box.getHeight()/2,
            radius: 40,
            fill: 'red',
            opacity: 0.35,
            originX: 'center',
            originY: 'center'
        });
        circle.hasBorders = false;
        circle.hasControls = false;

        var text = new fabric.Text('Bounding box', {
            fontSize: 11,
            originX: 'center',
            originY: 'center'
        });

        var bounding_box = new fabric.Group([ box, text ], {
            left: canvas.width/2.6,
            top: canvas.height/5
        });

        window.shapes.bounding_box = bounding_box;
        //bounding_box.lockRotation = true;
        //bounding_box.on('moving', resizeCircle);

        // bounding_box.on('moving', backgroundMoveHandler);

        // children = [];
        // function addItem() {
        //     canvas.add(circle);
        //     children.push(circle);
        // }

        // Add some children
        // addItem();
        // addItem();

        // Whenever the parent is moved, move the children as well.
        // function backgroundMoveHandler(options) {
        //     var x = options.e.movementX;
        //     var y = options.e.movementY;
        //     $.each(children, function(i, obj) {
        //         obj.set('left', obj.left + x);
        //         obj.set('top', obj.top + y);
        //         obj.setCoords();
        //     });
        // }
        bounding_box.transparentCorners = false;
        canvas.add(bounding_box);

        canvas.on({
            'object:moving': updateCoordinates,
            'object:scaling': updateCoordinates,
            'object:rotating': updateCoordinates,
            'mouse:up': updateCoordinates
        });

        function updateCoordinates() {

            circle.radius = box.height/2;

            // var pivot           = bounding_box.getCenterPoint();
            var topLeftX                = bounding_box.oCoords.tl.x;
            var topLeftY                = bounding_box.oCoords.tl.y;
            var topRightX               = bounding_box.oCoords.tr.x;
            var topRightY               = bounding_box.oCoords.tr.y;
            var bottomLeftX             = bounding_box.oCoords.bl.x;
            var bottomLeftY             = bounding_box.oCoords.bl.y;
            var bottomRightX            = bounding_box.oCoords.br.x;
            var bottomRightY            = bounding_box.oCoords.br.y;

            // var topRightX       = bounding_box.getLeft() + bounding_box.getWidth();
            // var topRightY       = bounding_box.getTop();
            // var bottomLeftX     = bounding_box.getLeft();
            // var bottomLeftY     = bounding_box.getTop() + bounding_box.getHeight();
            // var bottomRightX    = bounding_box.getLeft() + bounding_box.getWidth();
            // var bottomRightY    = bounding_box.getTop() + bounding_box.getHeight();

            canvas.renderAll();

            data['topLeft'][0]['x']     = topLeftX;
            data['topLeft'][0]['y']     = topLeftY;
            data['topRight'][0]['x']    = topRightX;
            data['topRight'][0]['y']    = topRightY;
            data['bottomLeft'][0]['x']  = bottomLeftX;
            data['bottomLeft'][0]['y']  = bottomLeftY;
            data['bottomRight'][0]['x'] = bottomRightX;
            data['bottomRight'][0]['y'] = bottomRightY;
            data['pivot']               = bounding_box.getCenterPoint();
            data['rotation']            = bounding_box.getAngle();
            //data['tl'][0]['y'] = topLeftY;
            // data['tr'][0]['x'] = topRightX;
            // data['tr'][0]['y'] = topRightY;
            // data['bl'][0]['x'] = bottomLeftX;
            // data['bl'][0]['y'] = bottomLeftY;
            // data['br'][0]['x'] = bottomRightX;
            // data['br'][0]['y'] = bottomRightY;
            // data['pivot'] = pivot;

            var str = JSON.stringify(data, null, 2);

            console.log(str);

            //console.log(topLeftX);
            //console.log(topLeftY);
            // console.log(topRight);
            // console.log(bottomLeft);
            // console.log(bottomRight);
            //console.log(bounding_box.oCoords.tl.x + ", " + bounding_box.oCoords.tl.y);
        }

})();

});
</script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection
