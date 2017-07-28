$(document).ready(function () { 

    /// Note: Number of colors being used is calculated here, consider this when turning off the QA Tools, refactor.
    /// maybe separate ga, qa and devtools

    ub.qa = {};
    ub.ga = {};
    ub.devtools = {};

    ub.fontGuideIDs = [172, 73, 87, 85, 543, 547, 83, 190, 1, 588];

    ub.funcs.printUniformInfo = function (material, settings) {

        ub.utilities.info('');
        ub.utilities.info('----- Base Uniform Info -----');
        ub.utilities.info('ID: ' + material.id);
        ub.utilities.info('Uniform: ' + material.name);
        ub.utilities.info('Neck Option: ' + material.neck_option);
        ub.utilities.info('Block Pattern ID: ' + material.block_pattern_id);
        ub.utilities.info('Block Pattern: ' + material.block_pattern);
        ub.utilities.info('Sport: ' + material.uniform_category);
        ub.utilities.info('Type: ' + material.type);
        ub.utilities.info('Gender: ' + material.gender);
        ub.utilities.info('Factory Code: ' + material.factory_code);
        ub.utilities.info('Uniform Application Type: ' + ub.current_material.material.uniform_application_type);
        ub.utilities.info('One Inch In px: ' + ub.current_material.material.one_inch_in_px);
        ub.utilities.info('-----------------------------');

        ub.utilities.info('');
        
        ub.utilities.info('-------- Applications -------');
        _.each(settings.applications, function (app) { 
            
            var _str = app.code + ' - ' + app.type; 
            var _primaryView = undefined; 
            
            _.each(app.application.views, function (view) {

                if (view.application.isPrimary === 1) {

                    _primaryView = view.perspective;
                    return;

                }

            });

            if (typeof _primaryView === "undefined") {

                _primaryView = 'No Primary View Set!';

            }

            _str += ' - ' + _primaryView;
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

        ub.updatePanel = function (code, app) {

            if (!_.contains(ub.fontGuideIDs, window.ub.valid)) { return; }

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

            var template = $('#m-preview-panel-rotation').html();

            var data = {
                applicationCode: code,
                radians: ((parseFloat(app.rotation) * Math.PI) / 180).toFixed(4),
                degrees: parseFloat(app.rotation).toFixed(4),
                positionX: app.center.x.toFixed(4),
                positionY: app.center.y.toFixed(4),
                scaleX: typeof app.scale === "undefined" ? 1: app.scale.x.toFixed(4),
                scaleY: typeof app.scale === "undefined" ? 1: app.scale.y.toFixed(4),
            };

            var markup = Mustache.render(template, data);
            $('div.preview-panel > div.body').html(markup);

        }

    // End Preview Panel

});