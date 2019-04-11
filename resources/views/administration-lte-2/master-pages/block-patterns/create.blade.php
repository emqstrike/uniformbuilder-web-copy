@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" href="/css/administration-lte-2/block-patterns/edit.css">
@endsection

@section('slidein-panel')
    @include('administration-lte-2.master-pages.block-patterns.partials.neck-option')
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
                        <input type="hidden" name="neck_options" :value="JSON.stringify(neck_options)">
                        <input type="hidden" id="fabrics-list" value="{{ json_encode($fabrics) }}">

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
                            <label class="col-md-4 control-label">
                                Parts and Fabrics

                                <div>
                                    <button class="btn btn-flat btn-primary clone-parts-and-fabrics btn-xs">
                                        <i class="fa fa-plus"></i> Add Parts and Fabrics
                                    </button>
                                </div>
                            </label>

                            <div id="part-and-fabrics-container" class="col-md-6">
                                <div class="part-and-fabrics">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-inline">
                                                <label>Name</label>
                                                <input type="text" class="form-control name" name="part_name[]">
                                            </div>
                                        </div>

                                        <div class="col-md-5">
                                            <div class="form-inline">
                                                <label>Fabrics</label>
                                                <input type="hidden" name="part_fabrics[]" class="part-fabrics-field">

                                                <select class="fabrics" multiple="multiple"></select>
                                            </div>
                                        </div>

                                        <div class="col-md-1">
                                            <button class="btn btn-xs btn-flat btn-danger remove-parts-and-fabric" style="display: none;">
                                                <span class="fa fa-minus"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-1 control-label">Neck Options
                                <div>
                                    <a class="btn btn-flat btn-primary btn-xs" @click="addNeckOption()">
                                        <i class="fa fa-plus"></i> Add Neck Option
                                    </a>
                                </div>
                            </label>
                            <div class="col-md-11">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Alias</th>
                                            <th>Placeholder Overrides</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="item , index in neck_options">
                                            <td>@{{ item.name }}</td>
                                            <td>@{{ item.alias }}</td>
                                            <td>@{{ item.placeholder_overrides }}</td>
                                            <td>
                                                <button class="btn btn-xs btn-flat btn-primary" @click.prevent="editNeckOption(item, index)">Edit</button>
                                                <button class="btn btn-xs btn-flat btn-danger" @click.prevent="removeNeckOption(index)">Remove</button>
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
    <script>
        var data = {}; // initialize data variable for vue
    </script>

    <script src="https://unpkg.com/vue@2.1.3/dist/vue.js"></script>
    <script type="text/javascript" src="/bower_components/slideout.js/dist/slideout.min.js"></script>
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/ddslick.min.js"></script>
    <script type="text/javascript" src="/js/libs/autosize.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-patterns/block-patterns.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-patterns/neck-option-vue.js"></script>
@endsection