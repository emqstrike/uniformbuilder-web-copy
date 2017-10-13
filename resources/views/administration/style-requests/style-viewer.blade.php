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
                        
                        Style: <p style="position: absolute; display: inline;">NAME HERE</p>
                    </h1>
                </div>
                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="#" enctype="multipart/form-data" id='syle-viewer-form'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="6">
                                        <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/arkansas-14-jersey_6_football_v_(f01)357dbae3cb12/thumbnail.jpg" style="height: 420; width: 388;">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control style-name" id="style_name" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/arkansas-14-jersey_6_football_v_(f01)357dbae3cb12/thumbnail.jpg" style="height: 47; width: 43;">
                                        <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/arkansas-14-jersey_6_football_v_(f01)357dbae3cb12/thumbnail.jpg" style="height: 47; width: 43;">
                                        <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/arkansas-14-jersey_6_football_v_(f01)357dbae3cb12/thumbnail.jpg" style="height: 47; width: 43;">
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>

</section>


@include('partials.confirmation-modal')

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript">
$(function(){

    $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    // var date = $('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val();

    $('.submit').attr('disabled','disabled'); 

    $('.save-data').attr('disabled','disabled'); 

    $('.file-link').on('click', function(e){
        console.log('file link');
        var url = $(this).data('link');
        OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    } 

    $(document).on('change', '.style-name, .block-pattern-option, .qstrike-item-id, .priority, .deadline, .design_sheet', function() {
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
        sorted_block_patterns.forEach(function(entry) {
            var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'">'+entry.name+'</option>'
            $('.block-pattern').append(elem);
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

            result.forEach(function(entry) {
                var elem = '<option value="'+entry.name+'">'+entry.name+'</option>'
                $('.block-pattern-option').append(elem);
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
        var url = "//" + api_host + "/api/v1-0/style_request";        
        console.log(data);
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
        var name = $('.style-name').val();
        var block_pattern = $('.block-pattern').val();
        var block_pattern_option = $('.block-pattern-option').val();
        var sport = $('.sport').val();
        var qstrike_item_id = $('.qstrike-item-id').val();
        var priority = $('.priority').val();
        // var deadline = $('.deadline').val();
        var deadline = $('#datepicker').val();
        var design_sheet_url = $('.design-sheet-path').val();
        window.data = {
            'name' : name,
            'block_pattern' : block_pattern,
            'block_pattern_option' : block_pattern_option,
            'sport' : sport,
            'qstrike_item_id' : qstrike_item_id,
            'priority' : priority,
            'deadline' : deadline,
            'design_sheet_url' : design_sheet_url
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
        sorted_sports.forEach(function(entry) {
            var elem = '<option value="'+entry.name+'" data-uniform-category-id="'+entry.id+'">'+entry.name+'</option>'
            $('.sport').append(elem);
        });
    }

    $('.edit').on('click', function(e){
        e.preventDefault();
        $(this).parent().parent().find('#item-id').attr('contenteditable', 'true');
        $(this).parent().parent().find('#customizer-id').attr('contenteditable', 'true');
    });

    $(".style-qstrike-item-id, .style-customizer-id").on("keyup", function(e){    
        e.preventDefault();

        $(this).parent().find('.submit').removeAttr('disabled');     
    });

    $("#style_name, #qstrike_item_id").on("keyup", function(e){    
        e.preventDefault();
        var name = document.getElementById("style_name").value;
        var qx_id = document.getElementById("qstrike_item_id").value;
        if ( name.length > 0 && qx_id.length > 0) {    
            $('.save-data').removeAttr('disabled');
        } 
        else {
            $('.save-data').attr('disabled','disabled'); 
        }

    });

    $('.submit').on('click', function(e){
        e.preventDefault();           
        saveValue($(this));
        $(this).parent().parent().find('#item-id').attr('contenteditable', 'false');
        $(this).parent().parent().find('#customizer-id').attr('contenteditable', 'false');
    });

    function saveValue(thisObj){
        var temp = [];
            var data = {
                    "id" : thisObj.parent().parent().find('.style-id').text(),
                    "qstrike_item_id" : thisObj.parent().parent().find('.style-qstrike-item-id').text(),
                    "customizer_id" : thisObj.parent().parent().find('.style-customizer-id').text(),
        };

            temp.push(data);
            console.log(data);
            var material = JSON.stringify(temp);
            console.log(material);

        var url = "//" + api_host + "/api/v1-0/style_request/update";   
             
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataTYPE: "json",
            crossDomain: true,
            contentType: 'application/json',
            // headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success){
                    new PNotify({
                    title: 'Success',
                    text: response.message,
                    type: 'success',
                    hide: true
                    });
                    $('.submit').attr('disabled','disabled');  
                  
                }

            }
        })
    }

    $('.delete-style-request').on('click', function(){
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
