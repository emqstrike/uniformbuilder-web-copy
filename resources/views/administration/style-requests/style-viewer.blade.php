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
    table.borderless td,table.borderless th{
        border: none !important;
    }
    .has-loading {
      background: transparent url('http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif') center no-repeat;
    }
</style>
@endsection

@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <p style="position: absolute; display: inline;" class="style-name">STYLE</p>
                    </h1>
                </div>
                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="#" enctype="multipart/form-data" id='syle-viewer-form'>
                        <table class="table borderless">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">
                                                <span class="label label-info">CURRENT SPORT: </span>
                                            </label>
                                            <div class="col-md-5">
                                                <select class="form-control show-sport-dd">
                                                </select>
                                            </div>
                                        </div>
                                         <div class="form-group">
                                            <label class="col-md-4 control-label">
                                                <span class="label label-info">With Item IDs: </span>
                                            </label>
                                            <div class="col-md-4">
                                                <select class="form-control show-with-item-id">
                                                    <option value ="0">No</option>
                                                    <option value ="1">Yes</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">
                                                <span class="label label-info">Show Customizer Available: </span>
                                            </label>
                                            <div class="col-md-4">
                                                <select class="form-control show-customizer-available" disabled="">
                                                    <option value ="0">No</option>
                                                    <option value ="1">Yes</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                 <a href="#" class="btn btn-default filter" style="width: 100px;">Search</a><hr>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="6">
                                        <img src="" class="front-image has-loading" style="height: 420; width: 388; border: 1px solid black;">
                                    </td>
                                    <td>
                                        <!-- <div class="form-group">
                                            <label class="col-md-4 control-label">Sport</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control sport-input">
                                            </div>
                                        </div> -->
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">Block Pattern</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control block-pattern-input" disabled>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">Block Pattern Option</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control block-pattern-option-input" disabled>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">Application Type</label>
                                            <div class="col-md-4">
                                                <!-- <input type="text" class="form-control application-type-input" required> -->
                                                <select class="form-control application-type-input" disabled>
                                                    <option value="tackle_twill">Tackle Twill</option>
                                                    <option value="sublimated">Sublimated</option>
                                                    <option value="infused">Infused</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">QStrike Item ID</label>
                                            <div class="col-md-4">
                                                <input type="number" class="form-control qstrike-item-id-input" required>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">Show in Customizer</label>
                                            <div class="col-md-4">
                                                <!-- <input type="text" class="form-control show-in-customizer-input" required> -->
                                                <select class="form-control show-in-customizer-input">
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="back-image has-loading" style="height: 47px; width: 43px; border: 1px solid black;">
                                        <img src="left-image has-loading" style="height: 47px; width: 43px; border: 1px solid black;">
                                        <img src="right-image has-loading" style="height: 47px; width: 43px; border: 1px solid black;">
                                    </td>
                                    <td>
                                        <center>
                                            <a href="#" class="btn btn-success update-button" style="width: 200px;">Update</a><hr>
                                            <a href="#" class="btn btn-primary previous-button" style="width: 100px;">Previous</a>
                                            <a href="#" class="btn btn-primary next-button" style="width: 100px;">Next</a>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>

<div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="progress-modal-message"></h1>
      </div>
    </div>
  </div>
</div>

</section>


@include('partials.confirmation-modal-success')

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

    window.default_sport = "Football";
    window.default_material_id = 92; // material = uniform
    window.selected_sport = null;
    window.materials = null;
    window.current_values = null;
    window.current_index = 0;
    window.sports = null;
    var pleaseWait = $('#pleaseWaitDialog');

    showPleaseWait = function() {
        pleaseWait.modal('show');
    };

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };

    // showPleaseWait();
    $('.progress-modal-message').html('Loading Styles...');

    getDefaultMaterials(function(materials){
        window.materials = materials; });

    function getDefaultMaterials(callback){
        var materials;
        var url = "//api.prolook.com/api/materials/category/"+window.default_sport;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                materials = data['materials'];
                if(typeof callback === "function") callback(materials);
            }
        });
         hidePleaseWait();
    }

    getSports(function(sports){ window.sports = sports; });
    function getSports(callback){
        var sports;
        var url = "https://api.prolook.com/api/categories";
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

    generateSportsDD();
    function generateSportsDD(){
        $('.show-sport-dd').html('');
        var data = window.sports;
        try {
            data.forEach(function(entry) {
                $('.show-sport-dd').append('<option value="'+entry.name+'">'+entry.name+'</option');
            });
        }
        catch(err) {
            console.log(err.message);
        }
    }

    generateValues();
    function generateValues(button_pressed = "next"){

        $('.front-image').attr("src", "http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif");
        $('.front-image').css("height", "420px");
        $('.front-image').css("width", "388px");

        if(typeof window.materials[window.current_index] === 'undefined' && button_pressed == "next"){
            window.current_index = 0;
        }

        if(typeof window.materials[window.current_index] === 'undefined' && button_pressed == "previous"){
            window.current_index = window.materials.length-1;
        }
        $('.style-name').text(window.materials[window.current_index].name);
        // $('.sport-input').val(window.materials[window.current_index].uniform_category);
        $('.block-pattern-input').val(window.materials[window.current_index].block_pattern);
        $('.block-pattern-option-input').val(window.materials[window.current_index].neck_option);
        $('.qstrike-item-id-input').val(window.materials[window.current_index].item_id);
        $('.application-type-input option[value="' + window.materials[window.current_index].uniform_application_type +'"]').prop("selected", true);
        $('.show-in-customizer-input option[value="' + window.materials[window.current_index].customizer_available +'"]').prop("selected", true);
        $('.show-sport-dd option[value="' + window.default_sport +'"]').prop("selected", true);

        $('.front-image').attr("src",window.materials[window.current_index].thumbnail_path);
        $('.back-image').attr("src",window.materials[window.current_index].thumbnail_path_back);
        $('.left-image').attr("src",window.materials[window.current_index].thumbnail_path_left);
        $('.right-image').attr("src",window.materials[window.current_index].thumbnail_path_right);

        window.default_material_id = window.materials[window.current_index].id;
        setTimeout(hidePleaseWait(), 5000);

    }

    $(document).on('change', '.show-sport-dd', function() {
        showPleaseWait();
        $('.progress-modal-message').html('Loading '+$(this).val()+' styles...');
        window.default_sport = $(this).val();
        getDefaultMaterials(function(materials){ window.materials = materials; });
        window.current_index = 0;
        $('.show-with-item-id').trigger('change');
    });

    $(document).on('change', '.show-with-item-id', function() {
       $item_id = $(this).val();
        if ($item_id == 1) {
            $('.show-customizer-available').removeAttr('disabled');
            getWithItemID(window.materials);
        }
        else {
            $('.show-customizer-available').val(0);
            $('.show-customizer-available').attr('disabled', true);
            getWithoutItemID(window.materials);
        }
        $('.show-customizer-available').trigger('change');
        console.log(window.materials);
    });

    $(document).on('change', '.show-customizer-available', function() {
        $available = $(this).val();
        if ($available == 1) {
            getCustomizerAvailable(window.materials);
        }
        else {
            getNotCustomizerAvailable(window.materials);
        }
        console.log(window.materials);
        generateValues();
    });

    $('.show-sport-dd').trigger('change');

    $(document).on('click', '.filter', function()
    {
        $('.show-sport-dd').trigger('change');
    });


    function getWithItemID (materials){
        window.materials = _.filter(materials, function(e){
            return e.item_id != 0;
        });
    };

    function getWithoutItemID (materials){
        window.materials = _.filter(materials, function(e){
            return e.item_id == 0;
        });
    };

    function getCustomizerAvailable (materials){
        window.materials = _.filter(materials, function(e){
            return e.customizer_available == 1;
        });
    };

    function getNotCustomizerAvailable (materials){
       window.materials = _.filter(materials, function(e){
            return e.customizer_available == 0;
        });
    };



    $('.next-button').on('click', function(e){
        e.preventDefault();
        showPleaseWait();
        $('.progress-modal-message').html('Loading style information...');
        window.current_index = window.current_index + 1;
        generateValues("next");
    });

    $('.previous-button').on('click', function(e){
        e.preventDefault();
        showPleaseWait();
        $('.progress-modal-message').html('Loading style information...');
        window.current_index = window.current_index - 1;
        generateValues("previous");
    });

    $('.update-button').on('click', function(e){
        e.preventDefault();
        // showPleaseWait();
        // modalConfirm('Remove font', 'Are you sure you want to delete the font?', id);
        modalConfirm('Update style', 'Are you sure you want to update the style information?');
        // $('.progress-modal-message').html('Loading style information...');
        // window.current_index = window.current_index - 1;
        // generateValues("previous");
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        console.log('update - confirmed');
        $('#confirmation-modal').modal('hide');
        showPleaseWait();
        $('.progress-modal-message').html('Updating style information...');
        //  var id = $(this).data('value');


        // var url = "//" + api_host + "/api/font/delete/";
        // //var url = "//localhost:8888/api/font/delete/";

        var id = window.default_material_id;
        var item_id = $('.qstrike-item-id-input').val();
        var customizer_available = $('.show-in-customizer-input').val();
        var data = {id: id, item_id: item_id, customizer_available: customizer_available};
        // console.log(data);
        $.ajax({
            url: "//api.prolook.com/api/material/updatePartial",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(response){
                if (response.success) {
                    // console.log('Success');
                    $('#confirmation-modal').modal('hide');
                    var pleaseWait = $('#pleaseWaitDialog');
                    hidePleaseWait = function () {
                        pleaseWait.modal('hide');
                    };
                    hidePleaseWait();
                }
            }
        });
    });

 });
</script>
@endsection
