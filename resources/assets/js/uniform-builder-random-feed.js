$(document).ready(function () {


    /// Utilities 

        ub.funcs.getRandomFeedSets = function () {

            return _.chain(ub.data.randomFeeds).pluck('set').uniq().reject(function(set){ return set.indexOf('Right') === 0}).value();

        };

    /// End Utilities 


    /// GUI 

        ub.funcs.hideRandomFeedsFunctions = function () {

            $('div#randomFeedsUI').hide();
            $('div#randomFeeds-panel').hide();
            $('a.change-view[data-view="randomFeeds"]').removeClass('active-change-view');

        }

        ub.funcs.showRandomFeedPanel = function () {

            ub.funcs.activateBody();

            if ($('div#randomFeeds-panel').is(':visible')) {

                $('div#randomFeeds-panel').removeClass('on').addClass('off');
                $('a.change-view[data-view="randomFeed"]').removeClass('active-change-view');

            } else {

                $('div#randomFeeds-panel').removeClass('off').addClass('on');
                $('a.change-view[data-view="randomFeed"]').addClass('active-change-view');

            }

            var $randomFeedsPanel = $('div#randomFeeds-panel');
            $randomFeedsPanel.unbind('mousedown');
            $randomFeedsPanel.mousedown(ub.funcs.handle_mousedown);

            ub.funcs.updateRandomFeedsPanel();

            $('div.randomFeeds-header > span.close').on('click', function () {

                ub.funcs.hideRandomFeedsPanel();

            });


            $('div#randomFeeds-panel > span.close').unbind('click');
            $('div#randomFeeds-panel > span.randomFeeds-close').on('click', function (){
                ub.funcs.showRandoFeedPanel();   
            });

            // Activate First randomFeed Set

            $('span.randomFeed').first().trigger('click')

            // End Activate First randomFeed Set 

        };

        ub.funcs.hideRandomFeedsPanel = function () {

            if ($('div#randomFeeds-panel').is(':visible')) {

                $('div#randomFeeds-panel').removeClass('on').addClass('off');
                $('a.change-view[data-view="randomFeeds"]').removeClass('active-change-view');
                
            }

        }

        ub.funcs.updateRandomFeedsPanel = function () {

            var _htmlStr        = '';
            var _randomFeedSet      = ub.funcs.getRandomFeedSets();
            var _captionPart    = '';

            _.each(_randomFeedSet, function (randomFeed) {

                _captionPart        = '<span class="caption">' + randomFeed + '</span>';
                _htmlStr            += '<span class="randomFeed unselectable" data-random-feed-name="' + randomFeed + '">' + _captionPart + '</span>';

            });

            $('div.randomFeeds-container').html('');
            $('div.randomFeeds-container').html(_htmlStr);

            $('span.randomFeed').unbind('click');
            $('span.randomFeed').on('click', function () {

                var _randomFeed = $(this).data('random-feed-name');

                $('span.randomFeed').removeClass('active');
                $(this).addClass('active');

                ub.funcs.activateRandomFeeds(_randomFeed);

            });

            // Remove 'Left' from caption
            $('span.randomFeed > span.caption').each(function (index) {
                var text= $(this).text();

                if (text.indexOf('Left') > -1) {
                    $('span.randomFeed[data-randomFeed-name="' + text + '"]').find('span.caption').html(text.replace('Left ', ''));
                }
            });

        }

    /// End GUI

    ub.funcs.getRandomFeedSettingsObject = function (set) {

        // randomFeeds Settings Object Structure 
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
        
        if (typeof ub.current_material.settings.randomFeeds[set] === "undefined") {

            ub.current_material.settings.randomFeeds[set] = {
                size: '',
                enabled: 0,
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

        return ub.current_material.settings.randomFeeds[set];

    };

    ub.funcs.changeRandomFeedSize = function (randomFeedSettingsObject, randomFeedObject, size) {

        var _randomFeedSettingsObject = randomFeedSettingsObject;
        _randomFeedSettingsObject.size = size;
        _randomFeedSettingsObject.enabled = 1;

    };

    ub.funcs.changeRandomFeedColor = function (_colorObj, _layer_no, _randomFeedSet) {

        // Note of sleeves matching side here ... e.g. left arm trim => right arm trim 
        // put in logic to change randomFeed color here ...

        _.each (ub.views, function (perspective) {

            var _objectReference = ub.objects[perspective + '_view'][_randomFeedSet.set];
            var _childLayer = _.find(_objectReference.children, {ubName: 'Layer ' + _layer_no});

            _childLayer.tint = parseInt(_colorObj.hex_code, 16);

            if (_colorObj.color_code === "none") {

                _childLayer.alpha = 0;

            } else {

                _childLayer.alpha = 1;

            }

        });

    };

    ub.funcs.createSmallColorPickersRandomFeed = function (activeColorCode, layer_no, layer_name, active_color) {

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

        var _checkMark  = '&nbsp;';
        var _style      = "25px";
        var _class      = '';

        if (activeColorCode === 'none') {
            
            _checkMark  = '<i class="fa fa-ban" aria-hidden="true"></i>';
            _style      = "40px";
            _class      = 'activeColorItem';

        } else {

            _checkMark  = '<i class="fa fa-ban" aria-hidden="true"></i>';

        }

        _html += '<span style="margin-right: 10px; width: ' + _style + ';background-color: #fff; color: #eee;" class="colorItem" data-layer-name="' + layer_name + '" data-color-code="none" data-layer-no="' + layer_no + '">' + _checkMark + '</span>';

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

    ub.funcs.drawRandomFeedColorPickers = function (activeRandomFeed, numberOfColors, randomFeedSettingsObject) {

        var _html = '';
        var _randomFeedSettingsObject = randomFeedSettingsObject;
        var _tempColor = ub.current_material.settings.team_colors[0];

        _randomFeedSettingsObject.numberOfColors = numberOfColors;

        for (var i = 1; i <= numberOfColors; i++) {

            _html += ub.funcs.createSmallColorPickersRandomFeed(_tempColor.color_code, i, 'Color ' + i, _tempColor);

        }

        return _html;

    };

    ub.funcs.toggleRandomFeed = function (randomFeedSet, status) {

        // Note of sleeves matching side here ... e.g. left arm trim => right arm trim 
        // put in logic to change randomFeed status here ...

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

            $('span.randomFeed-colors-buttons[data-value="2"]').click();

            //ub.funcs.hideGAFontTool();

        }

        _state === "on" ? $('span.header-type').hide() : $('span.header-type').show();

    }

    ub.funcs.getRandomFeedSet = function (activeRandomFeedSet) {

        var _result = _.filter(ub.data.randomFeeds, {set: activeRandomFeedSet});
        return _result;
        
    }

    ub.funcs.sortRandomFeedSizes = function (data) {

        _.each (data.items, function (item) {

            if (item.size === "1/8") { item.sort = 0; }
            if (item.size === "1/4") { item.sort = 1; }
            if (item.size === "1/2") { item.sort = 2; }

        });

        data.items = _.sortBy(data.items, "sort");
        return data;
        
    }
    
    ub.funcs.getRandomFeedSizes = function (randomFeedSet) {

        var _template = $('#m-randomFeed-sizes').html();
        var _data = ub.funcs.sortRandomFeedSizes({ items: randomFeedSet}); 
        var _markup = Mustache.render(_template, _data);

        return _markup;
                
    }

    ub.funcs.getRandomFeedColorArray = function (activeRandomFeedSet) {

        var _result = [];

        if (typeof activeRandomFeedSet !== "undefined") {

            if (activeRandomFeedSet.color1) {

                _result.push({name: 'color 1', val: 1});

            }

            if (activeRandomFeedSet.color2) {

                _result.push({name: 'color 2', val: 2});

            }

            if (activeRandomFeedSet.color3) {

                _result.push({name: 'color 3', val: 3});

            }

        }

        if (!activeRandomFeedSet.color1 && !activeRandomFeedSet.color2 && !activeRandomFeedSet.color3) {

            console.warn('No Color Enabled for ' + activeRandomFeedSet.name);

        }

        return _result;

    }

    ub.funcs.getRandomFeedColors = function (activeRandomFeedSet) {

        var _template   = $('#m-randomFeed-colors').html();
        var _colorArray = ub.funcs.getRandomFeedColorArray(activeRandomFeedSet);
        var _data = { items: _colorArray };            
        var _markup = Mustache.render(_template, _data);

        return _markup;
        
    }

    ub.funcs.changeActiveColorSmallColorPickerRandomFeed = function () {

        // Use ub.funcs.changeActiveColorSmallColorPicker as a refenrence 

    }

    ub.funcs.setupSmallColorPickerEvents = function (randomFeedSet, randomFeedSettingsObject, matchingRandomFeedSet, matchingRandomFeedSettingsObject) {

        var _randomFeedSet = randomFeedSet;
        var _randomFeedSettingsObject = randomFeedSettingsObject;

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

            ub.funcs.changeRandomFeedColor(_colorObj, _layer_no, _randomFeedSet);
            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

            var _layer = _.find(_randomFeedSettingsObject.layers, {layer: parseInt(_layer_no)});

            if (typeof _layer !== "undefined") {

                _layer.colorCode = _color_code;
                _layer.colorObj = _colorObj;
            
            }
            
            if (typeof matchingRandomFeedSet !== "undefined") {

                ub.funcs.changeRandomFeedColor(_colorObj, _layer_no, matchingRandomFeedSet);

                var _matchingLayer         = _.find(matchingRandomFeedSettingsObject.layers, {layer: parseInt(_layer_no)});

                if (typeof _matchingLayer !== "undefined") {

                    _matchingLayer.colorCode   = _color_code;
                    _matchingLayer.colorObj    = _colorObj;

                }
                
            }

        });

    }

    ub.funcs.renderRandomFeed = function (randomFeedObject, colorCount) {

        var _randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(randomFeedObject.set);

        _.each (ub.views, function (perspective) {

            var _perspectiveString = perspective + '_view';

            var _sprites = $.ub.create_randomFeed(randomFeedObject, colorCount, perspective, _randomFeedSettingsObject);

            if (typeof ub.objects[_perspectiveString] !== "undefined") {

                if (typeof ub.objects[_perspectiveString][randomFeedObject.set] !== "undefined") {

                    ub[_perspectiveString].removeChild(ub.objects[_perspectiveString][randomFeedObject.set]);

                }
            
            }

            ub[_perspectiveString].addChild(_sprites);
            ub.objects[_perspectiveString][randomFeedObject.set] = _sprites;

            ub.updateLayersOrder(ub[_perspectiveString]);

        });

    };

    ub.funcs.removeRandomFeed = function (randomFeedSet) {

        // delete from settings object 
        // delete from stage 
        // cleanup UI

        _.each(ub.views, function (view) {

            var _viewStr = view + '_view';

            if (typeof ub.objects[_viewStr][randomFeedSet] !== 'undefined'){ 

                ub[_viewStr].removeChild(ub.objects[_viewStr][randomFeedSet]);

            }

            delete ub.objects[_viewStr][randomFeedSet];

        });

        ub.current_material.settings.randomFeeds[randomFeedSet].enabled = 0;
        ub.current_material.settings.randomFeeds[randomFeedSet].numberOfColors = 0;

    }

    ub.funcs.getMatchingSide = function (name) {

        var _result = "";

        if (name.indexOf('Left') === 0)  { _result = name.replace('Left', 'Right'); }
        if (name.indexOf('Right') === 0) { _result = name.replace('Right', 'Left'); }

        if (_result === "") { console.warn("Result for Matching Side is Blank.") }

        return _result;

    }

    // Activate randomFeeds 

    // Assign randomFeed Colors if none is detected (e.g. when randomFeed type is first activated)
    ub.funcs.initRandomFeedColors = function (randomFeedObject, firstColor)  {

        var _randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(randomFeedObject.set);

        _.each(_randomFeedSettingsObject.layers, function (layer) {

            if (typeof layer.colorObj === "undefined") {

                layer.colorCode = firstColor.color_code;
                layer.colorObj = firstColor;

            }

        });

    }

    ub.funcs.activateRandomFeeds = function (randomFeedSet) {

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        //ub.funcs.activatePanelGuard();
        ub.funcs.deactivatePanels();
        ub.funcs.activeStyle('randomFeed');

        var _status                 = 'off';
        var _randomFeedSet          = randomFeedSet;
        var _activeRandomFeedSet    = '';
        
        _activeRandomFeedSet        = ub.current_material.settings.randomFeeds[randomFeedSet];
        _status                     = (typeof _activeRandomFeedSet !== "undefined" && _activeRandomFeedSet.enabled === 1) ? "on" : "off";

        if (_activeRandomFeedSet === "undefined") {

            _activeRandomFeedSet    = _.first(_randomFeedSet);

        } else {

            _randomFeedSet          = ub.funcs.getRandomFeedSet(randomFeedSet);
            _activeRandomFeedSet    = _.first(_randomFeedSet);

        }

        // Main Template

        $('div#randomFeedsUI').remove();

        var _template           = $('#m-randomFeed-sidebar').html();
        var _data               = { status: _status, type: randomFeedSet };
        var _htmlBuilder        = Mustache.render(_template, _data);            

        $('.modifier_main_container').append(_htmlBuilder);

        if (_status === "on") { $('span.header-type').hide(); }

        var s = $('span.randomFeed-type').html();

        if (s.indexOf('Left') === 0) {

            s = s.replace('Left', '');
            $('span.randomFeed-type').html(s);

        }

        // End Main Template

        // Inner Templates

            var _sizesMarkup        = ub.funcs.getRandomFeedSizes(_randomFeedSet, _activeRandomFeedSet);
            var _colorsMarkup       = ub.funcs.getRandomFeedColors(_activeRandomFeedSet);

            $('div.ui-row.size-row').html(_sizesMarkup);
            $('div.ui-row.colors-row').html(_colorsMarkup);

          

        // End Inner Templates

        // Events

            var $randomFeedSizesButtons = $('span.randomFeed-sizes-buttons');
            $randomFeedSizesButtons.on('click', function () {

                var _type                           = $(this).data('type');
                var _size                           = $(this).data('size');
                var _randomFeedObject                   = _.find(ub.data.randomFeeds, {name: _type});
                var _colorsMarkup                   =  ub.funcs.getRandomFeedColors(_randomFeedObject);
                var _firstColor                     = _.first(ub.funcs.getRandomFeedColorArray(_randomFeedObject));

                var _randomFeedSettingsObject           = ub.funcs.getRandomFeedSettingsObject(_activeRandomFeedSet.set);
                var _matchingRandomFeedObject           = undefined;
                var _matchingRandomFeedSettingsObject   = undefined;

                var _name                           = _randomFeedObject.name;
                var _matchingName                   = '';

                ub.funcs.changeRandomFeedSize(_randomFeedSettingsObject, _randomFeedObject, _size);

                /// Process Matching Object

                    if (_name.indexOf('Left') > -1) {

                        _matchingName = ub.funcs.getMatchingSide(_name);
                        _matchingRandomFeedObject = _.find(ub.data.randomFeeds, {name: _matchingName});

                    }

                    if (_name.indexOf('Right') > -1) {

                        _matchingName = ub.funcs.getMatchingSide(_name);
                        _matchingRandomFeedObject = _.find(ub.data.randomFeeds, {name: _matchingName});

                    }

                    if (typeof _matchingRandomFeedObject !== 'undefined') {

                        _matchingRandomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(_matchingRandomFeedObject.set);
                        ub.funcs.changeRandomFeedSize(_matchingRandomFeedSettingsObject, _matchingRandomFeedObject, _size);

                    }

                /// End Process Matching Object

                $('div.ui-row.colors-row').html(_colorsMarkup);

                var $randomFeedColorsButtons = $('span.randomFeed-colors-buttons');
                $randomFeedColorsButtons.unbind('click');
                $randomFeedColorsButtons.on('click', function () {

                    var _type               = $(this).data('type');
                    var _value              = $(this).data('value');
                    var _colorPickerHtml    = ub.funcs.drawRandomFeedColorPickers(_randomFeedObject, _value, _randomFeedSettingsObject);
                    var selectedColorArray  = ub.current_material.settings.team_colors;

                    $('div.colorContainer').html(_colorPickerHtml);

                    ub.funcs.setupSmallColorPickerEvents(_randomFeedObject, _randomFeedSettingsObject, _matchingRandomFeedObject, _matchingRandomFeedSettingsObject);
                    ub.funcs.initRandomFeedColors(_randomFeedObject, selectedColorArray[0]);
                    ub.funcs.renderRandomFeed(_randomFeedObject, _value);
 
                    /// Process Matching Object
                    
                        if (typeof _matchingRandomFeedObject !== "undefined") {

                            _matchingRandomFeedSettingsObject.numberOfColors = _value;

                            ub.funcs.initRandomFeedColors(_matchingRandomFeedObject, selectedColorArray[0]);
                            ub.funcs.renderRandomFeed(_matchingRandomFeedObject, _value);

                        }

                    /// End Process Matching Object

                    _.each(_randomFeedSettingsObject.layers, function (layer) {

                        if (layer.colorCode !== "") {

                            $('span.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]').trigger('click');

                        }

                    });

                    $randomFeedColorsButtons.removeClass('active');
                    $(this).addClass('active');

                });

                $randomFeedSizesButtons.removeClass('active');
                $(this).addClass('active');

                if (_randomFeedSettingsObject.numberOfColors === 0) {

                    $('span.randomFeed-colors-buttons[data-type="' + _firstColor.name + '"]').trigger('click');

                } else {

                    $('span.randomFeed-colors-buttons[data-value="' + _randomFeedSettingsObject.numberOfColors + '"]').trigger('click');

                }

            });

            $("div.toggleOption").unbind('click');
            $("div.toggleOption").on("click", function () {

                var _currentStatus = $('div.toggle').data('status');
                var _status;

                if(_currentStatus === "on") {

                    _status = 'off';
                    ub.funcs.removeRandomFeed(randomFeedSet);

                    if (randomFeedSet.indexOf('Left') === 0) {

                        var matchingSide = ub.funcs.getMatchingSide(randomFeedSet);
                        ub.funcs.removeRandomFeed(matchingSide);

                    }
                    
                } else {

                    _status = 'on';

                    var _firstColor     = _.first(ub.funcs.getRandomFeedColorArray(_activeRandomFeedSet));
                    var $activeRandomFeed   = $('span.randomFeed-sizes-buttons[data-type="' + _activeRandomFeedSet.name + '"]');

                    $activeRandomFeed.trigger('click');

                }

                ub.funcs.toggleRandomFeed(_randomFeedSet, _status);    
     
            });

        // End Events

        // Set Initial States

            $('div#randomFeedsUI').fadeIn();

            var _randomFeedSettingsObject   = ub.funcs.getRandomFeedSettingsObject(_activeRandomFeedSet.set);
            var _size                       = _randomFeedSettingsObject.size;

            if (typeof _randomFeedSettingsObject !== "undefined") {

                if (_randomFeedSettingsObject.enabled === 1 && _randomFeedSettingsObject.size !== "") {

                    $('span.randomFeed-sizes-buttons[data-size="' + _size + '"]').trigger('click');

                }

            }

            ub.funcs.toggleRandomFeed(_randomFeedSet, _status);   

            $('div.ui-row.size-row').hide();
            $('div.ui-row.colors-row').hide();
 

        // End Initial States
        
    }

     ub.funcs.deactivateRandomFeeds = function () {

        $('div#randomFeedsUI').remove();

    }

    ub.funcs.processSavedRandomFeeds = function () {

        _.each(ub.current_material.settings.randomFeeds, function (randomFeed, key) {

            var _result = _.find(ub.data.randomFeeds, {name: key + " " + randomFeed.size});

            if(randomFeed.size === "") { return; }

            ub.funcs.renderRandomFeed(_result, randomFeed.numberOfColors);    

        });

    }

    ub.funcs.processRandomFeeds = function () {

        if (!ub.funcs.isSocks()) { return; }

        if (!util.isNullOrUndefined(ub.current_material.material.random_feed)) {

            var _randomFeeds = ub.current_material.material.random_feed.replace(new RegExp("\\\\", "g"), "");

            _randomFeeds = _randomFeeds.slice(1, -1);
            _randomFeeds = JSON.parse(_randomFeeds);

            ub.data.randomFeeds = _randomFeeds;

            _.each(ub.data.randomFeeds, function (randomFeed) {

                var _colorArray = [];
                var _layers = [];

                // Normalize randomFeed Position From source 

                _.each (randomFeed.perspectives, function (perspective) {

                    _.each(perspective.layers, function (layer) {

                        layer.position = layer.position;

                    });

                });

                // End Normalize randomFeed Position from source

                if (typeof randomFeed.colors_array !== "undefined") {

                    _.each(randomFeed.colors_array, function (color, index) {

                        var _color = ub.funcs.getColorByColorCode(color);
                        
                        _colorArray.push(_color);
                        _layers.push({

                            colorCode: color,
                            colorObj: _color,
                            layer: index + 1,
                            status: false,

                        });

                        var _teamColorId = randomFeed.team_color_id_array[index];

                        if (randomFeed.enabled === 1 && _color.color_code !== "none") {

                             ub.data.colorsUsed[_color.hex_code] = {hexCode: _color.hex_code, parsedValue: _color.hex_code, teamColorID: _teamColorId};

                        }
                        
                    });

                } else {

                    console.warn('No Color Array for ' + randomFeed.name);

                }

                var _colorCount = 0;

                if (randomFeed.color1) { _colorCount +=1 }; 
                if (randomFeed.color2) { _colorCount +=1 }; 
                if (randomFeed.color3) { _colorCount +=1 }; 

                // Set order Weight, so it can be sorted
                randomFeed.sortID = ub.data.randomFeedArrangement.getSortID(randomFeed.set).order;

                // Debug Info
                // console.log(randomFeed);
                // console.log(randomFeed.set);
                // console.log('Enabled: ' + randomFeed.enabled);
                // console.log('Typeof Enabled: ' + typeof randomFeed.enabled);
                // console.log(randomFeed.enabled === 1);
                // console.log(randomFeed.sortID);
                
                // Skip setup of randomFeed settings if coming from saved design, so the saved data will be rendered instead of the default randomFeed style

                // var _hasSavedRandomFeedData = (typeof ub.current_material.settings.randomFeeds[randomFeed.set] !== "undefined" || _.isEmpty(ub.current_material.settings.randomFeeds));
                var _hasSavedRandomFeedData = (typeof ub.current_material.settings.randomFeeds[randomFeed.set] !== "undefined");

                if (_hasSavedRandomFeedData) { return; }

                if (ub.dataPatches.forRandomFeedPatching()) { return; }

                if (!_hasSavedRandomFeedData && randomFeed.enabled === 1) {



                    ub.current_material.settings.randomFeeds[randomFeed.set] = {

                        set: randomFeed.set,
                        layers: _layers,
                        numberOfColors: _colorCount,
                        size: randomFeed.size,
                        
                    };

                    ub.current_material.settings.randomFeeds[randomFeed.set].enabled        = 1;
                    ub.current_material.settings.randomFeeds[randomFeed.set].size           = randomFeed.size;
                    ub.current_material.settings.randomFeeds[randomFeed.set].numberOfColors = _colorCount;

                    var _randomFeedObject                   = randomFeed;
                    var _randomFeedSettingsObject           = ub.funcs.getRandomFeedSettingsObject(randomFeed.set);
                    var selectedColorArray                  = ub.current_material.settings.team_colors;
                    
                    ub.funcs.initRandomFeedColors(randomFeed, selectedColorArray[0]);
                    ub.funcs.renderRandomFeed(randomFeed, _colorCount);
                    ub.funcs.changeRandomFeedSize(_randomFeedSettingsObject, _randomFeedObject, randomFeed.size);

                }

            });

            ub.data.randomFeeds = _.sortBy(ub.data.randomFeeds, 'sortID');

            ub.dataPatches.forRandomFeedPatching();

        } else {

            ub.utilities.info("This uniform has no Random Feeds.");

        }

    }

    ub.funcs.removeRandomFeedsPanel = function () {

        if ($('div#randomFeeds-panel').is(':visible')) {

            $('div.randomFeeds-header > span.close').trigger('click');
            ub.funcs.hiderandomFeedsTool();

        }

    }

});