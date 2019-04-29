new Vue({
    el: '#application-container',
    data: function() {
        return {
            search: '',
            pagination: {
                page: 1,
                rowsPerPage: 10,
            },
            selected: [],
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Name', value: 'first_name'},
                {text: 'Account Type', value: 'type'},
                {text: 'Role', value: 'role'},
                {text: 'Email', value: 'email'},
                {text: 'Rep Name', value: 'rep_first_name'},
                {text: 'Last Login', value: 'last_login'},
                {text: 'Active Status', value: 'active'},
                {text: 'Actions', value: ''},
            ],
            users: [],
            userSlideOut: null,
            salesReps: {},
            brands: {},
            totalItems: 0,
            loading: true
        }
    },
    watch: {
        pagination: {
            handler () {
                this.getDataFromAPI().then(data => {
                    this.users = data.users;
                    this.totalItems = data.total;
                });
            },
            deep: true
        }
    },
    computed: {
        pages: function() {
            if ((this.pagination.rowsPerPage == null) || (this.totalItems == null)) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
        },
        computedPagination: {
            get: function() {
                return this.pagination
            },
            set: function(value) {
                this.$emit('update:pagination', value)
            }
        }
    },
    mounted: function() {
        this.getDataFromAPI().then(data => {
            this.users = data.users;
            this.totalItems = data.total;
        });
    },
    methods: {
        getDataFromAPI: function()
        {
            this.loading = true

            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = this.pagination;

                axios.get('users/paginate?page=' + page).then((response) => {
                    if (response.data.success === true) {
                        let users = response.data.users.data;
                        const total = response.data.users.total;

                        setTimeout(() => {
                            this.loading = false;
                            resolve({users, total});
                        }, 1000);
                    }
                });
            });
        },
    }
})