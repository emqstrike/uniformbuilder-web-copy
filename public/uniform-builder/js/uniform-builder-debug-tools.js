$(document).ready( function () {

    ub.debug = {};
    ub.debug.UI_VERSION = 1;

    /// UI Functions

    ub.funcs.uiV2 = function () {

        ub.dimensions.width = 563;

        $('a.mod_primary').click();

        $('#design_name_container').css({'text-align':'center','width':'100%'});
        $('div.main_steps_bar').show();
        $('#change-views').css('margin-left', '0px');
        $('#main_view').css('width','563px');
        $('div#right-sidebar > a.sidebar-buttons').hide();
        $('div#right-main-window').css('float', 'left');
        $('div#right-main-window.team-color-pane').show();
        $('div#right-main-window').css('height','430px');
        $('div#right-main-window').css('display','block');
        $('div#right-main-window').css('width','100%');
        $('div#right-main-window.team-color-pane').addClass('team_color_pane');
        $('div#right-main-window.team-color-pane').css('display','block');
        $('div#left-pane-column').css('padding-right', '5px !important');
        $('div#right-pane-column').css('padding-left', '5px !important');
        $('div.pane div.pane-main-window').css('width', '100%');
        
        var $sidebar_buttons = $('#right-sidebar > a.sidebar-buttons');
        $sidebar_buttons.hide();

    };

    ub.funcs.uiV1 = function () {
    
        ub.dimensions.width = 496;

        $('#design_name_container').css({'float':'right','width':'90%'});
        $('div.main_steps_bar').hide();
        $('#change-views').css('margin-left', '70px');
        $('#main_view').css('width','496px');
        $('div#right-sidebar > a.sidebar-buttons').show();
        $('div#right-main-window').css('float', 'right');
        $('div#right-main-window').css('width','498px');
        $('div#right-main-window.team-color-pane').hide();
        $('div#right-main-window').css('height','550px');
        $('div#right-main-window.team-color-pane').removeClass('team_color_pane');
        $('div#right-main-window.team-color-pane').css('display','none');
        $('div#left-pane-column').css('padding-right', '15px !important');
        $('div#right-pane-column').css('padding-left', '15px !important');
        $('div.pane div.pane-main-window').css('width', '498px');

        var $sidebar_buttons = $('#right-sidebar > a.sidebar-buttons');
        $sidebar_buttons.show();

        $('a.colors').click();

    };
    
    ub.funcs.uiV2();

    /// End UI Functions

    $('a.navbar-brand').on('click', function () {

        if(ub.debug.UI_VERSION === 1) {

            ub.funcs.uiV1();
            ub.debug.UI_VERSION = 0.5;

        }
        else {

           window.location.reload();

        }

        return false;

    });

});