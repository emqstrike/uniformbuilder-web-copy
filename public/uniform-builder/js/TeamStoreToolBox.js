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
        $('#team-store-toolbox .close').on('click', TeamStoreToolBox.close);
        if ($('#show-team-store-toolbox')) {
            $('#show-team-store-toolbox').on('click', TeamStoreToolBox.show);
        }
    },

    show: function () {
        $('#team-store-toolbox').addClass('visible');
        $('#team-store-toolbox').fadeIn();
    },

    close: function() {
        $('#team-store-toolbox').fadeOut();
    },

    create_team_store: function() {
        console.log('create team store');
    },

    open_team_store: function() {
        var url = $('#team-store-toolbox .open-team-store').data('store');
        window.open(url, '_blank');
    },

    update_images: function() {
        // To do: show progress bar animation
        ub.funcs.prepareThumbnails();
        setTimeout(function() {
            ub.funcs.updateTeamStoreImages();
        }, 3000);
    },

    add_to_team_store: function(material) {
        TeamStoreToolBox.get_material(ub.config.material_id);
    },

    get_material: function(material_id) {
        var url = ub.config.api_host + '/api/material/' + material_id;
        ub.utilities.getJSON(url,
            function(response) {
                if (response.success) {
                    response.material.pricing = JSON.parse(response.material.pricing);
                    if (response.material.pricing) {
                        // Adult Pricing
                        if (response.material.pricing.adult_min_msrp) {
                            response.material.price = response.material.pricing.adult_min_msrp;
                        }
                        if (response.material.pricing.adult_min_web_price_sale) {
                            response.material.price_sale = response.material.pricing.adult_min_web_price_sale;
                        }
                        // Youth Pricing
                        if (response.material.pricing.youth_min_msrp) {
                            response.material.price_youth = response.material.pricing.youth_min_msrp;
                        }
                        if (response.material.pricing.youth_min_web_price_sale) {
                            response.material.price_youth_sale = response.material.pricing.youth_min_web_price_sale;
                        }
                    }
                    TeamStoreToolBox.offer_product_to_team_store(response.material);
                }
            }
        );
    },

    offer_product_to_team_store: function(material) {
        var url = TeamStoreAPI.endpoints.add_product_to_team_store;
        var material_data = {
            store_code: ub.store_code,
            material_id: material.id,
            name: material.name,
            slug: material.slug,
            description: material.description,
            sports_group_id: material.sports_group_id,
            uniform_application_type: material.uniform_application_type,
            uniform_category: material.uniform_category,
            uniform_category_id: material.uniform_category_id,
            uniform_group: material.uniform_group,
            sku: material.sku,
            is_infused: material.is_infused,
            is_sublimated: material.is_sublimated,
            is_twill: material.is_twill,
            // Pricing
            price: material.price,
            price_youth: material.price_youth,
            // Images
            image_front: material.thumbnail_path,
            image_back: material.thumbnail_path_back,
            image_right: material.thumbnail_path_right,
            image_left: material.thumbnail_path_left,
            // Block settings
            block_pattern: material.block_pattern,
            block_pattern_id: material.block_pattern_id
        };

        ub.utilities.postJSON(url,
            material_data,
            function(response) {
                if (response.success) {
                    TeamStoreToolBox.update_images();
                }
            }
        );
    },

    view_product_page: function() {
        var url = $('#team-store-toolbox .view-product-page').data('product');
        window.open(url, '_blank');
    },

    open_products: function() {
        console.log('open products');
    }
};
