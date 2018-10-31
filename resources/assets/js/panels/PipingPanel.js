function PipingPanel() {}

PipingPanel.prototype = {
    // constructor: PipingPanel,

    setPipingTmpl: function() {
        var piping_sets = ub.funcs.getPipingSets();

        _.each(piping_sets, function(index, pipingSet) {
            var _status = 'off';
            var _pipingSet = pipingSet;
            var _activePipingSet = ub.current_material.settings.pipings[pipingSet];

            _status = (typeof _activePipingSet !== "undefined" && _activePipingSet.enabled === 1) ? "on" : "off";

            if (_activePipingSet === "undefined") {
                _activePipingSet = _.first(_pipingSet);
            } else {
                _pipingSet = ub.funcs.getPipingSet(pipingSet);
                _activePipingSet = _.first(_pipingSet);
            }

            // Main Template
            $('div#pipingsUI').remove();

            var _template = $('#m-piping-sidebar-new').html();
            var _data = { status: _status, type: pipingSet };
            var _htmlBuilder = Mustache.render(_template, _data);

            $('.modifier_main_container').append(_htmlBuilder);

            var s = $('span.piping-type').html();

            if (s.indexOf('Left') === 0) {
                s = s.replace('Left', '');
                $('span.piping-type').html(s);
            }
            // End Main Template
            
            // Inner Templates
            var _sizesMarkup = ub.funcs.getPipingSizesNew(_pipingSet, _activePipingSet);
            var _colorsMarkup = ub.funcs.getPipingColorsNew(_activePipingSet);

            $('div.ui-row.size-row').html(_sizesMarkup);
            $('div.ui-row.colors-row').html(_colorsMarkup);
            // End Inner Templates
            
            // Events
            var $pipingSizesButtons = $('span.piping-sizes-buttons');
            $pipingSizesButtons.on('click', function () {
                var _type = $(this).data('type');
                var _size = $(this).data('size');
                var _pipingObject = _.find(ub.data.pipings, {name: _type});
                var _colorsMarkup =  ub.funcs.getPipingColorsNew(_pipingObject);
                var _firstColor = _.first(ub.funcs.getPipingColorArray(_pipingObject));

                var _pipingSettingsObject = ub.funcs.getPipingSettingsObject(_activePipingSet.set);
                var _matchingPipingObject = undefined;
                var _matchingPipingSettingsObject = undefined;

                var _name = _pipingObject.name;
                var _matchingName = '';

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
                    var _type = $(this).data('type');
                    var _value = $(this).data('value');
                    var _colorPickerHtml = ub.funcs.drawPipingColorPickers(_pipingObject, _value, _pipingSettingsObject);
                    var selectedColorArray = ub.current_material.settings.team_colors;

                    $('div.colorContainer').html(_colorPickerHtml);

                    ub.funcs.setupSmallColorPickerEvents(_pipingObject, _pipingSettingsObject, _matchingPipingObject, _matchingPipingSettingsObject);
                    ub.funcs.initPipingColors(_pipingObject, selectedColorArray[0]);
                    ub.funcs.renderPipings(_pipingObject, _value);

                    /// Process Matching Object
                    if (typeof _matchingPipingObject !== "undefined") {
                        _matchingPipingSettingsObject.numberOfColors = _value;

                        ub.funcs.initPipingColors(_matchingPipingObject, selectedColorArray[0]);
                        ub.funcs.renderPipings(_matchingPipingObject, _value);
                    }
                    /// End Process Matching Object

                    _.each(_pipingSettingsObject.layers, function (layer) {
                        if (layer.colorCode !== "") {
                            $('span.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]').trigger('click');
                        }
                    });

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

                // Force one color when going to 1/2
                if (_type === "Neck Piping 1/2") { $('span.piping-colors-buttons[data-value="1"]').click(); }
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

            var _pipingSettingsObject = ub.funcs.getPipingSettingsObject(_activePipingSet.set);
            var _size = _pipingSettingsObject.size;

            if (typeof _pipingSettingsObject !== "undefined") {
                if (_pipingSettingsObject.enabled === 1 && _pipingSettingsObject.size !== "") {
                    $('span.piping-sizes-buttons[data-size="' + _size + '"]').trigger('click');
                }
            }

            ub.funcs.togglePiping(_pipingSet, _status);
            // End Initial States
        });
    }

    // getNeckPipingTmpl: function() {

    // },

    // getYokePipingTmpl: function() {
        
    // },

    // getSetInPipingTmpl: function() {
        
    // },

    // getSleevePipingTmpl: function() {
        
    // },

    // getEndOfSleevePipingTmpl: function() {

    // }
};