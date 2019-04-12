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

    .select2-container--default
    .select2-selection--multiple
    .select2-selection__choice
    {
        color:black;
    }
</style>
@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Application Sizes')
                    <h1>
                        <span class="fa fa-arrows"></span>
                        Application Sizes
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered application-sizes display' id='application-sizes'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th id="select-filter">Category</th>
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

                    @forelse ($application_sizes as $size)

                        <tr class='item-{{ $size->id }}'>
                            <td class="td-size-id col-md-1">{{ $size->id }}</td>
                            <td class="td-size-name col-md-1">{{ $size->name }}<input type="hidden" name="" class="td-size-sport" value="{{ $size->uniform_category_id}}"></td>
                            <td class="col-md-1">{{ $size->sport }}</td>
                            <td class="td-size-block-pattern col-md-1">{{ $size->block_pattern }}</td>
                            <td class="col-md-1"><textarea class="td-size-option" style="display: none;">{{ $size->neck_option }}</textarea><button class="view-options btn btn-default btn-flat btn-sm">View</button></td>
                            <td class="td-size-type col-md-1">{{ $size->type }}</td>
                            <td class="td-size-uniform-application-type col-md-1">{{ $size->uniform_application_type }}</td>
                            <td class="td-size-brand col-md-1">{{ $size->brand }}</td>
                            <td>
                                <div class="onoffswitch">
                                    <label class="switch">
                                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-size" id="switch-{{ $size->id }}" data-size-id="{{ $size->id }}" {{ ($size->active) ? 'checked' : '' }}>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="col-md-2">
                                <textarea name="size_props" class="td-size-props" style="display:none;">{{ $size->properties }}</textarea>
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="duplicate-application-size btn btn-flat btn-sm btn-default" data-application-size-id="{{ $size->id }}" data-application-size-name="{{ $size->name }}" role="button">Clone</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-size" data-size-id="{{ $size->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='10'>
                                No Application Sizes
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
         <!-- Category Modal -->
    <div id="viewModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
            <div class="modal-content modal-md">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h3 class="modal-title" align="center">Category Value</h3>
                </div>
                <div class="modal-body" align="left">
                      <div class="category_div" >
                          <pre id="category_text" ></pre>
                      </div>
                </div>
                <div class="modal-footer" >
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</section>
@include('administration-lte-2.applications.application-sizes-modal')
@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-duplicate-application-size'])
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.categories = null;
    window.block_patterns = null;
    window.app_types = ['team_name', 'player_name', 'front_number', 'back_number', 'shoulder_number', 'sleeve_number', 'mascot', 'embellishments', 'short_number', 'pant_number'];

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

    $(".add-props").on('click', function(e) {
        e.preventDefault();
        var app_numbers_options = buildAppNumOptions();
        var app_sizes_options = buildAppSizeOptions();
        var app_default_elem = '<option value="none">N/A</option>';
        window.app_type = null;
          var type_elem = '';
          app_types.forEach(function(type) {
                type_elem += '<option value="'+type+'">'+type+'</option>';
            });
        window.app_type = type_elem;
        var type = '<td><select class="form-control app-type">'+window.app_type+'</select></td>';
        var copy = '<a href="#" class="btn btn-primary btn-xs copy-size"><span class="glyphicon glyphicon-copy"></span></a>';
        var paste = '<a href="#" class="btn btn-success btn-xs paste-size"><span class="glyphicon glyphicon-paste"></span></a>';
        var size_text = `<input type="text" class="form-control size-text">`;var application_number ='<td><select class="form-control app-numbers" multiple="multiple">'+app_numbers_options+'</select></td>';
        var size = '<td><select class="form-control app-size" multiple="multiple">'+app_sizes_options+'</select>'+ size_text + copy + paste+'</td>';
        var scale = '<td><input type="text" class="form-control app-scale"></td>';
        var def = '<td><select class="form-control app-def">'+app_default_elem+'</select></td>';
        var delete_row = '<td><a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
        var elem = '<tr class="layer-row">' + type + application_number + size + scale + def + delete_row + '</tr>';
        $('.properties-content').append(elem);
        refreshSelectBoxes();
        updateJSON();
    });

    $(document).on("click", ".delete-row", function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
    });

    $(document).on("click", ".copy-size", function(e){
            var size_val = $(this).parent().find('.app-size').val();
            var input = $(this).parent().find('.size-text');
            input.val(size_val);
            input.select();
            document.execCommand('copy');
    });

    $(document).on("click", ".paste-size", function(e){
            var size_val = $(this).parent().find('.app-size');
            var input = $(this).parent().find('.size-text');

            // Set value of input to value in clipboard (paste)
            navigator.clipboard.readText().then( function(text) {
                input.val(text);
                var arr_option = text.split(',');
                size_val.val(arr_option);
                size_val.trigger('change');
            });
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-size-name').val('');
        $('.sport').val('none');
        $('.sport').trigger('change');
        $('.block-pattern-val').val('');
        $('#block_pattern').val('');
        $('.neck-option-val').val('');
        $('#neck_option').val('');
        $('.input-size-type').val('');
        $('.uniform-application-type').val('');
        $('.input-brand').val('');
        $('#properties').val('');
        $('.properties-content').empty();
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Application Sizes Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Application Size Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-size-id').text();
        data.name = $(this).parent().parent().parent().find('.td-size-name').text();
        data.uniform_category_id = $(this).parent().parent().parent().find('.td-size-sport').val();
        var raw_bp = $(this).parent().parent().parent().find('.td-size-block-pattern').text();
        data.block_pattern = raw_bp.replace(/[\[\]'"]+/g, '');
        var raw_bpo = $(this).parent().parent().parent().find('.td-size-option').val();
        data.neck_option = raw_bpo.replace(/[\[\]'"]+/g, '');
        data.type = $(this).parent().parent().parent().find('.td-size-type').text();
        data.uniform_application_type = $(this).parent().parent().parent().find('.td-size-uniform-application-type').text();
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
        $('.uniform-application-type').val(data.uniform_application_type);
        $('.input-brand').val(data.brand);
        $('#properties').val(data.properties);
        if (data.properties != null) {
            loadConfigurations(data.properties);
        }
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-size-name').val();
        data.uniform_category_id = $('.sport').find(":selected").val();
        var raw_bp = $('.block-pattern-val').val();
        data.block_pattern = raw_bp.split(",");
        var raw_bpo = $('.neck-option-val').val();
        data.neck_option = raw_bpo.split(",");
        data.type = $('.input-size-type').find(":selected").val();
        data.uniform_application_type = $('.uniform-application-type').find(":selected").val();
        data.brand = $('.input-brand').find(":selected").val();
        data.properties = $('#properties').val();

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/application_size";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-size-id').val();
            var url = "//" + api_host +"/api/application_size/update";
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

    $(document).on('click', '.delete-size', function() {
       var id = [];
       id.push( $(this).data('size-id'));
       modalConfirm('Remove Application Size', 'Are you sure you want to delete the application size?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/application_size/delete";
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

    $(document).on('click', '.toggle-size', function(e) {
        e.preventDefault();
        var id = $(this).data('size-id');
        var url = "//" + api_host + "/api/application_size/toggle/";
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

    $(document).on('click', '.view-options', function(e) {
        e.preventDefault();
        var category = $(this).parent().parent().find('.td-size-option').val();
        $('#category_text').text(category);
        $('#viewModal').modal('show');
    });

    $(document).on("change", ".app-size", function(e){
        e.preventDefault();
        setValue($(this));
        updateJSON();
    });

    $(document).on("keyup", ".app-scale", function(e){
        updateJSON();
    });

    $(document).on("change", ".app-def, .app-type, .app-numbers", function(e){
        updateJSON();
    });

    $(document).on("click", ".delete-row", function(e){
        updateJSON();
    });

    function loadConfigurations(data){
        var app_numbers_options = buildAppNumOptions();
        var app_sizes_options = buildAppSizeOptions();
        var app_numbers_ref = [];
        var app_sizes_ref = [];
        var default_sizes = [];

        data.forEach(function(entry, i) {
            var app_nums = entry.application_number;
            app_numbers_ref.push(app_nums);
            app_sizes_ref.push(entry.size);
            default_sizes.push(entry.default);
            var app_num_class = "app-num-"+i;
            var app_size_class = "app-size-"+i;
            var app_def_class = "app-def-"+i;
            var app_size = entry.size;
            var app_scale = entry.scale;
            window.app_type = null;
                var type_elem = '';
                app_types.forEach(function(type) {
                    if (type == entry.type) {
                        type_elem += '<option value="'+type+'" selected>'+type+'</option>';
                    }
                    else {
                        type_elem += '<option value="'+type+'">'+type+'</option>';
                      }
                    });
                window.app_type = type_elem;
            var type = '<td><select class="form-control app-type">'+window.app_type+'</select></td>';
            var copy = '<a href="#" class="btn btn-primary btn-xs copy-size"><span class="glyphicon glyphicon-copy"></span></a>';
            var paste = '<a href="#" class="btn btn-success btn-xs paste-size"><span class="glyphicon glyphicon-paste"></span></a>';
            var size_text = `<input type="text" class="form-control size-text">`;
            var application_number = `<td><select class="form-control app-numbers `+app_num_class+`" multiple="multiple">`+app_numbers_options+`</select></td>`;
            var size = `<td><select class="form-control app-size `+app_size_class+`" multiple="multiple">`+app_sizes_options+`</select>`+ size_text + copy + paste+`</td>`;
            var scale = '<td><input type="text" class="form-control app-scale" value="'+app_scale+'"></td>';
            var def =  '<td><select class="form-control app-def '+app_def_class+'"></select></td>';
            var delete_row = '<td><a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a></td>';
            var elem = '<tr class="layer-row">' + type + application_number + size + scale + def + delete_row +'</tr>';
            $('.properties-content').append(elem);

            updateJSON();
            setDefault(app_sizes_ref, entry.default);
            setTimeout(refreshSelect2s(app_numbers_ref), 1000);
        });
    }

    function refreshSelect2s(app_numbers_ref){
        refreshSelectBoxes();
        app_numbers_ref.forEach(function(entry, i) {
            try {
                var app_num_class = ".app-num-"+i;
                $(app_num_class).val(entry);
                $(app_num_class).trigger('change');
            }
            catch(err) {
                console.log(err.message);
            }
        });
        updateJSON();
    }

    function setDefault(sizes, def_value) {
        refreshSelectBoxes();
        sizes.forEach( function(entry, i) {
            try {
                var app_size_class = ".app-size-"+i;
                var app_def_class = ".app-def-"+i;
                $(app_size_class).val(entry);
                $(app_size_class).trigger('change');
                var sizes_value = entry.toString().split(",");
                $(app_def_class).html('');
                var elem2 = '';
                sizes_value.forEach(function(size, j){
                    if(def_value == size) {
                            elem2 += '<option value="'+size+'" selected>'+size+'</option>';
                        }
                    else {
                            elem2 += '<option value="'+size+'">'+size+'</option>';
                        }
                });
                $(app_def_class).append(elem2);
            }
            catch (err) {
                console.log(err.message);
            }
        });
        updateJSON();
    }

    function buildAppNumOptions() {
        var elem = '';
        for(var i = 1; i <= 51; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        for(var i = 71; i <= 99; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        return elem;
    }

    function buildAppSizeOptions() {
        var elem = '';
        for(var i = 0.25; i <= 50; i+=0.25){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        return elem;
    }

    function refreshSelectBoxes(){
        $(".app-numbers").each(function(i) {
            $(this).select2({
                placeholder: "Select numbers",
                multiple: true,
                allowClear: true
            });
        });
        $(".app-size").each(function(i) {
            $(this).select2({
                placeholder: "Select",
                multiple: true,
                allowClear: true
            });
        });
    }

    function setValue(thisObj) {
        var sizes = thisObj.parent().parent().find('.app-size').val().toString();
        var def_value = sizes.split(",");
        var elem = '';
        def_value.forEach( function(entry) {
           elem += '<option value="'+entry+'">'+entry+'</option>';
        });
        thisObj.parent().parent().find('.app-def').empty().append(elem);
    }

    function updateJSON() {
        var data = [];
        $(".layer-row").each(function(i) {
            var x = {
                "type" : $(this).find('.app-type').val(),
                "application_number" : $(this).find('.app-numbers').val(),
                "size" : $(this).find('.app-size').val(),
                "scale" : $(this).find('.app-scale').val(),
                "default" : $(this).find('.app-def').val()
            };
            data.push(x);
        });
        $('#properties').val(JSON.stringify(data));
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
