@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Add New Block Pattern')
                    <h1>Add New Block Pattern</h1>
                </div>

                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('v1_store_block_pattern') }}" enctype="multipart/form-data" id='create-color-form'>
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
                            <label class="col-md-2 control-label">Neck Options
                            <div>
                                <a class="btn btn-flat btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Neck Option</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Preview File</th>
                                            <th>New File</th>
                                            <th>Placeholder Overrides</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
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
                                                <textarea  class="neck-option-placeholder-overrides form-control layer1" name="neck_option_placeholder_overrides"  autosized></textarea>
                                            </td>
                                            <td>
                                                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
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