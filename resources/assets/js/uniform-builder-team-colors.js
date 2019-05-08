$(document).ready(function () {

    /// UI v1

    ub.funcs.ui = {};

    ub.funcs.ui.getAllNames = function (materialOptionName) {

        var _names      = [];
        var _obj        = _.find(ub.data.modifierLabels, {name: materialOptionName});
        var _name       = _obj.fullname;
        var _otherSide  = '';

        _names.push(_name);

        if (_name.indexOf('left') >-1 && _name.indexOf('body') === -1) {
            _match      = _name.replace('left', 'right');
            _names.push(_match);
        }

        if (_name.indexOf('right') >-1 && _name.indexOf('body') === -1) {
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

                    if (typeof ub.funcs.pushOldState === "undefined") { return; } 

                    ub.funcs.pushOldState('color change', 'material option', _materialOptionObject, _materialOptionObject.colorObj, colorObj);

                }

            }

            _materialOptionObject.color     = parseInt(colorObj.hex_code, 16);
            _materialOptionObject.colorObj  = colorObj;

        }

    };

    // Change Matching Part (e.g. for Waistband, Prolook on Compression Pants)
    ub.funcs.ui.setMatchingColor = function (materialOptionCode, colorObj, source) {

        var _isCoordinating = ub.data.coordinatingColors.isCoordinating(materialOptionCode.toTitleCase(), 
                    ub.config.sport,
                    ub.config.blockPattern, 
                    ub.config.option,
                    colorObj.color_code);

        if (_isCoordinating.result) {

            var _matchingPartColorObj = ub.funcs.getColorByColorCode(_isCoordinating.matchingPartColor);
            var _matchingPartCode = _isCoordinating.matchingPart.toCodeCase();

            ub.funcs.setMaterialOptionSettingsColor(_matchingPartCode, _matchingPartColorObj, source);
            if (ub.data.afterLoadCalled !== 1) { return; }
            ub.change_material_option_color16(_matchingPartCode, parseInt(_matchingPartColorObj.hex_code, 16));

        }

    }

    // Set Color of the Actual Sprite in the stage
    ub.funcs.ui.setMaterialOptionColor = function (name, colorObj, source) {

        var _names = ub.funcs.ui.getAllNames(name);

        _.each(_names, function (name) {

            ub.funcs.setMaterialOptionSettingsColor(name, colorObj, source);
            ub.funcs.ui.setMatchingColor(name, colorObj, source);

            if (ub.data.afterLoadCalled !== 1) { return; }

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
        var _notFound = [];

        _.each (_colors, function (_color) {

            var _match = _.find(ub.data.colors, {color_code: _color});

            if (typeof _match === 'undefined') {
                _notFound.push(_color);
            }
            else {
                _newColorSet.push(_match);    
            }            

        });

        if (_notFound.length > 0) { ub.utilities.info("Can't find these assigned colors for " + material_option + ": " + _notFound.toString()); }

        return _newColorSet;

    };

    ub.funcs.restoreTeamColorSelectionsFromInitialUniformColors = function () {

        ub.front_view.alpha = 0;

        _sorted = _.sortBy(ub.data.colorsUsed, 'teamColorID');
        _.each(_sorted, function (_color) {

            $('button.change-color[data-color-code="' + _color.hexCode + '"]').click();

        });

        ub.funcs.drawColorPickers();
        ub.front_view.alpha = 1;

    }

    ub.funcs.restoreTeamColorSelections = function () {

        // if coming from saved customizations skip
        if (typeof window.ub.temp === "string") { return; }

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

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
          
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

      return {

        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))

      };

    }

    function describeArc (x, y, radius, startAngle, endAngle) {

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

    ub.funcs.hasPattern  = function (materialOption) {

        if (typeof materialOption.pattern === "undefined")              { return false; }
        if (typeof materialOption.pattern.pattern_obj === "undefined")  { return false; }
        if (materialOption.pattern.pattern_id === "blank")              { return false; }

        return true;

    }

    ub.funcs.getMaterialOptionsWithPattern = function () {

        var _uniformType        = ub.current_material.material.type; 
        var _materialOptions    = ub.current_material.settings[_uniformType];
        var _matches            = [];

        _.each(_materialOptions, function (materialOption){

            if (ub.funcs.hasPattern(materialOption)) {

                _matches.push(materialOption);

            };

        });

        return _matches;

    }

    ub.funcs.updatePatterns = function () {

        if (ub.data.afterLoadCalled !== 1) {return;}

        var _patterns = [];
        _materialOptionsWithPattern = ub.funcs.getMaterialOptionsWithPattern();

        _.each (_materialOptionsWithPattern, function (_materialOption) {

            var _mCode = '';
            _mCode = _materialOption.code;

            _.each(_materialOption.pattern.pattern_obj.layers, function (layer, idx) {

                var _teamColorID    = parseInt(layer.team_color_id);
                var _teamColor      = ub.funcs.getTeamColorObjByIndex(_teamColorID);

                if (typeof _teamColor === "undefined") {

                    _teamColor = ub.funcs.getColorObjByHexCode(layer.default_color);

                } 
                
                var _uniformType = ub.current_material.material.type;
                var _titleCode = _materialOption.code.toTitleCase();
                var _rootContainer = ub.current_material.containers[_uniformType][_titleCode];

                if (typeof _rootContainer !== 'undefined') {

                    if (typeof _rootContainer.containers !== 'undefined') {
                        
                        _container = _rootContainer.containers;  
                        
                        _.each(_container, function (val){

                            layer.color = parseInt(_teamColor.hex_code, 16);
                            layer.color_code = _teamColor.color_code;
                            layer.default_color = _teamColor.hex_code;

                            val.container.children[idx].tint = layer.color;

                        });

                    }

                } 
 
            });

        });

    }

    ub.funcs.addColorToTeamColors = function (colorObj, cancelColorPickerUpdate) {

        var _teamColorObj = ub.current_material.settings.team_colors;
        var _result       = _.find(_teamColorObj, {color_code: colorObj.color_code});

        if (typeof _result !== "undefined") { return; } // exit if color already exist on _teamColorObj

        _teamColorObj.push(colorObj); 

        if (typeof cancelColorPickerUpdate === "undefined") {
            if (ub.data.afterLoadCalled) { ub.funcs.drawColorPickers(); }
        }
        
    };

    ub.funcs.ifColorIsUsedOnPatterns = function (colorObj) {

        var _result = false; 

        if (ub.data.afterLoadCalled !== 1) {return;}

        _materialOptionsWithPattern = ub.funcs.getMaterialOptionsWithPattern();

        _.each(ub.current_material.settings[ub.config.type], function (item) {
 
            if (typeof item.pattern !== "undefined") {
 
                if (item.pattern.pattern_id !== "" && item.pattern.pattern_id !== "blank") {

                    _.each(item.pattern.pattern_obj.layers, function (item) {
                        
                        colorItem = ub.funcs.getColorObjByHexCode(item.default_color);
                        
                        // Is Used
                        if (colorItem.id === colorObj.id) { _result = true; }

                    });

                }

            }

        });

        return _result;

    };

    ub.funcs.removeColorFromTeamColors = function (colorObj) {

        var _teamColorObj       = ub.current_material.settings.team_colors;
        var _indexOfColorObj    = undefined;

        var color = _.find(ub.current_material.settings.team_colors, {color_code: colorObj.color_code});
        var _indexOfColorObj = _.indexOf(_teamColorObj, color);

        if (_indexOfColorObj !== -1) {
            _teamColorObj.splice(_indexOfColorObj, 1);
        }

        ub.funcs.drawColorPickers();

        // Selective execution here ... Update pattern only if the color being removed is currently in used by the pattern
        if (ub.funcs.ifColorIsUsedOnPatterns(colorObj)){ ub.funcs.updatePatterns(); }
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


                /// Process Limited Colorset
                
                var _colorSet = undefined;
                var _limitedColorSet = ub.data.materialOptionWithLimitedColors.getLimitedColorSet(modLabel.name);

                if (typeof _limitedColorSet !== "undefined") {

                    _alternateColorSet = [];

                    _.each(_limitedColorSet.valid_colors, function (item) {

                        _alternateColorSet.push(ub.funcs.getColorByColorCode(item));

                    });

                    ub.utilities.info ('Limited Color Set detected for ' + modLabel.name);
                    _colorSet = _alternateColorSet;

                }

                if (typeof _limitedColorSet === "undefined") {
                    _colorSet = ub.current_material.settings.team_colors;
                }

                /// End Process Limited Colorset

                _.each(_colorSet, function (colorObj, index) {

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

            /// Process Limited Colorset
                
            var _colorSet = undefined;
            var _limitedColorSet = ub.data.materialOptionWithLimitedColors.getLimitedColorSet(modLabel.name);

            if (typeof _limitedColorSet !== "undefined") {

                _alternateColorSet = [];

                _.each(_limitedColorSet.valid_colors, function (item) {

                    _alternateColorSet.push(ub.funcs.getColorByColorCode(item));

                });

                ub.utilities.info ('Limited Color Set detected for ' + modLabel.name);

                _colorSet = _alternateColorSet;

                _elements   = _alternateColorSet.length;
                _length     = 360 / _elements;

            }

            if (typeof _limitedColorSet === "undefined") {
                _colorSet = ub.current_material.settings.team_colors;
            }

            /// End Process Limited Colorset

            _.each(_colorSet, function (colorObj, index) {

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

                   if (_colorOBJ.color_code === 'W' || _colorOBJ.color_code === 'Y' || _colorOBJ.color_code === 'CR' || _colorOBJ.color_code === 'S' || _colorOBJ.color_code === 'PK'  || _colorOBJ.color_code === 'OP' || _colorOBJ.color_code === 'SG' || _colorOBJ.color_code === 'FLG') {
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
        var _colorObj;

        if (typeof hexCode === 'undefined') {

            _colorObj = ub.funcs.getBaseColors()[0];
            
        } else {

            _colorObj   = _.find(_baseColors, {hex_code: hexCode.lpad("0",6).toString()});

        }

        return _colorObj;

    };

    ub.funcs.getColorByColorCode = function (colorCode) {

        var _colorObj = _.find(ub.data.colors, {color_code: colorCode });

        if (typeof _colorObj === "undefined") {
            
            if (colorCode !== "none") {
                console.error('Cant find colorCode ' + colorCode); // Only log if not none, none comes from turned off piping layers, when not in pipng its disabled colors e.g. Y, need to print those for the GA's
            }
            
            _colorObj = _.first(ub.data.colors);

        }

        if (colorCode == 'none') {

                _colorObj = {
                    forecolor: 'none',
                    color_code: 'none',
                    hex_code: 'none',
                    name: 'None',
                };
        }

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

        var _index              = index + 1;
        var _modifier           = ub.funcs.getModifierByIndex(_index);
        var _materialSettings   = ub.funcs.getSettingsByMaterialOptionCode(_modifier.fullname);
        var _intColor           = _materialSettings.color;
        var _hexCode            = (_intColor).toString(16);
        var colorObj            = ub.funcs.getColorObjByHexCode(_hexCode);

        // search by color code instead (hexcode changed fix)
        if (typeof colorObj === "undefined") {
            colorObj            =  ub.funcs.getColorByColorCode(_materialSettings.colorObj.color_code);
        }

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

    ub.funcs.getTeamColorIndexByColorID = function (colorID) {

        var _indexFound = undefined;
        var _ctr = 0;

        _.each(ub.current_material.settings.team_colors, function (team_color) {
            
            if (parseInt(team_color.id) === parseInt(colorID)){

                _indexFound = _ctr;        

            }

            _ctr += 1;

        });

        return _indexFound;

    }

    ub.funcs.initTeamColors = function () {
        
        var _colorSet       = '';
        
        // If `thread_colors` value is true in ub.current_material.settings
        // then use thread colors instead of the default colors
        if (ub.current_material.settings.threadColors) {

            _colorSet =  _.sortBy(ub.data.threadColors, 'order');

        } else {

            _colorSet = ub.funcs.getBaseColors();

            // hide FLB and FLG colors on Team Colors UI
            if (ub.config.blockPattern === 'Flag Football') {
                var flag_colors = ['FLB', 'FLG'];
                _colorSet = _.filter(ub.data.colors, function(color) {
                    return !_.contains(flag_colors, color.color_code);
                });
            }

        }

        $("span.part_label").html('Team Colors');
        $("span.nOf").html('Select the colors you will use');
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

            // return only the designated team colors by brand
            ub.current_material.settings.team_colors = ub.current_material.settings.team_colors.filter( function (team_color) {
                return team_color.brand === ub.config.brand.toLocaleLowerCase() || team_color.brand == ub.config.brand;
            });

            _.each(ub.current_material.settings.team_colors, function (color, index) {

                var color_btn = util.dataSelector('.btn', { 'elid': 'single_team-color-picker', 'color-label': color.color_code });
                
                if (typeof color_btn !== 'undefined') { 
                    color_btn.attr('data-status', 'selected');
                }

            });

            var s = undefined;
            colors_btn.each( function() {
                
                if ($(this).data('status') === 'selected') {

                    var _colorID = $(this).data('color-id');
                    s = ub.funcs.getTeamColorIndexByColorID(_colorID);
                    s = parseInt(s) + 1;

                    $(this).first().html(s);

                }

            });

        }
    }

    ub.funcs.isInTeamColor = function (colorCode) {
    
        var _result = _.find(ub.current_material.settings.team_colors, {color_code: colorCode});

        return (typeof _result !== 'undefined');

    };

    // diff is the result of _.difference(ub.data.colors, ub.current_material.settings.team_colors)
    // or all colors thats not added to ... settings.team_colors
    // but only add after the initial team colors is setup first

    ub.funcs.addAllColorToTeamColors = function () {
    
        var _baseColors = ub.funcs.getBaseColors();
        var _diffColors = _.difference(_baseColors, ub.current_material.settings.team_colors);

        _.each (_diffColors, function (colorObj) {

            var $btnSelector = $('button[data-target="Team-color-picker"][data-color-label="' + colorObj.color_code + '"]');
            var color        = $btnSelector.data('color');
            var colorID      = $btnSelector.data('color-id');
            var colorStatus  = $btnSelector.data('status');
            var colorCode    = $btnSelector.data('color-code');
            var colorLabel   = $btnSelector.data('color-label');
            var _index       = ub.current_material.settings.team_colors.length + 1;

            $btnSelector.first().data('status','selected');
            $btnSelector.first().html('<i class="fa fa-check" aria-hidden="true"></i>');
            $btnSelector.first().html(_index);

            if (colorLabel === 'W' || colorLabel === 'Y' || colorLabel === 'CR' || colorLabel === 'S' || colorLabel === 'PK'  || colorLabel === 'OP' || colorLabel === 'SG') {                
                $btnSelector.first().css('color', '#3d3d3d');
                $btnSelector.first().css('text-shadow', '1px 1px #d7d7d7');
            }

            ub.funcs.addColorToTeamColors(colorObj);

        });

    }

});