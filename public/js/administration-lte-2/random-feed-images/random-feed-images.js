let randomFeedImageProperties = {
    sport_id: null,
    block_pattern_id: null,
    block_pattern_id: null,
    block_pattern_option: null,
    thumbnail: null,
    set: null,
    alias: null,
};

new Vue({
    el: '#application-container',
    data: function() {
        return {
            action: "",
            blockPatterns: [],
            dialog: false,
            errors: [],
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Sport', value: 'sport_id'},
                {text: 'Block Pattern', value: 'block_pattern_id'},
                {text: 'Block Pattern Option', value: 'block_pattern_option'},
                {text: 'Thumbnail', value: 'thumbnail'},
                {text: 'Set', value: 'set'},
                {text: 'Alias', value: 'Alias'},
                {text: 'Actions', value: ''},
            ],
            pagination: {
                page: 1,
                rowsPerPage: 10,
            },
            randomFeedImage: randomFeedImageProperties,
            randomFeedImageCache: randomFeedImageProperties,
            randomFeedImages: [],
            randomFeedImageDialog: false,
            sports: [],
            totalItems: 0,
        }
    },
    mounted() {
        this.getData();
        this.getBlockPatternsData();
        this.getSportsData();
    },
    computed: {
        blockPatternOptions() {
            let blockPatterns = [];

            this.blockPatterns.forEach(blockPattern => {
                if (Object.keys(this.randomFeedImage).length != 0) {
                    if (this.randomFeedImage.sport_id == blockPattern.uniform_category_id) {
                        blockPatterns.push(blockPattern);
                    }
                }
            });

            return blockPatterns;
        },
        blockPatternOptionOptions(){
            let blockPatternOptions = [];

            this.blockPatterns.forEach(blockPattern => {
                if (Object.keys(this.randomFeedImage).length != 0) {
                    if (this.randomFeedImage.sport_id == blockPattern.uniform_category_id) {
                        let _blockPatternOption = JSON.parse(blockPattern.neck_options);

                        try {
                            Object.keys(_blockPatternOption).forEach((key) => {
                                if (blockPatternOptions.indexOf(_blockPatternOption[key].name) < 0) {
                                    blockPatternOptions.push(_blockPatternOption[key].name);
                                }
                            });
                        } catch (e) {
                            return false;
                        }
                    }
                }
            });

            return blockPatternOptions;
        },
        computedPagination: {
            get: function() {
                return this.pagination
            },
            set: function(value) {
                this.$emit('update:pagination', value)
            }
        },
        paginationPages: function() {
            if ((this.pagination.rowsPerPage == null) || (this.totalItems == null)) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
        },
    },
    watch: {
        pagination: {
            handler: function() {
                this.getData();
            },
            deep: true
        },
    },
    methods: {
        add() {
            this.action = 'add';
            this.randomFeedImage = {
                sport_id: null,
                block_pattern_id: null,
                block_pattern_id: null,
                block_pattern_option: null,
                thumbnail: null,
                set: null,
                alias: null,
            };
            this.randomFeedImageDialog = true;
        },
        cancel(randomFeedImage) {
            Object.assign(randomFeedImage, this.randomFeedImageCache);
            this.randomFeedImageDialog = false;
        },
        clear(event) {
            event.target.value = "";
        },
        edit(randomFeedImage) {
            this.action = 'edit';
            this.randomFeedImage = randomFeedImage;
            this.randomFeedImageCache = Object.assign({}, randomFeedImage);
            this.randomFeedImageDialog = true;
        },
        getBlockPatternsData() {
            axios.get('block_patterns').then((response) => {
                if (response.data.success === true) {
                    this.blockPatterns = response.data.block_patterns;
                }
            });
        },
        getBlockPatternName(id) {
            let blockPattern = this.blockPatterns.filter(blockPattern => {
                return blockPattern.id == id;
            });

            return blockPattern[0].name;
        },
        getData() {
            this.getRandomFeedImagesData().then(data => {
                this.randomFeedImages = data.randomFeedImages;
                this.totalItems = data.total;
            });
        },
        getRandomFeedImagesData() {
            this.dialog = true;

            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = this.pagination;

                axios.get('random_feed_images?page=' + page).then((response) => {
                    if (response.data.success === true) {
                        let randomFeedImages = response.data.random_feed_images.data;
                        const total = response.data.random_feed_images.total;

                        setTimeout(() => {
                            this.dialog = false;
                            resolve({randomFeedImages, total});
                        }, 1000);
                    }
                });
            }); 
        },
        getSportsData() {
            axios.get('categories').then((response) => {
                if (response.data.success === true) {
                    this.sports = response.data.categories;
                }
            });
        },
        getSportName(id) {
            let sport = this.sports.filter(sport => {
                return sport.id == id;
            })

            return sport[0].name;
        },
        onFileChange(event) {
            var files = event.target.files || event.dataTransfer.files;

            if (! files.length) {
                return;
            }

            var formData = new FormData();
            formData.append('file', files[0]);

            axios.post('fileUpload', formData).then((response) => {
                if (response.data.success === true) {
                    this.randomFeedImage.thumbnail = response.data.filename;
                }
            });
        },
        remove(randomFeedImage) {
            let remove = confirm('Are you sure you want to remove this random feed image?');

            if (remove === true) {
                this.dialog = true;

                axios.post('random_feed_image/delete', randomFeedImage.item).then((response) => {
                    if (response.data.success === true) {
                        this.$delete(this.randomFeedImages, randomFeedImage.index);

                        setTimeout(() => {
                            this.dialog = this.randomFeedImageDialog = false;

                            new PNotify({
                                title: 'Random feed image deleted',
                                type: 'success',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.dialog = false;

                            new PNotify({
                                title: 'Random feed image failed to delete',
                                type: 'error',
                                hide: true,
                                delay: 1000
                            });
                        }, 1000);
                    }
                });
            }
        },
        save() {
            this.dialog = true;

            axios.post('random_feed_image', this.randomFeedImage).then((response) => {
                if (response.data.success === true) {
                    this.getData();

                    setTimeout(() => {
                        this.dialog = this.randomFeedImageDialog = false;
                        this.errors = [];

                        new PNotify({
                            title: 'Random feed image saved',
                            type: 'success',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                } else if ((response.data.success === false) && (response.data.errors.length > 0)) {
                    setTimeout(() => {
                        this.dialog = false;
                        this.errors = response.data.errors;
                    }, 1000);
                }  else {
                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: 'Random feed image failed to save',
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        },
        update() {
            this.dialog = true;

            axios.post('random_feed_image/update', this.randomFeedImage).then((response) => {
                if (response.data.success === true) {
                    setTimeout(() => {
                        this.dialog = this.randomFeedImageDialog = false;
                        this.errors = [];

                        new PNotify({
                            title: 'Random feed image updated',
                            type: 'success',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                } else if ((response.data.success === false) && (response.data.errors.length > 0)) {
                    setTimeout(() => {
                        this.dialog = false;
                        this.errors = response.data.errors;
                    }, 1000);
                }  else {
                    setTimeout(() => {
                        this.dialog = false;

                        new PNotify({
                            title: 'Random feed image failed to update',
                            type: 'error',
                            hide: true,
                            delay: 1000
                        });
                    }, 1000);
                }
            });
        },
    }
});