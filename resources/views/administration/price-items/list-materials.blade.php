@extends('administration.lte-main')

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
                        <span class="fa fa-cubes"></span>
                        Materials List View
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Price Item</th>
                            <th>Item ID</th>
                            <th>Material ID</th>
                            <th>Part Name</th>
                            <th>MSRP</th>
                            <th>Web Price Sale</th>
                        </tr>
                    </thead>
                    <tbody id="contents">

                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script>
$(document).ready(function(){



window.materials = null;
getMaterials(function(materials){ window.materials = materials; });



function getMaterials(callback){
    var materials;
    var url = "//api-dev.qstrike.com/api/materials";
    // var url = "localhost:8888/api/materials";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            materials = data['materials'];
            if(typeof callback === "function") callback(materials);
        }
    });
}

// console.log(window.materials);
var group = {};
$.each(window.materials, function(index, item){
    var name = item.name;
    var price_item = item.price_item_code;
    if (typeof group[price_item] !== 'object')  {
        group[price_item] = {
            price_item: price_item,
            msrp: item.msrp,
            web_price_sale: item.web_price_sale,
            materials: [],
        };
    }
    nArr = {
        material_id: item.id,
        item_id: item.item_id,
        material_name: name
    };

    group[price_item].materials.push(nArr);
    // group[price_item].materials[name] = {
    //     material_id: item.id,
    //     item_id: item.item_id,
    //     material_name: name
    // }
});

// console.log( group );

$.each(group, function(index, item){
    console.log(item);
    var p_item = item;
    $.each(item.materials, function(index, item){

        var alert_type = 'warning';
        var safe_price = 50;

        var iid_alert = '';
        if( item.item_id == 0){
            iid_alert = alert_type;
        } else {
            iid_alert = '';
        }

        var pi_alert = '';
        if( p_item.price_item == ""){
            pi_alert = alert_type;
        } else {
            pi_alert = '';
        }

        var msrp_alert = '';
        if( p_item.msrp == null || p_item.msrp < safe_price){
            msrp_alert = alert_type;
        } else {
            msrp_alert = '';
        }

        var wps_alert = '';
        if( p_item.web_price_sale == null || p_item.web_price_sale == 0){
            wps_alert = alert_type;
        } else {
            wps_alert = '';
        }

        var elem = '<tr>';
        elem += '<td class="alert alert-' + pi_alert + '">' + p_item.price_item + '</td>';
        elem += '<td class="alert alert-' + iid_alert + '">' + item.item_id + '</td>';
        elem += '<td>' + item.material_id + '</td>';
        elem += '<td>' + item.material_name + '</td>';
        elem += '<td class="alert alert-' + msrp_alert + '">' + p_item.msrp + '</td>';
        elem += '<td class="alert alert-' + wps_alert + '">' + p_item.web_price_sale + '</td>';
        elem +='</tr>';
        $('#contents').append(elem);
    });
});


});
</script>
@endsection