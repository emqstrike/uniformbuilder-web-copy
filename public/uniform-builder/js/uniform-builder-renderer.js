$(document).ready(function() {

    var _frontOldPosition = ub.front_view.position;
    var _backOldPosition = ub.back_view.position;
    var _leftOldPosition = ub.left_view.position;
    var _rightOldPosition = ub.right_view.position;

    var _frontOldScale = ub.front_view.scale;
    var _backOldScale = ub.back_view.scale;
    var _leftOldScale = ub.left_view.scale;
    var _rightOldScale = ub.right_view.scale;

    ub.funcs.removeUI = function () {

        console.log('Removing UI...');

        $('div#right-pane-column').hide();
        $('div#uniform_name').hide();
        $('div#uniform-price-youth').hide();
        $('div#uniform-price-adult').hide();
        $('div#uniform-price-call-for-team-pricing').hide();
        $('div#left-side-toolbar').hide();
        $('div#livechat-compact-container').hide();
        
        $('div#main_container').css('margin-top','0px');

        $('nav.navbar').hide();

        // Rearrange UI

            ub['front_view'].position.set(380, 150);
            ub['back_view'].position.set(850, 150);
            ub['left_view'].position.set(30, 150);
            ub['right_view'].position.set(1200, 150);

            ub['front_view'].scale.set(0.5,0.5);
            ub['back_view'].scale.set(0.5,0.5);
            ub['left_view'].scale.set(0.5,0.5);
            ub['right_view'].scale.set(0.5,0.5);

        // End Rearrange UI

        ub.bg.alpha = 0.5;

    };

    ub.funcs.restoreUI = function () {

        console.log('Restoring UI...');
        $('div#right-pane-column').show();
        $('div#uniform_name').show();
        $('div#uniform-price-youth').show();
        $('div#uniform-price-adult').show();
        $('div#uniform-price-call-for-team-pricing').show();
        $('div#livechat-compact-container').show();

        $('div#left-side-toolbar').show();

        $('div#main_container').css('margin-top','70px');

        $('nav.navbar').show();

        // Rearrange UI

            ub['front_view'].position = _frontOldPosition;
            ub['back_view'].position = _backOldPosition;
            ub['left_view'].position = _leftOldPosition;
            ub['right_view'].position = _rightOldPosition;

            ub['front_view'].scale = _frontOldScale;
            ub['back_view'].scale = _backOldScale;
            ub['left_view'].scale = _leftOldScale;
            ub['right_view'].scale = _rightOldScale;

        // End Rearrange UI

        ub.bg.alpha = 1;

        $('a.change-view[data-view="front"]').click();

    };


});