$(document).ready(function () {

    // Pattern Data

        ub.patterns = {};
        ub.patterns.patternOffset = {

            items: [
                {
                    patternCode: 'line_fade_body',
                    partCodes: ['pocket'],
                    blockPatterns: ['Hoodie'],
                    
                    offSet: 1000,
                },
            ],

            getOffset: function (patternCode, blockPattern, part) {
                
                var a = _.find(this.items, function (item) {
                    return item.patternCode === patternCode && 
                        _.contains(item.blockPatterns, blockPattern) && 
                        _.contains(item.partCodes, part);
                });

                return typeof a !== "undefined" ? a.offSet : undefined;

            },

        };

        // Todo: place also the UBUI Data contents here, and assume similar form on other types

    // End Pattern Data 

    ub.funcs.getPatternList = function () {

        var _sport = ub.current_material.material.uniform_category;
        var _patternList = _.sortBy(_.filter(ub.data.patterns.items,{active: "1"}), 'sortID'); 

        // _patternList = _.filter(_patternList, function (pattern) {

        //     var _expression = (_.contains(pattern.blockPatternOptions, ub.config.option) || pattern.name === "Blank") ||
        //         pattern.blockPatternOptions === null || 
        //         (typeof pattern.blockPatternOptions === "object" && pattern.blockPatternOptions[0] === "");

        //     return _expression;

        // });

        if (ub.data.smallerPatterns.usesSmallerPattern(ub.sport, ub.neckOption)) {

             _patternList = _.filter(_patternList, function (pattern) {

                return _.contains(pattern.blockPatternOptions, ub.neckOption) || pattern.name === "Blank" ;

            });

        }

        return _patternList;

    }


    // Set Color of the Actual Sprite in the stage
    //ub.funcs.ui.setMaterialOptionPatternColor = function (ub.active_part, _colorOBJ, layerID, _patternObj) {
    ub.funcs.setMaterialOptionPatternColor = function (materialOption, colorOBJ, layerID, patternObj) {

        var _materialOption     = materialOption;
        var _colorOBJ           = colorOBJ;
        var _layerID            = layerID;
        var _patternObj         = patternObj;      
        var _layerObj           = _.find(_patternObj.layers, {layer_no: layerID.toString()});
        var _tintColor          = ub.funcs.hexCodeToTintColor(_colorOBJ.hex_code);
        
        var _modifier           = ub.funcs.getModifierByIndex(ub.current_part);
        var _names              = ub.funcs.ui.getAllNames(_modifier.name);

        var canvas              = ub.data.previewCanvas;
        var oImg                = ub.data.previewContainer[_layerID];

        _layerObj.color         = _tintColor;
        _layerObj.color_code    = colorOBJ.color_code;
        _layerObj.default_color = colorOBJ.hex_code;

        delete oImg.filters[0];

        oImg.filters.push(new fabric.Image.filters.Tint({
            color: "#" + _colorOBJ.hex_code,
            opacity: 1,
        }));

        oImg.applyFilters(canvas.renderAll.bind(canvas));
        canvas.renderAll();

        setTimeout(function() {             
            var _dUrl = canvas.toDataURL();

            _.each(_patternObj.layers, function (l) {

                $('svg#svg_pcw' + l.layer_no + ' > defs > pattern > image').attr('xlink:href', _dUrl);
                
            });    

        }, 50);
        
        _.each(_names, function (_name) {

            var titleNameFirstMaterial      = _name.toTitleCase();
            var _settingsObject             = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
            var layer = _.find(_settingsObject.pattern.pattern_obj.layers, {layer_no: layerID.toString()});

            layer.color = _tintColor;
            layer.color_code = colorOBJ.color_code;
            
            var _materialOptions            = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

            _.each(_materialOptions, function (_materialOption) {

                var _materialOptionName     = _materialOption.name;
                var _uniformType            = ub.current_material.material.type;
                var _containers             = ub.current_material.containers[_uniformType][_materialOptionName].containers;
                var views                   = ['front', 'back', 'left', 'right'];        
                var c                       = ub.current_material.containers[_uniformType][_materialOptionName].containers;

                _.each(views, function (v) {
                    c[v].container.children[layerID - 1].tint = _tintColor;
                });

            });

        })
        
    };


    ub.funcs.deActivatePatterns = function () {

        ub.funcs.clearPatternUI();

    }


    ub.funcs.updateColorLabel = function (label) {

        $('div.patternColorNavigator > div.label').html(label);

    }


    ub.funcs.moveToNextPatternColor = function (patternObj) {

        var _layerCount = _.size(patternObj.layers);
        ub.data.currentPatternLayer += 1;

        if (ub.data.currentPatternLayer > _layerCount) { ub.data.currentPatternLayer = _layerCount; }

        if (ub.data.currentPatternLayer > 0) {

            var _widthOfCW  = $('div.pattern-color-wheel').first().width();
            var _leftMargin = (ub.data.currentPatternLayer - 1) * _widthOfCW;

            $('div.pattern-color-wheel-container').css('margin-left', "-" + _leftMargin + 'px');
            $('div.patternPreviewContainer').hide();
            $('div.pattern-color-wheel-container').fadeIn();

        }

        var _colorSet       = ub.funcs.getBaseColors();
        var _activeLayer    = _.find(patternObj.layers, {layer_no: ub.data.currentPatternLayer.toString() });
        var _convertedColor = util.padHex((_activeLayer.color).toString(16), 6);
        var _colorOBJ       = _.find(_colorSet, {hex_code: _convertedColor});

        ub.funcs.updateColorLabel('COLOR ' + ub.data.currentPatternLayer + ' of ' + patternObj.layers.length);

        var $svgPath = $('svg#svg_pcw' + (ub.data.currentPatternLayer) + ' > path[data-color-id="' + _colorOBJ.id +'"]');
        $svgPath.trigger('click');

        // Hide Position Slider
        $('span.irs').hide();


    };


    ub.funcs.moveToPreviousPatternColor = function (patternObj) {

        var _layerCount = _.size(patternObj.layers);
        ub.data.currentPatternLayer -= 1;

        var _widthOfCW  = $('div.pattern-color-wheel').first().width();
        var _leftMargin = (ub.data.currentPatternLayer - 1) * _widthOfCW;

        $('div.pattern-color-wheel-container').css('margin-left', "-" + _leftMargin + 'px');
        ub.funcs.updateColorLabel('COLOR ' + ub.data.currentPatternLayer  + ' of ' + patternObj.layers.length);

        if (ub.data.currentPatternLayer < 1) {

            ub.data.currentPatternLayer = 0;

            $('div.pattern-color-wheel-container').hide();
            $('div.patternPreviewContainer').fadeIn();

            ub.funcs.updateColorLabel('EDIT COLORS');

            // Show Position Slider
            $('span.irs').show()

        }

    };


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

    ub.funcs.changePatternPosition = function (id, position) {

        var _value = parseInt(position);
        var _patternStr = "pattern_" + id;
        var _perspectiveStr = '';
        var _viewObjects = ub.funcs.getApplicationViewObjects(id);
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: id.toString()});
        var _calibration = 0;

        if (_.contains(ub.uiData.patternSliderRange.forCalibration, _settingsObject.pattern_obj.name)) {

            _calibration = ub.uiData.patternSliderRange.adjustedStart;

        }

        _.each(_viewObjects, function (viewObject) {

            _perspectiveStr = viewObject.perspective + '_view';

            var _patternObject = ub.objects[_perspectiveStr][_patternStr];
            var _positionY = (0 + parseInt(position));

            _patternObject.position.y = (0 + parseInt(position) + _calibration);
            _settingsObject.pattern_settings.position = {x: 0, y: _positionY};

        });

        var _matchingID;
        var _matchingSide;
        var _matchingSettingsObject;

        _matchingID = ub.data.matchingIDs.getMatchingID(id);

        if (typeof _matchingID !== "undefined") {

            _applicationSettings = ub.current_material.settings.applications[_matchingID];
            _applicationViewObjects = ub.funcs.getApplicationViewObjects(_matchingID);
            _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});

            _.each(_applicationViewObjects, function (viewObject) {

                var _patternObject = ub.objects[_perspectiveStr][_patternStr];
                var _positionY = (0 + parseInt(position));

                _perspectiveStr = viewObject.perspective + '_view';
                _patternStr = "pattern_" + _matchingID;

                _patternObject.position.y = (0 + parseInt(position) + _calibration);
                _matchingSettingsObject.pattern_settings.position = {x: 0, y: _positionY};

            });

        }

    }

    ub.funcs.setupPatternsAndSmallColorPickerEvents = function (settingsObj) {

        $('span.patternThumb, span.pattern').unbind('click');
        $('span.patternThumb, span.pattern').on('click', function () {

            ub.funcs.createPatternPopupApplications(settingsObj);

        });

        if (typeof settingsObj.pattern_obj === "undefined") { 
        
            $('input#pattern-slider').hide();
            return; 

        }

        if (settingsObj.pattern_obj.name === "Blank") {

            $('input#pattern-slider').hide();

        } else {

            var _from = ub.uiData.patternSliderRange.starts;
            var _calibration = ub.uiData.patternSliderRange.adjustedStart;
            var _patternIsForCalibration = false; 
 
            _patternIsForCalibration = _.contains(ub.uiData.patternSliderRange.forCalibration, settingsObj.pattern_obj.name);

            if (typeof settingsObj.pattern_settings !== "undefined" && settingsObj.pattern_settings.length > 0) {

                _from = settingsObj.pattern_settings.position.y;

                if (_patternIsForCalibration) {

                    _from -= _patternIsForCalibration;

                }

            } else {

                _from = settingsObj.pattern_settings.position.y;

            }

            $('input#pattern-slider').show();

            if (typeof $("#pattern-slider").destroy === "function") { 
                $("#pattern-slider").destroy(); 
            }
            
            $("#pattern-slider").ionRangeSlider({

                min: ub.uiData.patternSliderRange.min,
                max: ub.uiData.patternSliderRange.max,
                from: _from,
                onChange: function (data) {

                    ub.funcs.changePatternPosition(settingsObj.code, data.from);

                },

            });

        }
        
        /// End Range Slider 

        var $sp = $('div.column1.applications.patterns > div.colorContainer > div.smallPickerContainer > span.colorItem[data-object-type="text-patterns"]');
        var _primaryView = ub.funcs.getPrimaryView(ub.current_material.settings.applications[settingsObj.code].application);
        var _patternContainer = ub.objects[_primaryView + '_view']['pattern_' + settingsObj.application.id];

        $sp.unbind('click');
        $sp.on('click', function () {

            var _objectType = $(this).data('object-type');
            var _colorCode  = $(this).data('color-code');
            var _layer_no   = $(this).data('layer-no');
            var _color_code = $(this).data('color-code');
            var _layer_name = $(this).data('layer-name');

            var _colorObj   = ub.funcs.getColorByColorCode(_color_code);
            var _layer      = _.find(settingsObj.pattern_obj.layers, {layer_no: _layer_no});

            _layer.default_color = _colorObj.hex_code;
            _layer.color_code = _color_code;

            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj, 'text-patterns');

            _applicationSettings = ub.current_material.settings.applications[settingsObj.application.id];
            _applicationViewObjects = ub.funcs.getApplicationViewObjects(settingsObj.application.id);

            _.each(_applicationViewObjects, function (viewObject) {

                _primaryView = viewObject.perspective;
                _primaryViewStr = _primaryView + '_view';
                _patternIDStr = 'pattern_' + settingsObj.application.id;
                _sprites = ub.objects[_primaryViewStr][_patternIDStr];

                _layer = _sprites.children[_layer_no - 1];
                _layer.tint = parseInt(_colorObj.hex_code, 16);

            });

            var _matchingID;
            var _matchingSide;
            var _matchingSettingsObject;

            _matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

            if (typeof _matchingID !== "undefined") {

                _applicationSettings = ub.current_material.settings.applications[_matchingID];
                _applicationViewObjects = ub.funcs.getApplicationViewObjects(_matchingID);
                _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});

                _.each(_applicationViewObjects, function (viewObject) {

                    _primaryView = viewObject.perspective;
                    _primaryViewStr = _primaryView + '_view';
                    _patternIDStr = 'pattern_' + _matchingSettingsObject.application.id;
                    _sprites = ub.objects[_primaryViewStr][_patternIDStr];

                    _layer = _sprites.children[_layer_no - 1];
                    _layer.tint = parseInt(_colorObj.hex_code, 16);

                });

            }

        });

    }


    ub.funcs.updateTextPatternPanel = function (patternObj) {

        var _patternObj = patternObj;
        var _thumbnail = '/images/patterns/Blank/1.png';
        var _name = 'Blank';
        var _templateStr = '';
        var _colorContainer = '';

        if (typeof _patternObj !== "undefined") {

            _name = _patternObj.name;
            _thumbnail = _patternObj.icon;

            _.each(_patternObj.layers, function (layer) {

                var _colorObj = ub.funcs.getColorObjByHexCode(layer.default_color);

                _colorContainer += ub.funcs.createSmallColorPickers(_colorObj.color_code, layer.layer_no, layer.layer_no, layer.default_color, 'text-patterns');

                // No Color Pickers when pattern is Blank
                if (_patternObj.name === "Blank") { 
                    _colorContainer = ""; 
                }

            });

        }

        _templateStr = ub.utilities.buildTemplateString("#m-patterns-panel", {thumbnail: _thumbnail, name: _name, colorString: _colorContainer});

        return _templateStr;

    }

    ub.funcs.updateManipulatorsPanel = function (settingsObj) {

        var _templateStr = '';

        _templateStr = ub.utilities.buildTemplateString("#m-manipulator-panel", {
            x: '1',
            y: '2',
        });

        return _templateStr;

    }

    ub.funcs.changePatternFromPopupApplications = function (settingsObj, patternID) {

        var _code = settingsObj.code;

        var _patternID                  = patternID.toString();
        var _patternObject              = _.find(ub.data.patterns.items, {id: _patternID.toString()});
        var _uniform_type               = ub.current_material.material.type;
        var app_containers              = ub.current_material.containers[_uniform_type].application_containers;

        var _primaryView = ub.funcs.getPrimaryView(settingsObj.application);
        var _spriteCollection = ub.objects[_primaryView + '_view']['objects_' + settingsObj.code];

        _.each (_patternObject.layers, function (layer) {

            var team_color = ub.funcs.getTeamColorObjByIndex(layer.team_color_id);

            if (typeof team_color !== 'undefined') {

                layer.default_color = team_color.hex_code; // Assign New Team Color if not just use default 
                layer.color_code = team_color.color_code;

            }
            
        });

        var _patternObj = _.find(ub.data.patterns.items, {id: patternID.toString()});

        settingsObj.pattern_obj = _patternObj;

        if (typeof settingsObj.pattern_obj === 'object') {

            var $patternPanelContainer = $('div.column1.applications.patterns');
            var _templateStr = '';

            if (typeof settingsObj.pattern_settings === "undefined") {

                settingsObj.pattern_settings = {

                    rotation: 0,
                    scale: {x: 1, y: 1},
                    position: {x: 0, y: 0},
                    opacity: 1, 

                };

            }

            $.ub.mvChangePattern(settingsObj.application, settingsObj.application.id, _patternObj, _spriteCollection);

            _templateStr = ub.funcs.updateTextPatternPanel(_patternObject);

            $.when($patternPanelContainer.html(_templateStr)).then(ub.funcs.setupPatternsAndSmallColorPickerEvents(settingsObj));

        }

    }

    ub.funcs.prepBackendPatternSettings = function (applicationObj) {

        _.each(applicationObj.application.views, function (view) {

            if (view.application.appDefPattern !== "" && typeof view.application.appDefPattern !== "undefined") {

                view.application.patternDefinition = {

                    id: view.application.appDefPattern, 
                    layers: JSON.parse(view.application.appPatternProperties),

                }

                if (view.application.appDefPatternPosition !== "" && typeof view.application.appDefPatternPosition !== "undefined") {
                    view.application.patternDefinition.position = {x: 0, y: parseInt(view.application.appDefPatternPosition) };
                } else {
                    view.application.patternDefinition.position = {x: 0, y: 0 };
                }

                applicationObj.withPattern = true;
                applicationObj.patternID = view.application.patternDefinition.id;
                applicationObj.patternConfigFromBackend = view.application.patternDefinition;

            } else {

                applicationObj.withPattern = false;

            }
            
        });

        return applicationObj;

    };

    ub.funcs.changePatternFromBackend = function (settingsObj, patternID, patternSettingsFromBackend) {

        var _code = settingsObj.code;

        var _patternID                  = patternID.toString();
        var _patternObject              = _.find(ub.data.patterns.items, {id: _patternID.toString()});
        var _uniform_type               = ub.current_material.material.type;
        var app_containers              = ub.current_material.containers[_uniform_type].application_containers;

        _patternObject                  = JSON.parse(JSON.stringify(_patternObject)); // deep copy
        
        var _primaryView = ub.funcs.getPrimaryView(settingsObj.application);
        var _spriteCollection = ub.objects[_primaryView + '_view']['objects_' + settingsObj.code];

        _.each (_patternObject.layers, function (layer) {

            var backendLayerSettings = _.find(patternSettingsFromBackend.layers, { layer: layer.layer_no.toString() })

            if (typeof backendLayerSettings !== "undefined") {

                var colorObj = ub.funcs.getColorByColorCode(backendLayerSettings.default_color);

                if (typeof colorObj !== "undefined") {

                    layer.default_color = colorObj.hex_code; // Assign New Team Color if not just use default 
                    layer.color_code = backendLayerSettings.default_color;

                } else {

                    var team_color = ub.funcs.getTeamColorObjByIndex(layer.team_color_id);

                    if (typeof team_color !== 'undefined') {

                        layer.default_color = team_color.hex_code; // Assign New Team Color if not just use default 
                        layer.color_code = team_color.color_code;

                    }

                }

            }
            
        });
        
        settingsObj.pattern_obj = _patternObject;

        if (typeof settingsObj.pattern_obj === 'object') {

            var $patternPanelContainer = $('div.column1.applications.patterns');
            var _templateStr = '';

            if (typeof settingsObj.pattern_settings === "undefined") {

                settingsObj.pattern_settings = {

                    rotation: 0,
                    scale: {x: 1, y: 1},
                    position: patternSettingsFromBackend.position,
                    opacity: 1, 

                };

            }

        }

    }

    ub.funcs.createPatternPopupApplications = function (settingsObj) {

        if ($('div#primaryPatternPopup').length === 0) {

            var _patternList = ub.funcs.getPatternList();

            var data = {
                label: 'Choose Patterns: ',
                patterns: _patternList,
            };

            var template = $('#m-pattern-popup').html();
            var markup = Mustache.render(template, data);

            $('body').append(markup);

        }

        ub.funcs.centerPatternPopup();

        $popup = $('div#primaryPatternPopup');
        $popup.fadeIn();

        $('div.patternPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('pattern-id');

            ub.funcs.changePatternFromPopupApplications(settingsObj, _id);
            $popup.remove();

            var _matchingID = undefined;
            _matchingID = ub.data.matchingIDs.getMatchingID(settingsObj.code);

            if (typeof _matchingID !== "undefined") {

                var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                ub.funcs.changePatternFromPopupApplications(_matchingSettingsObject, _id);

            }

        });

        $('div.close-popup').on('click', function (){

            $popup.remove();

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

        });

    };

    ub.funcs.changePatternFromPopup = function (currentPart, patternID) {

        var _patternID                  = patternID.toString();
        var _currentPart                = currentPart;
        var _patternObject              = _.find(ub.data.patterns.items, {id: _patternID.toString()});
        
        _.each (_patternObject.layers, function (layer)  {

            var team_color = ub.funcs.getTeamColorObjByIndex(layer.team_color_id);

            if (typeof team_color !== 'undefined') {

                layer.default_color = team_color.hex_code; // Assign New Team Color if not just use default 

            }
            
        });

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);
        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();

        _.each(_names, function (name) {

            var _settingsObject         = ub.funcs.getMaterialOptionSettingsObject(name.toTitleCase());
            var _materialOptions        = ub.funcs.getMaterialOptions(name.toTitleCase());

            materialOption              = _materialOptions[0];
            outputPatternObject         = ub.funcs.convertPatternObjectForMaterialOption(_patternObject, materialOption);
            _settingsObject.pattern     = outputPatternObject;
            e = _settingsObject;

            ub.generate_pattern(e.code, e.pattern.pattern_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);

        });

        ub.funcs.clearPatternUI();
        ub.funcs.activatePatterns();

    }


    ub.funcs.createPatternPopup = function () {

        if ($('div#primaryPatternPopup').length === 0) {

            var _patternList = ub.funcs.getPatternList();

            var data = {
                label: 'Choose Patterns: ',
                patterns: _patternList,
            };

            var template = $('#m-pattern-popup').html();
            var markup = Mustache.render(template, data);

            $('body').append(markup);

        }

        ub.funcs.centerPatternPopup();

        $popup = $('div#primaryPatternPopup');
        $popup.fadeIn();

        $('div.patternPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('pattern-id');

            ub.funcs.changePatternFromPopup(ub.current_part, _id);
            $popup.remove();

        });

        $('div.close-popup').on('click', function (){

            $popup.remove();

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

        });

    };


    ub.data.currentPatternLayer = 0;
    ub.funcs.createPatternUI = function (inputPattern, materialOption) {

        var _inputPattern   = inputPattern;
        var _patternObj     = inputPattern.pattern_obj;
        var _materialOption = materialOption;

        var _htmlBuilder    = "<div id='patternUI'>";

        var _patternName    = _patternObj.name;
        var _thumbnail      = _patternObj.icon;

        var _teamColorObj   = ub.current_material.settings.team_colors;
        var _colorSet       = ub.funcs.getBaseColors();
        var _tempIndex      = 1;

        _htmlBuilder        += "<div class='patternName'><glabel>Pattern Name: </label> <span class='value'>" + _patternName + "</span></div>";
       // _htmlBuilder        += '<div class="allPartsContainer"><input type="checkbox" name="applyToAllParts" value="apply" > APPLY TO ALL PARTS</div>';
        _htmlBuilder        += '<div class="patternPreviewContainer"><canvas id="patternPreview" class="patternPreview"></canvas></div>';
        _htmlBuilder        += '<div class="pattern-color-wheel-container">';

        _.each(_patternObj.layers, function (layer) {

            var fill        = 'white';
            var layerID     = layer.layer_no;

            _htmlBuilder    += '<div class="color-wheel pattern-color-wheel" id="pcw_' + layerID + '">';        
            _htmlBuilder    += '<svg id="svg_pcw' + layerID + '" class="svg-color-wheel">';
            _tempIndex      += 1;

            _htmlBuilder    += '<defs><pattern id="image" x="50" y="-50" patternUnits="userSpaceOnUse" height="300" width="300"><image x="0" y="0" width="300" height="350" xlink:href=""></image></pattern></defs>';
            _htmlBuilder    += '<circle class="preview" cx="250" cy="170" r="80"  fill="url(#image)" />';

            _.each(_teamColorObj, function (colorObj, index) {

                _htmlBuilder  +=  '<path class="growStroke arc-' + layerID + '" id="arc' + index + '-' + layerID + '" data-color-id="' + colorObj.id + '" fill="none" stroke="#' + colorObj.hex_code + '" stroke-width="50" />'; 

            });

            _htmlBuilder     += '</svg>';
            _htmlBuilder     += '</div>';

        });

        _htmlBuilder     += '</div>';

        if(_inputPattern.pattern_id !== "none" || _inputPattern.pattern_id !== "blank") {

            _htmlBuilder     += "<div class='patternColorNavigator'><div class='left'><i class='fa fa-chevron-left' aria-hidden='true'></i></div><div class='label'>EDIT COLORS</div><div class='right'><i class='fa fa-chevron-right' aria-hidden='true'></i></div></div>";

        }

        // Slider
        _htmlBuilder += "<br /><br />";
        _htmlBuilder += '<input type="text" id="part-pattern-slider" value="" />';

        // End Slider 
        
        _htmlBuilder     += "</div>";

        $('.modifier_main_container').append(_htmlBuilder);

        ub.funcs.setupPartPatternSlider(inputPattern, materialOption);


        _.each(_patternObj.layers, function (layer) {

            var layerID     = layer.layer_no;

            var _elements   = _teamColorObj.length;
            var _length     = 360 / _elements;
            var _start      = 0;

            _.each(_teamColorObj, function (colorObj, index) {

                var _nth    = index;
                var _start  = _nth * _length;
                var _end    = _start + _length;
                var _id     = "arc" + index + '-' + layerID;

                document.getElementById(_id).setAttribute("d", describeArc(250, 170, 125, _start, _end));

                $("path#arc" + index + '-' + layerID).on("click", function () {

                   $("path.arc-" + layerID).attr("class", "growStroke arc-" + layerID);
                   $(this).attr("class", "selectedStroke growStroke arc-" + layerID);

                   var _colorID           = $(this).data('color-id');
                   var _colorOBJ          = _.find(_colorSet, {id: _colorID.toString()});
                   
                   ub.funcs.setMaterialOptionPatternColor(materialOption, _colorOBJ, layerID, _patternObj);

                });

            });

        });    

        var _sizeOf     = _.size(_patternObj.layers);
        var _widthOfCW  = $('div.pattern-color-wheel').first().width();

        $('div.pattern-color-wheel-container').css('width', (_sizeOf * _widthOfCW) + 'px');

        $('#patternUI').fadeIn();

        ub.funcs.createPatternPreview(_inputPattern);

    };

    ub.funcs.setupPartPatternSlider = function (inputPattern, materialOption) {

        var _partSettingsObject = ub.funcs.getMaterialOptionSettingsObject(materialOption.name);

        if (inputPattern.name === "Blank") {

            $('input#part-pattern-slider').hide();

        } else {

            var _from = ub.uiData.patternSliderRange.starts;
            var _calibration = ub.uiData.patternSliderRange.adjustedStart;
            var _patternIsForCalibration = false; 

            var _offset = ub.patterns.patternOffset.getOffset(inputPattern.pattern_id, ub.config.blockPattern, _partSettingsObject.code);
 
            _patternIsForCalibration = _.contains(ub.uiData.patternSliderRange.forCalibration, inputPattern.name);

            if (typeof _partSettingsObject.pattern !== "undefined" && _partSettingsObject.pattern.length > 0) {

                _from = _partSettingsObject.pattern.position.y;

                if (_patternIsForCalibration) {

                    _from -= _patternIsForCalibration;

                }

            } else {

                _from = _partSettingsObject.pattern.position.y;

            }

            $('input#part-pattern-slider').show();

            if (typeof $("#part-pattern-slider").destroy === "function") { 
                $("#part-pattern-slider").destroy(); 
            }

            if (typeof _offset !== "undefined" && typeof _partSettingsObject.pattern.dirty === "undefined") {

                _from = _offset;
                ub.funcs.changePartPatternPosition(materialOption.name, _from, true);

            }
            
            $("#part-pattern-slider").ionRangeSlider({

                min: ub.uiData.patternSliderRange.min,
                max: 1000,
                from: _from,
                onChange: function (data) {

                    ub.funcs.changePartPatternPosition(materialOption.name, data.from);

                },

            });

            $('div#patternUI > span.irs').css('margin-left', '5%');

        }

    };

    ub.data.previewContainer    = {};
    ub.data.previewCanvas       = {};
    ub.data.patternToolTip      = {};

    ub.funcs.getMaterialOptionPatternViewObjects = function (materialOptionName) {

        var _viewObjects = [];

        _.each (ub.views, function (view) {

            var _obj = ub.objects[view + '_view']['pattern_' + materialOptionName.toCodeCase()];

            if (typeof _obj !== "undefined") {
                _viewObjects.push(_obj);
            }

        })

        return _viewObjects;

    }

     ub.funcs.getMaterialOptionViewObjects = function (materialOptionName) {

        var _viewObjects = [];

        _.each (ub.views, function (view) {

            var _obj = ub.objects[view + '_view'][materialOptionName];

            if (typeof _obj !== "undefined") {
                _viewObjects.push(_obj);
            }

        })

        return _viewObjects;

    }


    ub.funcs.changePartPatternPosition = function (code, from, dontSetDirtyFlag) {

        var _value = parseInt(from);

        var _perspectiveStr = '';
        var _viewObjects = ub.funcs.getMaterialOptionPatternViewObjects(code);
        var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(code.toTitleCase());
        var _calibration = 0;

        // if (_.contains(ub.uiData.patternSliderRange.forCalibration, _settingsObject.pattern.name)) {

        //     _calibration = ub.uiData.patternSliderRange.adjustedStart;

        // }

        _.each(_viewObjects, function (viewObject) {

            var _patternObject = viewObject;
            var _positionY = (0 + parseInt(from));

            _patternObject.position.y = (0 + parseInt(from) + _calibration);
            _settingsObject.pattern.position = {x: _settingsObject.pattern.position.x, y: _positionY};
            
            if(typeof dontSetDirtyFlag !== "undefined") { _settingsObject.pattern.dirty = true; }
            
        });

    };

    ub.funcs.createPatternPreview = function (inputPattern) {

        var _inputPattern       = inputPattern;
        var _patternObj         = inputPattern.pattern_obj;
        var _patternName        = _patternObj.name;
        var $patternContainer   = $('canvas#patternPreview');
        var canvas              = new fabric.Canvas('patternPreview');
        var context             = canvas.getContext("2d");
        ub.data.previewCanvas   = canvas;
        
        canvas.setHeight(250);
        canvas.setWidth(300);

        _.each(_patternObj.layers, function (layer) {

            var _layer_no       = layer.layer_no;
            var _filename       = layer.filename;
            var _defaultColor   = layer.color;
            var _color          = "#" + util.padHex((_defaultColor).toString(16),6);
            var _localName      = "/images/patterns/" + _patternName + "/" + _layer_no + ".png";

            fabric.Image.fromURL(_localName, function (oImg) {
                
                ub.data.previewContainer[_layer_no] = oImg;

                oImg.selectable     = true;
                oImg.lockMovementX  = true;
                oImg.lockMovementY  = true;
                oImg.hasControls    = false;

                canvas.add(oImg);

                if(_inputPattern.pattern_id !== "none" && _inputPattern.pattern_id !== "blank") {

                    oImg.filters.push(new fabric.Image.filters.Tint({
                        color: _color,
                        opacity: 1,
                    }));
                    oImg.applyFilters(canvas.renderAll.bind(canvas));

                }

                oImg.hoverCursor = 'pointer';

                canvas.renderAll();

                oImg.on('mousedown', function (){
                    
                    ub.funcs.createPatternPopup();

                });

                oImg.on('mousemove', function (e){
                    
                    ub.data.patternToolTip.opacity = 1;
                    ub.data.patternToolTip.bringToFront();

                });

           });

        });

        var bg = new fabric.Rect({
          fill: '#333333',
          scaleY: 0.5,
          originX: 'center',
          originY: 'center',
          rx: 5,
          ry: 5,
          width: 250,
          height:60,
          opacity: 0.5,
        });

        var text    = new fabric.Text('Click to Change Pattern', { originX: 'center', originY: 'center', fontFamily: 'Roboto', left: 0, top: 0, fontSize: 16, fill: '#ffffff', padding: 10 });
        var group   = new fabric.Group([ text, bg ], {
          left: 28,
          top: 200,
        });

        group.selectable    = true;
        group.hasControls   = false;
        group.lockMovementX = true;
        group.lockMovementY = true;
        group.hasBorders    = false;
        group.hoverCursor   = 'pointer';

        group.on('mousedown', function (){
                    
            ub.funcs.createPatternPopup();

        });

        text.bringToFront();
        ub.data.patternToolTip = group;
        canvas.add(ub.data.patternToolTip);
        //ub.data.patternToolTip.selectable = false;
        ub.data.patternToolTip.bringToFront();

        ub.data.currentPatternLayer = 0; // 0 is Pattern Preview

        $('div.patternColorNavigator > div.left').on('click', function () {

            // activate the color pickers if the selected pattern is blank
            // see FEED-27 for details
            if ( _.isEqual(_patternObj.name, 'Blank') || _.isEqual(_patternObj.pattern_id, 33) ) { 
                ub.funcs.activateColorPickers(); 
                return; 
            }

            ub.funcs.moveToPreviousPatternColor(_patternObj);

        });

        $('div.patternColorNavigator > div.right').on('click', function () {

            // activate the color pickers if the selected pattern is blank
            // see FEED-27 for details
            if ( _.isEqual(_patternObj.name, 'Blank') || _.isEqual(_patternObj.pattern_id, 33) ) { 
                ub.funcs.activateColorPickers(); 
                return; 
            }

            ub.funcs.moveToNextPatternColor(_patternObj);

        });

        $( "canvas.upper-canvas" ).hover(
          function() {

          }, function() {

               ub.data.patternToolTip.opacity = 0;
               ub.data.patternToolTip.sendToBack();

          }
        );

    };


    ub.funcs.clearPatternUI = function () {

        $('div#patternUI').remove();

    };


    ub.funcs.activatePatterns = function () {

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);

        if (typeof _modifier === 'undefined') { return false; }

        ub.funcs.deactivateMoveTool();

        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();
        var _settingsObject             = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var _materialOptions            = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

        var _returnValue                = false;

        if (_settingsObject.has_pattern === 1) {

            ub.funcs.deActivateColorPickers ();
            ub.funcs.deActivateApplications();
            ub.funcs.activeStyle('patterns');

            var firstMaterialOption     = _materialOptions[0];
            var patternObject           = _settingsObject.pattern;

            if (typeof patternObject === 'undefined') {

                _returnValue = false;
                return _returnValue;

            }
            else {

                ub.funcs.createPatternUI(patternObject, firstMaterialOption); 

                if (patternObject.pattern_id === "blank" || patternObject.pattern_id === "none") { return false; }

                return true;

            }

        }
        else {

            _returnValue = false;
            return _returnValue;

            // ub.showModal("Patterns can't be applied on [" + _modifier.name + "]");

        }

    };


    ub.funcs.cleanPatternProperties = function (patternProperties) {

        var _patternProperties = patternProperties;

        if (_patternProperties.substring(0,1) === '"') {

            _patternProperties = _patternProperties.substring(1, _patternProperties.length);

        }

        if (_patternProperties.substring(_patternProperties.length - 1, _patternProperties.length) === '"') {

            _patternProperties = _patternProperties.substring(0, _patternProperties.length - 1);

        }

        return _patternProperties;

    }


    ub.funcs.translateAngle = function (inputAngle) {

        var _outputAngle = inputAngle / 360;
        _outputAngle = _outputAngle * 619;
        _outputAngle = _outputAngle / 100;

        return _outputAngle;

    };


    ub.funcs.getPatternObjectFromMaterialOption = function (materialOption) {

        var patternProperties           = '';
        var _patternProperties          = ub.funcs.cleanPatternProperties(materialOption.pattern_properties);
        var patternPropertiesParsed     = JSON.parse(_patternProperties);
        var _rotationAngle              = ub.funcs.translateAngle(materialOption.angle);

        if (materialOption.pattern_id === null ) {

            return undefined;

        }

        if (materialOption.pattern_id === '33') { return ub.funcs.getPatternObjectFromMaterialOptionBlank(materialOption); }

        var _patternObject  = ub.funcs.getPatternByID(materialOption.pattern_id);

        if (typeof _patternObject === 'undefined') {

            return undefined;

        }

        var _materialOption = materialOption;

        var _patternObject = {
                pattern_id: _patternObject.code,
                scale: 0,
                rotation: ub.funcs.translateAngle(_materialOption.angle),
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                pattern_obj : {
                    pattern_id: _patternObject.id,
                    active: _patternObject.active,
                    name: _patternObject.name,
                    code: _patternObject.code,
                    icon: _patternObject.icon,
                    layers: [],
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                }
        };

        _.each (patternPropertiesParsed, function (_property) {

            var _defaultColor = ub.funcs.getColorByColorCode(_property.default_color);

            var _layer = { 
                default_color: _defaultColor.hex_code,
                color_code: ub.funcs.getColorObjByHexCode(_defaultColor.hex_code).color_code,
                layer_no:_property.layer, 
                team_color_id: _property.team_color_id,
                filename: _property.file_path,
                color: parseInt(_defaultColor.hex_code, 16),
                container_position: {
                    x: 248 + ub.offset.x * 0.9,
                    y: 308 + ub.offset.y * 3.3,
                },
                container_opacity: 1,
                container_rotation: ub.funcs.translateAngle(_materialOption.angle),
                container_scale: { x:1,y:1 },
            }

            _patternObject.pattern_obj.layers.push(_layer);

        });

        return _patternObject;

    }


    ub.funcs.getPatternObjectFromMaterialOptionBlank = function (materialOption) {

        var patternProperties       = '';
        var _rotationAngle          = ub.funcs.translateAngle(materialOption.angle);

        materialOption.pattern_id   = '33'; // Blank (web)

        if (ub.config.asset_target === 'team_stores') { materialOption.pattern_id = '286'; } // Blank (Team Stores)

        var _patternDefaultObject   = ub.funcs.getPatternByID(materialOption.pattern_id);

        if (typeof _patternDefaultObject === 'undefined') { ub.utilities.error('Pattern Object with id: ' + materialOption.pattern_id + ' not found!'); }

        var _materialOption = materialOption;

        var _patternObject  = {
                pattern_id: _patternDefaultObject.code,
                scale: 0,
                rotation: ub.funcs.translateAngle(_materialOption.angle),
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                pattern_obj : {
                    pattern_id: _patternDefaultObject.id,
                    active: _patternDefaultObject.active,
                    name: _patternDefaultObject.name,
                    code: _patternDefaultObject.code,
                    icon: _patternDefaultObject.icon,
                    layers: [],
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                }    
        };

        
        var _defaultColor = ub.funcs.getColorByColorCode('W');

        var _layer = { 
            default_color: _defaultColor.hex_code,
            color_code: ub.funcs.getColorObjByHexCode(_defaultColor.hex_code).color_code,
            layer_no: '1', 
            team_color_id: '1',
            filename: _patternDefaultObject.layers[0].filename,
            color: parseInt(_defaultColor.hex_code, 16),
            container_position: {
                x: 248 + ub.offset.x * 0.9,
                y: 308 + ub.offset.y * 3.3,
            },
            container_opacity: 1,
            container_rotation: ub.funcs.translateAngle(_materialOption.angle),
            container_scale: { x:1,y:1 },
        }

        _patternObject.pattern_obj.layers.push(_layer);

        return _patternObject;

    }


    ub.funcs.convertPatternObjectForMaterialOption = function (patternObject, materialOption) {

        var patternPropertiesParsed     = patternObject;
        var _rotationAngle              = ub.funcs.translateAngle(materialOption.angle);

        if (materialOption.pattern_id === null) { return undefined; }

        var _materialOption = materialOption;
        var _patternObject  = {
                pattern_id: patternObject.code,
                scale: 0,
                rotation: ub.funcs.translateAngle(_materialOption.angle),
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                pattern_obj : {
                    pattern_id: patternObject.id,
                    active: patternObject.active,
                    name: patternObject.name,
                    code: patternObject.code,
                    icon: patternObject.icon,
                    layers: [],
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
                }    
        };

        _.each (patternObject.layers, function (_property) {

            var _defaultColor = _property.default_color;

            var _layer = { 
                default_color: _defaultColor,
                color_code: ub.funcs.getColorObjByHexCode(_defaultColor).color_code,
                layer_no:_property.layer_no.toString(), 
                filename: _property.filename,
                team_color_id: _property.team_color_id,
                color: parseInt(_defaultColor, 16),
                container_position: {
                    x: 248 + ub.offset.x * 0.9,
                    y: 308 + ub.offset.y * 3.3,
                },
                container_opacity: 1,
                container_rotation: ub.funcs.translateAngle(_materialOption.angle),
                container_scale: { x:1,y:1 },
            }

            _patternObject.pattern_obj.layers.push(_layer);

        });

        return _patternObject;

    }

    ub.funcs.getPatternByID = function (id) {

      var _patternObject = _.find(ub.data.patterns.items, {id: id.toString()});
      return _patternObject;

    }

    ub.funcs.centerPatternPopup = function () {

        $popup = $('div#primaryPatternPopup, div#primaryMascotPopup, div.feedback-form, div.free-feedback-form, div.save-design, div#primaryFontPopup, div#primaryAccentPopup, div#primaryQuickRegistrationPopup, div#primaryMessagePopup, div#primaryTailSweepPopup, div#primaryEmbellishmentPopup');
        $popup.fadeIn();

        if ($popup.length === 0) { return; } 

        var _wWidth     = window.innerWidth;
        var _wHeight    = window.innerHeight;
        var _pWidth     = $popup.width();
        var _pHeight    = $popup.height();

        var _left       = (_wWidth - _pWidth) / 2;
        var _top        = (_wHeight - _pHeight) /2;

        $popup.css({
            
            top: _top,
            left: _left,

        });

        var $layerTool = $popup;
        $layerTool.unbind('mousedown');
        $layerTool.mousedown(ub.funcs.handle_mousedown);

    }

});