/**
 * TeamStoreToolBox.js
 */

var TeamStoreToolBox = {

    init: function() {
        $('#team-store-toolbox').show();
        $('#team-store-toolbox .create-team-store').on('click', TeamStoreToolBox.create_team_store);
        $('#team-store-toolbox .open-team-store').on('click', TeamStoreToolBox.open_team_store);
        $('#team-store-toolbox .update-images').on('click', TeamStoreToolBox.update_images);
        $('#team-store-toolbox .add-to-team-store').on('click', TeamStoreToolBox.add_to_team_store);
        $('#team-store-toolbox .view-product-page').on('click', TeamStoreToolBox.view_product_page);
        $('#team-store-toolbox .open-products').on('click', TeamStoreToolBox.open_products);
    },

    show: function () {
        $('#team-store-toolbox').addClass('visible');
    },

    close: function() {
        $('#team-store-toolbox').removeClass('visible');
    },

    create_team_store: function() {
        console.log('create team store');
    },

    open_team_store: function() {
        var url = $('#team-store-toolbox .open-team-store').data('store');
        window.open(url, '_blank');
    },

    update_images: function() {
        console.log('update images');
    },

    add_to_team_store: function() {
        console.log('add to team store');
    },

    view_product_page: function() {
        var url = $('#team-store-toolbox .view-product-page').data('product');
        window.open(url, '_blank');
    },

    open_products: function() {
        console.log('open products');
    }
};
