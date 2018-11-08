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

        var _accentsThumbnails = _.map(ub.data.accents.items, function (i) {
            return { name : '/images/sidebar/' + i.thumbnail };
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
                    'placeholder': 'Your team name'


                }
                _appData.push(objCustom);
            } else if (i.application_type === 'player_name') {
                var objStock = {
                    // 'thumbnail': i.mascot.icon,
                    'type': 'PLAYER NAME',
                    'code': i.code,
                    'perspective': i.application.views[0].perspective,
                    // 'name': i.mascot.name
                    'placeholder': 'Your name'
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