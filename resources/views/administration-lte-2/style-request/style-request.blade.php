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
.glyphicon.spinning {
    animation: spin 1s infinite linear;
    -webkit-animation: spin2 1s infinite linear;
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1) rotate(360deg); }
}

@-webkit-keyframes spin2 {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
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
                                <label>Rules</label>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="rules-radio" id="optionsRadios1" value="option1" checked>
                                        Create new
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="rules-radio" id="optionsRadios2" value="option2">
                                        Apply existing
                                    </label>
                                </div>
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
                                <label>Mascots</label>
                                <select class="form-control rules-mascots" multiple="multiple">
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
                                <label>Application Locations</label>
                                <select class="form-control pa-allowed-apps" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label>Max # of Applications</label>
                                <select class="form-control rules-max-applications">
                                </select>
                            </div>

                            <div class="form-group col-md-12">
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

<div class="modal fade" tabindex="-1" role="dialog" id="loadingModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span class="glyphicon glyphicon-refresh spinning"></span> Loading</h4>
      </div>
      <div class="modal-body">
        <p class="modal-text-body"></p>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/js/admin-v1-utils.js"></script>
<script type="text/javascript">
$(document).ready(function(){

var loaded_accents = false;
var loaded_block_patterns = false;
var loaded_fonts = false;
var loaded_price_item_templates = false;

$('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });

getDataFromAPI(sports_categories_url, 'categories'); // getDataFromAPI(API_URL, RETURN_TEXT_AND_WINDOW_VARIABLE);
populateSelectElem(categories, 'name', 'id', '.style-category'); // getDataFromAPI(DATA_SOURCE(DS), DROPDOWN_TEXT_FROM_DS_FIELD, DROPDOWN_VALUE_FROM_DS_FIELD, DROPDOWN_ELEMENT_CLASS);




/* DOM EVENTS */




$('.rules-bp').on('click', function(e){
    e.preventDefault();
    if(!loaded_block_patterns){
        showLoadingModal();
        setLoadingModalText('Block patterns...');
        getDataSyncAs(block_patterns_url, 'block_patterns', 'false', 'name', 'id', '.rules-bp');
        loaded_block_patterns = true;
    }
});

$('.rules-bp').on('change', function(e){
    var selected_bp_id = $(this).val();
    updateBPOdd(block_patterns, selected_bp_id, '.rules-bp-options');
});





$('.rules-pi-template').on('click', function(e){
    e.preventDefault();
    if(!loaded_price_item_templates){
        showLoadingModal();
        setLoadingModalText('Price Item Templates...');
        getDataSyncAs(price_item_templates_url, 'price_item_templates', 'false', 'name', 'id', '.rules-pi-template');
        loaded_price_item_templates = true;
    }
});

$('.rules-pi-template').on('change', function(e){
    var pi_id = $(this).val();
    var pi_template = _.find(price_item_templates, function(e){ return e.id == pi_id; });
    buildPITTable(pi_template, '#tbody_sizes'); // buildPITTable(DATA, TBODY_ELEM_ID);
});




$('.rules-accents').on('click', function(e){
    if(!loaded_accents){
        showLoadingModal();
        setLoadingModalText('Accents...');
        getDataSyncAs(accents_url, 'accents', 'false', 'name', 'id', '.rules-accents');
        loaded_accents = true;
        initSelect2('.rules-accents','Select valid accents');
    }
});




$('.rules-fonts').on('click', function(e){
    if(!loaded_fonts){
        showLoadingModal();
        setLoadingModalText('Fonts...');
        getDataSyncAs(fonts_url, 'fonts', 'false', 'name', 'id', '.rules-fonts');
        loaded_fonts = true;
        initSelect2('.rules-fonts','Select valid fonts');
    }
});



$(document).on('change', 'select', function() {
    console.log($('.rules-accents').val());
    console.log($('.rules-fonts').val());
    console.log($('.rules-mascots').val());
    console.log($('.rules-patterns').val());
});

/* DOM EVENTS --- END */

});
</script>
@endsection
