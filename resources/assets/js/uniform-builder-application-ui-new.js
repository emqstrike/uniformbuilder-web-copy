/*jslint browser: true */
/*global window */

"use strict";

$(function() {

    var ub = window.ub;
    var util =  window.util;

/*
                      _
                     | |
  _____   _____ _ __ | |_ ___
 / _ \ \ / / _ \ '_ \| __/ __|
|  __/\ V /  __/ | | | |_\__ \
 \___| \_/ \___|_| |_|\__|___/

*/

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

    // on click color item
    $('#primary_options_container').on('click', '.colorItem', function () {

        // changing active color
        $(this).parent().find('span').removeClass('activeColorItem').html('');
        $(this).addClass('activeColorItem').html('<i class="fa fa-check" aria-hidden="true"></i>');

        // proceed
        var dataId = $(this).attr('data-id');
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});

        var _layer_no = $(this).data('layer-no');
        var _color_code = $(this).data('color-code');
        var _layer_name = $(this).data('layer-name');
        var _temp = $(this).data('temp');
        var _colorObj = ub.funcs.getColorByColorCode(_color_code);


        var _oldVal = {

            layerNo: _layer_no,
            color: _settingsObject.color_array[_layer_no - 1],
            applicationCode: _settingsObject.code,

        };

        if (_temp !== 'undo') {

            ub.funcs.pushOldState('color change', 'application', _settingsObject, _oldVal);

        }

        ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject);
        ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

        var _processMatchingSide = true;
        var _matchingID = undefined;
        var _matchingSettingsObject = undefined;

        _matchingID = ub.data.matchingIDs.getMatchingID(_id);

        if (typeof _matchingID !== "undefined") {
            _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
        }

        // On Crew Socks, only change the color of the matching side if its the same mascot id
        if (typeof _matchingSettingsObject !== "undefined") {

            if (_matchingSettingsObject.type !== "free" && ub.funcs.isSocks()) {

                _processMatchingSide = false;

            }

            if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {

                if (_settingsObject.mascot.id === _matchingSettingsObject.mascot.id) {
                    _processMatchingSide = true;
                }

            }

        }

        if (typeof _matchingID !== "undefined") {

            if (_processMatchingSide) {

                ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);

            }

        }

    });

/*

  __                  _   _
 / _|                | | (_)
| |_ _   _ _ __   ___| |_ _  ___  _ __  ___
|  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
| | | |_| | | | | (__| |_| | (_) | | | \__ \
|_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

 */

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
                    thumbnail: i.embellishment.thumbnail,
                    type: 'CUSTOM LOGO',
                    code: i.code,
                    perspective: i.application.views[0].perspective,
                    name: i.embellishment.name,
                    viewArtDetails: ub.config.host + '/utilities/previewEmbellishmentInfo/' + i.embellishment.design_id,
                    viewPrint: i.embellishment.svg_filename,
                    slider: true,
                    sliderContainer: ub.funcs.sliderContainer(i.code)
                };
                _appData.push(objCustom);
            } else if (i.application_type === 'mascot') {
                var objStock = {
                    thumbnail: i.mascot.icon,
                    type: 'STOCK MASCOT',
                    code: i.code,
                    perspective: i.application.views[0].perspective,
                    name: i.mascot.name,
                    slider: true,
                    sliderContainer: ub.funcs.sliderContainer(i.code),
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE STOCK MASCOT COLORS')
                };
                _appData.push(objStock);
            }
        });

        // prepare data
        var props = {
            applications: _appData
        };

        console.log('_filteredApplications===>', _filteredApplications);
        console.log('props===>', props);

        // send to mustache
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-application-ui-block', props);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);

        // initializer
        ub.funcs.initializer();



    };

    ub.funcs.initializer = function () {
        // slider scale
        var scaleSliders = document.getElementsByClassName('slider-control-scale');
        $(scaleSliders).each(function(i){
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initScalePanel(scaleSliders[i], _settingsObject, _applicationType);
            $(this).find('.noUi-value-large').first().html('Small');
            $(this).find('.noUi-value-large').last().html('Large');
        });

        // slider move X
        var moveXSliders = document.getElementsByClassName('slider-control-move-x');
        $(moveXSliders).each(function(i){
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initMovePanelX(moveXSliders[i],_settingsObject, _applicationType);
            $(this).find('.noUi-value-large').first().html('Left');
            $(this).find('.noUi-value-large').last().html('Right');
        });

        // slider move Y
        var moveYSliders = document.getElementsByClassName('slider-control-move-y');
        $(moveYSliders).each(function(i){
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initMovePanelY(moveYSliders[i],_settingsObject, _applicationType);
            $(this).find('.noUi-value-large').first().html('Down');
            $(this).find('.noUi-value-large').last().html('Up');
        });

        // slider rotate
        var rotateSliders = document.getElementsByClassName('slider-control-rotate');
        $(rotateSliders).each(function(i){
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initRotatePanel(rotateSliders[i], _settingsObject, _applicationType);
        });

        // add class active to all first tab of color selection tab
        var colorFirstTab = document.getElementsByClassName('color-selection-tab');
        $(colorFirstTab).each(function(){
            $(this).find('li:first-child').addClass('active');
        });
        var colorFirstTabContent = document.getElementsByClassName('tab-content');
        $(colorFirstTabContent).each(function(){
            $(this).find('.tab-pane:first-child').addClass('in active');
        });
    };

    ub.funcs.initRotatePanel = function (element, _settingsObject, applicationType) {

        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _start = ub.objects[_v + '_view']['objects_' + _settingsObject.code].rotation;

        $(element).roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            width: 15,
            radius: 85,
            value: _start,
            startAngle: 90,

            drag: function (args) {

                ub.funcs.updateRotationViaSlider(_settingsObject, args.value);

            }

        });

    };

    ub.funcs.initScalePanel = function (element, _settingsObject, applicationType) {

        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _start = (_multiplier * ub.objects[_v + '_view']['objects_' + _settingsObject.code].scale.x) / 3;

        if (typeof element.noUiSlider === "object") {
            element.noUiSlider.set(_start);
            return;
        }

        noUiSlider.create(element, {
            animate: true,
            animationDuration: 300,
            start: _start,
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

        element.noUiSlider.on('update', function (values, handle) {

            var _value = values[0];
            ub.funcs.updateScaleViaSlider(_settingsObject, _value);

        });

    };

    ub.funcs.initMovePanelX = function (element, _settingsObject, applicationType) {

        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _startX = ub.objects[_v + '_view']['objects_' + _settingsObject.code].position.x;

        _startX = _startX / ub.dimensions.width * 100;

        if (typeof element.noUiSlider === "object") {
            element.noUiSlider.set(_startX);
            return;
        }

        noUiSlider.create(element, {
            animate: true,
            animationDuration: 300,
            start: _startX,
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

        element.noUiSlider.on('update', function (values, handle) {

            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'x');

        });

    };

    ub.funcs.initMovePanelY = function (element, _settingsObject, applicationType) {

        var _multiplier = 100;
        if (applicationType !== "mascot") {
            _multiplier = 10;
        }

        var _v = ub.funcs.getPrimaryView(_settingsObject.application);
        var _startY = ub.objects[_v + '_view']['objects_' + _settingsObject.code].position.y;

        _startY = _startY / ub.dimensions.height * 100;

        if (typeof element.noUiSlider === "object") {
            element.noUiSlider.set(_startY);
            return;
        }

        noUiSlider.create(element, {
            animate: true,
            animationDuration: 300,
            start: _startY,
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

        element.noUiSlider.on('update', function (values, handle) {

            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'y');

        });

    };

    ub.funcs.sliderContainer = function (_code) {

        // prepare data
        var props = {
            code: _code
        }

        // send to mustache
        return ub.utilities.buildTemplateString('#m-slider-container', props);

    };

    ub.funcs.colorsSelection = function (id, _title) {

        var _settingsObject = _.find(ub.current_material.settings.applications, {code: id});
        var _colorBlock = '';
        var _html = '';

        if (ub.current_material.settings.applications[id].mascot.id !== "1039") {

            _html += '<div class="colorSelectionContainer">';
                _html += '<h4>'+_title+'</h4>';
                _html += '<ul class="nav nav-tabs nav-justified color-selection-tab">';

                    _.each(_settingsObject.mascot.layers_properties, function (layer) {

                        var _hexCode = layer.default_color;
                        var _color = ub.funcs.getColorByColorCode(_hexCode);

                        if (typeof _color !== 'undefined') {

                            // adding tabs
                            _html += '<li><a href="#tab' + layer.layer_number + '" data-toggle="tab">' + 'Color' + layer.layer_number + '</a></li>';

                            // building separated color blocks
                            _colorBlock += ub.funcs.createColorBlock(id, _color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color, 'mascots');

                        } else {
                            util.error('Hex Code: ' + _hexCode + ' not found!');
                        }

                    });

                _html += '</ul>';
                _html += '<div class="tab-content">';
                    _html += _colorBlock;
                _html += '</div>';
            _html += '</div>';

        }

        return _html;

    };

    ub.funcs.createColorBlock = function (_id, activeColorCode, layer_no, layer_name, active_color, objectType) {

        var _html = '';
        var _cObj = ub.funcs.getColorByColorCode(activeColorCode);
        var _teamColors = ub.current_material.settings.team_colors;

        var _objectType = objectType;

        if (typeof objectType === "undefined") {
            _objectType = 'not-set';
        }

        _teamColors = _.sortBy(_teamColors, "order");
        _html += '<div id="tab' + layer_no + '" class="tab-pane fade">';
            _.each(_teamColors, function (_color) {

                var _checkMark = '&nbsp;';
                // var _style = "25px";
                var _class = '';

                if (activeColorCode === _color.color_code) {
                    _checkMark = '<i class="fa fa-check" aria-hidden="true"></i>';
                    _class = 'activeColorItem';
                }

                var _colorObj = ub.funcs.getColorByColorCode(_color.color_code);
                // _html += '<span style="width: ' + _style + ';background-color: #' + _colorObj.hex_code + '; color: #' + _colorObj.forecolor + ';" class="colorItem ' + _class + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type=' + _objectType + '>' + _checkMark + '</span>';

                _html += '<span data-id="' + _id + '" class="colorItem ' + _class + '" style="background-color:#' + _colorObj.hex_code + '; color:#' + _colorObj.forecolor + ';" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">' + _checkMark + '</span>';

            });
        _html += '</div>';

        return _html;

    };

});