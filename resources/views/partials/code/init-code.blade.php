<script type="text/javascript">

    $(document).ready( function () {

        window.ub           = {};
        window.ub.objects   = {};
        window.ub.funcs     = {};

        window.is           = {};

        window.ub.config = {
            brand: "{{ env('BRAND') }}",
            pdf_generator: "{{ env('PDF_GENERATOR') }}",
            toString: false,
            app_env: "{{ env('APP_ENV') }}",
            api_host: "https://{{ env('API_HOST') }}",
            asset_version: "{{$asset_version}}",
            team_store_api_host: "//{{ env('TEAM_STORE_API_BASE') }}",

            material_id: {{ $material_id }},
            uniform_name: "{{ isset($material->name) ? $material->name : 'none' }}",
            uniform_brand: "{{ isset($material->brand) ? $material->brand : 'prolook' }}",

            uniform_application_type: "{{ isset($material->uniform_application_type) ? $material->uniform_application_type : 'none' }}",
            sport: "{{ isset($material->uniform_category) ? $material->uniform_category : 'none' }}",
            option: "{{ isset($material->neck_option) ? $material->neck_option: 'none' }}",
            blockPattern: "{{ isset($material->block_pattern) ? $material->block_pattern : 'none' }}",
            hiddenBody: false,
            retain: false,
            type: "{{ isset($material->type) ? $material->type : 'none' }}",
            gender: "{{ isset($material->gender) ? $material->gender : 'none' }}",
            asset_target: "{{ isset($material->asset_target) ? $material->asset_target : 'none' }}",

            category_id: {{ $category_id }},
            host: "{{ env('CUSTOMIZER_HOST') }}",
            thumbnails_path: "{{ env('S3_PATH') }}" + 'thumbnails/',

            orderID: "{{ isset($order_id) ? $order_id : 'none' }}",
            orderCode: "{{ isset($order_code) ? $order_code : 'none' }}",
            orderIDParent: "{{ isset($order_id_parent) ? $order_id_parent: 'undefined' }}",
            // HSEL ONLY
            isFromHSEL: "{{ isset($isFromHSEL) ? $isFromHSEL : false }}",

            @if (isset($styles))
            styles: {
                load: "{{ isset($styles) ? $styles : false }}",
                gender: "{{ isset($gender) ? $gender : undefined }}",
                sport: "{{ isset($sport) ? $sport : null }}",
                blockPattern: "{{ isset($blockPattern) ? $blockPattern : null }}",
            },
            @endif

        };

        // Restore this if the id's converts to string again
        // if (window.ub.config.app_env === "local") { window.ub.config.toString = true; }

        /**
         * Extends jQuery - adds a center() reusable function
         */
        jQuery.fn.center = function () {
            this.css("position","absolute");
            this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
            this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
            return this;
        }

        @if (\Session::has('is_show_teamstore_toolbox'))
        window.is_show_teamstore_toolbox = {{ (\Session::get('is_show_teamstore_toolbox')) ? '1' : '0' }};
        @else
        window.is_show_teamstore_toolbox = 0;
        @endif

        @if (Session::get('isLoggedIn'))

            window.ub.user = {
                id: {{ Session::get('userId') }},
                fullname: "{{ Session::get('fullname') }}",
                firstName: "{{ Session::get('firstName') }}",
                lastName: "{{ Session::get('lastName') }}",
                email: "{{ Session::get('email') }}",
                zip: "{{ Session::get('zip') }}",
                state: "{{ Session::get('state') }}",
                defaultRepID: "{{ Session::get('default_rep_id') }}",
                headerValue: "{{ base64_encode(Session::get('accessToken')) }}",
                role: "{{ Session::get('role') }}"
            };

            window.ub.valid = {{ Session::get('userId') }};

              $('button#change-password-submit').on('click', function () {

                if($('input#old-password').val() === ""){

                   $.smkAlert({text: 'Password cant be blank', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                if($('input#new-password').val() !== $('input#confirm-password').val()){

                   $.smkAlert({text: 'Passwords do not match', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                ub.funcs.submitChangePasswordPOST();
                return false;

            });

            // when logged in set storage
            if(localStorage.getItem('beta_features') === null) {
                localStorage.setItem('beta_features', false);
                localStorage.setItem('switch', false);
            }

            var _switchWhiteList = [];
            var _beta = [];

            function runStorageUpdater() {
                $.ajax({

                    url: ub.config.api_host + '/api/features',
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                    success: function (response){
                        var _data = response.features;

                        // update switch storage
                        var switch_flags = _data.filter(function(i) { return i.active === 1 && i.beta === 1 && i.name === 'Switch Display' });
                        switch_flags.map(function(i) {
                            _switchWhiteList.push({ user_ids: JSON.parse(i.user_ids) })
                        });
                        localStorage.setItem('switch', JSON.stringify(_switchWhiteList));

                        // update feature_flags storage
                        var beta_flags = _data.filter(function(i) { return i.active === 1 && i.beta === 1 && i.name !== 'Switch Display' });
                        beta_flags.map(function(i) {
                            _beta.push({ name: i.name, user_ids: JSON.parse(i.user_ids)})
                        });
                        localStorage.setItem('feature_flags', JSON.stringify(_beta));
                    }

                }).done(function() {
                    runAfterSet();
                });
            }

            runStorageUpdater();

            function runAfterSet() {
                var _switchStorage = JSON.parse(localStorage.getItem('switch'));
                if(_switchStorage[0].user_ids.includes(ub.user.id.toString()))
                {
                    var newLink = $('<li id="enable-beta">\n' +
                        '               <a href="#">\n' +
                        '                  <span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>\n' +
                        '                  <span class="text">ENABLE BETA FEATURES</span>\n' +
                        '               </a>\n' +
                        '            </li>\n' +
                        '            <li class="divider"></li>');
                    $('#user-dropdown-container').prepend(newLink);

                    // storage checker element update
                    if(localStorage.getItem('beta_features') === 'false') {
                        $('#enable-beta').find('.glyphicon').removeClass("glyphicon-check").addClass("glyphicon-unchecked");
                        $('#enable-beta').find('.text').text('ENABLE BETA FEATURES');
                    } else {
                        $('#enable-beta').find('.glyphicon').removeClass("glyphicon-unchecked").addClass("glyphicon-check");
                        $('#enable-beta').find('.text').text('DISABLE BETA FEATURES');
                    }
                } else {
                    $('#user-dropdown-container').find('li#enable-beta').remove();
                }

                // updating picker value
                var _isBeta = localStorage.getItem('beta_features');
                var _featureFlags = JSON.parse(localStorage.getItem('feature_flags'));
                var _filterFeatureFlag = _featureFlags.filter(function(i) {return i.name === 'New Filter';});
                if(_isBeta === 'true' && _filterFeatureFlag.length !== 0 && _filterFeatureFlag[0].user_ids.includes(ub.user.id.toString())) {
                    ub.picker.isNew = true;
                } else {
                    ub.picker.isNew = false;
                }

                // set current logged in
                localStorage.setItem('current_logged_user', JSON.stringify(ub.user.id.toString()));
            }

            // onclick enable beta features
            $('#user-dropdown-container').on('click', '#enable-beta', function () {
                // get beta features
                var _ff = [];

                if(localStorage.getItem('beta_features') === 'false') {
                    localStorage.setItem('beta_features', true);
                    $.ajax({

                        url: ub.config.api_host + '/api/features',
                        type: "GET",
                        dataType: "json",
                        crossDomain: true,
                        contentType: 'application/json',
                        headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                        success: function (response){
                            var _data = response.features;
                            var feature_flags = _data.filter(function(i) { return i.active === 1 && i.beta === 1 && i.name !== 'Switch Display' });
                            feature_flags.map(function(i) {
                                _ff.push({ name: i.name, user_ids: JSON.parse(i.user_ids)})
                            });
                        }

                    }).done(function() {
                        localStorage.setItem('feature_flags', JSON.stringify(_ff));
                    });
                    $('#enable-beta').find('.glyphicon').removeClass("glyphicon-unchecked").addClass("glyphicon-check");
                    $('#enable-beta').find('.text').text('DISABLE BETA FEATURES');
                } else {
                    localStorage.setItem('beta_features', false);
                    localStorage.removeItem('feature_flags');
                    $('#enable-beta').find('.glyphicon').removeClass("glyphicon-check").addClass("glyphicon-unchecked");
                    $('#enable-beta').find('.text').text('ENABLE BETA FEATURES');
                }

                return false;
            });

        @else

            // clear storage
            localStorage.clear();

            window.ub.user = false;
            $('.register').on('click', function() {
                var isValidated      = $('#user-signup-form').parsley().validate(); // forms parsley instance and validation()
                var captcha_response = $('.g-recaptcha-response').val();

                if (isValidated === false) { return false; }

                if (captcha_response.length == 0) {
                    $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '80px'});
                    $('.smk-alert-content').children().not(':last').remove(); // remove smoke duplicate
                    return false;
                }

                return true;

            });

            $('button#forgot-password-submit').on('click', function() {

                var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                if(!email_regex.test($('input#forgot-password-email').val())) {

                   $.smkAlert({text: 'Enter a valid email', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                // if($('input#forgot-password-email').val() === ""){
                //    //alert('Password do not match');
                //    $.smkAlert({text: 'Enter a valid email', type:'warning', permanent: false, time: 5, marginTop: '90px'});

                //    return false;
                // }

                var captcha_response = $('.g-recaptcha-response').val();
                if (captcha_response.length == 0) {
                    $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                    return false;
                }

                ub.funcs.forgotPasswordPOST();
                return false;

            });

            $('button#reset-password-submit').on('click', function() {

                if($('input#rpassword').val() === ""){

                   $.smkAlert({text: 'Password cant be blank', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                if($('input#rpassword').val() !== $('input#rconfirmpassword').val()){

                   $.smkAlert({text: 'Passwords do not match', type:'warning', permanent: false, time: 5, marginTop: '90px'});
                   return false;

                }

                ub.funcs.submitForgotPasswordPOST();
                return false;

            });

        @endif

        @if (Session::has('message'))

            $.smkAlert({text: "{{ Session::get('message') }}", type: 'info', permanent: false, time: 5, marginTop: '140px'});

        @endif

        window.ub.page = "{{ isset($page) ? $page : 'builder' }}";

        @if (isset($page) and $page === "saved-design")

            ub.config.switchToFrontBody = new Date('Fri Aug 14 2017 17:08:32 GMT+0800 (+08)');

            ub.config.savedDesignInfo = {
                createdAt: "{{$created_at}}",
                savedDesignID: "{{$saved_design_id}}",
                name: "{{$saved_design_name}}",
                UID: "{{$saved_design_user_id}}",

            }

            if(new Date(ub.config.savedDesignInfo.createdAt) < ub.config.switchToFrontBody &&
                (ub.config.sport === "Baseball" || ub.config.sport === "Fastpitch")
            ) {

                ub.config.savedDesignInfo.frontBodyOverride = true;

            }

        @endif

        @if (isset($page) and $page === "preview-embellishment")
            ub.embellishmentDetails = {!! json_encode($embellishmentDetails) !!};
        @endif

        ub.render = "{{ isset($render) ? $render : false }}";

        // Team Store Parameters
        // Flag for returning the requested images
        ub.save_rendered = "{{ isset($save_rendered) ? $save_rendered : false }}";
        // Timeout to render images
    @if(empty($save_rendered_timeout))
        ub.save_rendered_timeout = 10; // 10 seconds default
    @else
        ub.save_rendered_timeout = {{ $save_rendered_timeout }};
    @endif

        ub.team_name = "{{ isset($team_name) ? $team_name : false }}";

    @if(!empty($team_colors))
        ub.team_colors = [{!! $team_colors !!}];
    @else
        ub.team_colors = [];
    @endif
        ub.store_code = "{{ isset($store_code) ? $store_code : false }}";
        ub.jersey_name = "{{ isset($jersey_name) ? $jersey_name : false }}";
        ub.jersey_number = "{{ isset($jersey_number) ? $jersey_number : false }}";
        ub.mascot_id = "{{ isset($mascot_id) ? $mascot_id : false }}";
        ub.product_id = "{{ isset($product_id) ? $product_id : false }}";

        ub.savedDesignName = "{{ isset($saved_design_name) ? $saved_design_name : '' }}";

        // #load_order
        var s = "{{ $builder_customizations }}";

        if(s.length > 0) {

            ub.config.pageType = "{{ isset($type) ? $type : 'undefined'}}";

            if (ub.config.pageType == "Order") {

                ub.config.orderCode       = "{{ isset($order_code) ? $order_code: 'undefined' }}";
                ub.config.orderID         = "{{ isset($order_id_short) ? $order_id_short: 'undefined' }}";
                ub.config.orderIDParent   = "{{ isset($order_id_parent) ? $order_id_parent: 'undefined' }}";

            }

            if (ub.config.pageType == "Saved Design") {

                // Fill this in ...

            }

            window.ub.temp = s;

            $('#genPDF').on('click', function () {

                var doc = new jsPDF();
                var image = $('div.ub_qrcode > canvas').get(0).toDataURL("image/png", 1.0);
                var front_view = ub.getThumbnailImage('front_view');

                doc.setFontSize(40);
                doc.addImage(image, 'png', 20, 40, 40, 40);
                doc.text(20, 20, "Prolook UB");
                doc.save('qrcode.pdf');

            });

            $('div.ub_qrcode').qrcode({
                "size": 100,
                "color": "#3a3",
                "text": window.location.href,
            });

        }
        else {

            window.ub.temp = undefined;

        }

        // end #load_order
        
        $('#message-paging').paging({
            limit:2,
        });
    });

</script>