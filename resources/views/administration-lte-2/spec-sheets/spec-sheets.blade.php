@extends('administration-lte-2.lte-main')

@section('styles')
<style type="text/css">
    #modal-dialog-spec {
      width: 85%;
      height: 85%;
      margin: 5;
      padding: 0;
    }
    #modal-content-spec {
      height: auto;
      min-height: 85%;
      border-radius: 0;
    }
    input[type=number]{
        width: 55px;
    }
    .cl-header{
        width: 55px;
        border: none;
        border-color: transparent;
        background-color : #ffffff;
    }

</style>
@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Spec Sheets')
                    <h1>
                        <span class="fa fa-info-circle"></span>
                        Master Spec Sheet List
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered ' id='spec-sheets'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th id="select-filter">Sport</th>
                            <th id="select-filter">Factories</th>
                            <th>Name</th>
                            <th>Date Created</th>
                            <th>Last Date Editted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($spec_sheets as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}<input type="hidden" class="td-item-category-id" value="{{ $item->uniform_category_id }}"></td>
                            <td class="td-item-category col-md-1">{{ $item->uniform_category }}</td>
                            <td class="td-item-factory col-md-1">{{ $item->factory }}</td>
                            <td class="td-item-name col-md-1">{{ $item->name }}</td>
                            <td class="td-item-created col-md-1">{{ $item->created_at }}<input type="hidden" class="td-item-notes" value="{{ $item->notes }}"></td></td>
                            <td class="td-item-updated col-md-1">{{ $item->updated_at }}<input type="hidden" class="td-item-updated-by" value="{{ $item->updated_by }}"></td></td>
                            <td class="col-md-3">
                                <input type="hidden" class="td-item-size-type" value="{{$item->sizing_type}}">
                                <input type="hidden" class="td-item-sizes" value="{{$item->sizes}}">
                                <textarea name="poms" class="td-item-poms" style="display:none;">{{ $item->poms }}</textarea>
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat view-record" data-target="#SpecSheetModal" data-toggle="modal">View</a>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="/administration/v1-0/spec_sheet/export_excel/{{ $item->id }}" target="_blank" class="btn btn-success btn-sm btn-flat">Export</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='7'>
                                No Spec Sheets
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
         <!-- Sizes Modal -->
    <div id="viewModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
            <div class="modal-content modal-md">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h3 class="modal-title" align="center">Sizes Value</h3>
                </div>
                <div class="modal-body" align="left">
                      <div class="sizes_div" >
                          <pre id="sizes_text" ></pre>
                      </div>
                </div>
                <div class="modal-footer" >
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</section>
@include('administration-lte-2.spec-sheets.spec-sheets-modal')
@include('administration-lte-2.spec-sheets.view-spec-sheet-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.categories = null;
    window.poms = null;
    window.active_pom = null;
    window.sizes_options = '';
    window.sizes = {};
    window.adult_sizes = [];
    window.youth_sizes = [];
    window.updated_by = '';

    getUniformCategories(function(categories){
        window.categories = categories;
    });

    getPoms(function(poms){
        window.poms = poms;
    });

    loadUniformCategories();
    loadPoms();

    $(".add-poms").on('click', function(e) {
        e.preventDefault();
        $('.input-poms').trigger('change');
        var item_value = $('.input-poms-props').val();
        var poms_props = JSON.parse(item_value);
        var item_text = $('.input-poms').find(":selected").text();
        var item_plus_tol = $('.input-poms').find(":selected").attr('data-plus-tol');
        var item_minus_tol = $('.input-poms').find(":selected").attr('data-minus-tol');
        var qc = `<td><input type="checkbox" class="pom-qc" value="0"></td>`;
        var item = `<td><input type="hidden" class="form-control pom-item-value" value='`+item_value+`'><input type="text" class="form-control pom-item" value="`+ item_text +`" disabled></td>`;
        var image = `<td><a href="#" class="btn btn-defult btn-md file-link" data-link="`+ poms_props.image_link +`" data-toggle="popover"><i class="fa fa-picture-o" aria-hidden="true"></i></a></td>`;
        var plus_tol = `<td><input type="number" class="pom-plus-tol" value="` +item_plus_tol+ `" disabled></td>`;
        var minus_tol = `<td><input type="number" class="pom-minus-tol" value="` +item_minus_tol+ `" disabled></td>`;
        var sizes = `<td><input type="hidden" class="form-control pom-sizes"><div class="sizes-row col-md-12"></div></td>`;
        var delete_row = `<td><a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>`;
        var elem = `<tr class="layer-row">` + qc + item + image + plus_tol + minus_tol + sizes + delete_row +`</tr>`;
        $('.properties-content').append(elem);
        addSizes();
        loadPopover();
        $('.cl-size').trigger('change');
    });

    $(document).on("click", ".delete-row", function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-item-id').val('');
        $('.input-item-name').val('');
        $('.input-uniform-category').val('');
        $('.sport').val('none');
        $('.input-factory').val('none');
        $('.sport').trigger('change');
        $("input[name='sizing_type']").prop('checked', false);
        $('#sizes').val('');
        window.adult_sizes = [];
        window.youth_sizes = [];
        $("input[type='checkbox']").prop('checked', false);
        $('#input-notes').val('');
        $('#poms').val('');
        $('.sizes-header').empty();
        $('.sizes-row').empty();
        $('.properties-content').empty();
        $('.submit-new-record').removeAttr('disabled');
    });

    $("#SpecSheetModal").on("hidden.bs.modal", function() {
        $('.input-item-id').val('');
        $('#sizes').val('');
        window.adult_sizes = [];
        window.youth_sizes = [];
        $("input[type='checkbox']").prop('checked', false);
        $('#poms').val('');
        $('.view-sizes-header').empty();
        $('.view-sizes-row').empty();
        $('.view-properties-content').empty();
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Create Sizing Spec Sheet');
        $('.submit-new-record').text('Save');
        $('.notes-div').attr({"style": "display: none;"});
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Sizing Spec Sheet');
        $('.submit-new-record').text('Save');
        $('.notes-div').attr({"style": "display: block;"});
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-item-id').text();
        data.name = $(this).parent().parent().parent().find('.td-item-name').text();
        data.uniform_category = $(this).parent().parent().parent().find('.td-item-category').text();
        data.uniform_category_id = $(this).parent().parent().parent().find('.td-item-category-id').val();
        data.factory = $(this).parent().parent().parent().find('.td-item-factory').text();
        data.notes = $(this).parent().parent().parent().find('.td-item-notes').val();
        data.sizing_type = $(this).parent().parent().parent().find('.td-item-size-type').val();
        data.updated_by_id = $(this).parent().parent().parent().find('.td-item-updated-by').val();

        data.sizes = $(this).parent().parent().parent().find('.td-item-sizes').val();
        var props = $(this).parent().parent().parent().find('.td-item-poms').val();
        if (props.length > 1) {
            data.poms = JSON.parse(props);
        } else {
            data.poms = null;
        }

        if (data.updated_by_id != 0) {
            getUser(data.updated_by_id, function (user) { window.updated_by = user });
            data.updated_by = window.updated_by.first_name+' '+window.updated_by.last_name;
            console.log(data.updated_by);
        } else {
            data.updated_by = '';
        }

        $('.input-item-id').val(data.id);
        $('.input-item-name').val(data.name);
        $('.input-uniform-category').val(data.uniform_category);
        $('.sport').val(data.uniform_category_id);
        $('.sport').trigger('change');
        $('.input-factory').val(data.factory);
        $('.input-factory').trigger('change');
        $("input[name=sizing_type][value=" + data.sizing_type + "]").prop('checked', true);
        $('#input-notes').val(data.notes);
        $('#input-updated-by').val(data.updated_by);
        $('#sizes').val(data.sizes);
        $('#poms').val(data.poms);
        if (data.poms != null) {
            loadConfigurations(data.poms);
        }
        updateObjectSizes();
    });

    $(document).on('click', '.view-record', function(e) {
        e.preventDefault();
        $('.modal-title').text('View Sizing Spec Sheet');
        $('.notes-div').attr({"style": "display: none;"});
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-item-id').text();
        data.sizes = $(this).parent().parent().parent().find('.td-item-sizes').val();
        data.created_at = $(this).parent().parent().parent().find('.td-item-created').text();
        data.updated_at = $(this).parent().parent().parent().find('.td-item-updated').text();
        data.notes = $(this).parent().parent().parent().find('.td-item-notes').val();
        var props = $(this).parent().parent().parent().find('.td-item-poms').val();
        if (props.length > 1) {
            data.poms = JSON.parse(props);
        } else {
            data.poms = null;
        }
        $('.item-id').val(data.id);
        $('.item-date-created').val(data.created_at);
        $('.item-date-updated').val(data.updated_at);
        $('#notes_text').text(data.notes);
        $('#sizes').val(data.sizes);
        $('#poms').val(data.poms);
        if (data.poms != null) {
            viewConfigurations(data.poms);
        }
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('.input-item-name').val();
        data.uniform_category = $('.input-uniform-category').val();
        data.uniform_category_id = $('.sport').find(":selected").val();
        data.factory = $('.input-factory').find(":selected").val();
        data.sizing_type = $("input[name='sizing_type']:checked").val();
        data.notes = $('#input-notes').val();
        data.sizes = $("#sizes").val();
        data.poms = $('#poms').val();

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/v1-0/spec_sheet";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/v1-0/spec_sheet/update";
        }

        addUpdateRecord(data, url);
        $('.submit-new-record').attr('disabled', 'true');
    });

    var array_youth_sizes = ['YS','YM','YL','YXL','Y2XL','Y3XL'];
    var array_adult_sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL', '6XL'];
    var array_all_sizes = ['YS','YM','YL','YXL','Y2XL','Y3XL','XS','S','M','L','XL','2XL','3XL','4XL','5XL', '6XL'];

    sizesLoop(array_adult_sizes,".adultSizes");
    sizesLoop(array_youth_sizes,".youthSizes");

    function sizesLoop(sizes,cl){
      for (var item of sizes) {
       $(cl).append("<input type='checkbox' value="+ item +"> : "+item + "&nbsp;&nbsp;&nbsp;");
      }
    }

    $('.adultSizes input').on('click', function(){
      createObjectAdultYouthSizes(this,window.adult_sizes);
    });

    $('.youthSizes input').on('click', function(){
      createObjectAdultYouthSizes(this,window.youth_sizes);
    });

    function createObjectAdultYouthSizes(th,size) {
        var value = $(th).val();
        var sizes = null;
        var checked = false;
        if($(th).is(':checked')){
            size.push(value);
            checked = true;
            applySizes(checked,value);
        }else{
            size.splice( $.inArray(value,size) ,1 );
            applySizes(checked,value);
        }
        sizes = {"youth": window.youth_sizes, "adult": window.adult_sizes};
        sizes = JSON.stringify(sizes);
        $("#sizes").val(sizes);
        $('.cl-size').trigger('change');

    }

    function updateObjectSizes() {

    if($('#sizes').val()){
        var sizes_val = $('#sizes').val();
        sizes_val = JSON.parse(sizes_val);
        window.adult_sizes = sizes_val.adult;
        window.youth_sizes = sizes_val.youth;
    }

    if($('#sizes').val()){
        var sizes = $('#sizes').val();
            sizes = JSON.parse(sizes);
            $.each( sizes, function( key, value ) {
              for (var item of value) {
                $('.'+key+'Sizes :input[value='+ item +']').prop( "checked", true );
              }
            });
      }
    }

    function addSizes(thisObj){
        if($('#sizes').val()){
            $('.sizes-header').empty();
            var sizes = $('#sizes').val();
            sizes = JSON.parse(sizes);
            var header_elem = '';
            var elem = '';
                $.each( sizes, function( key, value ) {
                    _.each(array_all_sizes, function (s) {
                        for (var item of value) {
                        if (s == item) {
                            header_elem += '<input type="text" class="cl-header '+ item +'" value="'+ item +'" disabled> ';
                            elem += '<input type="number" class="cl-size '+ item +'" placeholder="' + item +'" title="' + item +'" step=".01" required> ';
                        }
                        }
                    });
                });
                $('.sizes-row').last().append(elem);
                $('.sizes-header').append(header_elem);
        }
    }

    function applySizes(checked, val) {
        if(checked) {
            var header_elem = '';
            var elem = '';
            header_elem += '<input type="text" class="cl-header '+ val +'" value="'+ val +'" disabled> ';
            elem += '<input type="number" class="cl-size '+ val +'" placeholder="' + val +'" title="' + val +'" step=".01"  required> ';
            $('.sizes-row').append(elem);
            $('.sizes-header').append(header_elem);
        } else {
            $('.' + val + '').remove();
            $('.sizes-header.' + val + '').remove();
        }
    }

    function loadSizes(data){
        $('.sizes-header').empty();
        var header_elem = '';
        var elem = '';
        _.each(array_all_sizes, function (s) {
            $.each(data, function(key, value) {
            var size_key = Object.keys(value).toString();
            var size_value = Object.values(value).toString();
                if (s == size_key) {
                    header_elem += '<input type="text" class="cl-header '+ size_key +'" value="'+ size_key +'" disabled> ';
                    elem += '<input type="number" class="cl-size '+ size_key +'" placeholder="' + size_key +'" title="' + size_key +'" value= "'+ size_value +'" step=".01" required> ';
                }
            });
        });
        $('.sizes-row').last().append(elem);
        $('.sizes-header').append(header_elem);
    }

    function viewSizes(data){
        $('.view-sizes-header').empty();
        var header_elem = '';
        var elem = '';
        _.each(array_all_sizes, function (s) {
            $.each(data, function(key, value) {
            var size_key = Object.keys(value).toString();
            var size_value = Object.values(value).toString();
                if (s == size_key) {
                    header_elem += '<input type="text" class="cl-header '+ size_key +'" value="'+ size_key +'" disabled> ';
                    elem += '<input type="number" class="cl-size '+ size_key +'" value= "'+ size_value +'" disabled>';
                }
            });
        });
        $('.view-sizes-row').last().append(elem);
        $('.view-sizes-header').append(header_elem);
    }

    function loadPopover() {
        $('a[data-toggle=popover]').popover({
            html: true,
            trigger: 'hover',
            placement: 'top',
            content: function(){
                return '<img src="'+$(this).data('link') + '" style="width: 200px; height: 200px; background-color: #525252;"/>';
            }
        });

        $('.file-link').on('click', function(e){
        var url = $(this).data('link');
        OpenInNewTab(url);
        });

        function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
        }

    }

    $(document).on('click', '.delete-item', function() {
       var id = [];
       id.push( $(this).data('item-id'));
       modalConfirm('Remove Spec Sheets', 'Are you sure you want to delete the sheet?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/spec_sheet/delete";
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

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "pageLength" : 15
    });

    $(document).on("change", ".sport", function(e) {
        e.preventDefault();
        $('.input-uniform-category').val($('.sport').find(":selected").text());
    });

    $(document).on("change", ".cl-size", function(e) {
        e.preventDefault();
        size = [];
        $(".sizes-row").each(function(i) {
            x = [];
            $(this).find(".cl-size").each(function(i) {
                var value = $(this).val();
                var label = $(this).attr('title');
                var y = {[label]: parseFloat(value)}
                x.push(y);
            });
            $(this).parent().find('.pom-sizes').val(JSON.stringify(x));
        });
        updateJSON();
    });

    $(document).on("change", ".input-poms", function(e){
        var selected_pom = $(this).val();
        getPom(selected_pom, function (pom) { window.active_pom = pom });
        var pom_value = _.pick(window.active_pom, 'pom_number','name','plus_tolerance','minus_tolerance','image_link','video_link');
        $('.input-poms-props').val(JSON.stringify(pom_value));
    });

    $(document).on("click", ".pom-qc", function(e){
        if($(this).is(':checked')) {
            $(this).val(1);
        } else {
            $(this).val(0);
        }
        updateJSON();
    });

    $(document).on("click", ".delete-row", function(e){
        updateJSON();
    });

    function updateJSON() {
        var data = [];
        $(".layer-row").each(function(i) {
            var x = {
                "qc_required" : $(this).find('.pom-qc').val(),
                "pom_properties" : JSON.parse($(this).find('.pom-item-value').val()),
                "sizes" : JSON.parse($(this).find('.pom-sizes').val())
            };
            data.push(x);
        });
        $('#poms').val(JSON.stringify(data));
    }

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

    function loadConfigurations(data) {

        data.forEach(function(entry, i) {
            $('.input-poms').trigger('change');
            var item_text = entry.pom_properties.pom_number+ `--` + entry.pom_properties.name;
            var item_value = JSON.stringify(entry.pom_properties);
            var qc = `<td><input type="checkbox" class="pom-qc" value="`+ entry.qc_required +`"></td>`;
            var item = `<td><input type="hidden" class="form-control pom-item-value" value='`+ item_value +`'><input type="text" class="form-control pom-item" value="`+ item_text +`" disabled></td>`;
            var image = `<td><a href="#" class="btn btn-defult btn-md file-link" data-link="`+ entry.pom_properties.image_link +`" data-toggle="popover"><i class="fa fa-picture-o" aria-hidden="true"></i></a></td>`;
            var plus_tol = `<td><input type="number" class="pom-plus-tol" value="` +entry.pom_properties.plus_tolerance+ `" disabled></td>`;
            var minus_tol = `<td><input type="number" class="pom-minus-tol" value="` +entry.pom_properties.minus_tolerance+ `" disabled></td>`;
            var sizes = `<td><input type="hidden" class="form-control pom-sizes"><div class="sizes-row col-md-12"></div></td>`;
            var delete_row = `<td><a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>`;
            var elem = `<tr class="layer-row">` + qc + item + image + plus_tol + minus_tol + sizes + delete_row +`</tr>`;
            $('.properties-content').append(elem);
            if (entry.qc_required == 1)  {
                $('.pom-qc').last().prop('checked', true);
            } else {
                $('.pom-qc').last().prop('checked', false);
            }
            loadSizes(entry.sizes);
            loadPopover();
            $('.cl-size').trigger('change');
        });
    }

    function viewConfigurations(data) {

        data.forEach(function(entry, i) {
            var item_text = entry.pom_properties.pom_number+ `--` + entry.pom_properties.name;
            var item_value = JSON.stringify(entry.pom_properties);
            var qc = `<td><input type="checkbox" class="pom-qc" value="`+ entry.qc_required +`" disabled></td>`;
            var item = `<td><input type="hidden" class="form-control pom-item-value" value='`+ item_value +`'><input type="text" class="form-control pom-item" value="`+ item_text +`" disabled></td>`;
            var image = `<td><a href="#" class="btn btn-default btn-md file-link" data-link="`+ entry.pom_properties.image_link +`" data-toggle="popover"><i class="fa fa-picture-o" aria-hidden="true"></i></a></td>`;
            var plus_tol = `<td><input type="number" class="pom-plus-tol" value="` +entry.pom_properties.plus_tolerance+ `" disabled></td>`;
            var minus_tol = `<td><input type="number" class="pom-minus-tol" value="` +entry.pom_properties.minus_tolerance+ `" disabled></td>`;
            var sizes = `<td><input type="hidden" class="form-control pom-sizes"><div class="view-sizes-row col-md-12"></div></td>`;
            var elem = `<tr class="layer-row">` + qc + item + image + plus_tol + minus_tol + sizes + `</tr>`;
            $('.view-properties-content').append(elem);
            if (entry.qc_required == 1)  {
                $('.pom-qc').last().prop('checked', true);
            } else {
                $('.pom-qc').last().prop('checked', false);
            }
            viewSizes(entry.sizes);
            loadPopover();
        });
    }

    function loadUniformCategories() {
        var category_elem = "";
        _.each(window.categories, function(category) {
            category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
        });
        $('.sport').append(category_elem);
    }

    function loadPoms() {
        var poms_elem = "";
        _.each(window.poms, function(pom) {
            poms_elem += `<option value=` + pom.id + ` data-plus-tol=`+ pom.plus_tolerance +` data-minus-tol=`+ pom.minus_tolerance +`>`+ pom.pom_number +` -- ` + pom.name + `</option>`;
        });
        $('.input-poms').append(poms_elem);
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

    function getPoms(callback){
            var poms;
            var url = "//" +api_host+ "/api/v1-0/points_of_measures";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    poms = data['points_of_measures'];
                    if(typeof callback === "function") callback(poms);
                }
            });
    }

    function getPom(id, callback) {
            var pom;
            var url = "//" +api_host+ "/api/v1-0/points_of_measure/"+id;
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    pom = data['point_of_measure'];
                    if(typeof callback === "function") callback(pom);
                }
            });
    }

    function getUser(id, callback) {
            var user;
            var url = "//" +api_host+ "/api/user/"+id;
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                headers: {"accessToken": atob(headerValue)},
                contentType: 'application/json',
                success: function(data){
                    user = data['user'];
                    if(typeof callback === "function") callback(user);
                }
            });
    }

});
</script>
@endsection
