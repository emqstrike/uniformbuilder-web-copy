$(document).ready(function() {


	ub.loadCategories = function (categories) {

        if (_.size(categories) > 0) {

    		ub.displayDoneAt('Categories loaded.');

    		var menSports,
                womenSports,
                youthSports,
                menApparel,
                womenApparel,
                youthApparel;

            menSports = ub.funcs.menActiveSortsApparel(categories, {
                            type: 'sports', 
                            active: '1',
                            active_male: '1',
                            active_type: 'active'
                        });

           	menApparel = ub.funcs.menActiveSortsApparel(categories, {
                            type: 'apparel', 
                            active: '1',
                            active_male: '1',
                            active_type: 'active'
                        });

           	womenSports = ub.funcs.womenActiveSportsApparel(categories, {
                            type: 'sports', 
                            active: '1',
                            active_female: '1',
                            active_type: 'active'
                        });

           	womenApparel = ub.funcs.womenActiveSportsApparel(categories, {
                            type: 'apparel', 
                            active: '1',
                            active_female: '1',
                            active_type: 'active'
                        });

           	youthSports = ub.funcs.youthActiveSportsApparel(categories, {
                            type: 'sports', 
                            active: '1',
                            active_youth: '1',
                            active_type: 'active'
                        });

           	youthApparel = ub.funcs.youthActiveSportsApparel(categories, {
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
                    sports: _.sortBy(menSports, 'sort_order_male')
                },
                {
                    gender: 'Women',
                    sports: _.sortBy(womenSports, 'sort_order_female')
                },
                {
                    gender: 'Youth',
                    sports: _.sortBy(youthSports, 'sort_order_youth')
                }
            ];

            ub.data.apparel = [
                {
                    gender: 'Men',
                    sports: _.sortBy(menApparel, 'sort_order_male')
                },
                {
                    gender: 'Women',
                    sports: _.sortBy(womenApparel, 'sort_order_female')
                },
                {
                    gender: 'Youth',
                    sports: _.sortBy(youthApparel, 'sort_order_youth')
                }
            ];

        }

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