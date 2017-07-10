/**
 * TeamStoreAPI.js
 */

var TeamStoreAPI = {
    base_url: $('#team-store-toolbox').data('teamstore-api'),
    endpoints: {},
    init: function() {
        // Product
        this.endpoints.save_customized_thumbnails = this.base_url + 'product/save_customized_thumbnails';
        this.endpoints.get_team_store_products = this.base_url + 'store/get_products';
    }
};

TeamStoreAPI.init();