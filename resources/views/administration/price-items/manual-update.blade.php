\@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-money"></span>
                        Manual Price Items Update
                        <small>
                            <a href="/administration/price_items" class='btn btn-xs btn-warning'>
                                Back
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="#" enctype="multipart/form-data" id='price_item_manual_update'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Source URL</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control source-url-input" name="name" value="http://qx.azurewebsites.net/api/priceitem?DealerId=6">
                            </div>
                            <a href="#" class="btn btn-primary get-source">GET</a>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Items to update URL</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control items-to-update-url-input" name="name" value="http://api-dev.qstrike.com/api/price_items">
                            </div>
                            <a href="#" class="btn btn-primary get-items-to-update">GET</a>
                        </div>
                        <div class="alert alert-info">
                            <h4>Set Intersection of source and data to update.</h3>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Source Field</label>
                            <div class="col-md-2">
                                <select class='source-field' class="form-control">
                                    <option>undefined</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Destination Field</label>
                            <div class="col-md-2">
                                <select class='destination-field' class="form-control">
                                    <option>undefined</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Select Fields to Update</label>
                            <div class="col-md-6">
                                <a href="#" class="btn btn-primary btn-xs add-fields">Add</a>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Source</th>
                                            <th>Destination</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="fields-rows">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-2 col-md-offset-5">
                                <a href="#" class="btn btn-primary update-data">Update Data</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script>
$(document).ready(function(){

window.source_data = null;
window.items_to_update = null;
window.source_data_dd = null;
window.items_to_update_dd = null;

$('.update-data').on('click', function(e){
    var transfer_format = [];
    $(".data-row").each(function(i) {
        var x = {
            'source' : $(this).find('.source').val(),
            'destination' : $(this).find('.destination').val(),
        };
        transfer_format.push(x);
    });
    // console.log(transfer_format);
    updateData(transfer_format);
});

function updateData(transfer_format){
    window.items_to_update.forEach(function(entry) {
        var destination_val = parseInt(entry[$('.destination-field').val()]);
        var source_field = $('.source-field').val();
        // console.log('destination val: '+destination_val);
        
        // var data = findObjectByKey(window.source_data, source_field, destination_val);
        // var data = window.source_data.find(function (obj) { return obj[source_field] === destination_val; });
        var data = _.find(window.source_data, function (obj) { return obj[source_field] === destination_val; });
        var updated_entry = new Object();
        updated_entry.id = entry.id;
        updated_entry.price_item = entry.price_item;
        updated_entry.factory_price_item_id = entry.factory_price_item_id;
        updated_entry.factory_id = entry.factory_id;
        updated_entry.dealer_id = entry.dealer_id;
        updated_entry.msrp = entry.msrp;
        updated_entry.uniform_category_id = entry.uniform_category_id;
        updated_entry.web_price_sale = entry.web_price_sale;
        // console.log(data);
        try {
            transfer_format.forEach(function(x) {
                updated_entry[x.destination] = data[x.source];
            });
        }
        catch(err) {
            console.log(err.message);
        }
        console.log('DATA');
        console.log(data);
        console.log('ENTRY');
        console.log(entry);
        console.log('UPDATED ENTRY');
        console.log(updated_entry);
        // return false;
    });
}

$('.add-fields').on('click', function(e){
    e.preventDefault();
    var elem = `<tr class="data-row">
                    <td>
                        <select class="source">` + window.source_data_dd +
                        `</select>
                    </td>
                    <td>
                        <select class="destination">` + window.items_to_update_dd +
                        `</select>
                    </td>
                    <td>
                        <a href="#" class="btn btn-xs btn-danger delete-row">x</a>
                    </td>
                </tr>`;

    $('.fields-rows').prepend(elem);
    $('.update-data').css('display','block');
    enableDeleteRow();
});

function enableDeleteRow(){
    $('.delete-row').on('click', function(e){
        e.preventDefault();
        $(this).parent().parent().remove();
    });
    checkRowLength();
}

function checkRowLength(){
    if( $(".data-row").length === 0 ){
        console.log('cannot find');
        $('.update-data').css('display','none');
    }
}

$('.get-source').on('click', function(){
    getSource(function(source_data){ window.source_data = source_data; });
    console.log( window.source_data );
    populateFieldSelection(window.source_data[0], '.source-field');
    console.log('# of entries:'+window.source_data.length);
});

$('.get-items-to-update').on('click', function(){
    getItemsToUpdate(function(items_to_update){ window.items_to_update = items_to_update; });
    console.log( window.items_to_update );
    populateFieldSelection(window.items_to_update[0], '.destination-field');
    console.log('# of entries:'+window.items_to_update.length);
});

function populateFieldSelection(data, class_name){
    $(class_name).html('');
    // console.log(data);
    var dd = null;

    for (var key in data) {
        var elem = '<option value="'+key+'">'+key+'</option>';
        $(class_name).append(elem);
        dd += elem;
    }

    if(class_name == '.source-field'){
        window.source_data_dd = dd;
    } else if(class_name == '.destination-field'){
        window.items_to_update_dd = dd;
    }
}



console.log('working');

function getSource(callback){
    var source_data;
    var url = $('.source-url-input').val();
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            source_data = data;
            if(typeof callback === "function") callback(source_data);
            //Close loading modal
            // $('#getPartsModal').modal('hide');
        }
    });
}

function getItemsToUpdate(callback){
    var items_to_update;
    var url = $('.items-to-update-url-input').val();
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            items_to_update = data['price_items'];
            if(typeof callback === "function") callback(items_to_update);
            //Close loading modal
            // $('#getPartsModal').modal('hide');
        }
    });
}

});
</script>
@endsection