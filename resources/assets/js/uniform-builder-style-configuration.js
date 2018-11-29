$(document).ready(function () {

    ub.styleValues      = {};
    window.ubsv         = ub.styleValues;

    ub.styleValues.mascotScales = {

        items: [], // This was returning a single record object now from the backend instead of an array 

        hasValues: function () {

            return typeof ub.styleValues.mascotScales.match !== "undefined";

        },

        cleanUp: function (sport, type, neckOption) {

            var _match = ub.styleValues.mascotScales.match
            var _blockPatternOptions = "";
            var _properties = "";

            if (_match.block_pattern_options !== "" && typeof _match.block_pattern_options !== "undefined") {
                _blockPatternOptions = JSON.parse(_match.block_pattern_options);
            } else {

                // Returned and array
                if (sport === "Compression (Apparel)") {  _properties = JSON.parse(_match[0].properties); }
                
            }

            if (_match.properties !== "" && typeof _match.properties !== "undefined") {
                _properties = JSON.parse(_match.properties);
            }

            _match.block_pattern_options = _blockPatternOptions;
            _match.properties = _properties;
        
            ub.styleValues.mascotScales.items = _match;

        },

        fetchValues: function () {

            var _apiCode = 'getMascotScales';
            var _parameters = {
                "block_patterns":  ub.config.blockPattern,
                "category": ub.config.sport,
                "type": ub.config.type
            }

            // Special Case, talk to https://github.com/angelqx 
            if (ub.config.sport !== "Compression (Apparel)") { _parameters.block_pattern_options = ub.config.option; }

            ubep.fetchPOST(_apiCode, _parameters, function (result) {

                ub.styleValues.mascotScales.match = result.mascot_size;
                ub.styleValues.mascotScales.cleanUp(ub.config.sport, ub.config.type, ub.config.option);
                ub.utilities.info('Mascot Scales Loaded.');

                ub.styleValues.embellishmentScales.match = result.mascot_size;
                ub.styleValues.embellishmentScales.cleanUp(ub.config.sport, ub.config.type, ub.config.option);
                ub.utilities.info('Embellishment Scales Loaded.');

            });

        },

        getScale: function (size) {
            
            var _size = size;
            var _scale;
            var _result = undefined;
            var _noSettings = typeof ub.styleValues.mascotScales.match === "undefined";

            // Legacy Socks 
            if (ub.funcs.isSocks()) { _size = 2.5; }

            // New Socks 
            if (ub.config.sport === "Socks (Apparel)") { _size = size; }  
            if (ub.config.blockPattern === "Crew Sock") { _size = 2.5; }  

            if (_noSettings) { 
                _scale = undefined; 
            } else {
                _scale = _.find(ub.styleValues.mascotScales.match.properties, {size: _size.toString()});    
            }
  
            if (typeof _scale === "undefined") {
                
                var nearestSize = (size > 1) ? Math.abs((size % 1) - size) : (1 - size % 1) + size;
                var secondNearestSize = (size < 12) ? nearestSize + 1 : nearestSize - 1;

                var nearestScale = _.find(ub.styleValues.mascotScales.match.properties, {size: nearestSize.toString()}).scale;
                var secondNearestScale = _.find(ub.styleValues.mascotScales.match.properties, {size: secondNearestSize.toString()}).scale;

                nearestScale = parseFloat(nearestScale);
                secondNearestScale = parseFloat(secondNearestScale);

                var interpolateScale = secondNearestScale - nearestScale;

                if (size > 1) {
                    _result = {
                        x: (Math.abs(interpolateScale) * (size % 1)) + nearestScale,
                        y: (Math.abs(interpolateScale) * (size % 1)) + nearestScale
                    }
                } else {
                    _result = {
                        x: (Math.abs(interpolateScale) * (size % 1)),
                        y: (Math.abs(interpolateScale) * (size % 1))
                    }
                }

                // ub.utilities.info('Mascot Scale for Size ' + size + ' is not found. Using ' + JSON.stringify(_result) + '.' ); 

            } else {
                _result = {x: parseFloat(_scale.scale), y: parseFloat(_scale.scale)};
            }

            return _result; // e.g. {x: 0.5, y: 0.5}

        },

    };

    ub.styleValues.embellishmentScales = {

        items: [],

        hasValues: function () {

            return typeof ub.styleValues.embellishmentScales.match !== "undefined";

        },

        cleanUp: function (sport, type, neckOption) {

            var _match = ub.styleValues.embellishmentScales.match
            var _blockPatternOptions = "";
            var _properties = "";

            if (_match.block_pattern_options !== "" && typeof _match.block_pattern_options !== "undefined") {
                _blockPatternOptions = _match.block_pattern_options;
            } else {

                // Returned and array
                if (sport === "Compression (Apparel)") {  _properties = _match[0].properties; }
                
            }

            if (_match.properties !== "" && typeof _match.properties !== "undefined") {
                _properties = _match.properties;
            }

            _match.block_pattern_options = _blockPatternOptions;
            _match.properties = _properties;
        
            ub.styleValues.embellishmentScales.items = _match;

        },

        fetchValues: function () {

            var _apiCode = 'getembellishmentScales';

            ubep.fetch(_apiCode, function (result) {

                ub.styleValues.embellishmentScales.items = result.mascot_sizes;
                ub.styleValues.embellishmentScales.cleanUp(ub.config.sport, ub.config.type, ub.config.option);
                ub.utilities.info('Mascot Scales Loaded.');

            });

        },

        getScale: function (size) {

            var _size = size;
            var _scale;
            var _result = undefined;
            var _noSettings = typeof ub.styleValues.embellishmentScales.match === "undefined";

            // Legacy Socks 
            if (ub.funcs.isSocks()) { _size = 2.5; }

            // New Socks 
            if (ub.config.sport === "Socks (Apparel)") { _size = size; }  
            if (ub.config.blockPattern === "Crew Sock") { _size = 2.5; }  

            if (_noSettings) { 
                _scale = undefined; 
            } else {
                _scale = _.find(ub.styleValues.embellishmentScales.match.properties, {size: _size.toString()});    
            }
  
            if (typeof _scale === "undefined") {

                var nearestSize = (size > 1) ? Math.abs((size % 1) - size) : (1 - size % 1) + size;
                var secondNearestSize = (size < 12) ? nearestSize + 1 : nearestSize - 1;

                var nearestScale = _.find(ub.styleValues.embellishmentScales.match.properties, {size: nearestSize.toString()}).scale;
                var secondNearestScale = _.find(ub.styleValues.embellishmentScales.match.properties, {size: secondNearestSize.toString()}).scale;

                nearestScale = parseFloat(nearestScale);
                secondNearestScale = parseFloat(secondNearestScale);

                var interpolateScale = secondNearestScale - nearestScale;

                if (size > 1) {
                    _result = {
                        x: (Math.abs(interpolateScale) * (size % 1)) + nearestScale,
                        y: (Math.abs(interpolateScale) * (size % 1)) + nearestScale
                    }
                } else {
                    _result = {
                        x: (Math.abs(interpolateScale) * (size % 1)),
                        y: (Math.abs(interpolateScale) * (size % 1))
                    }
                }

                // ub.utilities.info('Embellishment Scale for Size ' + size + ' is not found. Using ' + JSON.stringify(_result) + '.' ); 

            } else {
                _result = {x: parseFloat(_scale.scale), y: parseFloat(_scale.scale)};
            }

            return _result; // e.g. {x: 0.5, y: 0.5}

        },

    }


});