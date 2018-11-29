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

    pre {
        outline: 1px solid #ccc;
        padding: 5px;
        margin: 5px;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }
</style>
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Patterns')
                    <h1>
                        <span class="fa fa-picture-o"></span>
                        Patterns
                        <a href="/administration/v1-0/pattern/add" class="btn btn-success btn-sm btn-flat add-record">
                        Add
                        </a>
                    </h1>
                    <hr>
                    Uniform Category:
                    <select class="active-sport">
                        <option value="{{ $active_sport }}">{{ $active_sport }}</option>
                    </select>
                </div>
                <div class="box-body">
                    <table class='data-table table display table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Thumbnail</th>
                            <th>Uniform Category</th>
                            <th>Block Pattern Options</th>
                            <th id="select-filter">Brand</th>
                            <th id="select-filter">Asset Target</th>
                            <th>Range Position</th>
                            <th>Active</th>
                            <th>Actions</th>
                            <th>
                                <a href="#" class="btn btn-danger btn-xs multiple-delete-pattern btn-flat" role="button">
                                    Delete Selected
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($patterns as $pattern)
                        <tr class='pattern-{{ $pattern->id }} {{ (!$pattern->active) ? ' inactive' : '' }}'>
                            <td class="col-md-1">
                                {{ $pattern->id }}
                            </td>
                            <td class="col-md-2">
                                {{ $pattern->name }}
                            </td>
                            <td align="center" class="col-md-1">
                                @if ($pattern->thumbnail_path)
                                    <img src="{{ $pattern->thumbnail_path }}" style="height: 80px; width: 85px;">
                                @else
                                    <img src="http://dummyimage.com/100" style="height: 80px; width: 85px;">
                                @endif
                            </td>
                            <td align="center" class="col-md-1">
                                <textarea class="category_value" style="display: none;">{{ $pattern->sports }}</textarea>
                                <button class="view-category btn btn-default btn-flat btn-sm">View</button>
                            </td>
                            <td class="col-md-1">
                                {{ $pattern->block_pattern_options }}
                            </td>
                            <td>
                                {{ $pattern->brand }}
                            </td>
                            <td>
                                {{ $pattern->asset_target }}
                            </td>
                            <td>
                                {{ $pattern->range_position }}
                            </td>
                            <td class="col-md-1">
                                <div class="onoffswitch">
                                    <label class="switch">
                                      <input type="checkbox" class="onoffswitch-checkbox toggle-pattern-active" id="switch-active-{{ $pattern->id }}" data-pattern-id="{{ $pattern->id }}" {{ ($pattern->active) ? 'checked' : '' }}>
                                      <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="col-md-2">
                                @if ($pattern->active)
                                <a href="/administration/v1-0/pattern/edit/{{ $pattern->id }}" class="btn btn-primary btn-sm btn-flat edit-button" data-pattern-id="{{ $pattern->id }}" role="button">
                                    Edit
                                </a>
                                <a href="#" class="btn btn-default btn-sm clone-pattern btn-flat" data-pattern-id="{{ $pattern->id }}" role="button">
                                    Clone
                                </a>
                                @else
                                @endif
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                                    Remove
                                </a>
                            </td>
                            <td class="checkbox col-md-1">
                                <input type="checkbox" id="multipleDelete" name="remove[]" data-pattern-id="{{ $pattern->id }}" value="" align="center">
                            </td>
                        </tr>

                    @empty
                        <tr>
                            <td colspan='9'>
                                No Patterns
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
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function(){

    window.sports = null;

    getSports(function(sports){ window.sports = sports; });

    loadUniformCategories();

    window.active_sport = $('.active-sport').val();
    sports = _.filter(window.sports, function(e){
        return window.active_sport !== e.name;
    });

    sports_sorted = _.sortBy(sports, function(o) { return o.name; });

    var elem = '';
    sports_sorted.forEach(function(entry) {
        elem += '<option value="'+entry.name+'">'+entry.name+'</option>';
    });
    $('.active-sport').append(elem);

    $(document).on('change', '.active-sport', function() {
        window.location = "/administration/v1-0/patterns/"+$(this).val();
    });

    function loadUniformCategories() {
        var category_elem = '';
        sorted_category = _.sortBy(window.sports, function (s) { return s.name });

        _.each(sorted_category, function(category) {
            category_elem += `<option value=` + category.name + `>` + category.name + `</option>`;
        });
        $('.input-uniform-category').append(category_elem);
    }

    $(document).on('click', '.view-category', function(e) {
        e.preventDefault();
        var category = $(this).parent().parent().find('.category_value').val();
        $('#category_text').text(category);
        $('#viewModal').modal('show');
    });

    $(document).on('click', '.toggle-pattern-active', function(e){
        e.preventDefault();
        var id = $(this).data('pattern-id');
        console.log(id);
         var url = "//" + api_host + "/api/pattern/toggle";
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

    $(document).on('click', '.clone-pattern', function(e) {
        e.preventDefault();
        var id = $(this).data('pattern-id');
        var url = "//" + api_host + "/api/pattern/duplicate/";
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

    $(document).on('click', '.delete-pattern', function(e) {
        e.preventDefault();
        var id = $(this).data('pattern-id');
        modalConfirm('Remove Pattern', 'Are you sure you want to delete the Pattern?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/pattern/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
               if(response.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Warning',
                        text: response.message,
                        type: 'warning',
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
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });

    function getSports(callback){
        var sports;
        var url = "//" + api_host + "/api/categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                sports = data['categories'];
                if(typeof callback === "function") callback(sports);
            }
        });
    }

    var multipleRemove=[];

    $(document).on('click', '#multipleDelete', function() {
        if ($(this).is(':checked')) {
            multipleRemove.push($(this).data("pattern-id"));
        } else {
           multipleRemove.splice( $.inArray($(this).data("pattern-id"), multipleRemove) , 1);
        }
        multipleRemove = multipleRemove.sort();
    });

    $(document).on('click', '.multiple-delete-pattern', function() {
        modalConfirm('Remove pattern', 'Are you sure you want to delete the pattern?', multipleRemove);
    });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
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

