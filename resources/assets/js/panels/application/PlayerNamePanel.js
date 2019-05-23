/**
 * PlayerNamePanel.js
 * - handler for the player
 * @since May 22, 2019
 * @author 
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  Handle the setup of player name panel
 *  Handle the events for player name
 */


function PlayerNamePanel () {

}

PlayerNamePanel.configuration = {
    type: "player_name",
    perspective: "back",
    side: undefined
}

PlayerNamePanel.events = {
    isInit: true,

    init: function() {
        var that = this;
        if (that.isInit) {
            // Events HERE
            $(".modifier_main_container").on("click", ".add-player-name .btn-selection-choice", that.onClickAddPlayerName);
            $('.modifier_main_container').on('click', '.playerOptionContainer .colorItem[data-object-type="accent"]', that.onChangeAccentColor);
            $('.modifier_main_container').on('click', '.m-accents .btn-selection-choice', that.onSelectFontAccent);
            $('.modifier_main_container').on('click', '.playerOptionContainer a.change-font-style', that.onChangeFontStyle);
            $('.modifier_main_container').on('click', '#player-name-panel .remove-player-name', that.onRemovePlayerName);
            $(".modifier_main_container").on('click', '#player-name-panel .select-font-style', that.onCreateFontPopUp);
            
            that.isInit = false;
        }

        var playerObj = _.find(ub.current_material.settings.applications, {type: "player_name"});
        if (typeof playerObj !== "undefined") {
            PlayerNamePanel.funcs.initializePlayerName(playerObj.code);
        } else {
            PlayerNamePanel.funcs.loadAddPlayer();
        }
    },

    onClickAddPlayerName: function() {
        var configuration = PlayerNamePanel.configuration;
        var part = ub.funcs.is_pts_cage_jacket() ? "Back Jersey" : "Back Body";
        ub.funcs.newApplication(configuration.perspective, part, configuration.type, configuration.side);
        var playerObj = ub.data.currentApplication;
        PlayerNamePanel.funcs.initializePlayerName(playerObj.code);
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

    onSelectFontAccent: function() {
        var code = $(this).closest(".playerOptionContainer").data("code");
        var settingsObj = ub.funcs.getApplicationSettings(code);
        var accentID = $(this).data('accent-id');

        ub.funcs.changeAccentFromPopup(accentID, settingsObj);

        var matchingID = undefined;
        matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

        if (typeof matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: matchingID.toString()});
            ub.funcs.changeAccentFromPopup(accentID, _matchingSettingsObject);
        }

        PlayerNamePanel.funcs.initializePlayerName(code)
        _.delay(function() {
            $("#primary_options_container").scrollTo($(".playerOptionContainer .con-select.con-palettes"), {duration: 300});
        }, 100)
    },

    onChangeFontStyle: function() {
        var direction = $(this).data("direction");
        var code = $(this).closest(".playerOptionContainer").data("code");
        ApplicationEvent.changeFontStyle(code, direction);
    },

    onRemovePlayerName: function() {
        var code = $(this).data("code");
        var _application = ub.funcs.getApplicationSettings(code);
        UIkit.modal.confirm('Are you sure you want to delete Player Name #' + _application.code + '?').then(function() {
            ub.funcs.deleteLocation(_application.code);
            PlayerNamePanel.funcs.loadAddPlayer();
        }, function () {
            console.log('Rejected.') 
        });
    },

    onCreateFontPopUp: function() {
        var app_code = $(this).data('application-code');
        var settingsObj = _.find(ub.current_material.settings.applications, {code: app_code.toString()});

        if (typeof settingsObj !== "undefined") {
            var sample_text = $(".modifier_main_container #player-name-panel input.app-letters-input").val();

            if (_.isEmpty(sample_text)) {
                sample_text = "Sample Text";
            }

            ApplicationEvent.createFontPopup(sample_text, settingsObj);
        } else {
            console.log("Error: Application code " + app_code + " is invalid code.");
        }
    }
}

PlayerNamePanel.funcs = {
    loadAddPlayer: function() {
        var template = document.getElementById("m-player-name-container").innerHTML;
        var renderTemplate = Mustache.render(template);
        $('.modifier_main_container').html("");
        $('.modifier_main_container').html(renderTemplate);
    },

    initializePlayerName: function(code) {
        var that = this;
        var playerObj = ub.funcs.getApplicationSettings(code);
        var objStock = {
            application_type: playerObj.application_type,
            type: playerObj.application.name.toUpperCase(),
            defaultText: playerObj.text,
            code: playerObj.code,
            perspective: playerObj.application.views[0].perspective,
            hasAccents: true,
            accents: that.accent(playerObj),
            hasFontStyle: true,
            fontStyle: that.fontStyle(playerObj),
            hasTeamLayout: true,
            teamLayout: that.teamLayout(playerObj),
            hasColors: true,
            colorContainer: that.colorSelection(playerObj, "Player Name Colors"),
            hasFontSize: true,
            fontSizeSlider: that.fontSizeSlider(playerObj)
        };

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-player-name-modifier-control', objStock);
        $(".modifier_main_container").html("");
        $(".modifier_main_container").html(_htmlBuilder);
        ub.funcs.initializer();
    },

    accent: function(settingsObject) {
        var _accents = []
        _.map(ub.data.accents.items, function (j) {
            var acc = {
                'thumbnail': '/images/sidebar/' + j.thumbnail,
                'id': j.id,
                'code': j.code,
                'title': j.code.replace(/_/g, " "),
                'active': settingsObject.accent_obj.id === j.id ? 'uk-active' : '',
            }

            _accents.push(acc);
        })

        var templateData = {
            accents: _accents
        }

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-player-name-accent', templateData);

        return _htmlBuilder;
    },

    fontStyle: function(settingsObject) {
        var templateData = {
            fontStyle: settingsObject.font_obj.name,
            fontCaption: settingsObject.font_obj.caption,
            code: settingsObject.code
        }

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-player-name-font', templateData);
        return _htmlBuilder;
    },

    teamLayout: function(settingsObject) {
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-player-name-layout');
        return _htmlBuilder;
    },

    colorSelection: function(_settingsObject, title) {
        var _colorBlock = '';
        var _html = '';

        _html += '<div class="colorSelectionContainer">';
        _html  += '<h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">'+title+'</h6>';
        _html += '<ul class="color-selection-tab uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark" uk-switcher uk-grid>';

        _.each(_settingsObject.accent_obj.layers, function (layer, index) {
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
                if (index === 0) {
                    _html += '<li><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">' + layer.name + '</a></li>';
                } else {
                    _html += '<li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">' + layer.name + '</a></li>';
                }
                // building separated color blocks
                _colorBlock += PlayerNamePanel.funcs.createColorBlock(_settingsObject.code, _color.color_code, layer.layer_no, layer.name, layer.default_color, 'accent');
            } else {
                util.error('Hex Code: ' + _hexCode + ' not found!');
            }
        });

        _html += '</ul>';
        _html += '<ul class="uk-switcher uk-margin-small-top">'
        _html += _colorBlock;
        _html += '</ul>';
        _html += '</div>';

        return _html;
    },

    createColorBlock: function(_id, activeColorCode, layer_no, layer_name, active_color, objectType) {
        var _html = '';
        var _teamColors = ub.data.secondaryColorPalette;
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

            _html += '<div>';
            if (_colorObj.color_code === "W") {
                _html += '<button uk-tooltip="title:' + _colorObj.alias + '; pos: left;" class="uk-inline box-palette btn-selection-choice palette-color palette colorItem '+ _class +'" style="background-color:#ffff; color:#' + _colorObj.forecolor + ';" data-id="' + _id + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">';
            } else {
                _html += '<button uk-tooltip="title:' + _colorObj.alias + '; pos: left;" class="uk-inline box-palette btn-selection-choice palette-color palette colorItem '+ _class +'" style="background-color:#' + _colorObj.hex_code + '; color:#' + _colorObj.forecolor + ';" data-id="' + _id + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '" data-object-type="' + _objectType + '">';
            }
            _html += _checkMark;
            _html += '</button>';
            _html += '</div>';
        });

        _html += '</div>';
        _html += '</div>';
        _html += '</li>';

        return _html;
    },

    fontSizeSlider: function(_settingsObject) {
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-player-name-font-size-slider', {code: _settingsObject.code});
        return _htmlBuilder;
    }
}