@extends('administration.lte-main')

@section('styles')
<style type="text/css">
    .sr-container {
        padding: 10px !important;
        background-color: #fff;
    }
    .box.box-solid, .container-fluid {
        padding: 25px;
        margin: 0;
        box-shadow: none !important;
    }
    .box-header {
        background-color: #f2f2f2;
    }
    .box-header > h2, .box-header > h3 {
        margin-top: 0;
        margin-bottom: 0;
    }
    .box-body {
        /* border-top: 0.75px solid !important;
        border-bottom: 0.75px solid !important; */
        padding: 0!important;
    }
    .table.style-request-rules {
        width: 100% !important;
    }
    .table.style-request-rules tbody > tr td {
        border: 1px solid  #000 !important;
        width: 25% !important;
        padding: 50px !important;
    }
    .table.parts-pipings-table {
        table-layout: fixed;
    }
    .table.parts-pipings-table tbody > tr td,
    .table.parts-pipings-table thead > tr th,
    .table.fabric-colors-table tbody > tr td,
    .table.fabric-colors-table thead > tr th {
        border: 1px solid  #000 !important;
    }
    .h4.text-bold {
        font-weight: bold !important;
        display: block;
    }
    hr {
        border: 1px solid #b1b1b0;
        width: 100%;
        margin: 0 !important;
        /* display: none; */
    }
    p.content-underlined {
        display: inline-block;
        border-bottom: 2px solid #b1b1b0 !important;
        /* padding-bottom: 10px; */
        padding: 0 20px 10px 0;

    }
    .rl-allowed-apps {
        padding:20px;
    }
    .table.style-request-rules .notes-table tr > * {
        padding: 3px!important;
        border: none!important;
    }
    .table.style-request-rules .status-logs-table tr > * {
        padding: 5px 0!important;
        border: none!important;
    }
    .fixed-header {
        overflow: auto;
        max-height: 265px;
    }
    .color-box {
        color: #ffffff;
        display: inline-block;
        margin: 3px 3px;
        padding: 3px 5px;
        text-shadow: 1px 1px #000000;
    }
</style>
@endsection
@section('content')
<section class="content row">
    <div class="sr-container col-xs-12">
        <input type="hidden" id="srid" value="{{ $id }}" readonly/>
        <!-- Style request -->
        <div class="box box-solid">
            <div class="box-header">
                @section('page-title', 'Qx7 Style Requests')
                <div class="row">
                    <div class="col-xs-6">
                        <h2 class="text-bold" style="margin:0">STYLE REQUEST</h2>
                    </div>
                    <div class="col-xs-6 text-right">
                        <!-- BRAND LOGO HERE -->
                        <img src="https://qx7.s3-us-west-2.amazonaws.com/riddell_logo.png" alt="logo" height=30/>
                    </div>
                </div>
            </div>
            <div class="box-body">
                <table class="table style-request-rules">
                    <tbody >
                        <tr>
                            <td style="border-left: 0!important">
                                <h4 class="text-bold">Name: <small class="sr-name"></small></h4>
                                <!-- <h4 class="text-bold" style="margin-top: 30px;">Brand: <small class="sr-brand"></small></h4> -->
                                <h4 class="text-bold" style="margin-top: 30px;">Gender: <small class="sr-gender"></small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Sport: <small class="sr-sport"></small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Application: <small class="sr-app"></small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Style Category: <small class="sr-style-category"></small></h4>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label class="h4 text-bold">Factory</label>
                                    <p class="sr-factory"></p>
                                </div>
                                <div class="form-group">
                                    <label class="h4 text-bold">Quick Strike Item ID</label>
                                    <p class="sr-qxid"></p>
                                </div>
                                <div class="form-group">
                                    <label class="h4 text-bold">Priority</label>
                                    <p class="sr-priority" style="text-transform:capitalize"></p>
                                </div>

                                <div class="form-group">
                                    <label class="h4 text-bold">Deadline</label>
                                    <p class="sr-deadline"></p>
                                </div>
                                <div class="form-group">
                                    <label class="h4 text-bold">Status</label>
                                    <p class="sr-status"></p>
                                </div>


                            </td>
                            <td style="border-right: 0!important">
                                <div class="form-group">
                                    <label class="h4 text-bold">Notes</label>
                                    <p class="sr-notes"></p>
                                    <div class="form-group">
                                    <!-- <textarea class="form-control" name="notes" id="notes" hidden></textarea> -->
                                        <div class="fixed-header">
                                            <table class="table text-left text-secondary notes-table" hidden>
                                                <thead>
                                                    <tr class="text-secondary">
                                                        <th class="w-50" style="width:50%">Message</th>
                                                        <th class="text-nowrap">Updated by</th>
                                                        <th class="text-nowrap">Updated on</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style="border-right: 0!important">
                                <div class="form-group">
                                    <label class="h4 text-bold">Status Logs</label>
                                    <p class="sr-status-logs"></p>
                                    <div class="form-group">
                                        <div class="fixed-header">
                                            <table class="table text-left text-secondary status-logs-table" hidden>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Rules -->
        <div class="box box-solid">
            <div class="box-header">
                <h3 class="col-12 text-bold">RULES</h3>
            </div>
            <div class="box-body">
                <table class="table style-request-rules">
                    <tbody >
                        <tr>
                            <td style="border-left: 0!important">
                                <div class="form-group">
                                    <label class="h4 text-bold">Size Spec Sheet</label>
                                    <p class="rl-spec-sheet"></p>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label class="h4 text-bold">Accents</label>
                                    <p class="rl-accents"></p>
                                </div>
                                <!-- <hr> -->
                                <div class="form-group">
                                    <label class="h4 text-bold">Team Name Configuration</label>
                                    <p class="rl-tn-configurations"></p>
                                </div>
                                <!-- <hr> -->
                            </td>
                            <td style="border-right: 0!important">
                                <!-- <hr/> -->
                                <div class="form-group">
                                    <label class="h4 text-bold">Last Name Configuration</label>
                                    <p class="rl-ln-configurations"></p>
                                </div>
                                <!-- <hr/> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Parts and Application Rules -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-4">
                    <h3 class="col-12 text-bold" style="margin-top: 0">Parts &amp; Application Rules</h3>
                    <hr/>
                    <div class="form-group rl-allowed-apps">
                        <h3 class="col-12 text-bold">Allowed Application Locations</h3>
                        <!-- <p>1 Front Chest Upper</p>
                        <p>2 Front Chest Center</p>
                        <p>5 Back Body Center</p>
                        <p>7 Back Upper Center</p>
                        <p>6 Back Name</p>
                        <p>9 Left Sleeve</p>
                        <p>10 Right Sleeve</p>
                        <p>4 Front Neck Base</p> -->
                    </div>
                    <hr/>
                </div>
                <div class="col-xs-8" style="padding-left:5%;padding-right:5%">
                    <!-- Pipings -->
                    <table class="table text-center parts-pipings-table">
                        <thead>
                            <tr>
                                <th colspan=4 class="box-header" style="display:table-cell"><h3 class="col-12 text-bold">Pipings</h3></th>
                            </tr>
                            <tr>
                                <th>Body Part Name</th>
                                <th>1/8</th>
                                <th>1/4</th>
                                <th>1/2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <tr>
                               <td>Neck Piping</td>
                               <td>3 Colors</td>
                               <td>3 Colors</td>
                               <td>1 Color</td>
                            </tr>
                            <tr>
                               <td>BCenter Piping</td>
                               <td>3 Colors</td>
                               <td>2 Colors</td>
                               <td></td>
                            </tr>
                            <tr>
                               <td>Yoke Piping</td>
                               <td></td>
                               <td></td>
                               <td></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Fabrics and colors -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12" style="">
                    <!-- Pipings -->
                    <table class="table text-center fabric-colors-table">
                        <thead>
                            <tr>
                                <th colspan=4 class="box-header" style="display:table-cell"><h3 class="col-12 text-bold">Fabrics</h3></th>
                            </tr>
                            <tr>
                                <th style="width:10%">Body Part Group</th>
                                <th>Body Parts</th>
                                <th>Brand Fabric Name</th>
                                <th style="width:60%">Colors</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection


@section('scripts')
<script>
$(document).ready(function(){
    srid = $('#srid').val();

    function getQx7StyleRequests(id, callback){
            var style_request;
            var url = "//" + qx7_host + "/api/style_request/"+ id + "/formatted_data";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    style_request = data['style_request'];
                    if(typeof callback === "function") callback(style_request);
                }
            });
    }

    function populateFields (style_request) {
        // Style Request fields
        $('.sr-name').text(style_request.style_name);
        $('.sr-brand').text(style_request.brand.brand);
        $('.sr-gender').text(style_request.gender.gender);
        $('.sr-sport').text(style_request.sport.sport_name);
        $('.sr-app').text(style_request.application_type.application_type);
        $('.sr-style-category').text(style_request.style_category.style_category);
        $('.sr-factory').text(style_request.factory.factory);
        $('.sr-qxid').text(style_request.quickstrike_item_id);
        $('.sr-priority').text(style_request.priority);

        var formattedDeadline = '';
        if (!_.isNull(style_request.deadline)) {
            var deadline = style_request.deadline.split('-');
            var formattedDeadline = '';
            _.each(deadline.reverse(), function(dt){
                formattedDeadline += dt + '/';
            });
            formattedDeadline = formattedDeadline.slice(0, -1)
        }

        $('.sr-deadline').text(formattedDeadline);
        $('.sr-status').text(style_request.status);
        // $('.sr-notes').text(style_request.notes);
        // $('#notes').val(style_request.notes);
        loadNotes(style_request.notes);
        loadStatusLogs(style_request.status_logs)

        if(!_.isNull(style_request.filter_flags)) {
            var flags = JSON.parse(JSON.parse(style_request.filter_flags));
            _.each(flags, function (value, key) {
                if(value != "") {
                    $('.sr-filter-flags').append(`
                        <div class="form-group">
                            <label class="h4 text-bold">`+key.replace('_', ' ')+`</label>
                            <p>`+JSON.stringify(value).replace(/\{|\}|\"|\[|\]|,/g, function(match){
                                return match === ',' ? ', ' : '';
                            })+`</p>
                        </div>`
                    );
                }
            });
        }

        // Rules fields
        if(!_.isNull(style_request.rules)) {
            var rules = style_request.rule;

            if(!_.isNull(rules.sizes) && !_.isEmpty(rules.sizes) ) {
                var sizes = rules.sizes.replace(/\{|\}|\"|\[|\]|,/g, '');
                $('.rl-sizes').text(sizes);

            }

            if(!_.isNull(rules.accents) && !_.isEmpty(rules.accents) ) {
                var accents = rules.accents.replace(/\{|\}|\"|\[|\]|,/g, function(match){
                                return match === ',' ? ', ' : '';
                            });
                $('.rl-accents').text(accents);

            }

            if(!_.isNull(rules.last_name_configurations) && !_.isEmpty(rules.last_name_configurations) ) {
                var last_name_configurations = rules.last_name_configurations.replace(/\{|\}|\"|\[|\]|,/g, function(match){
                                return match === ',' ? ', ' : '';
                            });
                $('.rl-ln-configurations').text(last_name_configurations);
            }

            if(!_.isNull(rules.team_name_configurations) && !_.isEmpty(rules.team_name_configurations) ) {
                var team_name_configurations = rules.team_name_configurations.replace(/\{|\}|\"|\[|\]|,/g, function(match){
                                return match === ',' ? ', ' : '';
                            });
                $('.rl-tn-configurations').text(team_name_configurations);
            }

            // Allowed app locations
            if(!_.isNull(rules.allowed_application_locations) && !_.isEmpty(rules.allowed_application_locations) ) {
                var app_locations = JSON.parse(rules.application_locations);
                _.each(app_locations, function (value, key) {
                    $('.rl-allowed-apps').append(`
                        <p>`+value +`</p>`
                    );
                });
            }

            // Spec sheet
            if(!_.isNull(rules.spec_sheet) && !_.isEmpty(rules.spec_sheet) ) {
                $('.rl-spec-sheet').text(rules.spec_sheet.spec_sheet_name);
            }

            // Allowed piping locations
            if(!_.isNull(rules.allowed_piping_locations) && !_.isEmpty(rules.allowed_piping_locations) ) {
                var pipings = JSON.parse(JSON.parse(rules.allowed_piping_locations));
                _.each(pipings, function (piping) {
                    $('.parts-pipings-table tbody').append(`
                            <tr>
                               <td>`+piping['Piping Location']+`</td>
                               <td>`+piping['1/8 Colors'].length+` Colors</td>
                               <td>`+piping['1/4 Colors'].length+` Colors</td>
                               <td>`+piping['1/2 Colors'].length+` Colors</td>
                            </tr>
                    `);

                });
            }

            // Fabrics
            if((!_.isNull(rules.fabrics) && !_.isEmpty(rules.fabrics)) && (!_.isNull(rules.body_part_fabric_groups) && !_.isEmpty(rules.body_part_fabric_groups))) {
                var fabric_groups = JSON.parse(JSON.parse(window.style_requests.rule.body_part_fabric_groups))
                // for each body_part_fabric_group,
                _.each(fabric_groups, function (fgroup) {
                    var parts = !_.isNull(fgroup['Body Parts']) ? fgroup['Body Parts'].join('\n') : '';

                    var rowspan = 1;

                    if (!_.isNull(fgroup['Fabrics'])) {
                        if (fgroup['Fabrics'].includes(fgroup['Default Fabric'])) {
                            // remove the default fabric code in Fabrics, if it exists
                            fgroup['Fabrics']  = _.without(fgroup['Fabrics'], fgroup['Default Fabric']);
                        }
                        rowspan = fgroup['Fabrics'].length + 1;
                    }
                    var fabric_row = `<tr>
                                    <td rowspan=`+rowspan+`>`+fgroup['Body Part Group']+`</td>
                                    <td rowspan=`+rowspan+` style="text-align:left!important;">`;
                    _.each(fgroup['Body Parts'], function (part) {
                        fabric_row += part + '<br/>';
                    });
                    fabric_row += `</td>`;

                    var master_colors;
                    var url = "//" + qx7_host + "/api/master_colors";
                    $.ajax({
                        url: url,
                        async: false,
                        type: "GET",
                        dataType: "json",
                        crossDomain: true,
                        contentType: 'application/json',
                        success: function(data){
                            master_colors = data['master_colors'];
                        }
                    });
                    // foreach fabric,
                    _.each(rules.fabrics, function (fabric) {
                        if (!_.isNull(fabric.colors[0]) && !_.isEmpty(fabric.colors[0])) {
                                fcolors = JSON.parse(fabric.colors[0].master_color_ids);
                                var def = fgroup['Default Fabric'] === fabric.fabric_code ? `<small style="color:red"> (DEFAULT)</small>` : '';
                                var row = `<td>` + fabric.name + def + `</td><td style="text-align:left!important;">`;
                                var color_row = '';

                                // foreach master_color,
                                _.each(master_colors, function (master_color) {
                                    // foreach fabric color,
                                    _.each(fcolors, function (mcid) {
                                        if (master_color.id == mcid) {
                                            color_row += `<span class="color-box" style="background: #`+master_color.hex_code+`;">`
                                                    + master_color.factory_color_name+
                                                    `</span>`;
                                        }
                                    });
                                });
                                row += color_row;
                                row += `</td>`

                            if (fgroup['Default Fabric'] === fabric.fabric_code) {
                                fabric_row += row + `</tr>`;
                            } else if (fgroup['Fabrics'].includes(fabric.fabric_code)) {
                                fabric_row += `<tr>`+
                                                    row+`
                                                </tr>`;
                            }
                        }
                    });
                    $('.fabric-colors-table tbody').append(fabric_row)
                });
            }
        }
    }

    var loadNotes = function (sr_notes) {
        var notes = !_.isEmpty(sr_notes) ? JSON.parse(sr_notes) : null;

        if (!_.isNull(notes)) {
            var tableHead = $('.notes-table thead tr:first-child')
            var tableBody = $('.notes-table tbody')
            var rows = '';

            if (!_.isNull(notes)) {
                _.each(notes, function(note) {
                    rows += `<tr>
                                <td>`
                                    +note.note.replace(/\n/g, '<br/>')+
                                `</td>
                                <td class="text-nowrap">`
                                    +note.user+
                                `</td>
                                <td class="text-nowrap">`
                                    +note.date+
                                `</td>
                            </tr>`;
                });

                // show table
                tableBody.append(rows)
                $('.notes-table').show()
            }
        }

    }

    var loadStatusLogs = function (sr_slogs) {
        var status_logs = !_.isEmpty(sr_slogs) ? JSON.parse(sr_slogs) : null;
        if (!_.isNull(status_logs)) {
            var rows = '';
            if (!_.isNull(status_logs)) {
                var tableBody = $('.status-logs-table tbody')
                _.each(status_logs, function(log) {
                    rows += `<tr>
                                <td>
                                    Status was changed to "` + log.status + `" by "` + log.user + ` (ID: `+log.user_id+`)" on ` + log.date +
                                `</td>
                            </tr>`;
                });
                // show table
                tableBody.append(rows)
                $('.status-logs-table').show()
            }
        }
    }

    getQx7StyleRequests(srid, function (style_requests) {
        window.style_requests = style_requests;
        populateFields(style_requests)
    });


});
</script>

@endsection
