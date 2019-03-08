/*jslint browser: true */
/*global window */

"use strict";

function ApplicationPanel() {
}

ApplicationPanel.events = {
    is_init_events_called : 0,
    init_global_events: 0,

    init: function() {
        var _this = this;
        if (ApplicationPanel.events.is_init_events_called === 0) {
            $("#primary_options_container").on('click', '.view-letters-opt', _this.onViewApplicationOptions);
            $("#primary_options_container").on('click', '.hide-letters-opt', _this.onHideApplicationOptions);
            $("#primary_options_container").on('click', '.thumbnailContainer', _this.onSelectFontAccent);
            $("#primary_options_container").on('keypress', 'input.app-letters-input', _this.onKeyPressApplicationText);
            $("#primary_options_container").on('blur', 'input.app-letters-input', _this.onBlurApplicationText);
            $("#primary_options_container").on('click', 'a.fontStyleLeft, a.fontStyleRight', _this.onChangeFontStyle);
            $("#primary_options_container").on('click', '.change-free-app', _this.onChangeFreeApplication);
            $("#primary_options_container").on('click', '.main-color', _this.onChangeMainColor);
            $("#primary_options_container").on('click', '.view-app-letters', _this.onChangeMainColor);
            $("#primary_options_container").on('click', '.outline-color', _this.onChangeMainColor);
            $('#primary_options_container').on('click', '.colorItem[data-object-type="accent"]', _this.onChangeAccentColor);
            ApplicationPanel.events.is_init_events_called = 1;
        }
    },

    initGlobalEvents: function() {
        var _this = this;
        if (ApplicationPanel.events.init_global_events === 0) {
            // For adding of Application
            $("#primary_options_container").on('click', '.new-application-container .show-add-application-options', _this.showAddApplicationBlock);
            // Cancel Adding
            $("#primary_options_container").on('click', '.add-new-application-block .cancel-adding-application', _this.onCancelAddApplication);
            // On Add Application
            $("#primary_options_container").on('click', '.add-new-application-block .add-new-application', _this.onAddNewApplication);
            // On Select Design type
            $("#primary_options_container").on('click', '.design-type-container .design-type-button', _this.onSelectDesignType);
            // On Select Perpective
            $("#primary_options_container").on('click', '.perspective-container .perspective', _this.onSelectPerspective);
            //On Select Uniform Part
            $("#primary_options_container").on('click', '.parts-container .part', _this.onSelectPart);
            // On Select part side
            $("#primary_options_container").on('click', '.side-container .side', _this.onSelectPartSide);

            // View Application List
            $("#primary_options_container").on('click', '.view-application-list', _this.onViewApplicationList);
            $("#application-list-modal").on('click', '.remove-application-button', _this.removeApplicationOnList);
            $("#application-list-modal").on('click', '.show-location-markers', _this.onShowLocationMarker);
            $("#application-list-modal").on('click', 'li.layer', _this.onClickApplicationLayer);
            ApplicationPanel.events.init_global_events = 1;
        }
    },

    onViewApplicationOptions: function() {
        $(this).addClass('uk-active').attr('disabled', 'disabled');
        $(this).parent().parent().find(".hide-letters-opt").removeClass('uk-active').removeAttr("disabled");
        $(this).closest('.applicationUIBlockNew').find('.lettersOptsContainer').fadeIn();

        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        ub.funcs.manipulateApplicationByStatus("on", application_id);
    },

    onHideApplicationOptions: function() {
        $(this).addClass('uk-active').attr('disabled', 'disabled');
        $(this).parent().parent().find(".view-letters-opt").removeClass('uk-active').removeAttr("disabled");
        $(this).closest('.applicationUIBlockNew').find('.lettersOptsContainer').hide();

        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        ub.funcs.deactivateMoveTool();
        ub.funcs.manipulateApplicationByStatus("off", application_id);
    },

    onSelectFontAccent: function() {
        $('.thumbnailContainer.active').removeClass('active')
        $(this).closest('div.font-accent-container').find('i').remove();
        $(this).addClass('active').append('<i class="fa fa-check cp-fc-white fa-2x uk-overlay-primary" aria-hidden="true"></i>')

        var id = $(this).closest('.applicationUIBlockNew').data('application-id').toString()
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
    },

    onKeyPressApplicationText: function() {
        var _val = $(this).val();
        var id = $(this).closest('.applicationUIBlockNew').data('application-id').toString()
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
                        $('.modifier_main_container').find($('div[data-application-id=' + _application.code + '].applicationUIBlockNew .sampleText')).val(_val);
                    }
                }
            });
        }
    },

    onBlurApplicationText: function() {
        var _val = $(this).val();
        ub.status.onText = false;

        var id = $(this).closest('.applicationUIBlockNew').data('application-id').toString()
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
                    $('.modifier_main_container').find($('div[data-application-id=' + _application.code + '].applicationUIBlockNew .sampleText')).val(_val);
                }
            }
        });
    },

    onChangeFontStyle: function() {
        var _id = $(this).closest('.applicationUIBlockNew').data('application-id').toString()
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id});

        var _direction = $(this).data('direction');
        var _newFont = ub.funcs.getFontObj(_direction, _settingsObject.font_obj);

        if (typeof _newFont !== 'undefined') {
            ub.funcs.changeFontFromPopup(_newFont.id, _settingsObject);
            // ub.funcs.activateApplications(_settingsObject.code)
            $(this).parent().parent().find('.font_name').text(_newFont.caption)
            $(this).parent().parent().find('.font_name').css('font-family', _newFont.name)
        } else {
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
    },

    onChangeFreeApplication: function() {
        var _id = $(this).closest('.applicationUIBlockNew').data('application-id');
        var _type = $(this).data('type')
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id.toString() });
        _settingsObject.status = 'on';
        ub.funcs.changeApplicationType(_settingsObject, _type)
    },

    onChangeMainColor: function() {
        $(this).addClass('active');
        $(this).next().removeClass('active');
    },

    onViewAppLetters: function() {
        $('.add-new-application-letters button').removeClass('active')
        $('#primary_options_container').find('.addApplicationsOpts').addClass('hide');
    },

    onChangeOutlineColor: function() {
        $(this).addClass('active');
        $(this).prev().removeClass('active');
    },

    showAddApplicationBlock: function() {
        $(".container-add-view-application").hide();
        var type = $(this).data("application-type");

        var _htmlBuilder = ub.funcs.getNewApplicationContainer('DECORATION', type);
        $(".modifier_main_container .add-application-block").html("");
        $(".modifier_main_container .add-application-block").html(_htmlBuilder);

        // Activate first button
        $(".design-type-container button.design-type-button").first().addClass("uk-active");
        $('.perspective-container button.perspective[data-id="' + ub.active_view + '"]').trigger('click');
    },

    onCancelAddApplication: function() {
        $(".container-add-view-application").show();
        $(".modifier_main_container .add-application-block").html("");
    },

    onSelectDesignType: function() {
        $(".design-type-container").find("button.uk-active").removeClass('uk-active');
        $(this).addClass('uk-active')
    },

    onSelectPerspective: function() {
        $(".perspective-container").find("button.uk-active").removeClass('uk-active');
        var view = $(this).data('id');

        // If FRONT perspective is clicked
        if ($(this).data('id') === "front") {
            // Remove class from the currently active PART then change it to FRONT BODY
            $(".parts-container").find('button.part.uk-active').removeClass('uk-active');
            $(".parts-container").find('button[data-id="Front Body"].part').addClass('uk-active')
            ApplicationPanel.events.showSideOptions(false, '')

        } else if ($(this).data('id') === "back") {
            // If BACK perspective is clicked
            // Remove class from the currently active PART then change it to BACK BODY
            $(".parts-container").find('button.part.uk-active').removeClass('uk-active');
            $(".parts-container").find('button[data-id="Back Body"].part').addClass('uk-active')
            ApplicationPanel.events.showSideOptions(false, '')
        } else if ($(this).data('id') === "left" || $(this).data('id') === "right") {
            // If LEFT or RIGHT perspective is clicked,
            var activePart = $(".parts-container").find('button.part.uk-active');
            var parts = ['Front Body', 'Back Body'];
            // If currently active PART is Front/Back Body,
            if (parts.includes(activePart.data('id'))) {
                // Change the active PART to SLEEVE
                activePart.removeClass('uk-active')
                $(".parts-container").find('button[data-id="Sleeve"].part').addClass('uk-active');
            }

            if (activePart.length === 0) {
                $(".parts-container").find('button[data-id="Sleeve"].part').addClass('uk-active');
            }
            // Show options for Sleeves, Side Panel, and Sleeve Insert
            ApplicationPanel.events.showSideOptions(true, $(this).data('id'));
        }

        if (ub.active_view !== view) {
            var perspective = new PerspectiveController();
            perspective.setPerspective(view)
        }

        $(this).addClass('uk-active')
    },

    onSelectPart: function() {
        $(".parts-container").find("button.uk-active").removeClass('uk-active');
        $(this).addClass('uk-active');

        if ($(this).data('id') === "Front Body") {
            // Change the active perspective to FRONT
            $(".perspective-container").find('button[data-id="front"].perspective').trigger('click');
            ApplicationPanel.events.showSideOptions(false, '')

        } else if ($(this).data('id') === "Back Body") {
            // Change the active perspective to BACk
            $(".perspective-container").find('button[data-id="back"].perspective').trigger('click');
            ApplicationPanel.events.showSideOptions(false, '')
        } else {
            // If SLEEVE, SIDE PANEL, or SLEEVE INSERT is clicked,
            var activePerspective = $(".perspective-container").find('button.perspective.uk-active');
            var perspectives = ['front', 'back']
            // And active perspective if FRONT OR BACK,
            if (perspectives.includes(activePerspective.data('id'))) {
                // Change the active perspective to LEFT
                $(".perspective-container").find('button[data-id="left"].perspective').trigger('click');
            }
        }
    },

    onSelectPartSide: function() {
        $(".side-container").find("button.uk-active").removeClass('uk-active');
        $(this).addClass('uk-active')

        // Change active perspective along with the side that is clicked
        $(".perspective-container").find('button[data-id="' + $(this).data('id') + '"].perspective').trigger('click');
    },

    onAddNewApplication: function() {
        var _perspective = $('.perspective-container button.perspective.uk-active').data('id');
        var _part = $('.parts-container button.part.uk-active').data('id');
        var _type = $('.design-type-container button.design-type-button.uk-active').data('type');
        var _side = $('.side-container button.side.uk-active').data('id');

        ub.funcs.newApplication(_perspective, _part, _type, _side);

        $(".container-add-view-application").show();
        $(".modifier_main_container .add-application-block").html("");
    },

    onChangeAccentColor: function() {
        // changing active color
        $(this).parent().parent().find('button').removeClass('activeColorItem').html('');
        $(this).addClass('activeColorItem').html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size"></span>');

        // proceed
        var dataId = $(this).attr('data-id');
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});

        var _layer_no = $(this).data('layer-no');
        var _color_code = $(this).data('color-code');
        var _layer_name = $(this).data('layer-name');
        var _colorObj = ub.funcs.getColorByColorCode(_color_code);
        var _layer = _.find(_settingsObject.accent_obj.layers, {name: _layer_name});

        _layer.default_color = _colorObj.hex_code;
        _settingsObject.color_array[_layer_no - 1] = _colorObj;

        ub.funcs.changeFontFromPopup(_settingsObject.font_obj.id, _settingsObject);
        ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj, 'accent');

        var _matchingID;
        var _matchingSide;
        _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

        if (typeof _matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            var _layer = _.find(_matchingSettingsObject.accent_obj.layers, {name: _layer_name});

            _layer.default_color = _colorObj.hex_code;
            _matchingSettingsObject.color_array[_layer_no - 1] = _colorObj;

            ub.funcs.changeFontFromPopup(_matchingSettingsObject.font_obj.id, _matchingSettingsObject);
        }
    },

    showSideOptions: function (show, id) {
        if (show) {
            $(".add-new-application-block").find('.sideOptions').removeClass('hide')
            $(".add-new-application-block").find('.sideOptions .side.uk-active').removeClass('uk-active')
            $(".add-new-application-block").find('.sideOptions button[data-id="' + id + '"].side').addClass('uk-active')
        } else {
            $(".add-new-application-block").find('.sideOptions').addClass('hide')
            $(".add-new-application-block").find('.sideOptions .side.uk-active').removeClass('uk-active')
            $(".add-new-application-block").find('.sideOptions button[data-id="na"].side').addClass('uk-active')
        }
    },
    // Application List
    onViewApplicationList: function() {
        var type = $(this).data("type")
        // Filter active
        var activeApplications = _.filter(ub.current_material.settings.applications, function(application) {
            if (ub.funcs.isTackleTwill()) {
                if (application.application_type === "free") {
                    return application
                }
            }
            if (typeof application.status === "undefined" || application.status === "on") {
                if (type === "letters") {
                    if (application.application_type === "team_name" || application.application_type === "player_name") {
                        return application;
                    }
                } else if (type === "numbers") {
                    if (application.application_type === 'front_number' || application.application_type === 'back_number' || application.application_type === 'sleeve_number') {
                        return application;
                    }
                } else if (type === "mascots") {
                    if (application.application_type === 'mascot' || application.application_type === 'embellishments') {
                        return application;
                    }
                }
            }
        });
        // Sort by zindex
        var _applicationCollection = _.sortBy(activeApplications, 'zIndex').reverse();

        var applicationObject = [];

        _.map(_applicationCollection, function(application) {
            var item = {
                zindex: application.zIndex,
                code: application.code,
                caption: ub.funcs.getSampleCaption(application),
                view: ub.funcs.getPrimaryView(application.application).substring(0, 1).toUpperCase(),
                application_type: application.application_type.toUpperCase().replace('_', ' '),
                type: application.application_type
            }

            applicationObject.push(item);
        });

        data = {
            applications: applicationObject
        };

        var applicationListUI = ub.utilities.buildTemplateString('#m-application-layer-list', data);

        $("#application-list-modal ul.application-list").html("")
        $("#application-list-modal ul.application-list").html(applicationListUI);

        ub.data.sorting = false;

        ub.sort = $("ul.application-list").sortable({
            handle: '.layer',
            animation: 150,
            onStart: function (evt) {
                ub.data.sorting = true;
                ub.data.justSorted = true;
            },
            onEnd: function (evt) {
                ub.data.sorting = false;
                ub.data.justSorted = true;

            },
            onUpdate: function (evt) {
                $.each($('li.layer'), function (key, value) {
                    var _length = _.size(ub.current_material.settings.applications);
                    var _index = _length - (key + 1);
                    var _locID = $(value).data('location-id');
                    var _app = ub.current_material.settings.applications[_locID];
                    _app.zIndex = _index;

                    $(this).find('li.zIndex').html(_index + 1);

                    if (_app.application_type === "free") {
                        return;
                    }

                    _.each(_app.application.views, function (view) {

                        var _obj = ub.objects[view.perspective + '_view']['objects_' + _locID];

                        if (_obj.zIndex !== 0) { // Skip changing zIndex if application is disabled
                            _obj.zIndex = -(ub.funcs.generateZindex('applications') + _index);
                        }
                    });
                });

                ub.updateLayersOrder(ub.front_view);
                ub.updateLayersOrder(ub.back_view);
                ub.updateLayersOrder(ub.left_view);
                ub.updateLayersOrder(ub.right_view);
            }
        });

        $("#application-list-modal").modal("show")
    },

    removeApplicationOnList: function() {
        /* Act on the event */
        var application_id = $(this).data("application-id");
        var application_type = $(this).data("application-type");

        _.delay(function() {
            $('li.applicationUIBlockNew[data-application-id="'+ application_id +'"] .hide-letters-opt').trigger('click');

            if (application_type === "embellishments" || application_type === "mascot") {
                $('li.applicationUIBlockNew[data-application-id="'+ application_id +'"] .hide-show-button-container .hide-application').trigger('click');
            }
        }, 50);

        $("#application-list-modal .application-list li.application-item-" + application_id).fadeOut();
    },

    onShowLocationMarker: function() {
        var status = $(this).data("status");

        if (status === "show") {
            $(this).data("status", "hide");
            $(this).html("");
            $(this).html("Hide Location Marker")
            ub.funcs.showLocations();
        }

        if (status === "hide") {
            $(this).data("status", "show");
            $(this).html("");
            $(this).html("Show Location Marker")
            ub.funcs.removeLocations();
        }

        $("#application-list-modal").modal("hide")
    },

    onClickApplicationLayer: function() {
        /* Act on the event */
        var location = $(this).data("location-id");
        var application_type = $(this).data("application-type");

        $("#primary_options_container").scrollTo('li.applicationUIBlockNew[data-application-id="'+ location +'"]', {duration: 700});
    }
}

$(function() {

    var ub = window.ub;

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
                isPlayerName: isPlayerName,
                status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
            }
            _appData.push(objStock);
        });

        // prepare data
        var templateData = {
            title: "DECORATION LETTERS",
            type: "letters",
            applications: _appData
        };

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-applications-letters-uikit', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);

        // var _htmlBuilder = ub.funcs.getNewApplicationContainer('DECORATION LETTERS', 'letters');
        // $('.modifier_main_container ul.application-container li').first().append(_htmlBuilder);

        if (ub.funcs.isTackleTwill()) {
            ub.funcs.getFreeApplicationsContainer('letters');
        }

        // initializer
        ub.funcs.initializer();

        // Setup
        _.map(_appData, function(application) {
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
                status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
            }
            _appData.push(objStock);
        });

        // var _htmlBuilder = ub.funcs.getNewApplicationContainer('DECORATION NUMBERS', 'numbers');
        // $('.modifier_main_container ul.application-container').append(_htmlBuilder);

        // prepare data
        var templateData = {
            title: "DECORATION NUMBERS",
            type: "numbers",
            applications: _appData
        };

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-applications-numbers-uikit', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);


        if (ub.funcs.isTackleTwill()) {
            ub.funcs.getFreeApplicationsContainer('numbers');
        }

        // initializer
        ub.funcs.initializer();

        // Setup
        _.map(_appData, function(application) {
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
                    name: 'Stock Mascot',
                });
                types.push({
                    type: 'embellishments',
                    name: 'Custom Mascot',
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
                partsData: ub.funcs.getFreeFormLayers(),
                isShow: isShow,
                type: _designType
            }

            _htmlBuilder = ub.utilities.buildTemplateString('#m-add-new-application', templateData);
        } else {
            var templateData = {
                isTwill: true,
                title: _title,
                disabled: 'disabled',
                type: _designType
            };

            _htmlBuilder = ub.utilities.buildTemplateString('#m-add-new-application', templateData)
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
    }

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
                slider: ub.funcs.isTackleTwill() ? false : true,
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
            console.log("appblock 0")
        } else {
            // Existing application
            console.log("appblock !0")
            appBlock.replaceWith(_htmlBuilder);
        }

        setTimeout(function () { $('.modifier_main_container').scrollTo($('li[data-application-id=' + _settingsObject.code + '].applicationUIBlockNew')) }, 200)

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
                if (_.contains(_validApplicationTypes, 'embellishments')) {
                    _types.push({
                        name: 'embellishments',
                        defaultText: 'Custom Mascot'
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
    }

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
    }
});