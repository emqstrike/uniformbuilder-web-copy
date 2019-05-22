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

    loadUserInterface: function() {
        var template = document.getElementById("m-player-name-container").innerHTML;
        var renderTemplate = Mustache.render(template);
        $('.modifier_main_container').html("");
        $('.modifier_main_container').html(renderTemplate);
    },  
    
    init: function() {
        var that = this;
        if (that.isInit) {
            // Events HERE
            $(".modifier_main_container").on("click", ".add-player-name .btn-selection-choice", that.onClickAddPlayerName);
            that.isInit = false;
        }

        that.loadUserInterface();
    },

    onClickAddPlayerName: function() {
        var configuration = PlayerNamePanel.configuration;
        var part = ub.funcs.is_pts_cage_jacket() ? "Back Jersey" : "Back Body";
        ub.funcs.newApplication(configuration.perspective, part, configuration.type, configuration.side);

        var playerObj = ub.data.currentApplication;

        var objStock = {
            application_type: playerObj.application_type,
            type: playerObj.application.name.toUpperCase(),
            defaultText: playerObj.text,
            code: playerObj.code,
            perspective: playerObj.application.views[0].perspective,
            hasAccents: true,
            accents: PlayerNamePanel.funcs.accent(playerObj),
            hasFontStyle: true,
            fontStyle: PlayerNamePanel.funcs.fontStyle(playerObj),
            hasTeamLayout: true,
            teamLayout: PlayerNamePanel.funcs.teamLayout(playerObj)
        };

        var _htmlBuilder = ub.utilities.buildTemplateString('#m-player-name-modifier-control', objStock);
        $(".modifier_main_container #player-name-panel").html("");
        $(".modifier_main_container #player-name-panel").html(_htmlBuilder);
    }
}

PlayerNamePanel.funcs = {
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

    colorSelection: function() {

    }
}