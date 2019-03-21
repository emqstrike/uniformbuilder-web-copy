$(document).ready(function () {

	// flag for picker v2
	ub.picker = {
		isNew: false
	}

	// filter flag
	ub.filtersV2 = {
		primary: 'all',
		secondary: 'all',
        tertiary: 'all',
        gender: '',
        sportCategory: '',
        items: []
	};

	ub.data.secondaryBarLabelsV2 = {

        items: [
            {
                sport: 'Wrestling',
                type: 'both',
                upperLabel: 'Singlet',
                lowerLabel: 'Fight Shorts',
            },
            {
                sport: 'Wrestling 2018',
                type: 'both',
                upperLabel: 'Singlets & Tops',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Volleyball',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Compression Shorts',
            },
            {
                sport: 'Crew Socks (Apparel)',
                type: 'lower',
                lowerLabel: 'Crew Sock',
            },
            {
                sport: 'Compression (Apparel)',
                type: 'upper',
                upperLabel: 'Compression',
            },
            {
                sport: 'Tech-Tee (Apparel)',
                type: 'upper',
                upperLabel: 'Tech-Tee',
            },
            {
                sport: 'Cinch Sack (Apparel)',
                type: 'upper',
                upperLabel: 'Cinch Sack',
            },
            {
                sport: 'Hoodie (Apparel)',
                type: 'upper',
                upperLabel: 'Hoodie',
            },
            {
                sport: 'Quarter Zip Jacket (Apparel)',
                type: 'upper',
                upperLabel: 'Quarter Zip Jacket',
            },
            {
                sport: 'Polo (Apparel)',
                type: 'upper',
                upperLabel: 'Polo',
            },
            {
                sport: 'Soccer',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Lacrosse',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Shorts',
            },
            {
                sport: '2017 Team Short with Pockets (Apparel)',
                type: 'lower',
                lowerLabel: ' Team Short',
            },
            {
                sport: 'Signature Coaches Short (Apparel)',
                type: 'lower',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Socks (Apparel)',
                type: 'lower',
                lowerLabel: 'Socks',
            },
            {
                sport: 'Wrestling Compression Shorts (Apparel)',
                type: 'lower',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Game Day Jackets (Apparel)',
                type: 'upper',
                upperLabel: 'Jacket',
            },
            {
                sport: 'Cage Jacket (Apparel)',
                type: 'upper',
                upperLabel: 'Jackets',
            },
            {
                sport: 'Fan Replica Jersey (Apparel)',
                type: 'upper',
                upperLabel: 'Jersey',
            },
            {
                sport: 'Compression Pant (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Football 2017',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Pants',
            },
            {
                sport: 'Yoga Pant (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Hockey',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: ' Socks',
            },
            {
                sport: 'SFN Jogger (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Tennis',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: ' Shorts',
            },
            // eSports Uniform
            {
                sport: 'Tech Tee (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
            {
                sport: 'Polo (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
            {
                sport: 'Hoodie (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
            
        ],
        getLabel: function (sport) {

            var _result = _.find(this.items, {sport: sport});

            if (typeof _result === "undefined") { ub.utilities.info('Secondary Bar Labels not found for ' + sport); }

            return _result;

        }

    }

	ub.funcs.initPicker = function () {

		if (ub.config.picker_version == 'NEW') {
			ub.picker.isNew = true;
		}

		ub.funcs.triggerUpperLowerFilter();
        ub.funcs.triggerUniformApplicationTypeFilter();

        ub.funcs.triggerBlockPatternFilter();
    }

    ub.funcs.prepareSecondaryBarV2 = function (sport, gender) {

    	ub.funcs.hidePrimaryBarFilter();

    	$('a.picker-slink[data-type="upper"]').show();
    	$('a.picker-slink[data-type="lower"]').show();

        var labels = ub.data.secondaryBarLabelsV2.getLabel(sport);

        if (typeof labels != "undefined") {

        	// Women Tennis lower label is SKORTS
        	if (_.isEqual(sport, 'Tennis') && _.isEqual(gender, 'women')) {
        		labels.lowerLabel = 'Skorts';
        	}

            if (labels.type == "upper") {

            	$('a.picker-slink[data-type="upper"]').html(labels.upperLabel);
            	$('a.picker-slink[data-type="lower"]').hide();

            } else if (labels.type == "lower") {
                
                $('a.picker-slink[data-type="upper"]').hide();
                $('a.picker-slink[data-type="lower"]').html(labels.lowerLabel);

            } else if (labels.type == "both") {

                $('a.picker-slink[data-type="upper"]').html(labels.upperLabel);
                $('a.picker-slink[data-type="lower"]').html(labels.lowerLabel);

            }

        } else {
        	$('a.picker-slink[data-type="upper"]').html('Jersey');
            $('a.picker-slink[data-type="lower"]').html('Pants');
        }


    }

    ub.funcs.triggerUpperLowerFilter = function () {
    	$('.cd-tab-filter li').on('click', function (event) {

            //detect which tab filter item was selected
            var type = $(event.target).data('type');

			ub.funcs.setV2PrimaryFilter(type);

            var items = [];

            items = ub.funcs.getPrimaryFilterItems(type);

            ub.funcs.blockPatternCollections(items);

            ub.filtersV2.items = items;

		});
    }

    ub.funcs.triggerUniformApplicationTypeFilter = function () {
        $('li input.uniform-application-type[type=radio]').on('change', function (event) {

            var type = $(event.target).data('type');
            
            ub.funcs.setV2SecondaryFilter(type);

            var items = [];

            items = ub.funcs.getSecondaryFilterItems(type);

            ub.funcs.blockPatternCollections(items);

            ub.filtersV2.items = items;

        });
    }

    ub.funcs.triggerBlockPatternFilter = function () {

        $('select#cd-block-pattern').on('change', function (event) {

            var blockPattern = $(this).find(':selected').data('item');

            if (blockPattern === "all") {

                _newSet = ub.filtersV2.items;

            } else {

                _newSet = _.filter(ub.filtersV2.items, function (item) {

                    return item.block_pattern === blockPattern || item.block_pattern_alias === blockPattern;

                });

                if (blockPattern === "Blank Styles") {

                     _newSet = _.filter(ub.filtersV2.items, function (item) { return item.is_blank === '1'; });

                }

                if (blockPattern === "Favorites") {

                     _newSet = _.filter(ub.filtersV2.items, function (item) { return item.is_favorite === true; });

                }

            }

            ub.funcs.blockPatternCollections(_newSet, false);

            // ub.funcs.sideBarFilterNeckOptionRadioButton();

            ub.funcs.sideBarFilterNeckOptionSelectOption();

        });
    }

    ub.funcs.resetSecondaryBarFilter = function () {
    	$('a.picker-slink.selected').removeClass('selected');
    	$('li.filter a[data-type="all"]').addClass('selected');
    	$('li.filter a[data-type="all"]').trigger('click');
    }

    ub.funcs.hidePrimaryBarFilter = function () {
    	$('div#topbar').hide();
    }

    ub.funcs.sideBarFilterBlockPatternSelectOption = function () {
    	var blockPatterns = _blockPatternsCollection;

    	$('#cd-block-pattern option:gt(0)').remove();
    	_.each(blockPatterns, function(block) {
    		$('#cd-block-pattern')
			.append($("<option></option>")
			.attr("value", "."+block.item.toHyphenCase())
            .attr("data-item", block.item)
			.text(block.alias)); 
    	});
    }

    ub.funcs.sideBarFilterNeckOptionRadioButton = function () {
        var neckOptions = _optionsCollection;
        
        // $('#neck-options li:gt(0)').remove();

        var data = {
            neck_options: neckOptions
        }

        var template = $('#m-filter-v2-neck-options').html();

        var markup = Mustache.render(template, data);

        $('#neck-options').html(markup).fadeIn();

        $('#neck-options li').bind('click', function() {
            $('.cd-tab-filter li').bind('click');
        });
        // $('.cd-tab-filter li').bind('click');

        // var html = '';
        // _.each(neckOptions, function(option) {
            // html += '<li>';
            // html += '<input class="filter" data-filter="'+"."+option.item+'" type="radio" name="radioButton" id="">';
            // html += '<label class="radio-label" for="'+option.item+'">'+option.alias+'</label>';
            // html += '</li>';

        //     $('#neck-options li:first').parent().append(html).fadeIn();
        // });

        // $('#neck-options li:first').parent().append(html).fadeIn();

        // console.log('neckOptions: ', neckOptions);
    }

    ub.funcs.sideBarFilterNeckOptionSelectOption = function () {
        var neckOptions = _optionsCollection;

        $('#cd-neck-pattern option:gt(0)').remove();
        _.each(neckOptions, function(option) {
            $('#cd-neck-pattern')
            .append($("<option></option>")
            .attr("value", "."+option.item)
            .attr("data-item", option.item)
            .text(option.alias)); 
        });
    }

    ub.funcs.addFilterObject = function (object) {
    	return _.each(object, function(obj) {
    		// fv2 = filter version 2
    		obj.block_pattern_fv2 = obj.block_pattern.toHyphenCase();
            obj.neck_option_fv2 = obj.neck_option.toHyphenCase();
    		if (obj.is_blank != 0) {
    			var blank = 'Blank Styles'.toHyphenCase();
    			obj.block_pattern_fv2_blank = blank;
    		}

    		if (obj.is_favorite) {
    			var favorite = 'Favorites'.toHyphenCase();
    			obj.block_pattern_fv2_favorite = favorite;
    		}
    	});
    }

    ub.funcs.setV2PrimaryFilter = function (type) {
    	ub.filtersV2.primary = type;
    }

    ub.funcs.setV2SecondaryFilter = function (type) {
    	ub.filtersV2.secondary = type;
    }

    ub.funcs.setV2Gender = function (gender) {
        ub.filtersV2.gender = gender.toLowerCase();
    }

    ub.funcs.setV2SportCategory = function (sport) {
        ub.filtersV2.sportCategory = sport;
    }

    ub.funcs.getPrimaryFilterItems = function (type) {
        
        ub.filtersV2.tertiary = 'all';

        var items = [];

        var isAvailableForUnisex = ub.data.uniSexSports.isUniSex(ub.filtersV2.sportCategory);

        if (isAvailableForUnisex) { ub.filtersV2.gender = 'unisex'; }

        if (type === "all") {

            if (ub.filtersV2.secondary !== 'all') {

                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filtersV2.secondary && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, uniform_application_type: ub.filtersV2.secondary, gender: ub.filtersV2.gender });    
                }


            } else {

                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, gender: ub.filtersV2.gender }); 
                }

            }

        } else {

            if (ub.filtersV2.secondary !== 'all') {

                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === "Football" || material.uniform_category === "Football 2017") && material.type === ub.filtersV2.primary && material.uniform_application_type === ub.filtersV2.secondary && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, type: ub.filtersV2.primary, uniform_application_type: ub.filtersV2.secondary, gender: ub.filtersV2.gender });    
                }

            } else {

                if (ub.filtersV2.sportCategory === "Football") {

                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === "Football" || material.uniform_category === "Football 2017") && material.type === ub.filtersV2.primary && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, type: ub.filtersV2.primary, gender: ub.filtersV2.gender });
                }

            }

        }

        return items;
    }

    ub.funcs.getSecondaryFilterItems = function (type) {
        
        ub.filtersV2.tertiary = 'all';

        var items = [];

        var isAvailableForUnisex = ub.data.uniSexSports.isUniSex(ub.filtersV2.sportCategory);

        if (isAvailableForUnisex) { ub.filtersV2.gender = 'unisex'; }

        if (type === "all") {

            if (ub.filtersV2.primary !== 'all') {

                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.type === ub.filtersV2.primary && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, type: ub.filtersV2.primary, gender: ub.filtersV2.gender });    
                }

            } else {

                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, gender: ub.filtersV2.gender });    
                }                       
                
            }

        } else {

            if (ub.filtersV2.primary !== 'all') {

                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filtersV2.secondary && material.type === ub.filtersV2.primary && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, uniform_application_type: ub.filtersV2.secondary,  type: ub.filtersV2.primary, gender: ub.filtersV2.gender });    
                }                

            } else {
                
                if (ub.filtersV2.sportCategory === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filtersV2.secondary && material.gender === ub.filtersV2.gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sportCategory, uniform_application_type: ub.filtersV2.secondary, gender: ub.filtersV2.gender });
                }

            }

        }

        return items;
    }

    ub.funcs.blockPatternCollections = function (items, fromBlockPatternSelectOption=true) {

        var _blockPatterns = [];
        var itemsWOUpper = items;
        var _options = [];

        if (ub.filtersV2.sportCategory === "Football" || ub.filtersV2.sportCategory === "Football 2017") {

            itemsWOUpper = _.filter(items, {type: 'lower'});
            _blockPatterns = ub.funcs.getBlockPatternsAlias(itemsWOUpper);

            if (ub.filtersV2.primary === "lower" && ub.filtersV2.tertiary === "Sublimated 17") {

                _options = ['Belted Pant', 'Elastic Waistband Pant'];

            }

        } else {

            _blockPatterns = ub.funcs.getBlockPatternsAlias(itemsWOUpper);
            _options = ub.funcs.getNeckOptionsAlias(itemsWOUpper);

        }

        var _tertiaryOptions = _.union(_blockPatterns, _options);  // leaving this here, maybe they will change their mind

        _blockPatternsCollection = [];
        _optionsCollection = [];

        var _tertiaryFiltersBlackList = ['BASEBALL', 'WRESTLING', 'Fight Short', 'Baseball Pants', 'Compression', 'Volleyball'];
        var _sortedBlockPattern = ub.funcs.sortBlockPatternForFilters(ub.filtersV2.sportCategory, _blockPatterns);

        _.each(_sortedBlockPattern, function (option) {

            if (_.contains(_tertiaryFiltersBlackList, option)) { return; }

            if (option === null) { return; }

            var _alias = option.replace('Baseball Jersey','').toTitleCase(); 

            _alias = ub.data.blockPatternsAlias.getAlias(_alias);

            _blockPatternsCollection.push({

                alias: _alias,
                item: option,

            });

        });

        // Add Blanks
        if (ub.filtersV2.secondary !== "knitted" && ub.filtersV2.secondary !== "tackle_twill") {

            _blockPatternsCollection.push({

                alias: 'Blank Styles',
                item: 'Blank Styles',

            });    

        }
        
        // Add Favorites
        _blockPatternsCollection.push({

            alias: 'Favorites',
            item: 'Favorites',

        });

        _.each(_options, function (option) {

            if (_.contains(_tertiaryFiltersBlackList, option)) { return; }

            if (option === null) { return; }

            var _alias = option.replace('Baseball Jersey','').toTitleCase(); 

            _alias = ub.data.neckOptionsAlias.getAlias(_alias);

            _optionsCollection.push({

                alias: _alias,
                item: option.toLowerCase().toHyphenCase(),

            });

        });

        if (fromBlockPatternSelectOption) {
            ub.funcs.sideBarFilterBlockPatternSelectOption();
        }

    }

    ub.funcs.initPicker();

});