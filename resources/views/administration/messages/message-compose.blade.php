@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<style type="text/css">
.tt-menu {
   width: 422px;
   margin: 12px 0;
   padding: 8px 0;
   background-color: #fff;
   border: 1px solid #ccc;
   border: 1px solid rgba(0, 0, 0, 0.2);
   -webkit-border-radius: 8px;
   -moz-border-radius: 8px;
   border-radius: 8px;
   -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
   -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-envelope"></span>
                        Compose Message
                    </h1>
                </div>
                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST">
                    <input type="hidden" id="user_id" value="{{ Session::get('userId') }}">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Recepient</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control message-recepient typeahead" id="message_recepient" placeholder="Enter name...">
                                <input type="hidden" id="recepient_id">
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-md-4 control-label">Body</label>
                            <div class="col-md-6">
                                <textarea class="form-control message-content" id="message_content"></textarea>
                                <br>
                                <a href="#" class="btn btn-primary">Send</a>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-md-4 control-label">Body</label>
                            <div class="col-md-8">
                                <textarea class="form-control message-content" id="message_content"></textarea>
                                <br>
                                <a href="#" class="btn btn-primary send-message">Send</a>
                                <input type="hidden" name="messsage" id="messsage">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/typeahead/typeahead.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script>
$(document).ready(function(){

    tinymce.init({ 

        selector:'textarea.message-content'

    });

    $('.send-message').on('click', function(){

        saveEditor();
        console.log('SEND');

    });

    function saveEditor(){

        window.mce = tinyMCE.activeEditor.getContent();
        // console.log('MCE: ' + window.mce);
        $('#message').val(window.mce);
        // console.log('Recepient ID: ' + $('#recepient_id').val());
        // console.log('KEY: ' + atob(headerValue));

        var recepient_id = $('#recepient_id').val();
        var content = window.mce;

        sendMessage(recepient_id, content);
    }

    function sendMessage(recepient_id, content){
        var user_id = $('#user_id').val();
        var myData={
            "content":content,
            "recipient_id":recepient_id,
            "sender_id":user_id
        };
        console.log(myData);
        $.ajax({
            url: "//" + api_host + "/api/message",
            type: "POST",
            data: JSON.stringify(myData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    // var elem = '.material-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    }

    window.admins = null;
    getAdmins(function(admins){ window.admins = admins; });
    function getAdmins(callback){
        var admins;
        // var url = "//api.prolook.com/api/users/admins";
        var url = "//" + api_host + "/api/users/admins";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(data){
                admins = data['users'];
                if(typeof callback === "function") callback(admins);
            }
        });
    }

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
        var _res = _.where(window.admins, {first_name: fname});
    };
};
var admins_name = [];
$.each(window.admins, function(index, item){
    // console.log(item);
    admins_name.push(item.first_name + " " + item.last_name);
});

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$('.message-recepient').on('typeahead:selected', function (e, datum) {
    console.log(datum);
    var strName = $(this).val();
    var tmp_fname= strName.split(" ");
    var fname = tmp_fname[0].capitalizeFirstLetter();
    // console.log(fname);
    var _res = _.where(window.admins, {first_name: fname});
    console.log(_res);
    $('#recepient_id').val(_res[0].id)
});


    $('#message_recepient.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      source: substringMatcher(admins_name)
    });



});
</script>
@endsection