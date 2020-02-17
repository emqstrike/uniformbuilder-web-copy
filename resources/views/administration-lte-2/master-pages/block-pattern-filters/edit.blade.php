@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" href="/css/administration-lte-2/block-pattern-filters.css">
@endsection

@section('slidein-panel')
    @include('administration-lte-2.master-pages.block-pattern-filters.partials.block-pattern-option')
@endsection

@section('panel-overlay')
    <div v-show="is_panel_showing" class="panel-overlay"></div>
@endsection

@section('content')
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Edit New Block Pattern Filter')

                        <h1>Edit New Block Pattern Filter</h1>
                    </div>

                    <div class="box-body">
                        <form action="{{ route('v1_update_block_pattern_filter') }}" class="form-horizontal" method="POST">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            <input type="hidden" name="id" value="{{ $newBlockPattern->id }}">
                            <input type="hidden" name="block_pattern_options" :value="JSON.stringify(block_pattern_options)">
                            <input type="hidden" name="block_pattern_option_2" :value="JSON.stringify(block_pattern_option_2)">

                            @include('administration.partials.flash-message')

                            <div class="form-group">
                                <label class="col-md-4 control-label">Name</label>
                                <div class="col-md-6">
                                    <input type="name" class="form-control color-name" name="name" value="{{ $newBlockPattern->name }}">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Sport</label>
                                <div class="col-md-6">
                                    <select name="uniform_category_id" class="form-control">
                                        @foreach ($uniformCategories as $uniformCategory )
                                            @if ($uniformCategory->name != "")
                                                <option value="{{ $uniformCategory->id }}" @if ($newBlockPattern->uniform_category_id == $uniformCategory->id) selected="selected" @endif>
                                                    {{ $uniformCategory->name }}
                                                </option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">Block Pattern Options
                                    <div>
                                        <a class="btn btn-flat btn-primary btn-xs" @click="addBlockPatternOption()">
                                            <i class="fa fa-plus"></i> Add Block Pattern Option
                                        </a>
                                    </div>
                                </label>
                                <div class="col-md-10">
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
                                        Update Block Pattern
                                    </button>
                                    <a href="{{ route('v1_block_pattern_filters') }}" class="btn btn-flat btn-danger">
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
        var data = [{!! $newBlockPattern->block_pattern_options !!}][0];
        var block_pattern_option_2 = {!! $newBlockPattern->block_pattern_option_2 !!};
    </script>

    <script src="https://unpkg.com/vue@2.1.3/dist/vue.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/slideout.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/block-pattern-filters-vue.js"></script>
@endsection