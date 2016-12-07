@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Piping</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/piping/update" enctype="multipart/form-data" id='edit-piping-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">
                        <input type="hidden" name="set" value="Piping">

                        <table class="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="alert alert-success"><h4>Size: 1/8</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <label class="col-md-5 control-label">Name</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control material-name" name="name_oe" value="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FRONT</td>
                                    <td>BACK</td>
                                    <td>LEFT</td>
                                    <td>RIGHT</td>
                                </tr>
                                <tr>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                </tr>
                                <tr>
                                    <td><span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span><input type="file" name="f_position_1_18" accept="image/*"></td>
                                    <td><input type="file" name="b_position_1_18" accept="image/*"></td>
                                    <td><input type="file" name="l_position_1_18" accept="image/*"></td>
                                    <td><input type="file" name="r_position_1_18" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_2_18" accept="image/*"></td>
                                    <td><input type="file" name="b_position_2_18" accept="image/*"></td>
                                    <td><input type="file" name="l_position_2_18" accept="image/*"></td>
                                    <td><input type="file" name="r_position_2_18" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_3_18" accept="image/*"></td>
                                    <td><input type="file" name="b_position_3_18" accept="image/*"></td>
                                    <td><input type="file" name="l_position_3_18" accept="image/*"></td>
                                    <td><input type="file" name="r_position_3_18" accept="image/*"></td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="alert alert-info"><h4>Size: 1/4</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <label class="col-md-5 control-label">Name</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control material-name" name="name_of" value="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FRONT</td>
                                    <td>BACK</td>
                                    <td>LEFT</td>
                                    <td>RIGHT</td>
                                </tr>
                                <tr>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_1_14" accept="image/*"></td>
                                    <td><input type="file" name="b_position_1_14" accept="image/*"></td>
                                    <td><input type="file" name="l_position_1_14" accept="image/*"></td>
                                    <td><input type="file" name="r_position_1_14" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_2_14" accept="image/*"></td>
                                    <td><input type="file" name="b_position_2_14" accept="image/*"></td>
                                    <td><input type="file" name="l_position_2_14" accept="image/*"></td>
                                    <td><input type="file" name="r_position_2_14" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_3_14" accept="image/*"></td>
                                    <td><input type="file" name="b_position_3_14" accept="image/*"></td>
                                    <td><input type="file" name="l_position_3_14" accept="image/*"></td>
                                    <td><input type="file" name="r_position_3_14" accept="image/*"></td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="alert alert-warning"><h4>Size: 1/2</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <label class="col-md-5 control-label">Name</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control material-name" name="name_oh" value="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FRONT</td>
                                    <td>BACK</td>
                                    <td>LEFT</td>
                                    <td>RIGHT</td>
                                </tr>
                                <tr>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_1_12" accept="image/*"></td>
                                    <td><input type="file" name="b_position_1_12" accept="image/*"></td>
                                    <td><input type="file" name="l_position_1_12" accept="image/*"></td>
                                    <td><input type="file" name="r_position_1_12" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_2_12" accept="image/*"></td>
                                    <td><input type="file" name="b_position_2_12" accept="image/*"></td>
                                    <td><input type="file" name="l_position_2_12" accept="image/*"></td>
                                    <td><input type="file" name="r_position_2_12" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td><input type="file" name="f_position_3_12" accept="image/*"></td>
                                    <td><input type="file" name="b_position_3_12" accept="image/*"></td>
                                    <td><input type="file" name="l_position_3_12" accept="image/*"></td>
                                    <td><input type="file" name="r_position_3_12" accept="image/*"></td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="form-group col-md-12">
                            <!-- <div class="col-md-4 col-md-offset-4"> -->
                                <center>
                                    <button type="submit" class="btn btn-primary edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Piping
                                    </button>
                                    <!-- <a href="#" class="btn btn-success edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Material
                                    </a> -->
                                    <a href="/administration/materials" class="btn btn-danger" style="margin-right: 15px;">
                                        <span class="glyphicon glyphicon-arrow-left"></span>
                                        Cancel
                                    </a>
                                </center>
                            <!-- </div> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>f_
</div>
@include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])

@endsection

@section('scripts')
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script>
$( document ).ready(function() {

    window.price_items = null;
    getPriceItems(function(price_items){ window.price_items = price_items; });
    function getPriceItems(callback){
        var price_items;
        var url = "//api-dev.qstrike.com/api/price_items";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                price_items = data['price_items'];
                if(typeof callback === "function") callback(price_items);
            }
        });
    }

    var price_items_dd = '<option value=""> - - - </option>';
    window.price_items.forEach(function(entry) {
        price_items_dd += '<option value="' + entry.price_item + '" data-msrp="' + entry.msrp + '" data-wsp="' + entry.web_price_sale + '">' + entry.price_item + '</option>';
    });

    $(".pi-dd").each(function(i) {
        $(this).append(price_items_dd);
    });
    if( $('#sizes').val() != "" ){
        var size_obj = JSON.parse($('#sizes').val().slice(1, -1));
        console.log(size_obj);
        size_obj['adult'].forEach(function(entry) {
            // console.log(entry.size);
            $(".pi-dd").each(function(i) {
                var elem = $(this);
                if( elem.data('size') == entry.size ){
                    // elem.append('<option selected>HERE!</option');
                    elem.find('option').each(function(index,element){
                        if( element.value == entry.price_item ){
                            // console.log('Match!');
                            $(this).prop("selected", "selected");
                        }
                    });
                }
            });
        });

        size_obj['youth'].forEach(function(entry) {
            // console.log(entry.size);
            $(".pi-dd").each(function(i) {
                var elem = $(this);
                if( elem.data('size') == entry.size ){
                    // elem.append('<option selected>HERE!</option');
                    elem.find('option').each(function(index,element){
                        if( element.value == entry.price_item ){
                            // console.log('Match!');
                            $(this).prop("selected", "selected");
                        }
                    });
                }
            });
        });
    }
    

    $(".pi-dd").change(function() {
        buildPIxSizes();
    });

    // $(document).on('click', '.check-data', function() {
    //     buildPIxSizes();
    // });
// var sizes = [];
    function buildPIxSizes(){
        sizes = {};
        sizes['adult'] = [];
        sizes['youth'] = [];
        $(".a-size").each(function(i) {
            if( $(this).val() != "" ){
                data = {
                    "size" : $(this).data('size'),
                    "msrp" : parseInt($(this).find(':selected').data('msrp')),
                    "web_sale_price" : parseInt($(this).find(':selected').data('wsp')),
                    "price_item" : $(this).val()
                };
                sizes['adult'].push(data);
            }
        });
        $(".y-size").each(function(i) {
            if( $(this).val() != "" ){
                data = {
                    "size" : $(this).data('size'),
                    "msrp" : parseInt($(this).find(':selected').data('msrp')),
                    "web_sale_price" : parseInt($(this).find(':selected').data('wsp')),
                    "price_item" : $(this).val()
                };
                sizes['youth'].push(data);
            }
        });
        strResult = JSON.stringify(sizes);
        console.log( strResult );
        $('#sizes').val( '"' + strResult + '"' );
    }

    // console.log(window.price_items);

    tinymce.init({ 
        selector:'textarea.material-description'
    });

    loadEditor();
    function loadEditor(){
        setTimeout(function(){
            window.mce = $('#description').val();
            tinymce.editors[0].setContent(window.mce);
            $('#description').val('');
        }, 1000);
    }

    $('.edit-material').on('click', function(){
        saveEditor();
        // console.log('SAVE');
    });

    function saveEditor(){
        window.mce = tinyMCE.activeEditor.getContent();
        console.log('MCE: ' + window.mce);
        $('#description').val(window.mce);
    }

    window.block_patterns = null;
    getBlockPatterns(function(block_patterns){
        window.block_patterns = block_patterns;
    });

    function getBlockPatterns(callback){
        var block_patterns;
        var url = "//api-dev.qstrike.com/api/block_patterns";
        // var url = "//localhost:8888/api/block_patterns";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                // console.log("Mascots: "+items);
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }

    // console.log( window.block_patterns );

    var block_pattern_id = $('#block_pattern_id').val();
    var existing_neck_option = $('#existing_neck_option').val();

    // console.log(existing_neck_option);

    $.each(window.block_patterns, function(i, item) {
        if( item.id === block_pattern_id ){
            window.neck_options = JSON.parse(item.neck_options);
            $.each(window.neck_options, function(i, item) {
                if( existing_neck_option == item.name ){
                    console.log(' IF ');
                    $( '#neck_option' ).append( '<option value="' + item.name + '" selected>' + item.name + '</option>' );
                } else {
                    console.log(' IF ');
                    $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                }
            });
        }
    });

    $(document).on('change', '#block_pattern_id', function() {

        var id = $(this).val();

        $( '#neck_option' ).html('');

        $.each(window.block_patterns, function(i, item) {
            if( item.id === id ){
                window.neck_options = JSON.parse(item.neck_options);
                $.each(window.neck_options, function(i, item) {
                    $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                });
            }
        });

    });

});
</script>
@endsection