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

    $('#reset-password .password, #reset-password .confirm-password').on('change', isValidNewPassword);

    function isValidNewPassword() {
        var password = $('#reset-password .password').val();
        var confirm_password = $('#reset-password .confirm-password').val();
        if (password.length && confirm_password.length) {
            if (password == confirm_password) {
                if (password.length >= 6) {
                    $('#reset-password-error').fadeOut();
                } else {
                    $('#reset-password-error .message').text('Password should be at least six (6) characters.');
                    $('#reset-password-error').fadeIn();
                    return false;
                }
                $('#reset-password-submit').removeAttr('disabled');
                return true;
            }
        }
        $('#reset-password-error .message').text('Passwords does not match.');
        $('#reset-password-error').fadeIn();
        $('#reset-password-submit').attr('disabled', 'disabled');
        return false;
    }

    $('#reset-password-submit').on('click', resetPassword);

    function resetPassword() {
        $('#reset-password-submit .loading').fadeIn();
        $('#reset-password-submit').attr('disabled', 'disabled');
        var data = {
            password: $('#reset-password .password').val(),
            _token: $('.csrf-token').val()
        }
        $.ajax({
            url: window.location.origin + '/resetPassword',
            data: data,
            method: 'POST',
            success: function(response) {
                $('#reset-password').fadeOut();
                if (response.success) {
                    $('#reset-password-sent').fadeIn();
                } else {
                    $('#reset-password-error .message').text(response.message);
                    $('#reset-password-error').fadeIn();
                }
            }
        });
    }
});
