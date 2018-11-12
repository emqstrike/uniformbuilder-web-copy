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

    // on click view slidersContainer
    $('#primary_options_container').on('click', '.view-letters-opt', function () {
        $(this).addClass('active');
        $(this).next().removeClass('active');
        $(this).closest('.applicationUIBlock').find('.lettersOptsContainer').fadeIn();
    })
    .on('click', '.hide-letters-opt', function () {
        $(this).addClass('active');
        $(this).prev().removeClass('active');
        $(this).closest('.applicationUIBlock').find('.lettersOptsContainer').hide();
    })
    .on('click', '.main-color', function () {
        $(this).addClass('active');
        $(this).next().removeClass('active');
    })
    .on('click', '.outline-color', function () {
        $(this).addClass('active');
        $(this).prev().removeClass('active');
    })
    .on('click', '.thumbnailContainer', function () {
        $('.thumbnailContainer.active').removeClass('active')
        $(this).addClass('active')

        var id = $(this).closest('.applicationUIBlock').data('application-id').toString()
        var settingsObj = _.find(ub.current_material.settings.applications, {code: id});
        var accentID = $(this).data('accent-id');

        ub.funcs.changeAccentFromPopup(accentID, settingsObj);
        ub.funcs.activateApplications(settingsObj.code);

        var matchingID = undefined;
        matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

        if (typeof matchingID !== "undefined") {

            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: matchingID.toString()});
            ub.funcs.changeAccentFromPopup(accentID, _matchingSettingsObject);

        }
    })
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
                    'fontCaption': i.font_obj.caption


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
                    'fontCaption': i.font_obj.caption
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
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block-letters', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);
    }

});