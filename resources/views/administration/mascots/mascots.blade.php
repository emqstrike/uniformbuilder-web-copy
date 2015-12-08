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
                        Mascots
                        <small>
                            <a href="/administration/mascot/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot
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

                @forelse ($mascots as $mascot)

                    <tr class='mascot-{{ $mascot->id }} {{ (!$mascot->active) ? ' inactive' : '' }}'>
                        <td>
                            @if ($mascot->icon)
                            <img src="{{ $mascot->icon }}" width="100px" height="100px">
                            @else
                            <img src="http://dummyimage.com/100" width="100px" height="100px">
                            @endif
                        </td>
                        <td>
                            {{ $mascot->name }}
                        </td>
                        <td>
                            <a href="#" class="btn btn-default btn-xs disable-mascot" data-mascot-id="{{ $mascot->id }}" role="button" {{ ($mascot->active) ? : 'disabled="disabled"' }}>
                                <i class="glyphicon glyphicon-eye-close"></i>
                                Disable
                            </a>
                            <a href="#" class="btn btn-info btn-xs enable-mascot" data-mascot-id="{{ $mascot->id }}" role="button" {{ ($mascot->active) ? 'disabled="disabled"' : '' }}>
                                <i class="glyphicon glyphicon-eye-open"></i>
                                Enable
                            </a>
                        </td>
                        <td>
                            <a href="/administration/mascot/edit/{{ $mascot->id }}" class="btn btn-primary btn-xs edit-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-default btn-xs show-mascot" role="button"
                                data-mascot-name="{{ $mascot->name }}"
                                data-mascot-layers="{{ $mascot->layers[0]->url }}"
                                data-mascot-id="{{ $mascot->id }}">
                                <li class="glyphicon glyphicon-info-sign"></li>
                                View
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Mascots
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
<div class="modal fade" id="view-mascot-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-mascot-layers" data-toggle="tab">Layers</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-pattern-layers" align='center'>
                            <span class="badge mascot-layers-path"></span>
                            <img src="" class="mascot-layers" width="300px" height="300px" style="background: black;">
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
<script type="text/javascript" src="/js/administration/mascots.js"></script>
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