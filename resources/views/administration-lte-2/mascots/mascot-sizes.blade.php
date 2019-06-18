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

    #properties {
        left: -999em;
        position: absolute;
    }

    #load-properties {
        margin: 15px 0;
        min-height: 100px;
        resize: none;
    }

    #load-properties-container {
        margin-bottom: 15px;
    }
</style>
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
                            <td class="td-size-active col-md-1">
                                <div class="onoffswitch">
                                    <label class="switch">
                                      <input type="checkbox" class="onoffswitch-checkbox toggle-size-active" id="switch-active-{{ $size->id }}" data-size-id="{{ $size->id }}" {{ ($size->active) ? 'checked' : '' }}>
                                      <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="col-md-2">
                                <textarea name="size_props" class="td-size-props" data-size-id="{{ $size->id }}" style="display:none;">{{ $size->properties }}</textarea>
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <button href="#" class="btn btn-success btn-sm btn-flat clone-size" data-size-id="{{ $size->id }}" role="button">Clone</button>
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

    if($('#neck_option_value').val()){
        var bpos = JSON.parse($('#neck_option_value').val());
    }

    $('.material-neck-option').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    $('.block-pattern').select2({
        placeholder: "Select block pattern",
        multiple: true,
        allowClear: true
    }).on('select2:select', function(event) {
        var bps = $(this).val();
        updateNeckOptionDropdown(bps, event);
    }).on('select2:unselect', function(event) {
        var bps = $(this).val();
        updateNeckOptionDropdown(bps, event);
    });

    function updateNeckOptionDropdown(bps, event) {
        var options = [];
            bps.forEach( function(item_name) {
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

        var neckOption = $('#neck_option_value').val();

        if (neckOption) {
            neckOption = neckOption.split(",");

            if (event.type == 'select2:select') {
                $('#neck_option').val(neckOption);
            } else if (event.type == 'select2:unselect') {
                $('#neck_option').val(neckOption);
                $('#neck_option_value').val($('#neck_option').val());
            }

            if (event == 'edit') {
                $('#neck_option').val(neckOption);
            }
        }
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

    window.properties = [];

    $('.add-props').on('click', function(e){
        e.preventDefault();
        var elem = `<tr class="prop-row">
                        <td>
                            <input type="number" class="prop-size" step="0.01">
                        </td>
                        <td>
                            <input type="number" class="prop-scale" step="0.01">
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs btn-danger remove-prop">Remove</a>
                        </td>
                    </tr>`;
        $('.props-content').prepend(elem);
        removeButton();
        updateFields();
        updateData();
    });

    function loadProperties(props){
        var properties = props;
        properties.forEach(function(entry) {
            var elem = `<tr class="prop-row">
                    <td>
                        <input type="number" class="prop-size prop-data" step="0.01" value="` + entry.size + `">
                    </td>
                    <td>
                        <input type="number" class="prop-scale prop-data" step="0.01" value="` + entry.scale + `">
                    </td>
                    <td>
                        <a href="#" class="btn btn-xs btn-danger remove-prop">Remove</a>
                    </td>
                </tr>`;
            $('.props-content').append(elem);
            removeButton();
            updateFields();
            updateData();
        });
    }

    function removeButton(){
        $('.remove-prop').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateData();
        });
    }

    function updateData(){
        window.properties = [];
        $(".prop-row").each(function(i) {
            var x = {
                size: $(this).find('.prop-size').val(),
                scale: $(this).find('.prop-scale').val()
            };
            window.properties.push(x);
        });
        $('#properties').val(JSON.stringify(window.properties));
    }

    function updateFields(){
        $(document).on('change', '.prop-size, .prop-scale', function(){
            updateData();
        });
    }

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-size-name').val('');
        $('.sport').val('none');
        $('.sport').trigger('change');
        $('.block-pattern-val').val('');
        $('#block_pattern').val('');
        $('.neck-option-val').val('');
        $('#neck_option').val('');
        $('.input-size-type').val('');
        $('.input-brand').val('');
        $('#properties').val('');
        $('.props-content').empty();
        $('.submit-new-record').removeAttr('disabled');

        $('#load-properties').val('');

        if ($('#load-properties-container').css('display') !== 'none') {
            $('#load-properties-container').animate({
                height: 'toggle',
            }, 100);
        }
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Mascot Sizes Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Mascot Size Information');
        $('.submit-new-record').text('Update Record');

        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-size-id').text();
        data.name = $(this).parent().parent().parent().find('.td-size-name').text();
        data.uniform_category_id = $(this).parent().parent().parent().find('.td-size-sport').val();

        var raw_bp = $(this).parent().parent().parent().find('.td-size-block-pattern').text();
        data.block_pattern = raw_bp.replace(/[\[\]'"]+/g, '');

        var raw_bpo = $(this).parent().parent().parent().find('.td-size-option').text();
        data.neck_option = raw_bpo.replace(/[\[\]'"]+/g, '');

        data.type = $(this).parent().parent().parent().find('.td-size-type').text();
        data.brand = $(this).parent().parent().parent().find('.td-size-brand').text();

        var props = $(this).parent().parent().parent().find('.td-size-props').val();

        if (props.length > 1) {
            data.properties = JSON.parse(props);
        } else {
            data.properties = null;
        }

        $('.input-size-id').val(data.id);
        $('.input-size-name').val(data.name);
        $('.sport').val(data.uniform_category_id).trigger('change');
        $('.block-pattern-val').val(data.block_pattern);
        $('#block_pattern').val(JSON.parse(raw_bp)).trigger('change');
        $('.neck-option-val').val(data.neck_option);
        $('#neck_option').val(JSON.parse(raw_bpo)).trigger('change');
        $('.input-size-type').val(data.type);
        $('.input-brand').val(data.brand);
        $('#properties').val(data.properties);

        var blockPatterns = data.block_pattern.split(",");
        $('#neck_option_value').val(data.neck_option);
        updateNeckOptionDropdown(blockPatterns, 'edit');

        if (data.properties != null) {
            loadProperties(data.properties);
        }
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-size-name').val();
        data.uniform_category_id = $('.sport').find(":selected").val();
        var raw_bp = $('.block-pattern-val').val();
        data.block_patterns = raw_bp.split(",");
        var raw_bpo = $('.neck-option-val').val();
        data.block_pattern_options = raw_bpo.split(",");
        data.type = $('.input-size-type').find(":selected").val();
        data.brand = $('.input-brand').find(":selected").val();
        data.properties = $('#properties').val();

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/v1-0/mascot_size";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-size-id').val();
            var url = "//" + api_host +"/api/v1-0/mascot_size/update";
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

    $(document).on('click', '.delete-size', function(){
        var id = $(this).data('size-id');
        modalConfirm('Remove mascot-size', 'Are you sure you want to delete the mascot-size?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/mascot_size/delete";
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

    $(document).on('click', '.toggle-size-active', function(e){
        e.preventDefault();
        var id = $(this).data('size-id');
        console.log(id);
         var url = "//" + api_host + "/api/v1-0/mascot_size/toggle";
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

    $(document).on('click', '.clone-size', function() {
        var id = $(this).data('size-id');
        var url = "//" + api_host + "/api/mascot_size/duplicate/";

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
                }
            }
        });
    });

    $('.copy-properties').on('click', function(e) {
        e.preventDefault();
        $('#properties').select();
        document.execCommand('copy');

        new PNotify({
            title: 'Success',
            text: "Data copied",
            type: 'success',
            hide: true
        });

        setTimeout(function() {
            PNotify.removeAll();
        }, 500)
    });

    $('.load-properties').click(function(event) {
        event.preventDefault();

        $('#load-properties-container').animate({
            height: 'toggle',
        }, 100);
    });

    $('.update-properties').click(function(event) {
        event.preventDefault();

        var properties = JSON.parse($('#load-properties').val());

        if (properties) {
            $('.props-content').empty();
            loadProperties(properties);
        }

        $('#load-properties-container').animate({
            height: 'toggle',
        }, 100);

        $('#load-properties').val('');
    });
});
</script>
@endsection
