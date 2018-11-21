@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        .neck-option-placeholder-overrides {
            resize: none;
        }

        .coordinating-colors-container {
            margin-bottom: 5px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Add New Block Pattern')
                    <h1>Add New Block Pattern</h1>
                </div>

                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/{{ env('ENDPOINT_VERSION') }}/block_pattern/add" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="neck_options" id="neck_options" value="">

                        @include('administration.partials.flash-message')

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_file" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Cut Preview</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control cut-preview-file" name="cut_preview" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select name="uniform_category_id" class="form-control">
                                    @foreach ( $uniform_categories as $uniform_category )
                                        <option value="{{ $uniform_category->id }}">{{ $uniform_category->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Placeholder Overrides</label>
                            <div class="col-md-6">
                                <textarea name="placeholder_overrides" class="form-control placeholder-overrides autosized"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-6">
                                <select name="gender" class="form-control">
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Alias</label>
                            <div class="col-md-6">
                                <input type="text" name="alias" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-1 control-label">Neck Options
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
                                        <tr class="layers-row">
                                            <td>
                                                <input type="text" class="neck-option-name form-control layer1" name="neck_option_name[]">
                                            </td>
                                            <td>
                                                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
                                            </td>
                                            <td>
                                                <input type="file" class="neck-option-file layer1" name="neck_option_image[]">
                                            </td>
                                            <td>
                                                <input type="text" class="form-control neck-option-alias layer1" name="neck_option_alias[]">
                                            </td>
                                            <td>
                                                <textarea  class="neck-option-placeholder-overrides form-control layer1" name="neck_option_placeholder_overrides"  autosized></textarea>
                                            </td>
                                            <td>
                                                <div class="row">
                                                    <div class="col-md-1">
                                                        <button class="btn btn-xs btn-flat btn-success clone-coordinating-color">
                                                            <span class="fa fa-plus"></span>
                                                        </button>
                                                    </div>

                                                    <div class="col-md-10 coordinating-colors-column">
                                                        <div class="coordinating-colors-container">
                                                            <select class="coordinating-colors layer1">
                                                                @foreach ($colors as $color)
                                                                    @if ($color->active)
                                                                        <option value="{{ $color->color_code }}" style="background: #{{ $color->hex_code }}; color: #ffffff; text-shadow: 2px 2px #000000;">
                                                                            {{ $color->name }}
                                                                        </option>
                                                                    @endif
                                                                @endforeach
                                                            </select>

                                                            <button class="btn btn-xs btn-flat btn-danger remove-coordinating-color pull-right" style="display: none;">
                                                                <span class="fa fa-remove"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <select id="limited-color-1" class="limited-color layer1">
                                                    @foreach ($colors as $color)
                                                        @if ($color->active)
                                                            <option value="{{ $color->color_code }}" style="background: #{{ $color->hex_code }}; color: #ffffff; text-shadow: 2px 2px #000000;">
                                                                {{ $color->name }}
                                                            </option>
                                                        @endif
                                                    @endforeach
                                                </select>

                                                <select id="limited-color-2" class="limited-color layer1">
                                                    @foreach ($colors as $color)
                                                        @if ($color->active)
                                                            <option value="{{ $color->color_code }}" style="background: #{{ $color->hex_code }}; color: #ffffff; text-shadow: 2px 2px #000000;">
                                                                {{ $color->name }}
                                                            </option>
                                                        @endif
                                                    @endforeach
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-flat btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Block Pattern
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
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/ddslick.min.js"></script>
    <script type="text/javascript" src="/js/libs/autosize.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-patterns/block-patterns.js"></script>
@endsection