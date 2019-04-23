@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" href="/css/administration-lte-2/block-pattern-filters.css">
@endsection

@section('slidein-panel')
    @include('administration-lte-2.master-pages.block-pattern-filters.partials.block-pattern-option')
@endsection

@section('content')
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Add New Block Pattern Filter')

                        <h1>Add New Block Pattern Filter</h1>
                    </div>

                    <div class="box-body">
                        <form action="{{ route('v1_store_block_pattern_filter') }}" class="form-horizontal" method="POST">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="block_pattern_options" :value="JSON.stringify(block_pattern_options)">
                            <input type="hidden" name="block_pattern_option_2" :value="JSON.stringify(block_pattern_option_2)">

                            @include('administration.partials.flash-message')

                            <div class="form-group">
                                <label class="col-md-4 control-label">Name</label>
                                <div class="col-md-6">
                                    <input type="name" class="form-control color-name" name="name" value="{{ old('name') }}">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Sport</label>
                                <div class="col-md-6">
                                    <select name="uniform_category_id" class="form-control">
                                        @foreach ($uniformCategories as $uniformCategory )
                                            <option value="{{ $uniformCategory->id }}">{{ $uniformCategory->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-1 control-label">Block Pattern Options
                                    <div>
                                        <a class="btn btn-flat btn-primary btn-xs" @click="addBlockPatternOption()">
                                            <i class="fa fa-plus"></i> Add Block Pattern Option
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
                                            <tr v-for="item , index in block_pattern_options">
                                                <td>@{{ item.name }}</td>
                                                <td>@{{ item.alias }}</td>
                                                <td>@{{ item.placeholder_overrides }}</td>
                                                <td>
                                                    <button class="btn btn-xs btn-flat btn-primary" @click.prevent="editBlockPatternOption(item, index)">Edit</button>
                                                    <button class="btn btn-xs btn-flat btn-danger" @click.prevent="removeBlockPatternOption(index)">Remove</button>
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
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        var data = {}; // initialize data variable for vue
        var block_pattern_option_2 = {};
    </script>

    <script src="https://unpkg.com/vue@2.1.3/dist/vue.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/slideout.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/block-pattern-filters-vue.js"></script>
@endsection