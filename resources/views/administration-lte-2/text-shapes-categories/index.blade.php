@extends('administration-lte-2.lte-main')

@section('styles')
<style type="text/css">
</style>
@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Text Shape Categories')
                    <h2>
                        <span class="glyphicon glyphicon-stats"></span>
                        Text Shape Categories
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h2>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($text_shapes_categories as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="col-md-1">{{ $item->name }}<input type="hidden" name="name" class="td-item-name" value="{{ $item->name}}"></td>
                            <td class="col-md-2">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='3'>
                                No data to display
                            </td>
                        </tr>
                    @endforelse

                    </tbody>
                    <tfoot>
                        <tr>
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
@include('administration-lte-2.text-shapes-categories.tsc-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;

    $("#myModal").on("hidden.bs.modal", function() {
        $('.name').val('');
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Text Shape Category');
        $('.submit-new-record').text('Submit');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Text Shape Category');
        $('.submit-new-record').text('Update');
        var data = {};
        var parentEl = $(this).parent().parent().parent();

        data.id = parentEl.find('.td-item-id').text();
        data.name = parentEl.find('.td-item-name').val();

        $('.input-item-id').val(data.id);
        $('.name').val(data.name);
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.name').val();

        var formData = new FormData();

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/v1-0/text_shapes_category";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/v1-0/text_shapes_category/update";
        }

        addUpdateRecord(data, url);
        $('.submit-new-record').attr('disabled', 'true');
    });

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

    $(document).on('click', '.delete-item', function() {
       var id = [];
       id.push( $(this).data('item-id'));
       modalConfirm('Remove Text Shape Category', 'Are you sure you want to delete the item?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/text_shapes_category/delete";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
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
    });

    try {
        $('.data-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false,
            "pageLength" : 15,
            "stateSave": true,
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
    } catch(e) {
        console.log(e.message);
    }

});
</script>
@endsection
