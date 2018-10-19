$(document).ready(function(){

sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL','3-5','5-7','8-12','13-14','Y Goalie','M Goalie','L Goalie','YXS','YS','YS/YM','YM','YL','YL/YXL','YXL','Y2XL','Y3XL','1 Size','22-30','26-34','32-44','46-54','24-34','36-46','36-48','50-54','30-36','38-42','22','23','24','24 (YXS)','25','26','26 (YS)','27','28','28 (YM)','29','30','31','32','32 (YL)','33','34','34 (YXL)','35','36','36 (S)','37','38','38 (M)','39','40','41','42','42 (L)','43','44','45','46','46 (XL)','47','48','49','50','50 (2XL)','51','52','53','54','54 (3XL)','26/YXS','28/YS','30/YM','32/YL','32/XS','34/YXL','34/S','36/M','40/L','44/XL','46/2XL'];
style_url = "https://api.prolook.com/api/material/"
price_item_url = "https://api.prolook.com/api/price_item/get_by_name/"
qstrike_style_url = "http://qx.azurewebsites.net/api/item?itemid=";
qstrike_priceitem_url = "http://qx.azurewebsites.net/api/priceitem";

// UPDATE CODE IF SPEC_SHEETS IS FINALIZED

$('.configure-style-btn').on('click', function(e){
    e.preventDefault();
    initConfigs();
});

function initConfigs(){
    var style_id = $('.style-id-input').val();


    var style_information = getStyleInformation(style_id);
    showStyleInformation(style_information);


    var qstrike_style_information = getQstrikeItemInformation(style_information.material.item_id);
    showQstrikeStyleInformation(qstrike_style_information);
    extractSizes(qstrike_style_information, qstrike_style_information[0]);


    var qstrike_price_items = getQstrikePriceItemInformation();
    var brand = formatBrandCase(style_information.material.brand);
    showQstrikePriceItemInformation(qstrike_price_items, qstrike_style_information[0].PriceItem, brand);


    var price_items = getPriceItemInformation(qstrike_style_information[0].PriceItem);
    showPriceItemInformation(price_items.price_items);
}

function formatBrandCase(brand){
    var translated_brand = null;
    if(brand === "prolook"){
        translated_brand = "Pro Look Sports";
    }

    return translated_brand;
}

function extractSizes(qstrike_style_information, price_item){
    console.log('extract sizes');
    console.log(price_item);
    var BreakException = {};
    var symbols = ["(",")","-"];
    var item_name = qstrike_style_information[0].Item;
    var name_split = item_name.split(" ");
    var size_block = "";
    var size_min_max = null;
    var extracted_sizes = [];
    var start_idx;
    var end_idx;

    // find sizes range
    try {
        sizes.forEach(function(e) {
            name_split.forEach(function(i) {
                if(symbols.indexOf(i[0]) != -1){
                    size_block = i;
                    throw BreakException; // breaks loop once size range is found
                }
            });
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }

    size_min_max = size_block.replace('(','').replace(')','').split("-");
    start_idx = sizes.indexOf(size_min_max[0]);
    end_idx = sizes.indexOf(size_min_max[1]);

    sizes.forEach(function(e, i) {
        if(i >= start_idx && i <= end_idx){
            extracted_sizes.push(e);
        }
    });

    extracted_sizes.forEach(function(e) {
        $('.style-sizes').append('<tr><td>'+e+'</td><td>'+price_item.PriceItem+'</td><td>'+price_item.MSRP+'</td></tr>');
    });

}

function showPriceItemInformation(price_items){
    $('.style-info-pi')
    price_items.forEach(function(e) {
        $('.item-pi').append(JSON.stringify(e, undefined, 2));
    });
}

function showQstrikePriceItemInformation(qstrike_price_items, item_pi, brand){
    var price_item_name = item_pi;
    var x = _.filter(qstrike_price_items, function (price_item) {
        if(price_item.Dealer === brand){
            return price_item.PriceItemName == price_item_name;
        }
    });
    x.forEach(function(e) {
        $('.qstrike-item-pi').append(JSON.stringify(e, undefined, 2));
    });
}

function showQstrikeStyleInformation(qstrike_style_information){
    if(qstrike_style_information.length > 0){
        $('.qstrike-item-json').text(JSON.stringify(qstrike_style_information[0], undefined, 2));
    }
}

function showStyleInformation(style_information){
    var style = style_information['material'];
    var img_err = '';

    if(style.thumbnail_path === ""){
        img_err = 'No thumbnail Found';
    }

    var elem = `<table class="table">
                    <tbody>
                        <tr>
                            <td class="td-label">Name: </td>
                            <td>`+style.name+`</td>
                        </tr>
                        <tr>
                            <td class="td-label">Block Pattern: </td>
                            <td>`+style.block_pattern+`</td>
                        </tr>
                        <tr>
                            <td class="td-label">Block Pattern Option: </td>
                            <td>`+style.neck_option+`</td>
                        </tr>
                        <tr>
                            <td class="td-label">Gender: </td>
                            <td>`+style.gender+`</td>
                        </tr>
                        <tr>
                            <td class="td-label">Uniform Category: </td>
                            <td>`+style.uniform_category+`</td>
                        </tr>
                        <tr>
                            <td class="td-label">QStrike Item ID: </td>
                            <td>`+style.item_id+`</td>
                        </tr>
                        <tr>
                            <td class="td-label">Brand: </td>
                            <td>`+style.brand+`</td>
                        </tr>
                        <tr>
                            <td colspan="2"><img src="`+style.thumbnail_path+`">`+img_err+`</td>
                        </tr>
                    <tbody>
                </table>`;

    $('.style-information-row').append(elem);

}

function getPriceItemInformation(price_item){
    var info = null;
    var url = price_item_url+price_item;
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            info = data;
        }
    });
    return info;
}

function getQstrikePriceItemInformation(){
    var info = null;
    var url = qstrike_priceitem_url;
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            info = data;
        }
    });
    return info;
}

function getQstrikeItemInformation(item_id){
    var style_data = null;
    var url = qstrike_style_url+item_id;
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            style_data = data;
        }
    });
    return style_data;
}

function getStyleInformation(style_id){
    var style_data = null;
    $.ajax({
        url: style_url+style_id,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            style_data = data;
        }
    });
    return style_data;
}


});