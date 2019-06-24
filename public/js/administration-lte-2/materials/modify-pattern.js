Vue.component('Multiselect', VueMultiselect.default)

new Vue({
    el: '#application-container',
    data: function() {
        return {
            copyModifyPatternDialog: false,
            colors: [],
            loadModifyPattern: null,
            loadModifyPatternDialog: false,
            materialSport: materialSport,
            patternDetails: patternDetailsData,
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
        applyData() {
            try {
                this.patternDetails = JSON.parse(this.loadModifyPattern);
                this.loadModifyPatternDialog = false;
                this.loadModifyPattern = null;
            } catch (e) {
                return false;
            }
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
                    response.data.patterns.forEach(pattern => {
                        var sports = JSON.parse(pattern.sports);

                        if (sports.indexOf(this.materialSport) >= 0) {
                            this.patterns.push(pattern);
                        }
                    });
                }
            });
        },
        onFileChange(event, object, perspective = null) {
            var files = event.target.files || event.dataTransfer.files;

            if (! files.length) {
                return;
            }

            var formData = new FormData();
            formData.append('file', files[0]);

            axios.post('fileUpload', formData).then((response) => {
                if (response.data.success === true) {
                    if (perspective == null) {
                        object.thumbnail = response.data.filename;
                    } else {
                        Vue.set(object, perspective, response.data.filename);
                    }

                    event.target.value = "";
                }
            });
        },
        removePatternDetail(index) {
            Vue.delete(this.patternDetails, index);
        },
        removeSelectedLayers(patternDetailIndex) {
            var patternDetail = this.patternDetails[patternDetailIndex];

            if (patternDetail.selectedLayers.length > 0) {
                var index = patternDetail.selectedLayers.length;

                while (index--) {
                    Vue.delete(patternDetail.layers, patternDetail.selectedLayers[index]);
                }
            }

            patternDetail.selectedLayers = [];
        },
        selectLayer(patternDetailIndex) {
            var patternDetail = this.patternDetails[patternDetailIndex];

            if (patternDetail.selectedLayers.length == patternDetail.layers.length) {
                patternDetail.isCheckAll = true;
            } else {
                patternDetail.isCheckAll = false;
            }
        },
        toggleCheckbox(patternDetailIndex) {
            var patternDetail = this.patternDetails[patternDetailIndex];

            patternDetail.isCheckAll = ! patternDetail.isCheckAll;
            Vue.set(patternDetail, 'selectedLayers', []);

            if (patternDetail.isCheckAll) {
                for (var key in patternDetail.layers) {
                    patternDetail.selectedLayers.push(parseInt(key));
                }
            }
        }
    }
});