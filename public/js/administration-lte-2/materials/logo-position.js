$(document).ready(function() {

    window.position_sets = [
                        "Right Chest",
                        "Left Sleeve",
                        "Back Neck"
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

            var layer = '';
            if(entry.layer == "1"){
                layer = 'checked';
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
                        <label>Layer</label>
                        <input type="checkbox" class="layer" value="`+layer+`" `+ layer +`>
                    </td>
                    <td><input type="file" class="form-control file-f-1 image" data-img-url="`+entry.perspectives[0].layers[0].filename+`"></td>
                    <td><input type="file" class="form-control file-b-1 image" data-img-url="`+entry.perspectives[1].layers[0].filename+`"></td>
                    <td><input type="file" class="form-control file-l-1 image" data-img-url="`+entry.perspectives[2].layers[0].filename+`"></td>
                    <td><input type="file" class="form-control file-r-1 image" data-img-url="`+entry.perspectives[3].layers[0].filename+`"></td>
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
                                <label>Layer</label>
                                <input type="checkbox" class="layer" value="1">
                            </td>
                            <td><input type="file" class="form-control file-f-1 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-b-1 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-l-1 image" data-img-url=""></td>
                            <td><input type="file" class="form-control file-r-1 image" data-img-url=""></td>
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

            var layer = $(this).find('.layer');
            if(layer.is(":checked")){
                info.layer = true;
            } else {
                info.layer = false;
            }

            var perspectives = [];

            var front_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-f-1').attr('data-img-url')
            }];

            var front_data = {
                "perspective" : "front",
                "layers" : front_perspective
            };

            var back_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-b-1').attr('data-img-url')
            }];

            var back_data = {
                "perspective" : "back",
                "layers" : back_perspective
            };

            var left_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-l-1').attr('data-img-url')
            }];

            var left_data = {
                "perspective" : "left",
                "layers" : left_perspective
            };

            var right_perspective = [{
                "layer" : 1,
                "filename" : $(this).find('.file-r-1').attr('data-img-url')
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
                            $.smkAlert({text: 'Error Uploading File', type:'warning', time: 3, marginTop: '80px'});
                            $('span.additional-attachment-message').html('Error Uploading File');
                            return;
                        }

                        if (valid){
                            element.attr("data-img-url", filename);
                            refreshJSON();
                        } else {

                            $('span.additional-attachment-message').html('Invalid File Type: ' + extension);
                            $.smkAlert({text: 'Invalid File Type: ' + extension, type:'warning', time: 3, marginTop: '80px'});
                        }
                    });
                }
                refreshJSON();
        });
    }

    fileUploadAttachment = function (file, elem, callback) {

        $('span.ok_btn').attr('data-status', 'processing');
        $('em.unsupported-file').html('');

        var _file = file;
        var formData = new FormData();
        var x = elem;

        formData.append('file', file);

        if (typeof $.ajaxSettings.headers !== "undefined") {
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        }

        $.ajax({

            data: formData,
            url: "//" + api_host + "/api/fileUpload",
            type: "POST",
            processData: false,  // tell jQuery not to process the data
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
