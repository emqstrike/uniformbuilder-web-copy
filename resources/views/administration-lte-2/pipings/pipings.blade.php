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
                        <span class="fa fa-eye"></span>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($pipings as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="col-md-1">{{ $item->sport }}<input type="hidden" name="" class="td-item-sport" value="{{ $item->sport}}"></td>
                            <td class="td-item-block-pattern col-md-1">{{ $item->block_pattern }}</td>
                            <td class="td-item-block-pattern-option col-md-1">{{ $item->block_pattern_option }}</td>
                            <td class="td-item-thumbnail col-md-1">{{ $item->thumbnail }}</td>
                            <td class="td-item-piping-set col-md-1">{{ $item->piping_set }}</td>
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

    var z = window.block_patterns;
    $(document).on('change', '#block_pattern', function() {
        var options = [];
        var bps = $('#block_pattern_value').val();
        var bps_id = bps.toString().split(",");
            bps_id.forEach( function(item_id) {
                var id = item_id;
                $.each(z, function(i, item) {
                   if( item.id == id ){
                        var optx = JSON.parse(item.neck_options);
                        $.each(optx, function(i, item) {
                            options.push(item.name);
                        });
                    } else {
                    }
                });
            });

        var y = _.sortBy(_.uniq(options));
        $( '#neck_option' ).html('');
        y.forEach(function(i) {
            $('#neck_option').append('<option value="'+i+'">'+i+'</option>');
        });
        $('.material-neck-option').trigger('change');
    });

    if($('#neck_option_value').val()){
        var bpos = JSON.parse($('#neck_option_value').val());
    }

    $(".material-neck-option").change(function() {
        $('#neck_option_value').val($(this).val());
    });

    $('.material-neck-option').val(bpos);
    $('.material-neck-option').trigger('change');

    if($('#block_pattern_value').val()){
        var bp = JSON.parse($('#block_pattern_value').val());
    }

    $(".block-pattern").change(function() {
        $('#block_pattern_value').val($(this).val());
    });

    $('.block-pattern').val(bp);
    $('.block-pattern').trigger('change');

    $("#myModal").on("hidden.bs.modal", function() {
        $('.sport').val('none');
        $('.sport').trigger('change');
        $('.block-pattern-val').val('');
        $('#block_pattern').val('');
        $('.neck-option-val').val('');
        $('#neck_option').val('');
        $('.input-item-thumbnail').val('');
        $('.input-item-piping-set').val('');
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
        data.block_pattern = parentEl.find('.td-item-block-pattern').text();
        data.block_pattern_option = parentEl.find('.td-item-block-pattern-option').text();
        data.thumbnail = parentEl.find('.td-item-thumbnail').text();
        data.piping_set = parentEl.find('.td-item-piping-set').text();

        $('.input-item-id').val(data.id);
        $('.sport').val(data.sport).trigger('change');
        $('.block-pattern-val').val(data.block_pattern).trigger('change');
        $('.neck-option-val').val(data.block_pattern_option).trigger('change');
        $('.input-thumbnail').val(data.thumbnail).trigger('change');
        $('.input-piping-set').val(data.piping_set).trigger('change');

    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.sport = $('.sport').val();
        data.block_pattern = $('.block-pattern-val').val();
        data.block_pattern_option = $('.neck-option-val').val();
        data.thumbnail = $('.input-thumbnail').val();
        data.piping_set = $('.input-piping-set').val();

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

});
</script>
@endsection
