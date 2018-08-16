@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading"><h1>Add New Splash Image</h1></div>
                    <div class="panel-body">
                        <div class="col-md-12">
                            <form method="POST" action="/administration/splash_image/add" enctype="multipart/form-data">
                                @include('administration.partials.validation-error')

                               <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Name : </label>
                                      <input type="text" class="form-control" name="name" required="true">
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Category : </label>
                                    <select class="form-control selectCategory" name="category" required="true">
                                        @foreach ($categories as $category)
                                            <option value="{{$category -> name}}">{{$category -> name}}</option>
                                        @endforeach
                                    </select>
                                </fieldset>

                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Show Time : </label>
                                      <input type="date" class="form-control" name="show_time" required="true">
                                </fieldset>
                               <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Front Image : </label>
                                      <input type="file" class="form-control" name="front_image" accept="image/*" required="true">
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Back Image : </label>
                                      <input type="file" class="form-control" name="back_image" accept="image/*" required="true">
                                </fieldset>
                                <fieldset class="form-group">
                                <button class="btn btn-primaryt">Add Flash Image</button>
                                </fieldset>
                            </form>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/accents.js"></script>
<script src="/js/administration/selectize.min.js"></script>
@endsection


