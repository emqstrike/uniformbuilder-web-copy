@extends('administration.main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
        
        </div>
    </div>
</div>

@endsection

@section('scripts')

<script type="text/javascript" src="/js/administration/common.js"></script>

@endsection

@section('custom-scripts')

function isReady() {
    var firstName = $('.user-first-name');
    var lastName = $('.user-last-name');
    var password = $('.user-password');
    var confirm = $('.user-confirm-password');
    var userType = $('.user-type');
    if (firstName.val() && lastName.val()) {
        if (password.val() || confirm.val()) {
            if (password.val().length < 6) {
                showAlert('Password should at least have a minimum of 6 characters');
                return false;
            }
            if (password.val() != confirm.val()) {
                showAlert('Passwords does not match');
                return false;
            }
        }
        $('.flash-alert').fadeOut();
        return true;
    }
    return false;
}

$('#update-user-form input').on('change', function(){
    if (isReady()) {
        $('#update-user-form .update-user').fadeIn();
    } else {
        $('#update-user-form .update-user').fadeOut()
    }
});


$('#update-user-form').submit(function(){
    $('.flash-alert .flash-progress').show();
    $('.flash-alert .flash-title').text('Updating user');
    $('.flash-alert .flash-sub-title').text('Saving');
    $('.flash-alert .flash-message').text('Please wait while we are saving changes...');
    $('.flash-alert').addClass('alert-info');
    $('.flash-alert').show();
    $('.main-content').fadeOut('slow');
});

@endsection