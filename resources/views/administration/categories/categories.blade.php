@extends('administration.lte-main')


@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<style type="text/css">
    tfoot tr td select {
        display: none;
    }
    tfoot tr td:first-child select {
        display: block;
    }
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
                            <th>Categories</th>
                            <th>Male</th>
                            <th>Female</th>
                            <th>Youth</th>
                            <th>Sizes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($categories as $category)

                        <tr class='category-{{ $category->id }} {{ (!$category->active) ? ' inactive' : '' }}'>
                            <td>
                                {{ $category->name }}
                            </td>
                            <td>
                            @if ($category->thumbnail_male)
                                <img src="{{ $category->thumbnail_male }}" style="height: 100px; width: 70px;">
                            @endif
                            </td>
                            <td>
                            @if ($category->thumbnail_female)
                                <img src="{{ $category->thumbnail_female }}" style="height: 100px; width: 70px;">
                            @endif
                            </td>
                            <td>
                            @if ($category->thumbnail_youth)
                                <img src="{{ $category->thumbnail_youth }}" style="height: 100px; width: 70px;">
                            @endif
                            </td>
                            <td>
                                {{ $category->sizes }}
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
                            </td>
                            <td>
                                <a href="/administration/category/edit/{{ $category->id }}" class="btn btn-primary btn-xs edit-category" data-category-id="{{ $category->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-category" data-category-id="{{ $category->id }}" role="button">
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
<!-- <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script> -->
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
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
            this.api().columns().every( function () {
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
                    // var val = $('<div/>').html(d).text();
                    // select.append( '<option value="' + val + '">' + val + '</option>' );
                } );
            } );
        }
    });

});
</script>
@endsection
