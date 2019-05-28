var nested = {
    template: '#nested-draggable',
    name: 'nested-draggable',
    props: ['menus'],
    methods: {
        onEnd(event) {
            console.log('here');
        }
    }
};

new Vue({
    el: '#application-container',
    components: {
        'nested-draggable': nested
    },
    data: function() {
        return {
            menus: [],
        }
    },
    mounted() {
        this.getMenuDataFromAPI();
    },
    methods: {
        getMenuDataFromAPI() {
            axios.get('menus/brand/' + window.application_brand).then((response) => {
                if (response.data.success === true) {
                    this.menus = response.data.menus;
                }
            });
        },
        log: function() {
            console.log('changed');
        }
    }
});