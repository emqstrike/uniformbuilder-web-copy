@extends('administration.lte-main')

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-building-o"></span>
                        Uniform Design Sets
                        <small>
                            <a href="/administration/design_set/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Uniform Design Set
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered'>
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Design Sets</th>
                            <th>Code</th>
                            <th>Gender</th>
                            <th>Category</th>
                            <th>Upper Body</th>
                            <th>Lower Body</th>
                            <th>Color</th>
                            <th>Fabric</th>
                            <th>Lining</th>
                            <th>Active Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($designs as $design)

                        <tr class='design-{{ $design->id }} {{ (!$design->active) ? ' inactive' : '' }}'>
                            <td>
                                @if ($design->thumbnail_path)
                                <img src="{{ $design->thumbnail_path }}" width="100px" height="100px" />
                                @else
                                <img src="http://dummyimage.com/100" width="100px" height="100px" />
                                @endif
                            </td>
                            <td>
                                {{ $design->name }}
                            </td>
                            <td>
                                <span class="badge badge-default">{{ $design->code }}</span>
                            </td>
                            <td>
                                {{ $design->gender }}
                            </td>
                            <td>
                                {{ $design->category }}
                            </td>
                            <td>
                                {{ $design->upper }}
                            </td>
                            <td>
                                {{ $design->lower }}
                            </td>
                            <td>
                                {{ $design->color }}
                            </td>
                            <td>
                                {{ $design->fabric }}
                            </td>
                            <td>
                                {{ $design->lining }}
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs disable-design" data-design-id="{{ $design->id }}" role="button" {{ ($design->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs enable-design" data-design-id="{{ $design->id }}" role="button" {{ ($design->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>
                            </td>
                            <td>
                                <a href="/administration/design_set/edit/{{ $design->id }}" class="btn btn-primary btn-xs edit-design" data-design-id="{{ $design->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-design" data-design-id="{{ $design->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='12'>
                                No Uniform Design Sets
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
<script type="text/javascript" src="/js/administration/designs.js"></script>
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