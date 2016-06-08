@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('custom-styles')

@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Placeholders
                        <small>
                            <a href="/administration/placeholder/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sport</th>
                            <th>Type</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Left</th>
                            <th>Right</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($placeholders as $placeholder)
                    <tr>
                        <td>{{ $placeholder->id }}</td>
                        <td>{{ $placeholder->name }}</td>
                        <td>{{ $placeholder->sport }}</td>
                        <td>{{ $placeholder->type }}</td>
                        <td><img src="{{ $placeholder->thumbnail_front }}" style="height: 200px; width: 200px;"></td>
                        <td><img src="{{ $placeholder->thumbnail_back }}" style="height: 200px; width: 200px;"></td>
                        <td><img src="{{ $placeholder->thumbnail_left }}" style="height: 200px; width: 200px;"></td>
                        <td><img src="{{ $placeholder->thumbnail_right }}" style="height: 200px; width: 200px;"></td>
                        <td>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-placeholder" data-placeholder-id="{{ $placeholder->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>
                    @empty

                        <tr>
                            <td colspan='8'>
                                No Placeholders
                            </td>
                        </tr>

                    @endforelse
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){
//
});
</script>
@endsection