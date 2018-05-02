$(document).ready(function () {

    ub.styleValues      = {};
    window.ubsv         = ub.styleValues;

    ub.styleValues.mascotScales = {

        items: [], // This was returning a single record object now from the backend instead of an array 

        hasValues: function () {

            return typeof ub.styleValues.mascotScales.match !== "undefined";

        },

        cleanUp: function (sport, type, neckOption) {

            var _match = ub.styleValues.mascotScales.match;
            var _blockPatternOptions = "";
            var _properties = "";

            if (_match.block_pattern_options !== "" && typeof _match.block_pattern_options !== "undefined") {
                _blockPatternOptions = JSON.parse(_match.block_pattern_options);
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
                "block_pattern_options": ub.utilities.domParserDecoder(ub.config.option),
                "block_patterns":  ub.utilities.domParserDecoder(ub.config.blockPattern),
                "category": ub.config.sport,
                "type": ub.config.type
            }

            ubep.fetchPOST(_apiCode, _parameters, function (result) {

                ub.styleValues.mascotScales.match = result.mascot_size;
                ub.styleValues.mascotScales.cleanUp(ub.config.sport, ub.config.type, ub.config.option);
                ub.utilities.info('Mascot Scales Loaded.');

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

            // if (ub.config.sport === "Tech-Tee (Apparel)") { 
            //     if (_size === 1) { _scale = {x: 0.1, y: 0.1 }; }
            //     if (_size === 2) { _scale = {x: 0.2, y: 0.2 }; }
            //     if (_size === 3) { _scale = {x: 0.3, y: 0.3 }; }
            //     if (_size === 4) { _scale = {x: 0.4, y: 0.4 }; }
            //     if (_size === 5) { _scale = {x: 0.5, y: 0.5 }; }
            //     if (_size === 6) { _scale = {x: 0.6, y: 0.6 }; }
            //     if (_size === 7) { _scale = {x: 0.7, y: 0.7 }; }
            //     if (_size === 8) { _scale = {x: 0.8, y: 0.8 }; }
            //     if (_size === 9) { _scale = {x: 0.9, y: 0.9 }; }
            //     if (_size === 10) { _scale = {x: 0.10, y: 0.10 }; }
            //     if (_size === 11) { _scale = {x: 0.11, y: 0.11 }; }
            //     if (_size === 12) { _scale = {x: 0.12, y: 0.12 }; }
            // }

            // if (ub.config.sport === "Compression (Apparel)") { 
            //     if (_size === 1) { _scale = {x: 0.1, y: 0.1 }; }
            //     if (_size === 2) { _scale = {x: 0.2, y: 0.2 }; }
            //     if (_size === 3) { _scale = {x: 0.3, y: 0.3 }; }
            //     if (_size === 4) { _scale = {x: 0.4, y: 0.4 }; }
            //     if (_size === 5) { _scale = {x: 0.5, y: 0.5 }; }
            //     if (_size === 6) { _scale = {x: 0.6, y: 0.6 }; }
            //     if (_size === 7) { _scale = {x: 0.7, y: 0.7 }; }
            //     if (_size === 8) { _scale = {x: 0.8, y: 0.8 }; }
            //     if (_size === 9) { _scale = {x: 0.9, y: 0.9 }; }
            //     if (_size === 10) { _scale = {x: 0.10, y: 0.10 }; }
            //     if (_size === 11) { _scale = {x: 0.11, y: 0.11 }; }
            //     if (_size === 12) { _scale = {x: 0.12, y: 0.12 }; }
            // }
            
            if (typeof _scale === "undefined") {
                ub.utilities.error('Mascot Scale for Size ' + size + ' is not found. Using {x: 0.5, y: 0.5}.' ); 
                _result = undefined;
            } else {
                _result = {x: parseFloat(_scale.scale), y: parseFloat(_scale.scale)};
            }

            return _result; // e.g. {x: 0.5, y: 0.5}

        },

    };

    ub.styleValues.embellishmentScales = {

        items: [],

        hasValues: function () {

            return ub.styleValues.embellishmentScales.items.length > 0;

        },

        cleanUp: function (sport, type, neckOption) {

            var _items = ub.styleValues.embellishmentScales.items;
            var _cleanedUp = _.filter(_items, function (item) {

                var _blockPatternOptions = "";
                var _properties = "";
                if (item.block_pattern_options !== "") {
                    _blockPatternOptions = JSON.parse(item.block_pattern_options);
                }
                _properties = JSON.parse(item.properties);

                item.block_pattern_options = _blockPatternOptions;
                item.properties = _properties;

                return  item.sport === sport && 
                    item.type === item.type && 
                    (_.contains(_blockPatternOptions, ub.utilities.domParserDecoder(neckOption)) || item.block_pattern_options === "") && 
                    item.active === "1";

            });

            ub.styleValues.embellishmentScales.items = _cleanedUp;

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

            if (ub.funcs.isSocks()) { _size = 2.5; }

            _scale = _.find(ub.styleValues.embellishmentScales.items[0].properties, {size: _size.toString()});

            if (typeof _scale === "undefined") {
                ub.utilities.error('Mascot Scale for Size ' + size + ' is not found. Using {x: 0.5, y: 0.5}.' ); 
            } else {
                _result = {x: parseFloat(_scale.scale), y: parseFloat(_scale.scale)};
            }

            return _result; // e.g. {x: 0.5, y: 0.5}

        },

    }


});