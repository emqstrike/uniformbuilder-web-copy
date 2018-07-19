@extends('administration-lte-2.lte-main')

@section('styles')

<style type="text/css">
li.select2-selection__choice {
    color: black !important;
}

</style>
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
                    @section('page-title', 'Colors Master List')
                    <h1>
                        Colors Master List
                    </h1>
                    <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table data-table table-bordered master-colors display' id="master_colors_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Color Code</th>
                            <th class="col-md-1"></th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

                    @forelse ($colors as $color)
                    <tr>
                        <td class="td-color-id">{{ $color->id }}</td>
                        <td class="td-color-name">{{ $color->name }}</td>
                        <td class="td-color-code">{{ $color->color_code }}</td>
                        <td class="col-md-1">
                            <center>
                                <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-record">Delete</a>
                            </center>
                        </td>
                    </tr>
                    @empty

                    @endforelse

                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@include('administration-lte-2.master-pages.colors.master-colors-modal')
@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function(){

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
    });

    window.delete_data_html = null;
    window.modal_action = null;

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-name').val();
        data.color_code = $('.input-color-code').val();
        if(window.modal_action == 'add'){
            var url = "//" + api_host + "/api/" + endpoint_version + "/master_color";
            addUpdateRecord(data, url);
        } else if(window.modal_action == 'update'){
            data.id =  $('.input-id').val();
            var url = "//" + api_host + "/api/" + endpoint_version + "/master_color/update";
            addUpdateRecord(data, url);
        }
        $('submit-new-record').attr('disabled', 'true');

    });

    $(document).on('click', '.add-record', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Color Information');
        $('.submit-new-record').text('Add Record');
        $('.input-name').val('');
        $(".input-color-code").val('');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Color Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-color-id').text();
        data.name = $(this).parent().parent().parent().find('.td-color-name').text();
        data.color_code = $(this).parent().parent().parent().find('.td-color-code').text();
        $('.input-id').val(data.id);
        $('.input-name').val(data.name);
        $('.input-color-code').val(data.color_code);
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-name').val('');
        $('.input-color-code').val('');
        $('submit-new-record').removeAttr('disabled');
    });

    $(document).on('click', '.delete-record',  function(e) {
        e.preventDefault();
        window.delete_data_html = '';
        window.delete_record_id = $(this).parent().parent().parent().find('.td-color-id').text();
        elem = `<table class="table table-bordered table-striped">
                <tr><td><h4>ID</h4></td><td>`+window.delete_record_id+`</td></tr>
                <tr><td><h4>Name</h4></td><td>`+$(this).parent().parent().parent().find('.td-color-name').text()+`</td></tr>
                <tr><td><h4>Color Code</h4></td><td>`+$(this).parent().parent().parent().find('.td-color-code').text()+`</td></tr>
                </table>`;
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

                    var url = "//" + api_host + "/api/" + endpoint_version + "/master_color/delete";
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
