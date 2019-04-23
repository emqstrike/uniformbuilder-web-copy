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
                                @if ($newBlockPatterns)
                                    @foreach ($newBlockPatterns as $newBlockPattern)
                                        <tr>
                                            <td>{{ $newBlockPattern->id }}</td>
                                            <td>{{ $newBlockPattern->name }}</td>
                                            <td>{{ $newBlockPattern->sport }}</td>
                                            <td>
                                                <a href="{{ route('v1_edit_block_pattern_filter', ['id' => $newBlockPattern->id]) }}" class="btn btn-xs btn-flat btn-success">Edit</a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection