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

ApplicationEvent.events = {
    isInit: true,

    init: function() {
        var _this = this;
        if (ApplicationEvent.events.isInit) {
            $("#primary_options_container").on('click', '.view-letters-opt', _this.onViewApplicationOptions);
            $("#primary_options_container").on('click', '.hide-letters-opt', _this.onHideApplicationOptions);
            $("#primary_options_container").on('click', '.thumbnailContainer', _this.onSelectFontAccent);
            $("#primary_options_container").on('keypress', 'input.app-letters-input', _this.onKeyPressApplicationText);
            $("#primary_options_container").on('blur', 'input.app-letters-input', _this.onBlurApplicationText);
            $("#primary_options_container").on('click', 'a.fontStyleLeft, a.fontStyleRight', _this.onChangeFontStyle);
            $("#primary_options_container").on('click', '.change-free-app', _this.onChangeFreeApplication);
            $('#primary_options_container').on('click', '.colorItem[data-object-type="accent"]', _this.onChangeAccentColor);
            $("#primary_options_container").on('click', '.remove-decoration', _this.onRemoveDecoration);
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

    onRemoveDecoration: function() {
        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        var applicationSettings = ub.funcs.getApplicationSettings(application_id);
        var isLetters = applicationSettings.application_type === "player_name" || applicationSettings.application_type === "team_name" ? true : false;
        var isMascots = applicationSettings.application_type === "mascot" || applicationSettings.application_type === "embellishments" ? true : false;
        var isNumbers = applicationSettings.application_type === "front_number" || applicationSettings.application_type === "back_number" || applicationSettings.application_type === "sleeve_number" ? true : false;
        
        UIkit.modal.confirm('Are you sure you want to delete ' + applicationSettings.application.name + ' #' + applicationSettings.code + '?').then(function() {
            $('.modifier_main_container').find($('li[data-application-id=' + applicationSettings.code + '].applicationUIBlockNew')).remove();
            ub.funcs.deleteLocation(applicationSettings.code);
            var count;
            if (isLetters) {
                count = ub.funcs.countApplicationByApplicationType("letters");
            } else if (isMascots) {
                count = ub.funcs.countApplicationByApplicationType("logos");
            } else if (isNumbers) {
                count = ub.funcs.countApplicationByApplicationType("numbers");
            }

            console.log(count)

            if (typeof count.applications === "undefined") {
                $(".add-another-application-container").hide();
            }
        
        }, function () {
            console.log('Rejected.') 
        });
    }
}