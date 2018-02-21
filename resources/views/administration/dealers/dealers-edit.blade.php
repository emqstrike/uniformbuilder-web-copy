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
                <div class="panel-heading"><h4>Edit Dealer</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/dealers/update" enctype="multipart/form-data" id='cut_links_form'>
                        
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        
                        <input type="hidden" name="id" value="{{$dealers->id}}"> 

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-4">
                               <input type="text" name="name" class="form-control" value="{{$dealers->name}}">
                            </div>
                        </div>                       
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-4">
                              <input type="text" name="description" class="form-control" value="{{$dealers->description}}">
                            </div>
                        </div>                        
                        <div class="form-group">
                            <label class="col-md-4 control-label">Current Manager</label>
                             <div class="col-md-4">
                              <input type="text" name="current_manager" class="form-control" value="{{$dealers->first_name}} {{$dealers->last_name}}" readonly="true">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">New Manager</label>
                            <div class="col-md-4">                                
                                <input type="text" class="form-control site_manager typeahead" id="site_manager" placeholder="Enter name...">
                                <input type="hidden" id="site_manager_user_id" name="site_manager_user_id" value="{{$dealers->site_manager_user_id}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sub Domain URL</label>
                            <div class="col-md-4">
                              <input type="text" name="subdomain_url" class="form-control" value="{{$dealers->subdomain_url}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Main Site URL</label>
                            <div class="col-md-4">
                              <input type="text" name="main_site_url" class="form-control" value="{{$dealers->main_site_url}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Logo</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control logo" name="logo" accept="image/*" >
                                <input type="text" name="logo_text" class="form-control" value="{{$dealers->logo}}" readonly="true">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-dealer">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
                                </button>
                                <a href="/administration/dealers" class="btn btn-danger">
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

<!-- Modal -->

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/typeahead/typeahead.js"></script>

<script>
$(function(){
    
   window.users = null;
    getAdmins(function(users){ window.users = users; });
    function getAdmins(callback){
        var users;
        // var url = "//api.prolook.com/api/users";
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

    $('.site_manager').on('typeahead:selected', function (e, datum) {
        console.log(datum);
        var strName = $(this).val();
        var tmp_fname= strName.split(" ");
        var fname = tmp_fname[0].capitalizeFirstLetter();
        // console.log(fname);
        var _res = _.where(window.users, {first_name: fname});
        console.log(_res);
        $('#site_manager_user_id').val(_res[0].id)
    });

        $('#site_manager.typeahead').typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          name: 'users',
          source: substringMatcher(users_name)
        });

    $('#site_manager').on('change', function(){
        var manager_id = $('#site_manager_user_id').val();
        if (manager_id < 1 )
        {
            $('.update-dealer').attr("disabled", true);
        } else {
            $('.update-dealer').attr("disabled", false);
        }
    });
});  
</script>
@endsection
