new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: '',
            block_pattern_option_2: block_pattern_option_2,
            current_block_pattern_option_2_cache: [],
            current_block_pattern_option_2: [],
            neck_options: data,
            neck_option: "",
            neck_option_cache: [],
            slideout: "",
            is_panel_showing: false
        }
    },
    mounted: function() {
        this.slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 1200,
            'tolerance': 70,
            'side': 'right'
        });
    },
    methods:{
        addNeckOption: function() {
            this.action = 'add';
            let index = Object.keys(this.neck_options).length + 1;

            let neck_option = {
                name: '',
                alias: '',
                placeholder_overrides: ''
            }

            this.showPanel(neck_option, index);
        },
        editNeckOption: function(neck_option, index) {
            this.action = 'edit';

            if (neck_option.hasOwnProperty('alias') === false) {
                Vue.set(neck_option, 'alias', '');
            }

            this.neck_option_cache = Object.assign({}, neck_option);

            if (this.block_pattern_option_2.hasOwnProperty(index)) {
                this.current_block_pattern_option_2_cache = JSON.parse(JSON.stringify(this.block_pattern_option_2[index]));
            } else {
                this.current_block_pattern_option_2_cache = Object.assign({}, this.block_pattern_option_2[index]);
            }

            this.showPanel(neck_option, index);
        },
        removeNeckOption: function(index) {
            let remove = confirm('Are you sure you want to remove this neck option?');

            if (remove == true) {
                this.$delete(this.neck_options, index);
                this.$delete(this.block_pattern_option_2, index);
            }
        },
        addBlockPatternOption2: function() {
            let block_pattern_option_2_item = {
                layer: '',
                name: '',
                block_pattern_option_3: []
            };

            this.current_block_pattern_option_2.push(Vue.util.extend({}, block_pattern_option_2_item));
        },
        removeBlockPatternOption2: function(option_2_item) {
            this.current_block_pattern_option_2.splice(this.current_block_pattern_option_2.indexOf(option_2_item), 1);
        },
        addBlockPatternOption3: function(option_2_item) {
            let block_pattern_option_3_item = {
                layer: '',
                name: ''
            };
            
            option_2_item.block_pattern_option_3.push(block_pattern_option_3_item);
        },
        removeBlockPatternOption3: function(option_2_item, option_3_item) {
            option_2_item.block_pattern_option_3.splice(option_2_item.block_pattern_option_3.indexOf(option_3_item), 1)
        },
        updateNeckOption: function() {
            let title = null;

            if (this.action == 'edit') {
                title = "Neck option updated";
            } else if (this.action == 'add') {
                title = "Neck option added";

                Vue.set(this.neck_options, this.neck_option.index, this.neck_option);
            }

            Vue.set(this.block_pattern_option_2, this.neck_option.index, this.current_block_pattern_option_2);

            new PNotify({
                title: title,
                type: 'success',
                hide: true,
                delay: 500
            });

            this.slideout.toggle();
            this.is_panel_showing = false;
            this.current_block_pattern_option_2 = [];
        },
        closePanel: function(neck_option, current_block_pattern_option_2) {
            Object.assign(neck_option, this.neck_option_cache);

            if (this.block_pattern_option_2.hasOwnProperty(this.neck_option.index)) {
                this.block_pattern_option_2[this.neck_option.index] = Object.values(this.current_block_pattern_option_2_cache);
            }

            this.slideout.toggle();
            this.is_panel_showing = false;
            this.current_block_pattern_option_2 = [];
        },
        showPanel: function(neck_option, index) {
            this.current_block_pattern_option_2 = [];

            if (index in this.block_pattern_option_2) {
                this.current_block_pattern_option_2 = this.block_pattern_option_2[index];
            }

            this.neck_option = neck_option;

            Vue.set(this.neck_option, 'index', index);
            this.slideout.toggle();
            this.is_panel_showing = true;

            this.$nextTick(function() {
                this.$refs.menu.scrollTop = 0;
            });
        }
    }
});