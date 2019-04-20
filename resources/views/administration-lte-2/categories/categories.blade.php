@extends('administration-lte-2.lte-main')

@section('styles')

<style type="text/css">
    .switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 27.2px;
    }
    .switch input {display:none;}
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20.08px;
      width: 20.08px;
      left: 3.2px;
      bottom: 3.2px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    input:checked + .slider {
      background-color: #39d2b4;
    }
    input:focus + .slider {
      box-shadow: 0 0 1px #77dd77;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(20.08px);
      -ms-transform: translateX(20.08px);
      transform: translateX(20.08px);
    }

    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }

</style>

@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Uniform Categories')
                    <h1>
                        <span class="fa fa-soccer-ball-o"></span>
                        Uniform Categories
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered categories display' id='uniform_categories'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th class="no-sort">Name</th>
                            <th class="no-sort">Code</th>
                            <th class="no-sort">Men</th>
                            <th class="no-sort">Women</th>
                            <th>Men's Ordering</th>
                            <th>Women's Ordering</th>
                            <th id="select-filter" class="no-sort">Type</th>
                            <th class="no-sort">Active</th>
                            <th id="select-filter" class="no-sort">Active Type</th>
                            <th class="no-sort">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($categories as $category)

                        <tr class='category-{{ $category->id }}'>
                            <td class="td-category-id col-md-1">{{ $category->id }}</td>
                            <td class="td-category-name col-md-1">{{ $category->name }}</td>
                            <td class="td-category-code col-md-1">{{ $category->code }}<input type="hidden" class="td-category-alias" value="{{ $category->alias }}"></td>
                            <td align="center"><input type="hidden" name="" class="td-category-thumbnail-male" value="{{ $category->thumbnail_male }}">
                            @if ($category->thumbnail_male)
                                <img src="{{ $category->thumbnail_male }}" style="height: 100px; width: 110px;">
                            @else
                                <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/categories/Test/thumbnail_male.png/staging/test/thumbnail.jpg" style="height: 100px; width: 110px;">
                            @endif
                            <br>
                            <label class="switch">
                                <input type="checkbox" class="toggle-active-thumb" data-category-id="{{ $category->id }}" data-field="active_male" {{ ($category->active_male) ? 'checked' : '' }}>
                                <span class="slider round"></span>
                            </label>
                            </td>
                            <td align="center"><input type="hidden" name="" class="td-category-thumbnail-female" value="{{ $category->thumbnail_female }}">
                            @if ($category->thumbnail_female)
                                <img src="{{ $category->thumbnail_female }}" style="height: 100px; width: 110px;">
                            @else
                                <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/categories/Test/thumbnail_male.png/staging/test/thumbnail.jpg" style="height: 100px; width: 110px;">
                            @endif
                            <br>
                            <label class="switch">
                                <input type="checkbox" class="toggle-active-thumb" data-category-id="{{ $category->id }}" data-field="active_female" {{ ($category->active_female) ? 'checked' : '' }}>
                                <span class="slider round"></span>
                            </label>
                            </td>
                            <td class="td-category-sort-men col-md-1">{{ $category->sort_order_male }}</td>
                            <td class="td-category-sort-women col-md-1">{{ $category->sort_order_female }}</td>
                            <td class="td-category-type col-md-1">{{ $category->type }}</td>
                            <td>
                                <div class="onoffswitch">
                                    <label class="switch">
                                      <input type="checkbox" class="onoffswitch-checkbox toggle-category" data-category-id="{{ $category->id }}" {{ ($category->active) ? 'checked' : '' }}>
                                      <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="td-active-type col-md-1">{{ $category->active_type }}</td>
                            <td class="col-md-2">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-category" data-category-id="{{ $category->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='11'>
                                No Category
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

@include('administration-lte-2.categories.categories-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-category-id').val('');
        $('.input-category-name').val('');
        $('.input-category-alias').val('');
        $('.input-category-type').val('');
        $('input-category-type').val('');
        $('.input-active-type').val('');
        $('.sort-order-male').val('');
        $('.sort-order-female').val('');
        $('.thumbnail_male').empty();
        $('.thumbnail_female').empty();
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Uniform Category Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Uniform Category Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-category-id').text();
        data.name = $(this).parent().parent().parent().find('.td-category-name').text();
        data.code = $(this).parent().parent().parent().find('.td-category-code').text();
        data.alias = $(this).parent().parent().parent().find('.td-category-alias').val();
        data.type = $(this).parent().parent().parent().find('.td-category-type').text();
        data.active_type = $(this).parent().parent().parent().find('.td-active-type').text();
        data.thumbnail_male = $(this).parent().parent().parent().find('.td-category-thumbnail-male').val();
        data.thumbnail_female = $(this).parent().parent().parent().find('.td-category-thumbnail-female').val();
        data.sort_order_male = $(this).parent().parent().parent().find('.td-category-sort-men').text();
        data.sort_order_female = $(this).parent().parent().parent().find('.td-category-sort-women').text();

        if(data.thumbnail_male != '') {
            var mElem = '';
            mElem += `<img src="`+ data.thumbnail_male +`" style="height: 100px; width: 110px;">
                          <a href="#" class="btn btn-danger btn-xs btn-flat delete-category-image" data-category-id="`+ data.id +`" data-field="thumbnail_male" role="button">
                              Delete
                          </a>`;
        }
        $('.thumbnail_male').append(mElem);

        if(data.thumbnail_female != '') {
            var fElem = '';
            fElem += `<img src="`+ data.thumbnail_female +`" style="height: 100px; width: 110px;">
                          <a href="#" class="btn btn-danger btn-xs btn-flat delete-category-image" data-category-id="`+ data.id +`" data-field="thumbnail_female" role="button">
                              Delete
                          </a>`;
        }
        $('.thumbnail_female').append(fElem);

        $('.input-category-id').val(data.id);
        $('.input-category-name').val(data.name);
        $('.input-category-alias').val(data.alias);
        $('.input-category-code').val(data.code);
        $('.input-category-type').val(data.type);
        $('.input-active-type').val(data.active_type);
        $('.sort-order-male').val(data.sort_order_male);
        $('.sort-order-female').val(data.sort_order_female);
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-category-name').val();
        data.alias = $('.input-category-alias').val();
        data.code = $('.input-category-code').val();
        data.type = $('.input-category-type').find(":selected").val();
        data.active_type = $('.input-active-type').find(":selected").val();
        data.sizes = $('.sizes_props').val();
        data.sort_order_male = $('.sort-order-male').val();
        data.sort_order_female = $('.sort-order-female').val();

        var formData = new FormData();
        var male_th_file = null;
        var female_th_file = null;

        try {
            var male_thumbnail = $('.male-thumbnail-file')[0].files[0];
            if(male_thumbnail != undefined) {
                formData.append('file', male_thumbnail);
                fileUpload(formData, function (filename) { male_th_file = filename });
            }

        } catch(err) {
            console.log(err.message);
        }
        try {
            var female_thumbnail = $('.female-thumbnail-file')[0].files[0];
            if(female_thumbnail != undefined) {
                formData.append('file', female_thumbnail);
                fileUpload(formData, function (filename) { female_th_file = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        if(male_th_file != null) {
            data.thumbnail_male = male_th_file;
        }
        if(female_th_file != null) {
            data.thumbnail_female = female_th_file;
        }

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/category";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-category-id').val();
            var url = "//" + api_host +"/api/category/update";
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

    $(document).on('click', '.delete-category', function(e){
        e.preventDefault();
        var id = $(this).data('category-id');
        modalConfirm('Remove Uniform Category', 'Are you sure you want to delete the category?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/category/delete";
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

    $(document).on('click', '.toggle-category', function(e){
        e.preventDefault();
        var id = $(this).data('category-id');
        var url = "//" + api_host + "/api/category/toggle";
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
                    window.location.reload();
                    var elem = '.category-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

    $(document).on('click', '.toggle-active-thumb', function(e){
        e.preventDefault();
        var id = $(this).data('category-id');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/category/toggleThumbnail";
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
                    window.location.reload();
                    var elem = '.category-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

    $(document).on('click', '.delete-category-image', function(e){
        e.preventDefault();
        var id =  $(this).data('category-id');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/categories/deleteImage";
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

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "columnDefs": [
            { "orderable": false, "targets": "no-sort" }
        ],
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

});
</script>
@endsection
