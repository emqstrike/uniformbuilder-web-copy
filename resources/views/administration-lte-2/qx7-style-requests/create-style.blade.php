@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-info">
                    @section('page-title', 'Create Material')
                    <div class="panel-heading">Create Material</div>

                    <div class="panel-body">
                        @include('administration.partials.validation-error')

                        <form class="form-horizontal" role="form" method="POST" action="" enctype="multipart/form-data" id='create-style'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Sytle Name</label>
                                <div class="col-md-6">
                                    <input type="hidden" class="form-control style-id" value="{{ $id }}">
                                    <input type="text" class="form-control style-name" name="name">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Brand</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-brand" name="brand">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Gender</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-gender" name="gender">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Sport</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-sport" name="uniform_category">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Application Type</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-application-type" name="uniform_application_type">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Style Category</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-category" name="type">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Qstrike Item ID</label>
                                <div class="col-md-6">
                                    <input type="number" class="form-control style-item-id" name="item_id">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Factory</label>
                                <div class="col-md-6">
                                    <input type="number" class="form-control style-factory" name="factory_code">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary create-user">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Add New Style
                                    </button>
                                    <a href="{{ route('v1_qx7_style_requests') }}" class="btn btn-danger">
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
    </section>
@endsection

@section('scripts')

<script type="text/javascript">
$(document).ready(function(){

    window.style_request = null;
    var id = $('.style-id').val();

    getQx7StyleRequest(id, function (style_request) {
        window.style_request = style_request;
    });

    var style_request = window.style_request[0];
    console.log(style_request);
    $('.style-name').val(style_request.style_name);
    $('.style-brand').val(style_request.brand.brand);
    $('.style-gender').val(style_request.gender.gender);
    $('.style-sport').val(style_request.sport.sport_name);
    $('.style-application-type').val(style_request.application_type.application_type);
    $('.style-category').val(style_request.style_category.style_category);
    $('.style-item-id').val(style_request.quickstrike_item_id);
    $('.style-factory').val(style_request.factory.factory_code);

    function getQx7StyleRequest(id, callback){
            var style_request;
            var url = "//" + qx7_host + "/api/style_request/"+ id + "/formatted_data";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    style_request = data['style_request'];
                    if(typeof callback === "function") callback(style_request);
                }
            });
    }

});
</script>
@endsection
