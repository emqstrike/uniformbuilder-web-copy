@extends('administration-lte-2.lte-main')

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
    .table.parts-pipings-table thead > tr th {
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


                            </td>
                            <td style="border-right: 0!important">
                                <div class="form-group">
                                    <label class="h4 text-bold">Notes</label>
                                    <p class="sr-notes"></p>
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

        var deadline = style_request.deadline.split('-');
        var formattedDeadline = '';
        _.each(deadline.reverse(), function(dt){
            formattedDeadline += dt + '/';
        });
        $('.sr-deadline').text(formattedDeadline.slice(0, -1));
        $('.sr-notes').text(style_request.notes);

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
                    console.log(piping)
                    console.log(piping['Allow'])
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
        }
    }

    getQx7StyleRequests(srid, function (style_requests) {
        window.style_requests = style_requests;
        populateFields(style_requests[0])
    });


});
</script>

@endsection
