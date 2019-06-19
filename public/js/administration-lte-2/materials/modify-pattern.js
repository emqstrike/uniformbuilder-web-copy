Vue.component('Multiselect', VueMultiselect.default)

new Vue({
    el: '#application-container',
    data: function() {
        return {
            colors: [],
            patternDetails: [],
            patterns: []
        }
    },
    created() {
        this.getColorsData();
        this.getPatternsData();
    },
    methods: {
        addLayer(index) {
            this.patternDetails[index].layers.push({
                layer_color_id: 0,
                team_color_id: null,
                front: null,
                back: null,
                left: null,
                right: null
            });
        },
        addPattern() {
            this.patternDetails.push({
                layers: [{
                    layer_color_id: 0,
                    team_color_id: null,
                    front: null,
                    back: null,
                    left: null,
                    right: null
                }],
                pattern_id: 0,
                thumbnail: null
            });
        },
        backgroundColor(colorId) {
            var color = this.colors.find(color => color.id === colorId);

            if (color) {
                return color.hex_code;
            }

            return 'ffffff';
        },
        getColorsData() {
            axios.get('colors').then((response) => {
                if (response.data.success === true) {
                    this.colors = response.data.colors;
                }
            })
        },
        getPatternsData() {
            axios.get('patterns').then((response) => {
                if (response.data.success === true) {
                    this.patterns = response.data.patterns;
                }
            });
        },
        removePatternDetail(index) {
            Vue.delete(this.patternDetails, index);
        }
    }
});