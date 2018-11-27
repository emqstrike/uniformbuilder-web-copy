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
                        Fabrics
                        <small>
                            <a href="/administration/fabric/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Fabric
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered fabrics'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Material ID</th>
                            <th>Material</th>
                            <th>Material Abbreviation</th>
                            <th>Thumbnail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($fabrics as $fabric)

                        <tr class='fabric-{{ $fabric->id }} {{ (!$fabric->active) ? ' inactive' : '' }}'>
                            <td>
                             {{ $fabric->id }}
                            </td>
                            <td>
                                {{ $fabric->factory_material_id }}
                            </td>
                            <td>
                                {{ $fabric->material }}
                            </td>
                            <td>
                                {{ $fabric->material_abbreviation }}
                            </td>
                            <td>
                                {{ $fabric->thumbnail }}
                            </td>
                            <td>
                                <a href="/administration/fabric/edit/{{ $fabric->id }}" class="btn btn-primary btn-xs edit-fabric" data-fabric-id="{{ $fabric->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="delete-fabric btn btn-danger pull-right btn-xs " data-fabric-id="{{ $fabric->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='6'>
                                No Fabrics
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
<script type="text/javascript" src="/js/administration/fabrics.js"></script>
<script>
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
