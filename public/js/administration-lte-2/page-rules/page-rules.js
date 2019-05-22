Vue.component('Multiselect', VueMultiselect.default)

new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: "",
            dialog: true,
            errors: [],
            headers: [
                {text: 'Type', value: 'type'},
                {text: 'Role', value: 'role'},
                {text: 'Action', value: 'action'},
            ],
            pages: [],
            pageRule: {},
            pageRuleCache: {},
            pageRuleDialog: false,
            pageRules: [],
            roles: [],
            types: ['administrator', 'normal'],
        }
    },
    mounted() {
        this.getDataFromAPI();
        this.getPagesData();
        this.getRoles();
    },
    computed: {
        availableRoles() {
            let roles = [];
            let usedAdminRoles = [];
            let usedNormalRoles = [];

            this.pageRules.forEach(function(pageRule) {
                if (pageRule.type == 'administrator') {
                    usedAdminRoles.push(pageRule.role);
                } else if (pageRule.type == 'normal') {
                    usedNormalRoles.push(pageRule.role);
                }
            });

            let type = this.pageRule.type;

            this.roles.forEach(function(role) {
                if ((type == 'administrator') && (usedAdminRoles.indexOf(role.code) < 0)) {
                    roles.push(role);
                } else if ((type == 'normal') && (usedNormalRoles.indexOf(role.code) < 0)) {
                    roles.push(role);
                }
            });

            return roles;
        },
        getAllowedPages() {
            let allowedPages = [];

            if (this.pageRule.hasOwnProperty('allowed_pages')) {
                let pageRulePages = this.pageRule.allowed_pages;

                this.pages.forEach(function(page) {
                    if (pageRulePages.indexOf(page.code) < 0) {
                        allowedPages.push(page.code);
                    }
                });
            } else {
                this.pages.forEach(function(page) {
                    allowedPages.push(page.code);
                });
            }

            return allowedPages;
        },
    },
    methods: {
        add(pagRule) {
            this.pageRule = {
                type: this.types[0], 
                role: this.roles[0].code,
                brand: window.application_brand
            };
            
            this.action = 'add';
            this.togglePanel();
        },
        cancel(pageRule) {
            Object.assign(pageRule, this.pageRuleCache);
            this.togglePanel();
        },
        edit(pageRule) {
            this.action = 'edit';
            this.pageRule = pageRule;
            this.pageRuleCache = Object.assign({}, pageRule);
            this.pageRule.allowed_pages = JSON.parse(this.pageRule.allowed_pages);
            this.togglePanel();
        },
        getDataFromAPI() {
            this.dialog = true;

            return new Promise((resolve, reject) => {
                axios.get('page_rules/brand/' + window.application_brand).then((response) => {
                    if (response.data.success === true) {
                        setTimeout(() => {
                            this.dialog = false;
                            this.pageRules = response.data.page_rules;
                        }, 1000);
                    }
                });
            });
        },
        getRoles: function() {
            axios.get('roles').then((response) => {
                if (response.data.success === true) {
                    this.roles = response.data.roles;
                }
            });
        },
        getPagesData() {
            axios.get('pages/get_by_brand/' + window.application_brand).then((response) => {
                if (response.data.success === true) {
                    this.pages = response.data.pages;
                }
            });
        },
        save(pageRule) {
            this.dialog = true;

            pageRule.allowed_pages = JSON.stringify(pageRule.allowed_pages);

            console.log(pageRule);

            axios.post('page_rule', pageRule).then((response) => {
                if (response.data.success === true) {
                    setTimeout(() => {
                        this.dialog = this.pageRuleDialog = false;
                        this.errors = [];

                        this.getDataFromAPI();

                        new PNotify({
                            title: 'Page rule created',
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
                            title: 'Page rule failed to create',
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        },
        togglePanel() {
            this.pageRuleDialog = ! this.pageRuleDialog;
        },
        update(pageRule) {
            this.dialog = true;

            var data = {
                allowed_pages: JSON.stringify(pageRule.allowed_pages)
            }

            axios.patch('page_rules/' + pageRule.id + '/update', data).then((response) => {
                if (response.data.success === true) {
                    setTimeout(() => {
                        this.dialog = this.pageRuleDialog = false;
                        this.errors = [];
                        pageRule.allowed_pages = response.data.page_rule.allowed_pages;

                        new PNotify({
                            title: 'Page rule updated',
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
                            title: 'Page rule failed to update',
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