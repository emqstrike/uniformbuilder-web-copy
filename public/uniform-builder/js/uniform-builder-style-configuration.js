$(document).ready(function () {

    ub.styleValues      = {};
    window.ubsv         = ub.styleValues;

    ub.styleValues.mascotScales = {

        items: [],

        hasValues: function () {

            return ub.styleValues.mascotScales.items.length > 0;

        },

        cleanUp: function (sport, type, neckOption) {

            var _items = ub.styleValues.mascotScales.items;
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

            ub.styleValues.mascotScales.items = _cleanedUp;

        },

        fetchValues: function () {

            var _apiCode = 'getMascotScales';

            ubep.fetch(_apiCode, function (result) {
                
                ub.styleValues.mascotScales.items = result.mascot_sizes;
                ub.styleValues.mascotScales.cleanUp(ub.config.sport, ub.config.type, ub.config.option);
                ub.utilities.info('Mascot Scales Loaded.');

            });

        },

        getScale: function (size) {
            
            var _size = size;
            var _scale;
            var _result = undefined;

            if (ub.funcs.isCurrentSport("Crew Socks (Apparel)")) { _size = 2.5; }

            _scale = _.find(ub.styleValues.mascotScales.items[0].properties, {size: _size.toString()});

            if (typeof _scale === "undefined") {
                ub.utilities.error('Mascot Scale for Size ' + size + ' is not found. Using {x: 0.5, y: 0.5}.' ); 
            } else {
                _result = {x: parseFloat(_scale.scale), y: parseFloat(_scale.scale)};
            }

            return _result; // e.g. {x: 0.5, y: 0.5}

        },

    }

});