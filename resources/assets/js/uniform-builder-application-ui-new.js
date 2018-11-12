/*jslint browser: true */
/*global window */

"use strict";

$(function() {

    var ub = window.ub;

    // on click on any group pane switch to active
    // $('#property-modifiers-menu > .group-pane').on('click', function () {
    //     $('#property-modifiers-menu > .group-pane').removeClass('active');
    //     $(this).addClass('active');
    // });

    // on click mascot and embellishments group #7
    $('#property-modifiers-menu > .group-7').on('click', function () {
        ub.funcs.startNewApplication();
    });

    // Aron Joshua
    // $('#property-modifiers-menu > .group-2').on('click', function () {
    // $('.property-modifiers-menu .menu-item-parts').on('click', function () {
    //     ub.funcs.deActivateApplications();
    //     ub.funcs.deActivateLocations();

    //     if ($("#primary_options_colors").css("display") === "none") {
    //         var prop = new PropertiesPanel('#primary_options_container', 'Richardsons');
    //     }

    //     if ($("#primary_options_container #primary_options_colors").length > 0) {

    //         $(".parts-container").show();
    //         $("#parts-with-insert-container").hide();

    //     } else {

    //         var prop = new PropertiesPanel('#primary_options_container', 'Richardsons');
    //         $("#parts-with-insert-container").hide();

    //     }
    // });

    // Aron Joshua
    // $('#property-modifiers-menu > .group-3').on('click', function () {
    $('.property-modifiers-menu .menu-item-inserts').on('click', function () {
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();

        if ($("#primary_options_colors").css("display") === "none")
        {
            var prop = new PropertiesPanel('#primary_options_container', 'Richardsons');
        }

        if ($("#primary_options_container #primary_options_colors").length > 0)
        {
            $(".parts-container").hide();
            $("#parts-with-insert-container").show();
        }
        else
        {
            var prop = new PropertiesPanel('#primary_options_container', 'Richardsons');
            $(".parts-container").hide();
            $("#parts-with-insert-container").show();
        }
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