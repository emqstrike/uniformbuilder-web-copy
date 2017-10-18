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
                        
                        Style Requests
                        <small>
                            <a href="#" class='btn btn-xs btn-success' data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add Request
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' id="style_requests_table" class='table table-bordered style-requests data-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Style Name</th>                          
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Option
                            <a href="#" data-toggle="tooltip" data-message="Neck, waist or other options"><span class="glyphicon glyphicon-info-sign"></span></a>
                            </th>
                            <th>Design Sheet</th>
                            <th>Item ID
                            <a href="#" data-toggle="tooltip" data-message="QStrike Item ID"><span class="glyphicon glyphicon-info-sign"></span></a>
                            </th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Requested By</th>
                            <th>Uploaded</th>
                            <th>Customizer ID</th>
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
                        <td>
                            <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $style_request->design_sheet_url }}">Link</a>
                        </td>
                        <td class="style-qstrike-item-id">{{ $style_request->qstrike_item_id }}</td>
                        <td class="style-priority">{{ $style_request->priority }}</td>
                        <td >{{ $style_request->deadline }}</td>
                        <td>{{ $style_request->requested_by }}</td>
                        <td>
                            @if($style_request->uploaded) 
                                {{ 'Yes' }}                        
                            @else 
                                {{ 'No' }}
                            @endif
                            <a href="#" data-toggle="tooltip" data-message="{{ $style_request->uploaded_by }}"><span class="glyphicon glyphicon-info-sign"></span></a>
                        
                        </td>
                        <td class="style-customizer-id">{{ $style_request->customizer_id }}</td>
                        <td>
                            <button type="button" class="btn btn-info btn-xs edit" ><i class="glyphicon glyphicon-edit"></i></button>
                         {{--    <button type="button" class="btn btn-default btn-xs submit"><i class="glyphicon glyphicon-floppy-save"></i></button> --}}
                            
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


    <!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> -->

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
                <label class="col-md-4 control-label">Option</label>
                <div class="col-md-6">
                    <!-- <input type="text" class="form-control block-pattern-option" required> -->
                    <select class="form-control block-pattern-option">
                        <option value="none">Select Block Pattern Option</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">QSTRIKE Item ID</label>
                <div class="col-md-6">
                    <input type="number" class="form-control qstrike-item-id" id="qstrike_item_id" required>
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
            <div class="form-group" style="margin-top: 260px; z-index: 3;">
                <center>
                    <button type="submit" class="btn btn-primary save-data">
                        Save Request
                    </button>
                </center>
            </div>
            </form>
            <div style="z-index: 2; margin-top: -250px; position: absolute; width: 95%;">
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
    // var date = $('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val();

    // $('.submit').attr('disabled','disabled'); 

    $('.save-data').attr('disabled','disabled'); 

    $('#style_requests_table').on('click', '.file-link', function(e){
        e.preventDefault()
        console.log('file link');
        var url = $(this).data('link');
        OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    } 

    $(document).on('change', '.name, .block-pattern-option, .qstrike-item-id, .priority, .deadline, .design_sheet, .customizer-id', function() {
        updateData();
        // console.log($('.deadline').val());
    });

    $(document).on('change', '.sport', function() {
        window.uniform_category_id = $('.sport option:selected').data('uniform-category-id');
        console.log(window.uniform_category_id);
        $('.block-pattern').html('');
        var ucid = window.uniform_category_id.toString();
        var filtered_block_patterns = _.filter(window.block_pattern, function(e){ return e.uniform_category_id == ucid; });
        // console.log(filtered_block_patterns);

        var sorted_block_patterns = _.sortBy(filtered_block_patterns, function(o) { return o.name; });
        // console.log(sorted_sports);
        var block_pattern_value = window.block_pattern_value;
        $( '#block_pattern' ).html('');
        sorted_block_patterns.forEach(function(entry) {
            if(block_pattern_value == entry.name){
                var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'" selected>'+entry.name+'</option>'
                $('.block-pattern').append(elem);
            }
            else {
                var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'">'+entry.name+'</option>'
                $('.block-pattern').append(elem);
            }
        });
    });

    $(document).on('change', '.block-pattern', function() {
        window.block_pattern_id = $('.block-pattern option:selected').data('block-pattern-id');
        console.log(window.uniform_category_id);
        $('.block-pattern-option').html('<option value="none" data-block-pattern-id="0">Select Block Pattern Option</option>');

        var block_pattern = _.filter(window.block_pattern, function(e){ return e.id == window.block_pattern_id.toString(); });
        console.log(block_pattern);

        // var sorted_block_pattern = _.sortBy(block_pattern, function(o) { return o.name; });
        if(block_pattern[0].neck_options != "null"){

            console.log('block_pattern');
            console.log(block_pattern);

            // var x = _.flatten(JSON.parse(block_pattern[0].neck_options.slice(1, -1)));
            var x = JSON.parse(block_pattern[0].neck_options);
            console.log('block pattern option');
            console.log(x);
            // var w = JSON.parse(sorted_block_pattern.neck_options.slice(1, -1));
            // var x = _.flatten(w);
            // console.log(x);
            // x.forEach(function(entry) {
            //     var elem = '<option value="'+entry.name+'">'+entry.name+'</option>'
            //     $('.block-pattern-option').append(elem);
            // });
            var list = [];
            _.each(x, function(item){
                list.push(_.omit(item, 'children'));
                list.push(_.flatten(_.pick(item, 'children')));
            });
            var result = _.flatten(list);
            console.log('result')
            console.log(result);
            var option_value = window.option_value;
            $('.block-pattern-option').html('');
            result.forEach(function(entry) {
                if (option_value == entry.name) {
                    var elem = '<option value="'+entry.name+'" selected>'+entry.name+'</option>'
                    $('.block-pattern-option').append(elem);
                }
                else {
                   var elem = '<option value="'+entry.name+'">'+entry.name+'</option>'
                    $('.block-pattern-option').append(elem); 
                }
                
            });
        }
    });

    window.data = {};
    window.sports = null;    
    window.block_pattern = null;
    window.block_pattern_option = null;
    window.uniform_category_id = null;

    $('.save-data').on('click', function(e){
        e.preventDefault();
        console.log('submit');

        var data = $('.data-string').val();
        if (window.data.id != '')
        {
            var url = "//" + api_host + "/api/v1-0/style_request/update"; 
        }
        else {
            var url = "//" + api_host + "/api/v1-0/style_request";        
        }           
      
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
                    // console.log(response.data);
                    window.location.reload();
                }
            }
        });
    });

    function updateData(){
        var id = $('.id').val();
        var name = $('.name').val();
        var block_pattern = $('.block-pattern').val();
        var block_pattern_option = $('.block-pattern-option').val();
        var sport = $('.sport').val();
        var qstrike_item_id = $('.qstrike-item-id').val();
        var priority = $('.priority').val();
        var deadline = $('.deadline').val();
        var deadline = $('#datepicker').val();
        var design_sheet_url = $('.design-sheet-path').val();
        var customizer_id = $('.customizer-id').val();
        window.data = {
            'id' : id,
            'name' : name,
            'block_pattern' : block_pattern,
            'block_pattern_option' : block_pattern_option,
            'sport' : sport,
            'qstrike_item_id' : qstrike_item_id,
            'priority' : priority,
            'deadline' : deadline,
            'design_sheet_url' : design_sheet_url,
            'customizer_id' : customizer_id
        };
        $('.data-string').val(JSON.stringify(window.data));
        console.log(window.data);
    }

    var files = [];
    var filesData = [];
    this.addRemoveLinks = true;

    Dropzone.options.myAwesomeDropzone = {
        // addRemoveLinks: true,
        success: function(file, response){
            //alert(response);
            // console.log(file);
            // console.log(response);
            filesData.push({
                'name' : file.name,
                'url' : response
            });
            // console.log(filesData);
            $('.design-sheet-path').val(filesData[0].url);
            // buildRows(filesData);
        },
        complete: function(file){
            // console.log('completed');
            files.push(file.name);
            // $('.design-sheet-path').val(file.url);
            updateData();
            // console.log(files);
            // console.log(file);
            // hidePleaseWait();
        },
        removedfile: function(file) {
            files.splice(files.indexOf(file.name), 1);
            // console.log(files);
            // console.log(filesData);
        },
        drop: function(){
            // showPleaseWait();
            // $('.progress-modal-message').html('Uploading image . . .');
        },
    };

    getSports(function(sports){ window.sports = sports; });
    function getSports(callback){
        var sports;
        var url = "//api-dev.qstrike.com/api/categories";
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
        var url = "//api-dev.qstrike.com/api/block_patterns";
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
        console.log(sorted_sports);
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
        // $('#name').trigger('keyup');
       
    });

    $("#myModal").on("hidden.bs.modal", function() {
   
        window.sport_value = null;
        buildSportsDropdown();
        $('.sport').trigger('change');  
        $('.id').val('');
        $('.name').val('');
        $('.qstrike-item-id').val('');
        $('.customizer-id').val('');
        $('#deadline').attr({"style": "display: block;"});
        $('#customizer').attr({"style": "display: none;"});

    });

    $(".name, #qstrike_item_id, #customizer_id").on("keyup", function(e){    
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

    function getValues(thisObj)
    {
        var id = thisObj.parent().parent().find('.style-id').html();
        var name = thisObj.parent().parent().find('.style-name').html();
        var sport = thisObj.parent().parent().find('.style-sport').html();
        var block_pattern = thisObj.parent().parent().find('.style-block-pattern').html();
        var option = thisObj.parent().parent().find('.style-option').html();
        var item_id = thisObj.parent().parent().find('.style-qstrike-item-id').html();
        var priority = thisObj.parent().parent().find('.style-priority').html();
        var customizer_id = thisObj.parent().parent().find('.style-customizer-id').html();

        window.sport_value = sport;
        window.block_pattern_value = block_pattern;
        window.option_value = option;
        buildSportsDropdown();
        $('.sport').trigger('change');  
        $('.block-pattern').trigger('change');  
        $('.id').val(id); 
        $('.name').val(name);       
        $('.qstrike-item-id').val(item_id);
        $('.priority').val(priority);      
        $('.customizer-id').val(customizer_id);

        $('#myModal').modal('show'); 

    }

    $('#style_requests_table').on('click', '.delete-style-request', function(){
       var id = [];
       id.push( $(this).data('style-request-id'));
       console.log(id);
       modalConfirm('Remove Style Request', 'Are you sure you want to delete the request?', id);
       });

       $('#confirmation-modal .confirm-yes').on('click', function(){
            var id = $(this).data('value');
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
                         console.log(value);
                         $('.style-request-' + value).fadeOut();
                         // Will stop running after "three"
                         
                       });              

                   }
               }
           });
       });   

 });
</script>
@endsection
