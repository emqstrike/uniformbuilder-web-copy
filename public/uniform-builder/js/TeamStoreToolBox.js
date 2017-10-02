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
        $('#team-store-toolbox').draggable();
    },

    has_team_store_account: function() {
        return false;
    },

    show: function () {
        // Enable the teamstore icon at the LEFT MENU
        $('#left-side-toolbar span.team-store').show();

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
        // Set visibility of all perspectives
        ub['front_view'].visible = true;
        ub['left_view'].visible = true;
        ub['right_view'].visible = true;
        ub['back_view'].visible = true;

        ub.funcs.prepareThumbnails();

        setTimeout(function() {
            ub.funcs.updateTeamStoreImages();
            $('.bootbox.modal .bootbox-body').html('Finished processing.');
            $('.bootbox.modal').modal('hide');
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
                    return TeamStoreToolBox.offer_product_to_team_store(response.material);
                }
                return false;
            }
        );
    },

    /**
     * Add to team store
     */
    offer_product_to_team_store: function(material) {
        var url = TeamStoreAPI.endpoints.add_product_to_team_store;
        var selected_colors = [];
        if (ub.current_material.settings.team_colors) {
            for (i = 0; i < (ub.current_material.settings.team_colors.length); i++) {
                selected_colors.push(ub.current_material.settings.team_colors[i].color_code);
            }
        }
        var material_data = {
            store_code: ub.store_code,
            material_id: material.id,
            parts_alias_id: material.parts_alias_id,
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
            pricing: material.pricing_details,
            created_by: parseInt($('#team-store-toolbox').data('team-store-user-id')),
            // Images
            image_front: material.thumbnail_path,
            image_back: material.thumbnail_path_back,
            image_right: material.thumbnail_path_right,
            image_left: material.thumbnail_path_left,
            // Block settings
            block_pattern: material.block_pattern,
            block_pattern_id: material.block_pattern_id,
            product_type: material.block_pattern,
            gender_type: material.gender,
            factory_code: material.factory_code,
            sport: material.uniform_category.toLowerCase(),
            has_jersey_number: material.has_jersey_number,
            has_jersey_name: material.has_jersey_name,
            colors: JSON.stringify(selected_colors)
        };

        ub.utilities.postJSON(url,
            material_data,
            function(response) {
                if (response.success) {
                    $('#team-store-toolbox').data('product-id', response.product.id);
                    TeamStoreToolBox.update_images(true);
                    $('#team-store-toolbox .add-to-team-store').off('click');
                    $('#team-store-toolbox .add-to-team-store').addClass('disabled').removeClass('add-to-team-store');
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
            TeamStoreToolBox.products_modal.draggable();
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

                        $('div#team-store-products-picker .team-store-products-list .item').on('click', function() {
                            var material_id = $(this).data('material-id');
                            var product_id = $(this).data('product-id');
                            TeamStoreToolBox.load_material(material_id, product_id);
                        });
                    }
                }
            );

        } else {

            TeamStoreToolBox.open_products_modal();

        }

    },

    load_material: function (material_id, product_id) {
        var team_name = $('#team-store-toolbox').data('team-name');
        if (team_name.trim().length == 0) {
            team_name = 'DEFAULT';
        }
        var team_colors = $('#team-store-toolbox').data('team-colors');
        if (team_colors.trim().length == 0) {
            team_colors = 'DEFAULT';
        }
        var url = '/builder/0/' + material_id + '/' + ub.store_code + '/' + team_name + '/' + team_colors + '/PLAYER/23/0/0/0/' + product_id;

        location.href = url;
    },

    open_products_modal: function() {
        TeamStoreToolBox.products_modal.fadeIn();
    },

    close_products_modal: function() {
        TeamStoreToolBox.products_modal.fadeOut();
    }
};
