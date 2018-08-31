@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Block Pattern</div>
                <div class="panel-body">
                    @include('administration.partials.validation-error')
                    @include('administration.partials.flash-message')

                    <form class="form-horizontal" role="form" method="POST" action="/administration/block_pattern/update" enctype="multipart/form-data" id='edit-block-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="block_pattern_id" value="{{ $block_pattern->id }}">
                        <input type="hidden" name="neck_options" id="neck_options" value="{{ $block_pattern->neck_options }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control category-name" name="name" value="{{ $block_pattern->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <img  class="img-thumbnail" src="{{ $block_pattern->thumbnail_path }}" style="height: 210px; width: 140px;">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_file" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <img  class="img-cut-preview" src="{{ $block_pattern->cut_preview }}" style="height: 210px; width: 140px;">
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


                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="col-md-2 control-label">Block Pattern Options
                                <div>
                                    <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Neck Option</a>
                                </div>
                                </label>
                                <div class="col-md-8">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th >Name</th>
                                                <th>Preview File</th>
                                                <th>New File</th>
                                                <th>Placeholder Overrides</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="layers-row-container"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Block Pattern
                                </button>
                                <a href="/administration/block_patterns" class="btn btn-danger">
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

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script type="text/javascript" src="/js/administration/block-patterns.js"></script>
@endsection
