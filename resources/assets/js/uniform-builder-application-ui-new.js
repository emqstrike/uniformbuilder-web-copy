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
    $('#new-toolbar > .group-7').on('click', function () {
        console.log('GROUP 7 CLICKED===>');
        ub.funcs.startNewApplication();
    });

    ub.funcs.startNewApplication = function () {
        console.info('=======APPLICATION UI BLOCK=======');

        // clear contents
        $('#mod_primary_panel > .modifier_main_container').empty();

        // get applications
        var _Applications = ub.current_material.settings.applications;
        var _filteredApplications = _.filter(_Applications, function(i) {
            if (i.application_type === 'mascot' || i.application_type === 'embellishments') {
                return i;
            }
        });

        var templateData = {
            filteredApplications: _filteredApplications,
            names: [
                {"name": "Mustache"},
                {"name": "HandleBar"}
            ]
        };

        console.log('templateData===>', templateData);

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block', templateData);

        $('.modifier_main_container').append(_htmlBuilder);
    };

});