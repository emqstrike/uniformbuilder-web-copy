@extends('administration-lte-2.lte-main')

@section('styles')
<style type="text/css">
    .sr-container {
        padding: 10px !important;
        background-color: #fff;
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
    .allowed-apps {
        padding:30px;
    }
</style>
@endsection
@section('content')
<section class="content row">
    <div class="sr-container col-xs-12">
        <!-- Style request -->
        <div class="box box-solid">
            <div class="box-header">
                <h2 class="col-12 text-bold">STYLE REQUEST</h2>
            </div>
            <div class="box-body">
                <table class="table style-request-rules">
                    <tbody >
                        <tr>
                            <td style="border-left: 0!important">
                                <h4 class="text-bold">Name: <small class=""> STYLE REQUEST</small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Brand: <small class=""> STYLE REQUEST</small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Gender: <small class=""> STYLE REQUEST</small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Sport: <small class=""> STYLE REQUEST</small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Application: <small class=""> STYLE REQUEST</small></h4>
                                <h4 class="text-bold" style="margin-top: 30px;">Style Category: <small class=""> STYLE REQUEST</small></h4>
                            </td>
                            <td>
                                <h4 class="text-bold">Filter Flags</h4>
                                <div class="form-group">
                                    <label class="h4 text-bold">Neck Filter</label>
                                    BSB V-neck 2 Button Full Button
                                </div>
                                <!-- <hr/> -->
                                <div class="form-group">
                                    <label class="h4 text-bold">Sleeve Filters</label>
                                    SLeeveless Set-In Raglan
                                </div>
                                <!-- <hr/> -->
                                <div class="form-group">
                                    <label class="h4 text-bold">Hemline Filter</label>
                                    Straight Baseball Curved
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label class="h4 text-bold">Factory</label>
                                    <p>Billerby</p>
                                </div>
                                <div class="form-group">
                                    <label class="h4 text-bold">Quick Strike Item ID</label>
                                    <p>2341</p>
                                </div>
                                <div class="form-group">
                                    <label class="h4 text-bold">Priority</label>
                                    <p>High</p>
                                </div>

                                <div class="form-group">
                                    <label class="h4 text-bold">Deadline</label>
                                    <p class="display-data" style="border: 0 !important">01/01/19</p>
                                </div>


                            </td>
                            <td style="border-right: 0!important">
                                <div class="form-group">
                                    <a href="#" class="h4 text-primary">Design Sheet</a>
                                </div>
                                <div class="form-group" style="margin-top: 50px;">
                                    <label class="h4 text-bold">Notes</label>
                                    <p>Sample Note</p>
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
                                <h4 class="text-bold">Size Spec Sheet: <small class=""> BLB Mens Basketball Jersey</small></h4>
                                <div class="form-group" style="margin-top: 30px;">
                                    <label class="h4 text-bold">Sizes</label>
                                    YXS YS YM YL YXL XSS M L XL 2XL 3XL
                                </div>
                                <div class="form-group" style="margin-top: 30px;">
                                    <label class="h4 text-bold">3D Block Pattern</label>
                                    YXS YS YM YL YXL XSS M L XL 2XL 3XL
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label class="h4 text-bold">Accents</label>
                                    <p>Drop Shadow Outlined</p>
                                </div>
                                <!-- <hr> -->
                                <div class="form-group">
                                    <label class="h4 text-bold">Fonts</label>
                                    <p>Basketball</p>
                                </div>
                                <!-- <hr> -->
                            </td>
                            <td style="border-right: 0!important">
                                <div class="form-group">
                                    <label class="h4 text-bold">Digital</label>
                                    <p>Billerby</p>
                                </div>
                                <!-- <hr/> -->
                                <div class="form-group">
                                    <label class="h4 text-bold">Configurations</label>
                                    <p>Vert. Arch Bookend ARC STRAIGHT</p>
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
                <div class="col-xs-5">
                    <h3 class="col-12 text-bold" style="margin-top: 0">Parts &amp; Application Rules</h3>
                    <hr/>
                    <div class="form-group allowed-apps">
                        <h3 class="col-12 text-bold">Allowed Application Locations</h3>
                        <p>1 Front Chest Upper</p>
                        <p>2 Front Chest Center</p>
                        <p>5 Back Body Center</p>
                        <p>7 Back Upper Center</p>
                        <p>6 Back Name</p>
                        <p>9 Left Sleeve</p>
                        <p>10 Right Sleeve</p>
                        <p>4 Front Neck Base</p>
                    </div>

                    <hr/>
                </div>
                <div class="col-xs-7">
                    <!-- Parts -->
                    <table class="table text-center parts-pipings-table">
                        <thead>
                            <tr>
                                <th colspan=3 class="box-header" style="display:table-cell"><h3 class="col-12 text-bold">Parts</h3></th>
                            </tr>
                            <tr>
                                <th>Body Part Name</th>
                                <th>Color Set</th>
                                <th>Brand Fabric Name</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                               <td>Front Body</td>
                               <td>Prolook Sublimated 1</td>
                               <td>LTX Testured ProFit</td>
                            </tr>
                            <tr>
                               <td>Back Body</td>
                               <td>Prolook Sublimated 1</td>
                               <td>LTX Testured ProFit</td>
                            </tr>
                            <tr>
                               <td>Sleeves Body</td>
                               <td>Prolook Sublimated 1</td>
                               <td>LTX Testured ProFit</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pipings -->
                    <table class="table text-center parts-pipings-table">
                        <thead>
                            <tr>
                                <th colspan=5 class="box-header" style="display:table-cell"><h3 class="col-12 text-bold">Pipings</h3></th>
                            </tr>
                            <tr>
                                <th>Body Part Name</th>
                                <th>1/8</th>
                                <th>1/4</th>
                                <th>1/2</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                               <td>Neck Piping</td>
                               <td>3 Colors</td>
                               <td>3 Colors</td>
                               <td>1 Color</td>
                               <td></td>
                            </tr>
                            <tr>
                               <td>BCenter Piping</td>
                               <td>3 Colors</td>
                               <td>2 Colors</td>
                               <td></td>
                               <td></td>
                            </tr>
                            <tr>
                               <td>Yoke Piping</td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                            </tr>
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

    getQx7StyleRequest(id function (style_requests) {
        window.style_requests = style_requests;
    });



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

});
</script>

@endsection
