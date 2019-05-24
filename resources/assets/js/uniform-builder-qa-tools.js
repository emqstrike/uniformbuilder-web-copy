// QA Tools
$(document).ready(function () { 

    /// Note: Number of colors being used is calculated here, consider this when turning off the QA Tools, refactor.
    /// maybe separate ga, qa and devtools

    ub.qa = {};
    ub.ga = {};
    ub.devtools = {};
    ub.devtools.debugMode = true;

    ub.fontGuideIDs = [172, 73, 87, 85, 543, 547, 83, 190, 1, 588, 2, 948, 1979, 1625, 2109, 1909, 1454, 543, 81, 89, 2210, 657];

    ub.funcs.printUniformInfo = function (material, settings) {

        var _headers = "";

        ub.utilities.info('');
        ub.utilities.info('----- Base Uniform Info -----');
        ub.utilities.info('Brand: ' + material.brand);
        ub.utilities.info('ID: ' + material.id);
        ub.utilities.info('Item ID: ' + material.item_id);
        ub.utilities.info('Uniform: ' + material.name);
        ub.utilities.info('Sport: ' + material.uniform_category);
        ub.utilities.info('Block Pattern: ' + material.block_pattern_id + ' / ' +  material.block_pattern);
        ub.utilities.info('Neck Option: ' + material.neck_option);
        ub.utilities.info('Type: ' + material.type);
        ub.utilities.info('Gender: ' + material.gender);
        ub.utilities.info('Factory Code: ' + material.factory_code);
        ub.utilities.info('Uniform Application Type: ' + ub.current_material.material.uniform_application_type);
        ub.utilities.info('One Inch In px: ' + ub.current_material.material.one_inch_in_px);
        ub.utilities.info('Asset Target: ' + ub.config.asset_target);
        ub.utilities.info('Uniform Group: ' + ub.current_material.material.uniform_group);
        ub.utilities.info('Style Group: ' + ub.current_material.material.style_group);
        ub.utilities.info('Hidden Body: ' + ub.config.hiddenBody);
        ub.utilities.info('Is Setting Retain from Saved Design: ' + ub.config.retain);
        ub.utilities.info('Placeholder Override Items: ' +  ub.data.placeHolderOverrides.items.length);
        ub.utilities.info('Customizer Available: ' + ub.current_material.material.customizer_available);

        if (typeof ub.config.savedDesignInfo === "object") {
           ub.utilities.info('- Save Design Info -'); 
           ub.utilities.info('Created At: ' + ub.config.savedDesignInfo.createdAt);
           ub.utilities.info('Save Design ID: ' + ub.config.savedDesignInfo.savedDesignID);
           ub.utilities.info('Save Design Name: ' + ub.config.savedDesignInfo.name);
        }

        ub.utilities.info('-----------------------------');

        ub.utilities.info('');
        
        ub.utilities.info('-------- Applications -------');

        _headers = "Code".rpad(' ', 7) + "Type".rpad(' ', 15) + " View".rpad(' ', 7) + " " + " Size".lpad(' ', 5) + " Active".lpad(' ', 5) + " Color".lpad(' ', 11) + " Opacity".lpad(' ', 8) + "Position / Frontend".lpad(' ', 45) + "Position / Backend".lpad(' ', 45) + " Scale".lpad(' ', 46) + " Pattern Position".lpad(' ', 35);

        console.log(_headers);

        _.each(settings.applications, function (app) { 

            var _str = '#' + app.code.rpad(' ', 5) + ' ' + app.type.rpad(' ', 15); 
            var _primaryView = undefined;
            var _colorArray = "";
            var _status = "";
            var _primaryViewObjectScale = ""; var _scaleStr = "";
            var _primaryViewObjectPosition = ""; var _positionStr = "";
            var _opacity = (typeof app.opacity !== "undefined" ? app.opacity : '100%').lpad(' ', 7);
            var _patternPosition = "none";

            if (typeof app.custom_obj !== 'undefined') var _isCustomScale = app.custom_obj.active;
            
            _.each(app.application.views, function (view) {

                if (view.application.isPrimary === 1) {

                    _primaryViewObject = view; 
                    _primaryView = view.perspective;
                    _primaryViewObjectScale = view.application.scale;
                    _primaryViewObjectPosition = view.application.center;

                    return;

                }

            });

            if (typeof _primaryViewObjectScale !== "undefined") { 

                 _scaleStr = "{x: " + _primaryViewObjectScale.x + ", y: " + _primaryViewObjectScale.y + "}"; 

            } else {
                
                var _appObj = ub.objects[_primaryView + '_view']['objects_' + app.code];

                if (typeof _appObj !== "undefined") {
                    var _scale = _appObj.scale;

                    // Add (custom scale) label for embellishment application that uses custom scaling
                    (typeof _isCustomScale === 'undefined' && !_isCustomScale && app.type !== 'embellishments') ? _scaleStr = '{x: ' + _scale.x + ',y: ' + _scale.y + '}' : _scaleStr = '{x: ' + _scale.x + ',y: ' + _scale.y + '} (custom scale)';
                    
                } else {
                    _scaleStr = 'scale not set.';
                }

                
            }

            if (typeof _primaryViewObjectPosition !== "undefined") { 

                _positionStrF =  "{x: " + _primaryViewObjectPosition.x + ", y: " + _primaryViewObjectPosition.y + "}"; 
                _positionStrB = "{x: " + ((_primaryViewObjectPosition.x/2)-3) + ", y: " + (_primaryViewObjectPosition.y/2) + "}"; 

            }

            if (typeof _primaryView === "undefined") { _primaryView = 'No Primary View Set!';}

            _status = "on".lpad(' ', 5);
            if (app.status === "off") {
                _status = "off".lpad(' ', 5);
            } 
            
            _colorArray = "".lpad(' ', 10);
            if (typeof app.color_array !== "undefined") {
                _colorArray = _.pluck(app.color_array, "color_code").toString().lpad(' ', 10);
            } 

            // See config instead 
            if (app.type === "embellishments") { _colorArray = app.embellishment.design_id.toString().lpad(' ', 10); }

            if (typeof app.pattern_settings !== "undefined" ) {
                _patternPosition = (app.pattern_settings.position.y !== 0) ? app.pattern_settings.position.y : 'none';
            }

            _str += ' ' + _primaryView.rpad(' ', 7) + ' ' + ( (typeof app.font_size !== "undefined" ? app.font_size + '"': "none")).lpad(' ', 5) + " " + _status + " " + _colorArray + " " + _opacity + " " + _positionStrF.lpad(' ', 45) + _positionStrB.lpad(' ', 45) + " " + _scaleStr.lpad(' ', 45) + " " + _patternPosition.toString().lpad(' ', 32);

            ub.utilities.info(_str);

        });
        
        if (_.size(ub.current_material.settings.applications) === 0) { 
            ub.utilities.info('No Applications set.'); 
        } else {
            ub.utilities.info('');
            ub.utilities.info('Total # of applications: ' + _.size(ub.current_material.settings.applications));
        }

        ub.utilities.info('-----------------------------');
        ub.utilities.info('');

    }

    ub.funcs.printNames = function () {

        var _nameErrors = [];

        _.each(ub.current_material.materials_options, function (_mo) {

            if (_mo.name.indexOf('_') > 3) {
                _nameErrors.push('Underscore character used in Name: ' + _mo.name + ' ' + _mo.perspective);
            }

            if (_mo.name.indexOf(' ') === 0) {
                _nameErrors.push('Space in begining of Name: ' + _mo.name + ' ' + _mo.perspective);
            }

        })

        var strErrors = "";

        _.each(_nameErrors, function (ne) {

            strErrors += ne + "<br />";

        });

        $('div.ne').html(strErrors);

        ub.qa.colorTable = {};

        _.each(ub.current_material.materials_options, function (_mo) {

            // if (_mo.name === 'Highlights' || _mo.name === 'Shadows') {
            //     return;
            // }

            var _default_color = ub.funcs.getHexColorByCode(_mo.default_color);

            if (typeof ub.qa.colorTable[_default_color] !== 'object')  {

                ub.qa.colorTable[_default_color] = {

                    color: _default_color,
                    materialOptions: [],

                };

            }

            ub.qa.colorTable[_default_color].materialOptions.push(_mo.name);

        });

        var _ctStr = "";

        _ctStr += "<table class='color-table'>";

        _.each(ub.qa.colorTable, function(key, index) {

            _ctStr += '<tr>';
            _ctStr += "<td class='color-column' style='color: white; background-color: #" + key.color + "'> #" + key.color + "</td>";
            _ctStr += "<td class='color-material-option-column'>";
            
            _.each (key.materialOptions, function (mo) {

                _ctStr += mo + ", ";

            });

            _ctStr += "</td>";
            _ctStr += '</tr>';

        });

        _ctStr += "</table>";
        $('div.ct').html(_ctStr);

        ub.qa.partNames = {};

        _.each(ub.current_material.materials_options, function (_mo) {

            var _default_color = ub.funcs.getHexColorByCode(_mo.default_color);

            var _name = _mo.name;

            if (_mo.name === 'Highlights' || _mo.name === 'Shadows') {
                return;
            }

            if (typeof ub.qa.partNames[_name] !== 'object')  {

                ub.qa.partNames[_name] = {
                    name: _name,
                    perspectives: {},
                };

            }

            ub.qa.partNames[_name].perspectives[_mo.perspective] = {

                name: _name,
                default_color: _default_color,
                perspective: _mo.perspective,
                group_id: _mo.group_id,
                team_color_id: _mo.team_color_id,
                allow_pattern: _mo.allow_pattern,
                path: _mo.material_option_path,
                transformedZIndex: _mo.layer_level * ub.zIndexMultiplier,
                layerLevel: _mo.layer_level,

            }

        });

        var _ptStr = '';

        _ptStr += "<table class='parts-table'>";

        _.each(ub.qa.partNames, function(key, index) {

            var index2 = 0;

            _ptStr += "<tr><td colspan='6' class='tCenter tLabel'><strong>" + key.name + "</strong></td></tr>";

            _ptStr += "<tr class='header_row'><td class='tCenter'>Color</td><td class='tCenter'>Layer Level / zIndex</td><td class='tCenter'>Perspective</td><td class='tRight'>Group ID</td><td class='tRight'>Team Color ID</td><td class='tCenter'>Allow Pattern</td><td class='tCenter'></td></tr>";

            _.each (key.perspectives, function (mo, index3) {

                index2 +=1;

                _ptStr += '<tr>';
                    _ptStr += "<td class='pattern-material-option-column ucase tCenter'>";  

                    // if(index2 === 1) {

                    //     _ptStr += key.name;

                    //     _ptStr += "<br /><br />";
                        
                    // }

                    _ptStr += "<strong style='padding:3px;background-color:#" + mo.default_color + "; color: white'>#" + mo.default_color + "</strong>";
                    
                    _ptStr += "</td>";

                    var _allowpattern = parseInt(mo.allow_pattern) === 1 ? "<strong>Yes</strong>": "No";

                    _ptStr += "<td class='pattern-material-option-column tCenter'>" + mo.layerLevel + ' / ' + mo.transformedZIndex +  "</td>";
                    _ptStr += "<td class='pattern-material-option-column tCenter'>" + mo.perspective + "</td>";
                    _ptStr += "<td class='pattern-material-option-column tRight'>" + mo.group_id + "</td>";
                    _ptStr += "<td class='pattern-material-option-column tRight'>" + mo.team_color_id + "</td>";
                    _ptStr += "<td class='pattern-material-option-column tCenter'>" + _allowpattern + "</td>";
                    _ptStr += "<td class='pattern-material-option-column'>" + '<img class="img_preview" style="background-color: #' + mo.default_color  + ';" src= "' + mo.path +'" /> <button class="btn show-boundaries" data-perspective="' + mo.perspective + '" data-name="' + key.name + '">Show Boundaries</button>';


                _ptStr += '</tr>';

            });



        });

        _ptStr += "</table>"
        $('div.pt').html(_ptStr);

        $('button.show-boundaries').unbind('click');
        $('button.show-boundaries').on('click', function () {

            _perspective = $(this).data('perspective');
            _name = $(this).data('name');

            ub.funcs.changeActiveView(_perspective);
            ub.funcs.getBoundaries(_perspective, _name, true);

        });

        $('div.btn.extract').unbind('click');
        $('div.btn.extract').on('click', function () {

            ub.generators.generatePlaceholderOverrides();

        });


    };

    $('div.activate_qa_tools').on('click', function () {

        if (ub.debug.mode) {
            ub.funcs.printNames();    
        }

        $('div.qa-tools-tab').modal('show');
        $('div.qa-tools-tab').draggable({ handle: ".modal-content" });

        return;    

    });

    // Font Guides 

    ub.toggleFullView = function () {

        if ($('nav.navbar').is(':visible')) {

            ub.funcs.removeUI();

        } else {

            ub.funcs.restoreUI();

        }
            
    }

    ub.toggleFontGuides = function () {

        var _status = !ub.status.gaFontTool.getStatus();

        if (_status) {

            ub.showFontGuides();

        } else {

           ub.hideFontGuides();
            
        }

        ub.status.gaFontTool.setStatus(_status);

    }

    ub.togglePatternMasks = function () {

        var _status = !ub.status.patternMasks.getStatus();

        if (_status) {
            
            ub.funcs.removePatternMasks();

        } else {

            ub.funcs.restorePatternMasks();
            
        }

        ub.status.patternMasks.setStatus(_status);

    }

    ub.funcs.afterLoadChecks = function () {

        if (ub.current_material.material.one_inch_in_px === "0.00" && 
            ub.data.sportsMain.currentOk()) {

            ub.utilities.errorWithCode(ub.errorCode.zeroOneInchInPX, '');

        }

    }

    ub.showFontGuides = function () {

        _.each (ub.views, function (view) {

            if (typeof ub.objects[view + '_view']['guide'] === "object") {

                ub.objects[view + '_view']['guide'].alpha = 1;
                ub.objects[view + '_view']['guide'].zIndex = -170;

            }

            ub.updateLayersOrder(ub[view + '_view']);

        });

    };

    ub.hideFontGuides = function () {

        _.each (ub.views, function (view) {

            if (typeof ub.objects[view + '_view']['guide'] === "object") {

                ub.objects[view + '_view']['guide'].alpha = 0;
                ub.objects[view + '_view']['guide'].zIndex = -29;

            }

            ub.updateLayersOrder(ub[view + '_view']);

        });

    }

    // End Font Guides 

    // Messages Panel 

        ub.showMessagesPanel = function () {

            var $messagesPanel = $('div.messages-panel');
            $messagesPanel.fadeIn();

        }

    // End Messages Panel

    // Preview Panel

        ub.showPreviewPanel = function () {

            var $previewPanel = $('div.preview-panel');
            $previewPanel.fadeIn();

        }

        ub.updateApplicationSpecsPanel = function (code) {

            if (!_.contains(ub.fontGuideIDs, window.ub.valid)) { return; }

            var _application = ub.funcs.getApplicationSettings(code);
            var _primaryView = ub.funcs.getPrimaryViewObject(_application.application);

            if (typeof _primaryView === "undefined") { 

                ub.utilities.error('No Primary view set for ' + code);
                return;

            }

            var $previewPanelBody = $('div.preview-panel');

            if (!$previewPanelBody.is(':visible')) { 
                $previewPanelBody.fadeIn(); 

                var $close = $('div.preview-panel > div.title > span.close');
                $close.unbind('click');
                $close.on('click', function () {

                    $previewPanelBody.hide();

                });

                $('div.preview-panel').draggable();

            }

            var template = $('#m-preview-panel-content').html();

            var data = {
                applicationCode: code,
                radians: ((parseFloat(_primaryView.application.rotation) * Math.PI) / 180).toFixed(4),
                degrees: parseFloat(_primaryView.application.rotation).toFixed(4),
                positionX: _primaryView.application.center.x.toFixed(4), // Frontend
                positionY: _primaryView.application.center.y.toFixed(4), // Frontend
                positionXBackend: ((_primaryView.application.center.x / 2 ) - 3).toFixed(4), // Backend
                positionYBackend: (_primaryView.application.center.y.toFixed(4) / 2).toFixed(4), // Backend
                scaleX: typeof _primaryView.application.scale === "undefined" ? 1: _primaryView.application.scale.x.toFixed(4),
                scaleY: typeof _primaryView.application.scale === "undefined" ? 1: _primaryView.application.scale.y.toFixed(4),
            };

            var markup = Mustache.render(template, data);
            $('div.preview-panel > div.body').html(markup);

        }

    // End Preview Panel

    // Debug Panel

        ub.showDebugPanel = function () {

            var $debugPanel = $('div.debug-panel');
            $debugPanel.fadeIn();

        }

        ub.updateDebugPanel = function (title, content, materialName) {

            // if (!_.contains(ub.fontGuideIDs, window.ub.valid)) { return; }

            var $debugPanelBody = $('div.debug-panel');
            var $close = $('div.debug-panel > div.title > span.close');

            if (!$debugPanelBody.is(':visible')) { 
                
                $debugPanelBody.fadeIn(); 

                $close.unbind('click');
                $close.on('click', function () {
                    $debugPanelBody.hide();
                });

                $('div.debug-panel').draggable();

            }

            var template = $('#m-debug-panel-contents').html();

            var data = {
                materialName: materialName,
                title: title,
                content: content,
            };

            var markup = Mustache.render(template, data);
            $('div.debug-panel div.body').html(markup);

        }

        // use the debug panel without the qoutes 
        ub.updateDebugPanelInfo = function (title, content, materialName) {
            
            $('span.qoute').hide();
            ub.updateDebugPanel(title, content, materialName);

        }

    // End Preview Panel



});