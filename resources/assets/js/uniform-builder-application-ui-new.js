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

    // Aron Joshua
    $('#new-toolbar > .group-2').on('click', function () {
        console.log('Color Pattern Panel');
        var prop = new PropertiesPanel('primary_options_container', 'ProLook Sports');
    });

    // Aron Joshua
    $('#new-toolbar > .group-3').on('click', function () {
        console.log('Insert Panel');
        var prop = new PropertiesPanel('primary_options_container', 'ProLook Sports', false);
    });

    ub.funcs.startNewApplication = function () {
        console.info('=======APPLICATION UI BLOCK=======');

        // clear contents
        $('#mod_primary_panel > .modifier_main_container').empty();

        // get applications and filter
        var _Applications = ub.current_material.settings.applications;
        var _filteredApplications = _.filter(_Applications, function(i) {
            if (i.application_type === 'mascot' || i.application_type === 'embellishments') {
                return i;
            }
        });

        var _appData = [];

        // getting only data that i need
        _.map(_filteredApplications, function (i) {
            if (i.application_type === 'embellishments') {
                var objCustom = {
                    'thumbnail': i.embellishment.thumbnail,
                    'type': 'CUSTOM LOGO',
                    'code': i.code,
                    'perspective': i.application.views[0].perspective
                }
                _appData.push(objCustom);
            } else if (i.application_type === 'mascot') {
                var objStock = {
                    'thumbnail': i.mascot.icon,
                    'type': 'STOCK MASCOT',
                    'code': i.code,
                    'perspective': i.application.views[0].perspective
                }
                _appData.push(objStock);
            }
        });

        // prepare data
        var templateData = {
            applications: _appData
        };

        console.log('_filteredApplications===>', _filteredApplications);
        console.log('templateData===>', templateData);

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block', templateData);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);
    };

});