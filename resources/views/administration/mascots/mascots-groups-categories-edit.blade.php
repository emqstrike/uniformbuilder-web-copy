@extends('administration.lte-main')

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Edit mascot group category</div>
                <div class="panel-body">

                    <form class="form-horizontal" role="form" method="POST" action="/administration/mascots_groups_categories/update" enctype="multipart/form-data" id='edit-mascot-category-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="mascot_group_category_id" value="{{ $mascot_group_category->id }} ">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot Group Category</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-category-name" name="name" value="{{ $mascot_group_category->name }}">
                      
                             </div>
                           <div class="col-md-6">

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