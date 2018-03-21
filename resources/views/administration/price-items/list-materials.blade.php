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
                        Uniforms List View
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered table-striped table-hover'>
                    <thead>
                        <tr>
                            <th><small>Price Item</small></th>
                            <th><small>Item ID</small></th>
                            <th><small>Material ID</small></th>
                            <th><small>Style Name</small></th>
                            <th><small>Adult Sizes</small></th>
                            <th><small>Youth Sizes</small></th>
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
<<<<<<< Updated upstream
    var url = "//api.prolook.com/api/materials";
    // var url = "localhost:8888/api/materials";
=======
<<<<<<< HEAD
    var url = "//" + api_host + "/api/materials";
=======
    var url = "//api.prolook.com/api/materials";
    // var url = "localhost:8888/api/materials";
>>>>>>> c88c648330b46adcd3f1fdad8611414f33cadafe
>>>>>>> Stashed changes
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
    var pricing = item.pricing;
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
        material_name: name,
        pricing: pricing
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

        if(item.id == 910){
            console.log(item);
        }

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

        var pricing = JSON.parse(item.pricing);
        // console.log(pricing);
        try{
            var elem_adult = '<table class="table table-bordered"><thead><tr>';
            $.each(pricing.properties.adult, function(index, e){
                elem_adult += '<td>'+e.size+'</td>';
            });
            elem_adult += '</tr><tbody><tr>';
            $.each(pricing.properties.adult, function(index, e){
                elem_adult += '<td>'+e.price_item+'</td>';
            });
            elem_adult += '</tr></tbody></table>';
        } catch(err){
            // console.log(err.log);
        }

        try{
            var elem_youth = '<table class="table table-bordered"><thead><tr>';
            $.each(pricing.properties.youth, function(index, e){
                elem_youth += '<td>'+e.size+'</td>';
            });
            elem_youth += '</tr><tbody><tr>';
            $.each(pricing.properties.youth, function(index, e){
                elem_youth += '<td>'+e.price_item+'</td>';
            });
            elem_youth += '</tr></tbody></table>';
        } catch(err){
            // console.log(err.log);
        }
// console.log(elem_adult);
        var elem = '<tr>';
        elem += '<td class="alert alert-' + pi_alert + '"><small>' + p_item.price_item + '</td>';
        elem += '<td class="alert alert-' + iid_alert + '"><small>' + item.item_id + '</td>';
        elem += '<td><small>' + item.material_id + '</td>';
        elem += '<td><small>' + item.material_name + '</td>';
        // elem += '<td class="alert alert-' + msrp_alert + '"><small>' + p_item.msrp + '</td>';
        elem += '<td class="alert alert-' + msrp_alert + '">' + elem_adult + '</td>';
        // elem += '<td class="alert alert-' + wps_alert + '"><small>' + p_item.web_price_sale + '</td>';
        elem += '<td class="alert alert-' + msrp_alert + '">' + elem_youth + '</td>';
        elem +='</tr>';
        $('#contents').append(elem);
    });
});


});
</script>
@endsection