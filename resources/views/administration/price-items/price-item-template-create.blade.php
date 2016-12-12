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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/#" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="size_props" class="size-props-input">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <!-- <input type="name" class="form-control color-code" name="color_code" value="{{ old('name') }}"> -->
                                <textarea name="description" class="form-control"></textarea>
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
                                <a href="/administration/colors" class="btn btn-danger">
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
@endsection

@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){

var sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL','YS','YM','YL','YXL','Y2XL','Y3XL'];
var size_properties = [];

getPriceItems(function(price_items){ window.price_items = price_items; });

initSizesAndPI();
selectChange();

var defaultElem = $( ".prop-row" ).clone();

function getPriceItems(callback){
    var price_items;
    var url = "//api-dev.qstrike.com/api/price_items";
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
        var elem = '<option value="' + pi + '">' + pi + '</option>';
        $('.price-items').append(elem);
    });
}

function refreshProperty(){
    size_properties = [];
    $(".prop-row").each(function(i) {
        var x = $(this).find('.sizes').val();
        var data = {
            "size" : $(this).find('.sizes').val(),
            "price_item" : $(this).find('.price-items').val(),
        }
        size_properties.push(data);
    });
    console.log(size_properties);
    $('.size-props-input').val(JSON.stringify(size_properties));
}



});
</script>
@endsection