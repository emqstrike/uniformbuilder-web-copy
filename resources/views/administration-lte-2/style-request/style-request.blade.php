@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<style type="text/css">
.div-bordered {
    border: 1px solid #C8C8C8 !important;
    border-radius: 5px !important;
}
</style>
@endsection

@section('custom-styles')

@endsection

@section('content')

</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Style Request
                    </h1>
                </div>

                <div class="box-body">
                    <div class="col-md-2 div-bordered">
                        <h3>Style Information</h3>
                        <form id="style_info_form">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control style-name">
                            </div>

                            <div class="form-group">
                                <label>Style Category</label>
                                <select class="form-control style-category">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>QStrike Item ID</label>
                                <input type="number" class="form-control style-qstrike-item-id">
                            </div>

                            <div class="form-group">
                                <label>Priority</label>
                                <select class="form-control style-priority">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Deadline</label>
                                <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                                <div class="input-group">
                                    <div class="input-group-addon"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></div>
                                    <input type="text" id="datepicker" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Notes</label>
                                <textarea class="form-control">
                                    
                                </textarea>
                            </div>

                            <div class="form-group">
                                <center>
                                    <a href="#" class="btn btn-flat btn-xl btn-success" disabled>Submit</a>
                                </center>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 div-bordered">
                        <h3>Rules</h3>
                        <form id="style_info_form">
                            <div class="form-group">
                                <label>Block Pattern</label>
                                <select class="form-control rules-bp">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Block Pattern Options</label>
                                <select class="form-control rules-bp-options">
                                    <option value="">F03</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Price Item Template</label>
                                <select class="form-control rules-pi-template">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Sizes</label>
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>Price Item</th>
                                            <th>MSRP</th>
                                            <th>Web Price Sale</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody_sizes"></tbody>
                                </table>
                            </div>

                            <div class="form-group">
                                <label>Gender</label>
                                <select class="form-control rules-gender">
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Accents</label>
                                <select class="form-control rules-accents" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Fonts</label>
                                <select class="form-control rules-fonts" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Patterns</label>
                                <select class="form-control rules-patterns" multiple="multiple">
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 div-bordered">
                        <h3>Parts & Applications</h3>
                        <form id="style_info_form">
                            <div class="form-group">
                                <label>Allowed Applications</label>
                                <select class="form-control pa-allowed-apps" multiple="multiple">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Parts</label>
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Part Name</th>
                                            <th>QStrike Part</th>
                                            <th>Color Set</th>
                                            <th>Fabrics Allowed</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody_parts"></tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/js/admin-v1-utils.js"></script>
<script type="text/javascript">
$(document).ready(function(){

$('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });

initSelect2('.pa-allowed-apps','Select valid applications'); // initSelect2(DROPDOWN_ELEMENT_CLASS, PLACEHOLDER TEXT);
initSelect2('.rules-accents','Select valid accents');
initSelect2('.rules-fonts','Select valid fonts');
initSelect2('.rules-patterns','Select valid patterns');
getDataFromAPI(sports_categories_url, 'categories'); // getDataFromAPI(API_URL, RETURN_TEXT_AND_WINDOW_VARIABLE);
getDataFromAPI(block_patterns_url, 'block_patterns');
getDataFromAPI(accents_url, 'accents');
getDataFromAPI(fonts_url, 'fonts');
getDataFromAPI(patterns_url, 'patterns');
getDataFromAPI(price_item_templates_url, 'price_item_templates');
populateSelectElem(categories, 'name', 'id', '.style-category'); // getDataFromAPI(DATA_SOURCE(DS), DROPDOWN_TEXT_FROM_DS_FIELD, DROPDOWN_VALUE_FROM_DS_FIELD, DROPDOWN_ELEMENT_CLASS);
populateSelectElem(block_patterns, 'name', 'id', '.rules-bp');
populateSelectElem(accents, 'name', 'id', '.rules-accents');
populateSelectElem(fonts, 'name', 'id', '.rules-fonts');
populateSelectElem(patterns, 'name', 'id', '.rules-patterns');
populateSelectElem(price_item_templates, 'name', 'id', '.rules-pi-template');
populateSelectElem(style_request_priorities, 'name', 'id', '.style-priority');

$('.rules-pi-template').on('change', function(e){
    var pi_id = $(this).val();
    var pi_template = _.find(price_item_templates, function(e){ return e.id == pi_id; });
    console.log(pi_template);
    buildPITTable(pi_template, '#tbody_sizes'); // buildPITTable(DATA, TBODY_ELEM_ID);
});

console.log(accents);
console.log(fonts);
console.log(patterns);

$('.style-category').on('change', function(e){
    // change dropdown values (block pattern, gender, PIT + more) depending on category selected
});

});
</script>
@endsection
