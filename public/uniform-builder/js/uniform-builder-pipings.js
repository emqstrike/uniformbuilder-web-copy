$(document).ready(function () {


    /// Utilities 

        ub.funcs.getPipingSets = function () {

            return _.chain(ub.data.pipings).pluck('set').uniq().reject(function(set){ return set.indexOf('Right') === 0}).value();

        };


    /// End Utilities 


    /// GUI 

        ub.funcs.showPipingsPanel = function () {

            ub.funcs.activateBody();

            if ($('div#pipings-panel').is(':visible')) {

                $('div#pipings-panel').removeClass('on').addClass('off');
                $('a.change-view[data-view="pipings"]').removeClass('active-change-view');

                $('a.change-view[data-view="locations"]').click();

            } else {

                $('div#pipings-panel').removeClass('off').addClass('on');
                $('a.change-view[data-view="pipings"]').addClass('active-change-view');

            }

            var $pipingsPanel = $('div#pipings-panel');
            $pipingsPanel.unbind('mousedown');
            $pipingsPanel.mousedown(ub.funcs.handle_mousedown);

            ub.funcs.updatePipingsPanel();

            $('div.pipings-header > span.close').on('click', function () {

                ub.funcs.hidePipingsPanel();

               if (ub.showLocation) {

                    ub.funcs.removeLocations();
                    $('span.show-locations').find('span.caption').html("Show Location Markers");
                    $('span.show-locations').removeClass('active');

               }

            });

            if (!ub.is.wrestling()) {

                $('span.add-application').addClass('inactive');
                $('em.dragMessage').remove();
                $('div.pipings-container').addClass('notSublimated');

            }

            $('span.add-application').unbind('click');
            $('span.add-application').on('click', function () {

                $('a.change-view[data-view="locations-add"]').click();

            });

            $('span.show-locations').unbind('click');
            $('span.show-locations').on('click', function () {

               if ($(this).find('span.caption').html() === "Show Location Markers") {

                    $(this).find('span.caption').html("Hide Location Markers");
                    $(this).addClass('active');
                    ub.funcs.showLocations();
                    
               } else {

                    $(this).find('span.caption').html("Show Location Markers");
                    $(this).removeClass('active');
                    ub.funcs.removeLocations();

               }

            })

            $('div#pipings-panel > span.close').unbind('click');
            $('div#pipings-panel > span.pipings-close').on('click', function (){
                ub.funcs.showPipingsPanel();   
            });

            // Activate First Piping Set

               $('span.piping').first().trigger('click')

            // End Activate First Piping Set 

        };

        ub.funcs.hidePipingsPanel = function () {

            if ($('div#pipings-panel').is(':visible')) {

                $('div#pipings-panel').removeClass('on').addClass('off');
                $('a.change-view[data-view="pipings"]').removeClass('active-change-view');
                
            }

        }

        ub.funcs.updatePipingsPanel = function () {

            var _htmlStr        = '';
            var _pipingSet      = ub.funcs.getPipingSets();
            var _captionPart    = '';

            _.each(_pipingSet, function (piping) {

                _captionPart        = '<span class="caption">' + piping + '</span>';
                _htmlStr            += '<span class="piping unselectable" data-piping-name="' + piping + '">' + _captionPart + '</span>';

            });

            $('div.pipings-container').html('');
            $('div.pipings-container').html(_htmlStr);

            $('span.piping').unbind('click');
            $('span.piping').on('click', function () {

                var _piping = $(this).data('piping-name');

                $('span.piping').removeClass('active');
                $(this).addClass('active');

                ub.funcs.activatePipings(_piping);

            });

            // Remove 'Left' from caption
            $('span.piping > span.caption').each(function (index) {
                var text= $(this).context.innerHTML;

                if (text.indexOf('Left') > -1) {

                    $('span.piping[data-piping-name="' + text + '"]').find('span.caption').html(text.replace('Left ', ''));

                }
                
            });

        }

    /// End GUI 



    ub.funcs.getPipingSettingsObject = function (set) {

        // Pipings Settings Object Structure 
        // 
        // e.g.
        // {
        //      size: '1/8',
        //      numberofColors: 3,
        //      layers: [
        //                  {
        //                      layer: 1,
        //                      status: false,
        //                      colorCode: '',
        //                  },
        //                  {
        //                      layer: 2,
        //                      status: false,
        //                      colorCode: '',
        //                  },
        //                  {
        //                      layer: 3,
        //                      status: false,
        //                      colorCode: '',
        //                  }
        //      ]
        // } 
        //
        
        if (typeof ub.current_material.settings.pipings[set] === "undefined") {

            ub.current_material.settings.pipings[set] = {
                size: '',
                numberOfColors: 0,
                layers: [
                            {
                                layer: 1,
                                status: false,
                                colorCode: '',
                            },
                            {
                                layer: 2,
                                status: false,
                                colorCode: '',
                            },
                            {
                                layer: 3,
                                status: false,
                                colorCode: '',
                            }
                 ]
            };

        }

        return ub.current_material.settings.pipings[set];

    };

    ub.funcs.changePipingSize = function (pipingSettingsObject, pipingObject, size) {

        var _pipingSettingsObject = pipingSettingsObject;

        _pipingSettingsObject.size = size;

    };

    ub.funcs.changePipingColor = function (_colorObj, _layer_no, _pipingSet) {

        // Note of sleeves matching side here ... e.g. left arm trim => right arm trim 
        // put in logic to change piping color here ...

        _.each (ub.views, function (perspective) {

            var _objectReference = ub.objects[perspective + '_view'][_pipingSet.set];
            var _childLayer = _.find(_objectReference.children, {ubName: 'Layer ' + _layer_no});
            _childLayer.tint = parseInt(_colorObj.hex_code, 16);

        });

    };

    ub.funcs.createSmallColorPickersPiping = function (activeColorCode, layer_no, layer_name, active_color) {

        var _html       = "";
        var _cObj       = ub.funcs.getColorByColorCode(activeColorCode);

        _html = '<div class="smallPickerContainer" data-layer-no="' + layer_no + '">';

        _html += '<label class="smallColorPickerLabel" >' + layer_name + ' </label>';

        // /// Off Button

        //     var _checkMark  = '&nbsp;';
        //     var _style      = "25px";
        //     var _class      = '';
        //     if (activeColorCode === _cObj.color_code) {
        //         _label      = 'Off';
        //         _style      = "40px";
        //         _class      = 'activeColorItem';
        //     }

        //     var _colorObj = ub.funcs.getColorByColorCode(_cObj.color_code);
        //     _html += '<span style="margin-right: 30px; width: ' + _style + ';background-color: #' + _cObj.hex_code + '; color: #' + _cObj.forecolor + ';" class="turnOff colorItem ' + _class + '" data-layer-name="' + layer_name + '" data-color-code="' + _cObj.color_code + '" data-layer-no="' + layer_no + '">' + _label + '</span>';

        // /// End Off Button

        _.each(ub.current_material.settings.team_colors, function (_color) {

            var _checkMark  = '&nbsp;';
            var _style      = "25px";
            var _class      = '';

            if (activeColorCode === _color.color_code) {
                _checkMark  = '<i class="fa fa-check" aria-hidden="true"></i>';
                _style      = "40px";
                _class      = 'activeColorItem';
            }

            var _colorObj = ub.funcs.getColorByColorCode(_color.color_code);
            _html += '<span style="width: ' + _style + ';background-color: #' + _colorObj.hex_code + '; color: #' + _colorObj.forecolor + ';" class="colorItem ' + _class + '" data-layer-name="' + layer_name + '" data-color-code="' + _color.color_code + '" data-layer-no="' + layer_no + '">' + _checkMark + '</span>';

        });

        _html += '</div>';

        return _html;

    }

    ub.funcs.drawPipingColorPickers = function (activePiping, numberOfColors, pipingSettingsObject) {

        var _html = '';
        var _pipingSettingsObject = pipingSettingsObject;
        var _tempColor = ub.current_material.settings.team_colors[0];

        _pipingSettingsObject.numberOfColors = numberOfColors;

        for (var i = 1; i <= numberOfColors; i++) {
            _html += ub.funcs.createSmallColorPickersPiping(_tempColor.color_code, i, 'Color ' + i, _tempColor);
        }

        return _html;

    };

    ub.funcs.togglePiping = function (pipingSet, status) {

        // Note of sleeves matching side here ... e.g. left arm trim => right arm trim 
        // put in logic to change piping status here ...

        // var _settingsObj = ub.funcs.getApplicationSettings(parseInt(id));
        // var _views       = _settingsObj.application.views;

        ////

        var _state = status;

        if (_state === "off") {

            // if (ub.activeApplication === id) {

            //     return;

            // }
            
            $('div.toggle').data('status', "off");

            $('div.valueContainer').css('margin-left', '-100px');
            $('div.cover').fadeIn('fast');
            $('div.toggle').removeClass('defaultShadow');
           // $('div.applicationType').css({ 'color': '#acacac', 'text-decoration': 'line-through', 'opacity': '0.2'});
            $('span.cog').hide();

        } else {

            $('div.toggle').data('status', "on");

            $('div.valueContainer').css('margin-left', '0px');
            $('div.cover').hide();
            $('div.toggle').addClass('defaultShadow');
            //$('div.applicationType').css({ 'color': '#3d3d3d', 'text-decoration': 'initial', 'opacity': '1'});
            $('span.cog').fadeIn();

            //ub.funcs.hideGAFontTool();

        }

        ////

        // _.each (_views, function (view) {

        //     var _view = view.perspective + '_view';
        //     var _obj  = ub.objects[_view]['objects_' + id];

        //     if (_state === "on") {

        //         _obj.zIndex = -(50 + _settingsObj.zIndex);
        //         ub.updateLayersOrder(ub[_view]);
        //         _settingsObj.status = "on";
                
        //     } else {

        //         _obj.oldZIndex = _obj.zIndex;
        //         _obj.zIndex = 0;
        //         ub.updateLayersOrder(ub[_view]);
        //         _settingsObj.status = "off";

        //     }

        // });

    }

    ub.funcs.getPipingSet = function (activePipingSet) {

        var _result = _.filter(ub.data.pipings, {set: activePipingSet});
        return _result;
        
    }
    
    ub.funcs.getPipingSizes = function (pipingSet) {

        var _template = $('#m-piping-sizes').html();
        var _data = { items: pipingSet};            
        var _markup = Mustache.render(_template, _data);

        return _markup;
                
    }

    ub.funcs.getPipingColorArray = function (activePipingSet) {

        var _result = [];

        if (typeof activePipingSet !== "undefined") {

            if (activePipingSet.color1) {

                _result.push({name: 'color 1', val: 1});

            }

            if (activePipingSet.color2) {

                _result.push({name: 'color 2', val: 2});

            }

            if (activePipingSet.color3) {

                _result.push({name: 'color 3', val: 3});

            }

        }

        if (!activePipingSet.color1 && !activePipingSet.color2 && !activePipingSet.color3) {

            console.warn('No Color Enabled for ' + activePipingSet.name);

        }

        return _result;

    }

    ub.funcs.getPipingColors = function (activePipingSet) {

        var _template   = $('#m-piping-colors').html();
        var _colorArray = ub.funcs.getPipingColorArray(activePipingSet);
        var _data = { items: _colorArray };            
        var _markup = Mustache.render(_template, _data);

        return _markup;
        
    }

    ub.funcs.changeActiveColorSmallColorPickerPiping = function () {

        // Use ub.funcs.changeActiveColorSmallColorPicker as a refenrence 

    }

    ub.funcs.setupSmallColorPickerEvents = function (pipingSet, pipingSettingsObject, matchingPipingSet, matchingPipingSettingsObject) {

        var _pipingSet = pipingSet;
        var _pipingSettingsObject = pipingSettingsObject;

        $('span.colorItem').unbind('click');
        $('span.colorItem').on('click', function () {

            if ($(this).hasClass('turnOff')) {

                /// insert code here...
                return;

            }

            var _layer_no   = $(this).data('layer-no');
            var _color_code = $(this).data('color-code');
            var _layer_name = $(this).data('layer-name');
            var _temp       = $(this).data('temp');
            var _colorObj   = ub.funcs.getColorByColorCode(_color_code);
            
            ub.funcs.changePipingColor(_colorObj, _layer_no, _pipingSet);
            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

            var _layer = _.find(_pipingSettingsObject.layers, {layer: parseInt(_layer_no - 1)});
            _layer.colorCode = _color_code;

            if (typeof matchingPipingSet !== "undefined") {

                ub.funcs.changePipingColor(_colorObj, _layer_no, matchingPipingSet);

                var _matchingLayer         = _.find(matchingPipingSettingsObject.layers, {layer: parseInt(_layer_no - 1)});
                _matchingLayer.colorCode   = _color_code;

            }

        });

        console.log(_pipingSettingsObject);

        _.each(_pipingSettingsObject.layers, function (layer) {

            if (layer.colorCode !== "") {

                $('span.colorItem[data-layer-no="' + (layer.layer + 1) + '"][data-color-code="' + layer.colorCode + '"]').trigger('click');

            }

        });

    }

    ub.funcs.renderPipings = function (pipingObject, colorArray, colorCount) {

        var _pipingSettingsObject = ub.funcs.getPipingSettingsObject(pipingObject.set);
        var _firstColor = colorArray[0];

        _.each (ub.views, function (perspective) {

            var _perspectiveString = perspective + '_view';
            var _sprites = $.ub.create_piping(pipingObject, _firstColor, colorCount, perspective, _pipingSettingsObject);

            if (typeof ub.objects[_perspectiveString] !== "undefined") {

                if (typeof ub.objects[_perspectiveString][pipingObject.set] !== "undefined") {

                    ub[_perspectiveString].removeChild(ub.objects[_perspectiveString][pipingObject.set]);

                }
            
            }

            ub[_perspectiveString].addChild(_sprites);
            ub.objects[_perspectiveString][pipingObject.set] = _sprites;

            ub.updateLayersOrder(ub[_perspectiveString]);

        });

    };

    ub.funcs.removePiping = function (pipingSet) {

        // delete from settings object 
        // delete from stage 
        // cleanup UI

        _.each(ub.views, function (view) {

            var _viewStr = view + '_view';

            if (typeof ub.objects[_viewStr][pipingSet] !== 'undefined'){ 

                ub[_viewStr].removeChild(ub.objects[_viewStr][pipingSet]);

            }

            delete ub.objects[_viewStr][pipingSet];

        });

        delete ub.current_material.settings.pipings[pipingSet];

    }

    ub.funcs.getMatchingSide = function (name) {

        var _result = "";

        if (name.indexOf('Left') === 0)  { _result = name.replace('Left', 'Right'); }
        if (name.indexOf('Right') === 0) { _result = name.replace('Right', 'Left'); }

        if (_result === "") { console.warn("Result for Matching Side is Blank.") }

        return _result;

    }

    // Activate Pipings 

    ub.funcs.activatePipings = function (pipingSet) {

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        ub.funcs.activatePanelGuard();
        ub.funcs.deactivatePanels();

        var _status             = 'off';
        var _pipingSet          = pipingSet;
        var _activePipingSet    = _pipingSet;

        _activePipingSet        = ub.current_material.settings.pipings[pipingSet];

        if (typeof _activePipingSet !== "undefined") {

            if (_activePipingSet.size !== "") {
                _status = "on"
            } else {
                _status = "off";
            }

        } else {

            _status = "off";

        }

    
        if (_activePipingSet === "undefined") {

            var initialPipingSet = pipingSet;

            _pipingSet          = ub.funcs.getPipingSet(initialPipingSet);
            pipingSet           = initialPipingSet;
            _activePipingSet    = _.first(_pipingSet);

        } else {

            _pipingSet          = ub.funcs.getPipingSet(pipingSet);
            _activePipingSet    = _.first(_pipingSet);

        }

        // Main Template

        $('div#pipingsUI').remove();

        var _template           = $('#m-piping-sidebar').html();
        var _data               = { status: _status, type: pipingSet };
        var _htmlBuilder        = Mustache.render(_template, _data);            

        $('.modifier_main_container').append(_htmlBuilder);

        var s = $('span.piping-type').html();

        if (s.indexOf('Left') === 0) {
            
            s = s.replace('Left', '');
            $('span.piping-type').html(s);

        }

        // End Main Template

        // Inner Templates

            var _sizesMarkup        = ub.funcs.getPipingSizes(_pipingSet, _activePipingSet);
            var _colorsMarkup       = ub.funcs.getPipingColors(_activePipingSet);

            $('div.ui-row.size-row').html(_sizesMarkup);
            $('div.ui-row.colors-row').html(_colorsMarkup);

        // End Inner Templates

 

        // Events

            var $pipingSizesButtons = $('span.piping-sizes-buttons');
            $pipingSizesButtons.on('click', function () {

                var _type                           = $(this).data('type');
                var _size                           = $(this).data('size');
                var _pipingObject                   = _.find(ub.data.pipings, {name: _type});
                var _colorsMarkup                   =  ub.funcs.getPipingColors(_pipingObject);
                var _firstColor                     = _.first(ub.funcs.getPipingColorArray(_pipingObject));

                var _pipingSettingsObject           = ub.funcs.getPipingSettingsObject(_activePipingSet.set);
                var _matchingPipingObject           = undefined;
                var _matchingPipingSettingsObject   = undefined;

                var _name                           = _pipingObject.name;
                var _matchingName                   = '';

                ub.funcs.changePipingSize(_pipingSettingsObject, _pipingObject, _size);

                /// Process Matching Object

                    if (_name.indexOf('Left') > -1) {

                        _matchingName = ub.funcs.getMatchingSide(_name);
                        _matchingPipingObject = _.find(ub.data.pipings, {name: _matchingName});

                    }

                    if (_name.indexOf('Right') > -1) {

                        _matchingName = ub.funcs.getMatchingSide(_name);
                        _matchingPipingObject = _.find(ub.data.pipings, {name: _matchingName});

                    }

                    if (typeof _matchingPipingObject !== 'undefined') {

                        _matchingPipingSettingsObject = ub.funcs.getPipingSettingsObject(_matchingPipingObject.set);
                        ub.funcs.changePipingSize(_matchingPipingSettingsObject, _matchingPipingObject, _size);

                    }

                /// End Process Matching Object

                $('div.ui-row.colors-row').html(_colorsMarkup);

                var $pipingColorsButtons = $('span.piping-colors-buttons');
                $pipingColorsButtons.unbind('click');
                $pipingColorsButtons.on('click', function () {

                    var _type               = $(this).data('type');
                    var _value              = $(this).data('value');
                    var _colorPickerHtml    = ub.funcs.drawPipingColorPickers(_pipingObject, _value, _pipingSettingsObject);
                    var selectedColorArray  = ub.current_material.settings.team_colors;

                    ub.funcs.renderPipings(_pipingObject, selectedColorArray, _value);
 
                    /// Process Matching Object
                    
                        if (typeof _matchingPipingObject !== "undefined") {

                            ub.funcs.renderPipings(_matchingPipingObject, selectedColorArray, _value);

                        }

                    /// End Process Matching Object

                    $('div.colorContainer').html(_colorPickerHtml);
                    ub.funcs.setupSmallColorPickerEvents(_pipingObject, _pipingSettingsObject, _matchingPipingObject, _matchingPipingSettingsObject);

                    $pipingColorsButtons.removeClass('active');
                    $(this).addClass('active');

                });

                $pipingSizesButtons.removeClass('active');
                $(this).addClass('active');

                if (_pipingSettingsObject.numberOfColors === 0) {

                    $('span.piping-colors-buttons[data-type="' + _firstColor.name + '"]').trigger('click');
                    

                } else {

                    $('span.piping-colors-buttons[data-value="' + _pipingSettingsObject.numberOfColors + '"]').trigger('click');

                }

            });

            $("div.toggleOption").unbind('click');
            $("div.toggleOption").on("click", function () {

                var _currentStatus = $('div.toggle').data('status');
                var _status;
                
                if(_currentStatus === "on") {

                    _status = 'off';
                    ub.funcs.removePiping(pipingSet);

                    if (pipingSet.indexOf('Left') === 0) {

                        var matchingSide = ub.funcs.getMatchingSide(pipingSet);
                        ub.funcs.removePiping(matchingSide);

                    }
                    
                } else {

                    _status = 'on';

                    var _firstColor     = _.first(ub.funcs.getPipingColorArray(_activePipingSet));
                    var $activePiping   = $('span.piping-sizes-buttons[data-type="' + _activePipingSet.name + '"]');

                    $activePiping.trigger('click');

                }

                ub.funcs.togglePiping(_pipingSet, _status);    
     
            });

        // End Events

        

        // Set Initial States 

            $('div#pipingsUI').fadeIn();

            var _pipingSettingsObject   = ub.funcs.getPipingSettingsObject(_activePipingSet.set)
            var _size                   = _pipingSettingsObject.size;

            if (_size !== ""){

                $('span.piping-sizes-buttons[data-size="' + _size + '"]').trigger('click');

            }

            ub.funcs.togglePiping(_pipingSet, _status);    

        // End Initial States
        
    }

});