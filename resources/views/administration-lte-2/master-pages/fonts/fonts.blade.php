@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('custom-styles')

@endsection

@section('content')
<style type="text/css">
    .bootstrap-table{
    overflow-y: scroll;
    max-height: 636px;
}

</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Fonts Master List')
                    
                    <h1>
                        Fonts Master List
                    </h1>
                    <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table data-table table-bordered fonts' id="fonts_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sports</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($fonts as $font)

                    <tr>
                        <td class="td-font-id">{{ $font->id }}</td>
                        <td class="td-font-name">{{ $font->name }}</td>
                        <td class="td-font-sports">{{ $font->sports }}</td>
                        <td class="col-md-1">
                            <center>
                                <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-record">Delete</a>
                            </center>
                        </td>
                    </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Font Data Found
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
@include('administration-lte-2.master-pages.fonts.fonts-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
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

$("#myForm").submit(function(e) {
    e.preventDefault();
    var data = {};
    data.name = $('.input-name').val();
    data.sports = $('.input-sports').val();

    if(window.modal_action == 'add'){
        var url = "//" + api_host + "/api/" + endpoint_version + "/master_font";
        addUpdateRecord(data, url);
    } else if(window.modal_action == 'update'){
        data.id =  $('.input-id').val();
        var url = "//" + api_host + "/api/" + endpoint_version + "/master_font/update";
        addUpdateRecord(data, url);
    }
});

$(document).on('click', '.add-record', function(e) {
    e.preventDefault();
    window.modal_action = 'add';
    $('.modal-title').text('Add Font Information');
    $('.submit-new-record').text('Add Record');
    $('.input-name').val('');
    $('.input-sports').val('');
});

$(document).on('click', '.edit-record', function(e) {
    e.preventDefault();
    window.modal_action = 'update';
    $('.modal-title').text('Edit Font Information');
    $('.submit-new-record').text('Update Record');
    var data = {};
    data.id = $(this).parent().parent().parent().find('.td-font-id').text();
    data.name = $(this).parent().parent().parent().find('.td-font-name').text();
    data.sports = $(this).parent().parent().parent().find('.td-font-sports').text();

    $('.input-id').val(data.id);
    $('.input-name').val(data.name);
    $('.input-sports').val(data.sports);
});

$(document).on('click', '.delete-record', function(e) {

    window.delete_data_html = '';
    window.delete_record_id = $(this).parent().parent().parent().find('.td-font-id').text();
    elem = `<table class="table table-bordered table-striped">`+
            `<tr><td><h4>ID</h4></td><td>`+window.delete_record_id+`</td></tr>`+
            `<tr><td><h4>Name</h4></td><td>`+$(this).parent().parent().parent().find('.td-font-name').text()+`</td></tr>`+
            `<tr><td><h4>Sports</h4></td><td>`+$(this).parent().parent().parent().find('.td-font-sports').text()+`</td></tr>`+
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

                var url = "//" + api_host + "/api/" + endpoint_version + "/master_font/delete";
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
                 if(data.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Warning',
                        text: data.message,
                        type: 'warning',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: data.message,
                        type: 'error',
                        hide: true
                    });
                }
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
            if(data.success){
                window.location.reload();
                new PNotify({
                    title: 'Success',
                    text: data.message,
                    type: 'success',
                    hide: true
                });
            } else {
                new PNotify({
                    title: 'Error',
                    text: data.message,
                    type: 'error',
                    hide: true
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

});
</script>
@endsection
