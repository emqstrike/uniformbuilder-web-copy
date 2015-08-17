$(document).ready(function(){

    var materialOptionSettings = {
        'pant cut': [
            {code: 'PA01', value: 'Slim'},
            {code: 'PA02', value: 'Standard / Regular'},
            {code: 'PA04', value: 'Low Rise'},
            {code: 'PA05', value: 'Full Snap warm-ups'},
            {code: 'PA06', value: '12" Bottom Size Zippers'},
            {code: 'PA07', value: 'Full Cut'}
        ],
        'waist cut': [
            {code: 'WA01', value: '2.5" Baseball style Loops and Tunnels'},
            {code: 'WA02', value: '2.5" Baseball style Loops only'},
            {code: 'WA03', value: '2.5" Baseball style NO Loops or Tunnels with snaps and zipper'},
            {code: 'WA04', value: '2.5" Baseball style NO Loops or Tunnels w/o snaps and zipper'},
            {code: 'WA05', value: '2" Elastic style (with or without drawstring)'},
            {code: 'WA06', value: '2" Elastic style with snaps and zipper'}
        ],
        'sleeve style': [
            {code: '01', value: 'Ultra Thin'},
            {code: '02', value: 'Thin'},
            {code: '03', value: 'Racer Back'},
            {code: '04', value: 'Regular'},
            {code: '05', value: 'Wide'},
            {code: '06', value: 'Sleeveless'},
            {code: '07', value: 'Cap'},
            {code: '08', value: 'Short / Set In'},
            {code: '09', value: 'Short / Raglan'},
            {code: '10', value: 'Long / Long Set in'},
            {code: '11', value: 'Long / Raglan'},
            {code: '12', value: 'Lineman'},
            {code: '13', value: 'Specialist'},
            {code: '14', value: 'Quarter Back'},
            {code: '15', value: 'Hockey'},
            {code: '16', value: 'Chowan'},
            {code: '17', value: 'Motion Fit Sleeve'}
        ],
        'neck style': [
            {code: 'V01', value: 'V'},
            {code: 'V02', value: 'V with Homeplate'},
            {code: 'V03', value: 'V with Triangle'},
            {code: 'V04', value: 'Suns'},
            {code: 'V05', value: 'Overlapping V'},
            {code: 'V06', value: 'Crossover V'},
            {code: 'V07', value: 'V with Boomerang'},
            {code: 'V08', value: 'Scooped V'},
            {code: 'V09', value: 'Tennessee'},
            {code: 'V10', value: 'Lakerback V neck'},
            {code: 'V11', value: 'Texas'},
            {code: 'V12', value: 'USA'},
            {code: 'V13', value: 'Pacers'},
            {code: 'V14', value: 'Preacher'},
            {code: 'V15', value: 'Boxed V'},
            {code: 'V16', value: 'BB PRAX'},
            {code: 'V17', value: 'Blunt V'},
            {code: 'V18', value: 'Baylor 08'},
            {code: 'V19', value: 'Marquette 11'},
            {code: 'L01', value: 'Laker'},
            {code: 'L02', value: 'Laker Alt 1'},
            {code: 'S01', value: 'Ohio State'},
            {code: 'S02', value: 'UCONN'},
            {code: 'S03', value: 'Kentucky'},
            {code: 'S04', value: 'Baylor 09'},
            {code: 'S05', value: 'Hawks'},
            {code: 'S06', value: 'Louisville'},
            {code: 'S07', value: 'Notre Dame 10'},
            {code: 'S08', value: 'Spiders'},
            {code: 'S09', value: 'Spears'},
            {code: 'S10', value: 'Box Stand-up Collar'},
            {code: 'S11', value: 'Real'},
            {code: 'S12', value: 'Round'},
            {code: 'S13', value: 'Crew'},
            {code: 'S14', value: 'Louisville Alt 2'},
            {code: 'S15', value: 'Maryland 11'},
            {code: 'S16', value: 'Notre Dame 11'},
            {code: 'S17', value: 'V Notch'},
            {code: 'S18', value: 'Louisville Alt 3'},
            {code: 'S19', value: 'Bulls'},
            {code: 'B01', value: 'BSB Full Button'},
            {code: 'B02', value: 'BSB Henley'},
            {code: 'B04', value: 'BSB V'},
            {code: 'B05', value: 'BSB 2 Button'},
            {code: 'C01', value: 'Collared V'},
            {code: 'C02', value: 'Collared Overlapping V'},
            {code: 'C03', value: 'Collared Blunt V'},
            {code: 'C04', value: 'Collared Box'},
            {code: 'C05', value: 'Collared 6" Zip'},
            {code: 'C06', value: 'Collared Half Zip'},
            {code: 'C07', value: 'Collared Full Zip'},
            {code: 'C08', value: 'Collared Polo'},
            {code: 'W01', value: '2" Standup collar with 6" Snap'},
            {code: 'W02', value: '2" Standup collar with Full Snap'},
            {code: 'W03', value: '2" Standup collar with 6" Zipper'},
            {code: 'W04', value: '2" Standup collar with Full Zipper'},
            {code: 'W05', value: '1" Standup collar with 6" Snap'},
            {code: 'W06', value: '1" Standup collar with Full Snap'},
            {code: 'W07', value: '1" Standup collar with 6" Zipper'},
            {code: 'W08', value: '1" Standup collar with Full Zipper'},
            {code: 'F01', value: 'Football V'},
            {code: 'F02', value: 'Football Virginia Tech'},
            {code: 'F03', value: 'Football Oregon'},
            {code: 'F04', value: 'Football USC'},
            {code: 'F05', value: 'Football Miami / Missouri'},
            {code: 'F06', value: 'Football Cal State'},
            {code: 'F07', value: 'Motion Neck'},
            {code: 'H01', value: 'Bruins Lace-up'}
        ]
    };

    $('.materials').bootstrapTable();

    $('.show-material').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            code: $(this).data('material-code'),
            type: $(this).data('material-type'),
            uniform_category: $(this).data('material-uniform-category'),
            base_color: $(this).data('material-base-color'),
            color_code: $(this).data('material-base-color-code'),
            gender: $(this).data('material-gender'),
            lining_type: $(this).data('material-lining-type'),
            material_path: $(this).data('material-path'),
            bump_map_path: $(this).data('bump-map-path'),
            shadow_path: $(this).data('shadow-path'),
            highlight_path: $(this).data('highlight-path')
        };
        $('#view-material-modal .modal-title').text(material.name);
        $('#view-material-modal .modal-material-code').text(material.code);
        $('#view-material-modal .modal-material-type').text(material.type);
        $('#view-material-modal .modal-material-uniform-category').text(material.uniform_category);
        $('#view-material-modal .modal-material-base-color').text(material.base_color);
        $('#view-material-modal .modal-material-base-color-code').text(material.color_code);
        $('#view-material-modal .modal-material-gender').text(material.gender);
        $('#view-material-modal .modal-material-lining-type').text(material.lining_type);
        $('#view-material-modal .material-image').attr('src', material.material_path);
        $('#view-material-modal .bump-map-image').attr('src', material.bump_map_path);
        $('#view-material-modal .shadow-image').attr('src', material.shadow_path);
        $('#view-material-modal .highlight-image').attr('src', material.highlight_path);
        $('.nav-tabs').tab('show');
        $('#view-material-modal').modal('show');
    });

    $('.add-material-option').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name')
        };
        $('#add-material-option-modal .material-id').val(material.id);
        $('#add-material-option-modal .modal-title span').html(material.name);
        $('#add-material-option-modal').modal('show');
    });

    $('.edit-material-option').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            option: {
                id: $(this).data('material-option-id'),
                name: $(this).data('material-option-name'),
                layer_level: $(this).data('material-option-layer-level'),
                type: $(this).data('material-option-setting-type'),
                code: $(this).data('material-option-setting-code'),
                path: $(this).data('material-option-path'),
            }
        };

        var select_options = materialOptionSettings[material.option.type];
        $('#edit-material-option-modal .setting-types option[value="' + material.option.type + '"]').attr("selected","selected");
        loadItemsToSettingCodes(select_options, 'edit');
        $('#edit-material-option-modal .setting-codes option[value="' + material.option.code + '"]').attr("selected","selected");

        $('#edit-material-option-modal .material-id').val(material.id);
        $('#edit-material-option-modal .modal-title span').html(material.name);
        $('#edit-material-option-modal .option-name').val(material.option.name);
        $('#edit-material-option-modal .layer-level').val(material.option.layer_level);
        $('#edit-material-option-modal').modal('show');
    });

    $('.enable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/enable/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.material-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-material').removeAttr('disabled');
                    $(elem + ' .enable-material').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/disable/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.material-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .enable-material').removeAttr('disabled');
                    $(elem + ' .disable-material').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm('Remove Material', 'Are you sure you want to delete the Material?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal').modal('hide');
                    $('.material-' + id).fadeOut();
                }
            }
        });
    });

    $('#add-material-option-modal .setting-types').on('change', function(){
        var key = $(this).val();
        var items = materialOptionSettings[key];
        loadItemsToSettingCodes(items);
    });

    $('#edit-material-option-modal .setting-types').on('change', function(){
        var key = $(this).val();
        console.log(key);
        var items = materialOptionSettings[key];
        console.log(items);
        loadItemsToSettingCodes(items, 'edit');
    });

    var type = 'pant cut';
    var items = materialOptionSettings[type];
    loadItemsToSettingCodes(items);

    function loadItemsToSettingCodes(items, action) {
        if (typeof action == 'undefined') action = 'add';
        $('#' + action + '-material-option-modal .setting-codes').empty(); // clear
        $.each(items, function(index, item){
            $('#' + action + '-material-option-modal .setting-codes')
                .append(
                    $('<option></option>').val(item.code).html(item.value)
                );
        });
    }
});