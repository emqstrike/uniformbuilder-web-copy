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

    // on click flip
    $('#primary_options_container').on('click', '.flipBtn', function () {
        var dataId = $(this).attr('data-id');
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
        ub.funcs.flipMascot(_settingsObject);

        $(this).toggleClass('active');
    });

    // on click view slidersContainer
    $('#primary_options_container').on('click', '.view-sliders', function () {
        $(this).addClass('active');
        $(this).next().removeClass('active');
        $(this).parent().next().fadeIn();
    });

    // on click hide slidersContainer
    $('#primary_options_container').on('click', '.hide-sliders', function () {
        $(this).addClass('active');
        $(this).prev().removeClass('active');
        $(this).parent().next().hide();
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
                    'perspective': i.application.views[0].perspective,
                    'name': i.embellishment.name,
                    'viewArtDetails': ub.config.host + '/utilities/previewEmbellishmentInfo/' + i.embellishment.design_id,
                    'viewPrint': i.embellishment.svg_filename,
                }
                _appData.push(objCustom);
            } else if (i.application_type === 'mascot') {
                var objStock = {
                    'thumbnail': i.mascot.icon,
                    'type': 'STOCK MASCOT',
                    'code': i.code,
                    'perspective': i.application.views[0].perspective,
                    'name': i.mascot.name
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

        // slider scale
        var scaleSliders = document.getElementsByClassName('slider-control-scale');
        $(scaleSliders).each(function(i){
            noUiSlider.create(scaleSliders[i], {
                animate: true,
                animationDuration: 300,
                start: [50],
                range: {
                    min: 1,
                    max: 100,
                },
                tooltips: true,
                format: wNumb({
                    decimals: 0
                }),
                pips: {
                    mode: 'steps',
                    stepped: true,
                    density: 4
                }
            });

            $(this).find('.noUi-value-large').first().html('Small');
            $(this).find('.noUi-value-large').last().html('Large');
        });

        // slider move X
        var moveXSliders = document.getElementsByClassName('slider-control-move-x');
        $(moveXSliders).each(function(i){
            noUiSlider.create(moveXSliders[i], {
                animate: true,
                animationDuration: 300,
                start: [50],
                range: {
                    min: 1,
                    max: 100,
                },
                tooltips: true,
                format: wNumb({
                    decimals: 0
                }),
                pips: {
                    mode: 'steps',
                    stepped: true,
                    density: 4
                }
                // pips: {
                //     mode: 'values',
                //     values: [0, 25, 50, 75, 100],
                //     density: 4,
                // }
            });

            $(this).find('.noUi-value-large').first().html('Small');
            $(this).find('.noUi-value-large').last().html('Large');
        });

        // slider move Y
        var moveYSliders = document.getElementsByClassName('slider-control-move-y');
        $(moveYSliders).each(function(i){
            noUiSlider.create(moveYSliders[i], {
                animate: true,
                animationDuration: 300,
                start: [50],
                range: {
                    min: 1,
                    max: 100,
                },
                tooltips: true,
                format: wNumb({
                    decimals: 0
                }),
                pips: {
                    mode: 'steps',
                    stepped: true,
                    density: 4
                }
                // pips: {
                //     mode: 'values',
                //     values: [0, 25, 50, 75, 100],
                //     density: 4,
                // }
            });

            $(this).find('.noUi-value-large').first().html('Small');
            $(this).find('.noUi-value-large').last().html('Large');
        });

        // slider rotate
        var rotateSliders = document.getElementsByClassName('slider-control-rotate');
        $(rotateSliders).each(function(i){
            $(rotateSliders[i]).roundSlider({
                sliderType: "min-range",
                handleShape: "round",
                width: 15,
                radius: 85,
                value: [50],
                startAngle: 90,

                // drag: function (args) {
                //
                //     ub.funcs.updateRotationViaSlider(_settingsObject, args.value);
                //
                // }

            });
        });
    };

});