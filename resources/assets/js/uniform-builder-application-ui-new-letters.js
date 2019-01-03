/*jslint browser: true */
/*global window */

"use strict";

$(function() {

    var ub = window.ub;

    // on click mascot and embellishments group #7
    $('#new-toolbar > .group-5').on('click', function () {
        if (! $(this).hasClass('active')) {
            // If tab is not currently active, add active class to element and remove active class from other tabs
            $(this).addClass('active').siblings().removeClass("active");
            // Display decoration letters
            ub.funcs.startNewApplicationLetters();
        }
    });

    // on click mascot and embellishments group #6
    $('#new-toolbar > .group-6').on('click', function () {
        if (! $(this).hasClass('active')) {
            // If tab is not currently active, add active class to element and remove active class from other tabs
            $(this).addClass('active').siblings().removeClass("active");
            // Display decoration numbers
            ub.funcs.startNewApplicationNumbers();
        }
    });

    $('#primary_options_container')
            // To add a new letter application (show Choose Location and Choose Perspective options)
            .on('click', '.add-app-letters', function () {
                var opts = $('#primary_options_container').find('.addApplicationsOpts')

                // Check if clicked to add an application or show the options
                // If clicked to show options
                if ($(this).hasClass('active') === false) {
                    $(this).addClass('active hide-app-letters');
                    opts.removeClass('hide');

                    // On click of DESIGN TYPE buttons
                    opts.on('click', 'button.optionButton', function () {
                        // Remove class from the currently active element then change the clicked element to active
                        opts.find('button.optionButton.active').removeClass('active');
                        $(this).addClass('active');
                    });
                    // On click of PERSPECTIVE buttons
                    opts.on('click', 'button.perspective', function () {
                        // Remove class from the currently active element then change the clicked element to active
                        opts.find('button.perspective.active').removeClass('active');
                        $(this).addClass('active');

                        // If FRONT perspective is clicked
                        if($(this).data('id') === "front") {
                            // Remove class from the currently active PART then change it to FRONT BODY
                            opts.find('button.part.active').removeClass('active');
                            opts.find('button[data-id="Front Body"].part').addClass('active')
                            showSideOptions(false, '')

                        } else if($(this).data('id') === "back") {
                        // If BACK perspective is clicked
                            // Remove class from the currently active PART then change it to BACK BODY
                            opts.find('button.part.active').removeClass('active');
                            opts.find('button[data-id="Back Body"].part').addClass('active')
                            showSideOptions(false, '')
                        } else {
                            // If LEFT or RIGHT perspective is clicked,
                            var activePart = opts.find('button.part.active');
                            var parts = ['Front Body', 'Back Body'];
                            // If currently active PART is Front/Back Body,
                            if (parts.includes(activePart.data('id'))) {
                                // Change the active PART to SLEEVE
                                activePart.removeClass('active')
                                opts.find('button[data-id="Sleeve"].part').addClass('active')
                            }
                            // Show options for Sleeves, Side Panel, and Sleeve Insert
                            showSideOptions(true, $(this).data('id'))
                        }

                    });
                    // On click of PART buttons
                    opts.on('click', 'button.part', function () {
                        opts.find('button.part.active').removeClass('active');
                        $(this).addClass('active');

                        // If FRONT BODY part is cliked
                        if($(this).data('id') === "Front Body") {
                            // Change the active perspective to FRONT
                            opts.find('button.perspective.active').removeClass('active');
                            opts.find('button[data-id="front"].perspective').addClass('active')
                            showSideOptions(false, '')

                        } else if($(this).data('id') === "Back Body") {
                        // If BACK BODY part is clicked,
                            // Change the active perspective to BACk
                            opts.find('button.perspective.active').removeClass('active');
                            opts.find('button[data-id="back"].perspective').addClass('active')
                            showSideOptions(false, '')
                        } else {
                            // If SLEEVE, SIDE PANEL, or SLEEVE INSERT is clicked,

                            var activePerspective = opts.find('button.perspective.active');
                            var perspectives = ['front', 'back']
                            // And active perspective if FRONT OR BACK,
                            if (perspectives.includes(activePerspective.data('id'))) {
                                // Change the active perspective to LEFT
                                activePerspective.removeClass('active')
                                opts.find('button[data-id="left"].perspective').addClass('active')
                            }

                            // Show options
                            showSideOptions(true, activePerspective.data('id'))
                        }
                    })
                    // On click of SIDE buttons
                    opts.on('click', 'button.side', function () {
                        opts.find('button.side.active').removeClass('active');
                        $(this).addClass('active');

                        // Change active perspective along with the side that is clicked
                        opts.find('button.perspective.active').removeClass('active');
                        opts.find('button[data-id="' + $(this).data('id') + '"].perspective').addClass('active')
                    })
                } else {
                    // If clicked to add application,
                    var _perspective = $('button.perspective.active').data('id');
                    var _part = $('button.part.active').data('id');
                    var _type = $('button.optionButton.active').data('type');
                    var _side = $('button.side.active').data('id');

                    ub.funcs.newApplication(_perspective, _part, _type, _side);
                    $(this).removeClass('active')
                    opts.addClass('hide')
                }

                showSideOptions = function (show, id) {
                    if (show) {
                        opts.find('.sideOptions').removeClass('hide')
                        opts.find('.sideOptions .side.active').removeClass('active')
                        opts.find('.sideOptions button[data-id="' + id + '"].side').addClass('active')
                    } else {
                        opts.find('.sideOptions').addClass('hide')
                        opts.find('.sideOptions .side.active').removeClass('active')
                        opts.find('.sideOptions button[data-id="na"].side').addClass('active')
                    }
                }
            })
            // To hide "Add Application" options
            .on('click', '.view-app-letters', function () {
                $('.add-new-application-letters button').removeClass('active')
                $('#primary_options_container').find('.addApplicationsOpts').addClass('hide');
            })

            // To view a letter's customization options
            .on('click', '.view-letters-opt', function () {
                $(this).addClass('active').attr('disabled', 'disabled');
                $(this).next().removeClass('active').removeAttr('disabled');
                $(this).closest('.applicationUIBlock').find('.lettersOptsContainer').fadeIn();
            })
            // To hide a letter's customization options
            .on('click', '.hide-letters-opt', function () {
                $(this).addClass('active').attr('disabled', 'disabled');
                $(this).prev().removeClass('active').removeAttr('disabled');
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
                $(this).closest('div.clearfix').find('i').remove()
                $(this).addClass('active').append('<i class="fa fa-check" aria-hidden="true"></i>')

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
                                    $('.modifier_main_container').find($('div[data-application-id=' + _application.code + '].applicationUIBlock .sampleText')).val(_val);

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
                            $('.modifier_main_container').find($('div[data-application-id=' + _application.code + '].applicationUIBlock .sampleText')).val(_val);

                        }

                    }

                });
            })
            // To change an application's font by clicking left or right arrow
            .on('click', 'span.fontStyleLeft, span.fontStyleRight', function (e) {
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

            })
            .on('click', 'button.toggleAppOpt', function () {

                var _id = $(this).closest('.applicationUIBlock').data('application-id')
                var _currentStatus = $(this).parent().data('status');
                var s;

                if (_currentStatus === "on") {
                    s = 'off';
                }
                else {
                    s = 'on';
                }

                if (s === "on") {
                    ub.funcs.LSRSBSFS(parseInt(_id));
                }

                ub.funcs.toggleApplicationOpts($(this).parent(), _id, s);

                var _matchingSide;
                var _matchingID = undefined;
                var _processMatchingSide = true;
                var _matchingSettingsObject = undefined;

                _matchingID = ub.data.matchingIDs.getMatchingID(_id);

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
                        ub.funcs.toggleApplication(_matchingID, s);
                    }

                }
            })
            .on('click', '.change-free-app', function () {
                var _id = $(this).closest('.applicationUIBlock').data('application-id');
                var _type = $(this).data('type')
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id.toString() });
                _settingsObject.status = 'on';
                ub.funcs.changeApplicationType(_settingsObject, _type)
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

        // getting only data needed
        _.map(_filteredApplications, function (i) {
            var isPlayerName = i.application_type === "player_name" ? 'disabled' : '';

            var objStock = {
                type: i.application.name.toUpperCase(),
                defaultText: i.text,
                code: i.code,
                perspective: i.application.views[0].perspective,
                placeholder: 'Your ' + i.application.name.toLowerCase(),
                fonts: true,
                fontsData: ub.funcs.fontStyleSelection(i, i.application.name.toUpperCase()),
                slider: ub.funcs.isTackleTwill() ? false : true,
                sliderContainer: ub.funcs.sliderContainer(i.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE FONT COLOR'),
                accents: true,
                accentsData: ub.funcs.fontAccentSelection(i, 'CHOOSE FONT ACCENT'),
                isPlayerName: isPlayerName    
            }
            _appData.push(objStock);
        });

        var _htmlBuilder = ub.funcs.getNewApplicationContainer('DECORATION LETTERS', 'letters');
        $('.modifier_main_container').append(_htmlBuilder);
        
        // prepare data
        var templateData = {
            applications: _appData
        };

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);

        if (ub.funcs.isTackleTwill()) {
            ub.funcs.getFreeApplicationsContainer('letters');
        }
        // initializer
        ub.funcs.initializer();

    };

    ub.funcs.startNewApplicationNumbers = function () {
        $('#mod_primary_panel > .modifier_main_container').empty();

        // get applications and filter
        var _Applications = ub.current_material.settings.applications;
        var _filteredApplications = _.filter(_Applications, function(i) {
            if (i.application_type === 'front_number' || i.application_type === 'back_number' || i.application_type === 'sleeve_number') {
                return i;
            }
        });

        var _appData = [];

        // getting only data needed
        _.map(_filteredApplications, function (i) {
            var objStock = {
                type: i.application.name.toUpperCase(),
                defaultText: i.text,
                code: i.code,
                perspective: i.application.views[0].perspective,
                placeholder: i.text,
                fonts: true,
                fontsData: ub.funcs.fontStyleSelection(i, i.application.name.toUpperCase()),
                slider: ub.funcs.isTackleTwill() ? false : true,
                sliderContainer: ub.funcs.sliderContainer(i.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE FONT COLOR'),
                accents: true,
                accentsData: ub.funcs.fontAccentSelection(i, 'CHOOSE FONT ACCENT'),
                isPlayerName: false, 
            }
            _appData.push(objStock);
        });

        var _htmlBuilder = ub.funcs.getNewApplicationContainer('DECORATION NUMBERS', 'numbers');
        $('.modifier_main_container').append(_htmlBuilder);

        // prepare data
        var templateData = {
            applications: _appData
        };

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);

        if (ub.funcs.isTackleTwill()) {
            ub.funcs.getFreeApplicationsContainer('numbers');
        }

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
            slider: ub.funcs.isTackleTwill() ? false : true,
            sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
            colorPicker: true,
            colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE FONT COLOR'),
            accents: true,
            accentsData: ub.funcs.fontAccentSelection(_settingsObject, 'CHOOSE FONT ACCENT'),
            isPlayerName: isPlayerName
        }
    
        _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);
        var appBlock = $('.modifier_main_container').find('div[data-application-id="' + _settingsObject.code + '"].applicationUIBlock');
        if (appBlock.length === 0) {
            // New application
            $('.modifier_main_container').append(_htmlBuilder);
            setTimeout(function () { $('.modifier_main_container').scrollTo($('div[data-application-id=' + _settingsObject.code + '].applicationUIBlock')) }, 500)
        } else {
            // Existing application
            appBlock.replaceWith(_htmlBuilder);
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

        // codes from activateApplications were omitted from this point
    
    }

    // Build template for font accent selection
    ub.funcs.fontAccentSelection = function (_settingsObject, _title) {
        var _accents = []
        _.map(ub.data.accents.items, function (j) {
            var acc = {
                'thumbnail': '/images/sidebar/' + j.thumbnail,
                'id': j.id,
                'code': j.code,
                'active': _settingsObject.accent_obj.id === j.id ? 'active' : '',
                'activeCheck': _settingsObject.accent_obj.id === j.id ? '<i class="fa fa-check" aria-hidden="true"></i>' : ''
            }

            _accents.push(acc);
        })

        var templateData = {
            accentsData: _accents,
            title: _title
        }
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-font-accents-container', templateData);

        return _htmlBuilder;
    }

    // Build template for font style selection
    ub.funcs.fontStyleSelection = function (_settingsObject, _type) {
        var templateData = {
            type: _type,
            fontStyle: _settingsObject.font_obj.name,
            fontCaption: _settingsObject.font_obj.caption,
        }

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-font-styles-container', templateData);

        return _htmlBuilder;
    }

    // Build template for "Add New Application"
    ub.funcs.getNewApplicationContainer = function (_title, _designType) {
        var _htmlBuilder = '';
        var templateData = {
            isTwill: true,
            title: _title,
            disabled: 'disabled'
        };
        _htmlBuilder = ub.utilities.buildTemplateString('#add-new-application-letters', templateData)

        if (! ub.funcs.isTackleTwill()) {
            var types = [];
            var showTypes = '';
            if(_designType === 'letters') { 
                types.push({
                    type: 'team_name',
                    name: 'Team Name',
                });

                types.push({
                    type: 'player_name',
                    name: 'Player Name',
                });

            
            } else if (_designType === 'numbers') {
                types.push({
                    type: 'player_number',
                    name: 'Player Number',
                });

                showTypes = 'hide';
            } else if (_designType === 'mascots') {
                types.push({
                    type: 'mascot',
                    name: 'Stock Mascot',
                });
                types.push({
                    type: 'embellishments',
                    name: 'Custom Mascot',
                });
            }

            templateData = {
                isTwill: false,
                title: _title,
                designType: true,
                designTypeData: types,
                perspective: true,
                part: true,
                side: true,
                partsData: ub.funcs.getFreeFormLayers(),
                showTypes: showTypes
            }

            _htmlBuilder = ub.utilities.buildTemplateString('#add-new-application-letters', templateData);
        }

        return _htmlBuilder;
    }

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
                slider: ub.funcs.isTackleTwill() ? false : true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE STOCK MASCOT COLORS')
            };
        
        } else if (_applicationType === "embellishments") {
            _generateSizes = ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);

            var _embellishmentSidebar = ub.utilities.buildTemplateString('#m-embellishment-sidebar', {});
            objMascot = {
                thumbnail: _settingsObject.embellishment.thumbnail,
                type: 'CUSTOM LOGO',
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                name: _settingsObject.embellishment.name,
                viewArtDetails: ub.config.host + '/utilities/previewEmbellishmentInfo/' + _settingsObject.embellishment.design_id,
                viewPrint: _settingsObject.embellishment.svg_filename,
                slider: ub.funcs.isTackleTwill() ? false : true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code)
            };
        }
       
        var templateData = {}
        templateData.applications = objMascot;
        _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block', templateData);

        var appBlock = $('.modifier_main_container').find('div[data-application-id="' + _settingsObject.code + '"].applicationUIBlock');
        if (appBlock.length === 0) {
            // New application
            $('.modifier_main_container').append(_htmlBuilder);
            setTimeout(function () { $('.modifier_main_container').scrollTo($('div[data-application-id=' + _settingsObject.code + '].applicationUIBlock')) }, 500)
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
    }

    ub.funcs.toggleApplicationOpts = function (element, id, state) {

        var _settingsObj = ub.funcs.getApplicationSettings(parseInt(id));

        // Consider deleted locations
        if (typeof _settingsObj === "undefined") {
            return;
        }

        var _views = _settingsObj.application.views;

        var _state = state;

        if (_state === "off") {
            if (ub.activeApplication === id) {
                return;
            }

            element.data('status', "off");
            element.closest('.applicationUIBlock').find('input[type=text]').attr('disabled', 'disabled')

        } else {

            element.data('status', "on");
            element.closest('.applicationUIBlock').find('input[type=text]').removeAttr('disabled')

            ub.funcs.hideGAFontTool();

        }

        _.each(_views, function (view) {

            var _view = view.perspective + '_view';
            var _obj = ub.objects[_view]['objects_' + id];

            if (typeof _obj === "undefined") {
                return;
            }

            if (_state === "on") {

                _obj.zIndex = -(ub.funcs.generateZindex('applications') + _settingsObj.zIndex);
                _settingsObj.status = "on";
                ub.funcs.changeFontFromPopup(_settingsObj.font_obj.id, _settingsObj);
                ub.updateLayersOrder(ub[_view]);

            } else {

                _obj.oldZIndex = _obj.zIndex;
                _obj.zIndex = 0;
                ub.updateLayersOrder(ub[_view]);
                _settingsObj.status = "off";

            }

        });

    }

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

            $layer = $('span.colorItem[data-layer-no="' + _layerNo + '"][data-color-code="' + color.color_code + '"][data-id=' + application_id + ']');

            $layer.click();

        });

        // Handle Non-Existent colors

        if (_noOfLayers > _noOfColors) {

            var _diff = _noOfLayers - _noOfColors;

            for (i = _noOfColors + 1; i <= _noOfColors + _diff; i++) {

                var _mascotSettingsLayer = _.find(_appSettings.mascot.layers_properties, {layer_number: i.toString()});
                var _teamColorID = _mascotSettingsLayer.team_color_id;
                var _color = ub.funcs.getTeamColorObjByIndex(parseInt(_teamColorID));

                if (typeof _color !== "undefined") {

                    $layer = $('span.colorItem[data-layer-no="' + i + '"][data-color-code="' + _color.color_code + '"][data-id=' + application_id + ']');
                    $layer.click();

                } else {

                    ub.utilities.warn('Team Color ' + _teamColorID + " not found, using first team color for mascot");
                    _color = ub.funcs.getTeamColorObjByIndex(1);

                    $layer = $('span.colorItem[data-layer-no="' + i + '"][data-color-code="' + _color.color_code + '"][data-id=' + application_id + ']');
                    $layer.click();

                }

            }

        }

    }

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
                slider: ub.funcs.isTackleTwill() ? false : true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE FONT COLOR'),
                accents: true,
                accentsData: ub.funcs.fontAccentSelection(_settingsObject, 'CHOOSE FONT ACCENT'),
                isPlayerName: isPlayerName,
            }
        
            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);
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
                    slider: ub.funcs.isTackleTwill() ? false : true,
                    sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE STOCK MASCOT COLORS')
                };
            
            } else if (_applicationType === "embellishments") {
                _generateSizes = ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);
    
                objMascot = {
                    thumbnail: _settingsObject.embellishment.thumbnail,
                    type: 'CUSTOM LOGO',
                    code: _settingsObject.code,
                    perspective: _settingsObject.application.views[0].perspective,
                    name: _settingsObject.embellishment.name,
                    viewArtDetails: ub.config.host + '/utilities/previewEmbellishmentInfo/' + _settingsObject.embellishment.design_id,
                    viewPrint: _settingsObject.embellishment.svg_filename,
                    slider: ub.funcs.isTackleTwill() ? false : true,
                    sliderContainer: ub.funcs.sliderContainer(_settingsObject.code)
                };
            }

            templateData.applications = objMascot;
            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block', templateData);

        } else if (isNumbers) {
            templateData.applications = {
                type: _settingsObject.application.name.toUpperCase(),
                defaultText: _settingsObject.text,
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                placeholder: _settingsObject.text,
                fonts: true,
                fontsData: ub.funcs.fontStyleSelection(_settingsObject, _settingsObject.application.name.toUpperCase()),
                slider: ub.funcs.isTackleTwill() ? false : true,
                sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE FONT COLOR'),
                accents: true,
                accentsData: ub.funcs.fontAccentSelection(_settingsObject, 'CHOOSE FONT ACCENT'),
                isPlayerName: false,    
            }

            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);
        }
        var appBlock = $('.modifier_main_container').find('div[data-application-id="' + _settingsObject.code + '"].applicationUIBlock');
        if (appBlock.length === 0) {
            // New application
            $('.modifier_main_container').append(_htmlBuilder);
        } else {
            // Existing application
            appBlock.replaceWith(_htmlBuilder);
        }
        setTimeout(function () { $('.modifier_main_container').scrollTo($('div[data-application-id=' + _settingsObject.code + '].applicationUIBlock')) }, 500)

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
    }

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
                        defaultText: 'Stock Mascot'
                    })
                }

                if (ub.config.uniform_application_type !== "sublimated") {
                    if (_.contains(_validApplicationTypes, 'embellishments')) {
                        _types.push({
                            name: 'embellishments',
                            defaultText: 'Custom Mascot'
                        })
                    }
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
        $('.modifier_main_container').append(_htmlBuilder);
    }
});