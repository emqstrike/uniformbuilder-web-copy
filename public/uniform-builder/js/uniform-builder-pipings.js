$(document).ready(function () {

    ub.funcs.getPipingSets = function () {

        return _.chain(ub.data.pipings).pluck('set').uniq().value();

    };

    ub.funcs.getPipingSettingsObject = function (set) {


        // Pipings Settings Object Structure 
        // 
        // e.g.
        // {
        //      size: '1/8',
        //      numberofColors: 3,
        //      colorArray: [G,B,W],
        //      layerStatus: [true, false, false],
        // } 
        //
        
        if (typeof ub.current_material.settings.pipings[set]) {

            ub.current_material.settings[set] = {};

        }

        return ub.current_material.settings[set];

    };

    ub.funcs.changePipingSize = function (_pipingObject) {



    };

    ub.funcs.changePipingColor = function (_colorObj, _layer_no, _pipingSet) {

        // Note of sleeves matching side here ... e.g. left arm trim => right arm trim 
        // put in logic to change piping color here ...

        _.each (ub.views, function (perspective) {

            var _objectReference = ub.objects[perspective + '_view'][_pipingSet.set];
            var _childLayer = _.find(_objectReference.children, {ubName: 'Layer ' + _layer_no});
            _childLayer.tint = parseInt(_colorObj.hex_code, 16);

        })

    };

    ub.funcs.drawPipingColorPickers = function (activePiping, numberOfColors) {

        var _html = '';

        // Draw Color Pickers 

        var _tempColor = ub.current_material.settings.team_colors[0];

        for (var i = 1; i <= numberOfColors; i++) {
            _html += ub.funcs.createSmallColorPickers(_tempColor.color_code, i, 'Color ' + i, _tempColor);
        }

        return _html;

    };

    ub.funcs.togglePiping = function (pipingSet, status) {

        // Note of sleeves matching side here ... e.g. left arm trim => right arm trim 
        // put in logic to change piping status here ...

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

            if (activePipingSet.color_1) {

                _result.push({name: 'color 1', val: 1});

            }

            if (activePipingSet.color_2) {

                _result.push({name: 'color 2', val: 2});

            }

            if (activePipingSet.color_3) {

                _result.push({name: 'color 3', val: 3});

            }

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

    ub.funcs.setupSmallColorPickerEvents = function (pipingSet) {

        var _pipingSet = pipingSet;

        $('span.colorItem').unbind('click');
        $('span.colorItem').on('click', function () {

            var _layer_no   = $(this).data('layer-no');
            var _color_code = $(this).data('color-code');
            var _layer_name = $(this).data('layer-name');
            var _temp       = $(this).data('temp');
            var _colorObj = ub.funcs.getColorByColorCode(_color_code);
            
            ub.funcs.changePipingColor(_colorObj, _layer_no, _pipingSet); 
            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

        });
        

    }

    ub.funcs.renderPipings = function (pipingObject, colorArray, colorCount) {

        var _firstColor = colorArray[1];

        _.each (ub.views, function (perspective) {

            var _perspectiveString = perspective + '_view';

            var _sprites = $.ub.create_piping(pipingObject, _firstColor, colorCount, perspective);

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

    ub.funcs.activatePipings = function (pipingSet) {

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        ub.funcs.activatePanelGuard();
        ub.funcs.deactivatePanels();

        var _status             = 'on';
        var _pipingSet          = pipingSet;
        var _activePipingSet    = _pipingSet;

        if (typeof _pipingSet !== "undefined") {

            if (typeof _pipingSet.status !== 'undefined') { _status = _pipingSet.status; }

        } else {

            _status = "on";

        }

        if (typeof _activePipingSet === "undefined") {

            _pipingSet          = ub.funcs.getPipingSet('Yoke Piping');
            _activePipingSet    = _.first(_pipingSet);

        }

        // Main Template
        var _template           = $('#m-piping-sidebar').html();
        var _data               = { status: _status };
        var _htmlBuilder        = Mustache.render(_template, _data);            

        $('.modifier_main_container').append(_htmlBuilder);

        // Inner Templates
        var _sizesMarkup        = ub.funcs.getPipingSizes(_pipingSet, _activePipingSet);
        var _colorsMarkup       = ub.funcs.getPipingColors(_activePipingSet);

        $('div.ui-row.size-row').html(_sizesMarkup);
        $('div.ui-row.colors-row').html(_colorsMarkup);

        // Events

            var $pipingSizesButtons = $('span.piping-sizes-buttons');
            $pipingSizesButtons.on('click', function () {

                var _type                   = $(this).data('type');
                var _size                   = $(this).data('size');
                var _pipingObject           = _.find(ub.data.pipings, {name: _type});
                var _colorsMarkup           =  ub.funcs.getPipingColors(_pipingObject);
                var _firstColor             = _.first(ub.funcs.getPipingColorArray(_pipingObject));
                var _pipingSettingsObject   = ub.funcs.getPipingSettingsObject(_activePipingSet.set)

                // var _pipingSettingsObject   = ub.funcs.getPipingObject('Set')
        
                ub.funcs.changePipingSize(_pipingObject);
                $('div.ui-row.colors-row').html(_colorsMarkup);

                var $pipingColorsButtons = $('span.piping-colors-buttons');
                $pipingColorsButtons.unbind('click');
                $pipingColorsButtons.on('click', function () {

                    var _type   = $(this).data('type');
                    var _value  = $(this).data('value');
                    var _colorPickerHtml = ub.funcs.drawPipingColorPickers(_pipingObject, _value);
                    var selectedColorArray = ub.current_material.settings.team_colors;

                    ub.funcs.renderPipings(_pipingObject, selectedColorArray, _value);
                    
                    $('div.colorContainer').html(_colorPickerHtml);
                    ub.funcs.setupSmallColorPickerEvents(_pipingObject);

                    $pipingColorsButtons.removeClass('active');
                    $(this).addClass('active');

                });

                $pipingSizesButtons.removeClass('active');
                $(this).addClass('active');
                $('span.piping-colors-buttons[data-type="' + _firstColor.name + '"]').trigger('click');

            });

            
            $("div.toggleOption").unbind('click');
            $("div.toggleOption").on("click", function () {

                var _currentStatus = $('div.toggle').data('status');
                var _status;

                if(_currentStatus === "on") {
                    _status = 'off';
                }
                else {
                    _status = 'on';
                }

                ub.funcs.togglePiping(_pipingSet, status);    
     
            });
        
        // End Events

        // Set Initial States 

        $('div#pipingsUI').fadeIn();

        var _firstColor     = _.first(ub.funcs.getPipingColorArray(_activePipingSet));
        var $activePiping   = $('span.piping-sizes-buttons[data-type="' + _activePipingSet.name + '"]');

        $activePiping.trigger('click');

    }

});