$(document).ready(function() {

	ub.data.threadColors = {};

	ub.data.materialOptionWithLimitedColors = {
        
        items: [
            {
                block_pattern: 'Soccer',
                neck_options: ['Goalie (M)', 'Goalie (W)', 'Jersey (M)', 'Jersey (W)', 'Short (W)', 'Short (M)'],
                material_option: 'Pro-Dry',
                valid_colors: [
                    'B',
                    'W',
                    'GR',
                ]
            },
            {
                block_pattern: 'Quarter Zip Jacket',
                neck_options: ['Long Sleeve', 'Short Sleeve'],
                material_option: 'Zipper',
                valid_colors: [
                    'B',
                    'W',

                ]
            },
            {
                block_pattern: 'Cage Jacket (Apparel)',
                neck_options: ['Long Sleeve', 'Short Sleeve'],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            {
                block_pattern: 'Compression Pant',
                neck_options: ['Full', 'Quarter'],
                material_option: 'Waistband', 
                valid_colors: [
                    'B',    
                    'CG',
                ]
            },
            {
                block_pattern: 'Compression Pant',
                neck_options: ['Full', 'Quarter'],
                material_option: 'Prolook', 
                valid_colors: [
                    'B',    
                    'CG',
                ]
            },
            {
                block_pattern: 'Game Day Jacket',
                neck_options: ["Men's", "Women's"],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            {
                block_pattern: 'Game Day Jacket',
                neck_options: ["Men's", "Women's"],
                material_option: 'Arm Elastic', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },

            // SFN Hoodie
            {
                block_pattern: 'SFN Hoodie',
                neck_options: ['Long Sleeve', 'Short Sleeve', 'Sleeveless'],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            {
                block_pattern: 'SFN Hoodie',
                neck_options: ['Long Sleeve', 'Short Sleeve', 'Sleeveless'],
                material_option: 'Hood Cuff', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            {
                block_pattern: 'SFN Hoodie',
                neck_options: ['Long Sleeve', 'Short Sleeve', 'Sleeveless'],
                material_option: 'Arm Cuff', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            // End SFN Hoodie

            // Team Store
            {
                block_pattern: 'Cage Jacket (Apparel)',
                neck_options: ['Full', 'Quarter'],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },

            // After migration. Note: Don't delete the previous ones above so that the old saved designs wont be messed up
            {
                block_pattern: 'Cage Jackets',
                neck_options: ['Long Sleeves', 'Short Sleeves'],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            {
                block_pattern: 'Quarter Zip Jacket',
                neck_options: ['Long Sleeve', 'Short Sleeve'],
                material_option: 'Zipper',
                valid_colors: [
                    'B',
                    'W',
                ]
            },
            // PTS Cage Jacket
            {
                block_pattern: 'PTS Cage Jacket',
                neck_options: ['Short Sleeve'],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            {
                block_pattern: 'PTS Cage Jacket',
                neck_options: ['Short Sleeve'],
                material_option: 'Neck Tape 1', 
                valid_colors: [
                    'W',    
                    'CG',
                ]
            },
            {
                block_pattern: 'PTS Cage Jacket',
                neck_options: ['Short Sleeve'],
                material_option: 'Neck Tape 2', 
                valid_colors: [
                    'W',    
                    'CG',
                ]
            },
            // PTS Hoodie
            {
                block_pattern: 'PTS Hoodie',
                neck_options: ['Hoodie'],
                material_option: 'Neck Tape 1', 
                valid_colors: [
                    'W',    
                    'CG',
                ]
            },
            {
                block_pattern: 'PTS Hoodie',
                neck_options: ['Hoodie'],
                material_option: 'Neck Tape 2', 
                valid_colors: [
                    'W',    
                    'CG',
                ]
            },
            // SFN Jogger
            {
                block_pattern: 'SFN Jogger',
                neck_options: ['SFN Jogger'],
                material_option: 'Zipper', 
                valid_colors: [
                    'B',    
                    'W',
                    'R',
                    'GR',
                    'NB',
                    'RB',
                ]
            },
            // Flag Football
            {
                block_pattern: 'Flag Football',
                neck_options: ['Flag Jersey'],
                material_option: 'Team Flag', 
                valid_colors: [
                    'FLB',
                    'FLG',
                ]
            },
            // Match Series
            {
                block_pattern: 'Match Series',
                neck_options: ['Jersey (M)', 'Jersey (W)', 'Short (W)', 'Short (M)'],
                material_option: 'Pro-Dry',
                valid_colors: [
                    'B',
                    'W',
                    'GR',
                ]
            },
            // Match Series
            {
                block_pattern: 'Champion Series',
                neck_options: ['Jersey (M)', 'Jersey (W)', 'Short (W)', 'Short (M)'],
                material_option: 'Pro-Dry',
                valid_colors: [
                    'B',
                    'W',
                    'GR',
                ]
            },
            //Premier Series
            {
                block_pattern: 'Premier Series',
                neck_options: ['Jersey (M)', 'Jersey (W)', 'Short (W)', 'Short (M)'],
                material_option: 'Pro-Dry',
                valid_colors: [
                    'B',
                    'W',
                    'GR',
                ]
            },
            //Goalie
            {
                block_pattern: 'Goalie',
                neck_options: ['Goalie (M)', 'Goalie (W)'],
                material_option: 'Pro-Dry',
                valid_colors: [
                    'B',
                    'W',
                    'GR',
                ]
            },
        ],

        getLimitedColorSet: function (materialOption) {

            var _result = _.find(this.items, function (item) {

                return item.block_pattern === ub.current_material.material.block_pattern && 
                        _.contains(item.neck_options, ub.current_material.material.neck_option) && 
                        item.material_option === materialOption;

            });

            return _result;

        }

    };

    ub.data.coordinatingColors = {

        items: [
            {
                origin: 'Prolook',
                matchingPart: 'Waistband',
                sport: 'Compression Pant (Apparel)',
                blockPattern: 'Compression Pant',
                neckOption: ['Full', 'Quarter'],
                color1: 'CG',
                color2: 'B',
            },
            {
                origin: 'Waistband',
                matchingPart: 'Prolook',
                sport: 'Compression Pant (Apparel)',
                blockPattern: 'Compression Pant',
                neckOption: ['Full', 'Quarter'],
                color1: 'CG',
                color2: 'B',
            },
            // PTS Cage Jacket
            {
                origin: 'Neck Tape 1',
                matchingPart: 'Neck Tape 2',
                sport: 'PTS Cage Jacket (Apparel)',
                blockPattern: 'PTS Cage Jacket',
                neckOption: ['Short Sleeve'],
                color1: 'CG',
                color2: 'W',
            },
            {
                origin: 'Neck Tape 2',
                matchingPart: 'Neck Tape 1',
                sport: 'PTS Cage Jacket (Apparel)',
                blockPattern: 'PTS Cage Jacket',
                neckOption: ['Short Sleeve'],
                color1: 'CG',
                color2: 'W',
            },
            // PTS Hoodie
            {
                origin: 'Neck Tape 1',
                matchingPart: 'Neck Tape 2',
                sport: 'PTS Hoodie (Apparel)',
                blockPattern: 'PTS Hoodie',
                neckOption: ['Hoodie'],
                color1: 'CG',
                color2: 'W',
            },
            {
                origin: 'Neck Tape 2',
                matchingPart: 'Neck Tape 1',
                sport: 'PTS Hoodie (Apparel)',
                blockPattern: 'PTS Hoodie',
                neckOption: ['Hoodie'],
                color1: 'CG',
                color2: 'W',
            },
        ],

        isCoordinating: function (origin, sport, blockPattern, neckOption, colorCode) {

            var _originOk = _.filter(this.items, function (item) {

                var __originOK = origin === item.origin;

                return origin === item.origin &&
                        sport === item.sport &&
                        blockPattern === item.blockPattern &&
                        _.contains(item.neckOption, neckOption);

            });

            var _matchingPartColor = undefined;
            var _matchingPart = undefined;
            var _firstItem = undefined;

            if (_originOk.length > 0) {

                _firstItem = _originOk[0];

                if (colorCode === _firstItem.color1)  {
                    _matchingPartColor = _firstItem.color2;
                } else {
                    _matchingPartColor = _firstItem.color1;
                }

                _matchingPart = _firstItem.matchingPart;

            }

            return {
                result: (_originOk.length > 0),
                item: (_originOk.length > 0) ? _firstItem : undefined, 
                matchingPart: (_originOk.length > 0) ? _matchingPart : undefined,
                matchingPartColor: (_originOk.length > 0) ? _matchingPartColor : undefined,
            }
            
        }

    }

	ub.funcs.prepareColors = function () {

		ub.data.colors = _.filter(ub.data.colors, function (color) {
            if (color.brand.toLowerCase() === ub.config.brand.toLowerCase()) {
                return color = color.active === 1 || color.active === '1';
            }
        });

		ub.data.colors = _.filter(ub.data.colors, function (color) {
			return !ub.data.excludedColors.isExcluded(ub.config.sport, ub.config.uniform_application_type, color.color_code);
		});

        ub.data.colors = _.map(ub.data.colors, function (color) {
            color.order = ub.data.sublimatedColorArrangement.getOrderID(color.name).order;
            return color;
        });

        // FLB and FLG colors are for Flag Football block pattern only
        if (ub.config.blockPattern !== 'Flag Football') {
            var flag_colors = ['FLB', 'FLG'];
            ub.data.colors = _.filter(ub.data.colors, function(color) {
                return !_.contains(flag_colors, color.color_code);
            });
        }
                
        ub.data.colors = _.sortBy(ub.data.colors, 'order');

	};

	/**
    * @desc get the colors sets from the backend API
    * @param string name - e.g. 'Thread', 'Sublimation Standard Colors', 'Twill Standard Colors', etc. etc
    * @return array colors
    */
	ub.funcs.getColorsSets = function (name) {

        var colors = [];
        var _url = window.ub.config.api_host + '/api/colors_sets';

        ub.loader(_url, 'colors_sets', function (result) {

            var colorSet = _.find(result, { name: name, active: 1 });

            _.map(JSON.parse(colorSet.colors), function(color) {

                colors.push(ub.funcs.getColorByColorCode(color));

            });

        });

        return colors;

    }

    /**
    * @desc return all thread colors
    * @return array ub.data.threadColors 
    */
    ub.funcs.getThreadColors = function () {

        ub.data.threadColors = ub.funcs.getColorsSets('Thread');

        return ub.data.threadColors;

    }

});