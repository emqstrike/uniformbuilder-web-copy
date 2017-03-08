$(document).ready(function () { 

    /// Note: Number of colors being used is calculated here, consider this when turning off the QA Tools, refactor.
    /// maybe separate ga, qa and devtools

    ub.qa = {};
    ub.ga = {};
    ub.devtools = {};

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

            }

        });

        var _ptStr = '';

        _ptStr += "<table class='parts-table'>";

        _.each(ub.qa.partNames, function(key, index) {

            var index2 = 0;
            _ptStr += "<tr class='header_row'><td>Name</td><td>Perspective</td><td>Group ID</td><td>Team Color ID</td><td>Allow Pattern</td></tr>";

            _.each (key.perspectives, function (mo, index3) {

                index2 +=1;

                _ptStr += '<tr>';
                    _ptStr += "<td class='pattern-material-option-column ucase'>";  

                    if(index2 === 1) {

                        _ptStr += key.name;

                        _ptStr += "<br /><br />";
                        
                    }

                    _ptStr += "<strong style='padding:3px;background-color:#" + mo.default_color + "; color: white'>#" + mo.default_color + "</strong>";
                    
                    _ptStr + "</td>";

                    _ptStr += "<td class='pattern-material-option-column'>" + mo.perspective + "</td>";
                    _ptStr += "<td class='pattern-material-option-column'>" + mo.group_id + "</td>";
                    _ptStr += "<td class='pattern-material-option-column'>" + mo.team_color_id + "</td>";
                    _ptStr += "<td class='pattern-material-option-column'>" + mo.allow_pattern + "</td>";
                    _ptStr += "<td class='pattern-material-option-column'>" + '<img class="img_preview" style="background-color: #' + mo.default_color  + ';" src= "' + mo.path +'" />';

                _ptStr += '</tr>';

            });



        });

        _ptStr += "</table>"
        $('div.pt').html(_ptStr);


    };

    $('div.activate_qa_tools').on('click', function () {

        if (ub.debug.mode) {
            ub.funcs.printNames();    
        }

        $('div.qa-tools-tab').modal('show');

        return;    

    });

    // Font Guides 

    ub.toggleFontGuides = function () {

        var _status = !ub.status.gaFontTool.getStatus();

        if (_status) {

            ub.showFontGuides();

        } else {

           ub.hideFontGuides();
            
        }

        ub.status.gaFontTool.setStatus(_status);

    }

    ub.showFontGuides = function () {

        _.each (ub.views, function (view) {

            if (typeof ub.objects[view + '_view']['guide'] === "object") {

                ub.objects[view + '_view']['guide'].alpha = 1;
                ub.objects[view + '_view']['guide'].zIndex = -29;

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

});