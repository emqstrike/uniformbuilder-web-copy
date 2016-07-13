@extends('administration.lte-main')

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Edit mascot category</div>
                <div class="panel-body">

                    <form class="form-horizontal" role="form" method="POST" action="/administration/mascots_categories/update" enctype="multipart/form-data" id='edit-mascot-category-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="mascots_category_id" value="{{ $mascot_category->id }}">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-category-name" name="name" value="{{ $mascot_category->name }}">
                            </div>
                             <label class="col-md-4 control-label">Mascot Group</label>
                            <div class="col-md-6">
                            <select  class="form-control mascot-group-category-name" name="group" >
                                @foreach ($mascots_groups_categories as $mascots_groups_category)
                                    <option value="{{$mascots_groups_category->id }}" <?php if($mascots_groups_category->id == $mascot_category->mascots_group_category_id ){ echo "selected"; } ?>>{{$mascots_groups_category->name }}</option>
                                @endforeach

                            </select>

                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-mascot">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Mascot
                                </button>
                                <a href="/administration/mascots_categories" class="btn btn-danger">
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

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript">
@endsection