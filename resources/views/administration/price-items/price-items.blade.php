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
                        Price Items
                        <small>
                            <a href="/administration/font/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Price Item
                            </a>
                            <a href="/administration/price_item/materials" class='btn btn-xs btn-primary'>
                                View Uniforms (List)
                            </a>
                            <a href="/administration/price_items/manual_update" class='btn btn-xs btn-primary'>
                                Update Prices
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts'>
                    <thead>
                        <tr>
                            <th>Price Item</th>
                            <th>Dealer</th>
                            <th>MSRP</th>
                            <th>Web Price Sale</th>
                            <th>Save</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($price_items as $price_item)

                        <tr class='price_item-{{ $price_item->id }}'>
                            <td>
                                {{ $price_item->price_item }}
                            </td>
                            <td>
                                Pro Look Sports
                            </td>
                            <td>
                                $ <input type="text" value="{{ $price_item->msrp }}" class="row-msrp" disabled>
                            </td>
                            <td>
                                $ <input type="text" value="{{ $price_item->web_price_sale }}" class="row-web-price-sale" disabled>
                            </td>
                            <td>
                                <a href="#" class="save-price-item btn btn-primary btn-xs" data-id="{{ $price_item->id }}">Edit</a>
                            </td>
                            <td>
                                <a href="#" class="delete-price-item btn btn-danger btn-xs">Remove</a>
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script>
$(document).ready(function(){

    $(".save-price-item").each(function(i) {
        $(this).hide();
    });

    $(document).on('change', '.row-msrp', function() {
        var save_button = $(this).parent().siblings('td').find('.save-price-item');
        save_button.text('Save');
        save_button.removeClass( "btn-primary" );
        save_button.addClass( "btn-warning" );
        save_button.show();

        var msrp = $(this).val();
        var web_price_sale = $(this).parent().siblings('td').find('.row-web-price-sale').val();
        if( msrp < web_price_sale ){
            $(this).val(web_price_sale);
            alert("MSRP cannot be lower than Web Sale Price!");
        }
    });

    $(document).on('change', '.row-web-price-sale', function() {
        var save_button = $(this).parent().siblings('td').find('.save-price-item');
        save_button.text('Save');
        save_button.removeClass( "btn-primary" );
        save_button.addClass( "btn-warning" );
        save_button.show();
        var msrp = $(this).parent().siblings('td').find('.row-msrp').val();
        var web_price_sale = $(this).val();
        if( web_price_sale > msrp ){
            $(this).val(msrp);
            alert("Web Sale Price cannot be higher than MSRP!");
        }
    });

    $(document).on('click', '.save-price-item', function() {
        var msrp = $(this).parent().siblings('td').find('.row-msrp').val();
        var web_price_sale = $(this).parent().siblings('td').find('.row-web-price-sale').val();
        var id = $(this).data('id');

        printData(msrp, web_price_sale, id);
    });

    function printData(msrp, web_price_sale, id){
        // console.log('MSRP:' + msrp);
        // console.log('Web Price Sale:' + web_price_sale);
        // console.log('ID:' + id);
        var data = {
            "id" : id,
            "msrp" : msrp,
            "web_price_sale" : web_price_sale
        };
        updatePriceItem(data);
    }

    function updatePriceItem(data){
        $.ajax({
            url: '//' + api_host + '/api/price_item/update',
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json;',
            success: function (data) {
                alert('Successfully updated!');
                document.location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //Error Code Here
            }
        });
    }

});
</script>
@endsection