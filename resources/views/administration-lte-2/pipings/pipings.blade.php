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
                    @section('page-title', 'Pipings')
                    <h2>
                        <span class="glyphicon glyphicon-stats"></span>
                        Pipings
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h2>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered single-view-applications display' id='single-view-applications'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Block Pattern Option</th>
                            <th>Thumbnail</th>
                            <th>Piping Set</th>
                            <th>Alias</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($pipings as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="col-md-1">{{ $item->sport_name }}<input type="hidden" name="" class="td-item-sport" value="{{ $item->sport}}"></td>
                            <td class="col-md-1">{{ $item->bp_name }} <input type="hidden" name="" class="td-item-block-pattern" value="{{ $item->block_pattern}}"></td>
                            <td class="td-item-block-pattern-option col-md-1">{{ $item->block_pattern_option }}</td>
                            <td class="col-md-1">
                                <input type="hidden" name="" class="td-item-thumbnail" value="{{ $item->thumbnail }}">
                                @if (! is_null($item->thumbnail) && $item->thumbnail !== '' )
                                <a href="{{ $item->thumbnail }}" target="_blank">
                                    <span class="fa fa-image"></span>
                                </a>
                                @endif
                            </td>
                            <td class="td-item-piping-set col-md-1">{{ $item->piping_set }}</td>
                            <td class="td-item-alias col-md-1">{{ $item->alias_name }}</td>
                            <td class="col-md-2">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='7'>
                                No Hidden Body
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
@include('administration-lte-2.pipings.pipings-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.categories = null;
    window.block_patterns = null;


    getUniformCategories(function(categories){
        window.categories = categories;
    });

    getBlockPatterns(function(block_patterns){
        window.block_patterns = block_patterns;
    });

    loadUniformCategories();

    var sport = null;
    $(document).on('change', '.sport', function() {
        sport = $('.sport').val();
            getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; });
            var sportOK = _.filter(window.block_patterns, function(e) {
                            return e.uniform_category_id == sport;
                            });
            $( '#block_pattern' ).html('');
            $.each(sportOK, function(i, item) {
                $('#block_pattern' ).append( '<option value="' + item.id + '">' + item.name + '</option>' );
            });
        $('#block_pattern').trigger('change');
    });
    $('.sport').trigger('change');


    $(document).on('change', '#block_pattern', function() {
        var id = $(this).val();
        $( '#neck_option' ).html('');
        var filtered_block_pattern = _.find(window.block_patterns, function( bp ) {
            return bp.id == id;
        });
        var filtered_neck_options = JSON.parse(filtered_block_pattern.neck_options);
        $.each(filtered_neck_options, function(i, item) {
            $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
        });
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.sport').val('none');
        $('.sport').trigger('change');
        $('.block-pattern-val').val('');
        $('#block_pattern').val('');
        $('.neck-option-val').val('');
        $('#neck_option').val('');
        $('.input-thumbnail').val('');
        $('.input-piping-set').val('');
        $('.input-alias').val('');
        $('.thumbnail-prev').empty();
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Pipings');
        $('.submit-new-record').text('Submit');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Pipings');
        $('.submit-new-record').text('Update');
        var data = {};
        var parentEl = $(this).parent().parent().parent();

        data.id = parentEl.find('.td-item-id').text();
        data.sport = parentEl.find('.td-item-sport').val();
        data.block_pattern = parentEl.find('.td-item-block-pattern').val();
        data.block_pattern_option = parentEl.find('.td-item-block-pattern-option').text();
        data.alias_name = parentEl.find('.td-item-alias').text();
        data.thumbnail = parentEl.find('.td-item-thumbnail').val();
        data.piping_set = parentEl.find('.td-item-piping-set').text();
        console.log(data.block_pattern_option);
        if(data.thumbnail != '') {
            var mElem = '';
            mElem += `<img src="`+ data.thumbnail +`" style="height: 100px; width: 110px;">
                          <a href="#" class="btn btn-danger btn-xs btn-flat delete-category-image" data-category-id="`+ data.id +`" data-field="thumbnail-prev" role="button">
                              Delete
                          </a>`;
        }
        $('.thumbnail-prev').append(mElem);

        $('.input-item-id').val(data.id);
        $('.sport').val(data.sport).trigger('change');
        $('.input-block-pattern').val(data.block_pattern).trigger('change');;
        $('.input-option').val(data.block_pattern_option);
        $('.input-piping-set').val(data.piping_set);
        $('.input-alias').val(data.alias_name);

    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.sport = $('.sport').val();
        data.block_pattern = $('.input-block-pattern').val();
        data.block_pattern_option = $('.input-option').val();
        data.piping_set = $('.input-piping-set').val();
        data.alias_name = $('.input-alias').val();

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
            var url = "//" + api_host +"/api/v1-0/pipings/create";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/v1-0/pipings/update";
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
       modalConfirm('Remove Pipings', 'Are you sure you want to delete the item?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/pipings/delete";
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


    function loadUniformCategories() {
        var category_elem = "";
        _.each(window.categories, function(category) {
            category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
        });
        $('.sport').append(category_elem);
    }

    function getUniformCategories(callback){
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

    $(document).on('click', '.delete-category-image', function(e){
        e.preventDefault();
        var id =  $(this).data('category-id');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/v1-0/pipings/deleteImage";

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
                }
            }
        });
    });

});
</script>
@endsection
