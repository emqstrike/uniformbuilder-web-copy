/*jslint browser: true */
/*global window */

"use strict";

$(function() {

    var ub = window.ub;

    // on click on any group pane switch to active
    $('#new-toolbar > .group-pane').on('click', function () {
        $('#new-toolbar > .group-pane').removeClass('active');
        $(this).addClass('active');
    });

    // on click mascot and embellishments group #7
    $('#new-toolbar > .group-5').on('click', function () {
        ub.funcs.startNewApplicationLetters();
    });

    $('#primary_options_container')
            // To add a new letter application (show Choose Location and Choose Perspective options)
            .on('click', '.add-app-letters', function () {

                if ($(this).hasClass('active') === false) {
                    $(this).addClass('active hide-app-letters');
                    $('#primary_options_container').find('.addApplicationsOpts').removeClass('hide');
                } else {
                    console.log('add application')

                    var _perspective = $('button.perspective.active').data('id');
                    var _part = $('button.part.active').data('id');
                    var _type = $('button.optionButton.active').data('type');
                    var _side = $('button.side.active').data('id');

                    ub.funcs.newApplication(_perspective, _part, _type, _side);
                }
                
            })
            // To hide "Add Application" options
            .on('click', '.hide-app-letters', function () {
                $(this).removeClass('hide-app-letters')
                $('#primary_options_container').find('.addApplicationsOpts').addClass('hide');
            })

            // To view a letter's customization options
            .on('click', '.view-letters-opt', function () {
                $(this).addClass('active');
                $(this).next().removeClass('active');
                $(this).closest('.applicationUIBlock').find('.lettersOptsContainer').fadeIn();
            })
            // To hide a letter's customization options
            .on('click', '.hide-letters-opt', function () {
                $(this).addClass('active');
                $(this).prev().removeClass('active');
                $(this).closest('.applicationUIBlock').find('.lettersOptsContainer').hide();
            })
            
            // To change main color
            .on('click', '.main-color', function () {
                $(this).addClass('active');
                $(this).next().removeClass('active');
            })
            // To change outline color
            .on('click', '.outline-color', function () {
                $(this).addClass('active');
                $(this).prev().removeClass('active');
            })
            // To change a letter's font accent
            .on('click', '.thumbnailContainer', function () {
                $('.thumbnailContainer.active').removeClass('active')
                $(this).addClass('active')

                var id = $(this).closest('.applicationUIBlock').data('application-id').toString()
                var settingsObj = _.find(ub.current_material.settings.applications, {code: id});
                var accentID = $(this).data('accent-id');

                ub.funcs.changeAccentFromPopup(accentID, settingsObj);
                ub.funcs.activateApplicationsLetters(settingsObj.code);

                var matchingID = undefined;
                matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

                if (typeof matchingID !== "undefined") {

                    var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: matchingID.toString()});
                    ub.funcs.changeAccentFromPopup(accentID, _matchingSettingsObject);

                }
            })
            // To change an application's text on enter
            .on('keypress', 'input.sampleText', function (e) {
                var _val = $(this).val();
                var id = $(this).closest('.applicationUIBlock').data('application-id').toString()
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: id});
                var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(id);

                    if (e.keyCode === 13) {

                        _settingsObject.text = _val;

                        if (typeof _settingsObject.tailsweep !== "undefined") {

                            // Tailsweep, is off for now
                            // if (_settingsObject.text.length <= 5) { _length = 'short'; }
                            // if (_settingsObject.text.length >= 6 && _settingsObject.text.length <= 7 ) { _length = 'medium'; }
                            // if (_settingsObject.text.length > 7) { _length = 'long'; }

                            _length = (_settingsObject.text.length <= 12) ? _settingsObject.text.length : 12;

                            _settingsObject.tailsweep.length = _length;

                            $('span.sizeItem').removeClass('active');
                            $('span.sizeItem[data-size="' + _settingsObject.tailsweep.length + '"]').addClass('active');

                        }

                        /// Set Auto Font Size on Team Name, Baseball / Fastpitch

                        if (parseInt(id) === 1 && (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch'))) {

                            if (_settingsObject.application_type === "team_name") {

                                var _len = _val.length;
                                var _size = _settingsObject.font_size;

                                if (_len <= 4) {
                                    _size = 4;
                                } else if (_len >= 5 && _len <= 7) {
                                    _size = 3;
                                } else if (_len >= 8) {
                                    _size = 2;
                                }

                                ub.funcs.setAppSize(application_id, _size);
                                ub.funcs.setAUIActiveSize(_size);

                            }

                        }

                        /// End Set Auto Font Size

                        ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

                        // cancel automatic changing of application (e.g. all team names changes)
                        if (_isFreeFormEnabled) {
                            return;
                        }

                        _.each(ub.current_material.settings.applications, function (_application) {

                            if (_application.type !== "logo" && _application.type !== "mascot") {

                                if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                                    _application.text = _val;
                                    ub.funcs.changeFontFromPopup(_application.font_obj.id, _application);

                                }

                            }

                        });

                    }

            })
            // To change an application's text on blur
            .on('blur', 'input.sampleText', function () { 
                var _val = $(this).val();
                ub.status.onText = false;

                var id = $(this).closest('.applicationUIBlock').data('application-id').toString()
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: id});
                _settingsObject.text = _val;

                var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(id);
                ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);

                // cancel automatic changing of application (e.g. all team names changes)
                if (_isFreeFormEnabled) {
                    return;
                }

                _.each(ub.current_material.settings.applications, function (_application) {

                    if (_application.type !== "logo" && _application.type !== "mascot") {

                        if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                            _application.text = _val;
                            ub.funcs.changeFontFromPopup(_application.font_obj.id, _application);

                        }

                    }

                });
            })
            // To change an application's font by clicking left or right arrow
            .on('click', 'span.fontLeft, span.fontRight', function (e) {
                var _id = $(this).closest('.applicationUIBlock').data('application-id').toString()
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});

                var _direction = $(this).data('direction');
                var _newFont = ub.funcs.getFontObj(_direction, _settingsObject.font_obj);

                if (typeof _newFont !== 'undefined') {

                    ub.funcs.changeFontFromPopup(_newFont.id, _settingsObject);
                    // ub.funcs.activateApplications(_settingsObject.code)

                    $(this).parent().find('.font_name').text(_newFont.caption)
                    $(this).parent().find('.font_name').css('font-family', _newFont.name)

                }
                else {

                    // No Font!
                    return;

                }

                if (_settingsObject.type === "front_number" || _settingsObject.type === "back_number") {

                    _.each(ub.current_material.settings.applications, function (_application) {

                        if (_application.type !== _settingsObject.application_type && _application.type !== "logo" && _application.type !== "mascot") {

                            if (_settingsObject.type.indexOf('number') !== -1 && _application.type.indexOf('number') !== -1) {

                                ub.funcs.changeFontFromPopup(_newFont.id, _application);

                            }

                        }

                    });

                }

                var _matchingID = undefined;

                _matchingID = ub.data.matchingIDs.getMatchingID(_id);

                if (typeof _matchingID !== "undefined") {

                    var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                    ub.funcs.changeFontFromPopup(_newFont.id, _matchingSettingsObject);

                }

            });

    // Show group 5 contents
    ub.funcs.startNewApplicationLetters = function () {
        $('#mod_primary_panel > .modifier_main_container').empty();

        // get applications and filter
        var _Applications = ub.current_material.settings.applications;
        var _filteredApplications = _.filter(_Applications, function(i) {
            if (i.application_type === 'team_name' || i.application_type === 'player_name') {
                return i;
            }
        });

        var _appData = [];
        var _accentsData = [];

        // getting only data needed
        _.map(_filteredApplications, function (i) {
            if (i.application_type === 'team_name') {
                var objCustom = {
                    // 'thumbnail': i.embellishment.thumbnail,
                    'type': 'TEAM NAME',
                    'code': i.code,
                    'perspective': i.application.views[0].perspective,
                    'placeholder': 'Your team name',
                    'fontStyle': i.font_obj.name,
                    'fontCaption': i.font_obj.caption,
                    sliderContainer: ub.funcs.sliderContainer(i.code),
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE FONT COLOR')


                }
                _appData.push(objCustom);
            } else if (i.application_type === 'player_name') {
                var objStock = {
                    // 'thumbnail': i.mascot.icon,
                    'type': 'PLAYER NAME',
                    'code': i.code,
                    'perspective': i.application.views[0].perspective,
                    // 'name': i.mascot.name
                    'placeholder': 'Your name',
                    'fontStyle': i.font_obj.name,
                    'fontCaption': i.font_obj.caption,
                    sliderContainer: ub.funcs.sliderContainer(i.code),
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE FONT COLOR')
                }
                _appData.push(objStock);
            }
        });

        _.map(ub.data.accents.items, function (i) {
            var acc = {
                'thumbnail': '/images/sidebar/' + i.thumbnail,
                'id': i.id,
                'code': i.code
            }
            _accentsData.push(acc)
        });

        // prepare data
        var templateData = {
            applications: _appData,
            accents: _accentsData
        };

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#new-application-letters', []);
        $('.modifier_main_container').append(_htmlBuilder);
        
        _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);
        // initializer
        ub.funcs.initializer();
    }

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

        if (_applicationType === 'mascot') {

            ub.funcs.activateMascots(_id);
            return;

        }

        if (_applicationType === 'embellishments') {

            ub.funcs.activateEmbellishments(_id);
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

        // _htmlBuilder += '<label class="applicationLabels font_size ' + _class + '">' + _label + '</label>';

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

        var _patternObject = _settingsObject.pattern_obj;
        var _patternsPanel = ub.funcs.updateTextPatternPanel(_patternObject);
        var _templateStrManipulators = ub.funcs.updateManipulatorsPanel(_settingsObject);

        var templateData = {
            id: _id,
            status: _status,
            thumbIcon: _thumbIcon,
            accentName: _accentName,
            mascotFontName: _fontName,
            mascotFontCaption: _fontCaption,
            mascotFontArrowOpacity: 100,
            class: _class,
            label: _label,
            applicationType: _applicationType,
            appType: _title.replace('Number', '# '),
            appLabel: 'Font',
            generateSizes: _generateSizes,
            sampleText: _sampleText,
            maxLength: _maxLength,
            accentName: _accentName,
            // isCustomLogo: _isCustomLogo,
            // customFilename: _customFilename,
            colorPickers: _colorPickers,
            // isSublimated: _isSublimated,
            isApplication: 'true',
            patternsPanel: _patternsPanel,
            templateStrManipulators: _templateStrManipulators,
            sampleTextContainerVisibility: '',
            cogVisibility: 'hidden',
            tailSweepsTabVisibility: '',
            colorTabVisibility: '',
            patternsTabVisibility: '',
            flipLabel: 'Vertical',
            isBaseballFastpitch: _isBaseballFastpitch,
            tailSweepPanel: _tailSweepPanel,

            // For Letters
            applications: {
            'type': 'TEAM NAME',
            'code': _settingsObject.code,
            'perspective': _settingsObject.application.views[0].perspective,
            'placeholder': 'Your team name',
            'fontStyle': _settingsObject.font_obj.name,
            'fontCaption': _settingsObject.font_obj.caption
            }
        }
        

        _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);
        $('.modifier_main_container').append(_htmlBuilder);
        
        // $('#new-toolbar > .active').trigger('click')

        ub.funcs.afterActivateApplication(application_id);

    }
});