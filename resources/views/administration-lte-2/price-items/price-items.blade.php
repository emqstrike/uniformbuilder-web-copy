@extends('administration-lte-2.lte-main')

@section('styles')
@endsection

@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Price Items')
                    <h1>
                        <span class="fa fa-money"></span>
                        Price Items
                            <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal">Add</a>
                            <a href="/administration/v1-0/price_items/manual_update" class='btn btn-sm btn-primary btn-flat pull-right'>
                                Manual Update
                            </a>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-hover price-item-table display'>
                    <thead>
                        <tr>
                            <th>Price Item</th>
                            <th>Dealer</th>
                            <th>MSRP</th>
                            <th>Web Price Sale</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($price_items as $price_item)

                        <tr class='price_item-{{ $price_item->id }}'>
                            <td>
                                {{ $price_item->price_item }}
                            </td>
                            <td>
                                @if($price_item->dealer_id == 6)
                                Pro Look Sports
                                @elseif($price_item->dealer_id == 7)
                                Riddell
                                @elseif($price_item->dealer_id == 37)
                                Richardson
                                @endif
                            </td>
                            <td>
                                <input type="number" value="{{ $price_item->msrp }}" class="row-msrp" id="row-msrp" disabled>
                            </td>
                            <td>
                                <input type="number" value="{{ $price_item->web_price_sale }}" class="row-web-price-sale" id="row-web-price-sale" disabled>
                            </td>
                            <td>
                                <a href="#" class="edit-price-item btn btn-primary btn-xs btn-flat" data-id="{{ $price_item->id }}">Edit</a>
                                <a href="#" class="save-price-item btn btn-default btn-xs btn-flat" data-id="{{ $price_item->id }}">Save</a>
                            </td>
                            <td>
                                <a href="#" class="delete-price-item btn btn-danger btn-xs btn-flat" data-price-item-id="{{ $price_item->id }}">Remove</a>
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
@include('administration-lte-2.price-items.price-items-modal')
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script>
$(document).ready(function(){

    window.modal_action = null;
    window.uniform_categories = null;
    getUniformCategories(function(categories){ window.uniform_categories = categories; });

    var elem ='';
    _.each(window.uniform_categories, function(sport) {
        elem += '<option value="'+sport.id+'">'+sport.name+'</option>';
    });
    $('.input-uniform-category').append(elem);

    $('.add-record').on('click', function(e) {
        e.preventDefault();
        window.modal_action = 'add';
        $('.modal-title').text('Add Price Item Information');
        $('.input-web-price-sale').val(0);
        $('.submit-new-record').text('Add Record');
    });

    $("#myForm").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.price_item = $('.input-price-name').val();
        data.factory_price_item_id = $('.input-price-item-id').val();
        data.factory_id = $('.input-factory').val();
        data.dealer_id = $('.input-dealer').val();
        data.uniform_category_id = $('.input-uniform-category').val();
        data.msrp = $('.input-msrp').val();
        data.web_price_sale = $('.input-web-price-sale').val();

        if(window.modal_action == 'add') {
            var url = "//" + api_host + "/api/price_item";
        } else if(window.modal_action == 'update') {
            data.id = $('.input-price-id').val();
            var url = "//" + api_host + "/api/price_item/update";
        }

        if (data.msrp < data.web_price_sale || data.msrp < 10) {
            new PNotify({
                title: 'Warning',
                text: 'MSRP cannot be lower than $10 and Web Price Sale.',
                type: 'warning',
                hide: true
            });
        } else {
            addUpdateRecord(data, url);
            $('.submit-new-record').attr('disabled', 'true');
        }
    });

    $("#myModal").on("hidden.bs.modal", function() {
        $('.input-price-name').val('');
        $('.input-price-item-id').val('');
        $('.input-factory').val('');
        $('.input-input-dealer').val('');
        $('.input-uniform-category').val('');
        $('.input-msrp').val('');
        $('.input-web-price-sale').val(0);
        $('.submit-new-record').removeAttr('disabled');
    });

    $(".save-price-item").each(function(i) {
        $(this).attr('disabled','true');
    });

    $(document).on('click', '.edit-price-item', function(e) {
        e.preventDefault();
        $(this).parent().siblings('td').find('.row-msrp').prop('disabled', false);
        $(this).parent().siblings('td').find('.row-web-price-sale').prop('disabled', false);
    });

    $(document).on('change', '.row-msrp', function() {
        var save_button = $(this).parent().siblings('td').find('.save-price-item');
        save_button.removeAttr('disabled');
        var msrp = $(this).val();
        var minimum_price = 10;
        var web_price_sale = $(this).parent().parent().find('.row-web-price-sale').val();
        if( +msrp < +web_price_sale ){
            $(this).val(web_price_sale);
            alert("MSRP cannot be lower than Web Sale Price!");
        }
        if( +msrp < +minimum_price ){
            $(this).val(minimum_price);
            alert("MSRP cannot be lower than $10");
        }
    });

    $(document).on('change', '.row-web-price-sale', function() {
        var save_button = $(this).parent().siblings('td').find('.save-price-item');
        save_button.removeAttr('disabled');
        var msrp = $(this).parent().parent().find('.row-msrp').val();
        var web_price_sale = $(this).val();
        if( +web_price_sale > +msrp ){
            $(this).val(msrp);
            alert("Web Sale Price cannot be higher than MSRP!");
        }
    });

    $(document).on('click', '.save-price-item', function() {
        var msrp = $(this).parent().siblings('td').find('.row-msrp').val();
        var web_price_sale = $(this).parent().siblings('td').find('.row-web-price-sale').val();
        var id = $(this).data('id');

        if(!$(this).attr('disabled')) {
            printData(msrp, web_price_sale, id);
        }
    });

    function printData(msrp, web_price_sale, id){
        console.log('MSRP:' + msrp);
        console.log('Web Price Sale:' + web_price_sale);
        console.log('ID:' + id);
        var data = {
            "id" : id,
            "msrp" : msrp,
            "web_price_sale" : web_price_sale
        };
        updatePriceItem(data);
    }

    function updatePriceItem(data){
        var url = "//"+api_host+"/api/price_item/update";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            headers: {"accessToken": atob(headerValue)},
            contentType: 'application/json;',
            success: function (data) {
                alert('Successfully updated!');
                document.location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    }
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "pageLength": 20,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });

    $(document).on('click', '.delete-price-item', function() {
       var id = [];
       id.push( $(this).data('price-item-id'));
       console.log(id);
       modalConfirm('Remove Price Item', 'Are you sure you want to delete this price item?', id);
    });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/price_item/delete/";
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
                     $('.price_item-' + value).fadeOut();
                     // Will stop running after "three"
                   });

               }
           }
       });
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

    function getUniformCategories(callback){
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
