@extends('administration.lte-main')

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h2>
                        Search Order
                    </h2>
                    <center>
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-2">
                                <input type="text" class="form-control search-order" placeholder="2018-ABC">
                            </div>
                            <div class="col-md-1">
                                <a href="#" class="btn btn-default search-button" style="width: 100px;">Search</a><hr>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function(){

$('.search-button').on('click', function(e){
    var search_order = $('.search-order').val();
    console.log(search_order);
    window.open("/administration/order_search/"+search_order);
});

});
</script>
@endsection
