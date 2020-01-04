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
            youtheSports,
            // team accessories
            menteamAccessories,
            womenteamAccessories,
            youthteamAccessories,
             // quickturn category
            menQuickturn,
            womenQuickturn,
            youthQuickturn;

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

        menteamAccessories = ub.funcs.menActiveSportsApparel(categories, {
                        type: 'team_accessories',
                        active: _one,
                        active_male: _one,
                        active_type: 'active'
                    });

        womenteamAccessories = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'team_accessories',
                        active: _one,
                        active_female: _one,
                        active_type: 'active'
                    });

        youthteamAccessories = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'team_accessories',
                        active: _one,
                        active_youth: _one,
                        active_type: 'active'
                    });

        menQuickturn = ub.funcs.menActiveSportsApparel(categories, {
                        type: 'quickturn',
                        active: _one,
                        active_male: _one,
                        active_type: 'active'
                    });

        womenQuickturn = ub.funcs.womenActiveSportsApparel(categories, {
                        type: 'quickturn',
                        active: _one,
                        active_female: _one,
                        active_type: 'active'
                    });

        youthQuickturn = ub.funcs.youthActiveSportsApparel(categories, {
                        type: 'quickturn',
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

        // team accessories
         ub.data.teamAccessories = [
            {
                gender: 'Men',
                sports: ub.funcs.menSortOrder(menteamAccessories)
            },
            {
                gender: 'Women',
                sports: ub.funcs.womenSortOrder(womenteamAccessories)
            },
            {
                gender: 'Youth',
                sports: ub.funcs.youthSortOrder(youthteamAccessories)
            }
        ];

        // Quickturn Category
         ub.data.quickturn = [
            {
                gender: 'Men',
                sports: ub.funcs.menSortOrder(menQuickturn)
            },
            {
                gender: 'Women',
                sports: ub.funcs.womenSortOrder(womenQuickturn)
            },
            {
                gender: 'Youth',
                sports: ub.funcs.youthSortOrder(youthQuickturn)
            }
        ];

        ub.data.sportsCategory = {

            esports: [
                {
                    gender: 'Men',
                    sports: [
                        {
                            'active': 1,
                            'name': 'eSports',
                            'thumbnail_male': '/images/main-ui/pickers/Men/eSports.png',
                        }
                    ]
                },
                {
                    gender: 'Women',
                    sports: []
                },
                {
                    gender: 'Youth',
                    sports: []
                }
            ],

            apparel: [
                {
                    gender: 'Men',
                    sports: [
                        {
                            'active': 1,
                            'name': 'Apparel',
                            'thumbnail_male': '/images/main-ui/pickers/hoodie.png'
                        }
                    ]
                },
                {
                    gender: 'Women',
                    sports: [
                        {
                            'active': 1,
                            'name': 'Apparel',
                            'thumbnail_female': '/images/main-ui/pickers/hoodie.png'
                        }
                    ]
                },
                {
                    gender: 'Youth',
                    sports: []
                }
            ],

            // team accessories
            team_accessories: [
                {
                    gender: 'Men',
                    sports: [
                        {
                            'active': 1,
                            'name': 'Team Accessories',
                            'thumbnail_male': '/images/main-ui/pickers/flag.png'
                        }
                    ]
                },
                {
                    gender: 'Women',
                    sports: [
                        {
                            'active': 1,
                            'name': 'Team Accessories',
                            'thumbnail_female': '/images/main-ui/pickers/flag.png'
                        }
                    ]
                },
                {
                    gender: 'Youth',
                    sports: []
                }
            ],

            // quickturn category
            quickturn: [
                {
                    gender: 'Men',
                    sports: [
                        {
                            'active': 1,
                            'name': 'Quickturn',
                            'thumbnail_male': '/images/main-ui/pickers/Men/quickturn-teaser.png',
                            'quickturn_logo': '/images/sport-icons/quick-turn-new.svg'
                        }
                    ]
                },
                {
                    gender: 'Women',
                    sports: [
                        {
                            'active': 1,
                            'name': 'Quickturn',
                            'thumbnail_female': '/images/main-ui/pickers/Women/quickturn-teaser.png',
                            'quickturn_logo': '/images/sport-icons/quick-turn-new.svg'
                        }
                    ]
                },
                {
                    gender: 'Youth',
                    sports: []
                }
            ],
        };
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
