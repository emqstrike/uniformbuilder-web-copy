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
                        <span class="fa fa-gradient"></span>
                        Gradients
                        <small>
                            <a href="/administration/gradient/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Gradient
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered gradients'>
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Gradient Name</th>
                            <th>Active Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($gradients as $gradient)

                        <tr class='gradient-{{ $gradient->id }} {{ (!$gradient->active) ? ' inactive' : '' }}'>
                            <td>
                                <img src="{{ $gradient->gradient_path }}" width="100px" height="100px">
                            </td>
                            <td>
                                {{ $gradient->name }}
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs disable-gradient" data-gradient-id="{{ $gradient->id }}" role="button" {{ ($gradient->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs enable-gradient" data-gradient-id="{{ $gradient->id }}" role="button" {{ ($gradient->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>
                            </td>
                            <td>
                                <a href="/administration/gradient/edit/{{ $gradient->id }}" class="btn btn-primary btn-xs edit-gradient" data-gradient-id="{{ $gradient->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-gradient" data-gradient-id="{{ $gradient->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='3'>
                                No Gradients
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
<script type="text/javascript" src="/js/administration/gradients.js"></script>
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