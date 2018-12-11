@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        .neck-option-placeholder-overrides {
            resize: none;
        }

        .coordinating-colors-container,
        .limited-colors-container {
            margin-bottom: 25px;
        }

        .neck-option-alias,
        .neck-option-name {
            width: 130px !important;
        }

        .coordinating-colors-name,
        .limited-colors-name,
        .limited-color {
            margin-bottom: 10px;
            width: 100%;
        }

        select.coordinating-colors {
            width: 49%;
        }

        .limited-color-row .row {
            min-width: 321px;
        }

        .limited-colors-container,
        .coordinating-colors-container {
            background: #eeeeee;
            margin-bottom: 15px;
            padding: 10px;
        }

        .part-and-fabrics .name {
            width: 90% !important;
        }

        .part-and-fabrics span.select2 {
            vertical-align: top;
            width: 84% !important;
        }

        .select2-selection__choice {
            color: #000000 !important;
        }

        .part-and-fabrics {
            margin-bottom: 10px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Modify Block Pattern')
                    <h1>Modify Block Pattern</h1>
                </div>

                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/{{ env('ENDPOINT_VERSION') }}/block_pattern/update" enctype="multipart/form-data" id='edit-block-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="block_pattern_id" value="{{ $block_pattern->id }}">
                        <input type="hidden" name="neck_options" id="neck_options" value="{{ $block_pattern->neck_options }}">
                        <input type="hidden" id="fabrics-list" value="{{ json_encode($fabrics) }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control category-name" name="name" value="{{ $block_pattern->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                @if ($block_pattern->thumbnail_path)
                                    <img  class="img-thumbnail" src="{{ $block_pattern->thumbnail_path }}" style="height: 210px; width: 140px;">
                                @endif
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_file" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Cut Preview</label>
                            <div class="col-md-6">
                                @if ($block_pattern->cut_preview)
                                    <img  class="img-cut-preview" src="{{ $block_pattern->cut_preview }}" style="height: 210px; width: 140px;">
                                @endif
                                <input type="file" class="form-control cut-preview-file" name="cut_preview" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select name="uniform_category_id" class="form-control">
                                    @foreach ( $uniform_categories as $uniform_category )
                                        <option value="{{ $uniform_category->id }}" @if($block_pattern->uniform_category_id == $uniform_category->id) selected="selected"@endif>{{ $uniform_category->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Placeholder Overrides</label>
                            <div class="col-md-6">
                                <textarea name="placeholder_overrides" class="form-control placeholder-overrides  autosized">{{ $block_pattern->placeholder_overrides }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-6">
                                <select name="gender" class="form-control">
                                    <option value="men" @if ($block_pattern->gender == 'men') selected="selected" @endif>Men</option>
                                    <option value="women" @if ($block_pattern->gender == 'women') selected="selected" @endif>Women</option>
                                    <option value="unisex" @if ($block_pattern->gender == 'unisex') selected="selected" @endif>Unisex</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="col-md-4 control-label">Alias</label>
                            <div class="col-md-6">
                                <input type="text" name="alias" class="form-control" value="{{ $block_pattern->alias }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">
                                Parts and Fabrics

                                <div>
                                    <button class="btn btn-flat btn-primary clone-parts-and-fabrics btn-xs">
                                        <i class="fa fa-plus"></i> Add Parts and Fabrics
                                    </button>
                                </div>
                            </label>

                            <div id="part-and-fabrics-container" class="col-md-6">
                                @foreach (json_decode($block_pattern->parts_fabrics, true) as $key => $part_fabric)
                                    <div class="part-and-fabrics">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-inline">
                                                    <label>Name</label>
                                                    <input type="text" class="form-control name" name="part_name[]" value="{{ $part_fabric['name'] }}">
                                                </div>
                                            </div>

                                            <div class="col-md-5">
                                                <div class="form-inline">
                                                    <label>Fabrics</label>
                                                    <input type="hidden" name="part_fabrics[]" class="part-fabrics-field" value="{{ implode(',', $part_fabric['fabric_ids']) }}">

                                                    <select class="fabrics fabric-1" multiple="multiple">
                                                        @foreach ($fabrics as $fabric)
                                                            @if (in_array($fabric['id'], $part_fabric['fabric_ids']))
                                                                <option value="{{ $fabric['id'] }}" selected="selected">{{ $fabric['text'] }}</option>
                                                            @else
                                                                <option value="{{ $fabric['id'] }}">{{ $fabric['text'] }}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            @if ($key == 0)
                                                <div class="col-md-1">
                                                    <button class="btn btn-xs btn-flat btn-danger remove-parts-and-fabric" style="display: none;">
                                                        <span class="fa fa-minus"></span>
                                                    </button>
                                                </div>
                                            @else
                                                <div class="col-md-1">
                                                    <button class="btn btn-xs btn-flat btn-danger remove-parts-and-fabric">
                                                        <span class="fa fa-minus"></span>
                                                    </button>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="col-md-1 control-label">Block Pattern Options
                                <div>
                                    <a class="btn btn-flat btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Neck Option</a>
                                </div>
                                </label>
                                <div class="col-md-11">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Preview File</th>
                                                <th>New File</th>
                                                <th>Alias</th>
                                                <th>Placeholder Overrides</th>
                                                <th>Coordinating Colors</th>
                                                <th>Limited Colors</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="layers-row-container" data-colors="{{ json_encode($colors) }}">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-flat btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Block Pattern
                                </button>

                                <a href="{{ route('v1_block_patterns') }}" class="btn btn-flat btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('custom-scripts')
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/libs/autosize.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-patterns/block-patterns.js"></script>
@endsection