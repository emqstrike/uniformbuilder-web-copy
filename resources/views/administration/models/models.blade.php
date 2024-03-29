@extends('administration.lte-main')

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-male"></span>
                        Base Models
                        <small>
                            <a href="/administration/model/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Base Model
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='table table-bordered'>
                    <tr>
                        <th colspan='3'>
                            Base Models
                        </th>
                    </tr>

                @forelse ($models as $model)

                    <tr class='model-{{ $model->id }} {{ (!$model->active) ? ' inactive' : '' }}'>
                        <td>
                            {{ $model->name }}
                        </td>
                        <td>
                            <a href="#" class="btn btn-default btn-xs disable-model" data-model-id="{{ $model->id }}" role="button" {{ ($model->active) ? : 'disabled="disabled"' }}>
                                <i class="glyphicon glyphicon-eye-close"></i>
                                Disable
                            </a>
                            <a href="#" class="btn btn-info btn-xs enable-model" data-model-id="{{ $model->id }}" role="button" {{ ($model->active) ? 'disabled="disabled"' : '' }}>
                                <i class="glyphicon glyphicon-eye-open"></i>
                                Enable
                            </a>
                        </td>
                        <td>
                            <a href="/administration/model/edit/{{ $model->id }}" class="btn btn-primary btn-xs edit-model" data-model-id="{{ $model->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            @if ($model->base_model_path)
                            <a href="{{ $model->base_model_path }}" class="btn btn-default btn-xs show-model" role="button" target="_blank">
                                <li class="glyphicon glyphicon-info-sign"></li>
                                View
                            </a>
                            @endif
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-model" data-model-id="{{ $model->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Base Models
                        </td>
                    </tr>

                @endforelse

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
<script type="text/javascript" src="/js/administration/models.js"></script>
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