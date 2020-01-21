@extends('administration-lte-2.lte-main')

@section('styles')
<style type="text/css">
    .select2-container--default
    .select2-selection--multiple
    .select2-selection__choice
    {
        color:black;
    }
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
</style>
@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Text Shapes')
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
                            <th>Code</th>
                            <th>Alias</th>
                            <th>Thumbnail</th>
                            <th>Font Name</th>
                            <th>Curve</th>
                            <th>Offset Y</th>
                            <th>Text Height</th>
                            <th>Bottom</th>
                            <th>Font Size</th>
                            <th>Is Active</th>
                            <th>Text Shapes Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($text_shapes as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="col-md-1">{{ $item->code }}<input type="hidden" name="code" class="td-item-code" value="{{ $item->code}}"></td>
                            <td class="col-md-1">{{ $item->alias }}<input type="hidden" name="alias" class="td-item-alias" value="{{ $item->alias}}"></td>
                            <td class="col-md-1">
                                <input type="hidden" name="" class="td-item-thumbnail" value="{{ $item->thumbnail }}">
                                @if (! is_null($item->thumbnail) && $item->thumbnail !== '' )
                                <a href="{{ $item->thumbnail }}" target="_blank">
                                    <span class="fa fa-image"></span>
                                </a>
                                @endif
                            </td>
                            <td class="col-md-1">{{ $item->font_name }}<input type="hidden" name="font_name" class="td-item-font-name" value="{{ $item->font_name}}"></td>
                            <td class="col-md-1">{{ $item->curve }}<input type="hidden" name="curve" class="td-item-curve" value="{{ $item->curve}}"></td>
                            <td class="col-md-1">{{ $item->offset_y }}<input type="hidden" name="offset_y" class="td-item-offset-y" value="{{ $item->offset_y}}"></td>
                            <td class="col-md-1">{{ $item->text_height }}<input type="hidden" name="text_height" class="td-item-text-height" value="{{ $item->text_height}}"></td>
                            <td class="col-md-1">{{ $item->bottom }}<input type="hidden" name="bottom" class="td-item-bottom" value="{{ $item->bottom}}"></td>
                            <td class="col-md-1">{{ $item->font_size }}<input type="hidden" name="font_size" class="td-item-font-size" value="{{ $item->font_size}}"></td>
                            <td class="col-md-1">{{ $item->is_active ? 'Yes' : 'No' }}<input type="hidden" name="is_active" class="td-item-is-active" data-checked="{{ $item->is_active}}"></td>
                            <td class="col-md-1">{{ isset($item->text_shapes_category_id) ? $item->text_shapes_category->name : '' }}<input type="hidden" name="text_shapes_category_id" class="td-item-text-shapes-categories" value="{{ $item->text_shapes_category_id}}"></td>
                            <td class="col-md-2">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='13'>
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
@include('administration-lte-2.text-shapes.ts-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.text_shapes_categories = null;
    
    getUniformCategories();
    
    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-code').val('');
        $('.input-alias').val('');
        $('.input-thumbnail').val('');
        $('.thumbnail-prev').empty();
        $('.input-font-name').val('');
        $('.input-curve').val('');
        $('.input-offset-y').val('');
        $('.input-text-height').val('');
        $('.input-bottom').val('');
        $('.input-font-size').val('');
        $('.input-is-active').prop('checked', false);
        $('.text-shapes-categories').val('');
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Text Shape');
        $('.submit-new-record').text('Submit');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Text Shape');
        $('.submit-new-record').text('Update');
        var data = {};
        var parentEl = $(this).parent().parent().parent();

        data.id = parentEl.find('.td-item-id').text();
        data.code = parentEl.find('.td-item-code').val();
        data.alias = parentEl.find('.td-item-alias').val();
        data.thumbnail = parentEl.find('.td-item-thumbnail').val();
        data.font_name = parentEl.find('.td-item-font-name').val();
        data.curve = parentEl.find('.td-item-curve').val();
        data.offset_y = parentEl.find('.td-item-offset-y').val();
        data.text_height = parentEl.find('.td-item-text-height').val();
        data.bottom = parentEl.find('.td-item-bottom').val();
        data.font_size = parentEl.find('.td-item-font-size').val();
        data.is_active = parentEl.find('.td-item-is-active').data('checked') ? true : false;
        data.text_shapes_category_id = parentEl.find('.td-item-text-shapes-categories').val();

        $('.input-item-id').val(data.id);
        $('.input-code').val(data.code);
        $('.input-alias').val(data.alias);
        $('.input-font-name').val(data.font_name);
        $('.input-curve').val(data.curve);
        $('.input-offset-y').val(data.offset_y);
        $('.input-text-height').val(data.text_height);
        $('.input-bottom').val(data.bottom);
        $('.input-font-size').val(data.font_size);
        $('.input-is-active').prop('checked', data.is_active);
        $('.text-shapes-categories').val(data.text_shapes_category_id);

        if(data.thumbnail != '') {
            var mElem = '';
            mElem += `<img src="`+ data.thumbnail +`" style="height: 100px; width: 110px;">
                          <a href="#" class="btn btn-danger btn-xs btn-flat delete-category-image" data-category-id="`+ data.id +`" data-field="thumbnail-prev" role="button">
                              Delete
                          </a>`;
        }
        $('.thumbnail-prev').append(mElem);
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.code = $('.input-code').val();
        data.alias = $('.input-alias').val();
        // data.thumbnail = $('.input-thumbnail').val();
        data.font_name = $('.input-font-name').val();
        data.curve = $('.input-curve').val();
        data.offset_y = $('.input-offset-y').val();
        data.text_height = $('.input-text-height').val();
        data.bottom = $('.input-bottom').val();
        data.font_size = $('.input-font-size').val();
        data.is_active = $('.input-is-active').prop('checked');
        data.text_shapes_category_id = $('.text-shapes-categories').val();

        var formData = new FormData();

        var th_file = null;

        try {
            var thumbnail = $('.input-thumbnail')[0].files[0];
            if(thumbnail != undefined) {
                formData.append('file', thumbnail);
                fileUpload(formData, function (filename) { th_file = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        if(th_file != null) {
            data.thumbnail = th_file;
        }

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/v1-0/text_shape";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/v1-0/text_shape/update";
        }

        addUpdateRecord(data, url);
        $('.submit-new-record').attr('disabled', 'true');
    });

    function addUpdateRecord(data, url){

        console.log(data)
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
       modalConfirm('Remove Text Shape', 'Are you sure you want to delete the item?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/text_shape/delete";
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

    $(document).on('click', '.delete-category-image', function(e){
        e.preventDefault();
        var id =  $(this).data('category-id');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/v1-0/text_shapes/remove_thumbnail";

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
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: response.message,
                        type: 'error',
                        hide: true
                    });
                }
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

    function loadTextShapesCategories() {
        var category_elem = "";
        _.each(window.text_shapes_categories, function(category) {
            category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
        });
        $('.sport').append(category_elem);
    }

    function getUniformCategories(){
        var categories;
        var url = "//" +api_host+ "/api/v1-0/text_shapes_categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                window.text_shapes_categories = data['text_shapes_categories'];
                
                var category_elem = "";
                _.each(window.text_shapes_categories, function(category) {
                    category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
                });
                $('.text-shapes-categories').append(category_elem);
                console.log('Text shapes categories loaded.')
            }
        });
    }

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

});
</script>
@endsection
