@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Price Item Template</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/price_item_template" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="size_props" id="size_property">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea name="description" class="form-control autosized" required></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Properties</label>
                            <div class="col-md-6">
                                <a href="#" class="btn btn-success btn-xs add-property">Add Property</a>
                            </div>
                            <div class="col-md-6">
                                <table class="table table-bordered table-striped">
                                    <tr>
                                        <thead>
                                            <th>Size</th>
                                            <th>Price Item</th>
                                            <th>Action</th>
                                        </thead>
                                    </tr>
                                    <tbody class="property-body">
                                        <tr class="prop-row">
                                            <td>
                                                <select class="form-control sizes">
                                                </select>
                                            </td>
                                            <td>
                                                <select class="form-control price-items">
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Template
                                </button>
                                <a href="/administration/price_item_templates" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script type="text/javascript" src="/js/administration-lte-2/sizes.js"></script>
@endsection

@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){

var size_properties = {};

$('.autosized').autosize({append: "\n"});

    $( "tbody.property-body" ).sortable({
        stop: function( ) {
            refreshProperty();
        }
    });
    $( "tbody" ).disableSelection();


getPriceItems(function(price_items){ window.price_items = price_items; });

initSizesAndPI();
selectChange();

var defaultElem = $( ".prop-row" ).clone();

function getPriceItems(callback){
    var price_items;
    var url = "//" +api_host+ "/api/price_items";
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

$('.add-property').on('click', function(e){
    e.preventDefault();
    var x  = $( ".prop-row:first" ).clone();
    y = "<td><a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a></td>";

    $('.property-body').append(x);
    $(x).append(y);
    deleteButton();
    selectChange();
    refreshProperty();
});

function selectChange(){
    $( "select" ).change(function() {
        refreshProperty();
    });
}

function deleteButton(){
    $('.remove-prop').on('click', function(e){
        e.preventDefault();
        $(this).parent().parent().remove();
        refreshProperty();
    });
}

function initSizesAndPI(){
    _.each(sizes, function(i){
        var elem = '<option value="' + i + '">' + i + '</option>';
        $('.sizes').append(elem);
    });

    _.each(window.price_items, function(i){
        var pi = i.price_item;
        var pc = i.category_name;
        var elem = '<option value="' + pi + '">' + pi +' - ' + pc + '</option>';
        $('.price-items').append(elem);
    });
}

function refreshProperty(){
    console.log('refreshProperty');
    size_properties = {};
    var properties = {};
    var adult = [];
    var youth = [];

    $(".prop-row").each(function(i) {
        var x = $(this).find('.sizes').val();
        var price_item = $(this).find('.price-items').val();
        var prices = _.find(window.price_items, function(e){ return e.price_item == price_item; });

        var data = {
            "size" : $(this).find('.sizes').val(),
            "price_item" : price_item,
            "msrp" : parseFloat(prices.msrp).toFixed(2),
            "web_price_sale" : parseFloat(prices.web_price_sale).toFixed(2)
        }

        if( _.contains(adult_sizes, data.size) ){
            adult.push(data);
        }

        if( _.contains(youth_sizes, data.size) ){
            youth.push(data);
        }
    });

    if( adult.length > 0 ){
        properties.adult = adult;
        var adult_min_msrp = _.min(adult, function(o){return o.msrp;});
        size_properties.adult_min_msrp = adult_min_msrp.msrp;
        var adult_min_web_price_sale = _.min(adult, function(o){return o.web_price_sale;});
        size_properties.adult_min_web_price_sale = adult_min_web_price_sale.web_price_sale;

    }

    if( youth.length > 0 ){
        properties.youth = youth;
        var youth_min_msrp = _.min(youth, function(o){return o.msrp;});
        size_properties.youth_min_msrp = youth_min_msrp.msrp;
        var youth_min_web_price_sale = _.min(youth, function(o){return o.web_price_sale;});
        size_properties.youth_min_web_price_sale = youth_min_web_price_sale.web_price_sale;

    }

    size_properties.properties = properties;
    console.log(JSON.stringify(size_properties));

    $('#size_property').val(JSON.stringify(size_properties));
}


});
</script>
@endsection
