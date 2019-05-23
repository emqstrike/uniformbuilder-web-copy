function TeamNamePanel() {

}

TeamNamePanel.configuration = {
    perspective: "front",
    side: undefined
}


TeamNamePanel.events = {
    isInit: true,

    init: function() {
        var that = this;

        if (that.isInit) {
            $(".modifier_main_container").on("click", "#team-name-panel .add-team-name .btn-selection-choice", that.onClickAddTeamName);
            $('.modifier_main_container').on('click', '#team-name-panel .teamOptionContainer .colorItem[data-object-type="accent"]', that.onChangeAccentColor);
            $('.modifier_main_container').on('click', '#team-name-panel .m-accents .btn-selection-choice', that.onSelectFontAccent);
            $('.modifier_main_container').on('click', '#team-name-panel .teamOptionContainer a.change-font-style', that.onChangeFontStyle);
            $('.modifier_main_container').on('click', '#team-name-panel .remove-team-name', that.onRemovePlayerName);
            $(".modifier_main_container").on('click', '#team-name-panel .select-font-style', that.onCreateFontPopUp);
            that.isInit = false;
        }

        var teamNameObj = _.find(ub.current_material.settings.applications, {type: "team_name"});
        if (typeof teamNameObj !== "undefined") {
            TeamNamePanel.funcs.initializeTeamName(teamNameObj.code);
        } else {
            TeamNamePanel.funcs.loadAddTeamName();
        }
    },

    onClickAddTeamName: function() {
        var configuration = TeamNamePanel.configuration;
        var type = $(this).data("type")
        var part = ub.funcs.is_pts_cage_jacket() ? "Front Jersey" : "Front Body";
        
        ub.funcs.newApplication(configuration.perspective, part, type, configuration.side);
        var teamNameObj = ub.data.currentApplication;
        TeamNamePanel.funcs.initializeTeamName(teamNameObj.code);
        $("div#left-side-toolbar .perspective .change-perspective-button[data-perspective='front']").trigger("click");
    },

    onChangeAccentColor: function() {
        // changing active color
        $(this).parent().parent().find('button').removeClass('activeColorItem').html('');
        $(this).addClass('activeColorItem').html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size"></span>');

        // proceed
        var code = $(this).attr('data-id');
        var _settingsObject = ub.funcs.getApplicationSettings(code);

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
        var code = $(this).closest(".teamOptionContainer").data("code");
        var settingsObj = ub.funcs.getApplicationSettings(code);
        var accentID = $(this).data('accent-id');

        ub.funcs.changeAccentFromPopup(accentID, settingsObj);

        var matchingID = undefined;
        matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

        if (typeof matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: matchingID.toString()});
            ub.funcs.changeAccentFromPopup(accentID, _matchingSettingsObject);
        }

        TeamNamePanel.funcs.initializeTeamName(code);
        _.delay(function() {
            $("#primary_options_container").scrollTo($(".teamOptionContainer .con-select.con-palettes"), {duration: 300});
        }, 100)
    },

    onChangeFontStyle: function() {
        var direction = $(this).data("direction");
        var code = $(this).closest(".teamOptionContainer").data("code");
        ApplicationEvent.changeFontStyle(code, direction);
    },

    onRemovePlayerName: function() {
        var code = $(this).data("code");
        var _application = ub.funcs.getApplicationSettings(code);
        UIkit.modal.confirm('Are you sure you want to delete Team Name #' + _application.code + '?').then(function() {
            ub.funcs.deleteLocation(_application.code);
            TeamNamePanel.funcs.loadAddTeamName();
        }, function () {
            console.log('Rejected.') 
        });
    },

    onCreateFontPopUp: function() {
        var app_code = $(this).data('application-code');
        var settingsObj = _.find(ub.current_material.settings.applications, {code: app_code.toString()});

        if (typeof settingsObj !== "undefined") {
            var sample_text = $(".modifier_main_container #team-name-panel input.app-letters-input").val();

            if (_.isEmpty(sample_text)) {
                sample_text = "Sample Text";
            }

            ApplicationEvent.createFontPopup(sample_text, settingsObj);
        } else {
            console.log("Error: Application code " + app_code + " is invalid code.");
        }
    }

}

TeamNamePanel.funcs = {
    loadAddTeamName: function() {
        var template = document.getElementById("m-team-name-container").innerHTML;
        var renderTemplate = Mustache.render(template);
        $('.modifier_main_container').html("");
        $('.modifier_main_container').html(renderTemplate);
    },

    initializeTeamName: function(code) {
        var that = this;
        var teamNameObj = ub.funcs.getApplicationSettings(code);
        var objStock = {
            application_type: teamNameObj.application_type,
            type: teamNameObj.application.name.toUpperCase(),
            defaultText: teamNameObj.text,
            code: teamNameObj.code,
            perspective: teamNameObj.application.views[0].perspective,
            hasAccents: true,
            accents: that.accent(teamNameObj),
            hasFontStyle: true,
            fontStyle: that.fontStyle(teamNameObj),
            hasTeamLayout: true,
            teamLayout: that.teamLayout(teamNameObj),
            hasColors: true,
            colorContainer: that.colorSelection(teamNameObj, "Team Name Colors"),
            hasFontSize: true,
            fontSizeSlider: that.fontSizeSlider(teamNameObj)
        };

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-team-name-modifier-control', objStock);
        $(".modifier_main_container").html("");
        $(".modifier_main_container").html(_htmlBuilder);
        ub.funcs.activateMoveTool(teamNameObj.code);
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

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-team-name-accent', templateData);

        return _htmlBuilder;
    },

    fontStyle: function(settingsObject) {
        var templateData = {
            fontStyle: settingsObject.font_obj.name,
            fontCaption: settingsObject.font_obj.caption,
            code: settingsObject.code
        }

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-team-name-font', templateData);
        return _htmlBuilder;
    },

    teamLayout: function(settingsObject) {
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-team-name-layout');
        return _htmlBuilder;
    },

    colorSelection: function(_settingsObject, title) {
        var _colorBlock = '';
        var _html = '';

        _html += '<div class="colorSelectionContainer">';
        _html  += '<h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">'+title+'</h6>';
        _html += '<ul class="color-selection-tab uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-red active-bgc-red active-bdr-red" uk-switcher uk-grid>';

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
                _colorBlock += TeamNamePanel.funcs.createColorBlock(_settingsObject.code, _color.color_code, layer.layer_no, layer.name, layer.default_color, 'accent');
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
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-team-name-font-size-slider', {code: _settingsObject.code});
        return _htmlBuilder;
    }
}