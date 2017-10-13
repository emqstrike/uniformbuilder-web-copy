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
            //closeButton: false,
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

                if ($(this).hasClass('pending')) { return; }

                if (_action === 'preview-submitted-artwork') {

                    if (_result.parsedProperties.length > 0) {

                        var _file = _result.parsedProperties[0].file;
                        var _str = "<img style='max-width: 100%;' src ='" + _file + "' />";

                        ub.showModalTool(_str);

                    }

                }

                if (_action === 'preview-prepared-artwork') {

                    if (type === "pending") { return; }

                    var _parsedProperties = _result.parsedProperties[0];
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
