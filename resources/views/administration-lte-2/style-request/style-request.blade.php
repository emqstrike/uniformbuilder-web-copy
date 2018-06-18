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
                                    <option value="0">Select Category...</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Style Type</label>
                                <select class="form-control style-type">
                                    <option value="tackle_twill">Tackle Twill</option>
                                    <option value="sublimated">Sublimated</option>
                                    <option value="infused">Infused</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>QStrike Item ID</label>
                                <div class="input-group">
                                    <input type="number" class="form-control style-qstrike-item-id">
                                    <div class="input-group-addon" id="qiid_div"><span id="qiid" class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Rules</label>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="rules-radio" id="ruleCaseRadioBtn1" class="rules-radiobtn" value="create_new" checked>
                                        Create new
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="rules-radio" id="ruleCaseRadioBtn2" class="rules-radiobtn" value="apply_existing">
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
                                <textarea class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <center>
                                    <a href="#" class="btn btn-flat btn-xl btn-success" disabled>Submit Style Request</a>
                                </center>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 div-bordered">
                        <h3>Rules</h3>
                        <form id="style_info_form">
                            <div class="form-group" id="rule_list_div" style="display: none;">
                                <label>Select Rule</label>
                                <select class="form-control rules-list">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Block Pattern</label>
                                <select class="form-control rules-bp rules-dependent">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Block Pattern Options</label>
                                <select class="form-control rules-bp-options rules-dependent">
                                    <option value="">F03</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Price Item Template</label>
                                <select class="form-control rules-pi-template rules-dependent">
                                    <option value="0">Select Price Item Template...</option>
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
                                <select class="form-control rules-gender rules-dependent">
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Accents</label>
                                <select class="form-control rules-accents rules-dependent" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Fonts</label>
                                <select class="form-control rules-fonts rules-dependent" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Mascot Categories</label>
                                <select class="form-control rules-mascot-categories rules-dependent" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Patterns</label>
                                <select class="form-control rules-patterns rules-dependent" multiple="multiple">
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 div-bordered">
                        <h3>Parts & Applications</h3>
                        <form id="style_info_form">
                            <div class="form-group">
                                <label>Application Locations</label>
                                <select class="form-control pa-allowed-apps rules-dependent" multiple="multiple">
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label>Max # of Applications</label>
                                <select class="form-control rules-max-applications rules-dependent">
                                </select>
                            </div>

                            <div class="form-group col-md-12">
                                <label>Parts</label>
                                <a href="#" class="btn btn-xs btn-info add-parts-btn">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                </a>
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Customizer Part Name</th>
                                            <th>QStrike Part Name</th>
                                            <th>Color Set</th>
                                            <th>Fabrics Allowed</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody_parts"></tbody>
                                </table>
                            </div>

                            <div class="form-group col-md-12">
                                <label>Description</label>
                                <input type="text" class="form-control new-rule-description rules-dependent">
                            </div>

                            <div class="form-group col-md-2">
                                <a href="#" class="form-control btn btn-success export-rule-btn rules-dependent">Export Rule</a>
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

window.current_activity = null;

rule_case = $('#ruleCaseRadioBtn1').val();
active_rule_data = null;

active_category_id = 0;
active_category_name = '';
colors_sets_dd = '';
master_fabrics_dd = '';

loaded_accents = false;
loaded_block_patterns = false;
loaded_colors_sets = false;
loaded_master_fabrics = false;
loaded_fonts = false;
loaded_mascot_categories = false;
loaded_patterns = false;
loaded_price_item_templates = false;

valid_qx_item_id = false;

fonts = null;
patterns = null;
qstrike_item_questions = null;
questions_dropdown = '';

$('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });

getDataFromAPI(sports_categories_url, 'categories'); // getDataFromAPI(API_URL, RETURN_TEXT_AND_WINDOW_VARIABLE);
populateSelectElem(categories, 'name', 'id', '.style-category', true); // populateSelectElem(DATA_SOURCE(DS), DROPDOWN_TEXT_FROM_DS_FIELD, DROPDOWN_VALUE_FROM_DS_FIELD, DROPDOWN_ELEMENT_CLASS);
populateDDwithNums('.rules-max-applications', 0, 10);
populateDDwithNums('.pa-allowed-apps', 1, 60);
populateSelectElem(style_request_priorities, 'name', 'id', '.style-priority', false);
initSelect2('.pa-allowed-apps','Select valid applications'); 





/* DOM EVENTS */

$('.rules-list').on('change', function(e){
    var active_rule_id = $(this).val();
    active_rule_data = _.find(rules, function(e){ return e.id == active_rule_id; });
    console.log(active_rule_data);
    loadActiveRulesData();
});

$('.style-qstrike-item-id').on('change', function(e){
    var item_id = $(this).val();
    getQStrikeItemData(item_id);
});



$('.rules-radiobtn').on('change', function(e){
    setCurrentActivity("rules_state");
    var radio_val = $('input[name=rules-radio]:checked').val();

    rule_case = radio_val;
    console.log('radio change');
    validateRuleCase(rule_case);
});

function validateRuleCase(rule_case){
    if(rule_case == "create_new"){
        $( ".rules-dependent" ).each(function( e ) {
            $(this).attr('disabled', false);
            $('#rule_list_div').fadeOut();
        });
    } else if (rule_case == "apply_existing"){
        $( ".rules-dependent" ).each(function( e ) {
            $('#rule_list_div').addClass("alert alert-info");
            $(this).attr('disabled', true);
            $('#rule_list_div').fadeIn();
            setTimeout(function(){
                $('#rule_list_div').removeClass("alert alert-info");
            },1500);
        });

        getDataSyncAsMin("rules");
    }
}





$('.style-category').on('change', function(e){
    setCurrentActivity("style_category");
    active_category_id = $(this).val();
    active_category_name = $(".style-category option:selected").text();
    setDatabyActiveCategory();

    var selected_bp_id = $('.rules-bp').val();
    if(loaded_block_patterns){
        updateBPOdd(block_patterns, selected_bp_id, '.rules-bp-options');
    }
});




$('.rules-bp').on('click', function(e){
    setCurrentActivity("block_patterns");
    e.preventDefault();
    if(!loaded_block_patterns){
        showLoadingModal();
        setLoadingModalText('Block patterns...');
        getDataSyncAs(block_patterns_url, 'block_patterns', 'false', 'name', 'id', '.rules-bp', true);
        loaded_block_patterns = true;
    }
});





$('.add-parts-btn').on('click', function(e){
    e.preventDefault();
    if(!loaded_colors_sets){
        getDataSyncAsMin("colors_sets");
    }
    if(!loaded_master_fabrics){
        getDataSyncAsMin("master_fabrics");
    }
    var row = '';
    row += '<tr><td><input type="text" c;ass="form-control part-name"></td>';
    row += '<td><select class="form-control qstrike-part-name">'+questions_dropdown+'</select></td>';
    row += '<td><select class="form-control part-colors-set">'+colors_sets_dd+'</select></td>';
    row += '<td><select class="form-control part-fabrics-allowed">'+master_fabrics_dd+'</select></td>';
    row += '<td><a href="#" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td></tr>';
    $('#tbody_parts').append(row);
});





$('.rules-bp').on('change', function(e){
    setCurrentActivity("block_patterns");
    var selected_bp_id = $(this).val();
    updateBPOdd(block_patterns, selected_bp_id, '.rules-bp-options');
});



$('.rules-pi-template').on('click', function(e){
    setCurrentActivity("price_item_templates");
    e.preventDefault();
    if(!loaded_price_item_templates){
        showLoadingModal();
        setLoadingModalText('Price Item Templates...');
        getDataSyncAs(price_item_templates_url, 'price_item_templates', 'false', 'name', 'id', '.rules-pi-template', true);
        loaded_price_item_templates = true;
    }
});

$('.rules-pi-template').on('change', function(e){
    setCurrentActivity("price_item_templates");
    var pi_id = $(this).val();
    var pi_template = _.find(price_item_templates, function(e){ return e.id == pi_id; });
    buildPITTable(pi_template, '#tbody_sizes'); // buildPITTable(DATA, TBODY_ELEM_ID);
});





$('.rules-accents').on('click', function(e){
    setCurrentActivity("accents");
    if(!loaded_accents){
        showLoadingModal();
        setLoadingModalText('Accents...');
        getDataSyncAs(accents_url, 'accents', 'false', 'name', 'id', '.rules-accents', true);
        loaded_accents = true;
        initSelect2('.rules-accents','Select valid accents');
    }
});





$('.rules-fonts').on('click', function(e){
    setCurrentActivity("fonts");
    if(!loaded_fonts){
        showLoadingModal();
        setLoadingModalText('Fonts...');
        getDataSyncAs(fonts_url, 'fonts', 'false', 'name', 'id', '.rules-fonts', true);
        loaded_fonts = true;
        initSelect2('.rules-fonts','Select valid fonts');
    }
});





$('.rules-mascot-categories').on('click', function(e){
    setCurrentActivity("mascots");
    if(!loaded_mascot_categories){
        showLoadingModal();
        setLoadingModalText('Mascots...');
        getDataSyncAs(mascot_categories_url, 'mascots_categories', 'false', 'name', 'id', '.rules-mascot-categories', false);
        loaded_mascot_categories = true;
        initSelect2('.rules-mascot-categories','Select valid mascot categories');
    }
});





$('.rules-patterns').on('click', function(e){
    setCurrentActivity("patterns");
    if(!loaded_patterns){
        showLoadingModal();
        setLoadingModalText('Patterns...');
        getDataSyncAs(patterns_url, 'patterns', 'false', 'name', 'id', '.rules-patterns', true);
        loaded_patterns = true;
        initSelect2('.rules-patterns','Select valid patterns');
    }
});

$('.export-rule-btn').on('click', function(e){
    e.preventDefault();
    if(!$(this).attr('disabled')){
        var data = {};
        data.description = $('.new-rule-description').val();
        data.sport = $(".style-category option:selected").text();
        data.sport_id = $(".style-category").val();
        data.block_pattern = $(".rules-bp option:selected").text();
        data.block_pattern_id = $(".rules-bp").val();
        data.block_pattern_option = $(".rules-bp-options option:selected").text();
        // data.style_type = ;
        data.price_item_template_id = $(".rules-pi-template").val();
        // data.price_item_template_properties = ;
        data.gender = $(".rules-gender").val();
        data.accents = JSON.stringify($(".rules-accents").val());
        data.fonts = JSON.stringify($(".rules-fonts").val());
        data.mascot_categories = JSON.stringify($(".rules-mascot-categories").val());
        data.patterns = JSON.stringify($(".rules-patterns").val());
        data.application_locations = JSON.stringify($(".pa-allowed-apps").val());
        data.max_application_locations = $(".rules-max-applications").val();
        // data.parts = ;
        // data.piping_locations = ;
        console.log(data);
        exportRule(data);
    }
});


/* DOM EVENTS --- END */

});
</script>
@endsection
