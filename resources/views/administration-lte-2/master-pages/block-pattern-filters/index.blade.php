@extends('administration-lte-2.lte-main')

@section('content')
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Block Pattern Filters')

                        <h1>Block Pattern Filters</h1>
                        <a href="{{ route('v1_add_block_pattern_filter') }}" class="btn btn-flat btn-success btn-add-new">
                            Add new block pattern filter
                        </a>
                    </div>

                    <div class="box-body">
                        @include('administration.partials.flash-message')
                        
                        <table data-toggle='table' class='data-table table table-bordered patterns'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Sport</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="new_block_pattern, index in new_block_patterns">
                                    <td>@{{ new_block_pattern.id }}</td>
                                    <td>@{{ new_block_pattern.name }}</td>
                                    <td>@{{ new_block_pattern.sport }}</td>
                                    <td>
                                        <a :href="'block_pattern_filters/edit/' + new_block_pattern.id" class="btn btn-xs btn-flat btn-success">Edit</a>
                                        <button class="btn btn-xs btn-flat btn-danger" @click="remove(index)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="https://unpkg.com/vue@2.1.3/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#application-container',
            data: function() {
                return {
                    new_block_patterns: {!! $newBlockPatterns !!}
                }
            },
            methods: {
                remove: function(index) {
                    let remove = confirm('Are you sure you want to remove this block pattern filter?');

                    if (remove == true) {
                        axios.get('new_block_patterns/' + this.new_block_patterns[index].id + '/delete')
                            .then((response) => {
                                if (response.data.success === true) {
                                    this.new_block_patterns.splice(this.new_block_patterns.indexOf(index), 1);

                                    new PNotify({
                                        title: 'Block pattern filter deleted',
                                        type: 'success',
                                        hide: true,
                                        delay: 1000
                                    });
                                } else {
                                    new PNotify({
                                        title: 'Deleting block pattern filter failed',
                                        type: 'error',
                                        hide: true,
                                        delay: 1000
                                    });
                                }
                            });
                    }
                }
            }
        });
    </script>
@endsection