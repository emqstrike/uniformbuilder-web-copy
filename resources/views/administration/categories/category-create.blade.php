@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Uniform Category</div>
                <div class="panel-body">
                    @include('administration.partials.validation-error')

                    <form class="form-horizontal" role="form" method="POST" action="/administration/category/add" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category Alias</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-alias" name="alias" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control category-code" name="code">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select class="form-control type" name="type">
                                    <option value="sports">Sports</option>
                                    <option value="apparel">Apparel</option>
                                    <option value="esports">eSports</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Active Type</label>
                            <div class="col-md-6">
                                <select class="form-control active-type" name="active_type">
                                    <option value="active">Active</option>
                                    <option value="temp">Temporary</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Male Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control male-thumbnail-file" name="thumbnail_male" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Male Thumbnail Active?</label>
                            <div class="col-md-2">
                                <select class="form-control active-male" name="active_male">
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Female Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control female-thumbnail-file" name="thumbnail_female" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Female Thumbnail Active?</label>
                            <div class="col-md-2">
                                <select class="form-control active-female" name="active_female">
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Youth Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control youth-thumbnail-file" name="thumbnail_youth" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Youth Thumbnail Active?</label>
                            <div class="col-md-2">
                                <select class="form-control active-youth" name="active_youth">
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </div>
                        
                         <div class="form-group">
                            <label class="col-md-4 control-label">Sizes</label>
                            <div class="col-md-4 Sizes">
                                <input type="hidden" name="sizes" value="">
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
                                    Add New Uniform Category
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


@endsection
