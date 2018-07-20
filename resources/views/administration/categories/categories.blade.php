@extends('administration.lte-main')


@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<style type="text/css">
</style>

@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-soccer-ball-o"></span>
                        Uniform Categories
                        <small>
                            <a href="/administration/category/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Uniform Category
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th id="select-filter">Categories</th>
                            <th>Code</th>
                            <th>Men</th>
                            <th>Women</th>
                            <th>Youth</th>
                            <th>Sort Order Male</th>
                            <th>Sort Order Female</th>
                            <th>Sort Order Youth</th>
                            <th>Type</th>
                            <th id="select-filter">Active Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($categories as $category)

                        <tr class='category-{{ $category->id }} {{ (!$category->active) ? ' inactive' : '' }}'>
                            <td>
                                {{ $category->id }}
                            </td>
                            <td>
                                {{ $category->name }}
                            </td>
                            <td>
                                {{ $category->code }}
                            </td>
                            <td align="center">
                            @if ($category->thumbnail_male)
                                <img src="{{ $category->thumbnail_male }}" style="height: 80px; width: 88=px;">
                            @else
                                <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/categories/Test/thumbnail_male.png/staging/test/thumbnail.jpg" style="height: 80px; width: 88=px;">
                            @endif
                            <br>
                            @if($category->active_male)
                               <font color="green" size="2">Active</font>
                            @else
                                <font color="gray" size="2">Inactive</font>
                            @endif
                            </td>
                            <td align="center">
                            @if ($category->thumbnail_female)
                                <img src="{{ $category->thumbnail_female }}" style="height: 80px; width: 88=px;">
                            @else
                                <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/categories/Test/thumbnail_male.png/staging/test/thumbnail.jpg" style="height: 80px; width: 88=px;">
                            @endif
                            <br>
                            @if($category->active_female)
                               <font color="green" size="2">Active</font>
                            @else
                                <font color="gray" size="2">Inactive</font>
                            @endif
                            </td>
                            <td align="center">
                            @if ($category->thumbnail_youth)
                                <img src="{{ $category->thumbnail_youth }}" style="height: 80px; width: 88=px;">
                            @else
                                <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/categories/Test/thumbnail_male.png/staging/test/thumbnail.jpg" style="height: 80px; width: 88=px;">
                            @endif
                            <br>
                            @if($category->active_youth)
                               <font color="green" size="2">Active</font>
                            @else
                                <font color="gray" size="2">Inactive</font>
                            @endif
                            </td>
                            <td>
                                {{ $category->sort_order_male}}
                            </td>
                            <td>
                                {{ $category->sort_order_female}}
                            </td>
                            <td>
                                {{ $category->sort_order_youth}}
                            </td>
                            <td>
                                {{ $category->type }}
                            </td>
                            <td align="center">
                                {{ $category->active_type }}
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs disable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs enable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>
                                <a href="/administration/category/edit/{{ $category->id }}" class="btn btn-primary btn-xs edit-category" data-category-id="{{ $category->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger btn-xs delete-category" data-category-id="{{ $category->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='2'>
                                No Uniform Categories
                            </td>
                        </tr>

                    @endforelse
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/categories.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        initComplete: function () {
            this.api().columns('#select-filter').every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );

                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    });

});
</script>
@endsection
