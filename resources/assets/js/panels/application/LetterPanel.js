/**
 * LetterPanel.js
 * - handler for the application letter
 * @since March 26, 2019
 * @author 
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  Handle Letter Panel 
 */

function LetterPanel() {}

LetterPanel.init = function() {
    $('#mod_primary_panel > .modifier_main_container').empty();

    // get applications and filter
    var _Applications = ub.current_material.settings.applications;
    var _filteredApplications = _.filter(_Applications, function(i) {
        // if (i.application_type === 'team_name' || i.application_type === 'player_name') {
        //     return i;
        // }

        if (i.application_type === 'team_name') {
            return i;
        }
    });

    var _appData = [];

    // getting only data needed
    _.map(_filteredApplications, function (i) {
        var isPlayerName = i.application_type === "player_name" ? 'disabled' : '';

        var objStock = {
            isTackleTwill: ub.funcs.isTackleTwill() ? 'uk-disabled' : '',
            application_type: i.application_type,
            type: i.application.name.toUpperCase(),
            defaultText: i.text,
            code: i.code,
            perspective: i.application.views[0].perspective,
            placeholder: 'Your ' + i.application.name.toLowerCase(),
            fonts: true,
            fontsData: ub.funcs.fontStyleSelection(i, i.application.name.toUpperCase()),
            slider: true,
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
        isTackleTwill: ub.funcs.isTackleTwill() ? 'uk-disabled bgc-light' : '',
        title: "name",
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
    ub.funcs.setupApplicationSettings(_appData);
    ub.funcs.initializer();
    ApplicationEvent.events.init();
    NewApplicationPanel.events.init();
}