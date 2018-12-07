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
                ub.funcs.activateApplicationsAll(settingsObj.code);

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
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id.toString()})
                var _currentStatus = $(this).parent().data('status');
                var isMascots = _settingsObject.application_type === "mascot" || _settingsObject.application_type === "embellishments" ? true : false;
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
                var toggleBtn;

                _matchingID = ub.data.matchingIDs.getMatchingID(_id);

                if (typeof _matchingID !== "undefined") {

                    _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                    toggleBtn = $('.modifier_main_container > div.applicationUIBlock[data-application-id='+ _matchingID +']')
                }

                if (isMascots) {
                    if (typeof _matchingSettingsObject !== "undefined") {

                        if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

                            // Toggle matching mascot if the same mascot is selected
                            _processMatchingSide = _settingsObject.mascot.id === _matchingSettingsObject.mascot.id

                        }

                    }

                    if (typeof _matchingID !== "undefined") {

                        if (_processMatchingSide) {
                            ub.funcs.toggleApplication(_matchingID, s);
                            if (s === "off") {
                                toggleBtn.find('.hide-sliders').trigger('click')
                            } else if (s === "on") {
                                toggleBtn.find('.view-sliders').trigger('click')
                            }
                        }
                    }   
                } else {
                    if (typeof _matchingID !== "undefined") {

                        ub.funcs.toggleApplication(_matchingID.toString(), s);
                        if (s === "off") {
                            toggleBtn.find('.hide-letters-opt').trigger('click')
                        } else if (s === "on") {
                            toggleBtn.find('.view-letters-opt').trigger('click')
                        }
                    }
                }
            })
            .on('click', '.change-free-app', function () {
                var _id = $(this).closest('.applicationUIBlock').data('application-id');
                var _type = $(this).data('type')
                var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id.toString() });
                _settingsObject.status = 'on';
                ub.funcs.changeApplicationType(_settingsObject, _type)
            })
            .on('click', 'span.font_size', function () {
    
                var _id = $(this).closest('.applicationUIBlock').data('application-id').toString();
                var _selectedSize = $(this).data('size');
                $('.font_size').removeClass('active');
                $(this).addClass('active');
    
                var _isCustom = $(this).hasClass('custom');
                var _isScale = $(this).hasClass('scale');
                var _isRotate = $(this).hasClass('rotate');
                var _isMove = $(this).hasClass('move');
    
                if (_isCustom && _isScale) {
    
                    $('div.color-pattern-tabs').hide();
                    $('span.tab[data-item="manipulators"]').trigger('click');
                    $('li.tab.scale').trigger('click');
    
                    return;
    
                }
    
                if (_isCustom && _isMove) {
    
                    $('color-pattern-tabs').hide();
                    $('span.tab[data-item="manipulators"]').trigger('click');
                    $('li.tab.move').trigger('click');
    
                    return;
    
                }
    
                if (_isCustom && _isRotate) {
    
                    $('color-pattern-tabs').hide();
                    $('span.tab[data-item="manipulators"]').trigger('click');
                    $('li.tab.rotate').trigger('click');
    
                    return;
    
                }
    
                ub.funcs.changeFontSizeTwill(_selectedSize, _id);
    
            });

    // Show group 5 contents
    ub.funcs.startNewApplicationLetters = function () {
        $('#mod_primary_panel > .modifier_main_container').empty();
        $('.modifier_main_container').scrollTop(0);

        // get applications and filter
        var _Applications = ub.current_material.settings.applications;
        var _filteredApplications = _.filter(_Applications, function(i) {
            if (i.application_type === 'team_name' || i.application_type === 'player_name') {
                return i;
            }
        });

        var _appData = [];
        var _generateSizes = '';

        // getting only data needed
        _.map(_filteredApplications, function (i) {
            var isPlayerName = i.application_type === "player_name" ? 'disabled' : '';
            _generateSizes = ub.funcs.getGeneratedObjectSizes(i)

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
                isPlayerName: isPlayerName,
                generateSizes: _generateSizes
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
        $('.modifier_main_container').scrollTop(0);

        // get applications and filter
        var _Applications = ub.current_material.settings.applications;
        var _filteredApplications = _.filter(_Applications, function(i) {
            if (i.application_type === 'front_number' || i.application_type === 'back_number' || i.application_type === 'sleeve_number' || i.application_type === 'shoulder_number') {
                return i;
            }
        });

        var _appData = [];
        var _generateSizes = '';

        // getting only data needed
        _.map(_filteredApplications, function (i) {
            _generateSizes = ub.funcs.getGeneratedObjectSizes(i)

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
                generateSizes: _generateSizes
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

    ub.funcs.toggleApplicationOpts = function (element, id, state) {

        var _settingsObj = ub.funcs.getApplicationSettings(parseInt(id));
        var isMascots = _settingsObj.application_type === "mascot" || _settingsObj.application_type === "embellishments" ? true : false;

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
                if (!isMascots) {
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
        var isNumbers = _applicationType === "front_number" || _applicationType === "back_number" || _applicationType === "sleeve_number" || _applicationType === "shoulder_number" ? true : false;
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
    
        _generateSizes = ub.funcs.generateSizes2(_applicationType, _sizes.sizes, _settingsObject, application_id);
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
                generateSizes: _generateSizes
            }
        
            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);
        } else if (isMascots) {
            var objMascot = {};
            var _inputSizes;

            if (_applicationType === "mascot") {
            
                objMascot = {
                    thumbnail: _settingsObject.mascot.icon,
                    type: 'STOCK MASCOT',
                    code: _settingsObject.code,
                    perspective: _settingsObject.application.views[0].perspective,
                    name: _settingsObject.mascot.name,
                    slider: ub.funcs.isTackleTwill() ? false : true,
                    sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(_settingsObject.code, 'CHOOSE STOCK MASCOT COLORS'),
                    generateSizes: _generateSizes
            };
            
            } else if (_applicationType === "embellishments") {
    
                objMascot = {
                    thumbnail: _settingsObject.embellishment.thumbnail,
                    type: 'CUSTOM LOGO',
                    code: _settingsObject.code,
                    perspective: _settingsObject.application.views[0].perspective,
                    name: _settingsObject.embellishment.name,
                    viewArtDetails: ub.config.host + '/utilities/previewEmbellishmentInfo/' + _settingsObject.embellishment.design_id,
                    viewPrint: _settingsObject.embellishment.svg_filename,
                    slider: ub.funcs.isTackleTwill() ? false : true,
                    sliderContainer: ub.funcs.sliderContainer(_settingsObject.code),
                    generateSizes: _generateSizes
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
                generateSizes: _generateSizes
            }

            _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);
        }

        ModifierController.scrollToOptions(_settingsObject.application_type, _settingsObject.code)
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

        if (ub.funcs.isTackleTwill()) {
        // This would update both div containers of paired mascots/numbers (on activate) 
        if (isNumbers) {
                $('#property-modifiers-menu .menu-item-numbers').trigger('click');
                $('.modifier_main_container').scrollTo($('div[data-application-id=' + application_id + '].applicationUIBlock'), { duration: 1000 })
            }
            if (isMascots && _applicationType === "mascot") {
                $('#property-modifiers-menu .menu-item-applications').trigger('click');
                $('.modifier_main_container').scrollTo($('div[data-application-id=' + application_id + '].applicationUIBlock'), { duration: 1000 })
            }
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

    ub.funcs.getGeneratedObjectSizes = function (_settingsObj) {

        var _generateSizes = '';
        var _sizes
        var _uniformCategory = ub.current_material.material.uniform_category
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);

        var _applicationType = _settingsObj.application_type;

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

            if (typeof _settingsObj.font_size === 'undefined') {

                if (_settingsObj.code !== 2 || _settingsObj.code !== 5) {
    
                    _settingsObj.font_size = 4;
    
                } else {
    
                    _settingsObj.font_size = 10;
    
                }
    
            }

        var _sizesFromConfig = ub.data.applicationSizes.getConfiguration(_applicationType, _settingsObj.code);
        
        if (typeof _sizesFromConfig !== "undefined") {

            // Debug Info
            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

                console.log('Default Sizes: ');
                console.log(_sizes);
                console.log('Application #: ');
                console.log(_settingsObj.code);

                ub.utilities.info('Using sizes from backend: ');

                console.log(_sizesFromConfig);
                console.log(_sizesFromConfig.sizes);
                //console.log(_.pluck(_sizesFromConfig.sizes, "size"));

                // add sort for sizes
                var _sizesSorted = _.sortBy(_sizesFromConfig.sizes, function (obj) {
                    return parseFloat(obj.size)
                });
                _sizesFromConfig.sizes = _sizesSorted;

                _sizes = _sizesFromConfig;

            }

        } else {

            if (ub.data.consumeApplicationSizes.isValid(ub.config.sport)) {

                ub.utilities.info('Application Type: ' + _applicationType);
                ub.utilities.info('alias: ' + _alias.alias);

                ub.utilities.error(ub.config.sport + " - " + _applicationType + " - " + _settingsObj.code + " don't have application sizes settings on the backend.");

            }

        }

        _generateSizes = ub.funcs.generateSizes2(_applicationType, _sizes.sizes, _settingsObj, _settingsObj.code);
        return _generateSizes;
    }

    ub.funcs.generateSizes2 = function (applicationType, sizes, settingsObject, _id) {

        var _htmlBuilder = '';
        var _additionalClass = '';

        _.each(sizes, function (size) {

            if (size.size.toString() === settingsObject.font_size.toString() || (_id === '4' && ub.config.sport !== "Football 2017")) { 
                _additionalClass = 'active';

                if (typeof settingsObject.custom_obj !== 'undefined' && ub.funcs.isTackleTwill()) {
                    (_.isEqual(settingsObject.custom_obj.active, true)) ? _additionalClass='' : _additionalClass='active';
                }

            } else {
                _additionalClass = '';
            }

            if (ub.funcs.isFreeFormToolEnabled(_id)) {
                if (_additionalClass === "active") {
                    _htmlBuilder += '<span class="twill-sizes font_size ' + _additionalClass + '" data-size="' + size.size + '" style="display: none">' + size.size + '"' + '</span>';
                }
            } else {
                _htmlBuilder += '<span class="twill-sizes font_size ' + _additionalClass + '" data-size="' + size.size + '">' + size.size + '"' + '</span>';
            }

        });

        // show BESTFIT option on embellishment's application sizes
        if (typeof settingsObject.custom_obj !== 'undefined' && ub.funcs.isTackleTwill()) {

            (_.isEqual(settingsObject.custom_obj.active, true)) ? _additionalClass='active' : _additionalClass='';

            var customSize  = settingsObject.custom_obj.fontSize;
            var customScale = settingsObject.custom_obj.scale.x;
            var type        = 'custom';

            // if scale is set to 0, e.g. {x: 0, y: 0} then hide BESTFIT option
            if (customScale.toString() !== '0') _htmlBuilder += '<span style="width:auto" class="applicationLabels font_size ' + _additionalClass + '" data-size="' + customSize + '" data-type="'+  type +'" data-scale="'+ customScale +'">BESTFIT</span>';

        }

        var _divisor = 10; // For Mascots
        var _v = ub.funcs.getPrimaryView(settingsObject.application);
        var _obj = ub.objects[_v + '_view']['objects_' + settingsObject.code];

        if (applicationType !== "mascot") {
            _divisor = 100;
        } // For Text Applications

        // Custom Size

        if (ub.funcs.isFreeFormToolEnabled(_id) && typeof _obj !== "undefined") {

            // If sublimated
            _htmlBuilder = '';
        }

        return _htmlBuilder;

    }

    ub.funcs.changeFontSizeTwill = function (_selectedSize, _id) {

        var _settingsObject = _.find(ub.current_material.settings.applications, { code: _id })
        var oldScale = ub.funcs.clearScale(_settingsObject);
        _settingsObject.oldScale = oldScale;

        if (_settingsObject.application_type === "mascot" || _settingsObject.application_type === "embellishments") {
            ub.funcs.changeMascotSize(_selectedSize, _settingsObject);
        } else {
            ub.funcs.changeSize(_selectedSize, _settingsObject);
        }

        var _matchingID = undefined;
        _matchingID = ub.data.matchingIDs.getMatchingID(_id);

        if (typeof _matchingID !== "undefined") {

            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            if (_matchingSettingsObject.application_type === "mascot" || _matchingSettingsObject.application_type === "embellishments") {
                ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);
            } else {
                ub.funcs.changeSize(_selectedSize, _matchingSettingsObject);
            }
        }
    }
});