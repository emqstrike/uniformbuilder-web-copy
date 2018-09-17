$(document).ready(function() {

    window.position_sets = [
                        "Right Chest",
                        "Left Sleeve",
                        "Back Neck"
                    ];

    function buildSetsDropdown(value){
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

    // $(".global-color").append(globalColorSelector(colors));

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

    // var pipings_data = $('#pipings_data').val();

    // if(pipings_data){
    //     if(pipings_data != null && pipings_data != '""'){
    //         console.log('Has value');
    //         loadPipings();
    //     } else {
    //         console.log('None');
    //     }
    // }

    // function loadPipings(copydata){

    //     var pipings, x;
    //     if(!copydata){
    //         var pipings_data = $('#pipings_data').val();
    //         pipings = pipings_data.slice(1, -1);
    //         pipings = pipings.replace(new RegExp("\\\\", "g"), "");
    //         x = pipings;
    //         pipings = JSON.parse(pipings);
    //     } else {
    //         $('.pipings-content').html('');

    //         pipings = JSON.parse(copydata);
    //         x = pipings;
    //     }

    //     pipings.forEach(function(entry) {
    //         console.log(entry);
    //         var size = entry.size;

    //     var ischecked = '';
    //     if(entry.enabled == "1"){
    //         ischecked = 'checked';
    //     }

    //     var pos1checked = '';
    //     if(entry.color1 == true){
    //         pos1checked = 'checked';
    //     }

    //     var pos2checked = '';
    //     if(entry.color2 == true){
    //         pos2checked = 'checked';
    //     }

    //     var pos3checked = '';
    //     if(entry.color3 == true){
    //         pos3checked = 'checked';
    //     }

        // var selectbox = '<select class="form-control piping-size">';
        // var piping_sizes = ["1/8", "1/4", "1/2"];
        // piping_sizes.forEach(function(entry) {
        //     if(entry == size){
        //         selectbox += '<option value="'+entry+'" selected>'+entry+'</option>';
        //     } else {
        //         selectbox += '<option value="'+entry+'">'+entry+'</option>';
        //     }
        // });
        // selectbox += '</select>';

    //     if(!entry.colors_array){
    //         entry.colors_array = ["","","",];
    //     }
    //     if(!entry.team_color_id_array){
    //         entry.team_color_id_array = ["","","",];
    //     }

    //     var set = buildSetsDropdown(entry.set);

    //     var template = `<table class="table table-striped table-bordered table-hover logo-position-table">
    //     <tr>
    //         <td colspan="6">
    //             <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Logo Position Details</b>
    //             <a href="#" class="btn btn-flat btn-danger pull-right delete-logo-position">Remove</a>
    //         </td>
    //     </tr>
    //     <tr>
    //         <td>
    //             <div>
    //                 <label>Sizing</label>
    //                 `+selectbox+`
    //             </div>
    //         <td>
    //             <div>
    //                 <label>Name</label>
    //                 <input type="text" class="form-control piping-name" value="`+entry.name+`">
    //             </div>
    //         </td>
    //         <td>
    //             <label>Set</label>
    //             ` +set+`
    //         </td>
    //         <td></td>
    //         <td></td>
    //         <td>
    //             <div>
    //                 <label>Enable Piping</label><br>
    //                 <input type="checkbox" class="piping-toggler big-checkbox" value="1" `+ischecked+`>
    //             </div>
    //         </td>
    //     </tr>
    //     <tr>
    //         <th></th>
    //         <th>Team Color ID</th>
    //         <th>Front</th>
    //         <th>Back</th>
    //         <th>Left</th>
    //         <th>Right</th>
    //     </tr>
    //     <tbody>
    //         <tr>
    //             <td>
    //                 <label>Position 1</label>
    //                 <input type="checkbox" class="position-1" value="1" `+pos1checked+`>
    //                 `+ getSelectColorTemplate(colors,entry.colors_array[0])  +`
    //             </td>
    //             <td><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[0] +`"></td>
    //             <td><input type="file" class="form-control file-f-1 image" data-img-url="`+entry.perspectives[0].layers[0].filename+`"></td>
    //             <td><input type="file" class="form-control file-b-1 image" data-img-url="`+entry.perspectives[1].layers[0].filename+`"></td>
    //             <td><input type="file" class="form-control file-l-1 image" data-img-url="`+entry.perspectives[2].layers[0].filename+`"></td>
    //             <td><input type="file" class="form-control file-r-1 image" data-img-url="`+entry.perspectives[3].layers[0].filename+`"></td>
    //         </tr>
    //         <tr>

    //             <td>
    //                 <label>Position 2</label>
    //                 <input type="checkbox" class="position-2" value="1" `+pos2checked+`>
    //                 `+ getSelectColorTemplate(colors,entry.colors_array[1])  +`
    //             </td>
    //             <td><br><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[1] +`"></td>
    //             <td><input type="file" class="form-control file-f-2 image" data-img-url="`+entry.perspectives[0].layers[1].filename+`"></td>
    //             <td><input type="file" class="form-control file-b-2 image" data-img-url="`+entry.perspectives[1].layers[1].filename+`"></td>
    //             <td><input type="file" class="form-control file-l-2 image" data-img-url="`+entry.perspectives[2].layers[1].filename+`"></td>
    //             <td><input type="file" class="form-control file-r-2 image" data-img-url="`+entry.perspectives[3].layers[1].filename+`"></td>
    //         </tr>
    //         <tr>
    //             <td>
    //                 <label>Position 3</label>
    //                 <input type="checkbox" class="position-3" value="1" `+pos3checked+`>
    //                 `+ getSelectColorTemplate(colors,entry.colors_array[2])  +`
    //             </td>
    //             <td><br><input class="form-control team_color_id_array" type="number" value="`+ entry.team_color_id_array[2] +`"></td>
    //             <td><input type="file" class="form-control file-f-3 image" data-img-url="`+entry.perspectives[0].layers[2].filename+`"></td>
    //             <td><input type="file" class="form-control file-b-3 image" data-img-url="`+entry.perspectives[1].layers[2].filename+`"></td>
    //             <td><input type="file" class="form-control file-l-3 image" data-img-url="`+entry.perspectives[2].layers[2].filename+`"></td>
    //             <td><input type="file" class="form-control file-r-3 image" data-img-url="`+entry.perspectives[3].layers[2].filename+`"></td>
    //         </tr>
    //     </tbody>
    //     </table>`;

    //     $('.pipings-content').append(template);


    //     }); // loop closing
    //     deletePiping();
    //     changeImage();
    //     changeEvent();
    //     refreshJSON();
    //     $('#load-piping-data-modal').modal('hide');
    //     $('#ta_load_pipings').val('');
    // }

    // function deletePiping(){
    //     $('.delete-piping').on('click', function(e){
    //         $(this).parent().parent().parent().parent().remove();
    //         refreshJSON();
    //     });
    // }

    $(document).on('click', '.add-logo-position', function(e){
        e.preventDefault();

        var sets_dropdown = buildSetsDropdown();

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
                                     `+sets_dropdown+`
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
        changeImage();
        changeEvent();
        refreshJSON();

    });
    //     var elem = `<table class="table table-striped table-bordered table-hover piping-table">
    //     <tr>
    //         <td colspan="6">
    //             <b style="font-size: 18px; font-weight: normal; vertical-align: middle !important;">Piping Details</b>
    //             <a href="#" class="btn btn-flat btn-danger pull-right delete-piping">Remove</a>
    //         </td>
    //     </tr>
    //     <tr>
    //         <td>
    //             <div>
    //                 <label>Name</label>
    //                 <input type="text" class="form-control logo-name">
    //             </div>
    //         </td>
    //         <td>
    //             <div>
    //                 <label>Set</label>
    //                 `+sets_dropdown+`
    //             </div>
    //         </td>
    //         <td></td>
    //         <td></td>
    //         <td>
    //             <div>
    //                 <label>Enable Piping</label><br>
    //                 <input type="checkbox" class="piping-toggler big-checkbox" value="1">
    //             </div>
    //         </td>
    //     </tr>
    //     <tr>
    //         <th></th>
    //         <th>Team Color ID</th>
    //         <th>Front</th>
    //         <th>Back</th>
    //         <th>Left</th>
    //         <th>Right</th>
    //     </tr>
    //     <tbody>
    //         <tr>
    //             <td>
    //                 <label>Position 1</label>
    //                 <input type="checkbox" class="position-1" value="1">
    //                 `+ getSelectColorTemplate(colors,selectedFirst)  +`
    //             </td>
    //             <td><br><input class="form-control team_color_id_array" type="number"></td>
    //             <td><input type="file" class="form-control file-f-1 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-b-1 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-l-1 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-r-1 image" data-img-url=""></td>
    //         </tr>
    //         <tr>

    //             <td>
    //                 <label>Position 2</label>
    //                 <input type="checkbox" class="position-2" value="1">
    //                 `+ getSelectColorTemplate(colors,selectedSecond)  +`
    //             </td>
    //             <td><br><input class="form-control team_color_id_array" type="number"></td>
    //             <td><input type="file" class="form-control file-f-2 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-b-2 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-l-2 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-r-2 image" data-img-url=""></td>
    //         </tr>
    //         <tr>
    //             <td>
    //                 <label>Position 3</label>
    //                 <input type="checkbox" class="position-3" value="1">
    //                 `+ getSelectColorTemplate(colors,selectedThird)  +`
    //             </td>
    //             <td><br><input class="form-control team_color_id_array" type="number"></td>
    //             <td><input type="file" class="form-control file-f-3 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-b-3 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-l-3 image" data-img-url=""></td>
    //             <td><input type="file" class="form-control file-r-3 image" data-img-url=""></td>
    //         </tr>
    //     </tbody>
    //     </table>`;
    //     $('logo-position-content').prepend(elem);
    //     deletePiping();
    //     changeImage();
    //     changeEvent();
    //     refreshJSON();
    // });

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
