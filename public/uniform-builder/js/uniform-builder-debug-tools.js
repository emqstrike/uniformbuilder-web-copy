$(document).ready(function () {

    ub.debug = {};

    ub.debug.mode = true;

    ub.debug.UI_VERSION = 1;

    /// UI Functions

    ub.funcs.uiV2 = function () {

        ub.uiVersion = 'v2';

        ub.dimensions.width = 563;
        ub.dimensions.height = 616;

        $('a.mod_primary').click();

        $('#design_name_container').css({'text-align':'center','width':'100%'});
        $('div.main_steps_bar').show();
        //$('#change-views').css('margin-left', '0px');
        $('div#right-sidebar > a.sidebar-buttons').hide();
        $('div#right-main-window').css('float', 'left');
        $('div#right-main-window.team-color-pane').show();
        $('div#right-main-window').css('height','530px');
        $('div#right-main-window').css('display','block');
        $('div#right-main-window').css('width','550px');
        $('div#right-main-window.team-color-pane').addClass('team_color_pane');
        $('div#right-main-window.team-color-pane').css('display','block');
        $('div#left-pane-column').css('padding-right', '5px !important');
        $('div#right-pane-column').css('padding-left', '5px !important');
        $("div.pane-main-window").css('overflow','visible !important');

        var $sidebar_buttons = $('#right-sidebar > a.sidebar-buttons');
        $sidebar_buttons.hide();

        $('div.old-change-views').hide();

    };

    ub.funcs.uiV1 = function () {

        ub.uiVersion = 'v1';
    
        ub.dimensions.width = 496;

        $('div.special_modifiers').hide();
        $('#design_name_container').css({'float':'right','width':'90%'});
        $('div.main_steps_bar').hide();
        //$('#change-views').css('margin-left', '70px');
        $('div#right-sidebar > a.sidebar-buttons').show();
        $('div#right-main-window').css('float', 'right');
        $('div#right-main-window').css('width','470px');
        $('div#right-main-window.team-color-pane').hide();
        $('div#right-main-window').css('height','616px');
        $('div#right-main-window.team-color-pane').removeClass('team_color_pane');
        $('div#right-main-window.team-color-pane').css('display','none');
        $('div#left-pane-column').css('padding-right', '15px !important');
        $('div#right-pane-column').css('padding-left', '15px !important');
        $('div#right-main-window').css('overflow','hidden !important');
        $("div.pane-main-window").css('overflow','scroll');

        //$('div#change-views').css('left','710px !important');


        var $sidebar_buttons = $('#right-sidebar > a.sidebar-buttons');
        $sidebar_buttons.show();

        $('a.colors').click();
        $(window).trigger('resize');

//        $('div#change-views').hide();

    };
    
    ub.funcs.uiV2();

    /// End UI Functions

    $('a.navbar-brand').on('click', function (evt) {

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