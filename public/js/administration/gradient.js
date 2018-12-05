$(document).ready(function() {


colors = getColors().colors;

window.gradient_position = [
                    "Front Body",
                    "Back Body",
                    "Left Sleeve",
                    "Right Sleeve",
                    "Bottom Panel",
                    "Back Insert",
                    "Left Side Panel",
                    "Right Side Panel"
                ];

function buildPositionDropdown(value){
    var dropdown = '<select class="form-control gradient-position">';
    window.gradient_position.forEach(function(entry) {
        if(entry == value) {
            dropdown += '<option value="'+entry+'" selected>'+entry+'</option>';
        } else {
            dropdown += '<option value="'+entry+'">'+entry+'</option>';
        }
    });
    return dropdown;
}

    $(".global-color").append(globalColorSelector(colors));

    $('.copy-gradient').on('click', function(e){
        var data = $('#gradient_data').val().slice(1, -1).replace(new RegExp("\\\\", "g"), "");
        $('#copy-gradient-data-modal textarea').val(data);
        $('#copy-gradient-data-modal').modal('show');
    });

    $('.load-gradient').on('click', function(e){
        var data = $('#ta_load_gradient').val();
        console.log(data);
        loadGradient(data);
    });

    var gradient_data = $('#gradient_data').val();

    if(gradient_data){
        if(gradient_data != null && gradient_data != '""'){

            console.log('Has value');
            loadGradient();
        } else {
            console.log('None');
        }
    }

    function loadGradient(data){
        var gradient, x;
        if(!data){
            var gradient_data = $('#gradient_data').val();
            gradient = gradient_data.slice(1, -1);
            gradient = gradient.replace(new RegExp("\\\\", "g"), "");
            x = gradient;
            gradient = JSON.parse(gradient);
        } else {
            $('.gradient-content').html('');
            gradient = JSON.parse(data);
            x = gradient;
        }

        gradient.forEach(function(entry) {
            console.log(entry);

            var size = entry.size;

        var ischecked = '';
        if(entry.enabled == "1"){
            ischecked = 'checked';
        }

        var topchecked = '';
        if(entry.top_color == true){
            topchecked = 'checked';
        }

        var bottomchecked = '';
        if(entry.bottom_color == true){
            bottomchecked = 'checked';
        }

        var basechecked = '';
        if(entry.base_color == true){
            basechecked = 'checked';
        }

        if(!entry.colors_array){
            entry.colors_array = ["","","",];
        }
        if(!entry.team_color_id_array){
            entry.team_color_id_array = ["","","",];
        }

        var position_dropdown = buildPositionDropdown(entry.position);

        var template = `<table class="table table-striped table-bordered table-hover gradient-table">
        <tr>
            <td colspan="6">
                <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Gradient Details</b>
                <a href="#" class="btn btn-flat btn-danger pull-right delete-gradient
                ">Remove</a>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <div class="col-md-10">
                    <label>Position</label>
                    `+position_dropdown+`
                </div>
            <td colspan="2">
            </td>
            <td>
                <div>
                    <label>Enable Gradient</label><br>
                    <input type="checkbox" class="gradient-toggler big-checkbox" value="1" `+ischecked+`>
                </div>
            </td>
        </tr>
        <tr>
            <th></th>
            <th>Team Color ID</th>
            <th>Front</th>
            <th>Back</th>
            <th>Left</th>
            <th>Right</th>
        </tr>
        <tbody>
            <tr>
                <td>
                    <label>Top Color</label>
                    <input type="checkbox" class="top-color" value="1" `+topchecked+`>
                    `+ getSelectColorTemplate(colors,entry.colors_array[0])  +`
                </td>
                <td><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[0] +`"></td>
                <td><input type="file" class="form-control file-f-1 image" data-img-url="`+entry.perspectives[0].layers[0].filename+`"></td>
                <td><input type="file" class="form-control file-b-1 image" data-img-url="`+entry.perspectives[1].layers[0].filename+`"></td>
                <td><input type="file" class="form-control file-l-1 image" data-img-url="`+entry.perspectives[2].layers[0].filename+`"></td>
                <td><input type="file" class="form-control file-r-1 image" data-img-url="`+entry.perspectives[3].layers[0].filename+`"></td>
            </tr>
            <tr>

                <td>
                    <label>Bottom Color</label>
                    <input type="checkbox" class="bottom-color" value="1" `+bottomchecked+`>
                    `+ getSelectColorTemplate(colors,entry.colors_array[1])  +`
                </td>
                <td><br><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[1] +`"></td>
                <td><input type="file" class="form-control file-f-2 image" data-img-url="`+entry.perspectives[0].layers[1].filename+`"></td>
                <td><input type="file" class="form-control file-b-2 image" data-img-url="`+entry.perspectives[1].layers[1].filename+`"></td>
                <td><input type="file" class="form-control file-l-2 image" data-img-url="`+entry.perspectives[2].layers[1].filename+`"></td>
                <td><input type="file" class="form-control file-r-2 image" data-img-url="`+entry.perspectives[3].layers[1].filename+`"></td>
            </tr>
            <tr>
                <td>
                    <label>Base</label>
                    <input type="checkbox" class="base" value="1" `+basechecked+`>
                    `+ getSelectColorTemplate(colors,entry.colors_array[2])  +`
                </td>
                <td><br><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[2] +`"></td>
                <td><input type="file" class="form-control file-f-3 image" data-img-url="`+entry.perspectives[0].layers[2].filename+`"></td>
                <td><input type="file" class="form-control file-b-3 image" data-img-url="`+entry.perspectives[1].layers[2].filename+`"></td>
                <td><input type="file" class="form-control file-l-3 image" data-img-url="`+entry.perspectives[2].layers[2].filename+`"></td>
                <td><input type="file" class="form-control file-r-3 image" data-img-url="`+entry.perspectives[3].layers[2].filename+`"></td>
            </tr>
        </tbody>
        </table>`;

        $('.gradient-content').append(template);


        }); // loop closing

        deleteGradient();
        changeImage();
        changeEvent();
        refreshJSON();

        $('#load-gradient-data-modal').modal('hide');
        $('#ta_load_gradient').val('');
    }

    function deleteGradient(){
        $('.delete-gradient').on('click', function(e){
            $(this).parent().parent().parent().parent().remove();
            refreshJSON();
        });
    }

    $('.add-gradient').on('click', function(e){
        e.preventDefault();
        var selectedFirst = $(".global-color-selector option:selected").eq(0).val();
        var selectedSecond = $(".global-color-selector option:selected").eq(1).val();
        var selectedThird = $(".global-color-selector option:selected").eq(2).val();

        var position_dropdown = buildPositionDropdown();

        console.log( 'Add Section . . .' );
        var elem = `<table class="table table-striped table-bordered table-hover gradient-table">
        <tr>
            <td colspan="6">
                <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Gradient Details</b>
                <a href="#" class="btn btn-flat btn-danger pull-right delete-gradient">Remove</a>
            </td>
        </tr>
        <tr>
                <td colspan="2">
                    <div class="col-md-10">
                        <label>Position</label>
                         `+position_dropdown+`
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div>
                        <label>Enable Gradient</label><br>
                        <input type="checkbox" class="gradient-toggler big-checkbox" value="1">
                    </div>
                </td>
            </tr>
        <tr>
            <th></th>
            <th>Team Color ID</th>
            <th>Front</th>
            <th>Back</th>
            <th>Left</th>
            <th>Right</th>
        </tr>
        <tbody>
            <tr>
                <td>
                    <label>Top Color</label>
                    <input type="checkbox" class="top-color" value="1">
                    `+ getSelectColorTemplate(colors,selectedFirst)  +`
                </td>
                <td><br><input class="form-control team_color_id_array" type="number"></td>
                <td><input type="file" class="form-control file-f-1 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-b-1 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-l-1 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-r-1 image" data-img-url=""></td>
            </tr>
            <tr>

                <td>
                    <label>Bottom Color</label>
                    <input type="checkbox" class="bottom-color" value="1">
                    `+ getSelectColorTemplate(colors,selectedSecond)  +`
                </td>
                <td><br><input class="form-control team_color_id_array" type="number"></td>
                <td><input type="file" class="form-control file-f-2 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-b-2 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-l-2 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-r-2 image" data-img-url=""></td>
            </tr>
            <tr>
                <td>
                    <label>Base</label>
                    <input type="checkbox" class="base" value="1">
                    `+ getSelectColorTemplate(colors,selectedThird)  +`
                </td>
                <td><br><input class="form-control team_color_id_array" type="number"></td>
                <td><input type="file" class="form-control file-f-3 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-b-3 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-l-3 image" data-img-url=""></td>
                <td><input type="file" class="form-control file-r-3 image" data-img-url=""></td>
            </tr>
        </tbody>
        </table>`;

        $('.gradient-content').prepend(elem);
        deleteGradient();
        changeImage();
        changeEvent();
        refreshJSON();
    });


    function deleteGradient(){
        $('.delete-gradient').on('click', function(e){
            $(this).parent().parent().parent().parent().remove();
            refreshJSON();
        });
    }

    function detectImages(){
        $(".image").each(function(i) {
            var val = $(this).data('img-url');
            if (val == "") {
                $(this).css('border', '2px solid red');
            }
        });
    }

    function changeEvent(){
        $("select").on('change', function() {
            refreshJSON();
        });
        $("input").on('change', function() {
            refreshJSON();
        });
        $("input").keyup(function() {
            refreshJSON();
        });
    }

    function refreshJSON(){
        var data = [];
        $(".gradient-table").each(function(i) {
            var info = {};
            info.position = $(this).find('.gradient-position option:selected').val();

            var cbx = $(this).find('.gradient-toggler');
            if(cbx.is(":checked")){
                info.enabled = 1;
            } else {
                info.enabled = 0;
            }

            var top_color = $(this).find('.top-color');
            if(top_color.is(":checked")){
                info.top_color = true;
            } else {
                info.top_color = false;
            }

            var bottom_color = $(this).find('.bottom-color');
            if(bottom_color.is(":checked")){
                info.bottom_color = true;
            } else {
                info.bottom_color = false;
            }

            var base = $(this).find('.base');
            if(base.is(":checked")){
                info.base_color = true;
            } else {
                info.base_color = false;
            }

            var colors_array = [];
            $( $(this).find(".gradient-colors option:selected") ).each(function( index ) {
               colors_array.push($( this ).val());

            });

            info.colors_array = colors_array;

            var team_color_id_array = [];
            $( $(this).find(".team_color_id_array") ).each(function( index ) {
                team_color_id_array.push($( this ).val());
            });

            info.team_color_id_array = team_color_id_array;

            console.log( 'front file 1: '+ $(this).find('.file-f-1').attr('data-img-url') );

            var perspectives = [];

            var front_perspective = [{
                "position" : 1,
                "filename" : $(this).find('.file-f-1').attr('data-img-url')
            }, {
                "position" : 2,
                "filename" : $(this).find('.file-f-2').attr('data-img-url')
            }, {
                "position" : 3,
                "filename" : $(this).find('.file-f-3').attr('data-img-url')
            }];

            var front_data = {
                "perspective" : "front",
                "layers" : front_perspective
            };

            var back_perspective = [{
                "position" : 1,
                "filename" : $(this).find('.file-b-1').attr('data-img-url')
            }, {
                "position" : 2,
                "filename" : $(this).find('.file-b-2').attr('data-img-url')
            }, {
                "position" : 3,
                "filename" : $(this).find('.file-b-3').attr('data-img-url')
            }];

            var back_data = {
                "perspective" : "back",
                "layers" : back_perspective
            };

            var left_perspective = [{
                "position" : 1,
                "filename" : $(this).find('.file-l-1').attr('data-img-url')
            }, {
                "position" : 2,
                "filename" : $(this).find('.file-l-2').attr('data-img-url')
            }, {
                "position" : 3,
                "filename" : $(this).find('.file-l-3').attr('data-img-url')
            }];

            var left_data = {
                "perspective" : "left",
                "layers" : left_perspective
            };

            var right_perspective = [{
                "position" : 1,
                "filename" : $(this).find('.file-r-1').attr('data-img-url')
            }, {
                "position" : 2,
                "filename" : $(this).find('.file-r-2').attr('data-img-url')
            }, {
                "position" : 3,
                "filename" : $(this).find('.file-r-3').attr('data-img-url')
            }];

            var right_data = {
                "perspective" : "right",
                "layers" : right_perspective
            };

            perspectives.push(front_data);
            perspectives.push(back_data);
            perspectives.push(left_data);
            perspectives.push(right_data);

            info.perspectives = perspectives;

            data.push(info);
            console.log(JSON.stringify(info));
        });
        $('#gradient').val(JSON.stringify(data));

        detectImages();
    }

    function changeImage(){
        $(".image").change( function() {

                var elem = $(this);

                if (this.files && this.files[0]) {

                    var _filename = fileUploadAttachment(this.files[0], elem, function (filename, extension, valid, element) {
                        if (typeof filename === 'undefined') {
                            return;
                        }
                        if (valid){
                            element.attr("data-img-url", filename);
                            refreshJSON();
                        } else {

                        }

                    });

                }
                refreshJSON();
        });
    }

    fileUploadAttachment = function (file, elem, callback) {

        var _file = file;
        var formData = new FormData();
        var x = elem;

        formData.append('file', file);

        $.ajax({

            data: formData,
            url: "//" + api_host + "/api/fileUpload",
            type: "POST",
            processData: false,
            contentType: false,
            crossDomain: true,

            success: function (response){

                if(response.success) {
                    var _extension = response.filename.split('.').pop();
                        callback(response.filename, _extension, true, x);
                }
                else {
                    callback(undefined, undefined, undefined);
                }
            }
        });
    }

    function getColors(){
        return $.ajax({
            type: 'GET',
            url: "//" + api_host + "/api/colors",
            async: false,
            dataType: 'json',
            data: { action : 'getColors' },
            done: function(results) {
            },
            fail: function( jqXHR, textStatus, errorThrown ) {
            }
        }).responseJSON;
    }

    function getSelectColorTemplate(result,c_code){

        var template = '<option value="none" style="background:#fff;color:black"selected>None</option>';
        var selectedColor = "";
        var fontColor = "black";

         result.forEach(function(entry) {
            if(entry.color_code == "W" || entry.color_code == "none" ){
                    fontColor = "black";
                    entry.hex_code = "fff";
            }else{
                    fontColor = "white";
            }

            if(entry.color_code == c_code){

                template += '<option value="'+ entry.color_code +'" style="background:#'+ entry.hex_code + ';color:'+ fontColor + '" selected>' + entry.name + '</option>';
                selectedColor = entry.hex_code;
            } else {
                template += '<option value='+ entry.color_code +' style="background:#'+ entry.hex_code + ';color:'+ fontColor + '">' + entry.name + '</option>';
            }

        });
        if(c_code == "W" || c_code == "none" || !c_code){
            fontColor = "black";
        }
        return template = `<select class='form-control gradient-colors' style="background:#` + selectedColor + `;color:` + fontColor + `">` + template + `</select>`;

    }

    function globalColorSelector(result){
        var template = '<option value="none" style="background:#fff;color:black"selected>None</option>';
        var selectedColor = "";
        var fontColor = "black";
        result.forEach(function(entry) {

            if(entry.color_code == "W" || entry.color_code == "none"){
                    fontColor = "black";
                    entry.hex_code = "fff";
            }else{
                    fontColor = "white";
            }
            template += '<option value='+ entry.color_code +' style="background:#'+ entry.hex_code + ';color:'+ fontColor + '">' + entry.name + '</option>';

        });

        return template = `<select class='form-control global-color-selector' ">` + template + `</select>`;


    }


     $(document).on('change', '.gradient-colors', function(){

        var selectedColorValue = $(this).find("option:selected").attr("style");
        $(this).attr("style",selectedColorValue);
    });

    $(document).on('change', '.global-color-selector', function(){
        var selectedColorValue = $(this).find("option:selected").attr("style");
        var ind = $(".global-color-selector").index(this);
        ind++;
        $(this).attr("style",selectedColorValue);

        $(".position-"+ ind +" ~ select").val($(this).val()).attr("style",selectedColorValue);
        refreshJSON();
    });

});
