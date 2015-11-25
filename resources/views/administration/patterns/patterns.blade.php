@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Patterns
                        <small>
                            <a href="/administration/pattern/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Pattern
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Pattern Name</th>
                                <th>Active Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                @forelse ($patterns as $pattern)

                    <tr class='pattern-{{ $pattern->id }} {{ (!$pattern->active) ? ' inactive' : '' }}'>
                        <td>
                            @if ($pattern->thumbnail_path)
                            <img src="{{ $pattern->thumbnail_path }}" width="100px" height="100px">
                            @else
                            <img src="http://dummyimage.com/100" width="100px" height="100px">
                            @endif
                        </td>
                        <td>
                            {{ $pattern->name }}
                        </td>
                        <td>
                            <a href="#" class="btn btn-default btn-xs disable-pattern" data-pattern-id="{{ $pattern->id }}" role="button" {{ ($pattern->active) ? : 'disabled="disabled"' }}>
                                <i class="glyphicon glyphicon-eye-close"></i>
                                Disable
                            </a>
                            <a href="#" class="btn btn-info btn-xs enable-pattern" data-pattern-id="{{ $pattern->id }}" role="button" {{ ($pattern->active) ? 'disabled="disabled"' : '' }}>
                                <i class="glyphicon glyphicon-eye-open"></i>
                                Enable
                            </a>
                        </td>
                        <td>
                            <a href="/administration/pattern/edit/{{ $pattern->id }}" class="btn btn-primary btn-xs edit-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-default btn-xs show-pattern" role="button"
                                data-pattern-name="{{ $pattern->name }}"
                                data-pattern-layer-one="{{ $pattern->layers[0]->url }}"
                                data-pattern-layer-two="{{ $pattern->layers[1]->url }}"
                                data-pattern-layer-three="{{ $pattern->layers[2]->url }}"
                                data-pattern-layer-four="{{ $pattern->layers[3]->url }}"
                                data-pattern-id="{{ $pattern->id }}">
                                <li class="glyphicon glyphicon-info-sign"></li>
                                View
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Patterns
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

<!-- Information Modal -->
<div class="modal fade" id="view-pattern-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-pattern-layer-1" data-toggle="tab">Layer 1</a></li>
                        <li class="tab-menu-layer-2"><a href="#tab-pattern-layer-2" data-toggle="tab">Layer 2</a></li>
                        <li class="tab-menu-layer-3"><a href="#tab-pattern-layer-3" data-toggle="tab">Layer 3</a></li>
                        <li class="tab-menu-layer-4"><a href="#tab-pattern-layer-4" data-toggle="tab">Layer 4</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-pattern-layer-1" align='center'>
                            <span class="badge pattern-layer-1-path"></span>
                            <img src="" class="pattern-layer-1" width="300px" height="300px" style="background: black;">
                        </div>
                        <div class="tab-pane" id="tab-pattern-layer-2" align='center'>
                            <span class="badge pattern-layer-2-path"></span>
                            <img src="" class="pattern-layer-2" width="300px" height="300px" style="background: black;">
                        </div>
                        <div class="tab-pane" id="tab-pattern-layer-3" align='center'>
                            <span class="badge pattern-layer-3-path"></span>
                            <img src="" class="pattern-layer-3" width="300px" height="300px" style="background: black;">
                        </div>
                        <div class="tab-pane" id="tab-pattern-layer-4" align='center'>
                            <span class="badge pattern-layer-4-path"></span>
                            <img src="" class="pattern-layer-4" width="300px" height="300px" style="background: black;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/patterns.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection