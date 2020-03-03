@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">    

</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading"><h4>Modify Inksoft Design</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/inksoft_design/update" enctype="multipart/form-data" id='dealers_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">                       
                                               
                        <input type="hidden" name="id" value="{{$inksoft_designs->id}}">                                            
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design ID</label>
                            <div class="col-md-4">
                               <input type="text" name="design_id" class="form-control" value="{{ $inksoft_designs->design_id }}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Design Name</label>
                            <div class="col-md-4">
                               <input type="text" name="design_name" class="form-control" value="{{ $inksoft_designs->design_name }}">
                            </div>
                        </div>                      
                        <div class="form-group">
                            <label class="col-md-4 control-label">User ID</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control user typeahead" id="user" placeholder="Enter name...">                 
                            </div>
                        </div>
                        <div class="form-group">
                             <label class="col-md-4 control-label"></label>
                            <div class="col-md-4">                                
                                <input type="text" id="user_name" name="user_name">
                                <input type="text" id="user_id" name="user_id" value="{{ $inksoft_designs->user_id }}">
                            </div>
                        </div>                                                 
                        <div class="form-group">
                            <label class="col-md-4 control-label">Created By</label>
                            <div class="col-md-4">                                                         
                                <input type="text" name="created_by_user_id" id="created_by_user_id" class="form-control" value="{{ $inksoft_designs->created_by_user_id }}" >
                                <input type="text" name="created_by" class="form-control" id="created_by"> 
                            </div>
                        </div>                       
                        <div class="form-group">
                            <label class="col-md-4 control-label">PNG</label>
                            <div class="col-md-4">
                              <input type="text" name="png_filename" class="form-control" value="{{ $inksoft_designs->png_filename }}">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label">SVG</label>
                            <div class="col-md-4">
                              <input type="text" name="svg_filename" class="form-control" value="{{ $inksoft_designs->svg_filename }}">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-4">
                              <input type="text" name="thumbnail" class="form-control" value="{{ $inksoft_designs->thumbnail }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Summary</label>
                            <div class="col-md-4">
                              <textarea name="design_summary" class="form-control" id="design_summary" cols="10" rows="10">{{ $inksoft_designs->design_summary }}</textarea>
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Details</label>
                            <div class="col-md-4">
                              <textarea name="design_details" class="form-control" id="design_details" cols="10" rows="10">{{ $inksoft_designs->design_details }}</textarea>
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-4">
                              <input type="text" name="category" class="form-control" value="{{ $inksoft_designs->category }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Type</label>
                           <div class="col-md-2">
                                <select name="type" class="form-control">
                                        <option value="user_design" @if($inksoft_designs->type == "user_design") selected="selected"@endif>User Design</option>
                                        <option value="tailsweeps" @if($inksoft_designs->type == "tailsweeps") selected="selected"@endif>Tailsweeps</option>
                                        <option value="kollege_town" @if($inksoft_designs->type == "kollege_town") selected="selected"@endif>Kollege Town</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Is public? </label>
                           <div class="col-md-1">
                                <select name="is_public" class="form-control">
                                        <option value="1" @if($inksoft_designs->is_public == 1) selected="selected"@endif>Yes</option>
                                        <option value="0" @if($inksoft_designs->is_public == 0) selected="selected"@endif>No</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Status</label>
                           <div class="col-md-4">
                                <select name="status" class="form-control">
                                        <<option value="in_development" @if($inksoft_designs->status == "in_development") selected="selected"@endif>In Development</option>
                                        <option value="new" @if($inksoft_designs->status == "new") selected="selected"@endif>New</option>
                                        <option value="initial_approval_ok" @if($inksoft_designs->status == "initial_approval_ok") selected="selected"@endif>Initial Approval Ok</option>
                                        <option value="secondary_approval_ok" @if($inksoft_designs->status == "secondary_approval_ok") selected="selected"@endif>Secondary Approval Ok</option>
                                        <option value="final_approval_ok" @if($inksoft_designs->status == "final_approval_ok") selected="selected"@endif>Final Approval Ok</option>                                   
                                </select>
                            </div>
                        </div>
                            <div class="form-group">
                            <label class="col-md-4 control-label" >Archived</label>
                           <div class="col-md-1">
                                <select name="archived" class="form-control">
                                        <option value="1" @if($inksoft_designs->archived == 1) selected="selected"@endif>Yes</option>
                                        <option value="0" @if($inksoft_designs->archived == 0) selected="selected"@endif>No</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Comments</label>
                            <div class="col-md-4">
                              <textarea name="comments" class="form-control" id="comments" cols="10" rows="10">{{ $inksoft_designs->comments }}</textarea>
                            </div>
                        </div> 
                        
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Brand </label>
                           <div class="col-md-4">
                                <select name="brand" class="form-control">
                                        <option value="" @if($inksoft_designs->brand == '') selected="selected"@endif>Select Brand</option>
                                        <option value="prolook" @if($inksoft_designs->brand == 'prolook') selected="selected"@endif>Prolook</option>
                                        <option value="riddell" @if($inksoft_designs->brand == 'riddell') selected="selected"@endif>Riddell</option>
                                        <option value="richardson" @if($inksoft_designs->brand == 'richardson') selected="selected"@endif>Richardson</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-inksoft-design">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update InkSoft Design
                                </button>
                                <a href="/administration/inksoft_designs" class="btn btn-danger">
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/typeahead/typeahead.js"></script>

<script>
$(function(){
    window.onload = getCreatedBy;
    window.users = null;
    getAdmins(function(users){ window.users = users; });
    function getAdmins(callback){
        var users;     
        var url = "//" + api_host + "/api/users";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(data){
                users = data['users'];
                if(typeof callback === "function") callback(users);
            }
        });
    }
    console.log(window.users);
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

          // an array that will be populated with substring matches
            matches = [];

          // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

          // iterate through the pool of strings and for any string that
          // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                  matches.push(str);
                }
            });

            cb(matches);
            var strName = $('.typeahead').val();
            var tmp_fname= strName.split(" ");
            var fname = tmp_fname[0].capitalizeFirstLetter();
            var _res = _.where(window.users, {first_name: fname});
        };
    };
    var users_name = [];
    $.each(window.users, function(index, item){
        // console.log(item);
        users_name.push(item.first_name + " " + item.last_name);
    });

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    $('.user').on('typeahead:selected', function (e, datum) {
        console.log(datum);
        var strName = $(this).val();
        var tmp_fname= strName.split(" ");
        var fname = tmp_fname[0].capitalizeFirstLetter();
        // console.log(fname);
        var _res = _.where(window.users, {first_name: fname});
        console.log(_res);
        $('#user_id').val(_res[0].id)
    });

        $('#user.typeahead').typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          name: 'users',
          source: substringMatcher(users_name)
        });

    $('#user').on('change', function(){
        var manager_id = $('#user_id').val();
        if (manager_id < 1 )
        {
            $('.update-dealer').attr("disabled", true);
        } else {
            $('.update-dealer').attr("disabled", false);
        }
    });

    function getCreatedBy(){
        var user = $('#user_id').val();
        $.each(window.users, function(index, item){
            if (item.id == user)
            {
                $('#user_name').val(item.first_name+' '+item.last_name);
            }
        });

        var created_by = $('#created_by_user_id').val();      
        $.each(window.users, function(index, item){
            if (item.id == created_by)
            {
                $('#created_by').val(item.first_name+' '+item.last_name);
            }
        });  
    }
});   
</script>
@endsection
