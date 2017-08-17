@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>Parts Aliases</h3>
                    <a href="/administration/parts_aliases/add" class='btn btn-md btn-default parts-alias-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Sport</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($parts_aliases as $item)
                        <tr class='part-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                                {{$item->description}}    
                            </td>
                            <td>
                                {{$item->sport_name}}
                            </td>
                            <td class="td-buttons">
                                <a href="#" class="btn btn-default btn-xs " >
                                    <i class="glyphicon glyphicon-info-sign"> Info</i>
                                </a>
                                <a href="/administration/parts_aliases/edit/{{$item->id}}" class="edit-part btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-part btn btn-xs btn-danger" data-part-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>
                                
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='1'>
                                No Record
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
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/js/administration/parts-aliases.js"></script>
<script type="text/javascript">
$(document).ready(function(){
 $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection