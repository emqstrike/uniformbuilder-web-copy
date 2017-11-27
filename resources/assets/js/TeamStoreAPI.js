/**
 * TeamStoreAPI.js
 */

var TeamStoreAPI = {
    base_url: $('meta[name=team-store-api]').attr('content'),
    endpoints: {},
    init: function() {
        // Product
        this.endpoints.save_customized_thumbnails = this.base_url + 'product/save_customized_thumbnails';
        this.endpoints.add_product_to_team_store = this.base_url + 'product/add_product_to_team_store';
        this.endpoints.get_team_store_products = this.base_url + 'store/get_products';
    }
};

TeamStoreAPI.init();