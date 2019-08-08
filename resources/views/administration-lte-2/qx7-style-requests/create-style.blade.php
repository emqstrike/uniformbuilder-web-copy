@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-info">
                    @section('page-title', 'Create Style')
                    <div class="panel-heading">Create Style</div>

                    <div class="panel-body">
                        @include('administration.partials.validation-error')

                        <form class="form-horizontal" role="form" method="POST" action="" enctype="multipart/form-data" id='create-style-form'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Style Name</label>
                                <div class="col-md-6">
                                    <input type="hidden" class="form-control style-id" value="{{ $id }}">
                                    <input type="hidden" class="form-control style-rule-id">
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
                                    <input type="text" class="form-control style-sport" name="sport">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Application Type</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-application-type" name="application_type">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Style Category</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-category" name="style_category">
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
                                    <input type="text" class="form-control style-factory" name="factory">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Inch in Pixels</label>
                                <div class="col-md-6">
                                    <input type="number" class="form-control style-inch-in-px" step="any" name="inch_in_px">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Design Type</label>
                                <div class="col-md-6">
                                    <select class="form-control style-design-type" name="design_type" id="design-type">
                                        <option value="style_sheet">Style Sheet</option>
                                        <option value="block_pattern">Block Pattern</option>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control style-thumbnail-file" name="thumbnail_path" accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File Back</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control style-thumbnail-file-back" name="thumbnail_path_back" accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File Left</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control style-thumbnail-file-left" name="thumbnail_path_left" accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File Right</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control style-thumbnail-file-right" name="thumbnail_path_right" accept="image/*">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Customizer Available</label>
                                <div class="col-md-2">
                                    <select name="customizer_available" class="form-control style-customizer-available">
                                        <option value="1">Yes</option>
                                        <option value="0" selected>No</option>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary btn-flat create-style">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Create Record
                                    </button>
                                    <a href="{{ route('v1_qx7_style_requests') }}" class="btn btn-danger btn-flat">
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

    window.style_id = null;
    window.style_request = null;
    var id = $('.style-id').val();

    getQx7StyleRequest(id, function (style_request) {
        window.style_request = style_request;
    });


    var style_request = window.style_request[0];
    $('.style-id').val(style_request.id);
    $('.style-name').val(style_request.style_name);
    $('.style-brand').val(style_request.brand.brand);
    $('.style-gender').val(style_request.gender.gender);
    $('.style-sport').val(style_request.sport.sport_name);
    $('.style-application-type').val(style_request.application_type.application_type);
    $('.style-category').val(style_request.style_category.style_category);
    $('.style-item-id').val(style_request.quickstrike_item_id);
    $('.style-factory').val(style_request.factory.factory_code);
    $('.style-rule-id').val(style_request.rule_id);

    $(document).on('click', '.create-style', function (e) {
        e.preventDefault();
        var data = {};
        data.name = $('.style-name').val();
        data.brand = $('.style-brand').val();
        data.gender = $('.style-gender').val();
        data.sport = $('.style-sport').val();
        data.application_type = $('.style-application-type').val();
        data.style_category = $('.style-category').val();
        data.factory = $('.style-factory').val();
        data.item_id = $('.style-item-id').val();
        data.rule_id = $('.style-rule-id').val();
        data.inch_in_px = $('.style-inch-in-px').val();
        data.design_type = $('.style-design-type').val();
        data.customizer_available = $('.style-customizer-available').val();

        var formData = new FormData();
        var thumbnail_file = null;
        var thumbnail_file_back = null;
        var thumbnail_file_left = null;
        var thumbnail_file_right = null;

        try {
            var thumbnail_path = $('.style-thumbnail-file')[0].files[0];
            if(thumbnail_path != undefined) {
                formData.append('file', thumbnail_path);
                fileUpload(formData, function (filename) { thumbnail_file = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        try {
            var thumbnail_path_back = $('.style-thumbnail-file-back')[0].files[0];
            if(thumbnail_path_back != undefined) {
                formData.append('file', thumbnail_path_back);
                fileUpload(formData, function (filename) { thumbnail_file_back = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        try {
            var thumbnail_path_left = $('.style-thumbnail-file-left')[0].files[0];
            if(thumbnail_path_left != undefined) {
                formData.append('file', thumbnail_path_left);
                fileUpload(formData, function (filename) { thumbnail_file_left = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        try {
            var thumbnail_path_right = $('.style-thumbnail-file-right')[0].files[0];
            if(thumbnail_path_right != undefined) {
                formData.append('file', thumbnail_path_right);
                fileUpload(formData, function (filename) { thumbnail_file_right = filename });
            }
        } catch(err) {
            console.log(err.message);
        }

        if(thumbnail_file != null) {
            data.thumbnail_path = thumbnail_file;
        }
        if(thumbnail_file_back != null) {
            data.thumbnail_path_back = thumbnail_file_back;
        }
        if(thumbnail_file_left != null) {
            data.thumbnail_path_left = thumbnail_file_left;
        }
        if(thumbnail_file_right != null) {
            data.thumbnail_path_right = thumbnail_file_right;
        }

        addRecord(data);
    });

    function addRecord(data) {
        var style_id;
        var url = "//" + api_host +"/api/v1-0/qx7_style/create";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json;',
            headers: {"accessToken": atob(headerValue)},
            success: function (data) {
                if(data.success) {
                    window.style_id = data.style_id;
                    updateStyleId(window.style_id);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    }

    function updateStyleId(style_id) {
        var style_request_id = $('.style-id').val();
        var data = {};
        data.id = style_request_id;
        data.style_id = style_id;
        var url = "//" + qx7_host +"/api/style_request/update";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json;',
            success: function (data) {
                if(data.success) {
                window.location.replace("/administration/v1-0/qx7_style_requests");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    }

    function getQx7StyleRequest(id, callback) {
            var style_request;
            var url = "//" + qx7_host + "/api/style_request/"+ id + "/formatted_data";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data) {
                    style_request = data['style_request'];
                    if(typeof callback === "function") callback(style_request);
                }
            });
    }

    function fileUpload(postData, callback){
        var file;
        $.ajax({
            url: "//" + api_host + "/api/v1-0/file/uploader",
            type: "POST",
            data: postData,
            processData: false,
            contentType: false,
            crossDomain: true,
            async: false,
            headers: {"accessToken": atob(headerValue)},
            success: function (data) {
                if(data.success){
                    file = data.file;
                    if(typeof callback === "function") callback(file);

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    };

});
</script>
@endsection
