@extends('administration-lte-2.lte-main')

@section('styles')
@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Mascot Sizes')
                    <h1>
                        <span class="fa fa-arrows"></span>
                        Mascot Sizes
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered mascot-sizes display' id='mascot-sizes'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Block Pattern</th>
                            <th>Options</th>
                            <th id="select-filter">Type</th>
                            <th id="select-filter">Brand</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($mascot_sizes as $size)

                        <tr class='size-{{ $size->id }}'>
                            <td class="td-size-id col-md-1">{{ $size->id }}</td>
                            <td class="td-size-name col-md-1">{{ $size->name }}</td>
                            <td class="col-md-1">{{ $size->sport }}<input type="hidden" name="" class="td-size-sport" value="{{ $size->uniform_category_id}}"></td>
                            <td class="td-size-block-pattern col-md-1">{{ $size->block_patterns }}</td>
                            <td class="td-size-option col-md-2">{{ $size->block_pattern_options }}</td>
                            <td class="td-size-type col-md-1">{{ $size->type }}</td>
                            <td class="td-size-brand col-md-1">{{ $size->brand }}</td>
                            <td class="td-size-brand col-md-1">{{ $size->active }}</td>
                            <td class="col-md-2">
                                <textarea name="size_props" class="td-size-props" style="display:none;">{{ $size->properties }}</textarea>
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="duplicate-mascot-size btn btn-flat btn-sm btn-default" data-mascot-size-id="{{ $size->id }}" data-mascot-size-name="{{ $size->name }}" role="button">Clone</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-size" data-size-id="{{ $size->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='9'>
                                No Price Item
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
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('administration-lte-2.mascots.mascot-sizes-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.categories = null;
    window.block_patterns = null;

    loadUniformCategories();

    // $("#myModal").on("hidden.bs.modal", function() {
    //     $('.input-size-name').val('');
    //     $('.sport').val('none');
    //     $('.sport').trigger('change');
    //     $('.block-pattern-val').val('');
    //     $('#block_pattern').val('');
    //     $('.neck-option-val').val('');
    //     $('#neck_option').val('');
    //     $('.input-size-type').val('');
    //     $('.uniform-application-type').val('');
    //     $('.input-brand').val('');
    //     $('#properties').val('');
    //     $('.properties-content').empty();
    //     $('.submit-new-record').removeAttr('disabled');
    // });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Mascot Sizes Information');
        $('.submit-new-record').text('Add Record');
    });

    // $(document).on('click', '.edit-record', function(e) {
    //     e.preventDefault();
    //     window.modal_action = 'update';
    //     $('.modal-title').text('Edit Application Size Information');
    //     $('.submit-new-record').text('Update Record');
    //     var data = {};
    //     data.id = $(this).parent().parent().parent().find('.td-size-id').text();
    //     data.name = $(this).parent().parent().parent().find('.td-size-name').text();
    //     data.uniform_category_id = $(this).parent().parent().parent().find('.td-size-sport').val();
    //     var raw_bp = $(this).parent().parent().parent().find('.td-size-block-pattern').text();
    //     data.block_pattern = raw_bp.replace(/[\[\]'"]+/g, '');
    //     var raw_bpo = $(this).parent().parent().parent().find('.td-size-option').text();
    //     data.neck_option = raw_bpo.replace(/[\[\]'"]+/g, '');
    //     data.type = $(this).parent().parent().parent().find('.td-size-type').text();
    //     data.uniform_application_type = $(this).parent().parent().parent().find('.td-size-uniform-application-type').text();
    //     data.brand = $(this).parent().parent().parent().find('.td-size-brand').text();
    //     data.properties = JSON.parse($(this).parent().parent().parent().find('.td-size-props').val());

    //     $('.input-size-id').val(data.id);
    //     $('.input-size-name').val(data.name);
    //     $('.sport').val(data.uniform_category_id).trigger('change');
    //     $('.block-pattern-val').val(data.block_pattern);
    //     $('#block_pattern').val(JSON.parse(raw_bp)).trigger('change');
    //     $('.neck-option-val').val(data.neck_option);
    //     $('#neck_option').val(JSON.parse(raw_bpo)).trigger('change');
    //     $('.input-size-type').val(data.type);
    //     $('.uniform-application-type').val(data.uniform_application_type);
    //     $('.input-brand').val(data.brand);
    //     $('#properties').val(data.properties);
    //     loadConfigurations(data.properties);
    // });

    // $("#myForm").submit(function(e) {
    //     e.preventDefault();
    //     var data = {};
    //     data.name = $('.input-size-name').val();
    //     data.uniform_category_id = $('.sport').find(":selected").val();
    //     var raw_bp = $('.block-pattern-val').val();
    //     data.block_pattern = raw_bp.split(",");
    //     var raw_bpo = $('.neck-option-val').val();
    //     data.neck_option = raw_bpo.split(",");
    //     data.type = $('.input-size-type').find(":selected").val();
    //     data.uniform_application_type = $('.uniform-application-type').find(":selected").val();
    //     data.brand = $('.input-brand').find(":selected").val();
    //     data.properties = $('#properties').val();

    //     if(window.modal_action == 'add'){
    //         var url = "//" + api_host +"/api/application_size";
    //     } else if(window.modal_action == 'update')  {
    //         data.id = $('.input-size-id').val();
    //         var url = "//" + api_host +"/api/application_size/update";
    //     }

    //     addUpdateRecord(data, url);
    //     $('.submit-new-record').attr('disabled', 'true');
    // });

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
    };

    // $(document).on('click', '.delete-size', function() {
    //    var id = [];
    //    id.push( $(this).data('size-id'));
    //    modalConfirm('Remove Application Size', 'Are you sure you want to delete the application size?', id);
    // });

    // $('#confirmation-modal .confirm-yes').on('click', function(){
    //     var id = $(this).data('value');
    //     var url = "//" + api_host + "/api/application_size/delete";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function (data) {
    //         if(data.success){
    //                 window.location.reload();
    //                 new PNotify({
    //                     title: 'Warning',
    //                     text: data.message,
    //                     type: 'warning',
    //                     hide: true
    //                 });
    //             } else {
    //                 new PNotify({
    //                     title: 'Error',
    //                     text: data.message,
    //                     type: 'error',
    //                     hide: true
    //                 });
    //             }
    //         },
    //             error: function (xhr, ajaxOptions, thrownError) {
    //         }
    //     });
    // });

    $(document).on('click', '.duplicate-application-size', function(e){
        e.preventDefault();
        var id = $(this).data('application-size-id');
        var name = $(this).data('application-size-name');
        modalConfirm(
            'Duplicate Application Size',
            'Are you sure you want to duplicate the Application Size: '+ name +'?',
            id,
            'confirm-yes',
            'confirmation-modal-duplicate-application-size'
        );
    });

    $('#confirmation-modal-duplicate-application-size .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/application_size/duplicate";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal').modal('hide');
                    window.location.reload(true);
                }
            }
        });
    });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "pageLength" : 15,
        initComplete: function () {
        this.api().columns('#select-filter').every( function () {
            var column = this;
            var select = $(`<select><option value=""></option></select>`)
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

                select.append( `<option value="`+d+`">`+d+`</option>` );
            } );
        } );
    }
    });

    function loadUniformCategories() {
        var category_elem = "";
        _.each(window.categories, function(category) {
            category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
        });
        $('.sport').append(category_elem);
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

    function getBlockPatterns(callback){
            var block_patterns;
            var url = "//" +api_host+ "/api/block_patterns";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    block_patterns = data['block_patterns'];
                    if(typeof callback === "function") callback(block_patterns);
                }
            });
    }

});
</script>
@endsection
