@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<link rel="stylesheet" type="text/css" href="/dropzone/dropzone.css">
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
                    <table data-toggle='table' class='table table-bordered style-requests'>
                    <thead>
                        <tr>
                            <th>Style Name</th>
                            <th>Block Pattern</th>
                            <th>Option
                            <a href="#" data-toggle="tooltip" data-message="Neck, waist or other options"><span class="glyphicon glyphicon-info-sign"></span></a>
                            </th>
                            <th>Sport</th>
                            <th>Design Sheet</th>
                            <th>Item ID
                            <a href="#" data-toggle="tooltip" data-message="QStrike Item ID"><span class="glyphicon glyphicon-info-sign"></span></a>
                            </th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Requested By</th>
                            <th>Uploaded</th>
                            <th>Customizer ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($style_requests as $style_request)
                    <tr>
                        <td>{{ $style_request->name }}</td>
                        <td>{{ $style_request->block_pattern }}</td>
                        <td>{{ $style_request->block_pattern_option }}</td>
                        <td>{{ $style_request->sport }}</td>
                        <td>{{ $style_request->design_sheet_url }}</td>
                        <td>{{ $style_request->qstrike_item_id }}</td>
                        <td>{{ $style_request->priority }}</td>
                        <td>{{ $style_request->deadline }}</td>
                        <td>{{ $style_request->requested_by }}</td>
                        <td>{{ $style_request->uploaded }}</td>
                        <td>{{ $style_request->customizer_id }}</td>

                    </tr>
                    @empty

                        <tr>
                            <td colspan='11'>
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
            <form class="form-horizontal" role="form" method="POST" action="#" enctype="multipart/form-data" id='style-request-form'>
            <input type="hidden" class="design-sheet-path">
            <input type="hidden" class="data-string">
            <div class="form-group">
                <label class="col-md-4 control-label">Style Name</label>
                <div class="col-md-6">
                    <input type="text" class="form-control style-name" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Block Pattern</label>
                <div class="col-md-6">
                    <input type="text" class="form-control block-pattern" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Option</label>
                <div class="col-md-6">
                    <input type="text" class="form-control block-pattern-option" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">Sport</label>
                <div class="col-md-6">
                    <input type="text" class="form-control sport" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">QSTRIKE Item ID</label>
                <div class="col-md-6">
                    <input type="number" class="form-control qstrike-item-id" required>
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
            <div class="form-group">
                <label class="col-md-4 control-label">Deadline</label>
                <div class="col-md-6">
                    <input type="date" class="form-control deadline" required>
                </div>
            </div>
            <div class="form-group">
                <center>
                    <button type="submit" class="btn btn-primary save-data">
                        Save Request
                    </button>
                </center>
            </div>
            </form>
            <h4 class="alert alert-info">Upload Design Sheet below</h4>
            <form action="/administration/material/insert_dz_design_sheet" class="dropzone" id="my-awesome-dropzone">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
</section>
	
@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script type="text/javascript">

    $(document).on('change', '.style-name, .block-pattern, .block-pattern-option, .sport, .qstrike-item-id, .priority, .deadline, .design_sheet', function() {
        updateData();
    });

    window.data = {};

    $('.save-data').on('click', function(e){
        e.preventDefault();
        console.log('submit');

        var data = $('.data-string').val();
        console.log(data);
        $.ajax({
            url: "http://localhost:8888/api/v1-0/style_request",
            type: "POST",
            data: data,
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    console.log(response.message);
                    window.location.reload();
                }
            }
        });
    });

    function updateData(){
        var name = $('.style-name').val();
        var block_pattern = $('.block-pattern').val();
        var block_pattern_option = $('.block-pattern-option').val();
        var sport = $('.sport').val();
        var qstrike_item_id = $('.qstrike-item-id').val();
        var priority = $('.priority').val();
        var deadline = $('.deadline').val();
        var design_sheet_url = $('.design-sheet-path').val();
        window.data = {
            'style_name' : style_name,
            'block_pattern' : block_pattern,
            'block_pattern_option' : block_pattern_option,
            'sport' : sport,
            'qstrike_item_id' : qstrike_item_id,
            'priority' : priority,
            'deadline' : deadline,
            'design_sheet' : design_sheet
        };
        $('.data-string').val(JSON.stringify(window.data));
        console.log(window.data);
    }

    $('[data-toggle="tooltip"]').popover({
        html: true,
        trigger: 'hover',
        placement: 'top',
        content: function(){
            return $(this).data('message');
        }
    });

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
            console.log(filesData);
            // buildRows(filesData);
        },
        complete: function(file){
            // console.log('completed');
            files.push(file.name);
            $('.design-sheet-path').val(file.url);
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
    // $(document).on('click', '.delete-accent', function(){
    //   $.confirm({
    //   title: 'Accent',
    //   content: 'Are you want to delete accent?',
    //   confirmButton: 'YES',
    //   cancelButton: 'NO',
    //   confirmButtonClass: 'confirmButtonYes btn-danger',
    //   cancelButtonClass: 'confirmButtonNo btn-success',
    //   });
    //   $(".confirmButtonYes").attr('data-accent-id',$(this).data('accent-id'));
     

     
    // });
    //  $(document).on('click', '.enable-accent', function(){

    //   console.log("enable-accent");
    //     var id = $(this).data('accent-id');
    //      var url = "//" + api_host + "/api/accent/enable/";
    //     //var url = "//localhost:8888/api/accent/enable/";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 var elem = '.accent-' + id;
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 $(elem + ' .disable-accent').removeAttr('disabled');
    //                 $(elem + ' .enable-accent').attr('disabled', 'disabled');
    //                 $(elem).removeClass('inactive');
    //             }
    //         }
    //     });
    // });

    // $(document).on('click', '.disable-accent', function(){

    //     var id = $(this).data('accent-id');
    //     var url = "//" + api_host + "/api/accent/disable/";
    //     //var url = "//localhost:8888/api/accent/disable/";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 var elem = '.accent-' + id;
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 $(elem + ' .enable-accent').removeAttr('disabled');
    //                 $(elem + ' .disable-accent').attr('disabled', 'disabled');
    //                 $(elem).addClass('inactive');
    //             }
    //         }
    //     });
    // });
    // $(document).on('click', '.confirmButtonYes', function(){
      
    //     var id = $(this).data('accent-id');
    //     console.log(id);
    //     // var url = "http://localhost:8888/api/accent/delete";
    //     var url = "//" + api_host + "/api/accent/delete/";
                   
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 // $('#confirmation-modal').modal('hide');
    //                 $('.font-' + id).fadeOut();
    //                  $( ".accents" ).load( location+" .accents" );  

    //             }
    //         }
    //     });
    //  });
</script>
@endsection
