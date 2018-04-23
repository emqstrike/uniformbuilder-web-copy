@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Uniform Category</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/category/update" enctype="multipart/form-data" id='edit-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="uniform_category_id" value="{{ $category->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control category-name" name="name" value="{{ $category->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Male Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control male-thumbnail-file" name="thumbnail_male" accept="image/*">
                                @if ($category->thumbnail_male)
                                <div class="thumbnail_male">
                                    <img src="{{ $category->thumbnail_male }}" style="height: 140; width: 93.33;">
                                    <a href="#" class="btn btn-danger btn-xs delete-category-image"
                                        data-category-id="{{ $category->id }}"
                                        data-field="thumbnail_male"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Female Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control female-thumbnail-file" name="thumbnail_female" accept="image/*">
                                @if ($category->thumbnail_female)
                                <div class="thumbnail_female">
                                    <img src="{{ $category->thumbnail_female }}" style="height: 140; width: 93.33;">
                                    <a href="#" class="btn btn-danger btn-xs delete-category-image"
                                        data-category-id="{{ $category->id }}"
                                        data-field="thumbnail_female"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Youth Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control youth-thumbnail-file" name="thumbnail_youth" accept="image/*">
                                @if ($category->thumbnail_youth)
                                <div class="thumbnail_youth">
                                    <img src="{{ $category->thumbnail_youth }}" style="height: 140; width: 93.33;">
                                    <a href="#" class="btn btn-danger btn-xs delete-category-image"
                                        data-category-id="{{ $category->id }}"
                                        data-field="thumbnail_youth"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sizes</label>
                            <div class="col-md-4 Sizes">
                                <input type="hidden" name="sizes" value="{{ $category->sizes }}">
                                <div class="col-md-4 adultSizes">
                                    Adult<br>
                                   <!--  <input type="checkbox"  name="tail_sweep"> -->
                                </div>
                                <div class="col-md-4 youthSizes">
                                    Youth<br>
                                    <!-- <input type="checkbox"  name="tail_sweep"> -->
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Uniform Category
                                </button>
                                <a href="/administration/categories" class="btn btn-danger">
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

@include('partials.confirmation-modal')
@endsection
@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script>
$( document ).ready(function() {

    $('.delete-category-image').on('click', function(e){
        e.preventDefault();
        var id =  $(this).data('category-id');
        var field = $(this).data('field');
        $('#confirmation-modal .confirm-yes').data('field', field);
        modalConfirm('Remove Image', 'Are you sure you want to remove this Image?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){

        var id = $(this).data('value');
        var field = $(this).data('field');
        console.log("test"+id+field);
        var url = "//" + api_host + "/api/categories/deleteImage";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                }
            }
        });
    });

});
</script>
@endsection
