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
                    @section('page-title', 'Fabrics Master List')

                    <h1>
                        Fabrics Master List
                    </h1>
                    <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
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
                                <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
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
<textarea id="fabrics_list" style="display: none;"><?php echo json_encode($fabrics, JSON_FORCE_OBJECT);?></textarea>
@include('administration-lte-2.master-pages.fabrics.fabrics-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript">
$(document).ready(function(){

window.delete_data_html = null;
window.modal_action = null;

$('.data-table').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": true,
});

x = _.pluck(JSON.parse($('#fabrics_list').text()), 'name');
$.each(x,function(i,item){
    if (item != null){
        x[i] = item.toLowerCase();
    }
});

$(document).on('keyup', '.input-name', function() {
    var name = $(this).val();
    validateFabricName(name.toLowerCase());
});

function validateFabricName(name){
    if(x.indexOf(name) != -1)
    {
        console.log('name taken');
        PNotify.removeAll();
        new PNotify({
            title: 'Error',
            text: 'Fabric Name Already Taken',
            type: 'error',
            hide: true
        });

        $('.submit-new-record').prop('disabled', true);
    } else {
        console.log('name available');
        $('.submit-new-record').prop('disabled', false);
    }
}

$("#myForm").submit(function(e) {
    e.preventDefault();
    var data = {};
    data.code = $('.input-code').val();
    data.brand_id = $('.input-brand-id').val();
    data.name = $('.input-name').val();
    data.factory_id = $('.input-factory-id').val();

    if(window.modal_action == 'add'){
        var url = "//" + api_host + "/api/" + endpoint_version + "/master_fabric";
        addUpdateRecord(data, url);
    } else if(window.modal_action == 'update'){
        data.id =  $('.input-id').val();
        var url = "//" + api_host + "/api/" + endpoint_version + "/master_fabric/update";
        addUpdateRecord(data, url);
    }
    $('.submit-new-record').attr('disabled', 'true');
});

    $("#myModal").on("hidden.bs.modal", function() {
        $('.submit-new-record').removeAttr('disabled');
    });

$(document).on('click', '.add-record', function(e) {
    e.preventDefault();
    window.modal_action = 'add';
    $('.modal-title').text('Add Fabric Information');
    $('.submit-new-record').text('Add Record');
    $('.input-code').val('');
    $('.input-brand-id').val('0');
    $('.input-name').val('');
    $('.input-factory-id').val('0');
});

$(document).on('click', '.edit-record', function(e) {
    e.preventDefault();
    window.modal_action = 'update';
    $('.modal-title').text('Edit Fabric Information');
    $('.submit-new-record').text('Update Record');
    var data = {};
    data.id = $(this).parent().parent().parent().find('.td-fabric-id').text();
    data.code = $(this).parent().parent().parent().find('.td-fabric-code').text();
    data.brand_id = $(this).parent().parent().parent().find('.td-fabric-brand-id').text();
    data.name = $(this).parent().parent().parent().find('.td-fabric-name').text();
    data.factory_id = $(this).parent().parent().parent().find('.td-fabric-factory-id').text();

    $('.input-id').val(data.id);
    $('.input-code').val(data.code);
    $('.input-brand-id').val(data.brand_id);
    $('.input-name').val(data.name);
    $('.input-factory-id').val(data.factory_id);
});

$(document).on('click', '.delete-record', function(e) {

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

function addUpdateRecord(data, url){
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json;',
        headers: {"accessToken": atob(headerValue)},
        success: function (data) {
            if(window.modal_action == 'add'){
                console.log('Successfully added record.');
            } else if(window.modal_action == 'update'){
                console.log('Successfully updated record.');
            }

            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

});
</script>
@endsection
