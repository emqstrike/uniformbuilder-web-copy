@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<link rel="stylesheet" type="text/css" href="/dropzone/dropzone.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<style>
    #my-awesome-dropzone {
        border: dashed 1px black;
    }
    .dz-image {
        background-color: gray;
    }
    hr {
    border: none;
    height: 1.5px;
    /* Set the hr color */
    color: #c1c1c1; /* old IE */
    background-color: #c1c1c1; /* Modern Browsers */
    }
</style>
@endsection

@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>

                        Approved Style Requests
                        <small>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' id="style_requests_table" class='table table-bordered table-hover style-requests data-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Style Name</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Option
                            <a href="#" data-toggle="tooltip" data-message="Neck, waist or other options"><span class="glyphicon glyphicon-info-sign"></span></a>
                            </th>
                            <th>Brand</th>
                            <th>Design Sheet</th>
                            <th>Item ID
                            <a href="#" data-toggle="tooltip" data-message="QStrike Item ID"><span class="glyphicon glyphicon-info-sign"></span></a>
                            </th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Requested By</th>
                            <th>Type</th>
                            <th>Application Type</th>
                            <th>Uploaded</th>
                            <th>Customizer ID</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($style_requests as $style_request)
                    <tr class='style-request-{{ $style_request->id }}'>
                        <td class="style-id">{{ $style_request->id }}</td>
                        <td class="style-name">{{ $style_request->name }}</td>
                        <td class="style-sport">{{ $style_request->sport }}</td>
                        <td class="style-block-pattern">{{ $style_request->block_pattern }}</td>
                        <td class="style-option">{{ $style_request->block_pattern_option }}</td>
                        <td class="style-brand">{{ $style_request->brand }}</td>
                        <td>
                            <input type="hidden" name="style_design_sheet_url"" class="style-design-sheet-url" value="{{ $style_request->design_sheet_url }}">
                            <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $style_request->design_sheet_url }}">Link</a>
                        </td>
                        <td class="style-qstrike-item-id">{{ $style_request->qstrike_item_id }}</td>
                        <td class="style-priority">{{ $style_request->priority }}</td>
                        <td class="style-deadline">{{ $style_request->deadline }}</td>
                        <td>{{ $style_request->requested_by }}</td>
                        <td class="style-type">{{ $style_request->type }}</td>
                        <td class="style-application-type">{{ $style_request->uniform_application_type }}</td>
                        <td>
                            @if($style_request->uploaded)
                                {{ 'Yes' }}
                            @else
                                {{ 'No' }}
                            @endif
                            <a href="#" data-toggle="tooltip" data-message="{{ $style_request->uploaded_by }}"><span class="glyphicon glyphicon-info-sign"></span></a>

                        </td>
                        <td>
                           <input type="hidden" name="style_customizer_id"" class="style-customizer-id" value="{{ $style_request->customizer_id }}">
                            <a href="#" class="btn btn-defult btn-xs file-link" data-link="http://customizer.prolook.com/builder/0/{{ $style_request->customizer_id }}">{{ $style_request->customizer_id }}</a>
                        </td>
                         <td>
                            <input type="hidden" name="style_status"" class="style-status" value="{{ $style_request->status }}">
                            <input type="hidden" name="style_is_fixed"" class="style-is-fixed" value="{{ $style_request->is_fixed }}">
                            <input type="hidden" name="style_customizer_available"" class="style-customizer-available" value="{{ $style_request->customizer_available }}">
                        {{ $style_request->status }}
                        @if($style_request->is_fixed == 1 AND $style_request->status == 'approved')
                            <a href="#" data-toggle="tooltip" data-message="Fixed"><span class="glyphicon glyphicon-info-sign"></span></a>

                        @endif
                        </td>
                        <td>
                              <input type="hidden" class="notes" value="{{$style_request->notes}}">
                            @if($style_request->is_fixed)
                                <button class="view-notes btn btn-success btn-sm">View</button>
                            @elseif($style_request->notes != '' AND  $style_request->status == 'approved')
                                <button class="view-notes btn btn-warning btn-sm">View</button>
                            @else
                                <button class="view-notes btn btn-default btn-sm">View</button>
                            @endif
                        </td>
                        <td>
                            <button type="button" class="btn btn-info btn-xs edit" ><i class="glyphicon glyphicon-edit"></i></button>

                            <a href="#" class="delete-style-request btn btn-xs btn-danger pull-right" data-style-request-id="{{ $style_request->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                            </a>
                        </td>

                    </tr>
                    @empty

                        <tr>
                            <td colspan='13'>
                                No Style Requests
                            </td>
                        </tr>

                    @endforelse
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>




    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Request a Style</h4>
          </div>
          <div class="modal-body">
            <!-- <p>Some text in the modal.</p> -->
            <form class="form-horizontal" role="form" method="POST" action="#" name="form_horizontal" enctype="multipart/form-data" id='style-request-form'>
            <input type="hidden" class="design-sheet-path">
            <input type="hidden" class="data-string">
            <input type="hidden" class="id">
            <div class="form-group">
                <label class="col-md-4 control-label">Style Name</label>
                <div class="col-md-6">
                    <input type="text" class="form-control name" id="name" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Sport</label>
                <div class="col-md-6">
                    <!-- <input type="text" class="form-control sport" required> -->
                    <select class="form-control sport">
                        <option value="none" data-uniform-category-id="0">Select Sport</option>
                    </select>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label class="col-md-4 control-label">Block Pattern</label>
                <div class="col-md-6">
                    <!-- <input type="text" class="form-control block-pattern" required> -->
                    <select class="form-control block-pattern">
                        <option value="none" data-block-pattern-id="0">Select Block Pattern</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Custom Block Pattern</label>
                <div class="col-md-6">
                <input type="checkbox" class="enable_custom_bp">
                    <input type="text" class="form-control custom_block_pattern" id="custom_block_pattern" disabled="true">
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label class="col-md-4 control-label">Block Pattern Option</label>
                <div class="col-md-6">
                    <!-- <input type="text" class="form-control block-pattern-option" required> -->
                    <select class="form-control block-pattern-option">
                        <option value="none">Select Block Pattern Option</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Custom Block Pattern Option</label>
                <div class="col-md-6">
                <input type="checkbox" class="enable_custom_bpo">
                    <input type="text" class="form-control custom_option" id="custom_option" disabled="true">
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label class="col-md-4 control-label">QSTRIKE Item ID</label>
                <div class="col-md-6">
                    <input type="number" class="form-control qstrike-item-id" id="qstrike_item_id" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Type</label>
                <div class="col-md-6">
                    <select class="form-control type">
                        <option value="upper">Upper</option>
                        <option value="lower">Lower</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Brand</label>
                <div class="col-md-6">
                    <select class="form-control brand">
                        <option value="none">None</option>
                        <option value="prolook">Prolook</option>
                        <option value="richardson">Richardson</option>
                </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Application Type</label>
                <div class="col-md-6">
                    <select class="form-control application_type">
                        <option value="none">None</option>
                        <option value="tackle_twill">Tackle Twill</option>
                        <option value="sublimated">Sublimated</option>
                        <option value="knitted">Knitted</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Priority</label>
                <div class="col-md-6">
                    <select class="form-control priority">
                        <option value="low">Low</option>
                        <option value="mid">Mid</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <div class="form-group" id="deadline">
                <label class="col-md-4 control-label">Deadline</label>
                <div class="col-md-6">
                    <!-- <input type="date" class="form-control deadline" required> -->
                    <!-- <div id="datepicker"></div> -->
                    <input type="text" id="datepicker">
                </div>
            </div>
             <div class="form-group" id="customizer" style="display: none;">
                <label class="col-md-4 control-label">Customizer ID</label>
                <div class="col-md-6">
                    <input type="number" class="form-control customizer-id" id="customizer_id" required>
                </div>
            </div>

            <div class="form-group" id="status_div" style="display: none;">
                <label class="col-md-4 control-label">Status</label>
                <div class="col-md-6">
                    <select class="form-control status">
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>
            <div class="form-group" id="is_fixed_div" style="display: none;">
                <label class="col-md-4 control-label">Is Fixed</label>
                <div class="col-md-6">
                    <input type="checkbox" name="is_fixed" class="is_fixed">
                </div>
            </div>

            <div class="form-group" id="is_customizer_available_div" style="display: none;">
                <label class="col-md-4 control-label">Is Added to Customizer</label>
                <div class="col-md-6">
                    <input type="checkbox" name="customizer_available" class="customizer_available">
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-4 control-label">Notes</label>
                    <div class="col-md-6">
                        <textarea name="input_notes" class="form-control" id="input_notes" cols="10" rows="5"></textarea>
                    </div>
            </div>

            <div class="form-group" id="save-data" style="margin-top: 260px; z-index: 3;">
                <center>
                    <button type="submit" class="btn btn-primary save-data">
                        Save Request
                    </button>
                </center>
            </div>
            </form>
            <div id="upload_design_sheet" style="z-index: 2; margin-top: -250px; position: absolute; width: 95%;">
                <center>
                    <h4 class="alert alert-info" style="margin-top: -50px;">Upload Design Sheet below</h4>
                    <form action="/administration/material/insert_dz_design_sheet" class="dropzone" id="my-awesome-dropzone" style="margin-top: -20px;">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    </form>
                </center>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Notes Modal -->
    <div id="viewModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
        <div class="modal-content modal-md">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3 class="modal-title" align="center">Notes</h3>
            </div>
            <div class="modal-body" align="left">
                  <div class="notes_div">
                      <pre id="notes_text" ></pre>
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

@section('custom-scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript">
$(function(){
    try {
        $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": false,
        "autoWidth": false,
        "stateSave": true,
        "drawCallback" : function() {
             $('[data-toggle="tooltip"]').popover({
                html: true,
                trigger: 'hover',
                placement: 'top',
                content: function(){
                    return $(this).data('message');
                }
            });
       }
    });
    } catch(e) {
        // statements
        console.log(e);
    }

    window.sport_value = null;
    window.block_pattern_value = null;
    window.option_value = null;

    $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });

    $('.save-data').attr('disabled','disabled');

    $('#style_requests_table').on('click', '.file-link', function(e){
        e.preventDefault()
        var url = $(this).data('link');
        OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    $(document).on('change', '.name, .sport, .block-pattern, .block-pattern-option, .qstrike-item-id, .priority, #deadline, .design_sheet, .customizer-id, .status, #input_notes, .application_type, .is_fixed, .customizer_available', function() {
        updateData();
    });

    $(document).on('change', '.sport', function() {
        var exist = false;
        window.uniform_category_id = $('.sport option:selected').data('uniform-category-id');
        $('.block-pattern').html('');
        var ucid = window.uniform_category_id.toString();
        var filtered_block_patterns = _.filter(window.block_pattern, function(e){ return e.uniform_category_id == ucid; });

        var sorted_block_patterns = _.sortBy(filtered_block_patterns, function(o) { return o.name; });

        var block_pattern_value = window.block_pattern_value;
        $( '#block_pattern' ).html('');

        sorted_block_patterns.forEach(function(entry) {

            if(block_pattern_value == entry.name){
                exist = true;
                var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'" selected>'+entry.name+'</option>'
                $('.block-pattern').append(elem);
            }
            else {
                var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'">'+entry.name+'</option>'
                $('.block-pattern').append(elem);
            }

        });

        if(!exist && block_pattern_value != null) {
            $('.enable_custom_bp').prop('checked', true);
            $('.custom_block_pattern').val(block_pattern_value);
            $('.enable_custom_bp').trigger('change');
        }
        $('.block-pattern').trigger('change');



    });

    $(document).on('change', '.block-pattern', function() {
        var exist = false;
        window.block_pattern_id = $('.block-pattern option:selected').data('block-pattern-id');
        $('.block-pattern').html('');
        $('.block-pattern-option').html('<option value="none" data-block-pattern-id="0">Select Block Pattern Option</option>');
        if (window.block_pattern_id != undefined) {
            var block_pattern = _.filter(window.block_pattern, function(e){ return e.id == window.block_pattern_id.toString(); });

            if(block_pattern[0].neck_options != "null"){


                var x = JSON.parse(block_pattern[0].neck_options);

                var list = [];
                _.each(x, function(item){
                    list.push(_.omit(item, 'children'));
                    list.push(_.flatten(_.pick(item, 'children')));
                });
                var result = _.flatten(list);

                var option_value = window.option_value;
                $('.block-pattern-option').html('');
                result.forEach(function(entry) {
                    if (option_value == entry.name) {
                        exist = true;
                        var elem = '<option value="'+entry.name+'" selected>'+entry.name+'</option>'
                        $('.block-pattern-option').append(elem);
                    }
                    else {
                       var elem = '<option value="'+entry.name+'">'+entry.name+'</option>'
                        $('.block-pattern-option').append(elem);
                    }

                });

            }
        }

        if(!exist && option_value != null) {
            $('.enable_custom_bpo').prop('checked', true);
            $('.custom_option').val(option_value);
            $('.enable_custom_bpo').trigger('change');
        }

    });

    window.data = {};
    window.sports = null;
    window.block_pattern = null;
    window.block_pattern_option = null;
    window.uniform_category_id = null;

    window.rowIndex = null;
    window.rowData = null;

    $('.save-data').on('click', function(e){
        e.preventDefault();
        var data = $('.data-string').val();
        if (window.data.id != '')
        {
            var url = "//" + api_host + "/api/v1-0/style_request/update";

            $.ajax({
                url: url,
                type: "POST",
                data: data,
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": atob(headerValue)},
                success: function(response){
                    if (response.success) {
                        $('#myModal').modal('hide');
                    }
                }
            });
        }
        else {
            var url = "//" + api_host + "/api/v1-0/style_request";

            $.ajax({
                url: url,
                type: "POST",
                data: data,
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
        }

    });

    function updateData(){
        if ($('.enable_custom_bp').is(':checked')) {
            var block_pattern = $('.custom_block_pattern').val();
         }
        else {
            var block_pattern = $('.block-pattern').val();
        }

        if ($('.enable_custom_bpo').is(':checked')) {
            var block_pattern_option = $('.custom_option').val();
        }
        else {
            var block_pattern_option = $('.block-pattern-option').val();
        }

        if ($('.is_fixed').is(':checked')) {
            var is_fixed = 1;
        }
        else {
            var is_fixed = 0
        }

        if ($('.customizer_available').is(':checked')) {
            var customizer_available = 1;
        } else {
            var customizer_available = 0
        }

        var id = $('.id').val();
        var name = $('.name').val();
        var sport = $('.sport').val();
        var qstrike_item_id = $('.qstrike-item-id').val();
        var priority = $('.priority').val();
        var deadline = $('#datepicker').val();
        var design_sheet_url = $('.design-sheet-path').val();
        var customizer_id = $('.customizer-id').val();
        var status = $('.status').val();
        var notes = $('#input_notes').val();
        var application_type = $('.application_type').val();
        var type = $('.type').val();
        var brand = $('.brand').val();

        window.data = {
            'id' : id,
            'name' : name,
            'block_pattern' : block_pattern,
            'block_pattern_option' : block_pattern_option,
            'sport' : sport,
            'qstrike_item_id' : qstrike_item_id,
            'priority' : priority,
            'design_sheet_url' : design_sheet_url,
            'customizer_id' : customizer_id,
            'deadline' : deadline,
            'status' : status,
            'notes' : notes,
            'uniform_application_type' : application_type,
            'is_fixed' : is_fixed,
            'type' : type,
            'brand' : brand,
            'customizer_available' : customizer_available

        };
        $('.data-string').val(JSON.stringify(window.data));
        console.log(window.data);

        if(id != '') {
            window.rowData[1] = name;
            window.rowData[2] = sport;
            window.rowData[3] = block_pattern;
            window.rowData[4] = block_pattern_option;
            window.rowData[5] = brand;
            window.rowData[7] = qstrike_item_id;
            window.rowData[8] = priority;
            window.rowData[11] = type;
            window.rowData[12] = application_type;
            window.rowData[14] = `<input type="hidden" name="style_customizer_id" class="style-customizer-id" value='`+customizer_id+`'><a href="#" class="btn btn-defult btn-xs file-link" data-link='http://customizer.prolook.com/builder/0/`+customizer_id+`'>`+customizer_id+`</a>`;
            window.rowData[15] =    `<input type="hidden" name="style_status" class="style-status" value='`+status+`'><input type="hidden" name="style_is_fixed" class="style-is-fixed" value='`+is_fixed+`'>`+status;
                if(is_fixed == 1 && status == 'approved') {
                    window.rowData[15] += `<a href="#" data-toggle="tooltip" data-message="Fixed"><span class="glyphicon glyphicon-info-sign"></span></a>`;
                }
            window.rowData[16] = `<input type="hidden" class="notes" value="`+notes+`">`
                if(is_fixed == 1) {
                    window.rowData[16] += `<button class="view-notes btn btn-success btn-sm">View</button>`;
                }
                else if(notes != '' && status == 'approved') {
                    window.rowData[16] += `<button class="view-notes btn btn-warning btn-sm">View</button>`;
                }
                else {
                    window.rowData[16] += `<button class="view-notes btn btn-default btn-sm">View</button>`;
                }
        }
    }

    var files = [];
    var filesData = [];
    this.addRemoveLinks = true;

    Dropzone.options.myAwesomeDropzone = {
        success: function(file, response){
            filesData.push({
                'name' : file.name,
                'url' : response
            });
            $('.design-sheet-path').val(filesData[0].url);
        },
        complete: function(file){
            files.push(file.name);
            updateData();
        },
        removedfile: function(file) {
            files.splice(files.indexOf(file.name), 1);
        },
        drop: function(){
        },
    };

    getSports(function(sports){ window.sports = sports; });
    function getSports(callback){
        var sports;
        var url = "//" +api_host+ "/api/categories";
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

    getBlockPatterns(function(block_patterns){ window.block_pattern = block_patterns; });
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

    buildSportsDropdown();
    function buildSportsDropdown(){
        var sorted_sports = _.sortBy(window.sports, function(o) { return o.name; });
        var sport_value = window.sport_value;
        $( '.sport' ).html('');
        sorted_sports.forEach(function(entry) {
            if( sport_value == entry.name) {
                var elem = '<option value="'+entry.name+'" data-uniform-category-id="'+entry.id+'" selected>'+entry.name+'</option>'
                $('.sport').append(elem);
            }
            else {
                var elem = '<option value="'+entry.name+'" data-uniform-category-id="'+entry.id+'">'+entry.name+'</option>'
                $('.sport').append(elem);
            }
        });
    }

    $('#style_requests_table').on('click', '.edit', function(e){
        e.preventDefault();
        getValues($(this));
        $('#deadline').attr({"style": "display: none;"});
        $('#customizer').removeAttr('style');
        $('#status_div').removeAttr('style');
        $('#is_fixed_div').removeAttr('style');
        $('#is_customizer_available_div').removeAttr('style');
        $('#upload_design_sheet').attr({"style": "display: none;"});
        $('#save-data').attr({"style": "display: block;"});
    });

    $('.data-table tbody').on( 'click', 'tr', function () {
        var oTable = $('.data-table').DataTable();
        window.rowData =  oTable.row(this).data();
        window.rowIndex = oTable.row(this).index();
    });

    $("#myModal").on( 'click', '.save-data', function () {
        var oTable = $('.data-table').DataTable();
        oTable.row(window.rowIndex).data(window.rowData).invalidate().draw("full-hold");
    });

    $("#myModal").on("hidden.bs.modal", function() {

        window.sport_value = null;
        buildSportsDropdown();
        $('.sport').trigger('change');
        $('.id').val('');
        $('.name').val('');
        $('.qstrike-item-id').val('');
        $('.customizer-id').val('');
        $('#input_notes').val('');
        $('.type').val('upper');
        $('.application_type').val('none');
        $('.is_fixed').prop('checked', false);
        $('.custom_block_pattern').val(null);
        $('.enable_custom_bp').prop('checked', false);
        $('.custom_option').val(null);
        $('.enable_custom_bpo').prop('checked', false);
        $('.is_fixed, .enable_custom_bpo, .enable_custom_bp, .customizer_available').trigger('change');

        $('#deadline').attr({"style": "display: block;"});
        $('#customizer').attr({"style": "display: none;"});
        $('#status_div').attr({"style": "display: none;"});
        $('#is_fixed_div').attr({"style": "display: none;"});
        $('#is_customizer_available_div').attr({"style": "display: none;"});
        $('#upload_design_sheet').attr({"style":"z-index: 2; margin-top: -250px; position: absolute; width: 95%;"});
        $('#save-data').attr({"style":"margin-top: 260px; z-index: 3;"});
        $('#input_notes').text('');
        $('.design-sheet-path').val('');
        $('.brand').val('none');

    });

    $(".name, #qstrike_item_id, #customizer_id, .custom_block_pattern, .custom_option, #input_notes").on("keyup", function(e){
        e.preventDefault();
        var name = document.getElementById("name").value;
        var qx_id = document.getElementById("qstrike_item_id").value;
        if ( name.length > 0 && qx_id.length > 0) {
            $('.save-data').removeAttr('disabled');
        }
        else {
            $('.save-data').attr('disabled','disabled');
        }
    });

    $(".sport, .block-pattern, .block-pattern-option, .enable_custom_bp, .enable_custom_bpo, .status, .application_type, .is_fixed, .type, .design-sheet-path, .brand, .customizer_available").on("change", function(e){
        e.preventDefault();
        var name = document.getElementById("name").value;
        var qx_id = document.getElementById("qstrike_item_id").value;
        if ( name.length > 0 && qx_id.length > 0) {
            $('.save-data').removeAttr('disabled');
        }
        else {
            $('.save-data').attr('disabled','disabled');
        }
    });

    $(".custom_block_pattern, .custom_option, .enable_custom_bp, .enable_custom_bpo, .type, .brand").on("change", function(e){
        e.preventDefault();
        updateData();
    });

    $('.enable_custom_bp').on('change', function() {
        if ($(this).is(':checked')) {
            $('.block-pattern').attr('disabled','true');
            $('.custom_block_pattern').removeAttr('disabled');
        }
        else {
            $('.block-pattern').removeAttr('disabled');
            $('.custom_block_pattern').attr('disabled','true');
        }
    });

    $('.enable_custom_bpo').on('change', function() {
        if ($(this).is(':checked')) {
            $('.block-pattern-option').attr('disabled','true');
            $('.custom_option').removeAttr('disabled');
        }
        else {
            $('.block-pattern-option').removeAttr('disabled');
            $('.custom_option').attr('disabled','true');
        }
    });

    function getValues(thisObj)
    {
        var id = thisObj.parent().parent().find('.style-id').html();
        var name = thisObj.parent().parent().find('.style-name').html();
        var sport = thisObj.parent().parent().find('.style-sport').html();
        var block_pattern = thisObj.parent().parent().find('.style-block-pattern').html();
        var option = thisObj.parent().parent().find('.style-option').html();
        var item_id = thisObj.parent().parent().find('.style-qstrike-item-id').html();
        var priority = thisObj.parent().parent().find('.style-priority').html();
        var customizer_id = thisObj.parent().parent().find('.style-customizer-id').val();
        var status = thisObj.parent().parent().find('.style-status').val();
        var notes = thisObj.parent().parent().find('.notes').val();
        var type = thisObj.parent().parent().find('.style-type').html();
        var application_type = thisObj.parent().parent().find('.style-application-type').html();
        var is_fixed = thisObj.parent().parent().find('.style-is-fixed').val();
        var design_sheet_url = thisObj.parent().parent().find('.style-design-sheet-url').val();
        var deadline = thisObj.parent().parent().find('.style-deadline').html();
        var brand = thisObj.parent().parent().find('.style-brand').html();
        var customizer_available = thisObj.parent().parent().find('.style-customizer-available').val();

        window.sport_value = sport;
        window.block_pattern_value = block_pattern;
        window.option_value = option;
        buildSportsDropdown();
        $('.sport').trigger('change');
        $('.id').val(id);
        $('.name').val(name);
        $('.qstrike-item-id').val(item_id);
        $('.priority').val(priority);
        $('.customizer-id').val(customizer_id);
        $('.status').val(status);
        $('#input_notes').val(notes);
        $('.type').val(type);
        $('.application_type').val(application_type);
        $('.design-sheet-path').val(design_sheet_url);
        $('.brand').val(brand);
        $('#datepicker').val(deadline);

        if (is_fixed == 1)
            {
            $('.is_fixed').prop('checked', true);
        }
        else {
            $('.is_fixed').prop('checked', false);
        }

        if (customizer_available == 1) {
            $('.customizer_available').prop('checked', true);
        } else {
            $('.customizer_available').prop('checked', false);
        }

        $('#myModal').modal('show');

    }

    $('#style_requests_table').on('click', '.view-notes', function(e){
        e.preventDefault();
        //Open loading modal
        getNotes($(this));
        $('#viewModal').modal('show');
    });

    function getNotes(thisObj) {
      var notes = thisObj.parent().parent().find('.notes').val();
      $('#notes_text').text(notes);
    }

    $('#style_requests_table').on('click', '.delete-style-request', function(){
       var id = [];
       id.push( $(this).data('style-request-id'));
       // console.log(id);
       modalConfirm('Remove Style Request', 'Are you sure you want to delete the request?', id);
       });

       $('#confirmation-modal .confirm-yes').on('click', function(){
            var id = $(this).data('value');
            console.log(id);
            var url = "//" + api_host + "/api/v1-0/style_request/delete";

            $.ajax({
               url: url,
               type: "POST",
               data: JSON.stringify({id: id}),
               dataType: "json",
               crossDomain: true,
               contentType: 'application/json',
               //headers: {"accessToken": atob(headerValue)},
               success: function(response){
                   if (response.success) {
                       new PNotify({
                           title: 'Success',
                           text: response.message,
                           type: 'success',
                           hide: true
                       });
                       $('#confirmation-modal').modal('hide');
                      $.each(id, function (index, value) {
                         // console.log(value);
                         $('.style-request-' + value).fadeOut();

                       });

                   }
               }
           });
       });

 });
</script>
@endsection
