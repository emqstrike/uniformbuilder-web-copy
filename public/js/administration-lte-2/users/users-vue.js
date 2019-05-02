new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: null,
            brands: {},
            dialog: true,
            errors: [],
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
            userDialog: false,
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

        this.getBrandsData();
        this.getSalesRepData();
    },
    methods: {
        add: function() {
            this.action = 'add';
            this.user = {
                role: this.roles[0].id,
                type: this.types[0],
                brand_id: this.brands[0].id
            };
            this.togglePanel();
        },
        cancel: function() {
            this.errors = [];
            Object.assign(this.user, this.userCache);
            this.togglePanel();
        },
        createUser: function() {
            if (! this.hasErrors()) {
                this.dialog = true;

                var data = {
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    email: this.user.email,
                    type: this.user.type,
                    role: this.user.role,
                    default_rep_id: this.user.default_rep_id,
                    zip: this.user.zip,
                    brand_id: this.user.brand_id,
                    password: this.user.password
                };

                axios.post('user', data).then((response) => {
                    if (response.data.success === true) {
                        setTimeout(() => {
                            this.dialog = false;
                            this.togglePanel();

                            new PNotify({
                                title: 'User created',
                                type: 'success',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    }  else {
                        setTimeout(() => {
                            this.dialog = false;

                            new PNotify({
                                title: 'User failed to create',
                                type: 'error',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    }
                });
            }
        },
        edit: function(user) {
            user.password  = user.confirm_password = null; 

            if (! user.role) {
                user.role = this.roles[0].id;
            }

            if (! user.type) {
                user.type = this.types[0];
            }

            if (! user.brand_id) {
                user.brand_id = this.brands[0].id;
            }

            this.action = 'edit';
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
        hasErrors: function(event) {
            this.errors = [];

            if (! this.user.first_name) {
                this.errors.push('First name required');
            }

            if (! this.user.last_name) {
                this.errors.push('Last name required');
            }

            if (! this.user.email) {
                this.errors.push('Email address required');
            } else {
                if (! this.validateEmail(this.user.email)) {
                    this.errors.push('Valid email required');
                }
            }

            if (this.user.password != this.user.confirm_password) {
                this.errors.push('Password do not match');
            }

            if (this.errors.length > 0) {
                return true;
            }

            return false;
        },
        toggleActiveStatus: function(user) {
            this.dialog = true;

            var _url = successMesage = errorMessage = null;

            if (user.active) {
                _url = 'user/disable';
                successMessage = "User is now disabled";
                errorMessage =  "Failed to disable user";
            } else {
                _url = 'user/enable';
                successMessage = "User is now enabled";
                errorMessage = "Failed to enable user";
            }

            axios.post(_url, {id: user.id}).then((response) => {
                if (response.data.success === true) {
                    user.active = ! user.active;

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
        togglePanel: function() {
            this.userDialog = ! this.userDialog;
            // this.userSlideOut.toggle();
        },
        updateUser: function() {
            if (! this.hasErrors()) {
                this.dialog = true;

                var data = {
                    id: this.user.id,
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    email: this.user.email,
                    type: this.user.type,
                    role: this.user.role,
                    default_rep_id: this.user.default_rep_id,
                    zip: this.user.zip,
                    brand_id: this.user.brand_id,
                    password: this.user.password
                };

                axios.post('user/update', data).then((response) => {
                    if (response.data.success === true) {
                        setTimeout(() => {
                            this.dialog = false;
                            this.togglePanel();

                            new PNotify({
                                title: 'User updated',
                                type: 'success',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.dialog = false;

                            new PNotify({
                                title: 'User failed to update',
                                type: 'error',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    }
                });
            }
        },
        validateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
})