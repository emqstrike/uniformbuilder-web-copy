@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Price Item Template</div>
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

                    <form class="form-horizontal" role="form" action="/administration/price_item_template/update" method="POST" enctype="multipart/form-data" id='edit-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="template_id" value="{{ $template->id }}">
                        <input type="hidden" class="template-prop" value="{{ $template->properties }}">
                        <input type="hidden" name="size_props" id="size_property" value="{{ $template->properties }}">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control template-name" name="name" value="{{ $template->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea name="description" class="form-control autosized">{{ $template->description }}</textarea>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-template">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Template
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
    var template_props = JSON.parse($('.template-prop').val());
    var ctr = 0;

    $('.autosized').autosize({append: "\n"});
    getPriceItems(function(price_items){ window.price_items = price_items; });
    console.log(window.price_items);
    loadAdultYouth();
    selectChange();

    $( "tbody.property-body" ).sortable({
        stop: function( ) {
            refreshProperty();
        }
    });
    $( "tbody" ).disableSelection();

    function loadAdultYouth(){
        _.each(template_props.properties.adult, function(i){
            var size = i.size;
            var price_item = i.price_item;
            var x = '<tr class="prop-row"><td><select class="form-control sizes-' + ctr + ' sizes"></select></td><td><select class="form-control  price-item-' + ctr + ' price-items"></select></td>';
            x += "<td><a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a></td></tr>";
            $('.property-body').append(x);

            var e = '.sizes-'+ctr;
            var f = '.price-item-'+ctr;
            selectedValues(e, f, size, price_item);
            ctr++;
        });

        _.each(template_props.properties.youth, function(i){
            var size = i.size;
            var price_item = i.price_item;
            var x = '<tr class="prop-row"><td><select class="form-control sizes-' + ctr + ' sizes"></select></td><td><select class="form-control  price-item-' + ctr + ' price-items"></select></td>';
            x += "<td><a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a></td></tr>";
            $('.property-body').append(x);

            var e = '.sizes-'+ctr;
            var f = '.price-item-'+ctr;

            selectedValues(e, f, size, price_item);

            ctr++;
        });
    }

    function selectedValues(e, f, size, price_item){
        _.each(sizes, function(i){
            var elem = '<option value="' + i + '">' + i + '</option>';
            if(size == i){
                elem = '<option value="' + i + '" selected>' + i + '</option>';
            }
            $(e).append(elem);
        });

        _.each(window.price_items, function(i){
            var j = i.price_item;
            var pc = i.category_name;
            var elem = '<option value="' + j + '">' + j + '</option>';
            if(price_item == j){
                elem = '<option value="' + j + '" selected>' + j  +' - ' + pc + '</option>';
            }
            $(f).append(elem);
        });
        deleteButton();
    }

    $('.add-property').on('click', function(e){
        e.preventDefault();
        console.log('test');
        var x  = $( ".prop-row:first" ).clone();
        y = "<td><a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a></td>";

        if(x.length >0) {
            $('.property-body').append(x);
            $(x).append(y);
        }
        else {
            loadDefault();
        }
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

    function refreshProperty(){
        console.log('refreshProperty');
        size_properties = {};
        var properties = {};
        var adult = [];
        var youth = [];

        $(".prop-row").each(function(i) {
            var x = $(this).find('.sizes').val();
            var price_item = $(this).find('.price-items').val();
            console.log('price_item'+price_item);
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

    function loadDefault() {
         var x = `<tr class="prop-row">
                    <td>
                        <select class="form-control sizes">
                        </select>
                    </td>
                    <td>
                        <select class="form-control price-items">
                        </select>
                    </td>
                </tr>`;

           $('.property-body').append(x);
           initSizesAndPI();
    }

    function initSizesAndPI(){
    _.each(sizes, function(i){
        var elem = '<option value="' + i + '">' + i + '</option>';
        $('.sizes').append(elem);
    });


    _.each(window.price_items, function(i){
        var pi = i.price_item;
        var elem = '<option value="' + pi + '">' + pi + '</option>';
        $('.price-items').append(elem);
    });
    }

});
</script>
@endsection
