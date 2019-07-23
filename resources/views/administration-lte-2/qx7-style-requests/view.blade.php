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
    .box-header > h2 {
        margin-top: 0;
        margin-bottom: 0;
    }
    .box-body {
        /* border-top: 0.75px solid !important;
        border-bottom: 0.75px solid !important; */
        padding: 0!important;
    }
    .table {
        width: 100% !important;
    }
    .table tbody > tr td {
        border: 1px solid  #000 !important;
        width: 25% !important;
        padding: 50px !important;
    }
    .h4.text-bold {
        font-weight: bold !important;
        display: block;
    }
    hr {
        border: 1px solid #b1b1b0;
        width: 100%;
        margin: 0 !important;
        display: none;
    }
    p.content-underlined {

        display: inline-block;
        border-bottom: 2px solid #b1b1b0 !important;
        padding-bottom: 10px;

    }
</style>
@endsection
@section('content')
<section class="content">
    <div class="sr-container col-xs-12">
        <!-- Style request -->
        <div class="box box-solid">
            <div class="box-header">
                <h2 class="col-12 text-bold">STYLE REQUEST</h2>
            </div>
            <div class="box-body">
                <table class="table">
                    <tbody >
                        <tr>
                            <td style="border-left: 0!important">
                                <h4 class="text-bold">Name: <small class=""> STYLE REQUEST</small></h4> 
                                <h4 class="text-bold">Brand: <small class=""> STYLE REQUEST</small></h4> 
                                <h4 class="text-bold">Gender: <small class=""> STYLE REQUEST</small></h4> 
                                <h4 class="text-bold">Sport: <small class=""> STYLE REQUEST</small></h4> 
                                <h4 class="text-bold">Application: <small class=""> STYLE REQUEST</small></h4> 
                                <h4 class="text-bold">Style Category: <small class=""> STYLE REQUEST</small></h4>
                            </td>
                            <td>
                                <h4 class="text-bold">Filter Flags</h4> 
                                <div class="form-group">
                                    <label class="h4 text-bold">Neck Filter</label>
                                    BSB V-neck 2 Button Full Button
                                </div> 
                                <hr>
                                <div class="form-group">
                                    <label class="h4 text-bold">Sleeve Filters</label>
                                    SLeeveless Set-In Raglan
                                </div> 
                                <hr>
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
                <table class="table">
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
                                    Drop Shadow Outlined
                                </div> 
                                <hr>
                                <div class="form-group">
                                    <label class="h4 text-bold">Fonts</label>
                                    Basketball
                                </div> 
                                <hr>
                            </td>
                            <td style="border-right: 0!important">
                                <div class="form-group">
                                    <label class="h4 text-bold">Digital</label>
                                    <p>Billerby</p>
                                </div> 
                                <hr/>
                                <div class="form-group">
                                    <label class="h4 text-bold">Configurations</label>
                                    <p>Vert. Arch Bookend ARC STRAIGHT</p>
                                </div> 
                                <hr/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
@endsection


@section('scripts')

@endsection