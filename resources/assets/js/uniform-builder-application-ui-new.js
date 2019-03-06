/*jslint browser: true */
/*global window */

"use strict";

function ApplicationMascotPanel() {

};

ApplicationMascotPanel.events = {
    is_init: 0,

    init: function() {
        var _this = this;
        if (ApplicationMascotPanel.events.is_init === 0) {
            $('#primary_options_container').on('click', '.flipBtn', _this.onFlipMascot);
            $('#primary_options_container').on('click', '.view-sliders', _this.onShowMascot);
            $('#primary_options_container').on('click', '.hide-sliders', _this.onHideMascot);
            $('#primary_options_container').on('click', '.colorItem[data-object-type="mascots"]', _this.onChangeMascotColor);
            ApplicationMascotPanel.events.is_init = 1;
        }
    },

    onFlipMascot: function() {
        var dataId = $(this).attr('data-id');
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
        ub.funcs.flipMascot(_settingsObject);

        $(this).toggleClass('uk-active');
    },

    onShowMascot: function() {
        $(this).addClass('active');
        $(this).next().removeClass('active');
        $(this).closest('.applicationUIBlock').find('.slidersContainer, .colorSelectionContainer').fadeIn();
        $(this).closest('.applicationUIBlock').find('.thumb-container .thumbnail').removeClass('disabled-image');
        var application_id = $(this).closest(".applicationUIBlock").data('application-id');
        ub.funcs.manipulateApplicationByStatus("on", application_id);
    },

    onHideMascot: function() {
        $(this).addClass('active');
        $(this).prev().removeClass('active');
        $(this).closest('.applicationUIBlock').find('.slidersContainer, .colorSelectionContainer').hide();
        $(this).closest('.applicationUIBlock').find('.thumb-container .thumbnail').addClass('disabled-image');
        var application_id = $(this).closest(".applicationUIBlock").data('application-id');
        ub.funcs.manipulateApplicationByStatus("off", application_id);
        ub.funcs.deactivateMoveTool();
    },

    onChangeMascotColor: function() {
        // changing active color
        $(this).parent().parent().find('button').removeClass('activeColorItem').html('');
        $(this).addClass('activeColorItem').html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size"></span>');

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

        _matchingID = ub.data.matchingIDs.getMatchingID(dataId);

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
    }
}

$(function() {

    var ub = window.ub;
    var util =  window.util;

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
                    slider: ub.funcs.isTackleTwill() ? false : true,
                    sliderContainer: ub.funcs.sliderContainer(i.code),
                    status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
                };
                _appData.push(objCustom);
            } else if (i.application_type === 'mascot') {
                var objStock = {
                    thumbnail: i.mascot.icon,
                    type: 'STOCK MASCOT',
                    code: i.code,
                    perspective: i.application.views[0].perspective,
                    name: i.mascot.name,
                    slider: ub.funcs.isTackleTwill() ? false : true,
                    sliderContainer: ub.funcs.sliderContainer(i.code),
                    colorPicker: true,
                    colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE STOCK MASCOT COLORS'),
                    status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
                };
                _appData.push(objStock);
            }
        });

        // prepare data
        var props = {
            title: "DECORATION",
            type: "mascots",
            applications: _appData
        };

        // add the "Add Application" button
        // var _htmlBuilder = ub.funcs.getNewApplicationContainer('DECORATION', 'mascots');
        // $('.modifier_main_container').append(_htmlBuilder);

        _htmlBuilder = ub.utilities.buildTemplateString('#m-applications-mascot-uikit', props);

        // output to page
        $('.modifier_main_container').append(_htmlBuilder);

        _.map(_appData, function(application) {
            if (application.application_type !== "free") {
                if (application.status) {
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"] div.toggleApplications .view-sliders').addClass('active');
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"] div.toggleApplications .hide-sliders').removeClass('active');
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"]').find('.slidersContainer, .colorSelectionContainer').fadeIn();
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"]').find('.thumb-container .thumbnail').removeClass('disabled-image');
                } else {
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"] div.toggleApplications .hide-sliders').addClass('active');
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"] div.toggleApplications .view-sliders').removeClass('active');
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"]').find('.slidersContainer, .colorSelectionContainer').hide();
                    $('.applicationUIBlock[data-application-id="'+ application.code +'"]').find('.thumb-container .thumbnail').addClass('disabled-image');
                }
            }
        });

        if (ub.funcs.isTackleTwill()) {
            ub.funcs.getFreeApplicationsContainer('mascots');
        }
        // initializer
        ub.funcs.initializer();
    };

    ub.funcs.initializer = function () {
        // slider scale
        var scaleSliders = document.getElementsByClassName('slider-control-scale');
        $(scaleSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initScalePanel(scaleSliders[i], _settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
            $(this).find('.noUi-value-large').first().html('Small');
            $(this).find('.noUi-value-large').last().html('Large');
        });

        // slider move X
        var moveXSliders = document.getElementsByClassName('slider-control-move-x');
        $(moveXSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initMovePanelX(moveXSliders[i],_settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
            $(this).find('.noUi-value-large').first().html('Left');
            $(this).find('.noUi-value-large').last().html('Right');
        });

        // slider move Y
        var moveYSliders = document.getElementsByClassName('slider-control-move-y');
        $(moveYSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initMovePanelY(moveYSliders[i],_settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
            $(this).find('.noUi-value-large').first().html('Up');
            $(this).find('.noUi-value-large').last().html('Down');
        });

        // slider rotate
        var rotateSliders = document.getElementsByClassName('slider-control-rotate');
        $(rotateSliders).each(function(i) {
            var dataId = $(this).attr('data-id');
            var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});
            var _applicationType = _settingsObject.application_type;
            ub.funcs.initRotatePanel(rotateSliders[i], _settingsObject, _applicationType);
            if (! $(this).hasClass('init')) {
                // Marker that applications has been initialized
                $(this).addClass('init')
            }
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

        // add applications opt
        var selectNewAppOptions = document.getElementsByClassName('addApplicationsOpts');
        $(selectNewAppOptions).each(function(){
            $(this).find('div > button').removeClass('active');
            $(this).find('div > button:first-of-type').addClass('active');
            $(this).find('div > button:nth-of-type(odd)').addClass('pull-left');
            $(this).find('div > button:nth-of-type(even)').addClass('pull-right');
        });

    };

    ub.funcs.initRotatePanel = function (element, _settingsObject, applicationType) {
        console.log('=======ub.funcs.initRotatePanel=======');

        if ($(element).hasClass('init')) { return; }
        var _flag = false;
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

                if (!_flag) { _flag = true; return;}
                console.log('ARGS=======>', args.value);
                ub.funcs.updateRotationViaSlider(_settingsObject, args.value);

            }
        });
    };

    ub.funcs.initScalePanel = function (element, _settingsObject, applicationType) {
        console.log('=======ub.funcs.initScalePanel=======');

        if ($(element).hasClass('init')) { return; }
        var _flag = false;
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

            if (!_flag) { _flag = true; return;}

            var _value = values[0];
            ub.funcs.updateScaleViaSlider(_settingsObject, _value);

        });

    };

    ub.funcs.initMovePanelX = function (element, _settingsObject, applicationType) {
        console.log('=======ub.funcs.initMovePanelX=======');

        if ($(element).hasClass('init')) { return; }
        var _flag = false;
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
        });

        element.noUiSlider.on('update', function (values, handle) {


            if (!_flag) { _flag = true; return;}

            var _value = values[0];
            ub.funcs.updatePositionViaSlider(_settingsObject, _value, 'x');

        });

    };

    ub.funcs.initMovePanelY = function (element, _settingsObject, applicationType) {
        console.log('=======ub.funcs.initMovePanelY=======');

        if ($(element).hasClass('init')) { return; }
        var _flag = false;
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
        });

        element.noUiSlider.on('update', function (values, handle) {

            if (!_flag) { _flag = true; return;}

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
        return ub.funcs.isTackleTwill() ? '' : ub.utilities.buildTemplateString('#m-slider-container', props);

    };

    ub.funcs.colorsSelection = function (id, _title) {

        var _settingsObject = _.find(ub.current_material.settings.applications, {code: id});

        var _colorBlock = '';
        var _html = '';

        if (_settingsObject.application_type === 'mascot') {

            if (ub.current_material.settings.applications[id].mascot.id !== "1039") {

                _html += '<div class="colorSelectionContainer">';
                _html += '<h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">'+_title+'</h6>';
                _html += '<ul class="color-selection-tab uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark" uk-switcher uk-grid>';

                _.each(_settingsObject.mascot.layers_properties, function (layer) {

                    var _hexCode = layer.default_color;
                    var _color = ub.funcs.getColorByColorCode(_hexCode);

                    if (typeof _color !== 'undefined') {

                        // adding tabs
                        _html += '<li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">' + layer.layer_number + '</a></li>';

                        // building separated color blocks
                        _colorBlock += ub.funcs.createColorBlock(id, _color.color_code, layer.layer_number, 'Color ' + layer.layer_number, layer.default_color, 'mascots');

                    } else {
                        util.error('Hex Code: ' + _hexCode + ' not found!');
                    }

                });

                _html += '</ul>';
                _html += '<ul class="uk-switcher uk-margin uk-padding-remove">'
                _html += _colorBlock;
                _html += '</ul>';
                _html += '</div>';

            }

        } else {

            _html += '<div class="colorSelectionContainer">';
            _html  += '<h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">'+_title+'</h6>';
            _html += '<ul class="color-selection-tab uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark" uk-switcher uk-grid>'

            _.each(_settingsObject.accent_obj.layers, function (layer) {

                var _hexCode = layer.default_color;
                var _color = ub.funcs.getColorObjByHexCode(_hexCode);
                var _layerNo = layer.layer_no - 1;

                if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') {
                    return;
                }

                _color = _settingsObject.color_array[_layerNo];

                // Use default color if team color is short
                if (typeof _color === "undefined") {
                    _hexCode = layer.default_color;
                    _color = ub.funcs.getColorObjByHexCode(_hexCode);
                    ub.utilities.error('Undefined color found here!!!');
                }

                if (typeof _color !== 'undefined') {
                    _html += '<li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">' + layer.name + '</a></li>';
                    // building separated color blocks
                    _colorBlock += ub.funcs.createColorBlock(id, _color.color_code, layer.layer_no, layer.name, layer.default_color, 'accent');
                } else {
                    util.error('Hex Code: ' + _hexCode + ' not found!');
                }

            });

            _html += '</ul>';
            _html += '<ul class="uk-switcher uk-margin uk-padding-remove">'
            _html += _colorBlock;
            _html += '</ul>';
            _html += '</div>';

        }

        return _html;

    };

    ub.funcs.createColorBlock = function (_id, activeColorCode, layer_no, layer_name, active_color, objectType) {

        var _html = '';
        // var _teamColors = ub.current_material.settings.team_colors;
        var _teamColors = undefined;

        if (ub.funcs.isTackleTwill()) {
            _teamColors = objectType === "mascots" ? ub.data.secondaryColorPalette: ub.data.firstColorPalette;
        } else {
            _teamColors = ub.data.secondaryColorPalette;
        }

        var _objectType = objectType;

        if (typeof objectType === "undefined") {
            _objectType = 'not-set';
        }

        _teamColors = _.sortBy(_teamColors, "order");
        // _html += '<div id="tab-' + _id + '-' + layer_no + '" class="tab-pane fade cp-margin-remove" style="padding-bottom: 50px; padding-top: 20px;">';
        _html += '<li>'
        _html += '<div class="con-select con-palettes">'
        _html += '<div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>'
        _.each(_teamColors, function (_color) {

            var _checkMark = '';
            var _class = '';
            var _colorObj = ub.funcs.getColorByColorCode(_color.color_code);

            if (activeColorCode === _color.color_code) {
                _checkMark = '<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size" style="color:#' + _colorObj.forecolor + ';"></span>';
                _class = 'activeColorItem';
            }

            _html += '<div uk-tooltip="title:' + _colorObj.name + '; pos: left;">';
            _html += '<button class="uk-inline box-palette btn-selection-choice palette-color palette colorItem '+ _class +'" style="background-color:#' + _colorObj.hex_code + '; color:#' + _colorObj.forecolor + ';" data-id="' + _id + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">';
            _html += _checkMark;
            _html += '</button>';
            _html += '</div>';

            // _html += '<span data-id="' + _id + '" class="colorItem ' + _class + '"  data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">' + _checkMark + '</span>';

        });

        _html += '</div>';
        _html += '</div>';
        _html += '</li>';

        return _html;
    };
});