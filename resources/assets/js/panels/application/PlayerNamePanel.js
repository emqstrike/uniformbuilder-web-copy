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
        console.log("MADAFAKA JONES NAMES")
    }
}