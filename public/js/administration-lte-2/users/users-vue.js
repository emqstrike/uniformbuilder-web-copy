new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: null,
            brands: {},
            dialog: true,
            error: false,
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
            pagination: {
                page: 1,
                rowsPerPage: 10,
            },
            panelVisible: false,
            roles: [
                {id: 'default', name: 'Default'},
                {id: 'ga', name: 'Graphics Artist'},
                {id: 'qa', name: 'QA'},
                {id: 'rep', name: 'Sales Rep'},
                {id: 'rep_manager', name: 'Manager'},
                {id: 'dealer', name: 'Dealer'},
                {id: 'coach', name: 'Coach'},
                {id: 'dev', name: 'Developer'},
                {id: 'executive', name: 'Executive'},
            ],
            salesReps: {},
            search: '',
            selected: [],
            types: ['administrator', 'normal'],
            user: {},
            userCache: {},
            users: [],
            userSlideOut: null,
            totalItems: 0,
        }
    },
    watch: {
        pagination: {
            handler: function() {
                this.getDataFromAPI().then(data => {
                    this.users = data.users;
                    this.totalItems = data.total;
                });
            },
            deep: true
        },
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
        pages: function() {
            if ((this.pagination.rowsPerPage == null) || (this.totalItems == null)) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
        },
    },
    mounted: function() {
        this.getDataFromAPI().then(data => {
            this.users = data.users;
            this.totalItems = data.total;
        });

        this.userSlideOut = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('user-slideout-container'),
            'padding': 1200,
            'tolerance': 70,
            'side': 'right'
        });

        this.getBrandsData();
        this.getSalesRepData();
    },
    methods: {
        cancel: function(user) {
            Object.assign(user, this.userCache);
            this.removeErrorMessage();
            this.togglePanel();
        },
        confirmPassword: function(event) {
            if (this.user.password != this.user.confirm_password) {
                this.$refs.confirmPassword.style.borderColor = '#dc3545';
                this.error = true;
            } else {
                this.removeErrorMessage();
            }
        },
        edit: function(user) {
            user.password = null;
            user.confirm_password = null;

            this.userCache = Object.assign({}, user);
            this.user = user;
            this.togglePanel();
        },
        getBrandsData: function() {
            axios.get(window.endpoint_version + '/brandings').then((response) => {
                if (response.data.success === true) {
                    this.brands = response.data.brandings;
                }
            });
        },
        getDataFromAPI: function()
        {
            this.dialog = true;

            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = this.pagination;

                axios.get('users/paginate?page=' + page).then((response) => {
                    if (response.data.success === true) {
                        let users = response.data.users.data;
                        const total = response.data.users.total;

                        setTimeout(() => {
                            this.dialog = false;
                            resolve({users, total});
                        }, 1000);
                    }
                });
            });
        },
        getSalesRepData: function() {
            axios.get('sales_reps').then((response) => {
                if (response.data.success === true) {
                    this.salesReps = response.data.sales_reps;
                }
            });
        },
        removeErrorMessage: function() {
            this.$refs.confirmPassword.style.borderColor = '#cccccc';
            this.error = false;
        },
        togglePanel: function() {
            this.userSlideOut.toggle();
        },

        updateUser: function(user) {
            var data = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                type: user.type,
                role: user.role,
                default_rep_id: user.default_rep_id,
                zip: user.zip,
                brand_id: user.brand_id
            };

            if ((user.password) && (user.password == user.confirm_password)) {
                data.password = user.password;
            }

            axios.post('user/update', data).then((response) => {
                if (response.data.success === true) {
                    this.userSlideOut.toggle();

                    new PNotify({
                        title: 'User updated',
                        type: 'success',
                        hide: true,
                        delay: 1000
                    });
                } else {
                    new PNotify({
                        title: 'User failed to update',
                        type: 'error',
                        hide: true,
                        delay: 1000
                    });
                }
            });
        }
    }
})