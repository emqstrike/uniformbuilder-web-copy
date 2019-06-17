Vue.component('Multiselect', VueMultiselect.default)

new Vue({
    el: '#application-container',
    data: function() {
        return {
            activeMenu: 'general-details',
            blockPatterns: [],
            brands: [],
            navigationDrawer: null,
            dialog: false,
            font: {},
            fontCache: {},
            fontDialog: false,
            fonts: [],
            fontTypes: [
                {value: 'default', description: 'Default'},
                {value: 'base', description: 'Base (IN) --- a child of a "default"-type font'},
                {value: 'outline', description: 'Outline (OUT) --- a child of a "default"-type font'},
                {value: 'accent', description: 'Accent (3D) --- a child of a "default"-type font'},
                {value: 'tail sweeps', description: 'Tail Sweep --- a child of a "default"-type font'},
            ],
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Tail Sweep', value: 'tail_sweep'},
                {text: 'Script', value: 'script'},
                {text: 'Block Font', value: 'block_font'},
                {text: 'Sports', value: 'sports'},
                {text: 'Block Patterns', value: 'block_patterns'},
                {text: 'Brand', value: 'brand'},
                {text: 'Last Updated', value: 'last_updated'},
                {text: 'Active Status', value: 'status'},
                {text: 'Actions', value: ''},
            ],
            pagination: {
                page: 1,
                rowsPerPage: 10,
            },
            search: "",
            selected: [],
            selectedBrandFilter: 'all',
            selectedSportFilter: 'all',
            sports: [],
            totalItems: 0,
        };
    },
    created() {
        this.getData();
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

                    Object.keys(_blockPatternOption).forEach((key) => {
                        if (blockPatternOptions.indexOf(_blockPatternOption[key].name) < 0) {
                            blockPatternOptions.push(_blockPatternOption[key].name);
                        }
                    });
                }
            });

            return blockPatternOptions;
        },
        computedPagination: {
            get: function() {
                return this.pagination
            },
            set: function(value) {
                this.$emit('update:pagination', value)
            }
        },
        paginationPages: function() {
            if ((this.pagination.rowsPerPage == null) || (this.totalItems == null)) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
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
    watch: {
        pagination: {
            handler: function() {
                this.getData();
            },
            deep: true
        },
    },
    methods: {
        cancel(font) {
            Object.assign(font, this.fontCache);
            this.togglePanel();
        },
        clone(font) {
            this.dialog = true;

            axios.post('font/duplicate', {id: font.id}).then((response) => {
                if (response.data.success === true) {
                    setTimeout(() => {
                        this.getData();

                        new PNotify({
                            title: 'Font is now cloned',
                            type: 'success',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: 'Failed to clone font',
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        },
        edit(font) {
            this.fontCache = Object.assign({}, font);
            this.font = font;

            this.font.sports = JSON.parse(this.font.sports);

            if (this.font.block_patterns) {
                this.font.block_patterns = this.font.block_patterns.replace(/['"]+/g, '').split(",");
            }

            if (this.font.block_pattern_options) {
                this.font.block_pattern_options = this.font.block_pattern_options.replace(/['"]+/g, '').split(",");
            }

            this.togglePanel();
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
        getData() {
            this.getFontsDataFromAPI().then(data => {
                this.fonts = data.fonts;
                this.totalItems = data.total;
            });
        },
        getFontsDataFromAPI() {
            this.dialog = true;

            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = this.pagination;

                axios.get('fonts/filter/' + this.selectedSportFilter + '/' + this.selectedBrandFilter + '?page=' + page).then((response) => {
                    if (response.data.success === true) {
                        let fonts = response.data.fonts.data;
                        const total = response.data.fonts.total;

                        setTimeout(() => {
                            this.dialog = false;
                            resolve({fonts, total});
                        }, 1000);
                    }
                });
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
        getValue(value) {
            if (value == true) {
                return "Yes";
            }

            return "No";
        },
        filter() {
            this.pagination.page = 1;
            this.getData();
        },
        remove(font) {
            this.removeMultipleFonts({id: [font.id]});
        },
        removeMultipleFonts(fonts = []) {
            let _fonts = null;
            let ids = [];

            if ((fonts.length == 0) && (this.selected.length > 0)) {
                this.selected.forEach((font) => {
                    ids.push(font.id);
                });

                _fonts = {
                    id: ids
                };
            } else {
                _fonts = fonts;
            }

            if ((_fonts.hasOwnProperty('id')) && (_fonts.id.length > 0)) {
                this.dialog = true;
                let remove = confirm('Are you sure you want to remove this font?');

                if (remove === true) {
                    axios.post('font/delete_fonts', _fonts).then((response) => {
                        if (response.data.success === true) {
                            setTimeout(() => {
                                this.getData();

                                new PNotify({
                                    title: 'Font is now deleted',
                                    type: 'success',
                                    hide: true,
                                    delay: 1000
                                });
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                this.dialog = false;

                                new PNotify({
                                    title: 'Failed to delete font',
                                    type: 'error',
                                    hide: true,
                                    delay: 1000
                                });
                            }, 1000);
                        }
                    });
                }
            }
        },
        select(props, event) {
            if (event.target.className == "v-input--selection-controls__ripple accent--text") {
                props.selected = ! props.selected
            }
        },
        toggleActiveStatus(font) {
            this.dialog = true;

            var _url = successMesage = errorMessage = null;

            if (font.active) {
                _url = 'font/disable';
                successMessage = "Font is now disabled";
                errorMessage =  "Failed to disable font";
            } else {
                _url = 'font/enable';
                successMessage = "Font is now enabled";
                errorMessage = "Failed to enable font";
            }

            axios.post(_url, {id: font.id}).then((response) => {
                if (response.data.success === true) {
                    font.active = ! font.active;

                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: successMessage,
                            type: 'success',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: errorMessage,
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        },
        toggleAll() {
            if (this.selected.length) {
                this.selected = [];
            } else {
                this.selected = this.fonts.slice();
            }
        },
        toggleMenu(menu) {
            this.activeMenu = menu;
            this.navigationDrawer = ! this.navigationDrawer;
        },
        togglePanel() {
            this.fontDialog = ! this.fontDialog;
        }
    }
})