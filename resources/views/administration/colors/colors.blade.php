@extends('administration.lte-main')
 
@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-th"></span>
                        Colors
                        <small>
                            <a href="/administration/color/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Color
                            </a>
                        </small>
                    </h1>
                    <!-- <small>
                        <a href="/administration/colors/updateAll" class='btn btn-xs btn-primary'>
                            <span class="glyphicon glyphicon-refresh"></span>
                            Update Colors
                        </a>
                    </small> -->
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color</th>
                            <th>Sublimation Only</th>
                            <th>Edit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($colors as $color)
                        <tr class='color-{{ $color->id }} {{ (!$color->active) ? ' inactive' : '' }}'>
                            <td>
                                {{ $color->id }}
                            </td>
                            <td>
                                {{ $color->name }}
                            </td>
                            <td>
                            @if( $color->sublimation_only )
                                Yes
                            @endif                                
                            </td>
                            <td style='background-color: #{{ $color->hex_code }}; width: 300px; height: 30px; border: 1px solid #ddd;'>
                                <span class='badge'>{{ $color->color_code }}</span>
                                <a href="/administration/color/edit/{{ $color->id }}" class="btn btn-primary pull-right btn-xs edit-color" data-color-id="{{ $color->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs disable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs enable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-color" data-color-id="{{ $color->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='3'>
                                No Colors
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
<script type="text/javascript" src="/js/administration/colors.js"></script>
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