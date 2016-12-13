$(document).ready(function () {


    /// Utilities 

        ub.funcs.getPipingSets = function () {

            return _.chain(ub.data.pipings).pluck('set').uniq().value();

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

            var $PipingsPanel = $('div#pipings-panel');
            $PipingsPanel.unbind('mousedown');
            $PipingsPanel.mousedown(ub.funcs.handle_mousedown);

            
            // End Populate Layer Tool

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

        };

        ub.funcs.hidePipingsPanel = function () {

            if ($('div#pipings-panel').is(':visible')) {

                $('div#pipings-panel').removeClass('on').addClass('off');
                $('a.change-view[data-view="pipings"]').removeClass('active-change-view');
                
            }

        }

        ub.funcs.updatePipingsPanel = function () {

        var _htmlStr = '';
        var _applicationCollection = _.sortBy(ub.current_material.settings.applications, 'zIndex').reverse();

        _.each(_applicationCollection, function (app) {

            var _zIndex             = app.zIndex;
            var _applicationType    = app.application_type.toUpperCase().replace('_',' ');

            if (_applicationType === "SLEEVE NUMBER") {
                _applicationType = "NUMBER";
            }

            var _applicationCode    = app.code;
            var _caption = ub.funcs.getSampleCaption(app);

            var _primaryView = ub.funcs.getPrimaryView(app.application);

            var _perspectivePart = '<span class="perspective">(' + _primaryView.substring(0,1).toUpperCase() + ')</span>';
            var _applicationTypePart = ' <span class="application_type">' + _applicationType + '</span>';
            var _captionPart = '<span class="caption">' + _caption + '</span>';
            var _codePart = '<span class="code"> #' + app.code + '</span>';

            _htmlStr += '<span class="layer unselectable" data-location-id="' + app.code + '" data-zIndex="' + app.zIndex + '">' + _codePart + _captionPart + _perspectivePart + _applicationTypePart + '</span>';

        });

        $('div.pipings-container').html('');
        $('div.pipings-container').html(_htmlStr);

        $('span.layer').unbind('click');
        $('span.layer').on('click', function () {

            if ($(this).hasClass('active')) {

                ub.funcs.deactivateMoveTool();
                ub.funcs.activateBody();
                
                return;

            }

            var _appCode = $(this).data('location-id');
            ub.funcs.activateManipulator(_appCode);

        });

        if (!ub.is.wrestling()) { return; } // Cancel Draggable if not Wrestling, in the future make switch for sublimated 

        ub.data.sorting = false;

        ub.sort = $("div.pipings-container").sortable({

          handle: '.layer',
          animation: 150,
          onStart: function (evt) {

            ub.data.sorting = true;
            ub.data.justSorted = true;

          },
          onEnd: function (evt) {

            ub.data.sorting = false;
            ub.data.justSorted = true;

          },
          onUpdate: function (evt) { 
            
            $.each($('span.layer'), function(key, value) {
               
               var _length = _.size(ub.current_material.settings.applications);

               var _index   = _length - (key + 1);
               var _locID   = $(value).data('location-id');
               var _app     = ub.current_material.settings.applications[_locID];
               
               _app.zIndex  = _index;

               $(this).find('span.zIndex').html(_index + 1);

               if (_app.application_type === "free") { return; }

               _.each(_app.application.views, function (view) {

                    var _obj = ub.objects[view.perspective + '_view']['objects_' + _locID];
                    _obj.zIndex = -(50 + _index);

                    
               });


            });

            ub.updateLayersOrder(ub.front_view);
            ub.updateLayersOrder(ub.back_view);
            ub.updateLayersOrder(ub.left_view);
            ub.updateLayersOrder(ub.right_view);

            var _locationID = $(evt.item).data('location-id');
            ub.funcs.activateManipulator(_locationID);

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


        })

    };

    ub.funcs.drawPipingColorPickers = function (activePiping, numberOfColors, pipingSettingsObject) {

        var _html = '';
        var _pipingSettingsObject = pipingSettingsObject;
        var _tempColor = ub.current_material.settings.team_colors[0];

        _pipingSettingsObject.numberOfColors = numberOfColors;

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

    ub.funcs.setupSmallColorPickerEvents = function (pipingSet, pipingSettingsObject) {

        var _pipingSet = pipingSet;
        var _pipingSettingsObject = pipingSettingsObject;

        $('span.colorItem').unbind('click');
        $('span.colorItem').on('click', function () {

            var _layer_no   = $(this).data('layer-no');
            var _color_code = $(this).data('color-code');
            var _layer_name = $(this).data('layer-name');
            var _temp       = $(this).data('temp');
            var _colorObj = ub.funcs.getColorByColorCode(_color_code);
            
            ub.funcs.changePipingColor(_colorObj, _layer_no, _pipingSet); 
            ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

            var _layer = _.find(_pipingSettingsObject.layers, {layer: parseInt(_layer_no)});
            _layer.colorCode = _color_code;

        });

        _.each(_pipingSettingsObject.layers, function (layer) {

            if (layer.colorCode !== "") {

                $('span.colorItem[data-layer-no="' + layer.layer + '"][data-color-code="' + layer.colorCode + '"]').trigger('click');

            }

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

                var _type                   = $(this).data('type');
                var _size                   = $(this).data('size');
                var _pipingObject           = _.find(ub.data.pipings, {name: _type});
                var _colorsMarkup           =  ub.funcs.getPipingColors(_pipingObject);
                var _firstColor             = _.first(ub.funcs.getPipingColorArray(_pipingObject));
                var _pipingSettingsObject   = ub.funcs.getPipingSettingsObject(_activePipingSet.set)

                ub.funcs.changePipingSize(_pipingSettingsObject, _pipingObject, _size);
                $('div.ui-row.colors-row').html(_colorsMarkup);

                var $pipingColorsButtons = $('span.piping-colors-buttons');
                $pipingColorsButtons.unbind('click');
                $pipingColorsButtons.on('click', function () {

                    var _type               = $(this).data('type');
                    var _value              = $(this).data('value');
                    var _colorPickerHtml    = ub.funcs.drawPipingColorPickers(_pipingObject, _value, _pipingSettingsObject);
                    var selectedColorArray  = ub.current_material.settings.team_colors;

                    ub.funcs.renderPipings(_pipingObject, selectedColorArray, _value);
                    
                    $('div.colorContainer').html(_colorPickerHtml);
                    ub.funcs.setupSmallColorPickerEvents(_pipingObject, _pipingSettingsObject);

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
                }
                else {
                    _status = 'on';
                }

                ub.funcs.togglePiping(_pipingSet, status);    
     
            });
        
        // End Events

        

        // Set Initial States 

            $('div#pipingsUI').fadeIn();

            var _pipingSettingsObject   = ub.funcs.getPipingSettingsObject(_activePipingSet.set)
            var _size                   = _pipingSettingsObject.size;

            if (_size === ""){

                var _firstColor     = _.first(ub.funcs.getPipingColorArray(_activePipingSet));
                var $activePiping   = $('span.piping-sizes-buttons[data-type="' + _activePipingSet.name + '"]');

                $activePiping.trigger('click');

            }
            else {

                $('span.piping-sizes-buttons[data-size="' + _size + '"]').trigger('click');

            }

        // End Initial States
        
    }

});