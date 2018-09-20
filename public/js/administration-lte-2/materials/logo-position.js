$(document).ready(function() {

    window.position_sets = [
                        "Right Chest",
                        "Left Sleeve",
                        "Back Neck",
                        "Front Left Hip",
                        "Back Center Tunnel"
                    ];

    function buildPositionDropdown(value){
        var dropdown = '<select class="form-control logo-position">';
        window.position_sets.forEach(function(entry) {
            var entry_val = entry.toLowerCase().replace(/ /g,"_");
            if(entry_val == value){
                dropdown += '<option value="'+entry_val+'" selected>'+entry+'</option>';
            } else {
                dropdown += '<option value="'+entry_val+'">'+entry+'</option>';
            }
        });
        return dropdown;
    }

    $('.copy-logo-position').on('click', function(e){
        var data = $('#logo_position_data').val().slice(1, -1).replace(new RegExp("\\\\", "g"), "");
        $('#copy-logo-position-data-modal textarea').val(data);
        $('#copy-logo-position-data-modal').modal('show');
    });

    $('.load-logo-position').on('click', function(e){
        var data = $('#ta_load_logo_position').val();
        console.log(data);
        loadLogoPosition(data);
    });

    var logo_position_data = $('#logo_position_data').val();

    if(logo_position_data){
        if(logo_position_data != null && logo_position_data != '""'){
            loadLogoPosition();
        } else {
            console.log('No Logo Position');
        }
    }

    function loadLogoPosition(data){

        var logo_position, x;
        if(!data){
            var logo_position_data = $('#logo_position_data').val();
            logo_position = logo_position_data.slice(1, -1);
            logo_position = logo_position.replace(new RegExp("\\\\", "g"), "");
            x = logo_position;
            logo_position = JSON.parse(logo_position);
        } else {
            $('.logo-position-content').html('');

            logo_position = JSON.parse(data);
            x = logo_position;
        }

        logo_position.forEach(function(entry) {

            var ischecked = '';
            if(entry.enabled == "1"){
                ischecked = 'checked';
            }

            var layer1 = '';
            if(entry.layer1 == "1"){
                layer1 = 'checked';
            }

            var layer2 = '';
            if(entry.layer2 == "1"){
                layer2 = 'checked';
            }
            var layer3 = '';
            if(entry.layer3 == "1"){
                layer3 = 'checked';
            }

            var position_dropdown = buildPositionDropdown(entry.position);

            var template = `<table class="table table-striped table-bordered table-hover logo-position-table">
            <tr>
                <td colspan="6">
                    <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Logo Position Details</b>
                    <a href="#" class="btn btn-flat btn-danger pull-right delete-logo-position">Remove</a>
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
                        <label>Enable Logo Position</label><br>
                        <input type="checkbox" class="logo-position-toggler big-checkbox" value="`+ entry.enabled +`" `+ ischecked +`>
                    </div>
                </td>
            </tr>
            <tr>
                <th></th>
                <th>Front</th>
                <th>Back</th>
                <th>Left</th>
                <th>Right</th>
            </tr>
            <tbody>
                <tr>
                    <td>
                        <label>Layer 1</label>
                        <input type="checkbox" class="layer1" value="`+entry.layer1+`" `+ layer1 +`>
                    </td>
                    <td><input type="file" class="form-control file-f-1 image" data-img-url="`+entry.perspectives[0].layers[0].filename+`"></td>
                    <td><input type="file" class="form-control file-b-1 image" data-img-url="`+entry.perspectives[1].layers[0].filename+`"></td>
                    <td><input type="file" class="form-control file-l-1 image" data-img-url="`+entry.perspectives[2].layers[0].filename+`"></td>
                    <td><input type="file" class="form-control file-r-1 image" data-img-url="`+entry.perspectives[3].layers[0].filename+`"></td>
                </tr>
                <tr>

                <td>
                    <label>Layer 2</label>
                    <input type="checkbox" class="layer2" value="`+entry.layer2+`" `+ layer2 +`>
                </td>
                    <td><input type="file" class="form-control file-f-2 image" data-img-url="`+entry.perspectives[0].layers[1].filename+`"></td>
                    <td><input type="file" class="form-control file-b-2 image" data-img-url="`+entry.perspectives[1].layers[1].filename+`"></td>
                    <td><input type="file" class="form-control file-l-2 image" data-img-url="`+entry.perspectives[2].layers[1].filename+`"></td>
                    <td><input type="file" class="form-control file-r-2 image" data-img-url="`+entry.perspectives[3].layers[1].filename+`"></td>
                </tr>
                <tr>
                <td>
                    <label>Layer 3</label>
                    <input type="checkbox" class="layer3" value="`+entry.layer3+`" `+ layer3 +`>
                </td>
                    <td><input type="file" class="form-control file-f-3 image" data-img-url="`+entry.perspectives[0].layers[2].filename+`"></td>
                    <td><input type="file" class="form-control file-b-3 image" data-img-url="`+entry.perspectives[1].layers[2].filename+`"></td>
                    <td><input type="file" class="form-control file-l-3 image" data-img-url="`+entry.perspectives[2].layers[2].filename+`"></td>
                    <td><input type="file" class="form-control file-r-3 image" data-img-url="`+entry.perspectives[3].layers[2].filename+`"></td>
                </tr>
            </tbody>
            </table>`;

            $('.logo-position-content').append(template);

        });
        deleteLogoPosition();
        changeImage();
        changeEvent();
        refreshJSON();
    }

    $(document).on('click', '.add-logo-position', function(e){
        e.preventDefault();

        var position_dropdown = buildPositionDropdown();

        var elem = `<table class="table table-striped table-bordered table-hover logo-position-table">
                        <tr>
                            <td colspan="6">
                                <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Logo Position Details</b>
                                <a href="#" class="btn btn-flat btn-danger pull-right delete-logo-position">Remove</a>
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
                                    <label>Enable Logo Position</label><br>
                                    <input type="checkbox" class="logo-position-toggler big-checkbox" value="1">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Left</th>
                            <th>Right</th>
                        </tr>
                        <tbody>
                        <tr>
                            <td>
                                <label>Layer 1</label>
                                <input type="checkbox" class="layer1" value="1">
                            </td>
                            <td><input type="file" class="form-control file-f-1 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-b-1 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-l-1 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-r-1 image" data-img-url=""></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Layer 2</label>
                                <input type="checkbox" class="layer2" value="1">
                            </td>
                            <td><input type="file" class="form-control file-f-2 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-b-2 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-l-2 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-r-2 image" data-img-url=""></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Layer 3</label>
                                <input type="checkbox" class="layer3" value="1">
                            </td>
                            <td><input type="file" class="form-control file-f-3 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-b-3 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-l-3 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-r-3 image" data-img-url=""></td>
                        </tr>

                    </tbody>
                    </table>`;

        $('.logo-position-content').prepend(elem);
        deleteLogoPosition();
        changeImage();
        changeEvent();
        refreshJSON();
    });

    function deleteLogoPosition(){
        $('.delete-logo-position').on('click', function(e){
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
        $(".logo-position-table").each(function(i) {
            var info = {};
            info.position = $(this).find('.logo-position option:selected').val();
            var cbx = $(this).find('.logo-position-toggler');
            if(cbx.is(":checked")){
                info.enabled = 1;
            } else {
                info.enabled = 0;
            }
            var layer1 = $(this).find('.layer1');
            if(layer1.is(":checked")){
                info.layer1 = 1;
            } else {
                info.layer1 = 0;
            }

            var layer2 = $(this).find('.layer2');
            if(layer2.is(":checked")){
                info.layer2 = 1;
            } else {
                info.layer2 = 0;
            }

            var layer3 = $(this).find('.layer3');
            if(layer3.is(":checked")){
                info.layer3 = 1;
            } else {
                info.layer3 = 0;
            }

            var perspectives = [];

            var front_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-f-1').attr('data-img-url')
            }, {
                "layer" : 2,
                "filename" : $(this).find('.file-f-2').attr('data-img-url')
            }, {
                "layer" : 3,
                "filename" : $(this).find('.file-f-3').attr('data-img-url')
            }];

            var front_data = {
                "perspective" : "front",
                "layers" : front_perspective
            };

            var back_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-b-1').attr('data-img-url')
            }, {
                "layer" : 2,
                "filename" : $(this).find('.file-b-2').attr('data-img-url')
            }, {
                "layer" : 3,
                "filename" : $(this).find('.file-b-3').attr('data-img-url')
            }];

            var back_data = {
                "perspective" : "back",
                "layers" : back_perspective
            };

            var left_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-l-1').attr('data-img-url')
            }, {
                "layer" : 2,
                "filename" : $(this).find('.file-l-2').attr('data-img-url')
            }, {
                "layer" : 3,
                "filename" : $(this).find('.file-l-3').attr('data-img-url')
            }];

            var left_data = {
                "perspective" : "left",
                "layers" : left_perspective
            };

            var right_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-r-1').attr('data-img-url')
            }, {
                "layer" : 2,
                "filename" : $(this).find('.file-r-2').attr('data-img-url')
            }, {
                "layer" : 3,
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
        $('#logo-position').val(JSON.stringify(data));

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
                    console.log('success' + response.filename);
                        callback(response.filename, _extension, true, x);
                }
                else {
                    callback(undefined, undefined, undefined);
                }
            }
        });
    }

});