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
                    @section('page-title', 'Hidden Body')
                    <h1>
                        <span class="fa fa-eye-slash"></span>
                        Hidden Body
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered hidden-body display' id='hidden-body'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Block Pattern</th>
                            <th>Options</th>
                            <th id="select-filter">Type</th>
                            <th id="select-filter">Uniform Appliction Type</th>
                            <th id="select-filter">Brand</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($hidden_bodies as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="td-item-name col-md-1">{{ $item->name }}</td>
                            <td class="col-md-1">{{ $item->sport }}<input type="hidden" name="" class="td-item-sport" value="{{ $item->uniform_category}}"></td>
                            <td class="td-item-block-pattern col-md-1">{{ $item->block_pattern }}</td>
                            <td class="td-item-option col-md-1">{{ $item->options }}</td>
                            <td class="td-item-type col-md-1">{{ $item->type }}</td>
                            <td class="td-item-uniform-application-type col-md-1">{{ $item->uniform_application_type }}</td>
                            <td class="td-item-brand col-md-1">{{ $item->brand }}</td>
                            <td class="col-md-1">
                                <div class="onoffswitch">
                                    <label class="switch">
                                      <input type="checkbox" class="onoffswitch-checkbox toggle-item-active" id="switch-active-{{ $item->id }}" data-item-id="{{ $item->id }}" {{ ($item->active) ? 'checked' : '' }}>
                                      <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="col-md-2">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='10'>
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
@include('administration-lte-2.hidden-body.hidden-body-modal')
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
                $('#block_pattern' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
            });
        $('#block_pattern').trigger('change');
    });
    $('.sport').trigger('change');

    var z = window.block_patterns;
    $(document).on('change', '#block_pattern', function() {
        var options = [];
        var bps = $('#block_pattern_value').val();
        var bps_name = bps.toString().split(",");
            bps_name.forEach( function(item_name) {
                var name = item_name;
                $.each(z, function(i, item) {
                   if( item.name == name ){
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
    $('.material-neck-option').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    $(".material-neck-option").change(function() {
        $('#neck_option_value').val($(this).val());
    });

    $('.material-neck-option').val(bpos);
    $('.material-neck-option').trigger('change');

    if($('#block_pattern_value').val()){
        var bp = JSON.parse($('#block_pattern_value').val());
    }
    $('.block-pattern').select2({
        placeholder: "Select block pattern",
        multiple: true,
        allowClear: true
    });

    $(".block-pattern").change(function() {
        $('#block_pattern_value').val($(this).val());
    });

    $('.block-pattern').val(bp);
    $('.block-pattern').trigger('change');

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-item-name').val('');
        $('.sport').val('none');
        $('.sport').trigger('change');
        $('.block-pattern-val').val('');
        $('#block_pattern').val('');
        $('.neck-option-val').val('');
        $('#neck_option').val('');
        $('.input-item-type').val('');
        $('.uniform-application-type').val('');
        $('.input-brand').val('');
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Hidden Body Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Hidden Body Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-item-id').text();
        data.name = $(this).parent().parent().parent().find('.td-item-name').text();
        data.uniform_category_id = $(this).parent().parent().parent().find('.td-item-sport').val();
        var raw_bp = $(this).parent().parent().parent().find('.td-item-block-pattern').text();
        data.block_pattern = raw_bp.replace(/[\[\]'"]+/g, '');
        var raw_bpo = $(this).parent().parent().parent().find('.td-item-option').text();
        data.neck_option = raw_bpo.replace(/[\[\]'"]+/g, '');
        data.type = $(this).parent().parent().parent().find('.td-item-type').text();
        data.uniform_application_type = $(this).parent().parent().parent().find('.td-item-uniform-application-type').text();
        data.brand = $(this).parent().parent().parent().find('.td-item-brand').text();

        $('.input-item-id').val(data.id);
        $('.input-item-name').val(data.name);
        $('.sport').val(data.uniform_category_id).trigger('change');
        $('.block-pattern-val').val(data.block_pattern);
        $('#block_pattern').val(JSON.parse(raw_bp)).trigger('change');
        $('.neck-option-val').val(data.neck_option);
        $('#neck_option').val(JSON.parse(raw_bpo)).trigger('change');
        $('.input-item-type').val(data.type);
        $('.uniform-application-type').val(data.uniform_application_type);
        $('.input-brand').val(data.brand);
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-item-name').val();
        data.uniform_category = $('.sport').find(":selected").val();
        var raw_bp = $('.block-pattern-val').val();
        data.block_pattern = raw_bp.split(",");
        var raw_bpo = $('.neck-option-val').val();
        data.options = raw_bpo.split(",");
        data.type = $('.input-item-type').find(":selected").val();
        data.uniform_application_type = $('.uniform-application-type').find(":selected").val();
        data.brand = $('.input-brand').find(":selected").val();

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/v1-0/hidden_body";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/v1-0/hidden_body/update";
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
       modalConfirm('Remove Hidden Body', 'Are you sure you want to delete the hidden body?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/hidden_body/delete";
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

    $(document).on('click', '.toggle-item-active', function(e) {
        e.preventDefault();
        var id = $(this).data('item-id');
        console.log(id);
         var url = "//" + api_host + "/api/v1-0/hidden_body/toggle";
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
                    var elem = '.pattern-' + id;
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
