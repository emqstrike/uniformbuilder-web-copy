// Custom Artwork Requests
$(document).ready(function() {

    ub.funcs.initGuideSavedDesign = function () {

        // If the artwork has been processed already 

        if (ub.data.hasProcessedArtworks) {
            
            $('span.approve-reject-artwork-btn').show();
            $('div#order-status').html('Artwork Processed, please review the logo and press <br/ > the Approve / Reject Artwork button below to finalize <br/ > the artwork for submission.');
            $('div#order-status').show();

            $('div#order-status').attr('data-intro', 'This saved design has its artwork ready for your review.');
            $('div#order-status').attr('data-position', 'right');

            $('span.approve-reject-artwork-btn').attr('data-step', '2');
            $('span.approve-reject-artwork-btn').attr('data-position', 'right');
            $('span.approve-reject-artwork-btn').attr('data-intro', 'After reviewing the mascots, please click here to approve or reject, so we can make the necessary changes or if you approve we can submit this order for processing.');

            introJs().start();

        }

    }

    ub.funcs.initGuideOrder = function () {

        // If the artwork has been processed already 

        if (ub.data.hasProcessedArtworks) {
            
            $('span.approve-reject-artwork-btn').show();
            $('div#order-status').html('Artwork Processed, please review the logo and press the <br/ >Approve / Reject Artwork button below to finalize the artwork for submission.');
            $('div#order-status').show();

            $('div#order-status').attr('data-intro', 'This order has its artwork ready for your review.');
            $('div#order-status').attr('data-position', 'right');

            $('span.approve-reject-artwork-btn').attr('data-step', '2');
            $('span.approve-reject-artwork-btn').attr('data-position', 'right');
            $('span.approve-reject-artwork-btn').attr('data-intro', 'After reviewing the mascots, please click here to approve or reject, so we can make the necessary changes or if you approve we can submit this order for processing.');

            introJs().start();

        }

    }

    ub.funcs.updateSavedDesign = function () {

        ub.data.updateSaveDesignFromCustomArtworkRequest = true;

        ub['front_view'].visible = true;
        ub['left_view'].visible = true;
        ub['right_view'].visible = true;
        ub['back_view'].visible = true;

        ub.funcs.turnLocationsOff();
        ub.funcs.showSaveDialogBox();
        ub.funcs.cleanupsBeforeSave();

        $('img.front_view').attr('src', '');
        $('img.back_view').attr('src', '');
        $('img.left_view').attr('src', '');
        $('img.right_view').attr('src', '');

        ub.current_material.settings.thumbnails = {
            
            front_view: "",
            back_view: "",
            left_view: "",
            right_view: "",

        }

        ub.funcs.removeLocations();
        $(this).removeClass('zoom_on');

        ub.funcs.uploadThumbnailSaveDesign('front_view');
        ub.funcs.uploadThumbnailSaveDesign('back_view');
        ub.funcs.uploadThumbnailSaveDesign('left_view');
        ub.funcs.uploadThumbnailSaveDesign('right_view');

    };

    ub.funcs.updateOrder = function () {

        ub.data.updateOrderFromCustomArtworkRequest = true;

        ub['front_view'].visible = true;
        ub['left_view'].visible = true;
        ub['right_view'].visible = true;
        ub['back_view'].visible = true;

        ub.funcs.turnLocationsOff();
        ub.funcs.cleanupsBeforeSave();

        $('img.front_view').attr('src', '');
        $('img.back_view').attr('src', '');
        $('img.left_view').attr('src', '');
        $('img.right_view').attr('src', '');

        ub.current_material.settings.thumbnails = {
            
            front_view: "",
            back_view: "",
            left_view: "",
            right_view: "",

        }

        ub.funcs.removeLocations();
        $(this).removeClass('zoom_on');

        ub.funcs.uploadThumbnailSaveDesign('front_view');
        ub.funcs.uploadThumbnailSaveDesign('back_view');
        ub.funcs.uploadThumbnailSaveDesign('left_view');
        ub.funcs.uploadThumbnailSaveDesign('right_view');

        ub.funcs.initOrderProcess();

    };


    ub.funcs.updateLogoRequest = function () {

        var _url;
        var _propertyOverwrite;

         dialog = bootbox.dialog({
            title: 'Logo Request',
            message: 'Updating Logo Request...',
            size: 'large',
            //closeButton: false,
        });

        _url = ub.config.api_host + '/api/v1-0/logo_request/update';
        _propertyOverwrite = JSON.stringify(ub.data.logo_request.parsedProperties);

        delete ub.data.logo_request.parsedProperties;

        ub.data.logo_request.properties = JSON.parse(_propertyOverwrite);
        
        $.ajax({
            
            url: _url,
            type: "POST", 
            data: JSON.stringify(ub.data.logo_request),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            
            success: function (response) {

                // Update Saved Design if the custom artwork request if approved by the user without user rejections
                if (ub.data.logo_request.status === 'completed') { 

                    if (ub.config.pageType === "Saved Design") {
                        ub.funcs.updateSavedDesign();
                    }

                    if (ub.config.pageType === "Order") {
                        ub.funcs.updateOrder();
                    }

                }

                dialog.modal('hide');
                $('span.approve-reject-artwork-btn').fadeOut();
                $('div#order-status').fadeOut();

            }
            
        });

    }

    ub.funcs.approveRejectArtworkOrders = function (logoRequests, parsedProperties) {

        var _markup;
        var _dialog; 

        _markup = ub.utilities.buildTemplateString('#m-car-approve-dialog', { 
            artworks: parsedProperties,
            note: "Click the approve or reject button for the custom artwork request so that we can adjust the mascot if it was rejected or proceed to the order processing if everthing is ok. You can use the notes field to enter your comment to give the reason why you rejected the processed mascot.",
        });

        dialog = bootbox.dialog({
            title: 'Approve / Reject Artwork',
            message: _markup,
            size: 'large',
        });

        dialog.init( function () {

            $('span.approve').unbind('click');
            $('span.approve').on('click', function () {

                var _code = $(this).data('code');

                $('span.btn[data-code="' + _code +'"]').removeClass('active');
                $(this).addClass('active');

            });

            $('span.reject').unbind('click');
            $('span.reject').on('click', function () {

                var _code = $(this).data('code');

                $('span.btn[data-code="' + _code +'"]').removeClass('active');
                $(this).addClass('active');

            });

            $('span.btn.cancel').unbind('click');
            $('span.btn.cancel').on('click', function () {
                
                dialog.modal('hide')

            });

            $('span.btn.submit').unbind('click');
            $('span.btn.submit').on('click', function () {

                dialog.modal('hide');

                var _artWorksTemp = [];
                var _hasRejection = false;

                $('td.approve-reject').find('span.btn.active').each(function (index) {

                    var _code = $(this).data('code');
                    var _state = $(this).data('state'); 
                    var _item = _.find(parsedProperties, {code: _code.toString()});

                    if (typeof _item !== "undefined") {

                        _item.approved = _state === "approve" ? '1': '0';
                        _item.updated = 0;

                        if (_state === "reject") {
                            _item.user_rejected = '1';
                            _item.approved = -1;
                            _item.user_notes = $('textarea.notes[data-code="' + _code + '"]').val()

                            _hasRejection = true;
                        }

                        _item.user_notes = $('textarea[data-code="' + _code + '"]').val();
                        _artWorksTemp.push(_item);
                        
                    }

                });

                if (_hasRejection) {
                    ub.data.logo_request.status = 'user_rejected';
                } else { 
                    ub.data.logo_request.status = "completed";
                }

                ub.data.logo_request.parsedProperties = _artWorksTemp;
                ub.data.logo_request.properties =  JSON.stringify(_artWorksTemp);

                ub.funcs.updateLogoRequest();

            });

        });

    };

    ub.funcs.approveRejectArtworkSavedDesign = function (logoRequests, parsedProperties) {

        var _markup;
        var _dialog; 

        _markup = ub.utilities.buildTemplateString('#m-car-approve-dialog', { 
            artworks: parsedProperties,
            note: "Click the approve or reject button for the custom artwork request so that we can adjust the mascot if it was rejected or proceed to the order processing if everthing is ok. You can use the notes field to enter your comment to give the reason why you rejected the processed mascot.",
        });

        dialog = bootbox.dialog({
            title: 'Approve / Reject Artwork',
            message: _markup,
            size: 'large',
        });

        dialog.init( function () {

            $('span.approve').unbind('click');
            $('span.approve').on('click', function () {

                var _code = $(this).data('code');

                $('span.btn[data-code="' + _code +'"]').removeClass('active');
                $(this).addClass('active');

            });

            $('span.reject').unbind('click');
            $('span.reject').on('click', function () {

                var _code = $(this).data('code');

                $('span.btn[data-code="' + _code +'"]').removeClass('active');
                $(this).addClass('active');

            });

            $('span.btn.cancel').unbind('click');
            $('span.btn.cancel').on('click', function () {
                
                dialog.modal('hide')

            });

            $('span.btn.submit').unbind('click');
            $('span.btn.submit').on('click', function () {

                dialog.modal('hide');

                var _artWorksTemp = [];
                var _hasRejection = false;

                $('td.approve-reject').find('span.btn.active').each(function (index) {

                    var _code = $(this).data('code');
                    var _state = $(this).data('state'); 
                    var _item = _.find(parsedProperties, {code: _code.toString()});

                    if (typeof _item !== "undefined") {

                        _item.approved = _state === "approve" ? '1': '0';
                        _item.updated = 0;

                        if (_state === "reject") {
                            _item.user_rejected = '1';
                            _item.approved = -1;
                            _item.user_notes = $('textarea.notes[data-code="' + _code + '"]').val()

                            _hasRejection = true;
                        }

                        _item.user_notes = $('textarea[data-code="' + _code + '"]').val();
                        _artWorksTemp.push(_item);
                        
                    }

                });

                if (_hasRejection) {
                    ub.data.logo_request.status = 'user_rejected';
                } else { 
                    ub.data.logo_request.status = "completed";
                }

                ub.data.logo_request.parsedProperties = _artWorksTemp;
                ub.data.logo_request.properties =  JSON.stringify(_artWorksTemp);

                ub.funcs.updateLogoRequest();

            });

        });

    };

    ub.funcs.customArtworkRequestCheckSavedDesign = function (applicationObj) {

        var _logoRequest = undefined;

        if (typeof ub.data.logo_request !== "undefined") {

            _logoRequest = _.find(ub.data.logo_request.parsedProperties, { code: applicationObj.code });

            if (typeof _logoRequest !== "undefined") {

                ub.data.hasProcessedArtworks = (_logoRequest.mascot_id !== null) && (_logoRequest.approved !== "1") && (_logoRequest.user_rejected !== "1") || ub.data.logo_request.status === "for_review";
                
                if (ub.data.hasProcessedArtworks) {

                    var _mascot = ub.funcs.getMascotByID(_logoRequest.mascot_id);

                    ub.data.hasProcessedArtworks = ub.data.hasProcessedArtworks;
                    ub.config.orderArtworkStatus = 'artwork processed';

                    applicationObj.mascotOld = applicationObj.mascot;
                    applicationObj.mascot = _mascot;
                    applicationObj.preview = true;

                    ub.funcs.update_application_mascot(applicationObj.application, _mascot);

                    $('span.approve-reject-artwork-btn').fadeIn();

                    // Approve Artwork
                    $('span.approve-reject-artwork-btn').unbind('click');
                    $('span.approve-reject-artwork-btn').on('click', function () {
                        ub.funcs.approveRejectArtworkSavedDesign(ub.data.logo_request, ub.data.logo_request.parsedProperties);
                    });

                }

            }

        }

    }

    ub.funcs.customArtworkRequestCheckOrders = function (applicationObj) {

        var _logoRequest = undefined;

        if (typeof ub.data.logo_request !== "undefined") {

            _logoRequest = _.find(ub.data.logo_request.parsedProperties, { code: applicationObj.code });

            if (typeof _logoRequest !== "undefined") {

                ub.data.hasProcessedArtworks = (_logoRequest.mascot_id !== null) && (_logoRequest.approved !== "1") && (_logoRequest.user_rejected !== "1") || ub.data.logo_request.status === "for_review";

                if (ub.data.hasProcessedArtworks) {

                    var _mascot = ub.funcs.getMascotByID(_logoRequest.mascot_id);
                    ub.data.hasProcessedArtworks = ub.data.hasProcessedArtworks;

                    ub.config.orderArtworkStatus = 'artwork processed';

                    applicationObj.mascotOld = applicationObj.mascot;
                    applicationObj.mascot = _mascot;
                    applicationObj.preview = true;

                    ub.funcs.update_application_mascot(applicationObj.application, _mascot);

                    $('span.approve-reject-artwork-btn').fadeIn();

                    // Approve Artwork
                    $('span.approve-reject-artwork-btn').unbind('click');
                    $('span.approve-reject-artwork-btn').on('click', function () {
                        ub.funcs.approveRejectArtworkOrders(ub.data.logo_request, ub.data.logo_request.parsedProperties);
                    });

                }

            }

        }

    }

    ub.funcs.processLogoRequests = function () {

        var _processedLogoRequest = [];

        _.each(ub.data.logo_request, function (lr) {

            lr.parsedProperties = JSON.parse(lr.properties);

            // use only records with properties 
            if (lr.parsedProperties.length > 0) { _processedLogoRequest.push(lr); }

        });

        ub.data.logo_request = _processedLogoRequest;

        // a style is loaded, limit logo request to saved design id, if not load all custom logo requests for the current user
        if (ub.config.material_id !== -1) {
            
            if (ub.config.pageType === "Saved Design") {
                ub.data.logo_request = _.find(ub.data.logo_request, { reference_id: ub.config.savedDesignInfo.savedDesignID });
            }

            if (ub.config.pageType === "Order") {
                ub.data.logo_request = _.find(ub.data.logo_request, { reference_id: ub.config.orderCode });
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

    ub.funcs.initPreviewCanvas = function (mascotObj) {

        ub.current_material.settings.team_colors = [];

        var create_sprite = function (filename) {
            return new PIXI.Sprite(PIXI.Texture.fromImage(filename + '?v=' + (new Date() / 1000)));
        };

        var changeMascotColor = function (colorObj, layer_no) {}

        var changeActiveColorSmallColorPicker = function (_layer_no, _color_code, _colorObj, type) {

            var $smallPickerContainer   = $('div.smallPickerContainer[data-layer-no="' + _layer_no + '"]');
            var _checkMark              = '<i class="fa fa-check" aria-hidden="true"></i>';
            var _checkMarkNone          = '<i class="fa fa-ban" aria-hidden="true"></i>';
            var _type = type;

            if (typeof type === "undefined") {

                _type = '';

            } else {

                _type = '[data-object-type="' + type + '"]';

            }

            var $colorItems = $smallPickerContainer.find('span.colorItem' + _type).not('.turnOff').not('[data-color-code="none"]');

            $colorItems.html('&nbsp;');
            $colorItems.css('width','25px');
            $colorItems.removeClass('activeColorItem');

            var $activeColorItem = $smallPickerContainer.find('span.colorItem' + _type + '[data-color-code="' + _color_code + '"]').not('.turnOff');

            $activeColorItem.addClass('activeColorItem');
            $activeColorItem.css('width','40px');
            
            if (_color_code === "none") {

                $activeColorItem.html(_checkMarkNone);
                $activeColorItem.css('color', '#000');

            } else {
                
                $activeColorItem.css('color', '#fff');
                $activeColorItem.html(_checkMark);

                $smallPickerContainer.find('span.colorItem' + _type + '[data-color-code="none"]').css('color', '#eee').css('width','25px');

            }

        }

        var changeMascotColor = function (colorObj, layer_no) {

           var _layer = ub.preview_layers['layer_' + layer_no];
           _layer.tint = parseInt(colorObj.hex_code, 16);

        }

        var _setupSmallColorPickerEvents = function () {

            $('span.colorItem').on('click', function () {

                var _layer_no   = $(this).data('layer-no');
                var _color_code = $(this).data('color-code');
                var _layer_name = $(this).data('layer-name');
                var _temp = $(this).data('temp');
                var _colorObj = ub.funcs.getColorByColorCode(_color_code);

                changeMascotColor(_colorObj, _layer_no);
                ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

            });

        }

        // Create Small Color Picker
        var createSmallColorPickers = function (activeColorCode, layer_no, layer_name, active_color, objectType) {

            var _html       = "";
            var _cObj       = ub.funcs.getColorByColorCode(activeColorCode);
            var _teamColors = ub.data.colors;
            var _objectType  =  objectType;

            if (typeof objectType === "undefined") { _objectType = 'not-set'; }

            _html = '<div class="smallPickerContainer" data-layer-no="' + layer_no + '">';
            _html += '<label class="smallColorPickerLabel" >' + layer_name + ' </label>';

            _teamColors = _.sortBy(_teamColors, "order");

            _.each(_teamColors, function (_color) {

                var _checkMark  = '&nbsp;';
                var _style      = "25px";
                var _class      = '';
                var _colorObj   = '';

                if (activeColorCode === _color.color_code) {
                    _checkMark  = '<i class="fa fa-check" aria-hidden="true"></i>';
                    _style      = "40px";
                    _class      = 'activeColorItem';
                }

                _colorObj = ub.funcs.getColorByColorCode(_color.color_code);
                _html += '<span style="width: ' + _style + ';background-color: #' + _colorObj.hex_code + '; color: #' + _colorObj.forecolor + ';" class="colorItem ' + _class + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type=' + _objectType + '>' + _checkMark + '</span>';

            });

            _html += '</div>';

            return _html;

        }

        // End Create Small Color Picker

        var _width = 348;
        var _height = 348;
        var _previewCanvasID = 'preview-canvas';
        var _canvas = document.getElementById(_previewCanvasID);
        var _stage = new PIXI.Container();
        var _renderer = PIXI.autoDetectRenderer(_width, _height, {transparent: false}, false);
        
        _renderer.backgroundColor = 0xf7f7f7;

        if (typeof _renderer !== "undefined" && _canvas !== null) {
            _canvas.appendChild(_renderer.view);
        }

        ub.preview_layers = [];

        _.each(mascotObj.parsedLayersProperties, function (layer, index) {

            ub.current_material.settings.team_colors.push(ub.funcs.getColorByColorCode(layer.default_color));

            var _sprite = create_sprite(layer.filename);
            var _colorObj = _.find(ub.data.colors, {color_code: layer.default_color});

            _stage.addChild(_sprite);
            _sprite.tint = parseInt(_colorObj.hex_code, 16);
            _sprite.width = 348;
            _sprite.height = 348;
            _sprite.position = {x: _width / 2, y: _height / 2};
            _sprite.anchor.set(0.5,0.5);

            ub.sp = _sprite;
            ub.st = _stage;

            ub.preview_layers['layer_' + index] = _sprite;

            var _html = createSmallColorPickers(layer.default_color, layer.layer_number, 'Layer ' + layer.layer_number, layer.default_color, 'Mascot');

            $.when($('div.color-pickers').append(_html)).then(_setupSmallColorPickerEvents());

        });

        var _render_frames = function () {

            _renderer.render(_stage);
            requestAnimationFrame(_render_frames);

        }

       requestAnimationFrame(_render_frames);

    };

    ub.funcs.initMascotRealTimePreview = function (mascotObj, reference_id) {

        var _markup = ub.utilities.buildTemplateString(
            '#m-custom-artwork-requests-mascot-preview', { 
            mascot: mascotObj,
        });

        var dialog = bootbox.dialog({
            title: 'Realtime Mascot Preview',
            message: _markup,
            size: 'large',
            closeButton: false,
        });

        dialog.init(function() {

            // Load Layers

                mascotObj.parsedLayersProperties = JSON.parse(mascotObj.layers_properties);
                ub.funcs.initPreviewCanvas(mascotObj);

            // End Load Layers 

            $('span.btn.close').unbind('click');
            $('span.btn#close').on('click', function () {

                var _btn = $('span[data-action="preview-prepared-artwork"][data-reference-id="' +  reference_id + '"]');
                _btn.html('Preview Processed Mascot');
                dialog.modal('hide');

            });

        });

    }

    ub.funcs.prepareCustomArtworkRequestTable = function (type) {

        $('div.my-custom-artwork-requests-loading').hide();

        if (typeof type !== "undefined") { 

            _data = _.filter(ub.data.logo_request, function (lrequest) {

                var _status = lrequest.status === type;

                if (type === "pending") {

                    _status = lrequest.status === type || lrequest.status === "user_rejected"; // Include user rejected on pending tab

                }

                return _status;

            });

        }

        _markup = ub .utilities.buildTemplateString('#m-custom-artwork-requests', {
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

                ub.dialog.confirm("Leave this page and load " + _type.toTitleCase() + " " + _refID + ", continue?", function (result) { 
                    if (result) {
                        window.location = _url;
                    }
                });

            });

            var $spanPreview = $('span[data-btn-type="preview"]');
            $spanPreview.unbind('click');
            $spanPreview.on('click', function () {

                var _refID = $(this).data('reference-id');
                var _action = $(this).data('action');
                var _result = _.find(_data, { reference_id: _refID.toString()});
                var _code = $(this).data('code');
                var _record;

                if (typeof _code !== "undefined") {
                    _record = _.find(_result.parsedProperties, {code: _code.toString()});    
                }
                
                if ($(this).hasClass('pending')) { return; }

                if (_action === 'preview-submitted-artwork') {

                    if (_result.parsedProperties.length > 0) {

                        var _file = _record.file;
                        var _str = "<img style='max-width: 100%;' src ='" + _file + "' />";

                        ub.showModalTool(_str);

                    }

                }

                if (_action === 'preview-prepared-artwork') {

                    if (type === "pending") { return; }

                    var _parsedProperties = _record;
                    var _mascotID = _parsedProperties.mascot_id;

                    $(this).html('Loading <img src="/images/loading.gif" style="width: 20px"/>');

                    var _url = ub.config.api_host + '/api/mascot/' + _mascotID;
                    ub.funcs.callAPI(_url, function (response) {

                        var _mascot = response.mascot.mascot;

                        if (typeof _mascot !== "undefined") {

                            ub.funcs.initMascotRealTimePreview (_mascot, _refID);

                        }

                    });

                }

                if (_action === "preview-in-customizer") {

                    var _refID = $(this).data('reference-id');
                    var _type = $(this).data('type');
                    var _url = '';
                    
                    if (_type === "order") { _url = ub.config.host + '/order/' + _refID; }
                    if (_type === "saved_design") { _url = ub.config.host + '/my-saved-design/' + _refID; }

                    ub.dialog.confirm("Leave this page and load " + _type.toTitleCase() + " " + _refID + ", continue?", function (result) { 
                        if (result) {
                            window.location = _url;
                        }
                    });

                }

            });

        // End Setup Events

        // Create Tooltips

            Tipped.create('a.btn');
            Tipped.create('span.tab');
            Tipped.create('span.link');
            Tipped.create('span[data-action="preview-submitted-artwork"]');
            Tipped.create('span[data-action="preview-prepared-artwork"]', { position: 'bottom' });
            Tipped.create('span[data-action="preview-in-customizer"]');

        // End Create Tooltips

    }

    ub.funcs.prepareCustomArtworkRequestsUI = function () {
        ub.funcs.prepareCustomArtworkRequestTable('for_review');
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

    ub.funcs.callAPI = function (url, callback) {

        $.ajax({
            
            url: url,
            type: "GET", 
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {

                callback(response);

            }

        });

    }

    ub.funcs.preparePrerequisites = function () {

        ub.data.colors = [];

        ub.funcs.callAPI(window.ub.config.api_host + '/api/colors/', function (response) {

            ub.data.colors = response.colors;
            ub.funcs.prepareColors();

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
        ub.funcs.preparePrerequisites();

    }
    
});
