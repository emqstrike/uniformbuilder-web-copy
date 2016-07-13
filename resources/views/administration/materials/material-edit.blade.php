@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Material</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/update" enctype="multipart/form-data" id='edit-material-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-name" name="name" value="{{ $material->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-code" name="code" value="{{ $material->code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-6">
                                <select class="form-control material-block-pattern" name="block_pattern_id" id="block_pattern_id">
                                    <option value="">None</option>
                                    @foreach ($block_patterns as $block_pattern)
                                        @if ($block_pattern->active)
                                        <option value='{{ $block_pattern->id }}' @if($block_pattern->id == $material->block_pattern_id) selected="selected"@endif>{{ $block_pattern->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Option</label>
                            <div class="col-md-6">
                            <input type="hidden" id="existing_neck_option" value="{{ $material->neck_option }}">
                                <select class="form-control material-neck-option" name="neck_option" id="neck_option">
                                </select>
                            </div>
                        </div>
<hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Debug Mode</label>
                            <div class="col-md-6">
                                <select class="form-control material-debug_mode" name="debug_mode" id="debug_mode">
                                    <option value="0" @if( $material->debug_mode == 0 ) selected="selected"@endif>OFF</option>
                                    <option value="1" @if( $material->debug_mode == 1 ) selected="selected"@endif>ON</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Type</label>
                            <div class="col-md-6">
                                <select class="form-control material-design-type" name="design_type" id="design_type">
                                    <option value="style_sheet" @if( $material->design_type == "style_sheet" ) selected="selected"@endif>Style Sheet</option>
                                    <option value="block_pattern" @if( $material->design_type == "block_pattern" ) selected="selected"@endif>Block Pattern</option>
                                </select>
                            </div>
                        </div>
<hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Item ID</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-item-id" name="item_id" value="{{ $material->item_id }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-price-item-code" name="price_item_code" value="{{ $material->price_item_code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category</label>
                            <div class="col-md-6">
                                <select name='uniform_category_id' class="form-control uniform-category">
                                @foreach ($uniform_categories as $category)
                                    @if ($category->active)
                                    <option value='{{ $category->id }}'@if($material->uniform_category_id == $category->id) selected="selected"@endif>{{ $category->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name='type' class="form-control type">
                                    <option value='upper'@if($material->type == 'upper') selected="selected"@endif>Upper Body Uniform</option>
                                    <option value='lower'@if($material->type == 'lower') selected="selected"@endif>Lower Body Uniform</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-6">
                                <select name='gender' class="form-control gender">
                                    <option value='men'@if($material->gender == 'men') selected="selected"@endif>Men</option>
                                    <option value='women'@if($material->gender == 'women') selected="selected"@endif>Women</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-6">
                                <select name='factory_code' class="form-control factory-code">
                                    @foreach ($factories as $factory)
                                        @if ($factory->active)
                                            <option value='{{ $factory->code }}'@if( $material->factory_code == $factory->code ) selected @endif>{{ $factory->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Application Type</label>
                            <div class="col-md-6">
                                <select name='uniform_application_type' class="form-control uniform-application-type">
                                    <option value='none'@if( $material->uniform_application_type == "none" ) selected @endif>None</option>
                                    <option value='infused'@if( $material->uniform_application_type == "infused" ) selected @endif>Infused</option>
                                    <option value='sublimated'@if( $material->uniform_application_type == "sublimated" ) selected @endif>Sublimated</option>
                                    <option value='tackle_twill'@if( $material->uniform_application_type == "tackle_twill" ) selected @endif>Tackle Twill</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">SKU</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-code" name="sku" value="{{ $material->sku }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Builder Customizations</label>
                            <div class="col-md-6">
                                <textarea class="form-control material-builder-customizations" name="builder_customizations">{{ $material->builder_customizations }}</textarea>
                            </div>
                        </div>

@if (env('BUILDER_APPROACH') == '3D')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Base Material File</label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control material-file" name="material_path" accept="image/*">
                                <img src="{{ $material->material_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Bump Map File</label>
                            <div class="col-md-6 bump">
                                <input type="file" class="form-control bump-map-file" name="bump_map_path" accept="image/*">
                                <img src="{{ $material->bump_map_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Shadow File</label>
                            <div class="col-md-6 shadow">
                                <input type="file" class="form-control shadow-file" name="shadow_path" accept="image/*">
                                <img src="{{ $material->shadow_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Highlight File</label>
                            <div class="col-md-6 highlight">
                                <input type="file" class="form-control highlight-file" name="highlight_path" accept="image/*">
                                <img src="{{ $material->highlight_path }}" width="100px" height="100px">
                            </div>
                        </div>
@elseif (env('BUILDER_APPROACH') == '2D')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View File</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-view-file" name="front_view_path" accept="image/*">
                                @if ($material->front_view_path)
                                <div class="front_view_path">
                                    <img src="{{ $material->front_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="front_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View Shape</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-shape-file" name="front_view_shape" accept="image/*">
                                @if ($material->front_view_shape)
                                <div class="front_view_shape">
                                    <img src="{{ $material->front_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="front_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View File</label>
                            <div class="col-md-6 back-view">
                                <input type="file" class="form-control back-view-file" name="back_view_path" accept="image/*">
                                @if ($material->back_view_path)
                                <div class="back_view_path">
                                    <img src="{{ $material->back_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="back_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View Shape</label>
                            <div class="col-md-6 back-view">
                                <input type="file" class="form-control back-shape-file" name="back_view_shape" accept="image/*">
                                @if ($material->back_view_shape)
                                <div class="back_view_shape">
                                    <img src="{{ $material->back_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="back_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View File</label>
                            <div class="col-md-6 right-side-view">
                                <input type="file" class="form-control right-side-view-file" name="right_side_view_path" accept="image/*">
                                @if ($material->right_side_view_path)
                                <div class="right_side_view_path">
                                    <img src="{{ $material->right_side_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="right_side_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View Shape</label>
                            <div class="col-md-6 right-side-view">
                                <input type="file" class="form-control right-side-shape-file" name="right_side_view_shape" accept="image/*">
                                @if ($material->right_side_view_shape)
                                <div class="right_side_view_shape">
                                    <img src="{{ $material->right_side_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="right_side_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Left Side View File</label>
                            <div class="col-md-6 left-side-view">
                                <input type="file" class="form-control left-side-view-file" name="left_side_view_path" accept="image/*">
                                @if ($material->left_side_view_path)
                                <div class="left_side_view_path">
                                    <img src="{{ $material->left_side_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="left_side_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Left Side View Shape</label>
                            <div class="col-md-6 left-side-view">
                                <input type="file" class="form-control left-side-shape-file" name="left_side_view_shape" accept="image/*">
                                @if ($material->left_side_view_shape)
                                <div class="left_side_view_shape">
                                    <img src="{{ $material->left_side_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="left_side_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
@endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                                @if ($material->thumbnail_path)
                                <div class="thumbnail_path">
                                    <img src="{{ $material->thumbnail_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="thumbnail_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="hidden" name="sizes" id="sizes" value="{{ $material->sizes }}">
                        <!-- <a href="#" class="check-data btn btn-xs btn-primary">Check Data</a> -->
                            <table class="Table table-bordered col-md-12">
                                <tbody>
                                    <tr style="font-weight: bold;">
                                        <td style="width: 30px;">Adult Sizes</td>
                                        <td style="width: 30px;">3XS</td>
                                        <td style="width: 30px;">2XS</td>
                                        <td style="width: 30px;">XS</td>
                                        <td style="width: 30px;">S</td>
                                        <td style="width: 30px;">M</td>
                                        <td style="width: 30px;">L</td>
                                        <td style="width: 30px;">XL</td>
                                        <td style="width: 30px;">2XL</td>
                                        <td style="width: 30px;">3XL</td>
                                        <td style="width: 30px;">4XL</td>
                                        <td style="width: 30px;">5XL</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 30px;"></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="3XS"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="2XS"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="XS"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="S"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="M"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="L"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="XL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="2XL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="3XL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="4XL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd a-size" data-size="5XL"></select></td>
                                    </tr>
                                    <tr style="font-weight: bold;">
                                        <td style="width: 30px;">Youth Sizes</td>
                                        <td style="width: 30px;">YS</td>
                                        <td style="width: 30px;">YM</td>
                                        <td style="width: 30px;">YL</td>
                                        <td style="width: 30px;">YXL</td>
                                        <td style="width: 30px;">Y2XL</td>
                                        <td style="width: 30px;">Y3XL</td>
                                        <td style="width: 30px;" colspan="5"></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 30px;"></td>
                                        <td style="width: 30px;"><select class="pi-dd y-size" data-size="YS"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd y-size" data-size="YM"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd y-size" data-size="YL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd y-size" data-size="YXL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd y-size" data-size="Y2XL"></select></td>
                                        <td style="width: 30px;"><select class="pi-dd y-size" data-size="Y3XL"></select></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-8">
                                <input type="hidden" name="description" id="description" value="{{ $material->description }}">
                                <textarea class="form-control material-description">{{ $material->description }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Material
                                </button>
                                <!-- <a href="#" class="btn btn-success edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Material
                                </a> -->
                                <a href="/administration/materials" class="btn btn-danger" style="margin-right: 15px;">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])

@endsection

@section('scripts')
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script>
$( document ).ready(function() {

    window.price_items = null;
    getPriceItems(function(price_items){ window.price_items = price_items; });
    function getPriceItems(callback){
        var price_items;
        var url = "//api-dev.qstrike.com/api/price_items";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                price_items = data['price_items'];
                if(typeof callback === "function") callback(price_items);
            }
        });
    }

    var price_items_dd = '<option value=""> - - - </option>';
    window.price_items.forEach(function(entry) {
        price_items_dd += '<option value="' + entry.price_item + '" data-msrp="' + entry.msrp + '" data-wsp="' + entry.web_price_sale + '">' + entry.price_item + '</option>';
    });

    $(".pi-dd").each(function(i) {
        $(this).append(price_items_dd);
    });
    if( $('#sizes').val() != "" ){
        var size_obj = JSON.parse($('#sizes').val().slice(1, -1));
        console.log(size_obj);
        size_obj['adult'].forEach(function(entry) {
            // console.log(entry.size);
            $(".pi-dd").each(function(i) {
                var elem = $(this);
                if( elem.data('size') == entry.size ){
                    // elem.append('<option selected>HERE!</option');
                    elem.find('option').each(function(index,element){
                        if( element.value == entry.price_item ){
                            // console.log('Match!');
                            $(this).prop("selected", "selected");
                        }
                    });
                }
            });
        });

        size_obj['youth'].forEach(function(entry) {
            // console.log(entry.size);
            $(".pi-dd").each(function(i) {
                var elem = $(this);
                if( elem.data('size') == entry.size ){
                    // elem.append('<option selected>HERE!</option');
                    elem.find('option').each(function(index,element){
                        if( element.value == entry.price_item ){
                            // console.log('Match!');
                            $(this).prop("selected", "selected");
                        }
                    });
                }
            });
        });
    }
    

    $(".pi-dd").change(function() {
        buildPIxSizes();
    });

    // $(document).on('click', '.check-data', function() {
    //     buildPIxSizes();
    // });
// var sizes = [];
    function buildPIxSizes(){
        sizes = {};
        sizes['adult'] = [];
        sizes['youth'] = [];
        $(".a-size").each(function(i) {
            if( $(this).val() != "" ){
                data = {
                    "size" : $(this).data('size'),
                    "msrp" : parseInt($(this).find(':selected').data('msrp')),
                    "web_sale_price" : parseInt($(this).find(':selected').data('wsp')),
                    "price_item" : $(this).val()
                };
                sizes['adult'].push(data);
            }
        });
        $(".y-size").each(function(i) {
            if( $(this).val() != "" ){
                data = {
                    "size" : $(this).data('size'),
                    "msrp" : parseInt($(this).find(':selected').data('msrp')),
                    "web_sale_price" : parseInt($(this).find(':selected').data('wsp')),
                    "price_item" : $(this).val()
                };
                sizes['youth'].push(data);
            }
        });
        strResult = JSON.stringify(sizes);
        console.log( strResult );
        $('#sizes').val( '"' + strResult + '"' );
    }

    // console.log(window.price_items);

    tinymce.init({ 
        selector:'textarea.material-description'
    });

    loadEditor();
    function loadEditor(){
        setTimeout(function(){
            window.mce = $('#description').val();
            tinymce.editors[0].setContent(window.mce);
            $('#description').val('');
        }, 1000);
    }

    $('.edit-material').on('click', function(){
        saveEditor();
        // console.log('SAVE');
    });

    function saveEditor(){
        window.mce = tinyMCE.activeEditor.getContent();
        console.log('MCE: ' + window.mce);
        $('#description').val(window.mce);
    }

    window.block_patterns = null;
    getBlockPatterns(function(block_patterns){
        window.block_patterns = block_patterns;
    });

    function getBlockPatterns(callback){
        var block_patterns;
        var url = "//api-dev.qstrike.com/api/block_patterns";
        // var url = "//localhost:8888/api/block_patterns";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                // console.log("Mascots: "+items);
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }

    // console.log( window.block_patterns );

    var block_pattern_id = $('#block_pattern_id').val();
    var existing_neck_option = $('#existing_neck_option').val();

    // console.log(existing_neck_option);

    $.each(window.block_patterns, function(i, item) {
        if( item.id === block_pattern_id ){
            window.neck_options = JSON.parse(item.neck_options);
            $.each(window.neck_options, function(i, item) {
                if( existing_neck_option == item.name ){
                    console.log(' IF ');
                    $( '#neck_option' ).append( '<option value="' + item.name + '" selected>' + item.name + '</option>' );
                } else {
                    console.log(' IF ');
                    $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                }
            });
        }
    });

    $(document).on('change', '#block_pattern_id', function() {

        var id = $(this).val();

        $( '#neck_option' ).html('');

        $.each(window.block_patterns, function(i, item) {
            if( item.id === id ){
                window.neck_options = JSON.parse(item.neck_options);
                $.each(window.neck_options, function(i, item) {
                    $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                });
            }
        });

    });

});
</script>
@endsection