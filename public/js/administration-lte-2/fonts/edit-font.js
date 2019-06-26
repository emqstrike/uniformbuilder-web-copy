Vue.component('Multiselect', VueMultiselect.default)

new Vue({
    el: '#application-container',
    data: function() {
        return {
            activeMenu: 'general-details',
            blockPatterns: [],
            brands: [],
            font: font,
            fontLayer: {
                application_number: 0,
                inner_stroke: 0,
                outer_stroke: 0,
                outputSize: 0,
                x_offset: 0,
                x_scale: 0,
                y_offset: 0,
                y_scale: 0
            },
            fontTypes: [
                {value: 'default', description: 'Default'},
                {value: 'base', description: 'Base (IN) --- a child of a "default"-type font'},
                {value: 'outline', description: 'Outline (OUT) --- a child of a "default"-type font'},
                {value: 'accent', description: 'Accent (3D) --- a child of a "default"-type font'},
                {value: 'tail sweeps', description: 'Tail Sweep --- a child of a "default"-type font'},
            ],
            perspectives: ['front', 'back', 'left', 'right'],
            sports: [],
        }
    },
    created() {
        this.font.sports = JSON.parse(this.font.sports);

        if (this.font.block_patterns) {
            this.font.block_patterns = this.font.block_patterns.replace(/['"]+/g, '').split(",");
        }

        if (this.font.font_size_table) {
            let fontSizeTable = this.font.font_size_table.substring(1, this.font.font_size_table.length - 1);
            this.font.font_size_table = JSON.parse(fontSizeTable);
        }

        if (this.font.font_size_tables) {
            let fontSizeTables = this.font.font_size_tables;
            this.font.font_size_tables = JSON.parse(fontSizeTables);
        }

        if (this.font.sublimated_font_size_tables) {
            let sublimatedFontSizeTables = this.font.sublimated_font_size_tables;
            this.font.sublimated_font_size_tables = JSON.parse(sublimatedFontSizeTables);
        }

        this.getBlockPatternsData();
        this.getBrandingsData();
        this.getSportsData();
    },
    computed: {
        blockPatternOptions() {
            let blockPatterns = [];

            this.blockPatterns.forEach((blockPattern) => {
                if (Object.keys(this.font).length !== 0) {
                    if ((this.font.sports.indexOf(blockPattern.uniform_category) >= 0) && (blockPatterns.indexOf(blockPattern.name)  < 0)) {
                        blockPatterns.push(blockPattern.name);
                    }
                }
            });

            return blockPatterns;
        },
        blockPatternOptionOptions() {
            let blockPatternOptions = [];

            this.blockPatterns.forEach((blockPattern) => {
                if ((Object.keys(this.font).length !== 0) && (this.font.sports.indexOf(blockPattern.uniform_category) >= 0)) {
                    let _blockPatternOption = JSON.parse(blockPattern.neck_options);

                    try {
                        Object.keys(_blockPatternOption).forEach((key) => {
                            if (blockPatternOptions.indexOf(_blockPatternOption[key].name) < 0) {
                                blockPatternOptions.push(_blockPatternOption[key].name);
                            }
                        });
                    } catch (e) {
                        return false;
                    }
                }
            });

            return blockPatternOptions;
        },
        sportsOptions() {
            let sports = [];

            this.sports.forEach((sport) => {
                if (sport.name != '') {
                    sports.push(sport.name);
                }
            });

            return sports;
        }
    },
    methods: {
        addSublimatedLayer(perspective) {
            var _perspective = this.font.sublimated_font_size_tables.filter(obj => {
                return obj.perspective == perspective;
            });

            _perspective[0].sizes.unshift(this.fontLayer);
        },
        addTwillLayer(perspective) {
            var _perspective = this.font.font_size_tables.filter(obj => {
                return obj.perspective == perspective;
            });

            _perspective[0].sizes.unshift(this.fontLayer);
        },
        getBlockPatternsData() {
            axios.get('block_patterns').then((response) => {
                if (response.data.success === true) {
                    this.blockPatterns = response.data.block_patterns;
                }
            });
        },
        getBrandingsData() {
            axios.get('v1-0/brandings').then((response) => {
                if (response.data.success === true) {
                    response.data.brandings.forEach((brand) => {
                        this.brands.push(brand.site_name.toLowerCase().replace(/\s/g, ''));
                    });
                }
            });
        },
        getSportsData() {
            axios.get('categories').then((response) => {
                if (response.data.success === true) {
                    response.data.categories.sort((firstCategory, secondCategory) => {
                        if (firstCategory.name < secondCategory.name) {
                            return -1;
                        } 

                        if (firstCategory.name > secondCategory.name) {
                            return 1;
                        } 

                        return 0;
                    });

                    this.sports = response.data.categories;
                }
            });
        },
        removeSublimatedLayer(index, perspective) {
            var _perspective = this.font.sublimated_font_size_tables.filter(obj => {
                return obj.perspective == perspective;
            });

            Vue.delete(_perspective[0].sizes, index);
        },
        removeTwillLayer(index, perspective) {
            var _perspective = this.font.font_size_tables.filter(obj => {
                return obj.perspective == perspective;
            });

            Vue.delete(_perspective[0].sizes, index);
        },
        toggleMenu(menu) {
            this.activeMenu = menu;
        },
    }
});