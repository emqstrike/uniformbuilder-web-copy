@extends('administration-lte-2.lte-main')

@section('styles')
@endsection

@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Price Item Templates')
                    <h1>
                        <span class="fa fa-dollar"></span>
                        Price Item Templates
                        <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table-bordered price-templates display' id='price-templates'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category ID</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($price_item_templates as $template)

                        <tr class='template-{{ $template->id }}'>
                            <td class="td-template-id col-md-1">{{ $template->id }}</td>
                            <td class="td-template-name col-md-4">{{ $template->name }}</td>
                            <td class="td-template-sport-category-id col-md-1">{{ $template->sport_category_id }}</td>
                            <td class="td-template-description col-md-4">{{ $template->description }}</td>
                            <td class="col-md-1">
                                <input type="hidden" name="size_props" class="template-size-props" value="{{ $template->properties }}">
                                <center>
                                    <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                    <a href="#" class="btn btn-danger btn-sm btn-flat delete-template" data-template-id="{{ $template->id }}" role="button">Delete</a>
                                </center>
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
@include('administration-lte-2.price-items.price-templates-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script type="text/javascript" src="/js/administration-lte-2/sizes.js"></script>

<script>
$(document).ready(function(){

    window.modal_action = null;
    window.template_props = null;
    window.categories = null;

    getUniformCategoies(function(categories){
        window.categories = categories;
    });

    loadUniformCategories();

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "pageLength" : 15,
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-price-name').val('');
        $('.input-description').val('');
        $('#size_property').val('');
        $('.sport').val(0);
        loadDefault();
        $('.submit-new-record').removeAttr('disabled');
    });

    function loadDefault() {
        $('.property-body').empty();
        var x = `<tr class="prop-row">
                    <td>
                        <select class="form-control sizes">
                        </select>
                    </td>
                    <td>
                        <select class="form-control price-items">
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control item-id">
                    </td>
                </tr>`;
        $('.property-body').append(x);
        deleteButton();
        initSizesAndPI();
    }

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Price Template Information');
        $('.submit-new-record').text('Add Record');
        loadDefault();
        selectChange();
        refreshProperty();
    });

    $(document).on('click', '.edit-record', function(e) {
        e.preventDefault();
        window.modal_action = 'update';
        $('.modal-title').text('Edit Price Template Information');
        $('.submit-new-record').text('Update Record');
        var data = {};
        data.id = $(this).parent().parent().parent().find('.td-template-id').html();
        data.name = $(this).parent().parent().parent().find('.td-template-name').html();
        data.sport_category_id = $(this).parent().parent().parent().find('.td-template-sport-category-id').html();
        data.description = $(this).parent().parent().parent().find('.td-template-description').html();
        var props = $(this).parent().parent().parent().find('.template-size-props').val();
        window.template_props = JSON.parse(props);
        data.props = props;
        $('.input-price-id').val(data.id);
        $('.input-price-name').val(data.name);
        $('.sport').val(data.sport_category_id);
        $('.input-description').val(data.description);
        $('#size_property').val(data.props);
        $('.property-body').empty();
        loadAdultYouth();
        deleteButton();
        selectChange();

    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.description = $('.input-description').val();
        data.name = $('.input-price-name').val();
        data.sport_category_id = $('.sport').find(":selected").val();
        var props = $('#size_property').val();
        data.properties = JSON.parse(props);
        if(window.modal_action == 'add'){
            var url = "//" + api_host +"/api/price_item_template";
        } else if(window.modal_action == 'update')  {
            data.id = $('.input-price-id').val();
            var url = "//" + api_host +"/api/price_item_template/update";
        }
        addUpdateRecord(data, url);
        $('.submit-new-record').attr('disabled', 'true');

    });

    function addUpdateRecord(data, url){
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json;',
            headers: {"accessToken": atob(headerValue)},
            success: function (data) {
                if(data.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Success',
                        text: data.message,
                        type: 'success',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: data.message,
                        type: 'error',
                        hide: true
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    };

    $( "tbody.property-body" ).sortable({
            stop: function( ) {
                refreshProperty();
            }
    });

    $( "tbody" ).disableSelection();

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
            success: function (data) {
            if(data.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Warning',
                        text: data.message,
                        type: 'warning',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: data.message,
                        type: 'error',
                        hide: true
                    });
                }
            },
                error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });

    var size_properties = {};
    var ctr = 0;
    $('.autosized').autosize({append: "\n"});


    getPriceItems(function(price_items){ window.price_items = price_items; });

    initSizesAndPI();
    selectChange();

    var defaultElem = $( ".prop-row" ).clone();

    function loadAdultYouth(){
        _.each(window.template_props.properties.adult, function(i){
            var size = i.size;
            var price_item = i.price_item;
            var item_id = i.item_id;
            var x = `<tr class="prop-row prop-`+ctr+`">
                        <td>
                            <select class="form-control sizes-` + ctr + ` sizes"></select>
                        </td>
                        <td>
                            <select class="form-control  price-item-` + ctr + ` price-items"></select>
                        </td>
                        <td>
                            <input type="text" class="form-control item-id-`+ctr+` item-id" value=`+ item_id +`>
                        </td>
                    </tr>`;
            $('.property-body').append(x);

            if(ctr != 0) {
                var y = `<td>
                            <a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a>
                        </td>`;
                $('.prop-'+ctr+'').append(y);
            }
               console.log(x);
            var e = '.sizes-'+ctr;
            var f = '.price-item-'+ctr;

            selectedValues(e, f, size, price_item);
            ctr++;
        });

        _.each(window.template_props.properties.youth, function(i){
            var size = i.size;
            var price_item = i.price_item;
            var item_id = i.item_id;
            var x = `<tr class="prop-row prop-`+ctr+`">
                        <td>
                            <select class="form-control sizes-` + ctr + ` sizes"></select>
                        </td>
                        <td>
                            <select class="form-control  price-item-` + ctr + ` price-items"></select>
                        </td>
                        <td>
                            <input type="text" class="form-control item-id-`+ctr+` item-id">
                        </td>
                     </tr>`;
            $('.property-body').append(x);
            if(ctr != 0) {
                var y = `<td>
                             <a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a>
                         </td>`;
                $('.prop-'+ctr+'').append(y);
            }
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
            var elem = '<option value="' + j + '">' + j + '</option>';
            if(price_item == j){
                elem = '<option value="' + j + '" selected>' + j + '</option>';
            }
            $(f).append(elem);
        });
        deleteButton();
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
        $(".item-id").on("change", function() {
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
            var elem = '<option value="' + pi + '">' + pi + '</option>';
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
            var item_id = $(this).find('.item-id').val();
            var prices = _.find(window.price_items, function(e){ return e.price_item == price_item; });

            var data = {
                "size" : $(this).find('.sizes').val(),
                "price_item" : price_item,
                "item_id" : item_id,
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

    function loadUniformCategories() {
        var category_elem = "";
        _.each(window.categories, function(category) {
            category_elem += `<option value=` + category.id + `>` + category.name + `</option>`;
        });
        $('.sport').append(category_elem);
    }

    function getUniformCategoies(callback){
        var categories;
        var url = "//" +api_host+ "/api/categories";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                categories = data['categories'];
                if(typeof callback === "function") callback(categories);
            }
        });
    }

});
</script>
@endsection
