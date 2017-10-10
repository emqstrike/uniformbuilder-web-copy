$(document).ready(function() {

    ub.funcs.processLogoRequests = function () {

        var _processedLogoRequest = [];

        ub.data.logo_requests = _.filter(ub.data.logo_requests, {submitted_by_user_id: ub.user.id.toString() });
        
        _.each(ub.data.logo_requests, function (lr) {

            lr.parsedProperties = JSON.parse(lr.properties);

            // use only records with properties 
            if (lr.parsedProperties.length > 0) { _processedLogoRequest.push(lr); }

        });

        ub.data.logo_requests = _processedLogoRequest

        // a style is loaded, limit logo request to saved design id, if not load all custom logo requests for the current user
        if (ub.config.material_id !== -1) { 

            if (ub.config.pageType === "Saved Design") {
                ub.data.logo_requests = _.find(ub.data.logo_requests, { reference_id: ub.config.savedDesignInfo.savedDesignID });
            }

        } 

    };

    ub.funcs.displayMyCustomArtworkRequests = function () {

        $.ajax({
            
            url: ub.config.api_host + '/api/v1-0/logo_requests/',
            type: "GET", 
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {

                var _processedLogoRequest;
                var _container;
                var _template;
                var _data;
                var _markup;

                ub.data.logo_requests = response.logo_requests;
                ub.funcs.processLogoRequests();
                _processedLogoRequest = ub.data.logo_requests;

                $('div.my-custom-artwork-requests-loading').hide();

                $container = $('div.custom-artwork-request-list.pending');
                template = $('#m-custom-artwork-requests').html();
            
                data = { 
                    car: _processedLogoRequest,
                    titleCase: function () {
                      return function(val, render) {

                        var _temp = render(val);
                        _temp = _temp.toString().toTitleCase();

                        return render(_temp);

                      };
                    }
                };

                markup = Mustache.render(template, data);

                $container.html(markup);
                $container.fadeIn();

                // Setup Events

                    var $spanLink = $('span.link');
                    $spanLink.unbind('click');
                    $spanLink.on('click', function () {

                        var _refID = $(this).data('reference-id');
                        var _type = $(this).data('type');
                        var _url = '';
                        
                        if (_type === "order") { _url = ub.config.host + '/orders/view/' + _refID; }
                        if (_type === "saved_design") { _url = ub.config.host + '/my-saved-design/' + _refID; }

                    });

                    var $spanPreview = $('span[data-btn-type="preview"]');
                    $spanPreview.unbind('click');
                    $spanPreview.on('click', function () {

                        var _refID = $(this).data('reference-id');
                        var _action = $(this).data('action');
                        var _result = _.find(_processedLogoRequest, { reference_id: _refID.toString()});

                        if (_action === 'preview-submitted-artwork') {

                            if (_result.parsedProperties.length > 0) {

                                var _file = _result.parsedProperties[0].file;
                                var _str = "<img style='max-width: 100%;' src ='" + _file + "' />";

                                ub.showModalTool(_str);

                            }

                        }

                    });

                // End Setup Events

                // Create Tooltips
                    
                    Tipped.create('span.link');
                    Tipped.create('span[data-action="preview-submitted-artwork"]');
                    Tipped.create('span[data-action="preview-prepared-artwork"]', { position: 'bottom' });
                    Tipped.create('span[data-action="preview-in-customizer"]');

                // End Create Tooltips

            }

        });

    }

    if (ub.page === 'my-custom-artwork-requests') {

        $('div#main-picker-container').remove();
        $('body').css('background-image', 'none');

        if (!window.ub.user) { 
            ub.funcs.displayLoginForm(); 
            return;
        } 

        ub.funcs.displayMyCustomArtworkRequests();

    }
    
});
