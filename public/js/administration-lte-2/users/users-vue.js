new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: null,
            brands: {},
            isPanelVisible: false,
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
            types: ['administrator', 'normal'],
            user: {},
            users: users,
            userSlideOut: null,
        }
    },
    mounted: function() {
        $('.data-table').DataTable();

        this.userSlideOut = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('user-slideout-container'),
            'padding': 1200,
            'tolerance': 70,
            'side': 'right'
        });

        this.initializeBrandsData();
        this.initializeSalesRepData();
    },
    methods: {
        initializeBrandsData: function() {
            axios.get(window.endpoint_version + '/brandings').then((response) => {
                if (response.data.success === true) {
                    this.brands = response.data.brandings;
                }
            });
        },
        initializeSalesRepData: function() {
            axios.get('sales_reps').then((response) => {
                if (response.data.success === true) {
                    this.salesReps = response.data.sales_reps;
                }
            });
        },
        toggle: function(index) {
            let url = null;
            let successMessage = null;
            let errorMessage = null;

            if (this.users[index].active) {
                url = "user/disable";
                successMessage = "User is now disabled";
                errorMessage =  "Failed to disable user";
            } else {
                url = "user/enable";
                successMessage = "User is now enabled";
                errorMessage = "Failed to enable user";
            }

            axios.post(url, {
                id: this.users[index].id
            }).then((response) => {
                if (response.data.success == true) {
                    this.users[index].active = ! this.users[index].active;

                    new PNotify({
                        title: successMessage,
                        type: 'success',
                        hide: true,
                        delay: 1000
                    });
                } else {
                     new PNotify({
                        title: errorMessage,
                        type: 'error',
                        hide: true,
                        delay: 1000
                    });
                }
            });
        },
        edit: function(index) {
            this.user = this.users[index];
            this.togglePanel();
        },
        togglePanel: function() {
            this.userSlideOut.toggle();
            this.isPanelVisible = ! this.isPanelVisible;
        },
        updateUser: function() {
            console.log(this.user);
        }
    }
})