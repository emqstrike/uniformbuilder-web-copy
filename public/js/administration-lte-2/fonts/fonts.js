new Vue({
    el: '#application-container',
    data: function() {
        return {
            dialog: false,
            fonts: [],
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
            sportsFilter: [],
            totalItems: 0,
        };
    },
    created() {
       this.getData();
    },
    computed: {
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
        sample(props, event) {
            if (event.target.className == "v-input--selection-controls__ripple accent--text") {
                props.selected = ! props.selected
            }
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

                axios.get('fonts/filter/all/all?page=' + page).then((response) => {
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
        getValue(value) {
            if (value == true) {
                return "Yes";
            }

            return "No";
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
        toggleAll () {
            if (this.selected.length) {
                this.selected = [];
            } else {
                this.selected = this.fonts.slice();
            }
        },
    }
})