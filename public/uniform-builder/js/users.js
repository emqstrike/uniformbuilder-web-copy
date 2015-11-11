$(document).ready(function () {
    $('.user-signup').on('click', function() {
            $('#signup-modal').modal('show');
    });

    $('#forgot-password-email').on('change', function(){
        var email = $('#forgot-password-email').val();
        if (isValidEmail(email)) {
            $('#forgot-password .help-inline .error').fadeOut();
        } else {
            $('#forgot-password .help-inline .error').text('Please enter a valid email address');
            $('#forgot-password .help-inline .error').fadeIn();
        }
    });

    $('#forgot-password-email').on('click', function(){
        var csrf_token = $('.csrf-token').val();
        var email = $('#forgot-password-email').val();
    });

    function isValidEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
});
