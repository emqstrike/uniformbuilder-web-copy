var UBCart = {
    cartItemApi: null,

    LEFT_IMAGE_PERSPECTIVE: "left",
    FRONT_IMAGE_PERSPECTIVE: "front",
    BACK_IMAGE_PERSPECTIVE: "back",
    RIGHT_IMAGE_PERSPECTIVE: "right",

    is_upload_base_64_image_available: true,

    init: function() {
        UBCart.cartItemApi = new CartItemApi(shopping_cart.logged_in_token, shopping_cart.cart_token);

        // initialize shopping cart first before the start the logic
        UBCart.initShoppingCart(function() {
            // unbind first to avoid duplicate event
            $('#left-side-toolbar').off('click', '.cart-btn[data-action="add"]');
            $('#left-side-toolbar').off('click', '.cart-btn[data-action="update"]');

            $('#left-side-toolbar').on('click', '.cart-btn[data-action="add"]', UBCart.addToCart);
            $('#left-side-toolbar').on('click', '.cart-btn[data-action="update"]', UBCart.updateItem);

            if (typeof Storage !== "undefined") {
                sessionStorage.front_image = ub.getThumbnailImage2('front_view');

                ub.funcs.showViews();
                sessionStorage.left_image = ub.getThumbnailImage2('left_view');
                sessionStorage.front_image = ub.getThumbnailImage2('front_view');
                sessionStorage.back_image = ub.getThumbnailImage2('back_view');
                sessionStorage.right_image = ub.getThumbnailImage2('right_view');
                ub.funcs.hideViews();
                ub.funcs.setVisibleView(ub.active_view);
                ub[ub.active_view + '_view'].alpha = 1;
            }
        });
    },

    initShoppingCart: function(callback) {
        UBCart.fetchCartItems(function(response) {
            if (response.success) {
                var cart_items = response.data;
                var duplicate_material = UBCart.getDuplicateMaterial(cart_items);

                if (duplicate_material.length > 0) {
                    var duplicate_items_tmpl = _.template($('#duplicate-items-tmpl').html());
                    bootbox.dialog({
                        title: "You have duplicate items. Please choose do you want to retain.",
                        message: duplicate_items_tmpl({duplicate_cart_items: duplicate_material}),
                        closeButton: false
                    });

                    $('body').on('click', '#duplicate-items-container .cart-item-btn', UBCart.onSelectItemToBeRetain);
                } else {
                    // load cart items
                    UBCart.updateShoppingCartDetails(cart_items);

                    // add to cart button and update to cart
                    if (! _.contains(_.pluck(cart_items, "material_id"), ub.config.material_id)) {
                        // add to cart
                        $('#left-side-toolbar .cart-btn').attr('data-action', "add");
                        $('#left-side-toolbar .cart-btn .toolbar-item-label').text("ADD TO CART");

                        // load the default settings
                        ub.loadDefaulUniformStyle(ub.data.defaultUniformStyle);
                        ub.funcs.removeLocations();
                    } else {
                        // update cart
                        var cart_item = _.find(cart_items, {material_id: ub.config.material_id});

                        $('#left-side-toolbar .cart-btn').attr('data-action', "update");
                        $('#left-side-toolbar .cart-btn').data('cart-item-id', cart_item.id);
                        $('#left-side-toolbar .cart-btn .toolbar-item-label').text("UPDATE ITEM");

                        // load the uniform settings of cart item
                        ub.loadSettings(JSON.parse(cart_item.builder_customization));
                        ub.funcs.removeLocations();
                    }

                    $('#my-shopping-cart').removeAttr('cloak');

                    callback();
                }
            } else {
                console.log("Something went wrong on fetching cart items!");
            }
        });
    },

    getDuplicateMaterial: function (cart_items) {
        var duplicate_material = [];
        var material_ids = _.uniq(_.pluck(cart_items, "material_id"));

        for (var i in material_ids) {
            var material_id = material_ids[i];
            var result = _.where(cart_items, {material_id: material_id});

            if (result.length > 1) {
                duplicate_material.push(result);
            }
        }

        return duplicate_material;
    },


    fetchCartItems: function(callback) {
        UBCart.cartItemApi.getCartItems(function(response) {
            callback(response);
        });
    },

    updateShoppingCartDetails: function(cart_items) {
        var tmpl = _.template($('#dropdown-cart-item-tmpl').html());

        // change cart number
        $('#my-shopping-cart .cart-item-number').text(cart_items.length);

        // hide see all in my carts link if cart items empty
        $('#my-carts-link')[cart_items.length === 0 ? "hide" : "show"]();

        $('#dropdown-cart-item-list').html(tmpl({
            cart_items: cart_items
        }));
    },

    addToCart: function(e) {
        e.preventDefault();
        /* Act on the event */
        console.log("Add to cart button madafaka jones");

        var material = ub.current_material.material;

        waitingDialog.show("Adding item to cart...", {rtl: false, progressType: "success"});
        waitingDialog.progress(1, 2);

        UBCart.cartItemApi.addToCart({
            material_id: material.id,
            name: material.name,
            front_image: material.thumbnail_path,
            brand: material.brand,
            item_id: parseInt(material.id),
            block_pattern_id: parseInt(material.block_pattern_id),
            neck_option: ub.neckOption,
            description: material.description,
            type: material.type,
            builder_customization: JSON.stringify(ub.current_material.settings),
            design_sheet: material.design_sheet_path,
        }, function(response) {
            waitingDialog.progress(2, 2);
            _.delay(function() { // delay 1s to finish the progress bar
                if (response.success) {
                    waitingDialog.message(response.message + " Please wait to save styles for all perspective.");

                    _.delay(function() { // delay 3s to give time of reading long message
                        // get all images
                        ub.funcs.showViews();
                        var current_left_image = ub.getThumbnailImage2('left_view');
                        var current_front_image = ub.getThumbnailImage2('front_view');
                        var current_back_image = ub.getThumbnailImage2('back_view');
                        var current_right_image = ub.getThumbnailImage2('right_view');
                        ub.funcs.hideViews();
                        ub.funcs.setVisibleView(ub.active_view);
                        ub[ub.active_view + '_view'].alpha = 1;
                        // end

                        UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_left_image, response.cart_item_id, UBCart.LEFT_IMAGE_PERSPECTIVE);
                        UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_front_image, response.cart_item_id, UBCart.FRONT_IMAGE_PERSPECTIVE);
                        UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_back_image, response.cart_item_id, UBCart.BACK_IMAGE_PERSPECTIVE);
                        UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_right_image, response.cart_item_id, UBCart.RIGHT_IMAGE_PERSPECTIVE, true);

                        if (typeof Storage !== "undefined") {
                            sessionStorage.left_image = current_left_image;
                            sessionStorage.front_image = current_front_image;
                            sessionStorage.back_image = current_back_image;
                            sessionStorage.right_image = current_right_image;
                        }

                        // change the action and text
                        $('#left-side-toolbar .cart-btn').attr('data-action', "update");
                        $('#left-side-toolbar .cart-btn').data('cart-item-id', response.cart_item_id);
                        $('#left-side-toolbar .cart-btn .toolbar-item-label').text("UPDATE ITEM");
                    }, 3000);
                } else {
                    waitingDialog.message(response.message);

                    _.delay(function() { // delay 1s to give time of reading short message
                        waitingDialog.hide();
                    }, 1000);
                }
            }, 1000);
        });
    },

    updateItem: function(e) {
        e.preventDefault();
        /* Act on the event */
        console.log("Update cart button madafaka jones");

        var cart_item_id = parseInt($(this).data('cart-item-id'));

        waitingDialog.show("Updating item...", {rtl: false, progressType: "success"});
        waitingDialog.progress(1, 2);

        UBCart.cartItemApi.updateItem(cart_item_id, {
            builder_customization: JSON.stringify(ub.current_material.settings)
        }, function(response) {
            waitingDialog.progress(2, 2);

            _.delay(function() { // delay 1s to finish the progress bar
                if (response.success) {
                    if (typeof Storage !== "undefined") {
                        waitingDialog.message(response.message + " Please wait to save styles for all perspective.");

                        _.delay(function() { // delay 3s to give time of reading long message
                            // get all images
                            ub.funcs.showViews();
                            var current_left_image = ub.getThumbnailImage2('left_view');
                            var current_front_image = ub.getThumbnailImage2('front_view');
                            var current_back_image = ub.getThumbnailImage2('back_view');
                            var current_right_image = ub.getThumbnailImage2('right_view');
                            ub.funcs.hideViews();
                            ub.funcs.setVisibleView(ub.active_view);
                            ub[ub.active_view + '_view'].alpha = 1;
                            // end

                            if (sessionStorage.left_image !== current_left_image) {
                                UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_left_image, cart_item_id, UBCart.LEFT_IMAGE_PERSPECTIVE);
                                sessionStorage.left_image = current_left_image;
                            }

                            if (sessionStorage.front_image !== current_front_image) {
                                UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_front_image, cart_item_id, UBCart.FRONT_IMAGE_PERSPECTIVE);
                                sessionStorage.front_image = current_front_image;
                            }

                            if (sessionStorage.back_image !== current_back_image) {
                                UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_back_image, cart_item_id, UBCart.BACK_IMAGE_PERSPECTIVE);
                                sessionStorage.back_image = current_back_image;
                            }

                            if (sessionStorage.right_image !== current_right_image) {
                                UBCart.uploadBase64ImageThenUpdateShoppingCartDetails(current_right_image, cart_item_id, UBCart.RIGHT_IMAGE_PERSPECTIVE, true);
                                sessionStorage.right_image = current_right_image;
                            }
                        }, 3000);
                    } else {
                        waitingDialog.message("Cannot update the styles because Storage not support of the browser.");

                        _.delay(function() { // delay 1s to give time of reading short message
                            waitingDialog.hide();
                        }, 1000);
                    }
                } else {
                    waitingDialog.message(response.message);

                    _.delay(function() { // delay 1s to give time of reading short message
                        waitingDialog.hide();
                    }, 1000);
                }
            }, 1000);
        });
    },

    uploadBase64ImageThenUpdateShoppingCartDetails: function(base64Image, cart_item_id, perspective, done) {
        var upload_time = setInterval(function() {
            if (UBCart.is_upload_base_64_image_available) {
                done = done || false;

                console.log("Processing: " + perspective);

                UBCart.is_upload_base_64_image_available = false;

                waitingDialog.message("Saving styles for <b>" + perspective + " perspective</b>...", {rtl: false, progressType: "success"});
                // waitingDialog("Implementing styles for <b>" + perspective + " perspective</b>...", {rtl: false, progressType: "success"});
                waitingDialog.progress(1, 4);

                // Upload base 64 image
                ub.funcs.uploadBase64Image(base64Image, function(uploadImageResponse) {
                    console.log(uploadImageResponse);
                    waitingDialog.progress(2, 4);

                    if (uploadImageResponse.success) {
                        // update image
                        UBCart.cartItemApi.updateImage(cart_item_id, uploadImageResponse.filename, perspective, function(updateThumbnailResponse) {
                            waitingDialog.progress(3, 4);
                            _.delay(function() { // delay .5s to finish the progress bar

                                // update cart items in dropdown
                                UBCart.fetchCartItems(function(response) {
                                    var cart_items = response.data;
                                    UBCart.updateShoppingCartDetails(cart_items);

                                    waitingDialog.progress(4, 4);
                                    _.delay(function() { // delay .5s to finish the progress bar
                                        if (done) {
                                            waitingDialog.hide()
                                        }

                                        _.delay(function() { // delay .5s again to give time for closing modal
                                            UBCart.is_upload_base_64_image_available = true;
                                            clearInterval(upload_time);
                                        }, 500);
                                    }, 500);
                                });
                            }, 500);
                        });
                    } else {
                        // update cart items in dropdown
                        UBCart.fetchCartItems(function(response) {
                            var cart_items = response.data;
                            UBCart.updateShoppingCartDetails(cart_items);

                            waitingDialog.progress(100);
                            _.delay(function() { // delay .5s to finish the progress bar
                                waitingDialog.hide();

                                _.delay(function() { // delay .5s again to give time of closing modal
                                    UBCart.is_upload_base_64_image_available = true;
                                    clearInterval(upload_time);
                                }, 500);
                            }, 500);
                        });
                    }
                });
            }
        }, 1000);
    },

    onSelectItemToBeRetain: function() {
        var _this = this;

        $(this).parent().find('button').removeClass("active");
        $(this).addClass("active");

        bootbox.confirm("Are you sure do you want to retain the selected item?", function(yes) {
            if (yes) {
                var cart_item_id = $(_this).data('cart-item-id');

                UBCart.cartItemApi.retainItem(cart_item_id, function(response) {
                    if (response.success) {
                        $(_this).removeClass("btn-default").addClass("btn-success").prop('disabled', true);
                        $(_this).parent().find("button:not('.active')").fadeOut(function() {
                            $(this).remove();

                            var done = true;
                            $.each($('#duplicate-items-container .panel'), function(index, el) {
                                if ($('.cart-item-btn', el).length > 1) {
                                    done = false;
                                    return;
                                }
                            });

                            if (done) {
                                location.reload();
                            }
                        });

                        console.log(response.message);
                    } else {
                        bootbox.alert(response.message);
                    }
                });
            } else {
                $(_this).removeClass('active');
            }
        });
    }
};