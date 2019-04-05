new Vue({
    el: '#application-container',
    data: function() {
        return {
            block_pattern_option_2: [],
            block_pattern_option_2_item: {
                layer: '',
                name: ''
            },
            block_pattern_option_3: [],
            block_pattern_option_3_item: {
                layer: '',
                name: ''
            },
            neck_options: [data][0],
            neck_option: "",
            slideout: ""
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
        editNeckOption: function(neck_option) {
            this.block_pattern_option_2 = [];
            this.block_pattern_option_3 = [];

            this.neck_option = neck_option;
            this.slideout.toggle();
        },
        removeNeckOption: function(index) {
            let remove = confirm('Are you sure you want to remove this neck option?');

            if (remove == true) {
                this.$delete(this.neck_options, index);
            }
        },
        addBlockPatternOption2: function() {
            this.block_pattern_option_2.push(Vue.util.extend({}, this.block_pattern_option_2_item));
        },
        removeBlockPatternOption2: function(option_2_item) {
            this.block_pattern_option_2.splice(this.block_pattern_option_2.indexOf(option_2_item), 1);
        },
        addBlockPatternOption3: function(option_2_item) {
            this.block_pattern_option_3.push(Vue.util.extend({}, this.block_pattern_option_3_item));
            Vue.set(option_2_item, 'block_pattern_option_3', this.block_pattern_option_3);
        },
        removeBlockPatternOption3: function(option_3_item) {
            this.block_pattern_option_3.splice(this.block_pattern_option_3.indexOf(option_3_item), 1);
        },
    }
});