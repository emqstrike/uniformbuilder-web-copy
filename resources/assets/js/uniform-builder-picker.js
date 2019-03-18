$(document).ready(function () {

	// flag for picker v2
	ub.picker = {
		isNew: false
	}

	// filter flag
	ub.filtersV2 = {
		primary: 'All',
		secondary: 'All'
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
    	$('.cd-tab-filter li').on('click', function(event){
			//detect which tab filter item was selected
			var selected_filter = $(event.target).data('type');
			ub.funcs.setV2PrimaryFilter(selected_filter);
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
			.text(block.alias)); 
    	});
    }

    ub.funcs.addFilterObject = function (object) {
    	return _.each(object, function(obj) {
    		// fv2 = filter version 2
    		obj.block_pattern_fv2 = obj.block_pattern.toHyphenCase();
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

    ub.funcs.initPicker();

});