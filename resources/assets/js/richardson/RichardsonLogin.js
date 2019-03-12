function RichardsonLogin() {}

RichardsonLogin.events = {
    is_init: true,

    init: function() {
        var that = this;
        if (RichardsonLogin.events.is_init) {
            $(".richardson-footer").on('click', '.user-login', RichardsonLogin.events.onClickLogin);
            $("#richardson-user-login").on('click', '.submit-login', RichardsonLogin.events.handleUserLogin);
            $("#richardson-user-login").on('keyup', 'input[name="password"]', function(event) {
                event.preventDefault();
                /* Act on the event */
                if ($(this).hasClass('uk-form-danger')) {
                    $(this).removeClass('uk-form-danger');
                }

                var errEl = $(this).parent().parent().find(".uk-alert-danger");

                if (errEl.length !== 0) {
                    errEl.remove();
                }
            });

            $("#richardson-user-login").on('keyup', 'input[name="email"]', function(event) {
                event.preventDefault();
                /* Act on the event */
                if ($(this).hasClass('uk-form-danger')) {
                    $(this).removeClass('uk-form-danger');
                }

                var errEl = $(this).parent().parent().find(".uk-alert-danger");

                if (errEl.length !== 0) {
                    errEl.remove();
                }
            });
            RichardsonLogin.events.is_init = false;
        }
    },

    onClickLogin: function() {
        $("#r-login").trigger('reset')
        $("#r-login input[name='password']").removeClass('uk-form-danger');
        $("#r-login input[name='email']").removeClass('uk-form-danger');
        UIkit.modal("#richardson-user-login").show();
    },

    handleUserLogin: function() {
        var email = $("#r-login input[name='email']").val();
        var password = $("#r-login input[name='password']").val();

        var tmpl = document.getElementById("m-error-message").innerHTML;

        if (email.length === 0) {
            var render = Mustache.render(tmpl, {message: "Email is required"});
            $("#r-login input[name='email']").addClass('uk-form-danger');
            $("#r-login input[name='email']").parent().parent().append(render);
        }

        if (password.length === 0) {
            var render = Mustache.render(tmpl, {message: "Password is required"});
            $("#r-login input[name='password']").addClass('uk-form-danger');
            $("#r-login input[name='password']").parent().parent().append(render);
        }

        RichardsonLogin.events.postUserLogin(email, password);
    },

    postUserLogin: function(e, p) {
        if (e.trim().length === 0 || p.trim().length === 0) { return; }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            data: JSON.stringify({ email: e, password: p }),
            url: ub.config.host + "/lrest",
            dataType: "json",
            type: "POST",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {
                if(response.success) {
                    window.ub.user = {
                        id: parseInt(response.userId),
                        fullname: response.fullname,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        state: response.state,
                        zip: response.zip,
                        defaultRepID: response.default_rep_id,
                        headerValue: response.accessToken,
                    };
                    $.smkAlert({text: response.message + '!', type:'success', time: 3, marginTop: '80px'});
                    ub.id = response.userID;
                    ub.funcs.afterLogin();
                    UIkit.modal("#richardson-user-login").hide();
                    $(".richardson-footer .user-login").hide();
                } else {
                    $.smkAlert({text: response.message, type: 'warning', time: 3, marginTop: '260px'});
                    $("#r-login input[name='email']").addClass('uk-form-danger')
                    $("#r-login input[name='password']").addClass('uk-form-danger')
                }
            }
        });
    }
}