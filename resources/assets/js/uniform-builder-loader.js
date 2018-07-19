$(document).ready(function() {


	ub.load_categories = function (categories) {

		ub.displayDoneAt('Categories loaded.');

		var men_sports,
            women_sports,
            youth_sports,
            men_apparel,
            women_apparel,
            youth_apparel;

        men_sports = ub.funcs.menActiveSortsApparel(categories, {
                        type: 'sports', 
                        active: '1',
                        active_male: '1',
                        active_type: 'active'
                    });

       	men_apparel = ub.funcs.menActiveSortsApparel(categories, {
                        type: 'apparel', 
                        active: '1',
                        active_male: '1',
                        active_type: 'active'
                    });

       	women_sports = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'sports', 
                        active: '1',
                        active_female: '1',
                        active_type: 'active'
                    });

       	women_apparel = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'apparel', 
                        active: '1',
                        active_female: '1',
                        active_type: 'active'
                    });

       	youth_sports = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'sports', 
                        active: '1',
                        active_youth: '1',
                        active_type: 'active'
                    });

       	youth_apparel = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'apparel', 
                        active: '1',
                        active_youth: '1',
                        active_type: 'active'
                    });

       	ub.data.activeSports.items = ub.funcs.getActiveSports(categories, {
	   									active: '1',
	   									active_type: 'active'
	   								});

       	ub.data.tempSports.items = ub.funcs.getTempSports(categories, {
	   									active: '1',
	   									active_type: 'temp'
	   								});

       	ub.data.sports = [
            {
                gender: 'Men',
                sports: _.sortBy(men_sports, 'sort_order')
            },
            {
                gender: 'Women',
                sports: _.sortBy(women_sports, 'sort_order')
            },
            {
                gender: 'Youth',
                sports: _.sortBy(youth_sports, 'sort_order')
            }
        ];

        ub.data.apparel = [
            {
                gender: 'Men',
                sports: _.sortBy(men_apparel, 'sort_order')
            },
            {
                gender: 'Women',
                sports: _.sortBy(women_apparel, 'sort_order')
            },
            {
                gender: 'Youth',
                sports: _.sortBy(youth_apparel, 'sort_order')
            }
        ];

	}

    ub.funcs.menActiveSortsApparel = function (items, properties) {
    	return _.where(items, properties)
    			.filter(function(data) {
                    return (data.thumbnail_male.length > 0) ? data.thumbnail_male : '';
                });
    }

    ub.funcs.womenActiveSportsApparel = function (items, properties) {
    	return _.where(items, properties)
    			.filter(function(data) {
	                return (data.thumbnail_female.length > 0) ? data.thumbnail_female : '';
	            });
    }

    ub.funcs.youthActiveSportsApparel = function (items, properties) {
    	return _.where(items, properties)
    			.filter(function(data) {
	                return (data.thumbnail_youth.length > 0) ? data.thumbnail_youth : '';
	            });
    }

    ub.funcs.getActiveSports = function (items ,properties) {
    	return _.where(items, properties);
    }

    ub.funcs.getTempSports = function (items ,properties) {
    	return _.where(items, properties);
    }

});