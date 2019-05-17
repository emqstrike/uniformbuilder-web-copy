new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: null,
            dialog: true,
            errors: [],
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Code', value: 'code'},
                {text: 'Page Name', value: 'page_name'},
                {text: 'Brand', value: 'brand'},
                {text: 'Action', value: ''}
            ],
            page: {},
            pageCache: {},
            pageDialog: false,
            pages: [],
            pagination: {
                page: 1,
                rowsPerPage: 10,
            },
            search: "",
            searchPageFilter: 'name',
            totalItems: 0,
        }
    },
    mounted() {
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
        cancel(page) {
            Object.assign(page, this.pageCache);
            this.pageDialog = false;
            this.errors = [];
        },
        clearSearchPages() {
            this.search = "";
            this.searchPageFilter = "name";
            this.pagination.page = 1;
            this.getData();
        },
        createPage() {
            this.action = 'add';
            this.pageDialog = true;
            this.page = {};
        },
        edit(page) {
            this.action = "edit";
            this.page = page;
            this.pageCache = Object.assign({}, page);
            this.pageDialog = true;
        },
        getData() {
            this.getDataFromAPI().then(data => {
                this.pages = data.pages;
                this.totalItems = data.total;
            });
        },
        getDataFromAPI() {
            this.dialog = true;

            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = this.pagination;

                var url = "pages/get_by_brand/" + window.application_brand + "?page=" + page;

                if (this.search) {
                    if (this.searchPageFilter == 'name') {
                        url += "&name=" + this.search;
                    } else if (this.searchPageFilter == 'code') {
                        url += "&code=" + this.search;
                    } else if (this.searchPageFilter == 'id') {
                        url += "&id=" + this.search;
                    }
                }

                axios.get(url).then((response) => {
                    if (response.data.success === true) {
                        let pages = response.data.pages.data;
                        const total = response.data.pages.total;

                        setTimeout(() => {
                            this.dialog = false;
                            resolve({pages, total});
                        }, 1000);
                    }
                });
            });
        },
        remove(page) {
            let remove = confirm('Are you sure you want to remove this page?');

            if (remove === true) {
                this.dialog = true;

                axios.get('page/' + page.item.id + '/delete').then((response) => {
                    if (response.data.success === true) {
                        this.$delete(this.pages, page.index);

                        setTimeout(() => {
                            this.dialog = false;

                            this.getData();

                            new PNotify({
                                title: 'Page removed',
                                type: 'success',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.dialog = false;

                            new PNotify({
                                title: 'Page failed to remove',
                                type: 'error',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    }
                });
            }
        },
        savePage(page) {
            this.dialog = true;

            axios.post('page', page).then((response) => {
                if (response.data.success === true) {
                    setTimeout(() => {
                        this.dialog = this.pageDialog = false;

                        new PNotify({
                            title: 'Page saved',
                            type: 'success',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                } else if ((response.data.success === false) && (response.data.errors.length > 0)) {
                    setTimeout(() => {
                        this.dialog = false;
                        this.errors = response.data.errors;
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: 'Page failed to save',
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        },
        searchPage() {
            this.pagination.page = 1;
            this.getData();
        },
        updatePage(page) {
            this.dialog = true;

            axios.patch('page/' + page.id + '/update', page).then((response) => {
                if (response.data.success === true) {
                    setTimeout(() => {
                        this.dialog = this.pageDialog = false;
                        this.errors = [];

                        new PNotify({
                            title: 'Page updated',
                            type: 'success',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                } else if ((response.data.success === false) && (response.data.errors.length > 0)) {
                    setTimeout(() => {
                        this.dialog = false;
                        this.errors = response.data.errors;
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: 'Page failed to update',
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        }
    }
});