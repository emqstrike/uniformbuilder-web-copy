/**
 * TeamStoreToolBox.js
 */

var TeamStoreToolBox = {

    is_enabled: true,

    products_modal: null,

    progress_modal: null,

    init: function() {
        $('#team-store-toolbox .create-team-store').on('click', TeamStoreToolBox.create_team_store);
        $('#team-store-toolbox .open-team-store').on('click', TeamStoreToolBox.open_team_store);
        $('#team-store-toolbox .update-images').on('click', TeamStoreToolBox.update_images);
        $('#team-store-toolbox .add-to-team-store').on('click', TeamStoreToolBox.add_to_team_store);
        $('#team-store-toolbox .view-product-page').on('click', TeamStoreToolBox.view_product_page);
        $('#team-store-toolbox .open-team-store-products').on('click', TeamStoreToolBox.open_products);
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
        var url = $('#team-store-toolbox .create-team-store').data('create-store');
        window.open(url, '_blank');
    },

    open_team_store: function() {
        var url = $('#team-store-toolbox .open-team-store').data('store');
        window.open(url, '_blank');
    },

    /**
     * Updates the team store product images
     */
    update_images: function(show_update_progress_modal) {
        if (show_update_progress_modal) {
            TeamStoreToolBox.progress_modal = bootbox.dialog({
                title: 'Updating your product images',
                message: '<p><i class="fa fa-spin fa-spinner"></i> preparing images...</p>'
            });
        }
        ub.funcs.prepareThumbnails();

        setTimeout(function() {
            ub.funcs.updateTeamStoreImages();
            TeamStoreToolBox.progress_modal.find('.bootbox-body').html('Finished processing.');
        }, 3000);
    },

    /**
     * Wrapper method for the actual AJAX call to add product to team store
     */
    add_to_team_store: function(material) {
        TeamStoreToolBox.progress_modal = bootbox.dialog({
            title: 'Adding new product to your team store',
            message: '<p><i class="fa fa-spin fa-spinner"></i> preparing images...</p>'
        });
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

    /**
     * Add to team store
     */
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
                    $('#team-store-toolbox').data('product-id', response.product.id);
                    TeamStoreToolBox.update_images(false);
                    setTimeout(function() {
                        location.href = location.protocol + '//' + location.host + location.pathname + '/' + response.product.id;
                    }, 5000);
                }
            }
        );
    },

    /**
     * Open teamstore product page
     */
    view_product_page: function() {
        var url = $('#team-store-toolbox .view-product-page').data('product');
        window.open(url, '_blank');
    },

    /**
     * Retrieve list of products and populate modal
     */
    open_products: function() {

        if (TeamStoreToolBox.products_modal == null) {
            var template = $('#team-store-products-picker-template').html();

            $('body').append(template);

            TeamStoreToolBox.products_modal = $('div#team-store-products-picker');
            TeamStoreToolBox.products_modal.center();
            TeamStoreToolBox.open_products_modal();

            // Modal should be closable
            $('div#team-store-products-picker .close-popup').on('click', TeamStoreToolBox.close_products_modal);

            var url = TeamStoreAPI.endpoints.get_team_store_products + '/' + ub.store_code;
            ub.utilities.getJSON(url,
                function(response) {
                    if (response.success) {
                        var template = $('#team-store-products-template').html();
                        var data = {
                            products: response.products
                        };
                        var markup = Mustache.render(template, response);
                        $('div#team-store-products-picker .team-store-products-list').html(markup);
                        $('div#team-store-products-picker .team-store-products-list .name').on('mousemove', function() {
                            $(this).addClass('pullUp');
                        });
                        $('div#team-store-products-picker .team-store-products-list .name').on('mouseout', function() {
                            $(this).removeClass('pullUp');
                        });
                    }
                }
            );

        } else {

            TeamStoreToolBox.open_products_modal();

        }

    },

    open_products_modal: function() {
        TeamStoreToolBox.products_modal.fadeIn();
    },

    close_products_modal: function() {
        TeamStoreToolBox.products_modal.fadeOut();
    }
};
