window.Event = new Vue();

var nested = {
    template: '#nested-draggable',
    name: 'nested-draggable',
    props: ['menus'],
    methods: {
        removeMenu(menu) {
            Event.$emit('remove-menu', menu);
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
    created() {
        Event.$on('remove-menu', this.removeMenu);
    },
    mounted() {
        this.getMenuDataFromAPI();
    },
    methods: {
        removeMenu(menu) {
            console.log(menu);
        },
        getMenuDataFromAPI() {
            axios.get('menus/brand/' + window.application_brand).then((response) => {
                if (response.data.success === true) {
                    this.menus = response.data.menus;
                }
            });
        },
    }
});