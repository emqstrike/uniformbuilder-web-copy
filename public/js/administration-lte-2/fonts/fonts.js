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
        }
    }
})