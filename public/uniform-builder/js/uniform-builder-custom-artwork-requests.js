$(document).ready(function() {

    ub.funcs.processLogoRequests = function () {

        var _processedLogoRequest = [];
        
        _.each(ub.data.logo_request, function (lr) {

            lr.parsedProperties = JSON.parse(lr.properties);

            // use only records with properties 
            if (lr.parsedProperties.length > 0) { 

                _processedLogoRequest.push(lr); 

            }

        });

        ub.data.logo_requests = _processedLogoRequest;

        // a style is loaded, limit logo request to saved design id, if not load all custom logo requests for the current user
        if (ub.config.material_id !== -1) {

            if (ub.config.pageType === "Saved Design") {
                ub.data.logo_requests = _.find(ub.data.logo_requests, { reference_id: ub.config.savedDesignInfo.savedDesignID });
            }

        } 

    };

    ub.funcs.changeActiveTab = function (tabClass, type) {

        $(tabClass).removeClass('active');
        $(tabClass + '.' + type).addClass('active');

    };

    ub.funcs.changeCustomArtworkRequestType = function (type) {

        $('div.custom-artwork-request-list.pending').html('');
        $('div.my-custom-artwork-requests-loading').show();

        ub.funcs.prepareCustomArtworkRequestTable(type);

    }

    ub.funcs.prepareCustomArtworkRequestTable = function (type) {

        var _data = ub.data.logo_requests;
        var _template = $().html();

        $('div.my-custom-artwork-requests-loading').hide();

        if (typeof type !== "undefined") { _data = _.filter(_data, {status: type}); }

        _markup = ub .utilities.buildTemplateString('#m-custom-artwork-requests', data = {
            car: _data,
            titleCase: function () {

              return function(val, render) {

                var _temp = render(val);
                _temp = _temp.toString().toTitleCase();
                return render(_temp);

              };

            }
        })
        
        $container = $('div.custom-artwork-request-list.pending');
        $container.html(_markup);
        $container.fadeIn();

        // Setup Events

            // Prep 

                if (type === "pending") {

                    $spanPreviewPreparedArtwork = $('span[data-action="preview-prepared-artwork"]');
                    $spanPreviewPreparedArtwork.addClass('pending');
                    $spanPreviewPreparedArtwork.attr('title', 'This will be available when this item is in the For Review or the Rejected stages');

                }

            // End Prep

            var $spanTab = $('span.tab');

            $spanTab.unbind('click');
            $spanTab.on('click', function () {

                var _type = $(this).data('type');
                var _previous = $('span.tab.active').data('type');

                if (_previous === _type) { return; } // Skipping reactivating when current is same as previous

                $spanTab.removeClass('active');
                $(this).addClass('active');

                ub.funcs.changeCustomArtworkRequestType(_type);

            });

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
                var _result = _.find(_data, { reference_id: _refID.toString()});

                if (_action === 'preview-submitted-artwork') {

                    if (_result.parsedProperties.length > 0) {

                        var _file = _result.parsedProperties[0].file;
                        var _str = "<img style='max-width: 100%;' src ='" + _file + "' />";

                        ub.showModalTool(_str);

                    }

                }

                if (_action === 'preview-prepared-artwork') {



                }

            });

        // End Setup Events

        // Create Tooltips
            
            Tipped.create('span.tab');
            Tipped.create('span.link');
            Tipped.create('span[data-action="preview-submitted-artwork"]');
            Tipped.create('span[data-action="preview-prepared-artwork"]', { position: 'bottom' });
            Tipped.create('span[data-action="preview-in-customizer"]');

        // End Create Tooltips

    }

    ub.funcs.prepareCustomArtworkRequestsUI = function () {
    
        ub.funcs.prepareCustomArtworkRequestTable();

    }

    ub.funcs.displayMyCustomArtworkRequests = function () {

        $.ajax({
            
            url: ub.config.api_host + '/api/v1-0/logo_request/user_id/' + ub.user.id,
            type: "GET", 
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {

                ub.data.logo_request = response.logo_request;
                ub.funcs.processLogoRequests();
                ub.funcs.prepareCustomArtworkRequestsUI();
                
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
