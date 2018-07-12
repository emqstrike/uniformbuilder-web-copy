@extends('administration.lte-main')

@section('styles')

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Price Item</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/price_item" enctype="multipart/form-data" id='create-price-item-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="price_item_name" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item ID</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="price_item_id" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control factory" name="factory" maxlength="3" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Dealer</label>
                            <div class="col-md-6">
                                <select class="form-control" name="dealer_id" required>
                                    <option value="6">Pro Look Sports</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select name="sport" class="form-control sport" required>
                                    @foreach($sports as $sport)
                                        <option value="{{ $sport->name }}">{{ $sport->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">MSRP</label>
                            <div class="col-md-6">
                                <input type="number" step="any" class="form-control" name="msrp" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Web Price Sale</label>
                            <div class="col-md-6">
                                <input type="number" step="any" class="form-control" name="web_price_sale" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-price-item">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Price Item
                                </button>
                                <a href="/administration/price_items" class="btn btn-danger">
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
$(document).ready(function() {

    $('.factory').keyup(function(){
        $(this).val($(this).val().toUpperCase());
    });



});
</script>
@endsection
