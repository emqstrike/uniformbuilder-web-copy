@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
    
li.select2-selection__choice {
    color: black !important;
}

.animated {
    -webkit-transition: height 0.2s;
    -moz-transition: height 0.2s;
    transition: height 0.2s;
}
.inputs {
    width: 45px;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Parts Aliases</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/parts_aliases/add" enctype="multipart/form-data" id='create_application_size'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="configurations" id="configurations"><div class="form-group">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea name="description" class="form-control"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select name="uniform_category_id" class="form-control">
                                    <option value="0"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Template</label>
                            <div class="col-md-6">
                                <select name="price_item_template_id" class="form-control">
                                    <option value="0"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-6">
                                <select name="block_pattern_id" class="form-control">
                                    <option value="0"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">

                            <label class="col-md-4 control-label">Properties
                                <a href="#" class="btn btn-primary btn-xs add-props">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                </a>
                            </label>
                            <div class="col-md-6">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Part Name</th>
                                            <th>Question ID</th>
                                            <th>Edit Part Name</th>
                                            <th>Value</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="properties-content"></tbody>
                                </table>
                                <!-- <select name="block_pattern_id" class="form-control">
                                    <option value="0"></option>
                                </select> -->
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Information
                                </button>
                                <a href="/administration/block_patterns" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                        <br><br>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script src="/js/administration/common.js"></script>
<script src="/jquery-ui/jquery-ui.min.js"></script>
<script src="/js/libs/select2/select2.min.js"></script>
<script src="/js/ddslick.min.js"></script>
<script>
$(document).ready(function(){



    $('.add-props').on('click', function(){
        var td_open = '<td>';
        var td_close = '</td>';
        var input_part_name = '<input type="text" class="part-name">';
        var input_question_id = '<input type="text" class="question-id">';
        var input_edit_part_name = '<input type="text" class="edit-part-name">';
        var input_edit_part_value = '<input type="text" class="edit-part-value">';
        var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
        var elem = '<tr>' + 
                        td_open + 
                            input_part_name + 
                        td_close +
                        td_open + 
                            input_question_id +
                        td_close +
                        td_open +
                            input_edit_part_name +
                        td_close +
                        td_open + 
                            input_edit_part_value +
                        td_close +
                        td_open +
                            delete_row +
                        td_close +
                    '</tr>';
        $('.properties-content').prepend(elem);
    });

    function deleteButton(){
        $('.delete-row').on('click', function(){
            
        });
    }



});
</script>
@endsection
