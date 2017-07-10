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
        <div class="col-md-12">
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/parts_aliases/add" enctype="multipart/form-data" id='part_aliases_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <input type="hidden" name="properties" value="testing">

                        <input type="hidden" name="configurations" id="configurations"><div class="form-group">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-4">
                                <textarea name="description" class="form-control"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-4">
                                <select name="uniform_category_id" class="form-control uniform-category-id">
                                    @foreach($sports as $sport)
                                        <option value="{{ $sport->id }}">{{ $sport->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Template</label>
                            <div class="col-md-4">
                                <select name="price_item_template_id" class="form-control">
                                    <option value="0"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <select name="block_pattern_id" class="form-control">
                                    <option value="0"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-4">
                                <select name="price_item_template_id" class="form-control">
                                    <option value="upper">Upper</option>
                                    <option value="lower">Lower</option>
                                </select>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-1 control-label">Material ID</label>
                            <div class="col-md-1">
                                <input type="text" class="material-id-parts" value="92">
                            </div>
                            <div class="col-md-1">
                                    <a href="#" class="btn btn-primary get-parts">Get Parts</a>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-1 control-label">Qstrike Item ID</label>
                            <div class="col-md-1">
                                <input type="text" class="item-id" value="455"> 
                            </div>
                            <div class="col-md-1">
                                    <a href="#" class="btn btn-primary get-questions">Get Questions</a>
                            </div>
                        </div>

                        <div class="form-group">

                            <label class="col-md-1 control-label">Properties
                                <a href="#" class="btn btn-primary btn-xs add-props">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                </a>
                            </label>
                            <div class="col-md-11">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Part Name</th>
                                            <th>Question</th>
                                            <th>Edit Part Name</th>
                                            <th>Value</th>
                                            <th>Type</th>
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

<!-- Trigger the modal with a button -->
{{--<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> --}}

<!-- Modal -->
<div id="getPartsModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" align="center">Please Wait</h4>
      </div>
      <div class="modal-body" align="center">
            <div class="progress">
                <div class="progress-bar progress-bar-info progress-bar-striped" style="width: 100%;">Loading...</div>
            </div>
      </div>
      <div class="modal-footer" >
        {{--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>--}}
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
<script src="/underscore/underscore.js"></script>
<script>
$(document).ready(function(){

    window.sport_id = null;
    window.block_patterns = null;

    window.parts = null;
    window.material_id = null;
    window.parts_options = null;

    window.questions_list = null;
    window.item_id = null;
    window.questions_options = null;
    window.question_names = null;

    function updateJSON(){
       var temp =[];
        $(".layer-row").each(function(i) {
            var x = {
                    "part_name" : $(this).find('.part-name').val(),
                    "part_questions" : $(this).find('.part-questions').val(),
                    "edit_part_name" : $(this).find('.edit-part-name').val(),
                    "edit_part_value" : $(this).find('.edit-part-value').val(),
                    "input_type" : $(this).find('.type').val(),
                 };
                temp.push(x);
        });
        console.log( JSON.stringify(temp) );
    }
   
    $("#part_aliases_form").on("keyup", ".edit-part-value", function(e){    
        e.preventDefault();
        updateJSON();
    });         
                
    $("#part_aliases_form").on("change", ".type", function(e){
            e.preventDefault();
            updateJSON();
    });
    
    $("#part_aliases_form").on("click", ".delete-row", function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateJSON();
    });

    $('.add-props').on('click', function(e){
        e.preventDefault();
        var td_open = '<td>';
        var td_close = '</td>';
        var input_part_name = '<select class="part-name">'+window.parts_options+'</select>';
        var input_question_id = '<select class="part-questions">'+window.questions_options+'</select>';
        var input_edit_part_name = '<select class="edit-part-name">'+window.question_names+'</select>';
        var input_edit_part_value = '<input type="text" class="edit-part-value">';
        var input_type = `<select class="type from-control">
                                <option value="Pattern">Pattern</option>
                                <option value="Color">Color</option>
                            </select>`;
        var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
        var elem = '<tr class="layer-row">' +
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
                            input_type +
                        td_close +
                        td_open +
                            delete_row +
                        td_close +
                    '</tr>';
        $('.properties-content').prepend(elem);
        updateJSON();
    });

    function deleteButton(){
        $('.delete-row').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateJSON();
        });
    }

    $('.get-parts').on('click', function(e){
        e.preventDefault();
        //Load modal
        $('#getPartsModal').modal('toggle');

        setTimeout(function(){
            var material_id = $('.material-id-parts').val();
            window.material_id = material_id;
            getParts(function(parts){ window.parts = parts; });
            var z = $.map(window.parts, function(value, index) {
                return [value];
            });

            $('part-name').html();
            var elem = '';
            window.parts_options = null;
            z.forEach(function(entry) {
                elem += '<option value="'+entry+'">'+entry+'</option>';
            });

            window.parts_options = elem;
        }, 1000);
        

    });

    $('.get-questions').on('click', function(e){
        e.preventDefault();
         //Load modal
        $('#getPartsModal').modal('toggle');
        setTimeout(function(){
            var item_id = $('.item-id').val();
            window.item_id = item_id;

            getQuestionsList(function(questions_list){ window.questions_list = questions_list; });

            window.questions_options = null;

            $('part-questions').html();
            var elem = '';
            var question_names = '';
            window.questions_options = null;
            var arranged_questions = _.sortBy(window.questions_list, function(e){ return e.QuestionID; });

            arranged_questions.forEach(function(entry) {
                elem += '<option value="'+entry.QuestionID+'">['+entry.QuestionID+'] '+entry.Question+' --- '+entry.QuestionGroup+'</option>';
                question_names += '<option value="'+entry.Question+'">'+entry.Question+'</option>';
            });
            window.questions_options = elem;
            window.question_names = question_names;
            }, 1000);
    });

    function getBlockPatternsBySportId(callback){
        var block_patterns;
        var url = "//api-dev.qstrike.com/api/block_pattern/sport/"+window.sport_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }

    function getParts(callback){
        var parts;
        var url = "//api-dev.qstrike.com/api/materials_options/list_parts_names/"+window.material_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                parts = data['parts'];
                if(typeof callback === "function") callback(parts);
                //Close Modal
                $('#getPartsModal').modal('toggle');
            }
        });
    }

    function getQuestionsList(callback){
        var questions_list;
        var url = "http://qx.azurewebsites.net/api/itemquestion?itemid="+window.item_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                questions_list = data;
                if(typeof callback === "function") callback(questions_list);
                //Close Modal
                $('#getPartsModal').modal('toggle');
            }
        });
    }

    $('.uniform-category-id').on('change', function(){
        console.log($(this).val());
        window.sport_id = $(this).val();
        getBlockPatternsBySportId(function(colors){ window.block_patterns = block_patterns; });
        console.log(window.sport_id);

    });



});
</script>
@endsection
