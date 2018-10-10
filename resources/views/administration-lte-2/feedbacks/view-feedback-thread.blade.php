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
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Reply to feedback</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/feedback/reply" enctype="multipart/form-data" id='edit-feature_flag-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" class="feedback-id" value="{{ $feedback->id }}">
                        <input type="hidden" class="user-id" value="{{ $feedback->user_id }}">

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-2">
                                <label>{{ $feedback->sender_name }}'s Feedback</label>
                            </div>
                            <div class="col-md-8 col-md-offset-2">
                                <textarea class="form-control animated" disabled>{{ $feedback->content }}</textarea>
                            </div>
                        </div>
                        @if($feedback->reply[0] != null)
                            @foreach($feedback->reply as $reply)
                            <div class="form-group thread-div" data-message-id="{{ $reply->id }}">
                                <div class="col-md-8 col-md-offset-2">
                                    <label>{{ $reply->sender_name }}</label>
                                </div>
                                <div class="col-md-8 col-md-offset-2">
                                    <textarea class="form-control animated" disabled>{{ $reply->content }}</textarea>
                                </div>
                            </div>
                            @endforeach
                        @endif
                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-2">
                                <label>Reply</label>
                            </div>
                            <div class="col-md-8 col-md-offset-2">
                                Content: <textarea class="form-control reply-content animated"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- <div class="col-md-8 col-md-offset-2"> -->
                                <center>
                                    <!-- <button type="submit" class="btn btn-primary reply-feedback"> -->
                                    <a href="#" class="btn btn-primary reply-feedback">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Reply
                                    </a>
                                    <!-- </button> -->
                                    <a href="/administration/feedbacks" class="btn btn-danger">
                                        <span class="glyphicon glyphicon-arrow-left"></span>
                                        Cancel
                                    </a>
                                </center>
                            <!-- </div> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script>
$(document).ready(function(){

$('.animated').autosize({append: "\n"});


var parent_id = $(".thread-div").last().data("message-id").toString();

$('.reply-feedback').on('click', function(){

    var feedback_id = $('.feedback-id').val();
    var reply_content = $('.reply-content').val();
    var user_id = $('.user-id').val();
    var subject = $('.subject').val();
    var url = "//" + api_host + "/api/message";

    var data = {
        subject: subject,
        feedback_id: feedback_id,
        recipient_id: user_id,
        parent_id: parent_id,
        content: reply_content,
        sender_id: "0",
        sender_name: "Prolook Admin",
        type: "Feedback"
    };

    console.log(data);
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        // headers: {"accessToken": atob(headerValue)},
        success: function(response){
            console.log(response);
            if (response.success) {
                new PNotify({
                    title: 'Success',
                    text: response.message,
                    type: 'success',
                    hide: true
                });
                window.location.reload();
            }
        }
    });

});

});
</script>
@endsection
