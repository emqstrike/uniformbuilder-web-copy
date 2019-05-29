
/**
 * ApplicationUtilities.js
 * - handler for the application helper function
 * @since March 26, 2019
 * @author 
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  Helper for application(Names, Letters, Logo) panel 
 */

$(function() {
    ub.funcs.activateApplicationsLetters = function (application_id) {
        ub.funcs.beforeActivateApplication();
        if ($('div#primaryPatternPopup').is(':visible')) {
            return;
        }
        if ($('div#primaryMascotPopup').is(':visible')) {
            return;
        }

        ub.funcs.beforeActivateApplication();

        if (!ub.funcs.okToStart()) {
            return;
        }
        
        ub.funcs.activatePanelGuard();
        
        if (ub.funcs.isBitFieldOn()) {

            var _marker = _.find(ub.data.markerBitField, {value: true});

            if (_marker.code.toString() !== application_id.toString()) {
                return;
            }

        }

        $('div#changeApplicationUI').remove();
        var _id = application_id.toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});

        if (typeof _settingsObject === "undefined") {
            return;
        }
    
        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);
    
        var _applicationType = _settingsObject.application_type;
        var _title = _applicationType.toTitleCase();
        var _sampleText = _settingsObject.text;
        var _sizes;
        var _uniformCategory = ub.current_material.material.uniform_category
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(_id);
    
        if (_uniformCategory === "Football") {
    
            _sizes = ub.funcs.getApplicationSizes(_applicationType);
    
        } else if (ub.current_material.material.uniform_category === "Baseball") {
    
            _sizes = ub.funcs.getApplicationSizes(_applicationType, 'baseball');
    
        } else if (_uniformCategory !== "Football" && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {
    
            _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);
    
        } else {
    
            ub.utilities.warn('no sizes setting defaulting to generic');
            _sizes = ub.funcs.getApplicationSizes(_applicationType);
    
        }
    
        // New application sizes values from backend
        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _id);
    
        if (typeof _sizesFromConfig !== "undefined") {
    
            // Debug Info
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
    
                console.log('Default Sizes: ');
                console.log(_sizes);
                console.log('Application #: ');
                console.log(_id);
    
                ub.utilities.info('Using sizes from backend: ');
    
                console.log(_sizesFromConfig);
                console.log(_sizesFromConfig.sizes);
                //console.log(_.pluck(_sizesFromConfig.sizes, "size"));
    
                // add sort for sizes
                _sizesSorted = _.sortBy(_sizesFromConfig.sizes, function (obj) {
                    return parseFloat(obj.size)
                });
                _sizesFromConfig.sizes = _sizesSorted;
    
                _sizes = _sizesFromConfig;
    
            }
    
        } else {
    
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
    
                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);
    
                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _id + " don't have application sizes settings on the backend.");
    
            }
    
        }
    
        if (_applicationType === 'mascot' || _applicationType === "embellishments") {
    
            ub.funcs.activateApplicationsMascots(_id);
            return;
    
        }
    
        var _fontObj = _settingsObject.font_obj;
        var _fontName = _fontObj.name;
        var _fontCaption = _fontObj.caption;
        var _accentObj = _settingsObject.accent_obj;
        var _accentName = _accentObj.title;
        var _accentFilename = _accentObj.thumbnail;
        var _patternName = 'None';
        var _patternFilename = 'none.png';
        var _colorArray = _settingsObject.color_array;
        var _colorArrayString = '';
        var _generateSizes = '';
        var _thumbIcon = '/images/sidebar/' + _accentFilename;
        var _colorPickers = '';
    
        ub.updateApplicationSpecsPanel(_id);
    
        _.each(_colorArray, function (_color) {
    
            if (typeof _color !== "undefined") {
    
                _colorArrayString += '<span style="color: #' + _color.hex_code + '" class="color-string">' + _color.color_code + "</span>, ";
    
            }
    
        });
    
        var n = _colorArrayString.lastIndexOf(",");
        var _colorArrayString = _colorArrayString.substring(0, n)
        var _htmlBuilder = "";
        var _appActive = 'checked';
        var _maxLength = ub.data.maxLength;
    
        if (_settingsObject.type.indexOf('number') !== -1) {
            _maxLength = ub.data.maxLengthNumbers;
        }
        if (ub.config.uniform_application_type === 'sublimated') {
            _maxLength = ub.data.maxLengthSublimated;
        }
    
        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') {
            _status = _settingsObject.status;
        }
    
        var _label = 'Size';
        var _class = '';
    
        if (_isFreeFormEnabled) {
            _label = 'Measurements';
            _class = "custom";
        }
    
        if (typeof _settingsObject.font_size === 'undefined') {
    
            if (application_id !== 2 || application_id !== 5) {
    
                _settingsObject.font_size = 4;
    
            } else {
    
                _settingsObject.font_size = 10;
    
            }
    
        }
    
        _generateSizes = ub.funcs.generateSizes(_applicationType, _sizes.sizes, _settingsObject, application_id);
    
        var _isBaseballFastpitch = false;
        if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {
    
            _isBaseballFastpitch = true;
    
        }
    
        _.each(_settingsObject.accent_obj.layers, function (layer) {
    
            var _hexCode = layer.default_color;
            var _color = ub.funcs.getColorObjByHexCode(_hexCode);
            var _layerNo = layer.layer_no - 1;
    
            if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') {
                return;
            }
    
            _color = _settingsObject.color_array[_layerNo];
    
            // Use default color if team color is short
            if (typeof _color === "undefined") {
    
                _hexCode = layer.default_color;
                _color = ub.funcs.getColorObjByHexCode(_hexCode);
    
                ub.utilities.error('Undefined color found here!!!');
    
            }
    
            if (typeof _color !== 'undefined') {
    
                _colorPickers += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_no, layer.name, layer.default_color, 'accent');
    
            } else {
    
                util.error('Hex Code: ' + _hexCode + ' not found!');
    
            }
        });
    
        var _tailSweepObject = _settingsObject.tailsweep;
    
        if (typeof _tailSweepObject === "undefined" || _tailSweepObject.code === "none") {
    
            _tailSweepObject = {code: 'none', thumbnail: 'none.png'};
        }
    
        var _tailSweepPanel = ''
        if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {
            _isBaseballFastpitch = true;
            _tailSweepThumb = '/images/tailsweeps/thumbnails/' + _tailSweepObject.thumbnail;
            _tailSweepCode  = _tailSweepObject.code;
            _tailSweepPanel = ub.funcs.tailSweepPanel(_tailSweepThumb, _tailSweepCode);
        }
    
        var templateData = {}

        var isPlayerName = _applicationType === "player_name" ? 'disabled' : '';
        // set the needed data for LETTERS here
        templateData.applications = {
            type: _settingsObject.application.name.toUpperCase(),
            defaultText: _settingsObject.text,
            code: _settingsObject.code,
            perspective: _settingsObject.application.views[0].perspective,
            placeholder: 'Your ' + _settingsObject.application.name.toLowerCase(),
            fonts: true,
            fontsData: ub.funcs.fontStyleSelection(_settingsObject, _settingsObject.application.name.toUpperCase()),
            slider: true,
            sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
            colorPicker: true,
            colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE FONT COLOR'),
            accents: true,
            accentsData: ub.funcs.fontAccentSelection(_settingsObject, 'CHOOSE FONT ACCENT'),
            isPlayerName: isPlayerName
        }

        _htmlBuilder = '';

        if (_applicationType === 'front_number' || _applicationType === 'back_number' || _applicationType === 'sleeve_number') {
            _htmlBuilder = ub.utilities.buildTemplateString('#m-reinit-application-numbers', templateData);
        } else if (_applicationType === 'team_name' || _applicationType === 'player_name') {
            _htmlBuilder = ub.utilities.buildTemplateString('#m-reinit-application', templateData);
        }

        var appBlock = $('.modifier_main_container').find('li[data-application-id="' + _settingsObject.code + '"].applicationUIBlockNew');

        if (appBlock.length === 0) {
            // New application
            $('.modifier_main_container').append(_htmlBuilder);
            setTimeout(function () { $('.modifier_main_container').scrollTo($('li[data-application-id=' + _settingsObject.code + '].applicationUIBlockNew')) }, 500)
        } else {
            // Existing application
            appBlock.html("");
            appBlock.html(_htmlBuilder)
        }

        /// Applications Color Events

        ub.funcs.setupTextSmallColorPickerEvents(_settingsObject);

        /// End Application Pattern Events

        /// Applications Pattern Events

        ub.funcs.setupPatternsAndSmallColorPickerEvents(_settingsObject);

        /// End Application Pattern Events

        /// Application Manipulator Events

        ub.funcs.setupManipulatorEvents(_settingsObject, _applicationType);

        /// End Application Manipulator Events

        ub.funcs.activateMoveTool(application_id);
        ub.funcs.activateLayer(application_id);

        /// End Initialize

        // re-initialize template
        ub.funcs.initializer();
        ub.funcs.afterActivateApplication(application_id);
    };

    // Build template for font accent selection
    ub.funcs.fontAccentSelection = function (_settingsObject, _title) {
        var _accents = []
        _.map(ub.data.accents.items, function (j) {
            var acc = {
                'thumbnail': '/images/sidebar/' + j.thumbnail,
                'id': j.id,
                'code': j.code,
                'title': j.code.replace(/_/g, " "),
                'active': _settingsObject.accent_obj.id === j.id ? 'active' : '',
                'activeCheck': _settingsObject.accent_obj.id === j.id ? '<i class="fa fa-check cp-fc-white fa-2x uk-overlay-primary" aria-hidden="true"></i>' : ''
            }

            _accents.push(acc);
        })

        var templateData = {
            accentsData: _accents,
            title: _title
        }
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-font-accents-container', templateData);

        return _htmlBuilder;
    };

    // Build template for font style selection
    ub.funcs.fontStyleSelection = function (_settingsObject, _type) {
        var templateData = {
            type: _type,
            fontStyle: _settingsObject.font_obj.name,
            fontCaption: _settingsObject.font_obj.caption,
            code: _settingsObject.code
        }

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-font-styles-container', templateData);

        return _htmlBuilder;
    };

    // Build template for "Add New Application"
    ub.funcs.getNewApplicationContainer = function (_title, _designType) {
        var templateData
        // Check if has sleeve
        var hasSleeve = _.find(ub.funcs.getFreeFormLayers(), {name: "Sleeve"});
        
        // Disregard Sleeve
        var parts = _.filter(ub.funcs.getFreeFormLayers(), function(index) {
            if (index.name !== "Sleeve") {
                return index;
            }
        });

        if (! ub.funcs.isTackleTwill()) {
            var types = [];
            var isShow;
            if(_designType === 'letters') { 
                types.push({
                    type: 'team_name',
                    name: 'Team Name',
                });

                types.push({
                    type: 'player_name',
                    name: 'Player Name',
                });
                isShow = true;
            } else if (_designType === 'numbers') {
                types.push({
                    type: 'player_number',
                    name: 'Player Number',
                });

                isShow = false;
            } else if (_designType === 'mascots') {
                types.push({
                    type: 'mascot',
                    name: 'Stock',
                });
                types.push({
                    type: 'embellishments',
                    name: 'Custom',
                });
                isShow = true;
            }

            templateData = {
                isTwill: false,
                title: _title,
                designType: true,
                designTypeData: types,
                perspective: true,
                part: true,
                side: true,
                partsData: parts,
                hasSleeve: typeof hasSleeve !== "undefined" ? hasSleeve.length === 0 ? false : true : false,
                isShow: isShow,
                type: _designType
            }
        } else {
            templateData = {
                isTwill: true,
                title: _title,
                disabled: 'disabled',
                type: _designType
            };
        }
        return templateData;
    };

    ub.funcs.activateApplicationsMascots = function (application_id) {
        if (ub.funcs.popupsVisible()) {
            return;
        }
        if (!ub.funcs.okToStart()) {
            return;
        }

        var _id = application_id.toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
        var _applicationType = _settingsObject.application_type;
        var _uniformCategory = ub.current_material.material.uniform_category;
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _sizes = ub.funcs.getApplicationSizes('mascot', _alias.alias);
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(_id);

        if (_applicationType === "embellishments") {
            ub.funcs.extractEmbellishmentColors(application_id);
        }

        ub.funcs.activatePanelGuard();

        var _appInfo = ub.funcs.getApplicationSettings(application_id);

        ub.funcs.activateMoveTool(application_id);

        if (_appInfo.application_type !== "mascot" && _appInfo.application_type !== "embellishments") {

            ub.funcs.activateApplicationsLetters(application_id);
            return;
        }

        if (ub.funcs.isBitFieldOn()) {
            var _marker = _.find(ub.data.markerBitField, {value: true});

            if (_marker.code.toString() !== application_id.toString()) {
                return;
            }
        }

        $('div#changeApplicationUI').remove();

        if (ub.funcs.isCurrentSport('Football')) {

            if (_id === '2' && _applicationType === 'mascot' || _applicationType === 'embellishments') {
                _sizes = ub.funcs.getApplicationSizes('mascot_2');
            }

            if (_id === '5' && _applicationType === 'mascot' || _applicationType === 'embellishments') {
                _sizes = ub.funcs.getApplicationSizes('mascot_5');
            }

        } else if (ub.current_material.material.uniform_category === "Wrestling") {

            _sizes = ub.funcs.getApplicationSizes('mascot_wrestling');

        } else if (!ub.funcs.isCurrentSport('Football') && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {

            if (ub.funcs.isCurrentType('upper')) {

                _sizes = ub.data.applicationSizes.getSizes(_alias.alias, 'mascot', parseInt(application_id));

            } else if (ub.funcs.isCurrentType('lower') && ub.funcs.isSocks()) {

                _sizes = ub.funcs.getApplicationSizes('mascot', _alias.alias, _id);

            } else {

                _sizes = ub.funcs.getApplicationSizesPant('mascot', _alias.alias, _id);
            }

        } else {
            console.warn('no sizes setting defaulting to generic');
            _sizes = ub.funcs.getApplicationSizes('mascot');
        }

        // New application sizes values from backend
        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _id);

        if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
            ub.utilities.info('===>Using sizes from backend: ');
            console.log('Default Sizes: ');
            console.log(_sizes);
            console.log('Application #: ');
            console.log(_id);

            if (ub.data.mascotSizesFromBackend.isValid(ub.config.sport) && typeof _sizesFromConfig !== "undefined") {
                console.log("SIZE FROM CONFIG===>", _sizesFromConfig);
                console.log(_sizesFromConfig.sizes);
                console.log(_.pluck(_sizesFromConfig.sizes, "size"));
                _sizes = _sizesFromConfig;
            }
        } else {
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);
                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _id + " don't have application sizes settings on the backend.");
            }
        }

        if (_applicationType === "mascot") {
            var _mascotObj = _settingsObject.mascot;
            var _mascotName = _mascotObj.name;
            var _thumbIcon = _mascotObj.icon;
            var _colorPickers = '';
            var _appActive = 'checked';
            var _maxLength = 12;
        } else if (_applicationType === "embellishments") {
            var _embellishmentObj   = _settingsObject.embellishment;
            var _mascotName         = _embellishmentObj.design_id;
            var _mascotIcon         = _embellishmentObj.thumbnail;
        }
        var _currentSize = _settingsObject.size;
        var _colorArray = _settingsObject.color_array;
        var _title = _applicationType.toTitleCase();
        var _htmlBuilder = '';
        var _generateSizes = '';
        var _appActive = 'checked';
        var _maxLength = 12;

        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);

        if (_settingsObject.type.indexOf('number') !== -1) {
            _maxLength = 2;
        }

        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') {
            _status = _settingsObject.status;
        }

        var _label = 'Size', _class = '';
        if (_isFreeFormEnabled) {
            _label = 'Measurements';
            _class = "custom";
        }

        var _inputSizes;

        if(_applicationType === "mascot") {
            if (_id === '4' && ub.config.sport !== "Football 2017") {
                _inputSizes = [{size: '0.5',}];
            } else {
                _inputSizes = _.sortBy(_sizes.sizes, function (obj) {
                    return parseFloat(obj.size)
                });
            }
        } else if (_applicationType === "embellishments") {
            if (_id === '4') {
                _inputSizes = [{size: '0.5', }];
            } 
            else {
                _inputSizes = _sizes.sizes;
            }
        }

        

        if (typeof _settingsObject.size === 'undefined') {
            if (application_id !== 2 || application_id !== 5) {
                _settingsObject.size = 4;

                if (_applicationType === "embellishments") {
                    _settingsObject.font_size = _settingsObject.size;
                }
            } else {
                _settingsObject.size = 10;
                
                if (_applicationType === "embellishments") {
                    _settingsObject.font_size = _settingsObject.size;
                }
            }

            if (application_id === 4) {
                _settingsObject.size = 0.5;

                if (_applicationType === "embellishments") {
                    _settingsObject.font_size = _settingsObject.size;
                }
            }

        }
        var _isSublimated = false;
        if (ub.config.uniform_application_type === "sublimated") {
            _isSublimated = true;
        }
        var _templateStrManipulators = ub.funcs.updateManipulatorsPanel(_settingsObject);
        var objMascot = {};

        if (_applicationType === "mascot") {
            _generateSizes += ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);
        
            var _isCustomLogo = false, _customFilename = '';
            if (_settingsObject.mascot.name === 'Custom Logo') {
                _isCustomLogo = true;
                _customFilename = _settingsObject.customFilename;
            }

            if (ub.current_material.settings.applications[application_id].mascot.id !== "1039") {
                _.each(_settingsObject.mascot.layers_properties, function (layer) {
                    var _hexCode = layer.default_color;
                    var _color = ub.funcs.getColorByColorCode(_hexCode);

                    if (typeof _color !== 'undefined') {
                        _colorPickers += ub.funcs.createSmallColorPickers(_color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color, 'mascots');
                    } else {
                        util.error('Hex Code: ' + _hexCode + ' not found!');
                    }
                });
            }

            objMascot = {
                thumbnail: _settingsObject.mascot.icon,
                type: 'STOCK MASCOT',
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                name: _settingsObject.mascot.name,
                slider: true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code, "Logo"),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE STOCK MASCOT COLORS'),
                isEmbellishment: false,
            };
        
        } else if (_applicationType === "embellishments") {
            _generateSizes = ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);

            var _embellishmentSidebar = ub.utilities.buildTemplateString('#m-embellishment-sidebar', {});
            objMascot = {
                thumbnail: _settingsObject.embellishment.png_filename,
                type: 'CUSTOM LOGO',
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                name: _settingsObject.embellishment.name,
                viewArtDetails: ub.config.host + '/utilities/preview-logo-information/' + _settingsObject.embellishment.design_id,
                viewPrint: _settingsObject.embellishment.svg_filename,
                slider: true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code, "Logo"),
                isEmbellishment: true,
            };
        }
       
        var templateData = {}
        templateData.applications = objMascot;
        _htmlBuilder = ub.utilities.buildTemplateString('#m-reinit-application-mascots', templateData);

        var appBlock = $('.modifier_main_container').find('li[data-application-id="' + _settingsObject.code + '"].applicationUIBlockNew');
        if (appBlock.length === 0) {
            // New application
            $('.modifier_main_container ul.application-container').append(_htmlBuilder);
            setTimeout(function () { $('.modifier_main_container').scrollTo($('li[data-application-id=' + _settingsObject.code + '].applicationUIBlockNew')) }, 100)
        } else {
            // Existing application
            appBlock.replaceWith(_htmlBuilder);
        }


        $('a.view-file').unbind('click');
        $('a.view-file').on('click', function () {
            var _file = $(this).data('file');
            var _extension = util.getExtension(_file);
            var _str = "";

            if (_extension === "pdf" || _extension === "ai") {
                _str += "Open File (" + _extension + ") on a new window<br />";
                _str += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";
            } else {
                _str += "<img style='width: 100%;' src ='" + _file + "' /> <br />";
                _str += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";
            }

            ub.showModalTool(_str);
        })

        // Events

        // Opacity Slider
        var _from = 100;

        $('input#opacity-slider').show();

        if (typeof $("#opacity-slider").destroy === "function") {
            $("#opacity-slider").destroy();
        }

        $("#opacity-slider").ionRangeSlider({
            min: 0,
            max: 100,
            from: typeof _settingsObject.alpha === "number" ? _settingsObject.alpha * 100 : 100,
            onChange: function (data) {
                ub.funcs.changeMascotOpacity(_settingsObject.code, data.from);
            },
        });
        // End Opacity Slider

        // In-place preview
        var _objName = _applicationType === "mascot" ? _mascotObj.name : _embellishmentObj.name;
        if (_objName === 'Custom Logo' && typeof _settingsObject.customFilename !== "undefined") {
            var _filename = _settingsObject.customFilename;
            var _extension = _filename.split('.').pop();
            $prevImage = $('span.accentThumb > img');

            if (_extension === 'gif' || _extension === 'jpg' || _extension === 'bmp' || _extension === 'png' || _extension === 'jpeg') {
                $prevImage.attr('src', _filename);
            } else if (_extension === 'pdf') {
                $prevImage.attr('src', '/images/uiV1/pdf.png');
            } else if (_extension === 'ai') {
                $prevImage.attr('src', '/images/uiV1/ai.png');
            }
        }

        /// Application Manipulator Events
        ub.funcs.setupManipulatorEvents(_settingsObject, _applicationType);

        /// End Application Manipulator Events
        ub.funcs.updateCoordinates(_settingsObject);

        var s = ub.funcs.getPrimaryView(_settingsObject.application);
        var sObj = ub.funcs.getPrimaryViewObject(_settingsObject.application);

        if (typeof sObj.application.flip !== "undefined") {
            if (sObj.application.flip === 1) {
                $('span.flipButton').addClass('active');
            } else {
                $('span.flipButton').removeClass('active');
            }
        } else {
            $('span.flipButton').removeClass('active');
        }

        var _matchingID = undefined;

        _matchingID = ub.data.matchingIDs.getMatchingID(_id);
        if (typeof _matchingID !== "undefined") {

            ub.funcs.toggleApplication(_matchingID.toString(), _status);

        }
        // End Events
        ub.funcs.activateMoveTool(application_id);
        ub.funcs.activateLayer(application_id);
        ub.funcs.toggleApplication(_id, _status);

        if (_applicationType === "mascot") {
            ub.funcs.afterActivateMascots(_id);
        }

        ub.funcs.initializer();
    };

    ub.funcs.toggleApplicationOpts = function (application_id, status) {
        var _settingsObj = ub.funcs.getApplicationSettings(parseInt(application_id));
        // Consider deleted locations
        if (typeof _settingsObj === "undefined") {
            return;
        }

        var _views = _settingsObj.application.views;

        _.each(_views, function (view) {
            var _view = view.perspective + '_view';
            var _obj = ub.objects[_view]['objects_' + application_id];

            if (typeof _obj === "undefined") {
                return;
            }

            if (status === "on") {
                _obj.zIndex = -(ub.funcs.generateZindex('applications') + _settingsObj.zIndex);
                _settingsObj.status = "on";

                if (_settingsObj.application_type !== "embellishments" && _settingsObj.application_type !== "mascot") {
                    ub.funcs.changeFontFromPopup(_settingsObj.font_obj.id, _settingsObj);
                }
                ub.updateLayersOrder(ub[_view]);
            } else {
                _obj.oldZIndex = _obj.zIndex;
                _obj.zIndex = 0;
                ub.updateLayersOrder(ub[_view]);
                _settingsObj.status = "off";
            }
        });
    };

    ub.funcs.activateMascotColors = function (application_id) {
        var _appSettings = ub.current_material.settings.applications[application_id];
        var _noOfLayers = _.size(_appSettings.mascot.layers_properties); // -1 becuase one of the layers is just a duplicate for the mask
        var _noOfColors = ub.current_material.settings.applications[application_id].color_array.length;

        _.each(_appSettings.color_array, function (color, index) {
            if (typeof color === "undefined") {
                return;
            }

            var _layerNo = index + 1;

            if (_layerNo > _noOfLayers) {
                return;
            }

            $(".con-palettes button.colorItem[data-layer-no='" + _layerNo + "'][data-color-code='" + color.color_code + "'][data-id='" + application_id + "']").trigger("click");
        });

        // Handle Non-Existent colors
        if (_noOfLayers > _noOfColors) {
            var _diff = _noOfLayers - _noOfColors;

            for (i = _noOfColors + 1; i <= _noOfColors + _diff; i++) {
                var _mascotSettingsLayer = _.find(_appSettings.mascot.layers_properties, {layer_number: i.toString()});
                var _color = _.find(ub.data.secondaryColorPalette, {color_code: _mascotSettingsLayer.default_color});

                if (typeof _color !== "undefined") {
                    $(".con-palettes button.colorItem[data-layer-no='" + i + "'][data-color-code='" + _color.color_code + "'][data-id='" + application_id + "']").trigger("click");
                } else {
                    ub.utilities.warn('Team Color ' + _teamColorID + " not found, using first team color for mascot");
                    _color = _.first(ub.data.secondaryColorPalette)

                    $(".con-palettes button.colorItem[data-layer-no='" + i + "'][data-color-code='" + _color.color_code + "'][data-id='" + application_id + "']").trigger("click");
                }
            }
        }
    };

    // Currently for Letters and Mascots only
    ub.funcs.activateApplicationsAll = function (application_id) {
        var _id = application_id.toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});
        var _applicationType = _settingsObject.application_type;

        var isLetters = _applicationType === "player_name" || _applicationType === "team_name" ? true : false;
        var isMascots = _applicationType === "mascot" || _applicationType === "embellishments" ? true : false;
        var isNumbers = _applicationType === "front_number" || _applicationType === "back_number" || _applicationType === "sleeve_number" ? true : false;
        // var _sampleText = _settingsObject.text;
        var _sizes = '';
        var _uniformCategory = ub.current_material.material.uniform_category
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(_id);

        var _appInfo = ub.funcs.getApplicationSettings(application_id);

        if (isLetters) {
            ub.funcs.beforeActivateApplication();
        } else if (isMascots) {
            _sizes = ub.funcs.getApplicationSizes('mascot', _alias.alias);
        }
    
        if (ub.funcs.popupsVisible()) {
            return;
        }
        if (!ub.funcs.okToStart()) {
            return;
        }
    
        ub.funcs.activatePanelGuard();
    
        if (ub.funcs.isBitFieldOn()) {
    
            var _marker = _.find(ub.data.markerBitField, {value: true});
    
            if (_marker.code.toString() !== application_id.toString()) {
                return;
            }
    
        }

        if (typeof _settingsObject === "undefined") {
            return;
        }
        
        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);
        
        if (isLetters || isNumbers) {


            if (_uniformCategory === "Football") {
    
                _sizes = ub.funcs.getApplicationSizes(_applicationType);
        
            } else if (ub.current_material.material.uniform_category === "Baseball") {
        
                _sizes = ub.funcs.getApplicationSizes(_applicationType, 'baseball');
        
            } else if (_uniformCategory !== "Football" && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {
        
                _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);
        
            } else {
        
                ub.utilities.warn('no sizes setting defaulting to generic');
                _sizes = ub.funcs.getApplicationSizes(_applicationType);
        
            }
        } else if (isMascots) {
            if (ub.funcs.isCurrentSport('Football')) {

                if (_id === '2' && _applicationType === 'mascot' || _applicationType === 'embellishments') {
                    _sizes = ub.funcs.getApplicationSizes('mascot_2');
                }
    
                if (_id === '5' && _applicationType === 'mascot' || _applicationType === 'embellishments') {
                    _sizes = ub.funcs.getApplicationSizes('mascot_5');
                }
    
            } else if (ub.current_material.material.uniform_category === "Wrestling") {
    
                _sizes = ub.funcs.getApplicationSizes('mascot_wrestling');
    
            } else if (!ub.funcs.isCurrentSport('Football') && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {
    
                if (ub.funcs.isCurrentType('upper')) {
    
                    _sizes = ub.data.applicationSizes.getSizes(_alias.alias, 'mascot', parseInt(application_id));
    
                } else if (ub.funcs.isCurrentType('lower') && ub.funcs.isSocks()) {
    
                    _sizes = ub.funcs.getApplicationSizes('mascot', _alias.alias, _id);
    
                } else {
    
                    _sizes = ub.funcs.getApplicationSizesPant('mascot', _alias.alias, _id);
    
                }
    
            } else {
    
                console.warn('no sizes setting defaulting to generic');
                _sizes = ub.funcs.getApplicationSizes('mascot');
    
            }
        }
    
        // New application sizes values from backend
        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _id);
    
        if (typeof _sizesFromConfig !== "undefined") {
    
            // Debug Info
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
    
                console.log('Default Sizes: ');
                console.log(_sizes);
                console.log('Application #: ');
                console.log(_id);
    
                ub.utilities.info('Using sizes from backend: ');
    
                console.log(_sizesFromConfig);
                console.log(_sizesFromConfig.sizes);

                if (isMascots) { 
                    console.log(_.pluck(_sizesFromConfig.sizes, "size"));
                    // add sort for sizes
                    _sizesSorted = _.sortBy(_sizesFromConfig.sizes, function (obj) {
                        return parseFloat(obj.size)
                    });
                    _sizesFromConfig.sizes = _sizesSorted;
                }
                _sizes = _sizesFromConfig;
            }
        } else {
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);
    
                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _id + " don't have application sizes settings on the backend.");
            }
        }

        if (_applicationType === 'mascot' || _applicationType === "embellishments") {

            ub.updateApplicationSpecsPanel(_id);
    
        }

        var _htmlBuilder = "";
    
        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') {
            _status = _settingsObject.status;
        }
    
        if (typeof _settingsObject.font_size === 'undefined') {
            if (application_id !== 2 || application_id !== 5) {
                _settingsObject.font_size = 4;

                if (_applicationType === "embellishments") {
                    _settingsObject.font_size = _settingsObject.size;
                }
            } else {
                _settingsObject.font_size = 10;

                if (_applicationType === "embellishments") {
                    _settingsObject.font_size = _settingsObject.size;
                }
            }

            if (isMascots) {
                if (application_id === 4) {
                    _settingsObject.size = 0.5;

                    if (_applicationType === "embellishments") {
                        _settingsObject.font_size = _settingsObject.size;
                    }
                }
            }    
        }
    
        _generateSizes = ub.funcs.generateSizes(_applicationType, _sizes.sizes, _settingsObject, application_id);
        var templateData = {}
        if (isLetters) {
            var isPlayerName = _applicationType === "player_name" ? 'disabled' : '';
            // set the needed data for LETTERS here
            templateData.applications = {
                type: _settingsObject.application.name.toUpperCase(),
                defaultText: _settingsObject.text,
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                placeholder: 'Your ' + _settingsObject.application.name.toLowerCase(),
                fonts: true,
                fontsData: ub.funcs.fontStyleSelection(_settingsObject, _settingsObject.application.name.toUpperCase()),
                slider: true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE FONT COLOR'),
                accents: true,
                accentsData: ub.funcs.fontAccentSelection(_settingsObject, 'CHOOSE FONT ACCENT'),
                isPlayerName: isPlayerName,
            }
            _htmlBuilder = ub.utilities.buildTemplateString('#m-reinit-application', templateData);
        } else if (isMascots) {
            var objMascot = {};
            var _inputSizes;

            if (_applicationType === "mascot") {
                _generateSizes += ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);
                objMascot = {
                    thumbnail: _settingsObject.mascot.icon,
                    type: 'STOCK MASCOT',
                    code: _settingsObject.code,
                    perspective: _settingsObject.application.views[0].perspective,
                    name: _settingsObject.mascot.name,
                    slider: true,
                    sliderContainer: ub.funcs.sliderContainer(_settingsObject.code, "Logo"),
                    isEmbellishment: false,
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE STOCK MASCOT COLORS')
                };
            } else if (_applicationType === "embellishments") {
                _generateSizes = ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);

                objMascot = {
                    thumbnail: _settingsObject.embellishment.png_filename,
                    type: 'CUSTOM LOGO',
                    code: _settingsObject.code,
                    perspective: _settingsObject.application.views[0].perspective,
                    name: _settingsObject.embellishment.name,
                    viewArtDetails: ub.config.host + '/utilities/preview-logo-information/' + _settingsObject.embellishment.design_id,
                    viewPrint: _settingsObject.embellishment.svg_filename,
                    slider: true,
                    isEmbellishment: true,
                    sliderContainer: ub.funcs.sliderContainer(_settingsObject.code, "Logo")
                };
            }

            templateData.applications = objMascot;
            _htmlBuilder = ub.utilities.buildTemplateString('#m-reinit-application-mascots', templateData);

        } else if (isNumbers) {
            templateData.applications = {
                type: _settingsObject.application.name.toUpperCase(),
                defaultText: _settingsObject.text,
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                placeholder: _settingsObject.text,
                fonts: true,
                fontsData: ub.funcs.fontStyleSelection(_settingsObject, _settingsObject.application.name.toUpperCase()),
                slider: true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE FONT COLOR'),
                accents: true,
                accentsData: ub.funcs.fontAccentSelection(_settingsObject, 'CHOOSE FONT ACCENT'),
                isPlayerName: false,
            }

            _htmlBuilder = ub.utilities.buildTemplateString('#m-reinit-application-numbers', templateData);
        }

        var appBlock = $('.modifier_main_container').find('li[data-application-id="' + _settingsObject.code + '"].applicationUIBlockNew');
        if (appBlock.length === 0) {
            // New application
            $('.modifier_main_container ul.application-container').append(_htmlBuilder);
        } else {
            // Existing application
            appBlock.replaceWith(_htmlBuilder);
        }

        setTimeout(function () { 
            $('.modifier_main_container').scrollTo($('li[data-application-id="' + _settingsObject.code + '"].applicationUIBlockNew'));
            if (!ub.funcs.isTackleTwill()) {
                $(".add-another-application-container").show();
                $(".add-another-application-container button.add-another-application").trigger("click");
            }
        }, 200)

        /// Applications Color Events

        if ( isLetters) {
            ub.funcs.setupTextSmallColorPickerEvents(_settingsObject);
            /// End Application Pattern Events
            /// Applications Pattern Events
            ub.funcs.setupPatternsAndSmallColorPickerEvents(_settingsObject);
            /// End Application Pattern Events
            /// Application Manipulator Events
        } else if ( isMascots) {
            ub.funcs.updateCoordinates(_settingsObject);

            var _matchingID = undefined;

            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {
                ub.funcs.toggleApplication(_matchingID.toString(), _status);
            }

            ub.funcs.toggleApplication(_id, _status);
        }
        ub.funcs.setupManipulatorEvents(_settingsObject, _applicationType);

        /// End Application Manipulator Events

        ub.funcs.activateMoveTool(application_id);
        ub.funcs.activateLayer(application_id);

        /// End Initialize

        // re-initialize template
        ub.funcs.initializer();

        if (_applicationType === "mascot") {
            ub.funcs.afterActivateMascots(_id);
        } else if (isLetters || isNumbers) {
            ub.funcs.afterActivateApplication(application_id);
        }
    };

    ub.funcs.getFreeApplicationsContainer = function (activeTab) {
        var _freeData = [];

        // get free applications
        freeApps = _.filter(ub.current_material.settings.applications, function(i) {
            if (i.application_type === 'free') {
                return i;
            }
        });

        _.map(freeApps, function (i) {
            var _types = [];
            var _validApplicationTypes = i.validApplicationTypes;

            // if numbers (6) tab is currently displayed
            if (activeTab === "numbers") {
                if (_.contains(_validApplicationTypes, 'number')) {
                    _types.push({
                        name: 'player_number',
                        defaultText: 'Player Number'
                    })
                }
            }

            // if letters tab (5) is currently displayed
            if (activeTab === "letters") {
                if (_.contains(_validApplicationTypes, 'team_name')) {
                    _types.push({
                        name: 'team_name',
                        defaultText: 'Team Name'
                    })
                }
                if (_.contains(_validApplicationTypes, 'player_name')) {
                    _types.push({
                        name: 'player_name',
                        defaultText: 'Player Name'
                    })
                }
            }
            // if mascots (7) tab is currently displayed
            if (activeTab === "mascots") {
                if (_.contains(_validApplicationTypes, 'logo')) {
                    _types.push({
                        name: 'mascot',
                        defaultText: 'Stock'
                    })
                }
                if (_.contains(_validApplicationTypes, 'embellishments')) {
                    _types.push({
                        name: 'embellishments',
                        defaultText: 'Custom'
                    })
                }
            }

            var objStock = {
                type: 'UNUSED',
                code: i.code,
                perspective: ub.funcs.getPrimaryView(i.application),
                appTypes: _types,
                isVisible: _types.length >= 1 ? true : false,
            }

            _freeData.push(objStock);
        });

        templateData = {
            applications: _freeData
        };

        // append to tab
        _htmlBuilder = ub.utilities.buildTemplateString('#free-applications-container', templateData);

        // output to page
        $('.modifier_main_container ul.application-container').append(_htmlBuilder);
    };

    ub.funcs.manipulateApplicationByStatus = function (status, application_id) {
        if (status === "on") {
            ub.funcs.LSRSBSFS(application_id);
        }

        ub.funcs.toggleApplicationOpts(application_id, status);

        var _matchingSide;
        var _matchingID = undefined;
        var _processMatchingSide = true;
        var _matchingSettingsObject = undefined;

        _matchingID = ub.data.matchingIDs.getMatchingID(application_id);

        if (typeof _matchingID !== "undefined") {
            _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
        }

        if (typeof _matchingSettingsObject !== "undefined") {
            if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {
                // Toggle matching mascot if the same mascot is selected
                _processMatchingSide = _settingsObject.mascot.id === _matchingSettingsObject.mascot.id
            }
        }

        if (typeof _matchingID !== "undefined") {
            if (_processMatchingSide) {
                ub.funcs.toggleApplication(_matchingID, status);
            }
        }
    };

    ub.funcs.initializer = function () {
        // slider scale
        var scaleSliders = document.getElementsByClassName('slider-control-scale');
        $(scaleSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = ub.funcs.getApplicationSettings(dataId)
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initScalePanel(scaleSliders[i], _settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
            $(this).find('.noUi-value-large').first().html('Small');
            $(this).find('.noUi-value-large').last().html('Large');
        });

        // slider move X
        var moveXSliders = document.getElementsByClassName('slider-control-move-x');
        $(moveXSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = ub.funcs.getApplicationSettings(dataId)
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initMovePanelX(moveXSliders[i],_settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
            $(this).find('.noUi-value-large').first().html('Left');
            $(this).find('.noUi-value-large').last().html('Right');
        });

        // slider move Y
        var moveYSliders = document.getElementsByClassName('slider-control-move-y');
        $(moveYSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = ub.funcs.getApplicationSettings(dataId)
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initMovePanelY(moveYSliders[i],_settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
            $(this).find('.noUi-value-large').first().html('Up');
            $(this).find('.noUi-value-large').last().html('Down');
        });

        // slider rotate
        var rotateSliders = document.getElementsByClassName('slider-control-rotate');
        $(rotateSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = ub.funcs.getApplicationSettings(dataId)
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initRotatePanel(rotateSliders[i], _settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
        });

        // add class active to all first tab of color selection tab
        var colorFirstTab = document.getElementsByClassName('color-selection-tab');
        $(colorFirstTab).each(function(){
            $(this).find('li:first-child').addClass('active');
        });
        var colorFirstTabContent = document.getElementsByClassName('tab-content');
        $(colorFirstTabContent).each(function(){
            $(this).find('.tab-pane:first-child').addClass('in active');
        });

        // add applications opt
        var selectNewAppOptions = document.getElementsByClassName('addApplicationsOpts');
        $(selectNewAppOptions).each(function(){
            $(this).find('div > button').removeClass('active');
            $(this).find('div > button:first-of-type').addClass('active');
            $(this).find('div > button:nth-of-type(odd)').addClass('pull-left');
            $(this).find('div > button:nth-of-type(even)').addClass('pull-right');
        });
    };

    ub.funcs.initRotatePanel = function (element, _settingsObject, applicationType) {
        if ($(element).hasClass('init')) { return; }
        var _flag = false;
        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var rotation = ub.objects[_v + '_view']['objects_' + _settingsObject.code].rotation;
        var computedRotation = (rotation / Math.PI) * 180.00;

        var _start = 0;
        var _start = (computedRotation * 5) / 18;
        if (_start < 0 && _start > -60) {
            _start += 60 + 40;
        }

        $(element).roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            width: 15,
            radius: 85,
            value: _start,
            startAngle: 90,

            drag: function (args) {
                if (!_flag) { _flag = true; return;}
                ub.funcs.updateRotationViaSlider(_settingsObject, args.value);
            }
        });
    };

    ub.funcs.initScalePanel = function (element, _settingsObject, applicationType) {
        if ($(element).hasClass('init')) { return; }
        var _flag = false;
        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        if (typeof element.noUiSlider === "object") {
            element.noUiSlider.set(_start);
            return;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _start = (_multiplier * ub.objects[_v + '_view']['objects_' + _settingsObject.code].scale.x) / 3;

        noUiSlider.create(element, {
            animate: true,
            animationDuration: 300,
            start: _start,
            range: {
                min: 1,
                max: 100,
            },
            tooltips: true,
            format: wNumb({
                decimals: 0
            }),
            pips: {
                mode: 'steps',
                stepped: true,
                density: 4
            }
        });
        
        element.noUiSlider.on('update', function (values, handle) {
            if (!_flag) { _flag = true; return;}
            var _value = values[0];
            ub.funcs.updateScaleViaSlider(_settingsObject, _value);
        });
    };

    ub.funcs.initMovePanelX = function (element, _settingsObject, applicationType) {
        if ($(element).hasClass('init')) { return; }
        var _flag = false;
        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _startX = ub.objects[_v + '_view']['objects_' + _settingsObject.code].position.x;

        _startX = _startX / ub.dimensions.width * 100;

        if (typeof element.noUiSlider === "object") {
            element.noUiSlider.set(_startX);
            return;
        }

        noUiSlider.create(element, {
            animate: true,
            animationDuration: 300,
            start: _startX,
            range: {
                min: 1,
                max: 100,
            },
            tooltips: true,
            format: wNumb({
                decimals: 0
            }),
            pips: {
                mode: 'steps',
                stepped: true,
                density: 4
            }
        });

        element.noUiSlider.on('update', function (values, handle) {
            if (!_flag) { _flag = true; return;}
            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'x');
        });
    };

    ub.funcs.initMovePanelY = function (element, _settingsObject, applicationType) {
        if ($(element).hasClass('init')) { return; }
        var _flag = false;
        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _startY = ub.objects[_v + '_view']['objects_' + _settingsObject.code].position.y;

        _startY = _startY / ub.dimensions.height * 100;

        if (typeof element.noUiSlider === "object") {
            element.noUiSlider.set(_startY);
            return;
        }

        noUiSlider.create(element, {
            animate: true,
            animationDuration: 300,
            start: _startY,
            range: {
                min: 1,
                max: 100,
            },
            tooltips: true,
            format: wNumb({
                decimals: 0
            }),
            pips: {
                mode: 'steps',
                stepped: true,
                density: 4
            }
        });

        element.noUiSlider.on('update', function (values, handle) {
            if (!_flag) { _flag = true; return;}
            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'y');
        });
    };

    ub.funcs.sliderContainer = function (_code, title) {
        title = title || "Font"; // Font, Mascot

        // prepare data
        var props = {
            code: _code,
            title: title
        }
        // send to mustache
        return ub.funcs.isTackleTwill() ? ub.utilities.buildTemplateString('#m-slider-container-twill', props) : ub.utilities.buildTemplateString('#m-slider-container', props);
    };

    ub.funcs.colorsSelection = function (id, _title) {
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: id});
        var _colorBlock = '';
        var _html = '';

        if (_settingsObject.application_type === 'mascot') {

            if (ub.current_material.settings.applications[id].mascot.id !== "1039") {
                _html += '<div class="colorSelectionContainer">';
                _html += '<h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">'+_title+'</h6>';
                _html += '<ul class="color-selection-tab uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark" uk-switcher uk-grid>';

                _.each(_settingsObject.mascot.layers_properties, function (layer) {

                    var _hexCode = layer.default_color;
                    var _color = ub.funcs.getColorByColorCode(_hexCode);

                    if (typeof _color !== 'undefined') {

                        // adding tabs
                        _html += '<li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">' + layer.layer_number + '</a></li>';

                        // building separated color blocks
                        _colorBlock += ub.funcs.createColorBlock(id, _color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color, 'mascots');

                    } else {
                        util.error('Hex Code: ' + _hexCode + ' not found!');
                    }

                });

                _html += '</ul>';
                _html += '<ul class="uk-switcher uk-margin uk-padding-remove">'
                _html += _colorBlock;
                _html += '</ul>';
                _html += '</div>';
            }

        } else {

            _html += '<div class="colorSelectionContainer">';
            _html  += '<h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">'+_title+'</h6>';
            _html += '<ul class="color-selection-tab uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark" uk-switcher uk-grid>'

            _.each(_settingsObject.accent_obj.layers, function (layer) {
                var _hexCode = layer.default_color;
                var _color = ub.funcs.getColorObjByHexCode(_hexCode);
                var _layerNo = layer.layer_no - 1;

                if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') {
                    return;
                }

                _color = _settingsObject.color_array[_layerNo];

                // Use default color if team color is short
                if (typeof _color === "undefined") {
                    _hexCode = layer.default_color;
                    _color = ub.funcs.getColorObjByHexCode(_hexCode);
                    ub.utilities.error('Undefined color found here!!!');
                }

                if (typeof _color !== 'undefined') {
                    _html += '<li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">' + layer.name + '</a></li>';
                    // building separated color blocks
                    _colorBlock += ub.funcs.createColorBlock(id, _color.color_code, layer.layer_no, layer.name, layer.default_color, 'accent');
                } else {
                    util.error('Hex Code: ' + _hexCode + ' not found!');
                }
            });

            _html += '</ul>';
            _html += '<ul class="uk-switcher uk-margin uk-padding-remove">'
            _html += _colorBlock;
            _html += '</ul>';
            _html += '</div>';

        }

        return _html;
    };

    ub.funcs.createColorBlock = function (_id, activeColorCode, layer_no, layer_name, active_color, objectType) {
        var _html = '';
        // var _teamColors = ub.current_material.settings.team_colors;
        var _teamColors = ub.data.secondaryColorPalette;
        var _objectType = objectType;

        if (typeof objectType === "undefined") {
            _objectType = 'not-set';
        }

        _teamColors = _.sortBy(_teamColors, "order");
        // _html += '<div id="tab-' + _id + '-' + layer_no + '" class="tab-pane fade cp-margin-remove" style="padding-bottom: 50px; padding-top: 20px;">';
        _html += '<li>'
        _html += '<div class="con-select con-palettes">'
        _html += '<div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>'
        _.each(_teamColors, function (_color) {
            var _checkMark = '';
            var _class = '';
            var _colorObj = ub.funcs.getColorByColorCode(_color.color_code);

            if (activeColorCode === _color.color_code) {
                _checkMark = '<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size" style="color:#' + _colorObj.forecolor + ';"></span>';
                _class = 'activeColorItem';
            }

            _html += '<div>';
            if (_colorObj.color_code === "W") {
                _html += '<button uk-tooltip="title:' + _colorObj.alias + '; pos: left;" class="uk-inline box-palette btn-selection-choice palette-color palette colorItem '+ _class +'" style="background-color:#ffff; color:#' + _colorObj.forecolor + ';" data-id="' + _id + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">';
            } else {
                _html += '<button uk-tooltip="title:' + _colorObj.alias + '; pos: left;" class="uk-inline box-palette btn-selection-choice palette-color palette colorItem '+ _class +'" style="background-color:#' + _colorObj.hex_code + '; color:#' + _colorObj.forecolor + ';" data-id="' + _id + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">';
            }
            _html += _checkMark;
            _html += '</button>';
            _html += '</div>';
        });

        _html += '</div>';
        _html += '</div>';
        _html += '</li>';

        return _html;
    };

    ub.funcs.setupApplicationSettings = function (applications) {
        // Setup
        _.map(applications, function(application) {
            if (application.application_type !== "free") {
                if (application.status) {
                    $('.applicationUIBlockNew[data-application-id="'+ application.code +'"] div.toggleApplicationContainer .view-letters-opt').addClass('uk-active');
                    $('.applicationUIBlockNew[data-application-id="'+ application.code +'"] div.toggleApplicationContainer .hide-letters-opt').removeClass('uk-active');
                    $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find('.lettersOptsContainer').fadeIn();
                } else {
                    $('.applicationUIBlockNew[data-application-id="'+ application.code +'"] div.toggleApplicationContainer .hide-letters-opt').addClass('uk-active');
                    $('.applicationUIBlockNew[data-application-id="'+ application.code +'"] div.toggleApplicationContainer .view-letters-opt').removeClass('uk-active');
                    $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find('.lettersOptsContainer').hide();
                }
            }
        });

        if (applications.length === 0 || ub.funcs.isTackleTwill()) {
            $(".add-another-application-container").hide();
        }
    };

    ub.funcs.isFlippedApplication = function (code) {
        var _applicationObject = ub.funcs.getApplicationSettings(code);
        var flipped = _applicationObject.application.views[0].application.flip;
        if (flipped === 1) {
            return true;
        } else {
            return false;
        }
    };

    ub.funcs.countApplicationByApplicationType = function(type) {
        var count = _.countBy(ub.current_material.settings.applications, function(app) {
            if (type === "letters") {
                if (app.application_type === 'team_name' || app.application_type === 'player_name') {
                    return "applications";
                }
            } else if (type === "numbers") {
                if (app.application_type === 'front_number' || app.application_type === 'back_number' || app.application_type === 'sleeve_number') {
                    return "applications";
                }
            } else if (type === "logos") {
                if (app.application_type === 'mascot' || app.application_type === 'embellishments') {
                    return "applications";
                }
            }
        });

        return count;
    }

    // Get available size for application in a tackle twill uniform
    ub.funcs.getRichardsonApplicationSizes = function(_settingsObject) {
        var _applicationType = _settingsObject.application_type;
        var _title = _applicationType.toTitleCase();
        var _sampleText = _settingsObject.text;
        var _sizes;
        var _uniformCategory = ub.current_material.material.uniform_category
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(_settingsObject.code);


        if (_uniformCategory === "Football") {
            _sizes = ub.funcs.getApplicationSizes(_applicationType);
        } else if (ub.current_material.material.uniform_category === "Baseball") {
            _sizes = ub.funcs.getApplicationSizes(_applicationType, 'baseball');
        } else if (_uniformCategory !== "Football" && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {
            _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);
        } else {
            ub.utilities.warn('no sizes setting defaulting to generic');
            _sizes = ub.funcs.getApplicationSizes(_applicationType);
        }

        // New application sizes values from backend
        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _settingsObject.code);

        if (typeof _sizesFromConfig !== "undefined") {
            // Debug Info
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
                console.log('Default Sizes: ');
                console.log(_sizes);
                console.log('Application #: ');
                console.log(_settingsObject.code);
                ub.utilities.info('Using sizes from backend: ');
                console.log(_sizesFromConfig);
                console.log(_sizesFromConfig.sizes);

                // add sort for sizes
                _sizesSorted = _.sortBy(_sizesFromConfig.sizes, function (obj) {
                    return parseFloat(obj.size)
                });
                _sizesFromConfig.sizes = _sizesSorted;

                _sizes = _sizesFromConfig;
            }

        } else {
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {
                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);

                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _settingsObject.code + " don't have application sizes settings on the backend.");
            }
        }

        return _sizes;
    }

    // Tackle twill change font size
    ub.funcs.richardsonChangeFontSize = function(_settingsObject, value) {
        var oldScale = ub.funcs.clearScale(_settingsObject);
        _settingsObject.oldScale = oldScale;

        ub.funcs.changeSize(value, _settingsObject);

        var _matchingID = undefined;
        _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

        if (typeof _matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            ub.funcs.changeSize(value, _matchingSettingsObject);
        }
    }

    // Tackle twill change mascot size
    ub.funcs.richardsonChangeMascotSize = function(_settingsObject, value) {
        var oldScale = ub.funcs.clearScale(_settingsObject);
        _settingsObject.oldScale = oldScale;

        ub.funcs.changeMascotSize(value, _settingsObject);
        var _matchingID = undefined;
        _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

        if (typeof _matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            ub.funcs.changeMascotSize(value, _matchingSettingsObject);
        }
    }

    // Tackle twill change custom mascot size
    ub.funcs.richardsonChangeCustomMascotSize = function(_settingsObject, value) {
        var _scaleType = "normal";

        if (typeof _settingsObject.custom_obj !== "undefined") {
            var custom = _settingsObject.custom_obj;

            if (custom.fontSize === value.toString()) {
                _scaleType = "custom";
            }
        }

        _settingsObject.scale_type = _scaleType;

        var oldScale = ub.funcs.clearScale(_settingsObject);
        _settingsObject.oldScale = oldScale;

        ub.funcs.changeCustomMascotSize(value, _settingsObject);

        var _matchingID = undefined;
        _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

        if (typeof _matchingID !== "undefined") {
            var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            ub.funcs.changeMascotSize(value, _matchingSettingsObject);
        }
    }

    ub.funcs.richardsonDeleteApplicaiton = function (locationID) {
        var _appSettings = ub.current_material.settings.applications[locationID];

        _.each(_appSettings.application.views, function (view) {
            var _obj = ub.objects[view.perspective + '_view']['objects_' + locationID];
            ub[view.perspective + '_view'].removeChild(_obj);

            delete ub.objects[view.perspective + '_view']['objects_' + locationID];
            ub.activeApplication = undefined;
        });

        if (typeof ub.data.applications_transformed["Body"] !== "undefined") {
            delete ub.data.applications_transformed["Body"][locationID];
        } else {
            if (typeof ub.data.applications_transformed["Body Panel Color"] !== "undefined") {
                delete ub.data.applications_transformed["Body Panel Color"][locationID];
            }
        }

        ub.funcs.deactivateMoveTool(locationID);
        ub.tools.activeTool.deactivate();
        ub.funcs.updateLayerTool();

        var cloneApplication = _.find(ub.data.freeAppplicationClone, {code: locationID});
        console.log(cloneApplication)
        if (typeof cloneApplication !== "undefined") {
            delete ub.current_material.settings.applications[locationID];
            ub.current_material.settings.applications[cloneApplication.code] = _.clone(cloneApplication);
        } else {
            var app = ub.funcs.omitKeysForFreeApplication(locationID);
            delete ub.current_material.settings.applications[locationID];
            ub.current_material.settings.applications[locationID] = app;
        }
        

        $('body').css('cursor', 'auto');
    };

    ub.funcs.omitKeysForFreeApplication = function(code) {
        var app = _.clone(_.pick(ub.current_material.settings.applications[code], 
            "application", 
            "application_type", 
            "code",
            "configurationSource",
            "patternConfigFromBackend",
            "patternID",
            "pattern_settings",
            "type",
            "validApplicationTypes",
            "withPattern",
            "status",
            "zIndex"
        ));

        app.application.name = "Free";
        app.application.type = "free";
        app.application_type = "free";
        app.type = "free";
        app.status = "off";

        return app;
    }


    ub.funcs.renderStockMascot = function (_settingsObject) {
        var objCustom;
        var template; 

        if (_settingsObject.application_type === "mascot") {
            objCustom = {
                thumbnail: _settingsObject.mascot.icon,
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                name: _settingsObject.mascot.name,
                application_type: _settingsObject.application_type,
                logo_type: _settingsObject.logo_type,
            };
            // Template         
            template = document.getElementById("m-mascot-information-logo").innerHTML;
        } else {
            objCustom = {
                thumbnail: _settingsObject.embellishment.png_filename,
                application_type: _settingsObject.application_type,
                logo_type: _settingsObject.logo_type,
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                name: _settingsObject.embellishment.name,
                viewArtDetails: ub.config.host + '/utilities/preview-logo-information/' + _settingsObject.embellishment.design_id,
                viewPrint: _settingsObject.embellishment.svg_filename,
                flip: ub.funcs.isFlippedApplication(_settingsObject.code) ? "uk-active" : "",
                design_id: _settingsObject.embellishment.design_id,
                isCustom: _settingsObject.logo_type === "custom" ? true: false
            };
            // Template
            template = document.getElementById("m-mascot-information").innerHTML;
        }

        var renderTemplate = Mustache.render(template, objCustom);
        $(".logo-type-container .btn-selection-choice.uk-active").removeClass("uk-active");
        $(".logo-type-container .btn-selection-choice[data-type='"+ _settingsObject.logo_type +"']").addClass("uk-active");
        $(".modifier_main_container .logo-details-container").html("");
        $(".modifier_main_container .logo-details-container").html(renderTemplate);
        $("#primary_options_container .location-add-remove-container[data-perspective='" + _settingsObject.application.views[0].perspective + "']").html("");
        $("#primary_options_container .location-add-remove-container[data-perspective='" + _settingsObject.application.views[0].perspective + "']").html('<a href="#" class="removeMascot en-disable-me fc-red fc-italic" data-application-code="'+ _settingsObject.code +'">(remove)</a>');
        ub.funcs.activateMoveTool(_settingsObject.code)
    }

    ub.funcs.afterRemoveStockLogo = function(settingsObj) {
        $("#primary_options_container .logo-location-container .btn-selection-choice[data-perspective='" + settingsObj.application.views[0].perspective + "']").removeClass("selected");
        $("#primary_options_container .logo-location-container .btn-selection-choice[data-perspective='" + settingsObj.application.views[0].perspective + "']").removeClass("uk-active");
        $(".modifier_main_container .logo-details-container").html("");
        $("#primary_options_container .location-add-remove-container[data-perspective='" + settingsObj.application.views[0].perspective + "']").html("");
        // $("#primary_options_container .location-add-remove-container[data-perspective='" + settingsObj.application.views[0].perspective + "']").html('<span class="uk-text-center uk-text-small fc-darkGray fc-italic">(Add)</span>');
    }
});