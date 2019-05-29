window.Event = new Vue();

var nested = {
    template: '#nested-draggable',
    name: 'nested-draggable',
    props: ['menus'],
    methods: {
        removeMenu(menu, index) {
            Event.$emit('remove-menu', menu, index);
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
        removeMenu(menu, index) {
            let remove = confirm('Are you sure you want to remove this menu?');

            if (remove === true) {
                if (menu.parent_id == 0) {
                    this.$delete(this.menus, index);

                    if (menu.menus.length > 0) {
                        const self = this;

                        Object.assign([], menu.menus.reverse());

                        menu.menus.forEach(function(key) {
                            self.menus.splice(index, 0, key);
                        });
                    }
                } else {
                    var parentMenu = this.menus.find(_menu => _menu.order_id === menu.parent_id);
                    
                    parentMenu.menus.forEach(function(value, index) {
                        if (value.id === menu.id) {
                            parentMenu.menus.splice(index, 1);
                        }
                    });
                }
            }
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