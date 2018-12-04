@extends('administration-lte-2.lte-main')
@section('styles')
<style type="text/css">

</style>
@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Points of Measures')
                    <h1>
                        <span class="fa fa-arrows"></span>
                        Master Point of Measure
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table-bordered points-of-measures' id='points-of-measures'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th width="30%">Name</th>
                            <th> + Tolerance</th>
                            <th> - Tolerance</th>
                            <th>Image</th>
                            <th>Video</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($points_of_measures as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="td-item-number col-md-1">{{ $item->pom_number }}</td>
                            <td class="td-item-name col-md-1">{{ $item->name }}</td>
                            <td class="td-item-plus-tol col-md-1">{{ $item->plus_tolerance }}</td>
                            <td class="td-item-minus-tol col-md-1">{{ $item->minus_tolerance }}</td>
                            <td>
                                <input type="hidden" class="td-item-image" value="{{ $item->image_link }}">
                                <a href="#" class="btn btn-defult btn-md file-link" data-link="{{ $item->image_link }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                            </td>
                            <td class="td-item-video col-md-1">{{ $item->video_link }}</td>
                            <td class="col-md-2">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='8'>
                                No Points of Measure
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
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@include('administration-lte-2.points-of-measures.points-of-measures-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-item-id').val('');
        $('.input-item-name').val('');
        $('.input-item-number').val('');
        $('.input-item-plus-tol').val('');
        $('.input-item-minus-tol').val('');
        $('.input-item-video').val('');
        $('.image_link').empty();
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Points of Measure Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Points of Measure Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-item-id').text();
        data.name = $(this).parent().parent().parent().find('.td-item-name').text();
        data.pom_number = $(this).parent().parent().parent().find('.td-item-number').text();
        data.plus_tolerance = $(this).parent().parent().parent().find('.td-item-plus-tol').text();
        data.minus_tolerance = $(this).parent().parent().parent().find('.td-item-minus-tol').text();
        data.image_link = $(this).parent().parent().parent().find('.td-item-image').val();
        data.video_link = $(this).parent().parent().parent().find('.td-item-video').text();

        var elem = '';
        if(data.image_link != '') {
        elem += `<img src="`+ data.image_link +`" style="height: 100px; width: 110px;">
                      <a href="#" class="btn btn-danger btn-xs btn-flat delete-image" data-id="`+ data.id +`" data-field="image_link" role="button">
                          Delete
                      </a>`;
        }

        $('.image_link').append(elem);

        $('.input-item-id').val(data.id);
        $('.input-item-name').val(data.name);
        $('.input-item-number').val(data.pom_number);
        $('.input-item-plus-tol').val(data.plus_tolerance);
        $('.input-item-minus-tol').val(data.minus_tolerance);
        $('.input-item-video').val(data.video_link);

    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-item-name').val();
        data.pom_number = $('.input-item-number').val();
        data.plus_tolerance = $('.input-item-plus-tol').val();
        data.minus_tolerance = $('.input-item-minus-tol').val();
        data.video_link = $('.input-item-video').val();

        var formData = new FormData();
        var image_file = null;

        try {
            var image = $('.image-file')[0].files[0];
            if(image != undefined) {
                formData.append('file', image);
                fileUpload(formData, function (filename) { image_file = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        if(image_file != null) {
            data.image_link = image_file;
        }

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/v1-0/points_of_measure";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/v1-0/points_of_measure/update";
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
       modalConfirm('Remove Points of Measure', 'Are you sure you want to delete the measure?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/points_of_measure/delete";
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

    $(document).on('click', '.delete-image', function(e){
        e.preventDefault();
        var id =  $(this).data('id');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/v1-0/points_of_measure/deleteImage";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                }
            }
        });
    });

    function fileUpload(postData, callback){
        var file;
        $.ajax({
            url: "//" + api_host + "/api/v1-0/file/uploader",
            type: "POST",
            data: postData,
            processData: false,
            contentType: false,
            crossDomain: true,
            async: false,
            headers: {"accessToken": atob(headerValue)},
            success: function (data) {
                if(data.success){
                    file = data.file;
                    if(typeof callback === "function") callback(file);

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    };

    $('.file-link').on('click', function(e){
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
    }

    try {
        $('.data-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false,
            "pageLength" : 15
        });
    } catch(e) {
        console.log(e.message);
    }

});
</script>
@endsection
