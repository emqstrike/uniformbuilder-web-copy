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
                isCheckAll: false,
                layers: [{
                    id: 1,
                    layer_color_id: 0,
                    team_color_id: null,
                    front: null,
                    back: null,
                    left: null,
                    right: null
                }],
                pattern_id: 0,
                selectedLayers: [],
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
        },
        removeSelectedLayers(patternDetailIndex) {
            if (this.patternDetails[patternDetailIndex].selectedLayers.length > 0) {
                var index = this.patternDetails[patternDetailIndex].selectedLayers.length;

                while(index--) {
                    Vue.delete(this.patternDetails[patternDetailIndex].layers, this.patternDetails[patternDetailIndex].selectedLayers[index]);
                }
            }

            this.patternDetails[patternDetailIndex].selectedLayers = [];
        },
        selectLayer(patternDetailIndex) {
            if (this.patternDetails[patternDetailIndex].selectedLayers.length == this.patternDetails[patternDetailIndex].layers.length) {
                this.patternDetails[patternDetailIndex].isCheckAll = true;
            } else {
                this.patternDetails[patternDetailIndex].isCheckAll = false;
            }
        },
        toggleCheckbox(patternDetailIndex) {
            this.patternDetails[patternDetailIndex].isCheckAll = ! this.patternDetails[patternDetailIndex].isCheckAll;
            Vue.set(this.patternDetails[patternDetailIndex], 'selectedLayers', []);

            if (this.patternDetails[patternDetailIndex].isCheckAll) {
                for (var key in this.patternDetails[patternDetailIndex].layers) {
                    this.patternDetails[patternDetailIndex].selectedLayers.push(parseInt(key));
                }
            }
        }
    }
});