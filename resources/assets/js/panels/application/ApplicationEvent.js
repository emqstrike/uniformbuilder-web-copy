/**
 * ApplicationEvent.js
 * - handler for the application events
 * @since March 26, 2019
 * @author 
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  For binding of application(Names, Letters) events 
 */


function ApplicationEvent() {

}

ApplicationEvent.maxLengthCheck = function (object) {
    if (object.value.length > object.max.length) {
        object.value = object.value.slice(0, object.max.length)
    }
};

/**
 * Change font style
 * If direction parameter is set, font_id must be not set vice versa.
 *
 * @param  {int} app_id
 * @param  {string} direction
 * @param  {int} font_id
 * @return {void}
 */
ApplicationEvent.changeFontStyle = function(app_id, direction, font_id) {
    app_id = app_id.toString();
    var settingsObject = _.find(ub.current_material.settings.applications, {code: app_id});

    var newFont;

    if (direction !== false) {
        newFont = ub.funcs.getFontObj(direction, settingsObject.font_obj);
    } else {
        newFont = _.find(ub.data.fonts, {id: font_id.toFixed()});
    }

    if (typeof newFont !== 'undefined') {
        font_id = newFont.id;

        ub.funcs.changeFontFromPopup(font_id, settingsObject);
        var font_style_el = $('#font-styles-container');

        font_style_el.find('.font_name').text(newFont.caption);
        font_style_el.find('.font_name').css('font-family', newFont.name);
    } else {
        // No Font!
        return;
    }

    if (settingsObject.type === "front_number" || settingsObject.type === "back_number") {
        _.each(ub.current_material.settings.applications, function (application) {
            if (application.type !== settingsObject.application_type && application.type !== "logo" && application.type !== "mascot") {
                if (settingsObject.type.indexOf('number') !== -1 && application.type.indexOf('number') !== -1) {
                    ub.funcs.changeFontFromPopup(font_id, application);
                }
            }
        });
    }

    var _matchingID = ub.data.matchingIDs.getMatchingID(app_id);

    if (typeof _matchingID !== "undefined") {
        var matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
        ub.funcs.changeFontFromPopup(font_id, matchingSettingsObject);
    }
};

ApplicationEvent.createFontPopup = function(sampleText, settingsObj) {
    var applicationType = settingsObj.application_type;
    ub.status.fontPopupVisible = true;

    var sampleSize = '1.9em';
    var paddingTop = '40px';

    if (applicationType === "front_number" || applicationType === "back_number") {

        sampleSize = '3.3em';
        paddingTop = '30px';

    }

    var data = {
        label: 'Choose Font: ',
        fonts: ub.data.fonts,
        sampleText: sampleText,
        applicationType: applicationType,
        sampleSize: sampleSize,
        paddingTop: paddingTop,
    };

    var template = $('#m-font-popup').html();
    var markup = Mustache.render(template, data);

    $('body').append(markup);

    $popup = $('div#primaryFontPopup');
    $popup.fadeIn();

    ub.funcs.centerPatternPopup();

    $('div.fontPopupResults > div.item').hover(
        function () {
            $(this).find('div.name').addClass('pullUp');
        }, function () {
            $(this).find('div.name').removeClass('pullUp');
        }
    );

    $('div.fontPopupResults > div.item').on('click', function () {
        var font_id = $(this).data('font-id');

        ApplicationEvent.changeFontStyle(settingsObj.code, false, font_id);
    });

    ub.funcs.centerFontPopup();

    $('div.close-popup').on('click', function () {

        $popup.remove();
        ub.status.fontPopupVisible = false;

    });

    $popup.bind('clickoutside', function () {

        var _status = $(this).data('status');

        if (_status === 'hidden') {

            $(this).data('status', 'visible');
            return;

        }

        $(this).data('status', 'hidden');
        $(this).hide();
        $(this).remove();
        ub.status.fontPopupVisible = false;

    });
};

ApplicationEvent.events = {
    isInit: true,

    init: function() {
        var _this = this;
        if (ApplicationEvent.events.isInit) {
            $("#primary_options_container").on('click', '.view-letters-opt', _this.onViewApplicationOptions);
            $("#primary_options_container").on('click', '.hide-letters-opt', _this.onHideApplicationOptions);
            $("#primary_options_container").on('click', '.thumbnailContainer', _this.onSelectFontAccent);
            $("#primary_options_container").on('keypress', '..applicationUIBlockNew input.app-letters-input', _this.onKeyPressApplicationText);
            $("#primary_options_container").on('blur', '.applicationUIBlockNew input.app-letters-input', _this.onBlurApplicationText);
            $("#primary_options_container").on('click', '.applicationUIBlockNew .select-font-style', _this.onCreateFontPopUp);
            $("#primary_options_container").on('click', '.applicationUIBlockNew a.fontStyleLeft, a.fontStyleRight', _this.onChangeFontStyle);
            $("#primary_options_container").on('click', '.change-free-app', _this.onChangeFreeApplication);
            $('#primary_options_container').on('click', '.colorItem[data-object-type="accent"]', _this.onChangeAccentColor);
            ApplicationEvent.events.isInit = false;
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

    onKeyPressApplicationText: function(e) {
        var _val = $(this).val();
        var id = $(this).closest('.applicationUIBlockNew').data('application-id').toString()
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: id});
        var _isFreeFormEnabled = ub.funcs.isFreeFormToolEnabled(id);

        if (_val.length === 0) {
            return;
        }

        if (e.keyCode === 13) {
            _settingsObject.text = _val;

            if (typeof _settingsObject.tailsweep !== "undefined") {
                // Tailsweep, is off for now
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

        if (_val.length === 0) {
            return;
        }

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

    onCreateFontPopUp: function() {
        var app_code = $(this).data('application-code');
        var settingsObj = _.find(ub.current_material.settings.applications, {code: app_code.toString()});

        if (typeof settingsObj !== "undefined") {
            var sample_text = $(this).closest('.lettersOptsContainer').find('input.app-letters-input').val();

            if (_.isEmpty(sample_text)) {
                sample_text = "Sample Text";
            }

            ApplicationEvent.createFontPopup(sample_text, settingsObj);
        } else {
            console.log("Error: Application code " + app_code + " is invalid code.");
        }
    },

    onChangeFontStyle: function() {
        var id = $(this).closest('.applicationUIBlockNew').data('application-id');
        var direction = $(this).data('direction');

        ApplicationEvent.changeFontStyle(id, direction);
    },

    onChangeFreeApplication: function() {
        var _id = $(this).closest('.applicationUIBlockNew').data('application-id');
        var _type = $(this).data('type')
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: _id.toString() });
        _settingsObject.status = 'on';
        ub.funcs.changeApplicationType(_settingsObject, _type)
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
}