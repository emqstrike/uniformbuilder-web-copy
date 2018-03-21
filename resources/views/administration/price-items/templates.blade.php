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
                        <span class="fa fa-cube"></span>
                        Price Item Templates
                        <small>
                            <a href="/administration/price_item_template/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add Template
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered fonts'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($price_item_templates as $template)

                        <tr class='template-{{ $template->id }}'>
                            <td>
                                {{ $template->id }}
                            </td>
                            <td>
                                {{ $template->name }}
                            </td>
                            <td>
                                {{ $template->description }}
                            </td>
                            <td>
                                <input type="hidden" class="properties" value="{{ json_encode($template->properties) }}">
                            </td>
                            <td>
                                <a href="/administration/price_item_template/edit/{{ $template->id }}"" class="btn btn-xs btn-primary">
                                    Edit
                                </a>
                                <a href="#" class="delete-template btn btn-xs btn-danger pull-right" data-template-id="{{ $template->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>        

                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Price Item
                            </td>
                        </tr>

                    @endforelse

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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script>
$(document).ready(function(){

    $('.delete-template').on('click', function(e){
        e.preventDefault();
       var id = [];
       id.push( $(this).data('template-id'));
       console.log(id);
       modalConfirm('Remove Price Template', 'Are you sure you want to delete the price template?', id);
       });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/price_item_template/delete";
       
        $.ajax({
           url: url,
           type: "POST",
           data: JSON.stringify({id: id}),
           dataType: "json",
           crossDomain: true,
           contentType: 'application/json',
           headers: {"accessToken": atob(headerValue)},
           success: function(response){
               if (response.success) {
                   new PNotify({
                       title: 'Success',
                       text: response.message,
                       type: 'success',
                       hide: true
                   });
                   $('#confirmation-modal').modal('hide');
                  $.each(id, function (index, value) {
                     console.log(value);
                     $('.template-' + value).fadeOut();
                     // Will stop running after "three"
                     
                   });              

               }
           }
       });
    });

    var sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL','YS','YM','YL','YXL','Y2XL','Y3XL'];
    var adult_sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
    var youth_sizes = ['YS','YM','YL','YXL','Y2XL','Y3XL'];
    var size_properties = {};

    getPriceItems(function(price_items){ window.price_items = price_items; });
    function getPriceItems(callback){
        var price_items;
<<<<<<< Updated upstream
        var url = "//api.prolook.com/api/price_items";
=======
<<<<<<< HEAD
        var url = "//" + api_host + "/api/price_items";
=======
        var url = "//api.prolook.com/api/price_items";
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
                price_items = data['price_items'];
                if(typeof callback === "function") callback(price_items);
            }
        });
    }

    getPriceItemTemplates(function(price_item_templates){ window.price_item_templates = price_item_templates; });
    function getPriceItemTemplates(callback){
        var price_item_templates;
<<<<<<< Updated upstream
        var url = "//api.prolook.com/api/price_item_templates";
=======
<<<<<<< HEAD
        var url = "//" + api_host + "/api/price_item_templates";
=======
        var url = "//api.prolook.com/api/price_item_templates";
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
                price_item_templates = data['price_item_templates'];
                if(typeof callback === "function") callback(price_item_templates);
            }
        });
    }

    // console.log(window.price_items);
    // console.log(window.price_item_templates);
    var templates_raw = window.price_item_templates;
    // console.log(templates_raw);
    // var templates = JSON.parse(templates_raw.slice(1, -1));
    // console.log(templates_raw);
    // console.log(window.price_item_templates);
    // var pi = [{"price_item":"FBGJ","msrp":999,"web_price_sale":777}];
    try{
        templates_raw.forEach(function(entry) {
            // var props = JSON.parse(entry['properties'].slice(1,-1));
            // console.log(JSON.parse(entry['properties']));
            var props = JSON.parse(entry['properties']);

            if( props['properties']['adult'].length > 0 ){
                props['properties']['adult'].forEach(function(i) {
                    // console.log('BEFORE>' + i.msrp);
                    var match = _.find(window.price_items, function(obj) { return obj.price_item == i.price_item });
                    i.msrp = match.msrp;
                    i.web_price_sale = match.web_price_sale;
                    // console.log('AFTER>' + i.msrp);
                });
                // properties.adult = adult;
                // var adult_min_msrp = _.min(adult, function(o){return o.msrp;});
                var y = _.min(props['properties']['adult'], function(o){return o.msrp;});
                // size_properties.adult_min_msrp = adult_min_msrp.msrp;
                console.log(y);
                props['adult_min_msrp'] = z.msrp;
                var z = _.min(props['properties']['youth'], function(o){return o.web_price_sale;});
                props['youth_min_web_price_sale'] = z.youth_min_web_price_sale;

                // var adult_min_web_price_sale = _.min(adult, function(o){return o.web_price_sale;});
                // size_properties.adult_min_web_price_sale = adult_min_web_price_sale.web_price_sale;

            }
            entry['properties'] = JSON.stringify(props);
        });
    } catch(err){
        console.log(err.message);
    }

    console.log(templates_raw);

});
</script>
@endsection