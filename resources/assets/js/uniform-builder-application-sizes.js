$(document).ready(function() {

	ub.funcs.setupApplicationSizes = function (obj) {

		var _obj = obj;

		/// preprocess
			
			_.each(_obj, function (entry) {

				entry.sizes = [];
				entry.parsedProperties = JSON.parse(entry.properties);

				_.each(entry.parsedProperties, function (parsedProperty) {

                    parsedProperty.sizes = [];
                    _.each(parsedProperty.size, function (size) {
                        parsedProperty.sizes.push({size: size});
                    });
				});

				// shortcut
				entry.sizes = entry.parsedProperties;

			});

			delete ub.data.application_size;

		/// end preprocess 

		ub.data.applicationSizes.configurations = _obj;

	};

	ub.data.applicationSizes = {

		// Values from backend
        configurations: [],
        getConfiguration: function (applicationType, location) {

            if (ub.data.applicationSizes.configurations.length === 0) { 

                ub.utilities.info('No Backend Size Configuration detected for ' + applicationType + ' - ' + ub.config.sport + ' / ' + ub.config.blockPattern + ' / ' + ub.config.option );
                return undefined; 
            };

            var _sizesObject = _.find(ub.data.applicationSizes.configurations, {uniform_application_type: ub.config.uniform_application_type});
            var _applicationTypes = _sizesObject.parsedProperties;
            var _applicationTypeResults = _.filter(_applicationTypes, {type: applicationType});
            var _locationResults = _.filter(_applicationTypeResults, function (applicationResult) {

                return _.contains(applicationResult.application_number, location);

            });

        	return _.first(_locationResults);
            
        },

        // Old values that we should retire soon
        items: [
                {
                    name: 'team_name',
                    sport: 'football',
                    sizes:  [
                                {
                                    type: 'embroidery',
                                    size: 1,
                                },
                                {
                                    type: 'tackle twill',
                                    size: 2,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'team_name',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'football',
                    sizes:  [
                                {
                                    type: 'tackle twill',
                                    size: 2.5,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'player_name',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 2.5,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'front_number',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                            ],
                    type: 'youth',
                },
                {
                    name: 'back_number',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                { 
                                    size: 10,
                                },
                            ],
                    type: 'youth',
                },
                {
                    name: 'shoulder_number',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'sleeve_number',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'numbers_extra',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },                    
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },                
                {
                    name: 'logo',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                }
                            ],
                },
                {
                    name: 'mascot',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                }
                            ],
                },
                {
                    name: 'mascot_2',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                },
                {
                    name: 'mascot_5',
                    sport: 'football',
                    sizes:  [
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                },
                {
                    name: 'mascot_wrestling',
                    sport: 'wrestling',
                    sizes:  [
                                {
                                    size: 5,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                },
                {
                    name: 'team_name',
                    sport: 'wrestling',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'text_wrestling',
                    sport: 'wrestling',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'text_baseball',
                    sport: 'baseball',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },

                // Baseball
                {
                    name: 'team_name',
                    sport: 'baseball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'baseball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'baseball',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'baseball',
                    applicationNumbers: [7,6],
                    sizes: [
                        {size: 2},
                        {size: 3},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'baseball',
                    applicationNumbers: [29, 26, 28, 27, 30, 31, 9, 10,1],
                    sizes: [
                        {size: 2},
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'baseball',
                    applicationNumbers: [5],
                    sizes: [
                        {size: 6},
                        {size: 8},
                        {size: 10},
                    ],
                },
                {
                    name: 'front_number',
                    sport: 'baseball',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'baseball',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                // End Baseball

                 {
                    name: 'text_baseball',
                    sport: 'fastpitch',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },

                // Fastpitch
                {
                    name: 'team_name',
                    sport: 'fastpitch',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'fastpitch',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'fastpitch',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'fastpitch',
                    applicationNumbers: [7,6],
                    sizes: [
                        {size: 2},
                        {size: 3},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'fastpitch',
                    applicationNumbers: [29, 26, 28, 27, 30, 31, 9, 10,1],
                    sizes: [
                        {size: 2},
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'fastpitch',
                    applicationNumbers: [5],
                    sizes: [
                        {size: 6},
                        {size: 8},
                        {size: 10},
                    ],
                },
                {
                    name: 'front_number',
                    sport: 'fastpitch',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'fastpitch',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                // End Fastpitch

                // Crew Socks 

                {
                    name: 'mascot',
                    sport: 'crew-socks',
                    applicationNumbers: [52, 53, 54, 55],
                    sizes: [
                        {size: 2.5},
                    ],
                },

                // End Crew Socks 

                // Hockey
                {
                    name: 'team_name',
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 2.5,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'shoulder_number',
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'hockey',
                    applicationNumbers: [6],
                    sizes: [
                        {size: 2.5},
                    ],
                },
                {
                    name: 'player_name',
                    sport: 'hockey',
                    applicationNumbers: [6],
                    sizes: [
                        {size: 2.5},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'hockey',
                    applicationNumbers: [9, 10, 33, 32],
                    sizes: [
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'sleeve_number',
                    sport: 'hockey',
                    applicationNumbers: [9, 10, 33, 32],
                    sizes: [
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'hockey',
                    applicationNumbers: [29, 26, 28, 27, 30, 31, 9, 10,1],
                    sizes: [
                        {size: 2},
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'front_number',
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'mascot',
                    applicationNumbers: [2, 5],
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'hockey',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                                {
                                    size: 12,
                                },

                            ],
                    type: 'adult',
                },
                // End Hockey

                // tech-teee

                 {
                    name: 'text_tech-tee',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'team_name',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'shoulder_number',
                    sport: 'tech-tee',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },

                // end tech-tee

                // compression

                 {
                    name: 'text_tech-tee',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'team_name',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'shoulder_number',
                    sport: 'compression',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },

                // end compression

                /// Volleyball
                {
                    name: 'text_tech-tee',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                },
                {
                    name: 'team_name',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'shoulder_number',
                    sport: 'volleyball',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },

                /// End Volleyball

                // cinch-sack

                {
                    name: 'team_name',
                    sport: 'cinch-sack',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },

                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'cinch-sack',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },

                            ],
                    factory: 'PMP'
                },
                {
                    name: 'mascot',
                    applicationNumbers: [56, 57],
                    sport: 'cinch-sack',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 6,
                                },
                                {
                                    size: 7,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    applicationNumbers: [58, 59],
                    sport: 'cinch-sack',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'cinch-sack',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'cinch-sack',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },                            
                            ],
                    type: 'adult',
                },

                // end cinch-sack


                // team-short

                {
                    name: 'team_name',
                    sport: 'team-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },

                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'team-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },

                            ],
                    factory: 'PMP'
                },
                {
                    name: 'mascot',
                    applicationNumbers: [56, 57],
                    sport: 'team-short',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 6,
                                },
                                {
                                    size: 7,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    applicationNumbers: [58, 59],
                    sport: 'team-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'team-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'team-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },                            
                            ],
                    type: 'adult',
                },

                // end team-short


                // signature-coaches-short

                {
                    name: 'team_name',
                    sport: 'signature-coaches-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },

                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'signature-coaches-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },

                            ],
                    factory: 'PMP'
                },
                {
                    name: 'mascot',
                    applicationNumbers: [56, 57],
                    sport: 'signature-coaches-short',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 6,
                                },
                                {
                                    size: 7,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    applicationNumbers: [58, 59],
                    sport: 'signature-coaches-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'signature-coaches-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'signature-coaches-short',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },                            
                            ],
                    type: 'adult',
                },

                // end signature-coaches-short

                // Basketball
                {
                    name: 'team_name',
                    sport: 'basketball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'basketball',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 2.5,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'basketball',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'basketball',
                    applicationNumbers: [1, 6, 7, 31, 30],
                    sizes: [
                        {size: 1},
                        {size: 2},
                        {size: 3},
                        {size: 4},
                    ],
                },
                
                {
                    name: 'mascot',
                    sport: 'basketball',
                    applicationNumbers: [5],
                    sizes: [
                        {size: 6},
                        {size: 8},
                        {size: 10},
                    ],
                },
                {
                    name: 'front_number',
                    sport: 'basketball',
                    sizes:  [
                                {
                                    size: 4,
                                },
                                {
                                    size: 6,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'basketball',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                // End Basketball


                // Lacrosse
                {
                    name: 'team_name',
                    sport: 'lacrosse',
                    sizes:  [
                                {
                                    size: 1,
                                },
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'lacrosse',
                    sizes:  [
                                {
                                    size: 2.5,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'lacrosse',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'mascot',
                    sport: 'lacrosse',
                    applicationNumbers: [1,6],
                    sizes: [
                        {size: 1},
                        {size: 2},
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'lacrosse',
                    applicationNumbers: [7, 31, 30],
                    sizes: [
                        {size: 1},
                        {size: 2},
                        {size: 3},
                        {size: 4},
                    ],
                },
                {
                    name: 'mascot',
                    sport: 'lacrosse',
                    applicationNumbers: [5, 2],
                    sizes: [
                        {size: 6},
                        {size: 8},
                        {size: 10},
                    ],
                },
                {
                    name: 'front_number',
                    sport: 'lacrosse',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'lacrosse',
                    sizes:  [
                                {
                                    size: 6,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },
                // End Lacrosse

                // defaults 

                {
                    name: 'team_name',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'player_name',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                            ],
                    factory: 'PMP'
                },
                {
                    name: 'sleeve_number',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'shoulder_number',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                            ],
                    factory: 'BLB',
                },
                {
                    name: 'front_number',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                            ],
                    type: 'adult',
                },
                {
                    name: 'back_number',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                            ],
                    type: 'adult',
                },                
                {
                    name: 'mascot',
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                                {
                                    size: 5,
                                },
                                {
                                    size: 8,
                                },
                                {
                                    size: 10,
                                },
                    ],
                    factory: 'BLB',
                },
                {
                    name: '', // Dynamically Added Applications, For Free Form Tool Such as Wrestling, etc...
                    sport: 'default',
                    sizes:  [
                                {
                                    size: 2,
                                },
                                {
                                    size: 3,
                                },
                                {
                                    size: 4,
                                },
                    ],
                    factory: 'BLB',
                },
               

                // end defaults

            ],
            getSizes: function (sport, type, locationNumber) {

                if (sport === "football 2017") { sport = "football"; }

                var _result = _.filter(this.items, {sport: sport, name: type});

                if (typeof _result === "undefined") {
                    ub.utilities.warn(type + ' Sizes for ' + type + ' not found.' );
                }

                _result = _.find(_result, function (item) {
                    return _.contains(item.applicationNumbers, locationNumber);
                });

                if (typeof _result === "undefined") {

                    ub.utilities.warn('Location #' + locationNumber + ' for ' + type + ' in ' + sport + ' not found. Using default.');

                    _result = _.find(this.items, {sport: 'default', name: type});

                }

                return _result;

            }
    };

    ub.data.applicationSizesPant = {

        items: [

        // Baseball
            {
                name: 'mascot',
                sport: 'baseball',
                applicationNumbers: [37, 38],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            }
                ],
            },
            {
                name: 'mascot',
                sport: 'baseball',
                applicationNumbers: [39, 40],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                ],
            },
            {
                name: 'mascot',
                sport: 'baseball',
                applicationNumbers: [15],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 1.75,
                            },
                ],
            },

            // Fast Pitch

            {
                name: 'mascot',
                sport: 'fastpitch',
                applicationNumbers: [37, 38],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            }
                ],
            },
            {
                name: 'mascot',
                sport: 'fastpitch',
                applicationNumbers: [39, 40],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                ],
            },
            {
                name: 'mascot',
                sport: 'fastpitch',
                applicationNumbers: [15],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 1.75,
                            },
                ],
            },

            // Volleyball
            {
                name: 'mascot',
                sport: 'volleyball',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            }

                ],
            },

            // Signature Coaches Short (Apparel)
            {
                name: 'mascot',
                sport: 'signature-coaches-short',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            }

                ],
            },


            // 2017 Team Short with Pockets (Apparel)
            {
                name: 'mascot',
                sport: 'team-short',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            }

                ],
            },


            // Soccer
            {
                name: 'mascot',
                sport: 'soccer',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
            },

            // Basketball

            {
                name: 'mascot',
                sport: 'basketball',
                applicationNumbers: [16, 17],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            }

                ],
            },

             {
                name: 'front_number',
                sport: 'basketball',
                applicationNumbers: [12,13,16,17],
                sizes:  [
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            }
                ],
            },

            // Lacrosse

            {
                name: 'mascot',
                sport: 'lacrosse',
                applicationNumbers: [12,13,16,17],
                sizes:  [
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            }
                ],
            },
            {
                name: 'front_number',
                sport: 'lacrosse',
                applicationNumbers: [12,13,16,17],
                sizes:  [
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            }
                ],
            },
            {
                name: 'back_number',
                sport: 'lacrosse',
                applicationNumbers: [12,13,16,17],
                sizes:  [
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            }
                ],
            },
            {
                name: 'shoulder_number',
                sport: 'lacrosse',
                applicationNumbers: [12,13,16,17],
                sizes:  [
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            }
                ],
            },

            // football 2017
            {
                name: 'mascot',
                sport: 'football 2017',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
                
            },
            {
                name: 'mascot',
                sport: 'game-day-coaches-jackets',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
            },
            
            // Field Hockey
            {
                name: 'mascot',
                sport: 'field-hockey',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
            },

            // Compression Pant (Apparel)
            {
                name: 'mascot',
                sport: 'compression-pant',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            }

                ],
            },
            {
                name: 'mascot',
                sport: 'wrestling-compression-shorts',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
            },
            {
                name: 'mascot',
                sport: 'wrestling-2018',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
            },
            {
                name: 'mascot',
                sport: 'tennis',
                applicationNumbers: [70],
                sizes:  [
                            {
                                size: 1,
                            },
                            {
                                size: 2,
                            },
                            {
                                size: 3,
                            },
                            {
                                size: 4,
                            },
                            {
                                size: 5,
                            },
                            {
                                size: 6,
                            },
                            {
                                size: 7,
                            },
                            {
                                size: 8,
                            },
                            {
                                size: 9,
                            },
                            {
                                size: 10,
                            },
                            {
                                size: 11,
                            },
                            {
                                size: 12,
                            }
                ],
            },


        ], 
        getSize: function (applicationType, sport, id) {

            var _result = _.filter(this.items, {name: applicationType, sport: sport});
            var _object = undefined;

            if (typeof _result === "undefined") {
                ub.utilities.warn('Application Sizes for ' + applicationType + ' in ' + sport + ' is not found!');
            }

            _object = _.find(_result, function (item) {

                return _.contains(item.applicationNumbers, id);

            });

            if (sport === "volleyball")                         { return _result[0]; }
            if (sport === "fastpitch")                          { return _result[0]; }
            if (sport === "baseball")                           { return _result[0]; }
            if (sport === "team-short")                         { return _result[0]; }
            if (sport === "signature-coaches-short")            { return _result[0]; }
            if (sport === "soccer")                             { return _result[0]; }
            if (sport === "lacrosse")                           { return _result[0]; }
            if (sport === "football 2017")                      { return _result[0]; }
            if (sport === "game-day-coaches-jackets")           { return _result[0]; }
            if (sport === "field-hockey")                       { return _result[0]; }
            if (sport === "compression-pant")                   { return _result[0]; }
            if (sport === "wrestling-compression-shorts")       { return _result[0]; }
            if (sport === "basketball")                         { return _result[0]; }
            if (sport === "wrestling-2018")                     { return _result[0]; }
            if (sport === "tennis")                             { return _result[0]; }

            if (typeof _object === "undefined") {

                ub.utilities.warn('Mascot sizes for ' + sport + ' #' + id  + ' not found.');

            }

            return _object;

        }

    }

    ub.data.mascotSizesFromBackend = {

        items: [
            'Football 2017',
            'Wrestling Compression Shorts',
        ],

        isValid: function (sport) {

            return _.find(this.items, sport) !== "undefined";

        }

    }

});