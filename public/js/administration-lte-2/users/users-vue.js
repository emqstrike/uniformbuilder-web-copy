Vue.component('Multiselect', VueMultiselect.default)

new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: null,
            allowedPages: [],
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
            totalItems: 0,
            types: ['administrator', 'normal'],
            user: {},
            userCache: {},
            users: [],
            userDialog: false,
            v1Pages: []
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
        getAllowedPages: function() {
            let allowedPages = [];
            let role = this.roles.find(role => role.id === this.user.role);

            if (role.hasOwnProperty('allowed_pages')) {
                let pages = JSON.parse(role.allowed_pages);

                this.v1Pages.forEach(function(v1Page) {
                    if (pages.indexOf(v1Page) < 0) {
                        allowedPages.push(v1Page);
                    }
                });

                return allowedPages;
            } else {
                return this.v1Pages;
            }
        },
        getDefaultAllowedPages: function() {
            let role = this.roles.find(role => role.id === this.user.role);

            if (role.hasOwnProperty('allowed_pages')) {
                return JSON.parse(role.allowed_pages);
            }

            return [];
        },
        pages: function() {
            if ((this.pagination.rowsPerPage == null) || (this.totalItems == null)) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
        },
    },
    created() {
        this.getDataFromAPI().then(data => {
            this.users = data.users;
            this.totalItems = data.total;
        });

        this.getBrandsData();
        this.getPageRulesData();
        this.getPagesData();
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
        cancel: function(user) {
            this.errors = [];
            Object.assign(user, this.userCache);
            this.togglePanel();
        },
        clearSearchUsers: function() {
            this.search = "";

            this.getDataFromAPI().then(data => {
                this.users = data.users;
                this.totalItems = data.total;
            });
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
            this.userCache = Object.assign({}, user);
            this.user = user;

            this.user.password  = this.user.confirm_password = null; 

            this.user.allowed_pages = JSON.parse(this.user.allowed_pages);
            this.user.limited_access = JSON.parse(this.user.limited_access);

            if (! this.user.role) {
                this.user.role = this.roles[0].id;
            }

            if (! this.user.type) {
                this.user.type = this.types[0];
            }

            if (! this.user.brand_id) {
                this.user.brand_id = this.brands[0].id;
            }

            this.action = 'edit';
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

                var url = "users/paginate?page=" + page;

                if (this.search) {
                    url += "&name=" + this.search;
                }

                axios.get(url).then((response) => {
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
        getPageRulesData() {
            const self = this;

            axios.get('page_rules').then((response) => {
                if (response.data.success == true) {
                    response.data.page_rules.forEach(function(pageRule) {
                        let role = self.roles.find(role => role.id === pageRule.role);

                        if ((Object.entries(role).length > 0) && (role.constructor == Object)) {
                            Vue.set(role, 'allowed_pages', pageRule.allowed_pages);
                        }
                    });
                }
            });
        },
        getPagesData: function() {
            let pages = [];

            axios({
                method: 'get',
                url: '/administration/pages/v1-0',
                baseURL:  window.app_url
            }).then((response) => {
                if (response.status == 200) {
                    response.data.forEach(function(page) {
                        pages.push(page.code);
                    });
                }
            });

            this.v1Pages = pages;
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
        searchUsers: function() {
            this.pagination.page = 1;

            this.getDataFromAPI().then(data => {
                this.users = data.users;
                this.totalItems = data.total;
            });
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
                };

                if (this.user.password != null) {
                    data.password = this.user.password;
                }

                axios.post('user/update', data).then((response) => {
                    if (response.data.success === true) {
                        var updateData = {
                            user_id: this.user.id,
                            allowed_pages: this.user.allowed_pages,
                            limited_access: this.user.limited_access,
                        };
                        
                        this.updateUserAllowedPages(updateData).then(data => {
                            if (data.success === true) {
                                let user = this.users.find(user => user.id === updateData.user_id);
                                Vue.set(user, 'allowed_pages', data.allowed_pages);
                                Vue.set(user, 'limited_access', data.limited_access);

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
                            }
                        });
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
        updateUserAllowedPages: function(data)
        {
            return new Promise((resolve, reject) => {
                axios.post('user/allowed_pages', data).then((response) => {
                    if (response.data.success === true) {
                        let success = true;
                        let allowed_pages = response.data.allowed_pages;
                        let limited_access = response.data.limited_access;

                        setTimeout(() => {
                            resolve({success, allowed_pages, limited_access});
                        }, 1000);
                    }
                });
            });
        },
        validateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
})