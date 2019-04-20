@extends('administration.lte-main')

@section('styles')

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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/feedback/reply" enctype="multipart/form-data" id='edit-feature_flag-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" class="feedback-id" value="{{ $feedback->id }}">
                        <input type="hidden" class="user-id" value="{{ $feedback->user_id }}">
                        <input type="hidden" class="admin-id" value="<?php echo Session::get('userId'); ?>">

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-2">
                                <label>{{ $feedback->sender_name }}'s Feedback</label>
                            </div>
                            <div class="col-md-8 col-md-offset-2">
                                <textarea class="form-control animated" disabled>{{ $feedback->content }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-2">
                                <label>Reply</label>
                            </div>
                            <div class="col-md-8 col-md-offset-2">
                                Subject: <input type="text" class="form-control subject"></br>
                            </div>
                            <div class="col-md-8 col-md-offset-2">
                                Content: <textarea class="form-control reply-content animated"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                                <center>
                                    <a href="#" class="btn btn-primary btn-flat reply-feedback">
                                        <span class="fa fa-reply"></span>
                                        Reply
                                    </a>
                                    <a href="/administration/v1-0/feedbacks" class="btn btn-flat btn-danger">
                                        <span class="glyphicon glyphicon-arrow-left"></span>
                                        Cancel
                                    </a>
                                </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')

<script>
$(document).ready(function(){

$('.animated').autosize({append: "\n"});

function linkUser(admin_id, message_id){ // records the admin id that replied to the feedback
    var url = "//" + api_host + "/api/linkAdmin";
    var data = {
        admin_id: admin_id,
        message: message
    };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
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
}

$('.reply-feedback').on('click', function(){

    var feedback_id = $('.feedback-id').val();
    var reply_content = $('.reply-content').val();
    var user_id = $('.user-id').val();
    var subject = $('.subject').val();
    var url = "//" + api_host + "/api/message";
    var admin_id = $('.admin-id').val();

    var data = {
        subject: subject,
        feedback_id: feedback_id,
        recipient_id: user_id,
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
