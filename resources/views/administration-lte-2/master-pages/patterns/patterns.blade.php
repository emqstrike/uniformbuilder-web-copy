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
                    @section('page-title', 'Patterns Master List')
                    <h1>
                        Patterns Master List
                    </h1>
                    <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table data-table table-bordered master-patterns display' id="master_patterns_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Category ID</th>
                            <th class="col-md-1"></th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

                    @forelse ($patterns as $pattern)
                    <tr>
                        <td class="td-pattern-id">{{ $pattern->id }}</td>
                        <td class="td-pattern-brand-id">{{ $pattern->brand_id }}</td>
                        <td class="td-pattern-name">{{ $pattern->name }}</td>
                        <td class="td-pattern-category">{{ $pattern->sports }}</td>
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
@include('administration-lte-2.master-pages.patterns.patterns-modal')
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
    window.categories = null;

    getUniformCategoies(function(categories){
        window.categories = categories;
    });
    loadUniformCategories();

    $('.input-uniform-category-id').select2({
        placeholder: "Category",
        multiple: true,
        allowClear: true
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.brand_id = $('.input-brand-id').val();
        data.name = $('.input-name').val();
        var sports = $('#category_value').val();
        data.sports = sports.split(",");
        if(window.modal_action == 'add'){
            var url = "//" + api_host + "/api/" + endpoint_version + "/master_pattern";
            addUpdateRecord(data, url);
        } else if(window.modal_action == 'update'){
            data.id =  $('.input-id').val();
            var url = "//" + api_host + "/api/" + endpoint_version + "/master_pattern/update";
            addUpdateRecord(data, url);
        }
        $('.submit-new-record').attr('disabled', 'true');
    });

    $(document).on('click', '.add-record', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Pattern Information');
        $('.submit-new-record').text('Add Record');
        $('.input-brand-id').val('0');
        $('.input-name').val('');
        $('#category_value').val('')
        $(".input-uniform-category-id").val("");
        $(".input-uniform-category-id").trigger("change");
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Pattern Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-pattern-id').text();
        data.brand_id = $(this).parent().parent().parent().find('.td-pattern-brand-id').text();
        data.name = $(this).parent().parent().parent().find('.td-pattern-name').text();
        sports = $(this).parent().parent().parent().find('.td-pattern-category').text();
        sports_value = sports.replace(/[\[\]'"]+/g, '');
        data.sports = sports_value;
        $('.input-id').val(data.id);
        $('.input-brand-id').val(data.brand_id);
        $('.input-name').val(data.name);
        $('#category_value').val(sports_value);
        $(".input-uniform-category-id").val(sports_value.split(','));
        $(".input-uniform-category-id").trigger("change");
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-brand-id').val('0');
        $('.input-name').val('');
        $('#category_value').val('');
        $(".input-uniform-category-id").val("");
        $(".input-uniform-category-id").trigger("change");
        $('.submit-new-record').removeAttr('disabled');
    });


    $(document).on('click', '.delete-record',  function(e) {
        e.preventDefault();
        window.delete_data_html = '';
        window.delete_record_id = $(this).parent().parent().parent().find('.td-pattern-id').text();
        elem = `<table class="table table-bordered table-striped">
                <tr><td><h4>ID</h4></td><td>`+window.delete_record_id+`</td></tr>
                <tr><td><h4>Name</h4></td><td>`+$(this).parent().parent().parent().find('.td-pattern-name').text()+`</td></tr>
                <tr><td><h4>Brand</h4></td><td>`+$(this).parent().parent().parent().find('.td-pattern-brand-id').text()+`</td></tr>
                <tr><td><h4>Category ID</h4></td><td>`+$(this).parent().parent().parent().find('.td-pattern-category').text()+`</td></tr>
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

                    var url = "//" + api_host + "/api/" + endpoint_version + "/master_pattern/delete";
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

    function loadUniformCategories() {
        var category_elem = "";
        _.each(window.categories, function(category) {
            category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
        });
        $('.input-uniform-category-id').append(category_elem);
    }

    function getUniformCategoies(callback){
        var categories;
        var url = "//" +api_host+ "/api/categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                categories = data['categories'];
                if(typeof callback === "function") callback(categories);
            }
        });
    }

    $(".input-uniform-category-id").change(function() {
        $('#category_value').val($(this).val());
    });

});
</script>
@endsection
