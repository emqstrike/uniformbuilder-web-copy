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
        sport: '',
        uniformType: '',
        items: [],
	}

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
                upperLabel: 'Jersey',
            },
            {
                sport: 'Polo (eSports)',
                type: 'upper',
                upperLabel: 'Jersey',
            },
            {
                sport: 'Hoodie (eSports)',
                type: 'upper',
                upperLabel: 'Jersey',
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

        ub.funcs.triggerGenderTypeFilter();
        ub.funcs.triggerUniformTypeFilter();

		ub.funcs.triggerUpperLowerFilter();
        ub.funcs.triggerSportFilter();
        ub.funcs.triggerUniformApplicationTypeFilter();
        ub.funcs.triggerBlockPatternFilter();
    }

    ub.funcs.prepareSecondaryBarV2 = function (sport, gender) {

    	ub.funcs.hidePrimaryBarFilter();

    	$('a.picker-slink[data-type="upper"]').show();
    	$('a.picker-slink[data-type="lower"]').show();

        var labels = ub.data.secondaryBarLabelsV2.getLabel(sport);

        if (typeof labels !== "undefined") {

        	// Women Tennis lower label is SKORTS
        	if (_.isEqual(sport, 'Tennis') && _.isEqual(gender, 'women')) {
        		labels.lowerLabel = 'Skorts';
        	}

            if (labels.type === "upper") {

            	$('a.picker-slink[data-type="upper"]').html(labels.upperLabel);
            	$('a.picker-slink[data-type="lower"]').hide();

            } else if (labels.type === "lower") {
                
                $('a.picker-slink[data-type="upper"]').hide();
                $('a.picker-slink[data-type="lower"]').html(labels.lowerLabel);

            } else if (labels.type === "both") {

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

            ub.funcs.blockPatternCollections(items, true);

            ub.filtersV2.items = items;

		});
    }

    ub.funcs.triggerUniformApplicationTypeFilter = function () {
        $('li input.uniform-application-type[type=radio]').on('change', function (event) {

            var type = $(event.target).data('type');
            
            ub.funcs.setV2SecondaryFilter(type);

            var items = [];

            items = ub.funcs.getSecondaryFilterItems(type);

            ub.funcs.blockPatternCollections(items, true);

            ub.filtersV2.items = items;

        });
    }

    ub.funcs.triggerBlockPatternFilter = function () {
        $('select#cd-block-pattern').on('change', function (event) {

            var blockPattern = $(this).find(':selected').data('item');

            ub.filtersV2.tertiary = blockPattern.toString();

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

    ub.funcs.triggerGenderTypeFilter = function () {
        $('li input.gender-type[type=radio]').on('change', function (event) {
            var gender = $(event.target).data('gender');
            var uniformType = $('li input.uniform-type[name="uniformTypeButton"]:checked').data('category');

            var activeSports = ub.funcs.getActiveSportByGender(uniformType, gender);

            $('#cd-sport option:gt(0)').remove();
            _.each(activeSports, function(sport) {
                var sportName = (sport.alias.length > 0) ? sport.alias : sport.name ;

                $('#cd-sport')
                .append($("<option></option>")
                .attr("value", sport.name)
                .attr("data-item", sport.name)
                .text(sportName));
            });

            // Women does not have `esport` uniform type
            $('li input.gender-type[data-gender="women"]').prop('disabled', false).css('cursor', 'pointer');
            $('li input.uniform-type[data-category="esports"]').prop('disabled', false).css('cursor', 'pointer');
            ub.funcs.changeCursorType('li label.women-label', 'pointer');
            ub.funcs.changeCursorType('li label.esports-label', 'pointer');
            if (gender === 'women') {
                $('li input.uniform-type[data-category="esports"]').prop('disabled', true).css('cursor', 'not-allowed');
                ub.funcs.changeCursorType('li label.esports-label', 'not-allowed');
            }

        });
    }

    ub.funcs.triggerUniformTypeFilter = function () {
        $('li input.uniform-type[type=radio]').on('change', function (event) {
            var uniformType = $(event.target).data('category');
            var gender = $('li input.gender-type[name="genderButton"]:checked').data('gender');

            var activeSports = ub.funcs.getActiveSportByGender(uniformType, gender);

            $('#cd-sport option:gt(0)').remove();
            _.each(activeSports, function(sport) {
                var sportName = (sport.alias.length > 0) ? sport.alias : sport.name ;

                $('#cd-sport')
                .append($("<option></option>")
                .attr("value", sport.name)
                .attr("data-item", sport.name)
                .text(sportName));

            });

            // Women does not have `esport` uniform type
            $('li input.uniform-type[data-category="esports"]').prop('disabled', false).css('cursor', 'pointer');
            ub.funcs.changeCursorType('li label.esports-label', 'pointer');
            if (gender === 'women') {
                $('li input.uniform-type[data-category="esports"]').prop('disabled', true).css('cursor', 'not-allowed');
                ub.funcs.changeCursorType('li label.esports-label', 'not-allowed');
            }

            $('li input.gender-type[data-gender="women"]').prop('disabled', false).css('cursor', 'pointer');
            ub.funcs.changeCursorType('li label.women-label', 'pointer');
            if (uniformType === 'esports') {
                $('li input.gender-type[data-gender="women"]').prop('disabled', true).css('cursor', 'not-allowed');
                ub.funcs.changeCursorType('li label.women-label', 'not-allowed');
            }
        });
    }

    ub.funcs.triggerSportFilter = function () {
        $('select#cd-sport').on('change', function (event) {

            var items = [];
            var sport = $(this).find(':selected').data('item');
            var gender = $('li input.gender-type[name="genderButton"]:checked').data('gender');
            var uniformType = $('li input.uniform-type[name="uniformTypeButton"]:checked').data('category');

            var isAvailableForUnisex = ub.data.uniSexSports.isUniSex(sport);
            if (isAvailableForUnisex) { gender = 'unisex'; }

            if (sport === "Football") {
                items = _.filter(ub.materials, function (material)  {
                    return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === gender;
                });
            } else if (isAvailableForUnisex) {
                items = _.filter(ub.materials, {uniform_category: sport, gender: gender });
            } else {
                items = _.filter(ub.materials, {uniform_category: sport, gender: gender });
            }

            $('input.uniform-application-type[data-type="all"]').prop('checked', true);
            ub.funcs.showKnittedOnApplicationTypeOption(sport);

            ub.funcs.setV2Gender(gender);
            ub.funcs.setV2Sport(sport);
            ub.funcs.setV2UniformType(uniformType);
            ub.funcs.setV2items(items);

            ub.funcs.initScroller('uniforms', items, sport, undefined, undefined, gender);

        });
    }

    ub.funcs.resetSecondaryBarFilter = function () {
    	$('a.picker-slink.selected').removeClass('selected');
    	$('li.filter a.picker-slink[data-type="all"]').addClass('selected');
    	$('li.filter a.picker-slink[data-type="all"]').trigger('click');
    }

    ub.funcs.hidePrimaryBarFilter = function () {
    	$('div#topbar').hide();
    }

    ub.funcs.getActiveSportByGender = function (uniformType, gender) {
        var sports = ub.data.activeSports.items;

        var _one = 1;
        if (window.ub.config.toString) { _one = "1"; }

        var gender = (typeof gender !== 'undefined') ? gender : ub.filtersV2.gender;
        return _.filter(sports, function (sport) {
            if (gender == 'men') {
                return sport.active_male === _one && sport.active_type === 'active' && sport.thumbnail_male.length > 0 && sport.type === uniformType
            } else {
                return sport.active_female === _one && sport.active_type === 'active' && sport.thumbnail_female.length > 0 && sport.type === uniformType
            }
        });
    }

    ub.funcs.setSideBarSportFilter = function () {

        ub.funcs.showKnittedOnApplicationTypeOption(ub.filtersV2.sport);

        var activeSports = ub.funcs.getActiveSportByGender(ub.filtersV2.uniformType, undefined);

        $('#cd-sport option:gt(0)').remove();

        _.each(activeSports, function(sport) {
            var sportName = (sport.alias.length > 0) ? sport.alias : sport.name ;

            $('#cd-sport')
            .append($("<option></option>")
            .attr("value", sport.name)
            .attr("data-item", sport.name)
            .text(sportName));
        });
        
        $('#cd-sport option[data-item="'+ub.filtersV2.sport+'"]').attr('selected', 'selected');
        ub.funcs.setActiveGenderTypeOnSideBar();
        ub.funcs.setActiveUniformTypeOnSideBar();
        
    }

    ub.funcs.showKnittedOnApplicationTypeOption = function (sport) {
        if (sport === 'Socks (Apparel)') {
            $('li#uat-knitted').css('display', 'block');
            $('li#uat-sublimated').css('display', 'block');
            $('li#uat-tackle-twill').css('display', 'none');
        } else {
            $('li#uat-tackle-twill').css('display', 'block');
            $('li#uat-sublimated').css('display', 'block');
            $('li#uat-knitted').css('display', 'none');
        }
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

            if (typeof obj.neck_option != 'undefined' && typeof obj.neck_option_alias != 'undefined') {
                obj.neck_option_fv2 = obj.neck_option_alias.toHyphenCase();
            }

            if (typeof obj.block_pattern_alias != 'undefined' && obj.block_pattern_alias.length > 0) {
                obj.block_pattern_fv2 = obj.block_pattern_alias.toHyphenCase();
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

    ub.funcs.setV2Sport = function (sport) {
        ub.filtersV2.sport = sport;
    }

    ub.funcs.setV2UniformType = function (type) {
        ub.filtersV2.uniformType = type;
    }

    ub.funcs.setV2items = function (items) {
        ub.filtersV2.items = items;
    }

    ub.funcs.setActiveGenderTypeOnSideBar = function () {
        $('li input.gender-type[name="genderButton"]:checked').prop('checked', false);
        $('li input.gender-type[data-gender="'+ub.filtersV2.gender+'"]').prop('checked', true);
    }

    ub.funcs.setActiveUniformTypeOnSideBar = function () {
        $('li input.uniform-type[name="uniformTypeButton"]:checked').prop('checked', false);
        $('li input.uniform-type[data-category="'+ub.filtersV2.uniformType+'"]').prop('checked', true);
    }

    ub.funcs.changeCursorType = function (element, cursorType) {
        $(element).css('cursor', cursorType);
    }

    ub.funcs.getPrimaryFilterItems = function (type) {
        
        ub.filtersV2.tertiary = 'all';

        var items = [];

        var gender = ub.filtersV2.gender;

        var isAvailableForUnisex = ub.data.uniSexSports.isUniSex(ub.filtersV2.sport);

        if (isAvailableForUnisex) { gender = 'unisex'; }

        if (type === "all") {

            if (ub.filtersV2.secondary !== 'all') {

                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filtersV2.secondary && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, uniform_application_type: ub.filtersV2.secondary, gender: gender });    
                }


            } else {

                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, gender: gender }); 
                }

            }

        } else {

            if (ub.filtersV2.secondary !== 'all') {

                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === "Football" || material.uniform_category === "Football 2017") && material.type === ub.filtersV2.primary && material.uniform_application_type === ub.filtersV2.secondary && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, type: ub.filtersV2.primary, uniform_application_type: ub.filtersV2.secondary, gender: gender });    
                }

            } else {

                if (ub.filtersV2.sport === "Football") {

                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === "Football" || material.uniform_category === "Football 2017") && material.type === ub.filtersV2.primary && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, type: ub.filtersV2.primary, gender: gender });
                }

            }

        }

        return items;
    }

    ub.funcs.getSecondaryFilterItems = function (type) {
        
        ub.filtersV2.tertiary = 'all';

        var items = [];

        var gender = ub.filtersV2.gender;

        var isAvailableForUnisex = ub.data.uniSexSports.isUniSex(ub.filtersV2.sport);

        if (isAvailableForUnisex) { gender = 'unisex'; }

        if (type === "all") {

            if (ub.filtersV2.primary !== 'all') {

                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.type === ub.filtersV2.primary && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, type: ub.filtersV2.primary, gender: gender });    
                }

            } else {

                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, gender: gender });    
                }                       
                
            }

        } else {

            if (ub.filtersV2.primary !== 'all') {

                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filtersV2.secondary && material.type === ub.filtersV2.primary && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, uniform_application_type: ub.filtersV2.secondary,  type: ub.filtersV2.primary, gender: gender });    
                }                

            } else {
                
                if (ub.filtersV2.sport === "Football") {
                    items = _.filter(ub.materials, function (material)  {
                        return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filtersV2.secondary && material.gender === gender;
                    });
                } else {
                    items = _.filter(ub.materials, { uniform_category: ub.filtersV2.sport, uniform_application_type: ub.filtersV2.secondary, gender: gender });
                }

            }

        }

        return items;
    }

    ub.funcs.blockPatternCollections = function (items, fromBlockPatternSelectOption) {

        var _blockPatterns = [];
        var itemsWOUpper = items;
        var _options = [];

        if (ub.filtersV2.sport === "Football" || ub.filtersV2.sport === "Football 2017") {

            itemsWOUpper = _.filter(items, {type: 'lower'});
            _blockPatterns = ub.funcs.getBlockPatternsAlias(itemsWOUpper);

            if (ub.filtersV2.primary === "lower" && ub.filtersV2.tertiary === "Sublimated 17") {

                _options = ['Belted Pant', 'Elastic Waistband Pant'];

            }

        } else {

            _blockPatterns = ub.funcs.getBlockPatternsAlias(itemsWOUpper);
            _options = ub.funcs.getNeckOptionsAliasV2(itemsWOUpper);

        }

        var _tertiaryOptions = _.union(_blockPatterns, _options);  // leaving this here, maybe they will change their mind

        _blockPatternsCollection = [];
        _optionsCollection = [];

        var _tertiaryFiltersBlackList = ['BASEBALL', 'WRESTLING', 'Fight Short', 'Baseball Pants', 'Compression', 'Volleyball'];
        var _sortedBlockPattern = ub.funcs.sortBlockPatternForFilters(ub.filtersV2.sport, _blockPatterns);

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
            ub.funcs.sideBarFilterNeckOptionSelectOption();
        }

    }

    ub.funcs.getNeckOptionsAliasV2 = function (items) {

        var neckOptions = [];

        _.each(items, function(item) {

            var parsedBlockPatternOptions = JSON.parse(item.block_pattern_options);
            
            var bOptions = _.find(parsedBlockPatternOptions, {name: item.neck_option});

            item.neck_option_alias = (typeof bOptions.alias !== 'undefined' 
                                        && bOptions.alias !== 'undefined' 
                                        && bOptions.alias !== '') 
                                     ? bOptions.alias 
                                     : item.neck_option;

        });

        _.uniq(_.map(items, function(item) {

            neckOptions.push(item.neck_option);

        }));

        return _.uniq(neckOptions);

    }

    ub.funcs.initPicker();

});