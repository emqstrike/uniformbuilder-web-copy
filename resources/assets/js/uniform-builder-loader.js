$(document).ready(function() {


	ub.loadCategories = function (categories) {

		ub.displayDoneAt('Categories loaded.');

        var _one = 1;
        if (window.ub.config.toString) { _one = "1"; }

		var menSports,
            womenSports,
            youthSports,
            menApparel,
            womenApparel,
            youthApparel,
            meneSports,
            womeneSports,
            youtheSports;

        menSports = ub.funcs.menActiveSportsApparel(categories, {
                        type: 'sports', 
                        active: _one,
                        active_male: _one,
                        active_type: 'active'
                    });

       	menApparel = ub.funcs.menActiveSportsApparel(categories, {
                        type: 'apparel', 
                        active: _one,
                        active_male: _one,
                        active_type: 'active'
                    });

        meneSports = ub.funcs.menActiveSportsApparel(categories, {
                        type: 'esports', 
                        active: _one,
                        active_male: _one,
                        active_type: 'active'
                    });

       	womenSports = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'sports', 
                        active: _one,
                        active_female: _one,
                        active_type: 'active'
                    });

       	womenApparel = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'apparel', 
                        active: _one,
                        active_female: _one,
                        active_type: 'active'
                    });

        womeneSports = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'esports', 
                        active: _one,
                        active_female: _one,
                        active_type: 'active'
                    });

       	youthSports = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'sports', 
                        active: _one,
                        active_youth: _one,
                        active_type: 'active'
                    });

       	youthApparel = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'apparel', 
                        active: _one,
                        active_youth: _one,
                        active_type: 'active'
                    });

        youtheSports = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'esports', 
                        active: _one,
                        active_youth: _one,
                        active_type: 'active'
                    });

       	ub.data.activeSports.items = ub.funcs.getActiveSports(categories, {
	   									active: _one,
	   									active_type: 'active'
	   								});

       	ub.data.tempSports.items = ub.funcs.getTempSports(categories, {
	   									active: _one,
	   									active_type: 'temp'
	   								});

       	ub.data.sports = [
            {
                gender: 'Men',
                sports: ub.funcs.menSortOrder(menSports)
            },
            {
                gender: 'Women',
                sports: ub.funcs.womenSortOrder(womenSports)
            },
            {
                gender: 'Youth',
                sports: ub.funcs.youthSortOrder(youthSports)
            }
        ];

        ub.data.apparel = [
            {
                gender: 'Men',
                sports: ub.funcs.menSortOrder(menApparel)
            },
            {
                gender: 'Women',
                sports: ub.funcs.womenSortOrder(womenApparel)
            },
            {
                gender: 'Youth',
                sports: ub.funcs.youthSortOrder(youthApparel)
            }
        ];

        ub.data.esports = [
            {
                gender: 'Men',
                sports: ub.funcs.menSortOrder(meneSports)
            },
            {
                gender: 'Women',
                sports: ub.funcs.womenSortOrder(womeneSports)
            },
            {
                gender: 'Youth',
                sports: ub.funcs.youthSortOrder(youtheSports)
            }
        ];

	}

    ub.funcs.menActiveSportsApparel = function (items, properties) {
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

    ub.funcs.menSortOrder = function(collections) {
        return _.sortBy(collections, function(data) {
            return parseInt(data.sort_order_male);
        });
    }

    ub.funcs.womenSortOrder = function(collections) {
        return _.sortBy(collections, function(data) {
            return parseInt(data.sort_order_female);
        });
    }

    ub.funcs.youthSortOrder = function(collections) {
        return _.sortBy(collections, function(data) {
            return parseInt(data.sort_order_youth);
        });
    }

});
