$(document).ready(function () {

    /// UI v1

    ub.funcs.ui = {};

    ub.funcs.ui.getAllNames = function (materialOptionName) {

        var _names      = [];
        var _obj        = _.find(ub.data.modifierLabels, {name: materialOptionName});
        var _name       = _obj.fullname;
        var _otherSide  = '';

        _names.push(_name);

        if (_name.indexOf('left') >-1) {
            _match      = _name.replace('left', 'right');
            _names.push(_match);
        }

        if (_name.indexOf('right') >-1) {
            _match      = _name.replace('right', 'left');
            _names.push(_match);
        }

        return _names;

    };

    // Set Color in the Settings Object
    ub.funcs.setMaterialOptionSettingsColor = function (materialOptionCode, colorObj, source) {

        var _type                       = ub.current_material.material.type;
        var _uniformObject              = ub.current_material.settings[_type];
        var _materialOptionObject       = _.find(_uniformObject, {code: materialOptionCode});


        if (typeof _materialOptionObject !== 'undefined') {

            if (_materialOptionObject.color !== parseInt(colorObj.hex_code, 16)) {

                var _oldValue = _materialOptionObject.color;
                var _newValue = parseInt(colorObj.hex_code, 16);
                
                if (source !== 'from undo') {
                    ub.funcs.pushOldState('color change', 'material option', _materialOptionObject, _materialOptionObject.colorObj, colorObj);
                }

            }

            _materialOptionObject.color     = parseInt(colorObj.hex_code, 16);
            _materialOptionObject.colorObj  = colorObj;

        }

    };

    // Set Color of the Actual Sprite in the stage
    ub.funcs.ui.setMaterialOptionColor = function (name, colorObj, source) {

        var _names = ub.funcs.ui.getAllNames(name);

        _.each(_names, function (name) {

            ub.funcs.setMaterialOptionSettingsColor(name, colorObj, source);
            ub.change_material_option_color16(name, parseInt(colorObj.hex_code, 16));

        });

    };

    ub.funcs.setTeamColorByID = function (teamColorID, colorObj) {

        var _teamColorObj = ub.current_material.settings.team_colors;
        _teamColorObj[teamColorID - 1] = colorObj;

        var _removedHash  = colorObj.hex_code.replace('#', '');

        ub.funcs.setGroupColor(teamColorID.toString(), _removedHash, colorObj);

    };
    
    ///  material_option:    Body, etc...
    ///  type:               sublimated | non-sublimated

    ub.funcs.sublimationColorSet = function () {

        var _colorSet = _.pluck(_.filter(ub.data.colors, {sublimation_only: '1'}),'color_code');
        return _colorSet;

    }
    
    ub.funcs.ui.getColorSet = function (material_option, type) { 

        var _colorSet   = undefined; 
        var _colors     = undefined;

        _colorSet = _.find(ub.current_material.materials_options, { name: material_option, perspective: 'front'} );
        
        if (type === 'sublimated') {

            _colors = JSON.parse(_colorSet.sublimated_colors);              

        }
        else {

            _colors = JSON.parse(_colorSet.colors);

        }

        var _newColorSet = [];
        _.each (_colors, function (_color) {

            var _match = _.find(ub.data.colors, {color_code: _color});

            if (typeof _match === 'undefined') {

                console.log('Cant Find ' + _color);

            }
            else {
                _newColorSet.push(_match);    
            }
            

        });

        return _newColorSet;

    };

    ub.funcs.restoreTeamColorSelectionsFromInitialUniformColors = function () {

        ub.front_view.alpha = 0;

        _sorted = _.sortBy(ub.data.colorsUsed, 'teamColorID');
        _.each(_sorted, function (_color) {

            $('button.change-color[data-color-code="' + _color.hexCode + '"]').click();

        });

        ub.front_view.alpha = 1;

    }

    ub.funcs.restoreTeamColorSelections = function () {

        var _teamColorObject    = ub.current_material.settings.team_colors;
        var _teamColorSize      = _.size(ub.current_material.settings.team_colors);

        if (_teamColorSize === 0) { return; }

        _.each (_teamColorObject, function (teamColor) {

            var _selector       ='button.change-color[data-target="Team-color-picker"][data-color-id="' + teamColor.id + '"]';

            $(_selector).click();

        });

        ub.funcs.drawColorPickers();

    }

    ub.funcs.getBaseColors = function () {

        var _colorType      = '';
        var _factoryCode    = ub.current_material.material.factory_code;

        if (_factoryCode === 'pmp' ) {
            _colorType  = 'non-sublimated';
        }
        else {
            _colorType  = 'sublimated';
        }

        /// _colorSet   = ub.funcs.ui.getColorSet('Body', _colorType);

        if (_factoryCode === "PMP") {

            _colorSet = _.filter(ub.data.colors, {sublimation_only: "0"});

        } else {

            _colorSet = ub.data.colors;

        }

        return _colorSet;

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

    ub.funcs.tennGuardTemp = function (name) {

        var _name = '';

        if (name === 'Tennessee Orange') {
            _name = 'Tenn. Orange';
        }
        else{
            _name = name;
        }

        return _name;

    }

    ub.funcs.init_team_colors = function () {

        var $teamColorPicker = $('div.team_color_picker_options');
        var selector = 'div.team_color_picker_item';
        var team_color_picker = $('#team-color-main-picker').html();
        var $colorItemsContainer = $('div.team_color_picker_options > div.color_items_container');
        var _colorSet = ub.funcs.ui.getColorSet('Body','non-sublimated');

        var template = $('#m-color-picker-buttons').html();

        var data = {
            colors: _colorSet,
            abbr: function () {

                return ub.funcs.tennGuardTemp(this.name);

            }
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
            var $element        = $('div.team_color_picker_item[data-id=' + _dataID + ']')

            ub.funcs.setTeamColorByID(_dataID, {
                hex_code: _hex_color,
                color_code: _color_code,
                color_name: _color_name,
            });

            $element.css('background-color', _hex_color);

            if (_color_name === 'White') {                

                $element.css('background-color','#ffffff');
                $element.css('border', 'solid 1px #d7d7d7');

            }

            $element.html(_color_code);
            $element.parent().find('.team_color_picker_item_label').html(ub.funcs.tennGuardTemp(_color_name));

            ub.funcs.ui.hideTeamColorPicker();

        });

        $('i.color-caret-down').click('on', function (){

            $(this).parent().click();

        });

        var _widthOfItem        = $('div.color_item_group').width();
        var _spaceBetween       = $('.color_picker_item').outerWidth(true) - $('.color_picker_item').innerWidth();
        var _numberOfColors     = $('.color_picker_item').length;
        var _rowsOfColor        = 2;
        var _extra              = 40; // so that options wont be scrolled to the left most
        var _widthOfContainer   = ( ((_widthOfItem + (_spaceBetween * 2) ) * _numberOfColors) / 2 ) + _extra;

        $('.color_items_container').width(_widthOfContainer);
        ub.funcs.scrollize ('.team_color_picker_options', '.color_items_container', '.color_picker_item', 30)
        $('button.color_picker_item[data-color="White"]').css('background-color','#ffffff !important');

    };

    /// End UI v1

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
          
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };

    }

    function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;       

    }

    ub.funcs.clearTeamColors = function () {

        ub.current_material.settings.team_colors = [];

    }

    ub.funcs.addColorToTeamColors = function (colorObj) {

        var _teamColorObj = ub.current_material.settings.team_colors;
        var _result       = _.find(_teamColorObj, {color_code: colorObj.color_code});

        if (typeof _result !== "undefined") { return; } // exit if color already exist on _teamColorObj

        _teamColorObj.push(colorObj); 

        ub.funcs.drawColorPickers();

    };

    ub.funcs.removeColorFromTeamColors = function (colorObj) {

        var _teamColorObj       = ub.current_material.settings.team_colors;
        var _indexOfColorObj    = undefined;

        _indexOfColorObj        = _teamColorObj.indexOf(colorObj);
        _teamColorObj.splice(_indexOfColorObj, 1);

        ub.funcs.drawColorPickers();

    };

    ub.funcs.drawColorPickers = function () {

        var _teamColorObj           = ub.current_material.settings.team_colors;
        var _strBuilder             = '';
        var _sortedModifierLabels   = _.sortBy(ub.data.modifierLabels, 'index');
        var _tempIndex              = 1;
        var _colorSet               = ub.funcs.getBaseColors();

        _strBuilder                 += '<div id="color-wheel-container">';
        
            _.each(_sortedModifierLabels, function (modLabel) {

                var fill = 'white';

                _strBuilder     += '<div class="color-wheel" id="cw_' + modLabel.index + '">';
                _strBuilder     += '<svg id="svg_cw_' + modLabel.index + '" class="svg-color-wheel">';
                _tempIndex      += 1;
                _strBuilder     += '<circle class="preview growCircle" cx="275" cy="215" r="100"  fill="#3d3d3d" />';
                _strBuilder     += '<text class="previewColorCode growTextCode" x="275" y="215" font-family="Avenir Next LT W04 Thin" font-size="48px" text-anchor="middle" fill="' + fill + '">RB</text>';
                _strBuilder     += '<text class="previewColorName growTextName" x="275" y="240" font-family="Avenir Next LT W04 Bold" font-size="18px" text-anchor="middle" fill="' + fill + '">Royal Blue</text>';

                _.each(_teamColorObj, function (colorObj, index) {

                    // Only Update Material Option Colors when colors selected is less than the colors used count, to prevent updating uniform colors in case the user is just adding another color
                    if (_.size(ub.current_material.settings.team_colors) < _.size(ub.data.colorsUsed)) {

                        ub.funcs.setGroupColor((index + 1).toString(), colorObj.hex_code, colorObj); 

                    }

                    _strBuilder +=  '<path class="growStroke arc-' + modLabel.fullname + '" id="arc' + index + '-' + modLabel.fullname + '" data-color-id="' + colorObj.id + '" fill="none" stroke="#' + colorObj.hex_code + '" stroke-width="50" />'; 

                });

                _strBuilder     += '</svg>';
                _strBuilder     += '</div>';

            });

        _strBuilder         += '</div>';

        $('div#primary_options_container > div#cw').html(_strBuilder);

        _.each(_sortedModifierLabels, function (modLabel) {

            var _elements   = _teamColorObj.length;
            var _length     = 360 / _elements;
            var _start      = 0;

            _.each(_teamColorObj, function (colorObj, index) {

                var _nth    = index;
                var _start  = _nth * _length;
                var _end    = _start + _length;
                var _id     = "arc" + index + '-' + modLabel.fullname;

                document.getElementById(_id).setAttribute("d", describeArc(275, 215, 150, _start, _end));

                $("path#arc" + index + '-' + modLabel.fullname).parent().find('circle').css('cursor', 'pointer');
                $("path#arc" + index + '-' + modLabel.fullname).parent().find('circle').on('click', function () {

                    $('div.pd-dropdown-links[data-fullname="team-colors"]').trigger('click');

                });

                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorName').css('cursor', 'pointer');
                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorName').on('click', function () {

                    $('div.pd-dropdown-links[data-fullname="team-colors"]').trigger('click');

                });

                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorCode').css('cursor', 'pointer');
                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorCode').on('click', function () {

                    $('div.pd-dropdown-links[data-fullname="team-colors"]').trigger('click');

                });

                $("path#arc" + index + '-' + modLabel.fullname).css('cursor','pointer');

                $("path#arc" + index + '-' + modLabel.fullname).on("click", function () {

                    $("path.arc-" + modLabel.fullname).attr("class", "growStroke arc-" + modLabel.fullname);
                    $(this).attr("class", "selectedStroke growStroke arc-" + modLabel.fullname);

                   var _colorID           = $(this).data('color-id');
                   var _colorOBJ          = _.find(_colorSet, {id: _colorID.toString()});
                   
                   ub.funcs.ui.setMaterialOptionColor(modLabel.name, _colorOBJ, 'from color picker');

                   var $previewCircle     = $(this).parent().find('circle');
                   $previewCircle.css('fill', '#' + _colorOBJ.hex_code);

                   if (_colorOBJ.color_code === 'W') {
                    
                        $previewCircle.css('fill', '#ffffff');

                   }

                   var fill = "white";

                   if (_colorOBJ.color_code === 'W' || _colorOBJ.color_code === 'Y' || _colorOBJ.color_code === 'CR' || _colorOBJ.color_code === 'S' || _colorOBJ.color_code === 'PK'  || _colorOBJ.color_code === 'OP' || _colorOBJ.color_code === 'SG') {
                        fill = 'black';
                   }

                   var $previewColorCode = $(this).parent().find('text.previewColorCode');
                   $previewColorCode.html(_colorOBJ.color_code);
                   $previewColorCode.css('fill', fill);

                   var $previewColorName = $(this).parent().find('text.previewColorName');
                   $previewColorName.html(_colorOBJ.name);
                   $previewColorName.css('fill', fill);

                });

            });

        });    

        var _sizeOf     = _.size(ub.data.modifierLabels);
        var _widthOfCW  = $('div.color-wheel').first().width();

        $('#color-wheel-container').css('width', (_sizeOf * _widthOfCW) + 'px');

    };

    ub.funcs.getSettingsByMaterialOptionCode = function (materialOptionCode) {

        var _type                   =  ub.current_material.material.type;
        var _uniformSettings        =  ub.current_material.settings[_type];
        var _materialOptionSettings =  _.find(_uniformSettings, {code: materialOptionCode});

        return  _materialOptionSettings;

    };

    ub.funcs.getModifierByIndex = function (index) {

        var _modifier = _.find(ub.data.modifierLabels, {index: index});
        return _modifier;

    };

    ub.funcs.getColorObjByHexCode = function (hexCode) {

        var _baseColors = ub.funcs.getBaseColors();

        var _colorObj   = _.find(_baseColors, {hex_code: hexCode.lpad("0",6).toString()});

        if (typeof hexCode === 'undefined') {

            _colorObj = ub.funcs.getBaseColors()[0];
            
        }

        return _colorObj;

    };

    ub.funcs.getColorByColorCode = function (colorCode) {

        var _colorObj = _.find(ub.data.colors, {color_code: colorCode });

        if (_colorObj.name === "White" || _colorObj.name === "Yellow" || _colorObj.name === "Cream" || _colorObj.name === "Safety Green") {

            _colorObj.forecolor = '3d3d3d';

        }
        else {

            _colorObj.forecolor = 'ffffff';

        }

        return _colorObj;

    }

    ub.funcs.moveToColorPickerByIndex = function (index) {

        $('div#single_team-color-picker').hide();
        $('div#cw').fadeIn();

        if (index === -1) { return; }

        var _index = index + 1;
        var _modifier           = ub.funcs.getModifierByIndex(_index);
        var _materialSettings   = ub.funcs.getSettingsByMaterialOptionCode(_modifier.fullname);
        var _intColor           = _materialSettings.color;
        var _hexCode            = (_intColor).toString(16);
        var colorObj            = ub.funcs.getColorObjByHexCode(_hexCode);

        if (typeof colorObj === 'undefined') {

            util.log("Can't find color: "  + _hexCode);

        }

        var $svgPath = $('svg#svg_cw_' + (_index) + ' > path[data-color-id="' + colorObj.id +'"]');
        
        $svgPath.trigger('click');

        var _widthOfCW  = $('div.color-wheel').first().width();
        var _leftMargin = _widthOfCW * (_index - 1);

        $('#color-wheel-container').css('margin-left', '-' + _leftMargin + 'px');

    };

    ub.funcs.showTeamColorPicker = function (index) {

        $('div#single_team-color-picker').fadeIn();
        $('div#cw').hide();

    };

    ub.data.initialized = false;
    ub.funcs.initTeamColors = function () {

        var _colorSet       = '';
        _colorSet           = ub.funcs.getBaseColors();

        $("span.part_label").html('Team Colors');
        $("span.nOf").html('Select the Colors you will use for your Uniform');
        $('div#primary_options_container').html('<div id="team-color-picker"></div><div id="cw"></div>');

        $('#team-color-picker').ubTeamColorPicker({
        
            target: 'team-color-picker',
            type: 'single',
            colorSet: _colorSet,
            factory: ub.current_material.material.factory_code,

        });

        ub.funcs.showTeamColorPicker();

        if (!ub.data.initialized) {

            ub.funcs.restoreTeamColorSelections();
            ub.data.initialized = true;
            
        }
        else {

            var colors_btn = util.dataSelector('.btn', { 'elid': 'single_team-color-picker' });

            _.each(ub.current_material.settings.team_colors, function(color, index){

                var color_btn = util.dataSelector('.btn', { 'elid': 'single_team-color-picker', 'color-label': color.color_code });
                color_btn.attr('data-status','selected');

            });

            var s = 1;
            colors_btn.each(function(){
                
                if ($(this).data('status') === 'selected'){
                    $(this).first().html(s);
                    s+=1;
                }

            });

            // colors_btn.each(function(index){

            //     var _color_code = $(this).data('color-label');
            //     var _match = typeof _.find(ub.current_material.settings.team_colors, {color_code: _color_code}) === 'object'
                
            //     if (_match){
                    
            //         $(this).first().data('status','unselected');
            //         $(this).first().html(s);
            //         s += 1;

            //     }

            // });

        }
    }

});