@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('custom-styles')

@endsection

@section('content')

</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Fabrics Master List
                    </h1>
                    <a href="#" class="btn btn-success btn-sm btn-flat" data-target="#myModalNorm" data-toggle="modal">Add</a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table data-table table-bordered master-fabrics' id="master_fabrics_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Factory</th>
                            <th class="col-md-1"></th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

                    @forelse ($fabrics as $fabric)

                    <tr>
                        <td class="td-fabric-id">{{ $fabric->id }}</td>
                        <td class="td-fabric-code">{{ $fabric->code }}</td>
                        <td class="td-fabric-brand-id">{{ $fabric->brand_id }}</td>
                        <td class="td-fabric-name">{{ $fabric->name }}</td>
                        <td class="td-fabric-factory-id">{{ $fabric->factory_id }}</td>
                        <td class="col-md-1">
                            <center>
                                <a href="#" class="btn btn-primary btn-sm btn-flat">Edit</a>
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-record">Delete</a>
                            </center>
                        </td>
                    </tr>

                    @empty

                        <tr>
                            <td colspan='6'>
                                No Fabric Data Found
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

@endsection

@include('administration-lte-2.master-pages.fabrics.fabrics-modal')

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

window.delete_data_html = null;
$('.data-table').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": true
});

$('.submit-new-record').on('click', function(e){
    e.preventDefault();
    var data = {};
    data.code = $('.input-code').val();
    data.brand_id = $('.input-brand-id').val();
    data.name = $('.input-name').val();
    data.factory_id = $('.input-factory-id').val();

    var url = "//" + api_host + "/api/" + endpoint_version + "/master_fabric";

    deleteRecord(data, url);
});

$('.delete-record').on('click', function(e){

    window.delete_data_html = '';
    window.delete_record_id = $(this).parent().parent().parent().find('.td-fabric-id').text();
    elem = `<table class="table table-bordered table-striped">`+
            `<tr><td><h4>ID</h4></td><td>`+window.delete_record_id+`</td></tr>`+
            `<tr><td><h4>Code</h4></td><td>`+$(this).parent().parent().parent().find('.td-fabric-code').text()+`</td></tr>`+
            `<tr><td><h4>Name</h4></td><td>`+$(this).parent().parent().parent().find('.td-fabric-name').text()+`</td></tr>`+
            `<tr><td><h4>Brand</h4></td><td>`+$(this).parent().parent().parent().find('.td-fabric-brand-id').text()+`</td></tr>`+
            `<tr><td><h4>Factory</h4></td><td>`+$(this).parent().parent().parent().find('.td-fabric-factory-id').text()+`</td></tr>`+
            `</table>`;
    window.delete_data_html = elem;

    bootbox.confirm({
        size: "medium",
        title: "Delete Record?",
        message: window.delete_data_html,
        buttons: {
            'cancel': {
                label: 'Cancel'
            },
            'confirm': {
                label: 'Delete',
                className: 'btn-danger pull-right'
            }
        },
        callback: function(result){
            if(result){
                bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
                
                var url = "//" + api_host + "/api/" + endpoint_version + "/master_fabric/delete";
                var data = {};
                data.id = window.delete_record_id;

                deleteRecord(data, url);
            } else {
                console.log('Deletion Canceled.');
            }
        }
    });
});

function deleteRecord(data, url){
    console.log(data);
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json;',
        headers: {"accessToken": atob(headerValue)},
        success: function (data) {
            console.log('Successfully deleted record.');
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function addRecord(data, url){
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json;',
        headers: {"accessToken": atob(headerValue)},
        success: function (data) {
            console.log('Successfully added record.');
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

});
</script>
@endsection
