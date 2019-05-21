new Vue({
    el: '#application-container',
    data: function() {
        return {
            dialog: true,
            headers: [
                {text: 'Type', value: 'type'},
                {text: 'Role', value: 'role'},
                {text: 'Action', value: 'action'},
            ],
            pageRule: {},
            pageRuleCache: {},
            pageRules: []
        }
    },
    mounted() {
        this.getDataFromAPI();
    },
    methods: {
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
        }
    }
});