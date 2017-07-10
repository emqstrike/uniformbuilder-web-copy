$(document).ready(function () {

    ub.funcs.transformPatterns = function (inputPatternsObject) {

        var _inputPatternsObject = _.filter(inputPatternsObject, function (pattern) {

            return pattern.asset_target === ub.config.asset_target || pattern.id === '33';

        });

        var _container           = [];

        _.each(_inputPatternsObject, function (_object, index) {

            var sort_id = index + 1;

            if (_object.name === 'Blank') {
                sort_id = 0;
            }

            _newObject = {
                sortID: sort_id,
                id: _object.id,
                active: _object.active,
                name: _object.name,
                code: _object.name.toCodeCase(),
                icon: _object.thumbnail_path,
                sports: JSON.parse(_object.sports),
                blockPatternOptions: JSON.parse(_object.block_pattern_options),
                layers: [],
            };

            var _patternProperties = JSON.parse(_object.pattern_properties);

            _.each(_patternProperties, function (_patternProperty) {

                var _layer = {

                     default_color: ub.funcs.getHexColorByCode(_patternProperty.default_color),
                     layer_no: parseInt(_patternProperty.layer),
                     filename: _patternProperty.file_path,
                     team_color_id: _patternProperty.team_color_id,

                };

                _newObject.layers.push(_layer);

            });

            _container.push(_newObject);

            ub.data.patterns = {
                items: _container,
            }

        });

    };

    ub.funcs.getHexColorByCode = function (code) {

        var _code = code;

        if (ub.data.colors.length < 1) {
            window.util.error("There's no values loaded on ub.data.colors");
        }

        var _color = _.find (ub.data.colors, {color_code: _code});

        if (typeof _color == 'undefined') {
            
            // window.util.error("Code: " + _code + " can't be found");
            // window.util.error("caller is " + arguments.callee.caller.toString());

            return undefined;
        }

        return _color.hex_code;

    };

});