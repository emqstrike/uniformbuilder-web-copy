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
                    @section('page-title', 'Mascot Categories ')
                    <h2>
                        <span class="fa fa-th-list"></span>
                        Mascots Categories
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h2>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered mascots-categories display' id='mascots-categories'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <th>Name</th>
                            <th id="select-filter">Group</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($mascots_categories as $item)

                        <tr class='item-{{ $item->id }}'>
                            <td class="td-item-id col-md-1">{{ $item->id }}</td>
                            <td class="td-item-name col-md-2">{{ $item->name }}<input type="hidden" class="td-item-group" value="{{ $item->mascots_group_category_id }}"></td>
                            <td class="col-md-2">{{ $item->group_name }}</td>
                            <td class="col-md-1">
                                <div class="onoffswitch">
                                    <label class="switch">
                                      <input type="checkbox" class="onoffswitch-checkbox toggle-item-active" id="switch-active-{{ $item->id }}" data-item-id="{{ $item->id }}" {{ ($item->active) ? 'checked' : '' }}>
                                      <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="col-md-1">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-item" data-item-id="{{ $item->id }}" role="button">Delete</a>
                                </center>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='4'>
                                No Mascot Categories
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
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@include('administration-lte-2.mascots.mascot-categories-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.group_categories = null;

    getGroupCategories(function(group_categories){
        window.group_categories = group_categories;
    });

    loadGroupCategories();

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-item-id').val('');
        $('.input-item-name').val('');
        $('.mascot-group-category-name').val('');
        $('.submit-new-record').removeAttr('disabled');
    });

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Mascot Category Information');
        $('.submit-new-record').text('Add Record');
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Mascot Category Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-item-id').text();
        data.name = $(this).parent().parent().parent().find('.td-item-name').text();
        data.mascots_group_category_id = $(this).parent().parent().parent().find('.td-item-group').val();

        $('.input-item-id').val(data.id);
        $('.input-item-name').val(data.name);
        $('.mascot-group-category').val(data.mascots_group_category_id);
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.mascots_group_category_id = $('.mascot-group-category').find(":selected").val();
        data.name = $('.input-item-name').val();

        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/mascot_category";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-item-id').val();
            var url = "//" + api_host +"/api/mascot_category/update";
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
       modalConfirm('Remove Mascot Category', 'Are you sure you want to delete the Category?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/mascot_category/delete";
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
         var url = "//" + api_host + "/api/mascot_category/toggle";
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

    function loadGroupCategories() {
        var group_categories_elem = "";
        _.each(window.group_categories, function(group_categories) {
            group_categories_elem += `<option value=` + group_categories.id + `>` + group_categories.name + `</option>`;
        });
        $('.mascot-group-category').append(group_categories_elem);
    }

    function getGroupCategories(callback){
        var categories;
        var url = "//" +api_host+ "/api/mascots_groups_categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                categories = data['mascots_groups_categories'];
                if(typeof callback === "function") callback(categories);
            }
        });
    }
});
</script>
@endsection
