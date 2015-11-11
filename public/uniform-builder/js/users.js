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

    $('#forgot-password-submit').on('click', recoverPassword);

    function isValidEmail(email) {
        var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return re.test(email);
    }

    function recoverPassword() {
        $('#forgot-password-submit .loading').fadeIn();
        $('#forgot-password-submit').attr('disabled', 'disabled');
        var data = {
            email: $('#forgot-password-email').val(),
            _token: $('.csrf-token').val()
        }
        $.ajax({
            url: window.location.origin + '/recoverPassword',
            data: data,
            method: 'POST',
            success: function(response) {
                $('#forgot-password').fadeOut();
                if (response.success) {
                    $('#forgot-password-sent').fadeIn();
                } else {
                    $('#forgot-password-error .message').text(response.message);
                    $('#forgot-password-error').fadeIn();
                }
            }
        });
    }
});
