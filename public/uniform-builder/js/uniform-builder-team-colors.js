$(document).ready(function () {

    /// UI v1

    ub.funcs.ui = {};

    ub.funcs.ui.showTeamColorPicker = function (input) {

        var $teamColorPicker = $('div.team_color_picker_options');

        $('div.team_color_picker_options').css({

            'display': 'block',
            'left': input.left,
            'top': input.top,
        });

        $teamColorPicker.data('team-color-id', input.teamColorID);

    };

    ub.funcs.ui.hideTeamColorPicker = function () {

        var $teamColorPicker = $('div.team_color_picker_options');
        $teamColorPicker.css('display', 'none');

    };

    ub.funcs.init_team_colors = function () {

        var data = {

            name: 'test',

        };

        var selector = 'div.team_color_picker_item';
        var team_color_picker = $('#team-color-main-picker').html();
        var content = Mustache.render(team_color_picker, data);

        $team_picker_item = $(selector);

        $(selector).on('click', function (e) {

            var _dataID     = $(this).data('id');
            var _allowance  = 10;
            var _status     = $(this).data('status');

            if (_status === 'open') {

                ub.funcs.ui.hideTeamColorPicker();
                $(this).data('status','closed');

                return;

            } else {

                $(this).data('status','open');

            }

            $rightPaneColumn = $('#right-pane-column');
            rPosition = $rightPaneColumn.position();
            var _sTop = $team_picker_item.position().top + rPosition.top + $team_picker_item.height() + _allowance;
            
            ub.funcs.ui.showTeamColorPicker({
                left: rPosition.left + 5,
                top: _sTop,
                teamColorID: _dataID,
            });
            
            $item = $(this);

        });

        $(selector).hover(function (e) {

            $(this).removeClass('team_color_item_off');
            $(this).addClass('team_color_item_on');

        }, function (e) {

            $(this).removeClass('team_color_item_on');
            $(this).addClass('team_color_item_off');

        });

        $('button.color_picker_item').on('click', function (){

            var _dataID = $('div.team_color_picker_options').data('team-color-id');
            var _element = $(this);

            $('div.team_color_picker_item[data-id=' + _dataID + ']').css('background-color', $(this).data('hex'));
            
            ub.funcs.ui.hideTeamColorPicker();

        });

    };

    ub.funcs.init_team_colors();

    /// End UI v1

});