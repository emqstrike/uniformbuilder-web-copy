$(document).ready(function () {

    ub.funcs.transformPatterns = function (inputPatternsObject) {

        var _inputPatternsObject = _.filter(inputPatternsObject, function (pattern) {

            var _blankPatternID = 33; // Blank (Web)

            if (ub.config.asset_target === 'team_stores') { _blankPatternID = 286; } // Blank (Team Stores)

            var _blockPatternOptions = JSON.parse(pattern.block_pattern_options);
            var _sports = JSON.parse(pattern.sports);
            var _sportOk = _.contains(_sports, ub.config.sport);
            var _neckOptionOk = _.contains(_blockPatternOptions, ub.config.option) || 
                    _blockPatternOptions === null ||
                    (typeof _blockPatternOptions === "object" && _blockPatternOptions[0] === "");

            // Diagnostics
            // if  (   
            //         _neckOptionOk && 
            //         _sportOk &&
            //         pattern.asset_target === ub.config.asset_target
            //     ) {

            //     console.log(' ');
            //     console.log("===");
            //     console.log(pattern);
            //     console.log('Sports OK:' + _sportOk )
            //     console.log(pattern.name);
            //     console.log('Neck Option OK: ' + _neckOptionOk);
            //     console.log(pattern.asset_target, ub.config.asset_target);
            //     console.log(pattern.asset_target === ub.config.asset_target);
            //     console.log("===");
            //     console.log(' ');

            // } else {
            //     console.log(' ');
            //     console.log('-----');
            //     console.log(pattern);
            //     console.log('-----');
            //     console.log(' ');
            // }

            return (
                    (   
                        _neckOptionOk && 
                        _sportOk &&
                        pattern.asset_target === ub.config.asset_target
                    ) || 
                    parseInt(pattern.id) === parseInt(_blankPatternID)
                );

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
                asset_target: _object.asset_target,
                brand: _object.brand
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