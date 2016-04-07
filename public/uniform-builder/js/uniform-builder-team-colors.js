$(document).ready(function () {

    /// UI v1

    ub.funcs.ui = {};
    
    ///  material_option:    Body, etc...
    ///  type:               sublimated | non-sublimated
    
    ub.funcs.ui.getColorSet = function (material_option, type) { 

        var _colorSet = undefined; 
        var _colors = undefined;

        _colorSet = _.find(ub.current_material.materials_options, { name: material_option, perspective: 'front'} );
        
        if (type === 'sublimated') {

            _colors = JSON.parse(_colorSet.colors);

        }
        else {

            _colors = JSON.parse(_colorSet.sublimated_colors);              

        }

        var _newColorSet = [];
        _.each (_colors, function (_color){

            var _match = _.find(ub.data.colors, {color_code: _color});
            _newColorSet.push(_match);

        });

        return _newColorSet;

    };

    ub.funcs.ui.hideTeamColorPicker = function () {

        var $teamColorPicker = $('div.team_color_picker_options');
        
        $teamColorPicker.hide();
        $teamColorPicker.data('status', 'closed');
        $teamColorPicker.unbind('clickoutside');

    };

    ub.funcs.ui.showTeamColorPicker = function (input) {

        var $teamColorPicker = $('div.team_color_picker_options');

        $teamColorPicker.unbind('clickoutside');
        $teamColorPicker.fadeIn('fast');
        $teamColorPicker.data('team-color-id', input.teamColorID);
        $teamColorPicker.data('status', 'open');

        $teamColorPicker.css({

            'display': 'block',
            'left': input.left,
            'top': input.top,

        });
        
        $teamColorPicker.bind('clickoutside', function (event) {

            if (event.target.className !== "team_color_picker_item team_color_item_on"){

                if ($teamColorPicker.data('status') !== 'close') {

                    ub.funcs.ui.hideTeamColorPicker();    

                }

            }
            
        });

    };

    ub.funcs.init_team_colors = function () {

        var $teamColorPicker = $('div.team_color_picker_options');
        var selector = 'div.team_color_picker_item';
        var team_color_picker = $('#team-color-main-picker').html();
        var $colorItemsContainer = $('div.team_color_picker_options > div.color_items_container');
        var _colorSet = ub.funcs.ui.getColorSet('Body','non-sublimated');

        var template = $('#m-color-picker-buttons').html();

        var data = {
            colors: _colorSet,
        };

        var _markup = Mustache.render(template, data);
        $colorItemsContainer.html(_markup);

        $team_picker_item = $(selector);
        $(selector).on('click', function (e) {

            var _dataID         = $(this).data('id');
            var _allowance      = 10;
            var _status         = $teamColorPicker.data('status');
            var _allowance_left = 5 + 10; // 10 is the space on the left and the right of the dialog, 5 is the padding

            if (_status === 'open') {

                if (_dataID === $('div.team_color_picker_options').data('team-color-id')) { // second click on the same team color id, hide the dialog instead of opening

                    ub.funcs.ui.hideTeamColorPicker();
                    return;    

                }
                else { // dialog already open but switching to another team id 

                    $teamColorPicker.hide();

                }

            }
            
            $rightPaneColumn = $('#right-pane-column');
            rPosition = $rightPaneColumn.position();
            var _sTop = $team_picker_item.position().top + rPosition.top + $team_picker_item.height() + _allowance;
            
            ub.funcs.ui.showTeamColorPicker({
                left: rPosition.left + _allowance_left,
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

        $('button.color_picker_item').on('click', function () {

            var _dataID         = $('div.team_color_picker_options').data('team-color-id');
            var _element        = $(this);
            var _hex_color      = $(this).data('hex');
            var _color_code     = $(this).data('color-code');
            var _color_name     = $(this).data('color');

            var $element    = $('div.team_color_picker_item[data-id=' + _dataID + ']')

            $element.css('background-color', _hex_color);
            $element.html(_color_code);

            $element.parent().find('.team_color_picker_item_label').html(_color_name);

            ub.funcs.ui.hideTeamColorPicker();

        });

        // Sample Usage
        //

        var _widthOfItem        = $('div.color_item_group').width();
        var _spaceBetween       = $('.color_picker_item').outerWidth(true) - $('.color_picker_item').innerWidth();
        var _numberOfColors     = $('.color_picker_item').length;
        var _rowsOfColor        = 2;
        var _extra              = $('.team_color_picker_options').width() + 140; // so that options wont be scrolled to the left most

        var _widthOfContainer   = ( ((_widthOfItem + (_spaceBetween * 2) ) * _numberOfColors) / 2 ) + _extra;

        $('.color_items_container').width(_widthOfContainer);

        ub.funcs.scrollize ('.team_color_picker_options', '.color_items_container', '.color_picker_item', 30)

        $('button.color_picker_item[data-color="White"]').css('background-color','#ffffff !important');

    };

    /// End UI v1

});