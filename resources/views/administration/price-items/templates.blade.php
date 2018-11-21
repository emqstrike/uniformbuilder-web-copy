@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
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
                    <table data-toggle='table' class='data-table table-bordered price-templates' id='price-templates'>
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
                                     <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-template btn btn-xs btn-danger" data-template-id="{{ $template->id }}" role="button">
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
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration-lte-2/sizes.js"></script>
<script>
$(document).ready(function(){

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "pageLength" : 20,
    });


    $('#price-templates').on('click', '.delete-template', function(e){
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
                        });
                }
            }
        });
    });

    var size_properties = {};

    getPriceItems(function(price_items){ window.price_items = price_items; });
    function getPriceItems(callback){
        var price_items;
        var url = "//" + api_host + "/api/price_items";
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
        var url = "//" + api_host + "/api/price_item_templates";
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

    var templates_raw = window.price_item_templates;

    try{
        templates_raw.forEach(function(entry) {
            var props = JSON.parse(entry['properties']);

            if( props['properties']['adult'].length > 0 ){
                props['properties']['adult'].forEach(function(i) {
                    var match = _.find(window.price_items, function(obj) { return obj.price_item == i.price_item });
                    i.msrp = match.msrp;
                    i.web_price_sale = match.web_price_sale;

                });

                var y = _.min(props['properties']['adult'], function(o){return o.msrp;});

                console.log(y);
                props['adult_min_msrp'] = z.msrp;
                var z = _.min(props['properties']['youth'], function(o){return o.web_price_sale;});
                props['youth_min_web_price_sale'] = z.youth_min_web_price_sale;

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
