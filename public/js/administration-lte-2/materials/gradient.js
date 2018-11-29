$(document).ready(function() {

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
            loadGradient();
        } else {
            console.log('No Gradient');
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

            var template = `<table class="table table-striped table-bordered table-hover gradient-table">
            <tr>
                <td colspan="6">
                    <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Gradient Details</b>
                    <a href="#" class="btn btn-flat btn-danger pull-right delete-gradient">Remove</a>
                </td>
            </tr>
            <tr>
                <td>
                    <div>
                        <label>Enable Gradient</label><br>
                        <input type="checkbox" class="gradient-toggler big-checkbox" value="`+ entry.enabled +`" `+ ischecked +`>
                    </div>
                </td>
            </tr>
            <tr>
                <th></th>
                <th>Team Color ID</th>
                <th colspan="3">File</th>
            </tr>
            <tbody>
                <tr>
                    <td>
                        <label>Layer 1</label>
                        <input type="checkbox" class="layer1" value="`+entry.layer1+`" `+ layer1 +`>
                    </td>
                    <td><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[0] +`"></td>
                    <td><input type="file" class="form-control file-f-1 image" data-img-url="`+entry.files[0].layers[0].filename+`"></td>
                </tr>
                <tr>

                <td>
                    <label>Layer 2</label>
                    <input type="checkbox" class="layer2" value="`+entry.layer2+`" `+ layer2 +`>
                </td>
                    <td><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[1] +`"></td>
                    <td><input type="file" class="form-control file-f-2 image" data-img-url="`+entry.files[0].layers[1].filename+`"></td>
                </tr>
                <tr>
                <td>
                    <label>Layer 3</label>
                    <input type="checkbox" class="layer3" value="`+entry.layer3+`" `+ layer3 +`>
                </td>
                    <td><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[2] +`"></td>
                    <td><input type="file" class="form-control file-f-3 image" data-img-url="`+entry.files[0].layers[2].filename+`"></td>
                </tr>
            </tbody>
            </table>`;

            $('.gradient-content').append(template);

        });
        deleteGradient();
        changeImage();
        changeEvent();
        refreshJSON();
    }

    $(document).on('click', '.add-gradient', function(e){
        e.preventDefault();

        var elem = `<table class="table table-striped table-bordered table-hover gradient-table">
                        <tr>
                            <td colspan="6">
                                <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Gradient Details</b>
                                <a href="#" class="btn btn-flat btn-danger pull-right delete-gradient">Remove</a>
                            </td>
                        </tr>
                        <tr>
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
                            <th colspan="3">File</th>
                        </tr>
                        <tbody>
                        <tr>
                            <td>
                                <label>Layer 1</label>
                                <input type="checkbox" class="layer1" value="1">
                            </td>
                            <td><br><input class="form-control team_color_id_array" type="number"></td>
                            <td colspan="3"><input type="file" class="form-control file-f-1 image" data-img-url=""></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Layer 2</label>
                                <input type="checkbox" class="layer2" value="1">
                            </td>
                            <td><br><input class="form-control team_color_id_array" type="number"></td>
                            <td colspan="3"><input type="file" class="form-control file-f-2 image" data-img-url=""></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Layer 3</label>
                                <input type="checkbox" class="layer3" value="1">
                            </td>
                            <td><br><input class="form-control team_color_id_array" type="number"></td>
                            <td colspan="3"><input type="file" class="form-control file-f-3 image" data-img-url=""></td>
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
            info.position = $(this).find('.gradient option:selected').val();
            var cbx = $(this).find('.gradient-toggler');
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

            var team_color_id_array = [];
            $( $(this).find(".team_color_id_array") ).each(function( index ) {
                team_color_id_array.push($( this ).val());
            });

            info.team_color_id_array = team_color_id_array;
            var file = [];

            var files = [{
                "layer" : 1,
                "filename" : $(this).find('.file-f-1').attr('data-img-url')
            }, {
                "layer" : 2,
                "filename" : $(this).find('.file-f-2').attr('data-img-url')
            }, {
                "layer" : 3,
                "filename" : $(this).find('.file-f-3').attr('data-img-url')
            }];

            var file_data = {
                "file" : "front",
                "layers" : files
            };

            file.push(file_data);

            info.files = file;
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
